import { BookOpenIcon, BoxIcon, BrainCircuitIcon, CircleDollarSignIcon, Clock8Icon, CodeIcon, CreditCardIcon, FolderSyncIcon, FoldersIcon, GitCompareArrowsIcon, GitPullRequestDraftIcon, HeadphonesIcon, LightbulbIcon, PencilIcon, RocketIcon, ShieldBanIcon, TicketIcon, Trash2Icon, UserIcon, UsersIcon, WorkflowIcon } from 'lucide-react'
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
import TestimonialsComponent from '@/components/shadcn-studio/blocks/testimonials-component-23/testimonials-component-23'
import type { Navigation } from '@/components/shadcn-studio/blocks/hero-section-40/hero-navigation'
import type { NotificationCard } from '@/components/shadcn-studio/blocks/features-section-14/notification-stack'
import type { StackProps } from '@/components/shadcn-studio/blocks/bento-grid-18/card-stack'
import type { Testimonial } from '@/components/shadcn-studio/blocks/testimonials-component-23/testimonials-component-23'


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
    title: 'Testimonials',
    href: '#'
  },
  {
    title: 'Pricing',
    href: '#'
  }
]

const brandLogos = [
  {
    image: 'https://cdn.shadcnstudio.com/ss-assets/brand-logo/google-logo.png',
    name: 'Google'
  },
  {
    image: 'https://cdn.shadcnstudio.com/ss-assets/brand-logo/amazon-logo.png',
    name: 'Amazon'
  },
  {
    image: 'https://cdn.shadcnstudio.com/ss-assets/brand-logo/hubspot-logo.png',
    name: 'Hubspot'
  },
  {
    image: 'https://cdn.shadcnstudio.com/ss-assets/brand-logo/walmart-logo.png',
    name: 'Walmart'
  },
  {
    image: 'https://cdn.shadcnstudio.com/ss-assets/brand-logo/microsoft-logo.png',
    name: 'Microsoft'
  },
  {
    image: 'https://cdn.shadcnstudio.com/ss-assets/brand-logo/airbnb-logo.png',
    name: 'Airbnb'
  },
  {
    image: 'https://cdn.shadcnstudio.com/ss-assets/brand-logo/fedex-logo.png',
    name: 'Fedex'
  },
  {
    image: 'https://cdn.shadcnstudio.com/ss-assets/brand-logo/adobe-logo.png',
    name: 'Adobe'
  },
  {
    image: 'https://cdn.shadcnstudio.com/ss-assets/brand-logo/shopify-logo.png',
    name: 'Shopify'
  },
  {
    image: 'https://cdn.shadcnstudio.com/ss-assets/brand-logo/ola-logo.png',
    name: 'Ola'
  },
  {
    image: 'https://cdn.shadcnstudio.com/ss-assets/brand-logo/huawei-logo.png',
    name: 'Huawei'
  },
  {
    image: 'https://cdn.shadcnstudio.com/ss-assets/brand-logo/bookmyshow-logo.png',
    name: 'Book My Show'
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
    id: 'describe-workflow',
    icon: (
      <WorkflowIcon />
    ),
    title: 'Describe your workflow',
    description:
      'Inform the agent about what you wish to automate, ranging from daily team summaries to lead follow-ups, ensuring clarity in your request.'
  },
  {
    id: 'connect-tools',
    icon: (
      <FolderSyncIcon />
    ),
    title: 'Connect your tools',
    description:
      'Link Gmail, Slack, Notion, or any app your team already uses. The agent syncs data between them and builds context automatically.'
  },
  {
    id: 'review-and-refine',
    icon: (
      <PencilIcon />
    ),
    title: 'Review and refine',
    description:
      'Every run is transparent. Approve, edit, or rerun workflows anytime — the agent learns from feedback to perform even better next time.'
  }
]

