import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import AdminSidebar from './admin-sidebar'
import { cookies, headers } from 'next/headers'
import { canAccess, NAV_PERMISSIONS } from '@/utils/roles'
import { ShieldAlert, ArrowLeft, Lock } from 'lucide-react'
import Link from 'next/link'

export default async function AdminProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const cookieStore = await cookies()
  const fallbackToken = process.env.ADMIN_FALLBACK_TOKEN?.trim()
  const fallbackEmail = process.env.ADMIN_FALLBACK_EMAIL?.trim().toLowerCase()
  const hasFallbackSession =
    !!fallbackToken &&
    !!fallbackEmail &&
    cookieStore.get('aigt_admin_override')?.value === fallbackToken

  if (!user && !hasFallbackSession) {
    redirect('/admin/login')
  }

  // Fetch role dynamically from public.admin database table
  const userEmail = user?.email || fallbackEmail || ''
  const { data: adminRow } = hasFallbackSession
    ? { data: { role: 'super_admin' } }
    : await supabase
      .from('admin')
      .select('role')
      .eq('email', userEmail)
      .single()

  const userRole: string = adminRow?.role || user?.user_metadata?.role || 'editor'

  // Fetch dynamic permissions map
  const { data: customPermissionsRow } = await supabase
    .from('site_sections')
    .select('content')
    .eq('key', 'role_permissions')
    .maybeSingle()

  const permissionsMap = customPermissionsRow?.content || NAV_PERMISSIONS

  // Retrieve current path from headers
  const headersList = await headers()
  const pathname = headersList.get('x-pathname') || '/admin'

  // Verify permission
  const hasAccess = canAccess(userRole, pathname, permissionsMap)

  return (
    <div className="flex min-h-screen bg-muted/40 font-sans text-neutral-800">
      <AdminSidebar 
        userEmail={userEmail} 
        userRole={userRole} 
        permissionsMap={permissionsMap}
      />

      {/* Main Content */}
      <main className="flex flex-1 flex-col sm:pl-64">
        {/* Top header */}
        <header className="flex h-14 items-center gap-4 border-b border-[#C5C4C2]/50 bg-background px-4 lg:h-[60px] lg:px-6 select-none">
          <h1 className="text-sm font-extrabold tracking-wide uppercase text-neutral-400">AI Greentick Admin CMS</h1>
          <div className="ml-auto flex items-center gap-4">
            <span className="text-xs font-bold text-neutral-600">{userEmail}</span>
          </div>
        </header>

        <div className="flex-1 p-4 lg:p-6">
          {hasAccess ? (
            children
          ) : (
            <div className="min-h-[70vh] flex items-center justify-center p-4">
              <div 
                className="max-w-md w-full border border-red-500/25 bg-red-500/5 backdrop-blur-md rounded-2xl p-8 text-center space-y-6 shadow-xl"
                style={{
                  clipPath: 'polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px)'
                }}
              >
                <div className="mx-auto size-16 rounded-full bg-red-100 flex items-center justify-center text-red-650 animate-bounce">
                  <ShieldAlert className="h-9 w-9 text-red-600" />
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-xl font-bold tracking-tight text-neutral-900 font-display">Access Denied</h3>
                  <p className="text-neutral-500 text-xs leading-relaxed">
                    Your current role (<span className="font-bold text-neutral-700 capitalize">{userRole.replace('_', ' ')}</span>) does not have permission to access:
                  </p>
                  <p className="font-mono bg-neutral-100/60 p-2 border border-[#C5C4C2]/40 rounded text-neutral-600 text-[10px] select-all truncate mt-1">
                    {pathname}
                  </p>
                </div>

                <div className="border-t border-[#C5C4C2]/30 pt-6 flex flex-col gap-3">
                  <Link 
                    href="/admin" 
                    className="flex items-center justify-center gap-2 px-5 py-2.5 bg-black text-white hover:bg-neutral-850 text-xs font-bold tracking-wide uppercase transition-colors"
                    style={{
                      clipPath: 'polygon(6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%, 0 6px)'
                    }}
                  >
                    <ArrowLeft className="h-4 w-4" /> Return to Dashboard
                  </Link>
                  <p className="text-[9px] text-neutral-400">
                    Contact your System Super Administrator to request elevation.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
