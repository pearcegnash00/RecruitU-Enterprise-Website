export default function Frontier() {
  const cards = [
    {
      num: '01',
      title: 'Fragmented',
      body: "People data lives across your ATS, HRIS, recruiters' inboxes, and relationship networks — and none of it is connected. Every hiring cycle starts from zero. Institutional knowledge evaporates when people leave. There is no single view of any person, internal or external.",
    },
    {
      num: '02',
      title: 'Unstructured',
      body: "Even where data exists, it wasn't built to be used. Free text notes. Inconsistent titles. PDF resumes. No schema, no taxonomy, no way to query at scale. You can't build intelligence on top of chaos.",
    },
    {
      num: '03',
      title: 'Uninterpretable',
      body: "AI can read your data. It can't understand what it means. 'Vice President' at Goldman is not the same as 'Vice President' at a 10-person fund. Without a context layer that understands financial services from the inside, AI produces confident answers to the wrong questions.",
    },
  ]

  return (
    <section id="frontier" className="bg-beige py-[110px] px-10">
      <div className="max-w-content mx-auto px-14">

        {/* Text block */}
        <div className="max-w-[680px] pb-20">
          <p className="font-mono text-[10px] tracking-widest uppercase mb-5">
            <span className="text-teal">01 —</span>
            <span className="text-near-black/38"> The next frontier</span>
          </p>

          <h2 className="font-sans font-medium text-[clamp(28px,3.5vw,44px)] tracking-tighter text-near-black leading-[1.18] mb-7">
            AI has already transformed how financial services firms trade, risk,
            and comply. People data is next.
          </h2>

          <p className="font-sans text-[15px] text-mid-gray leading-[1.95] mb-5">
            The infrastructure already exists for financial data — structured, queryable, AI-ready.
            The same transformation is coming for people data. The firms that build the right
            foundation now will compound that advantage for years. The firms that wait will start
            from scratch when their competitors already have a two-year head start.
          </p>

          <p className="font-mono text-[13px] text-near-black/50 tracking-[0.52px]">
            Before we get there, three fundamental problems need to be solved.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 border border-black/[0.08] divide-x divide-black/[0.08]">
          {cards.map((c, i) => (
            <article
              key={c.num}
              className={`frontier-card relative bg-beige px-8 pt-10 pb-16 ${i === 2 ? '' : ''}`}
            >
              <p className="font-mono text-[10px] tracking-[1px] text-near-black/25 mb-5">{c.num}</p>
              <h3 className="font-sans font-medium text-[20px] tracking-tight text-near-black mb-3 mt-4">
                {c.title}
              </h3>
              <p className="font-sans text-[13px] text-mid-gray leading-[1.9]">{c.body}</p>
            </article>
          ))}
        </div>

        {/* Closing */}
        <p className="font-sans font-medium text-[clamp(18px,2.2vw,30px)] text-near-black text-center tracking-tight leading-[1.6] mt-14 max-w-[820px] mx-auto">
          This isn&rsquo;t a data problem. It&rsquo;s an infrastructure problem.
          And infrastructure is what we build.
        </p>
      </div>
    </section>
  )
}
