import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ChevronRight, Activity } from 'lucide-react'
import { MagneticPill, LineReveal, RevealLine, ArchitecturalCursor } from './MotionPrimitives'
import ArchitectureWalkthrough from './ArchitectureWalkthrough'

gsap.registerPlugin(ScrollTrigger)

const PROJECTS = [
  {
    id: '01',
    index: '01',
    category: 'ARCHITECTURE & CORE',
    title: 'Universal Excel-Style PCF Grid Component',
    description: 'Single, schema-adaptive PCF control bringing Excel-grade data handling—cascading filters, universal search, hide/unhide columns, 2,000+ row pagination, and dynamic edit forms—eliminating repetitive galleries and container bloat.',
    stack: ['TypeScript', 'PCF (Power Apps Component Framework)', 'React', 'Power Apps'],
    badge: 'Flagship',
    arch: {
      challenge: 'Power Apps canvas galleries degrade rapidly beyond 500 rows and lack native Excel-style behaviors.',
      systemDesign: 'A single schema-adaptive PCF control built with TypeScript and React that accepts any Dataverse entity metadata at runtime.',
      keyDecisions: [
        'PCF over canvas galleries to eliminate per-app gallery rebuilds.',
        'Virtualized DOM rendering with windowing to handle 2,000+ rows.',
        'Schema-driven dynamic edit forms using Dataverse metadata API.',
        'Local caching layer with debounced search to minimize Web API calls.',
      ],
      impact: [
        'Reduced gallery rebuild effort by ~85% across enterprise canvas apps.',
        'Grid supports 2,000+ rows with sub-100ms filter/search response.',
        'Eliminated container bloat by consolidating 12+ gallery patterns into a single reusable control.',
      ],
    },
  },
  {
    id: '02',
    index: '02',
    category: 'ENTERPRISE PRODUCTION',
    title: 'Tax Compliance Platform App',
    description: 'End-to-end tax compliance platform supporting 500+ users across the US and India, built with correlation ID logging and a standardized UI spanning 50+ screens.',
    stack: ['Power Apps', 'Power Automate', 'Dataverse', 'SQL Server', 'Power BI'],
    badge: 'Production',
    arch: {
      challenge: 'A multinational tax compliance operation needed a unified platform spanning 50+ screens, 500+ users across US and India, with complex regulatory workflows.',
      systemDesign: 'Model-driven Power Apps platform built on Dataverse with a standardized UI framework spanning 50+ screens. Power Automate handles asynchronous compliance workflows with correlation ID logging at every step.',
      keyDecisions: [
        'Dataverse as the central data platform with standardized entity relationships.',
        'Correlation ID pattern implemented across all Power Automate flows.',
        'Standardized UI components ensuring consistent experience across 50+ screens.',
        'Role-based security with Dataverse teams and business units.',
      ],
      impact: [
        'Unified 50+ screens into a single platform used by 500+ users across US and India.',
        'Correlation ID logging reduced incident resolution time by ~60%.',
        'Standardized UI reduced training overhead and support tickets by ~40%.',
      ],
    },
  },
  {
    id: '03',
    index: '03',
    category: 'CORE ENGINEERING',
    title: 'Enterprise Telemetry & Global Notification Framework',
    description: 'Centralized error-handling pipeline (IfError, IsError, OnError) capturing both in-app exceptions and Power Automate flow failures, routed into a single reusable notification component operating seamlessly across 52 screens.',
    stack: ['Power Fx', 'Power Automate', 'JSON', 'Component Library'],
    badge: 'Core',
    arch: {
      challenge: 'Enterprise canvas apps with 52 screens had fragmented error handling—each screen used ad-hoc Notify calls with inconsistent messaging and no central logging.',
      systemDesign: 'A centralized telemetry and notification framework built as a reusable PCF component library. All error handling funnels through Power Fx IfError/IsError/OnError patterns into a single notification component.',
      keyDecisions: [
        'Component library pattern so the notification logic is authored once and consumed across 52 screens.',
        'Unified error schema (JSON) capturing severity, context, user, screen, and correlation ID.',
        'Power Automate webhook integration so flow failures appear in the same telemetry stream.',
        'Severity-based routing—critical errors alert operations, warnings are logged silently.',
      ],
      impact: [
        'Unified error handling across 52 screens with a single notification component.',
        'Telemetry dashboard gave operations full visibility into app health and flow failures.',
        'Reduced user-facing error confusion by standardizing all notifications through one component.',
      ],
    },
  },
  {
    id: '04',
    index: '04',
    category: 'ENTERPRISE PRODUCTION',
    title: 'Enterprise Trackers & Alteryx Automation Toolkit',
    description: 'Automated notice management, utilization trackers, and 25+ Alteryx ETL workflows saving 600+ hours annually across enterprise operations.',
    stack: ['Model-Driven Apps', 'Alteryx', 'Dataverse', 'SharePoint'],
    badge: 'Production',
    arch: {
      challenge: 'Enterprise operations relied on manual notice management, Excel-based utilization trackers, and ad-hoc data processes. Teams spent 600+ hours annually on repetitive data collection, consolidation, and reporting.',
      systemDesign: 'Model-driven Power Apps built on Dataverse for notice management and utilization tracking, integrated with SharePoint for document storage. 25+ Alteryx ETL workflows automate data extraction from SQL Server and SharePoint.',
      keyDecisions: [
        'Model-driven apps for structured data entry with Dataverse business process flows.',
        'Alteryx ETL as the automation engine for 25+ workflows, replacing manual Excel consolidation.',
        'SharePoint integration for document attachment and version control on notices.',
        'Scheduled nightly Alteryx Server execution ensuring data freshness without manual intervention.',
      ],
      impact: [
        '25+ Alteryx ETL workflows automated, saving 600+ hours annually.',
        'Notice management and utilization tracking unified in model-driven apps.',
        'Eliminated manual Excel consolidation with automated data pipelines.',
      ],
    },
  },
  {
    id: '05',
    index: '05',
    category: 'EXPERIMENT / R&D',
    title: 'System Optimization & Local Dev Tooling',
    description: 'Open-source experimentation, custom cross-platform mobile layouts, and performance optimization workflows built with terminal utilities and Expo.',
    stack: ['React Native', 'Expo', 'TypeScript', 'CLI', 'VS Code'],
    badge: 'R&D',
    arch: {
      challenge: 'Cross-platform mobile development requires consistent tooling, performant local builds, and reusable UI patterns across iOS and Android. Existing CLI tooling was fragmented.',
      systemDesign: 'A cross-platform React Native toolkit built with Expo and TypeScript. Custom CLI utilities automate project scaffolding, dependency auditing, and performance profiling.',
      keyDecisions: [
        'Expo SDK for managed workflow, simplifying iOS/Android builds and OTA updates.',
        'TypeScript for type safety across the mobile codebase.',
        'Custom CLI tools for scaffolding and performance profiling, reducing setup time.',
        'Expo Router for file-based navigation with deep linking support.',
      ],
      impact: [
        'Cross-platform mobile toolkit reducing project setup from hours to minutes.',
        'Performance profiling tools identified and resolved bundle bloat.',
        'Standardized CLI and VS Code tooling across the mobile development team.',
      ],
    },
  },
]

