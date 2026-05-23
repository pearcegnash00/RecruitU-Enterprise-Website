'use client'
import { useState, useEffect, useRef } from 'react'

const DURATION = 5000

const tabs = [
  {
    label: 'Fragmented',
    desc: "People data lives across your ATS, HRIS, recruiters' inboxes, and relationship networks — none of it connected.",
  },
  {
    label: 'Unstructured',
    desc: 'Free text notes. Inconsistent titles. PDF resumes. No schema, no taxonomy, no way to query at scale.',
  },
  {
    label: 'Uninterpretable',
    desc: "AI can read your data. It can't understand what it means without a context layer built for financial services.",
  },
]

const fragCards = [
  { source: 'ATS',             color: '#4a7fc1', top: '10%', left:  '4%', rot: -2   },
  { source: 'HRIS',            color: '#6b8f4a', top:  '5%', left: '26%', rot:  2   },
  { source: 'Recruiter Inbox', color: '#9a6b4a', top: '11%', left: '53%', rot: -1.5 },
  { source: 'LinkedIn',        color: '#6b4a9a', top: '38%', left:  '9%', rot:  3   },
  { source: 'Performance',     color: '#1A6B3C', top: '42%', left: '70%', rot: -2   },
  { source: 'PDF Resume',      color: '#9a4a4a', top: '64%', left:  '5%', rot:  1   },
  { source: 'Spreadsheet',     color: '#4a8a9a', top: '61%', left: '44%', rot: -3   },
  { source: 'Email Thread',    color: '#9a7a4a', top: '57%', left: '76%', rot:  2   },
]

type FieldHighlight = 'none' | 'yellow' | 'red'
const unstructuredFields: { key: string; value: string; highlight: FieldHighlight }[] = [
  { key: 'Title',      value: 'Vice President (but like, senior VP? unclear)',                                                                highlight: 'yellow' },
  { key: 'Firm',       value: 'Goldman Sachs',                                                                                               highlight: 'none'   },
  { key: 'Experience', value: '7 yrs / since 2016 / extensive',                                                                             highlight: 'red'    },
  { key: 'Notes',      value: 'Strong candidate. Met at conference. Follow up re: comp expectations. Wife works at Blackstone? Check.',      highlight: 'yellow' },
  { key: 'Skills',     value: 'Excel, "quant stuff", derivatives (from resume 2019)',                                                        highlight: 'red'    },
  { key: 'Status',     value: '2nd round? Or withdrawn. See email thread.',                                                                  highlight: 'red'    },
]

const queryResults = [
  { rank: '01', name: 'J. Hartwell', meta: 'VP · Meridian Capital Partners' },
  { rank: '02', name: 'R. Chen',     meta: 'Vice President · Goldman Sachs'  },
  { rank: '03', name: 'M. Okafor',   meta: 'VP of People · 8-person fintech' },
]

function DocCard({ source, color }: { source: string; color: string }) {
  return (
    <div style={{
      background: '#fff',
      borderRadius: '6px',
      border: '1px solid #dddbd4',
      padding: '10px 12px',
      boxShadow: '0 1px 4px rgba(0,0,0,0.06), 0 0 1px rgba(0,0,0,0.04)',
      minWidth: '96px',
    }}>
      <div style={{
        fontSize: '8px',
        fontWeight: 700,
        fontFamily: 'Inter, sans-serif',
        textTransform: 'uppercase' as const,
        letterSpacing: '0.1em',
        color,
        marginBottom: '8px',
      }}>
        {source}
      </div>
      {[100, 80, 60].map((w, i) => (
        <div key={i} style={{
          height: '2px',
          background: '#e0ddd6',
          width: `${w}%`,
          marginBottom: i < 2 ? '4px' : 0,
        }} />
      ))}
    </div>
  )
}

function PanelFragmented({ active }: { active: boolean }) {
  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      opacity: active ? 1 : 0,
      transition: 'opacity 0.5s ease',
      pointerEvents: active ? 'auto' : 'none',
    }}>
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        fontFamily: 'Inter, sans-serif',
        fontSize: '10px',
        color: '#c8c6be',
        textTransform: 'uppercase' as const,
        letterSpacing: '0.06em',
        whiteSpace: 'nowrap',
        zIndex: 0,
        userSelect: 'none',
      }}>
        No single view of any person exists
      </div>
      {fragCards.map((card, i) => (
        <div key={i} style={{
          position: 'absolute',
          top: card.top,
          left: card.left,
          transform: `rotate(${card.rot}deg)`,
          zIndex: 1,
        }}>
          <DocCard source={card.source} color={card.color} />
        </div>
      ))}
    </div>
  )
}

