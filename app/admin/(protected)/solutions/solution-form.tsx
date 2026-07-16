'use client'

import { useState, useEffect, useRef } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { cn } from '@/lib/utils'
import { AeoChecklist } from '@/components/admin/aeo-checklist'
import { 
  Sparkles, Check, X, Plus, Trash2, ArrowLeft,
  Bold, Italic, List, ListOrdered, Quote,
  Link, FileText, Globe
} from 'lucide-react'

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
  desc?: string
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
  aiSnapshot?: string
  noindex?: boolean
  
  problemSection?: ProblemSection
  features?: FeatureModule[]
  integrations?: string[]
  benchmarkResults?: string
  caseStudy?: string
  faqs?: FAQItem[]
  useCases?: string[] // Mapping legacy use cases field to workflows list

  // WP Mock Fields
  status?: string
  seoScore?: number
  created_at?: string
  focusKeyword?: string
  schemaStatus?: string
  linksCount?: string
}

interface SolutionFormProps {
  initialSolution?: Solution
  onSave: (updatedSolution: Solution) => void
  onCancel: () => void
}

interface RichEditorProps {
  value: string
  onChange: (val: string) => void
  placeholder?: string
  className?: string
  minHeight?: string
}

function RichEditor({ 
  value, 
  onChange, 
  placeholder, 
  className, 
  minHeight = "120px"
}: RichEditorProps) {
  const [mode, setMode] = useState<'visual' | 'text'>('visual')
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleFormat = (openTag: string, closeTag: string) => {
    const el = textareaRef.current
    if (!el) return
    const start = el.selectionStart
    const end = el.selectionEnd
    const text = el.value
    const selected = text.substring(start, end)
    const replacement = openTag + selected + closeTag
    const newValue = text.substring(0, start) + replacement + text.substring(end)
    onChange(newValue)
    
    // Put focus back and restore selection
    setTimeout(() => {
      el.focus()
      el.setSelectionRange(start + openTag.length, start + openTag.length + selected.length)
    }, 10)
  }

  return (
    <div className={cn("bg-white rounded-md border border-neutral-200 overflow-hidden shadow-xs w-full", className)}>
      {/* Editor Header */}
      <div className="flex items-center justify-between bg-neutral-50 px-3 py-2 border-b border-neutral-200">
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => handleFormat('<strong>', '</strong>')}
            className="p-1 hover:bg-neutral-100 hover:text-black rounded text-neutral-500 transition-colors cursor-pointer"
            title="Bold"
          >
            <Bold className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => handleFormat('<em>', '</em>')}
            className="p-1 hover:bg-neutral-100 hover:text-black rounded text-neutral-500 transition-colors cursor-pointer"
            title="Italic"
          >
            <Italic className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => handleFormat('<ul>\n  <li>', '</li>\n</ul>')}
            className="p-1 hover:bg-neutral-100 hover:text-black rounded text-neutral-500 transition-colors cursor-pointer"
            title="Bullet List"
          >
            <List className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => handleFormat('<ol>\n  <li>', '</li>\n</ol>')}
            className="p-1 hover:bg-neutral-100 hover:text-black rounded text-neutral-500 transition-colors cursor-pointer"
            title="Numbered List"
          >
            <ListOrdered className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => handleFormat('<blockquote>', '</blockquote>')}
            className="p-1 hover:bg-neutral-100 hover:text-black rounded text-neutral-500 transition-colors cursor-pointer"
            title="Quote"
          >
            <Quote className="h-4 w-4" />
          </button>
          
          <div className="w-[1px] h-4 bg-neutral-200 mx-1.5" />
          
          <button
            type="button"
            onClick={() => {
              const url = prompt('Enter URL link:')
              if (url) {
                handleFormat(`<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-primary underline font-semibold hover:opacity-85">`, '</a>')
              }
            }}
            className="p-1 hover:bg-neutral-100 hover:text-black rounded text-neutral-500 transition-colors cursor-pointer"
            title="Insert Link"
          >
            <Link className="h-4 w-4" />
          </button>
        </div>

        {/* Visual / HTML toggle */}
        <div className="flex bg-neutral-200/60 p-0.5 rounded text-[9px] font-bold border border-neutral-300/40 select-none">
          <button
            type="button"
            onClick={() => setMode('visual')}
            className={cn(
              "px-2 py-0.5 rounded-sm transition-all cursor-pointer",
              mode === 'visual' ? "bg-white text-black shadow-xs font-semibold" : "text-neutral-500 hover:text-black"
            )}
          >
            Visual
          </button>
          <button
            type="button"
            onClick={() => setMode('text')}
            className={cn(
              "px-2 py-0.5 rounded-sm transition-all cursor-pointer",
              mode === 'text' ? "bg-white text-black shadow-xs font-semibold" : "text-neutral-500 hover:text-black"
            )}
          >
            HTML
          </button>
        </div>
      </div>

      {/* Editor Textarea */}
      <div className="p-1">
        <Textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          style={{ minHeight }}
          className={cn(
            "w-full border-0 focus-visible:ring-0 focus-visible:ring-offset-0 px-3.5 py-2.5 resize-none outline-none text-neutral-850 bg-white font-normal",
            mode === 'visual' ? "font-sans text-xs" : "font-mono text-[11px] text-emerald-850 bg-neutral-50/20"
          )}
        />
      </div>
    </div>
  )
}

