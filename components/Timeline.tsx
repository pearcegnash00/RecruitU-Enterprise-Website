const stages = [
  {
    num: '01',
    weeks: 'Weeks 1–2',
    title: 'Discovery',
    body: 'We embed with your team. Map data sources, systems, and highest-value use cases. Define what success looks like.',
  },
  {
    num: '02',
    weeks: 'Weeks 3–4',
    title: 'Architecture',
    body: 'We connect your internal data to the Arbour people graph. Build the context layer for your specific organization.',
  },
  {
    num: '03',
    weeks: 'Weeks 5–8',
    title: 'Build',
    body: 'Custom AI applications deployed into the systems your team already uses. Built around your workflows, not ours.',
  },
  {
    num: '04',
    weeks: 'Ongoing',
    title: 'Partner',
    body: 'We stay. Data licensing, agent maintenance, and ongoing strategic partnership as your needs evolve.',
  },
]

export default function Timeline() {
  return (
    <section
      id="timeline"
      className="bg-dark py-[130px] px-10 border-t border-beige/[0.06]"
    >
      <div className="max-w-content mx-auto px-14">

        {/* Header */}
        <div className="mb-16">
          <div className="flex items-center gap-2.5 mb-5">
            <div className="w-1.5 h-1.5 bg-chartreuse" />
            <span className="font-mono text-[11px] tracking-[0.88px] uppercase text-beige/30">04 /</span>
            <span className="font-mono text-[11px] tracking-[0.88px] uppercase text-beige/56">How we engage</span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-end">
            <h2 className="font-sans font-medium text-[clamp(30px,4vw,52px)] tracking-tightest text-beige leading-[1.15]">
              From first conversation<br />
              to production.{' '}
              <span className="text-chartreuse">In weeks, not years.</span>
            </h2>
            <p className="font-sans text-[14px] text-beige/56 leading-[1.95] max-w-[480px]">
              Four stages. One team embedded with yours. A working system in production
              within the last quarter of the year you start.
            </p>
          </div>
        </div>

        {/* Stages */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-beige/[0.08] border border-beige/[0.08]">
          {stages.map(s => (
            <div key={s.num} className="bg-dark p-8 flex flex-col gap-7">

              {/* Circle */}
              <div className="w-7 h-7 rounded-full bg-chartreuse flex items-center justify-center flex-shrink-0">
                <span className="font-mono font-medium text-[10px] text-dark tracking-[0.2px]">{s.num}</span>
              </div>

              {/* Body */}
              <div className="flex flex-col gap-3">
                <span className="font-mono text-[11px] tracking-[0.55px] text-amber-bright">{s.weeks}</span>
                <h3 className="font-sans font-medium text-[27px] tracking-tight text-beige leading-[1.67]">
                  {s.title}
                </h3>
                <p className="font-sans text-[14px] text-beige/56 leading-[1.65] max-w-[220px]">{s.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
