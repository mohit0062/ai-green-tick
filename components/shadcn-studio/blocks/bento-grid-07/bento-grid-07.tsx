'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { MotionPreset } from '@/components/ui/motion-preset'
import { cn } from '@/lib/utils'
import { ArrowRight, Sparkles } from 'lucide-react'

// Visual Mockups
const BroadcastVisual = () => (
  <div className="flex flex-col gap-3.5 p-4 bg-muted/40 border border-[#C5C4C2] rounded-none select-none font-mono text-[9px] w-full">
    <div className="flex justify-between items-center text-[10px] font-bold text-neutral-500 border-b border-[#C5C4C2]/50 pb-1">
      <span>CAMPAIGN: Promo Broadcast</span>
      <span className="bg-[#00b259]/15 text-[#00b259] px-2 py-0.5 rounded text-[8px] font-bold animate-pulse">SENDING</span>
    </div>
    
    <div className="space-y-1">
      <div className="flex justify-between text-[8px] text-muted-foreground">
        <span>Progress</span>
        <span>95.4%</span>
      </div>
      <div className="w-full bg-neutral-200 dark:bg-neutral-800 h-2 rounded-full overflow-hidden border border-border">
        <div className="bg-[#00b259] h-full w-[95.4%]" />
      </div>
    </div>

    <div className="grid grid-cols-3 gap-2 mt-1">
      <div className="p-2 border border-border bg-white dark:bg-neutral-800 text-center rounded flex flex-col justify-center">
        <div className="text-xs font-black text-black dark:text-white">12.5K</div>
        <div className="text-[7px] text-muted-foreground uppercase font-bold leading-none mt-1">Sent</div>
      </div>
      <div className="p-2 border border-border bg-white dark:bg-neutral-800 text-center rounded flex flex-col justify-center">
        <div className="text-xs font-black text-[#00b259]">18×</div>
        <div className="text-[7px] text-muted-foreground uppercase font-bold leading-none mt-1">ROI</div>
      </div>
      <div className="p-2 border border-border bg-white dark:bg-neutral-800 text-center rounded flex flex-col justify-center">
        <div className="text-xs font-black text-black dark:text-white">95%</div>
        <div className="text-[7px] text-muted-foreground uppercase font-bold leading-none mt-1">Delivery</div>
      </div>
    </div>
  </div>
)

const InboxVisual = () => (
  <div className="flex flex-col gap-2 p-3 bg-muted/40 border border-[#C5C4C2] rounded-none font-sans w-full max-h-56 overflow-hidden select-none">
    <div className="flex items-center justify-between border-b border-[#C5C4C2]/50 pb-2 text-[9px] uppercase font-bold text-neutral-500 font-mono">
      <span>Shared Inbox (3 Agents Active)</span>
      <span className="text-[#00b259] animate-pulse">● Active</span>
    </div>
    <div className="flex flex-col gap-1.5 mt-1 overflow-y-auto max-h-[140px]">
      {[
        { name: 'Rohan Sharma', text: 'Can you share pricing details?', time: '2m ago', agent: 'Rahul ✔', status: 'active' },
        { name: 'Sarah Khan', text: 'Thank you, order received!', time: '5m ago', agent: 'Unassigned ⏳', status: 'unassigned' },
        { name: 'Vivek Verma', text: 'Rescheduling flight to June 28', time: '12m ago', agent: 'AI Agent 🤖', status: 'ai' },
        { name: 'Priya Nair', text: 'Is standard delivery free?', time: '20m ago', agent: 'Sneha 👩‍💻', status: 'active' }
      ].map((chat, idx) => (
        <div key={idx} className="flex items-center justify-between p-1.5 bg-white dark:bg-neutral-800 border border-border rounded hover:shadow-xs transition-shadow">
          <div className="flex flex-col gap-0.5 text-left min-w-0">
            <span className="text-[11px] font-bold text-black dark:text-white truncate">{chat.name}</span>
            <span className="text-[9px] text-muted-foreground truncate max-w-[120px] sm:max-w-[180px]">{chat.text}</span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-[7px] text-neutral-400 font-mono">{chat.time}</span>
            <span className={cn(
              "text-[7px] font-bold px-1.5 py-0.5 rounded border font-sans",
              chat.status === 'unassigned' ? 'bg-amber-50 text-amber-600 border-amber-200' :
              chat.status === 'ai' ? 'bg-purple-50 text-purple-600 border-purple-200' :
              'bg-green-50 text-green-600 border-green-200'
            )}>
              {chat.agent}
            </span>
          </div>
        </div>
      ))}
    </div>
  </div>
)

