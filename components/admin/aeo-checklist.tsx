import { Check, X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface AeoChecklistProps {
  /** Optional focus keyword. When omitted, keyword-specific checks are skipped. */
  focusKeyword?: string
  /** The main page title / heading used for the keyword-in-title check. */
  title?: string
  /** Meta description used as a fallback direct-answer snippet. */
  description?: string
  /** The AI Snapshot summary (primary AEO/AGO signal). */
  aiSnapshot?: string
  /** Number of FAQ entries configured for this page. */
  faqCount?: number
  className?: string
}

const CONVERSATIONAL_WORDS = [
  'how', 'why', 'what', 'when', 'where', 'which', 'best', 'top',
  'guide', 'strategy', 'tips', 'api', 'vs', 'compare',
]

type CheckResult = { label: string; pass: boolean; tip: string }

/**
 * Display-only SEO / AEO (Answer Engine Optimization) analysis panel.
 * Mirrors the homepage editor's checks so every content editor gets a
 * consistent readiness score for AI search engines. Purely presentational —
 * nothing is persisted.
 */
export function AeoChecklist({
  focusKeyword = '',
  title = '',
  description = '',
  aiSnapshot = '',
  faqCount = 0,
  className,
}: AeoChecklistProps) {
  const kw = focusKeyword.toLowerCase().trim()
  const snippet = (aiSnapshot || description || '').trim()
  const conversationalText = (kw || `${title} ${description}`).toLowerCase()

  const checks: CheckResult[] = []

  if (kw) {
    checks.push({
      label: 'Keyword in heading / title',
      pass: title.toLowerCase().includes(kw),
      tip: 'Include the focus keyword in the page heading.',
    })
  }

  checks.push(
    {
      label: 'AEO: Conversational intent',
      pass: CONVERSATIONAL_WORDS.some((w) => conversationalText.includes(w)),
      tip: 'Use conversational words (how, why, what, best, guide, api).',
    },
    {
      label: 'AEO: Direct-answer snippet (50–200 chars)',
      pass: snippet.length >= 50 && snippet.length <= 200,
      tip: 'Keep the AI snapshot / description between 50 and 200 characters.',
    },
    {
      label: 'AEO: AI Snapshot summary present',
      pass: !!aiSnapshot.trim(),
      tip: 'Add an AI Snapshot summary so answer engines can cite this page.',
    },
    {
      label: 'AEO: FAQ structure (2+)',
      pass: faqCount >= 2,
      tip: 'Add at least 2 FAQs for LLM and rich-result optimization.',
    }
  )

  const passCount = checks.filter((c) => c.pass).length
  const score = checks.length ? Math.round((passCount / checks.length) * 100) : 0

  const scoreClasses =
    score >= 80
      ? 'bg-[#EAFBF3] text-emerald-600 border-emerald-400'
      : score >= 50
        ? 'bg-[#FFF9E6] text-amber-600 border-amber-400'
        : 'bg-red-50 text-red-600 border-red-400'

  return (
    <div className={cn('rounded-lg border border-[#C5C4C2]/50 bg-white p-4 space-y-3', className)}>
      <div className="flex items-center justify-between">
        <h4 className="text-[11px] font-bold uppercase tracking-wide text-neutral-800">
          SEO / AEO Analysis
        </h4>
        <span className={cn('px-2 py-0.5 text-[10px] font-extrabold rounded-md border', scoreClasses)}>
          {score}/100
        </span>
      </div>
      <ul className="space-y-1.5">
        {checks.map((c, i) => (
          <li key={i} className="flex items-start gap-2 text-[11px]" title={c.tip}>
            {c.pass ? (
              <Check className="h-3.5 w-3.5 shrink-0 text-emerald-500 mt-0.5" />
            ) : (
              <X className="h-3.5 w-3.5 shrink-0 text-red-400 mt-0.5" />
            )}
            <span className={cn(c.pass ? 'text-neutral-600' : 'text-neutral-500')}>
              {c.label}
              {!c.pass && <span className="block text-[10px] text-neutral-400">{c.tip}</span>}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
