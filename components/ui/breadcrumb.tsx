'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, ChevronRight } from 'lucide-react'

export default function Breadcrumb() {
  const pathname = usePathname()

  // Do not show breadcrumbs on the homepage
  if (pathname === '/') return null

  // Split path into segments
  const segments = pathname.split('/').filter((item) => item !== '')

  return (
    <nav 
      aria-label="Breadcrumb" 
      className="w-full border-b border-[#C5C4C2] bg-neutral-50/50 dark:bg-neutral-900/40 py-3 px-4 sm:px-6 lg:px-8 text-left"
    >
      <div className="mx-auto max-w-7xl flex items-center gap-2 text-[10px] sm:text-xs font-mono font-bold tracking-wider text-neutral-500 uppercase">
        {/* Home Link */}
        <Link 
          href="/" 
          className="flex items-center gap-1 hover:text-[#00b259] transition-colors duration-200"
        >
          <Home className="size-3.5" />
          <span>Home</span>
        </Link>

        {segments.map((segment, index) => {
          const isLast = index === segments.length - 1
          // Rebuild URL for this segment
          const href = '/' + segments.slice(0, index + 1).join('/')
          // Clean segment name (replace dashes with spaces)
          const cleanName = segment.replace(/-/g, ' ')

          return (
            <React.Fragment key={index}>
              <span className="text-[#C5C4C2] font-normal">&rarr;</span>
              {isLast ? (
                <span className="text-[#00b259] font-black truncate max-w-[200px] sm:max-w-none">
                  {cleanName}
                </span>
              ) : (
                <Link 
                  href={href} 
                  className="hover:text-[#00b259] transition-colors duration-200"
                >
                  {cleanName}
                </Link>
              )}
            </React.Fragment>
          )
        })}
      </div>
    </nav>
  )
}
