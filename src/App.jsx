import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Works from './components/Works'
import Capabilities from './components/Capabilities'
import Footer from './components/Footer'
import VantaDots from './components/VantaDots'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const lenisRef = useRef(null)

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
    })

    lenisRef.current = lenis

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })

    gsap.ticker.add(ScrollTrigger.update)

    return () => {
      gsap.ticker.remove((time) => {
        lenis.raf(time * 1000)
      })
      gsap.ticker.remove(ScrollTrigger.update)
      lenis.destroy()
    }
  }, [])

  return (
    <div className="relative min-h-screen bg-[#f9f9f8] text-[#111111] selection:bg-[#111111] selection:text-[#f9f9f8] overflow-x-hidden">
      <VantaDots />
      <Nav />
      <Hero />
      <Works />
      <Capabilities />
      <Footer />
    </div>
  )
}