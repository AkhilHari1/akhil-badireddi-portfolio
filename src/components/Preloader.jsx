import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrambleLabel } from './MotionPrimitives'

export default function Preloader({ onComplete }) {
  const containerRef = useRef(null)
  const [progress, setProgress] = useState(0)
  const [complete, setComplete] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const box = containerRef.current.querySelector('.logo-box')
      const cross = containerRef.current.querySelector('.logo-cross')

      // Kinetic geometric logo reveal: monogram square draws itself, then the cross
      gsap.to(box, {
        strokeDashoffset: 0,
        duration: 1.1,
        ease: 'power3.out',
      })
      gsap.to(cross, {
        strokeDashoffset: 0,
        duration: 0.8,
        delay: 0.5,
        ease: 'power3.out',
      })

      // Animated percentage counter 0% -> 100%
      let p = 0
      const interval = setInterval(() => {
        p += Math.random() * 14 + 4
        if (p > 100) p = 100
        setProgress(Math.round(p))
        if (p >= 100) clearInterval(interval)
      }, 55)

      gsap.to({}, {
        duration: 3.2,
        onComplete: () => {
          setProgress(100)
          gsap.to(containerRef.current, {
            opacity: 0,
            duration: 0.55,
            delay: 0.35,
            ease: 'power2.in',
            onComplete: () => {
              setComplete(true)
              if (onComplete) onComplete()
            },
          })
        },
      })
    }, containerRef)

    return () => ctx.revert()
  }, [onComplete])

  if (complete) return null

  return (
    <div className="fixed inset-0 z-[9999] bg-[#f9f9f8]">
      <div className="inset-0 overflow-hidden">
        <div
          ref={containerRef}
          className="absolute inset-0 flex flex-col items-center justify-center px-6"
        >
          {/* Kinetic geometric logo (ADB monogram) */}
          <div className="relative w-20 h-20 mb-8 overflow-hidden">
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
                fontSize="11"
                fontWeight="800"
                letterSpacing="4"
                fill="#111111"
              >
                ADB
              </text>
            </svg>
          </div>

          <div className="text-center">
            <ScrambleLabel
              text="LOADING CASE FILES"
              className="text-xs tracking-widest uppercase text-[#555555] mb-6 block"
            />
            <div className="font-mono text-4xl font-bold tracking-tighter">{progress}%</div>
          </div>

          <div className="mt-10 w-full max-w-xs">
            <div className="w-full h-px bg-[#111111]/16 overflow-hidden">
              <div
                className="h-full bg-[#111111] relative"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
