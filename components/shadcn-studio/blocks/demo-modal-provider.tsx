'use client'

import { useState, useEffect } from 'react'
import { X, Calendar } from 'lucide-react'

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

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-[100] flex items-center justify-center p-4 animate-fade-in">
      <div 
        className="w-full max-w-4xl bg-[#ECEBE9] border border-[#C5C4C2] flex flex-col overflow-hidden relative shadow-2xl animate-scale-up"
        style={{ 
          clipPath: 'polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 12px 100%, 0 calc(100% - 12px))',
          height: 'min(700px, 90vh)'
        }}
      >
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-[#C5C4C2] flex items-center justify-between bg-white font-sans shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-[#00b259] font-bold">::</span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 flex items-center gap-1.5">
              <Calendar className="size-3.5 text-[#00b259]" /> Schedule Demo
            </span>
          </div>
          
          <button 
            onClick={() => setIsOpen(false)}
            className="p-1.5 hover:bg-neutral-100 border border-transparent hover:border-[#C5C4C2] transition-all text-neutral-500 hover:text-black cursor-pointer"
            style={{ clipPath: 'polygon(4px 0, 100% 0, 100% calc(100% - 4px), calc(100% - 4px) 100%, 0 100%, 0 4px)' }}
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Modal Body / Calendly Iframe */}
        <div className="flex-grow w-full bg-white relative">
          <iframe
            src="https://calendly.com/demo-apargoinnovations/30min?hide_landing_page_details=1&hide_gdpr_banner=1"
            width="100%"
            height="100%"
            frameBorder="0"
            className="w-full h-full"
            title="Schedule Calendly Session"
          />
        </div>
      </div>
    </div>
  )
}
