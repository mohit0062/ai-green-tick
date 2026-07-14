'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

type IntegrationLogo = {
  name: string
  icon: React.ReactNode
  bgColor: string
  iconColor: string
}

const integrationsList: IntegrationLogo[] = [
  {
    name: 'Shopify',
    bgColor: 'bg-[#95bf47]/10',
    iconColor: 'text-[#95bf47]',
    icon: (
      <svg className="size-10" viewBox="0 0 109 124" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M95.2 23.7c-.1-.7-.7-1.1-1.2-1.1s-10.1-.2-10.1-.2-8-7.8-8.9-8.6c-.8-.8-2.4-.6-3-.4l-4.1 1.3c-.5-1.4-1.2-3.1-2.2-4.8-3.2-6.1-7.9-9.3-13.6-9.3-.4 0-.8 0-1.2.1-.2-.2-.4-.4-.6-.6-2.6-2.8-5.9-4.1-9.9-4-7.7.2-15.4 5.8-21.6 15.7-4.4 7-7.7 15.8-8.7 22.6L10 38c-3.8 1.2-3.9 1.2-4.4 4.8L0 84.5 64.3 97 95 90.6c0-.1.2-66.2.2-66.9zM67.2 15.8c-1.1 3.4-2.9 6.8-5.1 10.7-1.1-.4-2.2-.7-3.4-.7-3.8-.2-7.2 2.1-10 6.4.3-.7.5-1.4.8-2.2 2.6-7.2 7.7-10.9 13.6-10.9 1.5 0 3 .3 4.1.7zm-12 16.9c-2.3 3.2-4.6 6.5-6.8 9.7l-7.2-2.2c1.2-5.4 4.7-11.4 9.4-14.8 1.6-1.2 3.3-2 5.1-2.2.1 0 .2 0 .3-.1.5 2 .4 4.2-.8 9.6zm-9.1-15c.5 0 1 .1 1.5.2-4.7 2.4-9.2 7.5-11.6 14.8-.3 1-.6 2-.8 2.9l-5.5-1.7c1.8-8.9 8.9-16 16.4-16.2zm-5.4 38.6c.2-2.9 1.8-5.1 4.4-5.3.8-.1 1.5.1 2.1.5l-2.1 18.7c-2.4-1.2-4.6-4.6-4.4-13.9zm19.1 15l3.7-33.9c0-.3.1-.7.1-1l.6-.2c1.9-7.3 1.6-13.7.1-18.1-.1-.4-.3-.8-.4-1.2 1.3.6 2.6 1.4 3.7 2.5 3.1 3.1 4.6 7.9 4.4 14.2 0 .2 0 .4-.1.6l-5.1 1.6v1.5c-.7.2-1.5.3-2.2.3-1.2 0-2.4-.2-3.5-.6L66 54.5h-.1l-5 .5-2.6 23.3c-3 .8-6.1 1.4-9.5 1.4v-.4zm10.7 1.2l2.5-22.2 1.5-.2-2.3 20.6c-.5.6-1.1 1.2-1.7 1.8zm8.5-2.4l2.8-24.7 3.1.9c0 .7-.1 1.4-.2 2.1l-2.5 22.7c-1.1-.2-2.2-.6-3.2-1zm11.3-7.5c-1.8.5-3.6.9-5.4 1.2l2.5-22.3 1-.3c1.6-.5 3.3-1.1 4.7-2L92 43.9l-1 17.7zm5.1-22.7l.3-5.6c0-.2 0-.3.1-.5 1.8 3.3 2.5 8.3.8 14l-.8.2-.4-8.1z"/>
      </svg>
    )
  },
  {
    name: 'WooCommerce',
    bgColor: 'bg-[#96588a]/10',
    iconColor: 'text-[#96588a]',
    icon: (
      <svg className="size-10" viewBox="0 0 100 60" fill="currentColor">
        <path d="M10 0h80c5.5 0 10 4.5 10 10v40c0 5.5-4.5 10-10 10H10C4.5 60 0 55.5 0 50V10C0 4.5 4.5 0 10 0z"/>
        <path fill="white" d="M7 10.5c.8-1.1 2-1.7 3.4-1.6 1.9.1 3 1.2 3.2 3.2.5 3.8 1 7.1 1.7 9.9l3.6-6.9c.3-.6.7-.9 1.2-.9.7 0 1.1.4 1.3 1.2.6 3.1 1.5 5.9 2.5 8.4.7-6.6 1.7-11.5 3.1-14.4.3-.7.9-1.1 1.5-1.1.6 0 1.1.2 1.5.5.4.4.6.8.6 1.3 0 .4-.1.7-.2 1-.9 1.6-1.7 4.6-2.4 9.1-.7 4.4-1 7.8-1 10.3 0 .7-.1 1.2-.4 1.5-.4.4-.8.6-1.3.6-.6 0-1.2-.3-1.7-.8-2.7-2.8-4.8-7-6.4-12.5l-5 9.4c-.5 1-1.1 1.5-1.7 1.5-.5 0-1-.4-1.4-1.1-1.3-2.3-2.3-5.9-3.2-10.7-.3-1.6-.7-3.7-1.3-6.2-.2-.8-.2-1.4.3-2.2z"/>
        <path fill="white" d="M73.8 12.7c-1.5-1.8-3.5-2.8-6.2-2.8-3.4 0-6.2 1.3-8.4 4-1.9 2.3-2.9 4.9-2.9 7.8 0 2.5.8 4.5 2.3 6.1 1.5 1.6 3.6 2.5 6.1 2.5 3.4 0 6.2-1.3 8.5-4 2.1-2.5 3.1-5.1 3.1-8 0-2.5-.8-4.5-2.5-5.6zm-4.1 10.6c-1 1.5-2.3 2.3-3.8 2.3-.9 0-1.7-.4-2.3-1.2-.7-.8-1-1.8-1-3 0-1.7.5-3.2 1.5-4.7 1-1.5 2.3-2.3 3.8-2.3.9 0 1.7.4 2.3 1.2.7.8 1 1.8 1 3.1 0 1.7-.5 3.2-1.5 4.6z"/>
        <path fill="white" d="M89.8 12.7c-1.5-1.8-3.5-2.8-6.2-2.8-3.4 0-6.2 1.3-8.4 4-1.9 2.3-2.9 4.9-2.9 7.8 0 2.5.8 4.5 2.3 6.1 1.5 1.6 3.6 2.5 6.1 2.5 3.4 0 6.2-1.3 8.5-4 2.1-2.5 3.1-5.1 3.1-8 0-2.5-.8-4.5-2.5-5.6zm-4.1 10.6c-1 1.5-2.3 2.3-3.8 2.3-.9 0-1.7-.4-2.3-1.2-.7-.8-1-1.8-1-3 0-1.7.5-3.2 1.5-4.7 1-1.5 2.3-2.3 3.8-2.3.9 0 1.7.4 2.3 1.2.7.8 1 1.8 1 3.1 0 1.7-.5 3.2-1.5 4.6z"/>
        <path fill="white" d="M33 44.4c-1.5 0-2.7-.5-3.7-1.4-1.1-1-1.6-2.2-1.6-3.7 0-1.5.6-2.8 1.7-3.7 1.1-.9 2.4-1.4 3.9-1.4 1.5 0 2.8.5 3.8 1.5 1 1 1.5 2.2 1.5 3.7s-.5 2.7-1.6 3.7c-1 .9-2.3 1.3-4 1.3z"/>
        <path fill="white" d="M51 44.4c-1.5 0-2.7-.5-3.7-1.4-1.1-1-1.6-2.2-1.6-3.7 0-1.5.6-2.8 1.7-3.7 1.1-.9 2.4-1.4 3.9-1.4 1.5 0 2.8.5 3.8 1.5 1 1 1.5 2.2 1.5 3.7s-.5 2.7-1.6 3.7c-1 .9-2.3 1.3-4 1.3z"/>
      </svg>
    )
  },
  {
    name: 'HubSpot',
    bgColor: 'bg-[#ff7a59]/10',
    iconColor: 'text-[#ff7a59]',
    icon: (
      <svg className="size-10" viewBox="0 0 24 24" fill="currentColor">
        <path d="M22.2 10.6c-.9-1.9-2.6-3.4-4.7-4v-2c0-1.1-.9-2-2-2h-.5v-.2c0-.8-.7-1.5-1.5-1.5h-3.1c-.8 0-1.5.7-1.5 1.5v.2h-.5c-1.1 0-2 .9-2 2v2.5c-2.2.9-3.8 3-3.8 5.5 0 3.3 2.7 6 6 6 .9 0 1.7-.2 2.5-.6l3.1 1.5.4-3.4c2.5-.7 4.5-2.8 4.8-5.4h.1c.2 0 .3-.1.3-.3v-1.3c0-.4-.2-.7-.6-.5zM10.4 3.9c0-.6.5-1.1 1.1-1.1h1.5c.6 0 1.1.5 1.1 1.1v.2h-3.7v-.2zm4.1 12c-.8.5-1.7.7-2.7.7-2.8 0-5.1-2.3-5.1-5.1 0-2 1.2-3.8 2.9-4.7v2.8h4.9v-2.5c.5.2 1 .5 1.4.9v1.3c0 .2.1.3.3.3h.1c-.3 2.6-2.5 4.6-5.1 4.7-.1 0-.1 0-.2 0-.2 0-.3.1-.3.3v.1c0 .2.1.3.3.3.1 0 .1 0 .2 0 2.9-.1 5.3-2.1 5.8-4.9.1.1.1.3.1.4v1.7c-.1 1.5-.8 2.8-2 3.7z"/>
        <circle cx="8" cy="16" r="2.5"/>
      </svg>
    )
  },
  {
    name: 'Salesforce',
    bgColor: 'bg-[#00a1e0]/10',
    iconColor: 'text-[#00a1e0]',
    icon: (
      <svg className="size-10" viewBox="0 0 101 70" fill="currentColor">
        <path d="M41.9 10c3.5-3.6 8.4-5.8 13.8-5.8 7 0 13.2 3.9 16.5 9.7 2.8-1.3 5.9-2 9.2-2 12.3 0 22.3 10.1 22.3 22.5 0 12.5-10 22.6-22.3 22.6H25.3C13 57 3 47.7 3 36.1 3 26.5 9.2 18.3 18 15.4c-.4-1.3-.6-2.6-.6-4C17.4 5 22.5.1 28.8.1c5.7 0 10.5 3.9 11.9 9.1-.2.3-.5.6-.8.8z"/>
      </svg>
    )
  },
  {
    name: 'Zoho',
    bgColor: 'bg-[#e21c23]/10',
    iconColor: 'text-[#e21c23]',
    icon: (
      <svg className="size-10" viewBox="0 0 100 40" fill="currentColor">
        <path d="M0 36.4L14.4 3.7h7.7L7.7 36.4H0zm16.2 0L23 21.3l-6.8-17.6h7.7l3.1 9.7 7-9.7h8.5L27.7 21.1l7 15.3h-8.3l-3.6-9.5-6.9 9.5h-7.7zm37.3-33c7.8 0 14.2 6.3 14.2 14.1 0 7.8-6.4 14.1-14.2 14.1-7.8 0-14.2-6.3-14.2-14.1 0-7.8 6.4-14.1 14.2-14.1zm0 7.2c-3.8 0-6.9 3.1-6.9 6.9s3.1 6.9 6.9 6.9 6.9-3.1 6.9-6.9-3.1-6.9-6.9-6.9zm25.3-6.9v13.2L93 3.7h7.1v32.7H93V23.2L78.8 36.4h-7.1V3.7h7.1z"/>
      </svg>
    )
  },
  {
    name: 'Razorpay',
    bgColor: 'bg-[#0b72e7]/10',
    iconColor: 'text-[#0b72e7]',
    icon: (
      <svg className="size-10" viewBox="0 0 31 36" fill="currentColor">
        <path d="M4.7 36L0 18.5 22.5 0l-5.3 13.4H31L9.1 36H4.7z"/>
      </svg>
    )
  },
  {
    name: 'Zapier',
    bgColor: 'bg-[#ff4f00]/10',
    iconColor: 'text-[#ff4f00]',
    icon: (
      <svg className="size-10" viewBox="0 0 64 64" fill="currentColor">
        <path d="M42 27.3H37.7C36.4 22 32.1 18 26.7 18c-6.1 0-11 4.9-11 11s4.9 11 11 11c5.4 0 9.7-4 11-9.3H42v9.3h4.4V18H42v9.3zM26.7 36c-3.9 0-7-3.1-7-7s3.1-7 7-7 7 3.1 7 7-3.1 7-7 7z"/>
        <path d="M32 2C15.4 2 2 15.4 2 32s13.4 30 30 30 30-13.4 30-30S48.6 2 32 2zm0 56C17.6 58 6 46.4 6 32S17.6 6 32 6s26 11.6 26 26-11.6 26-26 26z"/>
      </svg>
    )
  },
  {
    name: 'Google Sheets',
    bgColor: 'bg-[#0f9d58]/10',
    iconColor: 'text-[#0f9d58]',
    icon: (
      <svg className="size-10" viewBox="0 0 24 24" fill="currentColor">
        <path d="M14 0H4a2 2 0 0 0-2 2v20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-8-8zM13 9h-2V7h2v2zm0 4h-2v-2h2v2zm0 4h-2v-2h2v2zm4-4h-2v-2h2v2zm0 4h-2v-2h2v2zm-8-4H7v-2h2v2zm0 4H7v-2h2v2z"/>
        <path d="M13 0v8h8l-8-8z" opacity=".3"/>
      </svg>
    )
  },
  {
    name: 'Pabbly',
    bgColor: 'bg-[#0060FF]/10',
    iconColor: 'text-[#0060FF]',
    icon: (
      <svg className="size-10" viewBox="0 0 24 24" fill="currentColor">
        <circle cx="12" cy="12" r="10"/>
        <path fill="white" d="M8 7h4.5c1.9 0 3.5 1.6 3.5 3.5S14.4 14 12.5 14H10v3H8V7zm2 5h2.5c.8 0 1.5-.7 1.5-1.5S13.3 9 12.5 9H10v3z"/>
      </svg>
    )
  },
  {
    name: 'Make',
    bgColor: 'bg-[#4E00FF]/10',
    iconColor: 'text-[#4E00FF]',
    icon: (
      <svg className="size-10" viewBox="0 0 32 32" fill="currentColor">
        <circle cx="6" cy="16" r="3.5"/>
        <circle cx="16" cy="6" r="3.5"/>
        <circle cx="26" cy="16" r="3.5"/>
        <circle cx="16" cy="26" r="3.5"/>
        <path d="M9 14.5l5-7M23 14.5l-5-7M23 17.5l-5 7M9 17.5l5 7" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"/>
      </svg>
    )
  },
  {
    name: 'Klaviyo',
    bgColor: 'bg-neutral-100',
    iconColor: 'text-[#232323]',
    icon: (
      <svg className="size-10" viewBox="0 0 24 24" fill="currentColor">
        <rect x="2" y="2" width="4" height="20" rx="0.5"/>
        <rect x="8" y="2" width="4" height="10" rx="0.5"/>
        <rect x="8" y="14" width="4" height="8" rx="0.5"/>
        <rect x="14" y="2" width="5" height="5" rx="0.5"/>
        <rect x="14" y="9" width="5" height="13" rx="0.5"/>
      </svg>
    )
  },
  {
    name: 'Calendly',
    bgColor: 'bg-[#006BFF]/10',
    iconColor: 'text-[#006BFF]',
    icon: (
      <svg className="size-10" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V9h14v10zM7 11h2v2H7zm4 0h2v2h-2zm4 0h2v2h-2zm-8 4h2v2H7zm4 0h2v2h-2zm4 0h2v2h-2z"/>
      </svg>
    )
  }
]

