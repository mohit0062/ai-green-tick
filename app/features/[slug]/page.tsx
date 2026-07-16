import { getSiteSection } from '@/utils/cms'
import FeatureDetailClient from './feature-detail-client'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'

export const dynamic = 'force-dynamic'

// Dynamically generate Meta Tags for SEO/OpenGraph/Twitter
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  
  const features = await getSiteSection<any[]>('industry_features')
  const feature = features.find((f: any) => f.id === slug)
  
  if (!feature) return {}

  const title = feature.seoTitle || `${feature.title} | AI Greentick`
  const description = feature.seoDescription || feature.shortDesc || feature.description || ''
  const keywords = feature.seoKeywords || ''

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: `/features/${slug}`,
    },
    ...(feature.noindex ? { robots: { index: false, follow: false } } : {}),
    openGraph: {
      title,
      description,
      type: 'article',
      url: `/features/${slug}`,
      images: feature.ogImage ? [
        {
          url: feature.ogImage,
          width: 1200,
          height: 630,
          alt: title,
        }
      ] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: feature.ogImage ? [feature.ogImage] : [],
    }
  }
}

export default async function FeatureDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  
  const features = await getSiteSection<any[]>('industry_features')
  const feature = features.find((f: any) => f.id === slug)

  if (!feature) {
    notFound()
  }

  return <FeatureDetailClient slug={slug} feature={feature} />
}
