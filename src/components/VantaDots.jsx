import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

export default function VantaDots() {
  const elRef = useRef(null)
  const instanceRef = useRef(null)
  const [fallback, setFallback] = useState(false)
  const mountedRef = useRef(true)
  const [vantaLoaded, setVantaLoaded] = useState(false)

  useEffect(() => {
    mountedRef.current = true

    if (typeof window === 'undefined') return
    const el = elRef.current
    if (!el || !document.body.contains(el)) return

    // Set global THREE before Vanta initializes
    window.THREE = THREE

    if (!vantaLoaded) {
      import('vanta/dist/vanta.dots.min').then((module) => {
        window.VANTA = module.default || module
        if (mountedRef.current) setVantaLoaded(true)
      }).catch((err) => {
        if (mountedRef.current) setFallback(true)
      })
    }

    return () => {
      mountedRef.current = false
      if (instanceRef.current) {
        try { instanceRef.current.destroy() } catch (e) {}
        instanceRef.current = null
      }
    }
  }, [vantaLoaded])

  if (fallback) {
    return (
      <div ref={elRef} className="fixed inset-0 z-0 w-full h-full pointer-events-none bg-[#f9f9f8]">
        <div
          className="absolute inset-0 opacity-30"
          style={{ backgroundImage: 'radial-gradient(#111111 1px, transparent 1px)', backgroundSize: '24px 24px' }}
        />
      </div>
    )
  }

  return <div ref={elRef} className="fixed inset-0 z-0 w-full h-full pointer-events-none" />
}
