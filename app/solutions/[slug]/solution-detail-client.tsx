'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { 
  ArrowLeft, 
  Check, 
  ShoppingBag, 
  Activity, 
  GraduationCap, 
  Home, 
  Shield, 
  Plane, 
  Clock, 
  Users, 
  Star, 
  DollarSign, 
  BookOpen, 
  MessageSquare
} from 'lucide-react'
import Header from '@/components/shadcn-studio/blocks/hero-section-40/header'
import Breadcrumb from '@/components/ui/breadcrumb'
import Footer from '@/components/shadcn-studio/blocks/footer/footer'
import type { Navigation } from '@/components/shadcn-studio/blocks/hero-section-40/hero-navigation'
import FAQ from '@/components/shadcn-studio/blocks/faq-component-04/faq-component-04'
import CTA from '@/components/shadcn-studio/blocks/cta-section-11/cta-section-11'
import LogoCloud from '@/components/shadcn-studio/blocks/logo-cloud-04/logo-cloud-04'
import { brandLogos } from '@/lib/brand-logos'
import { LucideIcon } from '@/components/ui/lucide-icon'
import { DEFAULT_FALLBACKS } from '@/utils/cms-data'

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

function getFeatureGraphic(slug: string, index: number) {
  const graphics: Record<string, { bg: string, chat: string[] }[]> = {
    ecommerce: [
      { bg: 'bg-[#EAF3FF]', chat: ["Your cart has been saved! Get 10% off with code CART10. [Check Out]", "Thanks, checkout completed!"] },
      { bg: 'bg-[#F8F2FF]', chat: ["View our product catalog below. [View Catalog]", "Can I add the Medium Roast Coffee to my cart?"] },
      { bg: 'bg-[#FFF9E6]', chat: ["Your order #1084 has been shipped! Track link: green.tick/track-1084", "Awesome, thank you!"] },
      { bg: 'bg-[#EAF3FF]', chat: ["Exclusive VIP Offer: Flat 20% off today only! [Shop Now]", "Perfect! Just ordered."] },
      { bg: 'bg-[#F8F2FF]', chat: ["Do you have this in size M?", "Yes, size M is in stock! [Buy Now]"] }
    ],
    healthcare: [
      { bg: 'bg-[#EAF3FF]', chat: ["Appt Reminder: Tomorrow at 10:00 AM with Dr. Smith. Reply: 1-Confirm, 2-Reschedule", "1 - Confirm"] },
      { bg: 'bg-[#F8F2FF]', chat: ["Your Blood Test Report is ready. [Download PDF]", "Thank you, received!"] },
      { bg: 'bg-[#FFF9E6]', chat: ["Refill Alert: Your 30-day dosage course is ending. Would you like to re-order?", "Yes, please re-order."] },
      { bg: 'bg-[#EAF3FF]', chat: ["Assigning your query to Dr. Patel. Please hold.", "Thank you, doctor."] },
      { bg: 'bg-[#F8F2FF]', chat: ["What are the clinic hours?", "We are open from 8:00 AM to 8:00 PM every day!"] }
    ],
    education: [
      { bg: 'bg-[#EAF3FF]', chat: ["Click below to chat with an admissions expert. [Chat Now]", "Hi! I want to apply for the MBA course."] },
      { bg: 'bg-[#F8F2FF]', chat: ["Here is the MBA brochure and next steps. [Download Brochure]", "Great, reviewing it now."] },
      { bg: 'bg-[#FFF9E6]', chat: ["Before connecting with counselors: What is your target year? [2026] [2027]", "2026"] },
      { bg: 'bg-[#EAF3FF]', chat: ["Fee Reminder: Term 1 payment due by Friday. [Pay Fees]", "Paid! Here is my receipt."] },
      { bg: 'bg-[#F8F2FF]', chat: ["Timetable Update: Tomorrow's lecture starts at 10 AM.", "Received! Thanks."] }
    ],
    realestate: [
      { bg: 'bg-[#EAF3FF]', chat: ["Here is the floor plan and pricing booklet. [Download PDF]", "Looks great! Are 3BHKs available?"] },
      { bg: 'bg-[#F8F2FF]', chat: ["Book a site visit for Saturday? [10:00 AM] [2:00 PM]", "10:00 AM works perfectly."] },
      { bg: 'bg-[#FFF9E6]', chat: ["New Project Launch: Green Meadows Block B is now open! [View Units]", "Interested! Please send pricing."] },
      { bg: 'bg-[#EAF3FF]', chat: ["What is your target budget range?", "Under ₹1.5 Crore."] },
      { bg: 'bg-[#F8F2FF]', chat: ["Site Visit Reminder: Here is the location map. [View Direction]", "Heading there now, thanks!"] }
    ],
    finance: [
      { bg: 'bg-[#EAF3FF]', chat: ["Your Login OTP is: 983421. Valid for 5 minutes.", "Entered! Thank you."] },
      { bg: 'bg-[#F8F2FF]', chat: ["Transaction Alert: ₹12,500 debited from account xx84.", "I recognize this payment."] },
      { bg: 'bg-[#FFF9E6]', chat: ["EMI Alert: Your loan repayment is due in 3 days. [Pay Now]", "Completed! Thanks."] },
      { bg: 'bg-[#EAF3FF]', chat: ["Please upload your PAN card copy for KYC validation.", "Sent PAN_Card.jpg 📄"] },
      { bg: 'bg-[#F8F2FF]', chat: ["What is my account balance?", "Your current account balance is ₹48,930.00."] }
    ],
    travel: [
      { bg: 'bg-[#EAF3FF]', chat: ["Booking Confirmed! Boarding Pass QR: [View Pass]", "Awesome, checked in!"] },
      { bg: 'bg-[#F8F2FF]', chat: ["Check-in is now open for flight AI-402. [Check In]", "Checking in now!"] },
      { bg: 'bg-[#FFF9E6]', chat: ["Flight Alert: Gate changed to 14B. Boarding starts in 20m.", "Heading to 14B!"] },
      { bg: 'bg-[#EAF3FF]', chat: ["How was your trip? Tap to rate: [⭐️⭐️⭐️⭐️⭐️]", "⭐️⭐️⭐️⭐️⭐️ - Great service!"] },
      { bg: 'bg-[#F8F2FF]', chat: ["Can I check in late?", "Check-in closes 45 minutes before departure."] }
    ]
  }
  
  const list = graphics[slug] || graphics.ecommerce
  return list[index % list.length]
}

