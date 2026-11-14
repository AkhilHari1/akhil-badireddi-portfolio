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
          <RevealLine className="hero-reveal font-mono text-xs sm:text-[10px] md:text-xs tracking-widest uppercase text-[#555555] mb-2 block break-words">
            POWER APPS DEVELOPER // ENTERPRISE ARCHITECTURE
          </RevealLine>
        </LineReveal>

        <LineReveal delay={0.3} className="mb-8">
          <RevealLine className="hero-reveal font-display text-base sm:text-lg md:text-xl lg:text-2xl font-bold tracking-tight leading-none break-words">
            Akhil Dev Badireddi
          </RevealLine>
        </LineReveal>

        <div className="flex items-center gap-2 font-mono text-[10px] sm:text-xs tracking-widest uppercase text-[#111111] bg-[#f9f9f8] border border-[#111111] px-3 py-1 mb-8 break-words leading-none">
          Power Platform Developer · Power Apps Developer · Associate Business Analyst
        </div>
        <LineReveal delay={0.5} className="mb-12">
          <RevealLine className="hero-reveal text-base sm:text-lg md:text-xl text-[#555555] leading-relaxed max-w-2xl break-words">
            Architecting high-scale enterprise low-code platforms — schema-adaptive PCF controls, automated telemetry systems, and business-process automation for enterprise operations.
          </RevealLine>
        </LineReveal>

        <div className="mt-16 flex flex-wrap gap-3">
          <MagneticPill className="bg-[#111111] text-[#f9f9f8] font-mono text-xs sm:text-sm tracking-widest uppercase py-2.5 sm:py-3 px-6 sm:px-8 rounded-sm" href="mailto:akhilbadireddi@gmail.com">
            CONTACT DIRECT
          </MagneticPill>
          <MagneticPill className="border border-[#111111] text-[#111111] font-mono text-xs sm:text-sm tracking-widest uppercase py-2.5 sm:py-3 px-6 sm:px-8 rounded-sm hover:bg-[#111111] hover:text-[#f9f9f8] transition-colors" href="#works">
            VIEW CASE FILES
          </MagneticPill>
        </div>

        <div className="mt-20 pt-8 border-t border-[#111111]/20 flex flex-wrap items-start gap-4 sm:gap-6">
          <div className="w-full sm:w-auto font-mono text-xs sm:text-sm text-[#555555] uppercase tracking-tighter">LOCATION</div>
          <div className="w-full sm:w-auto text-sm font-medium">Hyderabad, Telangana, India</div>
          <div className="hidden sm:block w-px h-4 bg-[#111111]/30 mx-3"></div>
          <div className="w-full sm:w-auto font-mono text-xs sm:text-sm text-[#555555] uppercase tracking-tighter">EMAIL</div>
          <a href="mailto:akhilbadireddi@gmail.com" className="w-full sm:w-auto text-sm hover:underline transition-colors break-words">akhilbadireddi@gmail.com</a>
          <div className="hidden sm:block w-px h-4 bg-[#111111]/30 mx-3"></div>
          <div className="w-full sm:w-auto font-mono text-xs sm:text-sm text-[#555555] uppercase tracking-tighter">LINKEDIN</div>
          <a href="https://www.linkedin.com/in/akhil-badireddi-a9a756269" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto text-sm hover:underline transition-colors flex items-center gap-1 break-words">
            LinkedIn <ExternalLink className="w-3 h-3" />
          </a>
          <div className="hidden sm:block w-px h-4 bg-[#111111]/30 mx-3"></div>
          <div className="w-full sm:w-auto font-mono text-xs sm:text-sm text-[#555555] uppercase tracking-tighter">GITHUB</div>
          <a href="https://github.com/AkhilHari1" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto text-sm hover:underline transition-colors flex items-center gap-1 break-words">
            GitHub <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </section>
  )
}