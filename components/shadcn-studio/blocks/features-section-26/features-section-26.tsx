'use client'

// React Imports
import type { ReactNode } from 'react'
import { useState, useEffect } from 'react'
import Image from 'next/image'

import DottedSheet from '@/components/shadcn-studio/blocks/features-section-26/dotted-sheet'

// Util Imports
import { cn } from '@/lib/utils'

type DataType = {
  id: string
  icon: ReactNode
  title: string
  points: string[]
}

const Features = ({ data }: { data: DataType[] }) => {
  const [activeTab, setActiveTab] = useState<string>(data[0].id)
  const [workflowProgress, setWorkflowProgress] = useState<number>(0)

  useEffect(() => {
    setWorkflowProgress(0)
    const startTime = Date.now()
    const STEP_DURATION = 5000 // 5 seconds per tab

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime
      const progress = Math.min((elapsed / STEP_DURATION) * 100, 100)
      setWorkflowProgress(progress)

      if (progress >= 100) {
        clearInterval(interval)
        // Auto-switch to next tab
        const currentIndex = data.findIndex(tab => tab.id === activeTab)
        const nextIndex = (currentIndex + 1) % data.length
        setActiveTab(data[nextIndex].id)
      }
    }, 50)

    return () => clearInterval(interval)
  }, [activeTab, data])

  return (
    <section className='border-b px-4 sm:px-6 lg:px-8 bg-muted/20'>
      <div className='mx-auto max-w-7xl border-x border-[#C5C4C2] py-8 sm:py-16 lg:py-24'>
        <div className='grid max-lg:divide-y max-lg:divide-y-reverse lg:grid-cols-2 lg:divide-x border border-[#C5C4C2] bg-white dark:bg-neutral-900'>
            
            {/* Left Column: Title Box + Preview */}
            <div className='flex flex-col h-full divide-y divide-[#C5C4C2] max-lg:order-1'>
              
              {/* Title Box */}
              <div className='p-6 sm:p-9 lg:p-10 flex flex-col gap-3 text-left bg-[radial-gradient(rgba(132,204,22,0.12)_1.2px,transparent_1.2px)] [background-size:16px_16px] bg-[#fefce8]/20 dark:bg-transparent'>
                <span className='text-xs font-mono font-bold uppercase tracking-widest text-[#00b259]'>
                  :: THE SOLUTION ::
                </span>
                <h2 className='text-2xl sm:text-3xl lg:text-[34px] font-display font-bold tracking-tight text-black dark:text-white leading-tight'>
                  One platform. Every WhatsApp workflow. Powered by AI.
                </h2>
                <p className='text-muted-foreground text-base leading-relaxed max-w-xl font-sans'>
                  Automate marketing broadcasts, streamline sales conversations, and offer instant AI-powered support in a single, unified WhatsApp platform.
                </p>
              </div>

              {/* Image Preview Container */}
              <div className='relative flex-grow flex items-center justify-center overflow-hidden px-4 py-6 lg:py-12 max-lg:h-auto max-lg:min-h-0 bg-neutral-50/20'>
                <DottedSheet className='absolute inset-0 h-full w-full opacity-60' />
                <div className='absolute inset-0 bg-[radial-gradient(circle,transparent_0%,var(--background)_80%)]' />
                <div className="relative z-10 w-full max-w-[520px] bg-white dark:bg-neutral-850 rounded-xl border border-neutral-200/80 flex items-center justify-center overflow-hidden aspect-[16/10] p-0">
                  {activeTab === 'marketing' && (
                    <Image 
                      src="/images/marketing-workflow.png" 
                      alt="Marketing Workflow" 
                      fill
                      sizes="(max-width: 520px) 100vw, 520px"
                      className="object-contain animate-in fade-in zoom-in-95 duration-300"
                    />
                  )}
                  {activeTab === 'sales' && (
                    <Image 
                      src="/images/sales-workflow.png" 
                      alt="Sales Workflow" 
                      fill
                      sizes="(max-width: 520px) 100vw, 520px"
                      className="object-contain animate-in fade-in zoom-in-95 duration-300"
                    />
                  )}
                  {activeTab === 'support' && (
                    <Image 
                      src="/images/support-workflow.png" 
                      alt="Support Workflow" 
                      fill
                      sizes="(max-width: 520px) 100vw, 520px"
                      className="object-contain animate-in fade-in zoom-in-95 duration-300"
                    />
                  )}
                </div>
              </div>

            </div>

            {/* Right Column: 3 Buttons */}
            <div className='divide-y divide-[#C5C4C2] flex flex-col h-full max-lg:order-2'>
              {data.map(tab => {
                const isActive = activeTab === tab.id

                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      'focus-visible:ring-ring/50 relative flex flex-col flex-1 px-6 text-left transition-all duration-300 outline-none focus-visible:z-1 focus-visible:ring-3',
                      isActive 
                        ? tab.id === 'marketing' 
                          ? 'bg-marketing-bg/25 dark:bg-marketing-bg/5 py-6 lg:py-8 gap-4'
                          : tab.id === 'sales'
                            ? 'bg-sales-bg/25 dark:bg-sales-bg/5 py-6 lg:py-8 gap-4'
                            : 'bg-support-bg/25 dark:bg-support-bg/5 py-6 lg:py-8 gap-4'
                        : 'hover:bg-neutral-50/40 dark:hover:bg-neutral-800/5 py-4 lg:py-8 gap-0 lg:gap-4'
                    )}
                  >
                    <div className='flex items-center gap-5'>
                      <span 
                        className={cn('text-muted-foreground [&>svg]:size-4.5 transition-colors duration-300', 
                          isActive && (
                            tab.id === 'marketing' 
                              ? 'text-marketing-accent' 
                              : tab.id === 'sales' 
                                ? 'text-sales-accent' 
                                : 'text-support-accent'
                          )
                        )}
                      >
                        {tab.icon}
                      </span>
                      <h3 
                        className={cn('text-muted-foreground text-lg font-bold font-display transition-colors duration-300', 
                          isActive && (
                            tab.id === 'marketing' 
                              ? 'text-marketing-accent' 
                              : tab.id === 'sales' 
                                ? 'text-sales-accent' 
                                : 'text-support-accent'
                          )
                        )}
                      >
                        {tab.title}
                      </h3>
                    </div>
                    
                    {typeof tab.points === 'string' ? (
                      <div 
                        className={cn('text-muted-foreground space-y-1.5 pl-9 text-left text-xs sm:text-sm font-sans [&>ul]:list-disc [&>ul]:space-y-1.5 [&>ol]:list-decimal [&>ol]:space-y-1.5', isActive ? 'block' : 'hidden lg:block', { 'text-foreground': isActive })}
                        dangerouslySetInnerHTML={{ __html: tab.points }}
                      />
                    ) : (
                      <ul className={cn('text-muted-foreground space-y-1.5 pl-9 list-disc text-left text-xs sm:text-sm font-sans', isActive ? 'block' : 'hidden lg:block', { 'text-foreground': isActive })}>
                        {(tab.points || []).map((point, index) => (
                          <li key={index}>
                            {point}
                          </li>
                        ))}
                      </ul>
                    )}

                    {isActive && (
                      <div
                        data-state='workflow-progress'
                        className={cn('absolute inset-x-0 bottom-0 left-0 h-0.5 transition-none', 
                          tab.id === 'marketing' 
                            ? 'bg-marketing-accent' 
                            : tab.id === 'sales' 
                              ? 'bg-sales-accent' 
                              : 'bg-support-accent'
                        )}
                        style={{ width: `${workflowProgress}%` }}
                      />
                    )}
                  </button>
                )
              })}
            </div>

          </div>
        </div>
    </section>
  )
}

export default Features
