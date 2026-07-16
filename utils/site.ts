/**
 * Canonical site origin used for metadata, sitemap, robots, and structured data.
 *
 * Configure per environment via NEXT_PUBLIC_SITE_URL. Falls back to the primary
 * marketing domain so canonical signals stay consistent across metadata,
 * robots.txt, sitemap.xml, and JSON-LD.
 */
export function getSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL || 'https://aigreentick.com'
  return raw.replace(/\/+$/, '')
}

/** Builds an absolute URL from a path against the canonical site origin. */
export function absoluteUrl(path = ''): string {
  const base = getSiteUrl()
  if (!path) return base
  return `${base}${path.startsWith('/') ? '' : '/'}${path}`
}
