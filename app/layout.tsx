import type { Metadata } from 'next'
import { Geist_Mono, Orbitron, Inter, Manrope } from 'next/font/google'
import './globals.css'
import DemoModalProvider from '@/components/shadcn-studio/blocks/demo-modal-provider'
import { getSiteSection } from '@/utils/cms'
import { getSiteUrl } from '@/utils/site'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
})

const manrope = Manrope({
  variable: '--font-manrope',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

const orbitron = Orbitron({
  variable: '--font-orbitron',
  subsets: ['latin'],
  weight: ['900'],
})

export async function generateMetadata(): Promise<Metadata> {
  let seo: any = {}
  try {
    seo = await getSiteSection<any>('seo')
  } catch {
    // Fall back to defaults below.
  }

  const base = String(seo?.canonicalBase || getSiteUrl()).replace(/\/+$/, '')
  const siteName = seo?.ogSiteName || seo?.siteTitle || 'AI Greentick'
  const defaultTitle = `${seo?.siteTitle || 'AI Greentick'} | WhatsApp Marketing & Automation Platform`
  const template = seo?.titleTemplate || '%s | AI Greentick'
  const description =
    seo?.defaultDescription ||
    'Enterprise-grade WhatsApp Business API platform. Automated campaigns, team inboxes, and AI chatbots.'
  const ogImage = seo?.ogImage || '/og-image.png'

  // Parse an "index, follow" / "noindex, nofollow" style directive from the CMS.
  const robotsDirective = String(seo?.robots || 'index, follow').toLowerCase()
  const robots = {
    index: !robotsDirective.includes('noindex'),
    follow: !robotsDirective.includes('nofollow'),
  }

  // Map CMS "additional meta tags" into real <meta> output. A google-site-verification
  // entry is promoted to Next's verification field; everything else (e.g. Bing's
  // msvalidate.01) is emitted as a generic meta tag.
  const other: Record<string, string> = {}
  let googleVerification: string | undefined
  if (Array.isArray(seo?.additionalMetaTags)) {
    for (const tag of seo.additionalMetaTags) {
      const name = String(tag?.name || '').trim()
      const content = String(tag?.content || '').trim()
      if (!name || !content) continue
      if (name.toLowerCase() === 'google-site-verification') {
        googleVerification = content
      } else {
        other[name] = content
      }
    }
  }

  return {
    title: { default: defaultTitle, template },
    description,
    keywords: seo?.keywords || undefined,
    metadataBase: new URL(base),
    applicationName: siteName,
    alternates: { canonical: '/' },
    robots,
    openGraph: {
      title: defaultTitle,
      description,
      url: base,
      siteName,
      images: [{ url: ogImage, width: 1200, height: 630, alt: siteName }],
      locale: 'en_IN',
      type: (seo?.ogType as 'website') || 'website',
    },
    twitter: {
      card: (seo?.twitterCard as 'summary_large_image') || 'summary_large_image',
      title: defaultTitle,
      description,
      images: [ogImage],
    },
    ...(googleVerification ? { verification: { google: googleVerification } } : {}),
    ...(Object.keys(other).length ? { other } : {}),
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' className={`${inter.variable} ${manrope.variable} ${geistMono.variable} ${orbitron.variable} antialiased`}>
      <body className="overflow-x-clip w-full relative">
        <div className="w-full relative flex flex-col min-h-screen">
          {children}
        </div>
        <DemoModalProvider />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}

