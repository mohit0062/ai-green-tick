import { brandLogos } from '@/lib/brand-logos'

export const DEFAULT_FALLBACKS: Record<string, any> = {
  navbar: {
    logoText: "AI Greentick",
    logoImageUrl: "",
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
    logoImageUrl: "",
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
    heading: "Supercharge your sales with WhatsApp Automation",
    description: "Connect with customers, run automated marketing campaigns, and provide instant support with AI agents.",
    buttonText: "Get Started - Free",
    buttonHref: "/contact",
    secondaryButtonText: "Book a Demo",
    secondaryButtonHref: "/contact?intent=demo"
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
      useCases: [
        'Broadcast new seasonal collections and special coupons',
        'Automate abandoned cart notifications within 15 mins of dropout',
        'Send instantaneous order confirmation and live shipping updates',
        'Sync product inventory to Meta Catalogue and collect checkout payments'
      ],
      detailedDesc: 'For modern D2C brands, shopping cart abandonment and high customer acquisition costs are primary bottlenecks. AIGreenTick integrates directly with Shopify, WooCommerce, and custom checkout flows to engage dropouts where they are most active—WhatsApp. By syncing your Meta catalogue and setting automated payment links, customer conversion is completed entirely inside the chat window.',
      keyBenefits: [
        {
          title: 'Instant Recovery',
          description: 'Trigger automated cart recovery notifications with personalized discounts.'
        },
        {
          title: 'Catalog Syncing',
          description: 'Let users browse products, select variants, and build carts directly in WhatsApp.'
        },
        {
          title: 'Secure Checkout',
          description: 'Accept credit cards, UPI, and bank transfers safely using native payment gateways.'
        }
      ],
      faqs: [
        {
          question: 'Does this sync with my Shopify inventory?',
          answer: 'Yes. Our Shopify integration keeps stock levels, variant sizes, and pricing updated in real-time.'
        },
        {
          question: 'Are payments secure?',
          answer: 'Yes, checkout payments are processed through native Stripe, Razorpay, or Meta pay integrations.'
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
      useCases: [
        'Automate appointment scheduling, rescheduling, and cancellation',
        'Send secure diagnostic lab report PDF files to patients',
        'Deploy automated reminders for medication intake and checkups',
        'Route emergency patient requests instantly to doctor desks'
      ],
      detailedDesc: 'Missed consultation slots and manual schedule follow-ups drain operational resources in medical clinics. AIGreenTick automates scheduling, pushes diagnostic reports securely as PDFs, and maintains treatment compliance through automated medication check-ins, all while guaranteeing complete privacy.',
      keyBenefits: [
        {
          title: 'Auto Reminders',
          description: 'Cut no-shows by sending secure booking details and 1-click confirmation links.'
        },
        {
          title: 'Secure PDF Delivery',
          description: 'Send lab results, prescriptions, and fitness plans directly to the patient\'s chat.'
        },
        {
          title: 'Triage Routing',
          description: 'Identify urgent medical queries and route them to live clinical staff immediately.'
        }
      ],
      faqs: [
        {
          question: 'Is patient data secure?',
          answer: 'Absolutely. We utilize WhatsApp end-to-end encryption and comply with privacy rules for data handling.'
        },
        {
          question: 'Can patients reschedule via chat?',
          answer: 'Yes. The booking bot allows patients to select a new slot or cancel in seconds.'
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
      useCases: [
        'Qualify student enrollment interest and resolve course fees FAQs',
        'Automate schedules, timetables, and exam result alerts',
        'Send secure course registration links and direct invoice reminders',
        'Enable 24/7 AI-guided student onboarding and support'
      ],
      detailedDesc: 'EdTech platforms and traditional universities struggle to qualify thousands of daily student inquiries. AIGreenTick deploys conversational AI bots to answer syllabus details, qualify enrollment intent, collect registration fees, and distribute exam notifications automatically.',
      keyBenefits: [
        {
          title: 'Lead Qualification',
          description: 'Instantly screen prospective students based on budget, background, and stream.'
        },
        {
          title: 'On-Demand Support',
          description: 'Resolve course timing, pricing, and FAQ queries 24/7 without human intervention.'
        },
        {
          title: 'Fee Collection',
          description: 'Send payment links for monthly tuitions or registration fees with auto-reminders.'
        }
      ],
      faqs: [
        {
          question: 'Can we integrate this with our CRM?',
          answer: 'Yes, we integrate with LeadSquared, HubSpot, Salesforce, and custom academic databases.'
        },
        {
          question: 'Can students submit assignments?',
          answer: 'Yes. Students can upload document attachments which our API routes directly to your database.'
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
      useCases: [
        'Qualify inbound property buyers based on budget and location preferences',
        'Share high-resolution site layout booklets and PDF catalog files',
        'Schedule in-person properties inspection and site visits dynamically',
        'Push automated alert updates to buyers when price changes happen'
      ],
      detailedDesc: 'Real estate sales teams waste hours on non-serious inquiries. AIGreenTick screens potential buyers, gathers criteria (budget, location, BHK), shares rich PDF brochures instantly, and schedules site viewings to boost conversion rates.',
      keyBenefits: [
        {
          title: 'Automatic Brochure Sharing',
          description: 'Send high-resolution architectural layout PDFs automatically on customer request.'
        },
        {
          title: 'Viewing Scheduler',
          description: 'Synchronize visits with agent calendars and send automated directions on visit day.'
        },
        {
          title: 'Active Retargeting',
          description: 'Re-engage cold database leads with real-time price reductions or new listings.'
        }
      ],
      faqs: [
        {
          question: 'Can we direct site viewings to specific agents?',
          answer: 'Yes, our shared inbox routes leads dynamically based on location or agent availability.'
        },
        {
          question: 'Are there limits on sending brochures?',
          answer: 'No, you can send unlimited PDF media files via the WhatsApp Business API.'
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
      useCases: [
        'Broadcast secure verification OTP numbers with instant delivery',
        'Trigger real-time transaction debit/credit alert logs',
        'Let clients query account balances and request Statements via chatbot',
        'Automate loan application tracking, status updates, and KYC followups'
      ],
      detailedDesc: 'Financial institutions must balance security with ease of access. AIGreenTick enables secure transaction alerts, instant OTP dispatch, account statement requests, and automated loan processing updates with bank-grade security.',
      keyBenefits: [
        {
          title: 'OTP Dispatch',
          description: 'Deliver verification codes with low latency and fallback options.'
        },
        {
          title: 'Self-Serve Portal',
          description: 'Provide instant balance lookups, interest rate FAQs, and branch directories on chat.'
        },
        {
          title: 'Application Tracking',
          description: 'Send auto-updates on loan and credit card processing, requesting missing document uploads.'
        }
      ],
      faqs: [
        {
          question: 'Does this comply with security standards?',
          answer: 'Yes, all communications are encrypted, and we support ISO/IEC compliance setups for enterprises.'
        },
        {
          question: 'How fast are OTPs delivered?',
          answer: 'OTPs are sent via Meta\'s priority transaction lines, typically arriving in under 3 seconds.'
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
      useCases: [
        'Send instantaneous flight, hotel, and bus booking tickets',
        'Distribute live check-in instructions and hotel location details',
        'Share customized trip itineraries and travel guidance brochures',
        'Deploy 24/7 AI concierge bots to resolve reservation FAQs'
      ],
      detailedDesc: 'Travelers expect timely, context-aware information. AIGreenTick connects with GDS, airlines, and hotel management systems to send boarding passes, check-in instructions, and trip itineraries directly to customer phones.',
      keyBenefits: [
        {
          title: 'Instant Tickets',
          description: 'Deliver ticket confirmations and boarding passes as soon as booking is processed.'
        },
        {
          title: 'Live Alerts',
          description: 'Push real-time gate changes, flight delays, and check-in times automatically.'
        },
        {
          title: 'AI Concierge',
          description: 'Let travelers query breakfast timings, request extra towels, or book tours on chat.'
        }
      ],
      faqs: [
        {
          question: 'Can we send booking details to international numbers?',
          answer: 'Yes, WhatsApp is global, allowing you to reach international travelers without SMS roaming fees.'
        },
        {
          question: 'Can customers upload passport copies?',
          answer: 'Yes, images can be sent securely through chat to expedite mobile check-in.'
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
