'use client'

import { useState } from 'react'
import Link from 'next/link'
import { updateSiteSectionAction } from '../cms-actions'
import {
  Eye, EyeOff, ExternalLink, Copy, ChevronDown, ChevronUp,
  Save, Trash2, Plus, Edit, Globe, X, Check, ArrowLeft
} from 'lucide-react'
import { LucideIcon } from '@/components/ui/lucide-icon'

interface Industry {
  id: string
  title: string
  icon: string
  desc: string
  metric: string
  useCases: string[]
}

interface Props {
  initialData: any
  initialIndustries: Industry[]
}

// ── Helpers ─────────────────────────────────────────────────────────────────
function getHeroSection(data: any) {
  const sections: any[] = data?.sections || []
  return sections.find((s: any) => s.type === 'hero') || null
}
function getSeo(data: any) {
  return data?.seo || {}
}

// ── Toast ────────────────────────────────────────────────────────────────────
function Toast({ type, msg }: { type: 'success' | 'error'; msg: string }) {
  return (
    <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-lg shadow-xl text-sm font-semibold border transition-all
      ${type === 'success' ? 'bg-white border-green-500 text-green-700' : 'bg-white border-red-500 text-red-600'}`}>
      {type === 'success' ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
      {msg}
    </div>
  )
}

// ── Industry row in sidebar ───────────────────────────────────────────────────
function IndustryRow({
  ind, idx, total,
  onEdit, onDelete, onMove,
}: {
  ind: Industry; idx: number; total: number
  onEdit: () => void; onDelete: () => void
  onMove: (dir: 'up' | 'down') => void
}) {
  return (
    <div className="group flex items-center gap-3 py-2.5 border-b border-gray-100 last:border-b-0">
      {/* Icon */}
      <div className="h-8 w-8 rounded-lg bg-[#f0faf5] flex items-center justify-center shrink-0 text-[#00b259]">
        {ind.icon?.startsWith('<svg')
          ? <div dangerouslySetInnerHTML={{ __html: ind.icon }} className="h-4 w-4 [&>svg]:h-4 [&>svg]:w-4" />
          : <LucideIcon name={ind.icon || 'ShoppingBag'} className="h-4 w-4" />
        }
      </div>

      {/* Label */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-gray-800 truncate">{ind.title}</p>
        <p className="text-xs text-gray-400 truncate">{ind.metric}</p>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
        <button onClick={() => onMove('up')} disabled={idx === 0} className="p-1 rounded hover:bg-gray-100 text-gray-400 hover:text-gray-700 disabled:opacity-25" title="Move up">↑</button>
        <button onClick={() => onMove('down')} disabled={idx === total - 1} className="p-1 rounded hover:bg-gray-100 text-gray-400 hover:text-gray-700 disabled:opacity-25" title="Move down">↓</button>
        <button onClick={onEdit} className="p-1 rounded hover:bg-[#e8f5ee] text-gray-400 hover:text-[#00b259]" title="Edit"><Edit className="h-3.5 w-3.5" /></button>
        <button onClick={onDelete} className="p-1 rounded hover:bg-red-50 text-gray-400 hover:text-red-600" title="Delete"><Trash2 className="h-3.5 w-3.5" /></button>
      </div>
    </div>
  )
}

// ── Industry modal ────────────────────────────────────────────────────────────
function IndustryModal({
  initial, onSave, onClose,
}: {
  initial?: Partial<Industry>
  onSave: (ind: Industry) => void
  onClose: () => void
}) {
  const [form, setForm] = useState<Partial<Industry>>({
    id: initial?.id || '',
    title: initial?.title || '',
    icon: initial?.icon || 'ShoppingBag',
    desc: initial?.desc || '',
    metric: initial?.metric || '',
    useCases: initial?.useCases || [''],
  })

  const set = (k: keyof Industry, v: any) => setForm(f => ({ ...f, [k]: v }))

  const handleSubmit = () => {
    if (!form.title?.trim() || !form.id?.trim()) return alert('Title and ID are required')
    onSave(form as Industry)
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-base font-bold text-gray-900">{initial?.title ? 'Edit Industry' : 'Add Industry'}</h2>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-700"><X className="h-4 w-4" /></button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto px-6 py-4 space-y-4 flex-1">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide">Title *</label>
              <input value={form.title} onChange={e => set('title', e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#00b259]/40 focus:border-[#00b259]" placeholder="eCommerce" />
            </div>
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide">ID / Slug *</label>
              <input value={form.id} onChange={e => set('id', e.target.value.toLowerCase().replace(/\s+/g, '-'))} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#00b259]/40 focus:border-[#00b259] font-mono" placeholder="ecommerce" />
            </div>
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide">Icon (Lucide name or SVG code)</label>
            <input value={form.icon} onChange={e => set('icon', e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#00b259]/40 focus:border-[#00b259] font-mono" placeholder="ShoppingBag or <svg>...</svg>" />
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide">Description</label>
            <textarea value={form.desc} onChange={e => set('desc', e.target.value)} rows={3} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#00b259]/40 focus:border-[#00b259] resize-none" placeholder="Short description of this industry..." />
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide">Key Metric / Result</label>
            <input value={form.metric} onChange={e => set('metric', e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#00b259]/40 focus:border-[#00b259]" placeholder="35% cart recovery rate" />
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide">Use Cases / Workflows</label>
            {(form.useCases || ['']).map((uc, i) => (
              <div key={i} className="flex gap-2">
                <input
                  value={uc}
                  onChange={e => {
                    const arr = [...(form.useCases || [])]
                    arr[i] = e.target.value
                    set('useCases', arr)
                  }}
                  className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#00b259]/40 focus:border-[#00b259]"
                  placeholder={`Use case ${i + 1}...`}
                />
                <button
                  onClick={() => set('useCases', (form.useCases || []).filter((_: any, j: number) => j !== i))}
                  className="p-2 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
            <button
              onClick={() => set('useCases', [...(form.useCases || []), ''])}
              className="flex items-center gap-1.5 text-xs font-semibold text-[#00b259] hover:text-[#009149] mt-1"
            >
              <Plus className="h-3.5 w-3.5" /> Add use case
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 rounded-lg border border-gray-300 text-sm font-semibold text-gray-600 hover:bg-gray-50">Cancel</button>
          <button onClick={handleSubmit} className="px-5 py-2 rounded-lg bg-black text-white text-sm font-bold hover:bg-gray-800">Save industry</button>
        </div>
      </div>
    </div>
  )
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function IndustriesPageEditor({ initialData, initialIndustries }: Props) {
  // Page data
  const heroSection = getHeroSection(initialData)
  const initialSeo = getSeo(initialData)

  // States
  const [pageTitle, setPageTitle] = useState(heroSection?.content?.heading || 'WhatsApp Automation for Every Industry')
  const [pageContent, setPageContent] = useState(heroSection?.content?.subtitle || '')
  const [buttonText, setButtonText] = useState(heroSection?.content?.buttonText || 'BOOK A DEMO')
  const [buttonLink, setButtonLink] = useState(heroSection?.content?.buttonLink || '/#demo')

  // SEO
  const [seoOpen, setSeoOpen] = useState(false)
  const [metaTitle, setMetaTitle] = useState(initialSeo.metaTitle || 'Solutions & Industries | AI Greentick')
  const [metaDesc, setMetaDesc] = useState(initialSeo.metaDescription || '')
  const [metaUrl, setMetaUrl] = useState('/industries')

  // Visibility
  const [visible, setVisible] = useState(true)

  // Industries list
  const [industries, setIndustries] = useState<Industry[]>(initialIndustries)
  const [editingIndustry, setEditingIndustry] = useState<number | null>(null)
  const [creatingIndustry, setCreatingIndustry] = useState(false)

  // UI
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState<{ type: 'success' | 'error'; msg: string } | null>(null)

  const showToast = (type: 'success' | 'error', msg: string) => {
    setToast({ type, msg })
    setTimeout(() => setToast(null), 4000)
  }

  // Build updated page data preserving other sections
  const buildUpdatedPageData = () => {
    const sections: any[] = initialData?.sections || []
    const updatedSections = sections.map((s: any) => {
      if (s.type === 'hero') {
        return {
          ...s,
          content: {
            ...s.content,
            heading: pageTitle,
            subtitle: pageContent,
            buttonText,
            buttonLink,
          }
        }
      }
      return s
    })
    // If no hero section exists, add one
    if (!updatedSections.find((s: any) => s.type === 'hero')) {
      updatedSections.unshift({
        id: 'hero-default',
        type: 'hero',
        visible: true,
        content: { heading: pageTitle, subtitle: pageContent, buttonText, buttonLink }
      })
    }
    return {
      ...initialData,
      seo: { ...initialSeo, metaTitle, metaDescription: metaDesc },
      sections: updatedSections,
    }
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      const [r1, r2] = await Promise.all([
        updateSiteSectionAction('industries_page_builder', buildUpdatedPageData()),
        updateSiteSectionAction('industry_list', industries),
      ])
      if (r1.error || r2.error) {
        showToast('error', r1.error || r2.error || 'Save failed')
      } else {
        showToast('success', 'Page saved successfully!')
      }
    } catch (err: any) {
      console.error('Error saving industries page:', err)
      showToast('error', err.message || 'An unexpected error occurred.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#f6f6f7]" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
      {toast && <Toast type={toast.type} msg={toast.msg} />}

      {/* Industry modals */}
      {creatingIndustry && (
        <IndustryModal
          onClose={() => setCreatingIndustry(false)}
          onSave={(ind) => { setIndustries(p => [...p, ind]); setCreatingIndustry(false) }}
        />
      )}
      {editingIndustry !== null && (
        <IndustryModal
          initial={industries[editingIndustry]}
          onClose={() => setEditingIndustry(null)}
          onSave={(ind) => {
            setIndustries(p => p.map((x, i) => i === editingIndustry ? ind : x))
            setEditingIndustry(null)
          }}
        />
      )}

      {/* ── Page Header ─────────────────────────────────────────────── */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <Link href="/admin" className="inline-flex items-center gap-1 text-sm text-[#008060] hover:underline mb-3">
          <ArrowLeft className="h-3.5 w-3.5" /> Pages
        </Link>
        <div className="flex items-start justify-between gap-4">
          <h1 className="text-2xl font-bold text-gray-900">Industries</h1>
          <div className="flex items-center gap-2 shrink-0">
            <Link
              href="/industries"
              target="_blank"
              className="inline-flex items-center gap-1.5 text-sm text-[#008060] font-semibold hover:underline"
            >
              <Eye className="h-4 w-4" /> View Page
            </Link>
          </div>
        </div>
      </div>

      {/* ── Body ────────────────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-6 py-8 flex gap-6 items-start">

        {/* ── LEFT COLUMN ── */}
        <div className="flex-1 space-y-5">

          {/* Page details card */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-100">
              <h2 className="text-base font-bold text-gray-800">Page details</h2>
            </div>

            <div className="px-6 py-5 space-y-5">
              {/* Title */}
              <div className="space-y-1.5">
                <label className="block text-sm font-semibold text-[#008060]">Title</label>
                <input
                  value={pageTitle}
                  onChange={e => setPageTitle(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#008060]/30 focus:border-[#008060] transition-shadow"
                  placeholder="Page title..."
                />
              </div>

              {/* Content */}
              <div className="space-y-1.5">
                <label className="block text-sm font-semibold text-[#008060]">Content (Subtitle / Description)</label>
                <textarea
                  value={pageContent}
                  onChange={e => setPageContent(e.target.value)}
                  rows={4}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#008060]/30 focus:border-[#008060] transition-shadow resize-none leading-relaxed"
                  placeholder="Brief description shown below the page title..."
                />
              </div>

              {/* Button */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-sm font-semibold text-[#008060]">CTA Button Text</label>
                  <input
                    value={buttonText}
                    onChange={e => setButtonText(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#008060]/30 focus:border-[#008060]"
                    placeholder="BOOK A DEMO"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-sm font-semibold text-[#008060]">CTA Button Link</label>
                  <input
                    value={buttonLink}
                    onChange={e => setButtonLink(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#008060]/30 focus:border-[#008060]"
                    placeholder="/#demo"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* SEO card */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="px-6 py-5 flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-gray-800">Search engine listing preview</h2>
                {!seoOpen && (
                  <p className="text-sm text-gray-500 mt-0.5 leading-relaxed line-clamp-2">
                    {metaDesc || 'No meta description set.'}
                  </p>
                )}
              </div>
              <button
                onClick={() => setSeoOpen(v => !v)}
                className="text-sm font-semibold text-[#008060] hover:underline flex items-center gap-1 shrink-0 ml-4"
              >
                {seoOpen ? <>Collapse SEO {<ChevronUp className="h-3.5 w-3.5" />}</> : <>Edit website SEO {<ChevronDown className="h-3.5 w-3.5" />}</>}
              </button>
            </div>

            {/* SEO preview box */}
            {!seoOpen && (
              <div className="px-6 pb-5">
                <div className="bg-[#f8f9fa] border border-gray-200 rounded-lg px-4 py-4 space-y-0.5">
                  <p className="text-[#1a0dab] text-base font-medium leading-snug">{metaTitle}</p>
                  <p className="text-[#006621] text-xs">aigreentick.com{metaUrl}</p>
                  <p className="text-[#545454] text-xs leading-relaxed">{metaDesc || 'No description.'}</p>
                </div>
              </div>
            )}

            {/* SEO fields */}
            {seoOpen && (
              <div className="px-6 pb-5 space-y-4 border-t border-gray-100 pt-5">
                <div className="space-y-1.5">
                  <label className="block text-sm font-semibold text-gray-600">Page title</label>
                  <input
                    value={metaTitle}
                    onChange={e => setMetaTitle(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#008060]/30 focus:border-[#008060]"
                  />
                  <p className="text-xs text-gray-400">{metaTitle.length} of 70 characters used</p>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-sm font-semibold text-gray-600">Meta description</label>
                  <textarea
                    value={metaDesc}
                    onChange={e => setMetaDesc(e.target.value)}
                    rows={3}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#008060]/30 focus:border-[#008060] resize-none"
                    placeholder="Describe this page for search engines..."
                  />
                  <p className="text-xs text-gray-400">{metaDesc.length} of 320 characters used</p>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-sm font-semibold text-gray-600">URL and handle</label>
                  <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-[#008060]/30 focus-within:border-[#008060]">
                    <span className="px-3 py-2.5 bg-gray-50 text-gray-400 text-sm border-r border-gray-300 whitespace-nowrap">aigreentick.com</span>
                    <input
                      value={metaUrl}
                      onChange={e => setMetaUrl(e.target.value)}
                      className="flex-1 px-3 py-2.5 text-sm focus:outline-none"
                    />
                  </div>
                </div>

                {/* Live preview */}
                <div className="bg-[#f8f9fa] border border-gray-200 rounded-lg px-4 py-4 space-y-0.5">
                  <p className="text-[#1a0dab] text-base font-medium leading-snug">{metaTitle}</p>
                  <p className="text-[#006621] text-xs">aigreentick.com{metaUrl}</p>
                  <p className="text-[#545454] text-xs leading-relaxed">{metaDesc || 'No description.'}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ── RIGHT SIDEBAR ── */}
        <div className="w-72 space-y-5 shrink-0">

          {/* Visibility */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100">
              <h2 className="text-base font-bold text-gray-800">Visibility</h2>
            </div>
            <div className="px-5 py-4 space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="visibility"
                  checked={visible}
                  onChange={() => setVisible(true)}
                  className="accent-[#008060] h-4 w-4"
                />
                <div>
                  <p className="text-sm font-semibold text-gray-800">Visible</p>
                  <p className="text-xs text-gray-400">Shown to visitors</p>
                </div>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="visibility"
                  checked={!visible}
                  onChange={() => setVisible(false)}
                  className="accent-[#008060] h-4 w-4"
                />
                <div>
                  <p className="text-sm font-semibold text-gray-800">Hidden</p>
                  <p className="text-xs text-gray-400">Not shown to visitors</p>
                </div>
              </label>
              <Link href="/industries" target="_blank" className="flex items-center gap-1.5 text-xs text-[#008060] hover:underline font-semibold pt-1">
                <Globe className="h-3.5 w-3.5" /> View live page
              </Link>
            </div>
          </div>

          {/* Industry Blueprints (like Template section) */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-gray-800">Industry Blueprints</h2>
                <p className="text-xs text-gray-400 mt-0.5">Shown in the verticals section</p>
              </div>
              <button
                onClick={() => setCreatingIndustry(true)}
                className="h-7 w-7 rounded-lg bg-black text-white flex items-center justify-center hover:bg-gray-800 shrink-0"
              >
                <Plus className="h-3.5 w-3.5" />
              </button>
            </div>
            <div className="px-5 py-2">
              {industries.length === 0 ? (
                <p className="text-xs text-gray-400 py-4 text-center">No industries yet. Click + to add one.</p>
              ) : (
                industries.map((ind, idx) => (
                  <IndustryRow
                    key={ind.id || idx}
                    ind={ind}
                    idx={idx}
                    total={industries.length}
                    onEdit={() => setEditingIndustry(idx)}
                    onDelete={() => {
                      if (confirm(`Delete "${ind.title}"?`)) {
                        setIndustries(p => p.filter((_, i) => i !== idx))
                      }
                    }}
                    onMove={(dir) => {
                      const target = dir === 'up' ? idx - 1 : idx + 1
                      if (target < 0 || target >= industries.length) return
                      const updated = [...industries]
                      ;[updated[idx], updated[target]] = [updated[target], updated[idx]]
                      setIndustries(updated)
                    }}
                  />
                ))
              )}
            </div>
            {industries.length > 0 && (
              <div className="px-5 py-3 border-t border-gray-100">
                <button onClick={() => setCreatingIndustry(true)} className="flex items-center gap-1.5 text-xs font-semibold text-[#008060] hover:underline">
                  <Plus className="h-3.5 w-3.5" /> Add industry
                </button>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* ── Bottom Action Bar ─────────────────────────────────────── */}
      <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4 flex items-center justify-end gap-3 shadow-[0_-2px_8px_rgba(0,0,0,0.06)]">
        <Link href="/admin" className="px-5 py-2.5 rounded-lg border border-gray-300 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
          Cancel
        </Link>
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-6 py-2.5 rounded-lg bg-black text-white text-sm font-bold hover:bg-gray-800 transition-colors flex items-center gap-2 disabled:opacity-60"
        >
          {saving
            ? <div className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
            : <Save className="h-4 w-4" />
          }
          Save
        </button>
      </div>
    </div>
  )
}
