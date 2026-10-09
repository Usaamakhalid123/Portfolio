import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

// Brief intro. The counter is written straight to the DOM (no React state per
// frame), and the whole thing is kept short so it never holds up first paint
// or interaction for long.
export default function Loader({ onDone }) {
  const root = useRef()
  const bar = useRef()
  const count = useRef()
  const done = useRef(onDone)
  done.current = onDone

  useEffect(() => {
    const obj = { v: 0 }
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(root.current, {
          yPercent: -100,
          duration: 0.6,
          ease: 'power4.inOut',
          onComplete: () => done.current(),
        })
      },
    })
    tl.to(obj, {
      v: 100,
      duration: 0.8,
      ease: 'power2.inOut',
      onUpdate: () => {
        if (count.current) count.current.textContent = Math.round(obj.v)
        if (bar.current) bar.current.style.transform = `scaleX(${obj.v / 100})`
      },
    })
    return () => tl.kill()
  }, [])

  return (
    <div className="loader" ref={root} role="status" aria-label="Loading">
      <div className="loader-count" ref={count}>
        0
      </div>
      <div className="loader-bar">
        <span ref={bar} />
      </div>
    </div>
  )
}
