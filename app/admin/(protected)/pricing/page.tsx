import { createClient } from '@/utils/supabase/server'
import { DEFAULT_FALLBACKS } from '@/utils/cms-data'
import PricingEditorClient from './pricing-editor-client'

export const dynamic = 'force-dynamic'

export default async function AdminPricingPage() {
  const supabase = await createClient()

  // Fetch pricing data from site_sections
  const { data: sectionRow } = await supabase
    .from('site_sections')
    .select('content')
    .eq('key', 'pricing_data')
    .single()

  const dbContent = sectionRow?.content || {}
  const fallback = DEFAULT_FALLBACKS.pricing_data || {}
  
  // Merge with fallback data safely
  const mergedData = { ...fallback, ...dbContent }
  
  // Merge plans safely
  if (dbContent.plans) {
    mergedData.plans = {
      ...fallback.plans,
      ...dbContent.plans
    }
  }

  return (
    <PricingEditorClient
      initialData={mergedData}
    />
  )
}
