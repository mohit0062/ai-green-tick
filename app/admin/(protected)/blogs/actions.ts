'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { createClient } from '@/utils/supabase/server'

// Persists per-blog AEO data (AI snapshot + FAQs) in the shared `site_sections`
// table keyed by blog id. This avoids requiring extra columns on the `blogs`
// table (no DB migration needed). Keyed by id so slug renames don't orphan data.
async function saveBlogAeo(
  supabase: any,
  blogId: string,
  aiSnapshot: string,
  faqs: { question: string; answer: string }[]
) {
  try {
    const { data: existing } = await supabase
      .from('site_sections')
      .select('content')
      .eq('key', 'blogs_aeo')
      .maybeSingle()

    const map =
      existing?.content && !Array.isArray(existing.content) ? { ...existing.content } : {}
    map[blogId] = { aiSnapshot: aiSnapshot || '', faqs: Array.isArray(faqs) ? faqs : [] }

    await supabase.from('site_sections').upsert(
      {
        key: 'blogs_aeo',
        category: 'blogs',
        content: map,
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'key' }
    )
  } catch (e) {
    // Best-effort: never block the primary blog save on AEO metadata.
    console.error('Failed to save blog AEO metadata:', e)
  }
}

function parseFaqs(raw: unknown): { question: string; answer: string }[] {
  if (typeof raw !== 'string' || !raw.trim()) return []
  try {
    const parsed = JSON.parse(raw)
    if (Array.isArray(parsed)) {
      return parsed
        .filter((f) => f && typeof f.question === 'string' && typeof f.answer === 'string')
        .map((f) => ({ question: f.question, answer: f.answer }))
    }
  } catch {
    // ignore malformed input
  }
  return []
}

async function checkAuth(supabase: any) {
  const { data: { user } } = await supabase.auth.getUser()
  if (user) return true

  const fallbackToken = process.env.ADMIN_FALLBACK_TOKEN?.trim()
  const cookieStore = await cookies()
  const hasFallbackSession =
    !!fallbackToken &&
    cookieStore.get('aigt_admin_override')?.value === fallbackToken

  if (hasFallbackSession) return true

  throw new Error('Not authenticated')
}

export async function deleteBlog(id: string) {
  const supabase = await createClient()

  // Make sure user is authenticated
  await checkAuth(supabase)

  // Fetch current status and slug
  const { data: currentBlog } = await supabase
    .from('blogs')
    .select('status, slug')
    .eq('id', id)
    .single()

  if (currentBlog?.status === 'trash') {
    // Delete permanently
    const { error } = await supabase
      .from('blogs')
      .delete()
      .eq('id', id)

    if (error) {
      throw new Error(`Failed to permanently delete blog: ${error.message}`)
    }
  } else {
    // Soft delete to Trash
    const { error } = await supabase
      .from('blogs')
      .update({ status: 'trash' })
      .eq('id', id)

    if (error) {
      throw new Error(`Failed to move blog to trash: ${error.message}`)
    }
  }

  revalidatePath('/admin/blogs')
  if (currentBlog?.slug) {
    revalidatePath(`/blog/${currentBlog.slug}`)
  }
  revalidatePath('/blog')
  revalidatePath('/')
}

export async function restoreBlog(id: string) {
  const supabase = await createClient()

  // Make sure user is authenticated
  await checkAuth(supabase)

  const { error } = await supabase
    .from('blogs')
    .update({ status: 'draft' }) // Restore as draft
    .eq('id', id)

  if (error) {
    throw new Error(`Failed to restore blog: ${error.message}`)
  }

  revalidatePath('/admin/blogs')
  revalidatePath('/blog')
  revalidatePath('/')
}

export async function duplicateBlog(id: string) {
  const supabase = await createClient()

  // Make sure user is authenticated
  await checkAuth(supabase)

  // Fetch target blog
  const { data: blog, error: fetchErr } = await supabase
    .from('blogs')
    .select('*')
    .eq('id', id)
    .single()

  if (fetchErr || !blog) {
    throw new Error('Blog not found to duplicate')
  }

  // Generate unique slug
  const baseSlug = `${blog.slug}-copy`
  
  const { error: insertErr } = await supabase
    .from('blogs')
    .insert([{
      title: `${blog.title} (Copy)`,
      slug: baseSlug,
      description: blog.description,
      content: blog.content,
      author: blog.author,
      author_role: blog.author_role,
      author_avatar: blog.author_avatar,
      category: blog.category,
      read_time: blog.read_time,
      image_url: blog.image_url,
      status: 'draft', // Duplicate as draft
      meta_title: blog.meta_title ? `${blog.meta_title} (Copy)` : null,
      meta_description: blog.meta_description,
      focus_keyword: blog.focus_keyword,
      seo_score: blog.seo_score,
      tags: blog.tags || [],
      categories: blog.categories || [blog.category].filter(Boolean)
    }])

  if (insertErr) {
    throw new Error(`Failed to duplicate blog: ${insertErr.message}`)
  }

  revalidatePath('/admin/blogs')
  revalidatePath('/blog')
  revalidatePath('/')
}

