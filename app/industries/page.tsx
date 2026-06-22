'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ShoppingBag, Activity, GraduationCap, Home, Shield, Plane, ArrowRight, Sparkles, Star, Users, MessageSquare, BookOpen } from 'lucide-react'
import { cn } from '@/lib/utils'
import Header from '@/components/shadcn-studio/blocks/hero-section-40/header'
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
            icon: <BookOpen className='size-4' />
          },
          {
            title: 'Customer Onboarding',
            href: '/#features',
            description: 'Automate welcome emails, account setup, and key guidance.',
            icon: <BookOpen className='size-4' />
          },
          {
            title: 'Support Escalations',
            href: '/#features',
            description: 'Detect urgency and route issues to the right team faster.',
            icon: <BookOpen className='size-4' />
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
            icon: <BookOpen className='size-4' />
          },
          {
            title: 'Task Automation',
            href: '/#features',
            description: 'Convert messages into tasks and assign them automatically.',
            icon: <BookOpen className='size-4' />
          },
          {
            title: 'Data Cleanup',
            href: '/#features',
            description: 'Auto-correct entries, remove duplicates, sync records.',
            icon: <BookOpen className='size-4' />
          }
        ]
      }
    ]
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

import { industriesData } from '@/lib/industries-data'

const iconMap: Record<string, any> = {
  ecommerce: ShoppingBag,
  healthcare: Activity,
  education: GraduationCap,
  realestate: Home,
  finance: Shield,
  travel: Plane,
}

