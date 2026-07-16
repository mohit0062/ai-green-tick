import { brandLogos } from '@/lib/brand-logos'

export const DEFAULT_FALLBACKS: Record<string, any> = {
  navbar: {
    logoText: "AI Greentick",
    logoImageUrl: "/logo-full.png",
    demoBtnText: "BOOK A DEMO",
    demoBtnLink: "/#demo",
    calendlyUrl: "https://calendly.com/demo-apargoinnovations/30min",
    standaloneLinks: [
      { title: "Features", href: "/#features" },
      { title: "Solutions", href: "/industries" },
      { title: "Pricing", href: "/pricing" },
      { title: "Integrations", href: "/integrations" },
      { title: "Blog", href: "/blog" },
      { 
        title: "Company", 
        href: "#", 
        type: "dropdown", 
        dropdownItems: [
          { title: "About Us", description: "Learn about our mission and story.", href: "/about" },
          { title: "Contact Us", description: "Get in touch with our team.", href: "/contact" },
          { title: "Careers", description: "Join us and build the future of AI.", href: "/careers" }
        ] 
      }
    ]
  },
  footer: {
    description: "AI Greentick is an enterprise-grade WhatsApp Business API platform offering automated marketing campaigns, shared team inboxes, smart routing, and custom AI agents.",
    copyright: "2026 AI Greentick, Made with ❤️ for a better web.",
    logoImageUrl: "/logo-full.png",
    socialLinks: {
      github: "https://github.com",
      instagram: "https://instagram.com",
      twitter: "https://twitter.com",
      youtube: "https://youtube.com"
    },
    linkColumns: [
      {
        title: "Product",
        links: [
          { title: "Features", href: "/#features" },
          { title: "Broadcasts", href: "/#features" },
          { title: "AI Chatbot", href: "/#features" },
          { title: "Shared Inbox", href: "/team-inbox" },
          { title: "Campaigns", href: "/#features" },
          { title: "Integrations", href: "/integrations" },
          { title: "Pricing", href: "/pricing" }
        ]
      },
      {
        title: "Company",
        links: [
          { title: "About Us", href: "/about" },
          { title: "Solutions", href: "/industries" },
          { title: "Careers", href: "/careers" },
          { title: "Contact", href: "/contact" }
        ]
      },
      {
        title: "Resources",
        links: [
          { title: "Blog", href: "/blog" },
          { title: "Help Center", href: "/pricing#comparison-matrix" }
        ]
      }
    ],
    bottomLinks: [
      { title: "Privacy Policy", href: "/privacy-policy" },
      { title: "Terms of Service", href: "/terms-of-service" }
    ]
  },
  cta: {
    heading: "Ready to make WhatsApp your #1 channel?",
    description: "Join the 500+ brands using AIGreentick to scale conversations and conversions.",
    buttonText: "Start Free Trial",
    buttonHref: "/#demo",
    secondaryButtonText: "Talk to Sales",
    secondaryButtonHref: "/#demo",
    services: ["Broadcasts", "Shared Inbox", "AI Chatbots"]
  },
  seo: {
    siteTitle: "AI Greentick",
    titleTemplate: "%s | AI Greentick",
    defaultDescription: "AI Greentick — Enterprise WhatsApp Business API platform. Automated campaigns, team inboxes, and AI chatbots.",
    keywords: "whatsapp business api, whatsapp automation, team inbox, ai chatbot, campaigns, marketing",
    ogImage: "/og-image.png",
    ogType: "website",
    ogSiteName: "AI Greentick",
    twitterCard: "summary_large_image",
    robots: "index, follow",
    canonicalBase: "https://aigreentick.com"
  },
  industries_page_builder: {
    seo: {
      metaTitle: "Solutions & Industries | AI Greentick",
      metaDescription: "WhatsApp Automation solutions across different verticals - eCommerce, Healthcare, Education, Real Estate, Finance, Travel.",
      metaKeywords: "whatsapp automation, ecommerce whatsapp, healthcare chatbot, real estate automation",
      ogImage: "/wdececpng.png"
    },
    sections: [
      {
        id: "hero-section",
        type: "hero",
        visible: true,
        content: {
          heading: "WhatsApp Automation\nfor Every Industry",
          subtitle: "AIGreenTick powers WhatsApp automation for eCommerce, healthcare, education, real estate, finance, and travel businesses. Industry-specific chatbots, campaigns, and integrations.",
          heroImageUrl: "/wdececpng.png"
        }
      },
      {
        id: "selector-section",
        type: "verticals_selector",
        visible: true,
        content: {}
      },
      {
        id: "grid-section",
        type: "verticals_grid",
        visible: true,
        content: {}
      },
      {
        id: "journey-section",
        type: "journey",
        visible: true,
        content: {}
      },
      {
        id: "capabilities-section",
        type: "capabilities",
        visible: true,
        content: {
          cards: [
            { title: "COLLABORATIVE TEAM INBOX", desc: "Invite support agents, sales reps, and managers. Work together on incoming customer inquiries with assignments, tags, and internal notes.", icon: "Users" },
            { title: "CODELESS CHATBOT BUILDER", desc: "Build automated conversation trees, catalog product recommendations, and payment checkout flows in minutes using a visual grid editor.", icon: "MessageSquare" },
            { title: "AI AGENTS & INTEGRATIONS", desc: "Deploy context-aware LLM agents that solve FAQs. Integrate seamlessly with HubSpot, Shopify, Zoho, Salesforce, and custom endpoints.", icon: "Sparkles" }
          ]
        }
      },
      {
        id: "cta-section",
        type: "cta",
        visible: true,
        content: {}
      }
    ]
  },
  industry_teams: [
    {
      id: 'marketing',
      title: 'Marketing',
      tagline: 'Broadcast and grow your audience',
      description: 'Launch personalized broadcasts, automate customer alerts, and convert Facebook & Instagram Click-to-WhatsApp ads with native, instant workflows.',
      previewType: 'marketing-preview',
      link: '/#features'
    },
    {
      id: 'sales',
      title: 'Sales',
      tagline: 'Convert leads and book meetings',
      description: 'Deploy 24/7 AI agents to qualify incoming leads, share interactive catalogs, collect payments in chat, and sync deals to HubSpot or Salesforce.',
      previewType: 'sales-preview',
      link: '/#features'
    },
    {
      id: 'support',
      title: 'Support',
      tagline: 'Offer instant, 24/7 customer care',
      description: 'Collaborate with a shared team inbox on a single WhatsApp number. Auto-route chats, assign agents, and measure CSAT automatically.',
      previewType: 'support-preview',
      link: '/team-inbox'
    }
  ],
  industry_features: [
    {
      id: 'unified-inbox',
      title: 'Unified Inbox',
      shortDesc: 'Single numbers for multi-agent support',
      description: 'Empower hundreds of support reps to log in and reply from a single business number. Collaborate seamlessly on customer chats.',
      icon: 'Inbox',
      link: '/team-inbox',
      previewType: 'shared-inbox-feat'
    },
    {
      id: 'chatbot',
      title: 'Chatbot Builder',
      shortDesc: 'Build drag-and-drop conversational paths',
      description: 'Design interactive, menu-driven chat flows using an intuitive visual flowchart builder. Set up and automate in minutes.',
      icon: 'Bot',
      link: '/#about',
      previewType: 'codeless-bot'
    },
    {
      id: 'ai-analytics',
      title: 'AI Analytics',
      shortDesc: 'Track response times and CSAT',
      description: 'Access real-time analytics dashboards detailing individual agent response speeds, resolution counts, and customer feedback.',
      icon: 'BarChart2',
      link: '/#about',
      previewType: 'perf-reports'
    },
    {
      id: 'broadcasting',
      title: 'WhatsApp Broadcasting',
      shortDesc: 'Send bulk updates to thousands of users',
      description: 'Import contacts and broadcast offers, newsletters, and reminders in bulk with fully approved Meta templates.',
      icon: 'Megaphone',
      link: '/#about',
      previewType: 'broadcast-feat'
    },
    {
      id: 'campaigns',
      title: 'Campaign Drips',
      shortDesc: 'Drip nurture sequences & announcements',
      description: 'Nurture leads automatically over time by triggering scheduled sequences, tutorials, and promotional follow-ups.',
      icon: 'CalendarClock',
      link: '/#about',
      previewType: 'drip-sequences'
    },
    {
      id: 'ads-manager',
      title: 'Ads Manager',
      shortDesc: 'Convert ads directly to conversations',
      description: 'Send traffic from Facebook and Instagram straight into a personal chat, bypassing traditional high-friction landing pages.',
      icon: 'Sparkles',
      link: '/#about',
      previewType: 'ads-feat'
    }
  ],
  solutions_list: [
    {
      id: 'ecommerce',
      title: 'eCommerce Solution',
      shortDesc: 'Recover lost carts and sell inside chats',
      description: 'Integrate directly with Shopify, WooCommerce, and custom checkout flows to engage dropouts and collect checkout payments.',
      icon: 'ShoppingBag',
      link: '/solutions/ecommerce',
      previewType: 'ecommerce-solution'
    },
    {
      id: 'healthcare',
      title: 'Healthcare Solution',
      shortDesc: 'Book consultation slots & share reports',
      description: 'Automate appointment scheduling, rescheduling, diagnostic lab reports distribution, and medication checkups securely.',
      icon: 'Activity',
      link: '/solutions/healthcare',
      previewType: 'healthcare-solution'
    }
  ],
  contact_page: {
    heading: "Tell Us What You're Building.",
    subtitle: "Fill the form below or email us directly. You'll hear back within one working day from a team member.",
    mapUrl: "https://maps.google.com/maps?hl=en&q=Jaipur+Rajasthan+India&t=&z=12&ie=UTF8&iwloc=B&output=embed",
    contactCards: [
      {
        icon: "Mail",
        title: "Chat to Sales",
        description: "Talk to our team about WhatsApp API setup and integration",
        ctaText: "hello@aigreentick.com",
        ctaLink: "mailto:hello@aigreentick.com"
      },
      {
        icon: "Mail",
        title: "Email Support",
        description: "Get help with your existing AI Greentick workspace",
        ctaText: "support@aigreentick.com",
        ctaLink: "mailto:support@aigreentick.com"
      },
      {
        icon: "MapPin",
        title: "Visit Us",
        description: "Jaipur, Rajasthan, India",
        ctaText: "View on maps",
        ctaLink: "https://maps.google.com/?q=Jaipur+Rajasthan+India"
      },
      {
        icon: "Phone",
        title: "Phone / WhatsApp",
        description: "10am - 7pm IST, Mon - Fri",
        ctaText: "hello@aigreentick.com",
        ctaLink: "mailto:hello@aigreentick.com"
      }
    ],
    officeSection: {
      badgeText: ":: CHANNELS & AVAILABILITY ::",
      heading: "Where to find us.",
      phone: {
        title: "Phone / WhatsApp",
        line1: "10am – 7pm IST, Mon – Fri",
        line2: "WhatsApp preferred for quick questions"
      },
      office: {
        title: "Office",
        line1: "Remote-first team",
        line2: "Headquartered in Jaipur, Rajasthan, India"
      },
      hours: {
        title: "Office Hours",
        monFri: "Mon – Fri: 10:00am – 7:00pm IST",
        saturday: "Saturday: On-call only for production issues",
        sunday: "Sunday: Closed"
      }
    },
    stepsSection: {
      badgeText: ":: RESPONSE PROCESS ::",
      heading: "What happens after you submit",
      steps: [
        {
          number: "1",
          title: "Instant confirmation",
          description: "You get an instant confirmation email."
        },
        {
          number: "2",
          title: "Expert reviews",
          description: "Within one working day, a team member reviews your enquiry."
        },
        {
          number: "3",
          title: "Honest reply",
          description: "We reply with either a 30-minute call slot, a written response, or clear next steps."
        },
        {
          number: "4",
          title: "Onboarding & setup",
          description: "If we move forward – we handle verification, API onboarding, and workspace setup."
        }
      ]
    }
  },
  about_page: {
    pageTitle: "About Us",
    visibility: "visible",
    seoTitle: "About AI Greentick - WhatsApp Marketing & AI Automation",
    seoUrl: "aigreentick.com/about",
    seoDesc: "Learn about AI Greentick, our story, mission, and the team building modern WhatsApp marketing and automation systems.",
    missionSection: {
      badgeText: "MISSION",
      heading: "Our mission is simple.",
      description: "Most WhatsApp Business platforms give you messaging tools. We build communication infrastructure. The difference matters - because your business needs more than a broadcast button. It needs a complete system: official API access, verified identity, intelligent automation, real-time analytics, and a team that stands behind you. That's AIGreenTick.",
      imageUrl: "https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/about-us/image-45.png",
      contentHeading: "Conversations that convert, powered by official APIs and custom AI.",
      paragraph1: "AI Greentick started as an internal tool designed to solve scale and delivery bottlenecks for customer broadcasts.",
      paragraph2: "We quickly recognized that D2C brands and modern teams needed more than just a broadcast list — they needed a unified hub where marketing, sales, and support could collaborate without losing context.",
      paragraph3: "By integrating official WhatsApp Business API capabilities with custom large language models (LLMs), we built a platform that allows teams to broadcast campaigns, manage shared team inbox queues, and design smart AI chatbots.",
      paragraph4: "Today, AI Greentick helps hundreds of high-growth brands across e-commerce, real estate, education, and finance to automate support and drive high-impact marketing campaigns at scale."
    },
    problemSection: {
      badge: "THE PROBLEM WE SOLVE",
      heading: "WhatsApp is India's most-used platform. Most businesses are using it wrong.",
      subheading: "We transition your operations from standard chat apps to enterprise-grade conversational infrastructure.",
      features: [
        {
          title: "No API access",
          description: "Most businesses use the WhatsApp Business App - limited, unscalable, and not built for teams. The official API unlocks everything."
        },
        {
          title: "No trust signal",
          description: "A phone number isn't a brand. A verified Green Tick business profile is. We make the verification process effortless."
        },
        {
          title: "No automation",
          description: "Manually responding to hundreds of conversations a day burns your team. We automate 80% of it, so your team focuses on what matters."
        }
      ]
    },
    whySection: {
      badge: "WHY WE BUILT THIS",
      heading: "India deserved a WhatsApp platform built for India.",
      description: "Global platforms like WATI and Respond.io are built for Western markets. They have generic workflows, no UPI payment support, no regional language features, no India-timezone support, and no understanding of how Indian businesses actually operate. AIGreenTick is different. Every feature, every integration, every support process is built with Indian businesses in mind - from Shopify D2C brands in Bengaluru to real estate firms in Mumbai to coaching institutes in Jaipur."
    },
    metaSection: {
      badge: "SECTION 5 - META AUTHORIZATION",
      heading: "Officially authorized by Meta. Fully compliant.",
      body: "AIGreenTick is an authorized Meta Business Solution Provider (BSP) for the WhatsApp Business API. This means your business gets direct, compliant access to Meta's official infrastructure - the same API used by the world's largest enterprises, made accessible to businesses of every size."
    }
  },
  industry_list: [
    {
      id: 'ecommerce',
      title: 'eCommerce & Retail',
      desc: 'Recover lost carts, send order alerts, and sell directly inside chats.',
      shortDesc: 'Recover lost carts and sell inside chats',
      metric: '35% Cart Recovery Rate',
      image: '/ecommerce_dashboard.png',
      icon: 'ShoppingBag',
      previewType: 'ecommerce',
      seoTitle: 'WhatsApp API for eCommerce & Retail | Recover Carts, Sell Inside Chat | AI Greentick',
      seoDescription: 'Recover abandoned carts, sell through WhatsApp Catalog, and automate order updates. See how eCommerce and D2C brands use AI Greentick\'s WhatsApp Business API.',
      seoKeywords: 'whatsapp commerce, cart recovery whatsapp, shopify whatsapp, woocommerce meta catalog',
      useCases: [
        'Recover abandoned carts automatically 15 minutes after exit',
        'Sync product catalog and complete checkout inside the chat',
        'Send proactive order confirmation and shipping updates',
        'Run targeted broadcast promotions using Meta-approved templates',
        'Deploy a 24/7 AI chatbot trained on your product catalog'
      ],
      problemSection: {
        description: 'Most eCommerce brands lose 60-80% of carts at checkout, and the follow-up channel — email — gets a 20% open rate at best. Your customers are on WhatsApp all day; your recovery messages are sitting in a Promotions tab they never open.',
        bullets: [
          'Abandoned carts recovered manually, if at all',
          'Order status questions flooding a support inbox instead of resolving themselves',
          'Promotions sent over email or SMS with low open and click rates'
        ]
      },
      features: [
        {
          title: 'Abandoned Cart Recovery',
          description: 'Trigger a WhatsApp message the moment a cart is abandoned — not a day later.',
          bullets: [
            'Fires automatically 15 minutes after checkout dropout, while intent is still warm',
            'Includes the exact cart contents, a direct checkout link, and an optional discount code',
            'Retargets non-converters again at 24 hours with a second nudge template'
          ]
        },
        {
          title: 'WhatsApp Catalog & In-Chat Checkout',
          description: 'Turn your product catalog into a WhatsApp-native storefront.',
          bullets: [
            'Sync your full Shopify/WooCommerce catalog to Meta Catalogue in one connection',
            'Customers browse, add to cart, and complete UPI/card checkout without leaving the chat',
            'New product drops and restocks can be broadcast straight into the same catalog view'
          ]
        },
        {
          title: 'Order & Shipping Updates',
          description: 'Replace "Where\'s my order?" tickets with proactive updates.',
          bullets: [
            'Instant order confirmation the moment payment clears',
            'Automated shipping, out-for-delivery, and delivered notifications synced from your courier/CRM',
            'Return and refund status updates without a support agent lifting a finger'
          ]
        },
        {
          title: 'Broadcast Campaigns & Promotions',
          description: 'Run marketing broadcasts that don\'t get your number flagged.',
          bullets: [
            'Segment contacts by purchase history, cart value, or product category before sending',
            'Approved promotional templates with quick-reply buttons ("Shop Now", "See Offer")',
            'Delivery, open, and click analytics per campaign to double down on what converts'
          ]
        },
        {
          title: 'AI Chatbot for Order & Product Queries',
          description: 'Automate the repetitive 70% of customer questions.',
          bullets: [
            'Answers sizing, stock, delivery timeline, and return-policy questions instantly, 24/7',
            'Escalates anything it can\'t resolve to a live agent with full conversation context',
            'Trained on your product catalog and FAQ content — no code required to set up'
          ]
        }
      ],
      integrations: ['Shopify', 'WooCommerce', 'Razorpay', 'Stripe', 'Google Sheets', 'Zapier (for any other cart/CRM system)'],
      benchmarkResults: 'Industry benchmarks for WhatsApp-driven cart recovery typically fall between 20-35% of otherwise-lost carts, with WhatsApp broadcast open rates averaging 90%+ versus ~20% for email. Actual results depend on catalog size, discount strategy, and audience opt-in quality.',
      caseStudy: '[CASE STUDY — How [Brand] recovered ₹X in abandoned carts in their first 30 days with AI Greentick]',
      faqs: [
        {
          question: 'Can customers pay for products directly inside WhatsApp?',
          answer: 'Yes — WhatsApp Commerce supports UPI, net banking, and card payments inside the chat window, so the entire purchase happens without a redirect.'
        },
        {
          question: 'Will this get my WhatsApp number banned for spam?',
          answer: 'No — all promotional messages use Meta-approved templates sent only to opted-in contacts, which keeps your phone quality rating green and avoids the ban risk of manual bulk-forwarding.'
        },
        {
          question: 'How is this different from just using WhatsApp Business App?',
          answer: 'The free app caps you at 256 contacts and no automation. The API removes that limit and adds cart recovery, catalog sync, and multi-agent support the app can\'t do.'
        },
        {
          question: 'Does the abandoned cart flow work with my existing Shopify theme?',
          answer: 'Yes — it listens to your store\'s checkout events via webhook, so it works regardless of your theme or checkout customization.'
        },
        {
          question: 'How long does setup take?',
          answer: 'Most stores connect their catalog and launch their first abandoned-cart flow within a day of onboarding, using pre-built templates.'
        }
      ]
    },
    {
      id: 'healthcare',
      title: 'Healthcare & Wellness',
      desc: 'Simplify consultation bookings, share reports, and push alerts.',
      shortDesc: 'Book consultation slots & share reports',
      metric: '80% Fewer Missed Bookings',
      image: '/healthcare_dashboard.png',
      icon: 'Activity',
      previewType: 'healthcare',
      seoTitle: 'WhatsApp API for Healthcare & Wellness | Appointments, Reports, Reminders | AI Greentick',
      seoDescription: 'Reduce missed appointments, share reports securely, and automate patient follow-ups on WhatsApp. Built for clinics, diagnostic labs, and wellness practices.',
      seoKeywords: 'healthcare whatsapp bot, patient appointment reminders, secure lab reports, DPDP compliance',
      useCases: [
        'Automate appointment scheduling, rescheduling, and cancellation',
        'Send secure diagnostic lab report PDF files to patients',
        'Deploy automated reminders for medication intake and checkups',
        'Route emergency patient requests instantly to doctor desks',
        'Provide a 24/7 AI FAQ chatbot to reduce front-desk call load'
      ],
      problemSection: {
        description: 'No-shows don\'t just cost a slot — they cost a patient\'s continuity of care, and a phone-call-only reminder system doesn\'t scale past a few dozen patients a day.',
        bullets: [
          'Front desk staff spending hours on manual reminder calls',
          'Reports and prescriptions shared over unsecured channels or handed over in person only',
          'No structured follow-up after a consultation, so complications get caught late'
        ]
      },
      features: [
        {
          title: 'Appointment Scheduling & Reminders',
          description: 'Cut no-shows without adding headcount.',
          bullets: [
            'Automated reminders sent 24 hours and 1 hour before every consultation',
            'Patients can confirm, reschedule, or cancel with a single WhatsApp reply',
            'Doctor/slot-wise calendar sync so double-booking doesn\'t happen'
          ]
        },
        {
          title: 'Secure Report & Prescription Sharing',
          description: 'Deliver results the moment they\'re ready.',
          bullets: [
            'Lab reports, prescriptions, and discharge summaries sent directly to the patient\'s phone',
            'End-to-end encrypted delivery, DPDP Act compliant handling of patient data',
            'Optional PIN-protected access for especially sensitive reports'
          ]
        },
        {
          title: 'Patient Follow-up & Care Journeys',
          description: 'Turn a single visit into an ongoing care relationship.',
          bullets: [
            'Automated post-consultation check-ins at 24 hours, 3 days, and 1 week',
            'Prescription refill reminders based on dosage cycles and course length',
            'Chronic-care patients get recurring check-in flows without manual tracking'
          ]
        },
        {
          title: 'Multi-Doctor, Multi-Branch Routing',
          description: 'Built for clinics and hospital groups, not just solo practices.',
          bullets: [
            'Route incoming messages to the right doctor, department, or branch automatically',
            'Shared inbox so reception, nursing staff, and doctors see the same patient thread',
            'Internal notes let staff hand off a case without losing context'
          ]
        },
        {
          title: 'AI FAQ Chatbot',
          description: 'Handle the repetitive questions before they reach your front desk.',
          bullets: [
            'Answers clinic hours, location, insurance, and pre-visit prep questions instantly',
            'Escalates anything urgent or clinical to a human staff member immediately',
            'Works 24/7, including outside clinic hours'
          ]
        }
      ],
      integrations: ['Google Calendar', 'Practice management software (via API/webhook)', 'Payment gateway for consultation fees', 'CRM/EHR systems (custom integration)'],
      benchmarkResults: 'Clinics using structured WhatsApp appointment reminders commonly see no-show reductions in the 50-80% range compared to no reminder system, and report meaningfully faster response times on patient queries. Actual results vary by patient volume and how consistently reminders are enabled.',
      caseStudy: '[CASE STUDY — insert your first real clinic/hospital result here]',
      faqs: [
        {
          question: 'Is patient data secure and compliant on WhatsApp?',
          answer: 'AI Greentick is DPDP Act compliant and runs on Meta\'s end-to-end encrypted WhatsApp Business API, with role-based access controls for your staff.'
        },
        {
          question: 'Can this replace our existing appointment booking software?',
          answer: 'It layers on top of it — AI Greentick handles reminders, confirmations, and follow-ups, while your booking system stays the source of truth for the schedule.'
        },
        {
          question: 'Can patients reschedule directly through WhatsApp?',
          answer: 'Yes — a single-tap reply lets patients confirm, reschedule, or cancel, and the change reflects back in your calendar automatically.'
        },
        {
          question: 'Does this work for multi-location clinics or hospital chains?',
          answer: 'Yes — multi-number and department-based routing means each branch or department manages its own patient queue on the same platform.'
        },
        {
          question: 'What happens if a patient asks something the chatbot can\'t answer?',
          answer: 'It escalates immediately to a live staff member with the full conversation history, so nothing gets stuck in a bot loop.'
        }
      ]
    },
    {
      id: 'education',
      title: 'Education & EdTech',
      desc: 'Enroll students, answer course queries, and automate alerts.',
      shortDesc: 'Enroll students and automate alerts',
      metric: '3x Admissions Conversions',
      image: '/education_dashboard.png',
      icon: 'GraduationCap',
      previewType: 'education',
      seoTitle: 'WhatsApp API for Education & EdTech | Admissions, Fees, Batch Updates | AI Greentick',
      seoDescription: 'Convert more admissions, automate counselor follow-ups, and never miss a fee deadline. WhatsApp automation for coaching institutes, colleges, and EdTech platforms.',
      seoKeywords: 'whatsapp edtech, admissions bot, fee reminders whatsapp, class notifications',
      useCases: [
        'Pre-qualify and route lead queries to admissions counselors',
        'Automate schedules, class timetables, and exam result broadcasts',
        'Send automated fee due reminders with direct payment links',
        'Establish counselor follow-up nurture drip campaigns',
        'Answer syllabus and hostel accommodation FAQs automatically'
      ],
      problemSection: {
        description: 'Admission leads go cold within hours if follow-up isn\'t instant, and most institutes are still following up manually through calls that don\'t scale during peak season.',
        bullets: [
          'Enquiries from ads and website forms sitting unanswered for hours or days',
          'Counselors juggling spreadsheets instead of a structured follow-up flow',
          'Fee reminders and document collection chased over phone calls'
        ]
      },
      features: [
        {
          title: 'Instant Lead Capture from Ads',
          description: 'Turn every ad click into a live conversation, not a form.',
          bullets: [
            'Meta and Google Click-to-WhatsApp ads open directly into a chat — no landing page drop-off',
            'Capture name and number automatically without asking the user to type it',
            'Leads route into your CRM or spreadsheet in real time'
          ]
        },
        {
          title: 'Automated Counselor Follow-up Sequences',
          description: 'Never let an enquiry go cold after the first reply.',
          bullets: [
            'Pre-built nurture sequences for days 1, 3, and 7 after first contact',
            'Counselors get notified when a lead re-engages, so follow-up stays human where it matters',
            'Full conversation history visible to any counselor picking up the thread'
          ]
        },
        {
          title: 'Admissions Chatbot Qualification',
          description: 'Pre-qualify before a counselor spends a single minute.',
          bullets: [
            'Chatbot asks course interest, budget, and timeline before handing off',
            'Hot leads get routed to a counselor instantly; cold leads go into a longer nurture flow',
            'Reduces counselor time spent on unqualified enquiries'
          ]
        },
        {
          title: 'Fee Reminders & Document Collection',
          description: 'Stop chasing paperwork over calls.',
          bullets: [
            'Automated fee due-date reminders with a direct payment link',
            'Structured document upload flows for ID proof, marksheets, and photos',
            'Status tracking so admin staff can see exactly what\'s pending per student'
          ]
        },
        {
          title: 'Batch & Result Broadcasts',
          description: 'Reach entire cohorts in one message.',
          bullets: [
            'Broadcast batch schedules, exam dates, and timetable changes instantly',
            'Send result announcements and next-step instructions to an entire class at once',
            'Segment broadcasts by batch, course, or campus'
          ]
        }
      ],
      integrations: ['Meta Ads & Google Ads', 'Google Sheets', 'CRM/LMS platforms', 'Payment gateways for fee collection'],
      benchmarkResults: 'Institutes that move from manual to WhatsApp-automated follow-up commonly see meaningfully higher lead-to-admission conversion, largely because response time drops from hours to seconds. Actual multiplier depends on lead volume, counselor bandwidth, and existing conversion baseline.',
      caseStudy: '[CASE STUDY — insert your first real institute/EdTech result here]',
      faqs: [
        {
          question: 'Can this handle high lead volume during admission season?',
          answer: 'Yes — the AI chatbot pre-qualifies and routes leads to the right counselor automatically, so seasonal spikes don\'t overwhelm your team.'
        },
        {
          question: 'Can parents and students be messaged on separate flows?',
          answer: 'Yes — you can maintain separate contact segments and templates for parents vs. students, with different messaging cadence for each.'
        },
        {
          question: 'Does it work for both offline institutes and online EdTech platforms?',
          answer: 'Yes — coaching institutes, colleges, and EdTech platforms all use the same core workflows, with vertical-specific templates for each.'
        },
        {
          question: 'Can we collect documents like ID proof and marksheets through WhatsApp?',
          answer: 'Yes, through structured upload flows with status tracking, so admin staff can see what\'s submitted and what\'s still pending per student.'
        },
        {
          question: 'How fast can we launch our first admissions chatbot?',
          answer: 'Most institutes go live with lead capture and a basic qualification flow within a few days of onboarding.'
        }
      ]
    },
    {
      id: 'realestate',
      title: 'Real Estate',
      desc: 'Capture qualified buyer leads, schedule site viewings, and share brochures.',
      shortDesc: 'Capture leads and schedule site viewings',
      metric: '60% More Site Visits',
      image: '/realestate_dashboard.png',
      icon: 'Home',
      previewType: 'realestate',
      seoTitle: 'WhatsApp API for Real Estate | Leads, Site Visits, Project Launches | AI Greentick',
      seoDescription: 'Capture leads, schedule site visits, and broadcast new project launches on WhatsApp. Built for developers, brokers, and channel partners.',
      seoKeywords: 'real estate whatsapp, site visit scheduling, property catalog, buyer lead qualification',
      useCases: [
        'Screen potential buyers on location and budget preferences',
        'Deliver floor plans, blueprints, and project PDF brochures instantly',
        'Coordinate and schedule site viewings directly inside the chat',
        'Launch bulk marketing alerts for new residential project launches',
        'Push price drop updates and dynamic token payment details'
      ],
      problemSection: {
        description: 'In real estate, the first response wins the lead — and most enquiries still wait for a callback that comes hours later, by which point the buyer has already messaged three other builders.',
        bullets: [
          'Enquiries from portals and ads waiting hours for a human callback',
          'Brochures and floor plans emailed or shared as bulky PDFs over calls',
          'No structured way to qualify budget and location fit before booking a site visit'
        ]
      },
      features: [
        {
          title: 'Instant Property Catalog & Virtual Tours',
          description: 'Answer "send me details" in seconds, not hours.',
          bullets: [
            'Share floor plans, pricing sheets, and project brochures instantly inside the chat',
            'Send video walkthroughs and virtual tour links directly in the conversation',
            'Buyers browse multiple projects without waiting for an agent to reply'
          ]
        },
        {
          title: 'Site Visit Scheduling & Reminders',
          description: 'Turn interest into a booked, attended visit.',
          bullets: [
            'In-chat scheduling with available slot options, no back-and-forth calls',
            'Automated reminder 24 hours and 2 hours before the visit to cut no-shows',
            'Post-visit follow-up triggered automatically to gauge interest and next steps'
          ]
        },
        {
          title: 'Project Launch Broadcasts',
          description: 'Reach your entire qualified buyer list the moment a project goes live.',
          bullets: [
            'Broadcast new launches, price updates, and limited-period offers instantly',
            'Segment by budget range, location preference, or property type',
            'Track opens and clicks per broadcast to see which projects generate real interest'
          ]
        },
        {
          title: 'Lead Qualification & RM Routing',
          description: 'Stop your sales team from chasing unqualified enquiries.',
          bullets: [
            'AI chatbot asks budget, location, and timeline before a lead reaches a human',
            'Hot leads route directly to the right relationship manager or territory',
            'Full lead context (source, budget, prior chats) travels with the handoff'
          ]
        },
        {
          title: 'Post-Visit Follow-up & Nurture',
          description: 'Keep the conversation alive after the visit.',
          bullets: [
            'Automated check-in the day after a site visit to gauge interest',
            'Nurture sequences for buyers who need more time, without manual reminders',
            'Broadcast updates on inventory, price changes, or possession timelines to warm leads'
          ]
        }
      ],
      integrations: ['Salesforce', 'Zoho CRM', 'HubSpot', 'Google Maps (for location sharing)', 'Payment/booking gateways for token amounts'],
      benchmarkResults: 'Developers using structured WhatsApp lead-qualification and reminder flows commonly see meaningfully higher site-visit attendance and faster first-response time compared to call-based follow-up. Actual improvement depends on lead source quality and RM follow-through.',
      caseStudy: '[CASE STUDY — insert your first real developer/broker result here]',
      faqs: [
        {
          question: 'Can I share floor plans, brochures, and video walkthroughs through WhatsApp?',
          answer: 'Yes — PDFs, images, and video content can all be shared as part of an automated or agent-led conversation, right inside the chat.'
        },
        {
          question: 'How does lead qualification actually work?',
          answer: 'The AI chatbot asks a short set of qualifying questions — budget, location, timeline — before handing the lead to a sales rep, so your team focuses only on serious buyers.'
        },
        {
          question: 'Does this integrate with our existing CRM?',
          answer: 'Yes — Salesforce, HubSpot, Zoho, and custom CRMs are supported, so every WhatsApp lead syncs back into your existing pipeline automatically.'
        },
        {
          question: 'Can this reduce site-visit no-shows?',
          answer: 'Yes — automated reminders sent the day before and a couple of hours before the scheduled visit are the single biggest lever for reducing no-shows.'
        },
        {
          question: 'Can channel partners and brokers use the same platform?',
          answer: 'Yes — you can give channel partners their own agent access within the shared inbox so they can manage their leads without a separate tool.'
        }
      ]
    },
    {
      id: 'finance',
      title: 'Banking & Finance',
      desc: 'Send secure OTP verification alerts, statement updates, and loan tracking.',
      shortDesc: 'Dispatch secure transaction OTP alerts',
      metric: 'Bank-Grade Data Security',
      image: '/finance_dashboard.png',
      icon: 'Shield',
      previewType: 'finance',
      seoTitle: 'WhatsApp API for Banking & Finance | Secure OTPs, Alerts, EMI Reminders | AI Greentick',
      seoDescription: 'Send secure OTPs, transaction alerts, and EMI reminders on WhatsApp with bank-grade compliance. Built for NBFCs, insurers, and fintech platforms.',
      seoKeywords: 'banking whatsapp api, secure financial otp, emi payment reminders, secure document collection',
      useCases: [
        'Deliver login verification and transaction OTPs instantly',
        'Broadcast automated monthly statements and low balance logs',
        'Send scheduled EMI repayment reminders with direct checkout links',
        'Collect ID, address proofs, and income docs securely via chat',
        'Deploy 24/7 AI chatbots to answer credit outstanding queries'
      ],
      problemSection: {
        description: 'Financial communication can\'t afford to be casual, delayed, or non-compliant — but most institutions are still relying on SMS (easily spoofed) or email (poor open rates) for time-sensitive alerts.',
        bullets: [
          'OTPs and alerts delivered over SMS with rising spoofing and delivery issues',
          'Loan/EMI reminders chased manually, increasing delinquency risk',
          'KYC document collection scattered across email, courier, and in-branch visits'
        ]
      },
      features: [
        {
          title: 'Secure OTP & Authentication Alerts',
          description: 'Purpose-built for compliance-sensitive delivery.',
          bullets: [
            'Uses Meta\'s Authentication template category — separate from marketing messages, with stricter delivery guarantees',
            'Login verification, transaction OTPs, and 2FA codes delivered instantly',
            'End-to-end encrypted, reducing spoofing risk compared to SMS'
          ]
        },
        {
          title: 'Transaction & Statement Notifications',
          description: 'Keep customers informed in real time.',
          bullets: [
            'Instant debit/credit transaction alerts synced from your core banking or ledger system',
            'Automated monthly statement and low-balance notifications',
            'Fraud alert broadcasts for suspicious activity, sent immediately'
          ]
        },
        {
          title: 'EMI & Loan Repayment Reminders',
          description: 'Reduce delinquency without adding a collections call center.',
          bullets: [
            'Automated reminders at 7, 3, and 1 days before an EMI due date',
            'Payment link included directly in the reminder message',
            'Post-due follow-up sequences for missed payments, before escalation to a collections call'
          ]
        },
        {
          title: 'Secure KYC Document Collection',
          description: 'Replace in-branch visits and email attachments.',
          bullets: [
            'Structured document-upload flows for ID proof, address proof, and income documents',
            'Status tracking so your compliance team sees exactly what\'s submitted and pending',
            'Encrypted storage and transfer, aligned with DPDP Act requirements'
          ]
        },
        {
          title: 'Query Resolution Chatbot',
          description: 'Handle routine account questions without a call center queue.',
          bullets: [
            'Answers balance enquiries, branch locations, and process questions instantly',
            'Escalates anything account-specific or sensitive to a verified human agent',
            'Available 24/7, including outside branch hours'
          ]
        }
      ],
      integrations: ['Core banking/NBFC systems (via secure API)', 'Payment gateways', 'Document verification/e-KYC providers', 'CRM systems'],
      benchmarkResults: 'Institutions moving OTP and alert delivery to WhatsApp typically see improved delivery reliability compared to SMS (which faces rising spam-filtering and spoofing issues), along with faster EMI collection cycles when automated reminders are paired with a direct payment link. Actual results depend on customer opt-in rates and existing collections process.',
      caseStudy: '[CASE STUDY — insert your first real NBFC/insurer/fintech result here]',
      faqs: [
        {
          question: 'Is this compliant for OTPs and financial alerts?',
          answer: 'Yes — Authentication-category templates are Meta-approved specifically for OTPs and login verification, kept separate from marketing messages, with stricter delivery guarantees.'
        },
        {
          question: 'Can we collect KYC documents securely through WhatsApp?',
          answer: 'Yes, through structured document-upload flows with status tracking, so your compliance team always knows what\'s been submitted and what\'s outstanding.'
        },
        {
          question: 'What data protection standards does AI Greentick meet?',
          answer: 'The platform is DPDP Act compliant and ISO 27001 certified, running on Meta\'s end-to-end encrypted WhatsApp Business API infrastructure.'
        },
        {
          question: 'How does this integrate with our core banking system?',
          answer: 'Through a secure API/webhook connection — transaction events, due dates, and account triggers can push directly into automated WhatsApp flows.'
        },
        {
          question: 'Can this replace SMS for OTP delivery entirely?',
          answer: 'Many institutions run both in parallel initially, then shift volume to WhatsApp as they see improved delivery rates and lower spoofing risk.'
        }
      ]
    },
    {
      id: 'travel',
      title: 'Travel & Hospitality',
      desc: 'Send flight alerts, boarding passes, itineraries, and 24/7 support.',
      shortDesc: 'Send ticket alerts and boarding passes',
      metric: '92% Customer Satisfaction',
      image: '/travel_dashboard.png',
      icon: 'Plane',
      previewType: 'travel',
      seoTitle: 'WhatsApp API for Travel & Hospitality | Tickets, Boarding Passes, Itineraries | AI Greentick',
      seoDescription: 'Send ticket alerts, boarding passes, and itinerary updates on WhatsApp. Built for airlines, travel agencies, tour operators, and hospitality brands.',
      seoKeywords: 'travel whatsapp API, boarding pass on whatsapp, travel chatbot, flight delay alerts',
      useCases: [
        'Deliver tickets, booking confirmations, and boarding passes instantly',
        'Send real-time check-in, boarding alerts, and terminal changes',
        'Broadcast proactive disruption or weather-related delays',
        'Automate post-trip feedback collection and loyalty rebooking',
        'Deploy a multilingual AI chatbot for global passenger inquiries'
      ],
      problemSection: {
        description: 'Travel is stressful by nature, and every delayed update — a gate change, a flight delay, a missing confirmation — makes it worse and drives a call to your support line.',
        bullets: [
          'Booking confirmations and e-tickets buried in email inboxes travelers don\'t check on the go',
          'Delays and gate changes reaching guests late, or not at all',
          'Post-trip feedback and rebooking handled manually, if at all'
        ]
      },
      features: [
        {
          title: 'Instant Booking Confirmation & E-Tickets',
          description: 'Deliver the confirmation where travelers will actually see it.',
          bullets: [
            'E-tickets, boarding passes, and booking confirmations sent instantly after checkout',
            'QR codes and PDFs delivered directly in the chat, no app download required',
            'Booking changes reflected automatically in the same conversation thread'
          ]
        },
        {
          title: 'Check-in & Boarding Alerts',
          description: 'Keep travelers ahead of every deadline.',
          bullets: [
            'Automated check-in window reminders before the check-in cutoff',
            'Real-time gate, terminal, and boarding time alerts as they change',
            'Baggage allowance and document reminders sent ahead of travel day'
          ]
        },
        {
          title: 'Itinerary & Disruption Broadcasts',
          description: 'Turn a delay into a proactive update, not a support ticket.',
          bullets: [
            'Broadcast weather delays, schedule changes, and rebooking options proactively',
            'Full itinerary shared in one message for multi-leg or multi-day trips',
            'Segment broadcasts by route, departure date, or booking type'
          ]
        },
        {
          title: 'Post-Trip Feedback & Rebooking',
          description: 'Close the loop and open the next booking.',
          bullets: [
            'Automated feedback request sent shortly after trip completion',
            'Personalized rebooking offers based on past destinations or travel dates',
            'Loyalty and repeat-customer nudges without a manual follow-up list'
          ]
        },
        {
          title: 'Multilingual Support Chatbot',
          description: 'Serve international travelers without a multilingual support team.',
          bullets: [
            'Auto-detects and translates incoming guest messages from 100+ languages',
            'Replies composed in your language auto-convert back to the guest\'s language',
            'Escalates complex requests to a human agent with full translated context'
          ]
        }
      ],
      integrations: ['Booking engines / GDS systems', 'Payment gateways', 'CRM systems', 'Google Maps (for property/location sharing)'],
      benchmarkResults: 'Travel and hospitality brands using proactive WhatsApp updates for bookings and disruptions commonly see fewer inbound support calls and higher guest satisfaction scores, since travelers get the update before they have to ask for it. Actual improvement depends on how completely booking-system events are connected to automated triggers.',
      caseStudy: '[CASE STUDY — insert your first real airline/agency/hotel result here]',
      faqs: [
        {
          question: 'Can this send real-time flight or booking changes?',
          answer: 'Yes — itinerary changes, delays, and gate updates can trigger automatically from your booking system via webhook or API integration.'
        },
        {
          question: 'Does it support multiple languages for international travelers?',
          answer: 'Yes — the chat layer supports 100+ languages, including auto-translation for inbound guest queries and outbound replies.'
        },
        {
          question: 'Can hotels use this alongside airlines and tour operators?',
          answer: 'Yes — the same platform covers bookings, check-in reminders, and guest feedback for hotels, tour operators, and airlines under one account.'
        },
        {
          question: 'Can we send boarding passes and e-tickets without a separate app?',
          answer: 'Yes — PDFs and QR codes are delivered directly inside the WhatsApp chat, so guests don\'t need to download or log into anything else.'
        },
        {
          question: 'How does this handle disruptions like weather delays?',
          answer: 'Once connected to your booking/ops system, disruption broadcasts can be triggered automatically and segmented to only the affected travelers.'
        }
      ]
    }
  ],
  careers_page: {
    seoTitle: "Careers at AI Greentick — Build WhatsApp-First Systems",
    seoDesc: "Open engineering, AI, design, and product roles at AI Greentick. Remote-friendly, senior-heavy team building India's leading WhatsApp marketing platform.",
    hero: {
      badge: "CAREERS",
      heading: "Join the team building India's leading WhatsApp marketing platform.",
      description: "AI Greentick is a small, senior-heavy team building modern communication and AI automation infrastructure. You'll write code that goes live in days, see your work used by thousands of businesses, and operate with high autonomy without bureaucratic friction."
    },
    fitSignals: [
      {
        iconName: "ShieldCheckIcon",
        title: "Senior judgement",
        description: "You have a proven track record of building and deploying scalable systems. You understand the delicate balance between shipping quickly and maintaining code quality."
      },
      {
        iconName: "MessageSquareTextIcon",
        title: "Written communication",
        description: "We're async-first. If you cannot explain a decision in writing, we will not move fast."
      },
      {
        iconName: "BadgeCheckIcon",
        title: "Ownership",
        description: "From spec to deploy to on-call to bug fixes. We do not split build and maintain into separate teams."
      },
      {
        iconName: "SparklesIcon",
        title: "Curiosity over credentials",
        description: "We do not care where you went to school. We care what you've built and what you're learning."
      }
    ],
    benefits: [
      {
        iconName: "Globe2Icon",
        title: "Remote-friendly",
        description: "Most of the team works from wherever they do their best work, with optional coworking support in select cities."
      },
      {
        iconName: "BriefcaseBusinessIcon",
        title: "Senior-only pay bands",
        description: "We pay above market for senior builders. We are not hiring juniors at this stage."
      },
      {
        iconName: "GraduationCapIcon",
        title: "Learning budget",
        description: "Annual budget for courses, books, conferences, and the learning loops that make you sharper."
      },
      {
        iconName: "LaptopIcon",
        title: "Hardware that works",
        description: "Your choice of laptop, a decent monitor, and the tools you need to ship without fighting the setup."
      },
      {
        iconName: "RocketIcon",
        title: "Real product impact",
        description: "Your code goes live in production for real users, including AI Greentick customers."
      },
      {
        iconName: "UsersRoundIcon",
        title: "Equity for early team",
        description: "Meaningful ESOPs for the first 30 hires, because ownership should show up on the cap table too."
      }
    ],
    hiringSteps: [
      {
        title: "Application",
        description: "A short form or email. We read every one and look for shipped work."
      },
      {
        title: "First call",
        description: "30 minutes with a hiring manager. No surprise live coding."
      },
      {
        title: "Take-home or paid trial",
        description: "A real, scoped task. We pay for serious trials because your time matters."
      },
      {
        title: "Pairing round",
        description: "60 to 90 minutes working through a practical problem with a senior teammate."
      },
      {
        title: "Founder chat",
        description: "30 to 45 minutes focused on mutual fit, ambition, and how we work."
      },
      {
        title: "Offer",
        description: "Usually within 2 weeks of the first call when both sides want to move."
      }
    ],
    notForYou: [
      "You need a manager to break work into tiny daily tickets before you can move.",
      "You prefer handing work off instead of owning the deploy, support loop, and cleanup.",
      "You avoid writing decisions down and rely on meetings to recover context.",
      "You want greenfield work only and dislike maintaining systems that real users depend on."
    ],
    heroStats: [
      { value: "Days", label: "from idea to production, not quarters" },
      { value: "Senior", label: "team shape by default" },
      { value: "2 weeks", label: "typical offer timeline after first call" }
    ]
  },
  logo_cloud: {
    heading: "Loved by growing brands across 15+ industries",
    logos: brandLogos
  },
  homepage_data: {
    pricingSubtitle: "Simple pricing. No surprises. No markups.",
    pricingDescription: "Choose the best plan for your business. One flat platform fee plus official Meta conversation charges with zero markups.",
    hero: {
      tagline: "WhatsApp Marketing & Automation",
      title: "WhatsApp Marketing & Automation",
      badgeText: "New",
      badgeTextSecondary: "Official WhatsApp API",
      heading: "Turn every WhatsApp conversation into revenue",
      subheading: "AI Greentick is the all-in-one WhatsApp Business Suite to broadcast offers, automate replies with AI, manage every chat from a shared inbox, and run ads that click to WhatsApp. Built for D2C brands, agencies and growth teams.",
      ctaText: "Book a demo",
      ctaLink: "#demo",
      secondaryCtaText: "Free Trial",
      secondaryCtaLink: "#trial",
      arrowLink: "/about",
      metrics: [
        { value: "98.2%", label: "Open Rate" },
        { value: "24%", label: "ROI Growth" },
        { value: "4,850+", label: "Leads Qual" },
        { value: "24/7", label: "AI Support" }
      ]
    },
    tabsDataFeaturesSection26: [
      {
        id: 'marketing',
        title: 'Marketing',
        points: [
          'Broadcast personalized campaigns to 100K+ contacts with high delivery',
          'Run Click-to-WhatsApp ads and track every conversion',
          'Re-engage abandoned carts and dormant customers automatically'
        ]
      },
      {
        id: 'sales',
        title: 'Sales',
        points: [
          'Qualify and route leads automatically using conversational AI',
          'Share interactive product catalogs and collect payments in chat',
          'Sync conversations with CRM tools (HubSpot, Salesforce) in real-time'
        ]
      },
      {
        id: 'support',
        title: 'Support',
        points: [
          'Deploy 24/7 AI Agents to resolve FAQs instantly',
          'Multi-agent shared team inbox with quick routing and collaboration',
          'Measure CSAT, response times, and chat metrics automatically'
        ]
      }
    ],
    processSteps: [
      {
        title: 'Connect your number',
        description: 'We help you onboard to the Official WhatsApp Business API, verify your business with Meta and apply for the Green Tick — all done in 10 minutes.',
        progress: 25,
        progressLabel: '25%',
        duration: '10 minutes'
      },
      {
        title: 'Import contacts & launch',
        description: 'Upload contacts, build your first broadcast, invite agents to the shared inbox, and design a basic chatbot flow. Templates included.',
        progress: 50,
        progressLabel: '50%',
        duration: '1 hour'
      },
      {
        title: 'Automate & optimize',
        description: 'Add abandoned cart flows, post-purchase journeys, FAQ bots. Track every metric. Iterate based on real engagement data.',
        progress: 75,
        progressLabel: '75%',
        duration: '1 day'
      },
      {
        title: 'Scale across teams',
        description: 'Roll out to marketing, sales and support. Connect your CRM, Shopify or custom stack. Grow without growing headcount.',
        progress: 100,
        progressLabel: '100%',
        duration: 'Continuous'
      }
    ],
    metricsData: [
      {
        value: '98%',
        title: 'Open Rates',
        subtitle: 'vs 22% for email'
      },
      {
        value: '45-60%',
        title: 'Click Rates',
        subtitle: 'vs 3% for email'
      },
      {
        value: '2.6B+',
        title: 'Active Users',
        subtitle: 'your customers are already here'
      },
      {
        value: '7×',
        title: 'Engagement',
        subtitle: 'vs email (Meta & Gartner research)'
      }
    ],
    testimonials: [
      {
        id: '1',
        avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-40.png',
        fallback: 'AG',
        name: 'Ankit Gupta',
        designation: 'Founder',
        companyName: 'SaffronStays',
        companyLogo: '/images/logos/logo-1.webp',
        message: "AI Greentick has completely transformed our guest communication. Automated check-in instructions and booking confirmations now flow seamlessly, leading to a 35% improvement in guest satisfaction."
      },
      {
        id: '2',
        avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-55.png',
        fallback: 'RS',
        name: 'Rahul Sharma',
        designation: 'Marketing Head',
        companyName: 'upGrad',
        companyLogo: '/images/logos/logo-9.webp',
        message: "We used AI Greentick to launch our course advisory broadcasts. By qualifying leads automatically via WhatsApp chatbots, we saw a 3x increase in admissions conversions."
      },
      {
        id: '3',
        avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-34.png',
        fallback: 'SM',
        name: 'Sneha Mehta',
        designation: 'E-commerce Manager',
        companyName: 'Sabyasachi',
        companyLogo: '/images/logos/logo-5.webp',
        message: "Recovering abandoned carts was our biggest challenge. With AI Greentick's automated cart recovery flows and UPI payment links in chat, we recovered 24% of lost sales on autopilot."
      },
      {
        id: '4',
        avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-43.png',
        fallback: 'VM',
        name: 'Vikram Malhotra',
        designation: 'Sales Director',
        companyName: 'Rustomjee',
        companyLogo: '/images/logos/logo-2.webp',
        message: "Sharing high-res property brochures and scheduling site visits is now entirely automated. Our sales reps only step in when the buyer is ready, boosting site viewings by 60%."
      },
      {
        id: '5',
        avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-57.png',
        fallback: 'AV',
        name: 'Dr. Amit Verma',
        designation: 'Operations Head',
        companyName: 'Dentzz',
        companyLogo: '/images/logos/logo-14.webp',
        message: "Booking consultations and sending diagnostic reports as PDFs directly to WhatsApp has cut our appointment no-shows by 80%. Highly secure and compliant."
      },
      {
        id: '6',
        avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-58.png',
        fallback: 'PN',
        name: 'Priya Nair',
        designation: 'Customer Support Manager',
        companyName: 'MakeMyTrip',
        companyLogo: '/images/logos/logo-10.webp',
        message: "Managing support for thousands of daily travelers on a single WhatsApp number seemed impossible. AI Greentick's shared team inbox and automated routing made it a breeze."
      }
    ],
    securityItems: [
      {
        title: 'Official BSP',
        description: 'Verified Meta Business Solution Provider'
      },
      {
        title: 'GDPR Compliant',
        description: 'Your customer data stays protected'
      },
      {
        title: 'End-to-end Encrypted',
        description: 'All messages secured by WhatsApp'
      }
    ],
    integrations: [
      { name: 'Mailchimp', image: 'https://cdn.shadcnstudio.com/ss-assets/brand-logo/mailchimp-icon-circle.png' },
      { name: 'Webflow', image: 'https://cdn.shadcnstudio.com/ss-assets/brand-logo/webflow-icon-circle.png' },
      { name: 'Airbnb', image: 'https://cdn.shadcnstudio.com/ss-assets/brand-logo/airbnb-icon-circle.png' },
      { name: 'Tata', image: 'https://cdn.shadcnstudio.com/ss-assets/brand-logo/tata-icon-circle.png' },
      { name: 'Paypal', image: 'https://cdn.shadcnstudio.com/ss-assets/brand-logo/paypal-icon-circle.png' },
      { name: 'Stackoverflow', image: 'https://cdn.shadcnstudio.com/ss-assets/brand-logo/stackoverflow-icon-circle.png' },
      { name: 'Huawei', image: 'https://cdn.shadcnstudio.com/ss-assets/brand-logo/huawei-icon-circle.png' },
      { name: 'Asana', image: 'https://cdn.shadcnstudio.com/ss-assets/brand-logo/asana-icon-circle.png' },
      { name: 'Hopin', image: 'https://cdn.shadcnstudio.com/ss-assets/brand-logo/hopin-icon-circle.png' }
    ],
    faqTabs: [
      {
        name: 'General',
        value: 'general',
        faqs: [
          {
            id: 'faq-1',
            question: 'What is the WhatsApp Business API and do I need it?',
            answer: 'WhatsApp Business API is the official Meta product designed for businesses that need to message customers at scale (5+ agents or 1000+ messages/day). Unlike the free WhatsApp Business app, the API supports automation, integrations and multi-agent inboxes. AI Greentick is an Official BSP — we get you set up in 10 minutes.'
          },
          {
            id: 'faq-3',
            question: 'Can I get the Green Tick verification?',
            answer: 'Yes. We help you apply for the WhatsApp Green Tick (verified business badge) for free on all paid plans. Approval depends on Meta\'s criteria — typically requires public press mentions and active business presence.'
          },
          {
            id: 'faq-4',
            question: 'Will my existing WhatsApp Business app data transfer?',
            answer: 'When you move to the WhatsApp Business API, you migrate the number — but the chat history in the WhatsApp Business app doesn\'t carry over. We recommend backing up important conversations before migration.'
          },
          {
            id: 'faq-5',
            question: 'How long does setup take?',
            answer: 'Most customers go live in 24 hours. Meta verification typically takes 1-3 business days for new businesses.'
          },
          {
            id: 'faq-6',
            question: 'Can I use my existing number?',
            answer: 'Yes, but the number must be removed from the WhatsApp Business app or personal WhatsApp first. Once it\'s on the API, you can\'t use it in the consumer apps simultaneously.'
          }
        ]
      },
      {
        name: 'Pricing & Trial',
        value: 'pricing',
        faqs: [
          {
            id: 'faq-2',
            question: 'How much does AI Greentick cost?',
            answer: 'Plans start at ₹2,499/month for the Starter plan. WhatsApp also charges per-conversation fees directly (₹0.88 for marketing, ₹0.12 for utility messages in India). You pay AiSensy for the platform, Meta for conversations. No setup fees.'
          },
          {
            id: 'faq-7',
            question: 'Is there a free trial?',
            answer: 'Yes — 14-day free trial on all paid plans. No credit card required to start.'
          }
        ]
      }
    ]
  },
  pricing_data: {
    headerSubtitle: "Simple pricing. No surprises. No markups.",
    headerDescription: "Choose the best plan for your business. One flat platform fee plus official Meta conversation charges with zero markups.",
    plans: {
      Starter: {
        name: "STARTER",
        desc: "Best for Small businesses and solo operators",
        price: {
          INR: { monthly: 1999, annual: 1599 },
          USD: { monthly: 25, annual: 20 }
        },
        features: [
          "1 WhatsApp number",
          "Up to 3 agents",
          "Basic chatbot (5 flows)",
          "Bulk campaigns",
          "Shopify integration",
          "Standard support"
        ]
      },
      Growth: {
        name: "GROWTH",
        desc: "Best for Growing SMBs and D2C brands",
        price: {
          INR: { monthly: 4999, annual: 3999 },
          USD: { monthly: 65, annual: 52 }
        },
        features: [
          "1 WhatsApp number",
          "Unlimited agents",
          "Advanced chatbot (unlimited flows)",
          "Bulk campaigns + segmentation",
          "All integrations (100+)",
          "WhatsApp Commerce",
          "Campaign analytics",
          "Priority support + onboarding"
        ],
        popular: true
      },
      Business: {
        name: "BUSINESS",
        desc: "Best for Established businesses with high volume",
        price: {
          INR: { monthly: 14999, annual: 11999 },
          USD: { monthly: 199, annual: 159 }
        },
        features: [
          "3 WhatsApp numbers",
          "Unlimited agents",
          "AI chatbot with NLU",
          "Advanced automation workflows",
          "Full CRM integrations",
          "WhatsApp Commerce + analytics",
          "Green Tick application support",
          "Dedicated account manager"
        ]
      },
      Enterprise: {
        name: "ENTERPRISE",
        desc: "Best for Large teams, agencies, and multi-brand operations",
        price: {
          INR: { monthly: 0, annual: 0 },
          USD: { monthly: 0, annual: 0 }
        },
        isCustom: true,
        features: [
          "Unlimited numbers",
          "Unlimited agents",
          "Custom AI chatbot",
          "Advanced automation + custom API",
          "White-label reporting (agencies)",
          "SSO + role-based access + SLA",
          "Custom onboarding program"
        ]
      }
    }
  }
}

