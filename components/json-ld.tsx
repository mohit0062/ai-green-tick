import React from 'react'

export function JsonLd({ data }: { data: Record<string, any> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

/**
 * Emits BreadcrumbList structured data. Helps Google render breadcrumb rich
 * results and gives AI answer engines the page's position in the site hierarchy.
 */
export function BreadcrumbSchema({ items }: { items: { name: string; url: string }[] }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
  return <JsonLd data={data} />
}

interface ServicePageSchemaProps {
  data: any
  serviceName: string
  fallbackDescription: string
}

export function ServicePageSchema({ data, serviceName, fallbackDescription }: ServicePageSchemaProps) {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": data?.hero?.subtitleText || serviceName,
    "description": data?.hero?.description || fallbackDescription,
    "provider": {
      "@type": "Organization",
      "name": "AI Greentick",
      "url": "https://ai-green-tick-theta.vercel.app"
    }
  }

  const faqItems = data?.faqItems || []
  const faqSchema = faqItems.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqItems.map((item: any) => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  } : null

  return (
    <>
      <JsonLd data={serviceSchema} />
      {faqSchema && <JsonLd data={faqSchema} />}
    </>
  )
}
