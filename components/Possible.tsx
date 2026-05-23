const queries = [
  "Who in our network has covered fintech at the associate level and moved buy-side in the last 18 months?",
  "Which candidates from our last three analyst classes are now at target firms for our new fund?",
  "Who do we know that has advised on healthcare M&A and would take an expert network call?",
  "Surface the top 10 lateral candidates matching our VP profile who have shown intent signals in the last 90 days.",
]

const dataSources = ['ATS / CRM', 'HRIS', 'Email / Networks', 'Arbour Platform', 'Talent Signals', 'Career Graph', 'Job Intent Data']
const outputs     = ['Hire', 'Source', 'Research', 'Connect', 'Invest']

export default function Possible() {
  return (
    <section id="possible" className="bg-off-white py-[110px] px-10 border-t border-ink/[0.08]">
      <div className="max-w-content mx-auto px-14">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 mb-20 items-start">
          <div>
            <p className="font-display text-[10px] tracking-widest uppercase mb-5">
              <span className="text-forest">02 —</span>
              <span className="text-forest/70"> What becomes possible</span>
            </p>
            <h2 className="font-display font-medium text-[clamp(32px,4vw,51px)] tracking-tightest text-ink leading-[1.16]">
              Ask anything about anyone —
              your network, their history,
              the whole market.
            </h2>
          </div>

          <div className="pt-1">
            <p className="font-sans text-[15px] text-ink-mid leading-[2]">
              Your firm already uses AI tools. Arbour gives them something to work with — a unified,
              structured, context-aware people graph that combines your institutional data with our
              proprietary market signals. The result: questions that used to take weeks of manual
              research get answered in seconds.
            </p>
          </div>
        </div>

        <div className="border border-ink/[0.10] rounded-sm overflow-hidden">
          <div className="grid grid-cols-[1fr_auto_1fr] gap-0 p-8 md:p-12 items-center min-h-[400px]">

            <div>
              <p className="font-sans text-[8px] tracking-widest text-forest/60 uppercase mb-6">Data Inputs</p>
              <div className="space-y-3">
                {dataSources.map((src, i) => (
                  <div key={src} className="flex items-center gap-3">
                    <div
                      className="h-px flex-1 max-w-[120px]"
                      style={{
                        background: `linear-gradient(90deg, transparent, ${i < 4 ? 'rgba(26,107,60,0.5)' : 'rgba(186,117,23,0.4)'})`
                      }}
                    />
                    <span className="font-sans text-[10px] leading-tight text-ink/70">{src}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mx-8 md:mx-16 flex flex-col items-center gap-2">
              <div className="w-20 h-20 md:w-28 md:h-28 rounded-full border border-forest/40 flex flex-col items-center justify-center bg-off-white">
                <span className="font-display font-medium text-[13px] text-forest">ARBOUR</span>
                <span className="font-sans text-[7px] tracking-widest text-forest/60 uppercase mt-0.5">People Intelligence</span>
              </div>
            </div>

            <div>
              <p className="font-sans text-[8px] tracking-widest text-forest/60 uppercase mb-6 text-right">Your Team Asks</p>
              <div className="space-y-4">
                {queries.map((q, i) => (
                  <div key={i} className="flex items-start gap-3 justify-end">
                    <p className="font-sans text-[10px] italic text-ink-mid leading-snug text-right max-w-[240px]">
                      {q}
                    </p>
                    <div
                      className="h-px flex-1 max-w-[80px] mt-2"
                      style={{ background: 'linear-gradient(90deg, rgba(26,107,60,0.4), transparent)' }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-ink/[0.08] px-8 md:px-12 py-5 flex items-center gap-3 flex-wrap">
            <span className="font-sans text-[8px] tracking-widest text-forest/60 uppercase mr-2">Outputs:</span>
            {outputs.map(o => (
              <span
                key={o}
                className="font-sans text-[10px] text-forest/80 border border-forest/25 px-3 py-0.5 rounded-sm"
              >
                {o}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
