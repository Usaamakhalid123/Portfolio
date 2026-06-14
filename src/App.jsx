import { useState } from 'react'
import Scene from './components/Scene'
import CustomCursor from './components/CustomCursor'
import Loader from './components/Loader'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import About from './components/About'
import Work from './components/Work'
import Services from './components/Services'
import Contact from './components/Contact'
import { useSmoothScroll } from './hooks/useSmoothScroll'
import { useReveal } from './hooks/useReveal'

export default function App() {
  const [loaded, setLoaded] = useState(false)

  useSmoothScroll(loaded)
  useReveal(loaded)

  return (
    <>
      {!loaded && <Loader onDone={() => setLoaded(true)} />}
      <CustomCursor />
      <div className="grain" />
      <Scene />

      <Navbar />
      <main className="content">
        <Hero />
        <Marquee />
        <About />
        <Work />
        <Services />
        <Contact />
        <footer className="footer">
          <span>© {new Date().getFullYear()} Usama Khalid</span>
          <span>Built with React · Three.js · GSAP</span>
        </footer>
      </main>
    </>
  )
}
