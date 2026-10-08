import { useEffect, useState } from 'react'

// True while the referenced element is on screen — used to stop rendering
// WebGL frames for scenes the visitor has scrolled past.
export function useInView(ref, margin = '120px') {
  const [inView, setInView] = useState(true)
  useEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined') return
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: margin }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [ref, margin])
  return inView
}
