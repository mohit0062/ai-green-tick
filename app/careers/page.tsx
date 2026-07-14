import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight,
  Mail,
  TimerReset,
  XCircle,
  Code2,
  ShieldCheck,
  MessageSquare,
  BadgeCheck,
  Sparkles,
  Globe,
  Briefcase,
  GraduationCap,
  Laptop,
  Rocket,
  Users,
  MapPin,
  Phone,
  MessageCircle,
  CheckCircle2,
  FileText,
  BookOpen
} from 'lucide-react'

import Header from '@/components/shadcn-studio/blocks/hero-section-40/header'
import Breadcrumb from '@/components/ui/breadcrumb'
import Footer from '@/components/shadcn-studio/blocks/footer/footer'
import Lanyard from '@/components/Lanyard'
import { Badge } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { openApplicationHref, openRoles, type CareerRole } from '@/lib/careers'
import { cn } from '@/lib/utils'
import { JsonLd } from '@/components/json-ld'
import type { Navigation } from '@/components/shadcn-studio/blocks/hero-section-40/hero-navigation'
import { getSiteSection } from '@/utils/cms'
import CTA from '@/components/shadcn-studio/blocks/cta-section-11/cta-section-11'

export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  const cms = await getSiteSection<any>('careers_page')
  const title = cms.seoTitle || 'Careers at AI Greentick — Build WhatsApp-First Systems'
  const description = cms.seoDesc || 'Open engineering, AI, design, and product roles at AI Greentick. Remote-friendly, senior-heavy team building India\'s leading WhatsApp marketing platform.'

  return {
    title,
    description,
    alternates: {
      canonical: '/careers',
    },
    openGraph: {
      title,
      description,
      url: '/careers',
      type: 'website',
    }
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

const iconMap: Record<string, any> = {
  ShieldCheckIcon: ShieldCheck,
  MessageSquareTextIcon: MessageSquare,
  BadgeCheckIcon: BadgeCheck,
  SparklesIcon: Sparkles,
  Globe2Icon: Globe,
  BriefcaseBusinessIcon: Briefcase,
  GraduationCapIcon: GraduationCap,
  LaptopIcon: Laptop,
  RocketIcon: Rocket,
  UsersRoundIcon: Users,
  MailIcon: Mail,
  MapPinIcon: MapPin,
  PhoneIcon: Phone,
  MessageCircleIcon: MessageCircle,
  CheckCircle2Icon: CheckCircle2,
  FileTextIcon: FileText
}

function getLucideIcon(name: string) {
  return iconMap[name] || Sparkles
}

// Static Page Content
const content = {
  hero: {
    badge: "CAREERS",
    heading: "Join the team building India's leading WhatsApp marketing platform.",
    description: "AI Greentick is a small, senior-heavy team building modern communication and AI automation infrastructure. You'll write code that goes live in days, see your work used by thousands of businesses, and operate with high autonomy without bureaucratic friction."
  },
  fitSignals: [
    {
      iconName: "ShieldCheckIcon",
      title: "Senior judgement",
      description: "You have a proven track record of building and deploying scalable systems. You understand the delicate balance between shipping quickly and maintaining code quality."
    },
    {
      iconName: "MessageSquareTextIcon",
      title: "Written communication",
      description: "We're async-first. If you cannot explain a decision in writing, we will not move fast."
    },
    {
      iconName: "BadgeCheckIcon",
      title: "Ownership",
      description: "From spec to deploy to on-call to bug fixes. We do not split build and maintain into separate teams."
    },
    {
      iconName: "SparklesIcon",
      title: "Curiosity over credentials",
      description: "We do not care where you went to school. We care what you've built and what you're learning."
    }
  ],
  benefits: [
    {
      iconName: "Globe2Icon",
      title: "Remote-friendly",
      description: "Most of the team works from wherever they do their best work, with optional coworking support in select cities."
    },
    {
      iconName: "BriefcaseBusinessIcon",
      title: "Senior-only pay bands",
      description: "We pay above market for senior builders. We are not hiring juniors at this stage."
    },
    {
      iconName: "GraduationCapIcon",
      title: "Learning budget",
      description: "Annual budget for courses, books, conferences, and the learning loops that make you sharper."
    },
    {
      iconName: "LaptopIcon",
      title: "Hardware that works",
      description: "Your choice of laptop, a decent monitor, and the tools you need to ship without fighting the setup."
    },
    {
      iconName: "RocketIcon",
      title: "Real product impact",
      description: "Your code goes live in production for real users, including AI Greentick customers."
    },
    {
      iconName: "UsersRoundIcon",
      title: "Equity for early team",
      description: "Meaningful ESOPs for the first 30 hires, because ownership should show up on the cap table too."
    }
  ],
  hiringSteps: [
    {
      title: "Application",
      description: "A short form or email. We read every one and look for shipped work."
    },
    {
      title: "First call",
      description: "30 minutes with a hiring manager. No surprise live coding."
    },
    {
      title: "Take-home or paid trial",
      description: "A real, scoped task. We pay for serious trials because your time matters."
    },
    {
      title: "Pairing round",
      description: "60 to 90 minutes working through a practical problem with a senior teammate."
    },
    {
      title: "Founder chat",
      description: "30 to 45 minutes focused on mutual fit, ambition, and how we work."
    },
    {
      title: "Offer",
      description: "Usually within 2 weeks of the first call when both sides want to move."
    }
  ],
  notForYou: [
    "You need a manager to break work into tiny daily tickets before you can move.",
    "You prefer handing work off instead of owning the deploy, support loop, and cleanup.",
    "You avoid writing decisions down and rely on meetings to recover context.",
    "You want greenfield work only and dislike maintaining systems that real users depend on."
  ],
  heroStats: [
    { value: "Days", label: "from idea to production, not quarters" },
    { value: "Senior", label: "team shape by default" },
    { value: "2 weeks", label: "typical offer timeline after first call" }
  ]
}

function SectionIntro({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string
  title: string
  description: string
}) {
  return (
    <div className="mx-auto max-w-3xl text-center flex flex-col items-center">
      <span className="px-3 py-1 text-xs font-bold text-[#00b259] border border-[#00b259] bg-[#00b259]/10 font-mono inline-block w-fit mb-4">
        :: {eyebrow.toUpperCase()} ::
      </span>
      <h2 className="text-3xl font-extrabold tracking-tight text-neutral-900 md:text-4xl font-display">
        {title}
      </h2>
      <p className="mt-4 text-base leading-relaxed text-neutral-600 md:text-lg font-sans">
        {description}
      </p>
    </div>
  )
}

function SignalCard({ item, idx }: { item: any; idx: number }) {
  return (
    <div className="relative border border-[#C5C4C2] bg-white dark:bg-neutral-950 h-[360px] flex flex-col justify-between p-6 overflow-hidden group">
      {/* Top row: marker + index number */}
      <div className="flex items-center justify-between w-full">
        <div className="size-2 bg-black dark:bg-white" />
        <span className="text-[11px] font-mono font-bold text-neutral-400 dark:text-neutral-500">
          {String(idx + 1).padStart(2, '0')}
        </span>
      </div>

      {/* Center Chamfered Icon Box */}
      <div className="flex items-center justify-center flex-grow">
        <div 
          className="w-36 h-36 bg-[#ECEBE9]/30 dark:bg-neutral-900/50 border border-[#C5C4C2] flex items-center justify-center relative rounded-2xl transition-all duration-300 group-hover:bg-[#00b259]/5 group-hover:border-[#00b259]/20"
          style={{ 
            clipPath: 'polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)' 
          }}
        >
          <div className="text-neutral-800 dark:text-neutral-200 group-hover:text-[#00b259] transition-all duration-300 transform group-hover:scale-105">
            {item.iconName && item.iconName.startsWith('<svg') ? (
              <div 
                className="size-14 text-neutral-800 dark:text-neutral-200 [&>svg]:size-14 [&>svg]:shrink-0"
                dangerouslySetInnerHTML={{ __html: item.iconName }}
              />
            ) : (
              (() => {
                const Icon = getLucideIcon(item.iconName)
                return <Icon strokeWidth={1} className="size-14" />
              })()
            )}
          </div>
        </div>
      </div>

      {/* Bottom row: Title & Description */}
      <div className="text-left w-full">
        <h3 className="text-base sm:text-lg font-display font-bold text-black dark:text-white group-hover:text-[#00b259] transition-colors">
          {item.title}
        </h3>
        <div 
          className="text-sm font-sans text-neutral-600 mt-2 leading-relaxed group-hover:text-neutral-800 dark:group-hover:text-neutral-200 transition-colors [&>p]:leading-relaxed"
          dangerouslySetInnerHTML={{ __html: item.description }}
        />
      </div>
    </div>
  )
}

function RoleCard({ 
  role, 
  bgColor = "bg-white", 
  accentColor = "text-[#00b259]", 
  accentBg = "bg-[#00b259]",
  badgeBg = "bg-[#00b259]/10", 
  borderColor = "border-[#C5C4C2]",
  hoverBorder = "hover:border-[#00b259]",
  hoverShadow = "hover:shadow-[0_0_15px_rgba(0,178,89,0.1)]",
  footerBg = "bg-neutral-50/50"
}: { 
  role: CareerRole
  bgColor?: string
  accentColor?: string
  accentBg?: string
  badgeBg?: string
  borderColor?: string
  hoverBorder?: string
  hoverShadow?: string
  footerBg?: string
}) {
  return (
    <Card className={cn("group h-full border text-black shadow-none transition-all duration-300 rounded-2xl flex flex-col overflow-hidden relative", bgColor, borderColor)}>
      {/* Top Accent Color Bar */}
      <div className={cn("h-1.5 w-full shrink-0", accentBg)} />
      
      <CardHeader className="gap-5 p-6 sm:p-8">
        <div className="flex flex-wrap items-center gap-2.5">
          <Badge variant="secondary" className={cn("rounded-full px-3.5 py-1 text-xs font-bold font-sans flex items-center gap-1.5 hover:bg-opacity-20 transition-colors border border-transparent", badgeBg, accentColor)}>
            <span className="size-1.5 rounded-full bg-current animate-pulse" />
            {role.team}
          </Badge>
          <Badge variant="outline" className={cn("rounded-full px-3.5 py-1 text-xs font-semibold font-sans text-neutral-600 bg-white/60", borderColor)}>
            {role.employmentType}
          </Badge>
          <Badge variant="outline" className={cn("rounded-full px-3.5 py-1 text-xs font-semibold font-sans text-neutral-600 bg-white/60", borderColor)}>
            {role.location}
          </Badge>
        </div>
        <div className="space-y-3">
          <CardTitle className="text-2xl font-extrabold tracking-tight text-left font-display text-neutral-900 group-hover:text-opacity-80 transition-opacity">
            {role.title}
          </CardTitle>
          <CardDescription className="text-base leading-relaxed text-left text-neutral-500 font-sans">
            {role.summary}
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className="mt-auto space-y-6 px-6 pb-6 sm:px-8 sm:pb-8 flex-1 flex flex-col justify-end">
        <Separator className={cn("opacity-40", borderColor)} />
        <div className="grid gap-4 text-sm sm:grid-cols-2 text-left font-sans">
          <div className="bg-white/40 p-3.5 rounded-xl border border-neutral-200/50">
            <p className="font-bold text-neutral-800 text-xs uppercase tracking-wider mb-1">Compensation</p>
            <p className="font-semibold text-neutral-900 text-sm sm:text-base">{role.compensation.range}</p>
          </div>
          <div className="bg-white/40 p-3.5 rounded-xl border border-neutral-200/50">
            <p className="font-bold text-neutral-800 text-xs uppercase tracking-wider mb-1">Equity</p>
            <p className="font-semibold text-neutral-900 text-sm sm:text-base">{role.compensation.equity}</p>
          </div>
        </div>
      </CardContent>

      <CardFooter className={cn("justify-between gap-4 border-t p-6 sm:px-8", footerBg, borderColor)}>
        <span className={cn("text-xs font-extrabold uppercase tracking-[0.2em] font-mono", accentColor)}>
          :: Active role ::
        </span>
        <Link
          href={`/careers/${role.slug}`}
          className={cn(
            buttonVariants({ variant: 'outline', size: 'lg' }),
            'h-11 rounded-full bg-white px-5 font-bold transition-all duration-300 shadow-xs hover:scale-105 active:scale-95 flex items-center gap-1.5 cursor-pointer',
            borderColor,
            hoverBorder,
            accentColor
          )}
        >
          View role
          <ArrowRight className="size-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </CardFooter>
    </Card>
  )
}

export default async function CareersPage() {
  const cms = await getSiteSection<any>('careers_page')
  
  const hero = cms.hero || content.hero
  const fitSignals = cms.fitSignals || content.fitSignals
  const benefits = cms.benefits || content.benefits
  const hiringSteps = cms.hiringSteps || content.hiringSteps
  const heroStats = cms.heroStats || content.heroStats
  const pageTitle = cms.pageTitle || "Build the Future With Us"
  const pageSubtitle = cms.pageSubtitle || "Join a senior team building AI-powered WhatsApp automation for thousands of businesses."

  const careersSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "AI Greentick - Open Engineering & Product Careers",
    "description": hero.description,
    "url": "https://aigreentick.com/careers",
    "itemListElement": openRoles.map((role, idx) => ({
      "@type": "ListItem",
      "position": idx + 1,
      "item": {
        "@type": "JobPosting",
        "title": role.title,
        "description": role.summary,
        "url": `https://aigreentick.com/careers/${role.slug}`
      }
    }))
  }

  return (
    <div className="flex min-h-screen flex-col bg-white text-black">
      <JsonLd data={careersSchema} />
      <Header navigationData={navigationData} />
      <Breadcrumb />

      <main className="flex-1">

        {/* Hero Banner Section */}
        <section className="border-b border-[#C5C4C2] bg-neutral-50 px-4 sm:px-6 lg:px-8 relative overflow-hidden" style={{ minHeight: '100vh' }}>
          {/* Radar circles background */}
          <div className="absolute inset-0 pointer-events-none opacity-40 [background-image:radial-gradient(circle_at_50%_120%,rgba(0,178,89,0.08),transparent_35rem)]">
            <div className="absolute bottom-[-150px] left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full border border-neutral-300/30" />
            <div className="absolute bottom-[-150px] left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full border border-neutral-300/30" />
            <div className="absolute bottom-[-150px] left-1/2 -translate-x-1/2 w-[400px] h-[400px] rounded-full border border-neutral-300/30" />
            {/* Floating green dots */}
            <div className="absolute top-[20%] left-[15%] w-2 h-2 rounded-full bg-[#00b259] opacity-60 animate-pulse" />
            <div className="absolute top-[60%] left-[8%] w-3 h-3 rounded-full bg-[#00b259] opacity-40" />
            <div className="absolute top-[40%] right-[10%] w-2.5 h-2.5 rounded-full bg-[#00b259] opacity-50" />
            <div className="absolute top-[75%] right-[20%] w-2 h-2 rounded-full bg-[#00b259] opacity-60 animate-pulse" />
          </div>

          {/* Lanyard - full height, starts from top (navbar), absolute behind text */}
          <div className="absolute inset-0 z-10 flex justify-center">
            <div className="w-full max-w-4xl h-full">
              <Lanyard position={[0, 0, 13]} gravity={[0, -25, 0]} lanyardWidth={1} />
            </div>
          </div>

          {/* Text content overlaid on top */}
          <div className="relative mx-auto max-w-7xl border-x border-[#C5C4C2] px-4 flex flex-col items-center text-center z-20 pointer-events-none" style={{ minHeight: '100vh', paddingTop: '100px' }}>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-neutral-900 font-display leading-tight max-w-4xl" style={{ textShadow: '0 0 20px rgba(255,255,255,1), 0 0 40px rgba(255,255,255,0.9), 0 0 60px rgba(255,255,255,0.7)' }}>
              {pageTitle}
            </h1>
            <p className="mt-6 text-base sm:text-lg text-neutral-600 max-w-2xl mx-auto font-sans leading-relaxed" style={{ textShadow: '0 0 15px rgba(255,255,255,1), 0 0 30px rgba(255,255,255,1), 0 0 50px rgba(255,255,255,0.9), 0 0 70px rgba(255,255,255,0.7)' }}>
              {pageSubtitle}
            </p>

          </div>
        </section>

        {/* Operating Agreement & Stats Section */}
        <section className="px-4 sm:px-6 lg:px-8 border-b border-[#C5C4C2] bg-neutral-50/30">
          <div className="mx-auto max-w-7xl border-x border-[#C5C4C2] px-4 py-16 sm:px-6 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_28rem] items-center">
              <div className="space-y-6 text-left">
                <span className="px-3 py-1 text-xs font-bold text-[#00b259] border border-[#00b259] bg-[#00b259]/10 font-mono inline-block w-fit">
                  :: {hero.badge} ::
                </span>
                <h2 className="text-3xl font-extrabold tracking-tight text-neutral-900 font-display">
                  {hero.heading}
                </h2>
                <p className="text-neutral-600 font-sans leading-relaxed text-base">
                  {hero.description}
                </p>
                <div className="flex flex-col gap-3 sm:flex-row pt-4">
                  <a
                    href={openApplicationHref}
                    className={cn(
                      buttonVariants({ variant: 'outline', size: 'lg' }),
                      'h-12 rounded-none bg-white px-6 text-base border-[#C5C4C2] text-black hover:border-black transition-colors font-sans'
                    )}
                  >
                    Send an Open Application
                    <Mail className="size-4 ml-1.5" />
                  </a>
                </div>
              </div>

              <Card className="relative h-fit border-[#C5C4C2] bg-white p-2 shadow-lg rounded-none text-black">
                <CardHeader>
                  <div className="flex items-center justify-between gap-3">
                    <Badge variant="outline" className="border-[#00b259]/30 text-[#00b259] rounded-none font-mono">
                      :: OPERATING AGREEMENT ::
                    </Badge>
                    <Code2 className="size-5 text-[#00b259]" />
                  </div>
                  <CardTitle className="text-2xl text-left font-sans font-bold mt-2">
                    Builders who stay close to production.
                  </CardTitle>
                  <CardDescription className="text-base leading-7 text-left text-neutral-500 font-sans">
                    We hire for people who can move through ambiguity, write clearly, and keep systems alive after launch.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 text-left">
                  {heroStats.map((stat: { value: string; label: string }) => (
                    <div
                      key={stat.value}
                      className="rounded-none border border-[#C5C4C2] bg-neutral-50 p-4"
                    >
                      <p className="text-2xl font-black text-[#00b259] font-sans">{stat.value}</p>
                      <p className="mt-1 text-sm leading-6 text-neutral-500 font-sans">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* What We Look For Section */}
        <section className="px-4 sm:px-6 lg:px-8 border-b border-[#C5C4C2]">
          <div className="mx-auto max-w-7xl border-x border-[#C5C4C2] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
            <SectionIntro
              eyebrow="What we look for"
              title="The bar is high, but refreshingly practical."
              description="AI Greentick works best for senior builders who can make good calls, write down tradeoffs, and keep ownership after launch."
            />

             <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {fitSignals.map((item: any, idx: number) => (
                <SignalCard key={item.title} item={item} idx={idx} />
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="bg-neutral-50 px-4 sm:px-6 lg:px-8 border-b border-[#C5C4C2]">
          <div className="mx-auto grid max-w-7xl items-start gap-10 border-x border-[#C5C4C2] px-4 py-16 sm:px-6 lg:px-8 lg:py-24 lg:grid-cols-[0.82fr_1.18fr] text-left">
            <div className="max-w-xl lg:sticky lg:top-24 lg:self-start">
              <span className="px-3 py-1 text-xs font-bold text-[#00b259] border border-[#00b259] bg-[#00b259]/10 font-mono inline-block w-fit mb-4">
                :: WHAT WE OFFER ::
              </span>
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl text-neutral-900 leading-tight">
                Fewer perks-as-theater. <br />
                <span className="text-[#00b259]">More conditions for good work.</span>
              </h2>
              <p className="mt-4 text-base leading-relaxed text-neutral-600 md:text-lg font-sans">
                We optimize for autonomy, strong peers, clear compensation, and the boring operational support that lets senior people do serious work.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              {benefits.map((item: any, idx: number) => (
                <SignalCard key={item.title} item={item} idx={idx} />
              ))}
            </div>
          </div>
        </section>

        {/* How We Hire Section */}
        <section className="px-4 sm:px-6 lg:px-8 border-b border-[#C5C4C2]">
          <div className="mx-auto max-w-7xl border-x border-[#C5C4C2] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
            <SectionIntro
              eyebrow="How we hire"
              title="No theater. Just enough signal to decide well."
              description="The process is designed to respect senior candidates and still let both sides see how the work actually feels."
            />

            <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3 text-left">
              {hiringSteps.map((step: any, index: number) => (
                <Card key={step.title} className="border border-[#C5C4C2] bg-white text-black shadow-none rounded-none transition-all duration-300 hover:border-[#00b259] hover:shadow-[0_0_15px_rgba(0,178,89,0.1)]">
                  <CardHeader>
                    <div className="flex items-center justify-between gap-4">
                      <span className="font-mono text-sm text-[#00b259] font-bold">
                        [ {String(index + 1).padStart(2, '0')} ]
                      </span>
                      <TimerReset className="size-4 text-neutral-400" />
                    </div>
                    <CardTitle className="text-xl font-sans font-bold">{step.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div 
                      className="text-base leading-7 text-neutral-500 font-sans [&>p]:leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: step.description }}
                    />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Open Roles Section */}
        <section id="open-roles" className="px-4 sm:px-6 lg:px-8 border-b border-[#C5C4C2]">
          <div className="mx-auto max-w-7xl border-x border-[#C5C4C2] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
            <div className="mx-auto max-w-3xl text-center flex flex-col items-center mb-10">
              <span className="px-3 py-1 text-xs font-bold text-[#00b259] border border-[#00b259] bg-[#00b259]/10 font-mono inline-block w-fit mb-4">
                :: OPEN ROLES ::
              </span>
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl text-black leading-tight font-display">
                Active roles for senior builders.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-neutral-500 md:text-lg font-sans">
                Each role has a dedicated page with scope, compensation, equity, and what the first 90 days look like.
              </p>
              <div className="mt-4 rounded-none border border-[#C5C4C2] bg-white px-4 py-2 text-sm text-neutral-500 font-mono w-fit">
                [ {openRoles.length} roles open now ]
              </div>
            </div>

            <div className="mt-10 flex flex-col gap-16 max-w-4xl mx-auto">
              {openRoles.map((role, idx) => {
                const colorConfigs = [
                  {
                    bgColor: "bg-[#EAF3FF]",
                    borderColor: "border-[#d0e4ff]",
                    accentColor: "text-[#2563eb]",
                    accentBg: "bg-[#2563eb]",
                    badgeBg: "bg-[#2563eb]/10",
                    hoverBorder: "hover:border-[#2563eb]",
                    hoverShadow: "hover:shadow-[0_20px_40px_rgba(37,99,235,0.12)]",
                    footerBg: "bg-[#EAF3FF]/40"
                  },
                  {
                    bgColor: "bg-[#F8F2FF]",
                    borderColor: "border-[#ebd9ff]",
                    accentColor: "text-[#9333ea]",
                    accentBg: "bg-[#9333ea]",
                    badgeBg: "bg-[#9333ea]/10",
                    hoverBorder: "hover:border-[#9333ea]",
                    hoverShadow: "hover:shadow-[0_20px_40px_rgba(147,51,234,0.12)]",
                    footerBg: "bg-[#F8F2FF]/40"
                  },
                  {
                    bgColor: "bg-[#FFF9E6]",
                    borderColor: "border-[#ffeeba]",
                    accentColor: "text-[#d97706]",
                    accentBg: "bg-[#d97706]",
                    badgeBg: "bg-[#d97706]/10",
                    hoverBorder: "hover:border-[#d97706]",
                    hoverShadow: "hover:shadow-[0_20px_40px_rgba(217,119,6,0.12)]",
                    footerBg: "bg-[#FFF9E6]/40"
                  },
                  {
                    bgColor: "bg-[#f4fef8]",
                    borderColor: "border-[#d0f5e1]",
                    accentColor: "text-[#00b259]",
                    accentBg: "bg-[#00b259]",
                    badgeBg: "bg-[#00b259]/10",
                    hoverBorder: "hover:border-[#00b259]",
                    hoverShadow: "hover:shadow-[0_20px_40px_rgba(0,178,89,0.12)]",
                    footerBg: "bg-[#f4fef8]/40"
                  }
                ]
                const config = colorConfigs[idx % colorConfigs.length]

                return (
                  <div
                    key={role.slug}
                    className="sticky transition-all duration-500 hover:-translate-y-2.5 hover:scale-[1.015]"
                    style={{
                      top: `calc(110px + ${idx * 28}px)`,
                      zIndex: idx + 1
                    }}
                  >
                    <div className="shadow-2xl rounded-2xl bg-white overflow-hidden border border-neutral-100/50">
                      <RoleCard role={role} {...config} />
                    </div>
                  </div>
                )
              })}
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
