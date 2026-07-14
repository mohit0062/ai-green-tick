'use client'

import React from 'react'
import { motion } from 'motion/react'
import { Check, ArrowRight, MessageSquare, Flame, TrendingUp, Sparkles, Clock, Users, ArrowUpRight } from 'lucide-react'

export default function SolutionsJourney() {
  return (
    <section className="px-4 sm:px-6 lg:px-8 border-b border-[#C5C4C2] bg-white">
      <div className="mx-auto max-w-7xl border-x border-[#C5C4C2] px-4 sm:px-6 lg:px-8 py-16 sm:py-24 space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="inline-block px-3 py-1 text-xs font-bold text-[#00b259] border border-[#00b259] bg-[#00b259]/10 font-mono tracking-wider">
            :: END-TO-END CUSTOMER JOURNEY ::
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-black font-display leading-tight">
            Use conversations to fuel every point in the buyer journey and empower your teams
          </h2>
        </div>

        {/* Journey Blocks Container */}
        <div className="space-y-12">
          
          {/* Card 1: Marketing (Light Blue) */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="bg-marketing-bg border border-[#C5C4C2] rounded-none grid grid-cols-1 lg:grid-cols-12 overflow-hidden shadow-sm"
          >
            {/* Left Info Column */}
            <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-between gap-10 text-left">
              <div className="space-y-6">
                <span className="text-[10px] font-bold tracking-wider text-marketing-accent bg-blue-100 border border-blue-200 px-2.5 py-1 uppercase font-sans">
                  AIGreenTick for Marketing
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-black font-display leading-snug">
                  Acquire, engage, and qualify leads with personalized campaigns at scale
                </h3>
                <ul className="space-y-3.5">
                  {[
                    "Convert every touchpoint, from links to offline interaction and to ads, into meaningful conversations instantly",
                    "Improve attribution, easily retarget, and increase ROI with Meta and Google ads that click to WhatsApp",
                    "Auto-magically engage your users and drive amazing post-conversion workflows with AI-fueled, yet human-like, conversations",
                    "Stay on top with powerful insights to improve your messaging, campaign, and ad performance"
                  ].map((bullet, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="flex items-center justify-center size-5 bg-blue-100 text-marketing-accent border border-blue-200 rounded-full shrink-0 mt-0.5">
                        <Check className="size-3 stroke-[3]" />
                      </span>
                      <span className="text-sm text-neutral-700 leading-relaxed font-sans font-medium">{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Metrics & CTA */}
              <div className="space-y-8 pt-6 border-t border-[#C5C4C2]/40">
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <div className="text-2xl sm:text-3xl font-black text-marketing-accent">4X</div>
                    <div className="text-[9px] font-bold text-neutral-500 uppercase tracking-wider font-mono">LESS CACS</div>
                  </div>
                  <div className="border-l border-[#C5C4C2]/40 pl-4">
                    <div className="text-2xl sm:text-3xl font-black text-marketing-accent">3X</div>
                    <div className="text-[9px] font-bold text-neutral-500 uppercase tracking-wider font-mono">MORE ROI</div>
                  </div>
                  <div className="border-l border-[#C5C4C2]/40 pl-4">
                    <div className="text-2xl sm:text-3xl font-black text-marketing-accent">85%</div>
                    <div className="text-[9px] font-bold text-neutral-500 uppercase tracking-wider font-mono">HIGHER RESPONSE</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Graphic Column */}
            <div className="lg:col-span-5 bg-blue-50/50 p-8 sm:p-12 border-t lg:border-t-0 lg:border-l border-[#C5C4C2] flex flex-col justify-center items-center relative overflow-hidden select-none">
              <div className="w-full max-w-[340px] space-y-6 relative z-10">
                
                {/* Meta Header Steps */}
                <div className="flex items-center justify-between text-[9px] font-bold text-marketing-accent bg-white border border-[#C5C4C2] p-2 font-mono">
                  <span>AD</span>
                  <span>&rarr;</span>
                  <span className="bg-marketing-accent text-white px-1.5 py-0.5">CHAT</span>
                  <span>&rarr;</span>
                  <span>ENGAGE</span>
                  <span>&rarr;</span>
                  <span>CONVERT</span>
                </div>

                {/* Facebook Ad Mockup */}
                <div className="bg-white border border-[#C5C4C2] rounded-lg shadow-md overflow-hidden font-sans">
                  <div className="p-3 flex items-center gap-2 border-b border-[#C5C4C2]/40">
                    <div className="size-6 rounded-full bg-[#3b5998] flex items-center justify-center text-white text-[10px] font-black">f</div>
                    <div>
                      <div className="text-[10px] font-black text-black leading-none">Arabicana Coffee</div>
                      <span className="text-[7px] text-neutral-400 font-medium">Sponsored</span>
                    </div>
                  </div>
                  <div className="aspect-video bg-neutral-100 flex items-center justify-center relative">
                    <img 
                      src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=400" 
                      alt="Coffee Ad" 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 left-2 size-5 rounded-full bg-white/90 border border-neutral-300 flex items-center justify-center">
                      <span className="text-[9px] text-[#00b259] font-bold">&infin;</span>
                    </div>
                  </div>
                  <div className="p-3 flex justify-between items-center bg-neutral-50">
                    <div className="text-left">
                      <div className="text-[8px] text-neutral-400 font-bold uppercase tracking-wider">WWW.ARABICANA.COM</div>
                      <div className="text-[10px] font-black text-black">Ultimate Morning Coffee</div>
                    </div>
                    <button className="bg-[#00b259] text-white px-3 py-1.5 rounded-full text-[9px] font-black flex items-center gap-1 hover:opacity-90">
                      <MessageSquare className="size-2.5 fill-white stroke-none" />
                      Send Message
                    </button>
                  </div>
                </div>

                {/* Chat Bubbles */}
                <div className="space-y-3 font-sans">
                  {/* User Bubble */}
                  <div className="flex justify-end">
                    <div className="bg-[#DCF8C6] border border-[#b2d99d] text-black text-xs p-3 rounded-2xl rounded-tr-none max-w-[85%] text-left shadow-xs leading-relaxed font-medium">
                      I saw your ad and I'm interested in buying your product. Can you tell me more?
                    </div>
                  </div>
                  {/* Agent Bubble */}
                  <div className="flex justify-start">
                    <div className="bg-white border border-[#C5C4C2] text-black text-xs p-3 rounded-2xl rounded-tl-none max-w-[85%] text-left shadow-xs leading-relaxed font-medium">
                      Hi, Welcome to Arabicana! That's great to hear! I'd be happy to provide more details. ✨
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </motion.div>

          {/* Card 2: Sales (Light Purple) */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="bg-sales-bg border border-[#C5C4C2] rounded-none grid grid-cols-1 lg:grid-cols-12 overflow-hidden shadow-sm"
          >
            {/* Left Graphic Column (Reversed on desktop) */}
            <div className="lg:col-span-5 bg-purple-50/50 p-8 sm:p-12 border-b lg:border-b-0 lg:border-r border-[#C5C4C2] flex flex-col justify-center items-center relative overflow-hidden select-none order-2 lg:order-1">
              <div className="w-full max-w-[340px] space-y-6 relative z-10">
                
                {/* Flow Diagram */}
                <div className="flex items-center justify-between text-[9px] font-bold text-sales-accent bg-white border border-[#C5C4C2] p-2 font-mono">
                  <span>ENGAGE</span>
                  <span>&rarr;</span>
                  <span className="bg-sales-accent text-white px-1.5 py-0.5">QUALIFY</span>
                  <span>&rarr;</span>
                  <span>ASSIGN</span>
                  <span>&rarr;</span>
                  <span>WIN</span>
                </div>

                {/* Workflow Buttons Grid */}
                <div className="grid grid-cols-2 gap-2 text-[8.5px] font-bold text-neutral-800">
                  <div className="bg-white border border-[#C5C4C2] p-2 text-center rounded-none shadow-2xs">See Offer 🏷️</div>
                  <div className="bg-white border border-[#C5C4C2] p-2 text-center rounded-none shadow-2xs">Follow-up 📅</div>
                  <div className="bg-white border border-[#C5C4C2] p-2 text-center rounded-none shadow-2xs">View Catalog 📖</div>
                  <div className="bg-white border border-[#C5C4C2] p-2 text-center rounded-none shadow-2xs">Book Demo ⏰</div>
                </div>

                {/* Chat Bubbles Flow */}
                <div className="space-y-3 font-sans">
                  {/* User Bubble */}
                  <div className="flex justify-end">
                    <div className="bg-[#DCF8C6] border border-[#b2d99d] text-black text-xs p-3 rounded-2xl rounded-tr-none max-w-[85%] text-left shadow-xs leading-relaxed font-medium">
                      I'd like to schedule a product walkthrough.
                    </div>
                  </div>
                  {/* Bot Bubble */}
                  <div className="flex justify-start">
                    <div className="bg-white border border-[#C5C4C2] text-black text-xs p-3 rounded-2xl rounded-tl-none max-w-[85%] text-left shadow-xs leading-relaxed font-medium">
                      Happy to set up. Please let me know if I should add anyone else who'd be involved in taking a decision.
                    </div>
                  </div>
                  {/* Status Indicator */}
                  <div className="text-[8px] font-mono text-sales-accent bg-purple-100/50 border border-purple-200/60 p-1.5 text-center tracking-tight">
                    * Collecting qualification info before confirming meeting...
                  </div>
                  {/* User Bubble */}
                  <div className="flex justify-end">
                    <div className="bg-[#DCF8C6] border border-[#b2d99d] text-black text-xs p-3 rounded-2xl rounded-tr-none max-w-[85%] text-left shadow-xs leading-relaxed font-medium">
                      Thanks! I have shared the invite and forwarded your details to my sales team.
                    </div>
                  </div>
                  {/* Final Route Status */}
                  <div className="text-[8px] font-mono text-green-600 bg-green-100/50 border border-green-200/60 p-1.5 text-center tracking-tight">
                    ✓ Routed to Representative (Keith) for scheduling
                  </div>
                </div>

              </div>
            </div>

            {/* Right Info Column (Reversed on desktop) */}
            <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-between gap-10 text-left order-1 lg:order-2">
              <div className="space-y-6">
                <span className="text-[10px] font-bold tracking-wider text-sales-accent bg-purple-100 border border-purple-200 px-2.5 py-1 uppercase font-sans">
                  AIGreenTick for Sales
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-black font-display leading-snug">
                  Accelerate pipeline, increase conversions, and shorten sales cycles - all on chat
                </h3>
                <ul className="space-y-3.5">
                  {[
                    "One single workspace for all your sales reps to collaborate, communicate, and convert leads",
                    "Ensure no sales-ready leads slip through the cracks with real-time, instant qualification on your favorite messaging channel",
                    "Manage high lead volume easily on WhatsApp; use AI to qualify leads and hand off the best-fit ones to your reps automatically",
                    "Monitor customer chats easily and ensure high-quality customer experience to avoid reputation risks"
                  ].map((bullet, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="flex items-center justify-center size-5 bg-purple-100 text-sales-accent border border-purple-200 rounded-full shrink-0 mt-0.5">
                        <Check className="size-3 stroke-[3]" />
                      </span>
                      <span className="text-sm text-neutral-700 leading-relaxed font-sans font-medium">{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Metrics & CTA */}
              <div className="space-y-8 pt-6 border-t border-[#C5C4C2]/40">
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <div className="text-2xl sm:text-3xl font-black text-sales-accent">30%</div>
                    <div className="text-[9px] font-bold text-neutral-500 uppercase tracking-wider font-mono">LESS CYCLE TIME</div>
                  </div>
                  <div className="border-l border-[#C5C4C2]/40 pl-4">
                    <div className="text-2xl sm:text-3xl font-black text-sales-accent">3X</div>
                    <div className="text-[9px] font-bold text-neutral-500 uppercase tracking-wider font-mono">FASTER RESPONSES</div>
                  </div>
                  <div className="border-l border-[#C5C4C2]/40 pl-4">
                    <div className="text-2xl sm:text-3xl font-black text-sales-accent">20%</div>
                    <div className="text-[9px] font-bold text-neutral-500 uppercase tracking-wider font-mono">REVENUE GROWTH</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card 3: Support (Light Yellow) */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="bg-support-bg border border-[#C5C4C2] rounded-none grid grid-cols-1 lg:grid-cols-12 overflow-hidden shadow-sm"
          >
            {/* Left Info Column */}
            <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-between gap-10 text-left">
              <div className="space-y-6">
                <span className="text-[10px] font-bold tracking-wider text-support-accent bg-amber-100 border border-amber-200 px-2.5 py-1 uppercase font-sans">
                  AIGreenTick for Support
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-black font-display leading-snug">
                  Delight customers and handle questions at scale - Work in perfect harmony with AI
                </h3>
                <ul className="space-y-3.5">
                  {[
                    "Provide instant, accurate answers grounded in your knowledge base 24/7 and resolve most queries without human involvement",
                    "Intelligently route complex conversations to the right human agent by setting advanced routing rules",
                    "Collaborate better with a unified Team Inbox for all messaging platforms, with tags, contact attributes, history, and more",
                    "Enhance your support operations with data-driven insights on response time, resolutions, and agent-wise performance"
                  ].map((bullet, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="flex items-center justify-center size-5 bg-amber-100 text-support-accent border border-amber-200 rounded-full shrink-0 mt-0.5">
                        <Check className="size-3 stroke-[3]" />
                      </span>
                      <span className="text-sm text-neutral-700 leading-relaxed font-sans font-medium">{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Metrics & CTA */}
              <div className="space-y-8 pt-6 border-t border-[#C5C4C2]/40">
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <div className="text-2xl sm:text-3xl font-black text-support-accent">40%</div>
                    <div className="text-[9px] font-bold text-neutral-500 uppercase tracking-wider font-mono">LESS WORKLOAD</div>
                  </div>
                  <div className="border-l border-[#C5C4C2]/40 pl-4">
                    <div className="text-2xl sm:text-3xl font-black text-support-accent">80%</div>
                    <div className="text-[9px] font-bold text-neutral-500 uppercase tracking-wider font-mono">FAQS RESOLVED</div>
                  </div>
                  <div className="border-l border-[#C5C4C2]/40 pl-4">
                    <div className="text-2xl sm:text-3xl font-black text-support-accent">40%</div>
                    <div className="text-[9px] font-bold text-neutral-500 uppercase tracking-wider font-mono">FASTER RESPONSE</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Graphic Column */}
            <div className="lg:col-span-5 bg-amber-50/50 p-8 sm:p-12 border-t lg:border-t-0 lg:border-l border-[#C5C4C2] flex flex-col justify-center items-center relative overflow-hidden select-none">
              <div className="w-full max-w-[340px] space-y-6 relative z-10">
                
                {/* Meta Header Steps */}
                <div className="flex items-center justify-between text-[9px] font-bold text-support-accent bg-white border border-[#C5C4C2] p-2 font-mono">
                  <span>INQUIRY</span>
                  <span>&rarr;</span>
                  <span>RESPOND</span>
                  <span>&rarr;</span>
                  <span className="bg-support-accent text-white px-1.5 py-0.5">RESOLVE</span>
                </div>

                {/* Chat Bubbles */}
                <div className="space-y-3 font-sans">
                  {/* User Bubble */}
                  <div className="flex justify-end">
                    <div className="bg-[#DCF8C6] border border-[#b2d99d] text-black text-xs p-3 rounded-2xl rounded-tr-none max-w-[85%] text-left shadow-xs leading-relaxed font-medium">
                      I can't access my account and was charged twice for my subscription.
                    </div>
                  </div>
                  {/* Bot Bubble */}
                  <div className="flex justify-start">
                    <div className="bg-white border border-[#C5C4C2] text-black text-xs p-3 rounded-2xl rounded-tl-none max-w-[85%] text-left shadow-xs leading-relaxed font-medium">
                      Hi! Your login issue is due to a password reset—please reset by clicking the button. The extra charge is being refunded; you'll get an update in 1-2 days. 🛠️
                    </div>
                  </div>
                </div>

                {/* Qualities Badges */}
                <div className="flex items-center justify-center gap-2 text-[8px] font-bold font-mono text-neutral-800">
                  <span className="bg-white border border-[#C5C4C2] px-2 py-1">MULTILINGUAL</span>
                  <span className="bg-white border border-[#C5C4C2] px-2 py-1">CONTEXTUAL</span>
                  <span className="bg-white border border-[#C5C4C2] px-2 py-1">EMPATHETIC</span>
                </div>

              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
