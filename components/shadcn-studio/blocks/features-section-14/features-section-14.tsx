'use client'

import { useRef } from 'react'
import { Badge } from '@/components/ui/badge'

import { MotionPreset } from '@/components/ui/motion-preset'
import { AnimatedBeam } from '@/components/ui/animated-beam'

import LogoVector from '@/assets/svg/logo-vector'

const Features = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const div1Ref = useRef<HTMLDivElement>(null)
  const div2Ref = useRef<HTMLDivElement>(null)
  const div3Ref = useRef<HTMLDivElement>(null)
  const div4Ref = useRef<HTMLDivElement>(null)
  const div5Ref = useRef<HTMLDivElement>(null)
  const span1Ref = useRef<HTMLSpanElement>(null)
  const span2Ref = useRef<HTMLSpanElement>(null)
  const span3Ref = useRef<HTMLSpanElement>(null)
  const span4Ref = useRef<HTMLSpanElement>(null)
  const span5Ref = useRef<HTMLSpanElement>(null)
  const span6Ref = useRef<HTMLSpanElement>(null)

  return (
    <section className="border-b px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl border-x border-[#C5C4C2] px-4 sm:px-6 lg:px-8 py-8 sm:py-16 lg:py-24">
        {/* Header */}
        <div className="mb-12 space-y-4 text-center sm:mb-16 lg:mb-24">
          <MotionPreset
            fade
            blur
            slide={{ direction: 'up', offset: 50 }}
            transition={{ duration: 0.5 }}
          >
            <Badge className="h-auto text-sm font-normal" variant="outline">
              Our Features
            </Badge>
          </MotionPreset>
          <MotionPreset
            component="h2"
            className="text-2xl font-medium md:text-3xl lg:text-4xl font-serif text-black dark:text-white"
            fade
            blur
            slide={{ direction: 'up', offset: 50 }}
            delay={0.3}
            transition={{ duration: 0.5 }}
          >
            Offer your clients a better retainer experience, scale your agency
          </MotionPreset>
          <MotionPreset
            component="p"
            className="text-muted-foreground text-base max-w-xl mx-auto font-sans"
            fade
            blur
            slide={{ direction: 'up', offset: 50 }}
            delay={0.5}
            transition={{ duration: 0.5 }}
          >
            Using technology to make finance simpler, smarter and more rewarding.
          </MotionPreset>
        </div>

        <div ref={containerRef} className="relative flex w-full flex-col items-center gap-18">
          {/* Mobile Shadcn Hub Badge */}
          <MotionPreset
            fade
            blur
            delay={0.05}
            transition={{ duration: 0.5 }}
            className="animate-heartbeat bg-primary z-1 flex h-14.5 w-fit items-center gap-4 rounded-full px-3.5 text-2xl font-medium text-white shadow-2xl [--heartbeat-color:var(--primary)] lg:hidden dark:text-black"
          >
            <div className="bg-primary flex size-10 items-center justify-center rounded-full border-2 border-white dark:border-black">
              <LogoVector className="size-16 text-white dark:text-black" />
            </div>
            Shadcn
          </MotionPreset>

          <div className="relative flex w-full items-center justify-center max-lg:flex-wrap max-lg:gap-6 lg:justify-between">
            {/* Left side column: Stripe, Filament */}
            <div className="flex gap-6 lg:flex-col lg:gap-18">
              <MotionPreset
                fade
                blur
                delay={0.05}
                transition={{ duration: 0.5 }}
                ref={div2Ref}
                className="bg-background flex h-11 w-fit items-center gap-2 rounded-md border px-2 text-lg shadow-sm"
              >
                <img
                  src="https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/features/image-22.png"
                  alt="Stripe"
                  className="relative size-6.5 rounded-md object-cover"
                />
                Stripe
              </MotionPreset>

              <MotionPreset
                fade
                blur
                delay={0.05}
                transition={{ duration: 0.5 }}
                ref={div3Ref}
                className="bg-background flex h-11 w-fit items-center gap-2 rounded-md border px-2 text-lg shadow-sm"
              >
                <img
                  src="https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/features/image-21.png"
                  alt="Filament"
                  className="relative size-6.5 rounded-md object-cover"
                />
                Filament
              </MotionPreset>
            </div>

            {/* Left spans for beams */}
            <div className="flex flex-col gap-14 max-lg:hidden">
              <span ref={span1Ref} className="size-0.5" />
              <span ref={span2Ref} className="size-0.5" />
              <span ref={span3Ref} className="size-0.5" />
            </div>

            {/* Center Node (Desktop) */}
            <MotionPreset
              fade
              blur
              delay={0.05}
              transition={{ duration: 0.5 }}
              ref={div1Ref}
              className="animate-heartbeat bg-primary z-1 flex h-14.5 w-fit items-center gap-4 rounded-full px-3.5 text-2xl font-medium text-white shadow-2xl [--heartbeat-color:var(--primary)] max-lg:hidden dark:text-black"
            >
              <div className="bg-primary flex size-10 items-center justify-center rounded-full border-2 border-white dark:border-black">
                <LogoVector className="size-16 text-white dark:text-black" />
              </div>
              Shadcn
            </MotionPreset>

            {/* Right spans for beams */}
            <div className="flex flex-col gap-14 max-lg:hidden">
              <span ref={span4Ref} className="size-0.5" />
              <span ref={span5Ref} className="size-0.5" />
              <span ref={span6Ref} className="size-0.5" />
            </div>

            {/* Right side column: Supabase, UserAuth */}
            <div className="flex gap-6 lg:flex-col lg:gap-18">
              <MotionPreset
                fade
                blur
                delay={0.05}
                transition={{ duration: 0.5 }}
                ref={div4Ref}
                className="bg-background flex h-11 w-fit items-center gap-2 rounded-md border px-2 text-lg shadow-sm"
              >
                <img
                  src="https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/features/image-19.png"
                  alt="Supabase"
                  className="relative size-6.5 rounded-md object-cover"
                />
                Supabase
              </MotionPreset>

              <MotionPreset
                fade
                blur
                delay={0.05}
                transition={{ duration: 0.5 }}
                ref={div5Ref}
                className="bg-background flex h-11 w-fit items-center gap-2 rounded-md border px-2 text-lg shadow-sm"
              >
                <img
                  src="https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/features/image-20.png"
                  alt="User"
                  className="relative size-6.5 rounded-md object-cover"
                />
                UserAuth
              </MotionPreset>
            </div>
          </div>

          {/* Animated Beams connecting nodes */}
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={div1Ref}
            toRef={span2Ref}
            gradientStartColor="var(--primary)"
            duration={4.5}
            className="-z-1 max-lg:hidden"
            reverse
          />
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={div1Ref}
            toRef={span5Ref}
            gradientStartColor="var(--primary)"
            duration={4.5}
            className="-z-1 max-lg:hidden"
          />
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={span2Ref}
            toRef={span1Ref}
            gradientStartColor="var(--primary)"
            duration={4.5}
            className="-z-1 max-lg:hidden"
            reverse
          />
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={span1Ref}
            toRef={div2Ref}
            gradientStartColor="var(--primary)"
            duration={4.5}
            className="-z-1 max-lg:hidden"
            reverse
          />
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={span2Ref}
            toRef={span3Ref}
            gradientStartColor="var(--primary)"
            duration={4.5}
            className="-z-1 max-lg:hidden"
            reverse
          />
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={span3Ref}
            toRef={div3Ref}
            gradientStartColor="var(--primary)"
            duration={4.5}
            className="-z-1 max-lg:hidden"
            reverse
          />
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={span5Ref}
            toRef={span4Ref}
            gradientStartColor="var(--primary)"
            duration={4.5}
            className="-z-1 max-lg:hidden"
          />
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={span4Ref}
            toRef={div4Ref}
            gradientStartColor="var(--primary)"
            duration={4.5}
            className="-z-1 max-lg:hidden"
          />
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={span5Ref}
            toRef={span6Ref}
            gradientStartColor="var(--primary)"
            duration={4.5}
            className="-z-1 max-lg:hidden"
          />
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={span6Ref}
            toRef={div5Ref}
            gradientStartColor="var(--primary)"
            duration={4.5}
            className="-z-1 max-lg:hidden"
          />
        </div>
      </div>
    </section>
  )
}

export default Features
