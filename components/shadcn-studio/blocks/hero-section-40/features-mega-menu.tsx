'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  ArrowRight, 
  ArrowUpRight
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { getSiteSectionClient } from '@/utils/cms-client'
import { DEFAULT_FALLBACKS } from '@/utils/cms-data'
import { LucideIcon } from '@/components/ui/lucide-icon'

export type FeatureItem = {
  id: string
  title: string
  shortDesc: string
  description: string
  icon: string
  link: string
  previewType: string
}

export type Category = {
  id: string
  title: string
  tagline: string
  features: FeatureItem[]
}

export const FeaturesMegaMenu = () => {
  const [features, setFeatures] = useState<FeatureItem[]>(DEFAULT_FALLBACKS.industry_features)
  const [activeCategory, setActiveCategory] = useState<string>('platform-features')
  const [activeFeatureId, setActiveFeatureId] = useState<string>('unified-inbox')

  useEffect(() => {
    async function loadFeatures() {
      const data = await getSiteSectionClient<FeatureItem[]>('industry_features')
      if (data && data.length > 0) {
        setFeatures(data)
        setActiveFeatureId(data[0].id)
      }
    }
    loadFeatures()
  }, [])

  const featuresMenuData: Category[] = [
    {
      id: 'platform-features',
      title: 'Core Platform',
      tagline: 'Inbox, bots, & campaigns',
      features: features
    }
  ]

  const currentCategory = featuresMenuData.find(c => c.id === activeCategory) || featuresMenuData[0]
  const currentFeature = currentCategory.features.find(f => f.id === activeFeatureId) || currentCategory.features[0]

  const handleCategoryHover = (catId: string) => {
    setActiveCategory(catId)
    const newCat = featuresMenuData.find(c => c.id === catId)
    if (newCat && newCat.features.length > 0) {
      setActiveFeatureId(newCat.features[0].id)
    }
  }

  // Render feature interactive diagrams
  const renderPreviewVisual = (type: string) => {
    switch (type) {
      case 'shared-inbox-feat':
        return (
          <div className="w-full h-36 bg-black/5 border border-[#C5C4C2] p-3 flex flex-col justify-between font-mono text-[9px] select-none">
            <div className="flex justify-between items-center border-b border-[#C5C4C2] pb-1">
              <span className="font-bold text-[#00b259]">:: TEAM INBOX FEED</span>
              <span className="text-neutral-400">ONLINE</span>
            </div>
            <div className="space-y-1 flex-1 py-1.5">
              <div className="border border-[#00b259] bg-[#00b259]/5 px-2 py-1 flex justify-between items-center">
                <span>Rohan Patel (Query: Upgrade)</span>
                <span className="text-[7px] text-[#00b259] border border-[#00b259] px-1 font-bold">ASSIGNED TO AMIT</span>
              </div>
              <div className="border border-[#C5C4C2] bg-white px-2 py-1 flex justify-between items-center opacity-70">
                <span>Simran Kaur (Query: API Key)</span>
                <span className="text-neutral-400 text-[7px]">ASSIGNED TO PRIYA</span>
              </div>
            </div>
          </div>
        )
      case 'perf-reports':
        return (
          <div className="w-full h-36 bg-black/5 border border-[#C5C4C2] p-3 flex flex-col justify-between font-mono text-[9px] select-none">
            <div className="font-bold border-b border-[#C5C4C2] pb-1.5">WEEKLY SERVICE METRICS</div>
            <div className="grid grid-cols-2 gap-2 py-1.5 flex-1">
              <div className="border border-[#C5C4C2] bg-white p-1.5 flex flex-col justify-between">
                <span className="text-[7px] text-neutral-500">AVG RESPONSE TIME</span>
                <span className="text-sm font-black text-[#005c2b]">1.2 Minutes</span>
              </div>
              <div className="border border-[#C5C4C2] bg-white p-1.5 flex flex-col justify-between">
                <span className="text-[7px] text-neutral-500">SATISFACTION RATE</span>
                <span className="text-sm font-black text-[#00b259]">4.85 / 5.00</span>
              </div>
            </div>
          </div>
        )
      case 'broadcast-feat':
        return (
          <div className="w-full h-36 bg-black/5 border border-[#C5C4C2] p-3 flex flex-col justify-between font-mono text-[9px] select-none">
            <div className="flex justify-between items-center border-b border-[#C5C4C2] pb-1">
              <span className="font-bold text-[#00b259]">:: BROADCAST: OFFER_FESTIVE</span>
              <span className="text-neutral-500">98% SENT</span>
            </div>
            <div className="space-y-1.5 flex-1 py-1.5">
              <div className="w-full bg-[#C5C4C2]/30 h-2 border border-[#C5C4C2]">
                <div className="bg-[#00b259] h-full animate-[pulse_1s_infinite]" style={{ width: '98%' }}></div>
              </div>
              <div className="grid grid-cols-3 gap-1 text-center text-[7px] text-neutral-500">
                <div className="bg-white border p-1"><b className="text-[9px] text-black block">18,500</b> Sent</div>
                <div className="bg-white border p-1"><b className="text-[9px] text-[#00b259] block">16,210</b> Read</div>
                <div className="bg-white border p-1"><b className="text-[9px] text-blue-600 block">5,120</b> Clicked</div>
              </div>
            </div>
          </div>
        )
      case 'ads-feat':
        return (
          <div className="w-full h-36 bg-black/5 border border-[#C5C4C2] p-3 flex flex-col justify-between font-mono text-[9px] select-none">
            <div className="border border-[#C5C4C2] bg-white p-1.5 flex flex-col gap-1">
              <div className="flex items-center gap-1 border-b pb-1">
                <div className="size-3.5 bg-[#005c2b] text-white flex items-center justify-center font-bold text-[6px] rounded-full">GT</div>
                <span className="font-bold text-[7px]">AI Green Tick</span>
              </div>
              <div className="bg-emerald-50 border border-[#C5C4C2]/30 p-2 text-center text-[#005c2b] font-bold text-[8px]">
                GET META GREEN TICK FREE
              </div>
              <div className="flex justify-between items-center bg-neutral-50 px-1.5 py-1 border border-[#C5C4C2]/50 text-[7px]">
                <span className="font-bold">Connect on WhatsApp</span>
                <span className="bg-[#00b259] text-white px-1.5 py-0.5 rounded-sm font-bold flex items-center gap-0.5 animate-pulse">
                  SEND MESSAGE <ArrowRight className="size-1.5" />
                </span>
              </div>
            </div>
          </div>
        )
      case 'drip-sequences':
        return (
          <div className="w-full h-36 bg-neutral-50 border border-[#C5C4C2] p-3 flex flex-col justify-between font-mono text-[9px] select-none">
            <div className="font-bold border-b border-[#C5C4C2] pb-1">MARKETING DRIP QUEUE</div>
            <div className="flex justify-around items-center py-2 relative">
              <div className="absolute top-1/2 left-3 right-3 h-0.5 bg-[#C5C4C2] -translate-y-1/2 z-0"></div>
              <div className="flex flex-col items-center z-10 bg-neutral-50 px-1">
                <span className="size-5 rounded-full border border-[#00b259] bg-white flex items-center justify-center text-[#00b259]">1</span>
                <span className="text-[6px] mt-0.5">Welcome</span>
              </div>
              <div className="flex flex-col items-center z-10 bg-neutral-50 px-1">
                <span className="size-5 rounded-full border border-neutral-400 bg-white flex items-center justify-center text-neutral-500 animate-pulse">2</span>
                <span className="text-[6px] mt-0.5">Day 3: Offer</span>
              </div>
              <div className="flex flex-col items-center z-10 bg-neutral-50 px-1 opacity-50">
                <span className="size-5 rounded-full border border-neutral-200 bg-white flex items-center justify-center text-neutral-300">3</span>
                <span className="text-[6px] mt-0.5">Day 7: Feedback</span>
              </div>
            </div>
          </div>
        )
      case 'codeless-bot':
        return (
          <div className="w-full h-36 bg-black/5 border border-[#C5C4C2] p-3 flex flex-col justify-between font-mono text-[9px] select-none">
            <div className="font-bold border-b border-[#C5C4C2] pb-1">BOT ENGINE FLOWCHART</div>
            <div className="flex-1 py-1 flex items-center justify-center gap-1.5">
              <div className="border bg-white px-1.5 py-0.5 rounded text-[7px]">Start Chat</div>
              <div className="text-[#00b259] font-bold">➡</div>
              <div className="flex flex-col gap-1">
                <div className="border border-[#00b259] bg-[#00b259]/5 px-1 py-0.5 rounded text-[7px]">Option 1: Sales</div>
                <div className="border border-neutral-300 bg-white px-1 py-0.5 rounded text-[7px] opacity-70">Option 2: Support</div>
              </div>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="w-full bg-white font-sans text-black relative">
      
      {/* Row 1: Header Row */}
      <div className="grid grid-cols-12 border-b border-[#C5C4C2] bg-white relative select-none">
        {/* Col 1 Header */}
        <div className="col-span-8 border-r border-[#C5C4C2] p-3 text-[10px] font-bold text-neutral-400 tracking-widest relative">
          :: TOOLS & CAPABILITIES ::
          {/* Intersection Diamond 1 */}
          <div className="absolute -translate-x-1/2 translate-y-1/2 left-full bottom-0 w-2 h-2 rotate-45 border border-[#C5C4C2] bg-white z-20" />
        </div>
        
        {/* Col 2 Header */}
        <div className="col-span-4 p-3 text-[9px] font-bold text-neutral-400 tracking-widest flex justify-between items-center">
          <span>:: COMPONENT SPEC ::</span>
          <span className="text-[#00b259] font-bold font-mono">STABLE API</span>
        </div>
      </div>

      {/* Row 2: Content Row */}
      <div className="grid grid-cols-12 min-h-[260px]">
        {/* Column 1: Specific Tools (Col-span 8) - Rendered as a 2-column grid */}
        <div className="col-span-8 border-r border-[#C5C4C2] flex flex-col p-4 gap-2 bg-neutral-50 justify-center">
          <div className="grid grid-cols-2 gap-2 overflow-hidden">
            {currentCategory.features.map((feature) => {
              const isFeatureActive = activeFeatureId === feature.id
              return (
                <Link
                  key={feature.id}
                  href={feature.link || '#'}
                  onMouseEnter={() => setActiveFeatureId(feature.id)}
                  className={cn(
                    "p-2.5 flex gap-3 items-start border transition-all duration-200 cursor-pointer select-none group/feat",
                    isFeatureActive
                      ? "bg-white border-[#C5C4C2] text-black border-l-4 border-l-[#00b259] translate-x-0.5 shadow-xs"
                      : "border-transparent hover:bg-black/5 text-neutral-600 hover:text-black border-l-4 border-l-transparent"
                  )}
                >
                  <div className={cn(
                    "p-1.5 rounded-sm border shrink-0 transition-colors",
                    isFeatureActive 
                      ? "bg-[#00b259]/10 border-[#00b259]/30 text-[#00b259]" 
                      : "bg-white border-neutral-300 text-neutral-500 group-hover/feat:text-black group-hover/feat:border-neutral-400"
                  )}>
                    {feature.icon && feature.icon.trim().startsWith('<svg') ? (
                      <div 
                        className="size-5 flex items-center justify-center [&_svg]:size-5 [&_svg]:shrink-0"
                        dangerouslySetInnerHTML={{ __html: feature.icon }}
                      />
                    ) : (
                      <LucideIcon name={feature.icon} className="size-5" />
                    )}
                  </div>
                  <div className="flex flex-col gap-0.5 min-w-0">
                    <span className="text-[10px] font-bold leading-normal truncate">
                      {feature.title}
                    </span>
                    <span className="text-[8px] text-neutral-500 leading-normal font-normal line-clamp-2">
                      {feature.shortDesc}
                    </span>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>

        {/* Column 2: Feature Details (Col-span 4) */}
        <div className="col-span-4 flex flex-col p-4 justify-between bg-white text-black">
          <div className="flex flex-col gap-2.5">
            <h3 className="text-xs font-black text-black tracking-tight leading-tight">
              {currentFeature.title}
            </h3>
            
            <p className="text-[10px] text-neutral-500 font-sans leading-relaxed">
              {currentFeature.description}
            </p>
            
            {/* Animated SVG Preview Container */}
            <div className="mt-2 w-full rounded-sm overflow-hidden">
              {renderPreviewVisual(currentFeature.previewType)}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#C5C4C2]/30 flex justify-end">
            <a
              href={currentFeature.link}
              className="flex items-center gap-1.5 text-[9px] font-extrabold text-[#00b259] hover:underline group/btn"
            >
              EXPLORE COMPONENT SPEC 
              <ArrowUpRight className="size-3 text-[#00b259] group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </div>
      </div>

    </div>
  )
}
