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
    <section
      id="possible"
      className="bg-dark-alt grid-bg py-[110px] px-10"
      style={{
        backgroundImage: `
          linear-gradient(rgba(15,110,86,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(15,110,86,0.04) 1px, transparent 1px)
        `,
        backgroundSize: '52px 52px',
      }}
    >
      <div className="max-w-content mx-auto px-14">

        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 mb-20 items-start">
          <div>
            <p className="font-mono text-[10px] tracking-widest uppercase mb-5">
              <span className="text-teal">02 —</span>
              <span className="text-teal/70"> What becomes possible</span>
            </p>
            <h2 className="font-sans font-medium text-[clamp(32px,4vw,51px)] tracking-tightest text-beige/95 leading-[1.16]">
              Ask anything about anyone —
              your network, their history,
              the whole market.
            </h2>
          </div>

          <div className="pt-1">
            <p className="font-sans text-[15px] text-beige/55 leading-[2]">
              Your firm already uses AI tools. Arbour gives them something to work with — a unified,
              structured, context-aware people graph that combines your institutional data with our
              proprietary market signals. The result: questions that used to take weeks of manual
              research get answered in seconds.
            </p>
          </div>
        </div>

        {/* Data flow diagram */}
        <div className="border border-beige/[0.08] rounded-sm overflow-hidden">
          <div className="grid grid-cols-[1fr_auto_1fr] gap-0 p-8 md:p-12 items-center min-h-[400px]">

            {/* Data inputs */}
            <div>
              <p className="font-mono text-[8px] tracking-widest text-teal/50 uppercase mb-6">Data Inputs</p>
              <div className="space-y-3">
                {dataSources.map((src, i) => (
                  <div key={src} className="flex items-center gap-3">
                    <div
                      className="h-px flex-1 max-w-[120px]"
                      style={{
                        background: `linear-gradient(90deg, transparent, ${i < 4 ? 'rgba(15,110,86,0.5)' : 'rgba(186,117,23,0.4)'})`
                      }}
                    />
                    <span
                      className="font-sans text-[10px] leading-tight"
                      style={{ color: i < 4 ? 'rgba(237,234,228,0.7)' : 'rgba(237,234,228,0.65)' }}
                    >
                      {src}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Central node */}
            <div className="mx-8 md:mx-16 flex flex-col items-center gap-2">
              <div className="w-20 h-20 md:w-28 md:h-28 rounded-full border border-teal/40 flex flex-col items-center justify-center bg-dark-alt">
                <span className="font-sans font-medium text-[13px] text-teal">ARBOUR</span>
                <span className="font-mono text-[7px] tracking-widest text-teal/60 uppercase mt-0.5">People Intelligence</span>
              </div>
            </div>

            {/* Outputs / queries */}
            <div>
              <p className="font-mono text-[8px] tracking-widest text-teal/50 uppercase mb-6 text-right">Your Team Asks</p>
              <div className="space-y-4">
                {queries.map((q, i) => (
                  <div key={i} className="flex items-start gap-3 justify-end">
                    <p className="font-sans text-[10px] italic text-beige/65 leading-snug text-right max-w-[240px]">
                      {q}
                    </p>
                    <div
                      className="h-px flex-1 max-w-[80px] mt-2"
                      style={{ background: 'linear-gradient(90deg, rgba(15,110,86,0.4), transparent)' }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Output tags */}
          <div className="border-t border-beige/[0.08] px-8 md:px-12 py-5 flex items-center gap-3 flex-wrap">
            <span className="font-mono text-[8px] tracking-widest text-teal/50 uppercase mr-2">Outputs:</span>
            {outputs.map(o => (
              <span
                key={o}
                className="font-mono text-[10px] text-teal/70 border border-teal/20 px-3 py-0.5 rounded-sm"
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
