import type { Metadata } from 'next'
import { getSiteSection } from '@/utils/cms'
import { DEFAULT_FALLBACKS } from '@/utils/cms-data'
import { getSiteUrl } from '@/utils/site'
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
  const base = String(seo?.canonicalBase || getSiteUrl()).replace(/\/+$/, '')
  const canonicalUrl = `${base}/${slug}`

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    ...(integrationsData.noindex ? { robots: { index: false, follow: false } } : {}),
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
    faqs: (row?.faqs && row.faqs.length > 0)
      ? row.faqs
      : fallback.faqs,
    aiSnapshot: row?.aiSnapshot || fallback.aiSnapshot,
  }

  // AEO FAQ JSON-LD Schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": (integrationsData.faqs || []).map((f: any) => ({
      "@type": "Question",
      "name": f.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": f.answer,
      },
    })),
  }

  // AGO Software Application Schemas
  const applicationSchemas = (integrationsData.integrationsList || []).map((item: any) => ({
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": `${item.name} WhatsApp Integration`,
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "All",
    "description": item.description,
    "author": {
      "@type": "Organization",
      "name": "AI Greentick",
    },
  }))

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {applicationSchemas.map((schema: any, idx: number) => (
        <script
          key={idx}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <IntegrationsClient initialData={integrationsData} />
    </>
  )
}
