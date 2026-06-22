'use client'
import { Badge } from '@/components/ui/badge'

import ArrowBottom from '@/components/shadcn-studio/blocks/hero-section-40/arrow-bottom'
import ArrowRight from '@/components/shadcn-studio/blocks/hero-section-40/arrow-right'
import WorkflowItem from '@/components/shadcn-studio/blocks/hero-section-40/workflow-item'
import { BellRingIcon, ScanEyeIcon, LoaderIcon, MessageSquareTextIcon } from 'lucide-react'

const FollowUps = () => {
  return (
    <div className='flex max-md:flex-col max-md:space-y-8 md:items-center md:space-x-16'>
      <WorkflowItem
        type='input'
        icon={
          <BellRingIcon />
        }
        title='Broadcast Trigger'
        description='WhatsApp promotional campaign is activated.'
        time='0.0 sec'
        className='relative text-base'
      >
        <div className='bg-muted space-y-2.5 rounded-lg px-2.5 py-3'>
          <div className='flex items-center gap-2'>
            <img
              src='https://cdn.shadcnstudio.com/ss-assets/template/landing-page/orion/image-44.png'
              alt='Sheets logo'
              className='size-4.5'
            />
            <span className='text-muted-foreground text-sm'>List: D2C VIP Customers</span>
          </div>
        </div>

        {/* Arrow for large screens */}
        <ArrowRight delay={0.1} />

        {/* Arrow for small screens */}
        <ArrowBottom delay={0.1} />
      </WorkflowItem>

      <WorkflowItem
        type='action'
        icon={
          <ScanEyeIcon />
        }
        title='Broadcast Personalization'
        time='1.6 sec'
        delay={1.2}
        className='relative text-base'
      >
        <div className='bg-muted space-y-2.5 rounded-lg px-2.5 py-3'>
          <div className='flex items-center gap-2'>
            <img
              src='https://cdn.shadcnstudio.com/ss-assets/template/landing-page/orion/image-44.png'
              alt='Sheets logo'
              className='size-4.5'
            />
            <span className='text-muted-foreground text-sm'>Checking opt-in status</span>
          </div>
          <div className='flex items-center gap-2'>
            <img
              src='/logo-icon.png'
              alt='Green tick logo'
              className='size-4.5'
            />
            <span className='text-muted-foreground text-sm'>Verifying API templates</span>
          </div>
        </div>
        <div className='bg-muted space-y-2.5 rounded-lg px-2.5 py-3'>
          <div className='text-muted-foreground flex items-center justify-between gap-2'>
            <Badge variant='outline' className='h-auto rounded-sm px-1.5'>
              Processing campaign...
            </Badge>
            <LoaderIcon className='size-4' />
          </div>
          <p className='text-muted-foreground text-sm'>
            AI customizes template parameters (names, discount codes) for each recipient.
          </p>
        </div>

        {/* Arrow for large screens */}
        <ArrowRight delay={1.3} />

        {/* Arrow for small screens */}
        <ArrowBottom delay={1.3} />
      </WorkflowItem>

      <WorkflowItem
        type='output'
        icon={
          <MessageSquareTextIcon />
        }
        title='Campaign Executed'
        description='The broadcast has been sent to all users via WhatsApp Business API.'
        time='0.3 sec'
        delay={2.4}
        className='text-base'
      >
        <div className='bg-muted rounded-lg px-2.5 py-3'>
          <div className='flex items-center gap-2'>
            <img
              src='/logo-icon.png'
              alt='Green tick logo'
              className='size-4.5'
            />
            <span className='text-muted-foreground text-sm'>Broadcast sent to 4,850 users</span>
          </div>
        </div>
      </WorkflowItem>
    </div>
  )
}

export default FollowUps
