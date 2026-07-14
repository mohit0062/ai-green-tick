'use client'

import React from 'react'

type StackItem = {
  name: string
  icon: React.ReactNode
  pill?: string
}

const stackItems: StackItem[] = [
  {
    name: 'Stripe',
    icon: (
      <svg viewBox="0 0 60 25" className="h-5 w-auto" fill="currentColor" aria-label="Stripe">
        <path d="M59.64 14.28h-8.06c.19 1.93 1.6 2.55 3.2 2.55 1.64 0 2.96-.37 4.05-.95v3.32a8.33 8.33 0 0 1-4.56 1.1c-4.01 0-6.83-2.5-6.83-7.48 0-4.19 2.39-7.52 6.3-7.52 3.92 0 5.96 3.28 5.96 7.5 0 .4-.04 1.26-.06 1.48zm-5.92-5.62c-1.03 0-2.17.73-2.17 2.58h4.23c0-1.85-1.07-2.58-2.06-2.58zM40.95 20.3c-1.44 0-2.32-.6-2.9-1.04l-.02 4.63-4.45.94V6.27h3.96l.19 1.08c.56-.69 1.63-1.29 3.01-1.29 2.87 0 5.49 2.87 5.49 7.04 0 4.97-2.55 7.2-5.28 7.2zM40 9.95c-.95 0-1.54.34-1.97.81l.02 6.12c.4.44.98.78 1.95.78 1.52 0 2.54-1.65 2.54-3.87 0-2.15-1.05-3.84-2.54-3.84zM28.24 5.07c1.44 0 2.3 1.06 2.3 2.51 0 1.48-.97 2.51-2.3 2.51-1.4 0-2.31-1.07-2.31-2.51 0-1.45.91-2.51 2.31-2.51zm2.22 15.07h-4.47V6.27h4.47v13.87zM21.24 5.07c.93 0 1.82.31 2.35 1.07l.17-1.07h3.83v13.87h-3.9l-.2-1.1c-.55.74-1.55 1.29-2.88 1.29C18.17 19.13 16 16 16 12.1c0-3.92 2.17-7.03 5.24-7.03zm.77 4.88c-1.54 0-2.56 1.62-2.56 3.87 0 2.26 1.02 3.83 2.56 3.83.93 0 1.52-.36 1.93-.81V9.79c-.41-.47-1-.84-1.93-.84zM6.7 10.07l2.45 6.09 2.47-6.09h4.83L10.93 20.3H7.18L1.66 6.27H6.7v3.8z"/>
      </svg>
    )
  },
  {
    name: 'Filament',
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-label="Filament">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
      </svg>
    )
  },
  {
    name: 'Shadcn',
    icon: (
      <svg viewBox="0 0 256 256" className="h-5 w-5" fill="currentColor" aria-label="Shadcn/UI">
        <path d="M208 128l-80 80M192 40L40 192" stroke="currentColor" strokeWidth="32" strokeLinecap="round" fill="none"/>
      </svg>
    )
  },
  {
    name: 'Supabase',
    icon: (
      <svg viewBox="0 0 109 113" className="h-5 w-auto" fill="none" aria-label="Supabase">
        <path
          d="M63.7076 110.284C60.8481 113.885 55.0502 111.912 54.9813 107.314L53.9738 40.0627L99.1935 40.0627C107.384 40.0627 111.952 49.5228 106.859 55.9374L63.7076 110.284Z"
          fill="url(#supaGrad1)"
        />
        <path
          d="M63.7076 110.284C60.8481 113.885 55.0502 111.912 54.9813 107.314L53.9738 40.0627L99.1935 40.0627C107.384 40.0627 111.952 49.5228 106.859 55.9374L63.7076 110.284Z"
          fill="url(#supaGrad2)"
          fillOpacity="0.2"
        />
        <path
          d="M45.317 2.07103C48.1765 -1.53037 53.9745 0.442937 54.0434 5.04074L54.4849 72.2922H9.83113C1.64038 72.2922 -2.92775 62.8321 2.1655 56.4175L45.317 2.07103Z"
          fill="#3ECF8E"
        />
        <defs>
          <linearGradient id="supaGrad1" x1="53.9738" y1="54.974" x2="94.1635" y2="71.8295" gradientUnits="userSpaceOnUse">
            <stop stopColor="#249361"/>
            <stop offset="1" stopColor="#3ECF8E"/>
          </linearGradient>
          <linearGradient id="supaGrad2" x1="36.1558" y1="30.578" x2="54.4844" y2="65.0806" gradientUnits="userSpaceOnUse">
            <stop/>
            <stop offset="1" stopOpacity="0"/>
          </linearGradient>
        </defs>
      </svg>
    )
  },
  {
    name: 'UserAuth',
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-label="UserAuth">
        <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
        <path d="M18 10v1.5a.5.5 0 01-.5.5H17v1h.5a.5.5 0 01.5.5v1a.5.5 0 01-.5.5h-3a.5.5 0 01-.5-.5v-1a.5.5 0 01.5-.5H15v-1h-.5A.5.5 0 0114 12v-2a2 2 0 014 0z" opacity="0.7"/>
      </svg>
    )
  }
]

