'use client'

import React from 'react'
import { ShieldCheck, Lock, Scale, Cloud, Activity } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface BadgeItem {
  title: string
  subtitle: string
  icon: React.ReactNode
  featured?: boolean
}

interface MetaAuthorizationProps {
  badge?: string
  heading?: string
  body?: string
}

const MetaAuthorization = ({
  badge = "META AUTHORIZATION",
  heading = "Officially authorized by Meta. Fully compliant.",
  body = "AIGreenTick is an authorized Meta Business Solution Provider (BSP) for the WhatsApp Business API. This means your business gets direct, compliant access to Meta's official infrastructure - the same API used by the world's largest enterprises, made accessible to businesses of every size."
}: MetaAuthorizationProps) => {
  
  const complianceBadges: BadgeItem[] = [
    {
      title: "Meta BSP",
      subtitle: "Authorized WhatsApp Solution Provider",
      icon: <ShieldCheck className="size-6 text-[#00b259]" />,
      featured: true
    },
    {
      title: "ISO 27001",
      subtitle: "Information Security Certified",
      icon: <Lock className="size-5 text-[#00b259]" />
    },
    {
      title: "DPDP Act Compliant",
      subtitle: "Indian Data Protection Standards",
      icon: <Scale className="size-5 text-[#00b259]" />
    },
    {
      title: "AWS Hosted",
      subtitle: "Secure Cloud Infrastructure",
      icon: <Cloud className="size-5 text-[#00b259]" />
    },
    {
      title: "99.9% Uptime SLA",
      subtitle: "Enterprise Grade Reliability",
      icon: <Activity className="size-5 text-[#00b259]" />
    }
  ]

  return (
    <section className="border-b px-4 sm:px-6 lg:px-8 bg-neutral-50 dark:bg-neutral-950">
      <div className="mx-auto max-w-7xl border-x px-4 sm:px-6 lg:px-8 border-[#C5C4C2] py-12 sm:py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Column - Content */}
          <div className="space-y-6">
            <span className="px-3 py-1 text-xs font-bold text-[#00b259] border border-[#00b259] bg-[#00b259]/10 font-mono inline-block w-fit">
              :: {badge} ::
            </span>
            <h2 className="text-3xl font-extrabold md:text-4xl font-sans text-neutral-900 dark:text-white leading-tight tracking-tight">
              {heading.split('. ').map((part, i) => (
                <span key={i} className={cn(i === 1 ? "text-[#00b259] block mt-1" : "text-neutral-900 dark:text-white")}>
                  {part}{i === 0 ? '.' : ''}
                </span>
              ))}
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 text-base sm:text-lg leading-relaxed font-sans max-w-xl">
              {body}
            </p>
          </div>

          {/* Right Column - Glowing Badges Grid */}
          <div className="grid grid-cols-2 gap-4 sm:gap-6">
            {complianceBadges.map((item, index) => (
              <Card
                key={index}
                className={cn(
                  "rounded-none border-[#C5C4C2] bg-white transition-all duration-300 group hover:border-[#00b259] hover:shadow-[0_0_15px_rgba(0,178,89,0.15)]",
                  item.featured ? "col-span-2 border-[#00b259]/50 bg-[#00b259]/5" : "col-span-1"
                )}
              >
                <CardContent className={cn("p-5 flex flex-col justify-between h-full", item.featured ? "sm:flex-row sm:items-center sm:gap-6" : "items-start")}>
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "flex items-center justify-center rounded-none border border-[#C5C4C2] bg-white",
                      item.featured ? "size-12 border-[#00b259]/30" : "size-10"
                    )}>
                      {item.icon}
                    </div>
                    <div>
                      <h4 className={cn("font-bold text-neutral-900 dark:text-white font-sans", item.featured ? "text-lg sm:text-xl" : "text-sm sm:text-base")}>
                        {item.title}
                      </h4>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400 font-sans mt-0.5">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}

export default MetaAuthorization
