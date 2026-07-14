import { createClient } from '@/utils/supabase/server'
import { DEFAULT_FALLBACKS } from '@/utils/cms-data'
import HomepageEditorClient from './homepage-editor-client'

export const dynamic = 'force-dynamic'

export default async function AdminHomepagePage() {
  const supabase = await createClient()

  // Fetch homepage data from site_sections
  const { data: sectionRow } = await supabase
    .from('site_sections')
    .select('content')
    .eq('key', 'homepage_data')
    .single()

  const dbContent = sectionRow?.content || {}
  const fallback = DEFAULT_FALLBACKS.homepage_data || {}
  
  // Merge with fallback data safely
  const mergedData = { ...fallback, ...dbContent }
  
  // Ensure array lists are merged properly
  for (const key of Object.keys(fallback)) {
    if (Array.isArray(dbContent[key]) && dbContent[key].length === 0 && Array.isArray(fallback[key]) && fallback[key].length > 0) {
      mergedData[key] = fallback[key]
    }
  }

  return (
    <HomepageEditorClient
      initialData={mergedData}
    />
  )
}
