# Usama Khalid — Portfolio

A fast, editorial portfolio for **Usama Khalid**, freelance full-stack web developer.
Warm light theme, multi-page, with real client work and recommendations.

🔗 **Live:** _add your Vercel URL here_

## Highlights

- **Multi-page** (React Router): home + a dedicated `/work` page listing all projects
- **Featured work** on the homepage (4 projects) → CTA to the full grid of 17 live builds, each with a real screenshot
- **Orbiting tech-stack** ring in the hero (pure CSS — logos circling a dotted path)
- **Testimonials carousel** — real LinkedIn recommendations, auto-advancing, 2 cards at a time
- **Lead-capture contact form** — name, email, company, website, country, budget, service chips, message (+ spam honeypot)
- Smooth scrolling (Lenis), GSAP scroll reveals, custom cursor, film grain

## Tech stack

React 18 · Vite · React Router · GSAP · Lenis · Fraunces + Inter (Google Fonts)

## Getting started

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build to /dist
npm run preview  # preview the production build
```

## Editing content

| What | Where |
| --- | --- |
| Projects (title, description, link, screenshot) | `src/data/projects.js` |
| Featured 4 on the homepage | `FEATURED` in `src/components/WorkPreview.jsx` |
| Testimonials | `src/data/testimonials.js` |
| Project screenshots | `public/shots/<slug>.jpg` |
| Tech-stack logos | `public/icons/` |
| Contact email / socials | top of `src/components/Contact.jsx` |

### Contact form leads

The form posts to **Formspree**. Create a free form at [formspree.io](https://formspree.io)
and paste its endpoint into `FORMSPREE_ENDPOINT` in `src/components/Contact.jsx`.
Until then, the form falls back to opening the visitor's email app addressed to you.

## Deploy (Vercel)

1. Push to GitHub.
2. On [vercel.com](https://vercel.com): **Add New → Project** → import this repo.
3. Vercel auto-detects Vite — click **Deploy**.

`vercel.json` includes an SPA rewrite so deep links like `/work` work on refresh.

---

Designed & built by Usama Khalid.
