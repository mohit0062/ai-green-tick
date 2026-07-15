'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { updateSiteSectionAction } from '../cms-actions'
import { cn } from '@/lib/utils'
import { 
  Sparkles, Check, X, Plus, Trash2, ArrowUp, ArrowDown, ArrowLeft,
  Info, Laptop, Smartphone, HelpCircle, Layers, ShieldCheck,
  Undo, Redo, Bold, Italic, List, ListOrdered, Quote, AlignLeft, 
  AlignCenter, AlignRight, Link, Image, FileText, Settings, Eye, Globe, Upload, Loader2
} from 'lucide-react'

interface HomepageEditorClientProps {
  initialData: any
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
  minHeight = "100px"
}: RichEditorProps) {
  const [mode, setMode] = useState<'visual' | 'text'>('visual')

  const handleFormat = (openTag: string, closeTag: string) => {
    onChange(openTag + value + closeTag)
  }

  return (
    <div className={cn("bg-white rounded-md border border-[#C5C4C2]/50 overflow-hidden shadow-2xs w-full", className)}>
      <div className="flex items-center justify-between bg-neutral-50 px-3 py-2 border-b border-[#C5C4C2]/45">
        <div className="flex items-center gap-1.5">
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
            onClick={() => {
              const url = prompt('Enter URL link:')
              if (url) {
                handleFormat(`<a href="${url}" target="_blank" rel="noopener" class="text-[#00b259] underline">`, '</a>')
              }
            }}
            className="p-1 hover:bg-neutral-150 hover:text-black rounded text-neutral-500 transition-colors cursor-pointer"
            title="Insert Link"
          >
            <Link className="h-4 w-4" />
          </button>
        </div>

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

      <div className="p-1">
        <Textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          style={{ minHeight }}
          className={cn(
            "w-full border-0 focus-visible:ring-0 focus-visible:ring-offset-0 px-3.5 py-2.5 resize-none outline-none text-neutral-855 bg-white font-normal",
            mode === 'visual' ? "font-sans text-xs" : "font-mono text-[11px] text-[#006622] bg-[#fcfdfc]"
          )}
        />
      </div>
    </div>
  )
}

