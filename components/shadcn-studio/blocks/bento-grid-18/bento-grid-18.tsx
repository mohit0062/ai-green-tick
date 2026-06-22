import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardDescription, CardHeader } from '@/components/ui/card'
import { MotionPreset } from '@/components/ui/motion-preset'
import { Badge } from '@/components/ui/badge'

import FallingBadge from '@/components/shadcn-studio/blocks/bento-grid-18/falling-badge'
import DataTriangle from '@/assets/svg/data-triangle'
import { SmartphoneIcon, LineChartIcon, ShieldBanIcon, EyeOff, Mail, MousePointerClick, Undo2, DollarSign, AlertTriangle, UserX, Ban, Flag } from 'lucide-react'

const BentoGrid = () => {
  return (
    <section className='border-b px-4 sm:px-6 lg:px-8 bg-muted'>
      <div className='mx-auto max-w-7xl border-x border-[#C5C4C2] px-4 sm:px-6 lg:px-8 py-8 sm:py-16 lg:py-24'>
        {/* Section Header */}
        <div className='flex flex-col items-center gap-4 text-center mb-12 md:mb-16'>
          <MotionPreset fade slide={{ direction: 'down', offset: 30 }} transition={{ duration: 0.5 }}>
            <span className='px-3 py-1 text-xs font-bold text-[#00b259] border border-[#00b259] bg-[#00b259]/10 font-mono'>
              :: THE PROBLEM ::
            </span>
          </MotionPreset>

          <MotionPreset
            component='h2'
            className='text-2xl font-medium md:text-3xl lg:text-4xl text-foreground max-w-2xl mt-2 font-serif whitespace-normal md:whitespace-nowrap'
            fade
            slide={{ direction: 'down', offset: 30 }}
            delay={0.2}
            transition={{ duration: 0.5 }}
          >
            WhatsApp is leaking your revenue. Why
          </MotionPreset>
        </div>

        {/* Top border line */}
        <div className="border-t border-[#C5C4C2] -mx-4 sm:-mx-6 lg:-mx-8 my-8" />

        {/* 3-Card Grid */}
        <div className='grid grid-cols-1 gap-6 lg:grid-cols-3'>
          {/* Card 1: One Phone, Many People */}
          <MotionPreset
            fade
            blur
            slide={{ direction: 'down', offset: 50 }}
            transition={{ duration: 0.45 }}
            className='overflow-hidden min-h-120'
          >
            <Card className='h-full justify-between shadow-none ring-0 rounded-none border border-[#C5C4C2]'>
              <CardHeader className='flex gap-4'>
                <MotionPreset
                  fade
                  slide={{ direction: 'down', offset: 50 }}
                  delay={0.1}
                  transition={{ duration: 0.45 }}
                  className='bg-primary text-primary-foreground grid size-8 shrink-0 place-content-center rounded-full'
                >
                  <SmartphoneIcon className='size-4' />
                </MotionPreset>
                <div className='flex flex-col gap-2'>
                  <MotionPreset
                    component='h3'
                    className='text-xl font-medium text-muted-foreground'
                    fade
                    slide={{ direction: 'down', offset: 50 }}
                    delay={0.1}
                    transition={{ duration: 0.45 }}
                  >
                    One Phone, Many People
                  </MotionPreset>
                  <MotionPreset
                    fade
                    slide={{ direction: 'down', offset: 50 }}
                    delay={0.2}
                    transition={{ duration: 0.45 }}
                  >
                    <CardDescription className='text-base leading-relaxed'>
                      Sharing a single WhatsApp number across a team means missed chats, slow replies and zero accountability. You&apos;re losing leads in your own inbox.
                    </CardDescription>
                  </MotionPreset>
                </div>
              </CardHeader>
              <MotionPreset
                fade
                slide={{ direction: 'down', offset: 50 }}
                delay={0.3}
                transition={{ duration: 0.45 }}
                className='flex-1'
              >
                <FallingBadge
                  badges={[
                    {
                      text: 'Missed chats',
                      className: 'rounded-none border border-red-500/80 bg-red-500/10 text-black text-xs font-medium py-1 px-2.5 shadow-xs'
                    },
                    {
                      text: 'Slow replies',
                      className: 'rounded-none border border-yellow-500/80 bg-yellow-500/10 text-black text-xs font-medium py-1 px-2.5 shadow-xs'
                    },
                    {
                      text: 'No accountability',
                      className: 'rounded-none border border-red-500/80 bg-red-500/10 text-black text-xs font-medium py-1 px-2.5 shadow-xs'
                    },
                    {
                      text: 'Lost leads',
                      className: 'rounded-none border border-yellow-500/80 bg-yellow-500/10 text-black text-xs font-medium py-1 px-2.5 shadow-xs'
                    },
                    {
                      text: 'Shared number',
                      className: 'rounded-none border border-red-500/80 bg-red-500/10 text-black text-xs font-medium py-1 px-2.5 shadow-xs'
                    },
                    {
                      text: 'Inbox chaos',
                      className: 'rounded-none border border-yellow-500/80 bg-yellow-500/10 text-black text-xs font-medium py-1 px-2.5 shadow-xs'
                    },
                    {
                      text: 'Stalled deals',
                      className: 'rounded-none border border-red-500/80 bg-red-500/10 text-black text-xs font-medium py-1 px-2.5 shadow-xs'
                    }
                  ]}
                  trigger='hover'
                  gravity={1.2}
                  className='p-0'
                />
              </MotionPreset>
            </Card>
          </MotionPreset>

          {/* Card 2: No Visibility, No Strategy */}
          <MotionPreset
            fade
            blur
            slide={{ direction: 'down', offset: 50 }}
            delay={0.2}
            transition={{ duration: 0.45 }}
            className='overflow-hidden min-h-120'
          >
            <Card className='h-full text-base shadow-none ring-0 rounded-none border border-[#C5C4C2]'>
              <CardHeader className='flex gap-4'>
                <MotionPreset
                  fade
                  slide={{ direction: 'down', offset: 50 }}
                  delay={0.3}
                  transition={{ duration: 0.45 }}
                  className='bg-primary text-primary-foreground grid size-8 shrink-0 place-content-center rounded-full'
                >
                  <LineChartIcon className='size-4' />
                </MotionPreset>
                <div className='flex flex-col gap-2'>
                  <MotionPreset
                    component='h3'
                    className='text-xl font-medium text-muted-foreground'
                    fade
                    slide={{ direction: 'down', offset: 50 }}
                    delay={0.3}
                    transition={{ duration: 0.45 }}
                  >
                    No Visibility, No Strategy
                  </MotionPreset>
                  <MotionPreset
                    fade
                    slide={{ direction: 'down', offset: 50 }}
                    delay={0.4}
                    transition={{ duration: 0.45 }}
                  >
                    <CardDescription className='text-base leading-relaxed'>
                      Without analytics on opens, clicks and replies, your WhatsApp marketing is a guessing game. You can&apos;t optimize what you can&apos;t measure.
                    </CardDescription>
                  </MotionPreset>
                </div>
              </CardHeader>
              <MotionPreset
                fade
                slide={{ direction: 'down', offset: 50 }}
                delay={0.5}
                transition={{ duration: 0.45 }}
                className='flex flex-col flex-1 pb-6 relative w-full h-[320px] select-none font-sans mt-4'
              >
                {/* SVG Connecting Solid Lines */}
                <svg className="absolute inset-0 size-full pointer-events-none text-[#C5C4C2] dark:text-[#C5C4C2]/40" viewBox="0 0 100 100" preserveAspectRatio="none">
                  {/* Top center line */}
                  <path d="M50,14 L50,23" stroke="currentColor" strokeWidth="0.2" fill="none" />
                  {/* Top Left line */}
                  <path d="M22,20 L38,20 L38,32" stroke="currentColor" strokeWidth="0.2" fill="none" />
                  {/* Top Right line */}
                  <path d="M78,20 L62,20 L62,32" stroke="currentColor" strokeWidth="0.2" fill="none" />
                  {/* Bottom Left line */}
                  <path d="M22,66 L38,66 L38,56" stroke="currentColor" strokeWidth="0.2" fill="none" />
                  {/* Bottom Right line */}
                  <path d="M78,66 L62,66 L62,56" stroke="currentColor" strokeWidth="0.2" fill="none" />
                </svg>

                {/* Top Center: No Visibility Eye */}
                <div className='absolute top-[3%] left-1/2 -translate-x-1/2 flex items-center justify-center size-9 rounded-full border border-dashed border-red-500/60 bg-red-500/5 text-red-500 shadow-xs z-10'>
                  <EyeOff className="size-4" />
                </div>

                {/* Top Left: Opens */}
                <div className='absolute top-[10%] left-[6%] bg-card border border-border p-1.5 flex flex-col items-center w-[74px] rounded-none shadow-xs z-10'>
                  <div className='size-6 rounded-full bg-green-500/10 text-green-600 flex items-center justify-center mb-0.5'>
                    <Mail className='size-3.5' />
                  </div>
                  <span className='text-[8px] font-bold text-muted-foreground'>Opens</span>
                  <span className='text-xs font-black text-red-500 mt-0.5'>0</span>
                </div>

                {/* Top Right: Clicks */}
                <div className='absolute top-[10%] right-[6%] bg-card border border-border p-1.5 flex flex-col items-center w-[74px] rounded-none shadow-xs z-10'>
                  <div className='size-6 rounded-full bg-red-500/10 text-red-600 flex items-center justify-center mb-0.5'>
                    <MousePointerClick className='size-3.5' />
                  </div>
                  <span className='text-[8px] font-bold text-muted-foreground'>Clicks</span>
                  <span className='text-xs font-black text-red-500 mt-0.5'>0</span>
                </div>

                {/* Bottom Left: Replies */}
                <div className='absolute bottom-[24%] left-[6%] bg-card border border-border p-1.5 flex flex-col items-center w-[74px] rounded-none shadow-xs z-10'>
                  <div className='size-6 rounded-full bg-yellow-500/10 text-yellow-600 flex items-center justify-center mb-0.5'>
                    <Undo2 className='size-3.5' />
                  </div>
                  <span className='text-[8px] font-bold text-muted-foreground'>Replies</span>
                  <span className='text-xs font-black text-red-500 mt-0.5'>0</span>
                </div>

                {/* Bottom Right: Revenue */}
                <div className='absolute bottom-[24%] right-[6%] bg-card border border-border p-1.5 flex flex-col items-center w-[74px] rounded-none shadow-xs z-10'>
                  <div className='size-6 rounded-full bg-green-500/10 text-green-600 flex items-center justify-center mb-0.5'>
                    <DollarSign className='size-3.5' />
                  </div>
                  <span className='text-[8px] font-bold text-muted-foreground'>Revenue</span>
                  <span className='text-xs font-black text-red-500 mt-0.5'>?</span>
                </div>

                {/* Center Dashboard Window */}
                <div className='absolute top-[21%] left-1/2 -translate-x-1/2 w-[148px] h-[154px] bg-card border border-border rounded-none shadow-md flex flex-col overflow-hidden z-20'>
                  {/* Browser Header */}
                  <div className='bg-[#042717] h-4.5 px-2 flex items-center gap-1 shrink-0'>
                    <div className='bg-red-500/80 size-1 rounded-full' />
                    <div className='bg-yellow-500/80 size-1 rounded-full' />
                    <div className='bg-green-500/80 size-1 rounded-full' />
                  </div>
                  
                  {/* Dashboard Content */}
                  <div className='p-2 flex flex-col flex-1 min-h-0 text-left'>
                    <span className='text-[8px] font-black text-foreground mb-1 block'>
                      WhatsApp Analytics
                    </span>
                    
                    <div className='space-y-0.5 text-[7px] text-muted-foreground flex-grow'>
                      <div className='flex justify-between border-b border-border/40 pb-0.5'>
                        <span>Opens</span>
                        <span className='text-red-500 font-bold'>--</span>
                      </div>
                      <div className='flex justify-between border-b border-border/40 pb-0.5'>
                        <span>Clicks</span>
                        <span className='text-red-500 font-bold'>--</span>
                      </div>
                      <div className='flex justify-between border-b border-border/40 pb-0.5'>
                        <span>Replies</span>
                        <span className='text-red-500 font-bold'>--</span>
                      </div>
                      <div className='flex justify-between border-b border-border/40 pb-0.5'>
                        <span>Revenue</span>
                        <span className='text-red-500 font-bold'>--</span>
                      </div>
                    </div>
                    
                    {/* Charts Footer */}
                    <div className='mt-1 p-1 bg-muted/40 rounded-xs border border-border/30 flex justify-between items-end h-7 shrink-0'>
                      <div className='flex gap-0.5 items-end h-full'>
                        <div className='bg-neutral-300 dark:bg-neutral-700 w-0.75 h-2 rounded-xs' />
                        <div className='bg-neutral-300 dark:bg-neutral-700 w-0.75 h-4.5 rounded-xs' />
                        <div className='bg-neutral-300 dark:bg-neutral-700 w-0.75 h-3 rounded-xs' />
                        <div className='bg-neutral-300 dark:bg-neutral-700 w-0.75 h-5.5 rounded-xs' />
                      </div>
                      {/* Rotating pie placeholder */}
                      <div className='w-4 h-4 rounded-full border border-neutral-300 dark:border-neutral-700 border-t-primary animate-spin' style={{ animationDuration: '3s' }} />
                    </div>
                  </div>
                </div>

                {/* Bottom Warning Alert */}
                <div className='absolute bottom-0 left-0 right-0 px-3 flex flex-col items-center gap-1 z-10'>
                  <div className='w-full border border-dashed border-red-500/60 bg-red-500/5 text-red-500 px-3 py-1 text-[10px] font-black flex items-center justify-center gap-1.5 rounded-none'>
                    <AlertTriangle className='size-3 shrink-0 animate-pulse' />
                    <span>You&apos;re guessing, not growing.</span>
                  </div>
                  <p className='text-[9px] text-neutral-400 text-center font-medium leading-normal'>
                    No data. No insights. No growth.
                  </p>
                </div>
              </MotionPreset>
            </Card>
          </MotionPreset>

          {/* Card 3: Manual Broadcasts Don't Scale */}
          <MotionPreset
            fade
            blur
            slide={{ direction: 'down', offset: 50 }}
            delay={0.4}
            transition={{ duration: 0.45 }}
            className='overflow-hidden min-h-120'
          >
            <Card className='group h-full justify-between shadow-none ring-0 rounded-none border border-[#C5C4C2]'>
              <CardHeader className='flex gap-4'>
                <MotionPreset
                  fade
                  slide={{ direction: 'down', offset: 50 }}
                  delay={0.5}
                  transition={{ duration: 0.45 }}
                  className='bg-primary text-primary-foreground grid size-8 shrink-0 place-content-center rounded-full'
                >
                  <ShieldBanIcon className='size-4' />
                </MotionPreset>
                <div className='flex flex-col gap-2'>
                  <MotionPreset
                    component='h3'
                    className='text-xl font-medium text-muted-foreground'
                    fade
                    slide={{ direction: 'down', offset: 50 }}
                    delay={0.5}
                    transition={{ duration: 0.45 }}
                  >
                    Manual Broadcasts Don&apos;t Scale
                  </MotionPreset>
                  <MotionPreset
                    fade
                    slide={{ direction: 'down', offset: 50 }}
                    delay={0.6}
                    transition={{ duration: 0.45 }}
                  >
                    <CardDescription className='text-base leading-relaxed'>
                      Copy-pasting offers to 500 contacts gets your number flagged, banned or ignored. Personal WhatsApp was never built for business.
                    </CardDescription>
                  </MotionPreset>
                </div>
              </CardHeader>

              {/* Circular Diagram section */}
              <MotionPreset
                fade
                slide={{ direction: 'down', offset: 50 }}
                delay={0.7}
                transition={{ duration: 0.45 }}
                className='flex flex-1 items-center justify-center py-4 relative mt-1'
              >
                {/* Main Outer Circle */}
                <div className='relative w-[230px] h-[230px] rounded-full border border-border bg-card/30 flex items-center justify-center shadow-xs'>
                  
                  {/* SVG Connecting Dashed Lines */}
                  <svg className="absolute inset-0 size-full pointer-events-none text-red-500/50" viewBox="0 0 100 100">
                    <defs>
                      <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
                        <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="currentColor" />
                      </marker>
                    </defs>
                    {/* Left Arch Arrow */}
                    <path d="M 38,20 A 36 36 0 0 0 18,60" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" fill="none" markerEnd="url(#arrow)" />
                    {/* Right Arch Arrow */}
                    <path d="M 62,20 A 36 36 0 0 1 82,60" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" fill="none" markerEnd="url(#arrow)" />
                    {/* Center Dashed Line to Banned */}
                    <path d="M 50,56 L 50,71" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" fill="none" />
                  </svg>

                  {/* Top: High Risk */}
                  <div className='absolute top-[4%] left-1/2 -translate-x-1/2 flex flex-col items-center text-center z-10'>
                    <div className='size-6 rounded-full bg-red-500/10 text-red-500 flex items-center justify-center mb-0.5'>
                      <AlertTriangle className='size-3 animate-pulse' />
                    </div>
                    <span className='text-[8.5px] font-bold text-foreground leading-none'>High Risk</span>
                    <span className='text-[7px] text-muted-foreground mt-0.5'>Looks like spam</span>
                  </div>

                  {/* Middle: Avatars & Send to 500 contacts */}
                  <div className='absolute top-[38%] left-1/2 -translate-x-1/2 flex flex-col items-center z-10'>
                    {/* Overlapping Avatars */}
                    <div className='flex items-center -space-x-2'>
                      <Avatar className='size-7 border border-background shadow-xs'>
                        <AvatarImage src='https://cdn.shadcnstudio.com/ss-assets/blocks/bento-grid/image-100.png' alt='User 1' />
                        <AvatarFallback>U1</AvatarFallback>
                      </Avatar>
                      <Avatar className='size-7 border border-background shadow-xs'>
                        <AvatarImage src='https://cdn.shadcnstudio.com/ss-assets/blocks/bento-grid/image-101.png' alt='User 2' />
                        <AvatarFallback>U2</AvatarFallback>
                      </Avatar>
                      <Avatar className='size-7 border border-background shadow-xs z-1'>
                        <AvatarImage src='https://cdn.shadcnstudio.com/ss-assets/blocks/bento-grid/image-102.png' alt='User 3' />
                        <AvatarFallback>U3</AvatarFallback>
                      </Avatar>
                      <Avatar className='size-7 border border-background shadow-xs'>
                        <AvatarImage src='https://cdn.shadcnstudio.com/ss-assets/blocks/bento-grid/image-103.png' alt='User 4' />
                        <AvatarFallback>U4</AvatarFallback>
                      </Avatar>
                      <Avatar className='size-7 border border-background shadow-xs'>
                        <AvatarImage src='https://cdn.shadcnstudio.com/ss-assets/blocks/bento-grid/image-104.png' alt='User 5' />
                        <AvatarFallback>U5</AvatarFallback>
                      </Avatar>
                    </div>
                    <div className='text-[8px] text-muted-foreground mt-0.5 text-center font-medium whitespace-nowrap'>
                      You send to <span className='font-bold text-foreground'>500 contacts</span>
                    </div>
                  </div>

                  {/* Bottom Left: Ignored */}
                  <div className='absolute bottom-[3%] left-[-2%] w-[76px] flex flex-col items-center text-center z-10'>
                    <div className='size-6 rounded-full bg-red-500/10 text-red-500 flex items-center justify-center mb-0.5'>
                      <UserX className='size-3' />
                    </div>
                    <span className='text-[8.5px] font-bold text-foreground leading-none'>Ignored</span>
                    <span className='text-[7px] text-muted-foreground leading-tight mt-0.5'>People don&apos;t engage</span>
                  </div>

                  {/* Bottom Center: Banned */}
                  <div className='absolute bottom-[0%] left-1/2 -translate-x-1/2 w-[80px] flex flex-col items-center text-center z-10'>
                    <div className='size-6 rounded-full bg-red-500/10 text-red-500 flex items-center justify-center mb-0.5'>
                      <Ban className='size-3' />
                    </div>
                    <span className='text-[8.5px] font-bold text-foreground leading-none'>Banned</span>
                    <span className='text-[7px] text-muted-foreground leading-tight mt-0.5'>Your number gets blocked</span>
                  </div>

                  {/* Bottom Right: Flagged */}
                  <div className='absolute bottom-[3%] right-[-2%] w-[76px] flex flex-col items-center text-center z-10'>
                    <div className='size-6 rounded-full bg-red-500/10 text-red-500 flex items-center justify-center mb-0.5'>
                      <Flag className='size-3' />
                    </div>
                    <span className='text-[8.5px] font-bold text-foreground leading-none'>Flagged</span>
                    <span className='text-[7px] text-muted-foreground leading-tight mt-0.5'>WhatsApp flags your number</span>
                  </div>

                </div>
              </MotionPreset>
            </Card>
          </MotionPreset>
        </div>

        {/* Bottom border line */}
        <div className="border-b border-[#C5C4C2] -mx-4 sm:-mx-6 lg:-mx-8 my-8" />
      </div>
    </section>
  )
}

export default BentoGrid
