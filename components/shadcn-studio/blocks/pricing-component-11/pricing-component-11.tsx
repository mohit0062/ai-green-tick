'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Check, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'

type PricingProps = {
  showHeaders?: boolean
}

const Pricing = ({ showHeaders = true }: PricingProps) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly')
  const [currency, setCurrency] = useState<'INR' | 'USD'>('INR')

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
    <section className="px-4 sm:px-6 lg:px-8 border-b border-[#C5C4C2] bg-[#ECEBE9]/50">
      <div className="mx-auto max-w-7xl border-x border-[#C5C4C2] px-4 sm:px-6 lg:px-8 py-12 sm:py-24 space-y-12">
        
        {showHeaders && (
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <span className="inline-block px-3 py-1 text-xs font-bold text-[#00b259] border border-[#00b259] bg-[#00b259]/10 font-mono tracking-wider">
              :: PRICING PLANS ::
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-medium text-black">
              Simple pricing. No surprises. No markups.
            </h2>
            <p className="text-neutral-500 font-mono text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
              Choose the best plan for your business. One flat platform fee plus official Meta conversation charges with zero markups.
            </p>
          </div>
        )}

        {/* Interactive Controls Switch */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-2 font-mono">
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

        {/* 4-Tier Grid */}
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
            <span className="absolute -top-3.5 left-6 px-3 py-0.5 text-[9px] font-bold text-white bg-[#00b259] font-mono tracking-widest uppercase z-10">
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
                <span className="text-3xl font-black text-black uppercase">Custom</span>
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
  )
}

export default Pricing
