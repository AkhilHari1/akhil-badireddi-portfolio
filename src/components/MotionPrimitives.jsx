import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// --- Custom Architectural Interactive Cursor ---
export function ArchitecturalCursor() {
  const [label, setLabel] = useState('')
  const [visible, setVisible] = useState(false)
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const labelRef = useRef(null)
  const pos = useRef({ x: -100, y: -100, targetX: -100, targetY: -100 })
  const isTouchDevice = useRef(false)

  useEffect(() => {
    // Detect touch / mobile devices
    if (typeof window !== 'undefined') {
      isTouchDevice.current = window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window
    }
    if (isTouchDevice.current) return

    let animId

    const handleMove = (e) => {
      pos.current.targetX = e.clientX
      pos.current.targetY = e.clientY
      if (!visible) setVisible(true)
    }

    const handleMouseLeave = () => {
      setVisible(false)
    }

    const handleMouseEnter = () => {
      setVisible(true)
    }

    // Event delegation for data-cursor
    const handleOver = (e) => {
      const target = e.target.closest('[data-cursor]')
      if (target) {
        setLabel(target.getAttribute('data-cursor') || '')
      } else {
        setLabel('')
      }
    }

    window.addEventListener('mousemove', handleMove, { passive: true })
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)
    document.addEventListener('mouseover', handleOver, { passive: true })

    // Smooth physics loop for cursor ring
    const render = () => {
      pos.current.x += (pos.current.targetX - pos.current.x) * 0.2
      pos.current.y += (pos.current.targetY - pos.current.y) * 0.2

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.current.targetX}px, ${pos.current.targetY}px)`
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px) scale(${label ? 1.5 : 1})`
      }
      if (labelRef.current) {
        labelRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y - 36}px)`
      }

      animId = requestAnimationFrame(render)
    }

    animId = requestAnimationFrame(render)

    return () => {
      window.removeEventListener('mousemove', handleMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
      document.removeEventListener('mouseover', handleOver)
      if (animId) cancelAnimationFrame(animId)
    }
  }, [visible, label])

  if (isTouchDevice.current) return null

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none transition-opacity duration-300 ${visible ? 'opacity-100' : 'opacity-0'}`}
    >
      {/* Precision pinpoint dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 -ml-1 -mt-1 rounded-full bg-[#111111] pointer-events-none z-[9999] mix-blend-difference"
      />
      {/* Smooth magnetic trailing ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-8 h-8 -ml-4 -mt-4 rounded-full border border-[#111111]/30 pointer-events-none z-[9998] transition-transform duration-75"
      />
      {/* Dynamic context badge */}
      {label && (
        <div
          ref={labelRef}
          className="fixed top-0 left-0 pointer-events-none z-[9997] -translate-x-1/2"
        >
          <span className="font-mono text-[10px] tracking-widest uppercase text-[#f9f9f8] bg-[#111111] px-2 py-0.5 shadow-sm rounded-sm">
            {label}
          </span>
        </div>
      )}
    </div>
  )
}

// --- Magnetic Pill Button with Kinetic Physics ---
export function MagneticPill({ children, className = '', onClick, href, ...rest }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const onMouseMove = (e) => {
      const rect = el.getBoundingClientRect()
      const x = (e.clientX - rect.left - rect.width / 2) * 0.35
      const y = (e.clientY - rect.top - rect.height / 2) * 0.35
      gsap.to(el, {
        x,
        y,
        duration: 0.5,
        ease: 'power3.out',
        overwrite: true,
      })
    }

    const onMouseLeave = () => {
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.7,
        ease: 'elastic.out(1, 0.4)',
        overwrite: true,
      })
    }

    el.addEventListener('mousemove', onMouseMove)
    el.addEventListener('mouseleave', onMouseLeave)

    return () => {
      el.removeEventListener('mousemove', onMouseMove)
      el.removeEventListener('mouseleave', onMouseLeave)
      gsap.killTweensOf(el)
    }
  }, [])

  const Component = href ? 'a' : 'button'
  const props = href ? { href, ...rest } : { onClick, type: 'button', ...rest }

  return (
    <Component
      ref={ref}
      className={`mag-pill focus-visible:ring-2 focus-visible:ring-[#111111] focus-visible:outline-none ${className}`}
      {...props}
    >
      {children}
    </Component>
  )
}

// --- 3D Holographic Perspective Card Tilt ---
export function Card3DTilt({ children, className = '', intensity = 15 }) {
  const cardRef = useRef(null)

  const handleMouseMove = (e) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotateX = ((y - centerY) / centerY) * -intensity
    const rotateY = ((x - centerX) / centerX) * intensity

    gsap.to(card, {
      rotateX,
      rotateY,
      duration: 0.4,
      ease: 'power2.out',
      transformPerspective: 1000,
      overwrite: 'auto',
    })
  }

  const handleMouseLeave = () => {
    const card = cardRef.current
    if (!card) return
    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.7,
      ease: 'power3.out',
      overwrite: 'auto',
    })
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`card-3d-inner will-change-transform ${className}`}
    >
      {children}
    </div>
  )
}

// --- Kinetic Masked Line Reveal ---
export function LineReveal({ children, className = '', delay = 0 }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Check prefers reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return
    }

    gsap.from(el.querySelectorAll('.reveal-line'), {
      y: '100%',
      opacity: 0,
      duration: 0.9,
      ease: 'power3.out',
      delay,
      stagger: 0.08,
      scrollTrigger: {
        trigger: el,
        start: 'top 90%',
        toggleActions: 'play none none none',
      },
    })
  }, [delay])

  return (
    <div ref={ref} className={`overflow-hidden relative ${className}`}>
      {children}
    </div>
  )
}

export function RevealLine({ children, className = '' }) {
  return (
    <div className={`reveal-line inline-block ${className}`}>
      {children}
    </div>
  )
}

// --- Scramble / Decrypted Monospace Label ---
export function ScrambleLabel({ text, className = '' }) {
  const [display, setDisplay] = useState(text)
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789//'

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplay(text)
      return
    }

    let iteration = 0
    const interval = setInterval(() => {
      iteration++
      if (iteration > 4) {
        clearInterval(interval)
        setDisplay(text)
        return
      }
      const newText = text
        .split('')
        .map((char, i) => {
          if (i < iteration || char === ' ') return text[i]
          return chars[Math.floor(Math.random() * chars.length)]
        })
        .join('')
      setDisplay(newText)
    }, 45)

    return () => clearInterval(interval)
  }, [text])

  return <span className={`font-mono ${className}`}>{display}</span>
}

export { gsap, ScrollTrigger }
