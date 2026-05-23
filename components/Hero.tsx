'use client'
import { useEffect, useRef } from 'react'

const RAW: [number, number][] = [
  [0.06,0.10],[0.14,0.22],[0.08,0.38],[0.18,0.52],[0.06,0.65],
  [0.14,0.78],[0.24,0.12],[0.30,0.30],[0.22,0.45],[0.28,0.62],
  [0.20,0.80],[0.36,0.18],[0.38,0.38],[0.34,0.55],[0.30,0.72],
  [0.38,0.85],[0.46,0.10],[0.48,0.28],[0.44,0.48],[0.42,0.65],
  [0.48,0.82],[0.56,0.16],[0.54,0.35],[0.58,0.55],[0.52,0.72],
  [0.56,0.88],[0.64,0.08],[0.66,0.26],[0.62,0.44],[0.68,0.62],
  [0.60,0.78],[0.72,0.18],[0.74,0.38],[0.70,0.55],[0.76,0.72],
  [0.68,0.88],[0.80,0.10],[0.82,0.28],[0.78,0.48],[0.84,0.65],
  [0.76,0.82],[0.88,0.20],[0.90,0.40],[0.86,0.58],[0.92,0.75],
  [0.82,0.90],[0.94,0.12],[0.96,0.32],[0.92,0.88],[0.98,0.55],
]

type NodeObj = {
  rx: number; ry: number; x: number; y: number
  r: number; alpha: number; discovered: boolean; isGreen: boolean
}

