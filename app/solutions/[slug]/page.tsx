import { getSiteSection } from '@/utils/cms'
import SolutionDetailClient from './solution-detail-client'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  
  const solutions = await getSiteSection<any[]>('solutions_list')
  const solution = solutions.find((s: any) => s.id === slug)
  
  if (!solution) return {}

  const title = solution.seoTitle || `${solution.title} | AI Greentick`
  const description = solution.seoDescription || solution.shortDesc || solution.description || ''
  const keywords = solution.seoKeywords || ''

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: `/solutions/${slug}`,
    },
    openGraph: {
      title,
      description,
      type: 'article',
      url: `/solutions/${slug}`,
      images: solution.ogImage ? [
        {
          url: solution.ogImage,
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
      images: solution.ogImage ? [solution.ogImage] : [],
    }
  }
}

export default async function SolutionDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  
  const solutions = await getSiteSection<any[]>('solutions_list')
  const solution = solutions.find((s: any) => s.id === slug)

  if (!solution) {
    notFound()
  }

  return <SolutionDetailClient slug={slug} solution={solution} />
}
