import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Animates every element with the `.reveal` class into view on scroll.
export function useReveal(ready) {
  useEffect(() => {
    if (!ready) return
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.reveal').forEach((el) => {
        gsap.fromTo(
          el,
          { y: 48, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
            },
          }
        )
      })
    })
    ScrollTrigger.refresh()
    return () => ctx.revert()
  }, [ready])
}