const ChatbotVisual = () => (
  <div className="relative flex flex-col items-center justify-center p-4 bg-muted/40 border border-[#C5C4C2] rounded-none w-full h-44 select-none font-mono text-[9px]">
    <svg className="absolute inset-0 size-full text-[#C5C4C2] dark:text-[#C5C4C2]/30 pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
      <path d="M 50,15 L 50,30" stroke="currentColor" strokeWidth="0.8" fill="none" />
      <path d="M 50,45 L 20,45 L 20,70" stroke="currentColor" strokeWidth="0.8" fill="none" />
      <path d="M 50,45 L 80,45 L 80,70" stroke="currentColor" strokeWidth="0.8" fill="none" />
    </svg>

    <div className="absolute top-[8%] left-1/2 -translate-x-1/2 bg-white dark:bg-neutral-800 border border-border px-2 py-0.5 rounded shadow-xs text-center flex items-center gap-1">
      <Sparkles className="size-2.5 text-[#00b259]" />
      <span className="font-bold">Message In</span>
    </div>

    <div className="absolute top-[32%] left-1/2 -translate-x-1/2 bg-white dark:bg-neutral-800 border border-border px-2.5 py-0.5 rounded shadow-xs text-center flex flex-col">
      <span className="font-bold">Check Intent</span>
    </div>

    <div className="absolute bottom-[10%] left-[5%] bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 px-1.5 py-0.5 rounded shadow-xs text-center flex flex-col w-[85px]">
      <span className="text-[#00b259] font-bold">YES: AI Reply</span>
      <span className="text-[7px] text-muted-foreground">Answer FAQ (95%)</span>
    </div>

    <div className="absolute bottom-[10%] right-[5%] bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 px-1.5 py-0.5 rounded shadow-xs text-center flex flex-col w-[85px]">
      <span className="text-blue-600 font-bold">NO: Route Agent</span>
      <span className="text-[7px] text-muted-foreground">Human takeover</span>
    </div>
  </div>
)

const CampaignVisual = () => (
  <div className="flex flex-col gap-2 p-3 bg-muted/40 border border-[#C5C4C2] rounded-none w-full h-44 select-none font-mono text-[9px]">
    <div className="flex justify-between items-center text-[9px] font-bold text-neutral-500 border-b border-[#C5C4C2]/50 pb-1">
      <span>Campaign Stats</span>
      <span className="text-blue-500 font-mono">Live</span>
    </div>
    
    <div className="grid grid-cols-2 gap-2 mt-1">
      <div className="p-1.5 border border-border bg-white dark:bg-neutral-800 rounded flex flex-col justify-center">
        <span className="text-xs font-black text-black dark:text-white">98.4%</span>
        <span className="text-[7px] text-muted-foreground uppercase leading-none mt-0.5">Open Rate</span>
      </div>
      <div className="p-1.5 border border-border bg-white dark:bg-neutral-800 rounded flex flex-col justify-center">
        <span className="text-xs font-black text-[#00b259]">45.2%</span>
        <span className="text-[7px] text-muted-foreground uppercase leading-none mt-0.5">Click Rate</span>
      </div>
    </div>

    <div className="h-10 bg-white dark:bg-neutral-800 border border-border rounded p-1 flex justify-between items-end gap-0.5 mt-1">
      {[15, 30, 25, 45, 35, 60, 50, 80].map((h, i) => (
        <div 
          key={i} 
          className="bg-neutral-200 dark:bg-neutral-700 hover:bg-[#00b259] w-full rounded-xs transition-colors" 
          style={{ height: `${h}%` }}
        />
      ))}
    </div>
  </div>
)

