'use client'

import { use, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { 
  ArrowLeft, 
  ArrowRight, 
  Check, 
  ShoppingBag, 
  Activity, 
  GraduationCap, 
  Home, 
  Shield, 
  Plane, 
  Clock, 
  Users, 
  Star, 
  DollarSign, 
  BookOpen, 
  MessageSquare,
  Smartphone,
  CheckCircle2,
  Lock,
  Sparkles
} from 'lucide-react'
import Header from '@/components/shadcn-studio/blocks/hero-section-40/header'
import Footer from '@/components/shadcn-studio/blocks/footer/footer'
import { industriesData } from '@/lib/industries-data'
import type { Navigation } from '@/components/shadcn-studio/blocks/hero-section-40/hero-navigation'
import FAQ from '@/components/shadcn-studio/blocks/faq-component-04/faq-component-04'
import CTA from '@/components/shadcn-studio/blocks/cta-section-11/cta-section-11'
import LogoCloud from '@/components/shadcn-studio/blocks/logo-cloud-04/logo-cloud-04'
import { brandLogos } from '@/lib/brand-logos'

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
            icon: <ShoppingBag className='size-4' />
          },
          {
            title: 'Customer Onboarding',
            href: '/#features',
            description: 'Automate welcome emails, account setup, and key guidance.',
            icon: <ShoppingBag className='size-4' />
          },
          {
            title: 'Support Escalations',
            href: '/#features',
            description: 'Detect urgency and route issues to the right team faster.',
            icon: <ShoppingBag className='size-4' />
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

const iconMap: Record<string, any> = {
  ecommerce: ShoppingBag,
  healthcare: Activity,
  education: GraduationCap,
  realestate: Home,
  finance: Shield,
  travel: Plane,
}

const benefitIconMap: Record<string, any> = {
  ShoppingBag: ShoppingBag,
  Activity: Activity,
  GraduationCap: GraduationCap,
  Home: Home,
  Shield: Shield,
  Plane: Plane,
  Clock: Clock,
  Users: Users,
  Star: Star,
  DollarSign: DollarSign,
  BookOpen: BookOpen,
  MessageSquare: MessageSquare
}

const getIndustryBlueprints = (slug: string) => {
  const blueprints: Record<string, {
    heroTitle: string
    subtitle: string
    mockChat: { sender: 'user' | 'bot'; text: string; attachment?: string }[]
    useCases: { title: string; desc: string; bullets: string[]; bg: string; chat: string[] }[]
    features: { title: string; desc: string; icon: string }[]
    logos: string[]
  }> = {
    ecommerce: {
      heroTitle: "Recover lost carts and scale sales on WhatsApp",
      subtitle: "Acquire, manage, and engage online shoppers using official WhatsApp API campaigns and automated catalog checkouts.",
      mockChat: [
        { sender: 'user', text: "Did my order ship yet?" },
        { sender: 'bot', text: "Yes! Order #9834 has been shipped. Click here to track: green.tick/track-9834 🚚" }
      ],
      useCases: [
        {
          title: "Smarter Cart Recovery",
          desc: "Automatically remind shoppers about items left in their cart and nudge them with special discounts.",
          bullets: ["Trigger within 15 minutes of checkout exit", "Embed direct check-out buttons in the message"],
          bg: "bg-[#EAF3FF]",
          chat: ["Hey John! You left a Coffee Bag in your cart. Get 10% off using code COFFEE10.", "Thanks! Checking out now."]
        },
        {
          title: "Close More Sales",
          desc: "Let customers browse collections, select sizes, and complete purchases entirely inside chat.",
          bullets: ["Syncs automatically with Shopify & WooCommerce", "Interactive product grids with instant checkout"],
          bg: "bg-[#F8F2FF]",
          chat: ["View our summer collection below! 🏷️", "I'd like to buy the Premium Coffee Blend, Medium Roast."]
        },
        {
          title: "Better Shopping Outcomes",
          desc: "Deliver purchase confirmations, receipts, and live tracking details instantly.",
          bullets: ["98% open rates compared to email", "Automatic shipping updates on status changes"],
          bg: "bg-[#FFF9E6]",
          chat: ["Your order is confirmed! Payment of $34.50 received. 💳", "Awesome, thank you for the updates!"]
        }
      ],
      features: [
        { title: "Cart Recovery", desc: "Trigger personalized notifications with discounts to retrieve lost sales.", icon: "ShoppingBag" },
        { title: "Catalog Sync", desc: "Synchronize catalog items to let users browse products inside chat.", icon: "Activity" },
        { title: "Instant Payments", desc: "Collect payments securely using Stripe or UPI payment gateways.", icon: "DollarSign" },
        { title: "Order Status", desc: "Automate delivery and shipping update notifications in real-time.", icon: "Plane" },
        { title: "Campaign Drips", desc: "Broadcast seasonal coupons and new arrivals to targeted segments.", icon: "Users" },
        { title: "CRM Sync", desc: "Integrate customer chats with HubSpot, Shopify, or Salesforce.", icon: "Home" }
      ],
      logos: ["Shopify", "WooCommerce", "Razorpay", "Magento", "Stripe"]
    },
    healthcare: {
      heroTitle: "Manage consultations and patient care on WhatsApp",
      subtitle: "Simplify consultation bookings, distribute lab results, and automate medication compliance reminders.",
      mockChat: [
        { sender: 'user', text: "Can I reschedule my appointment for tomorrow?" },
        { sender: 'bot', text: "Sure! I have rescheduled your visit with Dr. Smith to 3:00 PM tomorrow. See you then! 🩺" }
      ],
      useCases: [
        {
          title: "Smarter Booking Concierge",
          desc: "Deploy a codeless booking assistant that handles scheduling, cancellations, and reschedules 24/7.",
          bullets: ["Syncs with clinic and doctor calendars instantly", "Reduces front-desk call volumes by 60%"],
          bg: "bg-[#EAF3FF]",
          chat: ["I'd like to book an appointment with Dr. Adams.", "Sure, we have slots at 10 AM or 2 PM. Please choose one."]
        },
        {
          title: "Close Clinic Queries",
          desc: "Send diagnostic lab results, prescriptions, and fitness plans directly to the patient's phone.",
          bullets: ["HIPAA-compliant document transfer", "1-click download right inside the chat window"],
          bg: "bg-[#F8F2FF]",
          chat: ["Your diagnostic reports are ready. Click below to view: Diagnostic_Report.pdf (2.4 MB)", "Thank you! Received it."]
        },
        {
          title: "Better Patient Outcomes",
          desc: "Set medication schedules and follow-up checkups automatically to ensure patient treatment success.",
          bullets: ["Automated daily morning/evening check-in alerts", "Patients confirm intake with simple interactive buttons"],
          bg: "bg-[#FFF9E6]",
          chat: ["Time for your morning dosage (Tablet A). Please reply 'Done' once taken.", "Done."]
        }
      ],
      features: [
        { title: "Appointment Bot", desc: "Set up interactive schedules for consultations and lab visits.", icon: "Activity" },
        { title: "Secure Reports", desc: "Deliver lab reports and prescriptions as secure PDF documents.", icon: "Shield" },
        { title: "Medication Alerts", desc: "Send daily check-ins for dosage reminders and compliance.", icon: "Clock" },
        { title: "Staff Routing", desc: "Identify urgent queries and route them to live clinical staff.", icon: "Users" },
        { title: "Feedback Surveys", desc: "Measure patient CSAT ratings automatically post-visit.", icon: "Star" },
        { title: "Database Sync", desc: "Connect conversations to your hospital or clinic EHR software.", icon: "Home" }
      ],
      logos: ["EHR Sync", "Apollo Clinic", "Practo", "LabCorp", "MediBud"]
    },
    education: {
      heroTitle: "Engage and grow student sign ups on WhatsApp",
      subtitle: "Acquire, manage, and engage students with official WhatsApp API registration campaigns and onboarding support.",
      mockChat: [
        { sender: 'user', text: "Can I get syllabus details for the MBA course?" },
        { sender: 'bot', text: "Here is the MBA Course Syllabus: MBA_Syllabus.pdf (1.8 MB). Registration is open! 🎓" }
      ],
      useCases: [
        {
          title: "Smarter Lead Screening",
          desc: "Answer course detail FAQs, capture student qualifications, and qualify enrollment interest 24/7.",
          bullets: ["Pre-screen candidates by stream, budget, and region", "Pass qualified inquiries to admissions teams instantly"],
          bg: "bg-[#EAF3FF]",
          chat: ["Can you tell me about the MBA admissions?", "Sure! Please share your graduation GPA and target stream."]
        },
        {
          title: "Close Admissions Leads",
          desc: "Send fee payment links for tuition, registration, or exams with automated reminders.",
          bullets: ["Integrates with native payment gateways", "Send automatic payment receipts upon completion"],
          bg: "bg-[#F8F2FF]",
          chat: ["Registration invoice for MBA: $120.00 due by Friday. [Pay Now]", "Paid! Here is my transaction receipt."]
        },
        {
          title: "Better Learning Outcomes",
          desc: "Send real-time exam timetables, cancellation alerts, and grading results dynamically.",
          bullets: ["High delivery rate ensures parents and students stay notified", "Broadcast schedules in seconds via templates"],
          bg: "bg-[#FFF9E6]",
          chat: ["Important: Physics exam rescheduled to Monday at 9:00 AM.", "Thanks for the notification!"]
        }
      ],
      features: [
        { title: "Student Screening", desc: "Filter prospective enrollments based on academic eligibility.", icon: "GraduationCap" },
        { title: "Fee Collection", desc: "Send tuition payment alerts and invoices directly in chat.", icon: "DollarSign" },
        { title: "Result Broadcasts", desc: "Push grading reports and academic updates to parents.", icon: "Users" },
        { title: "Class Reminders", desc: "Deliver automated alerts for lecture schedules and updates.", icon: "Clock" },
        { title: "AI Guided Tour", desc: "Resolve 24/7 inquiries regarding hostel, fees, and syllabus.", icon: "Activity" },
        { title: "Database Sync", desc: "Integrate with LeadSquared, HubSpot, or student databases.", icon: "Home" }
      ],
      logos: ["Vedantu", "Unacademy", "K12 Academy", "Byjus", "Simplilearn"]
    },
    realestate: {
      heroTitle: "Book site viewings and close property deals on WhatsApp",
      subtitle: "Capture qualified buyer leads, share high-res floor brochures, and automate site viewing coordinates.",
      mockChat: [
        { sender: 'user', text: "Can I schedule a site visit for Saturday?" },
        { sender: 'bot', text: "Of course! Booking confirmed for Green Meadows Block A, Saturday at 11:00 AM. See you there! 🏡" }
      ],
      useCases: [
        {
          title: "Smarter Lead Capture",
          desc: "Share site layouts, floor plans, and price booklets instantly upon customer inquiry.",
          bullets: ["Send high-resolution architectural blueprints as PDF", "99% open rates ensure buyers review materials"],
          bg: "bg-[#EAF3FF]",
          chat: ["Here is the Green Meadows Brochure: Brochure.pdf (4.8 MB) 📄", "Thank you, reviewing the floor plans!"]
        },
        {
          title: "Close More Bookings",
          desc: "Automate booking for property inspections, sync with sales rep calendars, and send site locations.",
          bullets: ["Sends automated Google Maps location pin on site visit day", "Reduces booking dropouts by 45%"],
          bg: "bg-[#F8F2FF]",
          chat: ["Would you like to book a site visit this weekend?", "Yes, Saturday morning at 11:00 AM works."]
        },
        {
          title: "Better Database Nudging",
          desc: "Re-engage cold database contacts when price reductions, new inventories, or special schemes launch.",
          bullets: ["Target contacts based on budget and BHK preferences", "Interactive buttons let leads opt-in to tours"],
          bg: "bg-[#FFF9E6]",
          chat: ["Good news! The 3BHK pricing has dropped by 5% this week. [View Units]", "Interested, please connect me with an agent."]
        }
      ],
      features: [
        { title: "Brochure Sharing", desc: "Deliver PDF brochures and project layout specifications instantly.", icon: "Home" },
        { title: "Site Visit Bot", desc: "Schedule site tours and coordinate availability with sales reps.", icon: "Clock" },
        { title: "Price Drop Alerts", desc: "Broadcast inventory updates and price reductions to warm leads.", icon: "Activity" },
        { title: "Lead Routing", desc: "Filter leads by budget and route them to region-specific agents.", icon: "Users" },
        { title: "Location Dispatch", desc: "Auto-share site directions and map pins on visit day.", icon: "Plane" },
        { title: "CRM Integration", desc: "Sync chat histories with Zoho, Salesforce, or PropTech CRMs.", icon: "Home" }
      ],
      logos: ["Rustomjee", "Hiranandani", "DLF", "Lodha Group", "Sobha Dev"]
    },
    finance: {
      heroTitle: "Send secure alerts and self-serve banking on WhatsApp",
      subtitle: "Deliver bank-grade OTP codes, trigger real-time transaction updates, and track loan status.",
      mockChat: [
        { sender: 'user', text: "What is my credit card outstanding balance?" },
        { sender: 'bot', text: "Your outstanding balance is $348.50. Minimum due is $15.00 by July 5th. 💳" }
      ],
      useCases: [
        {
          title: "Smarter OTP Dispatch",
          desc: "Deliver verification codes and security OTPs with low latency and high delivery success rates.",
          bullets: ["Processed via priority transaction API lines", "End-to-end encryption ensures total security"],
          bg: "bg-[#EAF3FF]",
          chat: ["Your verification code is: 483920. Valid for 5 minutes.", "Entered, verified successfully."]
        },
        {
          title: "Close Support Backlogs",
          desc: "Provide instant balance inquiries, interest rate lookups, and branch locator tools via secure chat bot.",
          bullets: ["Saves customer support agent workload by 40%", "Secured behind interactive verification flows"],
          bg: "bg-[#F8F2FF]",
          chat: ["Select an option: [Balance] [Recent Transactions] [Statement]", "Balance: $1,248.30."]
        },
        {
          title: "Better Loan Pipeline",
          desc: "Let clients track applications in real-time and request document uploads securely via chat.",
          bullets: ["Automate missing KYC document requests", "Notify applicants instantly on status approval"],
          bg: "bg-[#FFF9E6]",
          chat: ["Your Home Loan application is approved! Click to finalize: green.tick/loan", "Incredible news, thank you!"]
        }
      ],
      features: [
        { title: "Priority OTPs", desc: "Dispatch security codes with ultra-low latency (<3s).", icon: "Shield" },
        { title: "Self-Serve Balances", desc: "Automate account inquiries and transaction history lookups.", icon: "DollarSign" },
        { title: "Loan Tracking", desc: "Push application stage logs and prompt missing KYC docs.", icon: "Activity" },
        { title: "Secure Endpoints", desc: "Ensure compliance with ISO/IEC and financial regulations.", icon: "Shield" },
        { title: "Debit/Credit Alerts", desc: "Send automated transaction notifications in real-time.", icon: "Clock" },
        { title: "Core Banking Sync", desc: "Connect chat queries directly into core banking databases.", icon: "Home" }
      ],
      logos: ["HDFC Bank", "ICICI Bank", "SBI Cards", "Paytm", "PhonePe"]
    },
    travel: {
      heroTitle: "Deliver boarding passes and support travelers on WhatsApp",
      subtitle: "Distribute flight tickets, boarding passes, itineraries, and deploy a 24/7 AI concierge.",
      mockChat: [
        { sender: 'user', text: "Where is my hotel located?" },
        { sender: 'bot', text: "Your hotel (Grand Hyatt) is located at: 12 Broadway Street. Click for directions: google.maps/hyatt 📍" }
      ],
      useCases: [
        {
          title: "Smarter Ticket Delivery",
          desc: "Distribute boarding passes, tickets, and booking confirmations right after payment processing.",
          bullets: ["98% open rates ensure travelers retrieve documentation", "Send tickets as high-resolution PDF attachments"],
          bg: "bg-[#EAF3FF]",
          chat: ["Your flight ticket for AI-402 is confirmed. Download Boarding Pass: BoardingPass.pdf", "Got it, checking in now."]
        },
        {
          title: "Close Customer Queries",
          desc: "Let travelers query check-in times, breakfast options, or request room amenities on the go.",
          bullets: ["Resolves FAQs instantly without staff involvement", "Improves CSAT score ratings by 30%"],
          bg: "bg-[#F8F2FF]",
          chat: ["What time is breakfast served at the hotel?", "Breakfast is served from 7:00 AM to 10:30 AM at Cafe Grand."]
        },
        {
          title: "Better Travel Updates",
          desc: "Notify passengers about flight delays, boarding gate changes, or luggage pickup carousels in real-time.",
          bullets: ["Automated push alerts based on live GDS status", "Reduces passenger stress and airport friction"],
          bg: "bg-[#FFF9E6]",
          chat: ["Flight AI-402 is delayed by 15 mins. New boarding gate: 14B.", "Thanks for the update, heading to 14B."]
        }
      ],
      features: [
        { title: "Ticket Dispatch", desc: "Deliver booking details and boarding passes directly as PDFs.", icon: "Plane" },
        { title: "AI Concierge", desc: "Answer reservation FAQs and room service queries 24/7.", icon: "Activity" },
        { title: "Status Alerts", desc: "Push real-time flight delay and gate change notifications.", icon: "Clock" },
        { title: "Itinerary Guides", desc: "Broadcast travel schedules and hotel check-in instructions.", icon: "Users" },
        { title: "Feedback Bot", desc: "Trigger automated post-trip CSAT reviews in chat.", icon: "Star" },
        { title: "GDS Systems Sync", desc: "Integrate directly with GDS, Amadeus, or Sabre databases.", icon: "Home" }
      ],
      logos: ["MakeMyTrip", "EaseMyTrip", "Agoda", "Indigo", "AirIndia"]
    }
  }

  return blueprints[slug] || blueprints.ecommerce
}

export default function IndustryDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const router = useRouter()

  const ind = industriesData.find((i) => i.id === slug)
  const Icon = ind ? iconMap[ind.id] || ShoppingBag : ShoppingBag
  const bp = getIndustryBlueprints(slug)

  if (!ind) {
    return (
      <div className="flex flex-col min-h-screen bg-[#ECEBE9] text-black font-sans">
        <Header navigationData={navigationData} />
        <main className="flex-grow flex flex-col items-center justify-center py-20 text-center space-y-6">
          <h1 className="text-2xl font-black">404 - BLUEPRINT NOT FOUND</h1>
          <p className="text-neutral-500 text-sm max-w-md">The industry vertical you are looking for does not exist.</p>
          <Link
            href="/industries"
            className="px-6 py-2 border border-black hover:bg-black hover:text-[#ECEBE9] transition-all text-xs font-bold"
          >
            RETURN TO INDUSTRIES
          </Link>
        </main>
        <Footer />
      </div>
    )
  }

  const faqTabs = [
    {
      name: `${ind.title} FAQs`,
      value: 'general',
      faqs: ind.faqs.map((faq, i) => ({
        id: `faq-ind-${i}`,
        question: faq.question,
        answer: faq.answer
      }))
    },
    {
      name: 'General API',
      value: 'api',
      faqs: [
        {
          id: 'faq-gen-1',
          question: 'What is the WhatsApp Business API and do I need it?',
          answer:
            'WhatsApp Business API is the official Meta product designed for businesses that need to message customers at scale. Unlike the free WhatsApp Business app, the API supports automation, integrations and multi-agent inboxes. AI Greentick is an Official BSP — we get you set up in 10 minutes.'
        },
        {
          id: 'faq-gen-2',
          question: 'Can I get the Green Tick verification?',
          answer:
            'Yes. We help you apply for the WhatsApp Green Tick (verified business badge) for free on all paid plans. Approval depends on Meta\'s criteria — typically requires public press mentions.'
        }
      ]
    }
  ]

  return (
    <div className="flex flex-col min-h-screen bg-[#ECEBE9] text-black font-sans">
      {/* Header */}
      <Header navigationData={navigationData} />

      <main className="flex-grow">
        
        {/* Hero Section */}
        <section className="px-4 sm:px-6 lg:px-8 border-b border-[#C5C4C2] bg-[#ECEBE9]">
          <div className="mx-auto max-w-7xl border-x border-[#C5C4C2] px-4 sm:px-6 lg:px-8 py-12 space-y-12">
            
            {/* Back Button */}
            <div className="text-left">
              <Link
                href="/industries"
                className="inline-flex items-center gap-2 px-4 py-2 border border-[#C5C4C2] bg-[#ECEBE9] text-xs font-bold hover:border-black transition-colors"
                style={{ clipPath: 'polygon(6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%, 0 6px)' }}
              >
                <ArrowLeft className="size-4 text-[#00b259]" />
                <span>BACK TO BLUEPRINTS</span>
              </Link>
            </div>

            {/* Split Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pb-8">
              
              {/* Left Column Details */}
              <div className="lg:col-span-6 space-y-6 text-left">
                <div className="flex items-center gap-2">
                  <div className="p-2 border border-[#C5C4C2] bg-white text-black size-9 flex items-center justify-center shrink-0">
                    <Icon className="size-5 text-[#00b259]" />
                  </div>
                  <span className="px-2 py-0.5 text-[10px] font-bold text-[#00b259] border border-[#00b259]/30 bg-[#00b259]/5 uppercase tracking-widest">
                    {ind.title} BLUEPRINT
                  </span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-black tracking-tight">
                  {bp.heroTitle}
                </h1>

                <p className="text-neutral-500 text-sm sm:text-base leading-relaxed">
                  {bp.subtitle}
                </p>

                {/* Key Result Banner */}
                <div className="p-4 border border-[#00b259]/20 bg-[#00b259]/5 rounded-none flex items-center gap-3">
                  <div className="size-2 bg-[#00b259] rounded-full animate-ping" />
                  <div>
                    <div className="text-[10px] text-neutral-400 font-bold uppercase">PROVEN OUTCOME</div>
                    <div className="text-lg font-black text-black">{ind.metric}</div>
                  </div>
                </div>

                <div className="pt-4 flex flex-wrap gap-4">
                  <Link
                    href="#demo"
                    className="px-6 py-3 text-xs font-black text-white bg-gradient-to-r from-[#00b259] to-[#005c2b] hover:opacity-90 transition-opacity"
                    style={{ clipPath: 'polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)' }}
                  >
                    START 14-DAY FREE TRIAL
                  </Link>
                  <Link
                    href="#demo"
                    className="px-6 py-3 text-xs font-black text-black border border-[#C5C4C2] hover:bg-neutral-200/50 transition-colors bg-white"
                    style={{ clipPath: 'polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)' }}
                  >
                    BOOK SECTOR TOUR
                  </Link>
                </div>
              </div>

              {/* Right Column: Phone Mockup */}
              <div className="lg:col-span-6 flex justify-center lg:justify-end">
                <div className="relative w-[300px] h-[550px] bg-neutral-900 rounded-[40px] p-3 shadow-2xl border-4 border-neutral-800">
                  {/* Speaker & Sensor */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-neutral-900 rounded-b-2xl z-20 flex items-center justify-center">
                    <div className="w-12 h-1 bg-neutral-800 rounded-full" />
                  </div>

                  {/* Inside Screen */}
                  <div className="w-full h-full bg-[#ECEBE9] rounded-[32px] overflow-hidden flex flex-col relative">
                    
                    {/* Mock Chat Header */}
                    <div className="bg-[#005c2b] text-white p-3 pt-6 flex items-center gap-2 shrink-0">
                      <div className="size-8 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold font-mono">
                        {ind.title.substring(0, 2).toUpperCase()}
                      </div>
                      <div className="text-left">
                        <div className="text-xs font-bold leading-tight flex items-center gap-1">
                          {ind.title} Bot
                          <div className="size-1.5 bg-[#00b259] rounded-full" />
                        </div>
                        <span className="text-[8px] text-white/70 font-medium">Official Account</span>
                      </div>
                    </div>

                    {/* Chat Area */}
                    <div className="flex-grow p-3 space-y-3 overflow-y-auto text-left text-[11px] leading-relaxed">
                      {bp.mockChat.map((msg, i) => (
                        <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                          <div className={`p-2.5 rounded-2xl max-w-[85%] font-medium ${
                            msg.sender === 'user'
                              ? 'bg-[#DCF8C6] border border-[#b2d99d] text-black rounded-tr-none'
                              : 'bg-white border border-[#C5C4C2] text-black rounded-tl-none'
                          }`}>
                            {msg.text}
                          </div>
                        </div>
                      ))}

                      {/* Automated options mockup */}
                      <div className="mt-4 space-y-1.5">
                        <div className="text-[8.5px] font-bold text-neutral-400 uppercase tracking-widest font-mono text-center">
                          [ Choose an Option ]
                        </div>
                        <div className="grid grid-cols-1 gap-1">
                          <button className="bg-white border border-[#C5C4C2] p-2 text-center text-[10px] font-bold hover:bg-neutral-100 transition-colors">
                            🏷️ View Pricing Blueprints
                          </button>
                          <button className="bg-white border border-[#C5C4C2] p-2 text-center text-[10px] font-bold hover:bg-neutral-100 transition-colors">
                            📅 Book Instant Consultation
                          </button>
                          <button className="bg-white border border-[#C5C4C2] p-2 text-center text-[10px] font-bold hover:bg-neutral-100 transition-colors">
                            🙋 Chat with Live Agent
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Chat Footer Input */}
                    <div className="p-2 border-t border-[#C5C4C2] bg-white flex items-center gap-2">
                      <div className="flex-grow bg-neutral-100 border border-[#C5C4C2] rounded-full px-3 py-1.5 text-[10px] text-neutral-400 text-left font-sans">
                        Type a message...
                      </div>
                      <div className="size-7 rounded-full bg-[#00b259] flex items-center justify-center text-white font-mono text-xs">
                        &gt;
                      </div>
                    </div>

                  </div>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* Client Logos Bar */}
        <LogoCloud brandLogos={brandLogos} />

        {/* Use Cases Grid (6 Cards) */}
        <section className="px-4 sm:px-6 lg:px-8 border-b border-[#C5C4C2] bg-white py-16 sm:py-24">
          <div className="mx-auto max-w-7xl border-x border-[#C5C4C2] px-4 sm:px-6 lg:px-8 space-y-12">
            
            <div className="text-center space-y-4 max-w-3xl mx-auto font-sans">
              <span className="inline-block px-2.5 py-0.5 text-[10px] font-bold text-[#00b259] border border-[#00b259]/30 bg-[#00b259]/5">
                :: KEY BLUEPRINT CAPABILITIES ::
              </span>
              <h2 className="text-2xl sm:text-3xl font-sans font-bold text-black leading-snug">
                Automated use-cases engineered for {ind.title} growth
              </h2>
            </div>

            {/* 6-Card Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 font-sans">
              {bp.features.map((feat, i) => {
                const FeatIcon = benefitIconMap[feat.icon] || ShoppingBag
                return (
                  <div
                    key={i}
                    className="border border-[#C5C4C2] bg-[#ECEBE9]/30 p-6 flex flex-col justify-between h-[180px] hover:border-black transition-all group"
                    style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 10px 100%, 0 calc(100% - 10px))' }}
                  >
                    <div className="flex items-center justify-between w-full">
                      <div className="p-2 border border-[#C5C4C2] bg-white group-hover:border-black transition-colors">
                        <FeatIcon className="size-4 text-[#00b259]" />
                      </div>
                      <span className="text-[10px] font-mono font-bold text-neutral-400">[ 0{i + 1} ]</span>
                    </div>
                    <div className="text-left space-y-1 mt-4">
                      <h3 className="text-xs font-black uppercase text-black">{feat.title}</h3>
                      <p className="text-[11px] text-neutral-500 leading-normal font-sans">{feat.desc}</p>
                    </div>
                  </div>
                )
              })}
            </div>

          </div>
        </section>

        {/* Alternate Feature Sections (3 Rows) */}
        <section className="px-4 sm:px-6 lg:px-8 border-b border-[#C5C4C2] bg-[#ECEBE9]/30">
          <div className="mx-auto max-w-7xl border-x border-[#C5C4C2] px-4 sm:px-6 lg:px-8 py-16 sm:py-24 space-y-24">
            
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <span className="inline-block px-3 py-1 text-xs font-bold text-[#00b259] border border-[#00b259] bg-[#00b259]/10 font-mono tracking-wider">
                :: DETAILED USE CASES ::
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-black font-sans leading-tight">
                Communicate better to support high quality {ind.title} workflows with WhatsApp
              </h2>
            </div>

            <div className="space-y-20">
              {bp.useCases.map((uc, i) => {
                const isEven = i % 2 === 0
                return (
                  <div key={i} className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    
                    {/* Text block */}
                    <div className={`lg:col-span-6 space-y-6 text-left ${isEven ? 'order-1' : 'order-1 lg:order-2'}`}>
                      <h3 className="text-2xl font-bold text-black font-sans leading-tight">
                        {uc.title}
                      </h3>
                      <p className="text-sm text-neutral-600 leading-relaxed font-sans">
                        {uc.desc}
                      </p>
                      <ul className="space-y-3">
                        {uc.bullets.map((b, idx) => (
                          <li key={idx} className="flex items-start gap-2.5">
                            <span className="flex items-center justify-center size-5 bg-white border border-[#C5C4C2] rounded-full shrink-0 mt-0.5 text-[#00b259]">
                              <Check className="size-3 stroke-[3]" />
                            </span>
                            <span className="text-xs sm:text-sm text-neutral-700 leading-relaxed font-sans font-medium">{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Graphic block */}
                    <div className={`lg:col-span-6 ${uc.bg} border border-[#C5C4C2] p-8 sm:p-12 flex flex-col justify-center items-center rounded-none shadow-sm aspect-video ${isEven ? 'order-2' : 'order-2 lg:order-1'}`}
                      style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 15px 100%, 0 calc(100% - 15px))' }}
                    >
                      <div className="w-full max-w-[280px] space-y-3 text-[11px] leading-relaxed">
                        <div className="flex justify-end">
                          <div className="bg-[#DCF8C6] border border-[#b2d99d] text-black p-2.5 rounded-xl rounded-tr-none text-left font-medium">
                            {uc.chat[0]}
                          </div>
                        </div>
                        <div className="flex justify-start">
                          <div className="bg-white border border-[#C5C4C2] text-black p-2.5 rounded-xl rounded-tl-none text-left font-medium">
                            {uc.chat[1]}
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                )
              })}
            </div>

          </div>
        </section>

        {/* Dynamic Testimonials */}
        <section className="px-4 sm:px-6 lg:px-8 border-b border-[#C5C4C2] bg-white py-16 sm:py-24">
          <div className="mx-auto max-w-7xl border-x border-[#C5C4C2] px-4 sm:px-6 lg:px-8 space-y-12">
            
            <div className="text-center space-y-4 max-w-3xl mx-auto font-sans">
              <span className="inline-block px-2.5 py-0.5 text-[10px] font-bold text-[#00b259] border border-[#00b259]/30 bg-[#00b259]/5">
                :: CUSTOMER CASE STUDIES ::
              </span>
              <h2 className="text-2xl sm:text-3xl font-sans font-bold text-black">
                Over 15,000+ customers trust AIGreenTick
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left font-sans">
              
              {/* Testimonial Card 1 */}
              <div 
                className="border border-[#C5C4C2] bg-[#ECEBE9]/30 p-8 flex flex-col justify-between gap-6"
                style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 15px 100%, 0 calc(100% - 15px))' }}
              >
                <div className="space-y-4">
                  <div className="flex gap-1 text-[#00b259]">
                    <Star className="size-4 fill-current" />
                    <Star className="size-4 fill-current" />
                    <Star className="size-4 fill-current" />
                    <Star className="size-4 fill-current" />
                    <Star className="size-4 fill-current" />
                  </div>
                  <p className="text-xs sm:text-sm text-neutral-700 italic leading-relaxed">
                    "This platform completely transformed how we manage our customer queries. WhatsApp broadcasts have 98% open rates compared to email marketing, saving us massive CAC costs."
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="size-8 rounded-full bg-[#005c2b] text-white flex items-center justify-center font-bold text-xs">
                    AB
                  </div>
                  <div>
                    <h4 className="text-xs font-black uppercase text-black leading-none">Amanda Brown</h4>
                    <span className="text-[10px] text-neutral-400 font-medium">Head of Operations, Retail Hub</span>
                  </div>
                </div>
              </div>

              {/* Testimonial Card 2 */}
              <div 
                className="border border-[#C5C4C2] bg-[#ECEBE9]/30 p-8 flex flex-col justify-between gap-6"
                style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 15px 100%, 0 calc(100% - 15px))' }}
              >
                <div className="space-y-4">
                  <div className="flex gap-1 text-[#00b259]">
                    <Star className="size-4 fill-current" />
                    <Star className="size-4 fill-current" />
                    <Star className="size-4 fill-current" />
                    <Star className="size-4 fill-current" />
                    <Star className="size-4 fill-current" />
                  </div>
                  <p className="text-xs sm:text-sm text-neutral-700 italic leading-relaxed">
                    "Implementing the custom AI booking concierge bot reduced no-shows by 45%. Patients love the convenience of booking directly inside WhatsApp."
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="size-8 rounded-full bg-[#005c2b] text-white flex items-center justify-center font-bold text-xs">
                    JK
                  </div>
                  <div>
                    <h4 className="text-xs font-black uppercase text-black leading-none">John Kim</h4>
                    <span className="text-[10px] text-neutral-400 font-medium">Managing Director, CareSync Clinic</span>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* Homepage CTA Section */}
        <CTA />

        {/* Dynamic FAQ Section */}
        <div id="faq">
          <FAQ tabs={faqTabs} />
        </div>

      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
