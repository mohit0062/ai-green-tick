'use client'

import type { ReactElement } from 'react'
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card'

type MetricItem = {
  icon: ReactElement
  value: string
  title: string
  subtitle: string
}

const SocialProof = ({ metrics }: { metrics: MetricItem[] }) => {
  return (
    <section className='border-b px-4 sm:px-6 lg:px-8'>
      <div className='mx-auto max-w-7xl border-x border-[#C5C4C2] px-4 sm:px-6 lg:px-8 py-8 sm:py-16 lg:py-24'>
        <div className='bg-muted rounded-md px-4 py-10 sm:px-6 lg:px-8'>
          
          {/* Header */}
          <div className='mb-12 space-y-4 sm:mb-16 lg:mb-24 text-center flex flex-col items-center'>
            <h2 className='text-2xl font-medium md:text-3xl lg:text-4xl font-serif text-foreground'>
              Why WhatsApp beats every other marketing channel
            </h2>
            <p className='text-muted-foreground max-w-4xl text-xl mx-auto'>
              With unmatched open, click-through, and response rates, WhatsApp delivers results that traditional channels like email simply cannot match.
            </p>
          </div>

          {/* Grid */}
          <div className='grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4'>
            {metrics.map((metric, index) => (
              <Card key={index}>
                <CardContent className='[&>svg]:text-muted-foreground flex flex-col items-center [&>svg]:size-7 p-6 text-center'>
                  {metric.icon}
                  <CardTitle className='mt-4 mb-2 text-2xl leading-10 font-semibold md:text-3xl lg:text-4xl text-foreground'>
                    {metric.value}
                  </CardTitle>
                  <h4 className='text-lg font-medium text-foreground'>{metric.title}</h4>
                  <CardDescription className='text-base font-medium mt-1'>
                    {metric.subtitle}
                  </CardDescription>
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
