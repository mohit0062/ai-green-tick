import type { Metadata } from 'next'
import { getSiteSection } from '@/utils/cms'
import { DEFAULT_FALLBACKS } from '@/utils/cms-data'
import IntegrationsClient from './integrations-client'

export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSiteSection<any>('seo')
  const row = await getSiteSection<any>('integrations_page')
  const fallback = DEFAULT_FALLBACKS.integrations_page

  const integrationsData = {
    ...fallback,
    ...(row || {}),
  }

  const title = integrationsData.seoTitle || 'App Integrations — Connect AI Greentick'
  const description = integrationsData.seoDesc || `Connect AI Greentick with HubSpot, Shopify, WooCommerce, Salesforce, Razorpay, Stripe, Zapier, and over 2000+ web applications.`
  const slug = integrationsData.seoUrl?.replace('aigreentick.com/', '') || 'integrations'
  const canonicalUrl = `https://ai-green-tick-theta.vercel.app/${slug}`

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: 'website',
      images: [
        {
          url: seo?.ogImage || '/og-image.png',
          width: 1200,
          height: 630,
          alt: title,
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [seo?.ogImage || '/og-image.png'],
    }
  }
}

export default async function IntegrationsPage() {
  const row = await getSiteSection<any>('integrations_page')
  const fallback = DEFAULT_FALLBACKS.integrations_page

  const integrationsData = {
    ...fallback,
    ...(row || {}),
    hero: {
      ...fallback.hero,
      ...(row?.hero || {}),
    },
    customCta: {
      ...fallback.customCta,
      ...(row?.customCta || {}),
    },
    integrationsList: (row?.integrationsList && row.integrationsList.length > 0)
      ? row.integrationsList
      : fallback.integrationsList,
  }

  return <IntegrationsClient initialData={integrationsData} />
}
