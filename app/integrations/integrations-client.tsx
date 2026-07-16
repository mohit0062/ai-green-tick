'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { Search, Zap, ArrowRight, ShieldCheck, HelpCircle } from 'lucide-react'
import Header from '@/components/shadcn-studio/blocks/hero-section-40/header'
import Breadcrumb from '@/components/ui/breadcrumb'
import Footer from '@/components/shadcn-studio/blocks/footer/footer'
import type { Navigation } from '@/components/shadcn-studio/blocks/hero-section-40/hero-navigation'
import { cn } from '@/lib/utils'

const navigationData: Navigation[] = [
  {
    title: 'Features',
    href: '/#features'
  },
  {
    title: 'Use cases',
    contentClassName: '!w-141 grid-cols-2',
    splitItems: true,
    items: [
      {
        type: 'section',
        title: 'Sales & Customer Operations',
        items: [
          {
            title: 'Pipeline Management',
            href: '/#features',
            description: 'Track movement, update statuses, and flag stalled deals.',
            icon: <HelpCircle className='size-4' />
          },
          {
            title: 'Customer Onboarding',
            href: '/#features',
            description: 'Automate welcome emails, account setup, and key guidance.',
            icon: <HelpCircle className='size-4' />
          },
          {
            title: 'Support Escalations',
            href: '/#features',
            description: 'Detect urgency and route issues to the right team faster.',
            icon: <HelpCircle className='size-4' />
          }
        ]
      },
      {
        type: 'section',
        title: 'Internal Productivity Workflows',
        items: [
          {
            title: 'Knowledge Retrieval',
            href: '/#features',
            description: 'Ask AI and get instant answers from your tools/docs.',
            icon: <HelpCircle className='size-4' />
          },
          {
            title: 'Task Automation',
            href: '/#features',
            description: 'Convert messages into tasks and assign them automatically.',
            icon: <HelpCircle className='size-4' />
          },
          {
            title: 'Data Cleanup',
            href: '/#features',
            description: 'Auto-correct entries, remove duplicates, sync records.',
            icon: <HelpCircle className='size-4' />
          }
        ]
      }
    ]
  },
  {
    title: 'Team Inbox',
    href: '/team-inbox'
  },
  {
    title: 'Testimonials',
    href: '/#testimonials'
  },
  {
    title: 'Pricing',
    href: '/pricing'
  }
]

type Integration = {
  id: string
  name: string
  category: 'crm' | 'ecommerce' | 'payments' | 'automation' | 'support' | 'marketing'
  description: string
  logoColor: string
  logoSvg: string
  docLink?: string
  setupTime?: string
  difficulty?: string
  requirements?: string
}

interface IntegrationsClientProps {
  initialData: any
}

