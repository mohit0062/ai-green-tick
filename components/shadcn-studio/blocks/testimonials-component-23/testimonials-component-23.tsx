'use client'

import { useEffect, useState } from 'react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { MotionPreset } from '@/components/ui/motion-preset'

import { cn } from '@/lib/utils'

export type Testimonial = {
  id: string
  avatar: string
  fallback: string
  name: string
  designation: string
  companyName: string
  companyLogo: string
  companyLogoDark?: string
  message: string
}

const TestimonialsComponent = ({ testimonials }: { testimonials: Testimonial[] }) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          return 100
        }

        return prev + 100 / 30 // 30 frames per second * 3 seconds = 90 updates
      })
    }, 100) // Update every 100ms

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (progress >= 100) {
      const timeout = setTimeout(() => {
        setActiveIndex(current => (current + 1) % testimonials.length)
        setProgress(0)
      }, 100)

      return () => clearTimeout(timeout)
    }
  }, [progress, testimonials.length])

  return (
    <section className='border-b px-4 sm:px-6 lg:px-8'>
      <div className='mx-auto flex max-w-7xl flex-col items-center overflow-hidden border-x border-[#C5C4C2] py-8 sm:py-16 lg:py-24'>
          <div className='flex w-full max-w-207.5 flex-col items-center gap-8 px-4 py-8 md:px-6 md:py-16 lg:px-8 lg:py-24'>
            {/* User Message */}
            <MotionPreset
              key={`message-${activeIndex}`}
              component='h3'
              fade
              blur
              slide={{ direction: 'down', offset: 30 }}
              transition={{ duration: 0.5 }}
              className='text-center text-xl font-medium md:text-3xl'
            >
              {testimonials[activeIndex].message}
            </MotionPreset>

            {/* User details */}
            <MotionPreset
              key={`user-${activeIndex}`}
              fade
              blur
              delay={0.3}
              slide={{ direction: 'down', offset: 30 }}
              transition={{ duration: 0.5 }}
              className='flex items-center gap-2'
            >
              <Avatar size='lg'>
                <AvatarImage src={testimonials[activeIndex].avatar} alt={testimonials[activeIndex].name} />
                <AvatarFallback>{testimonials[activeIndex].fallback}</AvatarFallback>
              </Avatar>

              <span className='text-muted-foreground'>
                {testimonials[activeIndex].name}, {testimonials[activeIndex].designation}
              </span>
            </MotionPreset>
          </div>

          {/* Companies list */}
          <div className='w-full max-lg:overflow-x-auto'>
            <div className='flex min-w-239.5'>
              {testimonials.map((testimonial, index) => {
                const isActive = index === activeIndex

                return (
                  <div
                    key={testimonial.id}
                    className='relative flex-1 cursor-pointer border-t not-last:border-r'
                    onClick={() => {
                      setActiveIndex(index)
                      setProgress(0)
                    }}
                  >
                    <img
                      src={testimonial.companyLogo}
                      alt={testimonial.companyName}
                      className={cn(
                        'object-contain opacity-100 transition-all duration-300',
                        !isActive && 'opacity-50 grayscale',
                        testimonial.companyLogoDark && 'dark:hidden'
                      )}
                    />
                    <img
                      src={testimonial.companyLogoDark || testimonial.companyLogo}
                      alt={testimonial.companyName}
                      className={cn(
                        'hidden object-contain opacity-100 transition-all duration-300',
                        !isActive && 'opacity-50 grayscale',
                        testimonial.companyLogoDark && 'dark:block'
                      )}
                    />
                    {isActive && (
                      <div
                        className='bg-primary absolute inset-x-0 top-0 left-0 h-0.5 transition-all duration-175 ease-linear'
                        style={{ width: `${progress}%` }}
                      />
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
    </section>
  )
}

export default TestimonialsComponent
