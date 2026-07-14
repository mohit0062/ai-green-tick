'use client'

import { useState, useRef, useEffect } from 'react'
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
  Mail,
  MapPin,
  Phone,
  Clock,
  ExternalLink,
  Laptop,
  Smartphone,
  Globe,
  Bold,
  Italic,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Link2,
  Image as ImageIcon
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface ContactCmsClientProps {
  initialData: any
}

export default function ContactCmsClient({ initialData }: ContactCmsClientProps) {
  const router = useRouter()
  const [data, setData] = useState(initialData)
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
      const result = await updateSiteSectionAction('contact_page', data)
      if (result?.error) {
        setError(result.error)
        showStatus('error', result.error)
      } else {
        showStatus('success', 'Contact page saved successfully!')
        router.refresh()
      }
    } catch (err: any) {
      console.error('Error saving contact page:', err)
      const msg = err.message || 'An unexpected error occurred.'
      setError(msg)
      showStatus('error', msg)
    } finally {
      setIsSubmitting(false)
    }
  }

  // ── Contact Cards helpers ──
  const updateCard = (idx: number, field: string, value: string) => {
    const cards = [...(data.contactCards || [])]
    cards[idx] = { ...cards[idx], [field]: value }
    setData({ ...data, contactCards: cards })
  }
  
  const removeCard = (idx: number) => {
    const cards = (data.contactCards || []).filter((_: any, i: number) => i !== idx)
    setData({ ...data, contactCards: cards })
  }
  
  const addCard = () => {
    setData({
      ...data,
      contactCards: [...(data.contactCards || []), { icon: 'Mail', title: '', description: '', ctaText: '', ctaLink: '' }]
    })
  }

  const moveCard = (idx: number, dir: -1 | 1) => {
    const cards = [...(data.contactCards || [])]
    const target = idx + dir
    if (target < 0 || target >= cards.length) return
    ;[cards[idx], cards[target]] = [cards[target], cards[idx]]
    setData({ ...data, contactCards: cards })
  }

  // ── Steps helpers ──
  const updateStep = (idx: number, field: string, value: string) => {
    const steps = [...(data.stepsSection?.steps || [])]
    steps[idx] = { ...steps[idx], [field]: value }
    setData({ ...data, stepsSection: { ...data.stepsSection, steps } })
  }

  const removeStep = (idx: number) => {
    const steps = (data.stepsSection?.steps || []).filter((_: any, i: number) => i !== idx)
    setData({ ...data, stepsSection: { ...data.stepsSection, steps } })
  }

  const addStep = () => {
    const existingSteps = data.stepsSection?.steps || []
    const steps = [...existingSteps, { number: String(existingSteps.length + 1), title: '', description: '' }]
    setData({ ...data, stepsSection: { ...data.stepsSection, steps } })
  }

  const moveStep = (idx: number, dir: -1 | 1) => {
    const steps = [...(data.stepsSection?.steps || [])]
    const target = idx + dir
    if (target < 0 || target >= steps.length) return
    ;[steps[idx], steps[target]] = [steps[target], steps[idx]]
    setData({ ...data, stepsSection: { ...data.stepsSection, steps } })
  }

  const getCardIcon = (iconName: string) => {
    switch (iconName) {
      case 'Mail': return <Mail className="h-4.5 w-4.5 text-[#00b259]" />
      case 'Phone': return <Phone className="h-4.5 w-4.5 text-[#00b259]" />
      case 'MapPin': return <MapPin className="h-4.5 w-4.5 text-[#00b259]" />
      case 'Clock': return <Clock className="h-4.5 w-4.5 text-[#00b259]" />
      default: return <Mail className="h-4.5 w-4.5 text-[#00b259]" />
    }
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
            <h2 className="text-2xl font-bold tracking-tight text-neutral-800 font-display">Contact Page CMS</h2>
            <p className="text-neutral-500 text-xs font-medium mt-1">Manage the form content, contact cards, office hours, and steps on a single page.</p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Link
            href="/contact"
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
          
          {/* Card 1: Page Details / Hero Info */}
          <Card className="shadow-xs border border-[#C5C4C2]/50">
            <CardHeader className="pb-3 border-b border-[#C5C4C2]/20">
              <CardTitle className="font-display text-neutral-850">Contact Form Hero</CardTitle>
              <CardDescription className="text-xs">
                Define the headings displayed at the top of the contact page form.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5 pt-5">
              {error && (
                <div className="rounded-lg bg-destructive/15 p-3.5 text-sm text-destructive font-medium border border-destructive/20">
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="pageTitle" className="text-sm font-semibold">Admin Page Title</Label>
                <Input
                  id="pageTitle"
                  required
                  placeholder="e.g. Contact us"
                  value={data.pageTitle || ''}
                  onChange={(e) => setData({ ...data, pageTitle: e.target.value })}
                  className="h-10 border-[#C5C4C2] focus:border-[#00b259] focus:ring-1 focus:ring-[#00b259]/10"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="heading" className="text-sm font-semibold">Main Form Heading</Label>
                <Input
                  id="heading"
                  required
                  placeholder="Tell Us What You're Building."
                  value={data.heading || ''}
                  onChange={(e) => setData({ ...data, heading: e.target.value })}
                  className="h-11 text-base font-bold border-[#C5C4C2] focus:border-[#00b259] focus:ring-1 focus:ring-[#00b259]/10"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-semibold">Sub-heading Description (HTML & Highlights Supported)</Label>
                <RichTextEditor
                  value={data.subtitle || ''}
                  onChange={(val) => setData({ ...data, subtitle: val })}
                  minHeight="180px"
                />
              </div>
            </CardContent>
          </Card>

          {/* Card 2: Contact Channels Cards */}
          <Card className="shadow-xs border border-[#C5C4C2]/50">
            <CardHeader className="pb-3 border-b border-[#C5C4C2]/20">
              <CardTitle className="font-display text-neutral-850">Contact Channels Cards</CardTitle>
              <CardDescription className="text-xs">
                Edit the 4 cards displayed under the main form (Sales, Support, Visit, Phone).
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5 pt-5">
              {(data.contactCards || []).map((card: any, idx: number) => (
                <div key={idx} className="p-4 bg-white border border-[#C5C4C2]/60 rounded-xl space-y-4 shadow-sm hover:border-[#00b259]/50 transition-colors">
                  <div className="flex items-center justify-between border-b border-[#C5C4C2]/20 pb-2">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-lg bg-[#00b259]/10">
                        {getCardIcon(card.icon)}
                      </div>
                      <span className="text-xs font-bold text-neutral-800">
                        Card #{idx + 1}: {card.title || 'Untitled'}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button type="button" variant="ghost" size="icon" disabled={idx === 0} onClick={() => moveCard(idx, -1)} className="h-7 w-7 text-neutral-400 hover:text-black cursor-pointer"><ChevronUp className="h-4 w-4" /></Button>
                      <Button type="button" variant="ghost" size="icon" disabled={idx === (data.contactCards || []).length - 1} onClick={() => moveCard(idx, 1)} className="h-7 w-7 text-neutral-400 hover:text-black cursor-pointer"><ChevronDown className="h-4 w-4" /></Button>
                      <Button type="button" variant="ghost" size="icon" onClick={() => removeCard(idx)} className="h-7 w-7 text-red-500 hover:bg-red-50 cursor-pointer"><Trash2 className="h-3.5 w-3.5" /></Button>
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-1.5">
                      <Label className="text-[11px] text-neutral-500 font-semibold uppercase tracking-wider">Icon Type</Label>
                      <Select
                        value={card.icon || 'Mail'}
                        onValueChange={(val) => updateCard(idx, 'icon', val)}
                      >
                        <SelectTrigger className="h-9 border-[#C5C4C2] bg-white text-black text-xs font-semibold">
                          <SelectValue placeholder="Icon" />
                        </SelectTrigger>
                        <SelectContent className="text-black bg-white">
                          <SelectItem value="Mail">✉️ Mail / Email</SelectItem>
                          <SelectItem value="Phone">📞 Phone / WhatsApp</SelectItem>
                          <SelectItem value="MapPin">📍 MapPin / Location</SelectItem>
                          <SelectItem value="Clock">🕒 Clock / Hours</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-[11px] text-neutral-500 font-semibold uppercase tracking-wider">Title</Label>
                      <Input
                        value={card.title || ''}
                        onChange={(e) => updateCard(idx, 'title', e.target.value)}
                        placeholder="e.g. Email Support"
                        className="h-9 border-[#C5C4C2] focus:border-[#00b259] focus:ring-1 focus:ring-[#00b259]/10"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-[11px] text-neutral-500 font-semibold uppercase tracking-wider">Description</Label>
                    <RichTextEditor
                      value={card.description || ''}
                      onChange={(val) => updateCard(idx, 'description', val)}
                      minHeight="100px"
                    />
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-1.5">
                      <Label className="text-[11px] text-neutral-500 font-semibold uppercase tracking-wider">CTA Button Text</Label>
                      <Input
                        value={card.ctaText || ''}
                        onChange={(e) => updateCard(idx, 'ctaText', e.target.value)}
                        placeholder="e.g. hello@aigreentick.com"
                        className="h-9 border-[#C5C4C2] focus:border-[#00b259] focus:ring-1 focus:ring-[#00b259]/10"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-[11px] text-neutral-500 font-semibold uppercase tracking-wider">CTA Link URL</Label>
                      <Input
                        value={card.ctaLink || ''}
                        onChange={(e) => updateCard(idx, 'ctaLink', e.target.value)}
                        placeholder="e.g. mailto:hello@aigreentick.com"
                        className="h-9 border-[#C5C4C2] focus:border-[#00b259] focus:ring-1 focus:ring-[#00b259]/10"
                      />
                    </div>
                  </div>
                </div>
              ))}

              <Button
                type="button"
                onClick={addCard}
                className="h-9 gap-1.5 border border-[#00b259]/30 bg-[#00b259]/5 text-[#00b259] hover:bg-[#00b259]/10 cursor-pointer font-bold text-xs rounded-lg"
              >
                <Plus className="h-3.5 w-3.5" /> Add Contact Card
              </Button>
            </CardContent>
          </Card>

          {/* Card 3: Office / Availability Section */}
          <Card className="shadow-xs border border-[#C5C4C2]/50">
            <CardHeader className="pb-3 border-b border-[#C5C4C2]/20">
              <CardTitle className="font-display text-neutral-850">Availability & Location Info</CardTitle>
              <CardDescription className="text-xs">
                Edit headers and details for the Phone, Office location, and Hours cards.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5 pt-5">
              <div className="grid gap-3 md:grid-cols-2 pb-2">
                <div className="space-y-1">
                  <Label className="text-xs font-semibold">Section Badge text</Label>
                  <Input
                    value={data.officeSection?.badgeText || ''}
                    onChange={(e) => setData({ ...data, officeSection: { ...data.officeSection, badgeText: e.target.value } })}
                    className="h-9 border-[#C5C4C2] font-mono text-[11px]"
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs font-semibold">Section Heading</Label>
                  <Input
                    value={data.officeSection?.heading || ''}
                    onChange={(e) => setData({ ...data, officeSection: { ...data.officeSection, heading: e.target.value } })}
                    className="h-9 border-[#C5C4C2]"
                  />
                </div>

                <div className="space-y-1 md:col-span-2 border-t border-[#C5C4C2]/30 pt-3 mt-1">
                  <Label className="text-xs font-semibold flex items-center gap-1.5">
                    <Globe className="h-4 w-4 text-[#00b259]" /> Google Maps Embed Link (Iframe Src URL)
                  </Label>
                  <Input
                    value={data.mapUrl || ''}
                    onChange={(e) => setData({ ...data, mapUrl: e.target.value })}
                    placeholder="e.g. https://maps.google.com/maps?q=Jaipur&output=embed"
                    className="h-9 border-[#C5C4C2] focus:border-[#00b259] focus:ring-1 focus:ring-[#00b259]/10"
                  />
                  <p className="text-[10px] text-neutral-400 font-normal">
                    Google Maps share embed code ka raw <code>src=&quot;...&quot;</code> URL paste karein.
                  </p>
                </div>
              </div>

              {/* Phone Details */}
              <div className="p-4 bg-white border border-[#C5C4C2]/40 rounded-xl space-y-3">
                <div className="flex items-center gap-2 pb-1.5 border-b border-[#C5C4C2]/20">
                  <div className="p-1 rounded bg-[#00b259]/10">
                    <Phone className="h-4 w-4 text-[#00b259]" />
                  </div>
                  <span className="text-xs font-bold text-neutral-800">Phone Card Details</span>
                </div>
                <div className="grid gap-3 md:grid-cols-3">
                  <div className="space-y-1">
                    <Label className="text-[9px] text-neutral-400 uppercase font-black">Title</Label>
                    <Input value={data.officeSection?.phone?.title || ''} onChange={(e) => setData({ ...data, officeSection: { ...data.officeSection, phone: { ...data.officeSection.phone, title: e.target.value } } })} placeholder="Title" className="h-9 border-[#C5C4C2]" />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-[9px] text-neutral-400 uppercase font-black">Line 1</Label>
                    <Input value={data.officeSection?.phone?.line1 || ''} onChange={(e) => setData({ ...data, officeSection: { ...data.officeSection, phone: { ...data.officeSection.phone, line1: e.target.value } } })} placeholder="Line 1" className="h-9 border-[#C5C4C2]" />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-[9px] text-neutral-400 uppercase font-black">Line 2</Label>
                    <Input value={data.officeSection?.phone?.line2 || ''} onChange={(e) => setData({ ...data, officeSection: { ...data.officeSection, phone: { ...data.officeSection.phone, line2: e.target.value } } })} placeholder="Line 2" className="h-9 border-[#C5C4C2]" />
                  </div>
                </div>
              </div>

              {/* Location Details */}
              <div className="p-4 bg-white border border-[#C5C4C2]/40 rounded-xl space-y-3">
                <div className="flex items-center gap-2 pb-1.5 border-b border-[#C5C4C2]/20">
                  <div className="p-1 rounded bg-[#00b259]/10">
                    <MapPin className="h-4 w-4 text-[#00b259]" />
                  </div>
                  <span className="text-xs font-bold text-neutral-800">Location Card Details</span>
                </div>
                <div className="grid gap-3 md:grid-cols-3">
                  <div className="space-y-1">
                    <Label className="text-[9px] text-neutral-400 uppercase font-black">Title</Label>
                    <Input value={data.officeSection?.office?.title || ''} onChange={(e) => setData({ ...data, officeSection: { ...data.officeSection, office: { ...data.officeSection.office, title: e.target.value } } })} placeholder="Title" className="h-9 border-[#C5C4C2]" />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-[9px] text-neutral-400 uppercase font-black">Line 1</Label>
                    <Input value={data.officeSection?.office?.line1 || ''} onChange={(e) => setData({ ...data, officeSection: { ...data.officeSection, office: { ...data.officeSection.office, line1: e.target.value } } })} placeholder="Line 1" className="h-9 border-[#C5C4C2]" />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-[9px] text-neutral-400 uppercase font-black">Line 2</Label>
                    <Input value={data.officeSection?.office?.line2 || ''} onChange={(e) => setData({ ...data, officeSection: { ...data.officeSection, office: { ...data.officeSection.office, line2: e.target.value } } })} placeholder="Line 2" className="h-9 border-[#C5C4C2]" />
                  </div>
                </div>
              </div>

              {/* Timing Details */}
              <div className="p-4 bg-white border border-[#C5C4C2]/40 rounded-xl space-y-3">
                <div className="flex items-center gap-2 pb-1.5 border-b border-[#C5C4C2]/20">
                  <div className="p-1 rounded bg-[#00b259]/10">
                    <Clock className="h-4 w-4 text-[#00b259]" />
                  </div>
                  <span className="text-xs font-bold text-neutral-800">Working Hours Details</span>
                </div>
                <div className="grid gap-3 md:grid-cols-2">
                  <div className="space-y-1 md:col-span-2">
                    <Label className="text-[9px] text-neutral-400 uppercase font-black">Card Title</Label>
                    <Input value={data.officeSection?.hours?.title || ''} onChange={(e) => setData({ ...data, officeSection: { ...data.officeSection, hours: { ...data.officeSection.hours, title: e.target.value } } })} placeholder="Card Title" className="h-9 border-[#C5C4C2]" />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-[9px] text-neutral-400 uppercase font-black">Mon - Fri Timings</Label>
                    <Input value={data.officeSection?.hours?.monFri || ''} onChange={(e) => setData({ ...data, officeSection: { ...data.officeSection, hours: { ...data.officeSection.hours, monFri: e.target.value } } })} placeholder="Mon - Fri Timings" className="h-9 border-[#C5C4C2]" />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-[9px] text-neutral-400 uppercase font-black">Saturday Timings</Label>
                    <Input value={data.officeSection?.hours?.saturday || ''} onChange={(e) => setData({ ...data, officeSection: { ...data.officeSection, hours: { ...data.officeSection.hours, saturday: e.target.value } } })} placeholder="Saturday Timings" className="h-9 border-[#C5C4C2]" />
                  </div>
                  <div className="space-y-1 md:col-span-2">
                    <Label className="text-[9px] text-neutral-400 uppercase font-black">Sunday Timings</Label>
                    <Input value={data.officeSection?.hours?.sunday || ''} onChange={(e) => setData({ ...data, officeSection: { ...data.officeSection, hours: { ...data.officeSection.hours, sunday: e.target.value } } })} placeholder="Sunday Timings" className="h-9 border-[#C5C4C2]" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Card 4: Response Steps List */}
          <Card className="shadow-xs border border-[#C5C4C2]/50">
            <CardHeader className="pb-3 border-b border-[#C5C4C2]/20">
              <CardTitle className="font-display text-neutral-850">What Happens After Submission Steps</CardTitle>
              <CardDescription className="text-xs">
                Manage the list of steps explaining the follow-up process to users.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5 pt-5">
              <div className="grid gap-3 md:grid-cols-2 pb-2">
                <div className="space-y-1">
                  <Label className="text-xs font-semibold">Steps Section Badge</Label>
                  <Input value={data.stepsSection?.badgeText || ''} onChange={(e) => setData({ ...data, stepsSection: { ...data.stepsSection, badgeText: e.target.value } })} className="h-9 border-[#C5C4C2] font-mono text-[11px]" />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs font-semibold">Steps Section Heading</Label>
                  <Input value={data.stepsSection?.heading || ''} onChange={(e) => setData({ ...data, stepsSection: { ...data.stepsSection, heading: e.target.value } })} className="h-9 border-[#C5C4C2]" />
                </div>
              </div>

              {(data.stepsSection?.steps || []).map((step: any, idx: number) => (
                <div key={idx} className="p-4 bg-white border border-[#C5C4C2]/60 rounded-xl space-y-4 shadow-sm hover:border-[#00b259]/50 transition-colors">
                  <div className="flex items-center justify-between border-b border-[#C5C4C2]/20 pb-2">
                    <div className="flex items-center gap-2">
                      <div className="flex size-7 items-center justify-center rounded-full bg-[#00b259]/10 text-[#00b259] font-mono font-bold text-xs">
                        {String(step.number || (idx + 1)).padStart(2, '0')}
                      </div>
                      <span className="text-xs font-bold text-neutral-800">Step details</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button type="button" variant="ghost" size="icon" disabled={idx === 0} onClick={() => moveStep(idx, -1)} className="h-7 w-7 text-neutral-400 hover:text-black cursor-pointer"><ChevronUp className="h-4 w-4" /></Button>
                      <Button type="button" variant="ghost" size="icon" disabled={idx === (data.stepsSection?.steps || []).length - 1} onClick={() => moveStep(idx, 1)} className="h-7 w-7 text-neutral-400 hover:text-black cursor-pointer"><ChevronDown className="h-4 w-4" /></Button>
                      <Button type="button" variant="ghost" size="icon" onClick={() => removeStep(idx)} className="h-7 w-7 text-red-500 hover:bg-red-50 cursor-pointer"><Trash2 className="h-3.5 w-3.5" /></Button>
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="space-y-1.5">
                      <Label className="text-[11px] text-neutral-500 font-semibold uppercase tracking-wider">Number Label</Label>
                      <Input value={step.number || ''} onChange={(e) => updateStep(idx, 'number', e.target.value)} className="h-9 border-[#C5C4C2]" />
                    </div>
                    <div className="space-y-1.5 col-span-2">
                      <Label className="text-[11px] text-neutral-500 font-semibold uppercase tracking-wider">Step Title</Label>
                      <Input value={step.title || ''} onChange={(e) => updateStep(idx, 'title', e.target.value)} className="h-9 border-[#C5C4C2]" />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-[11px] text-neutral-500 font-semibold uppercase tracking-wider">Step Description</Label>
                    <RichTextEditor
                      value={step.description || ''}
                      onChange={(val) => updateStep(idx, 'description', val)}
                      minHeight="100px"
                    />
                  </div>
                </div>
              ))}

              <Button
                type="button"
                onClick={addStep}
                className="h-9 gap-1.5 border border-[#00b259]/30 bg-[#00b259]/5 text-[#00b259] hover:bg-[#00b259]/10 cursor-pointer font-semibold text-xs rounded-lg"
              >
                <Plus className="h-3.5 w-3.5" /> Add Process Step
              </Button>
            </CardContent>
          </Card>

          {/* Card 5: Search Engine Optimization Card */}
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
                    <span className="truncate text-[#00b259]/80">{data.seoUrl?.replace('aigreentick.com/', '') || 'contact'}</span>
                  </div>
                  <h3 className="text-lg font-medium text-[#1a0dab] hover:underline cursor-pointer leading-snug">
                    {data.seoTitle || data.pageTitle || 'Contact Us — Get in Touch'}
                  </h3>
                  <p className="text-xs text-neutral-600 mt-1 line-clamp-2 leading-relaxed">
                    {data.seoDesc || 'Reach out to AI Greentick for WhatsApp Business API setup, marketing campaigns...'}
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
                <Select value="page.contact">
                  <SelectTrigger className="h-10 border-[#C5C4C2]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="text-black bg-white">
                    <SelectItem value="page.contact">page.contact</SelectItem>
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
                <Link href="/contact" target="_blank" className="text-[#00b259] font-bold hover:underline">/contact</Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </form>
    </div>
  )
}
