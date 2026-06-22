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
import type { Navigation } from '@/components/shadcn-studio/blocks/hero-section-40/hero-navigation'
import type { StackProps } from '@/components/shadcn-studio/blocks/bento-grid-18/card-stack'
import type { Testimonial } from '@/components/shadcn-studio/blocks/testimonials-component-23/testimonials-component-23'
import Link from 'next/link'
import { blogPosts } from '@/lib/blog-data'

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
    image: 'https://doubletick.io/images/logos/logo-1.webp',
    name: 'SaffronStays'
  },
  {
    image: 'https://doubletick.io/images/logos/logo-2.webp',
    name: 'Rustomjee'
  },
  {
    image: 'https://doubletick.io/images/logos/logo-3.webp',
    name: 'RenewBuy'
  },
  {
    image: 'https://doubletick.io/images/logos/logo-4.webp',
    name: 'Malabar Gold & Diamonds'
  },
  {
    image: 'https://doubletick.io/images/logos/logo-5.webp',
    name: 'Sabyasachi'
  },
  {
    image: 'https://doubletick.io/images/logos/logo-6.webp',
    name: 'Tupperware'
  },
  {
    image: 'https://doubletick.io/images/logos/logo-7.webp',
    name: 'Pantaloons'
  },
  {
    image: 'https://doubletick.io/images/logos/logo-8.webp',
    name: 'CoinDCX'
  },
  {
    image: 'https://doubletick.io/images/logos/logo-9.webp',
    name: 'upGrad'
  },
  {
    image: 'https://doubletick.io/images/logos/logo-10.webp',
    name: 'MakeMyTrip'
  },
  {
    image: 'https://doubletick.io/images/logos/logo-11.webp',
    name: 'Hiranandani Communities'
  },
  {
    image: 'https://doubletick.io/images/logos/logo-12.webp',
    name: 'Bhanzu'
  },
  {
    image: 'https://doubletick.io/images/logos/logo-13.webp',
    name: 'AdmitKard'
  },
  {
    image: 'https://doubletick.io/images/logos/logo-14.webp',
    name: 'Dentzz'
  },
  {
    image: 'https://doubletick.io/images/logos/logo-15.webp',
    name: 'Ethos Watches'
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
          <h2 className="text-2xl font-medium sm:text-3xl lg:text-4xl text-black font-serif">
            Latest Insights from Our Experts
          </h2>
          <p className="text-neutral-500 max-w-xl text-xs sm:text-sm font-mono">
            Stay updated with the latest trends, strategies, and tips on conversational AI and automation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono">
          {posts.map((post) => (
            <div 
              key={post.slug} 
              className="border border-[#C5C4C2] bg-[#ECEBE9] flex flex-col group relative"
              style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 10px 100%, 0 calc(100% - 10px))' }}
            >
              <div className="aspect-video w-full overflow-hidden border-b border-[#C5C4C2] relative">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 transition-all duration-300" 
                />
                <div className="absolute inset-0 bg-[#00b259]/10 mix-blend-multiply group-hover:opacity-0 transition-opacity" />
              </div>
              <div className="p-6 flex flex-col flex-grow gap-4">
                <div className="flex items-center justify-between text-[10px] text-neutral-500">
                  <span>{post.date}</span>
                  <span>{post.readTime}</span>
                </div>
                <h3 className="text-sm font-black text-black group-hover:text-[#00b259] transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-xs text-neutral-500 line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>
                <div className="mt-auto pt-4 flex justify-between items-center border-t border-[#C5C4C2]/40 text-xs font-bold">
                  <Link href={`/blog/${post.slug}`} className="flex items-center gap-1 hover:text-[#00b259] transition-colors group/btn">
                    <span>READ POST</span>
                    <span className="text-[#00b259] group-hover/btn:translate-x-0.5 transition-transform">-&gt;</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Articles Button */}
        <div className="flex justify-center pt-4">
          <Link
            href="/blog"
            className="px-8 py-3 text-xs font-bold text-white bg-black hover:bg-black/90 transition-colors tracking-widest font-mono"
            style={{ clipPath: 'polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)' }}
          >
            VIEW ALL ARTICLES
          </Link>
        </div>
      </div>
    </section>
  )
}

const HeroSection40Block = () => {
  return (
    <main className='flex flex-col' id='about'>
      <HeroSection />
    </main>
  )
}

const LogoCloud04Block = () => {
  return <LogoCloud brandLogos={brandLogos} />
}

const BentoGrid18Block = () => {
  return (
    <div id="features">
      <BentoGrid18 />
    </div>
  )
}

const FeaturesSection26Block = () => {
  return <Features26 data={tabsDataFeaturesSection26} />
}

const BentoGrid07Block = () => {
  return <BentoGrid07 />
}

const TimelineComponent03Block = () => {
  return (
    <div id="solutions">
      <Process steps={processSteps} />
    </div>
  )
}

const SocialProof07Block = () => {
  return <SocialProof metrics={metricsData} />
}

const IndustriesCarouselBlock = () => {
  return <IndustriesCarousel />
}

const TestimonialsComponent23Block = () => {
  return <TestimonialsComponent testimonials={testimonials} />
}

const FeaturesSection14Block = () => {
  return <Features14 />
}

const FeaturesSection05Block = () => {
  return <Features05 featuresList={securityItems} />
}

const PricingComponent11Block = () => {
  return (
    <div id="pricing">
      <Pricing plans={plans} />
    </div>
  )
}

const FaqComponent04Block = () => {
  return (
    <div id="faq">
      <FAQ tabs={faqTabs} />
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

const LandingPage = () => {
  return (
    <div className='flex flex-col'>
      <Header navigationData={navigationData} />

      <HeroSection40Block />

      <LogoCloud04Block />

      <BentoGrid18Block />

      <FeaturesSection26Block />

      <BentoGrid07Block />

      <TimelineComponent03Block />

      <SocialProof07Block />

      <IndustriesCarouselBlock />

      <TestimonialsComponent23Block />

      <FeaturesSection14Block />

      <FeaturesSection05Block />

      <PricingComponent11Block />

      <BlogSection />

      <FaqComponent04Block />

      <CtaSection11Block />

      <FooterBlock />
    </div>
  )
}

export default LandingPage
