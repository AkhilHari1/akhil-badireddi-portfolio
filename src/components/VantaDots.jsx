import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import 'vanta/dist/vanta.dots.min'

export default function VantaDots() {
  const elRef = useRef(null)

  useEffect(() => {
    if (!elRef.current || typeof window === 'undefined') return

    const vanta = window.VANTA

    const instance = vanta.DOTS({
      el: elRef.current,
      THREE,
      backgroundColor: 0xf9f9f8,
      color: 0x111111,
      color2: 0x888888,
      size: 2.2,
      spacing: 38.0,
      showLines: false,
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.0,
      minWidth: 200.0,
    })

    return () => {
      if (instance) {
        instance.destroy()
      }
    }
  }, [])

  return <div ref={elRef} className="fixed inset-0 z-0 w-full h-full pointer-events-none" />
}