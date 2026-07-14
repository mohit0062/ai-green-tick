'use client'

import React, { useState } from 'react'
import Header from '@/components/shadcn-studio/blocks/hero-section-40/header'
import Breadcrumb from '@/components/ui/breadcrumb'
import Footer from '@/components/shadcn-studio/blocks/footer/footer'
import type { Navigation } from '@/components/shadcn-studio/blocks/hero-section-40/hero-navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Type, 
  Palette, 
  Layers, 
  Grid, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Smartphone, 
  Lock, 
  ShieldCheck,
  ChevronRight,
  Info,
  Copy,
  Check,
  Sliders,
  Play,
  RotateCcw,
  BookOpen,
  Mail,
  Undo2,
  DollarSign,
  AlertTriangle,
  Ban,
  EyeOff,
  MousePointerClick
} from 'lucide-react'

const navigationData: Navigation[] = [
  {
    title: 'Features',
    href: '/#features'
  },
  {
    title: 'Use cases',
    contentClassName: '!w-141 grid-cols-2',
    splitItems: true,
    items: [
      {
        type: 'section',
        title: 'Sales & Customer Operations',
        items: [
          {
            title: 'Pipeline Management',
            href: '/#features',
            description: 'Track movement, update statuses, and flag stalled deals.',
            icon: <Smartphone className='size-4' />
          },
          {
            title: 'Customer Onboarding',
            href: '/#features',
            description: 'Automate welcome emails, account setup, and key guidance.',
            icon: <Smartphone className='size-4' />
          },
          {
            title: 'Support Escalations',
            href: '/#features',
            description: 'Detect urgency and route issues to the right team faster.',
            icon: <Smartphone className='size-4' />
          }
        ]
      },
      {
        type: 'section',
        title: 'Internal Productivity Workflows',
        items: [
          {
            title: 'Knowledge Retrieval',
            href: '/#features',
            description: 'Ask AI and get instant answers from your tools/docs.',
            icon: <Smartphone className='size-4' />
          },
          {
            title: 'Task Automation',
            href: '/#features',
            description: 'Convert messages into tasks and assign them automatically.',
            icon: <Smartphone className='size-4' />
          },
          {
            title: 'Data Cleanup',
            href: '/#features',
            description: 'Auto-correct entries, remove duplicates, sync records.',
            icon: <Smartphone className='size-4' />
          }
        ]
      }
    ]
  },
  {
    title: 'Team Inbox',
    href: '/team-inbox'
  },
  {
    title: 'Testimonials',
    href: '/#testimonials'
  },
  {
    title: 'Pricing',
    href: '/pricing'
  }
]

