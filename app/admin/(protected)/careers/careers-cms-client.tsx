'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { updateSiteSectionAction } from '../cms-actions'
import { AeoChecklist } from '@/components/admin/aeo-checklist'
import { RichTextEditor } from '@/components/ui/rich-text-editor'
import {
  ArrowLeft,
  Loader2,
  Check,
  X,
  Plus,
  Trash2,
  ChevronUp,
  ChevronDown,
  Settings,
  ExternalLink,
  Laptop,
  Smartphone
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface CareersCmsClientProps {
  initialData: any
}

const AVAILABLE_ICONS = [
  { value: 'Briefcase', label: '💼 Briefcase' },
  { value: 'Laptop', label: '💻 Laptop' },
  { value: 'Globe', label: '🌐 Globe' },
  { value: 'DollarSign', label: '💵 Dollar Sign' },
  { value: 'Users', label: '👥 Users' },
  { value: 'Award', label: '🏆 Award' },
  { value: 'Sparkles', label: '✨ Sparkles' },
  { value: 'Timer', label: '⏱️ Timer' },
  { value: 'CheckCircle', label: '✅ Check Circle' },
  { value: 'TrendingUp', label: '📈 Trending Up' },
  { value: 'Code', label: '💻 Code' },
  { value: 'Cpu', label: '🧠 CPU / AI' },
  { value: 'Layers', label: '🥞 Layers' },
  { value: 'Lock', label: '🔒 Lock' },
  { value: 'Shield', label: '🛡️ Shield' },
  { value: 'Heart', label: '❤️ Heart' },
  { value: 'Zap', label: '⚡ Zap' },
  { value: 'Database', label: '🗄️ Database' },
  { value: 'Search', label: '🔍 Search' },
  { value: 'MessageSquare', label: '💬 Message' },
  { value: 'Activity', label: '📈 Activity' },
  { value: 'ShoppingBag', label: '🛍️ Shopping Bag' },
  { value: 'GraduationCap', label: '🎓 Graduation Cap' },
  { value: 'Home', label: '🏠 Home' },
  { value: 'Plane', label: '✈️ Plane' }
]

export default function CareersCmsClient({ initialData }: CareersCmsClientProps) {
  const router = useRouter()
  const [data, setData] = useState(() => {
    return {
      ...initialData,
      hero: initialData.hero || { badge: 'CAREERS', heading: '', description: '' },
      fitSignals: initialData.fitSignals || [],
      benefits: initialData.benefits || [],
      hiringSteps: initialData.hiringSteps || [],
      heroStats: initialData.heroStats || []
    }
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [statusMsg, setStatusMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  // SEO Snippet Preview Mode
  const [previewMode, setPreviewMode] = useState<'desktop' | 'mobile'>('desktop')
  const [showSeoEdit, setShowSeoEdit] = useState(false)

  const showStatus = (type: 'success' | 'error', text: string) => {
    setStatusMsg({ type, text })
    setTimeout(() => setStatusMsg(null), 5000)
  }

  const handleSave = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const result = await updateSiteSectionAction('careers_page', data)
      if (result?.error) {
        setError(result.error)
        showStatus('error', result.error)
      } else {
        showStatus('success', 'Careers page saved successfully!')
        router.refresh()
      }
    } catch (err: any) {
      console.error('Error saving careers page:', err)
      const msg = err.message || 'An unexpected error occurred.'
      setError(msg)
      showStatus('error', msg)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Helper helpers for list edits
  const updateListField = (listName: 'fitSignals' | 'benefits' | 'hiringSteps' | 'heroStats', idx: number, field: string, value: any) => {
    const list = [...(data[listName] || [])]
    list[idx] = { ...list[idx], [field]: value }
    setData({ ...data, [listName]: list })
  }

  const removeListItem = (listName: 'fitSignals' | 'benefits' | 'hiringSteps' | 'heroStats', idx: number) => {
    const list = (data[listName] || []).filter((_: any, i: number) => i !== idx)
    setData({ ...data, [listName]: list })
  }

  const addListItem = (listName: 'fitSignals' | 'benefits' | 'hiringSteps' | 'heroStats', defaultObj: any) => {
    const list = [...(data[listName] || []), defaultObj]
    setData({ ...data, [listName]: list })
  }

  const moveListItem = (listName: 'fitSignals' | 'benefits' | 'hiringSteps' | 'heroStats', idx: number, dir: -1 | 1) => {
    const list = [...(data[listName] || [])]
    const target = idx + dir
    if (target < 0 || target >= list.length) return
    ;[list[idx], list[target]] = [list[target], list[idx]]
    setData({ ...data, [listName]: list })
  }


  // ── FAQ List helpers ──
  const updateFaq = (idx: number, field: string, value: string) => {
    const list = [...(data.faqs || [])]
    list[idx] = { ...list[idx], [field]: value }
    setData({ ...data, faqs: list })
  }

  const removeFaq = (idx: number) => {
    const list = (data.faqs || []).filter((_: any, i: number) => i !== idx)
    setData({ ...data, faqs: list })
  }

  const addFaq = () => {
    setData({
      ...data,
      faqs: [
        ...(data.faqs || []),
        {
          question: 'New FAQ Question?',
          answer: 'The answer description goes here.'
        }
      ]
    })
  }

  const moveFaq = (idx: number, dir: -1 | 1) => {
    const list = [...(data.faqs || [])]
    const target = idx + dir
    if (target < 0 || target >= list.length) return
    ;[list[idx], list[target]] = [list[target], list[idx]]
    setData({ ...data, faqs: list })
  }

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6 max-w-7xl mx-auto font-sans text-black">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-[#C5C4C2]/30 pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Link
              href="/admin"
              className="text-neutral-500 hover:text-black transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <h2 className="text-2xl font-black tracking-tight font-display">Careers Page CMS</h2>
          </div>
          <p className="text-sm text-neutral-500 font-sans">
            Customize headers, stats cards, operating values, benefits, and hiring steps.
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <Link
            href="/careers"
            target="_blank"
            className="inline-flex h-10 items-center justify-center border border-[#C5C4C2] bg-white px-4 text-xs font-bold hover:bg-neutral-50 transition-colors uppercase tracking-wider rounded-lg gap-1.5"
          >
            View Live Page <ExternalLink className="h-3.5 w-3.5" />
          </Link>
          <Button
            onClick={() => handleSave()}
            disabled={isSubmitting}
            className="h-10 bg-black text-white hover:bg-neutral-800 transition-colors font-bold text-xs px-6 uppercase tracking-widest cursor-pointer rounded-lg shadow-sm"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              'Save Changes'
            )}
          </Button>
        </div>
      </div>

      {/* Floating Status Notification */}
      {statusMsg && (
        <div
          className={cn(
            'fixed bottom-5 right-5 z-50 flex items-center gap-2.5 px-4 py-3 rounded-lg shadow-lg border animate-in fade-in slide-in-from-bottom-5 duration-300 font-sans',
            statusMsg.type === 'success'
              ? 'bg-[#00b259]/10 border-[#00b259] text-emerald-800'
              : 'bg-red-50 border-red-200 text-red-800'
          )}
        >
          {statusMsg.type === 'success' ? (
            <div className="h-5 w-5 rounded-full bg-[#00b259]/20 flex items-center justify-center"><Check className="h-3 w-3 text-[#00b259]" /></div>
          ) : (
            <div className="h-5 w-5 rounded-full bg-red-100 flex items-center justify-center"><X className="h-3 w-3 text-red-600" /></div>
          )}
          <span className="text-sm font-bold">{statusMsg.text}</span>
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column: Form Editors */}
        <div className="lg:col-span-2 space-y-6">
          <form onSubmit={handleSave} className="space-y-6">
            
            {/* Card 1: Hero Settings */}
            <Card className="shadow-xs border border-[#C5C4C2]/50">
              <CardHeader className="pb-3 border-b border-[#C5C4C2]/20">
                <CardTitle className="font-display text-neutral-850">Careers Hero Section</CardTitle>
                <CardDescription>Main title and introductory description of the careers page</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 pt-5">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label className="text-xs font-semibold">Hero Page Title</Label>
                    <Input
                      required
                      value={data.pageTitle || ''}
                      onChange={(e) => setData({ ...data, pageTitle: e.target.value })}
                      className="h-10 border-[#C5C4C2]"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs font-semibold">Hero Page Subtitle</Label>
                    <Input
                      required
                      value={data.pageSubtitle || ''}
                      onChange={(e) => setData({ ...data, pageSubtitle: e.target.value })}
                      className="h-10 border-[#C5C4C2]"
                    />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label className="text-xs font-semibold">Mission Badge Label</Label>
                    <Input
                      required
                      value={data.hero?.badge || ''}
                      onChange={(e) => setData({
                        ...data,
                        hero: { ...data.hero, badge: e.target.value }
                      })}
                      className="h-10 border-[#C5C4C2]"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs font-semibold">Mission Heading</Label>
                    <Input
                      required
                      value={data.hero?.heading || ''}
                      onChange={(e) => setData({
                        ...data,
                        hero: { ...data.hero, heading: e.target.value }
                      })}
                      className="h-10 border-[#C5C4C2]"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold">Mission Description Summary</Label>
                  <Textarea
                    required
                    value={data.hero?.description || ''}
                    onChange={(e) => setData({
                      ...data,
                      hero: { ...data.hero, description: e.target.value }
                    })}
                    className="min-h-[100px] border-[#C5C4C2]"
                  />
                </div>

                <div className="space-y-1.5 pt-2 border-t border-neutral-100">
                  <Label htmlFor="aiSnapshot" className="text-xs font-semibold text-[#00b259]">AI Snapshot Direct Summary (AEO/AGO optimized)</Label>
                  <Textarea
                    id="aiSnapshot"
                    required
                    value={data.aiSnapshot || ''}
                    onChange={(e) => setData({ ...data, aiSnapshot: e.target.value })}
                    placeholder="Summarize this page for voice search and AI search engines..."
                    className="h-16 resize-none border-[#C5C4C2]"
                  />
                </div>

                <div className="flex items-center gap-2 pt-2 border-t border-neutral-100">
                  <input
                    type="checkbox"
                    id="noindex"
                    checked={!!data.noindex}
                    onChange={(e) => setData({ ...data, noindex: e.target.checked })}
                    className="h-4 w-4 accent-[#00b259]"
                  />
                  <Label htmlFor="noindex" className="text-xs font-medium text-neutral-600">
                    Hide this page from search engines (noindex)
                  </Label>
                </div>

                <AeoChecklist
                  title={data.seoTitle || data.hero?.heading || ''}
                  description={data.seoDesc || ''}
                  aiSnapshot={data.aiSnapshot || ''}
                  faqCount={(data.faqs || []).length}
                  className="mt-3"
                />
              </CardContent>
            </Card>

            {/* Card 2: Hero Stats */}
            <Card className="shadow-xs border border-[#C5C4C2]/50">
              <CardHeader className="pb-3 border-b border-[#C5C4C2]/20">
                <CardTitle className="font-display text-neutral-850">Operating Stats Cards</CardTitle>
                <CardDescription>Stats items shown in the right column of the Operating Agreement</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 pt-5">
                <div className="space-y-4">
                  {(data.heroStats || []).map((stat: any, idx: number) => (
                    <div key={idx} className="p-4 border border-[#C5C4C2]/40 rounded-xl space-y-3 bg-neutral-50/50">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-neutral-800">Stat Card #{idx + 1}</span>
                        <div className="flex items-center gap-1">
                          <Button type="button" variant="ghost" size="icon" disabled={idx === 0} onClick={() => moveListItem('heroStats', idx, -1)} className="h-7 w-7 text-neutral-400 hover:text-black cursor-pointer"><ChevronUp className="h-4 w-4" /></Button>
                          <Button type="button" variant="ghost" size="icon" disabled={idx === (data.heroStats || []).length - 1} onClick={() => moveListItem('heroStats', idx, 1)} className="h-7 w-7 text-neutral-400 hover:text-black cursor-pointer"><ChevronDown className="h-4 w-4" /></Button>
                          <Button type="button" variant="ghost" size="icon" onClick={() => removeListItem('heroStats', idx)} className="h-7 w-7 text-red-500 hover:bg-red-50 cursor-pointer"><Trash2 className="h-3.5 w-3.5" /></Button>
                        </div>
                      </div>
                      <div className="grid gap-3 sm:grid-cols-2">
                        <div className="space-y-1.5">
                          <Label className="text-[11px] text-neutral-500 font-semibold uppercase">Stat Value</Label>
                          <Input
                            value={stat.value || ''}
                            onChange={(e) => updateListField('heroStats', idx, 'value', e.target.value)}
                            className="h-9 border-[#C5C4C2]"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <Label className="text-[11px] text-neutral-500 font-semibold uppercase">Stat Label / Desc</Label>
                          <Input
                            value={stat.label || ''}
                            onChange={(e) => updateListField('heroStats', idx, 'label', e.target.value)}
                            className="h-9 border-[#C5C4C2]"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                  <Button
                    type="button"
                    onClick={() => addListItem('heroStats', { value: '', label: '' })}
                    className="h-9 gap-1.5 border border-[#00b259]/30 bg-[#00b259]/5 text-[#00b259] hover:bg-[#00b259]/10 cursor-pointer font-bold text-xs rounded-lg"
                  >
                    <Plus className="h-3.5 w-3.5" /> Add Stat Card
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Card 3: What We Look For */}
            <Card className="shadow-xs border border-[#C5C4C2]/50">
              <CardHeader className="pb-3 border-b border-[#C5C4C2]/20">
                <CardTitle className="font-display text-neutral-850">"What We Look For" Cards</CardTitle>
                <CardDescription>Key signals/values required from senior builders (Supports SVG Icon codes)</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 pt-5">
                <div className="space-y-4">
                  {(data.fitSignals || []).map((item: any, idx: number) => {
                    const isCustomSvg = item.iconName?.startsWith('<svg')
                    const selectedIconValue = isCustomSvg ? '__custom_svg__' : (item.iconName || 'Award')

                  
  // ── FAQ List helpers ──
  const updateFaq = (idx: number, field: string, value: string) => {
    const list = [...(data.faqs || [])]
    list[idx] = { ...list[idx], [field]: value }
    setData({ ...data, faqs: list })
  }

  const removeFaq = (idx: number) => {
    const list = (data.faqs || []).filter((_: any, i: number) => i !== idx)
    setData({ ...data, faqs: list })
  }

  const addFaq = () => {
    setData({
      ...data,
      faqs: [
        ...(data.faqs || []),
        {
          question: 'New FAQ Question?',
          answer: 'The answer description goes here.'
        }
      ]
    })
  }

  const moveFaq = (idx: number, dir: -1 | 1) => {
    const list = [...(data.faqs || [])]
    const target = idx + dir
    if (target < 0 || target >= list.length) return
    ;[list[idx], list[target]] = [list[target], list[idx]]
    setData({ ...data, faqs: list })
  }

  return (
                      <div key={idx} className="p-4 border border-[#C5C4C2]/40 rounded-xl space-y-3 bg-neutral-50/50">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-neutral-800">Signal Card #{idx + 1}</span>
                          <div className="flex items-center gap-1">
                            <Button type="button" variant="ghost" size="icon" disabled={idx === 0} onClick={() => moveListItem('fitSignals', idx, -1)} className="h-7 w-7 text-neutral-400 hover:text-black cursor-pointer"><ChevronUp className="h-4 w-4" /></Button>
                            <Button type="button" variant="ghost" size="icon" disabled={idx === (data.fitSignals || []).length - 1} onClick={() => moveListItem('fitSignals', idx, 1)} className="h-7 w-7 text-neutral-400 hover:text-black cursor-pointer"><ChevronDown className="h-4 w-4" /></Button>
                            <Button type="button" variant="ghost" size="icon" onClick={() => removeListItem('fitSignals', idx)} className="h-7 w-7 text-red-500 hover:bg-red-50 cursor-pointer"><Trash2 className="h-3.5 w-3.5" /></Button>
                          </div>
                        </div>
                        <div className="grid gap-3 sm:grid-cols-3">
                          <div className="space-y-1.5">
                            <Label className="text-[11px] text-neutral-500 font-semibold uppercase">Icon type</Label>
                            <Select
                              value={selectedIconValue}
                              onValueChange={(val) => {
                                if (val === '__custom_svg__') {
                                  updateListField('fitSignals', idx, 'iconName', '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></svg>')
                                } else {
                                  updateListField('fitSignals', idx, 'iconName', val)
                                }
                              }}
                            >
                              <SelectTrigger className="h-9 border-[#C5C4C2]">
                                <SelectValue placeholder="Select Icon" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="__custom_svg__">✨ -- Custom SVG Code --</SelectItem>
                                {AVAILABLE_ICONS.map((icon) => (
                                  <SelectItem key={icon.value} value={icon.value}>{icon.label}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-1.5 sm:col-span-2">
                            <Label className="text-[11px] text-neutral-500 font-semibold uppercase">Signal Title</Label>
                            <Input
                              value={item.title || ''}
                              onChange={(e) => updateListField('fitSignals', idx, 'title', e.target.value)}
                              className="h-9 border-[#C5C4C2]"
                            />
                          </div>
                        </div>

                        {isCustomSvg && (
                          <div className="space-y-1.5">
                            <Label className="text-[11px] text-neutral-500 font-semibold uppercase">Custom SVG Icon Code</Label>
                            <Textarea
                              value={item.iconName || ''}
                              onChange={(e) => updateListField('fitSignals', idx, 'iconName', e.target.value)}
                              placeholder="Paste <svg>...</svg> code here"
                              className="font-mono text-xs min-h-[80px] border-[#C5C4C2]"
                            />
                          </div>
                        )}

                        <div className="space-y-1.5">
                          <Label className="text-[11px] text-neutral-500 font-semibold uppercase">Signal Description</Label>
                          <RichTextEditor
                            value={item.description || ''}
                            onChange={(val) => updateListField('fitSignals', idx, 'description', val)}
                          />
                        </div>
                      </div>
                    )
                  })}
                  <Button
                    type="button"
                    onClick={() => addListItem('fitSignals', { iconName: 'Award', title: '', description: '' })}
                    className="h-9 gap-1.5 border border-[#00b259]/30 bg-[#00b259]/5 text-[#00b259] hover:bg-[#00b259]/10 cursor-pointer font-bold text-xs rounded-lg"
                  >
                    <Plus className="h-3.5 w-3.5" /> Add Signal Card
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Card 4: What We Offer (Benefits) */}
            <Card className="shadow-xs border border-[#C5C4C2]/50">
              <CardHeader className="pb-3 border-b border-[#C5C4C2]/20">
                <CardTitle className="font-display text-neutral-850">"What We Offer" Benefits Cards</CardTitle>
                <CardDescription>Benefits, conditions and perks optimized for senior builders (Supports SVG Icon codes)</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 pt-5">
                <div className="space-y-4">
                  {(data.benefits || []).map((item: any, idx: number) => {
                    const isCustomSvg = item.iconName?.startsWith('<svg')
                    const selectedIconValue = isCustomSvg ? '__custom_svg__' : (item.iconName || 'Award')

                  
  // ── FAQ List helpers ──
  const updateFaq = (idx: number, field: string, value: string) => {
    const list = [...(data.faqs || [])]
    list[idx] = { ...list[idx], [field]: value }
    setData({ ...data, faqs: list })
  }

  const removeFaq = (idx: number) => {
    const list = (data.faqs || []).filter((_: any, i: number) => i !== idx)
    setData({ ...data, faqs: list })
  }

  const addFaq = () => {
    setData({
      ...data,
      faqs: [
        ...(data.faqs || []),
        {
          question: 'New FAQ Question?',
          answer: 'The answer description goes here.'
        }
      ]
    })
  }

  const moveFaq = (idx: number, dir: -1 | 1) => {
    const list = [...(data.faqs || [])]
    const target = idx + dir
    if (target < 0 || target >= list.length) return
    ;[list[idx], list[target]] = [list[target], list[idx]]
    setData({ ...data, faqs: list })
  }

  return (
                      <div key={idx} className="p-4 border border-[#C5C4C2]/40 rounded-xl space-y-3 bg-neutral-50/50">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-neutral-800">Benefit Card #{idx + 1}</span>
                          <div className="flex items-center gap-1">
                            <Button type="button" variant="ghost" size="icon" disabled={idx === 0} onClick={() => moveListItem('benefits', idx, -1)} className="h-7 w-7 text-neutral-400 hover:text-black cursor-pointer"><ChevronUp className="h-4 w-4" /></Button>
                            <Button type="button" variant="ghost" size="icon" disabled={idx === (data.benefits || []).length - 1} onClick={() => moveListItem('benefits', idx, 1)} className="h-7 w-7 text-neutral-400 hover:text-black cursor-pointer"><ChevronDown className="h-4 w-4" /></Button>
                            <Button type="button" variant="ghost" size="icon" onClick={() => removeListItem('benefits', idx)} className="h-7 w-7 text-red-500 hover:bg-red-50 cursor-pointer"><Trash2 className="h-3.5 w-3.5" /></Button>
                          </div>
                        </div>
                        <div className="grid gap-3 sm:grid-cols-3">
                          <div className="space-y-1.5">
                            <Label className="text-[11px] text-neutral-500 font-semibold uppercase">Icon type</Label>
                            <Select
                              value={selectedIconValue}
                              onValueChange={(val) => {
                                if (val === '__custom_svg__') {
                                  updateListField('benefits', idx, 'iconName', '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></svg>')
                                } else {
                                  updateListField('benefits', idx, 'iconName', val)
                                }
                              }}
                            >
                              <SelectTrigger className="h-9 border-[#C5C4C2]">
                                <SelectValue placeholder="Select Icon" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="__custom_svg__">✨ -- Custom SVG Code --</SelectItem>
                                {AVAILABLE_ICONS.map((icon) => (
                                  <SelectItem key={icon.value} value={icon.value}>{icon.label}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-1.5 sm:col-span-2">
                            <Label className="text-[11px] text-neutral-500 font-semibold uppercase">Benefit Title</Label>
                            <Input
                              value={item.title || ''}
                              onChange={(e) => updateListField('benefits', idx, 'title', e.target.value)}
                              className="h-9 border-[#C5C4C2]"
                            />
                          </div>
                        </div>

                        {isCustomSvg && (
                          <div className="space-y-1.5">
                            <Label className="text-[11px] text-neutral-500 font-semibold uppercase">Custom SVG Icon Code</Label>
                            <Textarea
                              value={item.iconName || ''}
                              onChange={(e) => updateListField('benefits', idx, 'iconName', e.target.value)}
                              placeholder="Paste <svg>...</svg> code here"
                              className="font-mono text-xs min-h-[80px] border-[#C5C4C2]"
                            />
                          </div>
                        )}

                        <div className="space-y-1.5">
                          <Label className="text-[11px] text-neutral-500 font-semibold uppercase">Benefit Description</Label>
                          <RichTextEditor
                            value={item.description || ''}
                            onChange={(val) => updateListField('benefits', idx, 'description', val)}
                          />
                        </div>
                      </div>
                    )
                  })}
                  <Button
                    type="button"
                    onClick={() => addListItem('benefits', { iconName: 'Award', title: '', description: '' })}
                    className="h-9 gap-1.5 border border-[#00b259]/30 bg-[#00b259]/5 text-[#00b259] hover:bg-[#00b259]/10 cursor-pointer font-bold text-xs rounded-lg"
                  >
                    <Plus className="h-3.5 w-3.5" /> Add Benefit Card
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Card 5: How We Hire Steps */}
            <Card className="shadow-xs border border-[#C5C4C2]/50">
              <CardHeader className="pb-3 border-b border-[#C5C4C2]/20">
                <CardTitle className="font-display text-neutral-850">"How We Hire" Steps</CardTitle>
                <CardDescription>Sequential phases in candidate application and evaluation</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 pt-5">
                <div className="space-y-4">
                  {(data.hiringSteps || []).map((step: any, idx: number) => (
                    <div key={idx} className="p-4 border border-[#C5C4C2]/40 rounded-xl space-y-3 bg-neutral-50/50">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-neutral-800">Step #{idx + 1}</span>
                        <div className="flex items-center gap-1">
                          <Button type="button" variant="ghost" size="icon" disabled={idx === 0} onClick={() => moveListItem('hiringSteps', idx, -1)} className="h-7 w-7 text-neutral-400 hover:text-black cursor-pointer"><ChevronUp className="h-4 w-4" /></Button>
                          <Button type="button" variant="ghost" size="icon" disabled={idx === (data.hiringSteps || []).length - 1} onClick={() => moveListItem('hiringSteps', idx, 1)} className="h-7 w-7 text-neutral-400 hover:text-black cursor-pointer"><ChevronDown className="h-4 w-4" /></Button>
                          <Button type="button" variant="ghost" size="icon" onClick={() => removeListItem('hiringSteps', idx)} className="h-7 w-7 text-red-500 hover:bg-red-50 cursor-pointer"><Trash2 className="h-3.5 w-3.5" /></Button>
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-[11px] text-neutral-500 font-semibold uppercase">Step Title</Label>
                        <Input
                          value={step.title || ''}
                          onChange={(e) => updateListField('hiringSteps', idx, 'title', e.target.value)}
                          className="h-9 border-[#C5C4C2]"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-[11px] text-neutral-500 font-semibold uppercase">Step Description</Label>
                        <RichTextEditor
                          value={step.description || ''}
                          onChange={(val) => updateListField('hiringSteps', idx, 'description', val)}
                        />
                      </div>
                    </div>
                  ))}
                  <Button
                    type="button"
                    onClick={() => addListItem('hiringSteps', { title: '', description: '' })}
                    className="h-9 gap-1.5 border border-[#00b259]/30 bg-[#00b259]/5 text-[#00b259] hover:bg-[#00b259]/10 cursor-pointer font-bold text-xs rounded-lg"
                  >
                    <Plus className="h-3.5 w-3.5" /> Add Step
                  </Button>
                </div>
              </CardContent>
            </Card>

          </form>
        </div>

        {/* Right Column: SEO Snippet & Operations settings */}
        <div className="space-y-6">

          {/* Card 3.5: FAQ Section Builder */}
          <Card className="shadow-xs border border-[#C5C4C2]/50">
            <CardHeader className="pb-3 border-b border-[#C5C4C2]/20">
              <CardTitle className="font-display text-neutral-850">Frequently Asked Questions (FAQ) Manager</CardTitle>
              <CardDescription className="text-xs">
                Manage collapsible Q&A accordions. Google and AI Answer Engines read this metadata directly.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5 pt-5">
              {(data.faqs || []).map((faq: any, idx: number) => (
                <div key={idx} className="p-4 bg-white border border-[#C5C4C2]/60 rounded-xl space-y-4 shadow-sm hover:border-[#00b259]/50 transition-colors">
                  <div className="flex items-center justify-between border-b border-[#C5C4C2]/20 pb-2">
                    <span className="text-xs font-bold text-neutral-800">FAQ #{idx + 1}</span>
                    <div className="flex items-center gap-1">
                      <Button type="button" variant="ghost" size="icon" disabled={idx === 0} onClick={() => moveFaq(idx, -1)} className="h-7 w-7 text-neutral-400 hover:text-black cursor-pointer"><ChevronUp className="h-4 w-4" /></Button>
                      <Button type="button" variant="ghost" size="icon" disabled={idx === (data.faqs || []).length - 1} onClick={() => moveFaq(idx, 1)} className="h-7 w-7 text-neutral-400 hover:text-black cursor-pointer"><ChevronDown className="h-4 w-4" /></Button>
                      <Button type="button" variant="ghost" size="icon" onClick={() => removeFaq(idx)} className="h-7 w-7 text-red-500 hover:bg-red-50 cursor-pointer"><Trash2 className="h-3.5 w-3.5" /></Button>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-[10px] text-neutral-400 uppercase font-black">Question</Label>
                    <Input
                      value={faq.question || ''}
                      onChange={(e) => updateFaq(idx, 'question', e.target.value)}
                      placeholder="e.g. Question description"
                      className="h-9 border-[#C5C4C2]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-[10px] text-neutral-400 uppercase font-black">Answer</Label>
                    <Textarea
                      value={faq.answer || ''}
                      onChange={(e) => updateFaq(idx, 'answer', e.target.value)}
                      placeholder="e.g. Answer details"
                      className="h-20 border-[#C5C4C2] resize-none"
                    />
                  </div>
                </div>
              ))}

              <Button
                type="button"
                onClick={addFaq}
                className="h-9 gap-1.5 border border-[#00b259]/30 bg-[#00b259]/5 text-[#00b259] hover:bg-[#00b259]/10 cursor-pointer font-bold text-xs rounded-lg animate-in"
              >
                <Plus className="h-3.5 w-3.5" /> Add New FAQ Item
              </Button>
            </CardContent>
          </Card>

          {/* Card: SEO settings */}
          <Card className="shadow-xs border border-[#C5C4C2]/50">
            <CardHeader className="pb-3 border-b border-[#C5C4C2]/20 flex flex-row items-center justify-between">
              <div>
                <CardTitle className="font-display text-neutral-850">SEO Metadata Settings</CardTitle>
                <CardDescription>Search engine appearance & search results preview</CardDescription>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => setShowSeoEdit(!showSeoEdit)}
                className="h-8 w-8 text-neutral-400 hover:text-black cursor-pointer rounded-lg border border-[#C5C4C2]/40 bg-neutral-50/50"
              >
                <Settings className="h-4 w-4 animate-spin-slow" />
              </Button>
            </CardHeader>
            <CardContent className="pt-5 space-y-4">
              {showSeoEdit ? (
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <Label className="text-xs font-semibold">Meta SEO Title</Label>
                    <Input
                      value={data.seoTitle || ''}
                      onChange={(e) => setData({ ...data, seoTitle: e.target.value })}
                      placeholder="Title shown on tab & search results"
                      className="h-10 border-[#C5C4C2]"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs font-semibold">Meta SEO Description</Label>
                    <Textarea
                      value={data.seoDesc || ''}
                      onChange={(e) => setData({ ...data, seoDesc: e.target.value })}
                      placeholder="Brief excerpt shown under Title in search indexing"
                      className="min-h-[100px] border-[#C5C4C2]"
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center justify-between pb-1">
                    <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Search Snippet Preview</span>
                    <div className="flex items-center bg-neutral-100 rounded-lg p-0.5 border border-[#C5C4C2]/50">
                      <Button
                        type="button"
                        onClick={() => setPreviewMode('desktop')}
                        className={cn(
                          'h-6 px-2 text-[10px] font-bold rounded-md cursor-pointer',
                          previewMode === 'desktop' ? 'bg-white text-black shadow-xs' : 'text-neutral-500 hover:text-black bg-transparent'
                        )}
                      >
                        <Laptop className="h-3 w-3 mr-1" /> Desktop
                      </Button>
                      <Button
                        type="button"
                        onClick={() => setPreviewMode('mobile')}
                        className={cn(
                          'h-6 px-2 text-[10px] font-bold rounded-md cursor-pointer',
                          previewMode === 'mobile' ? 'bg-white text-black shadow-xs' : 'text-neutral-500 hover:text-black bg-transparent'
                        )}
                      >
                        <Smartphone className="h-3 w-3 mr-1" /> Mobile
                      </Button>
                    </div>
                  </div>

                  {previewMode === 'desktop' ? (
                    <div className="p-4 border border-[#C5C4C2]/40 rounded-xl bg-white space-y-1 font-sans text-left max-w-full overflow-hidden">
                      <div className="flex items-center gap-1 text-[12px] text-[#202124]">
                        <span className="flex items-center justify-center size-4 rounded-full bg-neutral-100 text-[10px] border border-neutral-200">🤖</span>
                        <span className="truncate">aigreentick.com &gt; careers</span>
                      </div>
                      <h4 className="text-[20px] text-[#1a0dab] font-normal hover:underline leading-tight truncate">
                        {data.seoTitle || initialData.seoTitle}
                      </h4>
                      <p className="text-[14px] text-[#4d5156] leading-relaxed line-clamp-2">
                        {data.seoDesc || initialData.seoDesc}
                      </p>
                    </div>
                  ) : (
                    <div className="p-4 border border-[#C5C4C2]/40 rounded-xl bg-white space-y-1 font-sans text-left max-w-[340px] mx-auto overflow-hidden">
                      <div className="flex items-center gap-1.5 text-[12px] text-[#202124]">
                        <span className="flex items-center justify-center size-4 rounded-full bg-neutral-100 text-[9px]">🤖</span>
                        <div className="flex flex-col leading-none">
                          <span className="font-bold text-[10px]">AI Greentick</span>
                          <span className="text-[9px] text-neutral-400">aigreentick.com</span>
                        </div>
                      </div>
                      <h4 className="text-[16px] text-[#1558d6] font-normal hover:underline leading-tight pt-1">
                        {data.seoTitle || initialData.seoTitle}
                      </h4>
                      <p className="text-[12px] text-[#3c4043] leading-relaxed line-clamp-3">
                        {data.seoDesc || initialData.seoDesc}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
