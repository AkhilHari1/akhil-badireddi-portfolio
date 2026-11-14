import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// --- Custom Architectural Cursor ---
export function ArchitecturalCursor() {
  const [label, setLabel] = useState('')
  const [visible, setVisible] = useState(false)
  const [x, setX] = useState(0)
  const [y, setY] = useState(0)

  useEffect(() => {
    const handleMove = (e) => {
      setX(e.clientX)
      setY(e.clientY)
      if (!visible) setVisible(true)
    }

    const handleEnter = (e) => {
      const action = e.currentTarget.getAttribute('data-cursor')
      if (action) {
        setLabel(action)
        setVisible(true)
      }
    }

    const handleLeave = () => {
      setLabel('')
      setVisible(false)
    }

    window.addEventListener('mousemove', handleMove)
    window.addEventListener('mouseenter', handleEnter, true)
    window.addEventListener('mouseleave', handleLeave, true)

    return () => {
      window.removeEventListener('mousemove', handleMove)
      window.removeEventListener('mouseenter', handleEnter, true)
      window.removeEventListener('mouseleave', handleLeave, true)
    }
  }, [visible])

  return (
    <>
      <div
        className="cursor-dot"
        style={{ transform: `translate(${x - 5}px, ${y - 5}px)` }}
      />
      {visible && label && (
        <div
          className="cursor-label"
          style={{
            transform: `translate(${x}px, ${y}px)`,
          }}
        >
          <span className="font-mono text-xs tracking-widest uppercase text-[#111111] bg-[#f9f9f8] px-2 py-1 hairline">
            [{label}]
          </span>
        </div>
      )}
    </>
  )
}

// --- Magnetic Pill Button ---
export function MagneticPill({ children, className = '', onClick, href }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const onMouseMove = (e) => {
      const rect = el.getBoundingClientRect()
      const x = (e.clientX - rect.left - rect.width / 2) * 0.4
      const y = (e.clientY - rect.top - rect.height / 2) * 0.4
      gsap.to(el, {
        x,
        y,
        duration: 0.6,
        ease: 'power3.out',
        overwrite: true,
      })
    }

    const onMouseLeave = () => {
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.8,
        ease: 'elastic.out(1, 0.5)',
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

  const LinkOrButton = href ? 'a' : 'button'
  const props = href ? { href } : { onClick, type: 'button' }

  return (
    <LinkOrButton
      ref={ref}
      className={`mag-pill group ${className}`}
      {...props}
    >
      {children}
    </LinkOrButton>
  )
}

// --- Kinetic Split-Text / Masked Line Reveal ---
export function LineReveal({ children, className = '', delay = 0 }) {
  const ref = useRef(null)
  const [split, setSplit] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || split) return

    gsap.from(el.querySelectorAll('.reveal-line'), {
      y: '100%',
      duration: 0.8,
      ease: 'power3.out',
      delay,
      stagger: 0.1,
    })
  }, [split, delay])

  return (
    <div
      ref={ref}
      className={`relative ${className}`}
      style={{ overflow: 'visible' }}
    >
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
    let iteration = 0
    const interval = setInterval(() => {
      iteration++
      if (iteration > 4) {
        clearInterval(interval)
        return
      }
      const newText = text
        .split('')
        .map((char, i) => {
          if (i < iteration) return text[i]
          return chars[Math.floor(Math.random() * chars.length)]
        })
        .join('')
      setDisplay(newText)
    }, 40)

    return () => clearInterval(interval)
  }, [text])

  return <span className={`font-mono text-[#111111] ${className}`}>{display}</span>
}

export { gsap, ScrollTrigger }