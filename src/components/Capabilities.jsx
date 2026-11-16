import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { LineReveal, RevealLine, Card3DTilt } from './MotionPrimitives'
import { Cpu, Terminal, Database, CheckCircle2 } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const CAPABILITIES = [
  {
    index: '01',
    title: 'Power Platform & Enterprise Low-Code',
    icon: Cpu,
    summary: 'Core Microsoft ecosystem architecture with custom component engineering.',
    items: [
      'Power Apps (Advanced Canvas & Model-Driven)',
      'Power Automate (Complex Multi-Stage Cloud Flows)',
      'Microsoft Dataverse (Relational Architecture & Security)',
      'Power Fx (Advanced Expression Logic & Formula Pipelines)',
      'Enterprise Component Libraries & Solution Packaging',
      'Power BI (Operational Analytics & Dashboards)',
    ],
  },
  {
    index: '02',
    title: 'Custom PCF Controls & Modern Frontend',
    icon: Terminal,
    summary: 'Bridging low-code with high-performance TypeScript and React components.',
    items: [
      'PCF (Power Apps Component Framework) Architecture',
      'TypeScript (Type-Safe Enterprise Components)',
      'React & Modern Component Lifecycles',
      'Three.js & WebGL 3D Data Visualizations',
      'React Native & Expo (Cross-Platform Mobile Layouts)',
      'Tailwind CSS & Architectural Design Systems',
    ],
  },
  {
    index: '03',
    title: 'Data Pipelines, ETL & Telemetry',
    icon: Database,
    summary: 'Resilient data persistence, enterprise integrations, and observability.',
    items: [
      'SQL Server (Schema Design, Views & Stored Procedures)',
      'Alteryx ETL (25+ Enterprise Automated Workflows)',
      'SharePoint Online (Document Management & Storage API)',
      'Correlation ID Global Telemetry Pipelines',
      'REST & Custom Connectors with Token Auth',
    ],
  },
]

export default function Capabilities() {
  const sectionRef = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return
    }

    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current.querySelectorAll('.cap-reveal'), {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.15,
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
      id="capabilities"
      aria-labelledby="capabilities-heading"
      className="relative z-10 pt-20 pb-28 px-4 sm:px-6 md:pt-32 md:pb-40 border-t border-[#111111]/10 bg-[#f9f9f8]/90 backdrop-blur-sm"
    >
      <div className="max-w-7xl mx-auto">
        <LineReveal className="mb-2">
          <RevealLine className="cap-reveal font-mono text-xs tracking-widest uppercase text-[#555555] block">
            CORE DOMAIN EXPERTISE
          </RevealLine>
        </LineReveal>

        <LineReveal className="mb-12 sm:mb-16">
          <h2
            id="capabilities-heading"
            className="cap-reveal font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#111111]"
          >
            Engineering Capabilities Matrix
          </h2>
        </LineReveal>

        <div className="grid gap-6 md:grid-cols-3 card-3d-wrap">
          {CAPABILITIES.map((cap) => {
            const IconComponent = cap.icon
            return (
              <Card3DTilt key={cap.index} intensity={10}>
                <div className="cap-reveal hairline p-6 sm:p-8 rounded-sm bg-[#f9f9f8] hover:bg-[#ffffff] transition-all h-full flex flex-col justify-between shadow-sm group">
                  <div>
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-baseline gap-3">
                        <span className="font-display text-2xl font-bold tracking-tight text-[#111111]/25 group-hover:text-[#111111]/60 transition-colors">
                          {cap.index}
                        </span>
                        <span className="font-mono text-xs tracking-widest uppercase text-[#555555]">
                          PILLAR
                        </span>
                      </div>
                      <div className="w-8 h-8 rounded-sm hairline flex items-center justify-center bg-[#111111]/[0.02] group-hover:bg-[#111111] group-hover:text-[#f9f9f8] transition-colors">
                        <IconComponent className="w-4 h-4" />
                      </div>
                    </div>

                    <h3 className="font-display text-xl sm:text-2xl font-bold tracking-tight mb-3 text-[#111111]">
                      {cap.title}
                    </h3>

                    <p className="text-[#555555] text-xs sm:text-sm leading-relaxed mb-6">
                      {cap.summary}
                    </p>

                    {/* Skill Items */}
                    <ul className="space-y-3 pt-4 border-t border-[#111111]/10">
                      {cap.items.map((item, i) => (
                        <li
                          key={i}
                          className="font-mono text-xs text-[#333333] leading-relaxed flex items-start gap-2.5"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-[#111111] mt-1.5 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-8 pt-4 border-t border-[#111111]/10 flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-[#666666]">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    <span>Production Battle-Tested</span>
                  </div>
                </div>
              </Card3DTilt>
            )
          })}
        </div>
      </div>
    </section>
  )
}
