'use client'
import { useEffect, useRef } from 'react'

type NodeObj = {
  rx: number; ry: number; x: number; y: number
  r: number; alpha: number; sonarAlpha: number
  discovered: boolean; isGreen: boolean
}

type Wave = { ox: number; oy: number; r: number }

function buildEdges(nodes: NodeObj[]) {
  const edges: [number, number][] = []
  const MAX = 0.11
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const dx = nodes[i].rx - nodes[j].rx
      const dy = nodes[i].ry - nodes[j].ry
      if (Math.sqrt(dx * dx + dy * dy) < MAX) edges.push([i, j])
    }
  }
  return edges
}

const PROT = { x0: 0.28, x1: 0.72, y0: 0.32, y1: 0.68 }

function inProtected(rx: number, ry: number) {
  return rx >= PROT.x0 && rx <= PROT.x1 && ry >= PROT.y0 && ry <= PROT.y1
}

function poissonDisk(
  minDist: number,
  maxPts: number,
  mxRel: number,
  myRel: number,
): [number, number][] {
  const cell = minDist / Math.SQRT2
  const gW   = Math.ceil(1 / cell)
  const gH   = Math.ceil(1 / cell)
  const grid = new Int32Array(gW * gH).fill(-1)
  const pts: [number, number][] = []
  const active: number[] = []

  const valid = (x: number, y: number): boolean => {
    if (x < mxRel || x > 1 - mxRel || y < myRel || y > 1 - myRel) return false
    if (inProtected(x, y)) return false
    const gx = Math.floor(x / cell)
    const gy = Math.floor(y / cell)
    for (let dy2 = -2; dy2 <= 2; dy2++) {
      for (let dx2 = -2; dx2 <= 2; dx2++) {
        const nx = gx + dx2, ny = gy + dy2
        if (nx < 0 || nx >= gW || ny < 0 || ny >= gH) continue
        const idx = grid[ny * gW + nx]
        if (idx < 0) continue
        const p = pts[idx]
        const ddx = p[0] - x, ddy = p[1] - y
        if (ddx * ddx + ddy * ddy < minDist * minDist) return false
      }
    }
    return true
  }

  const add = (x: number, y: number) => {
    grid[Math.floor(y / cell) * gW + Math.floor(x / cell)] = pts.length
    active.push(pts.length)
    pts.push([x, y])
  }

  let sx = 0, sy = 0, attempts = 0
  do {
    sx = mxRel + Math.random() * (1 - 2 * mxRel)
    sy = myRel + Math.random() * (1 - 2 * myRel)
  } while (inProtected(sx, sy) && ++attempts < 100)
  add(sx, sy)

  while (active.length > 0 && pts.length < maxPts) {
    const ai  = Math.floor(Math.random() * active.length)
    const src = pts[active[ai]]
    let found = false
    for (let k = 0; k < 30; k++) {
      const angle = Math.random() * Math.PI * 2
      const r     = minDist * (1 + Math.random())
      const nx    = src[0] + Math.cos(angle) * r
      const ny    = src[1] + Math.sin(angle) * r
      if (valid(nx, ny)) { add(nx, ny); found = true; break }
    }
    if (!found) active.splice(ai, 1)
  }

  return pts
}

