import { useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import CustomCursor from './components/CustomCursor'
import Loader from './components/Loader'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import WorkPage from './pages/WorkPage'
import { useSmoothScroll } from './hooks/useSmoothScroll'
import { useReveal } from './hooks/useReveal'
import { useScrollManager } from './hooks/useScrollManager'
import { prefersReducedMotion } from './hooks/reducedMotion'

const SEEN_KEY = 'portfolio-loader-seen'

// Show the intro loader once per session, and never for reduced-motion users.
const initialLoaded = () => {
  if (prefersReducedMotion()) return true
  try {
    return sessionStorage.getItem(SEEN_KEY) === '1'
  } catch {
    return false
  }
}

export default function App() {
  const [loaded, setLoaded] = useState(initialLoaded)
  const finishLoading = () => {
    try {
      sessionStorage.setItem(SEEN_KEY, '1')
    } catch {
      /* storage unavailable — loader just shows again next load */
    }
    setLoaded(true)
  }
  // Hash links would route-match nothing here, so move focus manually.
  const skipToMain = (e) => {
    e.preventDefault()
    document.getElementById('main')?.focus()
  }
  const location = useLocation()

  useSmoothScroll(loaded)
  useReveal(loaded, location.pathname)
  useScrollManager(loaded, location)

  return (
    <>
      <a className="skip-link" href="#main" onClick={skipToMain}>
        Skip to main content
      </a>
      {!loaded && <Loader onDone={finishLoading} />}
      <CustomCursor />
      <div className="grain" aria-hidden="true" />

      <Navbar />
      <main className="content" id="main" tabIndex={-1}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/work" element={<WorkPage />} />
        </Routes>

        <footer className="footer">
          <span>© {new Date().getFullYear()} Usama Khalid</span>
          <span>Freelance web developer · Romford, UK &amp; Lahore, PK</span>
        </footer>
      </main>
    </>
  )
}
