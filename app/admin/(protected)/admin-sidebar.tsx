'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard, FileText, LogOut, Lock,
  Globe, Shield, Smartphone, PhoneCall, Info, Briefcase, Layers, Home, CreditCard
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { getRoleLabel, getRoleBadgeClasses, canAccess } from '@/utils/roles'

type NavItem = {
  href: string
  label: string
  icon: React.ComponentType<{ className?: string }>
  exact?: boolean
  group: 'main' | 'cms'
}

const navItems: NavItem[] = [
  // Main
  { href: '/admin',       label: 'Dashboard', icon: LayoutDashboard, exact: true, group: 'main' },
  
  // CMS
  { href: '/admin/homepage', label: 'Homepage', icon: Home,                        group: 'cms' },
  { href: '/admin/pricing',  label: 'Pricing Page', icon: CreditCard,              group: 'cms' },
  { href: '/admin/blogs', label: 'Blogs',     icon: FileText,                     group: 'cms' },
  { href: '/admin/features', label: 'Features Page', icon: Layers,                 group: 'cms' },
  { href: '/admin/solutions', label: 'Solutions Page', icon: Globe,                  group: 'cms' },
  { href: '/admin/industries', label: 'Industries',       icon: Smartphone,              group: 'cms' },
  { href: '/admin/about', label: 'About Page',     icon: Info,                    group: 'cms' },
  { href: '/admin/careers', label: 'Careers Page',   icon: Briefcase,               group: 'cms' },
  { href: '/admin/contact', label: 'Contact Page',     icon: PhoneCall,               group: 'cms' },
  { href: '/admin/common-sections', label: 'Common Sections', icon: Globe,         group: 'cms' },
  { href: '/admin/users',    label: 'Admin Users',     icon: Lock,                  group: 'cms' },
]

const GROUP_LABELS: Record<string, string> = {
  main:   'Overview',
  cms:    'Content Management',
}

export default function AdminSidebar({
  userEmail,
  userRole = 'admin',
  permissionsMap,
}: {
  userEmail: string
  userRole?: string
  permissionsMap?: Record<string, string[]>
}) {
  const pathname = usePathname()

  function isActive(href: string, exact?: boolean) {
    if (exact) return pathname === href
    const match = pathname === href || pathname.startsWith(href + '/')
    if (!match) return false

    const hasMoreSpecificMatch = navItems.some(item => 
      item.href !== href && 
      item.href.startsWith(href + '/') && 
      (pathname === item.href || pathname.startsWith(item.href + '/'))
    )
    return !hasMoreSpecificMatch
  }

  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-64 flex-col border-r border-neutral-200 bg-background sm:flex font-sans">
      {/* Logo */}
      <div className="flex h-14 items-center border-b border-neutral-200 px-4 lg:h-[60px] lg:px-6">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg text-black">
          <span className="bg-primary text-white rounded-md px-2 py-0.5 text-xs font-mono">AIS</span>
          <span>Admin Panel</span>
        </Link>
      </div>

      {/* Nav */}
      <div className="flex-grow overflow-auto py-4">
        {(['main', 'cms'] as const).map((group) => {
          const items = navItems.filter(item => item.group === group && canAccess(userRole, item.href, permissionsMap))
          if (items.length === 0) return null

          return (
            <div key={group} className="mb-4">
              <p className="px-4 pb-1 pt-2 text-[10px] font-extrabold uppercase tracking-widest text-neutral-400 select-none">
                {GROUP_LABELS[group]}
              </p>
              <nav className="grid px-2 text-xs font-bold gap-1">
                {items.map((item) => {
                  const active = isActive(item.href, item.exact)
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        'flex items-center gap-3 rounded-lg px-3 py-2.5 transition-all',
                        active 
                          ? 'bg-primary/10 text-primary' 
                          : 'text-neutral-500 hover:text-black hover:bg-neutral-100'
                      )}
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </Link>
                  )
                })}
              </nav>
            </div>
          )
        })}
      </div>

      {/* User Profile Card + Logout */}
      <div className="mt-auto border-t border-neutral-200">
        <div className="p-4 space-y-3">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-sm select-none border border-primary/20">
              {userEmail ? userEmail.charAt(0).toUpperCase() : '?'}
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-foreground truncate">{userEmail}</p>
              <span
                className={cn(
                  'inline-flex items-center gap-1 mt-0.5 px-1.5 py-0.5 rounded text-[10px] font-semibold tracking-wide',
                  getRoleBadgeClasses(userRole)
                )}
              >
                <Shield className="h-2.5 w-2.5" />
                {getRoleLabel(userRole)}
              </span>
            </div>
          </div>

          <form action="/api/auth/signout" method="post">
            <button
              type="submit"
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-neutral-500 hover:text-primary transition-all hover:bg-neutral-100 text-xs font-bold cursor-pointer"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </button>
          </form>
        </div>
      </div>
    </aside>
  )
}
