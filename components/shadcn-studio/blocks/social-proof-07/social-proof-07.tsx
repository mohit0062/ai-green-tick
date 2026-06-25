'use client'

import type { ReactElement } from 'react'
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card'

type MetricItem = {
  icon: ReactElement
  value: string
  title: string
  subtitle?: string
}

type SocialProofProps = {
  badge?: string
  heading?: string
  description?: string
  metrics: MetricItem[]
}

const SocialProof = ({
  badge,
  heading = "Why WhatsApp beats every other marketing channel",
  description = "With unmatched open, click-through, and response rates, WhatsApp delivers results that traditional channels like email simply cannot match.",
  metrics
}: SocialProofProps) => {
  return (
    <section className='border-b px-4 sm:px-6 lg:px-8'>
      <div className='mx-auto max-w-7xl border-x border-[#C5C4C2] px-4 sm:px-6 lg:px-8 py-8 sm:py-16 lg:py-24'>
        <div className='bg-muted rounded-none border border-[#C5C4C2] px-4 py-10 sm:px-6 lg:px-8'>

          {/* Header */}
          <div className='mb-12 space-y-4 sm:mb-16 lg:mb-24 text-center flex flex-col items-center'>
            {badge && (
              <span className="px-3 py-1 text-xs font-bold text-[#00b259] border border-[#00b259] bg-[#00b259]/10 font-mono inline-block w-fit mb-2">
                :: {badge} ::
              </span>
            )}
            <h2 className='text-2xl font-bold md:text-3xl lg:text-4xl font-sans text-foreground'>
              {heading}
            </h2>
            {description && (
              <p className='text-muted-foreground max-w-4xl text-xl mx-auto'>
                {description}
              </p>
            )}
          </div>

          {/* Grid */}
          <div className={`grid gap-4 sm:gap-6 ${metrics?.length === 4
              ? 'grid-cols-2 md:grid-cols-4 lg:grid-cols-4'
              : 'grid-cols-2 md:grid-cols-3 lg:grid-cols-6'
            }`}>
            {metrics.map((metric, index) => (
              <Card
                key={index}
                className="rounded-none border border-[#C5C4C2] bg-white p-0 py-0 gap-0 shadow-none ring-0 flex flex-col h-full"
              >
                <CardContent className='[&>svg]:text-[#00b259] flex flex-col items-center [&>svg]:size-5 sm:[&>svg]:size-7 p-4 sm:p-5 text-center h-full justify-between flex-1'>
                  <div className="flex flex-col items-center w-full">
                    {metric.icon}
                    <CardTitle className='mt-3 mb-1.5 text-lg sm:text-xl lg:text-2xl font-black text-foreground leading-tight font-sans'>
                      {metric.value}
                    </CardTitle>
                    <h4 className='text-xs font-semibold text-neutral-800 leading-snug'>{metric.title}</h4>
                  </div>
                  {metric.subtitle && (
                    <CardDescription className='text-[10px] sm:text-xs font-medium mt-1 leading-normal'>
                      {metric.subtitle}
                    </CardDescription>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}

export default SocialProof
