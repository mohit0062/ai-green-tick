'use client'

import { ArrowRightIcon } from 'lucide-react'
import * as motion from 'motion/react-client'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'

type AvatarData = {
  src: string
  fallback: string
  name: string
}

type Logo = {
  image: string
  alt: string
}

interface AboutUsStoryProps {
  avatars?: AvatarData[]
  logos?: Logo[]
  badgeText?: string
  heading?: string
  description?: string
  imageUrl?: string
  contentHeading?: string
  paragraphs?: string[]
}

const defaultParagraphs = [
  "Apargo started with one belief: growing businesses don’t fail because of ideas — they fail because execution is slow.",
  "So we built a senior-heavy engineering team focused on shipping fast, solving real problems and working closely with founders.",
  "As our clients grew, we faced the same operational challenges they did — especially around WhatsApp at scale. That led us to build AI Greentick, now used by businesses across India and beyond.",
  "Today Apargo builds custom software for ambitious companies while also running and scaling our own SaaS products."
]

const AboutUs = ({
  avatars,
  logos,
  badgeText = "Our story",
  heading = "How Apargo started",
  description = "Apargo was built for founders who needed real execution — not endless presentations, delays and outsourced confusion.",
  imageUrl = "https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/about-us/image-45.png",
  contentHeading = "We build products the way ambitious teams actually need them built.",
  paragraphs = defaultParagraphs
}: AboutUsStoryProps) => {
  const headingWords = (heading || "").trim().split(" ")
  const lastWord = headingWords.length > 1 ? headingWords.pop() : ""
  const firstWords = headingWords.join(" ")

  return (
    <section className='bg-[#E5E2DA] relative overflow-hidden py-8 sm:py-16 lg:py-24 text-black'>
      <motion.svg
        width='1em'
        height='1em'
        viewBox='0 0 600 600'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        className='pointer-events-none absolute top-1/2 left-1/2 size-[800px] -translate-x-1/2 -translate-y-1/2 sm:size-[1200px] lg:size-[1600px]'
        initial='hidden'
        animate='visible'
      >
        <motion.circle
          strokeOpacity={0.05}
          cx='300'
          cy='300'
          r='295'
          fill='none'
          stroke='var(--border)'
          strokeWidth='1'
          variants={{
            visible: {
              scale: [1, 0.9, 1],
              transition: {
                scale: { duration: 3, repeat: Infinity, ease: 'easeOut' }
              }
            }
          }}
        />
        <motion.circle
          strokeOpacity={0.08}
          cx='300'
          cy='300'
          r='255'
          fill='none'
          stroke='var(--border)'
          strokeWidth='1'
          variants={{
            visible: {
              scale: [1, 0.9, 1],
              transition: {
                scale: { delay: 0.1, duration: 3, repeat: Infinity, ease: 'easeOut' }
              }
            }
          }}
        />
        <motion.circle
          strokeOpacity={0.1}
          cx='300'
          cy='300'
          r='215'
          fill='none'
          stroke='var(--border)'
          strokeWidth='1'
          variants={{
            visible: {
              scale: [1, 0.9, 1],
              transition: {
                scale: { delay: 0.2, duration: 3, repeat: Infinity, ease: 'easeOut' }
              }
            }
          }}
        />
      </motion.svg>

      <div className='relative mx-auto max-w-7xl space-y-12 px-4 sm:px-6 md:space-y-16 lg:space-y-24 lg:px-8'>
        <div className='space-y-4 text-center'>
          <h2 className='text-2xl font-semibold md:text-3xl lg:text-4xl'>
            <span className='text-[#00b259] mb-2 block text-sm font-bold uppercase tracking-wider'>{badgeText}</span>
            {firstWords}{' '}
            {lastWord && (
              <span className='relative'>
                {lastWord}
                <span className='bg-[#00b259] absolute bottom-0 left-0 h-px w-full max-sm:hidden'></span>
              </span>
            )}
          </h2>
          <p className='text-neutral-600 mx-auto max-w-4xl text-lg sm:text-xl font-normal'>
            {description}
          </p>
        </div>

        <div className='grid grid-cols-1 items-center gap-16 lg:grid-cols-2'>
          <img
            src={imageUrl}
            alt='About Story'
            className='h-full max-h-91 min-h-52 w-full rounded-lg object-cover border border-[#C5C4C2]'
          />

          <div className='space-y-6 max-lg:text-center text-left'>
            {contentHeading && (
              <h3 className='text-xl font-semibold text-black'>
                {contentHeading}
              </h3>
            )}
            <div className='text-neutral-600 space-y-4 text-sm sm:text-base leading-relaxed'>
              {paragraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutUs
