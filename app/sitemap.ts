import type { MetadataRoute } from 'next'
import { getSiteSection } from '@/utils/cms'
import { getSiteUrl } from '@/utils/site'
import { createClient } from '@/utils/supabase/server'

export const dynamic = 'force-dynamic'

// CMS collections that back the dynamic [slug] routes.
const COLLECTIONS: { key: string; prefix: string }[] = [
  { key: 'industry_features', prefix: '/features' },
  { key: 'solutions_list', prefix: '/solutions' },
  { key: 'industry_list', prefix: '/industries' },
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Prefer the CMS canonical base so admins control the domain; fall back to env/default.
  let base = getSiteUrl()
  try {
    const seo = await getSiteSection<any>('seo')
    if (seo?.canonicalBase) base = String(seo.canonicalBase).replace(/\/+$/, '')
  } catch {
    // Keep default base.
  }

  const now = new Date()

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: now, changeFrequency: 'daily', priority: 1 },
    { url: `${base}/pricing`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/features`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${base}/solutions`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${base}/industries`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${base}/blog`, lastModified: now, changeFrequency: 'daily', priority: 0.8 },
    { url: `${base}/integrations`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${base}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/contact`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/careers`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
  ]

  const dynamicRoutes: MetadataRoute.Sitemap = []

  // CMS-driven feature / solution / industry detail pages.
  for (const { key, prefix } of COLLECTIONS) {
    try {
      const items = await getSiteSection<any[]>(key)
      if (Array.isArray(items)) {
        for (const item of items) {
          if (item?.id) {
            dynamicRoutes.push({
              url: `${base}${prefix}/${item.id}`,
              lastModified: now,
              changeFrequency: 'monthly',
              priority: 0.7,
            })
          }
        }
      }
    } catch {
      // Skip this collection on error.
    }
  }

  // Published blog posts from Supabase.
  try {
    const supabase = await createClient()
    const { data: posts } = await supabase
      .from('blogs')
      .select('slug, created_at, status')
      .eq('status', 'published')

    if (Array.isArray(posts)) {
      for (const post of posts) {
        if (post?.slug) {
          dynamicRoutes.push({
            url: `${base}/blog/${post.slug}`,
            lastModified: post.created_at ? new Date(post.created_at) : now,
            changeFrequency: 'weekly',
            priority: 0.6,
          })
        }
      }
    }
  } catch {
    // Skip blog routes on error.
  }

  return [...staticRoutes, ...dynamicRoutes]
}
