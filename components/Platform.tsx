const cards = [
  {
    num: 'P.01',
    title: "An advisor network that's been in the seat.",
    body: 'Our angel investors and advisors are operators who built the desks we now serve. They know what a VP at Goldman means. They know what good hiring looks like at a fund versus a bank. That domain knowledge is baked into our product.',
  },
  {
    num: 'P.02',
    title: 'Builders who understand the domain.',
    body: "Our engineers and product team came from financial services, data infrastructure, and enterprise AI. They've lived the systems they now build against — the schemas, the failure modes, the workarounds that accumulate over decades. They build for the edge cases that matter.",
  },
  {
    num: 'P.03',
    title: 'A team that shows up at your office.',
    body: "Arbour embeds with your people. We don't hand you software and disappear. We run discovery with your team, shape the architecture together, and stay through the build. Every engagement ends with a system your team owns.",
  },
]

export default function Platform() {
  return (
    <section id="platform" className="bg-off-white py-[160px] px-10 border-t border-ink/[0.08]">
      <div className="max-w-[1280px] mx-auto px-14">

        <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-24 mb-16 items-end">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-1.5 h-1.5 bg-chartreuse" />
              <span className="font-sans text-[11px] tracking-[0.88px] uppercase text-ink/30">03 /</span>
              <span className="font-sans text-[11px] tracking-[0.88px] uppercase text-ink-mid">Who we are</span>
            </div>
            <h2 className="font-display font-medium text-[clamp(48px,5.5vw,70px)] tracking-tightest text-ink leading-[1.12]">
              We are<br />people.<br />Not<br />agents.
            </h2>
          </div>

          <div className="self-end pb-1 max-w-[925px]">
            <p className="font-sans text-[clamp(16px,1.8vw,24px)] text-ink-mid tracking-tight leading-[1.45]">
              The difference between Arbour and every other AI vendor is who shows up.
              Our team has lived your problems — as operators, investors, and technologists
              inside the organizations we now serve. We are thought leaders, problem
              identifiers, and client partners. We will get it done.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 border border-ink/[0.10] divide-x divide-ink/[0.10]">
          {cards.map(c => (
            <article key={c.num} className="bg-off-white relative p-11 flex flex-col gap-8">
              <span className="font-sans text-[11px] tracking-[0.88px] text-ink/30">{c.num}</span>
              <div className="flex flex-col gap-4 flex-1">
                <h3 className="font-display font-medium text-[20px] tracking-tight text-ink leading-[1.35]">
                  {c.title}
                </h3>
                <p className="font-sans text-[13px] text-ink-mid leading-[1.9]">{c.body}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
