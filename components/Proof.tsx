const stats = [
  { number: '50K+',   label: 'Structured people nodes' },
  { number: '1,000+', label: 'FS professionals mapped' },
  { number: '$8.5M',  label: 'Data coverage value' },
]

const clients = ['Point72', 'Cantor', 'Warburg Pincus']

export default function Proof() {
  return (
    <section id="proof" className="bg-off-white py-20 px-10 border-t border-ink/[0.08]">
      <div className="max-w-content mx-auto px-14">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-12 flex-wrap">

          <div className="flex flex-wrap gap-14">
            {stats.map(s => (
              <div key={s.number}>
                <p className="font-display font-medium text-[44px] tracking-tightest text-ink leading-none mb-2">
                  {s.number}
                </p>
                <p className="font-sans text-[10px] tracking-wide text-ink-mid uppercase">{s.label}</p>
              </div>
            ))}
          </div>

          <div className="lg:text-right">
            <p className="font-sans text-[9px] tracking-widest uppercase text-ink/40 mb-3">
              Trusted by
            </p>
            <div className="flex gap-2 flex-wrap lg:justify-end">
              {clients.map(c => (
                <span
                  key={c}
                  className="font-sans text-[13px] text-ink-mid border border-ink/15 px-3.5 py-1.5 hover:border-ink/30 hover:text-ink transition-colors duration-200 cursor-default"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
