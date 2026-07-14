import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import {
  Users,
  Contact,
  MessageSquare,
  Globe,
  ArrowRight,
  CheckCircle,
  MessageCircle,
  Clock,
  Sparkles,
  ShieldCheck
} from 'lucide-react'

import { Card, CardContent } from '@/components/ui/card'
import { MotionPreset } from '@/components/ui/motion-preset'
import Header from '@/components/shadcn-studio/blocks/hero-section-40/header'
import Breadcrumb from '@/components/ui/breadcrumb'
import Footer from '@/components/shadcn-studio/blocks/footer/footer'
import { JsonLd } from '@/components/json-ld'
import type { Navigation } from '@/components/shadcn-studio/blocks/hero-section-40/hero-navigation'
import CTA from '@/components/shadcn-studio/blocks/cta-section-11/cta-section-11'

export const metadata: Metadata = {
  title: 'WhatsApp Shared Team Inbox — AI Greentick',
  description: 'Manage WhatsApp customer conversations collectively with a multi-agent Shared Team Inbox. Route chats, manage customer attributes, translate messages, and automate support.',
  alternates: {
    canonical: '/team-inbox',
  },
  openGraph: {
    title: 'WhatsApp Shared Team Inbox — AI Greentick',
    description: 'Manage WhatsApp customer conversations collectively with a multi-agent Shared Team Inbox. Route chats, manage customer attributes, translate messages, and automate support.',
    url: '/team-inbox',
    type: 'website',
  }
}

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
            icon: <Users className='size-4' />
          },
          {
            title: 'Customer Onboarding',
            href: '/#features',
            description: 'Automate welcome emails, account setup, and key guidance.',
            icon: <Users className='size-4' />
          },
          {
            title: 'Support Escalations',
            href: '/#features',
            description: 'Detect urgency and route issues to the right team faster.',
            icon: <Users className='size-4' />
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
            icon: <Users className='size-4' />
          },
          {
            title: 'Task Automation',
            href: '/#features',
            description: 'Convert messages into tasks and assign them automatically.',
            icon: <Users className='size-4' />
          },
          {
            title: 'Data Cleanup',
            href: '/#features',
            description: 'Auto-correct entries, remove duplicates, sync records.',
            icon: <Users className='size-4' />
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

const features = [
  {
    icon: Users,
    title: 'Organize Teams',
    description: 'Create agent departments (Sales, Billing, Tier 1 Support) and route chats automatically.'
  },
  {
    icon: Contact,
    title: 'Manage Contacts',
    description: 'Search, filter, tag, and assign custom parameters to users right from the chat panel.'
  },
  {
    icon: MessageSquare,
    title: 'Share Conversations',
    description: 'Never double-reply to a client. Collaborate on customer queries seamlessly in real-time.'
  },
  {
    icon: Globe,
    title: 'AI Translations',
    description: 'Auto-translate client WhatsApp messages and reply instantly in their preferred language.'
  }
]

const details = [
  {
    tag: ':: MULTI-AGENT COLLABORATION ::',
    title: 'Organize users and teams',
    subtitle: 'Manage conversations better by assigning chats to agents.',
    points: [
      'Create team structures for support, sales, billing, and technical queries.',
      'Auto-route incoming WhatsApp messages based on agent availability or keywords.',
      'Internal notes allow agents to discuss a issue privately on the same chat window.'
    ],
    image: '/team-org.png',
    reverse: false
  },
  {
    tag: ':: RICH CRM METADATA ::',
    title: 'Manage Contacts & Segments',
    subtitle: 'Easily database and classify thousands of customer contacts.',
    points: [
      'Import, search, filter, and organize contacts based on custom tags.',
      'Add parameters like order ID, lifecycle stage, or priority levels.',
      'Directly sync contact details with your HubSpot, Shopify, or custom CRM.'
    ],
    image: '/contact-mgmt.png',
    reverse: true
  },
  {
    tag: ':: AUTOMATION & SPEED ::',
    title: 'Engage, sell and support',
    subtitle: 'Personalize messages and accelerate response workflows.',
    points: [
      'Build drag-and-drop AI chatbots to answer repetitive FAQs 24/7.',
      'Utilize quick replies and canned template messages for instant resolution.',
      'Handoff complex sales deals or technical errors to live human agents seamlessly.'
    ],
    image: '/quick-reply.png',
    reverse: false
  },
  {
    tag: ':: GLOBAL LOCALIZATION ::',
    title: 'Translate, reply, and resolve',
    subtitle: 'Handle international queries inside the Shared Team Inbox.',
    points: [
      'Detect and translate incoming messages from 100+ global languages.',
      'Compose replies in your language and auto-convert back to client’s language.',
      'Deliver localized support without hiring multi-lingual support teams.'
    ],
    image: '/chat-translate.png',
    reverse: true
  }
]

const testimonials = [
  {
    quote: "AI Greentick's Shared Inbox transformed our support setup. We reduced response times by 65% and our agents collaborate on complex queries without stepping on each other's toes.",
    author: "Mohit Sharma",
    role: "Head of Operations",
    company: "Vivid Solutions",
    avatarColor: "bg-emerald-100 text-emerald-800"
  },
  {
    quote: "Managing 500+ client queries a day on standard WhatsApp was a nightmare. Moving to AI Greentick gave us meta verification, green tick, and a dashboard that handles all sales chats on one number.",
    author: "Ananya Mehta",
    role: "Co-Founder",
    company: "Craft & Bloom",
    avatarColor: "bg-green-100 text-green-800"
  }
]

export default function TeamInboxPage() {
  const jsonLdData = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "AI Greentick Shared Team Inbox",
    "image": "https://ai-green-tick-theta.vercel.app/team-inbox-hero.png",
    "description": "Collaborative shared inbox for WhatsApp Business API. Multi-agent support, contact tagging, AI translation, and CRM integration.",
    "brand": {
      "@type": "Brand",
      "name": "AI Greentick"
    },
    "offers": {
      "@type": "Offer",
      "url": "https://ai-green-tick-theta.vercel.app/pricing",
      "priceCurrency": "INR",
      "price": "2499",
      "valueAddedTaxIncluded": "true"
    }
  }

  return (
    <div className='flex min-h-screen flex-col bg-white text-black font-sans'>
      <JsonLd data={jsonLdData} />
      <Header navigationData={navigationData} />
      <Breadcrumb />

      <main className='flex-1'>
        {/* Hero Section */}
        <section className='px-4 sm:px-6 lg:px-8 bg-[#ECEBE9]/30 border-b border-[#C5C4C2]'>
          <div className='mx-auto max-w-7xl border-x border-[#C5C4C2] px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32'>
            <div className='grid gap-12 lg:grid-cols-2 lg:items-center'>
              <div className='space-y-8 text-left'>
                <span className="px-3 py-1 text-xs font-bold text-[#00b259] border border-[#00b259] bg-[#00b259]/10 font-mono inline-block">
                  :: SHARED INBOX PRODUCT ::
                </span>
                <h1 className='text-4xl font-extrabold tracking-tight text-neutral-900 sm:text-5xl md:text-6xl font-display leading-none'>
                  Manage WhatsApp conversations <span className='text-[#00b259]'>more easily.</span>
                </h1>
                <p className='text-neutral-600 text-base sm:text-lg max-w-xl font-sans leading-relaxed'>
                  Centralize client message management, agent assignments, and customer support databases on one collaborative screen powered by official WhatsApp Business API.
                </p>
                <div className='flex flex-wrap gap-4 pt-2'>
                  <Link
                    href='/pricing'
                    className='px-8 py-3.5 text-sm font-bold text-white bg-black hover:bg-black/90 transition-all duration-300 tracking-wider font-sans inline-flex items-center gap-2'
                    style={{ clipPath: 'polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)' }}
                  >
                    START 14-DAY TRIAL <ArrowRight className='size-4' />
                  </Link>
                  <Link
                    href='/contact'
                    className='px-8 py-3.5 text-sm font-bold text-black border border-[#C5C4C2] bg-white hover:bg-neutral-50 transition-all duration-300 tracking-wider font-sans inline-flex items-center'
                    style={{ clipPath: 'polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)' }}
                  >
                    BOOK A DEMO
                  </Link>
                </div>
                <div className='flex items-center gap-6 pt-4 text-xs text-neutral-500 font-mono'>
                  <span className='flex items-center gap-1.5'><CheckCircle className='size-4 text-[#00b259]' /> No Credit Card Required</span>
                  <span className='flex items-center gap-1.5'><CheckCircle className='size-4 text-[#00b259]' /> Official Meta BSP</span>
                </div>
              </div>
              <div className='relative flex justify-center'>
                <div className='border border-[#C5C4C2] bg-white p-2 shadow-2xl relative max-w-full overflow-hidden' style={{ clipPath: 'polygon(15px 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%, 0 15px)' }}>
                  <Image
                    src='/team-inbox-hero.png'
                    alt='AI Greentick Shared Team Inbox Interface Mockup'
                    width={600}
                    height={380}
                    className='object-cover max-w-full'
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Cards Grid */}
        <section className='px-4 sm:px-6 lg:px-8 border-b border-[#C5C4C2] bg-white'>
          <div className='mx-auto max-w-7xl border-x border-[#C5C4C2] px-4 sm:px-6 lg:px-8 py-16 sm:py-24'>
            <div className='grid gap-8 sm:grid-cols-2 lg:grid-cols-4'>
              {features.map((feat, idx) => {
                const IconComp = feat.icon
                return (
                  <MotionPreset key={idx} fade slide={{ direction: 'up', offset: 20 }} delay={idx * 0.1} transition={{ duration: 0.5 }}>
                    <Card className='h-full shadow-none border-[#C5C4C2] bg-white text-black rounded-none transition-all duration-300 hover:border-[#00b259] hover:shadow-[0_0_15px_rgba(0,178,89,0.1)]'>
                      <CardContent className='flex flex-col gap-4 p-6 text-left font-sans'>
                        <div className='flex size-11 items-center justify-center rounded-none border border-[#C5C4C2] bg-[#00b259]/10 text-[#00b259]'>
                          <IconComp className='size-5' />
                        </div>
                        <h3 className='text-lg font-bold font-display'>{feat.title}</h3>
                        <p className='text-neutral-500 text-[14px] leading-relaxed font-sans'>{feat.description}</p>
                      </CardContent>
                    </Card>
                  </MotionPreset>
                )
              })}
            </div>
          </div>
        </section>

        {/* Highlight Banner */}
        <section className='bg-[#FFF9D6] border-b border-[#C5C4C2] px-4 sm:px-6 lg:px-8 text-center'>
          <div className='mx-auto max-w-7xl border-x border-[#C5C4C2] px-4 sm:px-6 lg:px-8 py-8'>
            <h2 className='text-md sm:text-lg font-bold font-mono tracking-widest text-neutral-800 uppercase'>
              :: Effortless management of customer and prospect communication ::
            </h2>
          </div>
        </section>

        {/* Z-Pattern Detailed Features */}
        <section className='bg-white px-4 sm:px-6 lg:px-8'>
          <div className='mx-auto max-w-7xl border-x border-[#C5C4C2]'>
            {details.map((detail, idx) => (
              <div
                key={idx}
                className={`grid gap-12 lg:grid-cols-2 lg:items-center py-16 sm:py-24 px-4 sm:px-8 lg:px-12 border-b border-[#C5C4C2] last:border-b-0`}
              >
                <div className={`space-y-6 text-left ${detail.reverse ? 'lg:order-2' : ''}`}>
                  <span className='px-3 py-1 text-xs font-bold text-[#00b259] border border-[#00b259] bg-[#00b259]/10 font-mono inline-block'>
                    {detail.tag}
                  </span>
                  <h2 className='text-3xl font-bold text-neutral-900 font-display leading-tight'>
                    {detail.title}
                  </h2>
                  <p className='text-[#005c2b] font-medium font-sans text-[15px]'>
                    {detail.subtitle}
                  </p>
                  <ul className='space-y-3 font-sans text-neutral-600 text-[14px] leading-relaxed'>
                    {detail.points.map((pt, pIdx) => (
                      <li key={pIdx} className='flex items-start gap-2'>
                        <span className='text-[#00b259] font-bold mt-0.5'>✓</span>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={`flex justify-center ${detail.reverse ? 'lg:order-1' : ''}`}>
                  <div className='border border-[#C5C4C2] p-1.5 bg-neutral-50 shadow-lg' style={{ clipPath: 'polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px)' }}>
                    <Image
                      src={detail.image}
                      alt={detail.title}
                      width={480}
                      height={320}
                      className='object-cover max-w-full'
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Customer Testimonials (Yellow background section) */}
        <section className='bg-[#FFF9D6]/80 border-t border-b border-[#C5C4C2] px-4 sm:px-6 lg:px-8 text-center'>
          <div className='mx-auto max-w-7xl border-x border-[#C5C4C2] px-4 sm:px-6 lg:px-8 py-16 sm:py-24 space-y-12'>
            <div className='flex flex-col items-center gap-3'>
              <span className="px-3 py-1 text-xs font-bold text-[#00b259] border border-[#00b259] bg-[#00b259]/10 font-mono inline-block">
                :: CUSTOMER VOICES ::
              </span>
              <h2 className='text-3xl font-extrabold tracking-tight text-neutral-900 md:text-4xl font-display'>
                What our customers think of AI Greentick
              </h2>
              <p className='text-neutral-600 max-w-xl text-xs sm:text-sm font-sans'>
                Hear from support teams and business owners who switched from consumer WhatsApp apps to our enterprise platform.
              </p>
            </div>

            <div className='grid gap-8 md:grid-cols-2 max-w-5xl mx-auto'>
              {testimonials.map((test, idx) => (
                <MotionPreset key={idx} fade slide={{ direction: 'up', offset: 20 }} delay={idx * 0.1} transition={{ duration: 0.5 }}>
                  <Card className='h-full border border-[#C5C4C2] bg-white text-black shadow-none rounded-none text-left'>
                    <CardContent className='flex flex-col gap-6 p-8 font-sans justify-between h-full'>
                      <p className='text-neutral-700 italic text-[15px] leading-relaxed font-sans'>
                        "{test.quote}"
                      </p>
                      <div className='flex items-center gap-3'>
                        <div className={`size-10 rounded-full flex items-center justify-center font-bold ${test.avatarColor}`}>
                          {test.author[0]}
                        </div>
                        <div>
                          <h4 className='font-bold text-sm text-neutral-900'>{test.author}</h4>
                          <p className='text-xs text-neutral-500'>{test.role}, {test.company}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </MotionPreset>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <CTA />
      </main>

      <Footer />
    </div>
  )
}
