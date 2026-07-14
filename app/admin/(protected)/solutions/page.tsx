import { createClient } from '@/utils/supabase/server'
import { DEFAULT_FALLBACKS } from '@/utils/cms-data'
import SolutionsManagerClient from './solutions-manager-client'

export const dynamic = 'force-dynamic'

export default async function AdminSolutionsPage() {
  const supabase = await createClient()

  // Fetch solutions list from site_sections
  const { data: listRow } = await supabase
    .from('site_sections')
    .select('content')
    .eq('key', 'solutions_list')
    .single()

  const solutionsList = listRow?.content ?? DEFAULT_FALLBACKS.solutions_list ?? []

  return (
    <SolutionsManagerClient
      initialSolutions={Array.isArray(solutionsList) ? solutionsList : []}
    />
  )
}
