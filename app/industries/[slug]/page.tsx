import { getSiteSection } from '@/utils/cms'
import IndustryDetailClient from './industry-detail-client'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'

export const dynamic = 'force-dynamic'

// Dynamically generate Meta Tags for SEO/OpenGraph/Twitter
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  
  const industries = await getSiteSection<any[]>('industry_list')
  const industry = industries.find((i: any) => i.id === slug)
  
  if (!industry) return {}

  const title = industry.seoTitle || `${industry.title} | AI Greentick`
  const description = industry.seoDescription || industry.desc || ''
  const keywords = industry.seoKeywords || ''

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: `/industries/${slug}`,
    },
    openGraph: {
      title,
      description,
      type: 'article',
      url: `/industries/${slug}`,
      images: industry.ogImage ? [
        {
          url: industry.ogImage,
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
      images: industry.ogImage ? [industry.ogImage] : [],
    }
  }
}

export default async function IndustryDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  
  const industries = await getSiteSection<any[]>('industry_list')
  const industry = industries.find((i: any) => i.id === slug)

  if (!industry) {
    notFound()
  }

  return <IndustryDetailClient slug={slug} industry={industry} />
}

