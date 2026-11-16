import { useEffect, useRef, useState, lazy, Suspense } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Index from './components/Index'
import Works from './components/Works'
import Capabilities from './components/Capabilities'
import Footer from './components/Footer'
import Preloader from './components/Preloader'
import { ArchitecturalCursor } from './components/MotionPrimitives'

// Lazy-load the Three.js 3D Canvas to keep initial bundle size lean and non-blocking
const ThreeCanvas = lazy(() => import('./components/ThreeCanvas'))

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const lenisRef = useRef(null)
  const [preloaderComplete, setPreloaderComplete] = useState(false)

  useEffect(() => {
    // Initialize Lenis smooth scrolling
    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
      wheelMultiplier: 0.9,
    })

    lenisRef.current = lenis

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    const rafId = requestAnimationFrame(raf)

    // Sync Lenis with GSAP ScrollTrigger
    const tickerCallback = (time) => {
      lenis.raf(time * 1000)
    }

    gsap.ticker.add(tickerCallback)
    gsap.ticker.add(ScrollTrigger.update)

    return () => {
      cancelAnimationFrame(rafId)
      gsap.ticker.remove(tickerCallback)
      gsap.ticker.remove(ScrollTrigger.update)
      lenis.destroy()
    }
  }, [])

  return (
    <div className="relative min-h-screen bg-[#f9f9f8] text-[#111111] selection:bg-[#111111] selection:text-[#f9f9f8] overflow-x-hidden">
      {/* Precision architectural interactive cursor */}
      <ArchitecturalCursor />

      {!preloaderComplete ? (
        <Preloader onComplete={() => setPreloaderComplete(true)} />
      ) : (
        <>
          {/* Interactive 3D WebGL Matrix Background */}
          <Suspense
            fallback={
              <div
                className="fixed inset-0 pointer-events-none z-0 opacity-20"
                style={{
                  backgroundImage: 'radial-gradient(#111111 1px, transparent 1px)',
                  backgroundSize: '28px 28px',
                }}
              />
            }
          >
            <ThreeCanvas />
          </Suspense>

          {/* Primary Semantic Navigation Header */}
          <Nav />

          {/* Main Content Landmark with Skip-Target ID */}
          <main id="main-content" tabIndex={-1} className="focus:outline-none">
            <Hero />
            <Index />
            <Works />
            <Capabilities />
          </main>

          {/* Semantic Footer */}
          <Footer />
        </>
      )}
    </div>
  )
}
