import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrambleLabel } from './MotionPrimitives'

export default function Preloader({ onComplete }) {
  const containerRef = useRef(null)
  const [progress, setProgress] = useState(0)
  const [complete, setComplete] = useState(false)

  const finishImmediately = () => {
    if (complete) return
    setComplete(true)
    if (onComplete) onComplete()
  }

  useEffect(() => {
    // If user prefers reduced motion, skip preloader immediately
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      finishImmediately()
      return
    }

    const ctx = gsap.context(() => {
      const box = containerRef.current?.querySelector('.logo-box')
      const cross = containerRef.current?.querySelector('.logo-cross')

      // Kinetic geometric logo reveal
      if (box) {
        gsap.to(box, {
          strokeDashoffset: 0,
          duration: 0.8,
          ease: 'power3.out',
        })
      }
      if (cross) {
        gsap.to(cross, {
          strokeDashoffset: 0,
          duration: 0.6,
          delay: 0.3,
          ease: 'power3.out',
        })
      }

      // Fast, smooth percentage counter (reaches 100% in ~1.4s)
      let p = 0
      const interval = setInterval(() => {
        p += Math.random() * 20 + 10
        if (p >= 100) {
          p = 100
          setProgress(100)
          clearInterval(interval)
        } else {
          setProgress(Math.round(p))
        }
      }, 45)

      // Graceful exit timeline
      gsap.to({}, {
        duration: 1.5,
        onComplete: () => {
          setProgress(100)
          if (containerRef.current) {
            gsap.to(containerRef.current, {
              opacity: 0,
              y: -20,
              duration: 0.45,
              ease: 'power2.in',
              onComplete: () => {
                finishImmediately()
              },
            })
          } else {
            finishImmediately()
          }
        },
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  if (complete) return null

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] bg-[#f9f9f8] flex flex-col items-center justify-center px-4"
      aria-live="polite"
      role="progressbar"
      aria-valuenow={progress}
      aria-valuemin="0"
      aria-valuemax="100"
    >
      {/* Skip Button for Keyboard & Power Users */}
      <button
        type="button"
        onClick={finishImmediately}
        className="absolute top-6 right-6 font-mono text-[11px] tracking-widest uppercase text-[#555555] hover:text-[#111111] px-3 py-1.5 hairline rounded-sm transition-colors focus-visible:outline-none"
      >
        Skip [ESC]
      </button>

      {/* Kinetic Geometric Logo (ADB Monogram) */}
      <div className="relative w-16 h-16 sm:w-20 sm:h-20 mb-8 overflow-hidden">
        <svg className="w-full h-full block" viewBox="0 0 200 200" fill="none">
          <rect
            className="logo-box"
            x="22"
            y="22"
            width="156"
            height="156"
            stroke="#111111"
            strokeWidth="4"
            strokeDasharray="624"
            strokeDashoffset="624"
          />
          <path
            className="logo-cross"
            d="M70 70 L130 130 M130 70 L70 130"
            stroke="#111111"
            strokeWidth="3"
            strokeDasharray="170"
            strokeDashoffset="170"
          />
          <text
            x="100"
            y="136"
            textAnchor="middle"
            fontFamily="'JetBrains Mono', monospace"
            fontSize="12"
            fontWeight="800"
            letterSpacing="4"
            fill="#111111"
          >
            ADB
          </text>
        </svg>
      </div>

      <div className="text-center mb-6">
        <ScrambleLabel
          text="INITIALIZING 3D SPATIAL RUNTIME"
          className="text-xs tracking-widest uppercase text-[#555555] mb-4 block"
        />
        <div className="font-mono text-3xl sm:text-4xl font-bold tracking-tighter text-[#111111]">
          {progress}%
        </div>
      </div>

      {/* Progress Bar Line */}
      <div className="w-full max-w-xs">
        <div className="w-full h-[2px] bg-[#111111]/15 overflow-hidden rounded-full">
          <div
            className="h-full bg-[#111111] transition-all duration-75 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  )
}
