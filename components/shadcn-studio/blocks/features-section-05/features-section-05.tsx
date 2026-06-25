import type { ReactElement } from 'react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowRightIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

type Features = {
  icon: ReactElement
  title: string
  description: string
}[]

interface FeaturesProps {
  badge?: string
  heading?: string
  featuresList: Features
}

const Features = ({
  badge = "SECURITY & COMPLIANCE",
  heading = "Enterprise-grade security from day one",
  featuresList
}: FeaturesProps) => {
  const isFour = featuresList.length === 4
  return (
    <section className='border-b px-4 sm:px-6 lg:px-8 bg-white dark:bg-neutral-900'>
      <div className='mx-auto max-w-7xl border-x px-4 sm:px-6 lg:px-8 border-[#C5C4C2] py-8 sm:py-16 lg:py-24'>
        {/* Header */}
        <div className='mx-auto mb-12 space-y-4 text-center sm:mb-16 lg:mb-24 flex flex-col items-center'>
          {badge && (
            <span className="px-3 py-1 text-xs font-bold text-[#00b259] border border-[#00b259] bg-[#00b259]/10 font-mono inline-block w-fit mb-2">
              :: {badge} ::
            </span>
          )}
          {heading && (
            <h2 className='text-2xl font-bold md:text-3xl lg:text-4xl font-sans text-black dark:text-white leading-tight'>
              {heading}
            </h2>
          )}
        </div>

        <div className={cn('grid grid-cols-2 gap-4 sm:gap-8', isFour ? 'lg:grid-cols-4' : 'lg:grid-cols-3')}>
          {featuresList.map((item, index) => {
            const colSpan = (!isFour && index === 0) ? 'col-span-2 lg:col-span-1' : 'col-span-1'
            return (
              <Card
                key={index}
                className={cn(
                  colSpan,
                  'group hover:bg-primary hover:text-primary-foreground text-base transition-colors duration-300 border-[#C5C4C2] shadow-none rounded-none'
                )}
              >
                <CardContent className='p-6'>
                  <Avatar className='mb-4 size-9 after:border-0 rounded-none'>
                    <AvatarFallback className='bg-muted text-card-foreground [&>svg]:size-5 rounded-none border border-[#C5C4C2] bg-white'>{item.icon}</AvatarFallback>
                  </Avatar>
                  <h6 className='mb-2 text-lg font-semibold font-sans'>{item.title}</h6>
                  <p className='text-muted-foreground group-hover:text-primary-foreground transition-colors duration-300 font-sans text-sm leading-relaxed'>
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Features
