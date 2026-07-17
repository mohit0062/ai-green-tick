'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { updateSiteSectionAction } from '../cms-actions'
import { ArrowLeft, Loader2, Check, X, Plus, Trash2, Signpost } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface RedirectRule {
  source: string
  destination: string
  permanent: boolean
}

interface RedirectsClientProps {
  initialRules: RedirectRule[]
}

export default function RedirectsClient({ initialRules }: RedirectsClientProps) {
  const router = useRouter()
  const [rules, setRules] = useState<RedirectRule[]>(() =>
    (initialRules || []).map((r) => ({
      source: r.source || '',
      destination: r.destination || '',
      permanent: r.permanent ?? true,
    }))
  )
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [statusMsg, setStatusMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const showStatus = (type: 'success' | 'error', text: string) => {
    setStatusMsg({ type, text })
    setTimeout(() => setStatusMsg(null), 5000)
  }

  const updateRule = (idx: number, field: keyof RedirectRule, value: string | boolean) => {
    const list = [...rules]
    list[idx] = { ...list[idx], [field]: value }
    setRules(list)
  }

  const removeRule = (idx: number) => {
    setRules(rules.filter((_, i) => i !== idx))
  }

  const addRule = () => {
    setRules([...rules, { source: '', destination: '', permanent: true }])
  }

  const handleSave = async () => {
    setIsSubmitting(true)

    // Normalize + validate before saving.
    const cleaned: RedirectRule[] = []
    for (const rule of rules) {
      const source = (rule.source || '').trim()
      const destination = (rule.destination || '').trim()
      if (!source && !destination) continue // skip empty rows
      if (!source || !destination) {
        showStatus('error', 'Every rule needs both a source and a destination path.')
        setIsSubmitting(false)
        return
      }
      if (!source.startsWith('/')) {
        showStatus('error', `Source "${source}" must start with a "/" (e.g. /old-page).`)
        setIsSubmitting(false)
        return
      }
      if (source === destination) {
        showStatus('error', `Source and destination cannot be identical ("${source}").`)
        setIsSubmitting(false)
        return
      }
      cleaned.push({ source, destination, permanent: !!rule.permanent })
    }

    try {
      const result = await updateSiteSectionAction('redirects', cleaned)
      if (result?.error) {
        showStatus('error', result.error)
      } else {
        setRules(cleaned)
        showStatus('success', 'Redirects saved successfully!')
        router.refresh()
      }
    } catch (err: any) {
      showStatus('error', err?.message || 'An unexpected error occurred.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6 max-w-5xl mx-auto font-sans text-black">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-[#C5C4C2]/30 pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Link href="/admin" className="text-neutral-500 hover:text-black transition-colors">
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <h2 className="text-2xl font-black tracking-tight font-display flex items-center gap-2">
              <Signpost className="h-5 w-5 text-[#00b259]" />
              Redirects Manager
            </h2>
          </div>
          <p className="text-sm text-neutral-500 font-sans">
            Forward old or moved URLs to new destinations. Rules are enforced site-wide at the edge.
          </p>
        </div>

        <Button
          onClick={handleSave}
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
            <div className="h-5 w-5 rounded-full bg-[#00b259]/20 flex items-center justify-center">
              <Check className="h-3 w-3 text-[#00b259]" />
            </div>
          ) : (
            <div className="h-5 w-5 rounded-full bg-red-100 flex items-center justify-center">
              <X className="h-3 w-3 text-red-600" />
            </div>
          )}
          <span className="text-sm font-bold">{statusMsg.text}</span>
        </div>
      )}

      <Card className="shadow-xs border border-[#C5C4C2]/50">
        <CardHeader className="pb-3 border-b border-[#C5C4C2]/20">
          <CardTitle className="font-display text-neutral-850">Redirect Rules</CardTitle>
          <CardDescription>
            Source is a path on this site (e.g. <code>/old-page</code>). Destination can be a path
            (<code>/new-page</code>) or a full URL (<code>https://...</code>). Permanent uses 308, temporary uses 307.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 pt-5">
          {rules.length === 0 && (
            <p className="text-sm text-neutral-400 italic py-4 text-center border border-dashed border-[#C5C4C2]/50 rounded-xl">
              No redirect rules yet. Add one below.
            </p>
          )}

          <div className="space-y-4">
            {rules.map((rule, idx) => (
              <div
                key={idx}
                className="p-4 border border-[#C5C4C2]/40 rounded-xl space-y-3 bg-neutral-50/50"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-neutral-800">Rule #{idx + 1}</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeRule(idx)}
                    className="h-7 w-7 text-red-500 hover:bg-red-50 cursor-pointer"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
                <div className="grid gap-3 md:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label className="text-[11px] text-neutral-500 font-semibold uppercase">
                      Source Path
                    </Label>
                    <Input
                      value={rule.source}
                      onChange={(e) => updateRule(idx, 'source', e.target.value)}
                      placeholder="/old-page"
                      className="h-9 border-[#C5C4C2] font-mono text-sm"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-[11px] text-neutral-500 font-semibold uppercase">
                      Destination
                    </Label>
                    <Input
                      value={rule.destination}
                      onChange={(e) => updateRule(idx, 'destination', e.target.value)}
                      placeholder="/new-page or https://example.com"
                      className="h-9 border-[#C5C4C2] font-mono text-sm"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    id={`permanent-${idx}`}
                    checked={rule.permanent}
                    onChange={(e) => updateRule(idx, 'permanent', e.target.checked)}
                    className="h-4 w-4 accent-[#00b259]"
                  />
                  <Label htmlFor={`permanent-${idx}`} className="text-xs font-medium text-neutral-600">
                    Permanent redirect (301/308). Uncheck for temporary (302/307).
                  </Label>
                </div>
              </div>
            ))}
          </div>

          <Button
            type="button"
            onClick={addRule}
            className="h-9 gap-1.5 border border-[#00b259]/30 bg-[#00b259]/5 text-[#00b259] hover:bg-[#00b259]/10 cursor-pointer font-bold text-xs rounded-lg"
          >
            <Plus className="h-3.5 w-3.5" /> Add Redirect Rule
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
