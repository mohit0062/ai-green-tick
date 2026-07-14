import { createClient } from '@/utils/supabase/server'
import { DEFAULT_FALLBACKS } from '@/utils/cms-data'
import CommonSectionsClient from './common-sections-client'

export const dynamic = 'force-dynamic'

export default async function CommonSectionsPage() {
  const supabase = await createClient()

  // Fetch sections navbar, footer, cta, seo, features dropdown, industry teams & solutions & logo cloud
  const { data: sections } = await supabase
    .from('site_sections')
    .select('key, content')
    .in('key', ['navbar', 'footer', 'cta', 'seo', 'industry_features', 'industry_teams', 'industry_list', 'logo_cloud'])

  const mergeWithDefaults = (dbContent: any, fallbackKey: string) => {
    const fallback = DEFAULT_FALLBACKS[fallbackKey] || {}
    if (!dbContent) return fallback
    const merged = { ...fallback, ...dbContent }
    // Restore default arrays if DB saved empty arrays
    for (const key of Object.keys(fallback)) {
      if (Array.isArray(dbContent[key]) && dbContent[key].length === 0 && Array.isArray(fallback[key]) && fallback[key].length > 0) {
        merged[key] = fallback[key]
      }
    }
    return merged
  }

  const navbarData = mergeWithDefaults(sections?.find(s => s.key === 'navbar')?.content, 'navbar')
  const footerData = mergeWithDefaults(sections?.find(s => s.key === 'footer')?.content, 'footer')
  const ctaData = mergeWithDefaults(sections?.find(s => s.key === 'cta')?.content, 'cta')
  const seoData = mergeWithDefaults(sections?.find(s => s.key === 'seo')?.content, 'seo')
  const featuresData = sections?.find(s => s.key === 'industry_features')?.content || DEFAULT_FALLBACKS.industry_features
  const teamsData = sections?.find(s => s.key === 'industry_teams')?.content || DEFAULT_FALLBACKS.industry_teams
  const solutionsData = sections?.find(s => s.key === 'industry_list')?.content || DEFAULT_FALLBACKS.industry_list
  const logoCloudData = mergeWithDefaults(sections?.find(s => s.key === 'logo_cloud')?.content, 'logo_cloud')

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12 font-sans text-black">
      <div className="border-b border-[#C5C4C2]/50 pb-5">
        <h2 className="text-2xl font-bold tracking-tight text-neutral-800 font-display">Common Sections CMS</h2>
        <p className="text-neutral-500 text-xs">
          Manage parts of your website that appear globally across all pages (Navbar, Footer, CTA, SEO, and Logo Cloud).
        </p>
      </div>

      <CommonSectionsClient 
        initialNavbar={navbarData}
        initialFooter={footerData}
        initialCta={ctaData}
        initialSeo={seoData}
        initialFeatures={featuresData}
        initialTeams={teamsData}
        initialSolutions={solutionsData}
        initialLogoCloud={logoCloudData}
      />
    </div>
  )
}
