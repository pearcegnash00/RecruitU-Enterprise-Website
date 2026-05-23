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
    <section id="timeline" className="bg-off-white py-[130px] px-10 border-t border-ink/[0.08]">
      <div className="max-w-content mx-auto px-14">

        <div className="mb-16">
          <div className="flex items-center gap-2.5 mb-5">
            <div className="w-1.5 h-1.5 bg-chartreuse" />
            <span className="font-sans text-[11px] tracking-[0.88px] uppercase text-ink/30">04 /</span>
            <span className="font-sans text-[11px] tracking-[0.88px] uppercase text-ink-mid">How we engage</span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-end">
            <h2 className="font-display font-medium text-[clamp(30px,4vw,52px)] tracking-tightest text-ink leading-[1.15]">
              From first conversation<br />
              to production.{' '}
              <span className="text-forest">In weeks, not years.</span>
            </h2>
            <p className="font-sans text-[14px] text-ink-mid leading-[1.95] max-w-[480px]">
              Four stages. One team embedded with yours. A working system in production
              within the last quarter of the year you start.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-ink/[0.08] border border-ink/[0.10]">
          {stages.map(s => (
            <div key={s.num} className="bg-off-white p-8 flex flex-col gap-7">
              <div className="w-7 h-7 rounded-full bg-chartreuse flex items-center justify-center flex-shrink-0">
                <span className="font-sans font-medium text-[10px] text-dark tracking-[0.2px]">{s.num}</span>
              </div>
              <div className="flex flex-col gap-3">
                <span className="font-sans text-[11px] tracking-[0.55px] text-amber">{s.weeks}</span>
                <h3 className="font-display font-medium text-[27px] tracking-tight text-ink leading-[1.67]">
                  {s.title}
                </h3>
                <p className="font-sans text-[14px] text-ink-mid leading-[1.65] max-w-[220px]">{s.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
