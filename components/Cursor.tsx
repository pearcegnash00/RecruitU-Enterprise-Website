'use client'
import { useEffect } from 'react'

export default function Cursor() {
  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const dot  = document.getElementById('cursor-dot')
    const ring = document.getElementById('cursor-ring')
    if (!dot || !ring) return

    // Hide native cursor only once custom cursor is confirmed active
    document.body.classList.add('cursor-ready')

    let mx = -100, my = -100
    let rx = -100, ry = -100

    const onMove = (e: MouseEvent) => {
      mx = e.clientX
      my = e.clientY
      dot.style.left = mx + 'px'
      dot.style.top  = my + 'px'
    }

    const animateRing = () => {
      rx += (mx - rx) * 0.12
      ry += (my - ry) * 0.12
      ring.style.left = rx + 'px'
      ring.style.top  = ry + 'px'
      requestAnimationFrame(animateRing)
    }

    document.addEventListener('mousemove', onMove)
    animateRing()

    return () => {
      document.removeEventListener('mousemove', onMove)
      document.body.classList.remove('cursor-ready')
    }
  }, [])

  return (
    <>
      <div id="cursor-dot" />
      <div id="cursor-ring" />
    </>
  )
}
