import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ExternalLink } from 'lucide-react'
import { MagneticPill, LineReveal, RevealLine, ScrambleLabel } from './MotionPrimitives'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const containerRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(containerRef.current.querySelectorAll('.hero-reveal'), {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.15,
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={containerRef} id="hero" className="relative z-10 pt-24 pb-32 px-6 md:pt-40 md:pb-40">
      <div className="max-w-7xl mx-auto">
        <LineReveal delay={0.1} className="mb-8">
          <RevealLine className="hero-reveal font-mono text-xs tracking-widest uppercase text-[#555555] mb-2 block">
            POWER APPS DEVELOPER // ENTERPRISE ARCHITECTURE
          </RevealLine>
        </LineReveal>

        <LineReveal delay={0.3} className="mb-6">
          <RevealLine className="hero-reveal font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-tight text-balance">
            Akhil Dev Badireddi
          </RevealLine>
        </LineReveal>

        <LineReveal delay={0.5}>
          <RevealLine className="hero-reveal text-lg md:text-xl text-[#555555] leading-relaxed max-w-2xl">
            Power Apps Developer — Architecting high-scale enterprise low-code platforms, schema-adaptive PCF controls,
            and automated telemetry systems.
          </RevealLine>
        </LineReveal>

        <div className="mt-12 flex flex-wrap gap-4">
          <MagneticPill className="bg-[#111111] text-[#f9f9f8] font-mono text-xs tracking-widest uppercase py-3 px-8 rounded-sm" href="mailto:akhilbadireddi@gmail.com">
            CONTACT DIRECT
          </MagneticPill>
          <MagneticPill className="border border-[#111111] text-[#111111] font-mono text-xs tracking-widest uppercase py-3 px-8 rounded-sm hover:bg-[#111111] hover:text-[#f9f9f8] transition-colors" href="#works">
            VIEW CASE FILES
          </MagneticPill>
        </div>

        <div className="mt-16 pt-8 border-t border-[#111111]/20 flex items-baseline gap-4">
          <div className="font-mono text-xs text-[#555555] uppercase tracking-tighter">LOCATION</div>
          <div className="text-sm font-medium">Hyderabad, Telangana, India</div>
          <div className="w-px h-4 bg-[#111111]/30 mx-2"></div>
          <div className="font-mono text-xs text-[#555555] uppercase tracking-tighter">EMAIL</div>
          <a href="mailto:akhilbadireddi@gmail.com" className="text-sm hover:underline transition-colors">akhilbadireddi@gmail.com</a>
          <div className="w-px h-4 bg-[#111111]/30 mx-2"></div>
          <div className="font-mono text-xs text-[#555555] uppercase tracking-tighter">LINKEDIN</div>
          <a href="https://www.linkedin.com/in/akhil-badireddi-a9a756269" target="_blank" rel="noopener noreferrer" className="text-sm hover:underline transition-colors flex items-center gap-1">
            LinkedIn <ExternalLink className="w-3 h-3" />
          </a>
          <div className="w-px h-4 bg-[#111111]/30 mx-2"></div>
          <div className="font-mono text-xs text-[#555555] uppercase tracking-tighter">GITHUB</div>
          <a href="https://github.com/AkhilHari1" target="_blank" rel="noopener noreferrer" className="text-sm hover:underline transition-colors flex items-center gap-1">
            GitHub <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </section>
  )
}