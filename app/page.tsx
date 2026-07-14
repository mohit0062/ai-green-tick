import { BookOpenIcon, BoxIcon, BrainCircuitIcon, CircleDollarSignIcon, Clock8Icon, CodeIcon, CreditCardIcon, FolderSyncIcon, FoldersIcon, GitCompareArrowsIcon, GitPullRequestDraftIcon, HeadphonesIcon, LightbulbIcon, MousePointerClick, PencilIcon, RocketIcon, ShieldBanIcon, ShieldCheckIcon, LockIcon, TicketIcon, Trash2Icon, TrendingUp, UserIcon, UsersIcon, WorkflowIcon } from 'lucide-react'
import BentoGrid07 from '@/components/shadcn-studio/blocks/bento-grid-07/bento-grid-07'
import BentoGrid18 from '@/components/shadcn-studio/blocks/bento-grid-18/bento-grid-18'
import CTA from '@/components/shadcn-studio/blocks/cta-section-11/cta-section-11'
import FAQ from '@/components/shadcn-studio/blocks/faq-component-04/faq-component-04'
import Features05 from '@/components/shadcn-studio/blocks/features-section-05/features-section-05'
import Features14 from '@/components/shadcn-studio/blocks/features-section-14/features-section-14'
import Features26 from '@/components/shadcn-studio/blocks/features-section-26/features-section-26'
import Header from '@/components/shadcn-studio/blocks/hero-section-40/header'
import HeroSection from '@/components/shadcn-studio/blocks/hero-section-40/hero-section-40'
import LogoCloud from '@/components/shadcn-studio/blocks/logo-cloud-04/logo-cloud-04'
import Pricing from '@/components/shadcn-studio/blocks/pricing-component-11/pricing-component-11'
import Process from '@/components/shadcn-studio/blocks/timeline-component-03/timeline-component-03'
import SocialProof from '@/components/shadcn-studio/blocks/social-proof-07/social-proof-07'
import IndustriesCarousel from '@/components/shadcn-studio/blocks/industries-carousel'
import TestimonialsComponent from '@/components/shadcn-studio/blocks/testimonials-component-23/testimonials-component-23'
import Footer from '@/components/shadcn-studio/blocks/footer/footer'


import { getSiteSection } from '@/utils/cms'
import { DEFAULT_FALLBACKS } from '@/utils/cms-data'

import type { Navigation } from '@/components/shadcn-studio/blocks/hero-section-40/hero-navigation'
import type { StackProps } from '@/components/shadcn-studio/blocks/bento-grid-18/card-stack'
import type { Testimonial } from '@/components/shadcn-studio/blocks/testimonials-component-23/testimonials-component-23'
import Link from 'next/link'
import { blogPosts } from '@/lib/blog-data'
import BlogCard from '@/components/shadcn-studio/blocks/blog-card'
import { brandLogos } from '@/lib/brand-logos'
import TargetCursor from '@/components/TargetCursor'
import Preloader from '@/components/preloader'

