import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const supabase = await createClient()

    // 1. Authenticate
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized: Admin authentication required.' }, { status: 401 })
    }

    // 2. Parse payload
    const { fileName, base64Data, mimeType } = await request.json()
    if (!fileName || !base64Data || !mimeType) {
      return NextResponse.json({ error: 'Missing required parameters.' }, { status: 400 })
    }

    const bucketName = 'media'

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
      return NextResponse.json({ error: `Upload failed: ${uploadError.message}` }, { status: 500 })
    }

    // 4. Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from(bucketName)
      .getPublicUrl(fileName)

    return NextResponse.json({ publicUrl })
  } catch (err: any) {
    console.error('Upload API Error:', err)
    return NextResponse.json({ error: err.message || 'Server upload failed.' }, { status: 500 })
  }
}
