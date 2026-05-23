'use client'

export default function Nav() {
  return (
    <nav
      id="site-nav"
      aria-label="Main navigation"
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 pt-5"
    >
      {/* Logo */}
      <div className="flex items-center gap-2.5">
        <div className="w-4 h-4 rounded-full border border-[#2D9E5F] flex items-center justify-center flex-shrink-0">
          <div className="w-1.5 h-1.5 rounded-full bg-[#2D9E5F]" />
        </div>
        <span className="font-display text-[13px] font-semibold tracking-[0.1em] text-beige/90 select-none">
          ARBOUR
        </span>
      </div>

      {/* Right controls */}
      <div className="flex items-center gap-3">
        <a
          href="#start"
          className="font-sans text-[13px] font-medium text-dark bg-beige/90 hover:bg-beige px-5 py-2 rounded-full transition-colors duration-200"
        >
          Get Started
        </a>
        <button
          aria-label="Open menu"
          className="flex flex-col gap-[4px] p-2 -mr-2"
        >
          <span className="block w-[18px] h-[1.5px] bg-beige/80" />
          <span className="block w-[18px] h-[1.5px] bg-beige/80" />
          <span className="block w-[18px] h-[1.5px] bg-beige/80" />
        </button>
      </div>
    </nav>
  )
}
