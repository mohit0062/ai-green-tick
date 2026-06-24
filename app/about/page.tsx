import type { Metadata } from 'next'
import Header from '@/components/shadcn-studio/blocks/hero-section-40/header'
import Footer from '@/components/shadcn-studio/blocks/footer/footer'
import AboutUs11 from '@/components/shadcn-studio/blocks/about-us-page-11/about-us-page-11'
import AboutUs18 from '@/components/shadcn-studio/blocks/about-us-page-18/about-us-page-18'
import BentoGrid from '@/components/shadcn-studio/blocks/bento-grid-16/bento-grid-16'
import CTA from '@/components/shadcn-studio/blocks/cta-section-11/cta-section-11'
import HowWeWork from '@/components/shadcn-studio/blocks/how-we-work/how-we-work'
import Team from '@/components/shadcn-studio/blocks/team-section-12/team-section-12'
import type { TeamMember } from '@/components/shadcn-studio/blocks/team-section-12/team-section-12'
import { JsonLd } from '@/components/json-ld'
import type { Navigation } from '@/components/shadcn-studio/blocks/hero-section-40/hero-navigation'
import { BookOpen } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About Apargo - The Team Behind AI Greentick',
  description:
    'Meet Apargo - a product-engineering company building custom software, mobile apps and SaaS products. The team behind AI Greentick.',
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: 'About Apargo - The Team Behind AI Greentick',
    description:
      'Meet Apargo - a product-engineering company building custom software, mobile apps and SaaS products. The team behind AI Greentick.',
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
    value: 45,
    description: 'Projects Shipped'
  },
  {
    value: 20,
    description: 'Active Clients'
  },
  {
    value: 35,
    description: 'Engineering Team'
  }
]

const avatars = [
  {
    src: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-3.png',
    fallback: 'HL',
    name: 'Howard Lloyd'
  },
  {
    src: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-6.png',
    fallback: 'OS',
    name: 'Olivia Sparks'
  },
  {
    src: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-5.png',
    fallback: 'HR',
    name: 'Hallie Richards'
  },
  {
    src: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-16.png',
    fallback: 'JW',
    name: 'Jenny Wilson'
  },
  {
    src: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-7.png',
    fallback: 'MC',
    name: 'Michael Chen'
  },
  {
    src: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-8.png',
    fallback: 'SD',
    name: 'Sarah Davis'
  }
]

const logos = [
  {
    image: 'https://cdn.shadcnstudio.com/ss-assets/brand-logo/amazon-logo-bw.png',
    alt: 'Amazon'
  },
  {
    image: 'https://cdn.shadcnstudio.com/ss-assets/brand-logo/walmart-logo-bw.png',
    alt: 'Walmart'
  },
  {
    image: 'https://cdn.shadcnstudio.com/ss-assets/brand-logo/hubspot-logo-bw.png',
    alt: 'HubSpot'
  },
  {
    image: 'https://cdn.shadcnstudio.com/ss-assets/brand-logo/microsoft-logo-bw.png',
    alt: 'Microsoft'
  }
]

