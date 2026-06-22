'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Check, HelpCircle, Info, ShieldCheck, Zap, Sparkles, Globe, Building2, ChevronDown, Plus, Minus, BookOpen } from 'lucide-react'
import Header from '@/components/shadcn-studio/blocks/hero-section-40/header'
import Footer from '@/components/shadcn-studio/blocks/footer/footer'
import type { Navigation } from '@/components/shadcn-studio/blocks/hero-section-40/hero-navigation'

const navigationData: Navigation[] = [
  {
    title: 'Features',
    href: '/#features'
  },
  {
    title: 'Use cases',
    contentClassName: '!w-141 grid-cols-2',
    splitItems: true,
    items: [
      {
        type: 'section',
        title: 'Sales & Customer Operations',
        items: [
          {
            title: 'Pipeline Management',
            href: '/#features',
            description: 'Track movement, update statuses, and flag stalled deals.',
            icon: <BookOpen className='size-4' />
          },
          {
            title: 'Customer Onboarding',
            href: '/#features',
            description: 'Automate welcome emails, account setup, and key guidance.',
            icon: <BookOpen className='size-4' />
          },
          {
            title: 'Support Escalations',
            href: '/#features',
            description: 'Detect urgency and route issues to the right team faster.',
            icon: <BookOpen className='size-4' />
          }
        ]
      },
      {
        type: 'section',
        title: 'Internal Productivity Workflows',
        items: [
          {
            title: 'Knowledge Retrieval',
            href: '/#features',
            description: 'Ask AI and get instant answers from your tools/docs.',
            icon: <BookOpen className='size-4' />
          },
          {
            title: 'Task Automation',
            href: '/#features',
            description: 'Convert messages into tasks and assign them automatically.',
            icon: <BookOpen className='size-4' />
          },
          {
            title: 'Data Cleanup',
            href: '/#features',
            description: 'Auto-correct entries, remove duplicates, sync records.',
            icon: <BookOpen className='size-4' />
          }
        ]
      }
    ]
  },
  {
    title: 'Testimonials',
    href: '/#testimonials'
  },
  {
    title: 'Pricing',
    href: '/pricing'
  }
]

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly')
  const [currency, setCurrency] = useState<'INR' | 'USD'>('INR')
  
  // FAQ Collapsible States
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index)
  }

  // Pricing Data Config
  const pricingData = {
    Starter: {
      desc: 'Best for Small businesses and solo operators',
      price: {
        INR: { monthly: 1999, annual: 1599 },
        USD: { monthly: 25, annual: 20 }
      },
      features: [
        '1 WhatsApp number',
        'Up to 3 agents',
        'Basic chatbot (5 flows)',
        'Bulk campaigns',
        'Shopify integration',
        'Standard support'
      ]
    },
    Growth: {
      desc: 'Best for Growing SMBs and D2C brands',
      price: {
        INR: { monthly: 4999, annual: 3999 },
        USD: { monthly: 65, annual: 52 }
      },
      features: [
        '1 WhatsApp number',
        'Unlimited agents',
        'Advanced chatbot (unlimited flows)',
        'Bulk campaigns + segmentation',
        'All integrations (100+)',
        'WhatsApp Commerce',
        'Campaign analytics',
        'Priority support + onboarding'
      ],
      popular: true
    },
    Business: {
      desc: 'Best for Established businesses with high volume',
      price: {
        INR: { monthly: 14999, annual: 11999 },
        USD: { monthly: 199, annual: 159 }
      },
      features: [
        '3 WhatsApp numbers',
        'Unlimited agents',
        'AI chatbot with NLU',
        'Advanced automation workflows',
        'Full CRM integrations',
        'WhatsApp Commerce + analytics',
        'Green Tick application support',
        'Dedicated account manager'
      ]
    }
  }

  const formatPrice = (value: number) => {
    if (currency === 'INR') {
      return `₹${value.toLocaleString('en-IN')}`
    }
    return `$${value}`
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#ECEBE9] text-black">
      {/* Header */}
      <Header navigationData={navigationData} />

      {/* Hero Header */}
      <section className="px-4 sm:px-6 lg:px-8 border-b border-[#C5C4C2]">
        <div className="mx-auto max-w-7xl border-x border-[#C5C4C2] px-4 sm:px-6 lg:px-8 py-12 sm:py-20 text-center space-y-6">
          <span className="inline-block px-3 py-1 text-xs font-bold text-[#00b259] border border-[#00b259] bg-[#00b259]/10 font-mono tracking-wider">
            :: FLAT RATE FEES ::
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-medium font-serif tracking-tight leading-none text-black">
            Simple pricing. No surprises. No markups.
          </h1>
          <p className="text-neutral-500 max-w-3xl mx-auto text-sm sm:text-base font-mono">
            One flat monthly fee based on your plan. WhatsApp conversation charges billed at Meta's official rates — we don't mark them up. What you see is what you pay.
          </p>

          {/* Interactive Controls Switch */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-6 font-mono">
            
            {/* Currency switch */}
            <div className="flex items-center border border-[#C5C4C2] p-1 bg-[#ECEBE9] select-none">
              <button 
                onClick={() => setCurrency('INR')}
                className={`px-4 py-1.5 text-xs font-bold cursor-pointer transition-colors ${currency === 'INR' ? 'bg-black text-[#ECEBE9]' : 'text-neutral-500 hover:text-black'}`}
              >
                INR (₹)
              </button>
              <button 
                onClick={() => setCurrency('USD')}
                className={`px-4 py-1.5 text-xs font-bold cursor-pointer transition-colors ${currency === 'USD' ? 'bg-black text-[#ECEBE9]' : 'text-neutral-500 hover:text-black'}`}
              >
                USD ($)
              </button>
            </div>

            {/* Billing Cycle Switch */}
            <div className="flex items-center gap-3">
              <span className={`text-xs font-bold ${billingCycle === 'monthly' ? 'text-black' : 'text-neutral-500'}`}>Monthly</span>
              <button 
                onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'annual' : 'monthly')}
                className="w-12 h-6 border border-[#C5C4C2] bg-white rounded-none relative transition-colors focus:outline-none"
              >
                <div 
                  className="w-4 h-4 bg-[#00b259] absolute top-1/2 -translate-y-1/2 transition-all duration-300"
                  style={{ left: billingCycle === 'annual' ? '26px' : '4px' }}
                />
              </button>
              <span className={`text-xs font-bold flex items-center gap-1.5 ${billingCycle === 'annual' ? 'text-black' : 'text-neutral-500'}`}>
                Annually <span className="px-1.5 py-0.5 text-[9px] bg-[#00b259]/10 border border-[#00b259]/30 text-[#00b259] font-bold">SAVE 20%</span>
              </span>
            </div>

          </div>
        </div>
      </section>

      {/* Principles Section */}
      <section className="px-4 sm:px-6 lg:px-8 border-b border-[#C5C4C2] bg-[#ECEBE9]/30">
        <div className="mx-auto max-w-7xl border-x border-[#C5C4C2] px-4 sm:px-6 lg:px-8 py-8 sm:py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Principle 1 */}
            <div className="border border-[#C5C4C2] bg-[#ECEBE9] p-6 font-mono space-y-3 relative"
              style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 10px 100%, 0 calc(100% - 10px))' }}
            >
              <span className="absolute top-2 right-2 text-xs font-bold text-[#00b259]">[ 01 ]</span>
              <h3 className="text-sm font-black text-black">NO HIDDEN FEES</h3>
              <p className="text-xs text-neutral-500 leading-relaxed font-sans">
                No per-agent charges. No setup fees. No overage surprises. Access features fully within your plan.
              </p>
            </div>

            {/* Principle 2 */}
            <div className="border border-[#C5C4C2] bg-[#ECEBE9] p-6 font-mono space-y-3 relative"
              style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 10px 100%, 0 calc(100% - 10px))' }}
            >
              <span className="absolute top-2 right-2 text-xs font-bold text-[#00b259]">[ 02 ]</span>
              <h3 className="text-sm font-black text-black">META RATES, NO MARKUP</h3>
              <p className="text-xs text-neutral-500 leading-relaxed font-sans">
                Meta conversation charges are billed directly at official Rates. We have absolute zero markup on conversation charges.
              </p>
            </div>

            {/* Principle 3 */}
            <div className="border border-[#C5C4C2] bg-[#ECEBE9] p-6 font-mono space-y-3 relative"
              style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 10px 100%, 0 calc(100% - 10px))' }}
            >
              <span className="absolute top-2 right-2 text-xs font-bold text-[#00b259]">[ 03 ]</span>
              <h3 className="text-sm font-black text-black">MONTH-TO-MONTH</h3>
              <p className="text-xs text-neutral-500 leading-relaxed font-sans">
                No annual contract required to get started. Cancel or change plans anytime directly from your billing tab.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Plans Section */}
      <section className="px-4 sm:px-6 lg:px-8 border-b border-[#C5C4C2] bg-[#ECEBE9]/50">
        <div className="mx-auto max-w-7xl border-x border-[#C5C4C2] px-4 sm:px-6 lg:px-8 py-12 sm:py-24 space-y-12">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Starter Plan */}
            <div 
              className="border border-[#C5C4C2] bg-[#ECEBE9] flex flex-col group relative"
              style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 12px 100%, 0 calc(100% - 12px))' }}
            >
              <div className="p-6 border-b border-[#C5C4C2] space-y-4 font-mono">
                <h3 className="text-lg font-black text-black">STARTER</h3>
                <p className="text-[10px] text-neutral-400 leading-snug font-sans h-8">{pricingData.Starter.desc}</p>
                <div className="pt-2">
                  <span className="text-3xl font-black text-black">
                    {formatPrice(pricingData.Starter.price[currency][billingCycle])}
                  </span>
                  <span className="text-xs text-neutral-400">/mo</span>
                </div>
              </div>
              <div className="p-6 flex-grow flex flex-col justify-between gap-6 font-mono">
                <ul className="space-y-3 font-sans text-xs text-neutral-600">
                  {pricingData.Starter.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="size-4 text-[#00b259] shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link 
                  href="#demo"
                  className="w-full text-center py-2.5 text-xs font-black text-black border border-black hover:bg-black hover:text-[#ECEBE9] transition-all"
                  style={{ clipPath: 'polygon(6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%, 0 6px)' }}
                >
                  START FREE TRIAL
                </Link>
              </div>
            </div>

            {/* Growth Plan - Most Popular */}
            <div 
              className="border-2 border-[#00b259] bg-[#ECEBE9] flex flex-col group relative"
              style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 12px 100%, 0 calc(100% - 12px))' }}
            >
              <span className="absolute -top-3.5 left-6 px-3 py-0.5 text-[9px] font-bold text-white bg-[#00b259] font-mono tracking-widest uppercase">
                MOST POPULAR
              </span>
              <div className="p-6 border-b border-[#C5C4C2] space-y-4 font-mono">
                <h3 className="text-lg font-black text-black flex items-center gap-1.5">
                  GROWTH <Sparkles className="size-4.5 text-[#00b259]" />
                </h3>
                <p className="text-[10px] text-neutral-400 leading-snug font-sans h-8">{pricingData.Growth.desc}</p>
                <div className="pt-2">
                  <span className="text-3xl font-black text-black">
                    {formatPrice(pricingData.Growth.price[currency][billingCycle])}
                  </span>
                  <span className="text-xs text-neutral-400">/mo</span>
                </div>
              </div>
              <div className="p-6 flex-grow flex flex-col justify-between gap-6 font-mono">
                <ul className="space-y-3 font-sans text-xs text-neutral-600">
                  {pricingData.Growth.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="size-4 text-[#00b259] shrink-0 mt-0.5" />
                      <span className="font-medium text-neutral-800">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link 
                  href="#demo"
                  className="w-full text-center py-2.5 text-xs font-black text-white bg-gradient-to-r from-[#00b259] to-[#005c2b] hover:opacity-95 transition-opacity"
                  style={{ clipPath: 'polygon(6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%, 0 6px)' }}
                >
                  START FREE TRIAL
                </Link>
              </div>
            </div>

            {/* Business Plan */}
            <div 
              className="border border-[#C5C4C2] bg-[#ECEBE9] flex flex-col group relative"
              style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 12px 100%, 0 calc(100% - 12px))' }}
            >
              <div className="p-6 border-b border-[#C5C4C2] space-y-4 font-mono">
                <h3 className="text-lg font-black text-black">BUSINESS</h3>
                <p className="text-[10px] text-neutral-400 leading-snug font-sans h-8">{pricingData.Business.desc}</p>
                <div className="pt-2">
                  <span className="text-3xl font-black text-black">
                    {formatPrice(pricingData.Business.price[currency][billingCycle])}
                  </span>
                  <span className="text-xs text-neutral-400">/mo</span>
                </div>
              </div>
              <div className="p-6 flex-grow flex flex-col justify-between gap-6 font-mono">
                <ul className="space-y-3 font-sans text-xs text-neutral-600">
                  {pricingData.Business.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="size-4 text-[#00b259] shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link 
                  href="#demo"
                  className="w-full text-center py-2.5 text-xs font-black text-black border border-black hover:bg-black hover:text-[#ECEBE9] transition-all"
                  style={{ clipPath: 'polygon(6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%, 0 6px)' }}
                >
                  START FREE TRIAL
                </Link>
              </div>
            </div>

            {/* Enterprise Plan */}
            <div 
              className="border border-[#C5C4C2] bg-[#ECEBE9] flex flex-col group relative"
              style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 12px 100%, 0 calc(100% - 12px))' }}
            >
              <div className="p-6 border-b border-[#C5C4C2] space-y-4 font-mono">
                <h3 className="text-lg font-black text-black">ENTERPRISE</h3>
                <p className="text-[10px] text-neutral-400 leading-snug font-sans h-8">Best for Large teams, agencies, and multi-brand operations</p>
                <div className="pt-2">
                  <span className="text-3xl font-black text-black uppercase">
                    Custom
                  </span>
                  <span className="text-xs text-neutral-400">/mo</span>
                </div>
              </div>
              <div className="p-6 flex-grow flex flex-col justify-between gap-6 font-mono">
                <ul className="space-y-3 font-sans text-xs text-neutral-600">
                  <li className="flex items-start gap-2"><Check className="size-4 text-[#00b259] shrink-0 mt-0.5" /> <span>Unlimited numbers</span></li>
                  <li className="flex items-start gap-2"><Check className="size-4 text-[#00b259] shrink-0 mt-0.5" /> <span>Unlimited agents</span></li>
                  <li className="flex items-start gap-2"><Check className="size-4 text-[#00b259] shrink-0 mt-0.5" /> <span>Custom AI chatbot</span></li>
                  <li className="flex items-start gap-2"><Check className="size-4 text-[#00b259] shrink-0 mt-0.5" /> <span>Advanced automation + custom API</span></li>
                  <li className="flex items-start gap-2"><Check className="size-4 text-[#00b259] shrink-0 mt-0.5" /> <span>White-label reporting (agencies)</span></li>
                  <li className="flex items-start gap-2"><Check className="size-4 text-[#00b259] shrink-0 mt-0.5" /> <span>SSO + role-based access + SLA</span></li>
                  <li className="flex items-start gap-2"><Check className="size-4 text-[#00b259] shrink-0 mt-0.5" /> <span>Custom onboarding program</span></li>
                </ul>
                <Link 
                  href="#demo"
                  className="w-full text-center py-2.5 text-xs font-black text-white bg-black hover:bg-neutral-800 transition-colors"
                  style={{ clipPath: 'polygon(6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%, 0 6px)' }}
                >
                  TALK TO SALES
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Meta Conversation Charges */}
      <section className="px-4 sm:px-6 lg:px-8 border-b border-[#C5C4C2] bg-[#ECEBE9]/30 pb-16 sm:pb-24">
        <div className="mx-auto max-w-7xl border-x border-[#C5C4C2] px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-12">
          
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <span className="inline-block px-2.5 py-0.5 text-[10px] font-bold text-[#00b259] border border-[#00b259]/30 bg-[#00b259]/5 font-mono">
              :: META CONVERSATION FEES ::
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-medium text-black">
              How WhatsApp conversation charges work.
            </h2>
            <p className="text-neutral-500 font-mono text-xs sm:text-sm leading-relaxed">
              Meta charges per 24-hour conversation window, not per message. Rates vary by conversation category. AIGreenTick charges Meta's official rates with <strong>zero markup.</strong>
            </p>
          </div>

          {/* Grid Layout of table and info cards */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 font-mono">
            <div 
              className="lg:col-span-8 border border-[#C5C4C2] bg-[#ECEBE9] overflow-hidden"
              style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 12px 100%, 0 calc(100% - 12px))' }}
            >
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs min-w-[500px]">
                  <thead>
                    <tr className="bg-black text-[#ECEBE9] border-b border-[#C5C4C2] text-[10px] tracking-wider uppercase font-bold">
                      <th className="p-4 sm:p-5">Category</th>
                      <th className="p-4 sm:p-5">Description</th>
                      <th className="p-4 sm:p-5 text-right">Typical Rate (India)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#C5C4C2]/50 text-neutral-800">
                    <tr className="hover:bg-white/30 transition-colors">
                      <td className="p-4 font-bold text-black flex items-center gap-1.5">
                        <span className="size-2 bg-red-500 rounded-full" /> Marketing
                      </td>
                      <td className="p-4 font-sans text-neutral-500">Promotional messages you initiate (offers, newsletters)</td>
                      <td className="p-4 text-right font-bold text-black">See Meta pricing</td>
                    </tr>
                    <tr className="hover:bg-white/30 transition-colors">
                      <td className="p-4 font-bold text-black flex items-center gap-1.5">
                        <span className="size-2 bg-blue-500 rounded-full" /> Utility
                      </td>
                      <td className="p-4 font-sans text-neutral-500">Transactional messages (orders, confirmations, shipping alerts)</td>
                      <td className="p-4 text-right font-bold text-black">See Meta pricing</td>
                    </tr>
                    <tr className="hover:bg-white/30 transition-colors">
                      <td className="p-4 font-bold text-black flex items-center gap-1.5">
                        <span className="size-2 bg-yellow-500 rounded-full" /> Authentication
                      </td>
                      <td className="p-4 font-sans text-neutral-500">Secure OTPs, verifications and login alerts</td>
                      <td className="p-4 text-right font-bold text-black">See Meta pricing</td>
                    </tr>
                    <tr className="hover:bg-white/30 transition-colors">
                      <td className="p-4 font-bold text-black flex items-center gap-1.5">
                        <span className="size-2 bg-[#00b259] rounded-full" /> Service
                      </td>
                      <td className="p-4 font-sans text-neutral-500">Customer-initiated inquiries and direct support chats</td>
                      <td className="p-4 text-right font-bold text-[#00b259]">Free (within 24hr window)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div 
              className="lg:col-span-4 border border-[#C5C4C2] bg-[#ECEBE9] p-6 space-y-6 flex flex-col justify-between"
              style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 12px 100%, 0 calc(100% - 12px))' }}
            >
              <div className="space-y-4">
                <h4 className="text-xs font-black text-black">ZERO CONVERSATION MARKUP</h4>
                <p className="text-xs text-neutral-500 leading-relaxed font-sans">
                  Unlike competitors who charge extra commissions or bundle messages at markup rates, AIGreenTick offers transparent pass-through pricing. We bill exactly what Meta bills us.
                </p>
              </div>

              <div className="pt-4 border-t border-[#C5C4C2]/40">
                <a 
                  href="https://developers.facebook.com/docs/whatsapp/pricing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[10px] font-bold text-[#00b259] hover:underline"
                >
                  VIEW OFFICIAL META RATE CARD -&gt;
                </a>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Competitor Matrix Section */}
      <section id="comparison-matrix" className="px-4 sm:px-6 lg:px-8 border-b border-[#C5C4C2] bg-[#ECEBE9]/50">
        <div className="mx-auto max-w-7xl border-x border-[#C5C4C2] px-4 sm:px-6 lg:px-8 py-12 sm:py-24 space-y-12">
          
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <span className="inline-block px-2.5 py-0.5 text-[10px] font-bold text-[#00b259] border border-[#00b259]/30 bg-[#00b259]/5 font-mono">
              :: COMPARE CAPABILITIES ::
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-medium text-black">
              What you get vs what competitors charge.
            </h2>
            <p className="text-neutral-500 font-mono text-xs sm:text-sm leading-relaxed">
              Before choosing a WhatsApp platform, check the fine print. See how AIGreenTick eliminates billing barriers.
            </p>
          </div>

          {/* Matrix Table */}
          <div 
            className="border border-[#C5C4C2] bg-[#ECEBE9] overflow-hidden font-mono"
            style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 12px 100%, 0 calc(100% - 12px))' }}
          >
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs min-w-[700px]">
                <thead>
                  <tr className="bg-black text-[#ECEBE9] border-b border-[#C5C4C2] text-[10px] tracking-wider uppercase font-bold">
                    <th className="p-4 sm:p-5">Feature</th>
                    <th className="p-4 sm:p-5 text-neutral-400">AiSensy</th>
                    <th className="p-4 sm:p-5 text-neutral-400">WATI</th>
                    <th className="p-4 sm:p-5 text-neutral-400">Interakt</th>
                    <th className="p-4 sm:p-5 text-[#00b259] font-black">AIGreenTick</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#C5C4C2]/50 text-neutral-800">
                  <tr className="hover:bg-white/30 transition-colors">
                    <td className="p-4 font-bold text-black">Unlimited agents</td>
                    <td className="p-4 font-sans text-neutral-500">Extra (Per User charges)</td>
                    <td className="p-4 font-sans text-neutral-500">Extra (Per User charges)</td>
                    <td className="p-4 font-sans text-neutral-500">Extra (Per User charges)</td>
                    <td className="p-4 font-bold text-[#00b259] bg-[#00b259]/5">Included (All Plans)</td>
                  </tr>
                  <tr className="hover:bg-white/30 transition-colors">
                    <td className="p-4 font-bold text-black">AI chatbot</td>
                    <td className="p-4 font-sans text-neutral-500">Extra add-on pricing</td>
                    <td className="p-4 font-sans text-neutral-500">Extra add-on pricing</td>
                    <td className="p-4 font-sans text-neutral-500">Basic Flows only</td>
                    <td className="p-4 font-bold text-[#00b259] bg-[#00b259]/5">All plans (No add-ons)</td>
                  </tr>
                  <tr className="hover:bg-white/30 transition-colors">
                    <td className="p-4 font-bold text-black">WhatsApp Commerce</td>
                    <td className="p-4 text-red-500 font-sans">✕ Not available</td>
                    <td className="p-4 text-red-500 font-sans">✕ Not available</td>
                    <td className="p-4 text-red-500 font-sans">✕ Not available</td>
                    <td className="p-4 font-bold text-[#00b259] bg-[#00b259]/5">✓ Included fully</td>
                  </tr>
                  <tr className="hover:bg-white/30 transition-colors">
                    <td className="p-4 font-bold text-black">Green Tick managed</td>
                    <td className="p-4 text-red-500 font-sans">✕ Pay setup fees</td>
                    <td className="p-4 text-red-500 font-sans">✕ Pay setup fees</td>
                    <td className="p-4 text-red-500 font-sans">✕ Pay setup fees</td>
                    <td className="p-4 font-bold text-[#00b259] bg-[#00b259]/5">✓ Managed free</td>
                  </tr>
                  <tr className="hover:bg-white/30 transition-colors">
                    <td className="p-4 font-bold text-black">India-based support</td>
                    <td className="p-4 text-red-500 font-sans">✕ Ticket queues only</td>
                    <td className="p-4 text-red-500 font-sans">✕ Ticket queues only</td>
                    <td className="p-4 font-sans text-neutral-500">Limited support hours</td>
                    <td className="p-4 font-bold text-[#00b259] bg-[#00b259]/5">✓ 24/7 Phone + Chat</td>
                  </tr>
                  <tr className="hover:bg-white/30 transition-colors">
                    <td className="p-4 font-bold text-black">Meta rate markup</td>
                    <td className="p-4 font-sans text-neutral-500">Yes (up to 15%)</td>
                    <td className="p-4 font-sans text-neutral-500">Yes (up to 20%)</td>
                    <td className="p-4 font-sans text-neutral-500">Yes (up to 10%)</td>
                    <td className="p-4 font-bold text-[#00b259] bg-[#00b259]/5">None (0% markup)</td>
                  </tr>
                  <tr className="hover:bg-white/30 transition-colors">
                    <td className="p-4 font-bold text-black">Free onboarding</td>
                    <td className="p-4 text-red-500 font-sans">✕ Paid setup support</td>
                    <td className="p-4 text-red-500 font-sans">✕ Paid setup support</td>
                    <td className="p-4 text-red-500 font-sans">✕ Paid setup support</td>
                    <td className="p-4 font-bold text-[#00b259] bg-[#00b259]/5">✓ Included free</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </section>

      {/* FAQ Section */}
      <section className="px-4 sm:px-6 lg:px-8 border-b border-[#C5C4C2] bg-[#ECEBE9]/30 pb-16 sm:pb-24">
        <div className="mx-auto max-w-3xl border-x border-[#C5C4C2] px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-10">
          
          <div className="text-center space-y-4">
            <span className="inline-block px-2.5 py-0.5 text-[10px] font-bold text-[#00b259] border border-[#00b259]/30 bg-[#00b259]/5 font-mono">
              :: QUESTIONS & ANSWERS ::
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-medium text-black">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4 font-mono">
            {[
              {
                q: 'Is there a free trial?',
                a: 'Yes. We offer a 14-day free trial on all Starter, Growth, and Business plans with full platform access. No credit card details are required to sign up.'
              },
              {
                q: 'Do you charge per agent?',
                a: 'No. AIGreenTick does not charge per agent. All plans include unlimited agent seats (except for the Starter tier, which is capped at 3 agents) so your entire support and sales teams can collaborate.'
              },
              {
                q: 'What happens if I exceed my plan\'s conversation limits?',
                a: 'There are no surprise charges. If you exceed the direct thresholds, extra conversation windows are billed directly at Meta\'s official rates. We never charge overage fees or platform penalty rates.'
              },
              {
                q: 'Can I change plans mid-month?',
                a: 'Yes. Upgrades take effect immediately and are pro-rated. Downgrades take effect at the start of your next billing cycle, ensuring you get full access to what you paid for.'
              },
              {
                q: 'Is there a discount for annual billing?',
                a: 'Yes. If you choose annual billing, we offer a significant 20% discount across all Starter, Growth, and Business plans, which is billed annually.'
              }
            ].map((faq, idx) => (
              <div 
                key={idx}
                className="border border-[#C5C4C2] bg-[#ECEBE9] overflow-hidden"
                style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 6px 100%, 0 calc(100% - 6px))' }}
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full text-left px-5 py-4 flex items-center justify-between text-xs font-bold text-black hover:bg-white/20 transition-all select-none cursor-pointer"
                >
                  <span>Q: {faq.q}</span>
                  <ChevronDown className={`size-4 text-[#00b259] transition-transform duration-300 ${openFaq === idx ? 'rotate-180' : ''}`} />
                </button>
                <div 
                  className={`px-5 font-sans text-xs text-neutral-600 border-t border-[#C5C4C2]/30 bg-white/40 transition-all duration-300 overflow-hidden ${
                    openFaq === idx ? 'py-4 max-h-[200px] opacity-100' : 'max-h-0 py-0 opacity-0'
                  }`}
                >
                  <p className="leading-relaxed">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* CTA Footer Section */}
      <section className="px-4 sm:px-6 lg:px-8 bg-[#ECEBE9]">
        <div className="mx-auto max-w-7xl border-x border-[#C5C4C2] px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-serif font-medium text-black">
            Start free. Scale as you grow.
          </h2>
          <p className="text-neutral-500 font-mono text-xs sm:text-sm max-w-md mx-auto">
            Ready to unleash official WhatsApp API power? Sign up for your 14-day free trial now or schedule a consultation.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4 font-mono">
            <Link 
              href="#demo"
              className="px-6 py-3 text-xs font-black text-white bg-gradient-to-r from-[#00b259] to-[#005c2b] hover:opacity-90 transition-opacity"
              style={{ clipPath: 'polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)' }}
            >
              START 14-DAY FREE TRIAL
            </Link>
            <Link 
              href="#demo"
              className="px-6 py-3 text-xs font-black text-black border border-[#C5C4C2] hover:bg-neutral-200/50 transition-colors"
              style={{ clipPath: 'polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)' }}
            >
              TALK TO SALES
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}
