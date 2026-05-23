'use client'
import { useState } from 'react'

const items = [
  {
    q: 'What data do you need from us to get started?',
    a: 'We typically start with a read-only connection to your ATS or CRM — Greenhouse, Lever, Bullhorn, or similar. We can also ingest structured exports from HRIS systems. No data leaves your environment without explicit sign-off at each stage.',
  },
  {
    q: 'How long does implementation take?',
    a: 'Most firms are running their first production queries within two weeks of kickoff. A full transformation engagement — data architecture, context layer, and custom AI applications — typically takes 6–8 weeks from discovery to deployment.',
  },
  {
    q: 'Is our data shared with other clients or used to train models?',
    a: "No. Your institutional data is isolated in a dedicated environment and is never shared with other clients. We do not use your data to train shared models. Arbour's market signal layer is built from public and licensed sources, entirely separate from any client data.",
  },
  {
    q: 'Do we need to replace our existing ATS or other talent tools?',
    a: "No. Arbour is an infrastructure layer that sits on top of your existing systems. We connect to them, structure what's already there, and surface intelligence through whatever interfaces your team already uses — API, dashboard, or embedded in your existing tools.",
  },
  {
    q: 'How is this different from LinkedIn Recruiter or other talent tools?',
    a: "LinkedIn shows you the market. Arbour combines the market with your institutional knowledge — your relationship history, internal assessments, past hires, and pipeline data — and makes that combination queryable by AI. It's the difference between a search engine and an intelligence system built for your firm.",
  },
]

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq" className="bg-off-white py-[110px] px-10 border-t border-ink/[0.08]">
      <div className="max-w-content mx-auto px-14">

        <div className="mb-12">
          <p className="font-display text-[10px] tracking-widest uppercase mb-5">
            <span className="text-forest">05 —</span>
            <span className="text-ink/30"> Questions we hear often</span>
          </p>
          <h2 className="font-display font-medium text-[clamp(28px,3.5vw,48px)] tracking-tighter text-ink leading-[1.18]">
            The details that matter<br />before you commit.
          </h2>
        </div>

        <div className="border-t border-ink/[0.10]">
          {items.map((item, i) => (
            <div
              key={i}
              className={`accordion-item border-b border-ink/[0.10] ${open === i ? 'open' : ''}`}
            >
              <button
                className="accordion-trigger w-full flex items-center justify-between gap-4 py-6 text-left bg-transparent border-0"
                aria-expanded={open === i}
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span className="font-sans text-[16px] font-medium text-ink tracking-tight leading-snug">
                  {item.q}
                </span>
                <svg
                  className="accordion-chevron flex-shrink-0 w-4 h-4"
                  viewBox="0 0 16 16"
                  fill="none"
                  aria-hidden="true"
                >
                  <path d="M3 6l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              <div className="accordion-body">
                <p className="font-sans text-[14px] text-ink-mid leading-[1.85] pb-7 max-w-[680px]">
                  {item.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
