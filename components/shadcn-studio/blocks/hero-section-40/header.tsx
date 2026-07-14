'use client'

import { useState, useEffect } from 'react'
import { Menu, X, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Navigation } from './hero-navigation'
import { AiGreenTickLogo } from './logo'
import { usePathname } from 'next/navigation'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { SolutionsMegaMenu } from './solutions-mega-menu'
import { FeaturesMegaMenu } from './features-mega-menu'
import { getSiteSectionClient } from '@/utils/cms-client'
import { DEFAULT_FALLBACKS } from '@/utils/cms-data'

type HeaderProps = {
  className?: string
  navigationData?: Navigation[]
}

const Header = ({ className }: HeaderProps) => {
  const pathname = usePathname()
  const isHomepage = pathname === '/'

  // Dynamic CMS States
  const [navbarData, setNavbarData] = useState(DEFAULT_FALLBACKS.navbar)
  const [features, setFeatures] = useState<any[]>([])
  const [solutions, setSolutions] = useState<any[]>(DEFAULT_FALLBACKS.industry_list)

  useEffect(() => {
    async function loadCmsHeaderData() {
      const dbNavbar = await getSiteSectionClient('navbar')
      if (dbNavbar) setNavbarData(dbNavbar)

      const dbFeatures = await getSiteSectionClient<any[]>('industry_features')
      if (dbFeatures) setFeatures(dbFeatures)
    }
    loadCmsHeaderData()
  }, [])

  const isExternal = (url: string) => {
    return url && (url.startsWith('http://') || url.startsWith('https://'))
  }

  const getHref = (hash: string) => {
    if (!hash) return '#'
    if (hash.startsWith('http://') || hash.startsWith('https://') || hash.startsWith('mailto:') || hash.startsWith('tel:')) {
      return hash
    }
    if (hash === '#blog') return '/blog'
    if (hash === '#pricing') return '/pricing'
    if (hash === '#solutions') return '/industries'
    if (hash === '#integrations') return '/integrations'
    if (hash === '#about') return '/about'
    if (hash === '#careers') return '/careers'
    if (hash === '#contact') return '/contact'
    if (isHomepage) return hash
    return hash.startsWith('#') ? `/${hash}` : hash
  }

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mobileOpenDropdownTitle, setMobileOpenDropdownTitle] = useState<string | null>(null)
  
  const [openDropdownTitle, setOpenDropdownTitle] = useState<string | null>(null)
  const [activeSection, setActiveSection] = useState('')

  // IntersectionObserver to highlight current active section as we scroll
  useEffect(() => {
    const sections = ['features', 'solutions', 'pricing', 'blog', 'contact']
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -50% 0px',
      threshold: 0.1,
    }

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)
    sections.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => {
      sections.forEach((id) => {
        const el = document.getElementById(id)
        if (el) observer.unobserve(el)
      })
    }
  }, [])

  return (
    <header className={cn('w-full bg-white z-50 sticky top-0 py-2 px-4 sm:px-6 lg:px-8', className)}>
      <div className="mx-auto max-w-7xl relative">
        {/* Background layer with clip-path and border */}
        <div 
          className="absolute inset-0 border border-[#C5C4C2] bg-white pointer-events-none z-0"
          style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 12px 100%, 0 calc(100% - 12px))' }}
        />
        
        {/* Desktop Grid Navigation */}
        <div className="hidden lg:grid grid-cols-9 h-16 w-full items-center select-none text-black font-sans relative z-10">
          
          {/* Logo Column */}
          <div className="col-span-2 h-full border-r border-[#C5C4C2] flex items-center pl-6">
            <a href="/" className="hover:opacity-90 transition-opacity flex items-center gap-2">
              {navbarData.logoImageUrl ? (
                <img src={navbarData.logoImageUrl} alt={navbarData.logoText} className="h-8 max-w-[150px] object-contain" />
              ) : (
                <>
                  <span className="bg-[#00b259] text-white rounded-md px-2 py-0.5 text-xs font-mono font-bold">GT</span>
                  <span className="font-extrabold text-sm tracking-tight text-black">{navbarData.logoText || 'AI Greentick'}</span>
                </>
              )}
            </a>
          </div>
 
          {/* Navigation Links Column */}
          <div className="col-span-5 h-full border-r border-[#C5C4C2] flex items-center justify-center gap-8 text-xs">
            {(navbarData.standaloneLinks || []).map((link: any) => {
              let type = link.type
              if (!type) {
                const titleLower = link.title.toLowerCase()
                if (titleLower === 'features') type = 'mega-features'
                else if (titleLower === 'solutions') type = 'mega-solutions'
                else if (titleLower === 'company') type = 'dropdown'
                else type = 'link'
              }

              if (type === 'mega-features') {
                const isOpen = openDropdownTitle === link.title
                return (
                  <div
                    key={link.title}
                    onMouseEnter={() => setOpenDropdownTitle(link.title)}
                    onMouseLeave={() => setOpenDropdownTitle(null)}
                    className="h-full flex items-center"
                  >
                    <a
                      href={getHref(link.href)}
                      className={cn(
                        "relative py-1 transition-colors font-bold flex items-center gap-1 cursor-pointer select-none group",
                        activeSection === 'features' ? "text-black" : "text-neutral-500 hover:text-black"
                      )}
                    >
                      <span className="absolute -left-2 top-0 text-[#00b259] font-bold opacity-0 group-hover:opacity-100 transition-opacity">┌</span>
                      <span className="absolute -right-2 bottom-0 text-[#00b259] font-bold opacity-0 group-hover:opacity-100 transition-opacity">┘</span>
                      {link.title}
                      <ChevronDown className={cn("size-3.5 transition-transform duration-200", isOpen && "rotate-180")} />
                    </a>
                    {isOpen && (
                      <div
                        className="absolute top-full left-[22.222%] z-50 bg-white border border-[#C5C4C2] border-t-0 shadow-lg p-0 font-sans text-black overflow-hidden animate-in fade-in-0 duration-100"
                        style={{ width: '55.556%' }}
                      >
                        <FeaturesMegaMenu />
                      </div>
                    )}
                  </div>
                )
              }

              if (type === 'mega-solutions') {
                const isOpen = openDropdownTitle === link.title
                return (
                  <div
                    key={link.title}
                    onMouseEnter={() => setOpenDropdownTitle(link.title)}
                    onMouseLeave={() => setOpenDropdownTitle(null)}
                    className="h-full flex items-center"
                  >
                    <a
                      href={getHref(link.href)}
                      className={cn(
                        "relative py-1 transition-colors font-bold flex items-center gap-1 cursor-pointer select-none group",
                        pathname.startsWith('/industries') ? "text-black font-extrabold" : (activeSection === 'solutions' ? "text-black" : "text-neutral-500 hover:text-black")
                      )}
                    >
                      <span className="absolute -left-2 top-0 text-[#00b259] font-bold opacity-0 group-hover:opacity-100 transition-opacity">┌</span>
                      <span className="absolute -right-2 bottom-0 text-[#00b259] font-bold opacity-0 group-hover:opacity-100 transition-opacity">┘</span>
                      {link.title}
                      <ChevronDown className={cn("size-3.5 transition-transform duration-200", isOpen && "rotate-180")} />
                    </a>
                    {isOpen && (
                      <div
                        className="absolute top-full left-[22.222%] z-50 bg-white border border-[#C5C4C2] border-t-0 shadow-lg p-0 font-sans text-black overflow-hidden animate-in fade-in-0 duration-100"
                        style={{ width: '55.556%' }}
                      >
                        <SolutionsMegaMenu />
                      </div>
                    )}
                  </div>
                )
              }

              if (type === 'dropdown') {
                const isOpen = openDropdownTitle === link.title
                let items = link.dropdownItems
                if ((!items || items.length === 0) && link.title.toLowerCase() === 'company') {
                  items = [
                    { title: "About Us", description: "Learn about our mission and story.", href: "/about" },
                    { title: "Contact Us", description: "Get in touch with our team.", href: "/contact" },
                    { title: "Careers", description: "Join us and build the future of AI.", href: "/careers" }
                  ]
                }

                return (
                  <DropdownMenu key={link.title} open={isOpen} onOpenChange={(val) => setOpenDropdownTitle(val ? link.title : null)}>
                    <div
                      onMouseEnter={() => setOpenDropdownTitle(link.title)}
                      onMouseLeave={() => setOpenDropdownTitle(null)}
                      className="h-full flex items-center"
                    >
                      <DropdownMenuTrigger asChild>
                        <a
                          href={getHref(link.href || '#')}
                          className={cn(
                            "relative py-1 transition-colors font-bold flex items-center gap-1 cursor-pointer select-none group",
                            isOpen ? "text-black" : "text-neutral-500 hover:text-black"
                          )}
                        >
                          <span className="absolute -left-2 top-0 text-[#00b259] font-bold opacity-0 group-hover:opacity-100 transition-opacity">┌</span>
                          <span className="absolute -right-2 bottom-0 text-[#00b259] font-bold opacity-0 group-hover:opacity-100 transition-opacity">┘</span>
                          {link.title}
                          <ChevronDown className={cn("size-3.5 transition-transform duration-200", isOpen && "rotate-180")} />
                        </a>
                      </DropdownMenuTrigger>
                      {items && items.length > 0 && (
                        <DropdownMenuContent
                          align="center"
                          sideOffset={14}
                          className="bg-white border border-[#C5C4C2] rounded-none shadow-lg p-1 w-64 font-sans text-black"
                          onMouseEnter={() => setOpenDropdownTitle(link.title)}
                          onMouseLeave={() => setOpenDropdownTitle(null)}
                        >
                          {items.map((item: any, idxItem: number) => (
                            <DropdownMenuItem key={idxItem} asChild>
                              <a
                                href={getHref(item.href)}
                                target={isExternal(item.href) ? "_blank" : undefined}
                                rel={isExternal(item.href) ? "noopener noreferrer" : undefined}
                                className="px-4 py-2 hover:bg-[#00b259]/10 text-xs text-neutral-600 transition-colors flex flex-col gap-0.5 border-b border-[#C5C4C2]/30 last:border-b-0 cursor-pointer"
                              >
                                <span className="font-bold flex items-center gap-1 text-black">
                                  <span className="text-[#00b259]">::</span> {item.title}
                                </span>
                                {item.description && (
                                  <span className="text-[10px] text-neutral-500 font-normal leading-normal">
                                    {item.description}
                                  </span>
                                )}
                              </a>
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      )}
                    </div>
                  </DropdownMenu>
                )
              }

              // Simple Link
              return (
                <a
                  key={link.title}
                  href={getHref(link.href)}
                  target={isExternal(link.href) ? "_blank" : undefined}
                  rel={isExternal(link.href) ? "noopener noreferrer" : undefined}
                  className={cn(
                    "relative py-1 transition-colors font-bold flex items-center gap-1.5 group",
                    pathname.startsWith(link.href) ? "text-black font-extrabold" : "text-neutral-500 hover:text-black"
                  )}
                >
                  <span className="absolute -left-2 top-0 text-[#00b259] font-bold opacity-0 group-hover:opacity-100 transition-opacity">┌</span>
                  <span className="absolute -right-2 bottom-0 text-[#00b259] font-bold opacity-0 group-hover:opacity-100 transition-opacity">┘</span>
                  {link.title}
                </a>
              )
            })}
          </div>
 
          {/* Book a Demo Button */}
          <div className="col-span-2 h-full flex items-center justify-end px-6 gap-4">
            <a
              href={getHref(navbarData.demoBtnLink || '#demo')}
              target={isExternal(navbarData.demoBtnLink) ? "_blank" : undefined}
              rel={isExternal(navbarData.demoBtnLink) ? "noopener noreferrer" : undefined}
              className="px-6 py-2 text-xs font-black text-white bg-gradient-to-r from-[#00b259] to-[#005c2b] hover:opacity-90 transition-opacity shadow-xs shrink-0"
              style={{
                clipPath: 'polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)'
              }}
            >
              {navbarData.demoBtnText || 'BOOK A DEMO'}
            </a>
          </div>
        </div>

        {/* Mobile Navigation Header */}
        <div className="lg:hidden flex h-16 items-center justify-between px-4 text-black font-sans relative z-10">
          <a href="/" className="hover:opacity-90 transition-opacity flex items-center gap-2">
            {navbarData.logoImageUrl ? (
              <img src={navbarData.logoImageUrl} alt={navbarData.logoText} className="h-8 max-w-[120px] object-contain" />
            ) : (
              <>
                <span className="bg-[#00b259] text-white rounded px-1.5 py-0.5 text-xs font-mono font-bold">GT</span>
                <span className="font-extrabold text-sm tracking-tight text-black">{navbarData.logoText || 'AI Greentick'}</span>
              </>
            )}
          </a>
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <button className="p-2 text-black hover:bg-black/5 rounded-md transition-colors cursor-pointer">
                <Menu className="size-6" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[85vw] sm:max-w-sm bg-white border-l border-[#C5C4C2] p-0 font-sans flex flex-col h-full z-[100] [&>button]:hidden">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <div className="flex h-16 items-center justify-between px-4 border-b border-[#C5C4C2] shrink-0">
                <a href="/" onClick={() => setMobileMenuOpen(false)} className="hover:opacity-90 transition-opacity flex items-center gap-2">
                  {navbarData.logoImageUrl ? (
                    <img src={navbarData.logoImageUrl} alt={navbarData.logoText} className="h-8 max-w-[120px] object-contain" />
                  ) : (
                    <>
                      <span className="bg-[#00b259] text-white rounded px-1.5 py-0.5 text-xs font-mono font-bold">GT</span>
                      <span className="font-extrabold text-sm tracking-tight text-black">{navbarData.logoText || 'AI Greentick'}</span>
                    </>
                  )}
                </a>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-black hover:bg-black/5 rounded-md transition-colors cursor-pointer"
                >
                  <X className="size-6" />
                </button>
              </div>
              
              <div className="flex-grow overflow-y-auto flex flex-col divide-y divide-[#C5C4C2] pb-6">
                {(navbarData.standaloneLinks || []).map((link: any) => {
                  let type = link.type
                  if (!type) {
                    const titleLower = link.title.toLowerCase()
                    if (titleLower === 'features') type = 'mega-features'
                    else if (titleLower === 'solutions') type = 'mega-solutions'
                    else if (titleLower === 'company') type = 'dropdown'
                    else type = 'link'
                  }

                  if (type === 'mega-features') {
                    const isOpen = mobileOpenDropdownTitle === link.title
                    return (
                      <div key={link.title} className="flex flex-col">
                        <button
                          onClick={() => setMobileOpenDropdownTitle(isOpen ? null : link.title)}
                          className="w-full text-left px-6 py-4 text-sm font-bold text-neutral-800 hover:bg-black/5 transition-colors flex items-center justify-between cursor-pointer"
                        >
                          <span className="flex items-center gap-1.5">
                            {activeSection === 'features' && <span className="text-[#00b259] font-bold">&gt;</span>}
                            {link.title}
                          </span>
                          <ChevronDown className={cn("size-4 transition-transform duration-200", isOpen && "rotate-180")} />
                        </button>
                        {isOpen && (
                          <div className="bg-neutral-50 flex flex-col divide-y divide-[#C5C4C2]/50 border-t border-[#C5C4C2]">
                            {features.map((feat: any) => (
                              <a
                                key={feat.id}
                                href={feat.link}
                                onClick={() => setMobileMenuOpen(false)}
                                className="px-6 pl-10 py-3 text-xs text-neutral-600 hover:bg-black/5 flex items-center gap-1.5"
                              >
                                <span className="text-[#00b259]">::</span> {feat.title}
                              </a>
                            ))}
                          </div>
                        )}
                      </div>
                    )
                  }

                  if (type === 'mega-solutions') {
                    const isOpen = mobileOpenDropdownTitle === link.title
                    return (
                      <div key={link.title} className="flex flex-col">
                        <button
                          onClick={() => setMobileOpenDropdownTitle(isOpen ? null : link.title)}
                          className="w-full text-left px-6 py-4 text-sm font-bold text-neutral-800 hover:bg-black/5 transition-colors flex items-center justify-between cursor-pointer"
                        >
                          <span className="flex items-center gap-1.5">
                            {(pathname.startsWith('/industries') || activeSection === 'solutions') && <span className="text-[#00b259] font-bold">&gt;</span>}
                            {link.title}
                          </span>
                          <ChevronDown className={cn("size-4 transition-transform duration-200", isOpen && "rotate-180")} />
                        </button>
                        {isOpen && (
                          <div className="bg-[#E4E3E0] flex flex-col divide-y divide-[#C5C4C2]/50 border-t border-[#C5C4C2]">
                            <div className="px-6 py-2 text-[9px] font-black text-neutral-400 bg-white tracking-wider text-left">
                              :: CONSUMER VERTICALS
                            </div>
                            {solutions.map((sol: any) => (
                              <a
                                key={sol.id}
                                href={`/industries/${sol.id}`}
                                onClick={() => setMobileMenuOpen(false)}
                                className="px-6 pl-10 py-3 text-xs text-neutral-700 hover:bg-black/5 flex items-center gap-1.5"
                              >
                                <span className="text-[#00b259]">::</span> {sol.title}
                              </a>
                            ))}
                          </div>
                        )}
                      </div>
                    )
                  }

                  if (type === 'dropdown') {
                    const isOpen = mobileOpenDropdownTitle === link.title
                    let items = link.dropdownItems
                    if ((!items || items.length === 0) && link.title.toLowerCase() === 'company') {
                      items = [
                        { title: "About Us", href: "/about" },
                        { title: "Contact Us", href: "/contact" },
                        { title: "Careers", href: "/careers" }
                      ]
                    }

                    return (
                      <div key={link.title} className="flex flex-col">
                        <button
                          onClick={() => setMobileOpenDropdownTitle(isOpen ? null : link.title)}
                          className="w-full text-left px-6 py-4 text-sm font-bold text-neutral-800 hover:bg-black/5 transition-colors flex items-center justify-between cursor-pointer"
                        >
                          <span className="flex items-center gap-1.5">
                            {link.title}
                          </span>
                          <ChevronDown className={cn("size-4 transition-transform duration-200", isOpen && "rotate-180")} />
                        </button>
                        {isOpen && items && items.length > 0 && (
                          <div className="bg-neutral-50 flex flex-col divide-y divide-[#C5C4C2]/50 border-t border-[#C5C4C2]">
                            {items.map((item: any, idxItem: number) => (
                              <a
                                key={idxItem}
                                href={getHref(item.href)}
                                target={isExternal(item.href) ? "_blank" : undefined}
                                rel={isExternal(item.href) ? "noopener noreferrer" : undefined}
                                onClick={() => setMobileMenuOpen(false)}
                                className="px-6 pl-10 py-3 text-xs text-neutral-600 hover:bg-black/5 flex items-center gap-1.5"
                              >
                                <span className="text-[#00b259]">::</span> {item.title}
                              </a>
                            ))}
                          </div>
                        )}
                      </div>
                    )
                  }

                  // Simple Link
                  return (
                    <a
                      key={link.title}
                      href={getHref(link.href)}
                      target={isExternal(link.href) ? "_blank" : undefined}
                      rel={isExternal(link.href) ? "noopener noreferrer" : undefined}
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        "px-6 py-4 text-sm font-bold transition-colors hover:bg-black/5 flex items-center justify-between",
                        pathname.startsWith(link.href) ? "text-[#00b259]" : "text-neutral-800"
                      )}
                    >
                      {link.title}
                    </a>
                  )
                })}

                {/* Mobile Book a Demo Button */}
                <div className="px-6 mt-auto pt-6 pb-6 flex justify-center">
                  <a
                    href={getHref(navbarData.demoBtnLink || '#demo')}
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full text-center py-3.5 text-xs font-black text-white bg-gradient-to-r from-[#00b259] to-[#005c2b] hover:opacity-90 transition-opacity shadow-xs"
                    style={{
                      clipPath: 'polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)'
                    }}
                  >
                    {navbarData.demoBtnText || 'BOOK A DEMO'}
                  </a>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

export default Header