const teamMembers: TeamMember[] = [
  {
    image: 'https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/team/image-57.png',
    name: 'Ethan Caldwell',
    title: 'Executive Director',
    description: 'Visionary leader driving innovation and fostering a culture of collaboration and growth.',
    type: 'management',
    facebookLink: '#',
    twitterLink: '#',
    githubLink: '#',
    instagramLink: '#'
  },
  {
    image: 'https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/team/image-56.png',
    name: 'Oliver Grayson',
    title: 'Chief Executive Officer',
    description: 'Dynamic CEO inspiring creativity, strategic thinking, and a unified team spirit.',
    type: 'management',
    facebookLink: '#',
    twitterLink: '#',
    githubLink: '#',
    instagramLink: '#'
  },
  {
    image: 'https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/team/image-55.png',
    name: 'Liam Hawthorne',
    title: 'Head of Innovation',
    description: 'Innovative thinker passionate about transforming ideas into impactful solutions.',
    type: 'design team',
    facebookLink: '#',
    twitterLink: '#',
    githubLink: '#',
    instagramLink: '#'
  },
  {
    image: 'https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/team/image-52.png',
    name: 'Lucas Bennett',
    title: 'UI/UX Architect',
    description: 'Expert UI/UX architect dedicated to crafting intuitive and memorable user experiences.',
    type: 'design team',
    facebookLink: '#',
    twitterLink: '#',
    githubLink: '#',
    instagramLink: '#'
  },
  {
    image: 'https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/team/image-50.png',
    name: 'Mason Rivers',
    title: 'Senior Developer',
    description: 'Skilled developer committed to building robust, scalable, and efficient digital products.',
    type: 'Development team',
    facebookLink: '#',
    twitterLink: '#',
    githubLink: '#',
    instagramLink: '#'
  },
  {
    image: 'https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/team/image-54.png',
    name: 'Noah Sinclair',
    title: 'Chief Marketing Officer',
    description: 'Marketing strategist focused on elevating brand presence and driving successful campaigns.',
    type: 'Marketing team',
    facebookLink: '#',
    twitterLink: '#',
    githubLink: '#',
    instagramLink: '#'
  }
]

const hero = {
  badgeText: "ABOUT APARGO",
  heading: "We Build and Ship What Others Only Plan",
  description: "Apargo started as a small group of engineers tired of seeing good ideas die in slide decks. Today we build production software for clients across the world and run our own SaaS products in parallel."
}

const story = {
  badgeText: "OUR STORY",
  heading: "How Apargo started",
  description: "Apargo was built for founders who needed real execution — not endless presentations, delays and outsourced confusion.",
  imageUrl: "https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/about-us/image-45.png",
  contentHeading: "We build products the way ambitious teams actually need them built.",
  paragraphs: [
    "Apargo started with one belief: growing businesses don’t fail because of ideas — they fail because execution is slow.",
    "So we built a senior-heavy engineering team focused on shipping fast, solving real problems and working closely with founders.",
    "As our clients grew, we faced the same operational challenges they did — especially around WhatsApp at scale. That led us to build AI Greentick, now used by businesses across India and beyond.",
    "Today Apargo builds custom software for ambitious companies while also running and scaling our own SaaS products."
  ]
}

const team = {
  heading: "Introducing Our Team, the Creators Behind the Magic ✨",
  description: "Driven by purpose, our team blends creativity, innovation, and expertise to shape remarkable outcomes."
}

export default function AboutPage() {
  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "About Apargo Innovations",
    "description": hero.description,
    "publisher": {
      "@type": "Organization",
      "name": "Apargo Innovations",
      "url": "https://www.apargoinnovations.com",
      "logo": "https://www.apargoinnovations.com/group-2.svg"
    },
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": teamMembers.length,
      "itemListElement": teamMembers.map((m, idx) => ({
        "@type": "ListItem",
        "position": idx + 1,
        "item": {
          "@type": "Person",
          "name": m.name,
          "jobTitle": m.title,
          "description": m.description,
          "image": m.image
        }
      }))
    }
  }

  return (
    <div className='flex min-h-screen flex-col bg-[#ECEBE9] text-black'>
      <JsonLd data={aboutSchema} />
      <Header navigationData={navigationData} />
      <main className='flex-1 pt-12'>
        <AboutUs18 
          stats={stats} 
          badgeText={hero.badgeText}
          heading={hero.heading}
          description={hero.description}
        />
        <AboutUs11 
          avatars={avatars} 
          logos={logos} 
          badgeText={story.badgeText}
          heading={story.heading}
          description={story.description}
          imageUrl={story.imageUrl}
          contentHeading={story.contentHeading}
          paragraphs={story.paragraphs}
        />
        <BentoGrid />
        <Team 
          teamMember={teamMembers} 
          heading={team.heading}
          description={team.description}
        />
        <HowWeWork />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}