function buildEdges(nodes: NodeObj[]) {
  const edges: [number, number][] = []
  const maxDist = 0.18
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const dx = nodes[i].rx - nodes[j].rx
      const dy = nodes[i].ry - nodes[j].ry
      if (Math.sqrt(dx * dx + dy * dy) < maxDist) edges.push([i, j])
    }
  }
  return edges
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const canvasRef  = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const section = sectionRef.current!
    const canvas  = canvasRef.current!
    if (!section || !canvas) return
    const ctx = canvas.getContext('2d')!
    if (!ctx) return

    const GREEN      = '#2D9E5F'
    const GREY_NODE  = 'rgba(200,200,190,0.55)'
    const GREY_EDGE  = 'rgba(200,200,190,0.12)'
    const GREEN_EDGE = 'rgba(45,158,95,0.75)'
    const REVEAL_R   = 110
    const HOVER_R    = 12
    // person icon uses bg color so it punches through the green circle
    const BG_COLOR   = 'rgba(17,24,16,0.9)'

    let W = section.offsetWidth
    let H = section.offsetHeight
    canvas.width = W
    canvas.height = H

    const mouse = { x: -999, y: -999 }

    const nodes: NodeObj[] = RAW.map(p => ({
      rx: p[0], ry: p[1],
      x: p[0] * W, y: p[1] * H,
      r: 5, alpha: 0, discovered: false, isGreen: false,
    }))

    const edges = buildEdges(nodes)
    const edgeDiscovered = new Array(edges.length).fill(false)
    let raf: number

    function tick() {
      ctx.clearRect(0, 0, W, H)
      const mx = mouse.x, my = mouse.y

      nodes.forEach(n => {
        const dist    = Math.hypot(n.x - mx, n.y - my)
        const inRadius = dist < REVEAL_R
        const onNode   = dist < HOVER_R
        if (inRadius && onNode) n.discovered = true
        n.alpha  += ((inRadius ? 1 : 0) - n.alpha) * 0.14
        n.isGreen = n.discovered || (inRadius && onNode)
      })

      edges.forEach(([a, b], i) => {
        if (nodes[a].discovered && nodes[b].discovered) edgeDiscovered[i] = true
      })

      // edges
      edges.forEach(([a, b], i) => {
        const na = nodes[a], nb = nodes[b]
        const ea = Math.min(na.alpha, nb.alpha)
        if (ea < 0.01) return
        const green = edgeDiscovered[i] || (na.isGreen && nb.isGreen)
        ctx.save()
        ctx.globalAlpha = ea
        ctx.beginPath()
        ctx.moveTo(na.x, na.y)
        ctx.lineTo(nb.x, nb.y)
        ctx.strokeStyle = green ? GREEN_EDGE : GREY_EDGE
        ctx.lineWidth   = green ? 1 : 0.5
        ctx.stroke()
        ctx.restore()
      })

      // nodes
      nodes.forEach(n => {
        if (n.alpha < 0.01) return
        ctx.save()
        ctx.globalAlpha = n.alpha

        // outer circle
        ctx.beginPath()
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2)
        ctx.fillStyle   = n.isGreen ? GREEN : 'transparent'
        ctx.fill()
        ctx.strokeStyle = n.isGreen ? GREEN : GREY_NODE
        ctx.lineWidth   = n.isGreen ? 1.5 : 1
        ctx.stroke()

        if (n.isGreen) {
          // person silhouette: head
          ctx.beginPath()
          ctx.arc(n.x, n.y - n.r * 0.22, n.r * 0.34, 0, Math.PI * 2)
          ctx.fillStyle = BG_COLOR
          ctx.fill()

          // person silhouette: body (clipped half-arc + torso)
          ctx.save()
          ctx.beginPath()
          ctx.arc(n.x, n.y + n.r * 1.1, n.r * 0.72, 0, Math.PI, true)
          ctx.rect(n.x - n.r, n.y - n.r * 0.1, n.r * 2, n.r * 1.2)
          ctx.clip()
          ctx.beginPath()
          ctx.arc(n.x, n.y + n.r * 0.68, n.r * 0.62, 0, Math.PI * 2)
          ctx.fillStyle = BG_COLOR
          ctx.fill()
          ctx.restore()
        }

        ctx.restore()
      })

      raf = requestAnimationFrame(tick)
    }

    function onMove(e: MouseEvent) {
      const r = section.getBoundingClientRect()
      mouse.x = e.clientX - r.left
      mouse.y = e.clientY - r.top
    }
    function onLeave() { mouse.x = -999; mouse.y = -999 }
    function onResize() {
      W = section.offsetWidth
      H = section.offsetHeight
      canvas.width = W
      canvas.height = H
      nodes.forEach(n => { n.x = n.rx * W; n.y = n.ry * H })
    }

    raf = requestAnimationFrame(tick)
    section.addEventListener('mousemove', onMove)
    section.addEventListener('mouseleave', onLeave)
    window.addEventListener('resize', onResize, { passive: true })

    return () => {
      cancelAnimationFrame(raf)
      section.removeEventListener('mousemove', onMove)
      section.removeEventListener('mouseleave', onLeave)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-dark"
      style={{
        background: 'linear-gradient(to bottom, #111810 0%, #0f2318 70%, #1a3a28 100%)',
      }}
    >
      {/* Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        aria-hidden="true"
      />

      {/* Centred headline */}
      <div className="absolute inset-0 z-10 pointer-events-none flex flex-col items-center justify-center text-center px-8">
        <h1
          className="font-sans font-bold text-beige leading-[1.08] tracking-[-0.03em]"
          style={{ fontSize: 'clamp(32px,5.5vw,56px)' }}
        >
          Your people knowledge.<br />
          Our people graph.<br />
          <span className="text-chartreuse">One intelligence layer.</span>
        </h1>

        <p className="mt-6 font-sans text-[15px] text-beige/50 max-w-[440px] leading-relaxed">
          We connect the people data your firm has spent decades building
          — and make it queryable, actionable, and compounding.
        </p>

        <div className="mt-8 pointer-events-auto">
          <a
            href="#start"
            className="font-sans text-[13px] font-semibold text-dark bg-beige hover:bg-beige/90 px-5 py-2 rounded-full transition-colors duration-200"
            style={{ letterSpacing: '0.04em' }}
          >
            Get Started
          </a>
        </div>
      </div>

      {/* Scroll arrow */}
      <div
        className="animate-bob absolute bottom-7 left-1/2 z-20 flex flex-col items-center gap-1.5"
        style={{ transform: 'translateX(-50%)' }}
        aria-hidden="true"
      >
        <div
          className="w-px h-7"
          style={{ background: 'linear-gradient(to bottom, transparent, rgba(232,221,208,0.3))' }}
        />
        <div
          className="w-2.5 h-2.5 border-r border-b"
          style={{
            borderColor: 'rgba(232,221,208,0.4)',
            transform: 'rotate(45deg)',
            marginTop: '-4px',
          }}
        />
      </div>

      {/* Fade to next section */}
      <div
        className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none z-5"
        style={{ background: 'linear-gradient(to bottom, transparent, rgba(17,24,16,0.5))' }}
      />
    </section>
  )
}