DEFAULT_FALLBACKS.solutions_list = DEFAULT_FALLBACKS.industry_list.map((item: any) => ({
  ...JSON.parse(JSON.stringify(item)),
  link: `/solutions/${item.id}`
}))

DEFAULT_FALLBACKS.integrations_page = {
  pageTitle: "App Integrations",
  visibility: "visible",
  seoTitle: "App Integrations — Connect AI Greentick",
  seoDesc: "Connect AI Greentick with HubSpot, Shopify, WooCommerce, Salesforce, Razorpay, Stripe, Zapier, and over 2000+ web applications.",
  seoUrl: "aigreentick.com/integrations",
  aiSnapshot: "Connect AI Greentick with CRM, e-commerce, and payment systems to automate official WhatsApp alerts. Set up integrations in 5-10 minutes with No-Code or developer-friendly APIs.",
  hero: {
    badgeText: ":: APP INTEGRATIONS ::",
    heading: "Integrate WhatsApp with your Favorite Tools",
    description: "Connect AIGreenTick with over 2000+ CRMs, e-commerce stores, payment gateways, and productivity apps to automate your marketing, sales, and support workflows."
  },
  customCta: {
    badgeText: ":: CUSTOM CONNECTIONS ::",
    heading: "Don't see your favorite tool?",
    description: "Connect AIGreenTick to your proprietary CRM, custom databases, or other tools using our standard **REST API** and webhooks, or connect via **Zapier** in minutes.",
    button1Text: "Connect Zapier",
    button1Link: "/#demo",
    button2Text: "Developer Docs",
    button2Link: "/#demo"
  },
  integrationsList: [
    {
      id: 'shopify',
      name: 'Shopify',
      category: 'ecommerce',
      description: 'Send automated order updates, delivery tracking alerts, and abandoned cart reminders via WhatsApp.',
      logoColor: 'bg-[#95bf47]/10 text-[#95bf47] border-[#95bf47]/20',
      logoSvg: '<svg class="size-8" viewBox="0 0 24 24" fill="currentColor"><path d="M19.5 7.5L12 3 4.5 7.5v9L12 21l7.5-4.5v-9zM12 4.8l6 3.6-6 3.6-6-3.6 6-3.6zM6 8.7l5 3v7.3l-5-3V8.7zm7 10.3v-7.3l5-3v7.3l-5 3z"/></svg>',
      setupTime: '5 Mins',
      difficulty: 'No-Code',
      requirements: 'Shopify Store Account'
    },
    {
      id: 'woocommerce',
      name: 'WooCommerce',
      category: 'ecommerce',
      description: 'Sync your WordPress store to automatically verify orders, confirm payments, and recover abandoned carts.',
      logoColor: 'bg-[#96588a]/10 text-[#96588a] border-[#96588a]/20',
      logoSvg: '<svg class="size-8" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2c5.52 0 10 4.48 10 10s-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2zm-1.8 14.2h3.6l1.2-4.8h-6l1.2 4.8zm4.8-6.4l.6-2.4H8.4l.6 2.4h7.8z"/></svg>',
      setupTime: '10 Mins',
      difficulty: 'No-Code',
      requirements: 'WordPress Store Site'
    },
    {
      id: 'hubspot',
      name: 'HubSpot',
      category: 'crm',
      description: 'Sync contacts, track chat history, and trigger WhatsApp automated messages from HubSpot workflow pipelines.',
      logoColor: 'bg-[#ff7a59]/10 text-[#ff7a59] border-[#ff7a59]/20',
      logoSvg: '<svg class="size-8" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 1010 10A10 10 0 0012 2zm3.8 13.8a4 4 0 11-4-4 4 4 0 014 4zm1.2-5.4a1.6 1.6 0 11-1.6-1.6 1.6 1.6 0 011.6 1.6z"/></svg>',
      setupTime: '5 Mins',
      difficulty: 'No-Code',
      requirements: 'HubSpot CRM Account'
    },
    {
      id: 'salesforce',
      name: 'Salesforce',
      category: 'crm',
      description: 'Connect your sales pipeline and automate personalized client outreach directly from Salesforce CRM records.',
      logoColor: 'bg-[#00a1e0]/10 text-[#00a1e0] border-[#00a1e0]/20',
      logoSvg: '<svg class="size-8" viewBox="0 0 24 24" fill="currentColor"><path d="M19.1 11.6a3.8 3.8 0 00-5.7-4.6 6 6 0 00-10.4 2.8 4.2 4.2 0 00.3 8.3 4.2 4.2 0 007.8.2 4 4 0 006.8-2.6c.7 0 1.2-.5 1.2-1.2v-2.9z"/></svg>',
      setupTime: '15 Mins',
      difficulty: 'Low-Code',
      requirements: 'Salesforce Org Account'
    },
    {
      id: 'zoho',
      name: 'Zoho CRM',
      category: 'crm',
      description: 'Sync client lead data in real-time and send instant automated alerts for status changes or updates.',
      logoColor: 'bg-[#e21c23]/10 text-[#e21c23] border-[#e21c23]/20',
      logoSvg: '<svg class="size-8" viewBox="0 0 24 24" fill="currentColor"><path d="M4 4h7v7H4zm9 0h7v7h-7zm-9 9h7v7H4zm9 0h7v7h-7z"/></svg>',
      setupTime: '10 Mins',
      difficulty: 'No-Code',
      requirements: 'Zoho CRM Account'
    },
    {
      id: 'razorpay',
      name: 'Razorpay',
      category: 'payments',
      description: 'Send secure payment links, instant payment receipts, and automated recurring invoices via WhatsApp.',
      logoColor: 'bg-[#0b72e7]/10 text-[#0b72e7] border-[#0b72e7]/20',
      logoSvg: '<svg class="size-8" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 22h20L12 2zm0 4.8l6.8 13.6H5.2L12 6.8z"/></svg>',
      setupTime: '5 Mins',
      difficulty: 'No-Code',
      requirements: 'Razorpay Merchant ID'
    },
    {
      id: 'stripe',
      name: 'Stripe',
      category: 'payments',
      description: 'Trigger transactional messages, payment confirmations, and billing updates to customers globally.',
      logoColor: 'bg-[#635bff]/10 text-[#635bff] border-[#635bff]/20',
      logoSvg: '<svg class="size-8" viewBox="0 0 24 24" fill="currentColor"><path d="M13.9 9.3c0-.8-.7-1.1-1.8-1.1-1.3 0-2.8.4-3.9 1L7 6.1C8.6 5 10.9 4.3 13.3 4.3c3.4 0 5.7 1.7 5.7 4.8v7.2c0 2.2.4 2.9.9 3.3H14.8c-.3-.5-.4-1.1-.4-1.6h-.1c-.9 1.1-2.4 1.9-4.3 1.9-2.9 0-4.8-1.8-4.8-4.3 0-3.3 3.1-4.7 7.7-4.7v-.2zM14 12.8v-.6c-2.3 0-4.1.5-4.1 2.2 0 .9.7 1.4 1.6 1.4 1.4-.1 2.5-1.3 2.5-3z"/></svg>',
      setupTime: '5 Mins',
      difficulty: 'No-Code',
      requirements: 'Stripe API Keys'
    },
    {
      id: 'zapier',
      name: 'Zapier',
      category: 'automation',
      description: 'Connect AIGreenTick with 5,000+ web applications to automate custom tasks without writing a single line of code.',
      logoColor: 'bg-[#ff4f00]/10 text-[#ff4f00] border-[#ff4f00]/20',
      logoSvg: '<svg class="size-8" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 22h20zM12 6.2l5.8 11.6H6.2z"/></svg>',
      setupTime: '5 Mins',
      difficulty: 'No-Code',
      requirements: 'Zapier Free/Paid Account'
    },
    {
      id: 'google-sheets',
      name: 'Google Sheets',
      category: 'automation',
      description: 'Instantly export new chat inquiries or sync contacts from spreadsheets to your broadcast lists.',
      logoColor: 'bg-[#0f9d58]/10 text-[#0f9d58] border-[#0f9d58]/20',
      logoSvg: '<svg class="size-8" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-9 14H7v-2h3v2zm0-4H7v-2h3v2zm0-4H7V7h3v2zm5 8h-3v-2h3v2zm0-4h-3v-2h3v2zm0-4h-3V7h3v2z"/></svg>',
      setupTime: '5 Mins',
      difficulty: 'No-Code',
      requirements: 'Google Drive Account'
    },
    {
      id: 'slack',
      name: 'Slack',
      category: 'support',
      description: 'Get real-time notifications for incoming WhatsApp support tickets directly in your team Slack channels.',
      logoColor: 'bg-[#4a154b]/10 text-[#4a154b] border-[#4a154b]/20',
      logoSvg: '<svg class="size-8" viewBox="0 0 24 24" fill="currentColor"><path d="M6 14.5a2.5 2.5 0 11-2.5-2.5H6v2.5zm1.5 0a2.5 2.5 0 012.5-2.5h5a2.5 2.5 0 012.5 2.5v5a2.5 2.5 0 01-2.5 2.5h-5a2.5 2.5 0 01-2.5-2.5v-5zm2.5-5a2.5 2.5 0 112.5-2.5V9.5h-2.5zm0 1.5a2.5 2.5 0 012.5 2.5v5a2.5 2.5 0 01-2.5 2.5h-5a2.5 2.5 0 01-2.5-2.5v-5a2.5 2.5 0 012.5-2.5h5z"/></svg>',
      setupTime: '5 Mins',
      difficulty: 'No-Code',
      requirements: 'Slack Workspace Account'
    },
    {
      id: 'freshdesk',
      name: 'Freshdesk',
      category: 'support',
      description: 'Convert WhatsApp support threads into Freshdesk tickets automatically and maintain thread histories.',
      logoColor: 'bg-[#009b72]/10 text-[#009b72] border-[#009b72]/20',
      logoSvg: '<svg class="size-8" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 1010 10A10 10 0 0012 2zm1 14.5h-2v-2h2v2zm0-4h-2v-5h2v5z"/></svg>',
      setupTime: '10 Mins',
      difficulty: 'No-Code',
      requirements: 'Freshdesk Portal URL'
    },
    {
      id: 'activecampaign',
      name: 'ActiveCampaign',
      category: 'marketing',
      description: 'Integrate WhatsApp messaging into your existing email marketing automation funnels for omnichannel outreach.',
      logoColor: 'bg-[#356ae6]/10 text-[#356ae6] border-[#356ae6]/20',
      logoSvg: '<svg class="size-8" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>',
      setupTime: '10 Mins',
      difficulty: 'Low-Code',
      requirements: 'ActiveCampaign Account'
    }
  ],
  faqs: [
    {
      question: "Do I need a WhatsApp Business API account to use these integrations?",
      answer: "Yes, you need an active WhatsApp Business API (WABA) account. AI Greentick helps you set up and verify your official WhatsApp Business number during onboarding."
    },
    {
      question: "Can I connect custom CRM software not listed in the directory?",
      answer: "Absolutely! You can use our developer REST API and webhooks, or connect via Zapier which supports over 5000+ third-party apps."
    },
    {
      question: "Is there an additional fee for connecting integrations?",
      answer: "No, all standard integrations and API access are included in AI Greentick's paid plans. Third-party platforms like Zapier may have their own pricing structures."
    }
  ]
}
