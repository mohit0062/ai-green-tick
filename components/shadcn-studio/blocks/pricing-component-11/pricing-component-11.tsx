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
    <section className='border-b border-[#C5C4C2] px-4 sm:px-6 lg:px-8 bg-white dark:bg-neutral-950/20'>
      <div className='mx-auto max-w-7xl border-x border-[#C5C4C2] space-y-12 px-4 sm:space-y-16 sm:px-6 lg:space-y-24 lg:px-8 py-8 sm:py-16 lg:py-24'>
        <div className='flex flex-col items-center gap-4 text-center'>
          <MotionPreset fade blur slide={{ direction: 'down', offset: 50 }} transition={{ duration: 0.5 }}>
            <span className="px-3 py-1 text-xs font-bold text-[#00b259] border border-[#00b259] bg-[#00b259]/10 font-mono inline-block w-fit">
              :: PRICING ::
            </span>
          </MotionPreset>
          <MotionPreset
            component='h2'
            className='text-2xl font-medium sm:text-3xl lg:text-4xl font-serif text-black dark:text-white leading-tight'
            fade
            blur
            slide={{ direction: 'down', offset: 50 }}
            delay={0.3}
            transition={{ duration: 0.5 }}
          >
            Choose the best plan for your business
          </MotionPreset>

          <MotionPreset
            component='p'
            className='text-neutral-500 max-w-xl text-xs sm:text-sm font-sans'
            fade
            blur
            slide={{ direction: 'down', offset: 50 }}
            delay={0.6}
            transition={{ duration: 0.5 }}
          >
            A comprehensive breakdown of our pricing plans to help you make the best choice.
          </MotionPreset>
        </div>

        <MotionPreset fade blur slide={{ direction: 'down', offset: 50 }} delay={0.9} transition={{ duration: 0.5 }}>
          <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
            {plans.map((plan, idx) => (
              <div
                className={cn(
                  'card group relative h-full overflow-hidden rounded-none border border-[#C5C4C2] transition-all duration-300 ease-in-out max-lg:last:col-span-full',
                  { 'border-2 border-[#00b259]': plan.name === 'Premium' }
                )}
                key={idx}
              >
                <Card
                  className={cn(
                    'group-hover:bg-card/90 h-full rounded-none shadow-none! ring-0 border-0 transition-all duration-300 ease-in-out'
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
    </section>
  )
}

export default Pricing
