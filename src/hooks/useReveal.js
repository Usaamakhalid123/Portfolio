import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Animates every `.reveal` element into view. Re-runs whenever `key` changes
// (e.g. on route change) so each page's elements get wired up.
export function useReveal(ready, key) {
  useEffect(() => {
    if (!ready) return
    let ctx
    const id = requestAnimationFrame(() => {
      ctx = gsap.context(() => {
        gsap.utils.toArray('.reveal').forEach((el) => {
          gsap.fromTo(
            el,
            { y: 44, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 1,
              ease: 'power3.out',
              scrollTrigger: { trigger: el, start: 'top 90%' },
            }
          )
        })
      })
      ScrollTrigger.refresh()
    })
    return () => {
      cancelAnimationFrame(id)
      if (ctx) ctx.revert()
    }
  }, [ready, key])
}
