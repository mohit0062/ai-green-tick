import { createClient } from '@/utils/supabase/server'
import { DEFAULT_FALLBACKS } from '@/utils/cms-data'
import CareersCmsClient from './careers-cms-client'

export const dynamic = 'force-dynamic'

export default async function CareersCmsPage() {
  const supabase = await createClient()

  const { data: row } = await supabase
    .from('site_sections')
    .select('content')
    .eq('key', 'careers_page')
    .single()

  const fallback = DEFAULT_FALLBACKS.careers_page

  // Merge database content with default fallbacks
  let careersData = {
    ...fallback,
  }

  if (row?.content) {
    careersData = {
      ...fallback,
      ...row.content,
      hero: {
        ...fallback.hero,
        ...(row.content.hero || {}),
      },
      fitSignals: (row.content.fitSignals && row.content.fitSignals.length > 0)
        ? row.content.fitSignals
        : fallback.fitSignals,
      benefits: (row.content.benefits && row.content.benefits.length > 0)
        ? row.content.benefits
        : fallback.benefits,
      hiringSteps: (row.content.hiringSteps && row.content.hiringSteps.length > 0)
        ? row.content.hiringSteps
        : fallback.hiringSteps,
      heroStats: (row.content.heroStats && row.content.heroStats.length > 0)
        ? row.content.heroStats
        : fallback.heroStats,
    }
  }

  return <CareersCmsClient initialData={careersData} />
}
