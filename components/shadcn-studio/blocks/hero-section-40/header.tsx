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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { SolutionsMegaMenu } from './solutions-mega-menu'
import { FeaturesMegaMenu } from './features-mega-menu'

type HeaderProps = {
  className?: string
  navigationData?: Navigation[]
}

const Header = ({ className, navigationData }: HeaderProps) => {
  const pathname = usePathname()
  const isHomepage = pathname === '/'

  const getHref = (hash: string) => {
    if (hash === '#blog') return '/blog'
    if (hash === '#pricing') return '/pricing'
    if (hash === '#solutions') return '/industries'
    if (hash === '#about') return '/about'
    if (hash === '#careers') return '/careers'
    if (hash === '#contact') return '/contact'
    if (isHomepage) return hash
    return hash.startsWith('#') ? `/${hash}` : hash
  }

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mobileFeaturesOpen, setMobileFeaturesOpen] = useState(false)
  const [mobileSolutionsOpen, setMobileSolutionsOpen] = useState(false)
  const [mobileCompanyOpen, setMobileCompanyOpen] = useState(false)
  
  const [featuresOpen, setFeaturesOpen] = useState(false)
  const [solutionsOpen, setSolutionsOpen] = useState(false)
  const [companyOpen, setCompanyOpen] = useState(false)
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
    <header className={cn('w-full bg-[#ECEBE9] z-50 sticky top-0 py-2 px-4 sm:px-6 lg:px-8', className)}>
      <div className="mx-auto max-w-7xl relative">
        {/* Background layer with clip-path and border */}
        <div 
          className="absolute inset-0 border border-[#C5C4C2] bg-[#ECEBE9] pointer-events-none z-0"
          style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 12px 100%, 0 calc(100% - 12px))' }}
        />
        {/* Desktop 9-Column Grid Navigation */}
        <div className="hidden lg:grid grid-cols-9 h-16 w-full items-center select-none text-black font-sans relative z-10">
          
          {/* Col 1-2: Logo */}
          <div className="col-span-2 h-full border-r border-[#C5C4C2] flex items-center pl-6">
            <a href="/" className="hover:opacity-90 transition-opacity">
              <AiGreenTickLogo />
            </a>
          </div>
 
          {/* Col 3-7: Navigation Links */}
          <div className="col-span-5 h-full border-r border-[#C5C4C2] flex items-center justify-center gap-8 text-xs">
            
            {/* Features Option */}
            <div
              onMouseEnter={() => setFeaturesOpen(true)}
              onMouseLeave={() => setFeaturesOpen(false)}
              className="h-full flex items-center"
            >
              <a
                href={getHref('#features')}
                className={cn(
                  "relative py-1 transition-colors font-bold flex items-center gap-1 cursor-pointer select-none",
                  activeSection === 'features' ? "text-black" : "text-neutral-500 hover:text-black"
                )}
              >
                {activeSection === 'features' && (
                  <>
                    <span className="absolute -left-2 top-0 text-[#00b259] font-bold">┌</span>
                    <span className="absolute -right-2 bottom-0 text-[#00b259] font-bold">┘</span>
                  </>
                )}
                Features
                <ChevronDown className={cn("size-3.5 transition-transform duration-200", featuresOpen && "rotate-180")} />
              </a>
              {featuresOpen && (
                <div
                  className="absolute top-full left-[22.222%] z-50 bg-[#ECEBE9] border border-[#C5C4C2] border-t-0 shadow-lg p-0 font-sans text-black overflow-hidden animate-in fade-in-0 duration-100"
                  style={{ width: '55.556%' }}
                >
                  <FeaturesMegaMenu />
                </div>
              )}
            </div>

            {/* Solutions Option */}
            <div
              onMouseEnter={() => setSolutionsOpen(true)}
              onMouseLeave={() => setSolutionsOpen(false)}
              className="h-full flex items-center"
            >
              <a
                href={getHref('#solutions')}
                className={cn(
                  "relative py-1 transition-colors font-bold flex items-center gap-1 cursor-pointer select-none",
                  pathname.startsWith('/industries') ? "text-black font-extrabold" : (activeSection === 'solutions' ? "text-black" : "text-neutral-500 hover:text-black")
                )}
              >
                {(pathname.startsWith('/industries') || activeSection === 'solutions') && (
                  <>
                    <span className="absolute -left-2 top-0 text-[#00b259] font-bold">┌</span>
                    <span className="absolute -right-2 bottom-0 text-[#00b259] font-bold">┘</span>
                  </>
                )}
                Solutions
                <ChevronDown className={cn("size-3.5 transition-transform duration-200", solutionsOpen && "rotate-180")} />
              </a>
              {solutionsOpen && (
                <div
                  className="absolute top-full left-[22.222%] z-50 bg-[#ECEBE9] border border-[#C5C4C2] border-t-0 shadow-lg p-0 font-sans text-black overflow-hidden animate-in fade-in-0 duration-100"
                  style={{ width: '55.556%' }}
                >
                  <SolutionsMegaMenu />
                </div>
              )}
            </div>

            {/* Pricing Link */}
            <a
              href={getHref('#pricing')}
              className={cn(
                "relative py-1 transition-colors font-bold flex items-center gap-1.5",
                pathname.startsWith('/pricing') ? "text-black font-extrabold" : (activeSection === 'pricing' ? "text-black" : "text-neutral-500 hover:text-black")
              )}
            >
              {(pathname.startsWith('/pricing') || activeSection === 'pricing') && (
                <>
                  <span className="absolute -left-2 top-0 text-[#00b259] font-bold">┌</span>
                  <span className="absolute -right-2 bottom-0 text-[#00b259] font-bold">┘</span>
                </>
              )}
              Pricing
            </a>

            {/* Blog Link */}
            <a
              href={getHref('#blog')}
              className={cn(
                "relative py-1 transition-colors font-bold flex items-center gap-1.5",
                pathname.startsWith('/blog') ? "text-black font-extrabold" : (activeSection === 'blog' ? "text-black" : "text-neutral-500 hover:text-black")
              )}
            >
              {(pathname.startsWith('/blog') || activeSection === 'blog') && (
                <>
                  <span className="absolute -left-2 top-0 text-[#00b259] font-bold">┌</span>
                  <span className="absolute -right-2 bottom-0 text-[#00b259] font-bold">┘</span>
                </>
              )}
              Blog
            </a>

            {/* Company Dropdown Option */}
            <DropdownMenu open={companyOpen} onOpenChange={setCompanyOpen}>
              <div
                onMouseEnter={() => setCompanyOpen(true)}
                onMouseLeave={() => setCompanyOpen(false)}
                className="h-full flex items-center"
              >
                <DropdownMenuTrigger asChild>
                  <a
                    href={getHref('#about')}
                    className={cn(
                      "relative py-1 transition-colors font-bold flex items-center gap-1 cursor-pointer select-none",
                      (activeSection === 'about' || activeSection === 'contact') ? "text-black" : "text-neutral-500 hover:text-black"
                    )}
                  >
                    {(activeSection === 'about' || activeSection === 'contact') && (
                      <>
                        <span className="absolute -left-2 top-0 text-[#00b259] font-bold">┌</span>
                        <span className="absolute -right-2 bottom-0 text-[#00b259] font-bold">┘</span>
                      </>
                    )}
                    Company
                    <ChevronDown className={cn("size-3.5 transition-transform duration-200", companyOpen && "rotate-180")} />
                  </a>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="center"
                  sideOffset={14}
                  className="bg-[#ECEBE9] border border-[#C5C4C2] rounded-none shadow-lg p-1 w-64 font-sans text-black"
                  onMouseEnter={() => setCompanyOpen(true)}
                  onMouseLeave={() => setCompanyOpen(false)}
                >
                  <DropdownMenuItem asChild>
                    <a
                      href={getHref('#about')}
                      className="px-4 py-2 hover:bg-[#00b259]/10 text-xs text-neutral-600 transition-colors flex flex-col gap-0.5 border-b border-[#C5C4C2]/30 last:border-b-0 cursor-pointer"
                    >
                      <span className="font-bold flex items-center gap-1 text-black">
                        <span className="text-[#00b259]">::</span> About Us
                      </span>
                      <span className="text-[10px] text-neutral-500 font-normal leading-normal">
                        Learn about our mission and story.
                      </span>
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <a
                      href={getHref('#contact')}
                      className="px-4 py-2 hover:bg-[#00b259]/10 text-xs text-neutral-600 transition-colors flex flex-col gap-0.5 border-b border-[#C5C4C2]/30 last:border-b-0 cursor-pointer"
                    >
                      <span className="font-bold flex items-center gap-1 text-black">
                        <span className="text-[#00b259]">::</span> Contact Us
                      </span>
                      <span className="text-[10px] text-neutral-500 font-normal leading-normal">
                        Get in touch with our team.
                      </span>
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <a
                      href={getHref('#careers')}
                      className="px-4 py-2 hover:bg-[#00b259]/10 text-xs text-neutral-600 transition-colors flex flex-col gap-0.5 border-b border-[#C5C4C2]/30 last:border-b-0 cursor-pointer"
                    >
                      <span className="font-bold flex items-center gap-1 text-black">
                        <span className="text-[#00b259]">::</span> Careers
                      </span>
                      <span className="text-[10px] text-neutral-500 font-normal leading-normal">
                        Join us and build the future of AI.
                      </span>
                    </a>
                  </DropdownMenuItem>

                </DropdownMenuContent>
              </div>
            </DropdownMenu>

          </div>

          {/* Col 8-9: Book a Demo Button */}
          <div className="col-span-2 h-full flex items-center justify-end px-6 gap-4">

            <a
              href={getHref('#demo')}
              className="px-6 py-2 text-xs font-black text-white bg-gradient-to-r from-[#00b259] to-[#005c2b] hover:opacity-90 transition-opacity shadow-xs shrink-0"
              style={{
                clipPath: 'polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)'
              }}
            >
              BOOK A DEMO
            </a>
          </div>
        </div>



        {/* Mobile Navigation Header */}
        <div className="lg:hidden flex h-16 items-center justify-between px-4 text-black font-sans relative z-10">
          <a href="/" className="hover:opacity-90 transition-opacity">
            <AiGreenTickLogo />
          </a>
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <button
                className="p-2 text-black hover:bg-black/5 rounded-md transition-colors cursor-pointer"
              >
                <Menu className="size-6" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[85vw] sm:max-w-sm bg-[#ECEBE9] border-l border-[#C5C4C2] p-0 font-sans flex flex-col h-full z-[100] [&>button]:hidden">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <div className="flex h-16 items-center justify-between px-4 border-b border-[#C5C4C2] shrink-0">
                <a href="/" onClick={() => setMobileMenuOpen(false)} className="hover:opacity-90 transition-opacity">
                  <AiGreenTickLogo />
                </a>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-black hover:bg-black/5 rounded-md transition-colors cursor-pointer"
                >
                  <X className="size-6" />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto flex flex-col divide-y divide-[#C5C4C2] pb-6">
            
            {/* Features Mobile Option */}
            <div className="flex flex-col">
              <button
                onClick={() => setMobileFeaturesOpen(!mobileFeaturesOpen)}
                className="w-full text-left px-6 py-4 text-sm font-bold text-neutral-800 hover:bg-black/5 transition-colors flex items-center justify-between cursor-pointer"
              >
                <span className="flex items-center gap-1.5">
                  {activeSection === 'features' && <span className="text-[#00b259] font-bold">&gt;</span>}
                  Features
                </span>
                <ChevronDown className={cn("size-4 transition-transform duration-200", mobileFeaturesOpen && "rotate-180")} />
              </button>
              {mobileFeaturesOpen && (
                <div className="bg-[#E4E3E0] flex flex-col divide-y divide-[#C5C4C2]/50 border-t border-[#C5C4C2]">
                  <a
                    href="/team-inbox"
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-6 pl-10 py-3 text-xs text-neutral-600 hover:bg-black/5 flex items-center gap-1.5"
                  >
                    <span className="text-[#00b259]">::</span> Unified Inbox
                  </a>
                  <a
                    href={getHref('#about')}
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-6 pl-10 py-3 text-xs text-neutral-600 hover:bg-black/5 flex items-center gap-1.5"
                  >
                    <span className="text-[#00b259]">::</span> Ads Manager
                  </a>
                  <a
                    href={getHref('#about')}
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-6 pl-10 py-3 text-xs text-neutral-600 hover:bg-black/5 flex items-center gap-1.5"
                  >
                    <span className="text-[#00b259]">::</span> WhatsApp Broadcasting
                  </a>
                  <a
                    href={getHref('#about')}
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-6 pl-10 py-3 text-xs text-neutral-600 hover:bg-black/5 flex items-center gap-1.5"
                  >
                    <span className="text-[#00b259]">::</span> Campaign Drips
                  </a>
                  <a
                    href={getHref('#about')}
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-6 pl-10 py-3 text-xs text-neutral-600 hover:bg-black/5 flex items-center gap-1.5"
                  >
                    <span className="text-[#00b259]">::</span> Chatbot Builder
                  </a>
                  <a
                    href={getHref('#about')}
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-6 pl-10 py-3 text-xs text-neutral-600 hover:bg-black/5 flex items-center gap-1.5"
                  >
                    <span className="text-[#00b259]">::</span> AI Analytics
                  </a>
                </div>
              )}
            </div>

            {/* Solutions Mobile Option */}
            <div className="flex flex-col">
              <button
                onClick={() => setMobileSolutionsOpen(!mobileSolutionsOpen)}
                className="w-full text-left px-6 py-4 text-sm font-bold text-neutral-800 hover:bg-black/5 transition-colors flex items-center justify-between cursor-pointer"
              >
                <span className="flex items-center gap-1.5">
                  {(pathname.startsWith('/industries') || activeSection === 'solutions') && <span className="text-[#00b259] font-bold">&gt;</span>}
                  Solutions
                </span>
                <ChevronDown className={cn("size-4 transition-transform duration-200", mobileSolutionsOpen && "rotate-180")} />
              </button>
              {mobileSolutionsOpen && (
                <div className="bg-[#E4E3E0] flex flex-col divide-y divide-[#C5C4C2]/50 border-t border-[#C5C4C2]">
                  {/* Consumer Verticals */}
                  <div className="px-6 py-2 text-[9px] font-black text-neutral-400 bg-[#ECEBE9] tracking-wider text-left">
                    :: CONSUMER VERTICALS
                  </div>
                  <a
                    href="/industries/ecommerce"
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-6 pl-10 py-3 text-xs text-neutral-700 hover:bg-black/5 flex items-center gap-1.5"
                  >
                    <span className="text-[#00b259]">::</span> eCommerce & Retail
                  </a>
                  <a
                    href="/industries/realestate"
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-6 pl-10 py-3 text-xs text-neutral-700 hover:bg-black/5 flex items-center gap-1.5"
                  >
                    <span className="text-[#00b259]">::</span> Real Estate
                  </a>
                  <a
                    href="/industries/travel"
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-6 pl-10 py-3 text-xs text-neutral-700 hover:bg-black/5 flex items-center gap-1.5"
                  >
                    <span className="text-[#00b259]">::</span> Travel & Hospitality
                  </a>
                  
                  {/* Professional Services */}
                  <div className="px-6 py-2 text-[9px] font-black text-neutral-400 bg-[#ECEBE9] tracking-wider border-t border-[#C5C4C2]/50 text-left">
                    :: PROFESSIONAL SERVICES
                  </div>
                  <a
                    href="/industries/healthcare"
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-6 pl-10 py-3 text-xs text-neutral-700 hover:bg-black/5 flex items-center gap-1.5"
                  >
                    <span className="text-[#00b259]">::</span> Healthcare & Wellness
                  </a>
                  <a
                    href="/industries/education"
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-6 pl-10 py-3 text-xs text-neutral-700 hover:bg-black/5 flex items-center gap-1.5"
                  >
                    <span className="text-[#00b259]">::</span> Education & EdTech
                  </a>
                  <a
                    href="/industries/finance"
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-6 pl-10 py-3 text-xs text-neutral-700 hover:bg-black/5 flex items-center gap-1.5"
                  >
                    <span className="text-[#00b259]">::</span> Banking & Finance
                  </a>
                </div>
              )}
            </div>

            {/* Pricing Mobile Option */}
            <a
              href={getHref('#pricing')}
              onClick={() => setMobileMenuOpen(false)}
              className="px-6 py-4 text-sm font-bold text-neutral-800 hover:bg-black/5 transition-colors flex items-center justify-between"
            >
              <span className="flex items-center gap-1.5">
                {(pathname.startsWith('/pricing') || activeSection === 'pricing') && <span className="text-[#00b259] font-bold">&gt;</span>}
                Pricing
              </span>
            </a>

            {/* Blog Mobile Option */}
            <a
              href={getHref('#blog')}
              onClick={() => setMobileMenuOpen(false)}
              className="px-6 py-4 text-sm font-bold text-neutral-800 hover:bg-black/5 transition-colors flex items-center justify-between"
            >
              <span className="flex items-center gap-1.5">
                {pathname.startsWith('/blog') && <span className="text-[#00b259] font-bold">&gt;</span>}
                Blog
              </span>
            </a>

            {/* Company Mobile Option */}
            <div className="flex flex-col">
              <button
                onClick={() => setMobileCompanyOpen(!mobileCompanyOpen)}
                className="w-full text-left px-6 py-4 text-sm font-bold text-neutral-800 hover:bg-black/5 transition-colors flex items-center justify-between cursor-pointer"
              >
                <span className="flex items-center gap-1.5">
                  {(activeSection === 'about' || activeSection === 'contact') && <span className="text-[#00b259] font-bold">&gt;</span>}
                  Company
                </span>
                <ChevronDown className={cn("size-4 transition-transform duration-200", mobileCompanyOpen && "rotate-180")} />
              </button>
              {mobileCompanyOpen && (
                <div className="bg-[#E4E3E0] flex flex-col divide-y divide-[#C5C4C2]/50 border-t border-[#C5C4C2]">
                  <a
                    href={getHref('#about')}
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-6 pl-10 py-3 text-xs text-neutral-600 hover:bg-black/5 flex items-center gap-1.5"
                  >
                    <span className="text-[#00b259]">::</span> About Us
                  </a>
                  <a
                    href={getHref('#contact')}
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-6 pl-10 py-3 text-xs text-neutral-600 hover:bg-black/5 flex items-center gap-1.5"
                  >
                    <span className="text-[#00b259]">::</span> Contact Us
                  </a>
                  <a
                    href={getHref('#careers')}
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-6 pl-10 py-3 text-xs text-neutral-600 hover:bg-black/5 flex items-center gap-1.5"
                  >
                    <span className="text-[#00b259]">::</span> Careers
                  </a>
                </div>
              )}
            </div>



            {/* Book a Demo Option */}
            <div className="px-6 mt-auto pt-6 pb-6 flex justify-center">
              <a
                href={getHref('#demo')}
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-3.5 text-xs font-black text-white bg-gradient-to-r from-[#00b259] to-[#005c2b] hover:opacity-90 transition-opacity shadow-xs"
                style={{
                  clipPath: 'polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)'
                }}
              >
                BOOK A DEMO
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
