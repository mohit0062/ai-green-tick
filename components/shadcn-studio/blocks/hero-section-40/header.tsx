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
    if (isHomepage) return hash
    return hash.startsWith('#') ? `/${hash}` : hash
  }

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mobileFeaturesOpen, setMobileFeaturesOpen] = useState(false)
  const [mobileCompanyOpen, setMobileCompanyOpen] = useState(false)
  
  const [featuresOpen, setFeaturesOpen] = useState(false)
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
      <div 
        className="mx-auto max-w-7xl border border-[#C5C4C2] bg-[#ECEBE9] relative"
        style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 12px 100%, 0 calc(100% - 12px))' }}
      >
        {/* Desktop 9-Column Grid Navigation */}
        <div className="hidden lg:grid grid-cols-9 h-16 w-full items-center select-none text-black font-mono">
          
          {/* Col 1-2: Logo */}
          <div className="col-span-2 h-full border-r border-[#C5C4C2] flex items-center pl-6">
            <a href="/" className="hover:opacity-90 transition-opacity">
              <AiGreenTickLogo />
            </a>
          </div>

          {/* Col 3-7: Navigation Links */}
          <div className="col-span-5 h-full border-r border-[#C5C4C2] flex items-center justify-center gap-8 text-xs">
            
            {/* Features Dropdown Option */}
            <DropdownMenu open={featuresOpen} onOpenChange={setFeaturesOpen}>
              <div
                onMouseEnter={() => setFeaturesOpen(true)}
                onMouseLeave={() => setFeaturesOpen(false)}
                className="h-full flex items-center"
              >
                <DropdownMenuTrigger asChild>
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
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="center"
                  sideOffset={14}
                  className="bg-[#ECEBE9] border border-[#C5C4C2] rounded-none shadow-lg p-1 w-64 font-mono text-black"
                  onMouseEnter={() => setFeaturesOpen(true)}
                  onMouseLeave={() => setFeaturesOpen(false)}
                >
                  <DropdownMenuItem asChild>
                    <a
                      href={getHref('#features')}
                      className="px-4 py-2 hover:bg-[#00b259]/10 text-xs text-neutral-600 transition-colors flex flex-col gap-0.5 border-b border-[#C5C4C2]/30 last:border-b-0 cursor-pointer"
                    >
                      <span className="font-bold flex items-center gap-1 text-black">
                        <span className="text-[#00b259]">::</span> Shared Inbox
                      </span>
                      <span className="text-[10px] text-neutral-500 font-normal leading-normal">
                        Collaborate with your team on customer chats.
                      </span>
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <a
                      href={getHref('#features')}
                      className="px-4 py-2 hover:bg-[#00b259]/10 text-xs text-neutral-600 transition-colors flex flex-col gap-0.5 border-b border-[#C5C4C2]/30 last:border-b-0 cursor-pointer"
                    >
                      <span className="font-bold flex items-center gap-1 text-black">
                        <span className="text-[#00b259]">::</span> WhatsApp Broadcast
                      </span>
                      <span className="text-[10px] text-neutral-500 font-normal leading-normal">
                        Send bulk updates & campaigns easily.
                      </span>
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <a
                      href={getHref('#features')}
                      className="px-4 py-2 hover:bg-[#00b259]/10 text-xs text-neutral-600 transition-colors flex flex-col gap-0.5 border-b border-[#C5C4C2]/30 last:border-b-0 cursor-pointer"
                    >
                      <span className="font-bold flex items-center gap-1 text-black">
                        <span className="text-[#00b259]">::</span> Chatbot Builder
                      </span>
                      <span className="text-[10px] text-neutral-500 font-normal leading-normal">
                        Automate replies with a codeless editor.
                      </span>
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <a
                      href={getHref('#features')}
                      className="px-4 py-2 hover:bg-[#00b259]/10 text-xs text-neutral-600 transition-colors flex flex-col gap-0.5 cursor-pointer"
                    >
                      <span className="font-bold flex items-center gap-1 text-black">
                        <span className="text-[#00b259]">::</span> API & Integrations
                      </span>
                      <span className="text-[10px] text-neutral-500 font-normal leading-normal">
                        Connect with CRM, Shopify, Zoho & more.
                      </span>
                    </a>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </div>
            </DropdownMenu>

            {/* Solutions Link */}
            <a
              href={getHref('#solutions')}
              className={cn(
                "relative py-1 transition-colors font-bold flex items-center gap-1.5",
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
            </a>

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
                  className="bg-[#ECEBE9] border border-[#C5C4C2] rounded-none shadow-lg p-1 w-64 font-mono text-black"
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
                  <DropdownMenuItem asChild>
                    <a
                      href={getHref('#faq')}
                      className="px-4 py-2 hover:bg-[#00b259]/10 text-xs text-neutral-600 transition-colors flex flex-col gap-0.5 cursor-pointer"
                    >
                      <span className="font-bold flex items-center gap-1 text-black">
                        <span className="text-[#00b259]">::</span> Trust Center
                      </span>
                      <span className="text-[10px] text-neutral-500 font-normal leading-normal">
                        Security, compliance, and systems.
                      </span>
                    </a>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </div>
            </DropdownMenu>

          </div>

          {/* Col 8-9: Ecosystem & Book a Demo Button */}
          <div className="col-span-2 h-full flex items-center justify-between px-6 gap-4">
            <a
              href={getHref('#faq')}
              className="flex items-center gap-1.5 text-xs font-bold text-neutral-500 hover:text-black transition-colors"
            >
              <span className="text-[#00b259] font-bold tracking-tight">::</span> Ecosystem
            </a>
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
        <div className="lg:hidden flex h-16 items-center justify-between px-4 text-black font-mono">
          <a href="/" className="hover:opacity-90 transition-opacity">
            <AiGreenTickLogo />
          </a>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-black hover:bg-black/5 rounded-md transition-colors"
          >
            {mobileMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden absolute top-16 left-0 right-0 bg-[#ECEBE9] border-b border-[#C5C4C2] z-50 flex flex-col divide-y divide-[#C5C4C2] border-t border-[#C5C4C2] font-mono">
            
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
                    href={getHref('#features')}
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-10 py-3 text-xs text-neutral-600 hover:bg-black/5 flex items-center gap-1.5"
                  >
                    <span className="text-[#00b259]">::</span> Shared Inbox
                  </a>
                  <a
                    href={getHref('#features')}
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-10 py-3 text-xs text-neutral-600 hover:bg-black/5 flex items-center gap-1.5"
                  >
                    <span className="text-[#00b259]">::</span> WhatsApp Broadcast
                  </a>
                  <a
                    href={getHref('#features')}
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-10 py-3 text-xs text-neutral-600 hover:bg-black/5 flex items-center gap-1.5"
                  >
                    <span className="text-[#00b259]">::</span> Chatbot Builder
                  </a>
                  <a
                    href={getHref('#features')}
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-10 py-3 text-xs text-neutral-600 hover:bg-black/5 flex items-center gap-1.5"
                  >
                    <span className="text-[#00b259]">::</span> API & Integrations
                  </a>
                </div>
              )}
            </div>

            {/* Solutions Mobile Option */}
            <a
              href={getHref('#solutions')}
              onClick={() => setMobileMenuOpen(false)}
              className="px-6 py-4 text-sm font-bold text-neutral-800 hover:bg-black/5 transition-colors flex items-center gap-1.5"
            >
              {(pathname.startsWith('/industries') || activeSection === 'solutions') && <span className="text-[#00b259] font-bold">&gt;</span>}
              Solutions
            </a>

            {/* Pricing Mobile Option */}
            <a
              href={getHref('#pricing')}
              onClick={() => setMobileMenuOpen(false)}
              className="px-6 py-4 text-sm font-bold text-neutral-800 hover:bg-black/5 transition-colors flex items-center gap-1.5"
            >
              {(pathname.startsWith('/pricing') || activeSection === 'pricing') && <span className="text-[#00b259] font-bold">&gt;</span>}
              Pricing
            </a>

            {/* Blog Mobile Option */}
            <a
              href={getHref('#blog')}
              onClick={() => setMobileMenuOpen(false)}
              className="px-6 py-4 text-sm font-bold text-neutral-800 hover:bg-black/5 transition-colors flex items-center gap-1.5"
            >
              {pathname.startsWith('/blog') && <span className="text-[#00b259] font-bold">&gt;</span>}
              Blog
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
                    className="px-10 py-3 text-xs text-neutral-600 hover:bg-black/5 flex items-center gap-1.5"
                  >
                    <span className="text-[#00b259]">::</span> About Us
                  </a>
                  <a
                    href={getHref('#contact')}
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-10 py-3 text-xs text-neutral-600 hover:bg-black/5 flex items-center gap-1.5"
                  >
                    <span className="text-[#00b259]">::</span> Contact Us
                  </a>
                  <a
                    href={getHref('#careers')}
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-10 py-3 text-xs text-neutral-600 hover:bg-black/5 flex items-center gap-1.5"
                  >
                    <span className="text-[#00b259]">::</span> Careers
                  </a>
                  <a
                    href={getHref('#faq')}
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-10 py-3 text-xs text-neutral-600 hover:bg-black/5 flex items-center gap-1.5"
                  >
                    <span className="text-[#00b259]">::</span> Trust Center
                  </a>
                </div>
              )}
            </div>

            {/* Ecosystem Option */}
            <a
              href={getHref('#faq')}
              onClick={() => setMobileMenuOpen(false)}
              className="px-6 py-4 text-sm font-bold text-neutral-800 hover:bg-black/5 transition-colors flex items-center gap-1.5"
            >
              <span className="text-[#00b259] font-bold">::</span> Ecosystem
            </a>

            {/* Book a Demo Option */}
            <div className="px-6 py-4 flex justify-center">
              <a
                href={getHref('#demo')}
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-3 text-xs font-black text-white bg-gradient-to-r from-[#00b259] to-[#005c2b] hover:opacity-90 transition-opacity shadow-xs"
                style={{
                  clipPath: 'polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)'
                }}
              >
                BOOK A DEMO
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