export default function IntegrationsSection() {
  return (
    <section className="border-b px-4 sm:px-6 lg:px-8 bg-white">
      <div className="mx-auto max-w-7xl border-x px-4 sm:px-6 lg:px-8 border-[#C5C4C2] py-12 sm:py-20 lg:py-24 text-center">

        {/* Header */}
        <div className="max-w-2xl mx-auto space-y-4 mb-12 sm:mb-16">
          <span className="inline-block px-3 py-1 text-xs font-bold text-[#00b259] border border-[#00b259] bg-[#00b259]/10 font-mono tracking-wider">
            :: INTEGRATIONS ::
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-black leading-tight">
            Plays nicely with your stack
          </h2>
          <p className="text-neutral-500 font-sans text-sm sm:text-base leading-relaxed">
            Connect AI Greentick with 100+ tools — your CRM, store, and automation platform are one click away.
          </p>
        </div>

        {/* Logo Grid — matches existing card/grid design of the site */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 border border-[#C5C4C2] divide-y divide-[#C5C4C2] mb-12 select-none">
          {integrationsList.map((item, index) => (
            <div
              key={index}
              className={[
                'bg-white flex flex-col items-center justify-center gap-3 py-10 px-4 transition-colors hover:bg-neutral-50/70 group',
                // add right border except last in each row
                'border-r border-[#C5C4C2]',
                // remove right border on last col for desktop (6-col)
                index % 6 === 5 ? 'lg:border-r-0' : '',
                // remove right border on last col for tablet (3-col)
                index % 3 === 2 ? 'sm:border-r-0 lg:border-r border-r-[#C5C4C2]' : '',
                // remove right border on last col for mobile (2-col)
                index % 2 === 1 ? 'border-r-0 sm:border-r' : ''
              ].join(' ')}
            >
              {/* Icon container — circle with brand bg tint */}
              <div className={`${item.bgColor} ${item.iconColor} w-16 h-16 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-105 shrink-0`}>
                {item.icon}
              </div>
              <span className="text-xs font-bold text-neutral-700 font-sans text-center leading-tight">
                {item.name}
              </span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="flex justify-center">
          <Link
            href="/integrations"
            className="group inline-flex items-center gap-2 px-6 py-3 border border-black text-xs font-black text-black hover:bg-neutral-50 transition-colors"
            style={{ clipPath: 'polygon(6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%, 0 6px)' }}
          >
            View all integrations <ArrowRight className="size-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

      </div>
    </section>
  )
}
