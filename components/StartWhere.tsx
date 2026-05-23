export default function StartWhere() {
  return (
    <section id="start" className="bg-off-white py-[110px] px-10 border-t border-ink/[0.08]">
      <div className="max-w-content mx-auto px-14">

        <div className="mb-12">
          <h2 className="font-display font-medium text-[clamp(36px,4.5vw,64px)] tracking-tightest text-ink leading-[1.1] mb-4">
            Start<br />where<br />you are.
          </h2>
          <p className="font-sans text-[14px] text-ink-mid leading-[1.9] max-w-[480px] mt-6">
            Try the software in a single query. Or scope a transformation engagement
            built around the way your firm works.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-ink/[0.08] border border-ink/[0.10]">

          <div className="bg-off-white p-12 flex flex-col">
            <span className="font-sans text-[10px] tracking-mono text-forest border border-forest/30 bg-forest/8 px-3 py-1 rounded-sm self-start mb-8">
              SOFTWARE
            </span>
            <h3 className="font-display font-medium text-[clamp(18px,2vw,28px)] tracking-tight text-ink leading-[1.4] mb-4 flex-1">
              See what your people data can do — today.
            </h3>
            <p className="font-sans text-[14px] text-ink-mid leading-[1.85] mb-10 max-w-[340px]">
              Connect your ATS or CRM and run your first structured people query in under
              48 hours. No commitment required.
            </p>
            <div className="flex items-center gap-6">
              <a
                href="mailto:hello@arbour.com"
                className="font-sans text-[13px] font-medium text-off-white bg-ink hover:bg-ink/85 px-5 py-2.5 rounded-full transition-colors duration-200"
              >
                Get started
              </a>
              <a
                href="mailto:hello@arbour.com"
                className="font-sans text-[11px] tracking-mono text-ink-mid hover:text-forest transition-colors duration-200"
              >
                hello@arbour.com →
              </a>
            </div>
          </div>

          <div className="bg-off-white p-12 flex flex-col">
            <span className="font-sans text-[10px] tracking-mono text-amber border border-amber/30 bg-amber/10 px-3 py-1 rounded-sm self-start mb-8">
              DATA SERVICES
            </span>
            <h3 className="font-display font-medium text-[clamp(18px,2vw,28px)] tracking-tight text-ink leading-[1.4] mb-4 flex-1">
              Continue the transformation journey.
            </h3>
            <p className="font-sans text-[14px] text-ink-mid leading-[1.85] mb-10 max-w-[340px]">
              For firms ready to build a people intelligence infrastructure from the
              ground up. Starts with a discovery engagement, ends with a system you own.
            </p>
            <div className="flex items-center gap-6">
              <a
                href="mailto:hello@arbour.com"
                className="font-sans text-[13px] font-medium text-dark bg-amber-bright hover:bg-amber px-5 py-2.5 rounded-full transition-colors duration-200"
              >
                Talk to us →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
