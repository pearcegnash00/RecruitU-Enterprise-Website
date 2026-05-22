const stats = [
  { number: '50K+',  label: 'Structured people nodes' },
  { number: '1,000+', label: 'FS professionals mapped' },
  { number: '$8.5M', label: 'Data coverage value' },
]

const clients = ['Point72', 'Cantor', 'Warburg Pincus']

export default function Proof() {
  return (
    <section id="proof" className="bg-dark py-20 px-10 border-t border-beige/[0.06]">
      <div className="max-w-content mx-auto px-14">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-12 flex-wrap">

          {/* Stats */}
          <div className="flex flex-wrap gap-14">
            {stats.map(s => (
              <div key={s.number}>
                <p className="font-sans font-medium text-[44px] tracking-tightest text-beige leading-none mb-2">
                  {s.number}
                </p>
                <p className="font-mono text-[10px] tracking-wide text-beige/30 uppercase">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Clients */}
          <div className="lg:text-right">
            <p className="font-mono text-[9px] tracking-widest uppercase text-beige/30 mb-3">
              Trusted by
            </p>
            <div className="flex gap-2 flex-wrap lg:justify-end">
              {clients.map(c => (
                <span
                  key={c}
                  className="font-sans text-[13px] text-beige/50 border border-beige/15 px-3.5 py-1.5 hover:border-beige/30 hover:text-beige/70 transition-colors duration-200 cursor-default"
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
