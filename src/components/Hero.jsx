import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ExternalLink, ArrowDownRight, Compass, ShieldCheck, Sparkles } from 'lucide-react'
import { MagneticPill, LineReveal, RevealLine, ScrambleLabel } from './MotionPrimitives'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const containerRef = useRef(null)
  const badgeRef = useRef(null)

  useEffect(() => {
    // Respect user motion preferences
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return
    }

    const ctx = gsap.context(() => {
      // Entrance reveal sequence
      gsap.from(containerRef.current.querySelectorAll('.hero-reveal'), {
        y: 45,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.12,
        clearProps: 'transform',
      })

      // Parallax scroll effect on Hero typography
      gsap.to(containerRef.current.querySelector('.hero-content-wrap'), {
        y: 80,
        opacity: 0.7,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={containerRef}
      id="hero"
      aria-label="Introduction & Architecture Focus"
      className="relative z-10 min-h-[92vh] sm:min-h-screen flex flex-col justify-center pt-28 pb-20 px-4 sm:px-6 md:pt-36 md:pb-28 overflow-hidden pointer-events-none"
    >
      <div className="max-w-7xl mx-auto w-full hero-content-wrap pointer-events-auto">
        {/* Top Architectural Subtitle Tag */}
        <div className="mb-4 sm:mb-6">
          <div className="hero-reveal inline-flex items-center gap-2 font-mono text-[11px] sm:text-xs tracking-widest uppercase text-[#555555] bg-[#f9f9f8]/90 backdrop-blur-sm border border-[#111111]/15 px-3 py-1.5 rounded-sm">
            <span className="w-2 h-2 rounded-full bg-[#111111]" aria-hidden="true" />
            <ScrambleLabel text="ENTERPRISE LOW-CODE ARCHITECTURE // PCF PLATFORMS" />
          </div>
        </div>

        {/* Primary Title / Name */}
        <div className="mb-6 sm:mb-8">
          <h1 className="hero-reveal font-display text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.05] text-[#111111] max-w-5xl">
            Akhil Dev Badireddi
          </h1>
        </div>

        {/* Core Specialization Chips */}
        <div className="hero-reveal flex flex-wrap items-center gap-2 sm:gap-3 mb-8 text-[#111111]">
          <span className="font-mono text-[11px] sm:text-xs tracking-wider uppercase bg-[#111111] text-[#f9f9f8] px-3 py-1 rounded-sm">
            Power Apps Developer
          </span>
          <span className="font-mono text-[11px] sm:text-xs tracking-wider uppercase bg-[#f9f9f8] border border-[#111111] px-3 py-1 rounded-sm">
            PCF Component Architect
          </span>
          <span className="font-mono text-[11px] sm:text-xs tracking-wider uppercase bg-[#f9f9f8] border border-[#111111]/30 text-[#555555] px-3 py-1 rounded-sm">
            Associate Business Analyst
          </span>
        </div>

        {/* Value Proposition Synopsis */}
        <div className="mb-10 sm:mb-14">
          <p className="hero-reveal text-base sm:text-lg md:text-xl text-[#444444] leading-relaxed max-w-3xl font-body">
            Engineering high-scale enterprise low-code systems — schema-adaptive PCF controls with virtualized DOM rendering, automated telemetry pipelines across 50+ screens, and high-throughput data automation for mission-critical workflows.
          </p>
        </div>

        {/* Spatial 3D Hint Banner */}
        <div className="hero-reveal mb-10 inline-flex items-center gap-2.5 font-mono text-[11px] tracking-widest uppercase text-[#666666] bg-[#111111]/5 border border-[#111111]/10 px-3.5 py-2 rounded-sm" data-cursor="ROTATE 3D">
          <Compass className="w-3.5 h-3.5 text-[#111111] animate-spin" style={{ animationDuration: '8s' }} />
          <span>Interactive 3D Matrix Background — Click &amp; drag to explore spatial geometry</span>
        </div>

        {/* Primary Call-to-Actions */}
        <div className="hero-reveal flex flex-wrap items-center gap-3 sm:gap-4 mb-16">
          <MagneticPill
            href="#works"
            data-cursor="INSPECT"
            className="bg-[#111111] text-[#f9f9f8] font-mono text-xs sm:text-sm tracking-widest uppercase py-3.5 px-6 sm:px-8 rounded-sm shadow-sm hover:bg-[#333333] flex items-center gap-2"
          >
            <span>View Case Files</span>
            <ArrowDownRight className="w-4 h-4" />
          </MagneticPill>

          <MagneticPill
            href="mailto:akhilbadireddi@gmail.com"
            data-cursor="EMAIL"
            className="border border-[#111111] bg-[#f9f9f8] text-[#111111] font-mono text-xs sm:text-sm tracking-widest uppercase py-3.5 px-6 sm:px-8 rounded-sm hover:bg-[#111111] hover:text-[#f9f9f8] transition-colors"
          >
            Contact Direct
          </MagneticPill>
        </div>

        {/* Metadata Footer Strip */}
        <div className="hero-reveal pt-8 border-t border-[#111111]/15 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 text-left">
          <div>
            <div className="font-mono text-[10px] sm:text-xs text-[#666666] uppercase tracking-wider mb-1">LOCATION</div>
            <div className="text-xs sm:text-sm font-medium text-[#111111]">Hyderabad, India</div>
          </div>

          <div>
            <div className="font-mono text-[10px] sm:text-xs text-[#666666] uppercase tracking-wider mb-1">EMAIL</div>
            <a
              href="mailto:akhilbadireddi@gmail.com"
              data-cursor="MAILTO"
              className="text-xs sm:text-sm font-medium text-[#111111] hover:underline truncate block"
            >
              akhilbadireddi@gmail.com
            </a>
          </div>

          <div>
            <div className="font-mono text-[10px] sm:text-xs text-[#666666] uppercase tracking-wider mb-1">LINKEDIN</div>
            <a
              href="https://www.linkedin.com/in/akhil-badireddi-a9a756269"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="OPEN"
              className="text-xs sm:text-sm font-medium text-[#111111] hover:underline inline-flex items-center gap-1"
            >
              <span>akhil-badireddi</span>
              <ExternalLink className="w-3 h-3 text-[#555555]" />
            </a>
          </div>

          <div>
            <div className="font-mono text-[10px] sm:text-xs text-[#666666] uppercase tracking-wider mb-1">GITHUB</div>
            <a
              href="https://github.com/AkhilHari1"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="REPO"
              className="text-xs sm:text-sm font-medium text-[#111111] hover:underline inline-flex items-center gap-1"
            >
              <span>AkhilHari1</span>
              <ExternalLink className="w-3 h-3 text-[#555555]" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
