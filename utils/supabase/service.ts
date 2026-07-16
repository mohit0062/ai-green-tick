import { createClient } from '@supabase/supabase-js'

/**
 * Server-only Supabase client using the service_role key. This BYPASSES RLS,
 * so it must ONLY be used in trusted server code AFTER an authorization check
 * (e.g. requireAdmin / route auth guard). Never import into client components.
 */
export function createServiceClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.SUPABASE_SERVICE_KEY ||
    process.env.SUPABASE_SERVICE_ROLE

  if (!url || !key) {
    throw new Error('Supabase service role credentials are not configured.')
  }

  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
}
