import { useEffect } from 'react'
import site from '../../site.config.js'

const upsert = (selector, create) => {
  let el = document.head.querySelector(selector)
  if (!el) {
    el = create()
    document.head.appendChild(el)
  }
  return el
}

const setMeta = (attr, key, content) => {
  const el = upsert(`meta[${attr}="${key}"]`, () => {
    const m = document.createElement('meta')
    m.setAttribute(attr, key)
    return m
  })
  el.setAttribute('content', content)
}

// Per-route <title>, description, canonical and robots. The static tags in
// index.html remain the defaults for crawlers that don't run JavaScript.
export default function Seo({ title, description, path = '/', noindex = false }) {
  useEffect(() => {
    document.title = title
    setMeta('name', 'description', description)
    setMeta('property', 'og:title', title)
    setMeta('property', 'og:description', description)
    setMeta('name', 'twitter:title', title)
    setMeta('name', 'twitter:description', description)

    if (site.url) {
      const href = site.url + path
      upsert('link[rel="canonical"]', () => {
        const l = document.createElement('link')
        l.rel = 'canonical'
        return l
      }).setAttribute('href', href)
      setMeta('property', 'og:url', href)
    }

    const robots = document.head.querySelector('meta[name="robots"]')
    if (noindex) setMeta('name', 'robots', 'noindex, follow')
    else if (robots) robots.remove()
  }, [title, description, path, noindex])

  return null
}
