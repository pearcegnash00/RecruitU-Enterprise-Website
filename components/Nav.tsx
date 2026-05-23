'use client'
import { useEffect, useState } from 'react'

const links = [
  { label: 'Home',                href: '#hero' },
  { label: 'Vision',              href: '#frontier' },
  { label: 'Platform',            href: '#platform' },
  { label: 'Product',             href: '#start' },
  { label: 'Investment Approach', href: '#proof' },
  { label: 'Insights',            href: '#faq' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    let ticking = false
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 40)
          ticking = false
        })
        ticking = true
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      id="site-nav"
      aria-label="Main navigation"
      className={`
        fixed top-5 left-1/2 -translate-x-1/2 z-50
        flex items-center h-11 pl-[18px] pr-1.5 gap-0
        border border-white/10 rounded-full
        whitespace-nowrap transition-all duration-300
        ${scrolled
          ? 'bg-[rgba(17,24,16,0.96)] shadow-[0_2px_24px_rgba(0,0,0,0.4)] backdrop-blur-xl'
          : 'bg-[rgba(17,24,16,0.75)] shadow-[0_2px_16px_rgba(0,0,0,0.25)] backdrop-blur-md'
        }
      `}
    >
      <span className="font-mono text-[13px] font-medium tracking-mono text-beige/90 mr-7">
        ARBOUR
      </span>

      <ul className="hidden md:flex items-center gap-6 mr-6 list-none">
        {links.map(l => (
          <li key={l.label}>
            <a
              href={l.href}
              className="font-sans text-[13px] text-beige/50 hover:text-beige/90 transition-colors duration-200"
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>

      <a
        href="#start"
        className="font-sans text-[13px] font-medium text-dark bg-beige/90 hover:bg-beige px-4 py-2 rounded-full transition-colors duration-200"
      >
        Contact Us
      </a>
    </nav>
  )
}
