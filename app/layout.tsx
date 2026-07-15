import type { Metadata } from 'next'
import { Geist_Mono, Orbitron, Inter, Manrope } from 'next/font/google'
import './globals.css'
import DemoModalProvider from '@/components/shadcn-studio/blocks/demo-modal-provider'

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

export const metadata: Metadata = {
  title: {
    default: 'AI Greentick | WhatsApp Marketing & Automation Platform',
    template: '%s | AI Greentick'
  },
  description: 'Enterprise-grade WhatsApp Business API platform. Automated campaigns, team inboxes, and AI chatbots.',
  metadataBase: new URL('https://ai-green-tick-theta.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'AI Greentick | WhatsApp Marketing & Automation Platform',
    description: 'Enterprise-grade WhatsApp Business API platform. Automated campaigns, team inboxes, and AI chatbots.',
    url: 'https://ai-green-tick-theta.vercel.app',
    siteName: 'AI Greentick',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'AI Greentick',
      }
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Greentick | WhatsApp Marketing & Automation Platform',
    description: 'Enterprise-grade WhatsApp Business API platform. Automated campaigns, team inboxes, and AI chatbots.',
    images: ['/og-image.png'],
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' className={`${inter.variable} ${manrope.variable} ${geistMono.variable} ${orbitron.variable} antialiased`}>
      <body className="overflow-x-hidden w-full relative">
        <div className="w-full relative flex flex-col min-h-screen">
          {children}
        </div>
        <DemoModalProvider />
      </body>
    </html>
  )
}

