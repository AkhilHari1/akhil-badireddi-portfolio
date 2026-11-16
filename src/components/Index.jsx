import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ChevronRight } from 'lucide-react'
import { LineReveal, RevealLine, Card3DTilt } from './MotionPrimitives'

gsap.registerPlugin(ScrollTrigger)

const CASE_FILES = [
  {
    index: '01',
    anchor: 'work-01',
    title: 'Universal Excel-Style PCF Grid Component',
    category: 'ARCHITECTURE & CORE',
    badge: 'FLAGSHIP',
    oneLiner:
      'Schema-adaptive PCF control with Excel-grade data handling — 2,000+ virtualized rows, sub-100ms search.',
  },
  {
    index: '02',
    anchor: 'work-02',
    title: 'Tax Compliance Platform App',
    category: 'ENTERPRISE PRODUCTION',
    badge: 'PRODUCTION',
    oneLiner:
      '500+ users across US and India, 50+ standardized screens, correlation ID telemetry throughout.',
  },
  {
    index: '03',
    anchor: 'work-03',
    title: 'Enterprise Telemetry & Global Notification Framework',
    category: 'CORE ENGINEERING',
    badge: 'CORE',
    oneLiner:
      'Centralized IfError/IsError/OnError pipeline across 52 screens with unified JSON telemetry.',
  },
  {
    index: '04',
    anchor: 'work-04',
    title: 'Enterprise Trackers & Alteryx Automation Toolkit',
    category: 'ENTERPRISE PRODUCTION',
    badge: 'PRODUCTION',
    oneLiner:
      '25+ Alteryx ETL workflows and notice trackers saving 600+ hours annually.',
  },
  {
    index: '05',
    anchor: 'work-05',
    title: 'System Optimization & Local Dev Tooling',
    category: 'EXPERIMENT / R&D',
    badge: 'R&D',
    oneLiner:
      'Cross-platform React Native / Expo layouts and terminal-native performance tooling.',
  },
]

export default function Index() {
  const sectionRef = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return
    }

    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current.querySelectorAll('.index-reveal'), {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="index"
      aria-labelledby="index-heading"
      className="relative z-10 pt-20 pb-28 px-4 sm:px-6 md:pt-32 md:pb-40 border-y border-[#111111]/10 bg-[#f9f9f8]/80 backdrop-blur-sm"
    >
      <div className="max-w-7xl mx-auto">
        <LineReveal className="mb-2">
          <RevealLine className="index-reveal font-mono text-xs tracking-widest uppercase text-[#555555] block">
            PORTFOLIO OVERVIEW
          </RevealLine>
        </LineReveal>

        <LineReveal className="mb-12 sm:mb-16">
          <h2 id="index-heading" className="index-reveal font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            Case-File Index
          </h2>
        </LineReveal>

        <div className="grid gap-6 md:grid-cols-2 card-3d-wrap">
          {CASE_FILES.map((file) => (
            <Card3DTilt key={file.index} intensity={8}>
              <a
                href={`#${file.anchor}`}
                data-cursor="INSPECT"
                className="index-reveal group hairline p-6 sm:p-8 flex flex-col justify-between h-full bg-[#f9f9f8] hover:bg-[#111111]/[0.02] transition-colors rounded-sm shadow-sm focus-visible:outline-none"
              >
                <div>
                  <div className="flex items-baseline justify-between mb-4">
                    <span className="font-display text-3xl sm:text-4xl font-bold tracking-tighter text-[#111111]/15 group-hover:text-[#111111]/40 transition-colors">
                      {file.index}
                    </span>
                    {file.badge && (
                      <span className="font-mono text-[10px] uppercase tracking-wider text-[#111111] bg-[#111111]/5 px-2.5 py-1 rounded-sm hairline">
                        {file.badge}
                      </span>
                    )}
                  </div>
                  <div className="font-mono text-[10px] sm:text-xs tracking-widest uppercase text-[#555555] mb-2">
                    {file.category}
                  </div>
                  <h3 className="font-display text-lg sm:text-xl md:text-2xl font-bold tracking-tight group-hover:text-[#111111] transition-colors mb-3">
                    {file.title}
                  </h3>
                  <p className="text-[#555555] text-sm leading-relaxed mb-6">
                    {file.oneLiner}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#111111]/10 flex items-center justify-between font-mono text-xs tracking-widest uppercase text-[#111111]">
                  <span>Inspect Case File</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                </div>
              </a>
            </Card3DTilt>
          ))}
        </div>
      </div>
    </section>
  )
}
