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
  badgeText: "ABOUT AI GREENTICK",
  heading: "Empowering Brands with Enterprise WhatsApp Automation",
  description: "AI Greentick was built to solve a simple yet critical challenge: making customer communication on WhatsApp personal, scalable, and automated. We help modern businesses build trust, scale campaigns, and close deals using official WhatsApp APIs and smart AI workflows."
}

const story = {
  badgeText: "OUR STORY",
  heading: "Why we built AI Greentick",
  description: "We realized that while WhatsApp is the most active messaging channel, businesses were struggling to run it at scale with traditional shared inboxes and rigid automation.",
  imageUrl: "https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/about-us/image-45.png",
  contentHeading: "Conversations that convert, powered by official APIs and custom AI.",
  paragraphs: [
    "AI Greentick started as an internal tool designed to solve scale and delivery bottlenecks for customer broadcasts.",
    "We quickly recognized that modern teams needed more than just a broadcast list — they needed a unified hub where marketing, sales, and support could collaborate without losing context.",
    "By integrating official WhatsApp Business API capabilities with custom large language models (LLMs), we built a platform that allows teams to broadcast campaigns, manage shared team inbox queues, and design smart AI chatbots.",
    "Today, AI Greentick helps hundreds of high-growth brands across e-commerce, real estate, education, and finance to automate support and drive high-impact marketing campaigns at scale."
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
    "name": "About AI Greentick",
    "description": hero.description,
    "publisher": {
      "@type": "Organization",
      "name": "AI Greentick",
      "url": "https://ai-green-tick-theta.vercel.app",
      "logo": "https://ai-green-tick-theta.vercel.app/group-2.svg"
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
