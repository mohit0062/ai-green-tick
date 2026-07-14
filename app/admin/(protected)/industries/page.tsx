import { createClient } from '@/utils/supabase/server'
import { DEFAULT_FALLBACKS } from '@/utils/cms-data'
import IndustriesPageEditor from './industries-page-editor'

export const dynamic = 'force-dynamic'

export default async function AdminIndustriesPage() {
  const supabase = await createClient()

  // Fetch page data
  const { data: pageRow } = await supabase
    .from('site_sections')
    .select('content')
    .eq('key', 'industries_page_builder')
    .single()

  // Fetch industries list
  const { data: listRow } = await supabase
    .from('site_sections')
    .select('content')
    .eq('key', 'industry_list')
    .single()

  const pageData = pageRow?.content ?? DEFAULT_FALLBACKS.industries_page_builder ?? {}
  const industryList = listRow?.content ?? DEFAULT_FALLBACKS.industry_list ?? []

  return (
    <IndustriesPageEditor
      initialData={pageData}
      initialIndustries={Array.isArray(industryList) ? industryList : []}
    />
  )
}
