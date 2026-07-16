import { createClient } from '@/utils/supabase/server'
import { DEFAULT_FALLBACKS } from '@/utils/cms-data'
import IntegrationsCmsClient from './integrations-cms-client'

export const dynamic = 'force-dynamic'

export default async function IntegrationsCmsPage() {
  const supabase = await createClient()

  const { data: row } = await supabase
    .from('site_sections')
    .select('content')
    .eq('key', 'integrations_page')
    .single()

  const fallback = DEFAULT_FALLBACKS.integrations_page

  // Merge database content with default fallbacks
  let integrationsData = {
    ...fallback,
  }

  if (row?.content) {
    integrationsData = {
      ...fallback,
      ...row.content,
      hero: {
        ...fallback.hero,
        ...(row.content.hero || {}),
      },
      customCta: {
        ...fallback.customCta,
        ...(row.content.customCta || {}),
      },
      integrationsList: (row.content.integrationsList && row.content.integrationsList.length > 0)
        ? row.content.integrationsList
        : fallback.integrationsList,
    }
  }

  return <IntegrationsCmsClient initialData={integrationsData} />
}
