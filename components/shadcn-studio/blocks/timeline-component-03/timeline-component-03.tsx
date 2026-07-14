'use client'

import { useEffect, useRef, useState, type ReactElement } from 'react'

import {
  TimelineHorizontal,
  TimelineItemHorizontal,
  TimelineDotHorizontal,
  TimelineLineHorizontal,
  TimelineContentHorizontal,
  TimelineHeadingHorizontal
} from '@/components/ui/timeline-horizontal'



interface TimelineStep {
  icon: ReactElement
  title: string
  description: string
  progress: number
  progressLabel: string
  duration: string
}

interface ProcessProps {
  steps: TimelineStep[]
}



const Process = ({ steps }: ProcessProps) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [cycleKey, setCycleKey] = useState(0)
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])
  const prevActiveIndexRef = useRef(0)

  // Detect cycle restart and increment cycleKey
  useEffect(() => {
    // When activeIndex goes back to 0 from a higher index, it's a restart
    if (activeIndex === 0 && prevActiveIndexRef.current === steps.length - 1) {
      setCycleKey(prev => prev + 1)
    }

    prevActiveIndexRef.current = activeIndex
  }, [activeIndex, steps.length])

  return (
    <section className='border-b px-4 sm:px-6 lg:px-8'>
      <div className='mx-auto max-w-7xl border-x border-[#C5C4C2] px-4 sm:px-6 lg:px-8 py-8 sm:py-16 lg:py-24'>
        {/* Header */}
        <div className='mb-12 space-y-4 text-center sm:mb-16 lg:mb-24'>
          <p className='text-[#00b259] text-xs font-bold font-display uppercase tracking-widest'>:: How It Works ::</p>

          <h2 className='text-2xl font-bold md:text-3xl lg:text-4xl font-display text-black dark:text-white'>Live in 24 hours. Scale in weeks.</h2>

          <p className='text-neutral-500 mx-auto max-w-2xl text-base font-sans'>
            We guide you through onboarding to the official API, importing contacts, launching campaigns, and scaling automation workflows.
          </p>
        </div>

        {/* Horizontal Timeline */}
        <div>
          <TimelineHorizontal
            className='flex-col gap-4 xl:justify-center xl:gap-4'
            defaultActiveIndex={0}
            animated={true}
            autoPlay={true}
            itemDurations={steps.map(() => 2500)}
            onActiveIndexChange={setActiveIndex}
          >
            {steps.map((step, index) => {
              const isLast = index === steps.length - 1
              const isActive = activeIndex === index
              const isPast = activeIndex > index
              const isFirstItem = index === 0

              return (
                <TimelineItemHorizontal key={index}>
                  <div
                    ref={el => {
                      itemRefs.current[index] = el
                    }}
                    className='flex flex-col items-center gap-4 xl:flex-row xl:items-center xl:gap-4'
                  >
                    <TimelineDotHorizontal
                      status='custom'
                      className='data-[active=true]:bg-primary [&:not([data-active=true])]:bg-primary/10 *:[svg]:data-[active=true]:text-primary-foreground *:[svg]:not-data-[active=true]:text-primary size-9.5 rounded-full *:[svg]:size-5.5'
                    >
                      {step.icon}
                    </TimelineDotHorizontal>
                    {!isLast && <TimelineLineHorizontal className='min-h-12 xl:w-57.5' />}
                  </div>
                  <TimelineContentHorizontal className='flex h-auto xl:h-44 w-2xs flex-col gap-4 md:w-lg lg:w-xl xl:max-w-3xs xl:justify-between pb-8 xl:pb-0'>
                    <div>
                      <TimelineHeadingHorizontal variant='primary' className='mb-1.5 text-lg font-bold font-display'>
                        {step.title}
                      </TimelineHeadingHorizontal>
                      <p className='text-muted-foreground text-xs sm:text-sm font-sans'>{step.description}</p>
                    </div>

                  </TimelineContentHorizontal>
                </TimelineItemHorizontal>
              )
            })}
          </TimelineHorizontal>
        </div>
      </div>
    </section>
  )
}

export default Process
