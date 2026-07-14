import { createClient } from '@/utils/supabase/server'
import { DEFAULT_FALLBACKS } from '@/utils/cms-data'
import AboutCmsClient from './about-cms-client'

export const dynamic = 'force-dynamic'

export default async function AboutCmsPage() {
  const supabase = await createClient()

  const { data: row } = await supabase
    .from('site_sections')
    .select('content')
    .eq('key', 'about_page')
    .single()

  const fallback = DEFAULT_FALLBACKS.about_page

  // Merge database content with default fallbacks
  let aboutData = {
    ...fallback,
  }

  if (row?.content) {
    aboutData = {
      ...fallback,
      ...row.content,
      missionSection: {
        ...fallback.missionSection,
        ...(row.content.missionSection || {}),
      },
      problemSection: {
        ...fallback.problemSection,
        ...(row.content.problemSection || {}),
        features: (row.content.problemSection?.features && row.content.problemSection.features.length > 0)
          ? row.content.problemSection.features
          : fallback.problemSection.features,
      },
      whySection: {
        ...fallback.whySection,
        ...(row.content.whySection || {}),
      },
      metaSection: {
        ...fallback.metaSection,
        ...(row.content.metaSection || {}),
      },
    }
  }

  return <AboutCmsClient initialData={aboutData} />
}