export default function HomepageEditorClient({ initialData }: HomepageEditorClientProps) {
  const [data, setData] = useState(initialData)
  const [title, setTitle] = useState('AIS Home Page')
  const [saving, setSaving] = useState(false)
  const [statusMsg, setStatusMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  
  // Sidebar stats
  const [status, setStatus] = useState('published')
  const [focusKeyword, setFocusKeyword] = useState('whatsapp business api')
  const [schemaStatus, setSchemaStatus] = useState('On')
  const [seoScore, setSeoScore] = useState(70)

  // AI Content Assistant simulation
  const [aiInstructions, setAiInstructions] = useState('')
  const [isGeneratingAI, setIsGeneratingAI] = useState(false)
  const [aiTab, setAiTab] = useState<'write' | 'instructions'>('write')

  const [uploadingState, setUploadingState] = useState<{ [key: string]: boolean }>({})

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, index: number, field: 'companyLogo' | 'avatar') => {
    const file = e.target.files?.[0]
    if (file) {
      const key = `${index}-${field}`
      setUploadingState(prev => ({ ...prev, [key]: true }))
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
            updateTestimonial(index, field, res.publicUrl)
            showStatus('success', 'Image uploaded successfully!')
          } else if (res?.error) {
            alert(`Upload error: ${res.error}`)
          }
        } catch (err: any) {
          alert(`Upload failed: ${err.message || err}`)
        } finally {
          setUploadingState(prev => ({ ...prev, [key]: false }))
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const showStatus = (type: 'success' | 'error', text: string) => {
    setStatusMsg({ type, text })
    setTimeout(() => setStatusMsg(null), 5000)
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      const result = await updateSiteSectionAction('homepage_data', data)
      if (result.error) {
        showStatus('error', result.error)
      } else {
        showStatus('success', 'Homepage configuration updated successfully!')
      }
    } catch (err: any) {
      console.error('Error saving homepage:', err)
      showStatus('error', err.message || 'An unexpected error occurred.')
    } finally {
      setSaving(false)
    }
  }

  const updateHero = (field: string, value: any) => {
    setData({
      ...data,
      hero: {
        ...data.hero,
        [field]: value
      }
    })
  }

  const updateHeroMetric = (idx: number, field: string, value: string) => {
    const metrics = [...(data.hero.metrics || [])]
    metrics[idx] = { ...metrics[idx], [field]: value }
    setData({
      ...data,
      hero: {
        ...data.hero,
        metrics
      }
    })
  }

  // --- Features Tabs ---
  const updateFeatureTab = (tabIdx: number, field: string, value: any) => {
    const tabs = [...(data.tabsDataFeaturesSection26 || [])]
    tabs[tabIdx] = { ...tabs[tabIdx], [field]: value }
    setData({ ...data, tabsDataFeaturesSection26: tabs })
  }

  const updateFeaturePoint = (tabIdx: number, pointIdx: number, value: string) => {
    const tabs = [...(data.tabsDataFeaturesSection26 || [])]
    const points = [...(tabs[tabIdx].points || [])]
    points[pointIdx] = value
    tabs[tabIdx] = { ...tabs[tabIdx], points }
    setData({ ...data, tabsDataFeaturesSection26: tabs })
  }

  // --- Process Timeline ---
  const updateProcessStep = (idx: number, field: string, value: any) => {
    const steps = [...(data.processSteps || [])]
    steps[idx] = { ...steps[idx], [field]: value }
    setData({ ...data, processSteps: steps })
  }

  const deleteProcessStep = (idx: number) => {
    const steps = (data.processSteps || []).filter((_: any, i: number) => i !== idx)
    setData({ ...data, processSteps: steps })
  }

  const addProcessStep = () => {
    const steps = [...(data.processSteps || []), { title: '', description: '', progress: 25, progressLabel: '25%', duration: '' }]
    setData({ ...data, processSteps: steps })
  }

  // --- Social Proof ---
  const updateSocialMetric = (idx: number, field: string, value: string) => {
    const metrics = [...(data.metricsData || [])]
    metrics[idx] = { ...metrics[idx], [field]: value }
    setData({ ...data, metricsData: metrics })
  }

  const deleteSocialMetric = (idx: number) => {
    const metrics = (data.metricsData || []).filter((_: any, i: number) => i !== idx)
    setData({ ...data, metricsData: metrics })
  }

  const addSocialMetric = () => {
    const metrics = [...(data.metricsData || []), { value: '', title: '', subtitle: '' }]
    setData({ ...data, metricsData: metrics })
  }

  // --- Testimonials ---
  const updateTestimonial = (idx: number, field: string, value: any) => {
    const list = [...(data.testimonials || [])]
    list[idx] = { ...list[idx], [field]: value }
    setData({ ...data, testimonials: list })
  }

  const deleteTestimonial = (idx: number) => {
    const list = (data.testimonials || []).filter((_: any, i: number) => i !== idx)
    setData({ ...data, testimonials: list })
  }

  const addTestimonial = () => {
    const list = [...(data.testimonials || []), { id: Date.now().toString(), avatar: '', fallback: '', name: '', designation: '', companyName: '', companyLogo: '', message: '' }]
    setData({ ...data, testimonials: list })
  }

  // --- Security Items ---
  const updateSecurityItem = (idx: number, field: string, value: string) => {
    const items = [...(data.securityItems || [])]
    items[idx] = { ...items[idx], [field]: value }
    setData({ ...data, securityItems: items })
  }

  const deleteSecurityItem = (idx: number) => {
    const items = (data.securityItems || []).filter((_: any, i: number) => i !== idx)
    setData({ ...data, securityItems: items })
  }

  const addSecurityItem = () => {
    const items = [...(data.securityItems || []), { title: '', description: '' }]
    setData({ ...data, securityItems: items })
  }

  // --- FAQs ---
  const updateFaqTabName = (tabIdx: number, value: string) => {
    const tabs = [...(data.faqTabs || [])]
    tabs[tabIdx] = { ...tabs[tabIdx], name: value }
    setData({ ...data, faqTabs: tabs })
  }

  const updateFaqQuestion = (tabIdx: number, faqIdx: number, field: 'question' | 'answer', value: string) => {
    const tabs = [...(data.faqTabs || [])]
    const faqs = [...(tabs[tabIdx].faqs || [])]
    faqs[faqIdx] = { ...faqs[faqIdx], [field]: value }
    tabs[tabIdx] = { ...tabs[tabIdx], faqs }
    setData({ ...data, faqTabs: tabs })
  }

  const addFaqQuestion = (tabIdx: number) => {
    const tabs = [...(data.faqTabs || [])]
    const faqs = [...(tabs[tabIdx].faqs || []), { id: `faq-new-${Date.now()}`, question: '', answer: '' }]
    tabs[tabIdx] = { ...tabs[tabIdx], faqs }
    setData({ ...data, faqTabs: tabs })
  }

  const deleteFaqQuestion = (tabIdx: number, faqIdx: number) => {
    const tabs = [...(data.faqTabs || [])]
    const faqs = (tabs[tabIdx].faqs || []).filter((_: any, i: number) => i !== faqIdx)
    tabs[tabIdx] = { ...tabs[tabIdx], faqs }
    setData({ ...data, faqTabs: tabs })
  }

  // SEO checklist simulation
  const seoChecklist = (() => {
    const checks: { label: string; pass: boolean; tip: string }[] = []
    const kw = focusKeyword.toLowerCase().trim()
    const heroH1 = data.hero.heading || ''
    const heroSub = data.hero.subheading || ''

    checks.push({ label: 'Focus keyword set', pass: !!kw, tip: 'Set focus keyword' })
    checks.push({ label: 'Keyword in Hero H1 Title', pass: !!kw && heroH1.toLowerCase().includes(kw), tip: 'Include keyword in Hero Title' })
    checks.push({ label: 'Hero subdescription length (>100 chars)', pass: heroSub.length > 100, tip: 'Add details to hero subdescription' })
    checks.push({ label: 'At least 3 timeline steps', pass: (data.processSteps || []).length >= 3, tip: 'Configure timeline steps' })
    checks.push({ label: 'At least 3 social proof metrics', pass: (data.metricsData || []).length >= 3, tip: 'Add metrics' })
    checks.push({ label: 'At least 2 client testimonials', pass: (data.testimonials || []).length >= 2, tip: 'Add testimonials' })
    checks.push({ label: 'Security items defined', pass: (data.securityItems || []).length >= 2, tip: 'Configure security cards' })
    checks.push({ label: 'FAQ sections complete', pass: (data.faqTabs || []).length >= 2, tip: 'Configure FAQs' })

    // AEO/AGO Checks
    const hasConversationalKeyword = ['how', 'why', 'what', 'best', 'guide', 'strategy', 'tips', 'api'].some(word => kw.includes(word))
    checks.push({
      label: 'AEO: Conversational Keyword intent',
      pass: hasConversationalKeyword,
      tip: 'Use conversational search words in keyword (how, why, what, best, api, guide)'
    })

    const hasDirectAnswer = heroSub.length > 50 && heroSub.length <= 200
    checks.push({
      label: 'AEO: Direct Answer Snippet',
      pass: hasDirectAnswer,
      tip: 'Description should be 50-200 chars to serve as an AI Direct Answer Snippet'
    })

    const hasFAQ = (data.faqTabs || []).length >= 2
    checks.push({
      label: 'AEO: Direct Q&A structure / FAQ',
      pass: hasFAQ,
      tip: 'Include FAQ accordions or questions for LLM optimization'
    })

    const passCount = checks.filter(c => c.pass).length
    const calculatedScore = Math.round((passCount / checks.length) * 100)

    return { checks, score: calculatedScore }
  })()

  useEffect(() => {
    setSeoScore(seoChecklist.score)
  }, [seoChecklist.score])

  const handleAIGenerate = () => {
    setIsGeneratingAI(true)
    setTimeout(() => {
      setIsGeneratingAI(false)
      updateHero('heading', 'Supercharge Your Sales Team with Official WhatsApp Business API Automation')
      updateHero('subheading', 'AI Greentick delivers enterprise-grade WhatsApp API campaigns, shared team inboxes, smart routers, and LLM-powered bots to qualification leads and scale support channels instantly.')
      showStatus('success', 'AI Generator updated Hero descriptions!')
    }, 2000)
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12 font-sans text-neutral-800 antialiased select-none">
      {/* Toast Notification Banner */}
       {statusMsg && (
        <div
          className={cn(
            "fixed bottom-4 right-4 z-50 flex items-center gap-2 px-4 py-3 rounded-lg shadow-lg border transition-all duration-300",
            statusMsg.type === 'success'
              ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20'
              : 'bg-destructive/10 text-destructive border-destructive/20'
          )}
        >
          {statusMsg.type === 'success' ? (
            <Check className="h-4 w-4 shrink-0 text-emerald-500" />
          ) : (
            <X className="h-4 w-4 shrink-0 text-destructive" />
          )}
          <span className="text-sm font-medium">{statusMsg.text}</span>
        </div>
      )}

      {/* Page header */}
      <div className="flex items-center gap-4 border-b border-neutral-200 pb-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-neutral-200 bg-white text-neutral-500 select-none">
          <Globe className="h-4 w-4 text-primary" />
        </div>
        <div>
          <h2 className="text-2xl font-normal tracking-tight text-neutral-900">
            Edit Page: {title}
          </h2>
          <p className="text-neutral-500 text-xs">WordPress layout view. Customize landing pages, timeline stages, and SEO tags.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        
        {/* Left Column */}
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
            
            {/* Permalink preview */}
            <div className="text-xs text-neutral-500 pl-1 flex flex-wrap items-center gap-1">
              <span className="font-semibold text-neutral-600">Permalink:</span>
              <span className="font-mono bg-neutral-50 px-1 rounded text-neutral-400">
                http://localhost:3005/
              </span>
              <span className="font-semibold text-sky-700 font-mono underline hover:text-sky-855 cursor-pointer">
                (homepage-route)
              </span>
            </div>
          </div>

          {/* Section 1: Hero Layout Content */}
          <Card className="border border-[#C5C4C2]/50 shadow-xs bg-white rounded-lg">
            <CardHeader className="bg-neutral-50/50 border-b border-[#C5C4C2]/40 py-3.5 px-5">
              <CardTitle className="text-sm font-bold text-neutral-800 font-display">Hero Layout Content</CardTitle>
              <CardDescription className="text-[10px]">Configure the landing page hero category badge, marquee title text, headings, and descriptions.</CardDescription>
            </CardHeader>
            <CardContent className="p-5 space-y-4 text-xs text-neutral-700 bg-white font-normal">
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-1.5">
                  <Label className="font-semibold text-neutral-750">Scrolling Marquee Title</Label>
                  <Input value={data.hero.title || ''} onChange={e => updateHero('title', e.target.value)} className="border-neutral-300 h-9 bg-white" />
                </div>
                <div className="space-y-1.5">
                  <Label className="font-semibold text-neutral-750">Scrolling Tagline Label</Label>
                  <Input value={data.hero.tagline || ''} onChange={e => updateHero('tagline', e.target.value)} className="border-neutral-300 h-9 bg-white" />
                </div>
                <div className="space-y-1.5">
                  <Label className="font-semibold text-neutral-750 font-mono uppercase text-[10px]">Primary Badge (New)</Label>
                  <Input value={data.hero.badgeText || ''} onChange={e => updateHero('badgeText', e.target.value)} className="border-neutral-300 h-9 bg-white" />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-1.5">
                  <Label className="font-semibold text-neutral-750">Main Hero Heading H1</Label>
                  <Input value={data.hero.heading || ''} onChange={e => updateHero('heading', e.target.value)} className="border-neutral-300 h-9 bg-white" />
                </div>
                <div className="space-y-1.5">
                  <Label className="font-semibold text-neutral-750 font-mono uppercase text-[10px]">Secondary Badge (Official API)</Label>
                  <Input value={data.hero.badgeTextSecondary || ''} onChange={e => updateHero('badgeTextSecondary', e.target.value)} className="border-neutral-300 h-9 bg-white" />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label className="font-semibold text-neutral-750">Hero Description Paragraph</Label>
                <RichEditor value={data.hero.subheading || ''} onChange={val => updateHero('subheading', val)} minHeight="80px" />
              </div>

              <div className="grid gap-4 md:grid-cols-4">
                <div className="space-y-1.5">
                  <Label className="font-semibold text-neutral-750">Primary CTA Text</Label>
                  <Input value={data.hero.ctaText || ''} onChange={e => updateHero('ctaText', e.target.value)} className="border-neutral-300 h-9 bg-white" />
                </div>
                <div className="space-y-1.5">
                  <Label className="font-semibold text-neutral-750">Primary CTA Link</Label>
                  <Input value={data.hero.ctaLink || ''} onChange={e => updateHero('ctaLink', e.target.value)} className="border-neutral-300 h-9 bg-white" />
                </div>
                <div className="space-y-1.5">
                  <Label className="font-semibold text-neutral-750">Secondary CTA Text</Label>
                  <Input value={data.hero.secondaryCtaText || ''} onChange={e => updateHero('secondaryCtaText', e.target.value)} className="border-neutral-300 h-9 bg-white" />
                </div>
                <div className="space-y-1.5">
                  <Label className="font-semibold text-neutral-750">Secondary CTA Link</Label>
                  <Input value={data.hero.secondaryCtaLink || ''} onChange={e => updateHero('secondaryCtaLink', e.target.value)} className="border-neutral-300 h-9 bg-white" />
                </div>
              </div>

              {/* Hero metrics */}
              <div className="border-t border-[#C5C4C2]/30 pt-4 space-y-3">
                <h4 className="text-[11px] font-bold text-neutral-800 uppercase tracking-wide">Hero Showcase Bottom Metrics (4 cells)</h4>
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
                  {(data.hero.metrics || []).map((m: any, idx: number) => (
                    <div key={idx} className="p-3 border border-neutral-200 rounded-lg bg-neutral-50/50 space-y-2">
                      <div>
                        <Label className="text-[9px] text-neutral-400 font-bold uppercase">Metric Value</Label>
                        <Input value={m.value} onChange={e => updateHeroMetric(idx, 'value', e.target.value)} className="h-8 text-xs bg-white border-neutral-300" />
                      </div>
                      <div>
                        <Label className="text-[9px] text-neutral-400 font-bold uppercase">Metric Label</Label>
                        <Input value={m.label} onChange={e => updateHeroMetric(idx, 'label', e.target.value)} className="h-8 text-xs bg-white border-neutral-300" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Section 1.5: Pricing Header settings */}
          <Card className="border border-[#C5C4C2]/50 shadow-xs bg-white rounded-lg">
            <CardHeader className="bg-neutral-50/50 border-b border-[#C5C4C2]/40 py-3.5 px-5">
              <CardTitle className="text-sm font-bold text-neutral-800 font-display">Pricing Section Header</CardTitle>
              <CardDescription className="text-[10px]">Configure the pricing section header title and description shown on the homepage.</CardDescription>
            </CardHeader>
            <CardContent className="p-5 space-y-4 text-xs text-neutral-700 bg-white">
              <div className="space-y-1.5">
                <Label className="font-semibold text-neutral-750">Pricing Tagline Subtitle</Label>
                <Input 
                  value={data.pricingSubtitle || ''} 
                  onChange={e => setData({ ...data, pricingSubtitle: e.target.value })} 
                  className="border-neutral-300 h-9 bg-white" 
                />
              </div>
              <div className="space-y-1.5">
                <Label className="font-semibold text-neutral-750">Pricing Description Paragraph</Label>
                <Textarea 
                  value={data.pricingDescription || ''} 
                  onChange={e => setData({ ...data, pricingDescription: e.target.value })} 
                  className="border-neutral-300 min-h-[70px] bg-white" 
                />
              </div>
            </CardContent>
          </Card>

          {/* Section 2: Features Tabs Content */}
          <Card className="border border-[#C5C4C2]/50 shadow-xs bg-white rounded-lg">
            <CardHeader className="bg-neutral-50/50 border-b border-[#C5C4C2]/40 py-3.5 px-5">
              <CardTitle className="text-sm font-bold text-neutral-800 font-display">Tabs Content (Marketing / Sales / Support)</CardTitle>
              <CardDescription className="text-[10px]">Configure tab titles and points representing core operational advantages.</CardDescription>
            </CardHeader>
            <CardContent className="p-5 space-y-4">
              {(data.tabsDataFeaturesSection26 || []).map((tab: any, tabIdx: number) => (
                <div key={tab.id} className="p-4 border border-[#C5C4C2]/30 rounded-xl bg-neutral-50/30 space-y-3">
                  <span className="text-[10px] font-black font-mono text-[#00b259] uppercase tracking-wider bg-[#00b259]/10 px-2 py-0.5 rounded">
                    {tab.title} Feature tab
                  </span>
                  
                  <div className="space-y-1">
                    <Label className="text-[9px] text-neutral-450 uppercase font-bold">Tab Label Title</Label>
                    <Input value={tab.title} onChange={e => updateFeatureTab(tabIdx, 'title', e.target.value)} className="border-neutral-300 bg-white text-xs h-8.5" />
                  </div>

                  <div className="space-y-1.5 pt-2">
                    <Label className="text-[9px] text-neutral-455 uppercase font-bold">Bullet Highlights & Description</Label>
                    <RichEditor
                      value={Array.isArray(tab.points) ? `<ul>\n${tab.points.map((p: string) => `  <li>${p}</li>`).join('\n')}\n</ul>` : (tab.points || '')}
                      onChange={val => updateFeatureTab(tabIdx, 'points', val)}
                      minHeight="125px"
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Section 3: Timeline Cards */}
          <Card className="border border-[#C5C4C2]/50 shadow-xs bg-white rounded-lg">
            <CardHeader className="bg-neutral-50/50 border-b border-[#C5C4C2]/40 py-3.5 px-5 flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-sm font-bold text-neutral-800 font-display">Process Steps Timeline</CardTitle>
                <CardDescription className="text-[10px]">Configure the onboarding process timeline stages displayed on the homepage.</CardDescription>
              </div>
              <Button onClick={addProcessStep} size="sm" className="h-7 text-[10px] bg-[#00b259] text-white hover:bg-[#009b4d] font-bold cursor-pointer gap-1">
                <Plus className="h-3.5 w-3.5" /> Add Step
              </Button>
            </CardHeader>
            <CardContent className="p-5 space-y-3">
              <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
                {(data.processSteps || []).map((step: any, idx: number) => (
                  <div key={idx} className="p-4 bg-neutral-50/30 border border-neutral-250 rounded-lg space-y-3 relative">
                    <div className="flex justify-between items-center">
                      <span className="text-[9px] font-bold text-[#00b259] bg-[#00b259]/10 px-2 py-0.5 rounded">
                        Timeline Step #{idx + 1}
                      </span>
                      <Button onClick={() => deleteProcessStep(idx)} variant="ghost" size="icon" className="h-7 w-7 text-red-500 hover:text-red-655 hover:bg-red-55 cursor-pointer">
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-3">
                      <div className="space-y-1">
                        <Label className="text-[9px] text-neutral-400 font-bold uppercase">Step Title</Label>
                        <Input value={step.title} onChange={e => updateProcessStep(idx, 'title', e.target.value)} className="bg-white border-neutral-300 h-8.5 text-xs" />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-[9px] text-neutral-400 font-bold uppercase">Progress Label (e.g. 50%)</Label>
                        <Input value={step.progressLabel} onChange={e => updateProcessStep(idx, 'progressLabel', e.target.value)} className="bg-white border-neutral-300 h-8.5 text-xs" />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-[9px] text-neutral-400 font-bold uppercase">Duration (e.g. 1 hour)</Label>
                        <Input value={step.duration} onChange={e => updateProcessStep(idx, 'duration', e.target.value)} className="bg-white border-neutral-300 h-8.5 text-xs" />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <Label className="text-[9px] text-neutral-400 font-bold uppercase">Step Description</Label>
                      <RichEditor value={step.description} onChange={val => updateProcessStep(idx, 'description', val)} minHeight="60px" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Section 4: Social Proof Highlights */}
          <Card className="border border-[#C5C4C2]/50 shadow-xs bg-white rounded-lg">
            <CardHeader className="bg-neutral-50/50 border-b border-[#C5C4C2]/40 py-3.5 px-5 flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-sm font-bold text-neutral-800 font-display">Social Proof Highlights</CardTitle>
                <CardDescription className="text-[10px]">Manage the statistics card values showing high delivery / open rate metrics.</CardDescription>
              </div>
              <Button onClick={addSocialMetric} size="sm" className="h-7 text-[10px] bg-[#00b259] text-white hover:bg-[#009b4d] font-bold cursor-pointer gap-1">
                <Plus className="h-3.5 w-3.5" /> Add Metric
              </Button>
            </CardHeader>
            <CardContent className="p-5 space-y-3">
              <div className="grid gap-4 md:grid-cols-2 max-h-[350px] overflow-y-auto pr-1">
                {(data.metricsData || []).map((metric: any, idx: number) => (
                  <div key={idx} className="p-3 border border-[#C5C4C2]/35 rounded-xl bg-neutral-50/30 space-y-2 relative">
                    <div className="flex justify-between items-center">
                      <span className="text-[9px] font-bold text-neutral-450 uppercase">Metric #{idx + 1}</span>
                      <Button onClick={() => deleteSocialMetric(idx)} variant="ghost" size="icon" className="h-6 w-6 text-red-500 hover:text-red-655 hover:bg-red-55 cursor-pointer">
                        <X className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                    
                    <div className="grid gap-2 grid-cols-2">
                      <div className="space-y-1">
                        <Label className="text-[9px] text-neutral-400 font-bold uppercase">Value (e.g. 98%)</Label>
                        <Input value={metric.value} onChange={e => updateSocialMetric(idx, 'value', e.target.value)} className="bg-white border-neutral-300 h-8 text-xs" />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-[9px] text-neutral-400 font-bold uppercase">Title Label</Label>
                        <Input value={metric.title} onChange={e => updateSocialMetric(idx, 'title', e.target.value)} className="bg-white border-neutral-300 h-8 text-xs" />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <Label className="text-[9px] text-neutral-400 font-bold uppercase">Sub-tagline (vs email)</Label>
                      <Input value={metric.subtitle} onChange={e => updateSocialMetric(idx, 'subtitle', e.target.value)} className="bg-white border-neutral-300 h-8 text-xs" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Section 5: Testimonials */}
          <Card className="border border-[#C5C4C2]/50 shadow-xs bg-white rounded-lg">
            <CardHeader className="bg-neutral-50/50 border-b border-[#C5C4C2]/40 py-3.5 px-5 flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-sm font-bold text-neutral-800 font-display">Client Testimonials</CardTitle>
                <CardDescription className="text-[10px]">Add or customize customer quotes, names, avatars, and company branding.</CardDescription>
              </div>
              <Button onClick={addTestimonial} size="sm" className="h-7 text-[10px] bg-[#00b259] text-white hover:bg-[#009b4d] font-bold cursor-pointer gap-1">
                <Plus className="h-3.5 w-3.5" /> Add Testimonial
              </Button>
            </CardHeader>
            <CardContent className="p-5 space-y-4">
              <div className="space-y-4 max-h-[450px] overflow-y-auto pr-1">
                {(data.testimonials || []).map((test: any, idx: number) => (
                  <div key={test.id || idx} className="p-4 bg-neutral-50/30 border border-[#C5C4C2]/45 rounded-xl space-y-3 relative">
                    <div className="flex justify-between items-center">
                      <span className="text-[9px] font-bold text-neutral-450 uppercase">Testimonial #{idx + 1}</span>
                      <Button onClick={() => deleteTestimonial(idx)} variant="ghost" size="icon" className="h-7 w-7 text-red-500 hover:text-red-655 hover:bg-red-55 cursor-pointer">
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-3">
                      <div className="space-y-1">
                        <Label className="text-[9px] text-neutral-400 font-bold uppercase">Name</Label>
                        <Input value={test.name} onChange={e => updateTestimonial(idx, 'name', e.target.value)} className="bg-white border-neutral-300 h-8.5 text-xs font-semibold" />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-[9px] text-neutral-400 font-bold uppercase">Designation</Label>
                        <Input value={test.designation} onChange={e => updateTestimonial(idx, 'designation', e.target.value)} className="bg-white border-neutral-300 h-8.5 text-xs" />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-[9px] text-neutral-400 font-bold uppercase">Avatar URL</Label>
                        <div className="flex gap-2">
                          <Input value={test.avatar} onChange={e => updateTestimonial(idx, 'avatar', e.target.value)} className="bg-white border-neutral-300 h-8.5 text-xs font-mono flex-1" />
                          <label className="h-8.5 px-2.5 border border-neutral-300 text-neutral-700 bg-white hover:bg-neutral-100 flex items-center justify-center text-[10px] font-semibold cursor-pointer shrink-0 rounded-md">
                            {uploadingState[`${idx}-avatar`] ? '...' : 'Upload'}
                            <input 
                              type="file" 
                              accept="image/*" 
                              className="hidden" 
                              disabled={uploadingState[`${idx}-avatar`]}
                              onChange={e => handleFileUpload(e, idx, 'avatar')}
                            />
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-3">
                      <div className="space-y-1">
                        <Label className="text-[9px] text-neutral-400 font-bold uppercase">Company Name</Label>
                        <Input value={test.companyName} onChange={e => updateTestimonial(idx, 'companyName', e.target.value)} className="bg-white border-neutral-300 h-8.5 text-xs" />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-[9px] text-neutral-400 font-bold uppercase">Company Logo Link</Label>
                        <div className="flex gap-2">
                          <Input value={test.companyLogo} onChange={e => updateTestimonial(idx, 'companyLogo', e.target.value)} className="bg-white border-neutral-300 h-8.5 text-xs font-mono flex-1" />
                          <label className="h-8.5 px-2.5 border border-neutral-300 text-neutral-700 bg-white hover:bg-neutral-100 flex items-center justify-center text-[10px] font-semibold cursor-pointer shrink-0 rounded-md">
                            {uploadingState[`${idx}-companyLogo`] ? '...' : 'Upload'}
                            <input 
                              type="file" 
                              accept="image/*" 
                              className="hidden" 
                              disabled={uploadingState[`${idx}-companyLogo`]}
                              onChange={e => handleFileUpload(e, idx, 'companyLogo')}
                            />
                          </label>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <Label className="text-[9px] text-neutral-400 font-bold uppercase">Fallback initials</Label>
                        <Input value={test.fallback} onChange={e => updateTestimonial(idx, 'fallback', e.target.value)} className="bg-white border-neutral-300 h-8.5 text-xs" />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <Label className="text-[9px] text-neutral-400 font-bold uppercase">Quote message</Label>
                      <RichEditor value={test.message} onChange={val => updateTestimonial(idx, 'message', val)} minHeight="60px" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Section 6: Security and Compliance */}
          <Card className="border border-[#C5C4C2]/50 shadow-xs bg-white rounded-lg">
            <CardHeader className="bg-neutral-50/50 border-b border-[#C5C4C2]/40 py-3.5 px-5 flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-sm font-bold text-neutral-800 font-display">Compliance & Security Items</CardTitle>
                <CardDescription className="text-[10px]">Add, edit, or customize compliance credentials (like BSP, GDPR, Encryption).</CardDescription>
              </div>
              <Button onClick={addSecurityItem} size="sm" className="h-7 text-[10px] bg-[#00b259] text-white hover:bg-[#009b4d] font-bold cursor-pointer gap-1">
                <Plus className="h-3.5 w-3.5" /> Add Item
              </Button>
            </CardHeader>
            <CardContent className="p-5 space-y-3">
              <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 max-h-[300px] overflow-y-auto pr-1">
                {(data.securityItems || []).map((sec: any, idx: number) => (
                  <div key={idx} className="p-3 border border-[#C5C4C2]/35 rounded-xl bg-neutral-50/30 space-y-2 relative">
                    <div className="flex justify-between items-center">
                      <span className="text-[9px] font-bold text-neutral-450 uppercase">Security Card #{idx + 1}</span>
                      <Button onClick={() => deleteSecurityItem(idx)} variant="ghost" size="icon" className="h-5 w-5 text-red-500 hover:text-red-655 hover:bg-red-55 cursor-pointer">
                        <X className="h-3.5 w-3.5" />
                      </Button>
                    </div>

                    <div className="space-y-1">
                      <Label className="text-[9px] text-neutral-400 font-bold uppercase">Card Title</Label>
                      <Input value={sec.title} onChange={e => updateSecurityItem(idx, 'title', e.target.value)} className="bg-white border-neutral-300 h-8 text-xs font-semibold" />
                    </div>

                    <div className="space-y-1">
                      <Label className="text-[9px] text-neutral-400 font-bold uppercase">Description</Label>
                      <Input value={sec.description} onChange={e => updateSecurityItem(idx, 'description', e.target.value)} className="bg-white border-neutral-300 h-8 text-xs" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Section 7: FAQs Accordions */}
          <Card className="border border-[#C5C4C2]/50 shadow-xs bg-white rounded-lg">
            <CardHeader className="bg-neutral-50/50 border-b border-[#C5C4C2]/40 py-3.5 px-5">
              <CardTitle className="text-sm font-bold text-neutral-800 font-display">FAQ Accordions Configuration</CardTitle>
              <CardDescription className="text-[10px]">Add relevant queries and descriptive answers for specific homepage tab sectors.</CardDescription>
            </CardHeader>
            <CardContent className="p-5 space-y-4">
              {(data.faqTabs || []).map((tab: any, tabIdx: number) => (
                <div key={tab.value} className="p-4 border border-[#C5C4C2]/35 rounded-xl bg-neutral-50/30 space-y-4">
                  <div className="flex justify-between items-center border-b border-[#C5C4C2]/30 pb-2">
                    <div className="space-y-1 w-full max-w-sm">
                      <Label className="text-[9px] text-neutral-400 uppercase font-bold">FAQ Tab Title</Label>
                      <Input value={tab.name} onChange={e => updateFaqTabName(tabIdx, e.target.value)} className="bg-white border-neutral-300 h-8 text-xs font-bold" />
                    </div>
                    <Button onClick={() => addFaqQuestion(tabIdx)} size="sm" className="h-7 text-[10px] bg-[#00b259] text-white hover:bg-[#009b4d] font-bold cursor-pointer gap-1 self-end">
                      <Plus className="h-3.5 w-3.5" /> Add Question
                    </Button>
                  </div>

                  <div className="space-y-3 pl-3 border-l-2 border-[#00b259]/30">
                    {(tab.faqs || []).map((faq: any, faqIdx: number) => (
                      <div key={faq.id || faqIdx} className="p-3 bg-white border border-[#C5C4C2]/45 rounded-lg space-y-2 relative">
                        <div className="flex justify-between items-center">
                          <span className="text-[9px] font-bold text-neutral-400 uppercase">Question #{faqIdx + 1}</span>
                          <Button onClick={() => deleteFaqQuestion(tabIdx, faqIdx)} variant="ghost" size="icon" className="h-6 w-6 text-red-500 hover:text-red-655 hover:bg-red-55 cursor-pointer">
                            <X className="h-3.5 w-3.5" />
                          </Button>
                        </div>

                        <div className="space-y-1">
                          <Label className="text-[9px] text-neutral-400 uppercase">Question Query</Label>
                          <Input value={faq.question} onChange={e => updateFaqQuestion(tabIdx, faqIdx, 'question', e.target.value)} className="border-neutral-300 h-8 text-xs bg-white" />
                        </div>

                        <div className="space-y-1">
                          <Label className="text-[9px] text-neutral-400 uppercase font-semibold">Answer Description</Label>
                          <Textarea value={faq.answer} onChange={e => updateFaqQuestion(tabIdx, faqIdx, 'answer', e.target.value)} className="border-neutral-300 text-xs bg-white min-h-[60px]" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

        </div>

        {/* Right Column (Sidebar) */}
        <div className="space-y-6">
          
          {/* Publish Settings Card */}
          <Card className="border border-neutral-200 bg-white rounded-lg shadow-sm overflow-visible">
            <CardHeader className="bg-neutral-50/50 border-b border-neutral-100 py-3.5 px-4">
              <CardTitle className="text-xs font-bold text-neutral-800">Publish settings</CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-3.5 text-[11px] text-neutral-500 font-normal leading-relaxed select-none">
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

              <div className="flex items-center justify-between">
                <span className="font-semibold text-neutral-700">Visibility:</span>
                <span className="text-primary font-semibold">Public (Edit)</span>
              </div>

              <div className="space-y-1">
                <span className="block text-neutral-455 font-bold uppercase tracking-wider text-[9px]">Focus Keyword</span>
                <Input
                  value={focusKeyword}
                  onChange={(e) => setFocusKeyword(e.target.value)}
                  placeholder="Focus SEO keyword"
                  className="h-7.5 text-[10px] border-neutral-300 font-normal"
                />
              </div>

              <div className="border-t border-[#C5C4C2]/35 pt-3 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-neutral-700">SEO Score Rank:</span>
                  <Badge 
                    className={cn(
                      "px-2 py-0.5 text-[10px] font-extrabold rounded-md shadow-xs border",
                      seoScore >= 80 ? "bg-[#EAFBF3] text-emerald-600 border border-emerald-400" :
                      seoScore >= 50 ? "bg-[#FFF9E6] text-amber-600 border border-amber-400" :
                      "bg-red-50 text-red-650 border border-red-400"
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
                    className="bg-white border border-neutral-300 h-7 rounded px-2 outline-none text-neutral-855 text-[10px] cursor-pointer font-normal"
                  >
                    <option value="On">Enabled (On)</option>
                    <option value="Off">Disabled (Off)</option>
                  </select>
                </div>
              </div>

              <div className="border-t border-[#C5C4C2]/45 pt-3.5 flex items-center justify-between border-neutral-200">
                <button
                  type="button"
                  onClick={() => alert('Moving the homepage to trash is disabled to prevent website breakdown.')}
                  className="text-red-500/50 hover:text-red-500/70 hover:underline cursor-not-allowed font-bold"
                >
                  Move to Trash
                </button>
                
                <Button
                  type="button"
                  onClick={handleSave}
                  disabled={saving}
                  className="bg-black text-white hover:bg-neutral-850 font-bold h-8.5 px-4 cursor-pointer text-xs rounded-md shadow-xs gap-1"
                >
                  {saving ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Globe className="h-3.5 w-3.5" />} Update
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
                  "bg-red-50 text-red-655 border-red-400"
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
                    check.pass ? "text-neutral-600" : "text-red-655"
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
                  <Label className="text-[9px] text-neutral-455 uppercase font-bold pl-0.5">Instructions for Generator</Label>
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
