import type { Metadata } from 'next'
import Header from '@/components/shadcn-studio/blocks/hero-section-40/header'
import Footer from '@/components/shadcn-studio/blocks/footer/footer'
import { JsonLd } from '@/components/json-ld'
import type { Navigation } from '@/components/shadcn-studio/blocks/hero-section-40/hero-navigation'

export const metadata: Metadata = {
  title: 'Privacy Policy — AI Greentick',
  description: 'Understand how AI Greentick collects, utilizes, and protects your information when using our WhatsApp Business API platform.',
  alternates: {
    canonical: '/privacy-policy',
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
            icon: <svg className='size-4' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' /></svg>
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

export default function PrivacyPolicy() {
  const policySchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Privacy Policy — AI Greentick",
    "description": "Understand how AI Greentick collects, uses, and secures client data.",
    "publisher": {
      "@type": "Organization",
      "name": "AI Greentick"
    }
  }

  return (
    <div className='flex min-h-screen flex-col bg-white text-black font-sans'>
      <JsonLd data={policySchema} />
      <Header navigationData={navigationData} />

      <main className='flex-1 pt-12 border-b border-[#C5C4C2] bg-neutral-50'>
        <div className='mx-auto max-w-4xl border-x border-[#C5C4C2] bg-white px-6 sm:px-12 py-16 sm:py-24 text-left font-sans space-y-10'>
          
          <div className='space-y-4 border-b border-[#C5C4C2] pb-6'>
            <span className="px-3 py-1 text-xs font-bold text-[#00b259] border border-[#00b259] bg-[#00b259]/10 font-mono inline-block">
              :: COMPLIANCE & LEGAL ::
            </span>
            <h1 className='text-3xl sm:text-4xl font-extrabold text-neutral-900 font-sans tracking-tight'>
              Privacy Policy
            </h1>
            <p className='text-xs text-neutral-500 font-mono'>
              Effective Date: June 27, 2026 · Last Updated: June 27, 2026
            </p>
          </div>

          <div className='space-y-6 text-neutral-700 text-sm leading-relaxed font-sans'>
            <p>
              AI Greentick ("we," "our," or "us") provides enterprise WhatsApp Business API and customer messaging solutions. This Privacy Policy details how we collect, store, share, and protect your information when you access our platform, use our shared inbox dashboards, or run marketing campaigns.
            </p>

            <h2 className='text-lg font-bold text-black font-sans border-l-2 border-[#00b259] pl-3 mt-8'>
              1. Information We Collect
            </h2>
            <p>
              We collect information directly from you, automatically via platform telemetry, and from third-party networks (specifically Meta/Facebook) to configure WhatsApp endpoints:
            </p>
            <ul className='list-disc pl-5 space-y-2'>
              <li><strong>Account Registration Details:</strong> Full name, company name, corporate email address, and billing parameters.</li>
              <li><strong>API Integration Parameters:</strong> Meta Business Manager IDs, WhatsApp Business Account (WABA) IDs, API tokens, and certificate logs.</li>
              <li><strong>Conversation Metadata:</strong> Message delivery logs, categories (marketing, utility, authentication, service), timestamps, and status updates (sent, delivered, read) to track pass-through billing.</li>
            </ul>

            <h2 className='text-lg font-bold text-black font-sans border-l-2 border-[#00b259] pl-3 mt-8'>
              2. How We Use Your Information
            </h2>
            <p>
              Your data is utilized strictly to provide compliant, secure conversational services:
            </p>
            <ul className='list-disc pl-5 space-y-2'>
              <li>To run, maintain, and optimize the AI Greentick Shared Team Inbox and marketing dashboard.</li>
              <li>To calculate billing metrics and route passive conversation fees without markups.</li>
              <li>To submit, track, and secure your Green Tick badge verification requests directly with Meta.</li>
            </ul>

            <h2 className='text-lg font-bold text-black font-sans border-l-2 border-[#00b259] pl-3 mt-8'>
              3. Data Security & Hosting
            </h2>
            <p>
              We implement industry-standard encryption protocols (TLS 1.3 in transit and AES-256 at rest) to protect message payloads. Since AI Greentick integrates directly with the official WhatsApp Cloud API, all end-to-end messaging encryption parameters remain subject to Meta’s security standards.
            </p>

            <h2 className='text-lg font-bold text-black font-sans border-l-2 border-[#00b259] pl-3 mt-8'>
              4. Third-Party Sharing & Compliance
            </h2>
            <p>
              We do not sell, rent, or trade your corporate information or client database lists. We share data only with authorized subprocessors (such as cloud hosting servers, payment gateways, and Meta) strictly to perform operational tasks.
            </p>

            <h2 className='text-lg font-bold text-black font-sans border-l-2 border-[#00b259] pl-3 mt-8'>
              5. Contact Us
            </h2>
            <p>
              If you have any questions, compliance requests, or data deletion inquiries regarding this policy, please reach out to our legal compliance officer at:
              <br />
              <strong className='text-black'>Email:</strong> hello@aigreentick.com
              <br />
              <strong className='text-black'>Address:</strong> Jaipur, Rajasthan, India
            </p>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  )
}
