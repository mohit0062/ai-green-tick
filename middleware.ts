import { type NextRequest } from 'next/server'
import { updateSession } from '@/utils/supabase/middleware'
import { handleCmsRedirect } from '@/utils/redirects'

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // CMS-managed URL redirects (WordPress "Redirection"-style). Checked first so
  // a matched rule short-circuits before any session work. Excludes admin/api/
  // _next/static paths and guards against redirect loops internally.
  const redirect = await handleCmsRedirect(request)
  if (redirect) return redirect

  // Set x-pathname header on request so it is forwarded downstream to server components
  request.headers.set('x-pathname', pathname)

  // Delegate session management & admin auth to updateSession
  const response = await updateSession(request)
  
  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