const AutomationVisual = () => (
  <div className="relative flex flex-col items-center justify-center p-4 bg-muted/40 border border-[#C5C4C2] rounded-none w-full h-44 select-none font-mono text-[9px]">
    <svg className="absolute inset-0 size-full text-[#C5C4C2] dark:text-[#C5C4C2]/30 pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
      <path d="M 12,50 L 88,50" stroke="currentColor" strokeWidth="0.8" fill="none" strokeDasharray="3 3" />
    </svg>

    <div className="flex justify-between items-center w-full gap-2 relative z-10 px-1">
      {[
        { label: 'Trigger', value: 'Cart Abandoned', icon: '🛒' },
        { label: 'Timer', value: 'Wait 30 Mins', icon: '⏳' },
        { label: 'Action', value: 'Send Discount', icon: '💬' }
      ].map((step, idx) => (
        <div key={idx} className="flex flex-col items-center bg-white dark:bg-neutral-800 border border-border p-2 rounded shadow-xs w-20 text-center gap-1">
          <span className="text-sm leading-none">{step.icon}</span>
          <span className="text-[7.5px] font-bold uppercase text-neutral-400 leading-none">{step.label}</span>
          <span className="text-[8px] font-black text-black dark:text-white truncate max-w-full leading-tight">{step.value}</span>
        </div>
      ))}
    </div>
  </div>
)

const CTWAPreview = () => (
  <div className="flex flex-wrap items-center justify-center gap-6 p-4 w-full select-none">
    
    <div className="w-[140px] border border-[#C5C4C2] bg-white dark:bg-neutral-800 rounded-lg overflow-hidden flex flex-col text-[8px] shadow-sm shrink-0">
      <div className="p-1 flex items-center gap-1 bg-neutral-50 dark:bg-neutral-900 border-b border-neutral-100 dark:border-neutral-800">
        <div className="size-3.5 rounded-full bg-[#00b259] text-white flex items-center justify-center font-bold text-[6px]">T</div>
        <div className="flex flex-col">
          <span className="font-bold text-black dark:text-white text-[7px] leading-tight">AI Greentick</span>
          <span className="text-[5.5px] text-neutral-400 font-mono leading-none">Sponsored</span>
        </div>
      </div>
      <div className="aspect-square bg-neutral-200 overflow-hidden relative">
        <img 
          src="https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=250&auto=format&fit=crop" 
          alt="Ad Creative" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#00b259]/10" />
      </div>
      <div className="p-1 bg-[#075e54] text-white flex items-center justify-between font-sans">
        <div className="flex flex-col">
          <span className="font-bold text-[6.5px] leading-tight">Send WhatsApp message</span>
        </div>
        <span className="bg-white text-black rounded px-1 py-0.5 text-[5.5px] font-bold uppercase">Send</span>
      </div>
    </div>

    <div className="text-neutral-400 font-bold hidden sm:block">➡️</div>

    <div className="w-[140px] border border-[#C5C4C2] bg-white dark:bg-neutral-900 rounded-lg overflow-hidden flex flex-col text-[8px] shadow-sm shrink-0">
      <div className="p-1.5 bg-[#075e54] text-white flex items-center gap-1.5">
        <div className="size-3.5 rounded-full bg-neutral-200 overflow-hidden flex items-center justify-center font-bold text-[7px] text-neutral-700">📢</div>
        <div className="flex flex-col">
          <span className="font-bold text-white text-[7px]">GreenTick Bot</span>
          <span className="text-[5.5px] opacity-80 leading-none">Online</span>
        </div>
      </div>
      <div className="h-[95px] bg-[#e5ddd5] dark:bg-neutral-950 p-2 space-y-1 overflow-y-auto">
        <div className="bg-white dark:bg-neutral-800 text-black dark:text-white rounded p-1 max-w-[85%] text-[7px] mr-auto leading-normal shadow-xs">
          Hi! Thanks for clicking our Instagram ad. How can we help?
        </div>
        <div className="bg-[#dcf8c6] dark:bg-emerald-950 text-black dark:text-white rounded p-1 max-w-[85%] text-[7px] ml-auto leading-normal shadow-xs">
          I want to start a free trial.
        </div>
      </div>
    </div>

  </div>
)