export default function IndustriesPage() {
  const [selectedIndustry, setSelectedIndustry] = useState<string>('ecommerce')

  const industries = industriesData.map(ind => ({
    ...ind,
    icon: iconMap[ind.id] || ShoppingBag
  }))

  const activeIndustry = industries.find(ind => ind.id === selectedIndustry) || industries[0]

  return (
    <div className="flex flex-col min-h-screen bg-[#ECEBE9] text-black">
      {/* Header */}
      <Header navigationData={navigationData} />

      {/* Hero Header */}
      <section className="px-4 sm:px-6 lg:px-8 border-b border-[#C5C4C2]">
        <div className="mx-auto max-w-7xl border-x border-[#C5C4C2] px-4 sm:px-6 lg:px-8 py-12 sm:py-20 text-center space-y-6">
          <span className="inline-block px-3 py-1 text-xs font-bold text-[#00b259] border border-[#00b259] bg-[#00b259]/10 font-mono tracking-wider">
            :: TAILORED WORKFLOWS ::
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-medium font-serif tracking-tight leading-none text-black">
            WhatsApp Automation for Every Industry
          </h1>
          <p className="text-neutral-500 max-w-3xl mx-auto text-sm sm:text-base font-mono">
            AIGreenTick powers WhatsApp automation for eCommerce, healthcare, education, real estate, finance, and travel businesses. Industry-specific chatbots, campaigns, and integrations.
          </p>
        </div>
      </section>

      {/* Main Selector Section */}
      <section className="px-4 sm:px-6 lg:px-8 border-b border-[#C5C4C2] bg-[#ECEBE9]/30">
        <div className="mx-auto max-w-7xl border-x border-[#C5C4C2] px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
          
          {/* Tabs Selector list */}
          <div className="flex flex-wrap justify-center gap-2 font-mono">
            {industries.map(ind => {
              const Icon = ind.icon
              return (
                <button
                  key={ind.id}
                  onClick={() => setSelectedIndustry(ind.id)}
                  className={`px-4 py-3 border text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                    selectedIndustry === ind.id
                      ? 'bg-black text-[#ECEBE9] border-black shadow-md'
                      : 'border-[#C5C4C2] bg-[#ECEBE9]/50 hover:bg-[#ECEBE9] text-neutral-600 hover:text-black'
                  }`}
                  style={{ clipPath: 'polygon(6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%, 0 6px)' }}
                >
                  <Icon className={`size-4 ${selectedIndustry === ind.id ? 'text-[#00b259]' : 'text-neutral-400'}`} />
                  <span>{ind.title.toUpperCase()}</span>
                </button>
              )
            })}
          </div>

          {/* Active Industry Panel */}
          {activeIndustry && (
            <div 
              className="border border-[#C5C4C2] bg-[#ECEBE9] grid grid-cols-1 lg:grid-cols-12 overflow-hidden"
              style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 15px 100%, 0 calc(100% - 15px))' }}
            >
              {/* Left Info Column */}
              <div className="lg:col-span-5 p-8 sm:p-12 border-b lg:border-b-0 lg:border-r border-[#C5C4C2] flex flex-col justify-between gap-8 font-mono">
                <div className="space-y-4">
                  <span className="px-2 py-0.5 text-[9px] font-bold text-[#00b259] border border-[#00b259]/30 bg-[#00b259]/5 uppercase">
                    Vertical Insight
                  </span>
                  
                  <h3 className="text-2xl font-serif font-medium text-black">
                    {activeIndustry.title}
                  </h3>
                  
                  <p className="text-xs text-neutral-500 font-sans leading-relaxed">
                    {activeIndustry.desc}
                  </p>
                </div>

                <div className="p-4 border border-[#00b259]/20 bg-[#00b259]/5 rounded-none flex items-center gap-3">
                  <div className="size-2 bg-[#00b259] rounded-full animate-ping" />
                  <div>
                    <div className="text-[10px] text-neutral-400 font-bold">KEY RESULT</div>
                    <div className="text-sm font-black text-black">{activeIndustry.metric}</div>
                  </div>
                </div>
              </div>

              {/* Right Use Cases Column */}
              <div className="lg:col-span-7 p-8 sm:p-12 bg-white flex flex-col justify-between gap-8 font-mono">
                <div className="space-y-6">
                  <h4 className="text-xs font-black text-neutral-400 uppercase tracking-widest">[ AUTOMATED WORKFLOWS ]</h4>
                  <ul className="space-y-4">
                    {activeIndustry.useCases.map((uc, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="flex items-center justify-center size-5 border border-[#C5C4C2] rounded-full text-[10px] text-[#00b259] font-bold shrink-0 mt-0.5 font-mono">
                          {i + 1}
                        </span>
                        <span className="text-xs sm:text-sm text-neutral-700 font-sans leading-relaxed">
                          {uc}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6 border-t border-[#C5C4C2]/30 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <Link 
                      href="#demo"
                      className="px-5 py-2.5 text-xs font-black text-white bg-gradient-to-r from-[#00b259] to-[#005c2b] hover:opacity-95 transition-opacity"
                      style={{ clipPath: 'polygon(6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%, 0 6px)' }}
                    >
                      SCHEDULE DEMO
                    </Link>
                    <Link 
                      href={`/industries/${selectedIndustry}`}
                      className="px-5 py-2.5 text-xs font-black text-black border border-black hover:bg-black hover:text-[#ECEBE9] transition-all"
                      style={{ clipPath: 'polygon(6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%, 0 6px)' }}
                    >
                      EXPLORE FULL BLUEPRINT &rarr;
                    </Link>
                  </div>

                  <span className="text-[9px] text-neutral-400 font-mono">SETUP IN 10 MINUTES</span>
                </div>
              </div>
            </div>
          )}

        </div>
      </section>

      {/* Grid of All Verticals (For SEO and mobile layouts) */}
      <section className="px-4 sm:px-6 lg:px-8 border-b border-[#C5C4C2] bg-[#ECEBE9]/50">
        <div className="mx-auto max-w-7xl border-x border-[#C5C4C2] px-4 sm:px-6 lg:px-8 py-12 sm:py-24 space-y-12">
          
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <span className="inline-block px-2.5 py-0.5 text-[10px] font-bold text-[#00b259] border border-[#00b259]/30 bg-[#00b259]/5 font-mono">
              :: INDUSTRY COMPARISON ::
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-medium text-black">
              Explore all industry blueprints.
            </h2>
            <p className="text-neutral-500 font-mono text-xs sm:text-sm leading-relaxed">
              Click any industry card to load specific automation use-cases and schedule a customized platform tour.
            </p>
          </div>

          {/* Responsive 3-Column Grid */}
          <div className="flex overflow-x-auto md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 pb-6 -mx-4 px-4 sm:-mx-6 sm:px-6 md:mx-0 md:px-0 snap-x snap-mandatory scrollbar-thin">
            {industries.map((ind, idx) => {
              const Icon = ind.icon
              return (
                <div 
                  key={ind.id}
                  onClick={() => setSelectedIndustry(ind.id)}
                  className={cn(
                    "relative border border-[#C5C4C2] h-[360px] flex flex-col justify-between p-6 overflow-hidden group cursor-pointer w-[280px] sm:w-[320px] md:w-auto shrink-0 snap-start transition-all duration-300",
                    selectedIndustry === ind.id
                      ? 'border-[#00b259] bg-[#00b259]/5'
                      : 'bg-white hover:border-black'
                  )}
                >
                  {/* Top row: marker + index number */}
                  <div className="flex items-center justify-between w-full">
                    <div className={cn("size-2 transition-colors", selectedIndustry === ind.id ? "bg-[#00b259]" : "bg-black")} />
                    <span className="text-[11px] font-mono font-bold text-neutral-400">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                  </div>

                  {/* Center Chamfered Icon Box */}
                  <div className="flex items-center justify-center flex-grow">
                    <div 
                      className={cn(
                        "w-36 h-36 bg-[#ECEBE9]/30 border border-[#C5C4C2] flex items-center justify-center relative rounded-2xl transition-all duration-300",
                        selectedIndustry === ind.id ? "bg-[#00b259]/10 border-[#00b259]/30" : "group-hover:bg-[#00b259]/5 group-hover:border-[#00b259]/20"
                      )}
                      style={{ 
                        clipPath: 'polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)' 
                      }}
                    >
                      <div className={cn(
                        "transition-all duration-300 transform group-hover:scale-105 [&>svg]:size-14 [&>svg]:stroke-[1]",
                        selectedIndustry === ind.id ? "text-[#00b259]" : "text-neutral-800 group-hover:text-[#00b259]"
                      )}>
                        <Icon className="size-14" />
                      </div>
                    </div>
                  </div>

                  {/* Bottom row: Industry Name & Impact (Metric) */}
                  <div className="text-left w-full">
                    <h3 className={cn(
                      "text-xs sm:text-sm font-mono font-bold uppercase tracking-wider transition-colors",
                      selectedIndustry === ind.id ? "text-[#00b259]" : "text-black group-hover:text-[#00b259]"
                    )}>
                      {ind.title}
                    </h3>
                    <p className="text-[11px] font-mono text-neutral-500 mt-1 leading-relaxed transition-colors group-hover:text-neutral-700">
                      {ind.metric}
                    </p>
                  </div>

                  {/* Action Link row */}
                  <Link 
                    href={`/industries/${ind.id}`}
                    onClick={(e) => e.stopPropagation()}
                    className="pt-4 border-t border-[#C5C4C2]/30 flex items-center justify-between text-[10px] font-bold font-mono text-black w-full mt-2 hover:text-[#00b259] transition-colors"
                  >
                    <span className="text-[#00b259]">{selectedIndustry === ind.id ? 'VIEW DETAILED BLUEPRINT \u2192' : 'EXPLORE BLUEPRINT \u2192'}</span>
                    <ArrowRight className="size-3.5 text-[#00b259] group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              )
            })}
          </div>

        </div>
      </section>

      {/* Trust & Capabilities Section */}
      <section className="px-4 sm:px-6 lg:px-8 border-b border-[#C5C4C2] bg-[#ECEBE9]/30 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl border-x border-[#C5C4C2] px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center font-mono">
            
            {/* Feature 1 */}
            <div className="space-y-3">
              <div className="mx-auto size-12 border border-[#C5C4C2] bg-white flex items-center justify-center text-[#00b259]">
                <Users className="size-6" />
              </div>
              <h4 className="text-sm font-black text-black">COLLABORATIVE TEAM INBOX</h4>
              <p className="text-xs text-neutral-500 font-sans leading-relaxed">
                Invite support agents, sales reps, and managers. Work together on incoming customer inquiries with assignments, tags, and internal notes.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="space-y-3">
              <div className="mx-auto size-12 border border-[#C5C4C2] bg-white flex items-center justify-center text-[#00b259]">
                <MessageSquare className="size-6" />
              </div>
              <h4 className="text-sm font-black text-black">CODELESS CHATBOT BUILDER</h4>
              <p className="text-xs text-neutral-500 font-sans leading-relaxed">
                Build automated conversation trees, catalog product recommendations, and payment checkout flows in minutes using a visual grid editor.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="space-y-3">
              <div className="mx-auto size-12 border border-[#C5C4C2] bg-white flex items-center justify-center text-[#00b259]">
                <Sparkles className="size-6" />
              </div>
              <h4 className="text-sm font-black text-black">AI AGENTS & INTEGRATIONS</h4>
              <p className="text-xs text-neutral-500 font-sans leading-relaxed">
                Deploy context-aware LLM agents that solve FAQs. Integrate seamlessly with HubSpot, Shopify, Zoho, Salesforce, and custom endpoints.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* CTA Footer Section */}
      <section className="px-4 sm:px-6 lg:px-8 bg-[#ECEBE9]">
        <div className="mx-auto max-w-7xl border-x border-[#C5C4C2] px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-serif font-medium text-black">
            Start free. Scale as you grow.
          </h2>
          <p className="text-neutral-500 font-mono text-xs sm:text-sm max-w-md mx-auto">
            Ready to deploy official WhatsApp API automation inside your workflows? Start your 14-day free trial now or book a consultation.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4 font-mono">
            <Link 
              href="#demo"
              className="px-6 py-3 text-xs font-black text-white bg-gradient-to-r from-[#00b259] to-[#005c2b] hover:opacity-90 transition-opacity"
              style={{ clipPath: 'polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)' }}
            >
              START 14-DAY FREE TRIAL
            </Link>
            <Link 
              href="#demo"
              className="px-6 py-3 text-xs font-black text-black border border-[#C5C4C2] hover:bg-neutral-200/50 transition-colors"
              style={{ clipPath: 'polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)' }}
            >
              BOOK A CUSTOM TOUR
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}
