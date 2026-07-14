'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { Search, ArrowRight, Clock, BookOpen } from 'lucide-react'
import Header from '@/components/shadcn-studio/blocks/hero-section-40/header'
import Breadcrumb from '@/components/ui/breadcrumb'
import Footer from '@/components/shadcn-studio/blocks/footer/footer'
import BlogCard from '@/components/shadcn-studio/blocks/blog-card'
import type { Navigation } from '@/components/shadcn-studio/blocks/hero-section-40/hero-navigation'

export interface ClientPost {
  slug: string
  title: string
  excerpt: string
  content: string
  date: string
  readTime: string
  image: string
  category: string
  tags: string[]
  author: {
    name: string
    avatar: string
    role: string
  }
}

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
            icon: <BookOpen className='size-4' />
          },
          {
            title: 'Customer Onboarding',
            href: '/#features',
            description: 'Automate welcome emails, account setup, and key guidance.',
            icon: <BookOpen className='size-4' />
          },
          {
            title: 'Support Escalations',
            href: '/#features',
            description: 'Detect urgency and route issues to the right team faster.',
            icon: <BookOpen className='size-4' />
          }
        ]
      },
      {
        type: 'section',
        title: 'Internal Productivity Workflows',
        items: [
          {
            title: 'Knowledge Retrieval',
            href: '/#features',
            description: 'Ask AI and get instant answers from your tools/docs.',
            icon: <BookOpen className='size-4' />
          },
          {
            title: 'Task Automation',
            href: '/#features',
            description: 'Convert messages into tasks and assign them automatically.',
            icon: <BookOpen className='size-4' />
          },
          {
            title: 'Data Cleanup',
            href: '/#features',
            description: 'Auto-correct entries, remove duplicates, sync records.',
            icon: <BookOpen className='size-4' />
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
    href: '/#pricing'
  }
]

export default function BlogListClient({ initialPosts }: { initialPosts: ClientPost[] }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')

  // Categories list derived from blog posts data
  const categories = useMemo(() => {
    const list = new Set(initialPosts.map((post) => post.category))
    return ['All', ...Array.from(list)]
  }, [initialPosts])

  // Filter blog posts based on category and search query
  const filteredPosts = useMemo(() => {
    return initialPosts.filter((post) => {
      const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory
      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      return matchesCategory && matchesSearch
    })
  }, [initialPosts, selectedCategory, searchQuery])

  // Featured post (latest post)
  const featuredPost = useMemo(() => {
    return initialPosts[0]
  }, [initialPosts])

  return (
    <div className="flex flex-col min-h-screen bg-[#ECEBE9] text-black">
      {/* Header */}
      <Header navigationData={navigationData} />
      <Breadcrumb />

      {/* Hero Section */}
      <section className="px-4 sm:px-6 lg:px-8 border-b border-[#C5C4C2]">
        <div className="mx-auto max-w-7xl border-x border-[#C5C4C2] px-4 sm:px-6 lg:px-8 py-12 sm:py-20 text-center space-y-6">
          <span className="inline-block px-3 py-1 text-xs font-bold text-[#00b259] border border-[#00b259] bg-[#00b259]/10 font-mono tracking-wider">
            :: INTEL & KNOWLEDGE HUB ::
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display tracking-tight leading-none text-black">
            The AI Greentick Blog
          </h1>
          <p className="text-neutral-500 max-w-2xl mx-auto text-sm sm:text-base font-sans">
            Deep dives into WhatsApp API automation, customer engagement strategies, and scaling business workflows using conversational AI.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="flex-grow px-4 sm:px-6 lg:px-8 bg-[#ECEBE9]/50 pb-20 sm:pb-28">
        <div className="mx-auto max-w-7xl border-x border-[#C5C4C2] px-4 sm:px-6 lg:px-8 py-10 space-y-16">
          
          {/* Featured Post (Only show if not searching or filtering, or show if it matches) */}
          {searchQuery === '' && selectedCategory === 'All' && featuredPost && (
            <div className="space-y-6">
              <div className="flex items-center gap-2 font-sans text-xs text-neutral-400">
                <span>[ FEATURED INSIGHT ]</span>
                <div className="h-px bg-[#C5C4C2] flex-grow" />
              </div>

              <div 
                className="border border-[#C5C4C2] bg-[#ECEBE9] grid grid-cols-1 lg:grid-cols-12 lg:h-[440px] overflow-hidden group"
                style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 15px 100%, 0 calc(100% - 15px))' }}
              >
                {/* Image */}
                <div className="lg:col-span-7 h-[300px] lg:h-full w-full overflow-hidden relative border-b lg:border-b-0 lg:border-r border-[#C5C4C2]">
                  <img 
                    src={featuredPost.image} 
                    alt={featuredPost.title} 
                    className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 transition-all duration-500" 
                  />
                  <div className="absolute inset-0 bg-[#00b259]/10 mix-blend-multiply group-hover:opacity-0 transition-opacity duration-500" />
                </div>

                {/* Details */}
                <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between font-sans lg:h-full gap-4">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <span className="px-2 py-0.5 text-[10px] font-bold text-[#00b259] border border-[#00b259]/30 bg-[#00b259]/5">
                        {featuredPost.category}
                      </span>
                      <span className="text-[10px] text-neutral-500 flex items-center gap-1">
                        <Clock className="size-3" /> {featuredPost.readTime}
                      </span>
                    </div>

                    <h2 className="text-xl sm:text-2xl font-extrabold text-black group-hover:text-[#00b259] transition-colors leading-tight font-display">
                      {featuredPost.title}
                    </h2>

                    <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed font-sans">
                      {featuredPost.excerpt}
                    </p>
                  </div>

                  <div className="space-y-4 pt-6 border-t border-[#C5C4C2]/40">
                    <div className="flex items-center gap-3">
                      <img 
                        src={featuredPost.author.avatar} 
                        alt={featuredPost.author.name} 
                        className="size-8 rounded-full border border-[#C5C4C2] grayscale"
                      />
                      <div>
                        <div className="text-xs font-bold text-black">{featuredPost.author.name}</div>
                        <div className="text-[10px] text-neutral-400">{featuredPost.author.role}</div>
                      </div>
                    </div>

                    <Link 
                      href={`/blog/${featuredPost.slug}`}
                      className="inline-flex items-center gap-2 text-xs font-bold text-black hover:text-[#00b259] transition-colors group/btn"
                    >
                      <span>READ ARTICLE</span>
                      <ArrowRight className="size-4 text-[#00b259] group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Search & Filter Bar */}
          <div className="border border-[#C5C4C2] bg-[#ECEBE9] p-4 sm:p-6 space-y-4 sm:space-y-0 sm:flex sm:items-center sm:justify-between gap-6 font-sans"
            style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 10px 100%, 0 calc(100% - 10px))' }}
          >
            {/* Search Input */}
            <div className="relative flex-grow max-w-md">
              <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-neutral-400">
                <Search className="size-4" />
              </span>
              <input
                type="text"
                placeholder="Search updates by title or tag..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs border border-[#C5C4C2] bg-[#ECEBE9] text-black rounded-none outline-none focus:border-[#00b259] transition-colors placeholder:text-neutral-400"
              />
            </div>

            {/* Category Filter Desktop & Mobile */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-bold text-neutral-400 mr-2">[ CATEGORY ]</span>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 py-1 text-[10px] font-bold transition-all cursor-pointer ${
                    selectedCategory === category
                      ? 'bg-black text-[#ECEBE9] border border-black'
                      : 'border border-[#C5C4C2] hover:border-black text-neutral-600 hover:text-black'
                  }`}
                >
                  {category.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* Blog Post Grid */}
          <div className="space-y-8">
            <div className="flex items-center justify-between font-mono text-xs text-neutral-400">
              <span>[ ARTICLES ({filteredPosts.length}) ]</span>
              <span>FILTER: {selectedCategory.toUpperCase()}</span>
            </div>

            {filteredPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post) => (
                  <BlogCard 
                    key={post.slug} 
                    post={post}
                  />
                ))}
              </div>
            ) : (
              <div className="border border-dashed border-[#C5C4C2] py-20 text-center font-sans">
                <p className="text-neutral-500 text-sm">NO ARTICLES FOUND MATCHING YOUR CRITERIA.</p>
                <button 
                  onClick={() => { setSearchQuery(''); setSelectedCategory('All') }}
                  className="mt-4 px-4 py-2 border border-black text-xs font-bold hover:bg-black hover:text-[#ECEBE9] transition-all cursor-pointer"
                >
                  RESET FILTERS
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
