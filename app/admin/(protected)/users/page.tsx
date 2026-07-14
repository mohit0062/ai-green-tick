import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { getAdminsAction, getRolePermissionsAction } from './user-actions'
import UsersClient from './users-client'
import { NAV_PERMISSIONS } from '@/utils/roles'

export const dynamic = 'force-dynamic'

export default async function AdminUsersPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const cookieStore = await cookies()
  const fallbackToken = process.env.ADMIN_FALLBACK_TOKEN?.trim()
  const fallbackEmail = process.env.ADMIN_FALLBACK_EMAIL?.trim().toLowerCase()
  const hasFallbackSession =
    !!fallbackToken &&
    !!fallbackEmail &&
    cookieStore.get('aigt_admin_override')?.value === fallbackToken
  const currentUserEmail = user?.email || (hasFallbackSession ? fallbackEmail : '')

  const { data: admins, error: adminErr } = await getAdminsAction()
  const { data: customPermissions, error: permErr } = await getRolePermissionsAction()

  const permissionsMap = customPermissions || NAV_PERMISSIONS

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12 font-sans text-black">
      <div className="border-b border-[#C5C4C2]/50 pb-5">
        <h2 className="text-2xl font-bold tracking-tight text-neutral-800 font-display">User Role Management (RBAC)</h2>
        <p className="text-neutral-500 text-xs">
          Manage system administrators, verify access keys, and assign permissions for Super Admin, Admin, and Editor roles.
        </p>
      </div>

      <UsersClient 
        initialAdmins={admins || []}
        error={adminErr || permErr}
        currentUserEmail={currentUserEmail}
        initialPermissions={permissionsMap}
      />
    </div>
  )
}
