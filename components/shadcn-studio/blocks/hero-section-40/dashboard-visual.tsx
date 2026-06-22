'use client'

import { motion } from 'motion/react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { SendIcon, UsersIcon, CheckCircle2Icon, TrendingUpIcon, MessageSquareIcon } from 'lucide-react'

const DashboardVisual = () => {
  return (
    <div className='grid grid-cols-1 gap-6 p-4 sm:p-6 lg:grid-cols-12 lg:gap-8 lg:p-8 w-full max-w-6xl mx-auto'>
      {/* 1. Broadcast Composer Card (4 cols) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className='lg:col-span-4'
      >
        <Card className='h-full shadow-lg border-border bg-card/50 backdrop-blur'>
          <CardHeader className='pb-3'>
            <div className='flex items-center gap-2'>
              <div className='bg-primary/10 text-primary p-2 rounded-lg'>
                <SendIcon className='size-5' />
              </div>
              <div>
                <CardTitle className='text-lg font-semibold'>Broadcast Composer</CardTitle>
                <CardDescription className='text-xs'>Create WhatsApp Campaign</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='space-y-1.5'>
              <label className='text-xs font-semibold text-muted-foreground'>Campaign Name</label>
              <div className='bg-muted/50 border border-border rounded-md px-3 py-2 text-sm font-medium'>
                🎁 Summer Special Offer
              </div>
            </div>

            <div className='space-y-1.5'>
              <label className='text-xs font-semibold text-muted-foreground'>Select Audience</label>
              <div className='flex items-center justify-between bg-muted/50 border border-border rounded-md px-3 py-2 text-sm'>
                <span className='font-medium'>D2C VIP Customers</span>
                <Badge variant='outline' className='bg-primary/10 text-primary border-primary/20 gap-1 text-xs'>
                  <UsersIcon className='size-3' />
                  4,850 users
                </Badge>
              </div>
            </div>

            <div className='space-y-1.5'>
              <label className='text-xs font-semibold text-muted-foreground'>Template Message</label>
              <div className='bg-muted/30 border border-border rounded-md p-3 text-xs leading-relaxed text-foreground/80 font-mono'>
                Hey &#123;&#123;name&#125;&#125;! Get 20% off on your next purchase. Use code: <span className='text-primary font-bold'>SUMMER20</span>. Shop now!
              </div>
            </div>

            <Button className='w-full bg-primary hover:bg-primary/95 text-white gap-2 font-medium' size='sm'>
              Send Broadcast
              <SendIcon className='size-3.5' />
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      {/* 2. Chat Simulation / Shared Inbox (5 cols) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className='lg:col-span-5'
      >
        <Card className='h-full shadow-lg border-border bg-card/50 backdrop-blur flex flex-col justify-between min-h-[320px]'>
          <CardHeader className='pb-2 border-b'>
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-2'>
                <div className='relative size-3.5 bg-green-500 rounded-full animate-pulse' />
                <CardTitle className='text-lg font-semibold'>Shared Inbox</CardTitle>
              </div>
              <Badge variant='outline' className='bg-emerald-500/10 text-emerald-600 border-emerald-500/20 text-xs font-medium'>
                Active API
              </Badge>
            </div>
          </CardHeader>
          <CardContent className='flex-1 flex flex-col justify-end p-4 space-y-4 overflow-hidden'>
            {/* Chat Bubble 1 - Client */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 0.4 }}
              className='flex items-start gap-2.5 max-w-[85%]'
            >
              <div className='bg-muted rounded-2xl rounded-tl-none p-3 shadow-xs'>
                <p className='text-xs font-semibold text-primary mb-0.5'>Rohan (Customer)</p>
                <p className='text-xs text-foreground/90 leading-normal'>
                  Hey, is the new D2C summer offer live? Can I use the code?
                </p>
              </div>
            </motion.div>

            {/* Chat Bubble 2 - AI Agent Reply */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.4, duration: 0.4 }}
              className='flex items-start justify-end gap-2.5 w-full'
            >
              <div className='bg-primary text-white rounded-2xl rounded-tr-none p-3 shadow-xs max-w-[85%] text-right'>
                <div className='flex items-center justify-end gap-1.5 text-white/90 mb-0.5'>
                  <span className='text-[10px] uppercase font-bold tracking-wider'>AI Agent</span>
                  <CheckCircle2Icon className='size-3 text-white' />
                </div>
                <p className='text-xs leading-normal text-left'>
                  Yes, Rohan! The Summer Special 20% off offer is live. Use code <span className='font-bold underline'>SUMMER20</span> at checkout.
                </p>
              </div>
            </motion.div>

            {/* Chat Bubble 3 - Client Conversion */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 2.0, duration: 0.4 }}
              className='flex items-start gap-2.5 max-w-[85%]'
            >
              <div className='bg-muted rounded-2xl rounded-tl-none p-3 shadow-xs'>
                <p className='text-xs font-semibold text-primary mb-0.5'>Rohan (Customer)</p>
                <p className='text-xs text-foreground/90 leading-normal'>
                  Awesome! It worked, just bought the sneakers. Thanks! 🎉
                </p>
              </div>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>

      {/* 3. Analytics Card (3 cols) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className='lg:col-span-3'
      >
        <Card className='h-full shadow-lg border-border bg-card/50 backdrop-blur flex flex-col justify-between'>
          <CardHeader className='pb-3'>
            <div className='flex items-center gap-2'>
              <div className='bg-primary/10 text-primary p-2 rounded-lg'>
                <TrendingUpIcon className='size-5' />
              </div>
              <CardTitle className='text-lg font-semibold'>Real-time Analytics</CardTitle>
            </div>
          </CardHeader>
          <CardContent className='space-y-5'>
            {/* Stat 1 */}
            <div className='space-y-1'>
              <span className='text-xs text-muted-foreground font-medium'>Total Broadcasts</span>
              <div className='flex items-baseline gap-2'>
                <span className='text-2xl font-bold'>12,480</span>
                <span className='text-emerald-500 text-xs font-semibold'>+18%</span>
              </div>
            </div>

            {/* Stat 2 */}
            <div className='space-y-1'>
              <span className='text-xs text-muted-foreground font-medium'>Avg. Open Rate</span>
              <div className='flex items-baseline gap-2'>
                <span className='text-2xl font-bold'>98.2%</span>
                <span className='text-emerald-500 text-xs font-semibold'>Industry High</span>
              </div>
            </div>

            {/* Stat 3 */}
            <div className='space-y-1'>
              <span className='text-xs text-muted-foreground font-medium'>Revenue Generated</span>
              <div className='flex items-baseline gap-2'>
                <span className='text-2xl font-bold text-primary'>$14,284</span>
                <span className='text-emerald-500 text-xs font-semibold'>+24%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

export default DashboardVisual
