import type { Metadata } from 'next'
import {
  Mail,
  MapPin,
  Phone,
  Clock,
  BookOpen,
  MessageCircle,
  Globe
} from 'lucide-react'

import { Card, CardContent } from '@/components/ui/card'
import { MotionPreset } from '@/components/ui/motion-preset'
import ContactUs from '@/components/shadcn-studio/blocks/contact-us-page-04/contact-us-page-04'
import CTA from '@/components/shadcn-studio/blocks/cta-section-11/cta-section-11'
import Header from '@/components/shadcn-studio/blocks/hero-section-40/header'
import Breadcrumb from '@/components/ui/breadcrumb'
import Footer from '@/components/shadcn-studio/blocks/footer/footer'
import { JsonLd } from '@/components/json-ld'
import type { Navigation } from '@/components/shadcn-studio/blocks/hero-section-40/hero-navigation'
import { getSiteSection } from '@/utils/cms'
import AeoContainer from '@/components/seo/aeo-container'

export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  const cms = await getSiteSection<any>('contact_page')
  const title = cms.seoTitle || 'Contact Us — Get in Touch with AI Greentick'
  const description =
    cms.seoDesc ||
    'Reach out to AI Greentick for WhatsApp Business API setup, marketing campaigns, automation support, or partnership inquiries.'

  return {
    title,
    description,
    alternates: {
      canonical: '/contact',
    },
    ...(cms.noindex ? { robots: { index: false, follow: false } } : {}),
    openGraph: {
      title,
      description,
      url: '/contact',
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

// Map icon string from CMS to actual Lucide component
function resolveIcon(iconName: string) {
  const map: Record<string, React.ElementType> = {
    Mail,
    MapPin,
    Phone,
    Clock,
    MessageCircle,
    Globe,
  }
  return map[iconName] || Mail
}

// Map icon string to JSX for contact cards
function buildContactCards(cmsCards: any[]) {
  return cmsCards.map((card: any) => ({
    ...card,
    icon: resolveIcon(card.icon),
  }))
}

export default async function ContactPage() {
  // Fetch CMS data
  const cms = await getSiteSection<any>('contact_page')

  const contactCards = buildContactCards(cms.contactCards || [])
  const heading = cms.heading || "Tell Us What You're Building."
  const subtitle = cms.subtitle || "Fill the form below or email us directly. You'll hear back within one working day from a team member."
  const mapUrl = cms.mapUrl || "https://maps.google.com/maps?hl=en&q=Jaipur+Rajasthan+India&t=&z=12&ie=UTF8&iwloc=B&output=embed"
  const officeSection = cms.officeSection || {}
  const stepsSection = cms.stepsSection || {}
  const steps = stepsSection.steps || []

  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact AI Greentick",
    "description": "Reach out to AI Greentick for WhatsApp Business API integration, support pathways, or partner inquiries.",
    "url": "https://ai-green-tick-theta.vercel.app/contact",
    "mainEntity": {
      "@type": "ProfessionalService",
      "name": "AI Greentick",
      "image": "https://ai-green-tick-theta.vercel.app/group-2.svg",
      "telephone": "",
      "email": "hello@aigreentick.com",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Jaipur",
        "addressRegion": "Rajasthan",
        "postalCode": "302001",
        "addressCountry": "IN"
      }
    }
  }

  const faqSchema = cms.faqs && cms.faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": cms.faqs.map((f: any) => ({
      "@type": "Question",
      "name": f.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": f.answer,
      },
    })),
  } : null

  return (
    <div className='flex min-h-screen flex-col bg-white text-black'>
      <JsonLd data={contactSchema} />
      {faqSchema && <JsonLd data={faqSchema} />}
      <Header navigationData={navigationData} />
      <Breadcrumb />

      <main className='flex-1'>
        {/* Contact Section */}
        <ContactUs
          contactCards={contactCards}
          heading={heading}
          subtitle={subtitle}
          mapUrl={mapUrl}
        />

        {/* Office & Hours */}
        <section className='px-4 sm:px-6 lg:px-8 border-b border-[#C5C4C2] bg-neutral-50'>
          <div className='mx-auto max-w-7xl border-x border-[#C5C4C2] px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24'>
            <div className='mb-12 text-center flex flex-col items-center'>
              <span className="px-3 py-1 text-xs font-bold text-[#00b259] border border-[#00b259] bg-[#00b259]/10 font-mono inline-block w-fit mb-4">
                {officeSection.badgeText || ':: CHANNELS & AVAILABILITY ::'}
              </span>
              <h2 className='text-3xl font-extrabold tracking-tight text-neutral-900 md:text-4xl font-display'>
                {officeSection.heading || 'Where to find us.'}
              </h2>
            </div>

            <div className='grid gap-8 md:grid-cols-3'>
              {/* Phone / WhatsApp */}
              <MotionPreset fade slide={{ direction: 'up', offset: 20 }} transition={{ duration: 0.5 }}>
                <Card className='h-full shadow-none border-[#C5C4C2] bg-white text-black rounded-none transition-all duration-300 hover:border-[#00b259] hover:shadow-[0_0_15px_rgba(0,178,89,0.1)]'>
                  <CardContent className='flex flex-col gap-4 p-6 text-left font-sans'>
                    <div className='flex size-11 items-center justify-center rounded-none border border-[#C5C4C2] bg-[#00b259]/10 text-[#00b259]'>
                      <Phone className='size-5' />
                    </div>
                    <h3 className='text-lg font-bold font-display'>{officeSection.phone?.title || 'Phone / WhatsApp'}</h3>
                    <div className='text-neutral-500 text-[15px] leading-relaxed space-y-1 font-sans'>
                      <p>{officeSection.phone?.line1 || '10am \u2013 7pm IST, Mon \u2013 Fri'}</p>
                      <p>{officeSection.phone?.line2 || 'WhatsApp preferred for quick questions'}</p>
                    </div>
                  </CardContent>
                </Card>
              </MotionPreset>

              {/* Office */}
              <MotionPreset fade slide={{ direction: 'up', offset: 20 }} delay={0.1} transition={{ duration: 0.5 }}>
                <Card className='h-full shadow-none border-[#C5C4C2] bg-white text-black rounded-none transition-all duration-300 hover:border-[#00b259] hover:shadow-[0_0_15px_rgba(0,178,89,0.1)]'>
                  <CardContent className='flex flex-col gap-4 p-6 text-left font-sans'>
                    <div className='flex size-11 items-center justify-center rounded-none border border-[#C5C4C2] bg-[#00b259]/10 text-[#00b259]'>
                      <MapPin className='size-5' />
                    </div>
                    <h3 className='text-lg font-bold font-display'>{officeSection.office?.title || 'Office'}</h3>
                    <div className='text-neutral-500 text-[15px] leading-relaxed space-y-1 font-sans'>
                      <p>{officeSection.office?.line1 || 'Remote-first team'}</p>
                      <p>{officeSection.office?.line2 || 'Headquartered in Jaipur, Rajasthan, India'}</p>
                    </div>
                  </CardContent>
                </Card>
              </MotionPreset>

              {/* Office hours */}
              <MotionPreset fade slide={{ direction: 'up', offset: 20 }} delay={0.2} transition={{ duration: 0.5 }}>
                <Card className='h-full shadow-none border-[#C5C4C2] bg-white text-black rounded-none transition-all duration-300 hover:border-[#00b259] hover:shadow-[0_0_15px_rgba(0,178,89,0.1)]'>
                  <CardContent className='flex flex-col gap-4 p-6 text-left font-sans'>
                    <div className='flex size-11 items-center justify-center rounded-none border border-[#C5C4C2] bg-[#00b259]/10 text-[#00b259]'>
                      <Clock className='size-5' />
                    </div>
                    <h3 className='text-lg font-bold font-display'>{officeSection.hours?.title || 'Office Hours'}</h3>
                    <div className='text-neutral-500 text-[15px] leading-relaxed space-y-1 font-sans'>
                      <p>{officeSection.hours?.monFri || 'Mon \u2013 Fri: 10:00am \u2013 7:00pm IST'}</p>
                      <p>{officeSection.hours?.saturday || 'Saturday: On-call only for production issues'}</p>
                      <p>{officeSection.hours?.sunday || 'Sunday: Closed'}</p>
                    </div>
                  </CardContent>
                </Card>
              </MotionPreset>
            </div>
          </div>
        </section>

        {/* What happens after you submit */}
        <section className='px-4 sm:px-6 lg:px-8 border-b border-[#C5C4C2] bg-white'>
          <div className='mx-auto max-w-7xl border-x border-[#C5C4C2] px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24'>
            <div className='mb-12 text-center flex flex-col items-center'>
              <span className="px-3 py-1 text-xs font-bold text-[#00b259] border border-[#00b259] bg-[#00b259]/10 font-mono inline-block w-fit mb-4">
                {stepsSection.badgeText || ':: RESPONSE PROCESS ::'}
              </span>
              <h2 className='text-3xl font-extrabold tracking-tight text-neutral-900 md:text-4xl font-display'>
                {stepsSection.heading || 'What happens after you submit'}
              </h2>
            </div>

            <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-4'>
              {steps.map((step: any, idx: number) => (
                <MotionPreset
                  key={idx}
                  fade
                  slide={{ direction: 'up', offset: 20 }}
                  delay={idx * 0.1}
                  transition={{ duration: 0.5 }}
                >
                  <Card className='h-full border border-[#C5C4C2] bg-white text-black shadow-none rounded-none transition-all duration-300 hover:border-[#00b259] hover:shadow-[0_0_15px_rgba(0,178,89,0.1)]'>
                    <CardContent className='flex h-full flex-col gap-4 p-6 text-left font-sans'>
                      <span className="font-mono text-sm text-[#00b259] font-bold">
                        [ {String(step.number).padStart(2, '0')} ]
                      </span>
                      <h3 className='text-lg font-bold font-display'>{step.title}</h3>
                      <div 
                        className='text-neutral-500 text-[15px] leading-relaxed font-sans [&_strong]:font-bold [&_strong]:text-neutral-900 [&_a]:text-[#00b259] [&_a]:underline [&_img]:inline-block [&_img]:max-w-full'
                        dangerouslySetInnerHTML={{ __html: step.description }}
                      />
                    </CardContent>
                  </Card>
                </MotionPreset>
              ))}
            </div>
          </div>
        </section>

        <AeoContainer
          aiSnapshot={cms.aiSnapshot}
          faqs={cms.faqs}
          title="Frequently Asked Questions about Contacting Us"
        />

        {/* CTA */}
        <CTA />
      </main>

      <Footer />
    </div>
  )
}
