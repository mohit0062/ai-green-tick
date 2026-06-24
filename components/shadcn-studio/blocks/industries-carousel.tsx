'use client'

import { useRef } from 'react'
import { 
  ShoppingBag, 
  GraduationCap, 
  Activity, 
  Home, 
  CreditCard, 
  Plane, 
  Layers, 
  ChevronLeft, 
  ChevronRight 
} from 'lucide-react'

const industries = [
  {
    category: 'RETAIL',
    icon: <ShoppingBag />,
    name: 'E-commerce & D2C',
    impact: 'Reduce cart abandonment by 30%'
  },
  {
    category: 'ACADEMIA',
    icon: <GraduationCap />,
    name: 'Education',
    impact: '3× course inquiry response rate'
  },
  {
    category: 'CLINICAL',
    icon: <Activity />,
    name: 'Healthcare',
    impact: 'Auto-appointment reminders cut no-shows by 40%'
  },
  {
    category: 'PROPERTY',
    icon: <Home />,
    name: 'Real Estate',
    impact: 'Qualify 5× more leads with AI'
  },
  {
    category: 'FINTECH',
    icon: <CreditCard />,
    name: 'Finance',
    impact: 'Onboard customers in minutes, not days'
  },
  {
    category: 'TOURISM',
    icon: <Plane />,
    name: 'Travel',
    impact: 'Book and confirm itineraries on chat'
  }
]

const IndustriesCarousel = () => {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current
      const scrollAmount = clientWidth / 2
      const scrollTo = direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' })
    }
  }

  return (
    <section className='border-b px-4 sm:px-6 lg:px-8 bg-[#ECEBE9]/50 dark:bg-neutral-950/20 relative overflow-hidden'>
      {/* Background Dotted Pattern */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(0,0,0,0.02)_1px,transparent_1px)] bg-size-[24px_24px] -z-10" />

      <div className='mx-auto max-w-7xl border-x px-4 sm:px-6 lg:px-8 border-[#C5C4C2] relative z-10 py-8 sm:py-16 lg:py-24'>
        
        {/* Header Block */}
        <div className='flex flex-col gap-6 mb-12 sm:mb-16'>
          <div className='space-y-4 text-left max-w-2xl flex flex-col items-start'>
            <span className="px-3 py-1 text-xs font-bold text-[#00b259] border border-[#00b259] bg-[#00b259]/10 font-mono inline-block w-fit">
              :: INDUSTRIES ::
            </span>
            <h2 className='text-2xl font-bold md:text-3xl lg:text-4xl font-sans text-black dark:text-white leading-tight'>
              Built for businesses that live on WhatsApp
            </h2>
            <p className='text-neutral-500 text-xs sm:text-sm font-sans max-w-lg'>
              Tailored workflows and conversational triggers designed to drive conversions across industries.
            </p>
          </div>
        </div>

        {/* Carousel & Navigation Container */}
        <div className='flex items-stretch'>
          
          {/* Left Vertical Navigation Buttons (Matches Screenshot Style) */}
          <div className='absolute -left-10 bottom-32 hidden md:flex flex-col z-20'>
            <div className='flex flex-col border border-[#C5C4C2] bg-white divide-y divide-[#C5C4C2]'>
              <button 
                onClick={() => scroll('left')}
                className='size-10 flex items-center justify-center text-black hover:bg-neutral-50 transition-colors cursor-pointer'
                aria-label="Scroll Left"
              >
                <ChevronLeft className="size-4" />
              </button>
              <button 
                onClick={() => scroll('right')}
                className='size-10 flex items-center justify-center text-black hover:bg-neutral-50 transition-colors cursor-pointer'
                aria-label="Scroll Right"
              >
                <ChevronRight className="size-4" />
              </button>
            </div>
          </div>

          {/* Carousel Scrolling Track */}
          <div 
            ref={scrollRef}
            className='flex-grow flex items-stretch gap-0 overflow-x-auto scroll-smooth pb-6 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 snap-x snap-mandatory scrollbar-none'
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {industries.map((ind, idx) => (
              <div key={idx} className="w-[260px] sm:w-[280px] lg:w-[300px] shrink-0 snap-start">
                <div className="relative border-r border-y border-[#C5C4C2] first:border-l bg-white dark:bg-neutral-950 h-[360px] flex flex-col justify-between p-6 overflow-hidden group">
                  
                  {/* Top row: marker + index number */}
                  <div className="flex items-center justify-between w-full">
                    <div className="size-2 bg-black dark:bg-white" />
                    <span className="text-[11px] font-mono font-bold text-neutral-400 dark:text-neutral-500">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                  </div>

                  {/* Center Chamfered Icon Box */}
                  <div className="flex items-center justify-center flex-grow">
                    <div 
                      className="w-36 h-36 sm:w-40 sm:h-40 bg-[#ECEBE9]/30 dark:bg-neutral-900/50 border border-[#C5C4C2] flex items-center justify-center relative rounded-2xl transition-all duration-300 group-hover:bg-[#00b259]/5 group-hover:border-[#00b259]/20"
                      style={{ 
                        clipPath: 'polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)' 
                      }}
                    >
                      <div className="text-neutral-800 dark:text-neutral-200 group-hover:text-[#00b259] transition-all duration-300 transform group-hover:scale-105 [&>svg]:size-14 sm:[&>svg]:size-16 [&>svg]:stroke-[1]">
                        {ind.icon}
                      </div>
                    </div>
                  </div>

                  {/* Bottom row: Industry Name & Description */}
                  <div className="text-left w-full">
                    <h3 className="text-xs sm:text-sm font-mono font-bold uppercase tracking-wider text-black dark:text-white group-hover:text-[#00b259] transition-colors">
                      {ind.name}
                    </h3>
                    <p className="text-[11px] font-mono text-neutral-500 mt-1.5 leading-relaxed group-hover:text-neutral-700 dark:group-hover:text-neutral-300 transition-colors">
                      {ind.impact}
                    </p>
                  </div>

                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  )
}

export default IndustriesCarousel
