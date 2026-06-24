'use client'

// Third-party Imports
import { motion } from 'motion/react'

// Component Imports
import { PrimaryGrowButton } from '@/components/ui/grow-button'
import { Button } from '@/components/ui/button'
import { MotionPreset } from '@/components/ui/motion-preset'
import GrowLogo from '@/assets/svg/grow-logo'
import LogoVector from '@/assets/svg/logo-vector'

const CTA = () => {
  const services = ['Broadcasts', 'Shared Inbox', 'AI Chatbots']

  return (
    <section className='border-b px-4 sm:px-6 lg:px-8 bg-muted relative z-1 overflow-hidden'>
      <div className='mx-auto max-w-7xl border-x px-4 sm:px-6 lg:px-8 border-[#C5C4C2] relative py-8 sm:py-16'>
        {/* Decorative Logo Cards */}
        <motion.div
          initial={{ opacity: 0, rotate: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, rotate: 8, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className='bg-accent absolute -top-10 left-4 -z-1 hidden size-46 rotate-[8deg] flex-col items-center justify-center gap-3 rounded-lg border-3 shadow-[inset_0_0_15px_color-mix(in_oklab,var(--primary)60%,transparent)] sm:left-8 lg:left-16 xl:flex'
        >
          <GrowLogo className='size-14' />
          <div className="flex flex-col items-center font-mono leading-none tracking-wider select-none text-center">
            <span className="text-xs font-black text-black dark:text-white">AI</span>
            <span className="text-[10px] font-bold text-[#00b259] uppercase tracking-widest mt-1">GREENTICK</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, rotate: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, rotate: 8, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className='bg-accent absolute -right-5 -bottom-[20%] -z-1 flex size-29 rotate-[8deg] flex-col items-center justify-center gap-3 rounded-lg border-3 shadow-[inset_0_0_15px_color-mix(in_oklab,var(--primary)60%,transparent)] md:size-46 lg:right-16 lg:-bottom-[25%]'
        >
          <GrowLogo className='size-7 md:size-14' />
          <div className="flex flex-col items-center font-mono leading-none tracking-wider select-none text-center">
            <span className="text-[8px] md:text-xs font-black text-black dark:text-white">AI</span>
            <span className="text-[6px] md:text-[10px] font-bold text-[#00b259] uppercase tracking-widest mt-1">GREENTICK</span>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className='space-y-8 text-center'>
          <div className='space-y-4'>
            <MotionPreset fade slide={{ direction: 'down', offset: 50 }} transition={{ duration: 0.7 }}>
              <h2 className='text-2xl font-bold md:text-3xl lg:text-4xl font-sans text-black dark:text-white leading-tight'>
                Ready to make WhatsApp your #1 channel?
              </h2>
            </MotionPreset>
            <MotionPreset fade slide={{ direction: 'down', offset: 50 }} delay={0.2} transition={{ duration: 0.7 }}>
              <p className='text-muted-foreground text-lg md:text-xl max-w-xl mx-auto'>
                Join the 500+ brands using AIGreentick to scale conversations and conversions.
              </p>
            </MotionPreset>
          </div>

          {/* Service Tags */}
          <MotionPreset fade slide={{ direction: 'down', offset: 30 }} delay={0.3} transition={{ duration: 0.7 }}>
            <div className='flex flex-wrap items-center justify-center gap-6'>
              {services.map(service => (
                <div
                  key={service}
                  className='border-border bg-primary/10 text-primary rounded-sm border px-2 py-0.5 text-xs font-medium font-mono'
                >
                  {service}
                </div>
              ))}
            </div>
          </MotionPreset>

          {/* CTA Buttons */}
          <MotionPreset fade slide={{ direction: 'down', offset: 30 }} delay={0.6} transition={{ duration: 0.7 }}>
            <div className='flex flex-wrap items-center justify-center gap-4'>
              <PrimaryGrowButton asChild className='gap-2 h-11 px-6 rounded-md font-sans text-sm font-semibold'>
                <a href='#'>
                  Start Free Trial <LogoVector className='size-6' />
                </a>
              </PrimaryGrowButton>
              <Button variant='outline' size='lg' asChild className='h-11 px-6 rounded-md font-sans text-sm font-semibold border-neutral-300 dark:border-neutral-700 bg-white hover:bg-neutral-50 transition-colors shadow-sm'>
                <a href='#'>
                  Talk to Sales
                </a>
              </Button>
            </div>
          </MotionPreset>
        </div>
      </div>
    </section>
  )
}

export default CTA
