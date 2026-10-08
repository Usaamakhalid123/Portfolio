import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import site from './site.config.js'

const PAGES = ['/', '/work', '/privacy']
const NAME = 'Usama Khalid'

// Everything that needs the live URL (or other deployment details from
// site.config.js) is generated here, so there is a single place to edit.
function sitePlugin() {
  const url = (site.url || '').replace(/\/$/, '')

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        name: NAME,
        jobTitle: 'Freelance Full-Stack Web Developer',
        ...(url && { url }),
        email: 'mailto:usamakhalid.work@gmail.com',
        sameAs: [
          'https://www.linkedin.com/in/usama-khalid-90a15b204',
          'https://github.com/Usaamakhalid123',
          'https://linktr.ee/chusama32',
        ],
        knowsAbout: [
          'Web development',
          'SaaS development',
          'Custom software',
          'AI chatbots',
          'Python',
          'Claude AI',
          'Vibe coding',
          'WordPress',
          'Shopify',
          'MERN stack',
          'SEO',
        ],
      },
      {
        '@type': 'ProfessionalService',
        name: `${NAME} — Web Development`,
        ...(url && { url, image: `${url}/og.png` }),
        description:
          'Fast, search-ready websites, SaaS products, custom software and AI chatbots for clinics, law firms, agencies and startups.',
        areaServed: ['United Kingdom', 'United Arab Emirates', 'Pakistan', 'Australia'],
        priceRange: '££',
      },
    ],
  }

  return {
    name: 'site-config',
    transformIndexHtml() {
      const tags = [
        {
          tag: 'script',
          attrs: { type: 'application/ld+json' },
          children: JSON.stringify(jsonLd),
          injectTo: 'head',
        },
      ]
      if (url) {
        tags.push(
          { tag: 'link', attrs: { rel: 'canonical', href: `${url}/` }, injectTo: 'head' },
          { tag: 'meta', attrs: { property: 'og:url', content: `${url}/` }, injectTo: 'head' },
          { tag: 'meta', attrs: { property: 'og:image', content: `${url}/og.png` }, injectTo: 'head' },
          { tag: 'meta', attrs: { name: 'twitter:image', content: `${url}/og.png` }, injectTo: 'head' }
        )
      }
      if (site.plausibleDomain) {
        tags.push({
          tag: 'script',
          attrs: {
            defer: true,
            'data-domain': site.plausibleDomain,
            src: 'https://plausible.io/js/script.js',
          },
          injectTo: 'head',
        })
      }
      return tags
    },
    generateBundle() {
      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        source: `User-agent: *\nAllow: /\n${url ? `\nSitemap: ${url}/sitemap.xml\n` : ''}`,
      })
      if (url) {
        const today = new Date().toISOString().slice(0, 10)
        const urls = PAGES.map(
          (p) => `  <url><loc>${url}${p}</loc><lastmod>${today}</lastmod></url>`
        ).join('\n')
        this.emitFile({
          type: 'asset',
          fileName: 'sitemap.xml',
          source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
        })
      }
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), sitePlugin()],
})

