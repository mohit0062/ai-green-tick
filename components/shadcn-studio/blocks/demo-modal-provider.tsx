'use client'

import { useState, useEffect } from 'react'
import { X, Calendar } from 'lucide-react'

import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet'

export default function DemoModalProvider() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    // Intercept clicks on links that point to #demo
    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const anchor = target.closest('a')
      if (anchor) {
        const href = anchor.getAttribute('href')
        // Match #demo, /#demo, /blog#demo, etc.
        if (href === '#demo' || href === '/#demo' || href?.endsWith('#demo')) {
          e.preventDefault()
          setIsOpen(true)
        }
      }
    }

    // Monitor URL hash changes
    const checkHash = () => {
      if (window.location.hash === '#demo') {
        setIsOpen(true)
        // Clean up hash so it doesn't stay in the URL bar
        try {
          window.history.replaceState(
            null,
            '',
            window.location.pathname + window.location.search
          )
        } catch (err) {
          // Fallback if replaceState fails
        }
      }
    }

    document.addEventListener('click', handleGlobalClick)
    window.addEventListener('hashchange', checkHash)
    
    // Check hash on mount in case they loaded with #demo
    checkHash()

    return () => {
      document.removeEventListener('click', handleGlobalClick)
      window.removeEventListener('hashchange', checkHash)
    }
  }, [])

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent showCloseButton={false} side="right" className="fixed top-0 bottom-0 right-0 w-[95vw] sm:max-w-2xl bg-white border-l border-[#C5C4C2] p-0 font-sans flex flex-col h-full z-[9999]">
        <SheetTitle className="sr-only">Book a Demo</SheetTitle>
        {/* Modal Header */}
        <div className="px-6 py-4 flex items-center justify-end bg-white shrink-0">
          <button 
            onClick={() => setIsOpen(false)}
            className="p-1.5 hover:bg-neutral-100 border border-transparent hover:border-[#C5C4C2] transition-all text-neutral-500 hover:text-black cursor-pointer"
            style={{ clipPath: 'polygon(4px 0, 100% 0, 100% calc(100% - 4px), calc(100% - 4px) 100%, 0 100%, 0 4px)' }}
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Modal Body / Calendly Iframe */}
        <div className="flex-1 w-full bg-white relative overflow-hidden">
          <iframe
            src="https://calendly.com/demo-apargoinnovations/30min?hide_landing_page_details=1&hide_gdpr_banner=1"
            width="100%"
            height="100%"
            frameBorder="0"
            className="w-full h-full border-none"
            title="Schedule Calendly Session"
          />
        </div>
      </SheetContent>
    </Sheet>
  )
}
