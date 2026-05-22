'use client'
import { useEffect, useRef } from 'react'

const LABELS = [
  'P.NODE.047', 'SRC.INT.12', 'LAT.MKT.33', 'HIRE.01', 'BD.NET.09',
  'EXP.SRC.21', 'INV.SIG.07', 'DATA.CORE',  'CTX.LAYER', 'GRAPH.01',
  'CLIENT.A',  'SIGNAL.44',  'TRACK.08',   'INTEL.03', 'NET.EXP',
  'LATERAL.55','CAMPUS.12',  'HF.TIER.1',  'PE.NODE.3','BANK.SRC.7',
]

export default function Hero() {
  const canvasRef  = useRef<HTMLCanvasElement>(null)
  const counterRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const canvas = canvasRef.current!
    if (!canvas) return
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
    if (!ctx) return

    // Colors (optimised for dark background)
    const C_GRID   = 'rgba(15,110,86,0.09)'
    const C_CORNER = 'rgba(15,110,86,0.22)'
    const C_LINE   = 'rgba(15,110,86,0.32)'
    const C_TEAL   = '#0F6E56'
    const C_TEAL_B = '#13896A'
    const C_AMBER  = '#BA7517'
    const C_AMBER_B= '#D4891E'

    const MAX_NODES    = 26
    const SPAWN_EVERY  = 26
    const CONNECT_DIST = 200
    const MAX_CONN     = 3
    const GRID_SZ      = 52
    const LERP         = 0.055

    const layers = [
      { cx: 0, cy: 0, tx: 0, ty: 0, max: 5  },
      { cx: 0, cy: 0, tx: 0, ty: 0, max: 12 },
      { cx: 0, cy: 0, tx: 0, ty: 0, max: 20 },
    ]

    type Node = { x: number; y: number; r: number; isAmber: boolean; age: number; connections: number; labelIdx: number; labelDelay: number }
    type Line = { a: Node; b: Node; progress: number }

    let mouseX = 0, mouseY = 0
    let nodes: Node[]  = []
    let lines: Line[]  = []
    let frame  = 0
    let paused = false
    let raf: number

    function resize() {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
      mouseX = canvas.width  / 2
      mouseY = canvas.height / 2
    }

    function updateParallax() {
      const nx = (mouseX / canvas.width  - 0.5) * 2
      const ny = (mouseY / canvas.height - 0.5) * 2
      layers.forEach(l => {
        l.tx  = nx * l.max; l.ty = ny * l.max
        l.cx += (l.tx - l.cx) * LERP
        l.cy += (l.ty - l.cy) * LERP
      })
    }

    function drawGrid() {
      const l = layers[0]
      const w = canvas.width, h = canvas.height
      ctx.save()
      ctx.translate(l.cx, l.cy)
      ctx.strokeStyle = C_GRID; ctx.lineWidth = 0.5
      const pad = GRID_SZ * 2
      for (let x = -pad; x < w + pad; x += GRID_SZ) {
        ctx.beginPath(); ctx.moveTo(x, -pad); ctx.lineTo(x, h + pad); ctx.stroke()
      }
      for (let y = -pad; y < h + pad; y += GRID_SZ) {
        ctx.beginPath(); ctx.moveTo(-pad, y); ctx.lineTo(w + pad, y); ctx.stroke()
      }
      ctx.restore()
      const m = 24, s = 10
      const corners = [[m, m], [w - m, m], [m, h - m], [w - m, h - m]]
      ctx.strokeStyle = C_CORNER; ctx.lineWidth = 1
      corners.forEach(([cx, cy]) => {
        ctx.beginPath()
        ctx.moveTo(cx - s, cy); ctx.lineTo(cx + s, cy)
        ctx.moveTo(cx, cy - s); ctx.lineTo(cx, cy + s)
        ctx.stroke()
      })
    }

    function drawLines() {
      const l = layers[1]
      ctx.save(); ctx.translate(l.cx, l.cy)
      lines.forEach(ln => {
        ln.progress = Math.min(1, ln.progress + 0.013)
        const { a, b, progress: p } = ln
        const ex = a.x + (b.x - a.x) * p
        const ey = a.y + (b.y - a.y) * p
        ctx.strokeStyle = C_LINE; ctx.lineWidth = 0.8
        ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(ex, ey); ctx.stroke()
        if (p > 0.5) {
          const mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2
          const dx = b.x - a.x, dy = b.y - a.y
          const len = Math.hypot(dx, dy) || 1
          const tx = (-dy / len) * 5, ty = (dx / len) * 5
          ctx.strokeStyle = 'rgba(15,110,86,0.4)'; ctx.lineWidth = 0.6
          ctx.beginPath()
          ctx.moveTo(mx - tx, my - ty); ctx.lineTo(mx + tx, my + ty)
          ctx.stroke()
        }
        if (p > 0.85) {
          ctx.fillStyle = 'rgba(15,110,86,0.45)'
          ctx.font = '7px "IBM Plex Mono"'
          ctx.fillText(
            Math.round(Math.hypot(b.x - a.x, b.y - a.y)) + 'u',
            (a.x + b.x) / 2 + 8,
            (a.y + b.y) / 2 - 2
          )
        }
      })
      ctx.restore()
    }

    function drawNodes() {
      const l = layers[2]
      ctx.save(); ctx.translate(l.cx, l.cy)
      nodes.forEach(nd => {
        nd.age++
        const { x, y, r, isAmber } = nd
        const color  = isAmber ? C_AMBER   : C_TEAL
        const bright = isAmber ? C_AMBER_B : C_TEAL_B
        const ringR = r + 5, cs = ringR + 8
        ctx.strokeStyle = isAmber ? 'rgba(186,117,23,0.65)' : 'rgba(15,110,86,0.65)'
        ctx.lineWidth = 0.8
        ctx.beginPath(); ctx.arc(x, y, ringR, 0, Math.PI * 2); ctx.stroke()
        ctx.strokeStyle = isAmber ? 'rgba(186,117,23,0.35)' : 'rgba(15,110,86,0.35)'
        ctx.lineWidth = 0.5; ctx.beginPath()
        ctx.moveTo(x - cs, y); ctx.lineTo(x - ringR - 1, y)
        ctx.moveTo(x + ringR + 1, y); ctx.lineTo(x + cs, y)
        ctx.moveTo(x, y - cs); ctx.lineTo(x, y - ringR - 1)
        ctx.moveTo(x, y + ringR + 1); ctx.lineTo(x, y + cs)
        ctx.stroke()
        ctx.fillStyle = isAmber ? 'rgba(186,117,23,0.8)' : 'rgba(15,110,86,0.8)'
        ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill()
        ctx.fillStyle = bright
        ctx.beginPath(); ctx.arc(x, y, r * 0.4, 0, Math.PI * 2); ctx.fill()
        if (nd.age > nd.labelDelay) {
          const label = LABELS[nd.labelIdx]
          const chars = Math.min(Math.floor((nd.age - nd.labelDelay) * 0.35), label.length)
          if (chars > 0) {
            ctx.fillStyle = isAmber ? 'rgba(186,117,23,0.6)' : 'rgba(15,110,86,0.6)'
            ctx.font = '7px "IBM Plex Mono"'
            ctx.fillText(label.slice(0, chars), x + cs + 3, y + 3)
          }
        }
      })
      ctx.restore()
    }

    function spawnNode() {
      if (nodes.length >= MAX_NODES) return
      const margin = 80
      const nd: Node = {
        x: margin + Math.random() * (canvas.width  - margin * 2),
        y: margin + Math.random() * (canvas.height - margin * 2),
        r: 3 + Math.random() * 1.5,
        isAmber:     Math.random() < 0.18,
        age:         0,
        connections: 0,
        labelIdx:    Math.floor(Math.random() * LABELS.length),
        labelDelay:  35 + Math.floor(Math.random() * 45),
      }
      nodes.push(nd)
      nodes
        .filter(n => n !== nd && n.connections < MAX_CONN)
        .map(n => ({ n, d: Math.hypot(n.x - nd.x, n.y - nd.y) }))
        .filter(({ d }) => d < CONNECT_DIST)
        .sort((a, b) => a.d - b.d)
        .slice(0, MAX_CONN)
        .forEach(({ n }) => {
          if (nd.connections < MAX_CONN && n.connections < MAX_CONN) {
            lines.push({ a: nd, b: n, progress: 0 })
            nd.connections++; n.connections++
          }
        })
      if (counterRef.current) counterRef.current.textContent = String(nodes.length)
    }

    function addRandomConnection() {
      const avail = nodes.filter(n => n.connections < MAX_CONN)
      if (avail.length < 2) return
      const shuffled = avail.slice().sort(() => Math.random() - 0.5)
      for (let i = 0; i < shuffled.length; i++) {
        for (let j = i + 1; j < shuffled.length; j++) {
          const a = shuffled[i], b = shuffled[j]
          if (Math.hypot(a.x - b.x, a.y - b.y) < CONNECT_DIST) {
            const exists = lines.some(l => (l.a === a && l.b === b) || (l.a === b && l.b === a))
            if (!exists) {
              lines.push({ a, b, progress: 0 })
              a.connections++; b.connections++
              return
            }
          }
        }
      }
    }

    function loop() {
      if (paused) return
      frame++
      updateParallax()
      if (nodes.length < MAX_NODES && frame % SPAWN_EVERY === 0) spawnNode()
      if (nodes.length >= MAX_NODES && frame % 200 === 0) addRandomConnection()
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      drawGrid(); drawLines(); drawNodes()
      raf = requestAnimationFrame(loop)
    }

    function init() {
      resize(); nodes = []; lines = []; frame = 0
      layers.forEach(l => { l.cx = l.cy = l.tx = l.ty = 0 })
    }

    init()
    raf = requestAnimationFrame(loop)

    const onMove   = (e: MouseEvent) => { mouseX = e.clientX; mouseY = e.clientY }
    const onResize = () => { cancelAnimationFrame(raf); init(); raf = requestAnimationFrame(loop) }
    const onVis    = () => { paused = document.hidden; if (!paused) raf = requestAnimationFrame(loop) }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('resize', onResize, { passive: true })
    document.addEventListener('visibilitychange', onVis)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('resize', onResize)
      document.removeEventListener('visibilitychange', onVis)
    }
  }, [])

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col overflow-hidden bg-dark"
      style={{
        backgroundImage: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(15,110,86,0.12) 0%, transparent 60%)',
      }}
    >
      {/* Canvas */}
      <canvas
        id="blueprint-canvas"
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        aria-hidden="true"
      />

      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 100% 100% at 50% 50%, transparent 40%, rgba(17,24,16,0.7) 100%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-start justify-end flex-1 px-10 pb-20 pt-40 max-w-[1200px] mx-auto w-full">
        <div className="animate-fade-up" style={{ animationDelay: '0.3s' }}>
          <p className="font-mono text-[10px] tracking-widest text-teal/70 uppercase mb-6">
            People Intelligence Infrastructure
          </p>
          <h1 className="font-sans font-medium text-[clamp(42px,6.5vw,88px)] leading-[1.04] tracking-tightest text-beige mb-6">
            Your people knowledge.<br />
            Our people graph.<br />
            <span className="text-chartreuse">One intelligence layer.</span>
          </h1>
          <p className="font-sans text-[15px] text-beige/50 max-w-[480px] leading-relaxed mt-4">
            We connect your institutional data with our proprietary market signals
            to build the people infrastructure your firm has been waiting for.
          </p>
        </div>

        <div className="mt-10 flex items-center gap-8 animate-fade-up" style={{ animationDelay: '0.6s' }}>
          <a
            href="#start"
            className="font-sans text-[13px] font-medium text-dark bg-chartreuse hover:bg-[#9fd944] px-5 py-2.5 rounded-full transition-colors duration-200"
          >
            Get started →
          </a>
          <a
            href="#frontier"
            className="font-sans text-[13px] text-beige/40 hover:text-beige/70 transition-colors duration-200"
          >
            Learn more
          </a>
        </div>
      </div>

      {/* Bottom indicators */}
      <div className="relative z-10 flex items-center justify-between px-10 pb-8 max-w-[1200px] mx-auto w-full animate-fade-in" style={{ animationDelay: '2s' }}>
        <div className="flex items-center gap-2">
          <div className="status-pulse w-1.5 h-1.5 rounded-full bg-teal" />
          <span className="font-mono text-[10px] tracking-mono text-teal">
            NODES: <span ref={counterRef}>0</span>
          </span>
        </div>
        <span className="font-mono text-[10px] tracking-mono text-beige/20 uppercase">
          People Graph · Active
        </span>
      </div>
    </section>
  )
}