const processSteps = [
  {
    icon: (
      <LightbulbIcon />
    ),
    title: 'Research & Ideation',
    description:
      'We start by understanding user needs, market trends, and business goals to generate innovative product ideas.',
    progress: 35,
    progressLabel: '12%',
    duration: '~1 week'
  },
  {
    icon: (
      <CodeIcon />
    ),
    title: 'Design & Development',
    description:
      'Concepts evolve into tangible experiences through structured UX design, polished interfaces, and agile engineering.',
    progress: 70,
    progressLabel: '75%',
    duration: '~3 weeks'
  },
  {
    icon: (
      <BoxIcon />
    ),
    title: 'Production & Quality Testing',
    description:
      'Each element of the product undergoes thorough validation. We test functionality, usability, accessibility, and performance.',
    progress: 80,
    progressLabel: '80%',
    duration: '~1 month'
  },
  {
    icon: (
      <RocketIcon />
    ),
    title: 'Launch & Support',
    description: 'Once launched, we monitor performance, resolve issues quickly, and continuously refine the product.',
    progress: 100,
    progressLabel: '100%',
    duration: 'Launch Completed'
  }
]

const metricsData = [
  {
    icon: (
      <BookOpenIcon />
    ),
    value: '110+',
    label: 'Blocks'
  },
  {
    icon: (
      <FoldersIcon />
    ),
    value: '29',
    label: 'Template'
  },
  {
    icon: (
      <UsersIcon />
    ),
    value: '3400',
    label: 'Customers'
  },
  {
    icon: (
      <TicketIcon />
    ),
    value: '2844+',
    label: 'Support Ticket'
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

const notifications: NotificationCard[] = [
  {
    id: '1',
    name: 'Steve Rogers',
    time: 'Today, 11:56',
    amount: '$49',
    avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-1.png',
    fallback: 'SR'
  },
  {
    id: '2',
    name: 'Tony Stark',
    time: 'Today, 10:32',
    amount: '$89',
    avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-3.png',
    fallback: 'TS'
  },
  {
    id: '3',
    name: 'Bruce Banner',
    time: 'Today, 09:15',
    amount: '$156',
    avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-5.png',
    fallback: 'BB'
  }
]

const avatars = [
  {
    src: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-2.png',
    fallback: 'HL',
    name: 'Olivia Sparks',
    size: 'size-12'
  },
  {
    src: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-6.png',
    fallback: 'HL',
    name: 'Howard Lloyd',
    size: 'size-16'
  },
  {
    src: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-5.png',
    fallback: 'HR',
    name: 'Hallie Richards',
    size: 'size-20'
  },
  {
    src: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-16.png',
    fallback: 'JW',
    name: 'Jenny Wilson',
    size: 'size-16'
  },
  {
    src: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-18.png',
    fallback: 'MY',
    name: 'Maya Wilson',
    size: 'size-12'
  }
]

const faqItems = [
  {
    icon: (
      <CreditCardIcon />
    ),
    title: 'Easy Payment',
    description: '75% of users prefer diverse payment options, enhancing convenience and increasing transactions.'
  },
  {
    icon: (
      <ShieldBanIcon />
    ),
    title: 'Safe Transaction',
    description: '90% of customers prioritise security, and robust measures build trust and confidence in the platform.'
  },
  {
    icon: (
      <Clock8Icon />
    ),
    title: 'Fast Customer Service',
    description: '80% users highly value quick responses, improving user experience  long-term customer.'
  },
  {
    icon: (
      <CircleDollarSignIcon />
    ),
    title: 'Quick Transaction',
    description: 'Transactions are 30% faster than industry standards, boosting user satisfaction and repeat usage.'
  }
]

const plans = [
  {
    name: 'Free',
    price: 0,
    description: 'Recommended for people with at least 1 year experience in crypto markets.',
    buttonText: 'Free plan',
    features: [
      'Access to real-time inventory tracking',
      'Integration with Digital Marketing email',
      'Basic analytics and email support',
      'Custom dashboards and Phone support',
      'Real-time data tracking and 24/7 support'
    ]
  },
  {
    name: 'Premium',
    price: 99,
    description: 'Everything in the Basic Plan plus advanced search, better analytics.',
    buttonText: 'Purchase plan',
    isPopular: true,
    features: [
      'All Premium Plan features',
      'Advanced data filtering search capabilities',
      'Custom branding options',
      'Extended API access for integrations',
      'Real-time data tracking and 24/7 support',
      'Dedicated account manager'
    ]
  },
  {
    name: 'Enterprise',
    price: 299,
    description: 'Includes all Professional Plan features plus full logistics automation etc.',
    buttonText: 'Purchase plan',
    features: [
      'Custom onboarding process',
      'Priority support response',
      'Access to exclusive webinars',
      'Monthly performance reviews',
      'Real-time data tracking and 24/7 support',
      'Dedicated account manager',
      'Tailored training sessions and resources'
    ]
  }
]

const tabsDataFaqComponent04 = [
  {
    name: 'General',
    value: 'general',
    faqs: [
      {
        id: 'what-is-larasaas',
        question: 'What is LaraSaas? Why do I need a LaraSaas Boilerplate?',
        answer:
          'LaraSaas is a Laravel boilerplate specifically designed to help you launch your SaaS application quickly and efficiently. It provides pre-built features for user management, subscriptions, payments, and more, saving you significant development time and effort.'
      },
      {
        id: 'is-demo-available',
        question: 'Is there a demo available?',
        answer:
          'Yes, we offer a comprehensive demo that showcases all the features and capabilities of our platform. You can access it through our website and explore the interface firsthand.'
      },
      {
        id: 'payment-providers',
        question: 'Which payment providers are supported?',
        answer:
          'We support major payment providers including Stripe, PayPal, and Square. Our platform is designed to be flexible and can be integrated with additional payment gateways based on your needs.'
      },
      {
        id: 'codebase-distribution',
        question: 'How is the codebase distributed?',
        answer:
          "The codebase is distributed through a private repository system. Upon purchase, you'll receive access to the full source code and all future updates through our version control system."
      },
      {
        id: 'integration-question',
        question: 'I want to integrate LaraSaas into my existing project. Should I buy it?',
        answer:
          "While it's possible to integrate LaraSaas into existing projects, it's primarily designed as a standalone boilerplate. We recommend starting fresh with LaraSaas for the best experience and to fully utilize all features."
      }
    ]
  },
  {
    name: 'Pricing',
    value: 'pricing',
    faqs: [
      {
        id: 'pricing-plans',
        question: 'What pricing plans are available?',
        answer:
          'We offer flexible pricing plans including Starter, Professional, and Enterprise tiers. Each plan is designed to cater to different business needs and scales with your growth.'
      },
      {
        id: 'payment-methods',
        question: 'What payment methods do you accept?',
        answer:
          'We accept all major credit cards, PayPal, and bank transfers. Enterprise plans also support purchase orders and custom billing arrangements.'
      },
      {
        id: 'billing-cycle',
        question: 'How does the billing cycle work?',
        answer:
          'Billing cycles are monthly or annually, with significant discounts for annual subscriptions. The cycle starts on your subscription date.'
      },
      {
        id: 'refund-policy',
        question: 'What is your refund policy?',
        answer:
          "We offer a 30-day money-back guarantee for all plans. If you're not satisfied, contact support for a full refund within this period."
      },
      {
        id: 'plan-changes',
        question: 'Can I change my plan later?',
        answer:
          'Yes, you can upgrade or downgrade your plan at any time. Upgrades take effect immediately, while downgrades apply at the next billing cycle.'
      }
    ]
  },
  {
    name: 'Dashboard',
    value: 'dashboard',
    faqs: [
      {
        id: 'dashboard-features',
        question: 'What features are available in the dashboard?',
        answer:
          'Our dashboard includes real-time analytics, user management, subscription tracking, and customizable reports.'
      },
      {
        id: 'dashboard-customization',
        question: 'Can I customize the dashboard?',
        answer:
          "Yes, you can arrange widgets, configure notifications, and brand the interface with your company's colors and logo."
      },
      {
        id: 'dashboard-access',
        question: 'How do I manage user access?',
        answer:
          "Admins can manage user roles, permissions, and access levels through the dashboard's user management section."
      },
      {
        id: 'dashboard-reports',
        question: 'What types of reports are available?',
        answer:
          'We offer usage analytics, user activity, performance metrics, and custom report generation capabilities.'
      },
      {
        id: 'dashboard-backup',
        question: 'How is my dashboard data backed up?',
        answer:
          'Dashboard data is automatically backed up daily with 30-day retention. Enterprise plans include custom backup schedules.'
      }
    ]
  },
  {
    name: 'API',
    value: 'api',
    faqs: [
      {
        id: 'api-documentation',
        question: 'Where can I find the API documentation?',
        answer:
          'Our comprehensive API documentation is available at our developer portal with detailed endpoints and examples.'
      },
      {
        id: 'api-limits',
        question: 'Are there any API rate limits?',
        answer:
          'Yes, limits vary by plan. Basic plans include 1000 requests per hour, with higher limits for premium plans.'
      },
      {
        id: 'api-authentication',
        question: 'How does API authentication work?',
        answer:
          'We use API keys and OAuth 2.0 for authentication. Secure your credentials and never share them publicly.'
      },
      {
        id: 'api-versions',
        question: 'Which API versions are supported?',
        answer:
          'We maintain the current version and one previous version. Legacy versions are supported for 6 months after deprecation.'
      },
      {
        id: 'api-support',
        question: 'How can I get API support?',
        answer: 'We provide developer support through our dedicated API support channel and developer community forum.'
      }
    ]
  },
  {
    name: 'License',
    value: 'license',
    faqs: [
      {
        id: 'license-types',
        question: 'What types of licenses are available?',
        answer: 'We offer Single-domain, Multi-domain, and Enterprise licenses with one year of updates and support.'
      },
      {
        id: 'license-transfer',
        question: 'Can I transfer my license?',
        answer: 'License transfers are available on a case-by-case basis. Contact support for transfer requests.'
      },
      {
        id: 'license-renewal',
        question: 'How do license renewals work?',
        answer: 'Licenses can be renewed annually with a discount. Auto-renewal is available for convenience.'
      },
      {
        id: 'license-usage',
        question: 'What are the usage restrictions?',
        answer:
          'Usage restrictions vary by license type. Single-domain is for one production site, Multi-domain for multiple sites.'
      },
      {
        id: 'license-support',
        question: 'What support is included?',
        answer: 'All licenses include email support and access to documentation. Enterprise includes priority support.'
      }
    ]
  }
]

const HeroSection40Block = () => {
  return (
    <div className='flex flex-col'>
      {/* Header Section */}
      <Header navigationData={navigationData} />

      {/* Main Content */}
      <main className='flex flex-col'>
        <HeroSection />
      </main>
    </div>
  )
}

const LogoCloud04Block = () => {
  return <LogoCloud brandLogos={brandLogos} />
}

const BentoGrid18Block = () => {
  return <BentoGrid18 images={images} />
}

const FeaturesSection26Block = () => {
  return <Features26 data={tabsDataFeaturesSection26} />
}

const BentoGrid07Block = () => {
  return <BentoGrid07 />
}

const TimelineComponent03Block = () => {
  return <Process steps={processSteps} />
}

const SocialProof07Block = () => {
  return <SocialProof metrics={metricsData} />
}

const TestimonialsComponent23Block = () => {
  return <TestimonialsComponent testimonials={testimonials} />
}

const FeaturesSection14Block = () => {
  return <Features14 notifications={notifications} avatarData={avatars} />
}

const FeaturesSection05Block = () => {
  return <Features05 featuresList={faqItems} />
}

const PricingComponent11Block = () => {
  return <Pricing plans={plans} />
}

const FaqComponent04Block = () => {
  return <FAQ tabs={tabsDataFaqComponent04} />
}

const CtaSection11Block = () => {
  return <CTA />
}

const LandingPage = () => {
  return (
    <div className='flex flex-col'>
      <HeroSection40Block />

      <LogoCloud04Block />

      <BentoGrid18Block />

      <FeaturesSection26Block />

      <BentoGrid07Block />

      <TimelineComponent03Block />

      <SocialProof07Block />

      <FeaturesSection26Block />

      <TestimonialsComponent23Block />

      <FeaturesSection14Block />

      <FeaturesSection05Block />

      <PricingComponent11Block />

      <FaqComponent04Block />

      <CtaSection11Block />
    </div>
  )
}

export default LandingPage
