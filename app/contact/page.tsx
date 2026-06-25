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
  title: 'Contact Us — Get in Touch with AI Greentick',
  description: 'Reach out to AI Greentick for WhatsApp Business API setup, marketing campaigns, automation support, or partnership inquiries.',
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: 'Contact Us — Get in Touch with AI Greentick',
    description: 'Reach out to AI Greentick for WhatsApp Business API setup, marketing campaigns, automation support, or partnership inquiries.',
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
    description: "Talk to our team about WhatsApp API setup and integration",
    ctaText: "hello@aigreentick.com",
    ctaLink: "mailto:hello@aigreentick.com"
  },
  {
    icon: Mail,
    title: "Email Support",
    description: "Get help with your existing AI Greentick workspace",
    ctaText: "support@aigreentick.com",
    ctaLink: "mailto:support@aigreentick.com"
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
    ctaText: "hello@aigreentick.com",
    ctaLink: "mailto:hello@aigreentick.com"
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
    title: "Expert reviews",
    description: "Within one working day, a team member reviews your enquiry."
  },
  {
    number: "3",
    title: "Honest reply",
    description: "We reply with either a 30-minute call slot, a written response, or clear next steps."
  },
  {
    number: "4",
    title: "Onboarding & setup",
    description: "If we move forward – we handle verification, API onboarding, and workspace setup."
  }
]

export default function ContactPage() {
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

  return (
    <div className='flex min-h-screen flex-col bg-white text-black'>
      <JsonLd data={contactSchema} />
      <Header navigationData={navigationData} />

      <main className='flex-1 pt-12'>
        {/* Contact Section */}
        <ContactUs
          contactCards={contactCards}
          heading="Tell Us What You're Building."
          subtitle="Fill the form below or email us directly. You'll hear back within one working day from a team member."
        />

        {/* Office & Hours */}
        <section className='px-4 sm:px-6 lg:px-8 border-b border-[#C5C4C2] bg-neutral-50'>
          <div className='mx-auto max-w-7xl border-x border-[#C5C4C2] px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24'>
            <div className='mb-12 text-center flex flex-col items-center'>
              <span className="px-3 py-1 text-xs font-bold text-[#00b259] border border-[#00b259] bg-[#00b259]/10 font-mono inline-block w-fit mb-4">
                :: CHANNELS & AVAILABILITY ::
              </span>
              <h2 className='text-3xl font-extrabold tracking-tight text-neutral-900 md:text-4xl font-sans'>
                Where to find us.
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
                    <h3 className='text-lg font-bold font-sans'>Phone / WhatsApp</h3>
                    <div className='text-neutral-500 text-[15px] leading-relaxed space-y-1 font-sans'>
                      <p>10am – 7pm IST, Mon – Fri</p>
                      <p>WhatsApp preferred for quick questions</p>
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
                    <h3 className='text-lg font-bold font-sans'>Office</h3>
                    <div className='text-neutral-500 text-[15px] leading-relaxed space-y-1 font-sans'>
                      <p>Remote-first team</p>
                      <p>Headquartered in Jaipur, Rajasthan, India</p>
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
                    <h3 className='text-lg font-bold font-sans'>Office Hours</h3>
                    <div className='text-neutral-500 text-[15px] leading-relaxed space-y-1 font-sans'>
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
        <section className='px-4 sm:px-6 lg:px-8 border-b border-[#C5C4C2] bg-white'>
          <div className='mx-auto max-w-7xl border-x border-[#C5C4C2] px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24'>
            <div className='mb-12 text-center flex flex-col items-center'>
              <span className="px-3 py-1 text-xs font-bold text-[#00b259] border border-[#00b259] bg-[#00b259]/10 font-mono inline-block w-fit mb-4">
                :: RESPONSE PROCESS ::
              </span>
              <h2 className='text-3xl font-extrabold tracking-tight text-neutral-900 md:text-4xl font-sans'>
                What happens after you submit
              </h2>
            </div>

            <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-4'>
              {steps.map((step, idx) => (
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
                      <h3 className='text-lg font-bold font-sans'>{step.title}</h3>
                      <p className='text-neutral-500 text-[15px] leading-relaxed font-sans'>{step.description}</p>
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
