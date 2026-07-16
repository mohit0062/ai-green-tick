'use client'

import Link from 'next/link'
import { ArrowLeft, Check, Star } from 'lucide-react'
import Header from '@/components/shadcn-studio/blocks/hero-section-40/header'
import Breadcrumb from '@/components/ui/breadcrumb'
import Footer from '@/components/shadcn-studio/blocks/footer/footer'
import type { Navigation } from '@/components/shadcn-studio/blocks/hero-section-40/hero-navigation'
import FAQ from '@/components/shadcn-studio/blocks/faq-component-04/faq-component-04'
import CTA from '@/components/shadcn-studio/blocks/cta-section-11/cta-section-11'
import LogoCloud from '@/components/shadcn-studio/blocks/logo-cloud-04/logo-cloud-04'
import { brandLogos } from '@/lib/brand-logos'
import { LucideIcon } from '@/components/ui/lucide-icon'

const navigationData: Navigation[] = [
  {
    title: 'Features',
    href: '/#features'
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

interface FeatureDetailProps {
  slug: string
  feature: any
}

export default function FeatureDetailClient({ slug, feature }: FeatureDetailProps) {
  // ── Fallbacks ─────────────────────────────────────────────────────────────
  const badgeText = feature.hero?.badgeText || 'FEATURE BLUEPRINT'
  const heroHeading = feature.hero?.heading || feature.title || 'Dynamic Feature Page'
  const heroSubheading = feature.hero?.subheading || feature.description || feature.shortDesc || ''
  
  const mockChat = feature.hero?.mockChat && feature.hero.mockChat.length > 0
    ? feature.hero.mockChat
    : [
        { sender: 'user', text: `How can ${feature.title} help our business?` },
        { sender: 'bot', text: `It automates customer updates and coordinates workflows directly on WhatsApp! 🚀` }
      ]

  const capabilities = feature.capabilities && feature.capabilities.length > 0
    ? feature.capabilities
    : [
        { title: 'Easy Setup', desc: 'Go live on the official WhatsApp API in 10 minutes.', icon: 'ShieldCheck' },
        { title: 'Smart Automation', desc: 'Configure drag-and-drop auto-responders easily.', icon: 'Cpu' },
        { title: 'CRM Sync', desc: 'Sync customer chats with HubSpot, Shopify, or Salesforce.', icon: 'RefreshCw' }
      ]

  const useCases = feature.useCases && feature.useCases.length > 0
    ? feature.useCases
    : [
        {
          title: `Optimized ${feature.title} Campaigns`,
          desc: `Configure rules and target user segments dynamically to boost engagement rates.`,
          bullets: ['98% open rates compared to email', '1-click checkout options in chat'],
          bg: 'bg-[#EAF3FF]',
          chat: [`Hey there! Get 15% off using code GREEN15.`, `Awesome! Ordering now.`]
        }
      ]

  const faqsList = feature.faqs && feature.faqs.length > 0
    ? feature.faqs
    : [
        {
          question: `What is the pricing model for ${feature.title}?`,
          answer: `All official API features are included in AI Greentick paid plans starting at ₹2,499/month, with standard Meta conversation charges.`
        },
        {
          question: `Can I connect multiple agents to ${feature.title}?`,
          answer: `Yes! Our shared team inbox supports unlimited agents answering queries on a single official WhatsApp business number.`
        }
      ]

  const faqTabs = [
    {
      name: `${feature?.title || ''} FAQs`,
      value: 'general',
      faqs: (faqsList || [])
        .filter((faq: any) => faq !== null && faq !== undefined)
        .map((faq: any, i: number) => ({
          id: `faq-feat-${i}`,
          question: faq.question || '',
          answer: faq.answer || ''
        }))
    },
    {
      name: 'General API',
      value: 'api',
      faqs: [
        {
          id: 'faq-gen-1',
          question: 'What is the WhatsApp Business API and do I need it?',
          answer:
            'WhatsApp Business API is the official Meta product designed for businesses that need to message customers at scale. Unlike the free WhatsApp Business app, the API supports automation, integrations and multi-agent inboxes.'
        }
      ]
    }
  ]

  return (
    <div className="flex flex-col min-h-screen bg-[#ECEBE9] text-black font-sans">
      {/* Header */}
      <Header navigationData={navigationData} />
      <Breadcrumb />

      <main className="flex-grow">
        
        {/* 1. HERO SECTION */}
        <section className="px-4 sm:px-6 lg:px-8 border-b border-[#C5C4C2] bg-[#ECEBE9]">
          <div className="mx-auto max-w-7xl border-x border-[#C5C4C2] px-4 sm:px-6 lg:px-8 py-12 space-y-12">
            
            <div className="text-left">
              <Link
                href="/#features"
                className="inline-flex items-center gap-2 px-4 py-2 border border-[#C5C4C2] bg-[#ECEBE9] text-xs font-bold hover:border-black transition-colors"
                style={{ clipPath: 'polygon(6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%, 0 6px)' }}
              >
                <ArrowLeft className="size-4 text-[#00b259]" />
                <span>BACK TO FEATURES</span>
              </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pb-8">
              
              {/* Left Column */}
              <div className="lg:col-span-6 space-y-6 text-left">
                <div className="flex items-center gap-2">
                  <div className="p-2 border border-[#C5C4C2] bg-white text-black size-9 flex items-center justify-center shrink-0 [&>svg]:size-5">
                    {feature.icon && feature.icon.startsWith('<svg') ? (
                      <div 
                        className="size-5 flex items-center justify-center [&>svg]:size-5"
                        dangerouslySetInnerHTML={{ __html: feature.icon }}
                      />
                    ) : (
                      <LucideIcon name={feature.icon || 'Layers'} className="size-5 text-[#00b259]" />
                    )}
                  </div>
                  <span className="px-2 py-0.5 text-[10px] font-bold text-[#00b259] border border-[#00b259]/30 bg-[#00b259]/5 uppercase tracking-widest">
                    {badgeText}
                  </span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-black tracking-tight">
                  {heroHeading}
                </h1>

                <p className="text-neutral-500 text-sm sm:text-base leading-relaxed">
                  {heroSubheading}
                </p>

                {feature.metric && (
                  <div className="p-4 border border-[#00b259]/20 bg-[#00b259]/5 rounded-none flex items-center gap-3">
                    <div className="size-2 bg-[#00b259] rounded-full animate-ping" />
                    <div>
                      <div className="text-[10px] text-neutral-400 font-bold uppercase">PROVEN OUTCOME</div>
                      <div className="text-lg font-black text-black">{feature.metric}</div>
                    </div>
                  </div>
                )}

                <div className="pt-4 flex flex-wrap gap-4">
                  <Link
                    href="/contact"
                    className="px-6 py-3 text-xs font-black text-white bg-gradient-to-r from-[#00b259] to-[#005c2b] hover:opacity-90 transition-opacity"
                    style={{ clipPath: 'polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)' }}
                  >
                    START 14-DAY FREE TRIAL
                  </Link>
                </div>
              </div>

              {/* Right Column: Hero Banner Image / Graphic */}
              <div className="lg:col-span-6 flex justify-center lg:justify-end w-full">
                {feature.hero?.imageUrl ? (
                  <div 
                    className="w-full max-w-[550px] aspect-video border border-[#C5C4C2] bg-white overflow-hidden shadow-md flex items-center justify-center"
                    style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 15px 100%, 0 calc(100% - 15px))' }}
                  >
                    {feature.hero.imageLink ? (
                      <Link href={feature.hero.imageLink} target="_blank" className="block w-full h-full">
                        <img 
                          src={feature.hero.imageUrl} 
                          alt={feature.title} 
                          className="w-full h-full object-cover transition-opacity hover:opacity-95"
                        />
                      </Link>
                    ) : (
                      <img 
                        src={feature.hero.imageUrl} 
                        alt={feature.title} 
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                ) : (
                  <div className="relative w-[300px] h-[500px] bg-neutral-900 rounded-[40px] p-3 shadow-2xl border-4 border-neutral-800">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-neutral-900 rounded-b-2xl z-20 flex items-center justify-center">
                      <div className="w-12 h-1 bg-neutral-800 rounded-full" />
                    </div>

                    <div className="w-full h-full bg-[#ECEBE9] rounded-[32px] overflow-hidden flex flex-col relative">
                      <div className="bg-[#005c2b] text-white p-3 pt-6 flex items-center gap-2 shrink-0">
                        <div className="size-8 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold font-mono">
                          {feature.title.substring(0, 2).toUpperCase()}
                        </div>
                        <div className="text-left">
                          <div className="text-xs font-bold leading-tight flex items-center gap-1">
                            {feature.title}
                            <div className="size-1.5 bg-[#00b259] rounded-full animate-pulse" />
                          </div>
                        </div>
                      </div>

                      <div className="flex-grow p-3 space-y-3 overflow-y-auto text-left text-[11px] leading-relaxed">
                        {mockChat.map((msg: any, i: number) => (
                          <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`p-2.5 rounded-2xl max-w-[85%] font-medium ${
                              msg.sender === 'user'
                                ? 'bg-[#DCF8C6] border border-[#b2d99d] text-black rounded-tr-none'
                                : 'bg-white border border-[#C5C4C2] text-black rounded-tl-none'
                            }`}>
                              {msg.text}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {feature.aiSnapshot && (
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
                  {feature.aiSnapshot}
                </p>
              </div>
            </div>
          </section>
        )}

        {/* Client Logos Bar */}
        <LogoCloud brandLogos={brandLogos} />

        {/* 2. CAPABILITIES GRID SECTION */}
        <section className="px-4 sm:px-6 lg:px-8 border-b border-[#C5C4C2] bg-white py-16 sm:py-24">
          <div className="mx-auto max-w-7xl border-x border-[#C5C4C2] px-4 sm:px-6 lg:px-8 space-y-12">
            
            <div className="text-center space-y-4 max-w-3xl mx-auto font-sans">
              <span className="inline-block px-2.5 py-0.5 text-[10px] font-bold text-[#00b259] border border-[#00b259]/30 bg-[#00b259]/5">
                :: KEY CAPABILITIES ::
              </span>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-black leading-snug">
                Powering operations with robust, scalable features
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 font-sans">
              {capabilities.map((feat: any, i: number) => (
                <div
                  key={i}
                  className="border border-[#C5C4C2] bg-[#ECEBE9]/30 p-6 flex flex-col justify-between h-[180px] hover:border-black transition-all group"
                  style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 10px 100%, 0 calc(100% - 10px))' }}
                >
                  <div className="flex items-center justify-between w-full">
                    <div className="p-2 border border-[#C5C4C2] bg-white group-hover:border-black transition-colors [&>svg]:size-4 flex items-center justify-center">
                      <LucideIcon name={feat.icon || 'Layers'} className="size-4 text-[#00b259]" />
                    </div>
                    <span className="text-[10px] font-mono font-bold text-neutral-400">[ 0{i + 1} ]</span>
                  </div>
                  <div className="text-left space-y-1 mt-4">
                    <h3 className="text-xs font-black uppercase text-black">{feat.title}</h3>
                    <p className="text-[11px] text-neutral-500 leading-normal font-sans">{feat.desc}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* 3. DETAILED USE CASES SECTION */}
        <section className="px-4 sm:px-6 lg:px-8 border-b border-[#C5C4C2] bg-[#ECEBE9]/30">
          <div className="mx-auto max-w-7xl border-x border-[#C5C4C2] px-4 sm:px-6 lg:px-8 py-16 sm:py-24 space-y-24">
            
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <span className="inline-block px-3 py-1 text-xs font-bold text-[#00b259] border border-[#00b259] bg-[#00b259]/10 font-mono tracking-wider">
                :: WORKFLOWS & USE CASES ::
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-black font-display leading-tight">
                Streamline operations and elevate outcomes using {feature.title}
              </h2>
            </div>

            <div className="space-y-20">
              {useCases.map((uc: any, i: number) => {
                const isEven = i % 2 === 0
                return (
                  <div key={i} className={`flex flex-col gap-12 items-center ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
                    
                    {/* Text block */}
                    <div className="flex-1 w-full space-y-6 text-left relative">
                      <h3 className="text-2xl font-bold text-black font-display leading-tight">
                        {uc.title}
                      </h3>
                      <p className="text-sm text-neutral-600 leading-relaxed font-sans">
                        {uc.desc}
                      </p>
                      <ul className="space-y-3">
                        {(uc.bullets || []).map((b: string, idx: number) => (
                          <li key={idx} className="flex items-start gap-2.5">
                            <span className="flex items-center justify-center size-5 bg-white border border-[#C5C4C2] rounded-full shrink-0 mt-0.5 text-[#00b259]">
                              <Check className="size-3 stroke-[3]" />
                            </span>
                            <span className="text-xs sm:text-sm text-neutral-700 leading-relaxed font-sans font-medium">{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Graphic block */}
                    <div className={`flex-1 w-full ${uc.bg || 'bg-[#EAF3FF]'} border border-[#C5C4C2] flex flex-col justify-center items-center rounded-none shadow-sm aspect-video overflow-hidden`}
                      style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 15px 100%, 0 calc(100% - 15px))' }}
                    >
                      {uc.imageUrl ? (
                        <img 
                          src={uc.imageUrl} 
                          alt={uc.title || "Use Case Graphic"} 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full max-w-[280px] space-y-3 text-[11px] leading-relaxed p-8 sm:p-12">
                          {uc.chat && uc.chat.length >= 2 && (
                            <>
                              <div className="flex justify-end">
                                <div className="bg-[#DCF8C6] border border-[#b2d99d] text-black p-2.5 rounded-xl rounded-tr-none text-left font-medium">
                                  {uc.chat[0]}
                                </div>
                              </div>
                              <div className="flex justify-start">
                                <div className="bg-white border border-[#C5C4C2] text-black p-2.5 rounded-xl rounded-tl-none text-left font-medium">
                                  {uc.chat[1]}
                                </div>
                              </div>
                            </>
                          )}
                        </div>
                      )}
                    </div>

                  </div>
                )
              })}
            </div>

          </div>
        </section>

        {/* Dynamic Testimonials */}
        <section className="px-4 sm:px-6 lg:px-8 border-b border-[#C5C4C2] bg-white py-16 sm:py-24">
          <div className="mx-auto max-w-7xl border-x border-[#C5C4C2] px-4 sm:px-6 lg:px-8 space-y-12">
            
            <div className="text-center space-y-4 max-w-3xl mx-auto font-sans">
              <span className="inline-block px-2.5 py-0.5 text-[10px] font-bold text-[#00b259] border border-[#00b259]/30 bg-[#00b259]/5">
                :: CUSTOMER CASE STUDIES ::
              </span>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-black font-semibold">
                Trusted by high-growth operations teams
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left font-sans">
              
              <div 
                className="border border-[#C5C4C2] bg-[#ECEBE9]/30 p-8 flex flex-col justify-between gap-6"
                style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 15px 100%, 0 calc(100% - 15px))' }}
              >
                <div className="space-y-4">
                  <div className="flex gap-1 text-[#00b259]">
                    <Star className="size-4 fill-current" />
                    <Star className="size-4 fill-current" />
                    <Star className="size-4 fill-current" />
                    <Star className="size-4 fill-current" />
                    <Star className="size-4 fill-current" />
                  </div>
                  <p className="text-xs sm:text-sm text-neutral-700 italic leading-relaxed">
                    "AI Greentick transformed our workflows. Automating follow-ups and notifications on WhatsApp has improved customer response speeds by 4x."
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="size-8 rounded-full bg-[#005c2b] text-white flex items-center justify-center font-bold text-xs">
                    RS
                  </div>
                  <div>
                    <h4 className="text-xs font-black uppercase text-black leading-none">Rahul Sharma</h4>
                    <span className="text-[10px] text-neutral-400 font-medium">Operations Lead, D2C Hub</span>
                  </div>
                </div>
              </div>

              <div 
                className="border border-[#C5C4C2] bg-[#ECEBE9]/30 p-8 flex flex-col justify-between gap-6"
                style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 15px 100%, 0 calc(100% - 15px))' }}
              >
                <div className="space-y-4">
                  <div className="flex gap-1 text-[#00b259]">
                    <Star className="size-4 fill-current" />
                    <Star className="size-4 fill-current" />
                    <Star className="size-4 fill-current" />
                    <Star className="size-4 fill-current" />
                    <Star className="size-4 fill-current" />
                  </div>
                  <p className="text-xs sm:text-sm text-neutral-700 italic leading-relaxed">
                    "Setting up official WhatsApp API automation reduced patient booking dropouts by 60%. Highly recommend their codeless builder."
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="size-8 rounded-full bg-[#005c2b] text-white flex items-center justify-center font-bold text-xs">
                    MK
                  </div>
                  <div>
                    <h4 className="text-xs font-black uppercase text-black leading-none">Meera Krishnan</h4>
                    <span className="text-[10px] text-neutral-400 font-medium">Customer Success, CareSync</span>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* 4. FAQ SECTION */}
        <div id="faq">
          <FAQ tabs={faqTabs} />
        </div>

        {/* Global CTA Section */}
        <CTA />

      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
