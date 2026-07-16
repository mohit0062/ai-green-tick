import { createClient } from '@/utils/supabase/server'
import { createServiceClient } from '@/utils/supabase/service'
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST(request: Request) {
  try {
    const supabase = await createClient()

    // 1. Authenticate (Supabase user auth or admin override cookie session)
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    const cookieStore = await cookies()
    const fallbackToken = process.env.ADMIN_FALLBACK_TOKEN?.trim()
    const fallbackEmail = process.env.ADMIN_FALLBACK_EMAIL?.trim().toLowerCase()
    const hasFallbackSession =
      !!fallbackToken &&
      !!fallbackEmail &&
      cookieStore.get('aigt_admin_override')?.value === fallbackToken

    if ((authError || !user) && !hasFallbackSession) {
      return NextResponse.json({ error: 'Unauthorized: Admin authentication required.' }, { status: 401 })
    }

    // 2. Parse payload
    const { fileName, base64Data, mimeType } = await request.json()
    if (!fileName || !base64Data || !mimeType) {
      return NextResponse.json({ error: 'Missing required parameters.' }, { status: 400 })
    }

    const bucketName = 'media'

    // 3. Upload file via service-role client (RLS blocks anon writes to storage)
    const svc = createServiceClient()
    const buffer = Buffer.from(base64Data, 'base64')
    const { data, error: uploadError } = await svc.storage
      .from(bucketName)
      .upload(fileName, buffer, {
        contentType: mimeType,
        upsert: true
      })

    if (uploadError) {
      console.error('Error uploading file to storage:', uploadError)
      return NextResponse.json({ error: `Upload failed: ${uploadError.message}` }, { status: 500 })
    }

    // 4. Get public URL
    const { data: { publicUrl } } = svc.storage
      .from(bucketName)
      .getPublicUrl(fileName)

    return NextResponse.json({ publicUrl })
  } catch (err: any) {
    console.error('Upload API Error:', err)
    return NextResponse.json({ error: err.message || 'Server upload failed.' }, { status: 500 })
  }
}
