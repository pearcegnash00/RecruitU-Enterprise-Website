const cards = [
  {
    num: 'P.01',
    title: "An advisor network that's been in the seat.",
    body: 'Our angel investors and advisors are operators who built the desks we now serve. They know what a VP at Goldman means. They know what good hiring looks like at a fund versus a bank. That domain knowledge is baked into our product.',
  },
  {
    num: 'P.02',
    title: 'Builders who understand the domain.',
    body: 'Our engineers and product team came from financial services, data infrastructure, and enterprise AI. They know what a VP at Goldman means versus a VP at a 10-person fund. They build for the edge cases that matter.',
  },
  {
    num: 'P.03',
    title: 'A team that shows up at your office.',
    body: 'Arbour embeds with your people. We don\'t hand you software and disappear. We run discovery with your team, shape the architecture together, and stay through the build. Every engagement ends with a system your team owns.',
  },
]

export default function Platform() {
  return (
    <section id="platform" className="bg-dark py-[160px] px-10">
      <div className="max-w-[1280px] mx-auto px-14">

        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-24 mb-16 items-end">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-1.5 h-1.5 bg-chartreuse" />
              <span className="font-mono text-[11px] tracking-[0.88px] uppercase text-beige/30">03 /</span>
              <span className="font-mono text-[11px] tracking-[0.88px] uppercase text-beige/56">Who we are</span>
            </div>
            <h2 className="font-sans font-medium text-[clamp(48px,5.5vw,70px)] tracking-tightest text-beige leading-[1.12]">
              We are<br />people.<br />Not<br />agents.
            </h2>
          </div>

          <div className="self-end pb-1 max-w-[925px]">
            <p className="font-sans text-[clamp(16px,1.8vw,24px)] text-beige/56 tracking-tight leading-[1.45]">
              The difference between Arbour and every other AI vendor is who shows up.
              Our team has lived your problems — as operators, investors, and technologists
              inside the organizations we now serve. We are thought leaders, problem
              identifiers, and client partners. We will get it done.
            </p>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 border border-beige/[0.08] divide-x divide-beige/[0.08]">
          {cards.map(c => (
            <article key={c.num} className="bg-dark relative min-h-[420px] p-11">
              <span className="font-mono text-[11px] tracking-[0.88px] text-beige/30 mb-16 block">{c.num}</span>

              {/* Icon placeholder */}
              <div
                className="w-full aspect-[4/3] border border-beige/[0.08] rounded-sm mb-10 flex items-center justify-center"
                style={{
                  backgroundImage: `
                    linear-gradient(rgba(240,237,232,0.04) 5%, transparent 5%),
                    linear-gradient(90deg, rgba(240,237,232,0.04) 5%, transparent 5%)
                  `,
                  backgroundSize: '20px 20px',
                }}
              >
                <div className="w-4 h-4 rounded-full border border-teal/40 bg-teal/10" />
              </div>

              <h3 className="font-sans font-medium text-[20px] tracking-tight text-beige leading-[1.65] mb-4">
                {c.title}
              </h3>
              <p className="font-sans text-[13px] text-beige/56 leading-[1.9]">{c.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
