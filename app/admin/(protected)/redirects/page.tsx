import { getSiteSection } from '@/utils/cms'
import RedirectsClient, { type RedirectRule } from './redirects-client'

export const dynamic = 'force-dynamic'

export default async function RedirectsCmsPage() {
  const rules = await getSiteSection<RedirectRule[]>('redirects')

  return <RedirectsClient initialRules={Array.isArray(rules) ? rules : []} />
}
