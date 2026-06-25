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
  title: string
  description: string
  features: Feature[]
  image: string
  imageAlt: string
}

type AboutUsProps = {
  featureSections: FeatureSection[]
}

const AboutUs = ({ featureSections }: AboutUsProps) => {
  return (
    <section className='relative z-1 overflow-hidden bg-black py-8 text-white sm:py-16 lg:py-24'>
      <div className='mx-auto max-w-7xl space-y-12 px-4 sm:space-y-16 sm:px-6 lg:space-y-24 lg:px-8'>
        {/* Header */}
        <div className='space-y-4 text-center'>
          <MotionPreset fade slide={{ direction: 'down', offset: 50 }} transition={{ duration: 0.7 }}>
            <Badge className='text-sm font-normal text-white' variant='outline'>
              Core Features
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
            Explore Our AI Chatbot Features
          </MotionPreset>
          <MotionPreset fade slide={{ direction: 'down', offset: 50 }} delay={0.3} transition={{ duration: 0.7 }}>
            <p className='text-lg opacity-80 md:text-xl'>
              Discover the powerful tools that make our chatbot the perfect solution for your business.
            </p>
          </MotionPreset>
          <MotionPreset fade slide={{ direction: 'down', offset: 50 }} delay={0.4} transition={{ duration: 0.7 }}>
            <div className='flex flex-wrap items-center justify-center gap-4'>
              <NeuralButton asChild>
                <a href='#'>Get Started - Free</a>
              </NeuralButton>
              <GlassButton asChild className='group'>
                <a href='#'>
                  View Pricing
                  <ArrowRightIcon className='transition-transform duration-200 group-hover:translate-x-0.5' />
                </a>
              </GlassButton>
            </div>
          </MotionPreset>
        </div>

        {/* Feature Sections */}
        {featureSections.map((section, index) => (
          <div
            key={index}
            className={`grid grid-cols-1 items-center gap-12 md:gap-16 lg:grid-cols-2 xl:gap-24 ${
              index % 2 === 1 ? 'lg:flex-row-reverse' : ''
            }`}
          >
            {/* Text Content */}
            <MotionPreset
              fade
              slide={{ direction: index % 2 === 0 ? 'left' : 'right', offset: 50 }}
              delay={0.2}
              transition={{ duration: 0.7 }}
              className={`${index % 2 === 1 ? 'lg:order-2' : ''}`}
            >
              <div className='space-y-6'>
                <div className='space-y-4'>
                  <h3 className='text-xl font-semibold md:text-2xl'>{section.title}</h3>
                  <p className='text-lg opacity-80 md:text-xl'>{section.description}</p>
                </div>
                <ul className='space-y-3.5'>
                  {section.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className='flex gap-3'>
                      <CircleCheckIcon className='mt-0.5 size-6 shrink-0' />
                      <p className='text-lg opacity-80'>
                        <span>{feature.title}</span>: {feature.description}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </MotionPreset>

            {/* Image */}
            <MotionPreset
              fade
              slide={{ direction: index % 2 === 0 ? 'right' : 'left', offset: 50 }}
              delay={0.4}
              transition={{ duration: 0.7 }}
              className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}
            >
              <div className='border-primary/20 relative overflow-hidden rounded-md bg-white/10 shadow-[inset_0_0_8px_rgba(255,255,255,0.30)] backdrop-blur-3xl'>
                <img
                  src={section.image}
                  alt={section.imageAlt}
                  className={`w-full max-lg:rounded-md lg:scale-95 ${index % 2 === 1 ? 'lg:origin-top-left lg:rounded-br-md' : 'lg:origin-bottom-right lg:rounded-tl-md'} object-cover transition-transform duration-300 hover:scale-100`}
                />
              </div>
            </MotionPreset>
          </div>
        ))}
      </div>

      {/* Background Decoration */}
      <MotionPreset
        fade
        slide={{ direction: 'left', offset: 100 }}
        delay={0.7}
        transition={{ duration: 1.2 }}
        className='absolute bottom-[7%] -left-1/8 -z-1 w-full opacity-50 md:bottom-[15%] md:w-[80%] lg:bottom-0 xl:w-1/2'
      >
        <img
          src='https://cdn.shadcnstudio.com/ss-assets/template/landing-page/neural/image-02.png'
          alt='Background decoration'
        />
      </MotionPreset>
      <MotionPreset
        fade
        slide={{ direction: 'right', offset: 100 }}
        delay={0.9}
        transition={{ duration: 1.2 }}
        className='absolute top-[30%] -right-1/8 -z-1 w-full opacity-50 md:top-[20%] md:w-[80%] lg:top-[10%] xl:top-0 xl:w-1/2'
      >
        <img
          src='https://cdn.shadcnstudio.com/ss-assets/template/landing-page/neural/image-02.png'
          alt='Background decoration'
          className='rotate-180'
        />
      </MotionPreset>
    </section>
  )
}

export default AboutUs
