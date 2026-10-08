import Seo from '../components/Seo'
import Hero from '../components/Hero'
import Marquee from '../components/Marquee'
import WorkPreview from '../components/WorkPreview'
import About from '../components/About'
import Process from '../components/Process'
import Services from '../components/Services'
import Testimonials from '../components/Testimonials'
import Faq from '../components/Faq'
import Contact from '../components/Contact'

export default function Home() {
  return (
    <>
      <Seo
        title="Usama Khalid — Freelance Full-Stack Web Developer"
        description="Freelance full-stack developer building fast, search-ready websites, SaaS products, custom software and AI chatbots — WordPress, Shopify and MERN — for clinics, law firms, agencies and startups in the UK, UAE and beyond."
        path="/"
      />
      <Hero />
      <Marquee />
      <WorkPreview />
      <About />
      <Process />
      <Services />
      <Testimonials />
      <Faq />
      <Contact />
    </>
  )
}
