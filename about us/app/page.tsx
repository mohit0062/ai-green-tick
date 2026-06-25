import type { Metadata } from 'next'
import { BookOpenIcon, CheckSquareIcon, CircleDollarSignIcon, Clock8Icon, CreditCardIcon, FoldersIcon, LockIcon, MedalIcon, ShieldBanIcon, SparklesIcon, StarIcon, TargetIcon, TicketIcon, UsersIcon, Globe } from 'lucide-react'
import Header from '@/components/shadcn-studio/blocks/hero-section-40/header'
import Footer from '@/components/shadcn-studio/blocks/footer/footer'
import AboutUs01 from '@/components/shadcn-studio/blocks/about-us-page-01/about-us-page-01'
import AboutUs11 from '@/components/shadcn-studio/blocks/about-us-page-11/about-us-page-11'
import AboutUs21 from '@/components/shadcn-studio/blocks/about-us-page-21/about-us-page-21'
import CTA from '@/components/shadcn-studio/blocks/cta-section-11/cta-section-11'
import Features from '@/components/shadcn-studio/blocks/features-section-05/features-section-05'
import SocialProof07 from '@/components/shadcn-studio/blocks/social-proof-07/social-proof-07'
import SocialProof08 from '@/components/shadcn-studio/blocks/social-proof-08/social-proof-08'
import TestimonialsComponent from '@/components/shadcn-studio/blocks/testimonials-component-23/testimonials-component-23'
import MetaAuthorization from '@/components/shadcn-studio/blocks/meta-authorization/meta-authorization'
import type { Testimonial } from '@/components/shadcn-studio/blocks/testimonials-component-23/testimonials-component-23'
import { JsonLd } from '@/components/json-ld'
import type { Navigation } from '@/components/shadcn-studio/blocks/hero-section-40/hero-navigation'
import { BookOpen } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About AI Greentick - WhatsApp Marketing & AI Automation',
  description:
    'Learn about AI Greentick, our story, mission, and the team building modern WhatsApp marketing and automation systems.',
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: 'About AI Greentick - WhatsApp Marketing & AI Automation',
    description:
      'Learn about AI Greentick, our story, mission, and the team building modern WhatsApp marketing and automation systems.',
    url: '/about',
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

