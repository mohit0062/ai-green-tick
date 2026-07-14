'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { Search, Zap, ArrowRight, ExternalLink, HelpCircle, Code, ShieldCheck, RefreshCw } from 'lucide-react'
import Header from '@/components/shadcn-studio/blocks/hero-section-40/header'
import Breadcrumb from '@/components/ui/breadcrumb'
import Footer from '@/components/shadcn-studio/blocks/footer/footer'
import type { Navigation } from '@/components/shadcn-studio/blocks/hero-section-40/hero-navigation'

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
  logoSvg: React.ReactNode
  docLink?: string
}

export default function IntegrationsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState<string>('all')

  const categories = [
    { value: 'all', name: 'All Integrations' },
    { value: 'crm', name: 'CRM' },
    { value: 'ecommerce', name: 'E-Commerce' },
    { value: 'payments', name: 'Payments' },
    { value: 'automation', name: 'Automation' },
    { value: 'support', name: 'Support' },
    { value: 'marketing', name: 'Marketing' }
  ]

  const integrations: Integration[] = [
    {
      id: 'shopify',
      name: 'Shopify',
      category: 'ecommerce',
      description: 'Send automated order updates, delivery tracking alerts, and abandoned cart reminders via WhatsApp.',
      logoColor: 'bg-[#95bf47]/10 text-[#95bf47] border-[#95bf47]/20',
      logoSvg: (
        <svg className="size-8" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19.5 7.5L12 3 4.5 7.5v9L12 21l7.5-4.5v-9zM12 4.8l6 3.6-6 3.6-6-3.6 6-3.6zM6 8.7l5 3v7.3l-5-3V8.7zm7 10.3v-7.3l5-3v7.3l-5 3z"/>
        </svg>
      )
    },
    {
      id: 'woocommerce',
      name: 'WooCommerce',
      category: 'ecommerce',
      description: 'Sync your WordPress store to automatically verify orders, confirm payments, and recover abandoned carts.',
      logoColor: 'bg-[#96588a]/10 text-[#96588a] border-[#96588a]/20',
      logoSvg: (
        <svg className="size-8" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2c5.52 0 10 4.48 10 10s-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2zm-1.8 14.2h3.6l1.2-4.8h-6l1.2 4.8zm4.8-6.4l.6-2.4H8.4l.6 2.4h7.8z"/>
        </svg>
      )
    },
    {
      id: 'hubspot',
      name: 'HubSpot',
      category: 'crm',
      description: 'Sync contacts, track chat history, and trigger WhatsApp automated messages from HubSpot workflow pipelines.',
      logoColor: 'bg-[#ff7a59]/10 text-[#ff7a59] border-[#ff7a59]/20',
      logoSvg: (
        <svg className="size-8" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2a10 10 0 1010 10A10 10 0 0012 2zm3.8 13.8a4 4 0 11-4-4 4 4 0 014 4zm1.2-5.4a1.6 1.6 0 11-1.6-1.6 1.6 1.6 0 011.6 1.6z"/>
        </svg>
      )
    },
    {
      id: 'salesforce',
      name: 'Salesforce',
      category: 'crm',
      description: 'Connect your sales pipeline and automate personalized client outreach directly from Salesforce CRM records.',
      logoColor: 'bg-[#00a1e0]/10 text-[#00a1e0] border-[#00a1e0]/20',
      logoSvg: (
        <svg className="size-8" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19.1 11.6a3.8 3.8 0 00-5.7-4.6 6 6 0 00-10.4 2.8 4.2 4.2 0 00.3 8.3 4.2 4.2 0 007.8.2 4 4 0 006.8-2.6c.7 0 1.2-.5 1.2-1.2v-2.9z"/>
        </svg>
      )
    },
    {
      id: 'zoho',
      name: 'Zoho CRM',
      category: 'crm',
      description: 'Sync client lead data in real-time and send instant automated alerts for status changes or updates.',
      logoColor: 'bg-[#e21c23]/10 text-[#e21c23] border-[#e21c23]/20',
      logoSvg: (
        <svg className="size-8" viewBox="0 0 24 24" fill="currentColor">
          <path d="M4 4h7v7H4zm9 0h7v7h-7zm-9 9h7v7H4zm9 0h7v7h-7z"/>
        </svg>
      )
    },
    {
      id: 'razorpay',
      name: 'Razorpay',
      category: 'payments',
      description: 'Send secure payment links, instant payment receipts, and automated recurring invoices via WhatsApp.',
      logoColor: 'bg-[#0b72e7]/10 text-[#0b72e7] border-[#0b72e7]/20',
      logoSvg: (
        <svg className="size-8" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L2 22h20L12 2zm0 4.8l6.8 13.6H5.2L12 6.8z"/>
        </svg>
      )
    },
    {
      id: 'stripe',
      name: 'Stripe',
      category: 'payments',
      description: 'Trigger transactional messages, payment confirmations, and billing updates to customers globally.',
      logoColor: 'bg-[#635bff]/10 text-[#635bff] border-[#635bff]/20',
      logoSvg: (
        <svg className="size-8" viewBox="0 0 24 24" fill="currentColor">
          <path d="M13.9 9.3c0-.8-.7-1.1-1.8-1.1-1.3 0-2.8.4-3.9 1L7 6.1C8.6 5 10.9 4.3 13.3 4.3c3.4 0 5.7 1.7 5.7 4.8v7.2c0 2.2.4 2.9.9 3.3H14.8c-.3-.5-.4-1.1-.4-1.6h-.1c-.9 1.1-2.4 1.9-4.3 1.9-2.9 0-4.8-1.8-4.8-4.3 0-3.3 3.1-4.7 7.7-4.7v-.2zM14 12.8v-.6c-2.3 0-4.1.5-4.1 2.2 0 .9.7 1.4 1.6 1.4 1.4-.1 2.5-1.3 2.5-3z"/>
        </svg>
      )
    },
    {
      id: 'zapier',
      name: 'Zapier',
      category: 'automation',
      description: 'Connect AIGreenTick with 5,000+ web applications to automate custom tasks without writing a single line of code.',
      logoColor: 'bg-[#ff4f00]/10 text-[#ff4f00] border-[#ff4f00]/20',
      logoSvg: (
        <svg className="size-8" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L2 22h20zM12 6.2l5.8 11.6H6.2z"/>
        </svg>
      )
    },
    {
      id: 'google-sheets',
      name: 'Google Sheets',
      category: 'automation',
      description: 'Instantly export new chat inquiries or sync contacts from spreadsheets to your broadcast lists.',
      logoColor: 'bg-[#0f9d58]/10 text-[#0f9d58] border-[#0f9d58]/20',
      logoSvg: (
        <svg className="size-8" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-9 14H7v-2h3v2zm0-4H7v-2h3v2zm0-4H7V7h3v2zm5 8h-3v-2h3v2zm0-4h-3v-2h3v2zm0-4h-3V7h3v2z"/>
        </svg>
      )
    },
    {
      id: 'slack',
      name: 'Slack',
      category: 'support',
      description: 'Get real-time notifications for incoming WhatsApp support tickets directly in your team Slack channels.',
      logoColor: 'bg-[#4a154b]/10 text-[#4a154b] border-[#4a154b]/20',
      logoSvg: (
        <svg className="size-8" viewBox="0 0 24 24" fill="currentColor">
          <path d="M6 14.5a2.5 2.5 0 11-2.5-2.5H6v2.5zm1.5 0a2.5 2.5 0 012.5-2.5h5a2.5 2.5 0 012.5 2.5v5a2.5 2.5 0 01-2.5 2.5h-5a2.5 2.5 0 01-2.5-2.5v-5zm2.5-5a2.5 2.5 0 112.5-2.5V9.5h-2.5zm0 1.5a2.5 2.5 0 012.5 2.5v5a2.5 2.5 0 01-2.5 2.5h-5a2.5 2.5 0 01-2.5-2.5v-5a2.5 2.5 0 012.5-2.5h5z"/>
        </svg>
      )
    },
    {
      id: 'freshdesk',
      name: 'Freshdesk',
      category: 'support',
      description: 'Convert WhatsApp support threads into Freshdesk tickets automatically and maintain thread histories.',
      logoColor: 'bg-[#009b72]/10 text-[#009b72] border-[#009b72]/20',
      logoSvg: (
        <svg className="size-8" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2a10 10 0 1010 10A10 10 0 0012 2zm1 14.5h-2v-2h2v2zm0-4h-2v-5h2v5z"/>
        </svg>
      )
    },
    {
      id: 'activecampaign',
      name: 'ActiveCampaign',
      category: 'marketing',
      description: 'Integrate WhatsApp messaging into your existing email marketing automation funnels for omnichannel outreach.',
      logoColor: 'bg-[#356ae6]/10 text-[#356ae6] border-[#356ae6]/20',
      logoSvg: (
        <svg className="size-8" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
        </svg>
      )
    }
  ]

  const filteredIntegrations = useMemo(() => {
    return integrations.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            item.description.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = activeCategory === 'all' || item.category === activeCategory
      return matchesSearch && matchesCategory
    })
  }, [searchQuery, activeCategory])

  return (
    <div className="flex flex-col min-h-screen bg-[#ECEBE9] text-black">
      {/* Navigation Header */}
      <Header navigationData={navigationData} />
      <Breadcrumb />

      {/* Hero Section */}
      <section className="px-4 sm:px-6 lg:px-8 border-b border-[#C5C4C2]">
        <div className="mx-auto max-w-7xl border-x border-[#C5C4C2] px-4 sm:px-6 lg:px-8 py-12 sm:py-20 text-center space-y-6">
          <span className="inline-block px-3 py-1 text-xs font-bold text-[#00b259] border border-[#00b259] bg-[#00b259]/10 font-mono tracking-wider">
            :: APP INTEGRATIONS ::
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display tracking-tight leading-none text-black">
            Integrate WhatsApp with your Favorite Tools
          </h1>
          <p className="text-neutral-500 max-w-2xl mx-auto text-base font-sans leading-relaxed">
            Connect AIGreenTick with over 2000+ CRMs, e-commerce stores, payment gateways, and productivity apps to automate your marketing, sales, and support workflows.
          </p>
        </div>
      </section>

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
                  className="border border-[#C5C4C2] bg-white dark:bg-neutral-900 p-6 flex flex-col justify-between group relative shadow-xs hover:shadow-md transition-all duration-300"
                  style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 10px 100%, 0 calc(100% - 10px))' }}
                >
                  <div className="space-y-4">
                    {/* Top Row: App Icon Badge + Category Label */}
                    <div className="flex items-center justify-between">
                      <div className={`p-2.5 border rounded-lg ${item.logoColor} shrink-0`}>
                        {item.logoSvg}
                      </div>
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-neutral-400 bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 border border-[#C5C4C2]/30">
                        {item.category}
                      </span>
                    </div>

                    {/* App Title & Description */}
                    <div className="space-y-2 text-left">
                      <h3 className="text-lg font-black text-black dark:text-white font-display">
                        {item.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-neutral-500 font-sans leading-relaxed">
                        {item.description}
                      </p>
                    </div>
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
                :: CUSTOM CONNECTIONS ::
              </span>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-black">
                Don't see your favorite tool?
              </h2>
              <p className="text-neutral-500 font-sans text-xs sm:text-sm leading-relaxed">
                Connect AIGreenTick to your proprietary CRM, custom databases, or other tools using our standard **REST API** and webhooks, or connect via **Zapier** in minutes.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 shrink-0 w-full sm:w-auto">
              <Link
                href="/#demo"
                className="px-5 py-2.5 text-xs font-black text-white bg-black hover:bg-neutral-800 transition-colors flex items-center gap-1.5 w-full sm:w-auto justify-center"
                style={{ clipPath: 'polygon(6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%, 0 6px)' }}
              >
                Connect Zapier <Zap className="size-3.5 fill-current" />
              </Link>
              <Link
                href="/#demo"
                className="px-5 py-2.5 text-xs font-black text-black border border-black hover:bg-neutral-50 transition-colors flex items-center gap-1.5 w-full sm:w-auto justify-center"
                style={{ clipPath: 'polygon(6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%, 0 6px)' }}
              >
                Developer Docs <Code className="size-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}
