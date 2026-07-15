'use client'

import { useState, useEffect, useRef } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { uploadCMSImageAction } from '../cms-actions'
import { 
  Sparkles, Check, X, Plus, Trash2, ArrowUp, ArrowDown, ArrowLeft,
  Info, Laptop, Smartphone, HelpCircle, Layers, ShieldCheck,
  Undo, Redo, Bold, Italic, List, ListOrdered, Quote, AlignLeft, 
  AlignCenter, AlignRight, Link, Image, FileText, Settings, Eye, Globe, Upload
} from 'lucide-react'

interface Feature {
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
  
  hero?: {
    badgeText: string
    heading: string
    subheading: string
    mockChat: { sender: 'user' | 'bot'; text: string }[]
    imageUrl?: string
    imageLink?: string
  }
  capabilities?: { title: string; desc: string; icon: string }[]
  useCases?: {
    title: string
    desc: string
    bullets: string[]
    bg: string
    chat: string[]
    imageUrl?: string
  }[]
  faqs?: { question: string; answer: string }[]

  // WordPress Mock Fields
  status?: string
  seoScore?: number
  created_at?: string
  focusKeyword?: string
  schemaStatus?: string
  linksCount?: string
}

interface FeatureFormProps {
  initialFeature?: Feature
  onSave: (updatedFeature: Feature) => void
  onCancel: () => void
}

interface RichEditorProps {
  value: string
  onChange: (val: string) => void
  placeholder?: string
  className?: string
  minHeight?: string
  showAddMedia?: boolean
  onAddMedia?: () => void
}

function RichEditor({ 
  value, 
  onChange, 
  placeholder, 
  className, 
  minHeight = "120px",
  showAddMedia = false,
  onAddMedia
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
    <div className={cn("bg-white rounded-md border border-[#C5C4C2]/50 overflow-hidden shadow-2xs w-full", className)}>
      {/* Editor Header */}
      <div className="flex items-center justify-between bg-neutral-50 px-3 py-2 border-b border-[#C5C4C2]/45">
        <div className="flex items-center gap-1.5">
          {showAddMedia && (
            <>
              <Button
                type="button"
                variant="outline"
                className="h-7 text-xs border-neutral-300 text-neutral-700 bg-white hover:bg-neutral-100 flex items-center gap-1.5 cursor-pointer font-semibold shadow-xs mr-2"
                onClick={onAddMedia || (() => alert('Media Library is a mocked placeholder. In production, this opens files manager.'))}
              >
                <Image className="h-3.5 w-3.5" /> Add Media
              </Button>
              <div className="w-[1px] h-5 bg-neutral-300 mr-2" />
            </>
          )}

          <button
            type="button"
            onClick={() => handleFormat('<strong>', '</strong>')}
            className="p-1 hover:bg-neutral-150 hover:text-black rounded text-neutral-500 transition-colors cursor-pointer"
            title="Bold"
          >
            <Bold className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => handleFormat('<em>', '</em>')}
            className="p-1 hover:bg-neutral-150 hover:text-black rounded text-neutral-500 transition-colors cursor-pointer"
            title="Italic"
          >
            <Italic className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => handleFormat('<ul>\n  <li>', '</li>\n</ul>')}
            className="p-1 hover:bg-neutral-150 hover:text-black rounded text-neutral-500 transition-colors cursor-pointer"
            title="Bullet List"
          >
            <List className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => handleFormat('<ol>\n  <li>', '</li>\n</ol>')}
            className="p-1 hover:bg-neutral-150 hover:text-black rounded text-neutral-500 transition-colors cursor-pointer"
            title="Numbered List"
          >
            <ListOrdered className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => handleFormat('<blockquote>', '</blockquote>')}
            className="p-1 hover:bg-neutral-150 hover:text-black rounded text-neutral-500 transition-colors cursor-pointer"
            title="Quote"
          >
            <Quote className="h-4 w-4" />
          </button>
          
          <div className="w-[1px] h-4 bg-neutral-300 mx-1.5" />
          
          <button
            type="button"
            onClick={() => {
              const url = prompt('Enter URL link:')
              if (url) {
                handleFormat(`<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-[#00b259] underline font-semibold hover:opacity-85">`, '</a>')
              }
            }}
            className="p-1 hover:bg-neutral-150 hover:text-black rounded text-neutral-500 transition-colors cursor-pointer"
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
              mode === 'visual' ? "bg-white text-black shadow-2xs font-semibold" : "text-neutral-500 hover:text-black"
            )}
          >
            Visual
          </button>
          <button
            type="button"
            onClick={() => setMode('text')}
            className={cn(
              "px-2 py-0.5 rounded-sm transition-all cursor-pointer",
              mode === 'text' ? "bg-white text-black shadow-2xs font-semibold" : "text-neutral-500 hover:text-black"
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
            mode === 'visual' ? "font-sans text-xs" : "font-mono text-[11px] text-[#006622] bg-[#fcfdfc]"
          )}
        />
      </div>
    </div>
  )
}

const BG_COLOR_OPTIONS = [
  { label: 'Blue Ice', value: 'bg-[#EAF3FF]' },
  { label: 'Purple Mist', value: 'bg-[#F8F2FF]' },
  { label: 'Amber Glow', value: 'bg-[#FFF9E6]' },
  { label: 'Mint Clean', value: 'bg-[#EAFBF3]' },
  { label: 'Rose Soft', value: 'bg-[#FFF2F2]' },
  { label: 'Neutral Gray', value: 'bg-neutral-100' }
]

