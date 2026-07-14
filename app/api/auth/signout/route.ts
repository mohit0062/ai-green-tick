import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const supabase = await createClient()

  // Check if a user's logged in
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) {
    await supabase.auth.signOut()
  }

  const response = NextResponse.redirect(new URL('/admin/login', req.url), {
    status: 302,
  })
  response.cookies.delete('aigt_admin_override')

  revalidatePath('/', 'layout')
  return response
}
