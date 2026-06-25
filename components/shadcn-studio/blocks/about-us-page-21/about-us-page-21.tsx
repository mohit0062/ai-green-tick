import { Badge } from '@/components/ui/badge'

import { NeuralButton } from '@/components/ui/neural-button'
import { MotionPreset } from '@/components/ui/motion-preset'
import { GlassButton } from '@/components/ui/glass-button'
import { ArrowRightIcon, CircleCheckIcon } from 'lucide-react'

type Feature = {
  title: string
  description: string
}

type FeatureSection = {
  badge?: string
  title: string
  description: string
  features?: Feature[]
  image?: string
  imageAlt?: string
}

type AboutUsProps = {
  badge?: string
  heading?: string
  subheading?: string
  featureSections: FeatureSection[]
}

const AboutUs = ({
  badge = "Core Features",
  heading = "Explore Our AI Chatbot Features",
  subheading = "Discover the powerful tools that make our chatbot the perfect solution for your business.",
  featureSections
}: AboutUsProps) => {
  return (
    <section className='relative z-1 overflow-hidden bg-black border-b border-neutral-800 text-white px-4 sm:px-6 lg:px-8'>
      <div className='mx-auto max-w-7xl border-x border-neutral-800 space-y-12 px-4 sm:space-y-16 sm:px-6 lg:space-y-24 lg:px-8 py-8 sm:py-16 lg:py-24'>
        {/* Header */}
        <div className='space-y-4 text-center'>
          <MotionPreset fade slide={{ direction: 'down', offset: 50 }} transition={{ duration: 0.7 }}>
            <Badge className='text-sm font-normal text-white border-neutral-800' variant='outline'>
              {badge}
            </Badge>
          </MotionPreset>
          <MotionPreset
            component='h2'
            className='text-2xl font-semibold md:text-3xl lg:text-4xl'
            fade
            slide={{ direction: 'down', offset: 50 }}
            delay={0.2}
            transition={{ duration: 0.7 }}
          >
            {heading}
          </MotionPreset>
          {subheading && (
            <MotionPreset fade slide={{ direction: 'down', offset: 50 }} delay={0.3} transition={{ duration: 0.7 }}>
              <p className='text-lg opacity-80 md:text-xl'>
                {subheading}
              </p>
            </MotionPreset>
          )}
        </div>

        {/* Feature Sections - Grid of 3 separate cards */}
        <div className='grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8'>
          {featureSections.map((section, index) => (
            <MotionPreset
              key={index}
              fade
              blur
              slide={{ direction: 'up', offset: 30 }}
              delay={0.2 + index * 0.15}
              transition={{ duration: 0.6 }}
              className="group relative flex flex-col justify-between border border-neutral-800 bg-neutral-900/30 p-6 sm:p-8 hover:border-[#00b259]/40 hover:bg-neutral-900/50 transition-all duration-300 rounded-none"
            >
              {/* Corner bracket highlight for hover effect */}
              <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#00b259] opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#00b259] opacity-0 group-hover:opacity-100 transition-opacity" />

              <div>
                {/* Monospace index */}
                <span className="text-xs font-mono font-bold text-[#00b259] tracking-widest block mb-4">
                  [ 0{index + 1} ]
                </span>
                
                {/* Title */}
                <h3 className="text-lg sm:text-xl font-bold text-white mb-3 font-sans group-hover:text-[#00b259] transition-colors leading-tight">
                  {section.title}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-sans">
                  {section.description}
                </p>
              </div>
            </MotionPreset>
          ))}
        </div>
      </div>

      {/* Background Decoration - Green Glow Gradients */}
      <div className="absolute top-[10%] left-[-10%] -z-1 size-72 sm:size-96 rounded-full bg-[#00b259]/10 blur-[80px] sm:blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-10%] -z-1 size-72 sm:size-96 rounded-full bg-[#00b259]/10 blur-[80px] sm:blur-[120px] pointer-events-none" />
    </section>
  )
}

export default AboutUs