export default function FeatureForm({ initialFeature, onSave, onCancel }: FeatureFormProps) {
  // Main states
  const [title, setTitle] = useState(initialFeature?.title || '')
  const [slug, setSlug] = useState(initialFeature?.id || '')
  const [isEditingSlug, setIsEditingSlug] = useState(false)
  const [slugInputValue, setSlugInputValue] = useState(initialFeature?.id || '')
  const [description, setDescription] = useState(initialFeature?.description || '')

  // Editor modes ('visual' or 'text')
  const [editorMode, setEditorMode] = useState<'visual' | 'text'>('visual')

  // WP Mock Fields
  const [status, setStatus] = useState(initialFeature?.status || 'published')
  const [seoScore, setSeoScore] = useState(initialFeature?.seoScore || 70)
  const [focusKeyword, setFocusKeyword] = useState(initialFeature?.focusKeyword || '')
  const [schemaStatus, setSchemaStatus] = useState(initialFeature?.schemaStatus || 'On')
  const [createdDate, setCreatedDate] = useState(initialFeature?.created_at || new Date().toISOString())

  // Custom Fields States (Bottom Metabox)
  const [icon, setIcon] = useState(initialFeature?.icon || 'Inbox')
  const [link, setLink] = useState(initialFeature?.link || '')
  const [previewType, setPreviewType] = useState(initialFeature?.previewType || 'shared-inbox-feat')
  const [metric, setMetric] = useState(initialFeature?.metric || '')

  // SEO
  const [seoTitle, setSeoTitle] = useState(initialFeature?.seoTitle || '')
  const [seoDescription, setSeoDescription] = useState(initialFeature?.seoDescription || '')
  const [seoKeywords, setSeoKeywords] = useState(initialFeature?.seoKeywords || '')
  const [ogImage, setOgImage] = useState(initialFeature?.ogImage || '')

  // Hero Section
  const [heroBadgeText, setHeroBadgeText] = useState(initialFeature?.hero?.badgeText || (initialFeature ? 'FEATURE BLUEPRINT' : ''))
  const [heroHeading, setHeroHeading] = useState(initialFeature?.hero?.heading || initialFeature?.title || '')
  const [heroSubheading, setHeroSubheading] = useState(
    initialFeature?.hero?.subheading || initialFeature?.description || initialFeature?.shortDesc || ''
  )
  const [heroMockChat, setHeroMockChat] = useState<{ sender: 'user' | 'bot'; text: string }[]>(
    initialFeature?.hero?.mockChat && initialFeature.hero.mockChat.length > 0
      ? initialFeature.hero.mockChat
      : initialFeature
      ? [
          { sender: 'user', text: `How can ${initialFeature.title} help our business?` },
          { sender: 'bot', text: `It automates customer updates and coordinates workflows directly on WhatsApp! 🚀` }
        ]
      : []
  )
  const [heroImageUrl, setHeroImageUrl] = useState(initialFeature?.hero?.imageUrl || '')
  const [heroImageLink, setHeroImageLink] = useState(initialFeature?.hero?.imageLink || '')

  // Capabilities
  const [capabilities, setCapabilities] = useState<{ title: string; desc: string; icon: string }[]>(
    initialFeature?.capabilities && initialFeature.capabilities.length > 0
      ? initialFeature.capabilities
      : initialFeature
      ? [
          { title: 'Easy Setup', desc: 'Go live on the official WhatsApp API in 10 minutes.', icon: 'ShieldCheck' },
          { title: 'Smart Automation', desc: 'Configure drag-and-drop auto-responders easily.', icon: 'Cpu' },
          { title: 'CRM Sync', desc: 'Sync customer chats with HubSpot, Shopify, or Salesforce.', icon: 'RefreshCw' }
        ]
      : []
  )

  // Use Cases
  const [useCases, setUseCases] = useState<{
    title: string
    desc: string
    bullets: string[]
    bg: string
    chat: string[]
    imageUrl?: string
  }[]>(
    initialFeature?.useCases && initialFeature.useCases.length > 0
      ? initialFeature.useCases
      : initialFeature
      ? [
          {
            title: `Optimized ${initialFeature.title} Campaigns`,
            desc: `Configure rules and target user segments dynamically to boost engagement rates.`,
            bullets: ['98% open rates compared to email', '1-click checkout options in chat'],
            bg: 'bg-[#EAF3FF]',
            chat: [`Hey there! Get 15% off using code GREEN15.`, `Awesome! Ordering now.`],
            imageUrl: ''
          }
        ]
      : []
  )

  // FAQs
  const [faqs, setFaqs] = useState<{ question: string; answer: string }[]>(
    initialFeature?.faqs && initialFeature.faqs.length > 0
      ? initialFeature.faqs
      : initialFeature
      ? [
          {
            question: `What is the pricing model for ${initialFeature.title}?`,
            answer: `All official API features are included in AI Greentick paid plans starting at ₹2,499/month, with standard Meta conversation charges.`
          },
          {
            question: `Can I connect multiple agents to ${initialFeature.title}?`,
            answer: `Yes! Our shared team inbox supports unlimited agents answering queries on a single official WhatsApp business number.`
          }
        ]
      : []
  )

  const [isUploadingImage, setIsUploadingImage] = useState(false)

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setIsUploadingImage(true)
      const reader = new FileReader()
      reader.onloadend = async () => {
        try {
          const base64Data = (reader.result as string).split(',')[1]
          const cleanName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.]/g, '_')}`
          const response = await fetch('/api/upload', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              fileName: cleanName,
              base64Data,
              mimeType: file.type
            })
          })
          const res = await response.json()
          if (res?.publicUrl) {
            setHeroImageUrl(res.publicUrl)
          } else if (res?.error) {
            alert(`Upload error: ${res.error}`)
          }
        } catch (err: any) {
          alert(`Upload failed: ${err.message || err}`)
        } finally {
          setIsUploadingImage(false)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleUseCaseImageUpload = async (idx: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const cleanName = `${Date.now()}-uc-${file.name.replace(/[^a-zA-Z0-9.]/g, '_')}`
      const reader = new FileReader()
      reader.onloadend = async () => {
        try {
          const base64Data = (reader.result as string).split(',')[1]
          const response = await fetch('/api/upload', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              fileName: cleanName,
              base64Data,
              mimeType: file.type
            })
          })
          const res = await response.json()
          if (res?.publicUrl) {
            updateUseCase(idx, 'imageUrl', res.publicUrl)
          } else if (res?.error) {
            alert(`Upload error: ${res.error}`)
          }
        } catch (err: any) {
          alert(`Upload failed: ${err.message || err}`)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  // Content AI Simulation State
  const [aiInstructions, setAiInstructions] = useState('')
  const [isGeneratingAI, setIsGeneratingAI] = useState(false)
  const [aiTab, setAiTab] = useState<'write' | 'instructions'>('write')
  const [inlineAILoading, setInlineAILoading] = useState<string | null>(null)

  // Real-time SEO Analyzer
  const seoChecklist = (() => {
    const checks: { label: string; pass: boolean; tip: string }[] = []
    const kw = focusKeyword.toLowerCase().trim()

    // 1. Focus keyword present
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
      label: `FAQs added (${faqs.length})`,
      pass: faqs.length >= 2,
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

    const hasFAQ = faqs.length >= 2 || description.toLowerCase().includes('?')
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

  // Auto-fill slug from title if adding a new feature
  useEffect(() => {
    if (!initialFeature && !isEditingSlug) {
      const generatedSlug = title
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '')
        .replace(/-+/g, '-')
      setSlug(generatedSlug)
      setSlugInputValue(generatedSlug)
    }
  }, [title, initialFeature, isEditingSlug])

  // Count word count of description
  const getWordCount = () => {
    if (!description.trim()) return 0
    return description.trim().split(/\s+/).length
  }

  // Handle Save (Submit)
  const handlePublishClick = () => {
    if (!title.trim()) return alert('Post Title is required.')
    if (!slug.trim()) return alert('URL Slug is required.')

    const cleanedSlug = slug.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')

    const updatedFeature: Feature = {
      id: cleanedSlug,
      title: title.trim(),
      shortDesc: shortDesc.trim(),
      description: description.trim(),
      icon: icon.trim(),
      link: link.trim() || `/features/${cleanedSlug}`,
      previewType,
      metric: metric.trim(),
      seoTitle: seoTitle.trim(),
      seoDescription: seoDescription.trim(),
      seoKeywords: seoKeywords.trim(),
      ogImage: ogImage.trim(),
      status,
      seoScore,
      focusKeyword: focusKeyword.trim() || seoKeywords.split(',')[0]?.trim() || (title || '').split(' ')[0],
      schemaStatus,
      created_at: createdDate,
      hero: {
        badgeText: heroBadgeText.trim(),
        heading: heroHeading.trim(),
        subheading: heroSubheading.trim(),
        mockChat: heroMockChat.filter(c => c.text.trim()),
        imageUrl: heroImageUrl.trim(),
        imageLink: heroImageLink.trim()
      },
      capabilities: capabilities.filter(c => c.title.trim()),
      useCases: useCases.filter(u => u.title.trim()),
      faqs: faqs.filter(f => f.question.trim() && f.answer.trim())
    }

    onSave(updatedFeature)
  }

  // Content AI Smart Generation (AWS Bedrock Claude)
  const handleAIGenerate = async () => {
    if (!title.trim()) {
      return alert('Please enter a Title at the top first so AI can read the context!')
    }

    setIsGeneratingAI(true)
    try {
      const systemPrompt = `You are a senior marketing copywriter for AI Greentick, a WhatsApp Business API SaaS platform. You write conversion-focused, professional feature page content. Always respond ONLY with valid JSON, no markdown, no extra text.`

      const userPrompt = `Generate complete feature page content for a WhatsApp API feature called "${title}".