export default function Hero() {
  const canvasRef  = useRef<HTMLCanvasElement>(null)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const canvas  = canvasRef.current!
    const section = sectionRef.current!
    if (!canvas || !section) return
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
    if (!ctx) return

    const GREEN      = '#2D9E5F'
    const GREY_NODE  = 'rgba(200,200,190,0.45)'
    const GREY_EDGE  = 'rgba(200,200,190,0.10)'
    const GREEN_EDGE = 'rgba(45,158,95,0.65)'
    const BG_COLOR   = 'rgba(17,24,16,0.9)'
    const REVEAL_R   = 130
    const HOVER_R    = 14
    const MIN_DIST   = 0.06

    let W = 0, H = 0
    let isMobile = false
    let nodes: NodeObj[]        = []
    let edges: [number, number][] = []
    let edgeDiscovered: boolean[] = []

    function generateNodes() {
      isMobile     = W < 768
      const maxPts = isMobile ? 60 : 120
      const mxRel  = 20 / W
      const myRel  = 20 / H

      const raw = poissonDisk(MIN_DIST, maxPts, mxRel, myRel)
      nodes = raw.map(([rx, ry]) => {
        const jx  = (Math.random() - 0.5) * 0.03
        const jy  = (Math.random() - 0.5) * 0.03
        const jrx = Math.max(mxRel, Math.min(1 - mxRel, rx + jx))
        const jry = Math.max(myRel, Math.min(1 - myRel, ry + jy))
        return {
          rx: jrx, ry: jry, x: jrx * W, y: jry * H,
          r: 5, alpha: 0, sonarAlpha: 0, discovered: false, isGreen: false,
        }
      })
      edges          = buildEdges(nodes)
      edgeDiscovered = new Array(edges.length).fill(false)
    }

    function resize() {
      W = window.innerWidth
      H = section.offsetHeight || window.innerHeight
      canvas.width  = W
      canvas.height = H
      if (nodes.length === 0) {
        generateNodes()
      } else {
        isMobile = W < 768
        nodes.forEach(n => { n.x = n.rx * W; n.y = n.ry * H })
      }
    }

    // Phantom cursor orbits centre until real mouse takes over
    const phantom = { x: 0, y: 0, t: 0 }
    const mouse   = { x: -9999, y: -9999, real: false }

    function updatePhantom() {
      if (mouse.real) return
      phantom.t += 0.004
      phantom.x += (W * (0.5 + Math.cos(phantom.t) * 0.28) - phantom.x) * 0.018
      phantom.y += (H * (0.5 + Math.sin(phantom.t * 0.65) * 0.22) - phantom.y) * 0.018
    }

    // Sonar state
    const waves: Wave[] = []
    let nextWaveIn      = 6000 + Math.random() * 4000
    let lastTime        = 0

    function spawnWave() {
      let ox = 0, oy = 0, t = 0
      do {
        ox = Math.random() * W
        oy = Math.random() * H
      } while (inProtected(ox / W, oy / H) && ++t < 50)
      waves.push({ ox, oy, r: 0 })
    }

    let raf: number

    function tick(time: number) {
      const dt = lastTime ? Math.min(time - lastTime, 50) : 16
      lastTime = time

      ctx.clearRect(0, 0, W, H)
      updatePhantom()

      const mx = mouse.real ? mouse.x : phantom.x
      const my = mouse.real ? mouse.y : phantom.y

      // Cursor interaction
      nodes.forEach(n => {
        const dist   = Math.hypot(n.x - mx, n.y - my)
        const inR    = dist < REVEAL_R
        const onNode = dist < HOVER_R
        if (inR && onNode) n.discovered = true
        n.alpha  += ((inR ? 1 : 0) - n.alpha) * 0.14
        n.isGreen = n.discovered || (inR && onNode)
      })

      edges.forEach(([a, b], i) => {
        if (nodes[a].discovered && nodes[b].discovered) edgeDiscovered[i] = true
      })

      // Sonar waves — single loop handles spawn, advance, illumination, expiry
      if (!isMobile) {
        nextWaveIn -= dt
        if (nextWaveIn <= 0 && waves.length < 2) {
          spawnWave()
          nextWaveIn = 6000 + Math.random() * 4000
        }

        for (let wi = waves.length - 1; wi >= 0; wi--) {
          const wave  = waves[wi]
          const prevR = wave.r
          wave.r     += 120 * dt / 1000

          if (wave.r > 280) { waves.splice(wi, 1); continue }

          for (const n of nodes) {
            if (n.discovered) continue
            if (inProtected(n.rx, n.ry)) continue
            if (Math.hypot(n.x - mx, n.y - my) < REVEAL_R) continue
            const nd = Math.hypot(n.x - wave.ox, n.y - wave.oy)
            if (nd > prevR && nd <= wave.r) n.sonarAlpha = 0.15
          }
        }
      }

      // Decay sonar illumination over 800ms
      nodes.forEach(n => {
        if (n.sonarAlpha > 0) n.sonarAlpha = Math.max(0, n.sonarAlpha - 0.15 * dt / 800)
      })

      // Draw edges
      edges.forEach(([a, b], i) => {
        const na = nodes[a], nb = nodes[b]
        const ea = Math.min(
          Math.max(na.alpha, na.sonarAlpha),
          Math.max(nb.alpha, nb.sonarAlpha),
        )
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

      // Draw nodes
      nodes.forEach(n => {
        const ra = Math.max(n.alpha, n.sonarAlpha)
        if (ra < 0.01) return
        ctx.save()
        ctx.globalAlpha = ra
        ctx.beginPath()
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2)
        ctx.fillStyle   = n.isGreen ? GREEN : 'transparent'
        ctx.fill()
        ctx.strokeStyle = n.isGreen ? GREEN : GREY_NODE
        ctx.lineWidth   = n.isGreen ? 1.5 : 1
        ctx.stroke()
        if (n.isGreen) {
          ctx.beginPath()
          ctx.arc(n.x, n.y - n.r * 0.22, n.r * 0.34, 0, Math.PI * 2)
          ctx.fillStyle = BG_COLOR
          ctx.fill()
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
      const rect = canvas.getBoundingClientRect()
      mouse.x    = e.clientX - rect.left
      mouse.y    = e.clientY - rect.top
      mouse.real = true
    }
    function onLeave()  { mouse.real = false }
    function onResize() {
      W = window.innerWidth
      H = section.offsetHeight || window.innerHeight
      isMobile      = W < 768
      canvas.width  = W
      canvas.height = H
      nodes.forEach(n => { n.x = n.rx * W; n.y = n.ry * H })
    }

    resize()
    phantom.x = W * 0.5
    phantom.y = H * 0.5

    raf = requestAnimationFrame(tick)
    window.addEventListener('mousemove', onMove)
    section.addEventListener('mouseleave', onLeave)
    window.addEventListener('resize', onResize, { passive: true })

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
      section.removeEventListener('mouseleave', onLeave)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden"
      style={{ background: 'linear-gradient(to bottom, #111810 0%, #0f2318 70%, #1a3a28 100%)' }}
    >
      <canvas
        ref={canvasRef}
        data-hero-canvas
        className="absolute inset-0 w-full h-full pointer-events-none"
        aria-hidden="true"
      />

      <div className="absolute inset-0 z-10 pointer-events-none flex flex-col items-center justify-center text-center px-8">
        <h1
          className="font-display font-bold text-beige leading-[1.06] tracking-[-0.03em]"
          style={{ fontSize: 'clamp(32px,5.5vw,56px)' }}
        >
          Your most underutilized asset<br />
          isn&apos;t financial. It&apos;s human.<br />
          <span style={{ color: '#2D9E5F' }}>One intelligence system.</span>
        </h1>

        <p
          className="font-sans text-[14px] leading-[1.75] max-w-[520px] text-center"
          style={{ marginTop: '20px', color: 'rgba(232,221,208,0.55)' }}
        >
          We deploy inside your organization, turning your people knowledge into
          living infrastructure and connecting it to the market. So whenever your
          firm needs to know something about people: a hire, a prospect, a
          relationship, a signal — the answer is already there. Yesterday.
        </p>
      </div>

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
          style={{ borderColor: 'rgba(232,221,208,0.4)', transform: 'rotate(45deg)', marginTop: '-4px' }}
        />
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, rgba(17,24,16,0.5))' }}
      />
    </section>
  )
}