export default function IntegrationsClient({ initialData }: IntegrationsClientProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState<string>('all')
  const [openFaqs, setOpenFaqs] = useState<Record<number, boolean>>({})

  const toggleFaq = (idx: number) => {
    setOpenFaqs(prev => ({ ...prev, [idx]: !prev[idx] }))
  }

  const categories = [
    { value: 'all', name: 'All Integrations' },
    { value: 'crm', name: 'CRM' },
    { value: 'ecommerce', name: 'E-Commerce' },
    { value: 'payments', name: 'Payments' },
    { value: 'automation', name: 'Automation' },
    { value: 'support', name: 'Support' },
    { value: 'marketing', name: 'Marketing' }
  ]

  const integrations: Integration[] = initialData.integrationsList || []

  const filteredIntegrations = useMemo(() => {
    return integrations.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            item.description.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = activeCategory === 'all' || item.category === activeCategory
      return matchesSearch && matchesCategory
    })
  }, [searchQuery, activeCategory, integrations])

  return (
    <div className="flex flex-col min-h-screen bg-[#ECEBE9] text-black">
      {/* Navigation Header */}
      <Header navigationData={navigationData} />
      <Breadcrumb />

      {/* Hero Section */}
      <section className="px-4 sm:px-6 lg:px-8 border-b border-[#C5C4C2]">
        <div className="mx-auto max-w-7xl border-x border-[#C5C4C2] px-4 sm:px-6 lg:px-8 py-12 sm:py-20 text-center space-y-6">
          <span className="inline-block px-3 py-1 text-xs font-bold text-[#00b259] border border-[#00b259] bg-[#00b259]/10 font-mono tracking-wider">
            {initialData.hero?.badgeText || ':: APP INTEGRATIONS ::'}
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display tracking-tight leading-none text-black">
            {initialData.hero?.heading || 'Integrate WhatsApp with your Favorite Tools'}
          </h1>
          <p className="text-neutral-500 max-w-2xl mx-auto text-base font-sans leading-relaxed">
            {initialData.hero?.description || 'Connect AIGreenTick with over 2000+ CRMs, e-commerce stores, payment gateways, and productivity apps to automate your marketing, sales, and support workflows.'}
          </p>
        </div>
      </section>

      {/* AI Snapshot Section */}
      {initialData.aiSnapshot && (
        <section className="px-4 sm:px-6 lg:px-8 border-b border-[#C5C4C2] bg-white py-6">
          <div 
            className="mx-auto max-w-4xl border border-[#C5C4C2] bg-[#ECEBE9]/20 p-5 relative"
            style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 0 calc(100% - 8px))' }}
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <span className="inline-block px-2 py-0.5 text-[9px] font-mono font-bold text-[#00b259] border border-[#00b259]/30 bg-[#00b259]/5 uppercase tracking-wide shrink-0">
                ⚡ AI Quick Summary
              </span>
              <p className="text-neutral-750 font-sans text-xs leading-relaxed font-medium text-left">
                {initialData.aiSnapshot}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Controls & Search Bar Section */}
      <section className="px-4 sm:px-6 lg:px-8 border-b border-[#C5C4C2] bg-[#ECEBE9]/30">
        <div className="mx-auto max-w-7xl border-x border-[#C5C4C2] px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
            {categories.map(cat => {
              const isActive = activeCategory === cat.value
              return (
                <button
                  key={cat.value}
                  onClick={() => setActiveCategory(cat.value)}
                  className={`px-3 py-1.5 text-xs font-bold font-sans cursor-pointer transition-colors border select-none ${
                    isActive 
                      ? 'bg-black text-[#ECEBE9] border-black' 
                      : 'bg-white hover:bg-neutral-50 text-neutral-500 hover:text-black border-[#C5C4C2]'
                  }`}
                >
                  {cat.name}
                </button>
              )
            })}
          </div>

          {/* Search Box Input */}
          <div className="relative w-full md:w-80">
            <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-neutral-400">
              <Search className="size-4" />
            </span>
            <input
              type="text"
              placeholder="Search integrations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-1.5 text-xs font-medium font-sans bg-white border border-[#C5C4C2] focus:outline-none focus:border-black text-black placeholder-neutral-400"
            />
          </div>

        </div>
      </section>

      {/* Grid of Integration Cards */}
      <section className="px-4 sm:px-6 lg:px-8 border-b border-[#C5C4C2] bg-[#ECEBE9]/10 py-12 sm:py-20 flex-grow">
        <div className="mx-auto max-w-7xl border-x border-[#C5C4C2] px-4 sm:px-6 lg:px-8 space-y-12">
          
          {filteredIntegrations.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredIntegrations.map(item => (
                <div
                  key={item.id}
                  className="border border-[#C5C4C2] bg-white p-6 flex flex-col justify-between group relative shadow-xs hover:shadow-md transition-all duration-300 animate-in fade-in zoom-in-95"
                  style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 10px 100%, 0 calc(100% - 10px))' }}
                >
                  <div className="space-y-4">
                    {/* Top Row: App Icon Badge + Category Label */}
                    <div className="flex items-center justify-between">
                      <div className={cn("p-2.5 border rounded-lg shrink-0 flex items-center justify-center size-13", item.logoColor)}>
                        {typeof item.logoSvg === 'string' && item.logoSvg.startsWith('<svg') ? (
                          <div className="size-8 [&>svg]:size-full flex items-center justify-center" dangerouslySetInnerHTML={{ __html: item.logoSvg }} />
                        ) : (
                          <img src={item.logoSvg || '/logo-icon.png'} className="size-8 object-contain" alt={item.name} />
                        )}
                      </div>
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-neutral-400 bg-neutral-100 px-2 py-0.5 border border-[#C5C4C2]/30">
                        {item.category}
                      </span>
                    </div>

                    {/* App Title & Description */}
                    <div className="space-y-2 text-left">
                      <h3 className="text-lg font-black text-black font-display">
                        {item.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-neutral-500 font-sans leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    {/* Structured Metadata Badges (AGO optimized) */}
                    {(item.setupTime || item.difficulty) && (
                      <div className="flex flex-wrap items-center gap-1.5 pt-2 text-left">
                        {item.setupTime && (
                          <span className="inline-block px-2 py-0.5 text-[9px] font-mono font-bold text-neutral-500 bg-neutral-100 border border-neutral-200">
                            ⏱️ {item.setupTime}
                          </span>
                        )}
                        {item.difficulty && (
                          <span className={cn(
                            "inline-block px-2 py-0.5 text-[9px] font-mono font-bold border",
                            item.difficulty === 'No-Code' 
                              ? "bg-[#00b259]/5 text-[#00b259] border-[#00b259]/20"
                              : "bg-blue-50 text-blue-600 border-blue-100"
                          )}>
                            ⚡ {item.difficulty}
                          </span>
                        )}
                        {item.requirements && (
                          <span className="inline-block px-2 py-0.5 text-[9px] font-mono font-medium text-neutral-400 truncate max-w-full">
                            Req: {item.requirements}
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Connect / Docs Action Link */}
                  <div className="pt-6 mt-4 border-t border-[#C5C4C2]/40 flex items-center justify-between text-left">
                    <span className="text-[10px] font-mono font-bold text-neutral-400 flex items-center gap-1">
                      <ShieldCheck className="size-3 text-[#00b259]" /> Verified Secure
                    </span>
                    <Link
                      href="/#demo"
                      className="text-xs font-black text-[#00b259] hover:text-[#008c45] transition-colors flex items-center gap-1"
                    >
                      Connect <ArrowRight className="size-3 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 space-y-4">
              <div className="size-12 rounded-full bg-neutral-200/50 flex items-center justify-center mx-auto text-neutral-400">
                <Search className="size-5" />
              </div>
              <p className="text-sm font-sans text-neutral-500">
                No integrations found matching your search.
              </p>
              <button 
                onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
                className="text-xs font-bold text-[#00b259] hover:underline"
              >
                Clear filters
              </button>
            </div>
          )}

        </div>
      </section>

      {/* Developer API & Custom integrations CTA */}
      <section className="px-4 sm:px-6 lg:px-8 border-b border-[#C5C4C2] bg-[#ECEBE9]/30 py-12 sm:py-20">
        <div className="mx-auto max-w-7xl border-x border-[#C5C4C2] px-4 sm:px-6 lg:px-8">
          <div 
            className="border border-[#C5C4C2] bg-white p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden"
            style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 15px 100%, 0 calc(100% - 15px))' }}
          >
            {/* Background vector accents */}
            <div className="absolute top-0 right-0 size-32 bg-[radial-gradient(rgba(0,178,89,0.05)_1px,transparent_1.1px)] [background-size:12px_12px] -z-10" />

            <div className="space-y-4 text-left max-w-xl">
              <span className="inline-block px-2.5 py-0.5 text-[10px] font-bold text-[#00b259] border border-[#00b259]/30 bg-[#00b259]/5 font-mono">
                {initialData.customCta?.badgeText || ':: CUSTOM CONNECTIONS ::'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-black">
                {initialData.customCta?.heading || "Don't see your favorite tool?"}
              </h2>
              <p className="text-neutral-500 font-sans text-xs sm:text-sm leading-relaxed text-left">
                {initialData.customCta?.description || 'Connect AIGreenTick to your proprietary CRM, custom databases, or other tools using our standard REST API and webhooks, or connect via Zapier in minutes.'}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 shrink-0 w-full sm:w-auto">
              <Link
                href={initialData.customCta?.button1Link || "/#demo"}
                className="px-5 py-2.5 text-xs font-black text-white bg-black hover:bg-neutral-800 transition-colors flex items-center gap-1.5 w-full sm:w-auto justify-center"
                style={{ clipPath: 'polygon(6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%, 0 6px)' }}
              >
                {initialData.customCta?.button1Text || 'Connect Zapier'} <Zap className="size-3.5 fill-current" />
              </Link>
              <Link
                href={initialData.customCta?.button2Link || "/#demo"}
                className="px-5 py-2.5 text-xs font-black text-black border border-black hover:bg-neutral-50 transition-colors flex items-center gap-1.5 w-full sm:w-auto justify-center"
                style={{ clipPath: 'polygon(6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%, 0 6px)' }}
              >
                {initialData.customCta?.button2Text || 'Developer Docs'} <Zap className="size-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Accordion Section (AEO optimized) */}
      {initialData.faqs && initialData.faqs.length > 0 && (
        <section className="px-4 sm:px-6 lg:px-8 border-b border-[#C5C4C2] bg-white py-12 sm:py-20">
          <div className="mx-auto max-w-3xl border-x border-[#C5C4C2] px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="text-center space-y-2">
              <span className="inline-block px-2.5 py-0.5 text-[10px] font-mono font-bold text-[#00b259] border border-[#00b259]/30 bg-[#00b259]/5">
                :: FREQUENTLY ASKED QUESTIONS ::
              </span>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-black">
                Everything you need to know about Integrations
              </h2>
            </div>

            <div className="space-y-4">
              {initialData.faqs.map((faq: any, idx: number) => {
                const isOpen = !!openFaqs[idx]
                return (
                  <div
                    key={idx}
                    className="border border-[#C5C4C2] bg-[#ECEBE9]/10 transition-all duration-300 overflow-hidden"
                    style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 6px 100%, 0 calc(100% - 6px))' }}
                  >
                    <button
                      type="button"
                      onClick={() => toggleFaq(idx)}
                      className="w-full px-5 py-4 text-left font-display font-bold text-sm sm:text-base text-black flex items-center justify-between gap-4 hover:bg-[#ECEBE9]/20 transition-colors cursor-pointer"
                    >
                      <span>{faq.question}</span>
                      <span className="text-lg text-neutral-400 shrink-0 select-none">
                        {isOpen ? '−' : '+'}
                      </span>
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-4 pt-1 font-sans text-xs sm:text-sm text-neutral-600 border-t border-[#C5C4C2]/30 leading-relaxed text-left">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <Footer />
    </div>
  )
}
