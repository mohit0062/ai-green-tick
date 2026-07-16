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
  Globe,
  Upload
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface IntegrationsCmsClientProps {
  initialData: any
}

export default function IntegrationsCmsClient({ initialData }: IntegrationsCmsClientProps) {
  const router = useRouter()
  const [data, setData] = useState(initialData)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [statusMsg, setStatusMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  // SEO Snippet Preview Mode
  const [previewMode, setPreviewMode] = useState<'desktop' | 'mobile'>('desktop')
  const [showSeoEdit, setShowSeoEdit] = useState(false)
  const [uploadingIdx, setUploadingIdx] = useState<number | null>(null)

  const showStatus = (type: 'success' | 'error', text: string) => {
    setStatusMsg({ type, text })
    setTimeout(() => setStatusMsg(null), 5000)
  }

  const handleSave = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const result = await updateSiteSectionAction('integrations_page', data)
      if (result?.error) {
        setError(result.error)
        showStatus('error', result.error)
      } else {
        showStatus('success', 'Integrations page saved successfully!')
        router.refresh()
      }
    } catch (err: any) {
      console.error('Error saving integrations page:', err)
      const msg = err.message || 'An unexpected error occurred.'
      setError(msg)
      showStatus('error', msg)
    } finally {
      setIsSubmitting(false)
    }
  }

  // ── Integration List helpers ──
  const updateIntegration = (idx: number, field: string, value: string) => {
    const list = [...(data.integrationsList || [])]
    list[idx] = { ...list[idx], [field]: value }
    setData({ ...data, integrationsList: list })
  }

  const removeIntegration = (idx: number) => {
    const list = (data.integrationsList || []).filter((_: any, i: number) => i !== idx)
    setData({ ...data, integrationsList: list })
  }

  const addIntegration = () => {
    setData({
      ...data,
      integrationsList: [
        ...(data.integrationsList || []),
        {
          id: 'custom-app',
          name: 'New Integration',
          category: 'crm',
          description: 'A brief description of this integration.',
          logoColor: 'bg-neutral-100 text-black border-neutral-200',
          logoSvg: '<svg class="size-8" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 1010 10A10 10 0 0012 2zm1 14.5h-2v-2h2v2zm0-4h-2v-5h2v5z"/></svg>'
        }
      ]
    })
  }

  const moveIntegration = (idx: number, dir: -1 | 1) => {
    const list = [...(data.integrationsList || [])]
    const target = idx + dir
    if (target < 0 || target >= list.length) return
    ;[list[idx], list[target]] = [list[target], list[idx]]
    setData({ ...data, integrationsList: list })
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

  const handleImageUpload = async (idx: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setUploadingIdx(idx)
      const reader = new FileReader()
      reader.onloadend = async () => {
        try {
          const base64Data = (reader.result as string).split(',')[1]
          const cleanName = `${Date.now()}-integration-${file.name.replace(/[^a-zA-Z0-9.]/g, '_')}`
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
            updateIntegration(idx, 'logoSvg', res.publicUrl)
            showStatus('success', 'Logo uploaded successfully!')
          } else if (res?.error) {
            showStatus('error', `Upload error: ${res.error}`)
          }
        } catch (err: any) {
          showStatus('error', `Upload failed: ${err.message || err}`)
        } finally {
          setUploadingIdx(null)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12 font-sans text-black select-none">
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
            <h2 className="text-2xl font-bold tracking-tight text-neutral-800 font-display">Integrations Page CMS</h2>
            <p className="text-neutral-500 text-xs font-medium mt-1">Manage the hero banner, integrations catalog list, CTA section, and page SEO metadata.</p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Link
            href="/integrations"
            target="_blank"
            className="flex items-center gap-1.5 text-xs text-neutral-600 border border-[#C5C4C2] bg-white rounded-lg px-3.5 py-2 hover:bg-neutral-50 font-bold transition-all shadow-xs"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            View Live Page
          </Link>
        </div>
      </div>

      <form onSubmit={handleSave} className="grid gap-6 lg:grid-cols-3">
        {/* Left Columns */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Card 1: Hero Info */}
          <Card className="shadow-xs border border-[#C5C4C2]/50">
            <CardHeader className="pb-3 border-b border-[#C5C4C2]/20">
              <CardTitle className="font-display text-neutral-850">Hero Header Banner</CardTitle>
              <CardDescription className="text-xs">
                Edit the badge text, main heading, and supporting description at the top.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5 pt-5">
              {error && (
                <div className="rounded-lg bg-destructive/15 p-3.5 text-sm text-destructive font-medium border border-destructive/20">
                  {error}
                </div>
              )}

              <div className="grid gap-4 md:grid-cols-3">
                <div className="md:col-span-1 space-y-2">
                  <Label htmlFor="heroBadge" className="text-sm font-semibold">Hero Badge Text</Label>
                  <Input
                    id="heroBadge"
                    required
                    value={data.hero?.badgeText || ''}
                    onChange={(e) => setData({ ...data, hero: { ...data.hero, badgeText: e.target.value } })}
                    className="h-10 border-[#C5C4C2] font-mono text-xs uppercase"
                  />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <Label htmlFor="heroHeading" className="text-sm font-semibold">Main Heading H1</Label>
                  <Input
                    id="heroHeading"
                    required
                    value={data.hero?.heading || ''}
                    onChange={(e) => setData({ ...data, hero: { ...data.hero, heading: e.target.value } })}
                    className="h-10 border-[#C5C4C2]"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="heroDescription" className="text-sm font-semibold">Hero Description Text</Label>
                <Textarea
                  id="heroDescription"
                  required
                  value={data.hero?.description || ''}
                  onChange={(e) => setData({ ...data, hero: { ...data.hero, description: e.target.value } })}
                  className="h-24 border-[#C5C4C2] resize-none"
                />
              </div>

              <div className="space-y-2 pt-2 border-t border-neutral-100">
                <Label htmlFor="aiSnapshot" className="text-sm font-semibold text-[#00b259]">AI Snapshot Direct Summary (AEO/AGO optimized)</Label>
                <Textarea
                  id="aiSnapshot"
                  required
                  value={data.aiSnapshot || ''}
                  onChange={(e) => setData({ ...data, aiSnapshot: e.target.value })}
                  placeholder="Summarize the page in 1-2 direct sentences for voice and search engines to cite..."
                  className="h-16 border-[#C5C4C2] resize-none"
                />
              </div>
            </CardContent>
          </Card>

          {/* Card 2: Custom Integrations CTA Section */}
          <Card className="shadow-xs border border-[#C5C4C2]/50">
            <CardHeader className="pb-3 border-b border-[#C5C4C2]/20">
              <CardTitle className="font-display text-neutral-850">Custom Connections CTA Banner</CardTitle>
              <CardDescription className="text-xs">
                Edit the custom integration pitch at the bottom of the page.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5 pt-5">
              <div className="grid gap-4 md:grid-cols-3">
                <div className="md:col-span-1 space-y-2">
                  <Label className="text-sm font-semibold">CTA Section Badge</Label>
                  <Input
                    value={data.customCta?.badgeText || ''}
                    onChange={(e) => setData({ ...data, customCta: { ...data.customCta, badgeText: e.target.value } })}
                    className="h-10 border-[#C5C4C2] font-mono text-xs uppercase"
                  />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <Label className="text-sm font-semibold">CTA Heading</Label>
                  <Input
                    value={data.customCta?.heading || ''}
                    onChange={(e) => setData({ ...data, customCta: { ...data.customCta, heading: e.target.value } })}
                    className="h-10 border-[#C5C4C2]"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-semibold">CTA Description Text</Label>
                <Textarea
                  value={data.customCta?.description || ''}
                  onChange={(e) => setData({ ...data, customCta: { ...data.customCta, description: e.target.value } })}
                  className="h-24 border-[#C5C4C2] resize-none"
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2 pt-2 border-t border-neutral-100">
                <div className="space-y-2">
                  <Label className="text-xs font-bold text-neutral-500">BUTTON 1 TEXT</Label>
                  <Input
                    value={data.customCta?.button1Text || ''}
                    onChange={(e) => setData({ ...data, customCta: { ...data.customCta, button1Text: e.target.value } })}
                    className="h-9 border-[#C5C4C2]"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-bold text-neutral-500">BUTTON 1 LINK URL</Label>
                  <Input
                    value={data.customCta?.button1Link || ''}
                    onChange={(e) => setData({ ...data, customCta: { ...data.customCta, button1Link: e.target.value } })}
                    className="h-9 border-[#C5C4C2]"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-bold text-neutral-500">BUTTON 2 TEXT</Label>
                  <Input
                    value={data.customCta?.button2Text || ''}
                    onChange={(e) => setData({ ...data, customCta: { ...data.customCta, button2Text: e.target.value } })}
                    className="h-9 border-[#C5C4C2]"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-bold text-neutral-500">BUTTON 2 LINK URL</Label>
                  <Input
                    value={data.customCta?.button2Link || ''}
                    onChange={(e) => setData({ ...data, customCta: { ...data.customCta, button2Link: e.target.value } })}
                    className="h-9 border-[#C5C4C2]"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Card 3: Integrations Catalog Cards */}
          <Card className="shadow-xs border border-[#C5C4C2]/50">
            <CardHeader className="pb-3 border-b border-[#C5C4C2]/20">
              <CardTitle className="font-display text-neutral-850">Integrations Catalog List</CardTitle>
              <CardDescription className="text-xs">
                Manage the individual app integrations displayed in the catalog directory.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5 pt-5">
              {(data.integrationsList || []).map((item: any, idx: number) => (
                <div key={idx} className="p-4 bg-white border border-[#C5C4C2]/60 rounded-xl space-y-4 shadow-sm hover:border-[#00b259]/50 transition-colors">
                  <div className="flex items-center justify-between border-b border-[#C5C4C2]/20 pb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-neutral-800">
                        App #{idx + 1}: {item.name || 'Untitled App'}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button type="button" variant="ghost" size="icon" disabled={idx === 0} onClick={() => moveIntegration(idx, -1)} className="h-7 w-7 text-neutral-400 hover:text-black cursor-pointer"><ChevronUp className="h-4 w-4" /></Button>
                      <Button type="button" variant="ghost" size="icon" disabled={idx === (data.integrationsList || []).length - 1} onClick={() => moveIntegration(idx, 1)} className="h-7 w-7 text-neutral-400 hover:text-black cursor-pointer"><ChevronDown className="h-4 w-4" /></Button>
                      <Button type="button" variant="ghost" size="icon" onClick={() => removeIntegration(idx)} className="h-7 w-7 text-red-500 hover:bg-red-50 cursor-pointer"><Trash2 className="h-3.5 w-3.5" /></Button>
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="space-y-1.5">
                      <Label className="text-[10px] text-neutral-400 uppercase font-black">App Name</Label>
                      <Input
                        value={item.name || ''}
                        onChange={(e) => updateIntegration(idx, 'name', e.target.value)}
                        placeholder="e.g. Shopify"
                        className="h-9 border-[#C5C4C2]"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-[10px] text-neutral-400 uppercase font-black">App ID / Slug</Label>
                      <Input
                        value={item.id || ''}
                        onChange={(e) => updateIntegration(idx, 'id', e.target.value)}
                        placeholder="e.g. shopify"
                        className="h-9 border-[#C5C4C2]"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-[10px] text-neutral-400 uppercase font-black">App Category</Label>
                      <Select
                        value={item.category || 'crm'}
                        onValueChange={(val) => updateIntegration(idx, 'category', val)}
                      >
                        <SelectTrigger className="h-9 border-[#C5C4C2]">
                          <SelectValue placeholder="Category" />
                        </SelectTrigger>
                        <SelectContent className="text-black bg-white">
                          <SelectItem value="crm">CRM</SelectItem>
                          <SelectItem value="ecommerce">E-Commerce</SelectItem>
                          <SelectItem value="payments">Payments</SelectItem>
                          <SelectItem value="automation">Automation</SelectItem>
                          <SelectItem value="support">Support</SelectItem>
                          <SelectItem value="marketing">Marketing</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-[10px] text-neutral-400 uppercase font-black">Description</Label>
                    <Textarea
                      value={item.description || ''}
                      onChange={(e) => updateIntegration(idx, 'description', e.target.value)}
                      placeholder="Explain what the integration accomplishes..."
                      className="h-16 border-[#C5C4C2] resize-none"
                    />
                  </div>

                  <div className="grid gap-4 md:grid-cols-3 pt-2 border-t border-neutral-50">
                    <div className="space-y-1.5">
                      <Label className="text-[10px] text-neutral-400 uppercase font-black">Setup Time</Label>
                      <Input
                        value={item.setupTime || ''}
                        onChange={(e) => updateIntegration(idx, 'setupTime', e.target.value)}
                        placeholder="e.g. 5 Mins"
                        className="h-9 border-[#C5C4C2]"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-[10px] text-neutral-400 uppercase font-black">Difficulty Level</Label>
                      <Select
                        value={item.difficulty || 'No-Code'}
                        onValueChange={(val) => updateIntegration(idx, 'difficulty', val)}
                      >
                        <SelectTrigger className="h-9 border-[#C5C4C2]">
                          <SelectValue placeholder="Difficulty" />
                        </SelectTrigger>
                        <SelectContent className="text-black bg-white">
                          <SelectItem value="No-Code">No-Code</SelectItem>
                          <SelectItem value="Low-Code">Low-Code</SelectItem>
                          <SelectItem value="Developer">Developer</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-[10px] text-neutral-400 uppercase font-black">Requirements</Label>
                      <Input
                        value={item.requirements || ''}
                        onChange={(e) => updateIntegration(idx, 'requirements', e.target.value)}
                        placeholder="e.g. Shopify Account"
                        className="h-9 border-[#C5C4C2]"
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-1.5">
                      <Label className="text-[10px] text-neutral-400 uppercase font-black">Tailwind Colors & Borders Classes</Label>
                      <Input
                        value={item.logoColor || ''}
                        onChange={(e) => updateIntegration(idx, 'logoColor', e.target.value)}
                        placeholder="bg-[#95bf47]/10 text-[#95bf47] border-[#95bf47]/20"
                        className="h-9 border-[#C5C4C2]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label className="text-[10px] text-neutral-400 uppercase font-black">App Logo SVG Path (or upload Image)</Label>
                      <div className="flex gap-2">
                        <Input
                          value={item.logoSvg || ''}
                          onChange={(e) => updateIntegration(idx, 'logoSvg', e.target.value)}
                          placeholder="Raw <svg>...</svg> tag or Image URL"
                          className="h-9 border-[#C5C4C2] text-xs font-mono"
                        />
                        <div className="relative shrink-0">
                          <input
                            type="file"
                            accept="image/*"
                            id={`logo-upload-${idx}`}
                            className="hidden"
                            onChange={(e) => handleImageUpload(idx, e)}
                            disabled={uploadingIdx === idx}
                          />
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            className="h-9 w-9 cursor-pointer border-[#C5C4C2]"
                            onClick={() => document.getElementById(`logo-upload-${idx}`)?.click()}
                            disabled={uploadingIdx === idx}
                          >
                            {uploadingIdx === idx ? (
                              <Loader2 className="h-4 w-4 animate-spin text-neutral-400" />
                            ) : (
                              <Upload className="h-4 w-4 text-neutral-500" />
                            )}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <Button
                type="button"
                onClick={addIntegration}
                className="h-9 gap-1.5 border border-[#00b259]/30 bg-[#00b259]/5 text-[#00b259] hover:bg-[#00b259]/10 cursor-pointer font-bold text-xs rounded-lg"
              >
                <Plus className="h-3.5 w-3.5" /> Add New App Integration
              </Button>
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
                      placeholder="e.g. Do I need a WhatsApp Business API account?"
                      className="h-9 border-[#C5C4C2]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-[10px] text-neutral-400 uppercase font-black">Answer</Label>
                    <Textarea
                      value={faq.answer || ''}
                      onChange={(e) => updateFaq(idx, 'answer', e.target.value)}
                      placeholder="e.g. Yes, you need a Meta verified WABA account..."
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

          {/* Card 4: Search Engine Optimization Card */}
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
                    <span className="truncate text-[#00b259]/80">{data.seoUrl?.replace('aigreentick.com/', '') || 'integrations'}</span>
                  </div>
                  <h3 className="text-lg font-medium text-[#1a0dab] hover:underline cursor-pointer leading-snug">
                    {data.seoTitle || 'App Integrations — Connect AI Greentick'}
                  </h3>
                  <p className="text-xs text-neutral-600 mt-1 line-clamp-2 leading-relaxed">
                    {data.seoDesc || 'Connect AI Greentick with HubSpot, Shopify, WooCommerce, Salesforce, Razorpay, Stripe, Zapier, and over 2000+ web applications.'}
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

        {/* Right Sidebar Columns */}
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
                <Select value="page.integrations">
                  <SelectTrigger className="h-10 border-[#C5C4C2]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="text-black bg-white">
                    <SelectItem value="page.integrations">page.integrations</SelectItem>
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
                <Link href="/integrations" target="_blank" className="text-[#00b259] font-bold hover:underline">/integrations</Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </form>
    </div>
  )
}
