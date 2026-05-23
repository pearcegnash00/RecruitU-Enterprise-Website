export default function Footer() {
  return (
    <footer className="bg-dark border-t border-beige/[0.08] px-10 py-12">
      <div className="max-w-content mx-auto px-14">
        <div className="flex items-end justify-between gap-8 flex-wrap">

          {/* Wordmark */}
          <p
            className="font-sans font-medium text-beige leading-none select-none"
            style={{ fontSize: 'clamp(48px, 14vw, 180px)', letterSpacing: '-0.05em', lineHeight: 1 }}
          >
            ARBOUR
          </p>

          {/* Meta */}
          <div className="flex flex-col items-end gap-2 pb-1">
            <span className="font-mono text-[11px] tracking-mono text-beige/30 uppercase">
              © 2025 Arbour
            </span>
            <span className="font-mono text-[11px] tracking-mono text-beige/56 uppercase">
              People Intelligence Infrastructure
            </span>
            <span className="font-mono text-[11px] tracking-mono text-beige/30 uppercase mt-2">
              New York · NY
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
