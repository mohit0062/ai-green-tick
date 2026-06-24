'use client'

// React Imports
import type { ReactNode } from 'react'
import { useState } from 'react'

import DottedSheet from '@/components/shadcn-studio/blocks/features-section-26/dotted-sheet'
import Workflow from '@/components/shadcn-studio/blocks/features-section-26/workflow'

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

  return (
    <section className='border-b px-4 sm:px-6 lg:px-8'>
      <div className='mx-auto max-w-7xl border-x border-[#C5C4C2] py-8 sm:py-16 lg:py-24'>
        <div className='grid max-lg:divide-y max-lg:divide-y-reverse lg:grid-cols-2 lg:divide-x border border-[#C5C4C2] bg-white dark:bg-neutral-900'>
            
            {/* Left Column: Title Box + Code Editor Mockup Preview */}
            <div className='flex flex-col h-full divide-y divide-[#C5C4C2] max-lg:order-1'>
              
              {/* Title Box */}
              <div className='p-6 sm:p-9 lg:p-10 flex flex-col gap-3 text-left bg-[radial-gradient(rgba(132,204,22,0.12)_1.2px,transparent_1.2px)] [background-size:16px_16px] bg-[#fefce8]/20 dark:bg-transparent'>
                <span className='text-xs font-mono font-bold uppercase tracking-widest text-[#00b259]'>
                  :: THE SOLUTION ::
                </span>
                <h2 className='text-2xl sm:text-3xl lg:text-[34px] font-sans font-bold tracking-tight text-black dark:text-white leading-tight'>
                  One platform. Every WhatsApp workflow. Powered by AI.
                </h2>
                <p className='text-muted-foreground text-xs sm:text-sm leading-relaxed max-w-xl font-sans'>
                  Automate marketing broadcasts, streamline sales conversations, and offer instant AI-powered support in a single, unified WhatsApp platform.
                </p>
              </div>

              {/* Mockup Preview */}
              <div className='relative flex-grow flex items-center justify-center overflow-hidden px-4 py-8 lg:py-12 max-lg:h-120'>
                <DottedSheet className='absolute inset-0 h-full w-full' />
                <div className='absolute inset-0 bg-[radial-gradient(circle,transparent_0%,var(--background)_80%)]' />
                <Workflow
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                  setWorkflowProgress={setWorkflowProgress}
                  initialTabId={data[0].id}
                />
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
                        ? 'bg-[#ECEBE9]/20 dark:bg-neutral-800/10 py-6 lg:py-8 gap-4' 
                        : 'hover:bg-neutral-50/40 dark:hover:bg-neutral-800/5 py-4 lg:py-8 gap-0 lg:gap-4'
                    )}
                  >
                    <div className='flex items-center gap-5'>
                      <span className={cn('text-muted-foreground [&>svg]:size-4.5', { 'text-foreground': isActive })}>
                        {tab.icon}
                      </span>
                      <h3 className={cn('text-muted-foreground text-xl font-medium', { 'text-foreground': isActive })}>
                        {tab.title}
                      </h3>
                    </div>
                    
                    <ul className={cn('text-muted-foreground space-y-1.5 pl-9 list-disc text-left', isActive ? 'block' : 'hidden lg:block', { 'text-foreground': isActive })}>
                      {tab.points?.map((point, index) => (
                        <li key={index}>
                          {point}
                        </li>
                      ))}
                    </ul>

                    {isActive && (
                      <div
                        data-state='workflow-progress'
                        className='bg-primary absolute inset-x-0 bottom-0 left-0 h-0.5 transition-none'
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
