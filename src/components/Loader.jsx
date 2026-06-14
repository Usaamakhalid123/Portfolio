import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

export default function Loader({ onDone }) {
  const root = useRef()
  const bar = useRef()
  const [count, setCount] = useState(0)

  useEffect(() => {
    const obj = { v: 0 }
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(root.current, {
          yPercent: -100,
          duration: 0.9,
          ease: 'power4.inOut',
          onComplete: onDone,
        })
      },
    })
    tl.to(obj, {
      v: 100,
      duration: 1.8,
      ease: 'power2.inOut',
      onUpdate: () => {
        setCount(Math.round(obj.v))
        if (bar.current) bar.current.style.width = `${obj.v}%`
      },
    })
    return () => tl.kill()
  }, [onDone])

  return (
    <div className="loader" ref={root}>
      <div className="loader-count">{count}</div>
      <div className="loader-bar">
        <span ref={bar} />
      </div>
    </div>
  )
}
