import { createClient } from '@/utils/supabase/client'
import { DEFAULT_FALLBACKS } from './cms-data'

function smartMerge(fallback: Record<string, any>, dbContent: Record<string, any>): Record<string, any> {
  const merged = { ...fallback }
  for (const key of Object.keys(dbContent)) {
    const dbVal = dbContent[key]
    const fbVal = fallback[key]
    if (Array.isArray(dbVal) && dbVal.length === 0 && Array.isArray(fbVal) && fbVal.length > 0) {
      continue
    }
    merged[key] = dbVal
  }
  return merged
}

export async function getSiteSectionClient<T = any>(key: string): Promise<T> {
  const fallback = DEFAULT_FALLBACKS[key] || []
  try {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('site_sections')
      .select('content')
      .eq('key', key)
      .single()

    if (error || !data || !data.content) {
      return fallback as T
    }

    const dbContent = data.content
    if (Array.isArray(dbContent)) {
      return dbContent.length > 0 ? (dbContent as T) : (fallback as T)
    }

    return smartMerge(fallback as Record<string, any>, dbContent as Record<string, any>) as T
  } catch (err) {
    console.error(`Error client-fetching site section [${key}]:`, err)
    return fallback as T
  }
}