const navigationData: Navigation[] = [
  {
    title: 'Features',
    href: '#'
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
            href: '#',
            description: 'Track movement, update statuses, and flag stalled deals.',
            icon: (
              <GitPullRequestDraftIcon className='size-4' />
            )
          },
          {
            title: 'Customer Onboarding',
            href: '#',
            description: 'Automate welcome emails, account setup, and key guidance.',
            icon: (
              <UserIcon className='size-4' />
            )
          },
          {
            title: 'Support Escalations',
            href: '#',
            description: 'Detect urgency and route issues to the right team faster.',
            icon: (
              <HeadphonesIcon className='size-4' />
            )
          }
        ]
      },
      {
        type: 'section',
        title: 'Internal Productivity Workflows',
        items: [
          {
            title: 'Knowledge Retrieval',
            href: '#',
            description: 'Ask AI and get instant answers from your tools/docs.',
            icon: (
              <BrainCircuitIcon className='size-4' />
            )
          },
          {
            title: 'Task Automation',
            href: '#',
            description: 'Convert messages into tasks and assign them automatically.',
            icon: (
              <GitCompareArrowsIcon className='size-4' />
            )
          },
          {
            title: 'Data Cleanup',
            href: '#',
            description: 'Auto-correct entries, remove duplicates, sync records.',
            icon: (
              <Trash2Icon className='size-4' />
            )
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
    href: '#testimonials'
  },
  {
    title: 'Pricing',
    href: '/pricing'
  }
]



const images: StackProps['cardsData'] = [
  {
    id: 5,
    img: 'https://cdn.shadcnstudio.com/ss-assets/blocks/bento-grid/image-86.png',
    avatars: [
      { src: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-10.png', fallback: 'AB' },
      { src: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-12.png', fallback: 'JK' },
      { src: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-14.png', fallback: 'OP' },
      { src: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-16.png', fallback: 'NP' }
    ],
    title: 'React Calendar library',
    days: 1,
    href: '#'
  },
  {
    id: 4,
    img: 'https://cdn.shadcnstudio.com/ss-assets/blocks/bento-grid/image-85.png',
    avatars: [
      { src: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-3.png', fallback: 'AB' },
      { src: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-1.png', fallback: 'JK' },
      { src: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-5.png', fallback: 'OP' },
      { src: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-7.png', fallback: 'NP' }
    ],
    title: 'Pen tool in figma',
    days: 4,
    href: '#'
  },
  {
    id: 3,
    img: 'https://cdn.shadcnstudio.com/ss-assets/blocks/bento-grid/image-84.png',
    avatars: [
      { src: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-9.png', fallback: 'AB' },
      { src: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-11.png', fallback: 'JK' },
      { src: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-13.png', fallback: 'OP' },
      { src: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-15.png', fallback: 'NP' }
    ],
    title: 'Bootstrap Calendar library',
    days: 5,
    href: '#'
  },
  {
    id: 2,
    img: 'https://cdn.shadcnstudio.com/ss-assets/blocks/bento-grid/image-87.png',
    avatars: [
      { src: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-2.png', fallback: 'AB' },
      { src: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-4.png', fallback: 'JK' },
      { src: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-6.png', fallback: 'OP' },
      { src: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-8.png', fallback: 'NP' }
    ],
    title: 'Landing page design in figma',
    days: 7,
    href: '#'
  },
  {
    id: 1,
    img: 'https://cdn.shadcnstudio.com/ss-assets/blocks/bento-grid/image-83.png',
    avatars: [
      { src: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-3.png', fallback: 'AB' },
      { src: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-1.png', fallback: 'JK' },
      { src: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-5.png', fallback: 'OP' },
      { src: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-7.png', fallback: 'NP' }
    ],
    title: 'React Calendar library',
    days: 6,
    href: '#'
  }
]

const tabsDataFeaturesSection26 = [
  {
    id: 'marketing',
    icon: (
      <RocketIcon />
    ),
    title: 'Marketing',
    points: [
      'Broadcast personalized campaigns to 100K+ contacts with high delivery',
      'Run Click-to-WhatsApp ads and track every conversion',
      'Re-engage abandoned carts and dormant customers automatically'
    ]
  },
  {
    id: 'sales',
    icon: (
      <CircleDollarSignIcon />
    ),
    title: 'Sales',
    points: [
      'Qualify and route leads automatically using conversational AI',
      'Share interactive product catalogs and collect payments in chat',
      'Sync conversations with CRM tools (HubSpot, Salesforce) in real-time'
    ]
  },
  {
    id: 'support',
    icon: (
      <HeadphonesIcon />
    ),
    title: 'Support',
    points: [
      'Deploy 24/7 AI Agents to resolve FAQs instantly',
      'Multi-agent shared team inbox with quick routing and collaboration',
      'Measure CSAT, response times, and chat metrics automatically'
    ]
  }
]

const processSteps = [
  {
    icon: (
      <WorkflowIcon />
    ),
    title: 'Connect your number',
    description:
      'We help you onboard to the Official WhatsApp Business API, verify your business with Meta and apply for the Green Tick — all done in 10 minutes.',
    progress: 25,
    progressLabel: '25%',
    duration: '10 minutes'
  },
  {
    icon: (
      <UsersIcon />
    ),
    title: 'Import contacts & launch',
    description:
      'Upload contacts, build your first broadcast, invite agents to the shared inbox, and design a basic chatbot flow. Templates included.',
    progress: 50,
    progressLabel: '50%',
    duration: '1 hour'
  },
  {
    icon: (
      <BrainCircuitIcon />
    ),
    title: 'Automate & optimize',
    description:
      'Add abandoned cart flows, post-purchase journeys, FAQ bots. Track every metric. Iterate based on real engagement data.',
    progress: 75,
    progressLabel: '75%',
    duration: '1 day'
  },
  {
    icon: (
      <RocketIcon />
    ),
    title: 'Scale across teams',
    description:
      'Roll out to marketing, sales and support. Connect your CRM, Shopify or custom stack. Grow without growing headcount.',
    progress: 100,
    progressLabel: '100%',
    duration: 'Continuous'
  }
]

const metricsData = [
  {
    icon: (
      <BookOpenIcon />
    ),
    value: '98%',
    title: 'Open Rates',
    subtitle: 'vs 22% for email'
  },
  {
    icon: (
      <MousePointerClick />
    ),
    value: '45-60%',
    title: 'Click Rates',
    subtitle: 'vs 3% for email'
  },
  {
    icon: (
      <UsersIcon />
    ),
    value: '2.6B+',
    title: 'Active Users',
    subtitle: 'your customers are already here'
  },
  {
    icon: (
      <TrendingUp />
    ),
    value: '7×',
    title: 'Engagement',
    subtitle: 'vs email (Meta & Gartner research)'
  }
]

const testimonials: Testimonial[] = [
  {
    id: '1',
    avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-40.png',
    fallback: 'JL',
    name: 'Jamie Lee',
    designation: 'Operations Manager',
    companyName: 'Bright Sync',
    companyLogo: 'https://cdn.shadcnstudio.com/ss-assets/template/landing-page/orion/image-01.png',
    message:
      "This is completely transformed how we manage our daily tasks. What used to take hours now happens automatically and we've never been more productive."
  },
  {
    id: '2',
    avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-55.png',
    fallback: 'DH',
    name: 'David Haz',
    designation: 'CEO',
    companyName: 'Novas Solution',
    companyLogo: 'https://cdn.shadcnstudio.com/ss-assets/template/landing-page/orion/image-02.png',
    companyLogoDark: 'https://cdn.shadcnstudio.com/ss-assets/template/landing-page/orion/image-02-dark.png',
    message:
      "The intuitive interface and powerful features have streamlined our workflow. Our team collaboration improved dramatically and we've never been efficient."
  },
  {
    id: '3',
    avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-34.png',
    fallback: 'CD',
    name: 'Chánh Đại',
    designation: 'Design Engineer',
    companyName: 'Looma Labs',
    companyLogo: 'https://cdn.shadcnstudio.com/ss-assets/template/landing-page/orion/image-03.png',
    companyLogoDark: 'https://cdn.shadcnstudio.com/ss-assets/template/landing-page/orion/image-03-dark.png',
    message:
      "Implementing this solution was seamless and results were immediate. We've seen a 40% increase in efficiency and our customers are noticing difference."
  },
  {
    id: '4',
    avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-43.png',
    fallback: 'MS',
    name: 'Moumen Soliman',
    designation: 'Software Engineer',
    companyName: 'Crestline',
    companyLogo: 'https://cdn.shadcnstudio.com/ss-assets/template/landing-page/orion/image-04.png',
    companyLogoDark: 'https://cdn.shadcnstudio.com/ss-assets/template/landing-page/orion/image-04-dark.png',
    message:
      'From day one, this platform exceeded expectations. The customer support is outstanding and continuous updates keep bringing valuable features.'
  },
  {
    id: '5',
    avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-57.png',
    fallback: 'PJ',
    name: 'Praveen Juge',
    designation: 'Senior Developer',
    companyName: 'Cognitech Labs',
    companyLogo: 'https://cdn.shadcnstudio.com/ss-assets/template/landing-page/orion/image-05.png',
    companyLogoDark: 'https://cdn.shadcnstudio.com/ss-assets/template/landing-page/orion/image-05-dark.png',
    message:
      'As a developer, I appreciate the clean architecture and comprehensive docs. Integration was straightforward and it scales perfectly with our needs.'
  },
  {
    id: '6',
    avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-58.png',
    fallback: 'J',
    name: 'Julian',
    designation: 'Senior Developer',
    companyName: 'Tech Wave',
    companyLogo: 'https://cdn.shadcnstudio.com/ss-assets/template/landing-page/orion/image-06.png',
    message:
      'Our marketing campaigns have reached new heights with this tool. The analytics insights are detailed and help us make data-driven decisions every day.'
  }
]

const securityItems = [
  {
    icon: (
      <ShieldCheckIcon />
    ),
    title: 'Official BSP',
    description: 'Verified Meta Business Solution Provider'
  },
  {
    icon: (
      <LockIcon />
    ),
    title: 'GDPR Compliant',
    description: 'Your customer data stays protected'
  },
  {
    icon: (
      <ShieldBanIcon />
    ),
    title: 'End-to-end Encrypted',
    description: 'All messages secured by WhatsApp'
  }
]



const faqTabs = [
  {
    name: 'General',
    value: 'general',
    faqs: [
      {
        id: 'faq-1',
        question: 'What is the WhatsApp Business API and do I need it?',
        answer:
          'WhatsApp Business API is the official Meta product designed for businesses that need to message customers at scale (5+ agents or 1000+ messages/day). Unlike the free WhatsApp Business app, the API supports automation, integrations and multi-agent inboxes. AI Greentick is an Official BSP — we get you set up in 10 minutes.'
      },
      {
        id: 'faq-3',
        question: 'Can I get the Green Tick verification?',
        answer:
          'Yes. We help you apply for the WhatsApp Green Tick (verified business badge) for free on all paid plans. Approval depends on Meta\'s criteria — typically requires public press mentions and active business presence.'
      },
      {
        id: 'faq-4',
        question: 'Will my existing WhatsApp Business app data transfer?',
        answer:
          'When you move to the WhatsApp Business API, you migrate the number — but the chat history in the WhatsApp Business app doesn\'t carry over. We recommend backing up important conversations before migration.'
      },
      {
        id: 'faq-5',
        question: 'How long does setup take?',
        answer:
          'Most customers go live in 24 hours. Meta verification typically takes 1-3 business days for new businesses.'
      },
      {
        id: 'faq-6',
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
        id: 'faq-2',
        question: 'How much does AI Greentick cost?',
        answer:
          'Plans start at ₹2,499/month for the Starter plan. WhatsApp also charges per-conversation fees directly (₹0.88 for marketing, ₹0.12 for utility messages in India). You pay AiSensy for the platform, Meta for conversations. No setup fees.'
      },
      {
        id: 'faq-7',
        question: 'Is there a free trial?',
        answer:
          'Yes — 14-day free trial on all paid plans. No credit card required to start.'
      }
    ]
  }
]

const BlogSection = () => {
  const posts = blogPosts.slice(0, 3)

  return (
    <section id="blog" className="border-b px-4 sm:px-6 lg:px-8 bg-[#ECEBE9]/50">
      <div className="mx-auto max-w-7xl border-x px-4 sm:px-6 lg:px-8 space-y-12 border-[#C5C4C2] py-8 sm:py-16 lg:py-24">
        <div className="flex flex-col items-center gap-4 text-center">
          <span className="px-3 py-1 text-xs font-bold text-[#00b259] border border-[#00b259] bg-[#00b259]/10 font-mono">
            :: BLOG & RESOURCES ::
          </span>
          <h2 className="text-2xl font-bold sm:text-3xl lg:text-4xl text-black font-display">
            Latest Insights from Our Experts
          </h2>
          <p className="text-neutral-500 max-w-xl text-base font-sans">
            Stay updated with the latest trends, strategies, and tips on conversational AI and automation.
          </p>
        </div>

        <div className="flex overflow-x-auto md:grid md:grid-cols-3 gap-6 font-sans pb-4 snap-x snap-mandatory -mx-4 px-4 sm:-mx-6 sm:px-6 md:mx-0 md:px-0 scrollbar-thin">
          {posts.map((post) => (
            <BlogCard 
              key={post.slug} 
              post={post}
              className="w-[82vw] sm:w-[360px] md:w-auto shrink-0 snap-start"
            />
          ))}
        </div>

        {/* View All Articles Button */}
        <div className="flex justify-center pt-4">
          <Link
            href="/blog"
            className="px-8 py-3 text-xs font-bold text-white bg-black hover:bg-black/90 transition-colors tracking-widest font-sans"
            style={{ clipPath: 'polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)' }}
          >
            VIEW ALL ARTICLES
          </Link>
        </div>
      </div>
    </section>
  )
}

const HeroSection40Block = ({ data }: { data: any }) => {
  return (
    <main className='flex flex-col' id='about'>
      <HeroSection data={data} />
    </main>
  )
}

const LogoCloud04Block = ({ heading, logos }: { heading?: string; logos?: any[] }) => {
  return <LogoCloud heading={heading} brandLogos={logos} />
}

const BentoGrid18Block = () => {
  return (
    <div id="features">
      <BentoGrid18 />
    </div>
  )
}

const FeaturesSection26Block = ({ data }: { data: any[] }) => {
  return <Features26 data={data} />
}

const BentoGrid07Block = () => {
  return <BentoGrid07 />
}

const TimelineComponent03Block = ({ steps }: { steps: any[] }) => {
  return (
    <div id="solutions">
      <Process steps={steps} />
    </div>
  )
}

const SocialProof07Block = ({ metrics }: { metrics: any[] }) => {
  return <SocialProof metrics={metrics} />
}

const IndustriesCarouselBlock = () => {
  return <IndustriesCarousel />
}

const TestimonialsComponent23Block = ({ testimonials }: { testimonials: any[] }) => {
  return <TestimonialsComponent testimonials={testimonials} />
}



const FeaturesSection14Block = () => {
  return <Features14 />
}

const FeaturesSection05Block = ({ items }: { items: any[] }) => {
  return <Features05 featuresList={items} />
}

const PricingComponent11Block = ({ data }: { data: any }) => {
  return (
    <div id="pricing">
      <Pricing showHeaders={true} data={data} />
    </div>
  )
}

const FaqComponent04Block = ({ tabs }: { tabs: any[] }) => {
  return (
    <div id="faq">
      <FAQ tabs={tabs} />
    </div>
  )
}

const CtaSection11Block = () => {
  return (
    <div id="contact">
      <CTA />
    </div>
  )
}

const FooterBlock = () => {
  return <Footer />
}

export const dynamic = 'force-dynamic'

const LandingPage = async () => {
  const mergeWithDefaults = (dbContent: any, fallbackKey: string) => {
    const fallback = DEFAULT_FALLBACKS[fallbackKey] || {}
    if (!dbContent) return fallback
    const merged = { ...fallback, ...dbContent }
    for (const key of Object.keys(fallback)) {
      if (Array.isArray(dbContent[key]) && dbContent[key].length === 0 && Array.isArray(fallback[key]) && fallback[key].length > 0) {
        merged[key] = fallback[key]
      }
    }
    return merged
  }

  const homepage = mergeWithDefaults(await getSiteSection('homepage_data'), 'homepage_data')
  const logoCloud = mergeWithDefaults(await getSiteSection('logo_cloud'), 'logo_cloud')
  const pricing = mergeWithDefaults(await getSiteSection('pricing_data'), 'pricing_data')

  const pricingBlockData = {
    headerSubtitle: homepage.pricingSubtitle,
    headerDescription: homepage.pricingDescription,
    plans: pricing.plans
  }

  const tabsDataWithIcons = (homepage.tabsDataFeaturesSection26 || []).map((tab: any) => {
    let icon = <RocketIcon />
    if (tab.id === 'sales') {
      icon = <CircleDollarSignIcon />
    } else if (tab.id === 'support') {
      icon = <HeadphonesIcon />
    }
    return { ...tab, icon }
  })

  const processStepsWithIcons = (homepage.processSteps || []).map((step: any, idx: number) => {
    const titleLower = (step.title || '').toLowerCase()
    let icon = <WorkflowIcon />
    if (titleLower.includes('contact') || titleLower.includes('import') || titleLower.includes('user')) {
      icon = <UsersIcon />
    } else if (titleLower.includes('automate') || titleLower.includes('optimize') || titleLower.includes('ai')) {
      icon = <BrainCircuitIcon />
    } else if (titleLower.includes('scale') || titleLower.includes('grow') || titleLower.includes('launch') || titleLower.includes('team')) {
      icon = <RocketIcon />
    } else {
      if (idx === 1) icon = <UsersIcon />
      else if (idx === 2) icon = <BrainCircuitIcon />
      else if (idx === 3) icon = <RocketIcon />
    }
    return { ...step, icon }
  })

  const metricsDataWithIcons = (homepage.metricsData || []).map((metric: any, idx: number) => {
    const titleLower = (metric.title || '').toLowerCase()
    let icon = <BookOpenIcon />
    if (titleLower.includes('click') || (titleLower.includes('rate') && idx === 1)) {
      icon = <MousePointerClick />
    } else if (titleLower.includes('user') || titleLower.includes('active') || titleLower.includes('customer')) {
      icon = <UsersIcon />
    } else if (titleLower.includes('engage') || titleLower.includes('trend') || titleLower.includes('grow') || titleLower.includes('roi')) {
      icon = <TrendingUp />
    } else {
      if (idx === 1) icon = <MousePointerClick />
      else if (idx === 2) icon = <UsersIcon />
      else if (idx === 3) icon = <TrendingUp />
    }
    return { ...metric, icon }
  })

  const securityItemsWithIcons = (homepage.securityItems || []).map((item: any, idx: number) => {
    const titleLower = (item.title || '').toLowerCase()
    let icon = <ShieldCheckIcon />
    if (titleLower.includes('gdpr') || titleLower.includes('compliant') || titleLower.includes('lock') || titleLower.includes('privacy')) {
      icon = <LockIcon />
    } else if (titleLower.includes('encrypt') || titleLower.includes('end-to-end') || titleLower.includes('ban') || titleLower.includes('secure')) {
      icon = <ShieldBanIcon />
    } else {
      if (idx === 1) icon = <LockIcon />
      else if (idx === 2) icon = <ShieldBanIcon />
    }
    return { ...item, icon }
  })

  return (
    <div className='flex flex-col'>
      <Preloader />
      <TargetCursor 
        spinDuration={2}
        hideDefaultCursor={true}
        parallaxOn={true}
        targetSelector=".cursor-target"
        containerSelector="#about"
        cursorColor="#3b82f6"
        cursorColorOnTarget="#1d4ed8"
      />
      <Header navigationData={navigationData} />

      <HeroSection40Block data={homepage.hero} />

      <LogoCloud04Block heading={logoCloud.heading} logos={logoCloud.logos} />

      <BentoGrid18Block />

      <BentoGrid07Block />

      <FeaturesSection26Block data={tabsDataWithIcons} />

      <TimelineComponent03Block steps={processStepsWithIcons} />

      <SocialProof07Block metrics={metricsDataWithIcons} />

      <IndustriesCarouselBlock />

      <TestimonialsComponent23Block testimonials={homepage.testimonials} />

      <FeaturesSection14Block />

      <FeaturesSection05Block items={securityItemsWithIcons} />

      <PricingComponent11Block data={pricingBlockData} />

      <BlogSection />

      <FaqComponent04Block tabs={homepage.faqTabs} />

      <CtaSection11Block />

      <FooterBlock />
    </div>
  )
}

export default LandingPage
