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

export default function App() {
  const [loaded, setLoaded] = useState(false)
  const location = useLocation()

  useSmoothScroll(loaded)
  useReveal(loaded, location.pathname)
  useScrollManager(loaded, location)

  return (
    <>
      {!loaded && <Loader onDone={() => setLoaded(true)} />}
      <CustomCursor />
      <div className="grain" />

      <Navbar />
      <main className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/work" element={<WorkPage />} />
        </Routes>

        <footer className="footer">
          <span>© {new Date().getFullYear()} Usama Khalid</span>
          <span>Designed &amp; built by Usama Khalid</span>
        </footer>
      </main>
    </>
  )
}