interface SolutionDetailProps {
  slug: string
  solution: any
}

export default function SolutionDetailClient({ slug, solution }: SolutionDetailProps) {
  const defaultBp = (DEFAULT_FALLBACKS.solutions_list || []).find((sol: any) => sol && sol.id === slug) || (DEFAULT_FALLBACKS.solutions_list || [])[0] || {}

  // Safe fallback properties
  const title = solution?.title || defaultBp?.title || ''
  const desc =
    solution?.desc ||
    solution?.shortDesc ||
    solution?.description ||
    defaultBp?.desc ||
    defaultBp?.shortDesc ||
    defaultBp?.description ||
    ''
  const metric = solution?.metric || defaultBp?.metric || ''
  const iconName = solution?.icon || defaultBp?.icon || ''
  const seoTitle = solution?.seoTitle || defaultBp?.seoTitle || ''
  const seoDescription = solution?.seoDescription || defaultBp?.seoDescription || ''

  const problem = solution?.problemSection || defaultBp?.problemSection
  const features = solution?.features || defaultBp?.features
  const integrations = solution?.integrations || defaultBp?.integrations
  const benchmarkResults = solution?.benchmarkResults || defaultBp?.benchmarkResults
  const caseStudy = solution?.caseStudy || defaultBp?.caseStudy
  const faqs = solution?.faqs || defaultBp?.faqs

  const faqTabs = [
    {
      name: `${title} FAQs`,
      value: 'general',
      faqs: (faqs || [])
        .filter((faq: any) => faq !== null && faq !== undefined)
        .map((faq: any, i: number) => ({
          id: `faq-sol-${i}`,
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
                href="/industries"
                className="inline-flex items-center gap-2 px-4 py-2 border border-[#C5C4C2] bg-[#ECEBE9] text-xs font-bold hover:border-black transition-colors"
                style={{ clipPath: 'polygon(6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%, 0 6px)' }}
              >
                <ArrowLeft className="size-4 text-[#00b259]" />
                <span>BACK TO SOLUTIONS</span>
              </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pb-8">
              
              {/* Left Column */}
              <div className="lg:col-span-6 space-y-6 text-left">
                <div className="flex items-center gap-2">
                  <div className="p-2 border border-[#C5C4C2] bg-white text-black size-9 flex items-center justify-center shrink-0 [&>svg]:size-5">
                    {iconName && iconName.startsWith('<svg') ? (
                      <div 
                        className="size-5 flex items-center justify-center [&>svg]:size-5"
                        dangerouslySetInnerHTML={{ __html: iconName }}
                      />
                    ) : (
                      <LucideIcon name={iconName} className="size-5 text-[#00b259]" />
                    )}
                  </div>
                  <span className="px-2 py-0.5 text-[10px] font-bold text-[#00b259] border border-[#00b259]/30 bg-[#00b259]/5 uppercase tracking-widest">
                    SOLUTION BLUEPRINT
                  </span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-black tracking-tight">
                  {title}
                </h1>

                <p className="text-neutral-500 text-sm sm:text-base leading-relaxed font-sans">
                  {desc}
                </p>

                <div className="p-4 border border-[#00b259]/20 bg-[#00b259]/5 rounded-none flex items-center gap-3">
                  <div className="size-2 bg-[#00b259] rounded-full animate-ping" />
                  <div>
                    <div className="text-[10px] text-neutral-400 font-bold uppercase">PROVEN OUTCOME</div>
                    <div className="text-lg font-black text-black">{metric}</div>
                  </div>
                </div>

                <div className="pt-4 flex flex-wrap gap-4">
                  <Link
                    href="/contact?intent=demo"
                    className="px-6 py-3 text-xs font-black text-white bg-gradient-to-r from-[#00b259] to-[#005c2b] hover:opacity-90 transition-opacity"
                    style={{ clipPath: 'polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)' }}
                  >
                    Book a Demo
                  </Link>
                  <Link
                    href="/pricing"
                    className="px-6 py-3 text-xs font-black text-black border border-black hover:bg-neutral-100 transition-colors"
                    style={{ clipPath: 'polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)' }}
                  >
                    See Pricing
                  </Link>
                </div>
              </div>

              {/* Right Column: Phone Mockup */}
              <div className="lg:col-span-6 flex justify-center lg:justify-end">
                <div className="relative w-[300px] h-[550px] bg-neutral-900 rounded-[40px] p-3 shadow-2xl border-4 border-neutral-800">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-neutral-900 rounded-b-2xl z-20 flex items-center justify-center">
                    <div className="w-12 h-1 bg-neutral-800 rounded-full" />
                  </div>

                  <div className="w-full h-full bg-[#ECEBE9] rounded-[32px] overflow-hidden flex flex-col relative">
                    <div className="bg-[#005c2b] text-white p-3 pt-6 flex items-center gap-2 shrink-0">
                      <div className="size-8 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold font-mono">
                        {(title || '').substring(0, 2).toUpperCase()}
                      </div>
                      <div className="text-left">
                        <div className="text-xs font-bold leading-tight flex items-center gap-1">
                          {title} Bot
                          <div className="size-1.5 bg-[#00b259] rounded-full" />
                        </div>
                      </div>
                    </div>

                    <div className="flex-grow p-3 space-y-3 overflow-y-auto text-left text-[11px] leading-relaxed">
                      {((getFeatureGraphic(slug, 0)?.chat) || []).map((msgText: string, i: number) => {
                        const isUser = i % 2 === 1
                        return (
                          <div key={i} className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
                            <div className={`p-2.5 rounded-2xl max-w-[85%] font-medium ${
                              isUser
                                ? 'bg-[#DCF8C6] border border-[#b2d99d] text-black rounded-tr-none'
                                : 'bg-white border border-[#C5C4C2] text-black rounded-tl-none'
                            }`}>
                              {msgText}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {solution.aiSnapshot && (
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
                  {solution.aiSnapshot}
                </p>
              </div>
            </div>
          </section>
        )}

        {/* Client Logos Bar */}
        <LogoCloud brandLogos={brandLogos} />

        {/* 2. THE PROBLEM SECTION */}
        {problem && (
          <section className="px-4 sm:px-6 lg:px-8 border-b border-[#C5C4C2] bg-white py-16 sm:py-24">
            <div className="mx-auto max-w-7xl border-x border-[#C5C4C2] px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                
                <div className="lg:col-span-5 space-y-4 text-left">
                  <span className="inline-block px-2.5 py-0.5 text-[10px] font-bold text-red-500 border border-red-500/30 bg-red-500/5 uppercase tracking-widest font-mono">
                    :: The Problem ::
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-black font-display leading-tight">
                    Why traditional channels fall short
                  </h2>
                  <p className="text-neutral-600 text-sm sm:text-base leading-relaxed font-sans mt-2">
                    {problem.description}
                  </p>
                </div>
                
                <div className="lg:col-span-7 bg-[#ECEBE9]/20 border border-[#C5C4C2] p-8 space-y-6 text-left"
                  style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 15px 100%, 0 calc(100% - 15px))' }}
                >
                  <h3 className="text-xs font-black uppercase text-black tracking-wider">[ Key Challenges ]</h3>
                  <ul className="space-y-4">
                    {(problem.bullets || []).filter(Boolean).map((bullet: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="flex items-center justify-center size-5 bg-red-100 text-red-650 rounded-full shrink-0 text-xs font-bold font-mono">
                          !
                        </span>
                        <span className="text-xs sm:text-sm text-neutral-700 leading-relaxed font-sans font-medium">
                          {bullet}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>
            </div>
          </section>
        )}

        {/* 3. DETAILED SOLUTION FEATURE MODULES */}
        {features && features.length > 0 && (
          <section className="px-4 sm:px-6 lg:px-8 border-b border-[#C5C4C2] bg-[#ECEBE9]/30 py-16 sm:py-24">
            <div className="mx-auto max-w-7xl border-x border-[#C5C4C2] px-4 sm:px-6 lg:px-8 space-y-24">
              
              <div className="text-center max-w-3xl mx-auto space-y-4">
                <span className="inline-block px-3 py-1 text-xs font-bold text-[#00b259] border border-[#00b259] bg-[#00b259]/10 font-mono tracking-wider">
                  :: The Solution ::
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-black font-display leading-tight">
                  How AI Greentick transforms your operations
                </h2>
              </div>

              <div className="space-y-20">
                {(features || [])
                  .filter((feat: any) => feat !== null && feat !== undefined)
                  .map((feat: any, i: number) => {
                    const isEven = i % 2 === 0
                    const graphic = getFeatureGraphic(slug, i)
                    
                    return (
                      <div key={i} className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                        
                        {/* Text block */}
                        <div className={`lg:col-span-6 space-y-6 text-left relative ${isEven ? 'order-1' : 'order-1 lg:order-2'}`}>
                          <span className="text-xs font-bold text-[#00b259] font-mono">0{i + 1} / FEATURE MODULE</span>
                          <h3 className="text-2xl font-bold text-black font-display leading-tight">
                            {feat.title}
                          </h3>
                          <p className="text-sm text-neutral-600 leading-relaxed font-sans font-medium">
                            {feat.description}
                          </p>
                          <ul className="space-y-3">
                            {(feat.bullets || []).filter(Boolean).map((b: string, idx: number) => (
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
                      <div className={`lg:col-span-6 ${graphic.bg} border border-[#C5C4C2] p-8 sm:p-12 flex flex-col justify-center items-center rounded-none shadow-sm aspect-video ${isEven ? 'order-2' : 'order-2 lg:order-1'}`}
                        style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 15px 100%, 0 calc(100% - 15px))' }}
                      >
                        <div className="w-full max-w-[280px] space-y-3 text-[11px] leading-relaxed">
                          {graphic.chat && graphic.chat.length >= 2 && (
                            <>
                              <div className="flex justify-start">
                                <div className="bg-white border border-[#C5C4C2] text-black p-2.5 rounded-xl rounded-tl-none text-left font-medium">
                                  {graphic.chat[0]}
                                </div>
                              </div>
                              <div className="flex justify-end">
                                <div className="bg-[#DCF8C6] border border-[#b2d99d] text-black p-2.5 rounded-xl rounded-tr-none text-left font-medium">
                                  {graphic.chat[1]}
                                </div>
                              </div>
                            </>
                          )}
                        </div>
                      </div>

                    </div>
                  )
                })}
              </div>

            </div>
          </section>
        )}

        {/* 4. INTEGRATIONS SECTION */}
        {integrations && integrations.length > 0 && (
          <section className="px-4 sm:px-6 lg:px-8 border-b border-[#C5C4C2] bg-white py-12">
            <div className="mx-auto max-w-7xl border-x border-[#C5C4C2] px-4 sm:px-6 lg:px-8 text-center space-y-6">
              <span className="inline-block px-2.5 py-0.5 text-[10px] font-bold text-neutral-400 border border-[#C5C4C2] uppercase tracking-widest font-mono">
                Built-In Integrations
              </span>
              <div className="flex flex-wrap justify-center gap-3">
                {(integrations || []).filter(Boolean).map((integration: string, idx: number) => (
                  <span key={idx} className="px-4 py-2 border border-[#C5C4C2] bg-[#ECEBE9]/40 text-xs font-bold text-black font-sans uppercase">
                    {integration}
                  </span>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* 5. WHAT YOU CAN EXPECT (BENCHMARKS) SECTION */}
        {benchmarkResults && (
          <section className="px-4 sm:px-6 lg:px-8 border-b border-[#C5C4C2] bg-[#ECEBE9]/10 py-16 sm:py-24">
            <div className="mx-auto max-w-5xl text-center space-y-6">
              <span className="inline-block px-2.5 py-0.5 text-[10px] font-bold text-[#00b259] border border-[#00b259]/30 bg-[#00b259]/5 uppercase tracking-widest font-mono">
                What You Can Expect
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-black font-display">
                Industry Benchmarks
              </h2>
              <p className="text-neutral-700 text-sm sm:text-base leading-relaxed max-w-3xl mx-auto font-sans">
                {benchmarkResults}
              </p>
            </div>
          </section>
        )}

        {/* 6. CASE STUDY PLACEHOLDER */}
        {caseStudy && (
          <section className="px-4 sm:px-6 lg:px-8 border-b border-[#C5C4C2] bg-white py-16">
            <div className="mx-auto max-w-4xl">
              <div className="border-2 border-[#00b259] bg-[#00b259]/5 p-8 sm:p-12 relative text-left"
                style={{ clipPath: 'polygon(15px 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%, 0 15px)' }}
              >
                <div className="absolute top-0 right-8 -translate-y-1/2 px-3 py-1 bg-[#00b259] text-white text-[9px] font-black uppercase tracking-widest font-mono">
                  CASE STUDY SHOWCASE
                </div>
                <p className="text-black font-display text-lg sm:text-xl font-bold italic leading-relaxed">
                  "{caseStudy}"
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="size-8 rounded-full bg-[#005c2b] text-white flex items-center justify-center font-bold text-xs">
                    AIG
                  </div>
                  <div>
                    <h4 className="text-xs font-black uppercase text-black leading-none">Future Client Result</h4>
                    <span className="text-[10px] text-neutral-400 font-medium mt-0.5 block">Submit your story to get featured here</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Homepage CTA Section */}
        <CTA />

        {/* 7. FAQ SECTION */}
        <div id="faq">
          <FAQ tabs={faqTabs} />
        </div>

      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
