export default function Footer() {
  return (
    <footer className="bg-off-white border-t border-ink/[0.08] px-10 py-12">
      <div className="max-w-content mx-auto px-14">
        <div className="flex items-end justify-between gap-8 flex-wrap">

          <p
            className="font-display font-medium text-ink leading-none select-none"
            style={{ fontSize: 'clamp(48px, 14vw, 180px)', letterSpacing: '-0.05em', lineHeight: 1 }}
          >
            ARBOUR
          </p>

          <div className="flex flex-col items-end gap-2 pb-1">
            <span className="font-sans text-[11px] tracking-mono text-ink/30 uppercase">
              © 2025 Arbour
            </span>
            <span className="font-sans text-[11px] tracking-mono text-ink-mid uppercase">
              People Intelligence Infrastructure
            </span>
            <span className="font-sans text-[11px] tracking-mono text-ink/30 uppercase mt-2">
              New York · NY
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