export async function quickUpdateBlog(
  id: string,
  data: {
    title: string
    slug: string
    status: string
    category: string
    tags: string[]
  }
) {
  const supabase = await createClient()

  // Make sure user is authenticated
  await checkAuth(supabase)

  const { error } = await supabase
    .from('blogs')
    .update({
      title: data.title,
      slug: data.slug,
      status: data.status,
      category: data.category,
      tags: data.tags
    })
    .eq('id', id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/admin/blogs')
  revalidatePath(`/blog/${data.slug}`)
  revalidatePath('/blog')
  revalidatePath('/')
  return { success: true }
}

export async function createBlog(formData: FormData) {
  const supabase = await createClient()

  // Make sure user is authenticated
  await checkAuth(supabase)

  const title = formData.get('title') as string
  const slug = formData.get('slug') as string
  const description = formData.get('description') as string
  const content = formData.get('content') as string
  const author = formData.get('author') as string
  const author_role = formData.get('author_role') as string
  const author_avatar = formData.get('author_avatar') as string
  const category = formData.get('category') as string
  const read_time = formData.get('read_time') as string
  const image_url = formData.get('image_url') as string
  
  // New WordPress & SEO fields
  const status = (formData.get('status') as string) || 'published'
  const meta_title = formData.get('meta_title') as string
  const meta_description = formData.get('meta_description') as string
  const focus_keyword = formData.get('focus_keyword') as string
  const seo_score = parseInt((formData.get('seo_score') as string) || '0', 10)
  
  const tagsString = formData.get('tags') as string
  const tags = tagsString ? tagsString.split(',').map(t => t.trim()).filter(Boolean) : []
  
  const categoriesString = formData.get('categories') as string
  const categories = categoriesString ? categoriesString.split(',').map(c => c.trim()).filter(Boolean) : [category].filter(Boolean)

  // AEO fields
  const ai_snapshot = formData.get('ai_snapshot') as string
  const faqs = parseFaqs(formData.get('faqs'))

  const baseRow = {
    title,
    slug,
    description,
    content,
    author,
    author_role,
    author_avatar,
    category,
    read_time,
    image_url,
    status,
    meta_title: meta_title || null,
    meta_description: meta_description || null,
    focus_keyword: focus_keyword || null,
    seo_score,
    tags,
    categories,
  }
  const { data: inserted, error } = await supabase
    .from('blogs')
    .insert([baseRow])
    .select('id')
    .single()

  if (error) {
    return { error: error.message }
  }

  if (inserted?.id) {
    await saveBlogAeo(supabase, inserted.id, ai_snapshot, faqs)
  }

  revalidatePath('/admin/blogs')
  revalidatePath('/blog')
  revalidatePath('/')
  return { success: true }
}

export async function updateBlog(id: string, formData: FormData) {
  const supabase = await createClient()

  // Make sure user is authenticated
  await checkAuth(supabase)

  const title = formData.get('title') as string
  const slug = formData.get('slug') as string
  const description = formData.get('description') as string
  const content = formData.get('content') as string
  const author = formData.get('author') as string
  const author_role = formData.get('author_role') as string
  const author_avatar = formData.get('author_avatar') as string
  const category = formData.get('category') as string
  const read_time = formData.get('read_time') as string
  const image_url = formData.get('image_url') as string
  
  // New WordPress & SEO fields
  const status = (formData.get('status') as string) || 'published'
  const meta_title = formData.get('meta_title') as string
  const meta_description = formData.get('meta_description') as string
  const focus_keyword = formData.get('focus_keyword') as string
  const seo_score = parseInt((formData.get('seo_score') as string) || '0', 10)
  
  const tagsString = formData.get('tags') as string
  const tags = tagsString ? tagsString.split(',').map(t => t.trim()).filter(Boolean) : []
  
  const categoriesString = formData.get('categories') as string
  const categories = categoriesString ? categoriesString.split(',').map(c => c.trim()).filter(Boolean) : [category].filter(Boolean)

  // AEO fields
  const ai_snapshot = formData.get('ai_snapshot') as string
  const faqs = parseFaqs(formData.get('faqs'))

  const baseRow = {
    title,
    slug,
    description,
    content,
    author,
    author_role,
    author_avatar,
    category,
    read_time,
    image_url,
    status,
    meta_title: meta_title || null,
    meta_description: meta_description || null,
    focus_keyword: focus_keyword || null,
    seo_score,
    tags,
    categories,
  }
  const { error } = await supabase.from('blogs').update(baseRow).eq('id', id)

  if (error) {
    return { error: error.message }
  }

  await saveBlogAeo(supabase, id, ai_snapshot, faqs)

  revalidatePath('/admin/blogs')
  revalidatePath(`/blog/${slug}`)
  revalidatePath('/blog')
  revalidatePath('/')
  return { success: true }
}
