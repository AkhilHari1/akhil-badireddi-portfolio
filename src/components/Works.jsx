import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ChevronRight, Activity, X, Layers, CheckCircle2, Box } from 'lucide-react'
import { MagneticPill, LineReveal, RevealLine, Card3DTilt } from './MotionPrimitives'
import ArchitectureWalkthrough from './ArchitectureWalkthrough'

gsap.registerPlugin(ScrollTrigger)

const PROJECTS = [
  {
    id: '01',
    index: '01',
    category: 'ARCHITECTURE & CORE',
    title: 'Universal Excel-Style PCF Grid Component',
    description: 'Single, schema-adaptive PCF control bringing Excel-grade data handling—cascading filters, universal search, hide/unhide columns, 2,000+ row pagination, and dynamic edit forms—eliminating repetitive galleries and container bloat.',
    stack: ['TypeScript', 'PCF (Power Apps Component Framework)', 'React', 'Power Apps', 'Dataverse'],
    badge: 'Flagship Core',
    preview3D: 'PCF Virtualized Grid Canvas',
    arch: {
      challenge: 'Power Apps canvas galleries degrade rapidly beyond 500 rows and lack native Excel-style behaviors.',
      systemDesign: 'A single schema-adaptive PCF control built with TypeScript and React that accepts any Dataverse entity metadata at runtime.',
      keyDecisions: [
        'PCF over canvas galleries to eliminate per-app gallery rebuilds.',
        'Virtualized DOM rendering with windowing to handle 2,000+ rows seamlessly.',
        'Schema-driven dynamic edit forms using Dataverse metadata API.',
        'Local caching layer with debounced search to minimize expensive Web API calls.',
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
    badge: 'Enterprise Production',
    preview3D: 'Multi-Region Distributed Data Hub',
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
    stack: ['Power Fx', 'Power Automate', 'JSON Telemetry', 'Component Library'],
    badge: 'Telemetry Architecture',
    preview3D: 'Real-Time Telemetry Pipeline',
    arch: {
      challenge: 'Enterprise canvas apps with 52 screens had fragmented error handling—each screen used ad-hoc Notify calls with inconsistent messaging and no central logging.',
      systemDesign: 'A centralized telemetry and notification framework built as a reusable PCF component library. All error handling funnels through Power Fx IfError/IsError/OnError patterns into a single notification component.',
      keyDecisions: [
        'Component library pattern so notification logic is authored once and consumed across 52 screens.',
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
    stack: ['Model-Driven Apps', 'Alteryx ETL', 'Dataverse', 'SharePoint Online'],
    badge: 'Automation Toolkit',
    preview3D: 'ETL Pipeline Orchestration',
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
    stack: ['React Native', 'Expo', 'TypeScript', 'CLI Tooling', 'VS Code'],
    badge: 'R&D Labs',
    preview3D: 'Cross-Platform Tooling Matrix',
    arch: {
      challenge: 'Cross-platform mobile development requires consistent tooling, performant local builds, and reusable UI patterns across iOS and Android.',
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
        'Standardized CLI and VS Code tooling across mobile development workflows.',
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
  const sectionRef = useRef(null)

  // Escape key handler for accessible modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setOpenProject(null)
        setWalkthroughProject(null)
      }
    }
    if (openProject) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [openProject])

  const filtered = filter === 'all'
    ? PROJECTS
    : PROJECTS.filter(p => p.category === filter)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return
    }

    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current.querySelectorAll('.work-card-reveal'), {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.15,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [filter])

  return (
    <section
      ref={sectionRef}
      id="works"
      aria-labelledby="works-heading"
      className="relative z-10 pt-20 pb-32 px-4 sm:px-6 md:pt-32 md:pb-40 overflow-hidden bg-[#f9f9f8]/90 backdrop-blur-sm"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <LineReveal className="mb-2">
          <RevealLine className="font-mono text-xs tracking-widest uppercase text-[#555555] block">
            SELECTED WORKS // CASE STUDIES
          </RevealLine>
        </LineReveal>

        <LineReveal className="mb-8 sm:mb-12">
          <h2 id="works-heading" className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#111111]">
            Engineering Case Files
          </h2>
        </LineReveal>

        {/* Filter Pills */}
        <div
          role="group"
          aria-label="Filter case files by category"
          className="flex flex-wrap gap-2 mb-12 sm:mb-16"
        >
          {FILTERS.map((f) => {
            const active = filter === f.value
            return (
              <MagneticPill
                key={f.label}
                onClick={() => setFilter(f.value)}
                aria-pressed={active}
                data-cursor="FILTER"
                className={`font-mono text-xs tracking-widest uppercase py-2 sm:py-2.5 px-4 sm:px-6 rounded-sm transition-all ${
                  active
                    ? 'bg-[#111111] text-[#f9f9f8] shadow-sm'
                    : 'border border-[#111111]/20 text-[#111111] hover:bg-[#111111] hover:text-[#f9f9f8]'
                }`}
              >
                {f.label}
              </MagneticPill>
            )
          })}
        </div>

        {/* Project Case File Cards */}
        <div className="grid gap-8 md:gap-12 card-3d-wrap">
          {filtered.map((project) => (
            <article
              key={project.id}
              id={`work-${project.id}`}
              className="work-card-reveal group hairline p-6 sm:p-10 rounded-sm bg-[#f9f9f8] hover:bg-[#111111]/[0.015] transition-all relative overflow-hidden shadow-sm"
            >
              <div className="flex flex-col lg:flex-row gap-8 items-start justify-between">
                {/* Left Meta & Index */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="font-display text-3xl sm:text-4xl font-bold tracking-tighter text-[#111111]/20 group-hover:text-[#111111]/50 transition-colors">
                      {project.index}
                    </span>
                    <span className="font-mono text-[11px] sm:text-xs tracking-widest uppercase text-[#555555]">
                      {project.category}
                    </span>
                    {project.badge && (
                      <span className="font-mono text-[10px] uppercase tracking-wider text-[#111111] bg-[#111111]/5 px-2.5 py-0.5 rounded-sm hairline">
                        {project.badge}
                      </span>
                    )}
                  </div>

                  <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-4 text-[#111111]">
                    {project.title}
                  </h3>

                  <p className="text-[#444444] text-base leading-relaxed mb-6 max-w-3xl">
                    {project.description}
                  </p>

                  {/* Tech Stack Pills */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="font-mono text-[11px] text-[#555555] bg-[#111111]/[0.03] border border-[#111111]/15 px-3 py-1 rounded-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Interactive Action Buttons */}
                  <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-4 border-t border-[#111111]/10">
                    <button
                      type="button"
                      onClick={() => {
                        setOpenProject(project)
                        setWalkthroughProject(null)
                      }}
                      data-cursor="INSPECT"
                      className="font-mono text-xs tracking-widest uppercase bg-[#111111] text-[#f9f9f8] hover:bg-[#333333] px-5 py-2.5 rounded-sm flex items-center gap-2 transition-colors focus-visible:outline-none"
                    >
                      <span>Inspect Architecture</span>
                      <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setWalkthroughProject(project)
                        setOpenProject(project)
                      }}
                      data-cursor="FLOW"
                      className="font-mono text-xs tracking-widest uppercase text-[#111111] border border-[#111111]/30 hover:border-[#111111] px-5 py-2.5 rounded-sm flex items-center gap-2 transition-colors focus-visible:outline-none"
                    >
                      <Activity className="w-3.5 h-3.5 text-[#111111]" />
                      <span>Live Flow Walkthrough</span>
                    </button>
                  </div>
                </div>

                {/* Right Architectural Badge / Spatial Mini Preview */}
                <div className="w-full lg:w-72 flex-shrink-0 hairline p-5 bg-[#f9f9f8] rounded-sm hidden sm:block">
                  <div className="font-mono text-[10px] tracking-widest uppercase text-[#666666] mb-3 flex items-center gap-2">
                    <Box className="w-3.5 h-3.5 text-[#111111]" />
                    <span>SYSTEM TOPOLOGY</span>
                  </div>
                  <div className="text-sm font-semibold text-[#111111] mb-2">
                    {project.preview3D}
                  </div>
                  <div className="text-xs text-[#555555] leading-relaxed mb-4">
                    {project.arch.challenge.slice(0, 110)}...
                  </div>
                  <div className="font-mono text-[10px] text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-sm border border-emerald-200 inline-flex items-center gap-1.5">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    <span>Verified Production Impact</span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Accessible Architectural Deep-Dive Modal */}
      {openProject && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          className="fixed inset-0 z-50 bg-[#111111]/60 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
          onClick={() => {
            setOpenProject(null)
            setWalkthroughProject(null)
          }}
        >
          <div
            className="relative w-full max-w-4xl bg-[#f9f9f8] border border-[#111111]/20 rounded-sm shadow-2xl p-6 sm:p-10 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => {
                setOpenProject(null)
                setWalkthroughProject(null)
              }}
              data-cursor="CLOSE"
              className="absolute top-5 right-5 w-9 h-9 rounded-full hairline flex items-center justify-center text-[#111111] hover:bg-[#111111] hover:text-[#f9f9f8] transition-colors focus-visible:outline-none"
              aria-label="Close dialog"
            >
              <X className="w-4 h-4" />
            </button>

            {walkthroughProject ? (
              <ArchitectureWalkthrough
                project={walkthroughProject}
                onClose={() => setWalkthroughProject(null)}
              />
            ) : (
              <>
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#111111]/30">
                    {openProject.index}
                  </span>
                  <span className="font-mono text-xs tracking-widest uppercase text-[#555555]">
                    {openProject.category}
                  </span>
                </div>

                <h2 id="modal-title" className="font-display text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-4 text-[#111111]">
                  {openProject.title}
                </h2>

                <p className="text-[#555555] text-base leading-relaxed mb-8 max-w-2xl">
                  {openProject.description}
                </p>

                {/* 4-Quadrant Architecture Blueprint */}
                <div className="grid gap-6 sm:grid-cols-2 mb-8">
                  <div className="hairline p-5 rounded-sm bg-[#ffffff]">
                    <h4 className="font-mono text-xs tracking-widest uppercase text-[#555555] mb-2.5">
                      Operational Challenge
                    </h4>
                    <p className="text-[#111111] text-sm leading-relaxed">
                      {openProject.arch.challenge}
                    </p>
                  </div>

                  <div className="hairline p-5 rounded-sm bg-[#ffffff]">
                    <h4 className="font-mono text-xs tracking-widest uppercase text-[#555555] mb-2.5">
                      System Design Architecture
                    </h4>
                    <p className="text-[#111111] text-sm leading-relaxed">
                      {openProject.arch.systemDesign}
                    </p>
                  </div>

                  <div className="hairline p-5 rounded-sm bg-[#ffffff]">
                    <h4 className="font-mono text-xs tracking-widest uppercase text-[#555555] mb-2.5">
                      Key Engineering Decisions
                    </h4>
                    <ul className="list-disc list-inside text-[#111111] text-sm space-y-1.5 leading-relaxed">
                      {openProject.arch.keyDecisions.map((d, i) => (
                        <li key={i}>{d}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="hairline p-5 rounded-sm bg-[#ffffff]">
                    <h4 className="font-mono text-xs tracking-widest uppercase text-[#555555] mb-2.5">
                      Measurable Business Impact
                    </h4>
                    <ul className="list-disc list-inside text-[#111111] text-sm space-y-1.5 leading-relaxed">
                      {openProject.arch.impact.map((d, i) => (
                        <li key={i}>{d}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Walkthrough CTA Banner */}
                <div className="hairline p-6 rounded-sm bg-[#111111]/[0.02] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <h4 className="font-mono text-xs tracking-widest uppercase text-[#111111] mb-1 flex items-center gap-2">
                      <Activity className="w-4 h-4 text-[#111111]" />
                      <span>Interactive Animated Data Flow</span>
                    </h4>
                    <p className="text-[#555555] text-xs sm:text-sm">
                      Experience the multi-step node traversal and data pipeline visualizer.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setWalkthroughProject(openProject)}
                    className="font-mono text-xs tracking-widest uppercase bg-[#111111] text-[#f9f9f8] px-5 py-2.5 rounded-sm hover:bg-[#333333] transition-colors flex items-center gap-2 whitespace-nowrap"
                  >
                    <span>Launch Flow Visualizer</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  )
}
