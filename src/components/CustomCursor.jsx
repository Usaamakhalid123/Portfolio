import { useEffect, useRef } from 'react'

// Trailing ring + dot cursor. Grows over links and [data-cursor] elements.
export default function CustomCursor() {
  const dot = useRef()
  const ring = useRef()

  useEffect(() => {
    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const ringPos = { ...pos }
    let raf

    const onMove = (e) => {
      pos.x = e.clientX
      pos.y = e.clientY
      if (dot.current) {
        dot.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`
      }
    }

    const loop = () => {
      ringPos.x += (pos.x - ringPos.x) * 0.18
      ringPos.y += (pos.y - ringPos.y) * 0.18
      if (ring.current) {
        ring.current.style.transform = `translate3d(${ringPos.x}px, ${ringPos.y}px, 0) translate(-50%, -50%)`
      }
      raf = requestAnimationFrame(loop)
    }
    loop()

    const setHover = (v) => () =>
      ring.current && ring.current.classList.toggle('hovered', v)
    const targets = document.querySelectorAll('a, button, [data-cursor]')
    targets.forEach((t) => {
      t.addEventListener('mouseenter', setHover(true))
      t.addEventListener('mouseleave', setHover(false))
    })

    window.addEventListener('mousemove', onMove)
    return () => {
      window.removeEventListener('mousemove', onMove)
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
