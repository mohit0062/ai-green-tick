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
import Footer from '@/components/shadcn-studio/blocks/footer/footer'
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

export const metadata: Metadata = {
  title: 'Careers at Apargo — Build Software That Ships',
  description: 'Open engineering, design, AI and product roles at Apargo. Remote-friendly, senior-heavy team. Builders of AI Greentick.',
  alternates: {
    canonical: '/careers',
  },
  openGraph: {
    title: 'Careers at Apargo — Build Software That Ships',
    description: 'Open engineering, design, AI and product roles at Apargo. Remote-friendly, senior-heavy team. Builders of AI Greentick.',
    url: '/careers',
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
    heading: "Join a team that builds — and operates — what it builds.",
    description: "Apargo is a small, senior-heavy team that ships software for clients and runs its own SaaS products. You'll write code that goes live in days, not quarters. You'll see your work used by real people. You won't sit through three rounds of \"culture fit\" interviews."
  },
  fitSignals: [
    {
      iconName: "ShieldCheckIcon",
      title: "Senior judgement",
      description: "You've shipped real software at scale. You know when to refactor and when to leave it alone."
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
    <div className="mx-auto max-w-3xl text-center">
      <Badge variant="outline" className="mb-4 border-primary/25 bg-primary/5 text-[#00b259]">
        {eyebrow}
      </Badge>
      <h2 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
        {title}
      </h2>
      <p className="mt-4 text-base leading-7 text-muted-foreground md:text-lg">
        {description}
      </p>
    </div>
  )
}

function SignalCard({ item }: { item: any }) {
  const Icon = getLucideIcon(item.iconName)

  return (
    <Card className="h-full border border-[#C5C4C2] bg-white text-black shadow-none transition-all duration-300 hover:-translate-y-1 hover:border-[#00b259] hover:shadow-lg">
      <CardHeader>
        <div className="mb-2 flex size-11 items-center justify-center rounded-xl bg-[#00b259]/10 text-[#00b259]">
          <Icon className="size-5" />
        </div>
        <CardTitle className="text-xl">{item.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-base leading-7 text-neutral-500">
          {item.description}
        </CardDescription>
      </CardContent>
    </Card>
  )
}

function RoleCard({ role }: { role: CareerRole }) {
  return (
    <Card className="group h-full border border-[#C5C4C2] bg-white text-black shadow-none transition-all duration-300 hover:-translate-y-1 hover:border-[#00b259] hover:shadow-lg">
      <CardHeader className="gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="secondary">{role.team}</Badge>
          <Badge variant="outline">{role.employmentType}</Badge>
          <Badge variant="outline">{role.location}</Badge>
        </div>
        <div className="space-y-3">
          <CardTitle className="text-2xl tracking-tight text-left">{role.title}</CardTitle>
          <CardDescription className="text-base leading-7 text-left text-neutral-500">
            {role.summary}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="mt-auto space-y-5">
        <Separator className="bg-[#C5C4C2]/50" />
        <div className="grid gap-3 text-sm text-neutral-500 sm:grid-cols-2 text-left">
          <div>
            <p className="font-semibold text-black">Compensation</p>
            <p>{role.compensation.range}</p>
          </div>
          <div>
            <p className="font-semibold text-black">Equity</p>
            <p>{role.compensation.equity}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="justify-between gap-3 bg-neutral-100/50">
        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
          Active role
        </span>
        <Link
          href={`/careers/${role.slug}`}
          className={cn(
            buttonVariants({ variant: 'outline', size: 'lg' }),
            'h-10 rounded-full bg-white px-4 border-[#C5C4C2] hover:border-[#00b259] hover:text-[#00b259]'
          )}
        >
          View role
          <ArrowRight className="size-4 ml-1.5" />
        </Link>
      </CardFooter>
    </Card>
  )
}

export default function CareersPage() {
  const careersSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Apargo Innovations - Open Engineering & Product Careers",
    "description": content.hero.description,
    "url": "https://www.apargoinnovations.com/careers",
    "itemListElement": openRoles.map((role, idx) => ({
      "@type": "ListItem",
      "position": idx + 1,
      "item": {
        "@type": "JobPosting",
        "title": role.title,
        "description": role.summary,
        "url": `https://www.apargoinnovations.com/careers/${role.slug}`
      }
    }))
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#ECEBE9] text-black">
      <JsonLd data={careersSchema} />
      <Header navigationData={navigationData} />

      <main className="flex-1 overflow-hidden pt-12">
        <section className="relative border-b border-[#C5C4C2] bg-neutral-100">
          <div className="pointer-events-none absolute inset-0 opacity-70 [background-image:radial-gradient(circle_at_18%_22%,rgba(0,178,89,0.08),transparent_28rem),radial-gradient(circle_at_88%_8%,rgba(0,178,89,0.05),transparent_24rem)]" />
          <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 md:py-24 lg:grid-cols-[minmax(0,1fr)_28rem] lg:px-8 text-left">
            <div className="max-w-4xl">
              <Badge className="mb-6 bg-[#00b259] text-white">
                {content.hero.badge}
              </Badge>
              <h1 className="max-w-5xl text-4xl font-bold tracking-tight text-black sm:text-5xl lg:text-6xl font-sans">
                {content.hero.heading}
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-neutral-500 md:text-xl font-sans">
                {content.hero.description}
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="#open-roles"
                  className={cn(
                    buttonVariants({ size: 'lg' }),
                    'h-12 rounded-full px-6 text-base bg-[#00b259] text-white hover:opacity-90 shadow-md'
                  )}
                >
                  See Open Roles
                  <ArrowRight className="size-4 ml-1.5" />
                </Link>
                <a
                  href={openApplicationHref}
                  className={cn(
                    buttonVariants({ variant: 'outline', size: 'lg' }),
                    'h-12 rounded-full bg-white px-6 text-base border-[#C5C4C2] text-black hover:border-black'
                  )}
                >
                  Send an Open Application
                  <Mail className="size-4 ml-1.5" />
                </a>
              </div>
            </div>

            <Card className="relative h-fit border-[#C5C4C2] bg-white p-2 shadow-lg backdrop-blur text-black">
              <CardHeader>
                <div className="flex items-center justify-between gap-3">
                  <Badge variant="outline" className="border-[#00b259]/30 text-[#00b259]">
                    Operating agreement
                  </Badge>
                  <Code2 className="size-5 text-[#00b259]" />
                </div>
                <CardTitle className="text-2xl text-left">
                  Builders who stay close to production.
                </CardTitle>
                <CardDescription className="text-base leading-7 text-left text-neutral-500">
                  We hire for people who can move through ambiguity, write clearly, and keep systems alive after launch.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-left">
                {content.heroStats.map((stat) => (
                  <div
                    key={stat.value}
                    className="rounded-xl border border-[#C5C4C2] bg-neutral-50 p-4"
                  >
                    <p className="text-2xl font-bold text-black">{stat.value}</p>
                    <p className="mt-1 text-sm leading-6 text-neutral-500">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-7xl">
            <SectionIntro
              eyebrow="What we look for"
              title="The bar is high, but refreshingly practical."
              description="Apargo works best for senior builders who can make good calls, write down tradeoffs, and keep ownership after launch."
            />

            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {content.fitSignals.map((item) => (
                <SignalCard key={item.title} item={item} />
              ))}
            </div>
          </div>
        </section>

        <section className="bg-neutral-100/50 px-4 py-16 sm:px-6 lg:px-8 lg:py-24 border-y border-[#C5C4C2]">
          <div className="mx-auto grid max-w-7xl items-start gap-10 lg:grid-cols-[0.82fr_1.18fr] text-left">
            <div className="max-w-xl lg:sticky lg:top-24 lg:self-start">
              <Badge variant="outline" className="mb-4 border-[#00b259]/30 bg-white text-[#00b259]">
                What we offer
              </Badge>
              <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
                Fewer perks-as-theater. More conditions for good work.
              </h2>
              <p className="mt-4 text-base leading-7 text-neutral-500 md:text-lg">
                We optimize for autonomy, strong peers, clear compensation, and the boring operational support that lets senior people do serious work.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              {content.benefits.map((item) => (
                <SignalCard key={item.title} item={item} />
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-7xl">
            <SectionIntro
              eyebrow="How we hire"
              title="No theater. Just enough signal to decide well."
              description="The process is designed to respect senior candidates and still let both sides see how the work actually feels."
            />

            <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3 text-left">
              {content.hiringSteps.map((step, index) => (
                <Card key={step.title} className="border border-[#C5C4C2] bg-white text-black shadow-none">
                  <CardHeader>
                    <div className="flex items-center justify-between gap-4">
                      <span className="font-mono text-sm text-[#00b259] font-bold">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <TimerReset className="size-4 text-neutral-400" />
                    </div>
                    <CardTitle className="text-xl">{step.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base leading-7 text-neutral-500">
                      {step.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-neutral-900 px-4 py-16 text-white sm:px-6 lg:px-8 lg:py-24">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr] text-left">
            <div>
              <Badge className="mb-4 bg-[#00b259] text-white">
                Wrong fit filter
              </Badge>
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl text-white">
                You might not enjoy Apargo if...
              </h2>
              <p className="mt-4 text-base leading-7 text-neutral-400 md:text-lg">
                This page should attract the right people and save the wrong people a long process. Tiny kindness, big leverage.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {content.notForYou.map((item) => (
                <div
                  key={item}
                  className="flex gap-3 rounded-2xl border border-white/10 bg-white/5 p-5"
                >
                  <XCircle className="mt-1 size-5 shrink-0 text-red-500" />
                  <p className="text-sm leading-6 text-neutral-300">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="open-roles" className="px-4 py-16 sm:px-6 lg:px-8 lg:py-24 border-b border-[#C5C4C2]">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end text-left">
              <div className="max-w-2xl">
                <Badge variant="outline" className="mb-4 border-[#00b259]/30 bg-white text-[#00b259]">
                  Open roles
                </Badge>
                <h2 className="text-3xl font-semibold tracking-tight md:text-4xl text-black">
                  Active roles for senior builders.
                </h2>
                <p className="mt-4 text-base leading-7 text-neutral-500 md:text-lg">
                  Each role has a dedicated page with scope, compensation, equity, and what the first 90 days look like.
                </p>
              </div>
              <div className="rounded-full border border-[#C5C4C2] bg-white px-4 py-2 text-sm text-neutral-500 shrink-0 h-fit">
                {openRoles.length} roles open now
              </div>
            </div>

            <div className="mt-10 grid gap-6 lg:grid-cols-2">
              {openRoles.map((role) => (
                <RoleCard key={role.slug} role={role} />
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <Card className="mx-auto max-w-7xl border border-[#00b259]/30 bg-[#00b259] text-white shadow-xl">
            <CardContent className="grid gap-8 p-6 md:grid-cols-[1fr_auto] md:items-center md:p-10 text-left">
              <div>
                <Badge className="mb-4 bg-white text-[#00b259]">
                  Open application
                </Badge>
                <h2 className="text-3xl font-bold tracking-tight md:text-4xl text-white">
                  Don&apos;t see your role?
                </h2>
                <p className="mt-4 max-w-3xl text-base leading-7 text-emerald-100 md:text-lg">
                  If you&apos;re a senior engineer, designer or PM who wants to work with us, send us a note. We open roles based on the team we want to build, not just slot-filling.
                </p>
              </div>
              <a
                href={openApplicationHref}
                className={cn(
                  buttonVariants({ variant: 'outline', size: 'lg' }),
                  'h-12 rounded-full border-white bg-white px-6 text-base text-[#00b259] hover:bg-neutral-100 shrink-0'
                )}
              >
                Send an Open Application
                <Mail className="size-4 ml-1.5" />
              </a>
            </CardContent>
          </Card>
        </section>
      </main>

      <Footer />
    </div>
  )
}
