import { useEffect, useRef } from 'react'

// Trailing ring + dot cursor. Grows over links and [data-cursor] elements.
// The animation loop only runs while the ring is still catching up with the
// pointer, so an idle page does no per-frame work.
export default function CustomCursor() {
  const dot = useRef()
  const ring = useRef()

  useEffect(() => {
    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const ringPos = { ...pos }
    let raf = 0

    const loop = () => {
      ringPos.x += (pos.x - ringPos.x) * 0.12
      ringPos.y += (pos.y - ringPos.y) * 0.12
      if (ring.current) {
        ring.current.style.transform = `translate3d(${ringPos.x}px, ${ringPos.y}px, 0) translate(-50%, -50%)`
      }
      const settled =
        Math.abs(pos.x - ringPos.x) < 0.1 && Math.abs(pos.y - ringPos.y) < 0.1
      raf = settled ? 0 : requestAnimationFrame(loop)
    }

    const onMove = (e) => {
      pos.x = e.clientX
      pos.y = e.clientY
      // Feeds the soft page glow that follows the pointer (see body::before).
      const root = document.documentElement.style
      root.setProperty('--px', `${(e.clientX / window.innerWidth) * 100}%`)
      root.setProperty('--py', `${(e.clientY / window.innerHeight) * 100}%`)
      if (dot.current) {
        dot.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`
      }
      if (!raf) raf = requestAnimationFrame(loop)
    }

    // Delegated, so elements on routes rendered later still get the hover ring.
    const SELECTOR = 'a, button, [data-cursor]'
    const onOver = (e) => {
      if (ring.current && e.target.closest?.(SELECTOR))
        ring.current.classList.add('hovered')
    }
    const onOut = (e) => {
      if (ring.current && e.target.closest?.(SELECTOR))
        ring.current.classList.remove('hovered')
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('mouseover', onOver)
    document.addEventListener('mouseout', onOut)
    return () => {
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout', onOut)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      <div className="cursor-dot" ref={dot} />
      <div className="cursor-ring" ref={ring} />
    </>
  )
}