export default function BuiltWithSection() {
  return (
    <section className="border-b border-[#C5C4C2] px-4 sm:px-6 lg:px-8 bg-white">
      <div className="mx-auto max-w-7xl border-x border-[#C5C4C2]">

        {/* Two-column split: Left text | Right logo strip */}
        <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-[#C5C4C2]">

          {/* LEFT — Headline & sub */}
          <div className="px-8 py-12 sm:py-16 flex flex-col justify-center gap-4">
            <span className="inline-block w-fit px-3 py-1 text-[10px] font-bold text-[#00b259] border border-[#00b259] bg-[#00b259]/10 font-mono tracking-widest">
              :: INTEGRATIONS ::</span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-display text-black leading-snug max-w-sm">
              Plays nicely with your stack
            </h2>
            <p className="text-neutral-500 font-sans text-sm leading-relaxed max-w-xs">
              Connect AI Greentick with 100+ tools — your CRM, store, and automation platform are one click away.
            </p>
          </div>

          {/* RIGHT — Logo pill grid */}
          <div className="px-8 py-12 sm:py-16 flex flex-col justify-center">
            <p className="text-[10px] font-mono font-bold text-neutral-400 uppercase tracking-widest mb-6">
              Powered by best-in-class tools
            </p>

            {/* Logo pills — 2 rows, asymmetric */}
            <div className="flex flex-wrap gap-3">
              {stackItems.map((item) => (
                <div
                  key={item.name}
                  className="group flex items-center gap-2.5 px-4 py-2.5 border border-[#C5C4C2] bg-white hover:border-black hover:bg-neutral-50 transition-all duration-200 cursor-default select-none"
                  style={{ clipPath: 'polygon(5px 0, 100% 0, 100% calc(100% - 5px), calc(100% - 5px) 100%, 0 100%, 0 5px)' }}
                >
                  {/* Icon */}
                  <span className="text-neutral-600 group-hover:text-black transition-colors shrink-0">
                    {item.icon}
                  </span>
                  {/* Name */}
                  <span className="text-xs font-bold text-neutral-700 group-hover:text-black font-sans transition-colors whitespace-nowrap">
                    {item.name}
                  </span>
                  {/* Optional pill badge */}
                  {item.pill && (
                    <span className="text-[9px] font-black font-mono bg-[#00b259]/10 text-[#00b259] px-1.5 py-0.5 border border-[#00b259]/20">
                      {item.pill}
                    </span>
                  )}
                </div>
              ))}

              {/* "+100 more" badge */}
              <div className="flex items-center gap-2 px-4 py-2.5 border border-dashed border-[#C5C4C2] text-neutral-400">
                <span className="text-xs font-bold font-sans">+100 more</span>
              </div>
            </div>

            {/* Small connecting line decoration */}
            <div className="mt-8 flex items-center gap-3">
              <div className="flex-1 h-px bg-[#C5C4C2]" />
              <span className="text-[10px] font-mono text-neutral-400 whitespace-nowrap">One-click connect</span>
              <div className="flex-1 h-px bg-[#C5C4C2]" />
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