const FILTERS = [
  { label: 'ALL (05)', value: 'all' },
  { label: 'ARCHITECTURE & CORE', value: 'ARCHITECTURE & CORE' },
  { label: 'ENTERPRISE PRODUCTION', value: 'ENTERPRISE PRODUCTION' },
  { label: 'R&D', value: 'EXPERIMENT / R&D' },
]

export default function Works() {
  const [filter, setFilter] = useState('all')
  const [openProject, setOpenProject] = useState(null)
  const [walkthroughProject, setWalkthroughProject] = useState(null)
  const worksRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(worksRef.current.querySelectorAll('.work-reveal'), {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.25,
        scrollTrigger: {
          trigger: worksRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      })
    }, worksRef)

    return () => ctx.revert()
  }, [])
  const sectionRef = useRef(null)

  const filtered = filter === 'all'
    ? PROJECTS
    : PROJECTS.filter(p => p.category === filter)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current.querySelectorAll('.work-reveal'), {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.2,
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [filter])

  return (
    <>
      <ArchitecturalCursor />
      <section ref={sectionRef} id="works" className="relative z-10 pt-24 pb-32 px-6 md:pt-32 md:pb-40 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <LineReveal className="mb-2">
            <RevealLine className="work-reveal font-mono text-xs tracking-widest uppercase text-[#555555] block">
              SELECTED WORKS
            </RevealLine>
          </LineReveal>
          <LineReveal className="mb-12">
            <RevealLine className="work-reveal font-display text-4xl md:text-5xl font-bold tracking-tight">
              Case-File Index
            </RevealLine>
          </LineReveal>
          <div className="flex flex-wrap gap-2 mb-12">
            {FILTERS.map((f) => {
              const active = filter === f.value
              return (
                <MagneticPill
                  key={f.label}
                  onClick={() => setFilter(f.value)}
                  className={`font-mono text-xs tracking-widest uppercase py-2 px-6 rounded-sm transition-colors ${
                    active ? 'bg-[#111111] text-[#f9f9f8]' : 'border border-[#111111]/20 text-[#111111] hover:bg-[#111111] hover:text-[#f9f9f8]'
                  }`}
                >
                  {f.label}
                </MagneticPill>
              )
            })}
          </div>
          <div ref={worksRef} className="grid gap-12 md:grid-cols-1 lg:grid-cols-1">
            {filtered.map((project) => (
              <div
                key={project.id}
                id={`work-${project.id}`}
                className="work-reveal group relative border-b border-[#111111]/10 pb-12 last:border-none last:pb-0"
              >
                <div className="flex flex-col md:flex-row gap-8 items-start">
                  <div className="flex-shrink-0 w-12 md:w-16">
                    <div className="font-display text-2xl md:text-3xl font-bold tracking-tighter text-[#111111]/10">
                      {project.index}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-4 mb-3">
                      <div className="font-mono text-xs tracking-widest uppercase text-[#555555]">
                        {project.category}
                      </div>
                      {project.badge && (
                        <span className="font-mono text-[10px] uppercase tracking-tighter text-[#111111] bg-[#f9f9f8] px-2 py-0.5 hairline">
                          {project.badge}
                        </span>
                      )}
                    </div>
                    <h3 className="font-display text-2xl md:text-3xl font-bold tracking-tight mb-3 group-hover:text-[#111111] transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-[#555555] leading-relaxed mb-6">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.stack.map((tech) => (
                        <span key={tech} className="font-mono text-[11px] text-[#555555] border border-[#111111]/20 px-3 py-1.5 rounded-sm hover:bg-[#111111] hover:text-[#f9f9f8] transition-colors cursor-default">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <button onClick={() => setOpenProject(project)} className="font-mono text-xs tracking-widest uppercase text-[#111111] flex items-center gap-2 hover:text-[#555555] transition-colors">
                      Inspect Architecture <ChevronRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                    </button>
                    <button
                      onClick={() => {
                        setWalkthroughProject(project)
                        setOpenProject(project)
                      }}
                      className="font-mono text-xs tracking-widest uppercase text-[#555555] flex items-center gap-2 hover:text-[#111111] transition-colors"
                    >
                      View How It Works <Activity className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {openProject && (
        <div className="fixed inset-0 z-50 bg-[#f9f9f8]/90 backdrop-blur-sm" onClick={() => setOpenProject(null)}>
          <div className="absolute top-6 right-6 z-51">
            <button onClick={() => { setOpenProject(null); setWalkthroughProject(null) }} className="w-8 h-8 rounded-full hairline flex items-center justify-center hover:bg-[#111111] hover:text-[#f9f9f8] transition-colors">
              <span className="text-[10px]">×</span>
            </button>
          </div>
          <div className="max-w-4xl mx-auto h-full pt-16 pb-12 px-6 overflow-y-auto">
            {walkthroughProject ? (
              <ArchitectureWalkthrough project={walkthroughProject} onClose={() => setWalkthroughProject(null)} />
            ) : (
              <>
                <div className="flex items-baseline gap-3 mb-6">
              <span className="font-display text-2xl font-bold tracking-tight">{openProject.index}</span>
              <span className="font-mono text-xs tracking-widest uppercase text-[#555555]">{openProject.category}</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight mb-6">{openProject.title}</h2>
            <p className="text-[#555555] leading-relaxed mb-10 max-w-2xl">{openProject.description}</p>
            <div className="grid gap-8 lg:grid-cols-2">
              <div className="hairline p-6">
                <h4 className="font-mono text-xs tracking-widest uppercase text-[#555555] mb-4">Challenge</h4>
                <p className="text-[#111111] leading-relaxed">{openProject.arch.challenge}</p>
              </div>
              <div className="hairline p-6">
                <h4 className="font-mono text-xs tracking-widest uppercase text-[#555555] mb-4">System Design</h4>
                <p className="text-[#111111] leading-relaxed">{openProject.arch.systemDesign}</p>
              </div>
              <div className="hairline p-6">
                <h4 className="font-mono text-xs tracking-widest uppercase text-[#555555] mb-4">Key Engineering Decisions</h4>
                <ul className="list-disc list-inside text-[#111111] leading-relaxed space-y-2">
                  {openProject.arch.keyDecisions.map((d, i) => <li key={i}>{d}</li>)}
                </ul>
              </div>
              <div className="hairline p-6">
                <h4 className="font-mono text-xs tracking-widest uppercase text-[#555555] mb-4">Measurable Impact</h4>
                <ul className="list-disc list-inside text-[#111111] leading-relaxed space-y-2">
                  {openProject.arch.impact.map((d, i) => <li key={i}>{d}</li>)}
                </ul>
              </div>
            </div>
              <div className="mt-10 hairline p-6 flex items-center justify-between">
                <div>
                  <h4 className="font-mono text-xs tracking-widest uppercase text-[#555555] mb-1">Animated Walkthrough</h4>
                  <p className="text-[#555555] text-sm leading-relaxed">
                    Interactive step-by-step visual explainer of how the system works end-to-end.
                  </p>
                </div>
                <button
                  onClick={() => setWalkthroughProject(openProject)}
                  className="font-mono text-xs tracking-widest uppercase text-[#111111] flex items-center gap-2 hover:text-[#555555] transition-colors"
                >
                  View How It Works <ChevronRight className="w-3 h-3" />
                </button>
              </div>
              <div className="mt-10 flex flex-wrap gap-2">
                {openProject.stack.map((tech) => (
                  <span key={tech} className="font-mono text-[11px] text-[#111111] border border-[#111111] px-3 py-1.5 rounded-sm">{tech}</span>
                ))}
              </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
}