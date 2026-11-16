import { useState, useEffect } from 'react'
import { MagneticPill } from './MotionPrimitives'

export default function Nav() {
  const [time, setTime] = useState('')
  const [copiedTime, setCopiedTime] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const update = () => {
      const now = new Date()
      const hydTime = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }))
      setTime(hydTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' }))
    }
    update()
    const interval = setInterval(update, 1000)
    return () => clearInterval(interval)
  }, [])

  const copyTime = () => {
    navigator.clipboard.writeText(`Hyderabad (IST): ${time}`)
    setCopiedTime(true)
    setTimeout(() => setCopiedTime(false), 2000)
  }

  return (
    <header className="fixed top-0 left-0 w-full z-40 px-4 sm:px-6 py-4 md:py-6 transition-all backdrop-blur-[2px] bg-[#f9f9f8]/60 border-b border-[#111111]/5">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Monogram Brand Mark */}
        <a
          href="#hero"
          className="flex items-center gap-3 cursor-pointer select-none group focus-visible:outline-none"
          data-cursor="TOP"
          aria-label="Akhil Dev Badireddi - Back to Top"
        >
          <div className="w-8 h-8 hairline rounded-sm flex items-center justify-center text-xs font-mono font-bold tracking-tighter bg-[#111111] text-[#f9f9f8] group-hover:bg-[#333333] transition-colors">
            ADB
          </div>
          <div className="text-left">
            <div className="font-display text-sm sm:text-base font-bold tracking-tight">
              AKHIL DEV BADIREDDI
            </div>
            <div className="font-mono text-[10px] text-[#555555] tracking-widest uppercase">
              POWER APPS ARCHITECT // 2026
            </div>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav aria-label="Main Navigation" className="hidden md:flex items-center gap-8 text-xs font-mono tracking-widest uppercase text-[#555555]">
          <a
            href="#hero"
            data-cursor="SPATIAL"
            className="hover:text-[#111111] transition-colors py-1"
          >
            3D MATRIX
          </a>
          <a
            href="#index"
            data-cursor="INDEX"
            className="hover:text-[#111111] transition-colors py-1"
          >
            INDEX
          </a>
          <a
            href="#works"
            data-cursor="CASES"
            className="hover:text-[#111111] transition-colors py-1"
          >
            WORK (05)
          </a>
          <a
            href="#capabilities"
            data-cursor="STACK"
            className="hover:text-[#111111] transition-colors py-1"
          >
            CAPABILITIES
          </a>
          <a
            href="#contact"
            data-cursor="CONNECT"
            className="hover:text-[#111111] transition-colors py-1"
          >
            CONTACT
          </a>
        </nav>

        {/* Status & Local Time Indicator */}
        <div className="flex items-center gap-2 sm:gap-3 text-xs font-mono tracking-widest text-[#555555]">
          <div className="hidden sm:flex items-center gap-1.5 text-[11px]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" aria-hidden="true"></span>
            <span>HYD, IN</span>
          </div>

          <button
            onClick={copyTime}
            type="button"
            className="hairline px-2.5 py-1 rounded-sm bg-[#111111] text-[#f9f9f8] hover:bg-[#333333] text-[11px] transition-all cursor-pointer select-none flex items-center gap-1.5"
            data-cursor="COPY TIME"
            aria-label={`Current time in Hyderabad is ${time}. Click to copy.`}
            title="Click to copy Hyderabad time"
          >
            <span className="hidden sm:inline text-[#999999]">IST:</span>
            <span>{time || '11:15 AM'}</span>
            {copiedTime && <span className="text-emerald-400 text-[10px]">COPIED</span>}
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 hairline rounded-sm text-[#111111] hover:bg-[#111111] hover:text-[#f9f9f8] transition-colors"
            aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
            aria-expanded={mobileMenuOpen}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden pt-4 pb-6 px-4 bg-[#f9f9f8] border-t border-[#111111]/10 mt-3 animate-fadeIn">
          <nav aria-label="Mobile Navigation" className="flex flex-col gap-4 font-mono text-xs tracking-widest uppercase">
            <a
              href="#hero"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 border-b border-[#111111]/5 hover:bg-[#111111]/5"
            >
              3D Spatial Matrix
            </a>
            <a
              href="#index"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 border-b border-[#111111]/5 hover:bg-[#111111]/5"
            >
              Index
            </a>
            <a
              href="#works"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 border-b border-[#111111]/5 hover:bg-[#111111]/5"
            >
              Work (05 Case Files)
            </a>
            <a
              href="#capabilities"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 border-b border-[#111111]/5 hover:bg-[#111111]/5"
            >
              Engineering Capabilities
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 hover:bg-[#111111]/5"
            >
              Contact Direct
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}
