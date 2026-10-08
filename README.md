# Usama Khalid — Portfolio

A fast, editorial portfolio for **Usama Khalid**, freelance full-stack web developer.
Warm paper + ink + electric lime, with real client work, testimonials and a lead-capture form.

🔗 **Live:** _add your URL here and in `site.config.js`_

## Highlights

- **Multi-page** (React Router): home, a `/work` page listing all projects, `/privacy`, and a proper 404
- **Hero** with a pointer-tilting 3D stack of real client sites
- **Featured work** on the homepage → full grid of 17 live builds (WebP screenshots, ~40 kB each)
- **Bento About**, **Process**, dark **Services** panel, **Testimonials** carousel (pausable) and **FAQ**
- **Contact form** (Formspree) with optional WhatsApp button, spam honeypot and privacy consent line
- Smooth scrolling (Lenis), GSAP reveals and parallax, custom cursor — all disabled for `prefers-reduced-motion`
- Accessible by default: skip link, focus styles, labelled form, announced errors, 44px targets

## Tech stack

React 18 · Vite · React Router · GSAP · Lenis · self-hosted fonts (Bricolage Grotesque + Instrument Sans via Fontsource)

## Getting started

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build to /dist
npm run preview  # preview the production build
```

## Site settings

Edit **`site.config.js`** and rebuild:

| Setting | What it does |
| --- | --- |
| `url` | Live address (no trailing slash). Enables canonical URLs, absolute share-image URLs, `sitemap.xml` and the sitemap line in `robots.txt`. |
| `whatsapp` | Number with country code, digits only. Shows a "Chat on WhatsApp" button beside the form. |
| `plausibleDomain` | Domain registered in Plausible. Loads cookie-free analytics. |

## Editing content

- **Projects:** `src/data/projects.js`. Screenshots go in `public/shots/` as ~1000px-wide **WebP**.
- **Testimonials:** `src/data/testimonials.js`.
- **Form endpoint:** `FORMSPREE_ENDPOINT` in `src/components/Contact.jsx`.
- **Share image / icons:** `public/og.png`, `public/icon-*.png`, `public/favicon.svg`.

## Deployment (Vercel)

`vercel.json` rewrites unknown routes to the SPA (React renders the 404) and sets security headers
(CSP, HSTS, frame/referrer/permissions policies) plus long-lived caching for hashed assets.
If you add a third-party script, allow its origin in the Content-Security-Policy.