function PanelUnstructured({ active }: { active: boolean }) {
  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      opacity: active ? 1 : 0,
      transition: 'opacity 0.5s ease',
      pointerEvents: active ? 'auto' : 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
    }}>
      <div style={{
        background: '#fff',
        borderRadius: '6px',
        border: '1px solid #dddbd4',
        padding: '20px 24px',
        width: '100%',
        maxWidth: '480px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
      }}>
        <div style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontWeight: 600,
          fontSize: '12px',
          color: '#1A1A18',
          marginBottom: '10px',
          paddingBottom: '10px',
          borderBottom: '1px solid #f0ede8',
        }}>
          candidate_record_4471.txt — R. Chen, VP
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', marginBottom: '10px' }}>
          {unstructuredFields.map(field => (
            <div
              key={field.key}
              style={{
                display: 'flex',
                gap: '8px',
                padding: '3px 6px',
                borderRadius: '2px',
                background: field.highlight === 'yellow' ? 'rgba(255,200,0,0.08)' : 'transparent',
                borderLeft: field.highlight === 'yellow' ? '2px solid #e8c84a' : '2px solid transparent',
              }}
            >
              <span style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '10px',
                fontWeight: 600,
                color: '#9a9890',
                width: '70px',
                flexShrink: 0,
                paddingTop: '1px',
              }}>
                {field.key}
              </span>
              <span style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '11px',
                color: field.highlight === 'red' ? '#c84a4a' : '#6b6a65',
                fontStyle: field.highlight === 'red' ? 'italic' : 'normal',
                lineHeight: 1.5,
              }}>
                {field.value}
              </span>
            </div>
          ))}
        </div>
        <div style={{
          background: '#F5F2EC',
          borderRadius: '4px',
          padding: '10px',
          fontFamily: "'Courier New', Courier, monospace",
          fontSize: '10px',
          color: '#9a9890',
          lineHeight: 1.6,
        }}>
          {'// No schema. No taxonomy. No way to query at scale.'}<br />
          {'// AI cannot build intelligence on top of this.'}
        </div>
      </div>
    </div>
  )
}

