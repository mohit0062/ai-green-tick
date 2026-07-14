'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowRight, Sparkles, Star, Users, MessageSquare, Check, ArrowLeft } from 'lucide-react'
import { cn } from '@/lib/utils'
import Header from '@/components/shadcn-studio/blocks/hero-section-40/header'
import Breadcrumb from '@/components/ui/breadcrumb'
import Footer from '@/components/shadcn-studio/blocks/footer/footer'
import SolutionsJourney from '@/components/shadcn-studio/blocks/solutions-journey'
import type { Navigation } from '@/components/shadcn-studio/blocks/hero-section-40/hero-navigation'
import CTA from '@/components/shadcn-studio/blocks/cta-section-11/cta-section-11'
import { LucideIcon } from '@/components/ui/lucide-icon'

const navigationData: Navigation[] = [
  {
    title: 'Features',
    href: '/#features'
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

interface IndustriesClientProps {
  pageBuilderData: any
  activeIndustries: any[]
}

export default function IndustriesClient({ pageBuilderData, activeIndustries }: IndustriesClientProps) {
  // Autoplay tab selector states
  const [selectedIndustry, setSelectedIndustry] = useState<string>(
    activeIndustries && activeIndustries.length > 0 ? activeIndustries[0].id : 'ecommerce'
  )
  const [progress, setProgress] = useState<number>(0)
  const [isAutoplay, setIsAutoplay] = useState<boolean>(true)

  const activeIndustry = activeIndustries ? activeIndustries.find(ind => ind.id === selectedIndustry) || activeIndustries[0] : null

  useEffect(() => {
    if (!isAutoplay || !activeIndustries || activeIndustries.length === 0) return

    const duration = 5000 // 5 seconds per tab
    const intervalTime = 50 // Update progress every 50ms
    const totalSteps = duration / intervalTime
    let stepCount = 0

    const timer = setInterval(() => {
      stepCount++
      const currentProgress = (stepCount / totalSteps) * 100
      setProgress(currentProgress)

      if (stepCount >= totalSteps) {
        setSelectedIndustry((prev) => {
          const currentIndex = activeIndustries.findIndex((ind) => ind.id === prev)
          const nextIndex = (currentIndex + 1) % activeIndustries.length
          return activeIndustries[nextIndex].id
        })
        stepCount = 0
        setProgress(0)
      }
    }, intervalTime)

    return () => clearInterval(timer)
  }, [isAutoplay, selectedIndustry, activeIndustries])

  const [localSections, setLocalSections] = useState<any[]>(pageBuilderData?.sections || [])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search)
      if (urlParams.get('preview') === 'true') {
        const draft = localStorage.getItem('industries_preview_state')
        if (draft) {
          try {
            const parsed = JSON.parse(draft)
            if (Array.isArray(parsed.sections)) {
              setLocalSections(parsed.sections)
            }
          } catch (e) {
            console.error('Failed to parse preview state', e)
          }
        }
      }
    }
  }, [])

  return (
    <div className="flex flex-col min-h-screen bg-[#ECEBE9] text-black">
      {/* Header */}
      <Header navigationData={navigationData} />
      <Breadcrumb />

      <main className="flex-grow">
        {localSections.filter((s: any) => s.visible !== false).map((sec: any) => {
          const key = sec.id || sec.type

          switch (sec.type) {
            case 'hero': {
              const content = sec.content || {}
              return (
                <section key={key} className="px-4 sm:px-6 lg:px-8 border-b border-[#C5C4C2] bg-[#ECEBE9]">
                  <div className="mx-auto max-w-7xl border-x border-[#C5C4C2] px-4 sm:px-6 lg:px-8 pt-12 sm:pt-20 pb-0 text-center space-y-6">
                    <span className="inline-block px-3 py-1 text-xs font-bold text-[#00b259] border border-[#00b259] bg-[#00b259]/10 font-mono tracking-wider">
                      :: TAILORED WORKFLOWS ::
                    </span>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display tracking-tight leading-tight text-black whitespace-pre-line">
                      {content.heading || "WhatsApp Automation for Every Industry"}
                    </h1>
                    <p className="text-neutral-500 max-w-3xl mx-auto text-sm sm:text-base font-sans leading-relaxed">
                      {content.subtitle}
                    </p>
                    {content.buttonText && (
                      <div className="pt-4 flex justify-center">
                        <Link
                          href={content.buttonLink || '#'}
                          className="px-6 py-3 text-xs font-black text-white bg-gradient-to-r from-[#00b259] to-[#005c2b] hover:opacity-90 transition-opacity"
                          style={{ clipPath: 'polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)' }}
                        >
                          {content.buttonText}
                        </Link>
                      </div>
                    )}
                    <div className="mt-10 -mx-4 sm:mx-auto max-w-5xl overflow-hidden">
                      <img
                        src={content.heroImageUrl || "/wdececpng.png"}
                        alt="WhatsApp Automation Blueprint"
                        className="w-full h-auto object-cover block mx-auto"
                      />
                    </div>
                  </div>
                </section>
              )
            }

            case 'verticals_selector': {
              if (!activeIndustries || activeIndustries.length === 0) return null
              return (
                <section key={key} className="px-4 sm:px-6 lg:px-8 border-b border-[#022c16] bg-gradient-to-b from-[#020e06] via-[#011a0c] to-[#020e06] text-white relative">
                  <div className="absolute top-0 left-0 w-96 h-96 bg-[#00b259]/5 rounded-full blur-3xl pointer-events-none" />
                  <div className="mx-auto max-w-7xl border-x border-[#022c16] px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12 relative z-10">
                    
                    <div className="border border-[#022c16] bg-[#011207]/90 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 rounded-none overflow-hidden select-none font-sans text-xs">
                      {activeIndustries.map(ind => {
                        const isActive = selectedIndustry === ind.id
                        return (
                          <button
                            key={ind.id}
                            onClick={() => {
                              setSelectedIndustry(ind.id)
                              setIsAutoplay(false)
                              setProgress(0)
                            }}
                            className={cn(
                              "px-4 py-4 sm:py-5 text-center font-bold tracking-wide transition-all border-r border-[#022c16] border-b border-[#022c16] lg:border-b-0 last:border-r-0 cursor-pointer text-[10px] sm:text-xs outline-none flex items-center justify-center gap-2 relative overflow-hidden",
                              isActive ? "bg-[#022c16] text-white border-t-2 border-t-[#00b259] -mt-[1px]" : "text-neutral-400 hover:text-white"
                            )}
                          >
                            {ind.icon && ind.icon.startsWith('<svg') ? (
                              <div 
                                className={cn("size-4 shrink-0 transition-colors [&>svg]:size-4 flex items-center justify-center", isActive ? "text-[#00b259]" : "text-neutral-500")}
                                dangerouslySetInnerHTML={{ __html: ind.icon }}
                              />
                            ) : (
                              <LucideIcon name={ind.icon} className={cn("size-4 shrink-0 transition-colors", isActive ? "text-[#00b259]" : "text-neutral-500")} />
                            )}
                            <span>{ind.title.toUpperCase()}</span>
                            {isActive && isAutoplay && (
                              <div className="absolute bottom-0 left-0 h-0.5 bg-[#00b259] transition-all duration-75" style={{ width: `${progress}%` }} />
                            )}
                          </button>
                        )
                      })}
                    </div>

                    {activeIndustry && (
                      <div className="border border-[#022c16] bg-gradient-to-br from-[#011a0c]/95 to-[#010e06]/95 grid grid-cols-1 lg:grid-cols-12 overflow-hidden rounded-none shadow-2xl">
                        <div className="lg:col-span-5 p-8 sm:p-12 border-b lg:border-b-0 lg:border-r border-[#022c16] flex flex-col justify-between gap-8 text-left">
                          <div className="space-y-4">
                            <span className="px-2 py-0.5 text-[9px] font-bold text-[#00b259] border border-[#00b259]/30 bg-[#00b259]/10 uppercase">
                              Vertical Insight
                            </span>
                            <h3 className="text-2xl font-display font-bold text-white leading-snug">
                              {activeIndustry.title}
                            </h3>
                            <p className="text-xs text-neutral-300 leading-relaxed font-sans">
                              {activeIndustry.desc}
                            </p>
                          </div>
                          <div className="p-4 border border-[#00b259]/20 bg-[#00b259]/5 rounded-none flex items-center gap-3">
                            <div className="size-2 bg-[#00b259] rounded-full animate-ping" />
                            <div>
                              <div className="text-[10px] text-neutral-400 font-bold">KEY RESULT</div>
                              <div className="text-sm font-black text-white">{activeIndustry.metric}</div>
                            </div>
                          </div>
                        </div>

                        <div className="lg:col-span-7 p-8 sm:p-12 bg-[#011207]/40 flex flex-col justify-between gap-8 text-left">
                          <div className="space-y-6">
                            <h4 className="text-xs font-black text-neutral-400 uppercase tracking-widest">[ AUTOMATED WORKFLOWS ]</h4>
                            <ul className="space-y-4">
                              {(activeIndustry.useCases || []).map((uc: string, i: number) => (
                                <li key={i} className="flex items-start gap-3">
                                  <span className="flex items-center justify-center size-5 border border-[#00b259]/30 bg-[#00b259]/10 rounded-full text-[10px] text-[#00b259] font-bold shrink-0 mt-0.5 font-mono">
                                    {i + 1}
                                  </span>
                                  <span className="text-xs sm:text-sm text-neutral-200 leading-relaxed">
                                    {uc}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="pt-6 border-t border-[#022c16] flex flex-wrap items-center justify-between gap-4">
                            <div className="flex flex-wrap items-center gap-3">
                              <Link href="#demo" className="px-5 py-2.5 text-xs font-black text-white bg-gradient-to-r from-[#00b259] to-[#005c2b] shadow-[0_0_15px_rgba(0,178,89,0.2)]" style={{ clipPath: 'polygon(6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%, 0 6px)' }}>
                                SCHEDULE DEMO
                              </Link>
                              <Link href={`/industries/${selectedIndustry || 'ecommerce'}`} className="px-5 py-2.5 text-xs font-black text-white border border-[#00b259]/30 hover:border-[#00b259] hover:bg-[#00b259]/10 transition-all" style={{ clipPath: 'polygon(6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%, 0 6px)' }}>
                                EXPLORE FULL BLUEPRINT &rarr;
                              </Link>
                            </div>
                            <span className="text-[9px] text-neutral-400 font-mono">SETUP IN 10 MINUTES</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </section>
              )
            }

            case 'verticals_grid': {
              if (!activeIndustries || activeIndustries.length === 0) return null
              return (
                <section key={key} className="px-4 sm:px-6 lg:px-8 border-b border-[#C5C4C2] bg-[#ECEBE9]/50">
                  <div className="mx-auto max-w-7xl border-x border-[#C5C4C2] px-4 sm:px-6 lg:px-8 py-12 sm:py-24 space-y-12">
                    <div className="text-center space-y-4 max-w-3xl mx-auto">
                      <span className="inline-block px-2.5 py-0.5 text-[10px] font-bold text-[#00b259] border border-[#00b259]/30 bg-[#00b259]/5 font-mono">
                        :: INDUSTRY COMPARISON ::
                      </span>
                      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-black">
                        Explore all industry blueprints.
                      </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {activeIndustries.map((ind, idx) => {
                        const isSelected = selectedIndustry === ind.id && !isAutoplay
                        return (
                          <div
                            key={ind.id}
                            onClick={() => {
                              setSelectedIndustry(ind.id)
                              setIsAutoplay(false)
                              setProgress(0)
                            }}
                            className={cn(
                              "relative border border-[#C5C4C2] h-[360px] flex flex-col justify-between p-6 overflow-hidden group cursor-pointer transition-all duration-300",
                              isSelected ? 'border-[#00b259] bg-[#00b259]/5' : 'bg-white hover:border-black'
                            )}
                          >
                            <div className="flex items-center justify-between w-full">
                              <div className={cn("size-2 transition-colors", isSelected ? "bg-[#00b259]" : "bg-black")} />
                              <span className="text-[11px] font-sans font-bold text-neutral-400">
                                {String(idx + 1).padStart(2, '0')}
                              </span>
                            </div>

                            <div className="flex items-center justify-center flex-grow">
                              <div className={cn("w-36 h-36 bg-[#ECEBE9]/30 border border-[#C5C4C2] flex items-center justify-center relative rounded-2xl", isSelected ? "bg-[#00b259]/10 border-[#00b259]/30" : "")} style={{ clipPath: 'polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)' }}>
                                <div className={cn("transition-all duration-300 transform group-hover:scale-105", isSelected ? "text-[#00b259]" : "text-neutral-800")}>
                                  {ind.icon && ind.icon.startsWith('<svg') ? (
                                    <div 
                                      className="size-14 flex items-center justify-center [&>svg]:size-14"
                                      dangerouslySetInnerHTML={{ __html: ind.icon }}
                                    />
                                  ) : (
                                    <LucideIcon name={ind.icon} className="size-14" />
                                  )}
                                </div>
                              </div>
                            </div>

                            <div className="text-left w-full">
                              <h3 className={cn("text-xs sm:text-sm font-display font-bold uppercase tracking-wider", isSelected ? "text-[#00b259]" : "text-black")}>
                                {ind.title}
                              </h3>
                              <p className="text-[11px] text-neutral-500 mt-1 leading-relaxed">
                                {ind.metric}
                              </p>
                            </div>

                            <Link href={`/industries/${ind.id}`} onClick={(e) => e.stopPropagation()} className="pt-4 border-t border-[#C5C4C2]/30 flex items-center justify-between text-[10px] font-bold font-sans text-black w-full mt-2 hover:text-[#00b259]">
                              <span className="text-[#00b259]">{isSelected ? 'VIEW DETAILED BLUEPRINT \u2192' : 'EXPLORE BLUEPRINT \u2192'}</span>
                            </Link>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </section>
              )
            }

            case 'journey': {
              return <SolutionsJourney key={key} />
            }

            case 'capabilities': {
              const content = sec.content || {}
              const cards = content.cards || []
              return (
                <section key={key} className="px-4 sm:px-6 lg:px-8 border-b border-[#C5C4C2] bg-[#ECEBE9]/30 py-16 sm:py-24">
                  <div className="mx-auto max-w-7xl border-x border-[#C5C4C2] px-4 sm:px-6 lg:px-8 space-y-12">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center font-sans">
                      {cards.map((c: any, i: number) => (
                        <div key={i} className="space-y-3">
                          <div className="mx-auto size-12 border border-[#C5C4C2] bg-white flex items-center justify-center text-[#00b259]">
                            <LucideIcon name={c.icon || 'Users'} className="size-6" />
                          </div>
                          <h4 className="text-sm font-black text-black">{c.title}</h4>
                          <p className="text-xs text-neutral-500 leading-relaxed font-sans">
                            {c.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              )
            }

            case 'cta': {
              return <CTA key={key} />
            }

            case 'intro': {
              const content = sec.content || {}
              const listItems = content.listItems || []
              return (
                <section key={key} className="px-4 sm:px-6 lg:px-8 border-b border-[#C5C4C2] bg-white py-16 sm:py-24">
                  <div className="mx-auto max-w-7xl border-x border-[#C5C4C2] px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-left">
                    <div className="lg:col-span-6 space-y-4">
                      <h2 className="text-3xl font-display font-bold text-black">{content.title}</h2>
                      <p className="text-sm text-neutral-500 leading-relaxed">{content.desc}</p>
                    </div>
                    <div className="lg:col-span-6 space-y-3">
                      {listItems.map((li: string, i: number) => (
                        <div key={i} className="flex items-start gap-2.5">
                          <span className="flex items-center justify-center size-5 bg-neutral-100 rounded-full text-[#00b259] mt-0.5">
                            <Check className="size-3 stroke-[3]" />
                          </span>
                          <span className="text-xs text-neutral-700 font-medium">{li}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              )
            }

            case 'faq': {
              const content = sec.content || {}
              const items = content.items || []
              return (
                <section key={key} className="px-4 sm:px-6 lg:px-8 border-b border-[#C5C4C2] bg-white py-16 sm:py-24">
                  <div className="mx-auto max-w-3xl space-y-8 text-left">
                    <h3 className="text-2xl font-bold font-display text-center text-black">
                      {content.title}
                    </h3>
                    <div className="space-y-4">
                      {items.map((item: any, i: number) => (
                        <div key={i} className="border border-[#C5C4C2] bg-neutral-50/50 p-4 rounded-xl space-y-2">
                          <h4 className="text-sm font-bold text-neutral-800">Q: {item.question}</h4>
                          <p className="text-xs text-neutral-500 leading-relaxed font-sans">A: {item.answer}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              )
            }

            case 'process': {
              const content = sec.content || {}
              const steps = content.steps || []
              return (
                <section key={key} className="px-4 sm:px-6 lg:px-8 border-b border-[#C5C4C2] bg-white py-16 sm:py-24">
                  <div className="mx-auto max-w-7xl border-x border-[#C5C4C2] px-4 sm:px-6 lg:px-8 space-y-12 text-left">
                    <h3 className="text-2xl font-bold font-display text-center text-black">
                      {content.title}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      {steps.map((st: any, i: number) => (
                        <div key={i} className="space-y-3 relative p-6 border border-[#C5C4C2]/40 rounded-xl bg-neutral-50/20">
                          <span className="text-3xl font-black font-mono text-[#00b259]/30">0{i + 1}</span>
                          <h4 className="text-sm font-bold text-black uppercase">{st.title}</h4>
                          <p className="text-xs text-neutral-500 leading-relaxed">{st.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              )
            }

            case 'statistics': {
              const content = sec.content || {}
              const items = content.items || []
              return (
                <section key={key} className="px-4 sm:px-6 lg:px-8 border-b border-[#C5C4C2] bg-neutral-900 text-white py-16">
                  <div className="mx-auto max-w-7xl px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    {items.map((st: any, i: number) => (
                      <div key={i} className="space-y-1">
                        <span className="text-3xl sm:text-4xl font-extrabold text-[#00b259] block">{st.value}</span>
                        <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider">{st.label}</span>
                      </div>
                    ))}
                  </div>
                </section>
              )
            }

            case 'testimonials': {
              const content = sec.content || {}
              const items = content.items || []
              return (
                <section key={key} className="px-4 sm:px-6 lg:px-8 border-b border-[#C5C4C2] bg-white py-16">
                  <div className="mx-auto max-w-7xl border-x border-[#C5C4C2] px-4 sm:px-6 lg:px-8 space-y-8 text-left">
                    <h3 className="text-2xl font-bold font-display text-center text-black">
                      {content.title}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {items.map((test: any, i: number) => (
                        <div key={i} className="border border-[#C5C4C2] bg-neutral-50/30 p-6 rounded-xl flex flex-col justify-between gap-4">
                          <div className="space-y-3">
                            <div className="flex gap-1 text-[#00b259]">
                              {Array.from({ length: Number(test.stars || 5) }).map((_, sIdx) => (
                                <Star key={sIdx} className="size-3.5 fill-current" />
                              ))}
                            </div>
                            <p className="text-xs text-neutral-600 italic leading-relaxed">
                              "{test.quote}"
                            </p>
                          </div>
                          <div className="text-xs text-left">
                            <h4 className="font-bold text-black leading-none">{test.author}</h4>
                            <span className="text-[10px] text-neutral-400 font-medium mt-0.5 block">{test.role}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              )
            }

            case 'custom': {
              const content = sec.content || {}
              if (!content.html) return null
              return (
                <div key={key} className="w-full relative" dangerouslySetInnerHTML={{ __html: content.html }} />
              )
            }

            default:
              return null
          }
        })}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