export default function SolutionForm({ initialSolution, onSave, onCancel }: SolutionFormProps) {
  // Main states
  const [title, setTitle] = useState(initialSolution?.title || '')
  const [slug, setSlug] = useState(initialSolution?.id || '')
  const [isEditingSlug, setIsEditingSlug] = useState(false)
  const [slugInputValue, setSlugInputValue] = useState(initialSolution?.id || '')
  const [description, setDescription] = useState(initialSolution?.description || initialSolution?.desc || '')
  const [shortDesc, setShortDesc] = useState(initialSolution?.shortDesc || initialSolution?.desc || '')

  // WP Mock Fields
  const [status, setStatus] = useState(initialSolution?.status || 'published')
  const [seoScore, setSeoScore] = useState(initialSolution?.seoScore || 70)
  const [focusKeyword, setFocusKeyword] = useState(initialSolution?.focusKeyword || '')
  const [schemaStatus, setSchemaStatus] = useState(initialSolution?.schemaStatus || 'On')
  const [createdDate, setCreatedDate] = useState(initialSolution?.created_at || new Date().toISOString())

  // Custom Fields States
  const [icon, setIcon] = useState(initialSolution?.icon || 'ShoppingBag')
  const [link, setLink] = useState(initialSolution?.link || '')
  const [previewType, setPreviewType] = useState(initialSolution?.previewType || `${initialSolution?.id || 'ecommerce'}-solution`)
  const [metric, setMetric] = useState(initialSolution?.metric || '')

  // SEO Tags
  const [seoTitle, setSeoTitle] = useState(initialSolution?.seoTitle || '')
  const [seoDescription, setSeoDescription] = useState(initialSolution?.seoDescription || '')
  const [seoKeywords, setSeoKeywords] = useState(initialSolution?.seoKeywords || '')
  const [noindex, setNoindex] = useState<boolean>(initialSolution?.noindex || false)
  const [ogImage, setOgImage] = useState(initialSolution?.ogImage || '')
  const [aiSnapshot, setAiSnapshot] = useState(initialSolution?.aiSnapshot || '')

  // Problem Section
  const [problemDesc, setProblemDesc] = useState(initialSolution?.problemSection?.description || '')
  const [problemBullets, setProblemBullets] = useState<string[]>(initialSolution?.problemSection?.bullets || [''])

  // Feature Modules (5 modules)
  const [features, setFeatures] = useState<FeatureModule[]>(
    initialSolution?.features && initialSolution.features.length > 0
      ? initialSolution.features
      : Array.from({ length: 5 }, () => ({ title: '', description: '', bullets: [''] }))
  )

  // Additional Details
  const [useCases, setUseCases] = useState<string[]>(initialSolution?.useCases || [''])
  const [integrations, setIntegrations] = useState<string>(initialSolution?.integrations?.join(', ') || '')
  const [benchmarkResults, setBenchmarkResults] = useState(initialSolution?.benchmarkResults || '')
  const [caseStudy, setCaseStudy] = useState(initialSolution?.caseStudy || '')

  // FAQs (5 items)
  const [faqs, setFaqs] = useState<FAQItem[]>(
    initialSolution?.faqs && initialSolution.faqs.length > 0
      ? initialSolution.faqs
      : Array.from({ length: 5 }, () => ({ question: '', answer: '' }))
  )

  // AI instructions and states
  const [aiInstructions, setAiInstructions] = useState('')
  const [isGeneratingAI, setIsGeneratingAI] = useState(false)
  const [aiTab, setAiTab] = useState<'write' | 'instructions'>('write')
  const [inlineAILoading, setInlineAILoading] = useState<string | null>(null)

  // Auto-fill slug from title if adding a new solution
  useEffect(() => {
    if (!initialSolution && !isEditingSlug) {
      const generatedSlug = title
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '')
        .replace(/-+/g, '-')
      setSlug(generatedSlug)
      setSlugInputValue(generatedSlug)
    }
  }, [title, initialSolution, isEditingSlug])

  // Real-time SEO Analyzer
  const seoChecklist = (() => {
    const checks: { label: string; pass: boolean; tip: string }[] = []
    const kw = focusKeyword.toLowerCase().trim()

    // 1. Focus keyword set
    checks.push({
      label: 'Focus keyword set',
      pass: !!kw,
      tip: 'Enter a focus keyword in the Publish sidebar'
    })

    // 2. Keyword in title
    checks.push({
      label: 'Keyword in page title',
      pass: !!kw && title.toLowerCase().includes(kw),
      tip: 'Include your focus keyword in the page title'
    })

    // 3. Keyword in SEO title
    checks.push({
      label: 'Keyword in SEO title',
      pass: !!kw && seoTitle.toLowerCase().includes(kw),
      tip: 'Include your focus keyword in the SEO title tag'
    })

    // 4. SEO Title length
    checks.push({
      label: `SEO title length (${seoTitle.length}/60)`,
      pass: seoTitle.length >= 30 && seoTitle.length <= 65,
      tip: 'SEO title should be 30-65 characters'
    })

    // 5. Meta description length
    checks.push({
      label: `Meta description (${seoDescription.length}/160)`,
      pass: seoDescription.length >= 80 && seoDescription.length <= 165,
      tip: 'Meta description should be 80-165 characters'
    })

    // 6. Keyword in meta description
    checks.push({
      label: 'Keyword in meta description',
      pass: !!kw && seoDescription.toLowerCase().includes(kw),
      tip: 'Include focus keyword in meta description'
    })

    // 7. Description length
    checks.push({
      label: `Description length (${description.length} chars)`,
      pass: description.length >= 100,
      tip: 'Write at least 100 characters in the description'
    })

    // 8. Keyword in description
    checks.push({
      label: 'Keyword in description',
      pass: !!kw && description.toLowerCase().includes(kw),
      tip: 'Use your focus keyword in the main description'
    })

    // 9. At least 2 FAQs
    checks.push({
      label: `FAQs added (${faqs.filter(f => f.question.trim() && f.answer.trim()).length})`,
      pass: faqs.filter(f => f.question.trim() && f.answer.trim()).length >= 2,
      tip: 'Add at least 2 FAQs for better SEO'
    })

    // 10. OG Image
    checks.push({
      label: 'OpenGraph image set',
      pass: !!ogImage,
      tip: 'Set an OG image for social sharing'
    })

    // AEO/AGO Checks
    const hasConversationalKeyword = ['how', 'why', 'what', 'best', 'guide', 'strategy', 'tips', 'api'].some(word => kw.includes(word))
    checks.push({
      label: 'AEO: Conversational Keyword intent',
      pass: hasConversationalKeyword,
      tip: 'Use conversational search words in keyword (how, why, what, best, api, guide)'
    })

    const hasDirectAnswer = description.length > 50 && description.length <= 200
    checks.push({
      label: 'AEO: Direct Answer Snippet',
      pass: hasDirectAnswer,
      tip: 'Description should be 50-200 chars to serve as an AI Direct Answer Snippet'
    })

    const hasFAQ = faqs.filter(f => f.question.trim() && f.answer.trim()).length >= 2 || description.toLowerCase().includes('?')
    checks.push({
      label: 'AEO: Direct Q&A structure / FAQ',
      pass: hasFAQ,
      tip: 'Include FAQs or question marks for LLM citation optimization'
    })

    const passCount = checks.filter(c => c.pass).length
    const calculatedScore = Math.round((passCount / checks.length) * 100)

    return { checks, score: calculatedScore }
  })()

  // Auto-update SEO score reactively
  useEffect(() => {
    setSeoScore(seoChecklist.score)
  }, [seoChecklist.score])

  // Handle Save (Submit)
  const handlePublishClick = () => {
    if (!title.trim()) return alert('Post Title is required.')
    if (!slug.trim()) return alert('URL Slug is required.')

    const cleanedSlug = slug.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')

    const updatedSolution: Solution = {
      id: cleanedSlug,
      title: title.trim(),
      shortDesc: shortDesc.trim(),
      description: description.trim(),
      icon: icon.trim(),
      link: link.trim() || `/solutions/${cleanedSlug}`,
      previewType: previewType || `${cleanedSlug}-solution`,
      metric: metric.trim(),
      seoTitle: seoTitle.trim(),
      seoDescription: seoDescription.trim(),
      seoKeywords: seoKeywords.trim(),
      ogImage: ogImage.trim(),
      aiSnapshot: aiSnapshot.trim(),
      status,
      seoScore,
      noindex,
      focusKeyword: focusKeyword.trim() || seoKeywords.split(',')[0]?.trim() || (title || '').split(' ')[0],
      schemaStatus,
      created_at: createdDate,
      problemSection: {
        description: problemDesc.trim(),
        bullets: problemBullets.filter(b => b.trim())
      },
      features: features.map(f => ({
        title: f.title.trim(),
        description: f.description.trim(),
        bullets: f.bullets.filter(b => b.trim())
      })),
      integrations: integrations.split(',').map(s => s.trim()).filter(Boolean),
      benchmarkResults: benchmarkResults.trim(),
      caseStudy: caseStudy.trim(),
      faqs: faqs.filter(f => f.question.trim() && f.answer.trim()),
      useCases: useCases.filter(u => u.trim())
    }

    onSave(updatedSolution)
  }

  // Handle Inline AI copywriting helpers
  const handleInlineAI = async (fieldName: string, currentVal: string, setter: (val: string) => void) => {
    if (!title.trim()) {
      return alert('Enter a Title first so AI can read the context!')
    }
    try {
      const response = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: `You are an expert AI copywriter for AI Greentick.
Generate the ${fieldName} for a WhatsApp Business API solution called "${title}".
Current value for context: "${currentVal}".
Output ONLY the generated copy, no formatting, no explanations, no wrappers.`
        })
      })
      const data = await response.json()
      if (data.text) {
        setter(data.text.trim())
      } else {
        alert('AI generation failed')
      }
    } catch (err: any) {
      alert(`AI error: ${err.message || err}`)
    }
  }

  // Content AI Smart Generation (AWS Bedrock Claude)
  const handleAIGenerate = async () => {
    if (!title.trim()) {
      return alert('Please enter a Title at the top first so AI can read the context!')
    }

    setIsGeneratingAI(true)
    try {
      const systemPrompt = `You are a senior marketing copywriter for AI Greentick, a WhatsApp Business API SaaS platform. You write conversion-focused, professional solution landing page content. Always respond ONLY with valid JSON, no markdown, no extra text.`

      const userPrompt = `Generate complete detailed solution page content for a WhatsApp API solution called "${title}".
${aiInstructions ? `Additional instructions: ${aiInstructions}` : ''}
${description ? `Current description for context: ${description}` : ''}

Return a JSON object with EXACTLY these keys:
{
  "description": "2-3 sentence professional description of this solution (150-200 chars)",
  "shortDesc": "Short tagline (5-8 words)",
  "metric": "Key metric outcome like '35% cart recovery rate' or '3x more bookings'",
  "problemDesc": "Description explaining the industry problem that this solution solves (2-3 sentences)",
  "problemBullets": [
    "Key challenge 1...",
    "Key challenge 2...",
    "Key challenge 3..."
  ],
  "features": [
    {
      "title": "Feature 1 Title",
      "description": "Short explanation",
      "bullets": ["Detail bullet 1", "Detail bullet 2"]
    },
    {
      "title": "Feature 2 Title",
      "description": "Short explanation",
      "bullets": ["Detail bullet 1", "Detail bullet 2"]
    },
    {
      "title": "Feature 3 Title",
      "description": "Short explanation",
      "bullets": ["Detail bullet 1", "Detail bullet 2"]
    },
    {
      "title": "Feature 4 Title",
      "description": "Short explanation",
      "bullets": ["Detail bullet 1", "Detail bullet 2"]
    },
    {
      "title": "Feature 5 Title",
      "description": "Short explanation",
      "bullets": ["Detail bullet 1", "Detail bullet 2"]
    }
  ],
  "faqs": [
    {"question": "Relevant FAQ question 1?", "answer": "Concise professional answer"},
    {"question": "Relevant FAQ question 2?", "answer": "Concise professional answer"},
    {"question": "Relevant FAQ question 3?", "answer": "Concise professional answer"},
    {"question": "Relevant FAQ question 4?", "answer": "Concise professional answer"},
    {"question": "Relevant FAQ question 5?", "answer": "Concise professional answer"}
  ],
  "useCases": [
    "Automated workflow step 1",
    "Automated workflow step 2",
    "Automated workflow step 3"
  ],
  "integrations": "Shopify, WooCommerce, Razorpay",
  "benchmarkResults": "Detail industry expectation benchmarks or results...",
  "caseStudy": "Detail success story or case study text...",
  "focusKeyword": "primary seo keyword phrase",
  "seoTitle": "SEO Title | AI Greentick (50-60 chars)",
  "seoDescription": "Meta description for search engines (120-160 chars)",
  "seoKeywords": "comma, separated, keyword, list"
}`

      const response = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: userPrompt, systemPrompt })
      })

      const data = await response.json()

      if (data.error) {
        alert(`AI Error: ${data.error}`)
        setIsGeneratingAI(false)
        return
      }

      const text = data.text || ''
      const jsonMatch = text.match(/\{[\s\S]*\}/)
      if (!jsonMatch) {
        alert('AI returned invalid format. Please try again.')
        setIsGeneratingAI(false)
        return
      }

      const generated = JSON.parse(jsonMatch[0])

      if (generated.description) setDescription(generated.description)
      if (generated.shortDesc) setShortDesc(generated.shortDesc)
      if (generated.metric) setMetric(generated.metric)
      if (generated.problemDesc) setProblemDesc(generated.problemDesc)
      if (generated.problemBullets) setProblemBullets(generated.problemBullets)
      if (generated.features) setFeatures(generated.features)
      if (generated.faqs) setFaqs(generated.faqs)
      if (generated.useCases) setUseCases(generated.useCases)
      if (generated.integrations) setIntegrations(generated.integrations)
      if (generated.benchmarkResults) setBenchmarkResults(generated.benchmarkResults)
      if (generated.caseStudy) setCaseStudy(generated.caseStudy)
      if (generated.focusKeyword) setFocusKeyword(generated.focusKeyword)
      if (generated.seoTitle) setSeoTitle(generated.seoTitle)
      if (generated.seoDescription) setSeoDescription(generated.seoDescription)
      if (generated.seoKeywords) setSeoKeywords(generated.seoKeywords)
      setSeoScore(90)

    } catch (err: any) {
      alert(`AI generate error: ${err.message || err}`)
    } finally {
      setIsGeneratingAI(false)
    }
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12 font-sans text-neutral-800 antialiased select-none">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-neutral-200 pb-5">
        <div className="flex items-center gap-4">
          <button
            onClick={onCancel}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-neutral-200 bg-white hover:bg-neutral-50 text-neutral-500 hover:text-black transition-colors cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-neutral-900">
              {initialSolution ? `Edit Solution: ${initialSolution.title}` : 'Add New Solution'}
            </h2>
            <p className="text-neutral-500 text-xs">Configure landing pages, problem statement, features, workflows, and SEO tags.</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 border border-neutral-200 rounded-lg text-sm font-semibold hover:bg-neutral-50 cursor-pointer bg-white transition-colors shadow-sm"
          >
            Cancel
          </button>
          <button
            onClick={handlePublishClick}
            className="px-5 py-2 rounded-lg bg-primary hover:bg-primary/95 text-white text-sm font-bold cursor-pointer transition-colors shadow-sm"
          >
            {initialSolution ? 'Update Solution' : 'Publish Solution'}
          </button>
        </div>
      </div>

      {/* WordPress-style Editor Main Layout: 2 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        
        {/* Left Column (3 spans): Main Editor Body Cards */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* Post Title Field */}
          <div className="space-y-1">
            <Input 
              value={title} 
              onChange={e => setTitle(e.target.value)} 
              placeholder="Enter solution title here" 
              className="text-xl font-bold border-neutral-300 h-12 bg-white rounded-lg px-4"
            />
            
            {/* Permalink Display */}
            <div className="flex items-center gap-1.5 pl-1 text-[11px] text-neutral-450 font-normal leading-normal">
              <span className="font-bold text-neutral-500">Permalink:</span>
              <span className="text-neutral-400">http://localhost:3000/solutions/</span>
              {isEditingSlug ? (
                <div className="flex items-center gap-1">
                  <Input 
                    value={slugInputValue} 
                    onChange={e => setSlugInputValue(e.target.value)} 
                    className="h-6 w-40 text-[10px] font-mono border-neutral-300 px-1 py-0.5 rounded"
                  />
                  <Button 
                    onClick={() => {
                      const cleaned = slugInputValue.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
                      setSlug(cleaned)
                      setSlugInputValue(cleaned)
                      setIsEditingSlug(false)
                    }} 
                    className="h-6 px-2 text-[10px] cursor-pointer"
                  >
                    Save
                  </Button>
                  <Button 
                    onClick={() => {
                      setSlugInputValue(slug)
                      setIsEditingSlug(false)
                    }} 
                    variant="ghost" 
                    className="h-6 px-2 text-[10px] text-neutral-400 cursor-pointer"
                  >
                    Cancel
                  </Button>
                </div>
              ) : (
                <div className="flex items-center gap-1">
                  <span className="font-semibold text-sky-700 font-mono underline hover:text-sky-850 cursor-pointer">
                    {slug || '(empty)'}
                  </span>
                  <Button 
                    onClick={() => setIsEditingSlug(true)} 
                    variant="outline" 
                    className="h-6 px-2 text-[10px] border-neutral-300 text-neutral-600 bg-white hover:bg-neutral-100 cursor-pointer"
                  >
                    Edit
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Rich Content Editor */}
          <div className="relative">
            <RichEditor
              value={description}
              onChange={setDescription}
              placeholder="Start writing solution detail description here..."
              minHeight="260px"
            />
            <button
              type="button"
              disabled={inlineAILoading === 'description' || !title.trim()}
              onClick={async () => {
                setInlineAILoading('description')
                await handleInlineAI('description (2-3 sentences, 150-250 characters, professional and conversion-focused)', description, setDescription)
                setInlineAILoading(null)
              }}
              className="absolute top-2 right-2 flex items-center gap-1 px-2 py-1 text-[9px] font-bold text-amber-600 bg-amber-50 border border-amber-300 rounded hover:bg-amber-100 cursor-pointer transition-colors disabled:opacity-40"
              title="AI: Improve description"
            >
              {inlineAILoading === 'description' ? (
                <span className="h-3 w-3 rounded-full border-2 border-amber-500 border-t-transparent animate-spin inline-block" />
              ) : (
                <Sparkles className="h-3 w-3" />
              )}
              AI
            </button>
          </div>

          {/* Card 1: General Settings */}
          <Card className="border border-neutral-200 shadow-sm bg-white rounded-lg">
            <CardHeader className="bg-neutral-50/50 border-b border-neutral-100 py-3.5 px-5">
              <CardTitle className="text-sm font-bold text-neutral-800">General Settings</CardTitle>
              <CardDescription className="text-[10px]">Configure basic redirect links, proven metrics, taglines, and Lucide icons.</CardDescription>
            </CardHeader>
            <CardContent className="p-5 space-y-4 text-xs text-neutral-700 bg-white font-normal">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="icon" className="text-xs font-semibold text-neutral-750">Lucide Icon (e.g. ShoppingBag, Activity, GraduationCap)</Label>
                  <Input 
                    id="icon" 
                    value={icon} 
                    onChange={e => setIcon(e.target.value)} 
                    placeholder="e.g. ShoppingBag" 
                    className="border-neutral-200 h-9 font-mono text-[11px] bg-white font-normal focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="metric" className="text-xs font-semibold text-neutral-750">Proven Outcome Metric highlight (e.g. 35% cart recovery)</Label>
                  <Input 
                    id="metric" 
                    value={metric} 
                    onChange={e => setMetric(e.target.value)} 
                    placeholder="e.g. 35% cart recovery rate" 
                    className="border-neutral-200 h-9 bg-white font-normal focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="link" className="text-xs font-semibold text-neutral-750">Redirect Link (Blank defaults to /solutions/slug)</Label>
                  <Input 
                    id="link" 
                    value={link} 
                    onChange={e => setLink(e.target.value)} 
                    placeholder="/solutions/ecommerce" 
                    className="border-neutral-200 h-9 font-mono text-[11px] bg-white font-normal focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="previewType" className="text-xs font-semibold text-neutral-750">Demo Component Selector</Label>
                  <Select value={previewType} onValueChange={setPreviewType}>
                    <SelectTrigger className="bg-white border border-neutral-200 h-9 outline-none text-neutral-800 text-xs font-normal shadow-xs focus:ring-2 focus:ring-primary/20 focus:border-primary">
                      <SelectValue placeholder="Select demo visual component" />
                    </SelectTrigger>
                    <SelectContent className="text-black">
                      <SelectItem value="ecommerce-solution">Ecommerce Demo (Mock carts)</SelectItem>
                      <SelectItem value="healthcare-solution">Healthcare Demo (Patient appt alerts)</SelectItem>
                      <SelectItem value="education-solution">Education Demo (Admissions tracker)</SelectItem>
                      <SelectItem value="realestate-solution">Real Estate Demo (Property catalog)</SelectItem>
                      <SelectItem value="finance-solution">Finance Demo (OTP verification)</SelectItem>
                      <SelectItem value="travel-solution">Travel Demo (Boarding passes)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="shortDesc" className="text-xs font-semibold text-neutral-750">Short tagline summary (hover summaries)</Label>
                <Input 
                  id="shortDesc" 
                  value={shortDesc} 
                  onChange={e => setShortDesc(e.target.value)} 
                  placeholder="Single-sentence summary shown on cards" 
                  className="border-neutral-200 h-9 bg-white font-normal focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none"
                />
              </div>
            </CardContent>
          </Card>

          {/* Card 2: Problem Statement */}
          <Card className="border border-neutral-200 shadow-sm bg-white rounded-lg">
            <CardHeader className="bg-neutral-50/50 border-b border-neutral-100 py-3.5 px-5">
              <CardTitle className="text-sm font-bold text-neutral-800">Problem Statement</CardTitle>
              <CardDescription className="text-[10px]">Describe the industry challenge this blueprint resolves.</CardDescription>
            </CardHeader>
            <CardContent className="p-5 space-y-4 text-xs text-neutral-700 bg-white font-normal">
              <div className="space-y-1.5">
                <Label htmlFor="problemDesc" className="text-xs font-semibold text-neutral-750">Problem Description</Label>
                <Textarea 
                  id="problemDesc"
                  value={problemDesc} 
                  onChange={e => setProblemDesc(e.target.value)} 
                  placeholder="Explain the main industry problem statement..." 
                  className="border-neutral-200 min-h-[80px] bg-white resize-none font-normal focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-xs font-semibold text-neutral-750">Key Challenges / Bullet Points</Label>
                {problemBullets.map((bullet, i) => (
                  <div key={i} className="flex gap-2">
                    <Input
                      value={bullet}
                      onChange={e => {
                        const newBullets = [...problemBullets]
                        newBullets[i] = e.target.value
                        setProblemBullets(newBullets)
                      }}
                      className="flex-1 border border-neutral-200 h-9 bg-white font-normal focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none"
                      placeholder={`Challenge bullet ${i + 1}...`}
                    />
                    <Button
                      onClick={() => setProblemBullets(problemBullets.filter((_, j) => j !== i))}
                      variant="ghost" 
                      size="icon"
                      className="h-9 w-9 text-red-500 hover:bg-red-50 cursor-pointer"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => setProblemBullets([...problemBullets, ''])}
                  className="flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-primary/80 mt-1 cursor-pointer"
                >
                  <Plus className="h-3.5 w-3.5" /> Add Challenge
                </button>
              </div>
            </CardContent>
          </Card>

          {/* Card 3: 5 Feature Modules */}
          <Card className="border border-neutral-200 shadow-sm bg-white rounded-lg">
            <CardHeader className="bg-neutral-50/50 border-b border-neutral-100 py-3.5 px-5">
              <CardTitle className="text-sm font-bold text-neutral-800">5 Detailed Feature Modules</CardTitle>
              <CardDescription className="text-[10px]">Configure the 5 custom features detailing this solution blueprint.</CardDescription>
            </CardHeader>
            <CardContent className="p-5 space-y-6 text-xs text-neutral-700 bg-white font-normal">
              {features.map((feat, fIdx) => (
                <div key={fIdx} className="p-4 border border-neutral-200 rounded-xl space-y-3 bg-neutral-50/20">
                  <div className="flex items-center justify-between border-b border-neutral-200 pb-2">
                    <span className="text-xs font-bold text-neutral-800 uppercase">Feature Module #{fIdx + 1}</span>
                  </div>
                  <div className="space-y-1">
                    <Label className="block text-[10px] font-bold text-neutral-500 uppercase">Feature Title</Label>
                    <Input
                      value={feat.title}
                      onChange={e => {
                        const newFeats = [...features]
                        newFeats[fIdx] = { ...feat, title: e.target.value }
                        setFeatures(newFeats)
                      }}
                      className="w-full border border-neutral-200 h-9 bg-white font-normal focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none"
                      placeholder="e.g. Abandoned Cart Recovery"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="block text-[10px] font-bold text-neutral-500 uppercase">Feature Description</Label>
                    <Textarea
                      value={feat.description}
                      onChange={e => {
                        const newFeats = [...features]
                        newFeats[fIdx] = { ...feat, description: e.target.value }
                        setFeatures(newFeats)
                      }}
                      rows={2}
                      className="w-full border border-neutral-200 bg-white resize-none font-normal focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none"
                      placeholder="Explain this specific module feature..."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="block text-[10px] font-bold text-neutral-500 uppercase">Bullets / Benefits List</Label>
                    {(feat.bullets || ['']).map((bullet, bIdx) => (
                      <div key={bIdx} className="flex gap-2">
                        <Input
                          value={bullet}
                          onChange={e => {
                            const newBullets = [...(feat.bullets || [])]
                            newBullets[bIdx] = e.target.value
                            const newFeats = [...features]
                            newFeats[fIdx] = { ...feat, bullets: newBullets }
                            setFeatures(newFeats)
                          }}
                          className="flex-1 border border-neutral-200 h-9 bg-white font-normal focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none"
                          placeholder={`Detail bullet ${bIdx + 1}`}
                        />
                        <Button
                          onClick={() => {
                            const newBullets = (feat.bullets || []).filter((_, j) => j !== bIdx)
                            const newFeats = [...features]
                            newFeats[fIdx] = { ...feat, bullets: newBullets }
                            setFeatures(newFeats)
                          }}
                          variant="ghost" 
                          size="icon"
                          className="h-9 w-9 text-red-500 hover:bg-red-50 cursor-pointer"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => {
                        const newBullets = [...(feat.bullets || []), '']
                        const newFeats = [...features]
                        newFeats[fIdx] = { ...feat, bullets: newBullets }
                        setFeatures(newFeats)
                      }}
                      className="flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-primary/80 mt-1 cursor-pointer"
                    >
                      <Plus className="h-3.5 w-3.5" /> Add bullet
                    </button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Card 4: Additional Details */}
          <Card className="border border-neutral-200 shadow-sm bg-white rounded-lg">
            <CardHeader className="bg-neutral-50/50 border-b border-neutral-100 py-3.5 px-5">
              <CardTitle className="text-sm font-bold text-neutral-800">Additional Details</CardTitle>
              <CardDescription className="text-[10px]">Configure automated workflows, integrations, benchmarks, and case study.</CardDescription>
            </CardHeader>
            <CardContent className="p-5 space-y-4 text-xs text-neutral-700 bg-white font-normal">
              
              {/* Automated Workflows */}
              <div className="space-y-2">
                <Label className="text-xs font-semibold text-neutral-750">Automated Workflows (List)</Label>
                {useCases.map((uc, i) => (
                  <div key={i} className="flex gap-2">
                    <Input
                      value={uc}
                      onChange={e => {
                        const newUcs = [...useCases]
                        newUcs[i] = e.target.value
                        setUseCases(newUcs)
                      }}
                      className="flex-1 border border-neutral-200 h-9 bg-white font-normal focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none"
                      placeholder={`Workflow item ${i + 1}...`}
                    />
                    <Button
                      onClick={() => setUseCases(useCases.filter((_, j) => j !== i))}
                      variant="ghost" 
                      size="icon"
                      className="h-9 w-9 text-red-500 hover:bg-red-50 cursor-pointer"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => setUseCases([...useCases, ''])}
                  className="flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-primary/80 mt-1 cursor-pointer"
                >
                  <Plus className="h-3.5 w-3.5" /> Add workflow
                </button>
              </div>

              {/* Integrations */}
              <div className="space-y-1.5">
                <Label htmlFor="integrations" className="text-xs font-semibold text-neutral-750">Built-in Integrations (Comma separated)</Label>
                <Input
                  id="integrations"
                  value={integrations}
                  onChange={e => setIntegrations(e.target.value)}
                  placeholder="Shopify, WooCommerce, Razorpay"
                  className="border-neutral-200 h-9 bg-white font-normal focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none"
                />
              </div>

              {/* Benchmarks */}
              <div className="space-y-1.5">
                <Label htmlFor="benchmark" className="text-xs font-semibold text-neutral-750">Benchmark Results (What You Can Expect)</Label>
                <Textarea
                  id="benchmark"
                  value={benchmarkResults}
                  onChange={e => setBenchmarkResults(e.target.value)}
                  placeholder="Industry expectation benchmarks..."
                  rows={3}
                  className="border-neutral-200 bg-white resize-none font-normal focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none"
                />
              </div>

              {/* Case Study */}
              <div className="space-y-1.5">
                <Label htmlFor="caseStudy" className="text-xs font-semibold text-neutral-750">Case Study Showcase Block</Label>
                <Textarea
                  id="caseStudy"
                  value={caseStudy}
                  onChange={e => setCaseStudy(e.target.value)}
                  placeholder="Case study showcase details..."
                  rows={3}
                  className="border-neutral-200 bg-white resize-none font-normal focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none"
                />
              </div>
            </CardContent>
          </Card>

          {/* Card 5: FAQs */}
          <Card className="border border-neutral-200 shadow-sm bg-white rounded-lg">
            <CardHeader className="bg-neutral-50/50 border-b border-neutral-100 py-3.5 px-5">
              <CardTitle className="text-sm font-bold text-neutral-800">5 FAQ Accordions</CardTitle>
              <CardDescription className="text-[10px]">Add up to 5 detailed FAQ accordion blocks.</CardDescription>
            </CardHeader>
            <CardContent className="p-5 space-y-6 text-xs text-neutral-700 bg-white font-normal">
              {faqs.map((faq, idx) => (
                <div key={idx} className="p-4 border border-neutral-200 rounded-xl space-y-3 bg-neutral-50/20">
                  <div className="text-xs font-bold text-neutral-850 uppercase pb-1 border-b border-neutral-200">
                    FAQ Item #{idx + 1}
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-[10px] font-bold text-neutral-500 uppercase">Question</Label>
                    <Input
                      value={faq.question}
                      onChange={e => {
                        const newFaqs = [...faqs]
                        newFaqs[idx] = { ...faq, question: e.target.value }
                        setFaqs(newFaqs)
                      }}
                      placeholder="FAQ Question..."
                      className="border-neutral-200 h-9 bg-white font-normal focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-[10px] font-bold text-neutral-500 uppercase">Answer</Label>
                    <Textarea
                      value={faq.answer}
                      onChange={e => {
                        const newFaqs = [...faqs]
                        newFaqs[idx] = { ...faq, answer: e.target.value }
                        setFaqs(newFaqs)
                      }}
                      placeholder="FAQ Answer..."
                      rows={2}
                      className="border-neutral-200 bg-white resize-none font-normal focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none"
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Card 6: Search Optimization */}
          <Card className="border border-neutral-200 shadow-sm bg-white rounded-lg">
            <CardHeader className="bg-neutral-50/50 border-b border-neutral-100 py-3.5 px-5">
              <CardTitle className="text-sm font-bold text-neutral-800">Search Optimization (SEO)</CardTitle>
              <CardDescription className="text-[10px]">Configure search engine snippets, meta tags, and open graph image properties.</CardDescription>
            </CardHeader>
            <CardContent className="p-5 space-y-4 text-xs text-neutral-700 bg-white font-normal">
              <div className="space-y-1.5">
                <Label htmlFor="seoTitle" className="text-xs font-semibold text-neutral-750">Meta Title</Label>
                <Input 
                  id="seoTitle" 
                  value={seoTitle} 
                  onChange={e => setSeoTitle(e.target.value)} 
                  placeholder={`${title} | AI Greentick`}
                  className="border-neutral-200 h-9 bg-white font-normal focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none"
                />
                <p className="text-[9px] text-neutral-400 font-medium pl-0.5">Recommended length: 45 to 65 characters.</p>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="seoDescription" className="text-xs font-semibold text-neutral-750">Meta Description</Label>
                <Textarea 
                  id="seoDescription" 
                  value={seoDescription} 
                  onChange={e => setSeoDescription(e.target.value)} 
                  placeholder="Meta description summary..."
                  rows={2}
                  className="border-neutral-200 bg-white resize-none font-normal focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none"
                />
                <p className="text-[9px] text-neutral-400 font-medium pl-0.5">Recommended length: 110 to 160 characters.</p>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="seoKeywords" className="text-xs font-semibold text-neutral-750">Meta Keywords</Label>
                <Input 
                  id="seoKeywords" 
                  value={seoKeywords} 
                  onChange={e => setSeoKeywords(e.target.value)} 
                  placeholder="e.g. cart recovery, customer retention"
                  className="border-neutral-200 h-9 bg-white font-normal focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="ogImage" className="text-xs font-semibold text-neutral-750">OpenGraph Image URL</Label>
                <Input 
                  id="ogImage" 
                  value={ogImage} 
                  onChange={e => setOgImage(e.target.value)} 
                  placeholder="/og-images/solution.png"
                  className="border-neutral-200 h-9 font-mono text-[11px] bg-white font-normal focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none"
                />
              </div>

              <div className="space-y-1.5 pt-2 border-t border-neutral-100">
                <Label htmlFor="aiSnapshot" className="text-xs font-semibold text-[#00b259]">AI Snapshot Direct Summary (AEO/AGO optimized)</Label>
                <Textarea 
                  id="aiSnapshot" 
                  value={aiSnapshot} 
                  onChange={e => setAiSnapshot(e.target.value)} 
                  placeholder="Direct 1-2 sentence summary of this solution blueprint..." 
                  className="border-neutral-200 min-h-[50px] bg-white resize-none font-normal text-xs leading-relaxed"
                />
              </div>

              <div className="flex items-center gap-2 pt-2 border-t border-neutral-100">
                <input
                  type="checkbox"
                  id="noindex"
                  checked={noindex}
                  onChange={e => setNoindex(e.target.checked)}
                  className="h-4 w-4 accent-[#00b259]"
                />
                <Label htmlFor="noindex" className="text-xs font-medium text-neutral-600">
                  Hide this page from search engines (noindex)
                </Label>
              </div>

              <AeoChecklist
                focusKeyword={focusKeyword}
                title={seoTitle || title}
                description={seoDescription}
                aiSnapshot={aiSnapshot}
                faqCount={faqs.length}
                className="mt-3"
              />
            </CardContent>
          </Card>
        </div>

        {/* Right Column (1 span): Sidebar Widgets */}
        <div className="space-y-6">
          
          {/* Widget 1: Publish Settings widget */}
          <Card className="border border-neutral-200 bg-white rounded-lg shadow-sm overflow-visible">
            <CardHeader className="bg-neutral-50/50 border-b border-neutral-100 py-3.5 px-4">
              <CardTitle className="text-xs font-bold text-neutral-800">Publish settings</CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-3.5 text-[11px] text-neutral-500 font-normal leading-relaxed select-none">
              
              {/* Status */}
              <div className="flex items-center justify-between">
                <span className="font-semibold text-neutral-700">Status:</span>
                <Select value={status} onValueChange={(val) => setStatus(val)}>
                  <SelectTrigger className="bg-white border border-neutral-200 h-7 w-24 outline-none text-neutral-800 text-[10px] cursor-pointer font-normal shadow-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="text-black">
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Visibility */}
              <div className="flex items-center justify-between">
                <span className="font-semibold text-neutral-700">Visibility:</span>
                <span className="text-primary font-semibold">Public (Edit)</span>
              </div>

              {/* Focus Keyword */}
              <div className="space-y-1">
                <span className="block text-neutral-450 font-bold uppercase tracking-wider text-[9px]">Focus Keyword</span>
                <Input
                  value={focusKeyword}
                  onChange={(e) => setFocusKeyword(e.target.value)}
                  placeholder="Focus SEO keyword"
                  className="h-7.5 text-[10px] border-neutral-200 font-normal focus:ring-1 focus:ring-primary/20 focus:border-primary"
                />
              </div>

              {/* SEO Score Rank */}
              <div className="border-t border-neutral-200 pt-3 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-neutral-700">SEO Score Rank:</span>
                  <Badge 
                    className={cn(
                      "px-2 py-0.5 text-[10px] font-extrabold rounded-md shadow-xs border",
                      seoScore >= 80 ? "bg-[#EAFBF3] text-emerald-600 border border-emerald-400 hover:bg-[#EAFBF3]" :
                      seoScore >= 50 ? "bg-[#FFF9E6] text-amber-600 border border-amber-400 hover:bg-[#FFF9E6]" :
                      "bg-red-50 text-red-650 border border-red-400 hover:bg-red-50"
                    )}
                  >
                    {focusKeyword ? `${seoScore}/100` : 'N/A'}
                  </Badge>
                </div>

                <div className="flex items-center justify-between">
                  <span className="font-semibold text-neutral-700">Schema:</span>
                  <Select value={schemaStatus} onValueChange={setSchemaStatus}>
                    <SelectTrigger className="bg-white border border-neutral-200 h-7 w-28 outline-none text-neutral-800 text-[10px] cursor-pointer font-normal shadow-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="text-black">
                      <SelectItem value="On">Enabled (On)</SelectItem>
                      <SelectItem value="Off">Disabled (Off)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Publish Controls */}
              <div className="border-t border-neutral-200 pt-3.5 flex items-center justify-between">
                <button
                  type="button"
                  onClick={onCancel}
                  className="text-red-500 hover:text-red-650 hover:underline cursor-pointer font-bold"
                >
                  Move to Trash
                </button>
                
                <Button
                  type="button"
                  onClick={handlePublishClick}
                  className="h-8.5 px-4 cursor-pointer text-xs rounded-md shadow-sm gap-1"
                >
                  <Globe className="h-3.5 w-3.5" /> {initialSolution ? 'Update' : 'Publish'}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Widget 2: SEO Checklist widget */}
          <Card className="border border-neutral-200 bg-white rounded-lg shadow-sm overflow-visible">
            <CardHeader className="bg-neutral-50/50 border-b border-neutral-100 py-3.5 px-4 flex flex-row items-center justify-between">
              <CardTitle className="text-xs font-bold text-neutral-800 flex items-center gap-1">
                <FileText className="h-3.5 w-3.5 text-blue-500" /> SEO Checklist
              </CardTitle>
              <Badge
                className={cn(
                  "px-2 py-0.5 text-[10px] font-extrabold rounded-md shadow-xs border",
                  seoChecklist.score >= 80 ? "bg-[#EAFBF3] text-emerald-600 border-emerald-400 hover:bg-[#EAFBF3]" :
                  seoChecklist.score >= 50 ? "bg-[#FFF9E6] text-amber-600 border-amber-400 hover:bg-[#FFF9E6]" :
                  "bg-red-50 text-red-650 border-red-400 hover:bg-red-50"
                )}
              >
                {seoChecklist.score}/100
              </Badge>
            </CardHeader>
            <CardContent className="p-3 space-y-1 select-none">
              {seoChecklist.checks.map((check, i) => (
                <div key={i} className="flex items-center gap-2 py-1 px-1 rounded hover:bg-neutral-50 transition-colors" title={check.tip}>
                  <div className={cn(
                    "size-4 rounded-full flex items-center justify-center shrink-0 border",
                    check.pass
                      ? "bg-[#EAFBF3] border-emerald-400 text-emerald-600"
                      : "bg-red-50 border-red-300 text-red-500"
                  )}>
                    {check.pass ? (
                      <Check className="h-2.5 w-2.5 stroke-[3]" />
                    ) : (
                      <X className="h-2.5 w-2.5 stroke-[3]" />
                    )}
                  </div>
                  <span className={cn(
                    "text-[10px] font-medium leading-tight",
                    check.pass ? "text-neutral-600" : "text-red-600"
                  )}>
                    {check.label}
                  </span>
                </div>
              ))}
              <div className="pt-2 border-t border-neutral-200 mt-1">
                <div className="w-full bg-neutral-200 rounded-full h-1.5">
                  <div
                    className={cn(
                      "h-1.5 rounded-full transition-all duration-500",
                      seoChecklist.score >= 80 ? "bg-emerald-500" :
                      seoChecklist.score >= 50 ? "bg-amber-500" :
                      "bg-red-500"
                    )}
                    style={{ width: `${seoChecklist.score}%` }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Widget 3: Content AI Assistant widget */}
          <Card className="border border-neutral-200 bg-white rounded-lg shadow-sm overflow-visible">
            <CardHeader className="bg-neutral-50/50 border-b border-neutral-100 py-3.5 px-4 flex flex-row items-center justify-between">
              <CardTitle className="text-xs font-bold text-neutral-800 flex items-center gap-1">
                <Sparkles className="h-3.5 w-3.5 text-amber-500 animate-pulse" /> Content AI Assistant
              </CardTitle>
              <Badge variant="outline" className="px-1 text-[8px] border-primary/30 text-primary bg-primary/5 font-bold tracking-wide uppercase select-none rounded">
                Beta
              </Badge>
            </CardHeader>
            <CardContent className="p-4 text-[11px] text-neutral-500 font-normal space-y-3 select-none leading-relaxed">
              
              {/* Tabs */}
              <div className="flex bg-neutral-100 p-0.5 rounded-md text-[9px] font-semibold select-none border">
                <button
                  type="button"
                  onClick={() => setAiTab('write')}
                  className={cn(
                    "flex-1 text-center py-1 rounded-sm cursor-pointer transition-all",
                    aiTab === 'write' ? "bg-white text-black shadow-xs" : "text-neutral-500 hover:text-black"
                  )}
                >
                  Write Content
                </button>
                <button
                  type="button"
                  onClick={() => setAiTab('instructions')}
                  className={cn(
                    "flex-1 text-center py-1 rounded-sm cursor-pointer transition-all",
                    aiTab === 'instructions' ? "bg-white text-black shadow-xs" : "text-neutral-500 hover:text-black"
                  )}
                >
                  AI Instructions
                </button>
              </div>

              {aiTab === 'write' ? (
                <div className="space-y-3">
                  <p className="text-[10px] text-neutral-400 font-normal leading-normal">
                    AI analyzes your Title and auto-generates description content, key bento lists, problem statement, and meta tags instantly.
                  </p>
                  
                  <Button
                    type="button"
                    onClick={handleAIGenerate}
                    disabled={isGeneratingAI}
                    className="w-full font-bold h-8 text-[11px] cursor-pointer rounded-md shadow-sm gap-1.5"
                  >
                    {isGeneratingAI ? (
                      <>
                        <span className="h-3 w-3 rounded-full border border-white border-t-transparent animate-spin inline-block" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-3.5 w-3.5" /> Write with AI
                      </>
                    )}
                  </Button>
                </div>
              ) : (
                <div className="space-y-2">
                  <Label className="text-[9px] text-neutral-450 uppercase font-bold pl-0.5">Instructions for Generator</Label>
                  <Textarea
                    value={aiInstructions}
                    onChange={(e) => setAiInstructions(e.target.value)}
                    placeholder="e.g. Focus on e-commerce cart recovery and write a punchy sales copy..."
                    className="h-20 text-[10px] border-neutral-200 resize-none font-normal"
                  />
                </div>
              )}
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  )
}
