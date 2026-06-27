'use client'

import { useEffect, useState } from 'react'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { InboxIcon, WorkflowIcon, RadioIcon, BotIcon, ShieldCheckIcon, LineChartIcon, ArrowRight, Megaphone, Send } from 'lucide-react'
import { cn } from '@/lib/utils'

import LeadQualifier from '@/components/shadcn-studio/blocks/hero-section-40/lead-qualifier'
import MeetingPrep from '@/components/shadcn-studio/blocks/hero-section-40/meeting-prep'
import FollowUps from '@/components/shadcn-studio/blocks/hero-section-40/follow-ups'
import DataSync from '@/components/shadcn-studio/blocks/hero-section-40/data-sync'
import Reporting from '@/components/shadcn-studio/blocks/hero-section-40/reporting'
import ContentDrafting from '@/components/shadcn-studio/blocks/hero-section-40/content-drafting'

const IsometricSymbol = () => (
  <svg width="50" height="50" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-neutral-700 animate-bounce duration-1000">
    {/* Top face */}
    <path d="M30 10L48 20L30 30L12 20L30 10Z" fill="#FBFBFA" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    {/* Left face */}
    <path d="M12 20V40L30 50V30L12 20Z" fill="#EAE9E6" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    {/* Right face */}
    <path d="M30 30V50L48 40V20L30 30Z" fill="#D3D2CE" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    {/* Green arrow details inside */}
    <path d="M24 22L30 26L36 22" stroke="#00b259" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

import { GreenTickBadge } from './logo'

const CircularLogo = () => (
  <GreenTickBadge className="size-8 shrink-0" />
)

const AutoScrollingImage = ({ src, alt }: { src: string; alt: string }) => {
  const animName = `scroll-${src.replace(/[^a-zA-Z0-9]/g, '')}`
  return (
    <div className="scrolling-container w-full h-full flex overflow-hidden bg-white relative">
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes ${animName} {
          0%, 8% {
            top: 0;
            transform: translateY(0);
          }
          42%, 58% {
            top: 100%;
            transform: translateY(-100%);
          }
          92%, 100% {
            top: 0;
            transform: translateY(0);
          }
        }
        .animate-${animName} {
          position: absolute;
          width: calc(100% / 0.948);
          height: auto;
          left: calc(-100% * (0.052 / 0.948));
          animation: ${animName} 18s ease-in-out infinite;
        }
        .scrolling-container:hover .animate-${animName} {
          animation-play-state: paused;
        }
      `}} />
      
      {/* 1. Left Sidebar (Fixed, no scroll) */}
      <div className="w-[5.2%] h-full overflow-hidden relative">
        <img
          src={src}
          alt={alt}
          className="absolute top-0 left-0 max-w-none"
          style={{
            width: 'calc(100% / 0.052)',
            height: 'auto',
          }}
        />
      </div>
      
      {/* 2. Right Content (Auto scrolling) */}
      <div className="flex-1 h-full overflow-hidden relative">
        <img
          src={src}
          alt={alt}
          className={`animate-${animName} max-w-none`}
        />
      </div>
    </div>
  )
}

const tabs = [
  {
    name: 'Unified Inbox',
    value: 'unified-inbox',
    icon: <InboxIcon className="size-4.5" />,
    content: (
      <AutoScrollingImage
        src="/screencapture-ai-greentick-dashboard-vercel-app-inbox-2026-06-18-19_15_57.png"
        alt="Unified Inbox Dashboard"
      />
    )
  },
  {
    name: 'Ads Manager',
    value: 'ads-manager',
    icon: <Megaphone className="size-4.5" />,
    content: (
      <AutoScrollingImage
        src="/ads.png"
        alt="Ads Manager Dashboard"
      />
    )
  },
  {
    name: 'Broadcasting',
    value: 'broadcasting',
    icon: <RadioIcon className="size-4.5" />,
    content: <FollowUps />
  },
  {
    name: 'Campaigns',
    value: 'campaigns',
    icon: <Send className="size-4.5" />,
    content: (
      <AutoScrollingImage
        src="/saddd.png"
        alt="Campaigns Dashboard"
      />
    )
  },
  {
    name: 'Chatbot',
    value: 'chatbot',
    icon: <BotIcon className="size-4.5" />,
    content: (
      <AutoScrollingImage
        src="/chatbot.png"
        alt="Chatbot Manager Dashboard"
      />
    )
  },
  {
    name: 'AI Analytics',
    value: 'ai-analytics',
    icon: <LineChartIcon className="size-4.5" />,
    content: (
      <AutoScrollingImage
        src="/analetis.png"
        alt="AI Analytics Dashboard"
      />
    )
  }
]

const HeroSection = () => {
  const [activeTab, setActiveTab] = useState(tabs[0]?.value || 'unified-inbox')

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTab(currentTab => {
        const visibleTabs = typeof window !== 'undefined' && window.innerWidth < 768
          ? tabs.filter(t => t.value !== 'broadcasting')
          : tabs

        const currentIndex = visibleTabs.findIndex(tab => tab.value === currentTab)
        if (currentIndex === -1) return visibleTabs[0].value
        const nextIndex = (currentIndex + 1) % visibleTabs.length
        return visibleTabs[nextIndex].value
      })
    }, 7000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative flex flex-col overflow-hidden bg-[#ECEBE9] text-black w-full py-4 px-4 sm:px-6 lg:px-8">
      {/* Main Grid Content Container */}
      <div className="mx-auto max-w-7xl border border-[#C5C4C2] relative z-10 w-full bg-[#ECEBE9]">
        {/* Right Floating Cyberpunk Social Bar (Hanging off the right edge) */}
        <div className="absolute right-[-49px] top-0 z-30 hidden xl:flex flex-col border border-l-0 border-[#C5C4C2] bg-white text-black divide-y divide-[#C5C4C2] w-12 select-none h-fit">
          {/* Dot icon cell */}
          <div className="h-12 flex items-center justify-center bg-white/80">
            <svg className="size-5 text-neutral-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="12" cy="12" r="8" />
              <circle cx="12" cy="12" r="3.5" fill="currentColor" className="text-neutral-600" />
            </svg>
          </div>
          {/* Twitter */}
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="cursor-target h-12 flex items-center justify-center hover:bg-neutral-200/50 transition-colors">
            <svg className="size-4.5 fill-black" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </a>
          {/* Telegram */}
          <a href="https://telegram.org" target="_blank" rel="noopener noreferrer" className="cursor-target h-12 flex items-center justify-center hover:bg-neutral-200/50 transition-colors">
            <svg className="size-4.5 fill-black translate-x-[1px]" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M21.9 2.19a1 1 0 0 0-.99-.08l-19 8a1 1 0 0 0-.1 1.82l4.9 2.22 11.27-7.27c.18-.12.4-.04.47.16s-.04.43-.22.55l-9.45 6.1v4.33a1 1 0 0 0 1.76.65l2.77-3.33 4.8 2.18a1 1 0 0 0 1.38-.63l4-14a1 1 0 0 0-.24-.78z"/>
            </svg>
          </a>
          {/* Medium */}
          <a href="https://medium.com" target="_blank" rel="noopener noreferrer" className="cursor-target h-12 flex items-center justify-center hover:bg-neutral-200/50 transition-colors font-sans font-extrabold text-lg text-black select-none">
            M
          </a>
          {/* LinkedIn */}
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="cursor-target h-12 flex items-center justify-center hover:bg-neutral-200/50 transition-colors">
            <svg className="size-4.5 fill-black" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
            </svg>
          </a>
        </div>

        {/* Row 1: Massive Title Box with Scrolling Marquee */}
        <div className="w-full border-b border-[#C5C4C2] py-8 flex items-center relative bg-transparent overflow-hidden min-h-[140px] lg:min-h-[180px]">
          {/* Inline keyframes to guarantee animation execution */}
          <style dangerouslySetInnerHTML={{ __html: `
            @keyframes custom-marquee {
              0% { transform: translateX(0%); }
              100% { transform: translateX(-50%); }
            }
            .run-marquee {
              display: flex !important;
              width: max-content !important;
              animation: custom-marquee 25s linear infinite !important;
            }
          `}} />



          {/* Corner Square Highlights (Green theme) */}
          <span className="absolute top-2 left-2 text-[#00b259] text-[10px] select-none">■</span>
          <span className="absolute top-2 right-2 text-[#00b259] text-[10px] select-none">■</span>
          <span className="absolute bottom-2 right-2 text-[#00b259] text-[10px] select-none">■</span>
          <span className="absolute bottom-2 left-2 text-[#00b259] text-[10px] select-none">■</span>

          {/* Small Subtitle in bottom-left */}
          <div className="absolute bottom-3 left-6 z-20 flex items-center gap-1.5">
            <span className="text-[#00b259] text-[8px]">■</span>
            <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-neutral-500">
              WhatsApp Marketing & Automation
            </span>
          </div>
          
          <div className="relative z-10 w-full overflow-hidden select-none py-4">
            <div className="run-marquee gap-12 items-center">
              <span className="text-[8vw] lg:text-[110px] font-black tracking-widest text-black uppercase flex items-center gap-12 leading-none" style={{ fontFamily: '"Orbitron", sans-serif' }}>
                WhatsApp Marketing & Automation <span className="text-[#00b259] text-4xl sm:text-6xl">■</span>
              </span>
              <span className="text-[8vw] lg:text-[110px] font-black tracking-widest text-black uppercase flex items-center gap-12 leading-none" style={{ fontFamily: '"Orbitron", sans-serif' }}>
                WhatsApp Marketing & Automation <span className="text-[#00b259] text-4xl sm:text-6xl">■</span>
              </span>
            </div>
          </div>
        </div>

        {/* Row 2: Content Grid Columns */}
        <div className="grid grid-cols-3 lg:grid-cols-9">
          
          {/* Col 1-2: Left Column (divided horizontally on desktop, side-by-side on mobile) */}
          <div className="col-span-2 lg:col-span-2 order-2 lg:order-1 border-r border-[#C5C4C2] grid grid-cols-2 lg:flex lg:flex-col divide-x lg:divide-x-0 divide-[#C5C4C2] lg:divide-y lg:divide-[#C5C4C2] h-full">
            {/* Top Half */}
            <div className="p-3 sm:p-6 flex flex-col justify-center min-h-[120px] lg:min-h-[160px]">
              <div className="flex items-start gap-2">
                <span className="text-[#00b259] font-bold text-xs mt-1">■</span>
                <span className="text-[9px] min-[375px]:text-[10px] lg:text-[11px] font-mono font-bold leading-normal uppercase tracking-wider text-neutral-800">
                  Turn every WhatsApp conversation into revenue
                </span>
              </div>
            </div>
            {/* Bottom Half */}
            <div className="p-3 sm:p-6 flex flex-col justify-between min-h-[120px] lg:min-h-[160px] relative">
              <span className="text-[8px] min-[375px]:text-[9px] lg:text-[10px] font-mono font-bold uppercase tracking-widest text-neutral-500">
                Trusted Brands
              </span>
              <span 
                className="text-2xl min-[375px]:text-3xl lg:text-4xl font-black text-black leading-none mt-4 select-none"
                style={{ fontFamily: '"Orbitron", sans-serif' }}
              >
                500+
              </span>
            </div>
          </div>

          {/* Col 3-4: Middle-Left Column (divided horizontally on desktop, single bottom cell on mobile) */}
          <div className="col-span-1 lg:col-span-2 order-3 lg:order-2 lg:border-r border-0 border-[#C5C4C2] flex flex-col lg:divide-y lg:divide-[#C5C4C2] h-full">
            {/* Top Half - Empty with Cyberpunk Cross Box (Hidden on mobile) */}
            <div className="min-h-[160px] relative items-center justify-center hidden lg:flex">
              {/* Floating Cyberpunk border cross box */}
              <div className="absolute left-[-16px] top-full -translate-y-1/2 w-8 h-8 bg-[#ECEBE9] border border-[#C5C4C2] flex items-center justify-center z-20">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-neutral-500">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </div>
            </div>
            {/* Bottom Half - Corner bracketed 3D visual */}
            <div className="p-3 sm:p-6 flex items-center justify-center min-h-[120px] lg:min-h-[160px] relative h-full">
              {/* Corner brackets */}
              <div className="absolute top-4 left-4 w-2 h-2 border-t border-l border-neutral-400" />
              <div className="absolute top-4 right-4 w-2 h-2 border-t border-r border-neutral-400" />
              <div className="absolute bottom-4 left-4 w-2 h-2 border-b border-l border-neutral-400" />
              <div className="absolute bottom-4 right-4 w-2 h-2 border-b border-r border-neutral-400" />
              <IsometricSymbol />
            </div>
          </div>

          {/* Col 5-9: Middle-Right to Right Column (Product Showcase Card) */}
          <div className="col-span-3 lg:col-span-5 order-1 lg:order-3 flex flex-col justify-between h-full bg-[#ECEBE9] border-b lg:border-b-0 border-[#C5C4C2]">
            
            {/* Top Card Content */}
            <div className="p-8 flex-1 flex flex-col justify-start border-b border-[#C5C4C2]">
              
              {/* Badges Row */}
              <div className="flex items-center gap-2 mb-6">
                <span className="bg-gradient-to-r from-[#00b259] to-[#005c2b] text-white text-[9px] font-mono font-bold px-2 py-0.5 uppercase tracking-wider">
                  New
                </span>
                <span className="border border-[#C5C4C2] bg-white/40 text-neutral-800 text-[9px] font-mono font-bold px-2 py-0.5 uppercase tracking-wider">
                  Official WhatsApp API
                </span>
              </div>

              {/* Product Identity */}
              <div className="mb-6">
                <span className="text-xl font-black text-black font-sans uppercase tracking-tight">
                  Turn every WhatsApp conversation into revenue
                </span>
              </div>

              {/* Copy Description */}
              <p className="text-xs font-sans leading-relaxed text-neutral-600 max-w-xl">
                AI Greentick is the all-in-one WhatsApp Business Suite to broadcast offers, automate replies with AI, manage every chat from a shared inbox, and run ads that click to WhatsApp. Built for D2C brands, agencies and growth teams.
              </p>

              {/* CTA Buttons */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href="#demo"
                  className="cursor-target px-6 py-3 text-xs font-mono font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#00b259] to-[#005c2b] hover:opacity-90 transition-opacity border border-transparent shadow-xs"
                  style={{
                    clipPath: 'polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)'
                  }}
                >
                  Book a demo
                </a>
                <a
                  href="#trial"
                  className="cursor-target px-6 py-3 text-xs font-mono font-bold uppercase tracking-wider text-black border border-[#C5C4C2] hover:bg-neutral-200/50 transition-colors"
                  style={{
                    clipPath: 'polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)'
                  }}
                >
                  Free Trial
                </a>
              </div>
            </div>

            {/* Bottom Metrics Row */}
            <div className="grid grid-cols-5 h-14 sm:h-16 lg:h-18 font-mono select-none">
              
              {/* Metric 1 */}
              <div className="col-span-1 border-r border-[#C5C4C2] p-1.5 sm:p-4 flex flex-col justify-center">
                <span className="text-[11px] sm:text-sm font-black text-black leading-none">98.2%</span>
                <span className="text-[7px] min-[375px]:text-[8px] sm:text-[9px] text-neutral-500 font-bold uppercase mt-1 leading-none">Open Rate</span>
              </div>

              {/* Metric 2 */}
              <div className="col-span-1 border-r border-[#C5C4C2] p-1.5 sm:p-4 flex flex-col justify-center">
                <span className="text-[11px] sm:text-sm font-black text-black leading-none">24%</span>
                <span className="text-[7px] min-[375px]:text-[8px] sm:text-[9px] text-neutral-500 font-bold uppercase mt-1 leading-none">ROI Growth</span>
              </div>

              {/* Metric 3 */}
              <div className="col-span-1 border-r border-[#C5C4C2] p-1.5 sm:p-4 flex flex-col justify-center">
                <span className="text-[11px] sm:text-sm font-black text-black leading-none">4,850+</span>
                <span className="text-[7px] min-[375px]:text-[8px] sm:text-[9px] text-neutral-500 font-bold uppercase mt-1 leading-none">Leads Qual</span>
              </div>

              {/* Metric 4 */}
              <div className="col-span-1 border-r border-[#C5C4C2] p-1.5 sm:p-4 flex flex-col justify-center">
                <span className="text-[11px] sm:text-sm font-black text-black leading-none">24/7</span>
                <span className="text-[7px] min-[375px]:text-[8px] sm:text-[9px] text-neutral-500 font-bold uppercase mt-1 leading-none">AI Support</span>
              </div>

              {/* Action Button Cell */}
              <div className="col-span-1 h-full">
                <a
                  href="#get-started"
                  className="cursor-target h-full w-full flex items-center justify-center bg-[#00b259]/15 hover:bg-[#00b259]/25 text-black hover:text-[#005c2b] transition-all font-bold group"
                >
                  <ArrowRight className="size-4 sm:size-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Full-width diagonal striped divider line just above the Tabs component */}
      <div 
        className="-mx-4 w-[calc(100%+2rem)] sm:-mx-6 sm:w-[calc(100%+3rem)] lg:-mx-8 lg:w-[calc(100%+4rem)] h-12 border-y border-[#C5C4C2] my-6 shrink-0"
        style={{
          backgroundImage: 'repeating-linear-gradient(45deg, #C5C4C2, #C5C4C2 1.5px, transparent 1.5px, transparent 8px)',
        }}
      />

      {/* Tabs Visual section (styled to blend with light blueprint grid theme and green indicators) */}
      <Tabs value={activeTab} onValueChange={setActiveTab} data-horizontal className="w-full gap-0 bg-[#ECEBE9] relative z-10">
        <div className="border border-[#C5C4C2] border-b-0 px-4 sm:px-6 lg:px-8 bg-[#ECEBE9]">
          <div className="mx-auto max-w-7xl border-x border-[#C5C4C2]">
            <ScrollArea className="h-14 md:h-20 -m-px *:overflow-hidden!">
              <TabsList className="h-14 md:h-20 w-full -space-x-px rounded-none bg-transparent p-0 flex relative z-10">
                {tabs.map(({ icon, name, value }) => (
                  <TabsTrigger
                    key={value}
                    value={value}
                    className={cn(
                      "cursor-target border-r border-[#C5C4C2] text-neutral-400 focus-visible:outline-neutral-300 h-14 md:h-20 flex-1 flex flex-col items-center justify-center gap-1 md:gap-1.5 cursor-pointer rounded-none px-1 md:px-4 py-1.5 md:py-2.5 text-[9px] md:text-[10px] font-mono font-bold uppercase tracking-widest hover:text-neutral-700 hover:bg-white/60 transition-all focus-visible:ring-0 focus-visible:outline-none relative group z-20 pointer-events-auto",
                      "data-[state=active]:bg-white data-[state=active]:text-black! data-[state=active]:shadow-none",
                      value === 'broadcasting' && "hidden md:flex"
                    )}
                  >
                    {/* Green top border line when active */}
                    <span className="absolute top-0 inset-x-0 h-[2.5px] bg-[#00b259] opacity-0 group-data-[state=active]:opacity-100 transition-opacity" />

                    {/* Icon */}
                    <div className="size-[18px] md:size-5 flex items-center justify-center shrink-0 [&>svg]:size-full">{icon}</div>

                    {/* Label — always visible */}
                    <span className="text-center w-full truncate px-0.5 leading-tight">{name}</span>
                  </TabsTrigger>
                ))}
              </TabsList>
              <ScrollBar orientation="horizontal" className="z-2 bg-transparent" />
            </ScrollArea>
          </div>
        </div>

        {/* Tab Panel Content Box */}
        <div className="px-4 sm:px-6 lg:px-8 bg-[#ECEBE9] relative overflow-hidden pb-8 md:pb-16">
          <div className="relative mx-auto h-40 sm:h-96 md:h-120 lg:h-151 max-w-7xl border border-[#C5C4C2] z-10 bg-white">
            {/* Dotted Backdrop */}
            <div className="pointer-events-none absolute inset-0 -z-2 bg-[radial-gradient(rgba(0,0,0,0.02)_1px,transparent_1px)] bg-size-[20px_20px]" />

            <ScrollArea className="h-full *:data-[slot=scroll-area-viewport]:h-full [&>[data-slot=scroll-area-viewport]>div]:h-full">
              {tabs.map(tab => (
                <TabsContent
                  key={tab.value}
                  value={tab.value}
                  className="h-full focus-visible:outline-none p-0 flex items-stretch"
                >
                  {tab.value === 'unified-inbox' || tab.value === 'ai-analytics' || tab.value === 'ads-manager' || tab.value === 'campaigns' || tab.value === 'chatbot' ? (
                    <div className="w-full h-full bg-white text-foreground overflow-hidden relative transition-all duration-300">
                      <div className="absolute inset-0 w-full h-full overflow-hidden">
                        {tab.content}
                      </div>
                    </div>
                  ) : (
                    <div className="w-full h-full bg-white text-foreground overflow-hidden flex items-center justify-center p-4 sm:p-6 lg:p-8 transition-all duration-300">
                      <div className="w-full max-w-5xl">
                        {tab.content}
                      </div>
                    </div>
                  )}
                </TabsContent>
              ))}
              <ScrollBar orientation="horizontal" className="bg-transparent" />
            </ScrollArea>
          </div>
        </div>
      </Tabs>
    </section>
  )
}

export default HeroSection