${aiInstructions ? `Additional instructions: ${aiInstructions}` : ''}
${description ? `Current description for context: ${description}` : ''}

Return a JSON object with EXACTLY these keys:
{
  "description": "2-3 sentence professional description of this feature (150-200 chars)",
  "shortDesc": "Short tagline (5-8 words)",
  "metric": "Key metric like '45% reduction in X' or '3x improvement in Y'",
  "heroBadgeText": "UPPERCASE 2-word badge (e.g. TEAM INBOX, SMART BOT)",
  "heroHeading": "Compelling hero H1 heading (8-12 words)",
  "heroSubheading": "Supporting subtitle (15-25 words)",
  "heroMockChat": [
    {"sender": "user", "text": "User message relevant to the feature"},
    {"sender": "bot", "text": "Bot reply showing the feature value"},
    {"sender": "user", "text": "Follow-up user message"}
  ],
  "capabilities": [
    {"title": "Capability 1 Name", "desc": "One line description", "icon": "LucideIconName"},
    {"title": "Capability 2 Name", "desc": "One line description", "icon": "LucideIconName"},
    {"title": "Capability 3 Name", "desc": "One line description", "icon": "LucideIconName"}
  ],
  "faqs": [
    {"question": "Relevant FAQ question 1?", "answer": "Concise professional answer"},
    {"question": "Relevant FAQ question 2?", "answer": "Concise professional answer"}
  ],
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

      // Parse the JSON from Claude's response
      const text = data.text || ''
      const jsonMatch = text.match(/\{[\s\S]*\}/)
      if (!jsonMatch) {
        alert('AI returned invalid format. Please try again.')
        setIsGeneratingAI(false)
        return
      }

      const generated = JSON.parse(jsonMatch[0])

      // Fill in all form fields
      if (generated.description) setDescription(generated.description)
      if (generated.shortDesc) setShortDesc(generated.shortDesc)
      if (generated.metric) setMetric(generated.metric)
      if (generated.heroBadgeText) setHeroBadgeText(generated.heroBadgeText)
      if (generated.heroHeading) setHeroHeading(generated.heroHeading)
      if (generated.heroSubheading) setHeroSubheading(generated.heroSubheading)
      if (generated.heroMockChat) setHeroMockChat(generated.heroMockChat)
      if (generated.capabilities) setCapabilities(generated.capabilities)
      if (generated.faqs) setFaqs(generated.faqs)
      if (generated.focusKeyword) setFocusKeyword(generated.focusKeyword)
      if (generated.seoTitle) setSeoTitle(generated.seoTitle)
      if (generated.seoDescription) setSeoDescription(generated.seoDescription)
      if (generated.seoKeywords) setSeoKeywords(generated.seoKeywords)
      setSeoScore(90)

      alert('✅ AI has generated all page content using Claude!')
    } catch (err: any) {
      console.error('AI Generation Error:', err)
      alert(`AI failed: ${err.message || 'Unknown error'}. Make sure AWS credentials are configured in .env`)
    } finally {
      setIsGeneratingAI(false)
    }
  }

  // Inline AI helper: generate text for a single field
  const handleInlineAI = async (fieldName: string, currentValue: string, setter: (val: string) => void) => {
    try {
      const systemPrompt = `You are a senior marketing copywriter for AI Greentick, a WhatsApp Business API SaaS platform. Respond with ONLY the generated text, no quotes, no JSON, no markdown.`
      const prompt = `The feature is called "${title}". Generate a professional, conversion-focused ${fieldName} for this feature page.${currentValue ? ` Current text: "${currentValue}". Improve it.` : ''} ${aiInstructions ? `Additional context: ${aiInstructions}` : ''}`

      const response = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, systemPrompt })
      })
      const data = await response.json()
      if (data.error) {
        alert(`AI Error: ${data.error}`)
        return
      }
      setter(data.text?.trim() || currentValue)
    } catch (err: any) {
      alert(`AI failed: ${err.message}`)
    }
  }

  // Form helpers
  const [shortDesc, setShortDesc] = useState(initialFeature?.shortDesc || '')

  // Helpers for Mock Chat
  const addHeroMockChat = () => {
    setHeroMockChat([...heroMockChat, { sender: 'user', text: '' }])
  }
  const updateHeroMockChat = (idx: number, key: 'sender' | 'text', val: any) => {
    const updated = [...heroMockChat]
    updated[idx] = { ...updated[idx], [key]: val }
    setHeroMockChat(updated)
  }
  const deleteHeroMockChat = (idx: number) => {
    setHeroMockChat(heroMockChat.filter((_, i) => i !== idx))
  }

  // Helpers for Capabilities
  const addCapability = () => {
    setCapabilities([...capabilities, { title: '', desc: '', icon: 'ShoppingBag' }])
  }
  const updateCapability = (idx: number, key: 'title' | 'desc' | 'icon', val: string) => {
    const updated = [...capabilities]
    updated[idx] = { ...updated[idx], [key]: val }
    setCapabilities(updated)
  }
  const deleteCapability = (idx: number) => {
    setCapabilities(capabilities.filter((_, i) => i !== idx))
  }

  // Helpers for Use Cases
  const addUseCase = () => {
    setUseCases([...useCases, { title: '', desc: '', bullets: [''], bg: 'bg-[#EAF3FF]', chat: ['', ''] }])
  }
  const updateUseCase = (idx: number, key: string, val: any) => {
    const updated = [...useCases]
    updated[idx] = { ...updated[idx], [key]: val }
    setUseCases(updated)
  }
  const deleteUseCase = (idx: number) => {
    setUseCases(useCases.filter((_, i) => i !== idx))
  }
  const moveUseCase = (idx: number, direction: 'up' | 'down') => {
    const targetIdx = direction === 'up' ? idx - 1 : idx + 1
    if (targetIdx < 0 || targetIdx >= useCases.length) return
    const updated = [...useCases]
    const temp = updated[idx]
    updated[idx] = updated[targetIdx]
    updated[targetIdx] = temp
    setUseCases(updated)
  }

  // Helpers for FAQs
  const addFaq = () => {
    setFaqs([...faqs, { question: '', answer: '' }])
  }
  const updateFaq = (idx: number, key: 'question' | 'answer', val: string) => {
    const updated = [...faqs]
    updated[idx] = { ...updated[idx], [key]: val }
    setFaqs(updated)
  }
  const deleteFaq = (idx: number) => {
    setFaqs(faqs.filter((_, i) => i !== idx))
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12 font-sans text-neutral-800 antialiased select-none">
      {/* Page header with WP structure */}
      <div className="flex items-center gap-4 border-b border-[#C5C4C2]/50 pb-5">
        <button
          onClick={onCancel}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#C5C4C2]/50 bg-white hover:bg-neutral-100 text-neutral-500 hover:text-black transition-colors cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>
        <div>
          <h2 className="text-2xl font-normal tracking-tight text-neutral-900 font-display">
            {initialFeature ? `Edit Feature: ${initialFeature.title}` : 'Add New Feature'}
          </h2>
          <p className="text-neutral-500 text-xs">WordPress layout view. Customize landing pages, capabilities, and SEO tags.</p>
        </div>
      </div>

      {/* WordPress 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        
        {/* Left Column (3 spans): Main fields & meta boxes */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* Post Title Field */}
          <div className="bg-white p-4.5 rounded-lg border border-[#C5C4C2]/50 shadow-xs space-y-2">
            <Input
              type="text"
              placeholder="Enter title here"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="text-xl font-bold h-12 px-3 border-neutral-300 hover:border-neutral-400 focus:border-neutral-500 bg-white placeholder-neutral-300 rounded-md"
            />
            
            {/* Permalink editor */}
            <div className="text-xs text-neutral-500 pl-1 flex flex-wrap items-center gap-1">
              <span className="font-semibold text-neutral-600">Permalink:</span>
              <span className="font-mono bg-neutral-50 px-1 rounded text-neutral-400">
                http://localhost:3005/features/
              </span>
              {isEditingSlug ? (
                <div className="flex items-center gap-1">
                  <Input
                    value={slugInputValue}
                    onChange={(e) => setSlugInputValue(e.target.value.toLowerCase().replace(/\s+/g, '-'))}
                    className="h-6 w-44 px-1 py-0.5 text-xs font-mono border-neutral-300 bg-white"
                  />
                  <Button
                    onClick={() => {
                      setSlug(slugInputValue)
                      setIsEditingSlug(false)
                    }}
                    className="h-6 px-2 text-[10px] bg-neutral-200 text-black hover:bg-neutral-300 font-semibold cursor-pointer"
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
          </div>          {/* WordPress Content Editor Layout */}
          <div className="relative">
            <RichEditor
              value={description}
              onChange={setDescription}
              placeholder="Start writing feature details content here..."
              minHeight="260px"
              showAddMedia={true}
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
          {/* Section 1: General Setup */}
          <Card className="border border-[#C5C4C2]/50 shadow-xs bg-white rounded-lg">
            <CardHeader className="bg-neutral-50/50 border-b border-[#C5C4C2]/40 py-3.5 px-5">
              <CardTitle className="text-sm font-bold text-neutral-800 font-display">General Settings</CardTitle>
              <CardDescription className="text-[10px]">Configure basic redirect links, key metrics, taglines, and dashboard icons.</CardDescription>
            </CardHeader>
            <CardContent className="p-5 space-y-4 text-xs text-neutral-700 bg-white font-normal">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="icon" className="text-xs font-semibold text-neutral-750">Lucide Icon (e.g. Inbox, Bot, Activity)</Label>
                  <Input 
                    id="icon" 
                    value={icon} 
                    onChange={e => setIcon(e.target.value)} 
                    placeholder="e.g. Inbox" 
                    className="border-neutral-300 h-9 font-mono text-[11px] bg-white font-normal"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="metric" className="text-xs font-semibold text-neutral-750">Key Metric Outcome (Banner / Card highlights)</Label>
                  <Input 
                    id="metric" 
                    value={metric} 
                    onChange={e => setMetric(e.target.value)} 
                    placeholder="e.g. 45% reduction in support load" 
                    className="border-neutral-300 h-9 bg-white font-normal"
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="link" className="text-xs font-semibold text-neutral-750">Redirect Link (Blank defaults to /features/slug)</Label>
                  <Input 
                    id="link" 
                    value={link} 
                    onChange={e => setLink(e.target.value)} 
                    placeholder="/features/unified-inbox" 
                    className="border-neutral-300 h-9 font-mono text-[11px] bg-white font-normal"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="previewType" className="text-xs font-semibold text-neutral-750">Demo Section Component</Label>
                  <select
                    id="previewType"
                    value={previewType}
                    onChange={e => setPreviewType(e.target.value)}
                    className="w-full bg-white h-9 text-xs border border-neutral-300 rounded px-2.5 outline-none text-neutral-850 focus:ring-2 focus:ring-[#00b259]/30 shadow-xs font-normal"
                  >
                    <option value="shared-inbox-feat">Shared Inbox Preview</option>
                    <option value="codeless-bot">Codeless Bot Flowchart</option>
                    <option value="perf-reports">Performance Reports</option>
                    <option value="broadcast-feat">Broadcast Send Logs</option>
                    <option value="drip-sequences">Drip Sequences Progress</option>
                    <option value="ads-feat">WhatsApp Ads Preview</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="shortDesc" className="text-xs font-semibold text-neutral-750">Short tagline summary (hover summaries)</Label>
                <Input 
                  id="shortDesc" 
                  value={shortDesc} 
                  onChange={e => setShortDesc(e.target.value)} 
                  placeholder="Single-sentence summary shown on cards" 
                  className="border-neutral-300 h-9 bg-white font-normal"
                />
              </div>
            </CardContent>
          </Card>

          {/* Section 2: Hero Block */}
          <Card className="border border-[#C5C4C2]/50 shadow-xs bg-white rounded-lg">
            <CardHeader className="bg-neutral-50/50 border-b border-[#C5C4C2]/40 py-3.5 px-5">
              <CardTitle className="text-sm font-bold text-neutral-800 font-display">Hero Layout Content</CardTitle>
              <CardDescription className="text-[10px]">Configure the landing page hero category badge, titles, descriptions, and mockup chat text.</CardDescription>
            </CardHeader>
            <CardContent className="p-5 space-y-4 text-xs text-neutral-700 bg-white font-normal">
              <div className="space-y-1.5">
                <Label htmlFor="heroBadgeText" className="text-xs font-semibold text-neutral-750">Badge Category Text</Label>
                <Input 
                  id="heroBadgeText" 
                  value={heroBadgeText} 
                  onChange={e => setHeroBadgeText(e.target.value)} 
                  placeholder="e.g. MARKETING ENGINE" 
                  className="border-neutral-300 h-9 bg-white uppercase tracking-widest text-[10px] font-normal"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <Label htmlFor="heroHeading" className="text-xs font-semibold text-neutral-750">Main Hero Heading Title</Label>
                  <button
                    type="button"
                    disabled={inlineAILoading === 'heroHeading' || !title.trim()}
                    onClick={async () => {
                      setInlineAILoading('heroHeading')
                      await handleInlineAI('hero heading H1 (8-12 words, compelling and action-oriented)', heroHeading, setHeroHeading)
                      setInlineAILoading(null)
                    }}
                    className="flex items-center gap-1 px-1.5 py-0.5 text-[8px] font-bold text-amber-600 bg-amber-50 border border-amber-300 rounded hover:bg-amber-100 cursor-pointer transition-colors disabled:opacity-40"
                    title="AI: Generate heading"
                  >
                    {inlineAILoading === 'heroHeading' ? (
                      <span className="h-2.5 w-2.5 rounded-full border-2 border-amber-500 border-t-transparent animate-spin inline-block" />
                    ) : (
                      <Sparkles className="h-2.5 w-2.5" />
                    )}
                    AI
                  </button>
                </div>
                <Input 
                  id="heroHeading" 
                  value={heroHeading} 
                  onChange={e => setHeroHeading(e.target.value)} 
                  placeholder="e.g. Deploy 24/7 Smart chatbots on WhatsApp" 
                  className="border-neutral-300 h-9 bg-white font-normal"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <Label htmlFor="heroSubheading" className="text-xs font-semibold text-neutral-750">Hero Subdescription</Label>
                  <button
                    type="button"
                    disabled={inlineAILoading === 'heroSub' || !title.trim()}
                    onClick={async () => {
                      setInlineAILoading('heroSub')
                      await handleInlineAI('hero subtitle (15-25 words, supporting the main heading, professional)', heroSubheading, setHeroSubheading)
                      setInlineAILoading(null)
                    }}
                    className="flex items-center gap-1 px-1.5 py-0.5 text-[8px] font-bold text-amber-600 bg-amber-50 border border-amber-300 rounded hover:bg-amber-100 cursor-pointer transition-colors disabled:opacity-40"
                    title="AI: Generate subtitle"
                  >
                    {inlineAILoading === 'heroSub' ? (
                      <span className="h-2.5 w-2.5 rounded-full border-2 border-amber-500 border-t-transparent animate-spin inline-block" />
                    ) : (
                      <Sparkles className="h-2.5 w-2.5" />
                    )}
                    AI
                  </button>
                </div>
                <RichEditor
                  value={heroSubheading}
                  onChange={setHeroSubheading}
                  placeholder="Acquire, qualify, and assist visitors with custom flowchart chatbots synced with your CRM."
                  minHeight="100px"
                />
              </div>

              {/* Hero Graphic: Mock chat or Custom Image choice */}
              <div className="border-t border-[#C5C4C2]/30 pt-4 space-y-4">
                <h4 className="text-[11px] font-bold text-neutral-800 uppercase tracking-wide">Hero Banner Graphic Settings</h4>
                
                <div className="grid gap-4 md:grid-cols-2">
                  
                  {/* Left Column: Image Upload / Preview */}
                  <div className="space-y-2.5">
                    <Label className="text-xs font-bold text-neutral-750">1. Banner Mockup Image (File or URL)</Label>
                    
                    {heroImageUrl ? (
                      <div className="flex items-center gap-3 p-2.5 border border-neutral-200 rounded-lg bg-neutral-50/50">
                        <div className="relative size-14 border border-neutral-300 rounded overflow-hidden bg-white shrink-0">
                          <img 
                            src={heroImageUrl} 
                            alt="Banner Preview" 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0 text-xs">
                          <p className="font-semibold text-neutral-800 truncate">
                            {heroImageUrl.startsWith('data:') ? 'uploaded-image.png' : heroImageUrl}
                          </p>
                          <p className="text-[9px] text-neutral-400">Renders inside the phone mockup.</p>
                        </div>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => setHeroImageUrl('')}
                          className="h-7 text-[10px] text-red-500 hover:text-red-650 hover:bg-red-50 cursor-pointer border-neutral-300 font-bold shrink-0"
                        >
                          Remove
                        </Button>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center border-2 border-dashed border-neutral-300 rounded-lg p-5 bg-neutral-50 hover:bg-neutral-100/50 transition-colors relative h-24">
                        {isUploadingImage ? (
                          <>
                            <span className="h-5 w-5 rounded-full border-2 border-[#00b259] border-t-transparent animate-spin inline-block mb-1" />
                            <span className="text-[11px] font-bold text-[#00b259]">Uploading Image...</span>
                          </>
                        ) : (
                          <>
                            <Upload className="h-5 w-5 text-neutral-400 mb-1" />
                            <span className="text-[11px] font-bold text-neutral-700">Upload Banner Image File</span>
                            <span className="text-[9px] text-neutral-400">Click to choose image file</span>
                            <input 
                              type="file" 
                              disabled={isUploadingImage}
                              accept="image/*" 
                              className="absolute inset-0 opacity-0 cursor-pointer w-full h-full" 
                              onChange={handleImageUpload}
                            />
                          </>
                        )}
                      </div>
                    )}
                    
                    <div className="space-y-1">
                      <Label className="text-[10px] font-semibold text-neutral-600">Or Paste Direct Image Link / Address</Label>
                      <Input 
                        value={heroImageUrl} 
                        onChange={e => setHeroImageUrl(e.target.value)} 
                        placeholder="https://example.com/images/my-image.png" 
                        className="border-neutral-300 h-8 bg-white font-normal text-xs"
                      />
                    </div>
                  </div>

                  {/* Right Column: Redirect Link */}
                  <div className="space-y-2.5">
                    <Label className="text-xs font-bold text-neutral-750">2. Click Redirection URL (Optional)</Label>
                    <Input 
                      value={heroImageLink} 
                      onChange={e => setHeroImageLink(e.target.value)} 
                      placeholder="e.g. /pricing or https://example.com" 
                      className="border-neutral-300 h-9 bg-white font-normal"
                    />
                    <p className="text-[9px] text-neutral-400 font-normal leading-normal">
                      Optional. Enter a webpage URL here if you want visitors to be redirected when they click on the mockup image. Leave blank if not clickable.
                    </p>
                  </div>

                </div>
              </div>

              {/* Mock Chat bubbles inside Hero */}
              <div className="border-t border-[#C5C4C2]/30 pt-4 space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-[10px] text-neutral-500 uppercase">Mockup Chat Bubbles (Interactive Graphic)</Label>
                  <Button 
                    type="button" 
                    size="sm" 
                    onClick={addHeroMockChat}
                    className="h-7 text-[10px] bg-[#00b259] text-white hover:bg-[#009b4d] font-bold cursor-pointer gap-1"
                  >
                    <Plus className="h-3 w-3" /> Add Message
                  </Button>
                </div>

                <div className="space-y-2">
                  {heroMockChat.map((chat, idx) => (
                    <div key={idx} className="flex gap-2 items-center p-2.5 bg-neutral-50 border border-neutral-200 rounded-md">
                      <select
                        value={chat.sender}
                        onChange={e => updateHeroMockChat(idx, 'sender', e.target.value)}
                        className="bg-white h-7 text-[10px] border border-neutral-300 rounded px-1 outline-none text-neutral-800"
                      >
                        <option value="user">User (Right)</option>
                        <option value="bot">Bot / Agent (Left)</option>
                      </select>
                      <Input
                        value={chat.text}
                        onChange={e => updateHeroMockChat(idx, 'text', e.target.value)}
                        placeholder="Message text..."
                        className="bg-white h-7 text-[10px] flex-1 border-neutral-300"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteHeroMockChat(idx)}
                        className="h-7 w-7 text-red-500 hover:text-red-655 hover:bg-red-55 cursor-pointer"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  ))}
                  {heroMockChat.length === 0 && (
                    <p className="text-[10px] text-neutral-455 italic text-center p-3 border border-dashed rounded-md bg-neutral-50/20">
                      No chat mockup bubbles defined.
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Section 3: Bento Cards */}
          <Card className="border border-[#C5C4C2]/50 shadow-xs bg-white rounded-lg">
            <CardHeader className="bg-neutral-50/50 border-b border-[#C5C4C2]/40 py-3.5 px-5 flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-sm font-bold text-neutral-800 font-display">Key Capabilities (Bento Grids)</CardTitle>
                <CardDescription className="text-[10px]">Add grid layout card highlights and capabilities description text.</CardDescription>
              </div>
              <Button 
                type="button" 
                size="sm" 
                onClick={addCapability}
                className="h-7 text-[10px] bg-[#00b259] text-white hover:bg-[#009b4d] font-bold cursor-pointer gap-1"
              >
                <Plus className="h-3 w-3" /> Add Card
              </Button>
            </CardHeader>
            <CardContent className="p-5 space-y-3">
              <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
                {capabilities.map((cap, idx) => (
                  <div key={idx} className="p-3 bg-neutral-50/40 border border-neutral-200 rounded-lg space-y-2 relative">
                    <div className="flex justify-between items-center">
                      <span className="text-[9px] font-mono text-neutral-450 uppercase">[ Bento Card #{idx + 1} ]</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteCapability(idx)}
                        className="h-7 w-7 text-red-500 hover:text-red-650 hover:bg-red-50 cursor-pointer"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>

                    <div className="grid gap-2 sm:grid-cols-2">
                      <div className="space-y-1">
                        <Label className="text-[9px] text-neutral-400 uppercase">Card Title</Label>
                        <Input
                          value={cap.title}
                          onChange={e => updateCapability(idx, 'title', e.target.value)}
                          placeholder="Menu Builder"
                          className="bg-white h-8 text-xs border-neutral-300"
                        />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-[9px] text-neutral-400 uppercase">Lucide Icon name</Label>
                        <Input
                          value={cap.icon}
                          onChange={e => updateCapability(idx, 'icon', e.target.value)}
                          placeholder="ShoppingBag"
                          className="bg-white h-8 text-xs border-neutral-300 font-mono"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <Label className="text-[9px] text-neutral-400 uppercase">Short Description</Label>
                      <RichEditor
                        value={cap.desc}
                        onChange={val => updateCapability(idx, 'desc', val)}
                        placeholder="Brief description details..."
                        minHeight="70px"
                      />
                    </div>
                  </div>
                ))}

                {capabilities.length === 0 && (
                  <p className="text-xs text-neutral-450 italic text-center p-6 border border-dashed rounded-md bg-neutral-50/10">
                    No bento cards created. Click "Add Card" to start.
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Section 4: Use Cases */}
          <Card className="border border-[#C5C4C2]/50 shadow-xs bg-white rounded-lg">
            <CardHeader className="bg-neutral-50/50 border-b border-[#C5C4C2]/40 py-3.5 px-5 flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-sm font-bold text-neutral-800 font-display">Detailed Use Cases / Workflows</CardTitle>
                <CardDescription className="text-[10px]">Configure scenario blocks or workflow steps showing how this feature works.</CardDescription>
              </div>
              <Button 
                type="button" 
                size="sm" 
                onClick={addUseCase}
                className="h-7 text-[10px] bg-[#00b259] text-white hover:bg-[#009b4d] font-bold cursor-pointer gap-1"
              >
                <Plus className="h-3 w-3" /> Add Use Case
              </Button>
            </CardHeader>
            <CardContent className="p-5 space-y-4">
              <div className="space-y-4 max-h-[500px] overflow-y-auto pr-1">
                {useCases.map((uc, idx) => (
                  <div key={idx} className="p-4 bg-neutral-50/50 border border-neutral-250 rounded-lg space-y-3 relative">
                    <div className="flex justify-between items-center">
                      <span className="text-[9px] font-bold text-[#00b259] bg-[#00b259]/10 px-2 py-0.5 rounded">
                        Use Case #{idx + 1}: {uc.title || 'Untitled'}
                      </span>
                      <div className="flex items-center gap-1">
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          disabled={idx === 0}
                          onClick={() => moveUseCase(idx, 'up')}
                          className="h-7 w-7 text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100 disabled:opacity-30 cursor-pointer"
                        >
                          <ArrowUp className="h-3.5 w-3.5" />
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          disabled={idx === useCases.length - 1}
                          onClick={() => moveUseCase(idx, 'down')}
                          className="h-7 w-7 text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100 disabled:opacity-30 cursor-pointer"
                        >
                          <ArrowDown className="h-3.5 w-3.5" />
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => deleteUseCase(idx)}
                          className="h-7 w-7 text-red-500 hover:text-red-650 hover:bg-red-50 cursor-pointer"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                      <div className="space-y-1">
                        <Label className="text-[9px] text-neutral-400 uppercase">Title</Label>
                        <Input
                          value={uc.title}
                          onChange={e => updateUseCase(idx, 'title', e.target.value)}
                          placeholder="Smarter Lead Capture"
                          className="bg-white h-8 text-xs border-neutral-300"
                        />
                      </div>

                      <div className="space-y-1">
                        <Label className="text-[9px] text-neutral-400 uppercase">Box Background Design</Label>
                        <select
                          value={uc.bg}
                          onChange={e => updateUseCase(idx, 'bg', e.target.value)}
                          className="w-full bg-white h-8 text-xs border border-neutral-300 rounded px-2 outline-none text-neutral-850 focus:ring-2 focus:ring-[#00b259]/30"
                        >
                          {BG_COLOR_OPTIONS.map(opt => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <Label className="text-[9px] text-neutral-400 uppercase">Use Case Description</Label>
                      <RichEditor
                        value={uc.desc}
                        onChange={val => updateUseCase(idx, 'desc', val)}
                        placeholder="Describe this workflow..."
                        minHeight="80px"
                      />
                    </div>

                    {/* Use Case Image selection */}
                    <div className="space-y-2 p-2.5 border border-[#C5C4C2]/35 bg-white rounded-md">
                      <Label className="text-[9px] text-neutral-400 uppercase font-semibold">Use Case Graphic Image (Optional)</Label>
                      <div className="flex flex-col sm:flex-row gap-3 items-center">
                        <div className="relative size-14 border border-neutral-300 rounded overflow-hidden bg-neutral-50 shrink-0 flex items-center justify-center bg-white">
                          {uc.imageUrl ? (
                            <img src={uc.imageUrl} alt="Use Case Preview" className="w-full h-full object-cover" />
                          ) : (
                            <Image className="h-5 w-5 text-neutral-300" />
                          )}
                        </div>
                        <div className="flex-1 w-full space-y-1.5">
                          <div className="flex gap-2">
                            <Input 
                              value={uc.imageUrl || ''} 
                              onChange={e => updateUseCase(idx, 'imageUrl', e.target.value)} 
                              placeholder="Or paste custom image link..." 
                              className="bg-white h-8 text-xs border-neutral-300 flex-1 font-normal"
                            />
                            <label className="h-8 px-2 border border-neutral-300 text-neutral-700 bg-white hover:bg-neutral-100 flex items-center justify-center text-[10px] font-semibold cursor-pointer shrink-0 rounded">
                              Upload
                              <input 
                                type="file" 
                                accept="image/*" 
                                className="hidden" 
                                onChange={e => handleUseCaseImageUpload(idx, e)}
                              />
                            </label>
                          </div>
                          <p className="text-[8px] text-neutral-400 font-normal">If provided, this image will fill the graphic container instead of the chat mockup.</p>
                        </div>
                      </div>
                    </div>

                    {/* checklist bullets */}
                    <div className="space-y-1.5 pl-3 border-l-2 border-neutral-200">
                      <Label className="text-[9px] text-neutral-400 uppercase">Checklist bullets</Label>
                      {uc.bullets.map((bullet, bIdx) => (
                        <div key={bIdx} className="flex gap-2 items-center">
                          <Input
                            value={bullet}
                            onChange={e => {
                              const updatedBullets = [...uc.bullets]
                              updatedBullets[bIdx] = e.target.value
                              updateUseCase(idx, 'bullets', updatedBullets)
                            }}
                            placeholder="Bullet description..."
                            className="bg-white h-7.5 text-xs border-neutral-300 flex-1"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              const updatedBullets = uc.bullets.filter((_, i) => i !== bIdx)
                              updateUseCase(idx, 'bullets', updatedBullets)
                            }}
                            className="h-7 w-7 text-neutral-400 hover:text-red-500 cursor-pointer"
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => updateUseCase(idx, 'bullets', [...uc.bullets, ''])}
                        className="h-6.5 text-[9px] text-[#00b259] hover:bg-[#00b259]/10 font-bold gap-1 cursor-pointer"
                      >
                        <Plus className="h-3 w-3" /> Add Bullet
                      </Button>
                    </div>

                    {/* Graphic mock chats */}
                    <div className="space-y-2 p-2.5 border border-[#C5C4C2]/35 bg-white rounded-md">
                      <Label className="text-[9px] text-neutral-400 uppercase">Interactive Chat Demo bubbles (2 messages)</Label>
                      <div className="grid gap-2 sm:grid-cols-2">
                        <div>
                          <Label className="text-[8px] text-neutral-400 uppercase">1st Bubble (User, Green Box)</Label>
                          <Input
                            value={uc.chat?.[0] || ''}
                            onChange={e => {
                              const updatedChat = [...(uc.chat || ['', ''])]
                              updatedChat[0] = e.target.value
                              updateUseCase(idx, 'chat', updatedChat)
                            }}
                            placeholder="What user says..."
                            className="bg-white h-7 text-xs border-neutral-300"
                          />
                        </div>
                        <div>
                          <Label className="text-[8px] text-neutral-400 uppercase">2nd Bubble (Bot, White Box)</Label>
                          <Input
                            value={uc.chat?.[1] || ''}
                            onChange={e => {
                              const updatedChat = [...(uc.chat || ['', ''])]
                              updatedChat[1] = e.target.value
                              updateUseCase(idx, 'chat', updatedChat)
                            }}
                            placeholder="What bot replies..."
                            className="bg-white h-7 text-xs border-neutral-300"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                {useCases.length === 0 && (
                  <p className="text-xs text-neutral-450 italic text-center p-6 border border-dashed rounded-md bg-neutral-50/10">
                    No workflows configured.
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Section 5: FAQs Accordion */}
          <Card className="border border-[#C5C4C2]/50 shadow-xs bg-white rounded-lg">
            <CardHeader className="bg-neutral-50/50 border-b border-[#C5C4C2]/40 py-3.5 px-5 flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-sm font-bold text-neutral-800 font-display">Frequently Asked Questions</CardTitle>
                <CardDescription className="text-[10px]">Add relevant queries and descriptive solutions for this specific landing page.</CardDescription>
              </div>
              <Button 
                type="button" 
                size="sm" 
                onClick={addFaq}
                className="h-7 text-[10px] bg-[#00b259] text-white hover:bg-[#009b4d] font-bold cursor-pointer gap-1"
              >
                <Plus className="h-3 w-3" /> Add FAQ
              </Button>
            </CardHeader>
            <CardContent className="p-5 space-y-3">
              <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
                {faqs.map((faq, idx) => (
                  <div key={idx} className="p-3 bg-neutral-50/30 border border-neutral-200 rounded-lg space-y-2 relative">
                    <div className="flex justify-between items-center">
                      <span className="text-[9px] font-mono text-neutral-450 uppercase">[ FAQ Accordion #{idx + 1} ]</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteFaq(idx)}
                        className="h-7 w-7 text-red-500 hover:text-red-655 hover:bg-red-55 cursor-pointer"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>

                    <div className="space-y-1">
                      <Label className="text-[9px] text-neutral-400 uppercase">Question Query</Label>
                      <Input
                        value={faq.question}
                        onChange={e => updateFaq(idx, 'question', e.target.value)}
                        placeholder="Can I integrate this with my custom CRM?"
                        className="bg-white h-7.5 text-xs border-neutral-300"
                      />
                    </div>
                    
                    <div className="space-y-1">
                      <Label className="text-[9px] text-neutral-400 uppercase">Answer description</Label>
                      <Textarea
                        value={faq.answer}
                        onChange={e => updateFaq(idx, 'answer', e.target.value)}
                        placeholder="Detailed explanation..."
                        className="bg-white text-xs border-neutral-300 min-h-[80px] font-normal"
                      />
                    </div>
                  </div>
                ))}

                {faqs.length === 0 && (
                  <p className="text-xs text-neutral-450 italic text-center p-6 border border-dashed rounded-md bg-neutral-50/10">
                    No FAQ accordions defined.
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Section 6: SEO Settings */}
          <Card className="border border-[#C5C4C2]/50 shadow-xs bg-white rounded-lg">
            <CardHeader className="bg-neutral-50/50 border-b border-[#C5C4C2]/40 py-3.5 px-5">
              <CardTitle className="text-sm font-bold text-neutral-800 font-display">Search Optimization</CardTitle>
              <CardDescription className="text-[10px]">Configure search tags, Meta values, keywords, and share preview images.</CardDescription>
            </CardHeader>
            <CardContent className="p-5 space-y-4 text-xs text-neutral-700 bg-white font-normal">
              <div className="space-y-1.5">
                <Label htmlFor="seoTitle" className="text-xs font-semibold text-neutral-750">Meta Search Title</Label>
                <Input 
                  id="seoTitle" 
                  value={seoTitle} 
                  onChange={e => setSeoTitle(e.target.value)} 
                  placeholder={`${title || 'Feature'} | AI Greentick`} 
                  className="border-neutral-300 h-9 bg-white font-normal"
                />
                <p className="text-[9px] text-neutral-400 font-medium pl-0.5">Recommended length: 45 to 65 characters.</p>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="seoDescription" className="text-xs font-semibold text-neutral-750">Meta Search Description</Label>
                <Textarea 
                  id="seoDescription" 
                  value={seoDescription} 
                  onChange={e => setSeoDescription(e.target.value)} 
                  placeholder={description || "Meta description representing search snippet..."} 
                  className="border-neutral-300 min-h-[60px] bg-white resize-none font-normal"
                />
                <p className="text-[9px] text-neutral-400 font-medium pl-0.5">Recommended length: 110 to 160 characters.</p>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="seoKeywords" className="text-xs font-semibold text-neutral-750">Keywords (comma separated)</Label>
                <Input 
                  id="seoKeywords" 
                  value={seoKeywords} 
                  onChange={e => setSeoKeywords(e.target.value)} 
                  placeholder="whatsapp api, team inbox, support routing" 
                  className="border-neutral-300 h-9 bg-white font-normal"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="ogImage" className="text-xs font-semibold text-neutral-750">OpenGraph Image URL</Label>
                <Input 
                  id="ogImage" 
                  value={ogImage} 
                  onChange={e => setOgImage(e.target.value)} 
                  placeholder="/og-images/inbox.png" 
                  className="border-neutral-300 h-9 font-mono text-[11px] bg-white font-normal"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column (1 span): Meta boxes sidebar control */}
        <div className="space-y-6">
          
          {/* Publish meta-box panel */}
          <Card className="border border-[#C5C4C2]/50 bg-white rounded-lg shadow-xs overflow-visible">
            <CardHeader className="bg-neutral-50/50 border-b border-[#C5C4C2]/40 py-3.5 px-4">
              <CardTitle className="text-xs font-bold text-neutral-800 font-display">Publish settings</CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-3.5 text-[11px] text-neutral-500 font-normal leading-relaxed select-none">
              
              {/* Status */}
              <div className="flex items-center justify-between">
                <span className="font-semibold text-neutral-700">Status:</span>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="bg-white border border-neutral-300 h-7 rounded px-2 outline-none text-neutral-800 text-[10px] cursor-pointer font-normal"
                >
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                </select>
              </div>

              {/* Visibility */}
              <div className="flex items-center justify-between">
                <span className="font-semibold text-neutral-700">Visibility:</span>
                <span className="text-[#00b259] font-semibold">Public (Edit)</span>
              </div>

              {/* Focus Keyword */}
              <div className="space-y-1">
                <span className="block text-neutral-450 font-bold uppercase tracking-wider text-[9px]">Focus Keyword</span>
                <Input
                  value={focusKeyword}
                  onChange={(e) => setFocusKeyword(e.target.value)}
                  placeholder="Focus SEO keyword"
                  className="h-7.5 text-[10px] border-neutral-300 font-normal"
                />
              </div>

              {/* Rank Math SEO Score representation */}
              <div className="border-t border-[#C5C4C2]/35 pt-3 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-neutral-700">SEO Score Rank:</span>
                  <Badge 
                    className={cn(
                      "px-2 py-0.5 text-[10px] font-extrabold rounded-md shadow-xs border",
                      seoScore >= 80 ? "bg-[#EAFBF3] text-emerald-600 border border-emerald-400" :
                      seoScore >= 50 ? "bg-[#FFF9E6] text-amber-600 border border-amber-400" :
                      "bg-red-50 text-red-600 border border-red-400"
                    )}
                  >
                    {focusKeyword ? `${seoScore}/100` : 'N/A'}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-neutral-700">Schema:</span>
                  <select
                    value={schemaStatus}
                    onChange={(e) => setSchemaStatus(e.target.value)}
                    className="bg-white border border-neutral-300 h-7 rounded px-2 outline-none text-neutral-850 text-[10px] cursor-pointer font-normal"
                  >
                    <option value="On">Enabled (On)</option>
                    <option value="Off">Disabled (Off)</option>
                  </select>
                </div>
                <div className="text-[10px] text-neutral-450 text-center font-normal">
                  Lock Modified Date: <input type="checkbox" className="rounded align-middle border-neutral-300 scale-95" />
                </div>
              </div>

              {/* Footer publish controls */}
              <div className="border-t border-[#C5C4C2]/45 pt-3.5 flex items-center justify-between border-neutral-200">
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
                  className="bg-black text-white hover:bg-neutral-850 font-bold h-8.5 px-4 cursor-pointer text-xs rounded-md shadow-xs gap-1"
                >
                  <Globe className="h-3.5 w-3.5" /> {initialFeature ? 'Update' : 'Publish'}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* SEO Checklist Card */}
          <Card className="border border-[#C5C4C2]/50 bg-white rounded-lg shadow-xs overflow-visible">
            <CardHeader className="bg-neutral-50/50 border-b border-[#C5C4C2]/40 py-3.5 px-4 flex flex-row items-center justify-between">
              <CardTitle className="text-xs font-bold text-neutral-800 flex items-center gap-1 font-display">
                <FileText className="h-3.5 w-3.5 text-blue-500" /> SEO Checklist
              </CardTitle>
              <Badge
                className={cn(
                  "px-2 py-0.5 text-[10px] font-extrabold rounded-md shadow-xs border",
                  seoChecklist.score >= 80 ? "bg-[#EAFBF3] text-emerald-600 border-emerald-400" :
                  seoChecklist.score >= 50 ? "bg-[#FFF9E6] text-amber-600 border-amber-400" :
                  "bg-red-50 text-red-600 border-red-400"
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
              <div className="pt-2 border-t border-neutral-200/50 mt-1">
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

          {/* Content AI metabox */}
          <Card className="border border-[#C5C4C2]/50 bg-white rounded-lg shadow-xs overflow-visible">
            <CardHeader className="bg-neutral-50/50 border-b border-[#C5C4C2]/40 py-3.5 px-4 flex flex-row items-center justify-between">
              <CardTitle className="text-xs font-bold text-neutral-800 flex items-center gap-1 font-display">
                <Sparkles className="h-3.5 w-3.5 text-amber-500 animate-pulse" /> Content AI Assistant
              </CardTitle>
              <Badge variant="outline" className="px-1 text-[8px] border-[#00b259]/30 text-[#00b259] bg-[#00b259]/5 font-bold tracking-wide uppercase select-none rounded">
                Beta
              </Badge>
            </CardHeader>
            <CardContent className="p-4 text-[11px] text-neutral-500 font-normal space-y-3 select-none leading-relaxed">
              
              {/* Tabs Write / Instructions */}
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
                    AI analyzes your Title and auto-generates description content, key bento lists, and meta tags instantly.
                  </p>
                  
                  <Button
                    type="button"
                    onClick={handleAIGenerate}
                    disabled={isGeneratingAI}
                    className="w-full bg-[#00b259] text-white hover:bg-[#009b4d] font-bold h-8 text-[11px] cursor-pointer rounded-md shadow-xs gap-1.5"
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
                    className="h-20 text-[10px] border-neutral-300 resize-none font-normal"
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
