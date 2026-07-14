import { createClient } from '@/utils/supabase/server'
import { DEFAULT_FALLBACKS } from '@/utils/cms-data'
import FeaturesManagerClient from './features-manager-client'

export const revalidate = 0

export default async function AdminFeaturesPage() {
  const supabase = await createClient()

  // Fetch features list from site_sections
  const { data: listRow } = await supabase
    .from('site_sections')
    .select('content')
    .eq('key', 'industry_features')
    .single()

  const featuresList = listRow?.content ?? DEFAULT_FALLBACKS.industry_features ?? []

  return (
    <FeaturesManagerClient
      initialFeatures={Array.isArray(featuresList) ? featuresList : []}
    />
  )
}
