import { createClient } from '@/utils/supabase/server'
import { createServiceClient } from '@/utils/supabase/service'
import { cookies } from 'next/headers'
import { canAccess, NAV_PERMISSIONS } from '@/utils/roles'

export type AdminContext = {
  email: string
  role: string
  isFallback: boolean
}

/**
 * Resolves the currently authenticated admin (real Supabase user or the
 * env-configured break-glass fallback session) and their effective role.
 * Returns null when the caller is not an authenticated admin.
 */
export async function getAdminContext(): Promise<AdminContext | null> {
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

  if (!user && !hasFallbackSession) return null

  // Break-glass fallback admin is always treated as super_admin.
  if (!user && hasFallbackSession) {
    return { email: fallbackEmail as string, role: 'super_admin', isFallback: true }
  }

  const email = (user?.email || '').toLowerCase()

  // Look up the admin row. Prefer the service client (bypasses RLS) so a valid
  // Supabase session that is NOT in the admin table is correctly rejected, and
  // so real admins are never locked out by an RLS edge case.
  let adminRow: { role?: string } | null = null
  try {
    const svc = createServiceClient()
    const { data } = await svc.from('admin').select('role').eq('email', email).maybeSingle()
    adminRow = data
  } catch {
    const { data } = await supabase.from('admin').select('role').eq('email', email).maybeSingle()
    adminRow = data
  }

  // A valid session alone does NOT grant admin access — the user must exist in
  // the admin table. Blocks non-admin accounts from gaining editor/admin access.
  if (!adminRow) return null

  return { email, role: adminRow.role || 'editor', isFallback: false }
}

async function getPermissionsMap(): Promise<Record<string, string[]>> {
  try {
    const supabase = await createClient()
    const { data } = await supabase
      .from('site_sections')
      .select('content')
      .eq('key', 'role_permissions')
      .maybeSingle()
    return (data?.content as Record<string, string[]>) || NAV_PERMISSIONS
  } catch {
    return NAV_PERMISSIONS
  }
}

/** Ensures the caller is an authenticated admin of any role. Throws otherwise. */
export async function requireAdmin(): Promise<AdminContext> {
  const ctx = await getAdminContext()
  if (!ctx) throw new Error('Unauthorized: Admin authentication required.')
  return ctx
}

/** Ensures the caller is a super admin. Throws otherwise. */
export async function requireSuperAdmin(): Promise<AdminContext> {
  const ctx = await requireAdmin()
  if (ctx.role !== 'super_admin') {
    throw new Error('Forbidden: Super Admin privileges are required for this action.')
  }
  return ctx
}

// Maps a site_sections category to the admin route that governs it, so we can
// reuse the same role/permission matrix the sidebar and layout enforce.
const CATEGORY_TO_ADMIN_PATH: Record<string, string> = {
  homepage: '/admin/homepage',
  pricing: '/admin/pricing',
  features: '/admin/features',
  solutions: '/admin/solutions',
  services: '/admin/features',
  industries: '/admin/industries',
  about: '/admin/about',
  careers: '/admin/careers',
  contact: '/admin/contact',
  integrations: '/admin/integrations',
  redirects: '/admin/redirects',
  settings: '/admin/users',
  common: '/admin/common-sections',
}

/**
 * Ensures the caller may modify content in the given category, using the same
 * role permission map that gates the admin UI. Throws when not permitted.
 */
export async function requireSectionAccess(category: string): Promise<AdminContext> {
  const ctx = await requireAdmin()
  if (ctx.role === 'super_admin') return ctx

  const path = CATEGORY_TO_ADMIN_PATH[category] || '/admin/common-sections'
  const permissionsMap = await getPermissionsMap()
  if (!canAccess(ctx.role, path, permissionsMap)) {
    throw new Error(
      `Forbidden: Your role (${ctx.role}) does not have permission to modify ${category} content.`
    )
  }
  return ctx
}
