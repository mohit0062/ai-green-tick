'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { MotionPreset } from '@/components/ui/motion-preset'

type Integration = {
  name: string
  image: string
}[]

const defaultIntegrations: Integration = [
  {
    name: 'Mailchimp',
    image: 'https://cdn.shadcnstudio.com/ss-assets/brand-logo/mailchimp-icon-circle.png'
  },
  {
    name: 'Webflow',
    image: 'https://cdn.shadcnstudio.com/ss-assets/brand-logo/webflow-icon-circle.png'
  },
  { name: 'Airbnb', image: 'https://cdn.shadcnstudio.com/ss-assets/brand-logo/airbnb-icon-circle.png' },
  { name: 'Tata', image: 'https://cdn.shadcnstudio.com/ss-assets/brand-logo/tata-icon-circle.png' },
  { name: 'Paypal', image: 'https://cdn.shadcnstudio.com/ss-assets/brand-logo/paypal-icon-circle.png' },
  {
    name: 'Stackoverflow',
    image: 'https://cdn.shadcnstudio.com/ss-assets/brand-logo/stackoverflow-icon-circle.png'
  },
  { name: 'Huawei', image: 'https://cdn.shadcnstudio.com/ss-assets/brand-logo/huawei-icon-circle.png' },
  { name: 'Asana', image: 'https://cdn.shadcnstudio.com/ss-assets/brand-logo/asana-icon-circle.png' },
  { name: 'Hopin', image: 'https://cdn.shadcnstudio.com/ss-assets/brand-logo/hopin-icon-circle.png' }
]

const AppIntegration = ({ integrations = defaultIntegrations }: { integrations?: Integration }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section className='py-8 sm:py-16 lg:py-24 border-b px-4 sm:px-6 lg:px-8 bg-muted/30'>
      <div className='mx-auto max-w-7xl border border-[#C5C4C2] px-4 sm:px-6 lg:px-8 py-12 sm:py-16 bg-background rounded-none'>
        {/* Header */}
        <div className='mb-8 space-y-4 text-center'>
          <MotionPreset
            component='h2'
            className='relative inline-block text-2xl font-bold md:text-3xl lg:text-4xl text-black font-display'
            fade
            slide={{ direction: 'down', offset: 50 }}
            blur
            transition={{ duration: 0.5 }}
          >
            <span>All types of </span>
            <span className='relative z-10'>
              integration
              <span className='bg-[#00b259] absolute bottom-0.5 left-0 -z-10 h-1 w-full' aria-hidden='true'></span>
            </span>
          </MotionPreset>

          <MotionPreset
            component='p'
            className='text-muted-foreground text-base max-w-xl mx-auto font-sans'
            fade
            blur
            slide={{ direction: 'down', offset: 50 }}
            delay={0.3}
            transition={{ duration: 0.5 }}
          >
            Connect your favourites apps and service to enhance your experience and boost productivity
          </MotionPreset>
        </div>

        {/* App Integration */}
        <div className='flex flex-col items-center gap-8'>
          <MotionPreset fade blur slide={{ direction: 'down', offset: 50 }} delay={0.6} transition={{ duration: 0.5 }}>
            <div className='flex -space-x-2 sm:-space-x-4 flex-wrap justify-center max-w-2xl px-4 py-2'>
              {integrations.map((integration, index) => (
                <div 
                  key={index} 
                  className="relative"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <Avatar className='size-12 sm:size-14 border-2 border-background shadow-xs hover:z-10 hover:-translate-y-1 hover:shadow-md transition-all duration-300 ease-in-out cursor-pointer bg-white'>
                    <AvatarImage src={integration.image} alt={integration.name} className="object-cover p-1.5" />
                    <AvatarFallback className='text-[10px]'>{integration.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  
                  {/* Custom Symmetrical Tooltip */}
                  {hoveredIndex === index && (
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2.5 z-50 bg-black text-white text-[10px] font-sans font-bold px-2.5 py-1.5 shadow-md border border-[#C5C4C2] whitespace-nowrap animate-in fade-in-0 slide-in-from-bottom-1 duration-150">
                      {integration.name}
                      {/* Downward pointer triangle */}
                      <div className="absolute top-full left-1/2 -translate-x-1/2 border-x-4 border-x-transparent border-t-4 border-t-black" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </MotionPreset>

          <MotionPreset fade blur slide={{ direction: 'down', offset: 50 }} delay={0.9} transition={{ duration: 0.5 }}>
            <Link href="/integrations" passHref>
              <Button
                className='bg-primary/10 text-primary hover:bg-primary/20 focus-visible:ring-primary/20 dark:focus-visible:ring-primary/40 rounded-full px-6 cursor-pointer'
                size='lg'
              >
                See all integration
              </Button>
            </Link>
          </MotionPreset>
        </div>
      </div>
    </section>
  )
}

export default AppIntegration
