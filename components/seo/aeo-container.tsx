'use client'

import FAQ from '@/components/shadcn-studio/blocks/faq-component-04/faq-component-04'
import { JsonLd } from '@/components/json-ld'

interface FAQItem {
  question: string
  answer: string
}

interface AeoContainerProps {
  aiSnapshot?: string
  faqs?: FAQItem[]
  title?: string
}

export default function AeoContainer({ aiSnapshot, faqs, title = 'Common Questions & Answers' }: AeoContainerProps) {
  // Convert flat faqs into tabs for the standard FAQ block
  const faqTabs = faqs && faqs.length > 0 ? [
    {
      name: 'General',
      value: 'general',
      faqs: faqs.map((f, idx) => ({
        id: `faq-${idx}`,
        question: f.question,
        answer: f.answer
      }))
    }
  ] : null

  return (
    <div className="w-full">
      {/* AI Snapshot Section */}
      {aiSnapshot && (
        <section className="px-4 sm:px-6 lg:px-8 py-6 w-full bg-white border-b border-[#C5C4C2]/30">
          {/* Speakable + description structured data so AI answer engines can cite the summary */}
          <JsonLd
            data={{
              '@context': 'https://schema.org',
              '@type': 'WebPage',
              description: aiSnapshot,
              speakable: {
                '@type': 'SpeakableSpecification',
                cssSelector: ['.ai-snapshot-text'],
              },
            }}
          />
          <div 
            className="mx-auto max-w-4xl border border-[#C5C4C2] bg-[#ECEBE9]/20 p-5 relative"
            style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 0 calc(100% - 8px))' }}
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <span className="inline-block px-2 py-0.5 text-[9px] font-mono font-bold text-[#00b259] border border-[#00b259]/30 bg-[#00b259]/5 uppercase tracking-wide shrink-0">
                ⚡ AI Quick Summary
              </span>
              <p className="ai-snapshot-text text-neutral-750 font-sans text-xs leading-relaxed font-medium text-left">
                {aiSnapshot}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* FAQ Block (reusing homepage design component) */}
      {faqTabs && (
        <div className="w-full text-black">
          <FAQ tabs={faqTabs} />
        </div>
      )}
    </div>
  )
}