function PanelUninterpretable({ active }: { active: boolean }) {
  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      opacity: active ? 1 : 0,
      transition: 'opacity 0.5s ease',
      pointerEvents: active ? 'auto' : 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
    }}>
      <div style={{ width: '100%', maxWidth: '480px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {/* Query box */}
        <div style={{
          background: '#fff',
          borderRadius: '6px',
          border: '1px solid #dddbd4',
          padding: '14px 18px',
          boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
        }}>
          <div style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '9px',
            fontWeight: 700,
            textTransform: 'uppercase' as const,
            color: '#9a9890',
            letterSpacing: '0.08em',
            marginBottom: '7px',
          }}>
            Query
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 500,
            fontSize: '14px',
            color: '#1A1A18',
          }}>
            Who are our top VP-level candidates in credit?
            <span className="cursor-blink" style={{
              display: 'inline-block',
              width: '2px',
              height: '14px',
              background: '#1A6B3C',
              flexShrink: 0,
              marginLeft: '2px',
              verticalAlign: 'middle',
            }} />
          </div>
        </div>

        {/* Response box */}
        <div style={{
          background: '#fff',
          borderRadius: '6px',
          border: '1px solid #dddbd4',
          padding: '14px 18px',
          boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
        }}>
          <div style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '9px',
            fontWeight: 700,
            textTransform: 'uppercase' as const,
            color: '#9a9890',
            letterSpacing: '0.08em',
            marginBottom: '10px',
          }}>
            AI Response — Confidence: High
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '7px', marginBottom: '12px' }}>
            {queryResults.map(r => (
              <div key={r.rank} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '10px',
                  fontWeight: 700,
                  color: '#c8c6be',
                  width: '16px',
                  flexShrink: 0,
                }}>
                  {r.rank}
                </span>
                <div style={{ flex: 1 }}>
                  <span style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontWeight: 600,
                    fontSize: '12px',
                    color: '#1A1A18',
                    marginRight: '6px',
                  }}>
                    {r.name}
                  </span>
                  <span style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '10px',
                    color: '#9a9890',
                  }}>
                    {r.meta}
                  </span>
                </div>
                <span style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '10px',
                  fontWeight: 600,
                  color: '#c84a4a',
                  flexShrink: 0,
                }}>
                  &#8593; Top match
                </span>
              </div>
            ))}
          </div>
          <div style={{
            background: 'rgba(200,74,74,0.06)',
            borderLeft: '2px solid #c84a4a',
            borderRadius: '0 4px 4px 0',
            padding: '9px 13px',
            fontFamily: 'Inter, sans-serif',
            fontSize: '10px',
            color: '#c84a4a',
            lineHeight: 1.6,
          }}>
            &lsquo;Vice President&rsquo; at Goldman is not the same as &lsquo;VP&rsquo; at a 3-person fund.
            Without a financial services context layer, AI treats all titles as equivalent — and
            produces confident answers to the wrong question.
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Frontier() {
  const [activeTab, setActiveTab] = useState(0)
  const fillRefs = useRef<(HTMLDivElement | null)[]>([null, null, null])
  const rafRef = useRef<number>(0)
  const startRef = useRef<number | null>(null)
  const activeRef = useRef(0)

  useEffect(() => {
    cancelAnimationFrame(rafRef.current)
    fillRefs.current.forEach(el => { if (el) el.style.width = '0%' })
    activeRef.current = activeTab
    startRef.current = null

    const tick = (ts: number) => {
      if (startRef.current === null) startRef.current = ts
      const pct = Math.min(((ts - startRef.current) / DURATION) * 100, 100)
      const el = fillRefs.current[activeRef.current]
      if (el) el.style.width = `${pct}%`
      if (pct < 100) {
        rafRef.current = requestAnimationFrame(tick)
      } else {
        setActiveTab(prev => (prev + 1) % 3)
      }
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [activeTab])

  return (
    <section id="frontier" className="bg-[#F5F2EC] py-20 px-10 border-t border-[#1A1A18]/[0.08]">
      <style>{`
        .cursor-blink { animation: cursor-blink 1s step-end infinite; }
        @keyframes cursor-blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
      `}</style>

      <div className="max-w-[1100px] mx-auto px-14">

        {/* Copy block */}
        <div className="max-w-[680px] mb-12">
          <p className="font-sans text-[11px] text-[#9a9890] mb-5" style={{ letterSpacing: '0.08em' }}>
            <span style={{ color: '#1A6B3C' }}>01 —</span>
            {' '}The next frontier
          </p>

          <h2
            className="font-display font-bold text-[#1A1A18] leading-[1.1] mb-6"
            style={{ fontSize: 'clamp(28px, 3.5vw, 40px)', letterSpacing: '-0.025em' }}
          >
            AI has transformed how financial services firms trade, risk, and comply. People data is next.
          </h2>

          <p className="font-sans text-[14px] text-[#6b6a65] leading-[1.75] max-w-[580px]">
            The infrastructure already exists for financial data — structured, queryable, AI-ready.
            The same transformation is coming for people data. The firms that build the right
            foundation now will compound that advantage for years. The firms that wait will find
            that gap very difficult to close.
          </p>

          <p style={{
            fontFamily: "'Courier New', Courier, monospace",
            fontSize: '12px',
            color: '#9a9890',
            marginTop: '16px',
            lineHeight: 1.5,
          }}>
            The reason it hasn&apos;t happened yet is not ambition. It&apos;s infrastructure.
          </p>
        </div>

        {/* Tab + panel container */}
        <div style={{ border: '1px solid #dddbd4', borderRadius: '8px', overflow: 'hidden' }}>

          {/* Tab row */}
          <div style={{ display: 'flex', borderBottom: '1px solid #e0ddd6', background: '#F5F2EC' }}>
            {tabs.map((tab, i) => (
              <button
                key={tab.label}
                onClick={() => { if (i !== activeTab) setActiveTab(i) }}
                style={{
                  flex: 1,
                  padding: '18px 20px 20px',
                  textAlign: 'left',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  position: 'relative',
                  borderRight: i < 2 ? '1px solid #e0ddd6' : 'none',
                }}
              >
                <div style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 600,
                  fontSize: '15px',
                  color: activeTab === i ? '#1A1A18' : '#c8c6be',
                  marginBottom: '5px',
                  transition: 'color 0.2s',
                }}>
                  {tab.label}
                </div>
                <div
                  className="hidden md:block"
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '11px',
                    color: activeTab === i ? '#6b6a65' : '#9a9890',
                    maxWidth: '200px',
                    lineHeight: 1.5,
                    transition: 'color 0.2s',
                  }}
                >
                  {tab.desc}
                </div>
                {/* Fill track */}
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: '100%',
                  height: '2px',
                  background: '#e0ddd6',
                }}>
                  <div
                    ref={el => { fillRefs.current[i] = el }}
                    style={{ height: '100%', width: '0%', background: '#1A6B3C' }}
                  />
                </div>
              </button>
            ))}
          </div>

          {/* Visual panel */}
          <div
            className="h-[280px] md:h-[360px]"
            style={{ background: '#EDEAE3', position: 'relative', overflow: 'hidden' }}
          >
            <PanelFragmented active={activeTab === 0} />
            <PanelUnstructured active={activeTab === 1} />
            <PanelUninterpretable active={activeTab === 2} />
          </div>

        </div>
      </div>
    </section>
  )
}
