import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export interface RedirectRule {
  source: string
  destination: string
  permanent: boolean
}

/**
 * Fetches the `redirects` row from the public site_sections table using the
 * Supabase REST endpoint + anon key. Runs at the edge with Next fetch caching
 * so we avoid a DB round-trip on every request (revalidated every 60s).
 */
async function getRedirectRules(): Promise<RedirectRule[]> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !anonKey) return []

  try {
    const res = await fetch(
      `${url}/rest/v1/site_sections?key=eq.redirects&select=content`,
      {
        headers: {
          apikey: anonKey,
          Authorization: `Bearer ${anonKey}`,
          Accept: 'application/json',
        },
        next: { revalidate: 60 },
      }
    )

    if (!res.ok) return []

    const rows = (await res.json()) as Array<{ content: unknown }>
    const content = rows?.[0]?.content
    if (!Array.isArray(content)) return []

    return content
      .filter(
        (r): r is RedirectRule =>
          !!r &&
          typeof (r as RedirectRule).source === 'string' &&
          typeof (r as RedirectRule).destination === 'string'
      )
      .map((r) => ({
        source: r.source,
        destination: r.destination,
        permanent: !!r.permanent,
      }))
  } catch {
    return []
  }
}

// Paths that must never be redirected by CMS rules.
function isExcludedPath(pathname: string): boolean {
  return (
    pathname.startsWith('/admin') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/static') ||
    pathname === '/favicon.ico'
  )
}

/**
 * Returns a redirect response if the incoming request matches a CMS redirect
 * rule, otherwise null. Guards against redirect loops and excluded paths.
 */
export async function handleCmsRedirect(
  request: NextRequest
): Promise<NextResponse | null> {
  const pathname = request.nextUrl.pathname

  if (isExcludedPath(pathname)) return null

  const rules = await getRedirectRules()
  if (rules.length === 0) return null

  // Normalize trailing slash for matching (treat "/x/" same as "/x").
  const normalize = (p: string) =>
    p.length > 1 && p.endsWith('/') ? p.slice(0, -1) : p
  const currentPath = normalize(pathname)

  for (const rule of rules) {
    if (!rule.source || !rule.destination) continue
    if (rule.source === rule.destination) continue // loop guard

    const source = normalize(rule.source)
    if (source !== currentPath) continue

    // Avoid redirecting to the same path we are already on (loop guard).
    if (rule.destination === pathname || normalize(rule.destination) === currentPath) {
      continue
    }

    const status = rule.permanent ? 308 : 307

    // Full URL destination -> redirect as-is; otherwise resolve against origin.
    const isAbsolute = /^https?:\/\//i.test(rule.destination)
    const target = isAbsolute
      ? rule.destination
      : new URL(rule.destination, request.nextUrl.origin).toString()

    return NextResponse.redirect(target, status)
  }

  return null
}
