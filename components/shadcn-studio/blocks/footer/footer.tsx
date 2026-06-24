'use client'

import { Separator } from '@/components/ui/separator'
import { Github, Instagram, Youtube } from 'lucide-react'
import { AiGreenTickLogo } from '@/components/shadcn-studio/blocks/hero-section-40/logo'

const Footer = () => {
  return (
    <footer className="w-full bg-white border-t border-[#C5C4C2] px-4 sm:px-6 lg:px-8 text-black font-sans">
      <div className="mx-auto max-w-7xl border-x border-[#C5C4C2] px-4 sm:px-6 lg:px-8 py-12 lg:py-16 space-y-12">
        {/* Main Grid */}
        <div className="grid grid-cols-12 gap-8">
          
          {/* Column 1: Brand details (4 cols) */}
          <div className="col-span-12 lg:col-span-4 space-y-6">
            <div className="flex items-center">
              <AiGreenTickLogo />
            </div>
            
            <p className="text-xs text-neutral-500 max-w-sm leading-relaxed">
              AI Greentick is an enterprise-grade WhatsApp Business API platform offering automated marketing campaigns, shared team inboxes, smart routing, and custom AI agents.
            </p>
            
            {/* Social Icons */}
            <div className="flex items-center gap-4 text-neutral-600">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#00b259] transition-colors">
                <Github className="size-4.5" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#E1306C] transition-colors">
                <Instagram className="size-4.5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#00b259] transition-colors">
                <svg className="size-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#FF0000] transition-colors">
                <Youtube className="size-4.5" />
              </a>
            </div>

            {/* Roadmap & Changelog */}
            <div className="space-y-2 pt-2 text-xs font-bold text-black flex flex-col">
              <a href="#roadmap" className="hover:text-[#00b259] transition-colors w-fit">Roadmap</a>
              <a href="#changelog" className="hover:text-[#00b259] transition-colors w-fit">Changelog</a>
            </div>
          </div>

          {/* Column 2: Product (3 cols) */}
          <div className="col-span-6 sm:col-span-4 lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-black">Product</h4>
            <ul className="space-y-2.5 text-xs text-neutral-500">
              <li><a href="/#features" className="hover:text-[#00b259] transition-colors">Features</a></li>
              <li><a href="/#features" className="hover:text-[#00b259] transition-colors">Broadcasts</a></li>
              <li><a href="/#features" className="hover:text-[#00b259] transition-colors">AI Chatbot</a></li>
              <li><a href="/#features" className="hover:text-[#00b259] transition-colors">Shared Inbox</a></li>
              <li><a href="/#features" className="hover:text-[#00b259] transition-colors">Campaigns</a></li>
              <li><a href="/#features" className="hover:text-[#00b259] transition-colors">Integrations</a></li>
              <li><a href="/pricing" className="hover:text-[#00b259] transition-colors">Pricing</a></li>
            </ul>
          </div>

          {/* Column 3: Company (3 cols) */}
          <div className="col-span-6 sm:col-span-4 lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-black">Company</h4>
            <ul className="space-y-2.5 text-xs text-neutral-500">
              <li><a href="/#about" className="hover:text-[#00b259] transition-colors">About Us</a></li>
              <li><a href="/industries" className="hover:text-[#00b259] transition-colors">Solutions</a></li>
              <li><a href="/#careers" className="hover:text-[#00b259] transition-colors">Careers</a></li>
              <li><a href="/#contact" className="hover:text-[#00b259] transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Column 4: Resources (2 cols) */}
          <div className="col-span-6 sm:col-span-4 lg:col-span-2 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-black">Resources</h4>
            <ul className="space-y-2.5 text-xs text-neutral-500">
              <li><a href="/blog" className="hover:text-[#00b259] transition-colors">Blog</a></li>
              <li><a href="/pricing#comparison-matrix" className="hover:text-[#00b259] transition-colors">Help Center</a></li>
            </ul>
          </div>

        </div>

        {/* Separator */}
        <Separator className="bg-[#C5C4C2]/40" />

        {/* Bottom Brands Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-2">
          <div className="text-xs font-semibold text-neutral-500">Our Products:</div>
          <div className="flex flex-wrap items-center gap-6">
            {/* ThemeSelection Checkmark Badge */}
            <div className="flex items-center gap-1.5 opacity-80 hover:opacity-100 transition-opacity">
              <svg className="h-4 w-auto" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 3L5.5 11.5L2 8" stroke="#5664F5" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="text-xs font-extrabold text-neutral-800 tracking-tight">ThemeSelection</span>
            </div>

            {/* PixInvent badge */}
            <div className="flex items-center gap-1.5 opacity-80 hover:opacity-100 transition-opacity">
              <svg className="h-4 w-auto" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="8" cy="8" r="5" fill="#F59E0B" />
              </svg>
              <span className="text-xs font-black text-neutral-800 tracking-wider">PIXINVENT</span>
            </div>

            {/* JetShip Boilerplates badge */}
            <div className="flex items-center gap-1.5 opacity-80 hover:opacity-100 transition-opacity">
              <svg className="h-4 w-auto" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C8 6 6 10 6 10L9 13L13 9C13 9 14 6 12 2Z" fill="#7C3AED" />
              </svg>
              <span className="text-xs font-bold text-neutral-800">JetShip Boilerplates</span>
            </div>
          </div>
        </div>

        {/* Separator 2 */}
        <Separator className="bg-[#C5C4C2]/40" />

        {/* Bottom Credits & Payment Badges */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 text-xs text-neutral-500">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <span>© 2026 AI Greentick, Made with <span className="text-red-500">❤️</span> for a better web.</span>
            <span className="hidden md:inline text-neutral-300">|</span>
            <div className="flex gap-4">
              <a href="#" className="hover:text-[#00b259] transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-[#00b259] transition-colors">Terms of Service</a>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center gap-4">
            {/* Secure Payment */}
            <div className="flex items-center gap-1 bg-[#F1F5F9] border border-[#E2E8F0] px-2 py-1 rounded-sm text-[10px] font-semibold text-neutral-700">
              <svg className="size-3.5 text-[#10B981]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span>Secure Payment</span>
            </div>

            {/* lemon squeezy */}
            <div className="flex items-center gap-1 text-[11px] font-bold text-neutral-700">
              <svg className="size-3 text-[#FFC72C]" fill="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="8" />
                <path d="M14 6C14 6 15 4 17 4C17 4 17 6 15 7C14 7.5 14 6 14 6Z" fill="#10B981" />
              </svg>
              <span>lemon squeezy</span>
            </div>

            {/* VISA */}
            <span className="text-[11px] font-extrabold italic text-[#1A1F71] tracking-wider select-none">VISA</span>

            {/* PayPal */}
            <span className="text-[11px] font-extrabold italic text-[#003087] tracking-tighter select-none">Pay<span className="text-[#0079C1]">Pal</span></span>

            {/* MasterCard */}
            <div className="flex items-center -space-x-1.5 select-none">
              <div className="size-3.5 rounded-full bg-[#EB001B] opacity-90" />
              <div className="size-3.5 rounded-full bg-[#F79E1B] opacity-90" />
            </div>
          </div>
        </div>

      </div>
    </footer>
  )
}

export default Footer
