export type AdminRole = 'super_admin' | 'admin' | 'editor'

export const NAV_PERMISSIONS: Record<string, AdminRole[]> = {
  '/admin':                 ['super_admin', 'admin', 'editor'],
  '/admin/homepage':         ['super_admin', 'admin', 'editor'],
  '/admin/pricing':          ['super_admin', 'admin', 'editor'],
  '/admin/blogs':            ['super_admin', 'admin', 'editor'],
  '/admin/features':         ['super_admin', 'admin', 'editor'],
  '/admin/solutions':        ['super_admin', 'admin', 'editor'],
  '/admin/about':            ['super_admin', 'admin', 'editor'],
  '/admin/careers':          ['super_admin', 'admin'],
  '/admin/contact':          ['super_admin', 'admin'],
  '/admin/industries':       ['super_admin', 'admin'],
  '/admin/redirects':        ['super_admin', 'admin'],
  '/admin/common-sections':  ['super_admin'],
  '/admin/users':            ['super_admin'],
}

export function canAccess(
  role: string,
  path: string,
  customPermissions?: Record<string, string[]>
): boolean {
  const normalized = path.endsWith('/') ? path.slice(0, -1) : path

  if (role === 'super_admin') {
    return true
  }

  const permissions = customPermissions || NAV_PERMISSIONS

  // Fallback to basic checklist
  const matchingKey = Object.keys(permissions)
    .sort((a, b) => b.length - a.length)
    .find(key => normalized === key || normalized.startsWith(key + '/'))

  if (!matchingKey) return false
  return (permissions[matchingKey] || []).includes(role as AdminRole)
}

export function getRoleLabel(role: string): string {
  switch (role) {
    case 'super_admin': return 'Super Admin'
    case 'admin':       return 'Admin'
    case 'editor':      return 'Editor'
    default:            return 'Admin'
  }
}

export function getRoleBadgeClasses(role: string): string {
  switch (role) {
    case 'super_admin': return 'bg-green-500/10 text-green-600 border border-green-500/20'
    case 'admin':       return 'bg-amber-500/10 text-amber-600 border border-amber-500/20'
    case 'editor':      return 'bg-blue-500/10 text-blue-600 border border-blue-500/20'
    default:            return 'bg-muted text-muted-foreground border'
  }
}
