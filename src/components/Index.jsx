import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ChevronRight } from 'lucide-react'
import { LineReveal, RevealLine } from './MotionPrimitives'

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
    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current.querySelectorAll('.index-reveal'), {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.12,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="index"
      className="relative z-10 pt-24 pb-32 px-6 md:pt-32 md:pb-40 border-y border-[#111111]/10"
    >
      <div className="max-w-7xl mx-auto">
        <LineReveal className="mb-2">
          <RevealLine className="index-reveal font-mono text-xs tracking-widest uppercase text-[#555555] block">
            CASE-FILE INDEX
          </RevealLine>
        </LineReveal>

        <LineReveal className="mb-16">
          <RevealLine className="index-reveal font-display text-4xl md:text-5xl font-bold tracking-tight">
            All Case Files
          </RevealLine>
        </LineReveal>

        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
          {CASE_FILES.map((file) => (
            <a
              key={file.index}
              href={`#${file.anchor}`}
              className="index-reveal group hairline p-6 flex flex-col justify-between hover:bg-[#111111]/3 transition-colors"
            >
              <div className="flex items-baseline gap-4 mb-4">
                <span className="font-display text-3xl font-bold tracking-tighter text-[#111111]/10 group-hover:text-[#111111]/30 transition-colors">
                  {file.index}
                </span>
                <span className={file.badge ? 'font-mono text-[10px] uppercase tracking-tighter text-[#111111] bg-[#f9f9f8] px-2 py-0.5 hairline' : ''}>
                  {file.badge}
                </span>
              </div>
              <h3 className="font-display text-xl md:text-2xl font-bold tracking-tight group-hover:text-[#111111] transition-colors mb-2">
                {file.title}
              </h3>
              <div className="font-mono text-[10px] tracking-widest uppercase text-[#555555] mb-2">
                {file.category}
              </div>
              <p className="text-[#555555] text-sm leading-relaxed mb-6 flex-1">{file.oneLiner}</p>
              <div className="font-mono text-xs tracking-widest uppercase text-[#111111] flex items-center gap-1.5 group-hover:translate-x-1 transition-transform">
                View Case File <ChevronRight className="w-3 h-3" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
