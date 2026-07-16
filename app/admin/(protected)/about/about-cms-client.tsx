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
import { RichTextEditor } from '@/components/ui/rich-text-editor'
import { AeoChecklist } from '@/components/admin/aeo-checklist'
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
  Smartphone,
  Globe
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface AboutCmsClientProps {
  initialData: any
}

export default function AboutCmsClient({ initialData }: AboutCmsClientProps) {
  const router = useRouter()
  const [data, setData] = useState(() => {
    const defaultBanner = {
      badgeText: 'About Us',
      heading: "We're building the infrastructure for WhatsApp-first businesses",
      description: "AIGreenTick started with one belief: WhatsApp is the most powerful business communication channel in India. We built the platform that makes it enterprise-ready.",
      buttonText: 'Read more',
      buttonLink: '#',
      imageUrl: 'https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/about-us/image-44.png',
      stats: [
        { icon: 'Users', value: '500+', description: 'Trusted Brands' },
        { icon: 'Sparkles', value: '10M+', description: 'Messages Delivered' },
        { icon: 'Star', value: '98%', description: 'Message Open Rate' },
        { icon: 'Clock', value: '24/7', description: 'Automated Support' }
      ]
    }
    return {
      ...initialData,
      bannerSection: {
        ...defaultBanner,
        ...initialData?.bannerSection,
        stats: initialData?.bannerSection?.stats || defaultBanner.stats
      }
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
      const result = await updateSiteSectionAction('about_page', data)
      if (result?.error) {
        setError(result.error)
        showStatus('error', result.error)
      } else {
        showStatus('success', 'About page saved successfully!')
        router.refresh()
      }
    } catch (err: any) {
      console.error('Error saving about page:', err)
      const msg = err.message || 'An unexpected error occurred.'
      setError(msg)
      showStatus('error', msg)
    } finally {
      setIsSubmitting(false)
    }
  }

  // ── Banner stats helpers ──
  const updateBannerStat = (idx: number, field: string, value: string) => {
    const stats = [...(data.bannerSection?.stats || [])]
    stats[idx] = { ...stats[idx], [field]: value }
    setData({
      ...data,
      bannerSection: { ...data.bannerSection, stats }
    })
  }

  const removeBannerStat = (idx: number) => {
    const stats = (data.bannerSection?.stats || []).filter((_: any, i: number) => i !== idx)
    setData({
      ...data,
      bannerSection: { ...data.bannerSection, stats }
    })
  }

  const addBannerStat = () => {
    const stats = [...(data.bannerSection?.stats || []), { icon: 'HelpCircle', value: '', description: '' }]
    setData({
      ...data,
      bannerSection: { ...data.bannerSection, stats }
    })
  }

  const moveBannerStat = (idx: number, dir: -1 | 1) => {
    const stats = [...(data.bannerSection?.stats || [])]
    const target = idx + dir
    if (target < 0 || target >= stats.length) return
    ;[stats[idx], stats[target]] = [stats[target], stats[idx]]
    setData({
      ...data,
      bannerSection: { ...data.bannerSection, stats }
    })
  }

  // ── Problem features helpers ──
  const updateProblemFeature = (idx: number, field: string, value: string) => {
    const features = [...(data.problemSection?.features || [])]
    features[idx] = { ...features[idx], [field]: value }
    setData({
      ...data,
      problemSection: { ...data.problemSection, features }
    })
  }

  const removeProblemFeature = (idx: number) => {
    const features = (data.problemSection?.features || []).filter((_: any, i: number) => i !== idx)
    setData({
      ...data,
      problemSection: { ...data.problemSection, features }
    })
  }

  const addProblemFeature = () => {
    const features = [...(data.problemSection?.features || []), { title: '', description: '' }]
    setData({
      ...data,
      problemSection: { ...data.problemSection, features }
    })
  }

  const moveProblemFeature = (idx: number, dir: -1 | 1) => {
    const features = [...(data.problemSection?.features || [])]
    const target = idx + dir
    if (target < 0 || target >= features.length) return
    ;[features[idx], features[target]] = [features[target], features[idx]]
    setData({
      ...data,
      problemSection: { ...data.problemSection, features }
    })
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
    <div className="space-y-6 max-w-6xl mx-auto pb-12 font-sans text-black">
      {/* Toast Notification Banner */}
      {statusMsg && (
        <div
          className={`fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-lg shadow-xl border text-sm font-medium transition-all duration-300 ${
            statusMsg.type === 'success'
              ? 'bg-white text-[#00b259] border-[#00b259]/25 shadow-[#00b259]/10'
              : 'bg-white text-red-600 border-red-200'
          }`}
        >
          {statusMsg.type === 'success' ? (
            <Check className="h-4 w-4 shrink-0 text-[#00b259]" />
          ) : (
            <X className="h-4 w-4 shrink-0 text-red-500" />
          )}
          <span>{statusMsg.text}</span>
        </div>
      )}

      {/* Header Bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-[#C5C4C2]/50 pb-5">
        <div className="flex items-center gap-4">
          <Link
            href="/admin"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#C5C4C2]/50 bg-background hover:bg-neutral-100 text-neutral-500 hover:text-black transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-neutral-800 font-display">About Page CMS</h2>
            <p className="text-neutral-500 text-xs font-medium mt-1">Manage the story, mission statement, compliance notes, and SEO for the /about page.</p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Link
            href="/about"
            target="_blank"
            className="flex items-center gap-1.5 text-xs text-neutral-600 border border-[#C5C4C2] bg-white rounded-lg px-3.5 py-2 hover:bg-neutral-50 font-bold transition-all shadow-xs"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            View Live Page
          </Link>
        </div>
      </div>

      <form onSubmit={handleSave} className="grid gap-6 lg:grid-cols-3">
        {/* Left Columns (Main Contents & SEO Settings) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Card 0: Banner / Hero Details */}
          <Card className="shadow-xs border border-[#C5C4C2]/50">
            <CardHeader className="pb-3 border-b border-[#C5C4C2]/20">
              <CardTitle className="font-display text-neutral-850">About Us Page Banner / Hero</CardTitle>
              <CardDescription className="text-xs">
                Configure the main top banner badge, heading, description, button, and banner image.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5 pt-5">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold">Banner Badge Text</Label>
                  <Input
                    value={data.bannerSection?.badgeText || ''}
                    onChange={(e) => setData({
                      ...data,
                      bannerSection: { ...(data.bannerSection || {}), badgeText: e.target.value }
                    })}
                    className="h-10 border-[#C5C4C2] text-black"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold">Banner Image URL</Label>
                  <Input
                    value={data.bannerSection?.imageUrl || ''}
                    onChange={(e) => setData({
                      ...data,
                      bannerSection: { ...(data.bannerSection || {}), imageUrl: e.target.value }
                    })}
                    className="h-10 border-[#C5C4C2] text-black"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">Banner Main Heading</Label>
                <Input
                  value={data.bannerSection?.heading || ''}
                  onChange={(e) => setData({
                    ...data,
                    bannerSection: { ...(data.bannerSection || {}), heading: e.target.value }
                  })}
                  className="h-10 border-[#C5C4C2] text-black"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">Banner Subtitle / Description</Label>
                <Textarea
                  value={data.bannerSection?.description || ''}
                  onChange={(e) => setData({
                    ...data,
                    bannerSection: { ...(data.bannerSection || {}), description: e.target.value }
                  })}
                  className="h-20 resize-none border-[#C5C4C2] text-black"
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold">Banner Button Text</Label>
                  <Input
                    value={data.bannerSection?.buttonText || ''}
                    onChange={(e) => setData({
                      ...data,
                      bannerSection: { ...(data.bannerSection || {}), buttonText: e.target.value }
                    })}
                    className="h-10 border-[#C5C4C2] text-black"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold">Banner Button Link</Label>
                  <Input
                    value={data.bannerSection?.buttonLink || ''}
                    onChange={(e) => setData({
                      ...data,
                      bannerSection: { ...(data.bannerSection || {}), buttonLink: e.target.value }
                    })}
                    className="h-10 border-[#C5C4C2] text-black"
                  />
                </div>
              </div>

              {/* Banner Stats List */}
              <div className="space-y-4 border-t border-[#C5C4C2]/30 pt-4">
                <span className="text-xs font-bold text-neutral-600">Banner Stats (4 Items displayed in banner overlapping card)</span>
                {(data.bannerSection?.stats || []).map((stat: any, idx: number) => (
                  <div key={idx} className="p-4 bg-white border border-[#C5C4C2]/60 rounded-xl space-y-3 shadow-xs hover:border-[#00b259]/50 transition-colors text-black">
                    <div className="flex items-center justify-between border-b border-[#C5C4C2]/20 pb-2">
                      <span className="text-xs font-bold text-neutral-800">Stat #{idx + 1}: {stat.value || 'No value'}</span>
                      <div className="flex items-center gap-1">
                        <Button type="button" variant="ghost" size="icon" disabled={idx === 0} onClick={() => moveBannerStat(idx, -1)} className="h-7 w-7 text-neutral-400 hover:text-black cursor-pointer"><ChevronUp className="h-4 w-4" /></Button>
                        <Button type="button" variant="ghost" size="icon" disabled={idx === (data.bannerSection?.stats || []).length - 1} onClick={() => moveBannerStat(idx, 1)} className="h-7 w-7 text-neutral-400 hover:text-black cursor-pointer"><ChevronDown className="h-4 w-4" /></Button>
                        <Button type="button" variant="ghost" size="icon" onClick={() => removeBannerStat(idx)} className="h-7 w-7 text-red-500 hover:bg-red-50 cursor-pointer"><Trash2 className="h-3.5 w-3.5" /></Button>
                      </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-1.5">
                        <Label className="text-[11px] text-neutral-500 font-semibold uppercase">Stat Value</Label>
                        <Input
                          value={stat.value || ''}
                          onChange={(e) => updateBannerStat(idx, 'value', e.target.value)}
                          placeholder="e.g. 500+"
                          className="h-9 border-[#C5C4C2] text-black"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-[11px] text-neutral-500 font-semibold uppercase">Icon Name (Lucide)</Label>
                        <select
                          value={stat.icon && stat.icon.trim().startsWith('<svg') ? 'custom' : (stat.icon || 'Users')}
                          onChange={(e) => {
                            if (e.target.value === 'custom') {
                              updateBannerStat(idx, 'icon', '<svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>')
                            } else {
                              updateBannerStat(idx, 'icon', e.target.value)
                            }
                          }}
                          className="w-full bg-background h-9 text-xs border border-[#C5C4C2] rounded px-2 outline-none text-neutral-800"
                        >
                          <option value="Users">Users (Trusted Brands)</option>
                          <option value="Sparkles">Sparkles (Messages Delivered)</option>
                          <option value="Star">Star (Message Open Rate)</option>
                          <option value="Clock">Clock (Automated Support)</option>
                          <option value="Award">Award</option>
                          <option value="Shield">Shield</option>
                          <option value="Globe">Globe</option>
                          <option value="HelpCircle">Help Circle</option>
                          <option value="custom">-- Custom SVG Code --</option>
                        </select>
                      </div>
                    </div>
                    {stat.icon && stat.icon.trim().startsWith('<svg') && (
                      <div className="space-y-1">
                        <Label className="text-[10px] text-amber-700 font-bold uppercase">Custom SVG Icon Code</Label>
                        <Textarea
                          value={stat.icon}
                          onChange={(e) => updateBannerStat(idx, 'icon', e.target.value)}
                          placeholder="Paste raw <svg>...</svg> here"
                          className="bg-background min-h-[60px] font-mono text-[10px] border-[#C5C4C2]"
                        />
                      </div>
                    )}
                    <div className="space-y-1.5">
                      <Label className="text-[11px] text-neutral-500 font-semibold uppercase">Description / Label</Label>
                      <Input
                        value={stat.description || ''}
                        onChange={(e) => updateBannerStat(idx, 'description', e.target.value)}
                        placeholder="e.g. Trusted Brands"
                        className="h-9 border-[#C5C4C2] text-black"
                      />
                    </div>
                  </div>
                ))}
                <Button
                  type="button"
                  onClick={addBannerStat}
                  className="h-9 gap-1.5 border border-[#00b259]/30 bg-[#00b259]/5 text-[#00b259] hover:bg-[#00b259]/10 cursor-pointer font-bold text-xs rounded-lg"
                >
                  <Plus className="h-3.5 w-3.5" /> Add Stat Item
                </Button>
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

              {/* Search engine visibility */}
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
                title={data.seoTitle || data.bannerSection?.heading || ''}
                description={data.seoDesc || ''}
                aiSnapshot={data.aiSnapshot || ''}
                faqCount={(data.faqs || []).length}
                className="mt-3"
              />
            </CardContent>
          </Card>

          {/* Card 1: Mission & Hero details */}
          <Card className="shadow-xs border border-[#C5C4C2]/50">
            <CardHeader className="pb-3 border-b border-[#C5C4C2]/20">
              <CardTitle className="font-display text-neutral-850">Our Mission Statement</CardTitle>
              <CardDescription className="text-xs">
                Configure the primary mission details, image, and introductory text block.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5 pt-5">
              {error && (
                <div className="rounded-lg bg-destructive/15 p-3.5 text-sm text-destructive font-medium border border-destructive/20">
                  {error}
                </div>
              )}

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold">Admin Page Title</Label>
                  <Input
                    required
                    value={data.pageTitle || ''}
                    onChange={(e) => setData({ ...data, pageTitle: e.target.value })}
                    className="h-10 border-[#C5C4C2]"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold">Mission Section Badge</Label>
                  <Input
                    required
                    value={data.missionSection?.badgeText || ''}
                    onChange={(e) => setData({
                      ...data,
                      missionSection: { ...data.missionSection, badgeText: e.target.value }
                    })}
                    className="h-10 border-[#C5C4C2]"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">Mission Heading</Label>
                <Input
                  required
                  value={data.missionSection?.heading || ''}
                  onChange={(e) => setData({
                    ...data,
                    missionSection: { ...data.missionSection, heading: e.target.value }
                  })}
                  className="h-10 border-[#C5C4C2]"
                />
              </div>

              {/* WYSIWYG Editor for Description */}
              <div className="space-y-2">
                <Label className="text-xs font-semibold">Mission Description (HTML Supported)</Label>
                <RichTextEditor
                  value={data.missionSection?.description || ''}
                  onChange={(val) => setData((prev: any) => ({
                    ...prev,
                    missionSection: { ...prev.missionSection, description: val }
                  }))}
                  minHeight="200px"
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold">Featured Mission Image URL</Label>
                  <Input
                    value={data.missionSection?.imageUrl || ''}
                    onChange={(e) => setData({
                      ...data,
                      missionSection: { ...data.missionSection, imageUrl: e.target.value }
                    })}
                    className="h-10 border-[#C5C4C2]"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold">Story Block Heading</Label>
                  <Input
                    value={data.missionSection?.contentHeading || ''}
                    onChange={(e) => setData({
                      ...data,
                      missionSection: { ...data.missionSection, contentHeading: e.target.value }
                    })}
                    className="h-10 border-[#C5C4C2]"
                  />
                </div>
              </div>

              {/* Story Paragraphs */}
              <div className="space-y-3 border-t border-[#C5C4C2]/30 pt-4">
                <span className="text-xs font-bold text-neutral-600">Company Story Paragraphs</span>
                <div className="space-y-3">
                  <div className="space-y-1">
                    <Label className="text-[10px] text-neutral-400 font-bold uppercase">Paragraph 1</Label>
                    <Textarea
                      value={data.missionSection?.paragraph1 || ''}
                      onChange={(e) => setData({
                        ...data,
                        missionSection: { ...data.missionSection, paragraph1: e.target.value }
                      })}
                      className="h-16 resize-none border-[#C5C4C2]"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-[10px] text-neutral-400 font-bold uppercase">Paragraph 2</Label>
                    <Textarea
                      value={data.missionSection?.paragraph2 || ''}
                      onChange={(e) => setData({
                        ...data,
                        missionSection: { ...data.missionSection, paragraph2: e.target.value }
                      })}
                      className="h-16 resize-none border-[#C5C4C2]"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-[10px] text-neutral-400 font-bold uppercase">Paragraph 3</Label>
                    <Textarea
                      value={data.missionSection?.paragraph3 || ''}
                      onChange={(e) => setData({
                        ...data,
                        missionSection: { ...data.missionSection, paragraph3: e.target.value }
                      })}
                      className="h-16 resize-none border-[#C5C4C2]"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-[10px] text-neutral-400 font-bold uppercase">Paragraph 4</Label>
                    <Textarea
                      value={data.missionSection?.paragraph4 || ''}
                      onChange={(e) => setData({
                        ...data,
                        missionSection: { ...data.missionSection, paragraph4: e.target.value }
                      })}
                      className="h-16 resize-none border-[#C5C4C2]"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Card 2: The Problem We Solve */}
          <Card className="shadow-xs border border-[#C5C4C2]/50">
            <CardHeader className="pb-3 border-b border-[#C5C4C2]/20">
              <CardTitle className="font-display text-neutral-850">The Problem We Solve Section</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5 pt-5">
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold">Section Badge</Label>
                  <Input
                    value={data.problemSection?.badge || ''}
                    onChange={(e) => setData({
                      ...data,
                      problemSection: { ...data.problemSection, badge: e.target.value }
                    })}
                    className="h-10 border-[#C5C4C2]"
                  />
                </div>
                <div className="space-y-1.5 md:col-span-2">
                  <Label className="text-xs font-semibold">Section Main Heading</Label>
                  <Input
                    value={data.problemSection?.heading || ''}
                    onChange={(e) => setData({
                      ...data,
                      problemSection: { ...data.problemSection, heading: e.target.value }
                    })}
                    className="h-10 border-[#C5C4C2]"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">Section Sub-heading</Label>
                <Input
                  value={data.problemSection?.subheading || ''}
                  onChange={(e) => setData({
                    ...data,
                    problemSection: { ...data.problemSection, subheading: e.target.value }
                  })}
                  className="h-10 border-[#C5C4C2]"
                />
              </div>

              {/* Problem Features */}
              <div className="space-y-4 border-t border-[#C5C4C2]/30 pt-4">
                <span className="text-xs font-bold text-neutral-600">Problem Feature Blocks</span>
                {(data.problemSection?.features || []).map((feat: any, idx: number) => (
                  <div key={idx} className="p-4 bg-white border border-[#C5C4C2]/60 rounded-xl space-y-3 shadow-xs hover:border-[#00b259]/50 transition-colors">
                    <div className="flex items-center justify-between border-b border-[#C5C4C2]/20 pb-2">
                      <span className="text-xs font-bold text-neutral-800">Feature #{idx + 1}: {feat.title || 'Untitled'}</span>
                      <div className="flex items-center gap-1">
                        <Button type="button" variant="ghost" size="icon" disabled={idx === 0} onClick={() => moveProblemFeature(idx, -1)} className="h-7 w-7 text-neutral-400 hover:text-black cursor-pointer"><ChevronUp className="h-4 w-4" /></Button>
                        <Button type="button" variant="ghost" size="icon" disabled={idx === (data.problemSection?.features || []).length - 1} onClick={() => moveProblemFeature(idx, 1)} className="h-7 w-7 text-neutral-400 hover:text-black cursor-pointer"><ChevronDown className="h-4 w-4" /></Button>
                        <Button type="button" variant="ghost" size="icon" onClick={() => removeProblemFeature(idx)} className="h-7 w-7 text-red-500 hover:bg-red-50 cursor-pointer"><Trash2 className="h-3.5 w-3.5" /></Button>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <Label className="text-[11px] text-neutral-500 font-semibold uppercase">Feature Title</Label>
                      <Input
                        value={feat.title || ''}
                        onChange={(e) => updateProblemFeature(idx, 'title', e.target.value)}
                        className="h-9 border-[#C5C4C2]"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-[11px] text-neutral-500 font-semibold uppercase">Feature Description</Label>
                      <RichTextEditor
                        value={feat.description || ''}
                        onChange={(val) => updateProblemFeature(idx, 'description', val)}
                        minHeight="100px"
                      />
                    </div>
                  </div>
                ))}
                <Button
                  type="button"
                  onClick={addProblemFeature}
                  className="h-9 gap-1.5 border border-[#00b259]/30 bg-[#00b259]/5 text-[#00b259] hover:bg-[#00b259]/10 cursor-pointer font-bold text-xs rounded-lg"
                >
                  <Plus className="h-3.5 w-3.5" /> Add Problem Block
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Card 3: Why We Built This & Compliance */}
          <Card className="shadow-xs border border-[#C5C4C2]/50">
            <CardHeader className="pb-3 border-b border-[#C5C4C2]/20">
              <CardTitle className="font-display text-neutral-850">Why We Built This & Compliance Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5 pt-5">
              
              {/* Why built */}
              <div className="space-y-3 pb-4 border-b border-[#C5C4C2]/30">
                <span className="text-sm font-bold text-neutral-800">1. Why We Built AIGreenTick Section</span>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label className="text-xs">Section Badge</Label>
                    <Input
                      value={data.whySection?.badge || ''}
                      onChange={(e) => setData({
                        ...data,
                        whySection: { ...data.whySection, badge: e.target.value }
                      })}
                      className="h-10 border-[#C5C4C2]"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs">Section Heading</Label>
                    <Input
                      value={data.whySection?.heading || ''}
                      onChange={(e) => setData({
                        ...data,
                        whySection: { ...data.whySection, heading: e.target.value }
                      })}
                      className="h-10 border-[#C5C4C2]"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs">Section Body Description</Label>
                  <RichTextEditor
                    value={data.whySection?.description || ''}
                    onChange={(val) => setData({
                      ...data,
                      whySection: { ...data.whySection, description: val }
                    })}
                    minHeight="140px"
                  />
                </div>
              </div>

              {/* Meta Authorization */}
              <div className="space-y-3 pt-2">
                <span className="text-sm font-bold text-neutral-800">2. Meta BSP Authorization Compliance Block</span>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label className="text-xs">Compliance Badge</Label>
                    <Input
                      value={data.metaSection?.badge || ''}
                      onChange={(e) => setData({
                        ...data,
                        metaSection: { ...data.metaSection, badge: e.target.value }
                      })}
                      className="h-10 border-[#C5C4C2]"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs">Compliance Heading</Label>
                    <Input
                      value={data.metaSection?.heading || ''}
                      onChange={(e) => setData({
                        ...data,
                        metaSection: { ...data.metaSection, heading: e.target.value }
                      })}
                      className="h-10 border-[#C5C4C2]"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs">Compliance Body Description</Label>
                  <RichTextEditor
                    value={data.metaSection?.body || ''}
                    onChange={(val) => setData({
                      ...data,
                      metaSection: { ...data.metaSection, body: val }
                    })}
                    minHeight="140px"
                  />
                </div>
              </div>
            </CardContent>
          </Card>


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

          {/* Card 4: Search Engine Optimization */}
          <Card className="shadow-xs border border-[#C5C4C2]/50 overflow-hidden bg-gradient-to-b from-background to-neutral-50/20">
            <CardHeader className="bg-neutral-50/50 border-b border-[#C5C4C2]/50 pb-4 flex flex-row items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2 font-display">
                  <Globe className="h-5 w-5 text-[#00b259]" />
                  <span>SEO Optimization</span>
                </CardTitle>
                <CardDescription className="text-xs">
                  Configure search engine listing preview attributes.
                </CardDescription>
              </div>
              <div className="flex items-center gap-1.5 bg-background border border-[#C5C4C2]/50 rounded-lg p-1">
                <Button
                  type="button"
                  variant={previewMode === 'desktop' ? 'secondary' : 'ghost'}
                  size="sm"
                  onClick={() => setPreviewMode('desktop')}
                  className="h-8 px-2.5 cursor-pointer text-xs"
                >
                  <Laptop className="h-3.5 w-3.5 mr-1" />
                  Desktop
                </Button>
                <Button
                  type="button"
                  variant={previewMode === 'mobile' ? 'secondary' : 'ghost'}
                  size="sm"
                  onClick={() => setPreviewMode('mobile')}
                  className="h-8 px-2.5 cursor-pointer text-xs"
                >
                  <Smartphone className="h-3.5 w-3.5 mr-1" />
                  Mobile
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              {/* Google Listing Simulator */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">Live Search Preview</Label>
                  <button
                    type="button"
                    onClick={() => setShowSeoEdit(!showSeoEdit)}
                    className="text-xs text-[#00b259] font-bold hover:underline cursor-pointer"
                  >
                    {showSeoEdit ? 'Close Settings' : 'Edit Website SEO'}
                  </button>
                </div>
                <div className={cn(
                  "border rounded-xl bg-background p-4 shadow-inner text-left font-sans select-none border-dashed border-[#C5C4C2] transition-all duration-300",
                  previewMode === 'mobile' ? 'max-w-[360px] mx-auto' : 'w-full'
                )}>
                  <div className="flex items-center gap-1 text-[10px] text-neutral-400 mb-1">
                    <span>aigreentick.com</span>
                    <span>›</span>
                    <span className="truncate text-[#00b259]/80">{data.seoUrl?.replace('aigreentick.com/', '') || 'about'}</span>
                  </div>
                  <h3 className="text-lg font-medium text-[#1a0dab] hover:underline cursor-pointer leading-snug">
                    {data.seoTitle || data.pageTitle || 'About Us - AI Greentick'}
                  </h3>
                  <p className="text-xs text-neutral-600 mt-1 line-clamp-2 leading-relaxed">
                    {data.seoDesc || 'Learn about AI Greentick, our story, mission, and the team building modern...'}
                  </p>
                </div>
              </div>

              {/* SEO Editors */}
              {showSeoEdit && (
                <div className="space-y-4 border-t border-[#C5C4C2]/30 pt-4">
                  <div className="space-y-1">
                    <Label className="text-xs">Page Meta Title</Label>
                    <Input
                      value={data.seoTitle || ''}
                      onChange={(e) => setData({ ...data, seoTitle: e.target.value })}
                      className="h-10 border-[#C5C4C2] focus:border-[#00b259] focus:ring-1 focus:ring-[#00b259]/10"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs">Meta Description</Label>
                    <Textarea
                      value={data.seoDesc || ''}
                      onChange={(e) => setData({ ...data, seoDesc: e.target.value })}
                      className="h-16 resize-none border-[#C5C4C2] focus:border-[#00b259] focus:ring-1 focus:ring-[#00b259]/10"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs">URL Slug Path</Label>
                    <div className="flex items-center border border-[#C5C4C2] rounded-lg overflow-hidden focus-within:border-[#00b259] focus-within:ring-1 focus-within:ring-[#00b259]">
                      <span className="px-3 py-2 bg-neutral-50 border-r border-[#C5C4C2] text-xs text-neutral-400 select-none">aigreentick.com/</span>
                      <Input
                        value={data.seoUrl?.replace('aigreentick.com/', '') || ''}
                        onChange={(e) => setData({ ...data, seoUrl: `aigreentick.com/${e.target.value}` })}
                        className="border-0 focus:ring-0 focus-visible:ring-0 h-9"
                      />
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Sidebar Columns (Controls Panels) */}
        <div className="space-y-6">
          {/* Publish Settings */}
          <Card className="shadow-xs border border-[#C5C4C2]/50">
            <CardHeader className="pb-3 border-b border-[#C5C4C2]/20">
              <CardTitle className="flex items-center gap-2 font-display">
                <Settings className="h-4.5 w-4.5 text-[#00b259]" />
                <span>Publish Settings</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-xs font-bold pt-4">
              <div className="space-y-2">
                <Label htmlFor="visibility">Page Visibility Status</Label>
                <Select
                  value={data.visibility || 'visible'}
                  onValueChange={(val) => setData({ ...data, visibility: val })}
                >
                  <SelectTrigger id="visibility" className="h-10 border-[#C5C4C2]">
                    <SelectValue placeholder="Select Status" />
                  </SelectTrigger>
                  <SelectContent className="text-black bg-white">
                    <SelectItem value="visible">🟢 Visible (Live on Site)</SelectItem>
                    <SelectItem value="hidden">🟡 Hidden (Draft / Private)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2 border-t border-[#C5C4C2]/30 pt-4">
                <Label>Page Template</Label>
                <Select value="page.about">
                  <SelectTrigger className="h-10 border-[#C5C4C2]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="text-black bg-white">
                    <SelectItem value="page.about">page.about</SelectItem>
                    <SelectItem value="page.default">page.default</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Submit Buttons */}
              <div className="flex gap-3 border-t border-[#C5C4C2]/50 pt-4 text-xs font-bold">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1 cursor-pointer border-[#C5C4C2]"
                  onClick={() => router.push('/admin')}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1 cursor-pointer bg-[#00b259] hover:bg-[#009b4d] text-white"
                  disabled={isSubmitting}
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
            </CardContent>
          </Card>

          {/* Quick Page Info */}
          <Card className="shadow-xs border border-[#C5C4C2]/50">
            <CardHeader className="pb-2">
              <CardTitle className="font-display text-sm">Quick Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-xs">
              <div className="flex items-center justify-between py-1 border-b border-[#C5C4C2]/20">
                <span className="text-neutral-400">Current Status</span>
                <span className={cn(
                  "font-bold",
                  data.visibility === 'visible' ? "text-[#00b259]" : "text-neutral-500"
                )}>
                  {data.visibility === 'visible' ? 'Visible' : 'Hidden'}
                </span>
              </div>
              <div className="flex items-center justify-between py-1">
                <span className="text-neutral-400">Page Link</span>
                <Link href="/about" target="_blank" className="text-[#00b259] font-bold hover:underline">/about</Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </form>
    </div>
  )
}
