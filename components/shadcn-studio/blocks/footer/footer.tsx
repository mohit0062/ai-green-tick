'use client'

import { Separator } from '@/components/ui/separator'

const Footer = () => {
  return (
    <footer className='px-4 sm:px-6 lg:px-8 bg-background border-b'>
      <div className='mx-auto max-w-7xl border-x px-4 sm:px-6 lg:px-8 border-[#C5C4C2] py-8 sm:py-12'>
        {/* Comparison Links */}
        <div className='flex flex-wrap items-center justify-center gap-x-2 gap-y-2 text-sm text-muted-foreground mb-8 text-center'>
          <span className='font-medium text-foreground'>Compare AI Greentick:</span>
          <a href='/pricing#comparison-matrix' className='hover:text-primary transition-colors'>vs Wati</a>
          <span className='text-muted-foreground/30'>|</span>
          <a href='/pricing#comparison-matrix' className='hover:text-primary transition-colors'>vs AiSensy</a>
          <span className='text-muted-foreground/30'>|</span>
          <a href='/pricing#comparison-matrix' className='hover:text-primary transition-colors'>vs DoubleTick</a>
          <span className='text-muted-foreground/30'>|</span>
          <a href='/pricing#comparison-matrix' className='hover:text-primary transition-colors'>vs Interakt</a>
          <span className='text-muted-foreground/30'>|</span>
          <a href='/pricing#comparison-matrix' className='hover:text-primary transition-colors'>vs Gallabox</a>
        </div>

        <Separator className='bg-border/60' />

        {/* Copyright and Legal Links */}
        <div className='flex flex-col md:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-muted-foreground mt-8 text-center md:text-left'>
          <div>
            © 2026 AI Greentick. All rights reserved. | Made with <span className='text-destructive'>❤️</span> in India
          </div>
          <div className='flex flex-wrap items-center justify-center gap-x-3 gap-y-2'>
            <a href='/pricing' className='hover:text-primary transition-colors font-medium'>Pricing</a>
            <span className='text-muted-foreground/30'>|</span>
            <a href='/industries' className='hover:text-primary transition-colors font-medium'>Industries</a>
            <span className='text-muted-foreground/30'>|</span>
            <a href='#' className='hover:text-primary transition-colors'>Privacy Policy</a>
            <span className='text-muted-foreground/30'>|</span>
            <a href='#' className='hover:text-primary transition-colors'>Terms of Service</a>
            <span className='text-muted-foreground/30'>|</span>
            <a href='#' className='hover:text-primary transition-colors'>Refund Policy</a>
            <span className='text-muted-foreground/30'>|</span>
            <a href='#' className='hover:text-primary transition-colors'>Cookie Policy</a>
            <span className='text-muted-foreground/30'>|</span>
            <a href='/#faq' className='hover:text-primary transition-colors'>Trust Center</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
