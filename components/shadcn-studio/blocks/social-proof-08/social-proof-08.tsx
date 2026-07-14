import type { ReactElement } from 'react'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'

import { MotionPreset } from '@/components/ui/motion-preset'

type Features = {
  icon: ReactElement
  value: string
  description: string
}

type SocialProofProps = {
  badge?: string
  heading?: string
  description?: string
  features: Features[]
  image?: string
}

const SocialProof = ({
  badge,
  heading = "Stats that matter",
  description = "In the world of construction, our journey showcases the strength found in teamwork and determination...",
  features,
  image = "https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/social-proof/image-2.png"
}: SocialProofProps) => {
  return (
    <section className='border-b px-4 sm:px-6 lg:px-8'>
      <div className='mx-auto max-w-7xl border-x border-[#C5C4C2] px-4 sm:px-6 lg:px-8 py-8 sm:py-16 lg:py-24'>
        <div className='grid gap-16 lg:grid-cols-2'>
          <div>
            <div className='mb-10 space-y-4'>
              {badge && (
                <div className='flex'>
                  <span className='inline-flex items-center gap-1.5 px-3 py-1 text-[10px] font-mono font-bold uppercase tracking-widest text-[#00b259] border border-[#00b259] bg-[#00b259]/10 rounded-none'>
                    <span className='text-[#00b259]'>■</span> {badge}
                  </span>
                </div>
              )}
              <MotionPreset
                component='h2'
                className='text-2xl font-black text-black md:text-3xl lg:text-4xl font-display'
                fade
                blur
                slide={{ direction: 'up', offset: 50 }}
                transition={{ duration: 0.5 }}
              >
                {heading}
              </MotionPreset>

              <MotionPreset
                className='text-neutral-600 text-base sm:text-lg leading-relaxed font-sans'
                fade
                blur
                slide={{ direction: 'up', offset: 50 }}
                delay={0.3}
                transition={{ duration: 0.5 }}
              >
                <div 
                  className='[&_strong]:font-bold [&_strong]:text-black [&_a]:text-[#00b259] [&_a]:underline [&_img]:inline-block [&_img]:max-w-full [&_img]:h-auto [&_img]:my-2'
                  dangerouslySetInnerHTML={{ __html: description || '' }}
                />
              </MotionPreset>
            </div>

            <div className='space-y-10'>
              {features.map((feature, index) => (
                <MotionPreset
                  key={index}
                  className='flex items-center gap-5'
                  fade
                  blur
                  slide={{ direction: 'up', offset: 30 }}
                  delay={0.6 + index * 0.15}
                  transition={{ duration: 0.7 }}
                >
                  <Avatar className='size-13 after:border-0 rounded-none'>
                    <AvatarFallback className='bg-muted text-[#00b259] rounded-none border border-[#C5C4C2] bg-white'>
                      {feature.icon}
                    </AvatarFallback>
                  </Avatar>
                  <div className='md:space-y-1.5'>
                    <p className='text-lg font-bold text-black md:text-xl font-display'>{feature.value}</p>
                    <p className='text-neutral-600 text-sm sm:text-base leading-relaxed font-sans'>{feature.description}</p>
                  </div>
                </MotionPreset>
              ))}
            </div>
          </div>

          {/* Right Column - Image */}
          <MotionPreset className='my-auto h-fit' fade delay={0.4} transition={{ duration: 1.5 }}>
            <img
              src={image}
              alt='Social Image'
              className='w-full rounded-none border border-[#C5C4C2] object-contain'
            />
          </MotionPreset>
        </div>
      </div>
    </section>
  )
}

export default SocialProof
