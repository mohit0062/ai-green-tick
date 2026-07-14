import type { Metadata } from 'next'
import Header from '@/components/shadcn-studio/blocks/hero-section-40/header'
import Breadcrumb from '@/components/ui/breadcrumb'
import Footer from '@/components/shadcn-studio/blocks/footer/footer'
import { JsonLd } from '@/components/json-ld'
import type { Navigation } from '@/components/shadcn-studio/blocks/hero-section-40/hero-navigation'

export const metadata: Metadata = {
  title: 'Terms of Service — AI Greentick',
  description: 'Read the terms and conditions governing the use of AI Greentick platform features, WhatsApp API connectivity, and multi-agent systems.',
  alternates: {
    canonical: '/terms-of-service',
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

export default function TermsOfService() {
  const termsSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Terms of Service — AI Greentick",
    "description": "Terms governing the WhatsApp Business API solution and customer dashboard operations.",
    "publisher": {
      "@type": "Organization",
      "name": "AI Greentick"
    }
  }

  return (
    <div className='flex min-h-screen flex-col bg-white text-black font-sans'>
      <JsonLd data={termsSchema} />
      <Header navigationData={navigationData} />
      <Breadcrumb />

      <main className='flex-1 pt-12 border-b border-[#C5C4C2] bg-neutral-50'>
        <div className='mx-auto max-w-4xl border-x border-[#C5C4C2] bg-white px-6 sm:px-12 py-16 sm:py-24 text-left font-sans space-y-10'>
          
          <div className='space-y-4 border-b border-[#C5C4C2] pb-6'>
            <span className="px-3 py-1 text-xs font-bold text-[#00b259] border border-[#00b259] bg-[#00b259]/10 font-mono inline-block">
              :: TERMS & CONDITIONS ::
            </span>
            <h1 className='text-3xl sm:text-4xl font-extrabold text-neutral-900 font-display tracking-tight'>
              Terms of Service
            </h1>
            <p className='text-xs text-neutral-500 font-mono'>
              Effective Date: June 27, 2026 · Last Updated: June 27, 2026
            </p>
          </div>

          <div className='space-y-6 text-neutral-700 text-sm leading-relaxed font-sans'>
            <p>
              Welcome to AI Greentick. By signing up for a workspace account, connecting your WhatsApp number to our systems, or purchasing a subscription plan, you agree to comply with and be bound by the following Terms of Service.
            </p>

            <h2 className='text-lg font-bold text-black font-display border-l-2 border-[#00b259] pl-3 mt-8'>
              1. Provision of Service & API Onboarding
            </h2>
            <p>
              AI Greentick serves as an authorized Business Solution Provider (BSP) for the WhatsApp Business API. To access our systems:
            </p>
            <ul className='list-disc pl-5 space-y-2'>
              <li>You must comply with Meta's official WhatsApp Business Terms and developer policies.</li>
              <li>You are solely responsible for verifying your Meta Business Manager and keeping credentials secure.</li>
              <li>If Meta suspends your number or account due to terms violations, AI Greentick cannot restore access, and subscription fees remain non-refundable.</li>
            </ul>

            <h2 className='text-lg font-bold text-black font-display border-l-2 border-[#00b259] pl-3 mt-8'>
              2. Acceptable Use & Anti-Spam Policy
            </h2>
            <p>
              AI Greentick strictly prohibits the use of our broadcast systems or shared team inboxes to distribute spam, unsolicited promotions, or prohibited materials (as defined by Meta's Commerce Policy). You must obtain explicit opt-in consent from customers before initiating a WhatsApp message conversation.
            </p>

            <h2 className='text-lg font-bold text-black font-display border-l-2 border-[#00b259] pl-3 mt-8'>
              3. Fees, Payments & Pass-Through Meta Rates
            </h2>
            <ul className='list-disc pl-5 space-y-2'>
              <li><strong>Flat Platform Fee:</strong> Subscription plans (Starter, Growth, Business) are billed monthly/annually. Upgrades, downgrades, and cancellations are managed directly from your billing settings.</li>
              <li><strong>Pass-Through Meta Fees:</strong> Conversation fees are charged by Meta per 24-hour window. AI Greentick passes these charges directly through to you at official Meta rates with <strong>zero markup.</strong></li>
            </ul>

            <h2 className='text-lg font-bold text-black font-display border-l-2 border-[#00b259] pl-3 mt-8'>
              4. Service Availability & Warranties
            </h2>
            <p>
              AI Greentick is provided on an "as-is" and "as-available" basis. While we strive to maintain 99.9% uptime, we are not responsible for message delivery delays or service outages caused by third-party infrastructure (such as Meta's Cloud API nodes or telecom carrier faults).
            </p>

            <h2 className='text-lg font-bold text-black font-display border-l-2 border-[#00b259] pl-3 mt-8'>
              5. Governing Law & Dispute Resolution
            </h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of India. Any disputes arising out of or relating to these terms shall be subject to the exclusive jurisdiction of the courts located in Jaipur, Rajasthan, India.
            </p>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  )
}
