import type { Metadata } from 'next'
import { getSiteSection } from '@/utils/cms'
import IntegrationsClient from './integrations-client'

export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSiteSection<any>('seo')
  const title = 'App Integrations'
  const description = `Connect AI Greentick with HubSpot, Shopify, WooCommerce, Salesforce, Razorpay, Stripe, Zapier, and over 2000+ web applications.`
  return {
    title,
    description,
    alternates: {
      canonical: 'https://ai-green-tick-theta.vercel.app/integrations',
    },
    openGraph: {
      title,
      description,
      url: 'https://ai-green-tick-theta.vercel.app/integrations',
      type: 'website',
      images: [
        {
          url: seo.ogImage || '/og-image.png',
          width: 1200,
          height: 630,
          alt: 'AI Greentick Integrations',
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [seo.ogImage || '/og-image.png'],
    }
  }
}

export default function IntegrationsPage() {
  return <IntegrationsClient />
}
