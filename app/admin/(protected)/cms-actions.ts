'use server'

import { createClient } from '@/utils/supabase/server'
import { createServiceClient } from '@/utils/supabase/service'
import { revalidatePath } from 'next/cache'
import { requireAdmin, requireSectionAccess } from '@/utils/admin-auth'

function getCategoryForKey(key: string): string {
  if (key.startsWith('homepage_') || key === 'testimonials') {
    return 'homepage'
  }
  if (key.startsWith('pricing_')) {
    return 'pricing'
  }
  if (key.startsWith('industry_')) {
    return 'industries'
  }
  if (key.startsWith('feature_') || key === 'industry_features') {
    return 'features'
  }
  if (key.startsWith('solution_') || key === 'solutions_list') {
    return 'solutions'
  }
  if (key.startsWith('service_')) {
    return 'services'
  }
  if (key === 'contact_page') {
    return 'contact'
  }
  if (key === 'about_page') {
    return 'about'
  }
  if (key === 'careers_page') {
    return 'careers'
  }
  if (key === 'integrations_page') {
    return 'integrations'
  }
  if (key === 'redirects') {
    return 'redirects'
  }
  return 'common'
}

export async function updateSiteSectionAction(key: string, content: any) {
  try {
    // Determine category based on key to satisfy the NOT NULL constraint in database
    const category = getCategoryForKey(key)

    // Enforce authentication AND role-based authorization for this section.
    await requireSectionAccess(category)

    const supabase = await createClient()

    // Perform upsert into site_sections
    const { error } = await supabase
      .from('site_sections')
      .upsert(
        { key, category, content, updated_at: new Date().toISOString() },
        { onConflict: 'key' }
      )

    if (error) {
      console.error(`Supabase error saving section [${key}]:`, error)
      return { error: `Failed to save changes: ${error.message}` }
    }

    // 3. Clear Static Page Caches for instant UI update
    if (category === 'homepage') {
      revalidatePath('/')
    } else if (category === 'industries') {
      revalidatePath('/industries')
      revalidatePath('/') // Revalidate homepage too since it might display industries
      if (Array.isArray(content)) {
        content.forEach((item: any) => {
          if (item.id) {
            revalidatePath(`/industries/${item.id}`)
          }
        })
      }
    } else if (category === 'features') {
      revalidatePath('/features')
      revalidatePath('/', 'layout') // Revalidate layout to update navigation links/dropdowns
      if (Array.isArray(content)) {
        content.forEach((item: any) => {
          if (item.id) {
            revalidatePath(`/features/${item.id}`)
          }
        })
      }
    } else if (category === 'solutions') {
      revalidatePath('/solutions')
      revalidatePath('/', 'layout')
      if (Array.isArray(content)) {
        content.forEach((item: any) => {
          if (item.id) {
            revalidatePath(`/solutions/${item.id}`)
          }
        })
      }
    } else if (category === 'services') {
      revalidatePath('/services')
    } else if (category === 'contact') {
      revalidatePath('/contact')
    } else if (category === 'about') {
      revalidatePath('/about')
    } else if (category === 'careers') {
      revalidatePath('/careers')
    } else if (category === 'integrations') {
      revalidatePath('/integrations')
    } else if (category === 'pricing') {
      revalidatePath('/')
      revalidatePath('/pricing')
    } else if (category === 'redirects') {
      // Redirect rules are consumed by the edge middleware; revalidate the
      // whole layout so any cached fetch of the rules is refreshed promptly.
      revalidatePath('/', 'layout')
    } else {
      // Revalidate layout (navbar, footer, global CTA, SEO etc) which affects all pages
      revalidatePath('/', 'layout')
    }

    return { success: true }
  } catch (err: any) {
    console.error('Server Action Error inside updateSiteSectionAction:', err)
    return { error: err.message || 'An unexpected server error occurred.' }
  }
}

export async function uploadCMSImageAction(fileName: string, base64Data: string, mimeType: string) {
  try {
    // 1. Authenticate (any admin role may upload media)
    await requireAdmin()

    // Storage writes go through the service-role client (RLS blocks anon writes).
    const supabase = createServiceClient()

    // 2. Check/create bucket
    const bucketName = 'media'
    const { data: buckets } = await supabase.storage.listBuckets()
    const bucketExists = buckets?.some(b => b.id === bucketName)
    
    if (!bucketExists) {
      const { error: bucketError } = await supabase.storage.createBucket(bucketName, {
        public: true,
        allowedMimeTypes: ['image/png', 'image/jpeg', 'image/jpg', 'image/gif', 'image/webp'],
        fileSizeLimit: 10485760 // 10MB
      })
      if (bucketError) {
        console.error(`Error creating ${bucketName} bucket:`, bucketError)
        return { error: `Failed to initialize uploads folder: ${bucketError.message}` }
      }
    }

    // 3. Upload file
    const buffer = Buffer.from(base64Data, 'base64')
    const { data, error: uploadError } = await supabase.storage
      .from(bucketName)
      .upload(fileName, buffer, {
        contentType: mimeType,
        upsert: true
      })

    if (uploadError) {
      console.error('Error uploading file to storage:', uploadError)
      return { error: `Upload failed: ${uploadError.message}` }
    }

    // 4. Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from(bucketName)
      .getPublicUrl(fileName)

    return { publicUrl }
  } catch (err: any) {
    console.error('Error inside uploadCMSImageAction:', err)
    return { error: err.message || 'Server upload failed.' }
  }
}

export async function getSiteSectionAction(key: string) {
  try {
    await requireAdmin()
    const { getSiteSection } = await import('@/utils/cms')
    const data = await getSiteSection(key)
    return { data }
  } catch (err: any) {
    console.error(`Error in getSiteSectionAction [${key}]:`, err)
    return { error: err.message || 'Server fetch failed.' }
  }
}

