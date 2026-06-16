import { useEffect } from 'react'

// On route change: scroll to a hashed section, or jump to top.
export function useScrollManager(ready, location) {
  useEffect(() => {
    if (!ready) return
    const lenis = window.__lenis

    if (location.hash) {
      const el = document.querySelector(location.hash)
      if (el) {
        const id = setTimeout(() => {
          if (lenis) lenis.scrollTo(el, { offset: -80 })
          else el.scrollIntoView({ behavior: 'smooth' })
        }, 80)
        return () => clearTimeout(id)
      }
    }

    if (lenis) lenis.scrollTo(0, { immediate: true })
    else window.scrollTo(0, 0)
  }, [ready, location])
}