export default function DetailedDesignSystemPage() {
  const [copiedToken, setCopiedToken] = useState<string | null>(null)
  const [typedPreview, setTypedPreview] = useState<string>('WhatsApp Broadcasts & Shared Inbox')
  const [fontSizePreview, setFontSizePreview] = useState<string>('text-lg')
  const [fontWeightPreview, setFontWeightPreview] = useState<string>('font-bold')
  const [selectedTab, setSelectedTab] = useState<'all' | 'typography' | 'colors' | 'components' | 'layouts'>('all')

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopiedToken(text)
    setTimeout(() => setCopiedToken(null), 2000)
  }

  const colorTokens = {
    brand: [
      { name: 'Primary Green', hex: '#005c2b', tailwind: 'bg-[#005c2b] text-white', use: 'Primary CTAs, important active states, main brand labels.' },
      { name: 'Secondary Dark Forest', hex: '#042717', tailwind: 'bg-[#042717] text-white', use: 'Standard body text in light mode, layout background blocks, premium contrast elements.' },
      { name: 'Brand Green Bright', hex: '#00b259', tailwind: 'bg-[#00b259] text-black', use: 'Section headers, visual indicators, active highlights, key lines.' },
    ],
    backgrounds: [
      { name: 'Accent Mint', hex: '#f4fef8', tailwind: 'bg-[#f4fef8] border border-neutral-200 text-neutral-800', use: 'Background of key feature badges, selected state highlights, positive panels.' },
      { name: 'Muted Cream', hex: '#fcfaf2', tailwind: 'bg-[#fcfaf2] border border-neutral-200 text-neutral-800', use: 'Bento grid alternative backgrounds, form fields, light separation areas.' },
      { name: 'Muted Layout Background', hex: '#ECEBE9', tailwind: 'bg-[#ECEBE9] text-neutral-800', use: 'Divider block areas, background striping, page layouts margins.' },
    ],
    journeyColors: [
      { name: 'Marketing Accent Blue', hex: '#2563eb', tailwind: 'bg-marketing-accent text-white', use: 'Active indicators, border outlines, and stats text inside the Marketing solutions block.' },
      { name: 'Marketing BG Light Blue', hex: '#EAF3FF', tailwind: 'bg-marketing-bg border border-blue-200 text-neutral-800', use: 'Soft blue container background for marketing layouts.' },
      { name: 'Sales Accent Purple', hex: '#9333ea', tailwind: 'bg-sales-accent text-white', use: 'Active indicators, border outlines, and stats text inside the Sales solutions block.' },
      { name: 'Sales BG Light Purple', hex: '#F8F2FF', tailwind: 'bg-sales-bg border border-purple-200 text-neutral-800', use: 'Soft purple container background for sales layouts.' },
      { name: 'Support Accent Gold', hex: '#d97706', tailwind: 'bg-support-accent text-white', use: 'Active indicators, border outlines, and stats text inside the Support solutions block.' },
      { name: 'Support BG Light Gold', hex: '#FFF9E6', tailwind: 'bg-support-bg border border-amber-200 text-neutral-800', use: 'Soft gold container background for support layouts.' },
    ],
    borders: [
      { name: 'Core Grid Lines', hex: '#C5C4C2', tailwind: 'bg-[#C5C4C2] text-black', use: 'Bento box outlines, vertical lines, layout boundary grids.' },
      { name: 'Standard Border Grey', hex: '#e5e7eb', tailwind: 'bg-[#e5e7eb] border border-neutral-300 text-black', use: 'Internal card layouts, input outlines, light border separators.' },
    ]
  }

  const filterSection = (section: typeof selectedTab) => {
    if (selectedTab === 'all') return true
    return selectedTab === section
  }

  return (
    <div className='flex flex-col min-h-screen bg-[#ECEBE9]/30 dark:bg-neutral-950/20'>
      <Header navigationData={navigationData} />
      <Breadcrumb />

      <main className='flex-grow mx-auto max-w-7xl w-full border-x border-[#C5C4C2] bg-white dark:bg-neutral-900 pb-20 lg:pb-32'>
        
        {/* Banner Section */}
        <section className='p-6 sm:p-9 lg:p-12 flex flex-col gap-5 text-left border-b border-[#C5C4C2] bg-[radial-gradient(rgba(0,178,89,0.08)_1px,transparent_1px)] [background-size:24px_24px]'>
          <div className='flex items-center gap-2'>
            <span className='px-3 py-1 text-xs font-bold text-[#00b259] border border-[#00b259] bg-[#00b259]/10 font-mono'>
              :: DESIGN SYSTEM VERSION 1.1 ::
            </span>
          </div>
          <h1 className='text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-[#042717] dark:text-white tracking-tight leading-none'>
            AI Greentick Design System
          </h1>
          <p className='text-neutral-500 max-w-3xl text-base sm:text-lg leading-relaxed font-sans'>
            A live, production-grade guide showcasing typography rules, responsive brand colors, spacing grids, structural lines, animations, and custom UI components built for our Brutalist WhatsApp ecosystem.
          </p>

          {/* Quick Navigation Filter */}
          <div className='flex flex-wrap gap-2 mt-4 border-t border-[#C5C4C2]/50 pt-6'>
            {[
              { id: 'all', label: 'All Standards', icon: <Layers className='size-3.5' /> },
              { id: 'typography', label: '1. Typography', icon: <Type className='size-3.5' /> },
              { id: 'colors', label: '2. Colors & Contrast', icon: <Palette className='size-3.5' /> },
              { id: 'components', label: '3. UI Components', icon: <Sliders className='size-3.5' /> },
              { id: 'layouts', label: '4. Grid & Borders', icon: <Grid className='size-3.5' /> },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id as any)}
                className={`px-4 py-2 text-xs font-bold font-mono transition-all flex items-center gap-2 border border-[#C5C4C2] ${
                  selectedTab === tab.id 
                    ? 'bg-black text-white dark:bg-white dark:text-black border-black' 
                    : 'bg-neutral-50 hover:bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-350 hover:text-black'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </section>

        {/* 1. Typography System */}
        {filterSection('typography') && (
          <section className='p-6 sm:p-9 lg:p-12 border-b border-[#C5C4C2] space-y-10'>
            <div className='flex items-center gap-3 border-b border-[#C5C4C2]/50 pb-4'>
              <div className='p-2 bg-[#00b259]/10 text-[#00b259] rounded-lg shrink-0'>
                <Type className='size-5' />
              </div>
              <div className='text-left'>
                <h2 className='text-xl font-bold font-display text-foreground'>1. Typography pairing</h2>
                <p className='text-xs text-muted-foreground font-sans'>Pairings of Display Sans (Manrope) and Body Sans (Inter) with global weights</p>
              </div>
            </div>

            {/* Typography Playground */}
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
              
              {/* Test Input area */}
              <div className='lg:col-span-1 space-y-4 text-left bg-neutral-50 dark:bg-neutral-850 p-6 border border-[#C5C4C2] rounded-none'>
                <h3 className='text-xs font-mono font-bold uppercase text-[#00b259] tracking-wider mb-2'>
                  :: Live Font Playground ::
                </h3>
                
                <div className='space-y-3.5'>
                  <div className='flex flex-col gap-1.5'>
                    <label className='text-[10px] font-bold font-mono uppercase text-neutral-500'>Custom Text</label>
                    <input 
                      type='text' 
                      value={typedPreview}
                      onChange={(e) => setTypedPreview(e.target.value)}
                      className='w-full p-2.5 text-xs border border-[#C5C4C2] bg-white dark:bg-neutral-900 text-foreground font-sans rounded-none outline-none focus:border-[#00b259]'
                      placeholder='Type to preview font'
                    />
                  </div>

                  <div className='flex flex-col gap-1.5'>
                    <label className='text-[10px] font-bold font-mono uppercase text-neutral-500'>Font Size</label>
                    <div className='grid grid-cols-3 gap-1'>
                      {['text-sm', 'text-lg', 'text-2xl'].map(sz => (
                        <button 
                          key={sz}
                          onClick={() => setFontSizePreview(sz)}
                          className={`p-1.5 text-[10px] border font-mono ${fontSizePreview === sz ? 'bg-[#00b259] text-white border-[#00b259]' : 'border-[#C5C4C2] bg-white dark:bg-neutral-900 text-foreground'}`}
                        >
                          {sz}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className='flex flex-col gap-1.5'>
                    <label className='text-[10px] font-bold font-mono uppercase text-neutral-500'>Font Weight</label>
                    <div className='grid grid-cols-3 gap-1'>
                      {['font-normal', 'font-semibold', 'font-bold'].map(wt => (
                        <button 
                          key={wt}
                          onClick={() => setFontWeightPreview(wt)}
                          className={`p-1.5 text-[10px] border font-mono ${fontWeightPreview === wt ? 'bg-[#00b259] text-white border-[#00b259]' : 'border-[#C5C4C2] bg-white dark:bg-neutral-900 text-foreground'}`}
                        >
                          {wt.replace('font-', '')}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Rendering area */}
              <div className='lg:col-span-2 space-y-6 text-left flex flex-col justify-center border border-dashed border-[#C5C4C2] p-6'>
                <div>
                  <span className='text-[9px] font-mono text-neutral-400 block mb-1'>MANROPE DISPLAY FONT PREVIEW:</span>
                  <div className={`${fontSizePreview} ${fontWeightPreview} font-display text-foreground transition-all duration-200 leading-snug`}>
                    {typedPreview || 'AI Greentick'}
                  </div>
                  <pre className='bg-neutral-100 dark:bg-neutral-800 text-[9px] text-muted-foreground p-2 rounded-xs mt-2 font-mono w-fit'>
                    {`className="${fontSizePreview} ${fontWeightPreview} font-display text-foreground"`}
                  </pre>
                </div>

                <div className='border-t border-neutral-100 dark:border-neutral-800 pt-4'>
                  <span className='text-[9px] font-mono text-neutral-400 block mb-1'>INTER SANS BODY FONT PREVIEW:</span>
                  <div className={`${fontSizePreview} ${fontWeightPreview} font-sans text-neutral-500 transition-all duration-200 leading-relaxed`}>
                    {typedPreview || 'AI Greentick'}
                  </div>
                  <pre className='bg-neutral-100 dark:bg-neutral-800 text-[9px] text-muted-foreground p-2 rounded-xs mt-2 font-mono w-fit'>
                    {`className="${fontSizePreview} ${fontWeightPreview} font-sans text-neutral-500"`}
                  </pre>
                </div>
              </div>

            </div>

            {/* Typography Hierarchy Table */}
            <div className='border border-[#C5C4C2] bg-white dark:bg-neutral-900 overflow-x-auto text-left font-sans rounded-none'>
              <table className='w-full border-collapse text-xs text-foreground'>
                <thead>
                  <tr className='bg-neutral-50 dark:bg-neutral-800 border-b border-[#C5C4C2] font-mono text-[10px] text-neutral-500 uppercase'>
                    <th className='p-4 border-r border-[#C5C4C2]'>Token Name</th>
                    <th className='p-4 border-r border-[#C5C4C2]'>Font pairing</th>
                    <th className='p-4 border-r border-[#C5C4C2]'>Responsive Classes</th>
                    <th className='p-4'>Example Application</th>
                  </tr>
                </thead>
                <tbody className='divide-y divide-[#C5C4C2]/50'>
                  <tr>
                    <td className='p-4 border-r border-[#C5C4C2] font-mono font-bold'>Display Heading 1</td>
                    <td className='p-4 border-r border-[#C5C4C2]'>Manrope / Bold 700</td>
                    <td className='p-4 border-r border-[#C5C4C2] font-mono text-[11px] text-[#00b259]'>text-3xl sm:text-4xl lg:text-5xl font-bold font-display</td>
                    <td className='p-4 font-display font-bold text-lg'>Main Hero Header Titles</td>
                  </tr>
                  <tr>
                    <td className='p-4 border-r border-[#C5C4C2] font-mono font-bold'>Section Title</td>
                    <td className='p-4 border-r border-[#C5C4C2]'>Manrope / Bold 700</td>
                    <td className='p-4 border-r border-[#C5C4C2] font-mono text-[11px] text-[#00b259]'>text-2xl sm:text-3xl lg:text-4xl font-bold font-display</td>
                    <td className='p-4 font-display font-bold text-base'>Section Headers (e.g. Bento Headers)</td>
                  </tr>
                  <tr>
                    <td className='p-4 border-r border-[#C5C4C2] font-mono font-bold'>Card Title</td>
                    <td className='p-4 border-r border-[#C5C4C2]'>Manrope / Bold 700</td>
                    <td className='p-4 border-r border-[#C5C4C2] font-mono text-[11px] text-[#00b259]'>text-lg font-bold font-display text-foreground</td>
                    <td className='p-4 font-display font-bold text-sm'>Feature Card Titles, Bento Titles</td>
                  </tr>
                  <tr>
                    <td className='p-4 border-r border-[#C5C4C2] font-mono font-bold'>Body Regular</td>
                    <td className='p-4 border-r border-[#C5C4C2]'>Inter / Regular 400</td>
                    <td className='p-4 border-r border-[#C5C4C2] font-mono text-[11px] text-[#00b259]'>text-xs sm:text-sm font-sans text-neutral-500 leading-relaxed</td>
                    <td className='p-4 font-sans text-xs'>Standard body descriptions and paragraph copy</td>
                  </tr>
                  <tr>
                    <td className='p-4 border-r border-[#C5C4C2] font-mono font-bold'>System Badge</td>
                    <td className='p-4 border-r border-[#C5C4C2]'>Inter / Bold 900 / Mono</td>
                    <td className='p-4 border-r border-[#C5C4C2] font-mono text-[11px] text-[#00b259]'>text-xs font-bold font-mono tracking-widest uppercase</td>
                    <td className='p-4 font-mono font-bold tracking-widest text-[10px]'>Section Markers (e.g., :: THE PROBLEM ::)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* 2. Colors & Contrast */}
        {filterSection('colors') && (
          <section className='p-6 sm:p-9 lg:p-12 border-b border-[#C5C4C2] space-y-8'>
            <div className='flex items-center gap-3 border-b border-[#C5C4C2]/50 pb-4'>
              <div className='p-2 bg-[#00b259]/10 text-[#00b259] rounded-lg shrink-0'>
                <Palette className='size-5' />
              </div>
              <div className='text-left'>
                <h2 className='text-xl font-bold font-display text-foreground'>2. Colors & contrast guidelines</h2>
                <p className='text-xs text-muted-foreground font-sans'>Theme design tokens configured in variables and active styling classes</p>
              </div>
            </div>

            {/* Brand Colors Grid */}
            <div className='space-y-6'>
              {/* Brand core */}
              <div className='text-left'>
                <h3 className='text-xs font-mono font-bold uppercase text-[#00b259] tracking-wider mb-4'>:: Core Brand Identifiers ::</h3>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                  {colorTokens.brand.map((col, i) => (
                    <div key={i} className='border border-[#C5C4C2] flex flex-col justify-between h-40 p-4 bg-white dark:bg-neutral-950 rounded-none'>
                      <div className={`h-12 w-full ${col.tailwind} flex items-center justify-center text-xs font-bold font-mono`}>
                        {col.hex}
                      </div>
                      <div className='space-y-1 mt-3'>
                        <h4 className='text-xs font-bold font-display text-foreground'>{col.name}</h4>
                        <p className='text-[10px] text-muted-foreground leading-normal font-sans'>{col.use}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Background tokens */}
              <div className='text-left pt-4'>
                <h3 className='text-xs font-mono font-bold uppercase text-[#00b259] tracking-wider mb-4'>:: Background and Surface Tokens ::</h3>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                  {colorTokens.backgrounds.map((col, i) => (
                    <div key={i} className='border border-[#C5C4C2] flex flex-col justify-between h-40 p-4 bg-white dark:bg-neutral-950 rounded-none'>
                      <div className={`h-12 w-full ${col.tailwind} flex items-center justify-center text-xs font-bold font-mono`}>
                        {col.hex}
                      </div>
                      <div className='space-y-1 mt-3'>
                        <h4 className='text-xs font-bold font-display text-foreground'>{col.name}</h4>
                        <p className='text-[10px] text-muted-foreground leading-normal font-sans'>{col.use}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Border tokens */}
              <div className='text-left pt-4'>
                <h3 className='text-xs font-mono font-bold uppercase text-[#00b259] tracking-wider mb-4'>:: Border & Line Separator Tokens ::</h3>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  {colorTokens.borders.map((col, i) => (
                    <div key={i} className='border border-[#C5C4C2] flex flex-col justify-between h-36 p-4 bg-white dark:bg-neutral-950 rounded-none'>
                      <div className={`h-12 w-full ${col.tailwind} flex items-center justify-center text-xs font-bold font-mono`}>
                        {col.hex}
                      </div>
                      <div className='space-y-1 mt-3'>
                        <h4 className='text-xs font-bold font-display text-foreground'>{col.name}</h4>
                        <p className='text-[10px] text-muted-foreground leading-normal font-sans'>{col.use}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Journey tokens */}
              <div className='text-left pt-4'>
                <h3 className='text-xs font-mono font-bold uppercase text-[#00b259] tracking-wider mb-4'>:: Solutions Journey Vertical Colors ::</h3>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                  {colorTokens.journeyColors.map((col, i) => (
                    <div key={i} className='border border-[#C5C4C2] flex flex-col justify-between h-36 p-4 bg-white dark:bg-neutral-950 rounded-none'>
                      <div className={`h-12 w-full ${col.tailwind} flex items-center justify-center text-xs font-bold font-mono`}>
                        {col.hex}
                      </div>
                      <div className='space-y-1 mt-3'>
                        <h4 className='text-xs font-bold font-display text-foreground'>{col.name}</h4>
                        <p className='text-[10px] text-muted-foreground leading-normal font-sans'>{col.use}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* 3. Component System */}
        {filterSection('components') && (
          <section className='p-6 sm:p-9 lg:p-12 border-b border-[#C5C4C2] space-y-10'>
            <div className='flex items-center gap-3 border-b border-[#C5C4C2]/50 pb-4'>
              <div className='p-2 bg-[#00b259]/10 text-[#00b259] rounded-lg shrink-0'>
                <Layers className='size-5' />
              </div>
              <div className='text-left'>
                <h2 className='text-xl font-bold font-display text-foreground'>3. UI Elements & States</h2>
                <p className='text-xs text-muted-foreground font-sans'>Interactive widgets, buttons, status indicators, and animation previews</p>
              </div>
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-2 gap-10 lg:divide-x lg:divide-[#C5C4C2]'>
              {/* Left Column: Custom Clip Path Buttons & Hover Micro-animations */}
              <div className='space-y-8 text-left'>
                <div>
                  <h3 className='text-xs font-mono font-bold uppercase text-[#00b259] tracking-wider block mb-4'>
                    :: Angled Clip-Path CTA Buttons ::
                  </h3>
                  <div className='flex flex-wrap gap-4 items-center mb-4'>
                    <button
                      className="px-8 py-3 text-xs font-bold text-white bg-black hover:bg-black/90 dark:bg-white dark:text-black transition-colors tracking-widest font-sans duration-300"
                      style={{ clipPath: 'polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)' }}
                    >
                      BLACK BRAND CTA
                    </button>

                    <button
                      className="px-8 py-3 text-xs font-bold text-white bg-[#00b259] hover:bg-[#00b259]/90 transition-colors tracking-widest font-sans duration-300"
                      style={{ clipPath: 'polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)' }}
                    >
                      GREEN BRAND CTA
                    </button>
                  </div>
                  <p className='text-xs text-muted-foreground font-sans leading-normal mb-3'>
                    These buttons use an inline style <code>clipPath</code> property to shave 8px off the top-left and bottom-right corners. Hover micro-animations transition the background colors cleanly.
                  </p>
                </div>

                <div>
                  <h3 className='text-xs font-mono font-bold uppercase text-[#00b259] tracking-wider block mb-4'>
                    :: Status Badge Indicators ::
                  </h3>
                  <div className='flex flex-wrap gap-3 items-center'>
                    <span className='px-3 py-1 text-xs font-bold text-[#00b259] border border-[#00b259] bg-[#00b259]/10 font-mono'>
                      :: SECTION STICKER ::
                    </span>
                    <span className='bg-red-500/10 border border-red-500/30 text-red-500 text-[10px] font-black py-1 px-2.5 rounded-none font-mono'>
                      HIGH RISK
                    </span>
                    <span className='bg-amber-500/10 border border-amber-500/30 text-amber-500 text-[10px] font-black py-1 px-2.5 rounded-none font-mono'>
                      WARNING / PENDING
                    </span>
                    <span className='bg-green-500/10 border border-green-500/30 text-green-500 text-[10px] font-black py-1 px-2.5 rounded-none font-mono'>
                      ACTIVE / COMPLIANT
                    </span>
                  </div>
                </div>

                {/* Overlapping Client Avatars */}
                <div>
                  <h3 className='text-xs font-mono font-bold uppercase text-[#00b259] tracking-wider block mb-4'>
                    :: Overlapping Client Avatar Stack ::
                  </h3>
                  <div className='flex items-center -space-x-2 bg-neutral-50 dark:bg-neutral-850 p-4 border border-dashed border-[#C5C4C2] w-fit'>
                    {[1, 2, 3, 4, 5].map((idx) => (
                      <div 
                        key={idx} 
                        className={`size-8 rounded-full border-2 border-white dark:border-neutral-900 bg-neutral-200 overflow-hidden flex items-center justify-center text-[10px] font-bold text-neutral-600 z-${idx}`}
                      >
                        <img 
                          src={`https://cdn.shadcnstudio.com/ss-assets/blocks/bento-grid/image-10${idx}.png`} 
                          alt={`Avatar ${idx}`} 
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none'
                          }}
                        />
                        <span>U{idx}</span>
                      </div>
                    ))}
                    <span className='text-[10px] font-bold text-neutral-400 font-mono pl-4'>
                      -space-x-2 / border-white
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column: Interactive Card Component Block Preview */}
              <div className='space-y-6 text-left lg:pl-8'>
                <h3 className='text-xs font-mono font-bold uppercase text-[#00b259] tracking-wider block mb-4'>
                  :: Bento Grid Card Pattern (Interactive State) ::
                </h3>

                <Card className='shadow-none ring-0 rounded-none border border-[#C5C4C2] bg-white dark:bg-neutral-950 group relative overflow-hidden'>
                  <CardContent className='p-6'>
                    
                    {/* Visual mockup block inside card */}
                    <div className="flex flex-col gap-2 p-3 bg-neutral-50 dark:bg-neutral-900 border border-[#C5C4C2] rounded-none font-mono text-[9px] w-full select-none mb-6">
                      <div className="flex justify-between items-center text-[9px] font-bold text-neutral-500 border-b border-[#C5C4C2]/50 pb-1">
                        <span>Status Monitor</span>
                        <span className="text-green-500 animate-pulse">● LIVE</span>
                      </div>
                      <div className="space-y-1 mt-1">
                        <div className="flex justify-between text-[7px] text-muted-foreground">
                          <span>Sync Progress</span>
                          <span>98.4%</span>
                        </div>
                        <div className="w-full bg-neutral-200 dark:bg-neutral-800 h-1.5 rounded-full overflow-hidden border border-border">
                          <div className="bg-[#00b259] h-full w-[98.4%]" />
                        </div>
                      </div>
                    </div>

                    <div className='mb-2 flex items-center justify-between'>
                      <div className='p-1.5 bg-[#00b259]/10 text-[#00b259] rounded-full w-fit shrink-0'>
                        <Lock className='size-4' />
                      </div>
                      <span className='text-[9px] font-mono font-bold text-neutral-400'>
                        COMPONENT: BENTO_CARD
                      </span>
                    </div>

                    <h3 className='text-lg font-bold font-display text-foreground mb-2 group-hover:text-[#00b259] transition-colors duration-300'>
                      Official BSP Security
                    </h3>

                    <p className='text-muted-foreground text-xs leading-relaxed font-sans'>
                      We protect your customer data with verified Meta solution guidelines and fully compliance frameworks.
                    </p>

                    <div className='pt-4 mt-6 border-t border-dashed border-[#C5C4C2] flex justify-between items-center text-[10px] font-mono text-neutral-500'>
                      <span>LEARN MORE</span>
                      <ArrowRight className='size-4 text-[#00b259] group-hover:translate-x-1 transition-transform duration-300' />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
        )}

        {/* 4. Grid System & Borders */}
        {filterSection('layouts') && (
          <section className='p-6 sm:p-9 lg:p-12 space-y-10'>
            <div className='flex items-center gap-3 border-b border-[#C5C4C2]/50 pb-4'>
              <div className='p-2 bg-[#00b259]/10 text-[#00b259] rounded-lg shrink-0'>
                <Grid className='size-5' />
              </div>
              <div className='text-left'>
                <h2 className='text-xl font-bold font-display text-foreground'>4. Grid lines & separators</h2>
                <p className='text-xs text-muted-foreground font-sans'>Brutalist container lines, diagonal dividers, and structural guidelines</p>
              </div>
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-2 gap-10'>
              {/* Left Column: Separator lines */}
              <div className='space-y-6 text-left'>
                <div>
                  <h3 className='text-xs font-mono font-bold uppercase text-[#00b259] tracking-wider block mb-3'>
                    :: Brutalist Solid Border Lines ::
                  </h3>
                  <p className='text-xs text-muted-foreground font-sans leading-relaxed mb-4'>
                    AI Greentick avoids soft drop shadows. Containers and sections are bound by thick, solid borders colored using token <code>#C5C4C2</code>. Grid containers utilize a <code>1px</code> border layout.
                  </p>
                </div>

                <div className='space-y-4 border border-[#C5C4C2] p-6 bg-white dark:bg-neutral-950'>
                  <div className='h-8 w-full border border-dashed border-red-500/50 bg-red-500/5 flex items-center justify-center text-[9px] font-mono text-red-500'>
                    Dashed Boundary Line (Red Warning / Focus)
                  </div>
                  <div className='h-8 w-full border border-[#C5C4C2] bg-neutral-50 dark:bg-neutral-900 flex items-center justify-center text-[9px] font-mono text-neutral-400'>
                    Solid Separator Grid Boundary (C5C4C2)
                  </div>
                </div>
              </div>

              {/* Right Column: Striped diagonal dividers */}
              <div className='space-y-6 text-left'>
                <div>
                  <h3 className='text-xs font-mono font-bold uppercase text-[#00b259] tracking-wider block mb-3'>
                    :: Repeating Diagonal Striped Dividers ::
                  </h3>
                  <p className='text-xs text-muted-foreground font-sans leading-relaxed mb-4'>
                    This pattern separates primary landing page segments, creating a distinct brutalist transition that feels alive.
                  </p>
                </div>

                <div className='space-y-4'>
                  <div 
                    className="h-12 border border-[#C5C4C2] w-full"
                    style={{
                      backgroundImage: 'repeating-linear-gradient(45deg, #C5C4C2, #C5C4C2 1.5px, transparent 1.5px, transparent 8px)',
                    }}
                  />
                  <pre className='bg-neutral-50 dark:bg-neutral-800 text-[10px] p-3 text-muted-foreground overflow-x-auto border border-neutral-200/60 rounded-lg font-mono leading-relaxed'>
{`/* CSS rule used for the background divider */
background-image: repeating-linear-gradient(
  45deg,
  #C5C4C2,
  #C5C4C2 1.5px,
  transparent 1.5px,
  transparent 8px
);`}
                  </pre>
                </div>
              </div>
            </div>
          </section>
        )}

      </main>

      <Footer />
    </div>
  )
}