const stats = [
  {
    icon: (
      <UsersIcon className='text-[#00b259]' />
    ),
    value: '500+',
    description: 'Trusted Brands'
  },
  {
    icon: (
      <SparklesIcon className='text-[#00b259]' />
    ),
    value: '10M+',
    description: 'Messages Delivered'
  },
  {
    icon: (
      <StarIcon className='text-[#00b259]' />
    ),
    value: '98%',
    description: 'Message Open Rate'
  },
  {
    icon: (
      <Clock8Icon className='text-[#00b259]' />
    ),
    value: '24/7',
    description: 'Automated Support'
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

const featureSections = [
  {
    title: 'No API access',
    description:
      'Most businesses use the WhatsApp Business App - limited, unscalable, and not built for teams. The official API unlocks everything.'
  },
  {
    title: 'No trust signal',
    description:
      "A phone number isn't a brand. A verified Green Tick business profile is. We make the verification process effortless."
  },
  {
    title: 'No automation',
    description:
      'Manually responding to hundreds of conversations a day burns your team. We automate 80% of it, so your team focuses on what matters.'
  }
]

const metricsData = [
  {
    icon: (
      <Clock8Icon />
    ),
    value: '2022',
    title: 'Founded'
  },
  {
    icon: (
      <UsersIcon />
    ),
    value: '2,000+',
    title: 'Businesses Powered'
  },
  {
    icon: (
      <SparklesIcon />
    ),
    value: '600M+',
    title: 'Messages Delivered'
  },
  {
    icon: (
      <CircleDollarSignIcon />
    ),
    value: '₹180Cr+',
    title: 'Commerce Processed'
  },
  {
    icon: (
      <FoldersIcon />
    ),
    value: '6',
    title: 'Industries Served'
  },
  {
    icon: (
      <CheckSquareIcon />
    ),
    value: 'India-based',
    title: 'Team · 24/7 Support'
  }
]

const features = [
  {
    icon: (
      <CircleDollarSignIcon />
    ),
    value: 'No UPI support',
    description: 'International platforms do not support native Indian payment flows like UPI.'
  },
  {
    icon: (
      <BookOpenIcon />
    ),
    value: 'No regional languages',
    description: 'Workflows and language features are strictly geared towards Western markets.'
  },
  {
    icon: (
      <Clock8Icon />
    ),
    value: 'No India-timezone support',
    description: 'Support teams and system syncs operate on foreign timezone schedules.'
  },
  {
    icon: (
      <UsersIcon />
    ),
    value: 'No local business empathy',
    description: 'Lack of workflows tailored to Indian e-commerce, real estate, and retail dynamics.'
  }
]

const valuesItems = [
  {
    icon: (
      <CircleDollarSignIcon />
    ),
    title: 'Transparency over upsells',
    description: "Flat pricing. No hidden fees. No markups on Meta's rates."
  },
  {
    icon: (
      <UsersIcon />
    ),
    title: 'Support that shows up',
    description: 'Every customer gets a human - not just a help desk ticket.'
  },
  {
    icon: (
      <SparklesIcon />
    ),
    title: 'Built for scale, priced for growth',
    description: "Whether you're a 5-person startup or a 500-agent enterprise."
  },
  {
    icon: (
      <Globe />
    ),
    title: 'India first, globally ready',
    description: 'Regional languages, local compliance, global infrastructure.'
  }
]

const AboutUsPage01Block = () => {
  return <AboutUs01 stats={stats} />
}

const AboutUsPage11Block = () => {
  return (
    <AboutUs11
      badgeText="MISSION"
      heading="Our mission is simple."
      description="Most WhatsApp Business platforms give you messaging tools. We build communication infrastructure. The difference matters - because your business needs more than a broadcast button. It needs a complete system: official API access, verified identity, intelligent automation, real-time analytics, and a team that stands behind you. That's AIGreenTick."
      imageUrl="https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/about-us/image-45.png"
      contentHeading="Conversations that convert, powered by official APIs and custom AI."
      paragraphs={[
        "AI Greentick started as an internal tool designed to solve scale and delivery bottlenecks for customer broadcasts.",
        "We quickly recognized that D2C brands and modern teams needed more than just a broadcast list — they needed a unified hub where marketing, sales, and support could collaborate without losing context.",
        "By integrating official WhatsApp Business API capabilities with custom large language models (LLMs), we built a platform that allows teams to broadcast campaigns, manage shared team inbox queues, and design smart AI chatbots.",
        "Today, AI Greentick helps hundreds of high-growth brands across e-commerce, real estate, education, and finance to automate support and drive high-impact marketing campaigns at scale."
      ]}
    />
  )
}

const TestimonialsComponent23Block = () => {
  return <TestimonialsComponent testimonials={testimonials} />
}

const AboutUsPage21Block = () => {
  return (
    <AboutUs21
      badge="THE PROBLEM WE SOLVE"
      heading="WhatsApp is India's most-used platform. Most businesses are using it wrong."
      subheading="We transition your operations from standard chat apps to enterprise-grade conversational infrastructure."
      featureSections={featureSections}
    />
  )
}

const SocialProof07Block = () => {
  return (
    <SocialProof07
      badge="OUR NUMBERS"
      heading="AI Greentick by the numbers"
      description="From message delivery to commerce processed, see how we power scale for high-growth brands across India."
      metrics={metricsData}
    />
  )
}

const SocialProof08Block = () => {
  return (
    <SocialProof08
      badge="WHY WE BUILT THIS"
      heading="India deserved a WhatsApp platform built for India."
      description="Global platforms like WATI and Respond.io are built for Western markets. They have generic workflows, no UPI payment support, no regional language features, no India-timezone support, and no understanding of how Indian businesses actually operate. AIGreenTick is different. Every feature, every integration, every support process is built with Indian businesses in mind - from Shopify D2C brands in Bengaluru to real estate firms in Mumbai to coaching institutes in Jaipur."
      features={features}
    />
  )
}

const FeaturesSection05Block = () => {
  return (
    <Features
      badge="VALUES"
      heading="What we believe in."
      featuresList={valuesItems}
    />
  )
}

const MetaAuthorizationBlock = () => {
  return (
    <MetaAuthorization
      badge="SECTION 5 - META AUTHORIZATION"
      heading="Officially authorized by Meta. Fully compliant."
      body="AIGreenTick is an authorized Meta Business Solution Provider (BSP) for the WhatsApp Business API. This means your business gets direct, compliant access to Meta's official infrastructure - the same API used by the world's largest enterprises, made accessible to businesses of every size."
    />
  )
}

const CtaSection11Block = () => {
  return <CTA />
}

export default function AboutPage() {
  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "About AI Greentick",
    "description": "Learn about AI Greentick, our story, mission, and the team building modern WhatsApp marketing and automation systems.",
    "publisher": {
      "@type": "Organization",
      "name": "AI Greentick",
      "url": "https://ai-green-tick-theta.vercel.app",
      "logo": "https://ai-green-tick-theta.vercel.app/group-2.svg"
    }
  }

  return (
    <div className='flex flex-col'>
      <JsonLd data={aboutSchema} />
      <Header navigationData={navigationData} />

      <AboutUsPage01Block />

      <AboutUsPage11Block />

      <TestimonialsComponent23Block />

      <AboutUsPage21Block />

      <SocialProof07Block />

      <SocialProof08Block />

      <MetaAuthorizationBlock />

      <FeaturesSection05Block />

      <CtaSection11Block />

      <Footer />
    </div>
  )
}
