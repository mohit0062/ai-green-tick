'use client'

import { useState } from 'react'
import { ArrowLeft, Check, X, Plus, Trash2 } from 'lucide-react'

interface ProblemSection {
  description: string
  bullets: string[]
}

interface FeatureModule {
  title: string
  description: string
  bullets: string[]
}

interface FAQItem {
  question: string
  answer: string
}

interface Solution {
  id: string
  title: string
  shortDesc: string
  description: string
  icon: string
  link: string
  previewType: string
  
  // Custom Detailed Fields
  metric?: string
  seoTitle?: string
  seoDescription?: string
  seoKeywords?: string
  ogImage?: string
  
  problemSection?: ProblemSection
  features?: FeatureModule[]
  integrations?: string[]
  benchmarkResults?: string
  caseStudy?: string
  faqs?: FAQItem[]
  useCases?: string[] // Mapping legacy use cases field to workflows list
}

interface SolutionFormProps {
  initialSolution?: Solution
  onSave: (updatedSolution: Solution) => void
  onCancel: () => void
}

export default function SolutionForm({ initialSolution, onSave, onCancel }: SolutionFormProps) {
  const [activeTab, setActiveTab] = useState<'basic' | 'seo' | 'problem' | 'features' | 'additional' | 'faqs'>('basic')

  const [form, setForm] = useState<Partial<Solution>>({
    id: initialSolution?.id || '',
    title: initialSolution?.title || '',
    icon: initialSolution?.icon || 'ShoppingBag',
    shortDesc: initialSolution?.shortDesc || '',
    description: initialSolution?.description || '',
    metric: initialSolution?.metric || '',
    useCases: initialSolution?.useCases || [''],
    seoTitle: initialSolution?.seoTitle || '',
    seoDescription: initialSolution?.seoDescription || '',
    seoKeywords: initialSolution?.seoKeywords || '',
    problemSection: initialSolution?.problemSection || { description: '', bullets: [''] },
    features: initialSolution?.features || Array.from({ length: 5 }, (_, i) => ({
      title: initialSolution?.features?.[i]?.title || '',
      description: initialSolution?.features?.[i]?.description || '',
      bullets: initialSolution?.features?.[i]?.bullets || ['']
    })),
    integrations: initialSolution?.integrations || [],
    benchmarkResults: initialSolution?.benchmarkResults || '',
    caseStudy: initialSolution?.caseStudy || '',
    faqs: initialSolution?.faqs || Array.from({ length: 5 }, (_, i) => ({
      question: initialSolution?.faqs?.[i]?.question || '',
      answer: initialSolution?.faqs?.[i]?.answer || ''
    })),
  })

  const set = (k: keyof Solution, v: any) => setForm(f => ({ ...f, [k]: v }))

  const handlePublishClick = () => {
    if (!form.title?.trim() || !form.id?.trim()) return alert('Title and Slug handle ID are required')
    onSave(form as Solution)
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12 font-sans text-neutral-800 antialiased select-none">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-[#C5C4C2]/50 pb-5">
        <div className="flex items-center gap-4">
          <button
            onClick={onCancel}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#C5C4C2]/50 bg-white hover:bg-neutral-100 text-neutral-500 hover:text-black transition-colors cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-neutral-900 font-display">
              {initialSolution ? `Edit Solution: ${initialSolution.title}` : 'Add New Solution'}
            </h2>
            <p className="text-neutral-500 text-xs">Configure landing pages, problem statement, features, and SEO tags.</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-semibold hover:bg-gray-50 cursor-pointer bg-white"
          >
            Cancel
          </button>
          <button
            onClick={handlePublishClick}
            className="px-5 py-2 rounded-lg bg-[#00b259] hover:bg-[#009b4d] text-white text-sm font-bold cursor-pointer"
          >
            Save Solution
          </button>
        </div>
      </div>

      {/* Main Grid: Left tabs sidebar + Right fields pane */}
      <div className="flex flex-col lg:flex-row gap-6 items-start">
        
        {/* Left Sidebar Tabs */}
        <div className="w-full lg:w-64 bg-white border border-[#C5C4C2]/50 rounded-xl p-3 space-y-1 shrink-0 shadow-xs">
          {[
            { id: 'basic', label: 'Basic Info' },
            { id: 'seo', label: 'SEO Tags' },
            { id: 'problem', label: 'Problem Statement' },
            { id: 'features', label: '5 Feature Modules' },
            { id: 'additional', label: 'Additional Details' },
            { id: 'faqs', label: '5 FAQs' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`w-full text-left px-4 py-2.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-black text-white'
                  : 'text-neutral-500 hover:bg-neutral-100 hover:text-black'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Right Content Area */}
        <div className="flex-1 w-full bg-white border border-[#C5C4C2]/50 rounded-xl p-6 shadow-xs min-h-[60vh] flex flex-col justify-between">
          
          <div className="space-y-6">
            {/* TAB 1: BASIC INFO */}
            {activeTab === 'basic' && (
              <div className="space-y-4 text-left">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide">Title *</label>
                    <input value={form.title} onChange={e => set('title', e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#00b259]/40 focus:border-[#00b259] focus:outline-none" placeholder="eCommerce Solution" />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide">ID / Slug *</label>
                    <input value={form.id} onChange={e => set('id', e.target.value.toLowerCase().replace(/\s+/g, '-'))} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#00b259]/40 focus:border-[#00b259] focus:outline-none font-mono" placeholder="ecommerce" />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide">Icon (Lucide name or SVG)</label>
                  <input value={form.icon} onChange={e => set('icon', e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#00b259]/40 focus:border-[#00b259] focus:outline-none font-mono" placeholder="ShoppingBag" />
                </div>
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide">Short Description</label>
                  <input value={form.shortDesc} onChange={e => set('shortDesc', e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#00b259]/40 focus:border-[#00b259] focus:outline-none" placeholder="Recover lost carts and sell inside chats" />
                </div>
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide">Long Description</label>
                  <textarea value={form.description} onChange={e => set('description', e.target.value)} rows={3} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#00b259]/40 focus:border-[#00b259] focus:outline-none resize-none" placeholder="Detailed description..." />
                </div>
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide">Key Metric / Result</label>
                  <input value={form.metric} onChange={e => set('metric', e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#00b259]/40 focus:border-[#00b259] focus:outline-none" placeholder="35% cart recovery rate" />
                </div>
                
                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide font-sans">Automated Workflows (List)</label>
                  {form.useCases?.map((uc, i) => (
                    <div key={i} className="flex gap-2">
                      <input
                        value={uc}
                        onChange={e => {
                          const arr = [...(form.useCases || [])]
                          arr[i] = e.target.value
                          set('useCases', arr)
                        }}
                        className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#00b259]/40 focus:border-[#00b259] focus:outline-none"
                        placeholder={`Workflow item ${i + 1}...`}
                      />
                      <button
                        onClick={() => set('useCases', (form.useCases || []).filter((_, j) => j !== i))}
                        className="p-2 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-505"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() => set('useCases', [...(form.useCases || []), ''])}
                    className="flex items-center gap-1.5 text-xs font-semibold text-[#00b259] hover:text-[#009149] mt-1 cursor-pointer"
                  >
                    <Plus className="h-3.5 w-3.5" /> Add workflow
                  </button>
                </div>
              </div>
            )}

            {/* TAB 2: SEO TAGS */}
            {activeTab === 'seo' && (
              <div className="space-y-4 text-left">
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide">Meta Title</label>
                  <input value={form.seoTitle} onChange={e => set('seoTitle', e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#00b259]/40 focus:border-[#00b259] focus:outline-none" placeholder="Meta title..." />
                </div>
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide">Meta Description</label>
                  <textarea value={form.seoDescription} onChange={e => set('seoDescription', e.target.value)} rows={3} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#00b259]/40 focus:border-[#00b259] focus:outline-none resize-none" placeholder="Meta description..." />
                </div>
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide">Meta Keywords</label>
                  <input value={form.seoKeywords} onChange={e => set('seoKeywords', e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#00b259]/40 focus:border-[#00b259] focus:outline-none" placeholder="keywords..." />
                </div>
              </div>
            )}

            {/* TAB 3: PROBLEM STATEMENT */}
            {activeTab === 'problem' && (
              <div className="space-y-4 text-left">
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide">Problem Description</label>
                  <textarea
                    value={form.problemSection?.description || ''}
                    onChange={e => {
                      const ps = { ...(form.problemSection || { description: '', bullets: [] }), description: e.target.value }
                      set('problemSection', ps)
                    }}
                    rows={4}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#00b259]/40 focus:border-[#00b259] focus:outline-none resize-none"
                    placeholder="Explain the main industry problem statement..."
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide">Key Challenges / Bullet Points</label>
                  {(form.problemSection?.bullets || ['']).map((bullet, i) => (
                    <div key={i} className="flex gap-2">
                      <input
                        value={bullet}
                        onChange={e => {
                          const bullets = [...(form.problemSection?.bullets || [])]
                          bullets[i] = e.target.value
                          set('problemSection', { ...(form.problemSection || { description: '', bullets: [] }), bullets })
                        }}
                        className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#00b259]/40 focus:border-[#00b259] focus:outline-none"
                        placeholder={`Challenge bullet ${i + 1}...`}
                      />
                      <button
                        onClick={() => {
                          const bullets = (form.problemSection?.bullets || []).filter((_, j) => j !== i)
                          set('problemSection', { ...(form.problemSection || { description: '', bullets: [] }), bullets })
                        }}
                        className="p-2 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() => {
                      const bullets = [...(form.problemSection?.bullets || []), '']
                      set('problemSection', { ...(form.problemSection || { description: '', bullets: [] }), bullets })
                    }}
                    className="flex items-center gap-1.5 text-xs font-semibold text-[#00b259] hover:text-[#009149] mt-1 cursor-pointer"
                  >
                    <Plus className="h-3.5 w-3.5" /> Add Challenge
                  </button>
                </div>
              </div>
            )}

            {/* TAB 4: 5 FEATURE MODULES */}
            {activeTab === 'features' && (
              <div className="space-y-6 text-left">
                <span className="block text-xs font-bold text-gray-400 leading-normal uppercase">Set up the 5 Detailed Feature Modules for this solution</span>
                {Array.from({ length: 5 }).map((_, fIdx) => {
                  const feat = form.features?.[fIdx] || { title: '', description: '', bullets: [''] }
                  return (
                    <div key={fIdx} className="p-4 border border-gray-200 rounded-xl space-y-3 bg-gray-50/50">
                      <div className="flex items-center justify-between border-b border-gray-200 pb-2">
                        <span className="text-xs font-bold text-gray-800 uppercase">Feature Module #{fIdx + 1}</span>
                      </div>
                      <div className="space-y-1">
                        <label className="block text-[10px] font-bold text-gray-500 uppercase">Feature Title</label>
                        <input
                          value={feat.title}
                          onChange={e => {
                            const arr = [...(form.features || [])]
                            arr[fIdx] = { ...feat, title: e.target.value }
                            set('features', arr)
                          }}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#00b259]/40 focus:border-[#00b259] focus:outline-none"
                          placeholder="e.g. Abandoned Cart Recovery"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="block text-[10px] font-bold text-gray-500 uppercase">Feature Description</label>
                        <textarea
                          value={feat.description}
                          onChange={e => {
                            const arr = [...(form.features || [])]
                            arr[fIdx] = { ...feat, description: e.target.value }
                            set('features', arr)
                          }}
                          rows={2}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#00b259]/40 focus:border-[#00b259] focus:outline-none resize-none"
                          placeholder="Explain this specific module feature..."
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-[10px] font-bold text-gray-500 uppercase">Bullets / Benefits List</label>
                        {(feat.bullets || ['']).map((bullet, bIdx) => (
                          <div key={bIdx} className="flex gap-2">
                            <input
                              value={bullet}
                              onChange={e => {
                                const bArr = [...(feat.bullets || [])]
                                bArr[bIdx] = e.target.value
                                const arr = [...(form.features || [])]
                                arr[fIdx] = { ...feat, bullets: bArr }
                                set('features', arr)
                              }}
                              className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#00b259]/40 focus:border-[#00b259] focus:outline-none"
                              placeholder={`Detail bullet ${bIdx + 1}`}
                            />
                            <button
                              onClick={() => {
                                const bArr = (feat.bullets || []).filter((_, j) => j !== bIdx)
                                const arr = [...(form.features || [])]
                                arr[fIdx] = { ...feat, bullets: bArr }
                                set('features', arr)
                              }}
                              className="p-2 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-505"
                            >
                              <X className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        ))}
                        <button
                          onClick={() => {
                            const bArr = [...(feat.bullets || []), '']
                            const arr = [...(form.features || [])]
                            arr[fIdx] = { ...feat, bullets: bArr }
                            set('features', arr)
                          }}
                          className="flex items-center gap-1.5 text-xs font-semibold text-[#00b259] hover:text-[#009149] mt-1 cursor-pointer"
                        >
                          <Plus className="h-3.5 w-3.5" /> Add bullet
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}

            {/* TAB 5: ADDITIONAL DETAILS */}
            {activeTab === 'additional' && (
              <div className="space-y-4 text-left">
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide">Built-in Integrations (Comma separated)</label>
                  <input
                    value={form.integrations?.join(', ')}
                    onChange={e => {
                      const list = e.target.value.split(',').map(s => s.trim())
                      set('integrations', list)
                    }}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#00b259]/40 focus:border-[#00b259] focus:outline-none"
                    placeholder="Shopify, WooCommerce, Razorpay"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide">Benchmark Results (What You Can Expect)</label>
                  <textarea
                    value={form.benchmarkResults}
                    onChange={e => set('benchmarkResults', e.target.value)}
                    rows={4}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#00b259]/40 focus:border-[#00b259] focus:outline-none resize-none leading-relaxed"
                    placeholder="Industry expectation benchmarks..."
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide">Case Study Showcase Block</label>
                  <textarea
                    value={form.caseStudy}
                    onChange={e => set('caseStudy', e.target.value)}
                    rows={4}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#00b259]/40 focus:border-[#00b259] focus:outline-none resize-none leading-relaxed"
                    placeholder="Case study placeholder text..."
                  />
                </div>
              </div>
            )}

            {/* TAB 6: 5 FAQS */}
            {activeTab === 'faqs' && (
              <div className="space-y-6 text-left">
                <span className="block text-xs font-bold text-gray-400 leading-normal uppercase font-sans">Configure 5 dynamic accordion FAQs</span>
                {Array.from({ length: 5 }).map((_, qIdx) => {
                  const faq = form.faqs?.[qIdx] || { question: '', answer: '' }
                  return (
                    <div key={qIdx} className="p-4 border border-gray-200 rounded-xl space-y-3 bg-gray-50/50">
                      <div className="text-xs font-bold text-gray-800 uppercase pb-1 border-b border-gray-200">
                        FAQ Item #{qIdx + 1}
                      </div>
                      <div className="space-y-1">
                        <label className="block text-[10px] font-bold text-gray-500 uppercase">Question</label>
                        <input
                          value={faq.question}
                          onChange={e => {
                            const arr = [...(form.faqs || [])]
                            arr[qIdx] = { ...faq, question: e.target.value }
                            set('faqs', arr)
                          }}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#00b259]/40 focus:border-[#00b259] focus:outline-none"
                          placeholder="FAQ Question..."
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="block text-[10px] font-bold text-gray-500 uppercase">Answer</label>
                        <textarea
                          value={faq.answer}
                          onChange={e => {
                            const arr = [...(form.faqs || [])]
                            arr[qIdx] = { ...faq, answer: e.target.value }
                            set('faqs', arr)
                          }}
                          rows={3}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#00b259]/40 focus:border-[#00b259] focus:outline-none resize-none leading-relaxed"
                          placeholder="FAQ Answer..."
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          {/* Action Bar inside pane */}
          <div className="mt-8 pt-4 border-t border-gray-100 flex justify-end gap-3 shrink-0">
            <button onClick={onCancel} className="px-4 py-2 rounded-lg border border-gray-300 text-sm font-semibold text-gray-600 hover:bg-gray-50 cursor-pointer bg-white">Cancel</button>
            <button onClick={handlePublishClick} className="px-5 py-2 rounded-lg bg-black text-white text-sm font-bold hover:bg-gray-800 cursor-pointer">Save Solution</button>
          </div>

        </div>
      </div>
    </div>
  )
}