const BentoGrid = () => {
  return (
    <section className='border-b px-4 sm:px-6 lg:px-8 bg-[#ECEBE9]/50 dark:bg-neutral-950/20'>
      <div className='mx-auto max-w-7xl border-x space-y-12 px-4 sm:space-y-16 sm:px-6 lg:space-y-24 lg:px-8 border-[#C5C4C2] py-8 sm:py-16 lg:py-24'>
        
        {/* Diagonal Striped Divider Line */}
        <div 
          className="h-12 border-y border-[#C5C4C2] -mx-4 w-[calc(100%+2rem)] sm:-mx-6 sm:w-[calc(100%+3rem)] lg:-mx-8 lg:w-[calc(100%+4rem)]"
          style={{
            backgroundImage: 'repeating-linear-gradient(45deg, #C5C4C2, #C5C4C2 1.5px, transparent 1.5px, transparent 8px)',
          }}
        />

        {/* Header Section */}
        <div className='flex flex-col items-center gap-4 text-center'>
          <MotionPreset
            component='h2'
            fade
            slide={{ direction: 'down', offset: 50 }}
            transition={{ duration: 0.5 }}
            className='text-2xl font-medium sm:text-3xl lg:text-4xl font-serif text-black dark:text-white'
          >
            Everything you need to win on WhatsApp
          </MotionPreset>

          <MotionPreset fade slide={{ direction: 'down', offset: 50 }} delay={0.3} transition={{ duration: 0.5 }}>
            <p className='text-neutral-500 max-w-2xl text-xs sm:text-sm font-mono'>
              Automate campaigns, collaborate via shared inbox, build AI agents, and run high-converting click-to-chat ads.
            </p>
          </MotionPreset>
        </div>

        <MotionPreset fade blur transition={{ duration: 0.5 }} delay={0.6}>
          <div className='bg-[#ECEBE9] dark:bg-neutral-900 border border-[#C5C4C2] grid grid-cols-1 gap-6 rounded-none p-6 max-sm:p-2 sm:grid-cols-2 lg:grid-cols-6'>
            
            {/* WhatsApp Broadcasts */}
            <MotionPreset
              fade
              blur
              slide={{ offset: 15 }}
              transition={{ duration: 0.5 }}
              className='h-full sm:col-span-2 lg:col-span-3'
              delay={0.7}
            >
              <Card className='shadow-none ring-0 border border-[#C5C4C2] rounded-none h-full justify-between flex flex-col bg-white dark:bg-neutral-950'>
                <CardContent className="pt-6">
                  <BroadcastVisual />
                </CardContent>
                <CardHeader className='mt-2 gap-3 pb-6'>
                  <CardTitle className='text-xl sm:text-2xl font-semibold'>WhatsApp Broadcasts</CardTitle>
                  <CardDescription className='text-sm sm:text-base font-normal leading-relaxed text-neutral-500'>
                    Send approved promotional and transactional campaigns to 100,000+ contacts with industry-best delivery. Schedule, segment and track every send.
                  </CardDescription>
                  <div className='pt-2'>
                    <a href='#broadcasts' className='text-xs font-mono font-bold text-[#00b259] hover:underline flex items-center gap-1.5'>
                      Explore Broadcasts <ArrowRight className='size-3.5' />
                    </a>
                  </div>
                </CardHeader>
              </Card>
            </MotionPreset>

            {/* Shared Team Inbox */}
            <MotionPreset
              fade
              blur
              slide={{ offset: 15 }}
              transition={{ duration: 0.5 }}
              className='h-full sm:col-span-2 lg:col-span-3'
              delay={0.8}
            >
              <Card className='shadow-none ring-0 border border-[#C5C4C2] rounded-none h-full justify-between flex flex-col bg-white dark:bg-neutral-950'>
                <CardContent className="pt-6">
                  <InboxVisual />
                </CardContent>
                <CardHeader className='mt-2 gap-3 pb-6'>
                  <CardTitle className='text-xl sm:text-2xl font-semibold'>Shared Team Inbox</CardTitle>
                  <CardDescription className='text-sm sm:text-base font-normal leading-relaxed text-neutral-500'>
                    Multiple agents on one WhatsApp number. Assign chats, add private notes, tag teammates and never miss a customer again.
                  </CardDescription>
                  <div className='pt-2'>
                    <a href='#inbox' className='text-xs font-mono font-bold text-[#00b259] hover:underline flex items-center gap-1.5'>
                      Explore Team Inbox <ArrowRight className='size-3.5' />
                    </a>
                  </div>
                </CardHeader>
              </Card>
            </MotionPreset>

            {/* AI Chatbot Builder */}
            <MotionPreset
              fade
              blur
              slide={{ offset: 15 }}
              transition={{ duration: 0.5 }}
              className='h-full lg:col-span-2'
              delay={0.9}
            >
              <Card className='shadow-none ring-0 border border-[#C5C4C2] rounded-none h-full justify-between flex flex-col bg-white dark:bg-neutral-950'>
                <CardContent className="pt-6">
                  <ChatbotVisual />
                </CardContent>
                <CardHeader className='mt-2 gap-3 pb-6'>
                  <CardTitle className='text-xl font-semibold'>AI Chatbot Builder</CardTitle>
                  <CardDescription className='text-sm leading-relaxed text-neutral-500'>
                    Drag-and-drop bot builder. No code. Connect to OpenAI, train on your data, and let bots qualify leads, answer FAQs and route conversations 24/7.
                  </CardDescription>
                  <div className='pt-2'>
                    <a href='#chatbot' className='text-xs font-mono font-bold text-[#00b259] hover:underline flex items-center gap-1.5'>
                      Build a Chatbot <ArrowRight className='size-3.5' />
                    </a>
                  </div>
                </CardHeader>
              </Card>
            </MotionPreset>

            {/* Campaign Manager */}
            <MotionPreset
              fade
              blur
              slide={{ offset: 15 }}
              transition={{ duration: 0.5 }}
              className='h-full lg:col-span-2'
              delay={1.0}
            >
              <Card className='shadow-none ring-0 border border-[#C5C4C2] rounded-none h-full justify-between flex flex-col bg-white dark:bg-neutral-950'>
                <CardContent className="pt-6">
                  <CampaignVisual />
                </CardContent>
                <CardHeader className='mt-2 gap-3 pb-6'>
                  <CardTitle className='text-xl font-semibold'>Campaign Manager</CardTitle>
                  <CardDescription className='text-sm leading-relaxed text-neutral-500'>
                    Plan, launch and analyze every WhatsApp campaign. See delivery, opens, clicks, replies and conversions in real-time.
                  </CardDescription>
                  <div className='pt-2'>
                    <a href='#campaign' className='text-xs font-mono font-bold text-[#00b259] hover:underline flex items-center gap-1.5'>
                      See Campaign Manager <ArrowRight className='size-3.5' />
                    </a>
                  </div>
                </CardHeader>
              </Card>
            </MotionPreset>

            {/* WhatsApp Automation */}
            <MotionPreset
              fade
              blur
              slide={{ offset: 15 }}
              transition={{ duration: 0.5 }}
              className='h-full lg:col-span-2'
              delay={1.1}
            >
              <Card className='shadow-none ring-0 border border-[#C5C4C2] rounded-none h-full justify-between flex flex-col bg-white dark:bg-neutral-950'>
                <CardContent className="pt-6">
                  <AutomationVisual />
                </CardContent>
                <CardHeader className='mt-2 gap-3 pb-6'>
                  <CardTitle className='text-xl font-semibold'>WhatsApp Automation</CardTitle>
                  <CardDescription className='text-sm leading-relaxed text-neutral-500'>
                    Trigger messages on actions, time, tags and journeys. Abandoned cart recovery, post-purchase nurture, win-back — all on autopilot.
                  </CardDescription>
                  <div className='pt-2'>
                    <a href='#automation' className='text-xs font-mono font-bold text-[#00b259] hover:underline flex items-center gap-1.5'>
                      View Automation <ArrowRight className='size-3.5' />
                    </a>
                  </div>
                </CardHeader>
              </Card>
            </MotionPreset>

            {/* CTWA Ads */}
            <MotionPreset
              fade
              blur
              slide={{ offset: 15 }}
              transition={{ duration: 0.5 }}
              className='h-full lg:col-span-6'
              delay={1.2}
            >
              <Card className='shadow-none ring-0 border border-[#C5C4C2] rounded-none h-full justify-between flex flex-col bg-white dark:bg-neutral-950'>
                <div className='grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[#C5C4C2]'>
                  <div className='p-6 flex flex-col justify-center gap-3'>
                    <CardTitle className='text-xl sm:text-2xl font-semibold'>CTWA Ads</CardTitle>
                    <CardDescription className='text-sm sm:text-base font-normal leading-relaxed text-neutral-500'>
                      Run Facebook and Instagram ads that click to WhatsApp. 5× your lead quality and 2-3× conversions with native lead capture.
                    </CardDescription>
                    <div className='pt-2'>
                      <a href='#ads' className='text-xs font-mono font-bold text-[#00b259] hover:underline flex items-center gap-1.5'>
                        Launch CTWA <ArrowRight className='size-3.5' />
                      </a>
                    </div>
                  </div>
                  <div className='bg-neutral-50/30 dark:bg-neutral-900/30 flex items-center justify-center p-4'>
                    <CTWAPreview />
                  </div>
                </div>
              </Card>
            </MotionPreset>

          </div>
        </MotionPreset>
      </div>
    </section>
  )
}

export default BentoGrid
