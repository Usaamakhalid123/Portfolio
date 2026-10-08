import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { prefersReducedMotion } from './reducedMotion'

gsap.registerPlugin(ScrollTrigger)

// Scroll-driven motion. Re-runs whenever `key` changes (e.g. on route change)
// so each page's elements get wired up.
//  - `.reveal` elements fade/rise in as staggered batches (siblings entering
//    together cascade instead of popping in one by one)
//  - the hero copy eases up and fades as you leave it
export function useReveal(ready, key) {
  useEffect(() => {
    if (!ready || prefersReducedMotion()) return // CSS shows .reveal as-is
    let ctx
    const id = requestAnimationFrame(() => {
      ctx = gsap.context(() => {
        gsap.set('.reveal', { y: 56, opacity: 0 })
        ScrollTrigger.batch('.reveal', {
          start: 'top 90%',
          once: true,
          interval: 0.12,
          batchMax: 4,
          onEnter: (batch) =>
            gsap.to(batch, {
              y: 0,
              opacity: 1,
              duration: 1.4,
              ease: 'expo.out',
              stagger: 0.1,
              overwrite: true,
            }),
        })

        const heroContent = document.querySelector('.hero-content')
        if (heroContent) {
          gsap.to(heroContent, {
            yPercent: -10,
            opacity: 0.2,
            ease: 'none',
            scrollTrigger: {
              trigger: '.hero',
              start: 'top top',
              end: 'bottom top',
              scrub: 0.6,
            },
          })
        }
      })
      ScrollTrigger.refresh()
    })
    return () => {
      cancelAnimationFrame(id)
      if (ctx) ctx.revert()
    }
  }, [ready, key])
}
