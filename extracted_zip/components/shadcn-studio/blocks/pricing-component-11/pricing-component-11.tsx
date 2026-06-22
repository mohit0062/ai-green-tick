'use client'

import { useEffect } from 'react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

import { cn } from '@/lib/utils'
import { MotionPreset } from '@/components/ui/motion-preset'

type Plans = {
  name: string
  price: number
  description: string
  buttonText: string
  features: string[]
  isPopular?: boolean
}[]

const Pricing = ({ plans }: { plans: Plans }) => {
  useEffect(() => {
    const all = document.querySelectorAll('.card')

    const handleMouseMove = (ev: MouseEvent) => {
      all.forEach(e => {
        const blob = e.querySelector('.blob') as HTMLElement
        const fblob = e.querySelector('.fake-blob') as HTMLElement

        if (!blob || !fblob) return

        const rec = fblob.getBoundingClientRect()

        blob.style.opacity = '0.8'

        blob.animate(
          [
            {
              transform: `translate(${
                ev.clientX - rec.left - 24 - rec.width / 2
              }px, ${ev.clientY - rec.top - 24 - rec.height / 2}px)`
            }
          ],
          {
            duration: 300,
            fill: 'forwards'
          }
        )
      })
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <div className='py-8 sm:py-16 lg:py-24'>
      <div className='mx-auto max-w-7xl space-y-12 px-4 sm:space-y-16 sm:px-6 lg:space-y-24 lg:px-8'>
        <div className='flex flex-col items-center gap-4 text-center'>
          <MotionPreset fade blur slide={{ direction: 'down', offset: 50 }} transition={{ duration: 0.5 }}>
            <Badge variant='outline' className='h-auto text-sm font-normal'>
              <span className='text-primary text-sm font-medium uppercase'>PRICING</span>
            </Badge>
          </MotionPreset>
          <MotionPreset
            component='h2'
            className='text-2xl font-semibold sm:text-3xl lg:text-4xl'
            fade
            blur
            slide={{ direction: 'down', offset: 50 }}
            delay={0.3}
            transition={{ duration: 0.5 }}
          >
            Choose the best option for your logistic company
          </MotionPreset>

          <MotionPreset
            component='p'
            className='text-muted-foreground max-w-xl text-xl'
            fade
            blur
            slide={{ direction: 'down', offset: 50 }}
            delay={0.6}
            transition={{ duration: 0.5 }}
          >
            A Comprehensive Breakdown of Our Pricing Plans to Help You Make the Best Choice!
          </MotionPreset>
        </div>

        <MotionPreset fade blur slide={{ direction: 'down', offset: 50 }} delay={0.9} transition={{ duration: 0.5 }}>
          <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
            {plans.map((plan, idx) => (
              <div
                className={cn(
                  'bg-foreground/10 card group relative h-full overflow-hidden rounded-xl p-px transition-all duration-300 ease-in-out max-lg:last:col-span-full',
                  { 'p-0': plan.name === 'Premium' }
                )}
                key={idx}
              >
                <Card
                  className={cn(
                    'group-hover:bg-card/90 h-full rounded-xl shadow-none transition-all duration-300 ease-in-out',
                    {
                      'border-primary border-2': plan.name === 'Premium'
                    }
                  )}
                >
                  <CardContent className='flex flex-col gap-4'>
                    <div className='flex flex-col gap-3'>
                      <h3 className='text-3xl font-semibold'>{plan.name}</h3>
                      <p className='text-base'>{plan.description}</p>
                    </div>

                    <div className='flex gap-0.5'>
                      <span className='text-muted-foreground text-lg font-medium'>$</span>
                      <span className='text-5xl font-bold'>{plan.price}</span>
                      <span className='text-muted-foreground self-end text-lg'>/month</span>
                    </div>

                    <Button
                      className={cn({
                        'bg-primary/10 text-primary hover:bg-primary/20 focus-visible:ring-primary/20 dark:focus-visible:ring-primary/40':
                          !plan.isPopular
                      })}
                    >
                      {plan.buttonText}
                    </Button>
                    <Separator />

                    <div className='flex flex-col gap-1.5'>
                      <h4 className='text-2xl font-medium'>Features</h4>
                      {plan.features.map((feature, idx) => (
                        <div key={idx} className='flex items-center gap-2 py-1'>
                          <div className='bg-primary size-2 rounded-full'></div>
                          <p className='text-base'>{feature}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                <div className='blob bg-primary absolute top-0 left-0 -z-1 size-62.5 rounded-full opacity-0 blur-2xl transition-all duration-300 ease-in-out' />
                <div className='fake-blob absolute top-0 left-0 -z-1 [display:hidden] size-40 rounded-full' />
              </div>
            ))}
          </div>
        </MotionPreset>
      </div>
    </div>
  )
}

export default Pricing
