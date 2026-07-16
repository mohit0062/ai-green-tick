import { getSiteSection } from '@/utils/cms'
import { getSiteUrl } from '@/utils/site'

export const dynamic = 'force-dynamic'

/**
 * Serves /llms.txt — an emerging convention (like robots.txt, but for AI answer
 * engines / LLMs) that gives crawlers a concise, structured overview of the site
 * and its most important pages. Generated from CMS content so it stays current.
 */
export async function GET() {
  const base = getSiteUrl()

  let seo: any = {}
  let homepage: any = {}
  try {
    seo = await getSiteSection<any>('seo')
  } catch {
    // ignore
  }
  try {
    homepage = await getSiteSection<any>('homepage_data')
  } catch {
    // ignore
  }

  const siteName = seo?.siteTitle || 'AI Greentick'
  const description =
    seo?.defaultDescription ||
    'Enterprise-grade WhatsApp Business API platform for automated campaigns, shared team inboxes, and AI chatbots.'
  const snapshot = (homepage?.aiSnapshot || '').trim()

  const lines: string[] = [
    `# ${siteName}`,
    '',
    `> ${description}`,
    '',
  ]

  if (snapshot) {
    lines.push(snapshot, '')
  }

  lines.push(
    '## Key Pages',
    `- [Home](${base}/): WhatsApp marketing & automation platform overview`,
    `- [Features](${base}/features): Product capabilities — shared inbox, chatbots, broadcasts, analytics`,
    `- [Solutions](${base}/solutions): Role-based solutions for marketing, sales, and support teams`,
    `- [Industries](${base}/industries): Industry-specific WhatsApp automation use cases`,
    `- [Pricing](${base}/pricing): Plans, platform fees, and Meta conversation pricing`,
    `- [Integrations](${base}/integrations): Connect CRMs, e-commerce, and payment tools`,
    `- [Blog](${base}/blog): Guides and articles on WhatsApp marketing and AI automation`,
    `- [About](${base}/about): Company story, mission, and team`,
    `- [Contact](${base}/contact): Sales and support contact information`,
    '',
    '## Resources',
    `- Sitemap: ${base}/sitemap.xml`,
    '',
  )

  return new Response(lines.join('\n'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}
