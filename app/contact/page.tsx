import type { Metadata } from 'next'
import {
  Mail,
  MapPin,
  Phone,
  Clock,
  BookOpen
} from 'lucide-react'

import { Card, CardContent } from '@/components/ui/card'
import { MotionPreset } from '@/components/ui/motion-preset'
import ContactUs from '@/components/shadcn-studio/blocks/contact-us-page-04/contact-us-page-04'
import CTA from '@/components/shadcn-studio/blocks/cta-section-11/cta-section-11'
import Header from '@/components/shadcn-studio/blocks/hero-section-40/header'
import Footer from '@/components/shadcn-studio/blocks/footer/footer'
import { JsonLd } from '@/components/json-ld'
import type { Navigation } from '@/components/shadcn-studio/blocks/hero-section-40/hero-navigation'

export const metadata: Metadata = {
  title: 'Contact Us — Get in Touch with Apargo',
  description: 'Reach out to Apargo for project enquiries, partnerships, or support. Based in Jaipur, serving clients globally.',
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: 'Contact Us — Get in Touch with Apargo',
    description: 'Reach out to Apargo for project enquiries, partnerships, or support. Based in Jaipur, serving clients globally.',
    url: '/contact',
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

const contactCards = [
  {
    icon: Mail,
    title: "Chat to Sales",
    description: "Talk to our team about your project",
    ctaText: "hello@apargo.com",
    ctaLink: "mailto:hello@apargo.com"
  },
  {
    icon: Mail,
    title: "Email Support",
    description: "Get help with an existing project",
    ctaText: "support@apargo.com",
    ctaLink: "mailto:support@apargo.com"
  },
  {
    icon: MapPin,
    title: "Visit Us",
    description: "Jaipur, Rajasthan, India",
    ctaText: "View on maps",
    ctaLink: "https://maps.google.com/?q=Jaipur+Rajasthan+India"
  },
  {
    icon: Phone,
    title: "Phone / WhatsApp",
    description: "10am - 7pm IST, Mon - Fri",
    ctaText: "hello@apargo.com",
    ctaLink: "mailto:hello@apargo.com"
  }
]

const steps = [
  {
    number: "1",
    title: "Instant confirmation",
    description: "You get an instant confirmation email."
  },
  {
    number: "2",
    title: "Engineer reviews",
    description: "Within one working day, a real engineer or PM reviews your enquiry."
  },
  {
    number: "3",
    title: "Honest reply",
    description: "We reply with either a 30-minute call slot, a written response, or an honest \"not a fit\"."
  },
  {
    number: "4",
    title: "Scope & quote",
    description: "If we move forward – written scope and a fixed quote within a week."
  }
]

export default function ContactPage() {
  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact Apargo Innovations",
    "description": "Reach out to Apargo Innovations for custom software engineering consultations, support pathways, or career enquiries.",
    "url": "https://www.apargoinnovations.com/contact",
    "mainEntity": {
      "@type": "ProfessionalService",
      "name": "Apargo Innovations",
      "image": "https://www.apargoinnovations.com/group-2.svg",
      "telephone": "",
      "email": "hello@apargo.com",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Jaipur",
        "addressRegion": "Rajasthan",
        "postalCode": "302001",
        "addressCountry": "IN"
      }
    }
  }

  return (
    <div className='flex min-h-screen flex-col bg-[#ECEBE9] text-black'>
      <JsonLd data={contactSchema} />
      <Header navigationData={navigationData} />

      <main className='flex-1 pt-12'>
        {/* Contact Section */}
        <ContactUs
          contactCards={contactCards}
          heading="Tell Us What You're Building."
          subtitle="Fill the form below or email us directly. You'll hear back within one working day from a real engineer, not an account manager."
        />

        {/* Office & Hours */}
        <section className='py-12 sm:py-16 lg:py-24 border-t border-[#C5C4C2]'>
          <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
            <div className='grid gap-8 md:grid-cols-3'>
              {/* Phone / WhatsApp */}
              <MotionPreset fade slide={{ direction: 'up', offset: 20 }} transition={{ duration: 0.5 }}>
                <Card className='h-full shadow-none border-[#C5C4C2] bg-white text-black'>
                  <CardContent className='flex flex-col gap-4 p-6 text-left'>
                    <div className='flex size-12 items-center justify-center rounded-xl bg-emerald-600/10'>
                      <Phone className='size-6 text-emerald-600' />
                    </div>
                    <h3 className='text-lg font-bold'>Phone / WhatsApp</h3>
                    <div className='text-neutral-500 text-[15px] leading-relaxed space-y-1'>
                      <p>10am – 7pm IST, Mon – Fri</p>
                      <p>WhatsApp preferred for quick questions</p>
                    </div>
                  </CardContent>
                </Card>
              </MotionPreset>

              {/* Office */}
              <MotionPreset fade slide={{ direction: 'up', offset: 20 }} delay={0.1} transition={{ duration: 0.5 }}>
                <Card className='h-full shadow-none border-[#C5C4C2] bg-white text-black'>
                  <CardContent className='flex flex-col gap-4 p-6 text-left'>
                    <div className='flex size-12 items-center justify-center rounded-xl bg-blue-600/10'>
                      <MapPin className='size-6 text-blue-650' />
                    </div>
                    <h3 className='text-lg font-bold'>Office</h3>
                    <div className='text-neutral-500 text-[15px] leading-relaxed space-y-1'>
                      <p>Remote-first team</p>
                      <p>Headquartered in Jaipur, Rajasthan, India</p>
                    </div>
                  </CardContent>
                </Card>
              </MotionPreset>

              {/* Office hours */}
              <MotionPreset fade slide={{ direction: 'up', offset: 20 }} delay={0.2} transition={{ duration: 0.5 }}>
                <Card className='h-full shadow-none border-[#C5C4C2] bg-white text-black'>
                  <CardContent className='flex flex-col gap-4 p-6 text-left'>
                    <div className='flex size-12 items-center justify-center rounded-xl bg-amber-600/10'>
                      <Clock className='size-6 text-amber-600' />
                    </div>
                    <h3 className='text-lg font-bold'>Office Hours</h3>
                    <div className='text-neutral-500 text-[15px] leading-relaxed space-y-1'>
                      <p><strong className='text-black'>Mon – Fri:</strong> 10:00am – 7:00pm IST</p>
                      <p><strong className='text-black'>Saturday:</strong> On-call only for production issues</p>
                      <p><strong className='text-black'>Sunday:</strong> Closed</p>
                    </div>
                  </CardContent>
                </Card>
              </MotionPreset>
            </div>
          </div>
        </section>

        {/* What happens after you submit */}
        <section className='bg-neutral-100/50 py-12 sm:py-16 lg:py-24 border-t border-[#C5C4C2]'>
          <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
            <MotionPreset fade slide={{ direction: 'down', offset: 20 }} transition={{ duration: 0.5 }}>
              <h2 className='mb-12 text-center text-2xl font-bold md:text-3xl lg:text-4xl text-black'>
                What happens after you submit
              </h2>
            </MotionPreset>

            <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-4'>
              {steps.map((step, idx) => (
                <MotionPreset
                  key={idx}
                  fade
                  slide={{ direction: 'up', offset: 20 }}
                  delay={idx * 0.1}
                  transition={{ duration: 0.5 }}
                >
                  <Card className='h-full border border-[#C5C4C2] bg-white text-black shadow-sm'>
                    <CardContent className='flex h-full flex-col gap-4 p-6 text-left'>
                      <div className='flex size-10 items-center justify-center rounded-full bg-[#00b259] text-white text-sm font-bold'>
                        {step.number}
                      </div>
                      <h3 className='text-lg font-bold'>{step.title}</h3>
                      <p className='text-neutral-500 text-[15px] leading-relaxed'>{step.description}</p>
                    </CardContent>
                  </Card>
                </MotionPreset>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <CTA />
      </main>

      <Footer />
    </div>
  )
}
