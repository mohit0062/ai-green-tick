import type { ReactElement } from 'react'
import { Button } from '@/components/ui/button'
import { ArrowRightIcon } from 'lucide-react'

type StatItem = {
  icon: ReactElement
  value: string
  description: string
}[]

const AboutUs = ({ stats }: { stats: StatItem }) => {
  return (
    <section className='border-b px-4 sm:px-6 lg:px-8 bg-muted'>
      <div className='mx-auto max-w-7xl border-x border-[#C5C4C2] px-4 sm:px-6 lg:px-8 py-8 sm:py-16 lg:py-24'>
        {/* Header */}
        <div className='mb-12 space-y-4 text-center md:mb-16 lg:mb-24'>
          <div className='flex justify-center mb-4'>
            <span className='inline-flex items-center gap-1.5 px-3 py-1 text-[10px] font-mono font-bold uppercase tracking-widest text-[#00b259] border border-[#00b259] bg-[#00b259]/10'>
              <span className='text-[#00b259]'>■</span> About Us
            </span>
          </div>
          <h2 className='text-2xl font-semibold tracking-tight md:text-3xl lg:text-4xl'>
            We're building the infrastructure for WhatsApp-first businesses
          </h2>
          <p className='text-muted-foreground text-xl'>
            AIGreenTick started with one belief: WhatsApp is the most powerful business communication channel in India. We built the platform that makes it enterprise-ready.
          </p>
          <Button size='lg' asChild className='group'>
            <a href='#'>
              Read more
              <ArrowRightIcon className='transition-transform duration-200 group-hover:translate-x-0.5' />
            </a>
          </Button>
        </div>

        {/* Video player and stats */}
        <div className='relative mb-8 h-full w-full max-lg:space-y-6 sm:mb-16 lg:mb-24'>
          <img
            src='https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/about-us/image-44.png'
            alt='About us illustration'
            className='h-full w-full rounded-lg object-cover'
          />

          {/* Stats card overlapping the video section */}
          <div className='bg-background grid grid-cols-2 gap-6 sm:gap-10 rounded-lg border p-8 lg:absolute lg:-bottom-25 lg:left-1/2 lg:w-3/4 lg:-translate-x-1/2 lg:grid-cols-4 lg:px-10 xl:w-max'>
            {stats.map((stat, index) => (
              <div key={index} className='flex flex-col items-center justify-center gap-2.5 text-center'>
                <div className='flex size-7 items-center justify-center [&>svg]:size-7'>{stat.icon}</div>
                <span className='text-2xl font-semibold'>{stat.value}</span>
                <p className='text-muted-foreground text-lg'>{stat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutUs
