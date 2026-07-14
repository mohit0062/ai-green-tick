import { getSiteSection } from '@/utils/cms'
import IndustriesClient from './industries-client'
import { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  const builder = await getSiteSection('industries_page_builder')
  const seo = builder?.seo || {}
  
  const title = seo.metaTitle || 'Solutions & Industries | AI Greentick'
  const description = seo.metaDescription || ''
  const keywords = seo.metaKeywords || ''
  
  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: '/industries',
    },
    openGraph: {
      title,
      description,
      url: '/industries',
      images: seo.ogImage ? [{ url: seo.ogImage }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: seo.ogImage ? [seo.ogImage] : [],
    }
  }
}

export default async function IndustriesPage() {
  const builder = await getSiteSection('industries_page_builder')
  const activeIndustries = await getSiteSection('industry_list')
  return (
    <IndustriesClient 
      pageBuilderData={builder} 
      activeIndustries={activeIndustries} 
    />
  )
}

