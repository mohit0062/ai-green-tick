import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  ArrowLeft,
  ArrowRight,
  Briefcase,
  CheckCircle2,
  CircleDollarSign,
  Clock,
  MapPin,
  Mail,
  Sparkles,
  Users,
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
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { getCareerRole, openApplicationHref, openRoles } from '@/lib/careers'
import { cn } from '@/lib/utils'
import { JsonLd } from '@/components/json-ld'
import type { Navigation } from '@/components/shadcn-studio/blocks/hero-section-40/hero-navigation'

type RolePageProps = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return openRoles.map((role) => ({
    slug: role.slug,
  }))
}

export async function generateMetadata({
  params,
}: RolePageProps): Promise<Metadata> {
  const { slug } = await params
  const role = getCareerRole(slug)

  if (!role) {
    return {
      title: 'Role not found | Careers at Apargo',
    }
  }

  const title = `${role.title} | Careers at Apargo`
  const description = `${role.summary} ${role.location}. ${role.employmentType}. Compensation: ${role.compensation.range}.`

  return {
    title,
    description,
    alternates: {
      canonical: `/careers/${slug}`,
    },
    openGraph: {
      title,
      description,
      url: `/careers/${slug}`,
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
    title: 'Testimonials',
    href: '/#testimonials'
  },
  {
    title: 'Pricing',
    href: '/pricing'
  }
]

function DetailList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-sm leading-6 text-neutral-500 md:text-base text-left">
          <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-[#00b259]" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

export default async function CareerRolePage({ params }: RolePageProps) {
  const { slug } = await params
  const role = getCareerRole(slug)

  if (!role) {
    notFound()
  }

  const jobSchema = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    "title": role.title,
    "description": role.summary + "\n\n" + role.about.join("\n") + "\n\nResponsibilities:\n" + role.responsibilities.join("\n") + "\n\nRequirements:\n" + role.requirements.join("\n"),
    "datePosted": "2026-05-15",
    "validThrough": "2026-12-31T23:59:59Z",
    "employmentType": role.employmentType === "Full-time" ? "FULL_TIME" : "CONTRACTOR",
    "hiringOrganization": {
      "@type": "Organization",
      "name": "Apargo Innovations",
      "sameAs": "https://www.apargoinnovations.com",
      "logo": "https://www.apargoinnovations.com/group-2.svg"
    },
    "jobLocation": {
      "@type": "Place",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Jaipur",
        "addressRegion": "Rajasthan",
        "addressCountry": "IN"
      }
    },
    "baseSalary": {
      "@type": "MonetaryAmount",
      "currency": "INR",
      "value": {
        "@type": "QuantitativeValue",
        "value": role.compensation.range.includes("36L") 
          ? 3600000 
          : role.compensation.range.includes("42L") 
          ? 4200000 
          : role.compensation.range.includes("24L") 
          ? 2400000 
          : 3400000,
        "unitText": "YEAR"
      }
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#ECEBE9] text-black">
      <JsonLd data={jobSchema} />
      <Header navigationData={navigationData} />

      <main className="flex-1 pt-12">
        <section className="border-b border-[#C5C4C2] bg-neutral-100/50">
          <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20 text-left">
            <Link
              href="/careers"
              className={cn(
                buttonVariants({ variant: 'ghost', size: 'sm' }),
                '-ml-2 mb-8 rounded-full text-neutral-500 hover:text-black hover:bg-neutral-200/50'
              )}
            >
              <ArrowLeft className="size-4 mr-1.5" />
              Back to careers
            </Link>

            <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_24rem] lg:items-end">
              <div>
                <div className="mb-5 flex flex-wrap gap-2">
                  <Badge className="bg-[#00b259] text-white">{role.team}</Badge>
                  <Badge variant="outline" className="border-[#C5C4C2] bg-white text-black">{role.employmentType}</Badge>
                  <Badge variant="outline" className="border-[#C5C4C2] bg-white text-black">{role.location}</Badge>
                </div>
                <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-black sm:text-5xl font-sans">
                  {role.title}
                </h1>
                <p className="mt-5 max-w-3xl text-lg leading-8 text-neutral-500 font-sans">
                  {role.summary}
                </p>
              </div>

              <Card className="border-[#C5C4C2] bg-white shadow-lg text-black">
                <CardHeader>
                  <CardTitle className="text-xl text-left">Role snapshot</CardTitle>
                  <CardDescription className="text-left text-neutral-500">
                    Closed ranges, clear team, and a process that respects senior candidates.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 text-left">
                  <div className="flex gap-3">
                    <MapPin className="mt-0.5 size-5 shrink-0 text-[#00b259]" />
                    <div>
                      <p className="font-semibold text-black">Location</p>
                      <p className="text-sm text-neutral-500">{role.location}</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Briefcase className="mt-0.5 size-5 shrink-0 text-[#00b259]" />
                    <div>
                      <p className="font-semibold text-black">Type</p>
                      <p className="text-sm text-neutral-500">{role.employmentType}</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Users className="mt-0.5 size-5 shrink-0 text-[#00b259]" />
                    <div>
                      <p className="font-semibold text-black">Team</p>
                      <p className="text-sm text-neutral-500">{role.team}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[minmax(0,1fr)_24rem]">
            <div className="space-y-6">
              <Card className="shadow-none border-[#C5C4C2] bg-white text-black">
                <CardHeader>
                  <Badge variant="outline" className="w-fit border-[#00b259]/30 bg-white text-[#00b259]">
                    About the role
                  </Badge>
                  <CardTitle className="text-2xl text-left">What you will own</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-left">
                  {role.about.map((paragraph) => (
                    <p key={paragraph} className="text-base leading-8 text-neutral-500">
                      {paragraph}
                    </p>
                  ))}
                </CardContent>
              </Card>

              <Card className="shadow-none border-[#C5C4C2] bg-white text-black">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Clock className="size-5 text-[#00b259]" />
                    <CardTitle className="text-2xl">First 90 days</CardTitle>
                  </div>
                  <CardDescription className="text-left text-neutral-500">
                    You should see meaningful production impact quickly.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <DetailList items={role.first90} />
                </CardContent>
              </Card>

              <div className="grid gap-6 lg:grid-cols-2">
                <Card className="shadow-none border-[#C5C4C2] bg-white text-black">
                  <CardHeader>
                    <CardTitle className="text-2xl text-left">What you&apos;ll do</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <DetailList items={role.responsibilities} />
                  </CardContent>
                </Card>

                <Card className="shadow-none border-[#C5C4C2] bg-white text-black">
                  <CardHeader>
                    <CardTitle className="text-2xl text-left">What we&apos;re looking for</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <DetailList items={role.requirements} />
                  </CardContent>
                </Card>
              </div>

              <Card className="border-[#00b259]/30 bg-[#00b259]/5 shadow-none text-black">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Sparkles className="size-5 text-[#00b259]" />
                    <CardTitle className="text-2xl">Nice to have</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <DetailList items={role.niceToHave} />
                </CardContent>
              </Card>
            </div>

            <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
              <Card className="border-[#C5C4C2] bg-white text-black shadow-lg">
                <CardHeader>
                  <div className="flex size-11 items-center justify-center rounded-xl bg-[#00b259]/10 text-[#00b259]">
                    <CircleDollarSign className="size-5" />
                  </div>
                  <CardTitle className="text-2xl text-left">Compensation</CardTitle>
                  <CardDescription className="text-left text-neutral-500">
                    Closed ranges signal trust. We would rather be specific up front.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-5 text-left">
                  <div>
                    <p className="text-sm font-semibold text-neutral-500">Range</p>
                    <p className="mt-1 text-lg font-bold text-black">
                      {role.compensation.range}
                    </p>
                  </div>
                  <Separator className="bg-[#C5C4C2]/50" />
                  <div>
                    <p className="text-sm font-semibold text-neutral-500">Equity</p>
                    <p className="mt-1 text-lg font-bold text-black">
                      {role.compensation.equity}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-neutral-900 text-white shadow-xl">
                <CardHeader>
                  <Badge className="w-fit bg-[#00b259] text-white">
                    How to apply
                  </Badge>
                  <CardTitle className="text-2xl text-left text-white font-bold">
                    Send signal, not a novel.
                  </CardTitle>
                  <CardDescription className="text-left text-neutral-400">
                    Include links to shipped work, a short note on why this role fits, and any constraints we should know early.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <a
                    href={role.applyHref}
                    className={cn(
                      buttonVariants({ size: 'lg' }),
                      'h-12 w-full rounded-full px-5 text-base bg-[#00b259] text-white hover:opacity-90 transition-opacity'
                    )}
                  >
                    Apply for this role
                    <Mail className="size-4 ml-1.5" />
                  </a>
                  <a
                    href={openApplicationHref}
                    className={cn(
                      buttonVariants({ variant: 'outline', size: 'lg' }),
                      'h-12 w-full rounded-full border-white/20 bg-white/10 px-5 text-base text-white hover:bg-white/15'
                    )}
                  >
                    Open application instead
                    <ArrowRight className="size-4 ml-1.5" />
                  </a>
                </CardContent>
              </Card>
            </aside>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
