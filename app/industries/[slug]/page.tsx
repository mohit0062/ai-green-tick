'use client'

import { use, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowLeft, ArrowRight, CheckCircle, ChevronDown, ShoppingBag, Activity, GraduationCap, Home, Shield, Plane } from 'lucide-react'
import Header from '@/components/shadcn-studio/blocks/hero-section-40/header'
import Footer from '@/components/shadcn-studio/blocks/footer/footer'
import { industriesData } from '@/lib/industries-data'
import type { Navigation } from '@/components/shadcn-studio/blocks/hero-section-40/hero-navigation'
import FAQ from '@/components/shadcn-studio/blocks/faq-component-04/faq-component-04'

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
            icon: <ShoppingBag className='size-4' />
          },
          {
            title: 'Customer Onboarding',
            href: '/#features',
            description: 'Automate welcome emails, account setup, and key guidance.',
            icon: <ShoppingBag className='size-4' />
          },
          {
            title: 'Support Escalations',
            href: '/#features',
            description: 'Detect urgency and route issues to the right team faster.',
            icon: <ShoppingBag className='size-4' />
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

const iconMap: Record<string, any> = {
  ecommerce: ShoppingBag,
  healthcare: Activity,
  education: GraduationCap,
  realestate: Home,
  finance: Shield,
  travel: Plane,
}

export default function IndustryDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const router = useRouter()

  const ind = industriesData.find((i) => i.id === slug)
  const Icon = ind ? iconMap[ind.id] || ShoppingBag : ShoppingBag

  if (!ind) {
    return (
      <div className="flex flex-col min-h-screen bg-[#ECEBE9] text-black font-sans">
        <Header navigationData={navigationData} />
        <main className="flex-grow flex flex-col items-center justify-center py-20 text-center space-y-6">
          <h1 className="text-2xl font-black">404 - BLUEPRINT NOT FOUND</h1>
          <p className="text-neutral-500 text-sm max-w-md">The industry vertical you are looking for does not exist.</p>
          <Link
            href="/industries"
            className="px-6 py-2 border border-black hover:bg-black hover:text-[#ECEBE9] transition-all text-xs font-bold"
          >
            RETURN TO INDUSTRIES
          </Link>
        </main>
        <Footer />
      </div>
    )
  }

  const faqTabs = [
    {
      name: `${ind.title} FAQs`,
      value: 'general',
      faqs: ind.faqs.map((faq, i) => ({
        id: `faq-ind-${i}`,
        question: faq.question,
        answer: faq.answer
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
            'WhatsApp Business API is the official Meta product designed for businesses that need to message customers at scale (5+ agents or 1000+ messages/day). Unlike the free WhatsApp Business app, the API supports automation, integrations and multi-agent inboxes. AI Greentick is an Official BSP — we get you set up in 10 minutes.'
        },
        {
          id: 'faq-gen-2',
          question: 'Can I get the Green Tick verification?',
          answer:
            'Yes. We help you apply for the WhatsApp Green Tick (verified business badge) for free on all paid plans. Approval depends on Meta\'s criteria — typically requires public press mentions and active business presence.'
        },
        {
          id: 'faq-gen-3',
          question: 'Will my existing WhatsApp Business app data transfer?',
          answer:
            'When you move to the WhatsApp Business API, you migrate the number — but the chat history in the WhatsApp Business app doesn\'t carry over. We recommend backing up important conversations before migration.'
        },
        {
          id: 'faq-gen-4',
          question: 'How long does setup take?',
          answer:
            'Most customers go live in 24 hours. Meta verification typically takes 1-3 business days for new businesses.'
        },
        {
          id: 'faq-gen-5',
          question: 'Can I use my existing number?',
          answer:
            'Yes, but the number must be removed from the WhatsApp Business app or personal WhatsApp first. Once it\'s on the API, you can\'t use it in the consumer apps simultaneously.'
        }
      ]
    },
    {
      name: 'Pricing & Trial',
      value: 'pricing',
      faqs: [
        {
          id: 'faq-pr-1',
          question: 'How much does AI Greentick cost?',
          answer:
            'Plans start at ₹2,499/month for the Starter plan. WhatsApp also charges per-conversation fees directly (₹0.88 for marketing, ₹0.12 for utility messages in India). You pay AiSensy for the platform, Meta for conversations. No setup fees.'
        },
        {
          id: 'faq-pr-2',
          question: 'Is there a free trial?',
          answer:
            'Yes — 14-day free trial on all paid plans. No credit card required to start.'
        }
      ]
    }
  ]

  return (
    <div className="flex flex-col min-h-screen bg-[#ECEBE9] text-black">
      {/* Header */}
      <Header navigationData={navigationData} />

      {/* Main Container */}
      <main className="flex-grow bg-[#ECEBE9]/50 pb-20 sm:pb-28">

        {/* Top Hero Section */}
        <section className="px-4 sm:px-6 lg:px-8 border-b border-[#C5C4C2] bg-[#ECEBE9]">
          <div className="mx-auto max-w-7xl border-x border-[#C5C4C2] px-4 sm:px-6 lg:px-8 py-10 space-y-8">
            {/* Back Button */}
            <div className="font-sans">
              <Link
                href="/industries"
                className="inline-flex items-center gap-2 px-4 py-2 border border-[#C5C4C2] bg-[#ECEBE9] text-xs font-bold hover:border-black transition-colors"
                style={{ clipPath: 'polygon(6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%, 0 6px)' }}
              >
                <ArrowLeft className="size-4 text-[#00b259]" />
                <span>BACK TO BLUEPRINTS</span>
              </Link>
            </div>

            {/* Split Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pb-8">
              {/* Left Details */}
              <div className="lg:col-span-6 space-y-6 font-sans">
                <div className="flex items-center gap-2">
                  <div className="p-2 border border-[#C5C4C2] bg-white text-black size-9 flex items-center justify-center shrink-0">
                    <Icon className="size-5 text-[#00b259]" />
                  </div>
                  <span className="px-2 py-0.5 text-[10px] font-bold text-[#00b259] border border-[#00b259]/30 bg-[#00b259]/5 uppercase tracking-widest">
                    {ind.title} BLUEPRINT
                  </span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-sans leading-tight text-black tracking-tight font-sans">
                  WhatsApp Solutions for {ind.title}
                </h1>

                <p className="text-neutral-500 font-sans text-sm sm:text-base leading-relaxed">
                  {ind.detailedDesc}
                </p>

                {/* Key Result Banner */}
                <div className="p-4 border border-[#00b259]/20 bg-[#00b259]/5 rounded-none flex items-center gap-3">
                  <div className="size-2 bg-[#00b259] rounded-full animate-ping" />
                  <div>
                    <div className="text-[10px] text-neutral-400 font-bold uppercase">PROVEN OUTCOME</div>
                    <div className="text-lg font-black text-black">{ind.metric}</div>
                  </div>
                </div>

                <div className="pt-4 flex flex-wrap gap-4">
                  <Link
                    href="#demo"
                    className="px-6 py-3 text-xs font-black text-white bg-gradient-to-r from-[#00b259] to-[#005c2b] hover:opacity-90 transition-opacity"
                    style={{ clipPath: 'polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)' }}
                  >
                    SCHEDULE CUSTOM DEMO
                  </Link>
                </div>
              </div>

              {/* Right Image */}
              <div className="lg:col-span-6">
                <div
                  className="border border-[#C5C4C2] bg-white overflow-hidden aspect-video relative shadow-lg"
                  style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 15px 100%, 0 calc(100% - 15px))' }}
                >
                  <img
                    src={ind.image}
                    alt={`${ind.title} WhatsApp flows illustration`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-[#00b259]/5 mix-blend-multiply pointer-events-none" />
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Benefits Grid */}
        <section className="px-4 sm:px-6 lg:px-8 border-b border-[#C5C4C2] bg-[#ECEBE9]/30">
          <div className="mx-auto max-w-7xl border-x border-[#C5C4C2] px-4 sm:px-6 lg:px-8 py-16 sm:py-24 space-y-12">

            <div className="text-center space-y-4 max-w-3xl mx-auto font-sans">
              <span className="inline-block px-2.5 py-0.5 text-[10px] font-bold text-[#00b259] border border-[#00b259]/30 bg-[#00b259]/5">
                :: KEY CAPABILITIES ::
              </span>
              <h2 className="text-2xl sm:text-3xl font-sans font-bold text-black">
                Why {ind.title} brands leverage AIGreenTick.
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 font-sans">
              {ind.keyBenefits.map((benefit, i) => (
                <div
                  key={i}
                  className="border border-[#C5C4C2] bg-[#ECEBE9] p-6 space-y-3 relative"
                  style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 10px 100%, 0 calc(100% - 10px))' }}
                >
                  <span className="absolute top-2 right-2 text-xs font-bold text-[#00b259]">[ 0{i + 1} ]</span>
                  <h3 className="text-sm font-black text-black uppercase">{benefit.title}</h3>
                  <p className="text-xs text-neutral-500 leading-relaxed font-sans">{benefit.description}</p>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* Use cases workflows section */}
        <section className="px-4 sm:px-6 lg:px-8 border-b border-[#C5C4C2] bg-[#ECEBE9]/50">
          <div className="mx-auto max-w-7xl border-x border-[#C5C4C2] px-4 sm:px-6 lg:px-8 py-16 sm:py-24 space-y-12">

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              {/* Left Column: Description */}
              <div className="lg:col-span-5 font-sans space-y-6 flex flex-col justify-center">
                <span className="px-2 py-0.5 text-[9px] font-bold text-[#00b259] border border-[#00b259]/30 bg-[#00b259]/5 uppercase w-fit">
                  Workflow Execution
                </span>

                <h3 className="text-2xl sm:text-3xl font-sans font-bold text-black leading-tight">
                  Step-by-step automation blueprints.
                </h3>

                <p className="text-xs text-neutral-500 font-sans leading-relaxed">
                  These custom-tailored automation paths plug directly into CRM dashboards, shipping modules, scheduling software, and communication databases.
                </p>
              </div>

              {/* Right Column: Numeric Workflows */}
              <div className="lg:col-span-7 bg-white border border-[#C5C4C2] p-8 sm:p-12 flex flex-col gap-8 font-sans"
                style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 15px 100%, 0 calc(100% - 15px))' }}
              >
                <h4 className="text-xs font-black text-neutral-400 uppercase tracking-widest">[ AUTOMATED SEQUENCE ]</h4>
                <ul className="space-y-6">
                  {ind.useCases.map((uc, i) => (
                    <li key={i} className="flex items-start gap-4">
                      <span className="flex items-center justify-center size-6 border border-[#C5C4C2] rounded-full text-xs text-[#00b259] font-bold shrink-0 mt-0.5 font-sans">
                        {i + 1}
                      </span>
                      <span className="text-xs sm:text-sm text-neutral-700 font-sans leading-relaxed">
                        {uc}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>
        </section>

        {/* Dynamic FAQ Section */}
        <div id="faq">
          <FAQ tabs={faqTabs} />
        </div>

        {/* Bottom CTA */}
        <section className="px-4 sm:px-6 lg:px-8 bg-[#ECEBE9]/50">
          <div className="mx-auto max-w-7xl border-x border-[#C5C4C2] px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center space-y-6">
            <h2 className="text-3xl sm:text-4xl font-sans font-bold text-black">
              Power WhatsApp automation for {ind.title}.
            </h2>
            <p className="text-neutral-500 font-sans text-xs sm:text-sm max-w-md mx-auto">
              Unlock the official WhatsApp Business API with AIGreenTick. Seamless integration, premium automation workflows, and zero markups.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4 font-sans">
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
                BOOK SECTOR CONSULTATION
              </Link>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
