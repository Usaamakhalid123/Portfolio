import Hero from '../components/Hero'
import Marquee from '../components/Marquee'
import WorkPreview from '../components/WorkPreview'
import About from '../components/About'
import Services from '../components/Services'
import Testimonials from '../components/Testimonials'
import Contact from '../components/Contact'

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <WorkPreview />
      <About />
      <Services />
      <Testimonials />
      <Contact />
    </>
  )
}
