import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { LineReveal, RevealLine } from './MotionPrimitives'

gsap.registerPlugin(ScrollTrigger)

const CAPABILITIES = [
  {
    index: '01',
    title: 'Power Platform & Low-Code',
    items: [
      'Power Apps (Canvas & Model-Driven)',
      'Power Automate',
      'Dataverse',
      'Power Fx',
      'Component Libraries',
      'Power BI',
    ],
  },
  {
    index: '02',
    title: 'Custom Controls & Frontend',
    items: [
      'PCF (Power Apps Component Framework)',
      'TypeScript',
      'React',
      'JavaScript',
      'React Native',
      'Expo',
      'Tailwind CSS',
    ],
  },
  {
    index: '03',
    title: 'Data, ETL & Automation',
    items: [
      'SQL Server',
      'Alteryx ETL',
      'SharePoint Online',
      'Correlation ID Telemetry',
      'REST / Custom Connectors',
    ],
  },
]

export default function Capabilities() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current.querySelectorAll('.cap-reveal'), {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.2,
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="capabilities" className="relative z-10 pt-24 pb-32 px-6 md:pt-32 md:pb-40">
      <div className="max-w-7xl mx-auto">
        <LineReveal className="mb-2">
          <RevealLine className="cap-reveal font-mono text-xs tracking-widest uppercase text-[#555555] block">
            CAPABILITIES
          </RevealLine>
        </LineReveal>

        <LineReveal className="mb-16">
          <RevealLine className="cap-reveal font-display text-4xl md:text-5xl font-bold tracking-tight">
            Engineering Matrix
          </RevealLine>
        </LineReveal>

        <div className="grid gap-4 md:grid-cols-3">
          {CAPABILITIES.map((cap) => (
            <div
              key={cap.index}
              className="cap-reveal hairline p-6 group hover:bg-[#111111]/5 transition-colors"
            >
              <div className="flex items-baseline gap-3 mb-4">
                <span className="font-display text-xl font-bold tracking-tight">{cap.index}</span>
                <span className="font-mono text-xs tracking-widest uppercase text-[#555555]">{cap.title}</span>
              </div>
              <ul className="space-y-2">
                {cap.items.map((item, i) => (
                  <li key={i} className="font-mono text-sm text-[#555555] leading-relaxed">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}