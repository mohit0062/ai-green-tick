import Link from 'next/link'
import { Check, HelpCircle, Info, ShieldCheck, Zap, Sparkles, Globe, Building2, ChevronDown, Plus, Minus, BookOpen } from 'lucide-react'
import Header from '@/components/shadcn-studio/blocks/hero-section-40/header'
import Breadcrumb from '@/components/ui/breadcrumb'
import Footer from '@/components/shadcn-studio/blocks/footer/footer'
import type { Navigation } from '@/components/shadcn-studio/blocks/hero-section-40/hero-navigation'
import FAQ from '@/components/shadcn-studio/blocks/faq-component-04/faq-component-04'
import Pricing from '@/components/shadcn-studio/blocks/pricing-component-11/pricing-component-11'
import CTA from '@/components/shadcn-studio/blocks/cta-section-11/cta-section-11'
import type { Metadata } from 'next'
import { JsonLd } from '@/components/json-ld'
export const dynamic = 'force-dynamic'
import { getSiteSection } from '@/utils/cms'

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

const faqTabs = [
  {
    name: 'Pricing & Plans',
    value: 'general',
    faqs: [
      {
        id: 'faq-1',
        question: 'Is there a free trial?',
        answer: 'Yes. We offer a 14-day free trial on all Starter, Growth, and Business plans with full platform access. No credit card details are required to sign up.'
      },
      {
        id: 'faq-2',
        question: 'Do you charge per agent?',
        answer: 'No. AIGreenTick does not charge per agent. All plans include unlimited agent seats (except for the Starter tier, which is capped at 3 agents) so your entire support and sales teams can collaborate.'
      },
      {
        id: 'faq-3',
        question: 'What happens if I exceed my plan\'s conversation limits?',
        answer: 'There are no surprise charges. If you exceed the direct thresholds, extra conversation windows are billed directly at Meta\'s official rates. We never charge overage fees or platform penalty rates.'
      },
      {
        id: 'faq-4',
        question: 'Can I change plans mid-month?',
        answer: 'Yes. Upgrades take effect immediately and are pro-rated. Downgrades take effect at the start of your next billing cycle, ensuring you get full access to what you paid for.'
      },
      {
        id: 'faq-5',
        question: 'Is there a discount for annual billing?',
        answer: 'Yes. If you choose annual billing, we offer a significant 20% discount across all Starter, Growth, and Business plans, which is billed annually.'
      }
    ]
  },
  {
    name: 'API & Verification',
    value: 'api',
    faqs: [
      {
        id: 'faq-6',
        question: 'What is the WhatsApp Business API and do I need it?',
        answer: 'WhatsApp Business API is the official Meta product designed for businesses that need to message customers at scale (5+ agents or 1000+ messages/day). Unlike the free WhatsApp Business app, the API supports automation, integrations and multi-agent inboxes. AI Greentick is an Official BSP — we get you set up in 10 minutes.'
      },
      {
        id: 'faq-7',
        question: 'Can I get the Green Tick verification?',
        answer: 'Yes. We help you apply for the WhatsApp Green Tick (verified business badge) for free on all paid plans. Approval depends on Meta\'s criteria — typically requires public press mentions and active business presence.'
      },
      {
        id: 'faq-8',
        question: 'Will my existing WhatsApp Business app data transfer?',
        answer: 'When you move to the WhatsApp Business API, you migrate the number — but the chat history in the WhatsApp Business app doesn\'t carry over. We recommend backing up important conversations before migration.'
      },
      {
        id: 'faq-9',
        question: 'Can I use my existing number?',
        answer: 'Yes, but the number must be removed from the WhatsApp Business app or personal WhatsApp first. Once it\'s on the API, you can\'t use it in the consumer apps simultaneously.'
      }
    ]
  }
]

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSiteSection<any>('seo')
  const title = `Simple, Transparent Pricing Plans | ${seo.siteTitle || 'AI Greentick'}`
  const description = `Choose the best WhatsApp Business API plan for your business. Flat monthly platform fees, unlimited agents, and zero markup on official Meta rates.`
  return {
    title,
    description,
    alternates: {
      canonical: 'https://ai-green-tick-theta.vercel.app/pricing',
    },
    openGraph: {
      title,
      description,
      url: 'https://ai-green-tick-theta.vercel.app/pricing',
      type: 'website',
      images: [
        {
          url: seo.ogImage || '/og-image.png',
          width: 1200,
          height: 630,
          alt: 'AI Greentick Pricing',
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [seo.ogImage || '/og-image.png'],
    }
  }
}

export default function PricingPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqTabs.flatMap((tab: any) => 
      (tab.faqs || []).map((faq: any) => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#ECEBE9] text-black">
      <JsonLd data={faqSchema} />
      {/* Header */}
      <Header navigationData={navigationData} />
      <Breadcrumb />

      {/* Hero Header */}
      <section className="px-4 sm:px-6 lg:px-8 border-b border-[#C5C4C2]">
        <div className="mx-auto max-w-7xl border-x border-[#C5C4C2] px-4 sm:px-6 lg:px-8 py-12 sm:py-20 text-center space-y-6">
          <span className="inline-block px-3 py-1 text-xs font-bold text-[#00b259] border border-[#00b259] bg-[#00b259]/10 font-mono tracking-wider">
            :: FLAT RATE FEES ::
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display tracking-tight leading-none text-black">
            Simple pricing. No surprises. No markups.
          </h1>
          <p className="text-neutral-500 max-w-3xl mx-auto text-sm sm:text-base font-sans">
            One flat monthly fee based on your plan. WhatsApp conversation charges billed at Meta's official rates — we don't mark them up. What you see is what you pay.
          </p>
        </div>
      </section>

      {/* Principles Section */}
      <section className="px-4 sm:px-6 lg:px-8 border-b border-[#C5C4C2] bg-[#ECEBE9]/30">
        <div className="mx-auto max-w-7xl border-x border-[#C5C4C2] px-4 sm:px-6 lg:px-8 py-8 sm:py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            {/* Principle 1 */}
            <div className="border border-[#C5C4C2] bg-[#ECEBE9] p-6 font-sans space-y-3 relative"
              style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 10px 100%, 0 calc(100% - 10px))' }}
            >
              <span className="absolute top-2 right-2 text-xs font-bold text-[#00b259]">[ 01 ]</span>
              <h3 className="text-sm font-black text-black">NO HIDDEN FEES</h3>
              <p className="text-xs text-neutral-500 leading-relaxed font-sans">
                No per-agent charges. No setup fees. No overage surprises. Access features fully within your plan.
              </p>
            </div>

            {/* Principle 2 */}
            <div className="border border-[#C5C4C2] bg-[#ECEBE9] p-6 font-sans space-y-3 relative"
              style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 10px 100%, 0 calc(100% - 10px))' }}
            >
              <span className="absolute top-2 right-2 text-xs font-bold text-[#00b259]">[ 02 ]</span>
              <h3 className="text-sm font-black text-black">META RATES, NO MARKUP</h3>
              <p className="text-xs text-neutral-500 leading-relaxed font-sans">
                Meta conversation charges are billed directly at official Rates. We have absolute zero markup on conversation charges.
              </p>
            </div>

            {/* Principle 3 */}
            <div className="border border-[#C5C4C2] bg-[#ECEBE9] p-6 font-sans space-y-3 relative"
              style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 10px 100%, 0 calc(100% - 10px))' }}
            >
              <span className="absolute top-2 right-2 text-xs font-bold text-[#00b259]">[ 03 ]</span>
              <h3 className="text-sm font-black text-black">MONTH-TO-MONTH</h3>
              <p className="text-xs text-neutral-500 leading-relaxed font-sans">
                No annual contract required to get started. Cancel or change plans anytime directly from your billing tab.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Plans Section */}
      <Pricing showHeaders={false} />

      {/* Meta Conversation Charges */}
      <section className="px-4 sm:px-6 lg:px-8 border-b border-[#C5C4C2] bg-[#ECEBE9]/30 pb-16 sm:pb-24">
        <div className="mx-auto max-w-7xl border-x border-[#C5C4C2] px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-12">

          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <span className="inline-block px-2.5 py-0.5 text-[10px] font-bold text-[#00b259] border border-[#00b259]/30 bg-[#00b259]/5 font-mono">
              :: META CONVERSATION FEES ::
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-black">
              How WhatsApp conversation charges work.
            </h2>
            <p className="text-neutral-500 font-sans text-xs sm:text-sm leading-relaxed">
              Meta charges per 24-hour conversation window, not per message. Rates vary by conversation category. AIGreenTick charges Meta's official rates with <strong>zero markup.</strong>
            </p>
          </div>

          {/* Grid Layout of table and info cards */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 font-sans">
            <div
              className="lg:col-span-8 border border-[#C5C4C2] bg-[#ECEBE9] overflow-hidden"
              style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 12px 100%, 0 calc(100% - 12px))' }}
            >
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs min-w-[500px]">
                  <thead>
                    <tr className="bg-black text-[#ECEBE9] border-b border-[#C5C4C2] text-[10px] tracking-wider uppercase font-bold">
                      <th className="p-4 sm:p-5">Category</th>
                      <th className="p-4 sm:p-5">Description</th>
                      <th className="p-4 sm:p-5 text-right">Typical Rate (India)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#C5C4C2]/50 text-neutral-800">
                    <tr className="hover:bg-white/30 transition-colors">
                      <td className="p-4 font-bold text-black flex items-center gap-1.5">
                        <span className="size-2 bg-red-500 rounded-full" /> Marketing
                      </td>
                      <td className="p-4 font-sans text-neutral-500">Promotional messages you initiate (offers, newsletters)</td>
                      <td className="p-4 text-right font-bold text-black">See Meta pricing</td>
                    </tr>
                    <tr className="hover:bg-white/30 transition-colors">
                      <td className="p-4 font-bold text-black flex items-center gap-1.5">
                        <span className="size-2 bg-blue-500 rounded-full" /> Utility
                      </td>
                      <td className="p-4 font-sans text-neutral-500">Transactional messages (orders, confirmations, shipping alerts)</td>
                      <td className="p-4 text-right font-bold text-black">See Meta pricing</td>
                    </tr>
                    <tr className="hover:bg-white/30 transition-colors">
                      <td className="p-4 font-bold text-black flex items-center gap-1.5">
                        <span className="size-2 bg-yellow-500 rounded-full" /> Authentication
                      </td>
                      <td className="p-4 font-sans text-neutral-500">Secure OTPs, verifications and login alerts</td>
                      <td className="p-4 text-right font-bold text-black">See Meta pricing</td>
                    </tr>
                    <tr className="hover:bg-white/30 transition-colors">
                      <td className="p-4 font-bold text-black flex items-center gap-1.5">
                        <span className="size-2 bg-[#00b259] rounded-full" /> Service
                      </td>
                      <td className="p-4 font-sans text-neutral-500">Customer-initiated inquiries and direct support chats</td>
                      <td className="p-4 text-right font-bold text-[#00b259]">Free (within 24hr window)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div
              className="lg:col-span-4 border border-[#C5C4C2] bg-[#ECEBE9] p-6 space-y-6 flex flex-col justify-between"
              style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 12px 100%, 0 calc(100% - 12px))' }}
            >
              <div className="space-y-4">
                <h4 className="text-xs font-black text-black">ZERO CONVERSATION MARKUP</h4>
                <p className="text-xs text-neutral-500 leading-relaxed font-sans">
                  Unlike competitors who charge extra commissions or bundle messages at markup rates, AIGreenTick offers transparent pass-through pricing. We bill exactly what Meta bills us.
                </p>
              </div>

              <div className="pt-4 border-t border-[#C5C4C2]/40">
                <a
                  href="https://developers.facebook.com/docs/whatsapp/pricing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[10px] font-bold text-[#00b259] hover:underline"
                >
                  VIEW OFFICIAL META RATE CARD -&gt;
                </a>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Competitor Matrix Section */}
      <section id="comparison-matrix" className="px-4 sm:px-6 lg:px-8 border-b border-[#C5C4C2] bg-[#ECEBE9]/50">
        <div className="mx-auto max-w-7xl border-x border-[#C5C4C2] px-4 sm:px-6 lg:px-8 py-12 sm:py-24 space-y-12">

          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <span className="inline-block px-2.5 py-0.5 text-[10px] font-bold text-[#00b259] border border-[#00b259]/30 bg-[#00b259]/5 font-mono">
              :: COMPARE CAPABILITIES ::
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-black">
              What you get vs what competitors charge.
            </h2>
            <p className="text-neutral-500 font-sans text-xs sm:text-sm leading-relaxed">
              Before choosing a WhatsApp platform, check the fine print. See how AIGreenTick eliminates billing barriers.
            </p>
          </div>

          {/* Matrix Table */}
          <div
            className="border border-[#C5C4C2] bg-[#ECEBE9] overflow-hidden font-sans"
            style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 12px 100%, 0 calc(100% - 12px))' }}
          >
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs min-w-[700px]">
                <thead>
                  <tr className="bg-black text-[#ECEBE9] border-b border-[#C5C4C2] text-[10px] tracking-wider uppercase font-bold">
                    <th className="p-4 sm:p-5">Feature</th>
                    <th className="p-4 sm:p-5 text-neutral-400">AiSensy</th>
                    <th className="p-4 sm:p-5 text-neutral-400">WATI</th>
                    <th className="p-4 sm:p-5 text-neutral-400">Interakt</th>
                    <th className="p-4 sm:p-5 bg-[#ECEBE9] border-l border-r border-[#C5C4C2]">
                      <div className="flex items-center justify-center">
                        <img src="/logo-full.png" alt="AIGreenTick" className="h-6 w-auto select-none" />
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#C5C4C2]/50 text-neutral-800">
                  <tr className="hover:bg-white/30 transition-colors">
                    <td className="p-4 font-bold text-black">Unlimited agents</td>
                    <td className="p-4 font-sans text-neutral-500">Extra (Per User charges)</td>
                    <td className="p-4 font-sans text-neutral-500">Extra (Per User charges)</td>
                    <td className="p-4 font-sans text-neutral-500">Extra (Per User charges)</td>
                    <td className="p-4 font-bold text-[#00b259] bg-[#00b259]/5">Included (All Plans)</td>
                  </tr>
                  <tr className="hover:bg-white/30 transition-colors">
                    <td className="p-4 font-bold text-black">AI chatbot</td>
                    <td className="p-4 font-sans text-neutral-500">Extra add-on pricing</td>
                    <td className="p-4 font-sans text-neutral-500">Extra add-on pricing</td>
                    <td className="p-4 font-sans text-neutral-500">Basic Flows only</td>
                    <td className="p-4 font-bold text-[#00b259] bg-[#00b259]/5">All plans (No add-ons)</td>
                  </tr>
                  <tr className="hover:bg-white/30 transition-colors">
                    <td className="p-4 font-bold text-black">WhatsApp Commerce</td>
                    <td className="p-4 text-red-500 font-sans">✕ Not available</td>
                    <td className="p-4 text-red-500 font-sans">✕ Not available</td>
                    <td className="p-4 text-red-500 font-sans">✕ Not available</td>
                    <td className="p-4 font-bold text-[#00b259] bg-[#00b259]/5">✓ Included fully</td>
                  </tr>
                  <tr className="hover:bg-white/30 transition-colors">
                    <td className="p-4 font-bold text-black">Green Tick managed</td>
                    <td className="p-4 text-red-500 font-sans">✕ Pay setup fees</td>
                    <td className="p-4 text-red-500 font-sans">✕ Pay setup fees</td>
                    <td className="p-4 text-red-500 font-sans">✕ Pay setup fees</td>
                    <td className="p-4 font-bold text-[#00b259] bg-[#00b259]/5">✓ Managed free</td>
                  </tr>
                  <tr className="hover:bg-white/30 transition-colors">
                    <td className="p-4 font-bold text-black">India-based support</td>
                    <td className="p-4 text-red-500 font-sans">✕ Ticket queues only</td>
                    <td className="p-4 text-red-500 font-sans">✕ Ticket queues only</td>
                    <td className="p-4 font-sans text-neutral-500">Limited support hours</td>
                    <td className="p-4 font-bold text-[#00b259] bg-[#00b259]/5">✓ 24/7 Phone + Chat</td>
                  </tr>
                  <tr className="hover:bg-white/30 transition-colors">
                    <td className="p-4 font-bold text-black">Meta rate markup</td>
                    <td className="p-4 font-sans text-neutral-500">Yes (up to 15%)</td>
                    <td className="p-4 font-sans text-neutral-500">Yes (up to 20%)</td>
                    <td className="p-4 font-sans text-neutral-500">Yes (up to 10%)</td>
                    <td className="p-4 font-bold text-[#00b259] bg-[#00b259]/5">None (0% markup)</td>
                  </tr>
                  <tr className="hover:bg-white/30 transition-colors">
                    <td className="p-4 font-bold text-black">Free onboarding</td>
                    <td className="p-4 text-red-500 font-sans">✕ Paid setup support</td>
                    <td className="p-4 text-red-500 font-sans">✕ Paid setup support</td>
                    <td className="p-4 text-red-500 font-sans">✕ Paid setup support</td>
                    <td className="p-4 font-bold text-[#00b259] bg-[#00b259]/5">✓ Included free</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </section>

      {/* FAQ Section */}
      <div id="faq">
        <FAQ tabs={faqTabs} />
      </div>

      {/* Homepage CTA Section */}
      <CTA />

      {/* Footer */}
      <Footer />
    </div>
  )
}
