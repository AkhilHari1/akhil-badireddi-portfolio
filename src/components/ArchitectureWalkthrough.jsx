import { useEffect, useRef, useState, useCallback } from 'react'
import { gsap } from 'gsap'
import { Play, Pause, ChevronLeft, ChevronRight, Activity } from 'lucide-react'

const WALKTHROUGH_DATA = {
  '01': {
    title: 'Universal Excel-Style PCF Grid',
    subtitle: 'Data flow: User input → Dataverse Metadata API → Virtualized DOM → Local cache → Dynamic edit forms → Output',
    nodes: [
      { id: 'input', label: 'User Input', sub: '(Canvas App)', x: 110, y: 100, type: 'source' },
      { id: 'meta', label: 'Dataverse Metadata API', sub: 'schema discovery', x: 110, y: 270, type: 'process' },
      { id: 'virtual', label: 'Virtualized DOM', sub: '2,000+ row windowing', x: 300, y: 185, type: 'process' },
      { id: 'cache', label: 'Local Caching Layer', sub: 'debounced search', x: 300, y: 100, type: 'process' },
      { id: 'edit', label: 'Dynamic Edit Forms', sub: 'metadata-driven', x: 490, y: 270, type: 'process' },
      { id: 'output', label: 'Excel-Grade Output', sub: 'grid rendered', x: 490, y: 100, type: 'sink' },
    ],
    edges: [
      { from: 'input', to: 'meta', d: 'M110 125 Q110 200 110 245', pts: [[110, 125], [110, 190], [110, 245]] },
      { from: 'meta', to: 'virtual', d: 'M135 270 Q200 270 275 210', pts: [[135, 270], [200, 255], [275, 210]] },
      { from: 'virtual', to: 'cache', d: 'M300 155 Q300 130 300 110', pts: [[300, 155], [300, 135], [300, 110]] },
      { from: 'cache', to: 'output', d: 'M325 100 Q400 100 465 100', pts: [[325, 100], [400, 100], [465, 100]] },
      { from: 'virtual', to: 'edit', d: 'M325 210 Q400 210 465 240', pts: [[325, 210], [400, 225], [465, 240]] },
      { from: 'edit', to: 'output', d: 'M490 235 Q490 165 490 110', pts: [[490, 235], [490, 175], [490, 110]] },
    ],
    steps: [
      { title: '1 · User Input', body: 'The user interacts with the grid inside a Power Apps canvas app — filtering, searching, hiding columns.', active: ['input'], path: [] },
      { title: '2 · Schema Discovery', body: 'The PCF control queries the Dataverse Metadata API at runtime to adapt its columns to any entity schema.', active: ['meta'], path: ['input', 'meta'] },
      { title: '3 · Virtualized Rendering', body: '2,000+ rows are rendered through a virtualized DOM with windowing — only visible rows mount to the DOM.', active: ['virtual'], path: ['meta', 'virtual'] },
      { title: '4 · Local Caching', body: 'Debounced search hits a local caching layer first, minimizing expensive Web API calls.', active: ['cache'], path: ['virtual', 'cache'] },
      { title: '5 · Dynamic Edit Forms', body: 'Schema-driven edit forms render per column metadata — no hardcoded gallery patterns.', active: ['edit'], path: ['virtual', 'edit'] },
      { title: '6 · Grid Output', body: 'Excel-grade data handling delivered: ~85% less gallery rebuild effort, sub-100ms filter/search response.', active: ['output'], path: ['cache', 'output', 'edit'] },
    ],
  },
  '02': {
    title: 'Tax Compliance Platform',
    subtitle: 'Data flow: Taxpayer input → Power Automate (Correlation ID) → Dataverse → SQL Server → Power BI → Output',
    nodes: [
      { id: 'input', label: 'Taxpayer Input', sub: '50 standardized screens', x: 110, y: 100, type: 'source' },
      { id: 'flow', label: 'Power Automate', sub: 'correlation ID logging', x: 110, y: 270, type: 'process' },
      { id: 'dataverse', label: 'Dataverse', sub: 'central data platform', x: 300, y: 185, type: 'process' },
      { id: 'sql', label: 'SQL Server', sub: 'enterprise persistence', x: 300, y: 100, type: 'process' },
      { id: 'bi', label: 'Power BI', sub: 'compliance dashboards', x: 490, y: 270, type: 'process' },
      { id: 'output', label: 'Platform Output', sub: '500+ users, US & India', x: 490, y: 100, type: 'sink' },
    ],
    edges: [
      { from: 'input', to: 'flow', d: 'M110 125 Q110 200 110 245', pts: [[110, 125], [110, 190], [110, 245]] },
      { from: 'flow', to: 'dataverse', d: 'M135 270 Q200 270 275 210', pts: [[135, 270], [200, 255], [275, 210]] },
      { from: 'dataverse', to: 'sql', d: 'M300 155 Q300 130 300 110', pts: [[300, 155], [300, 135], [300, 110]] },
      { from: 'sql', to: 'bi', d: 'M325 100 Q400 100 465 100', pts: [[325, 100], [400, 100], [465, 100]] },
      { from: 'dataverse', to: 'bi', d: 'M325 210 Q400 210 465 240', pts: [[325, 210], [400, 225], [465, 240]] },
      { from: 'bi', to: 'output', d: 'M490 235 Q490 165 490 110', pts: [[490, 235], [490, 175], [490, 110]] },
    ],
    steps: [
      { title: '1 · Taxpayer Input', body: 'A taxpayer submits a compliance form across one of 50 standardized UI screens.', active: ['input'], path: [] },
      { title: '2 · Power Automate Flow', body: 'An asynchronous compliance workflow triggers, stamping every step with a Correlation ID for traceability.', active: ['flow'], path: ['input', 'flow'] },
      { title: '3 · Dataverse Ingest', body: 'Data lands in Dataverse on a standardized entity model with role-based security.', active: ['dataverse'], path: ['flow', 'dataverse'] },
      { title: '4 · SQL Persistence', body: 'Enterprise data is persisted to SQL Server for structured reporting and audit.', active: ['sql'], path: ['dataverse', 'sql'] },
      { title: '5 · Power BI Reporting', body: 'Compliance dashboards surface real-time status to stakeholders.', active: ['bi'], path: ['sql', 'bi'] },
      { title: '6 · Platform Output', body: 'Unified platform serving 500+ users across the US and India; ~60% faster incident resolution.', active: ['output'], path: ['bi', 'output'] },
    ],
  },
  '03': {
    title: 'Enterprise Telemetry Framework',
    subtitle: 'Data flow: Exception / flow failure → Unified JSON schema → Telemetry pipeline → Notification component → Output',
    nodes: [
      { id: 'input', label: 'Exception / Failure', sub: 'IfError · IsError · OnError', x: 110, y: 100, type: 'source' },
      { id: 'schema', label: 'Unified JSON Schema', sub: 'severity · context · screen · correlation ID', x: 110, y: 270, type: 'process' },
      { id: 'pipeline', label: 'Telemetry Pipeline', sub: 'Power Fx + Power Automate', x: 300, y: 185, type: 'process' },
      { id: 'webhook', label: 'Flow Webhook', sub: 'flow failures ingested', x: 300, y: 100, type: 'process' },
      { id: 'notify', label: 'Notification Component', sub: 'single reusable UI', x: 490, y: 270, type: 'process' },
      { id: 'output', label: 'Operations Output', sub: 'telemetry across 52 screens', x: 490, y: 100, type: 'sink' },
    ],
    edges: [
      { from: 'input', to: 'schema', d: 'M110 125 Q110 200 110 245', pts: [[110, 125], [110, 190], [110, 245]] },
      { from: 'schema', to: 'pipeline', d: 'M135 270 Q200 270 275 210', pts: [[135, 270], [200, 255], [275, 210]] },
      { from: 'pipeline', to: 'webhook', d: 'M300 155 Q300 130 300 110', pts: [[300, 155], [300, 135], [300, 110]] },
      { from: 'webhook', to: 'notify', d: 'M325 100 Q400 100 465 100', pts: [[325, 100], [400, 100], [465, 100]] },
      { from: 'pipeline', to: 'notify', d: 'M325 210 Q400 210 465 240', pts: [[325, 210], [400, 225], [465, 240]] },
      { from: 'notify', to: 'output', d: 'M490 235 Q490 165 490 110', pts: [[490, 235], [490, 175], [490, 110]] },
    ],
    steps: [
      { title: '1 · Exception Captured', body: 'An in-app exception (IfError / IsError / OnError) or a Power Automate flow failure occurs.', active: ['input'], path: [] },
      { title: '2 · Unified JSON Schema', body: 'Every error is captured into one JSON schema — severity, context, screen, user, correlation ID.', active: ['schema'], path: ['input', 'schema'] },
      { title: '3 · Telemetry Pipeline', body: 'The centralized pipeline funnels app errors and flow failures into a single stream.', active: ['pipeline'], path: ['schema', 'pipeline'] },
      { title: '4 · Flow Webhook', body: 'Power Automate webhook ingestion brings flow failures into the same telemetry stream.', active: ['webhook'], path: ['pipeline', 'webhook'] },
      { title: '5 · Notification UI', body: 'One reusable notification component renders the alert, authored once and consumed everywhere.', active: ['notify'], path: ['pipeline', 'notify'] },
      { title: '6 · Operations Output', body: 'Standardized user-facing errors and full app-health visibility across all 52 screens.', active: ['output'], path: ['notify', 'output'] },
    ],
  },
  '04': {
    title: 'Trackers & Alteryx Automation',
    subtitle: 'Data flow: Notice created → Dataverse / SharePoint → Alteryx ETL (25+ workflows) → Utilization trackers → Output',
    nodes: [
      { id: 'input', label: 'Notice Created', sub: 'model-driven app entry', x: 110, y: 100, type: 'source' },
      { id: 'store', label: 'Dataverse + SharePoint', sub: 'data + document storage', x: 110, y: 270, type: 'process' },
      { id: 'alteryx', label: 'Alteryx ETL', sub: '25+ automated workflows', x: 300, y: 185, type: 'process' },
      { id: 'sql', label: 'SQL Server', sub: 'source data extraction', x: 300, y: 100, type: 'process' },
      { id: 'tracker', label: 'Utilization Trackers', sub: 'automated dashboards', x: 490, y: 270, type: 'process' },
      { id: 'output', label: 'Operations Output', sub: '600+ hours saved annually', x: 490, y: 100, type: 'sink' },
    ],
    edges: [
      { from: 'input', to: 'store', d: 'M110 125 Q110 200 110 245', pts: [[110, 125], [110, 190], [110, 245]] },
      { from: 'store', to: 'alteryx', d: 'M135 270 Q200 270 275 210', pts: [[135, 270], [200, 255], [275, 210]] },
      { from: 'alteryx', to: 'sql', d: 'M300 155 Q300 130 300 110', pts: [[300, 155], [300, 135], [300, 110]] },
      { from: 'sql', to: 'tracker', d: 'M325 100 Q400 100 465 100', pts: [[325, 100], [400, 100], [465, 100]] },
      { from: 'alteryx', to: 'tracker', d: 'M325 210 Q400 210 465 240', pts: [[325, 210], [400, 225], [465, 240]] },
      { from: 'tracker', to: 'output', d: 'M490 235 Q490 165 490 110', pts: [[490, 235], [490, 175], [490, 110]] },
    ],
    steps: [
      { title: '1 · Notice Created', body: 'A notice is logged in the model-driven Power App built on Dataverse.', active: ['input'], path: [] },
      { title: '2 · Data & Document Store', body: 'Structured data goes to Dataverse; attachments land in SharePoint with version control.', active: ['store'], path: ['input', 'store'] },
      { title: '3 · Alteryx ETL Trigger', body: 'Scheduled nightly Alteryx Server execution kicks off 25+ ETL workflows.', active: ['alteryx'], path: ['store', 'alteryx'] },
      { title: '4 · SQL Extraction', body: 'Workflows extract and consolidate data from SQL Server and SharePoint automatically.', active: ['sql'], path: ['alteryx', 'sql'] },
      { title: '5 · Utilization Trackers', body: 'Trackers and dashboards refresh without manual Excel consolidation.', active: ['tracker'], path: ['alteryx', 'tracker'] },
      { title: '6 · Operations Output', body: 'Automated notice management saving 600+ hours annually across enterprise operations.', active: ['output'], path: ['tracker', 'output'] },
    ],
  },
  '05': {
    title: 'Local Dev Tooling',
    subtitle: 'Data flow: Experiment → Cross-platform layout → Performance profile → Optimize → Open-source output',
    nodes: [
      { id: 'input', label: 'Experiment', sub: 'open-source R&D', x: 110, y: 100, type: 'source' },
      { id: 'layout', label: 'Cross-Platform Layout', sub: 'React Native · Expo', x: 110, y: 270, type: 'process' },
      { id: 'profile', label: 'Performance Profile', sub: 'terminal utilities', x: 300, y: 185, type: 'process' },
      { id: 'cli', label: 'CLI Tooling', sub: 'TypeScript · VS Code', x: 300, y: 100, type: 'process' },
      { id: 'opt', label: 'Optimize', sub: 'hot-path refactor', x: 490, y: 270, type: 'process' },
      { id: 'output', label: 'Dev Tooling Output', sub: 'shipped to open source', x: 490, y: 100, type: 'sink' },
    ],
    edges: [
      { from: 'input', to: 'layout', d: 'M110 125 Q110 200 110 245', pts: [[110, 125], [110, 190], [110, 245]] },
      { from: 'layout', to: 'profile', d: 'M135 270 Q200 270 275 210', pts: [[135, 270], [200, 255], [275, 210]] },
      { from: 'profile', to: 'cli', d: 'M300 155 Q300 130 300 110', pts: [[300, 155], [300, 135], [300, 110]] },
      { from: 'cli', to: 'opt', d: 'M325 100 Q400 100 465 100', pts: [[325, 100], [400, 100], [465, 100]] },
      { from: 'profile', to: 'opt', d: 'M325 210 Q400 210 465 240', pts: [[325, 210], [400, 225], [465, 240]] },
      { from: 'opt', to: 'output', d: 'M490 235 Q490 165 490 110', pts: [[490, 235], [490, 175], [490, 110]] },
    ],
    steps: [
      { title: '1 · Experiment', body: 'Open-source experimentation kicks off a new cross-platform mobile layout.', active: ['input'], path: [] },
      { title: '2 · Cross-Platform Layout', body: 'Custom layouts are built with React Native, Expo, and TypeScript.', active: ['layout'], path: ['input', 'layout'] },
      { title: '3 · Performance Profile', body: 'Terminal utilities profile render and bundle performance to find hot paths.', active: ['profile'], path: ['layout', 'profile'] },
      { title: '4 · CLI Tooling', body: 'TypeScript CLI tooling automates the optimization workflow inside VS Code.', active: ['cli'], path: ['profile', 'cli'] },
      { title: '5 · Optimize', body: 'Hot paths are refactored for 60fps performance across devices.', active: ['opt'], path: ['cli', 'opt'] },
      { title: '6 · Dev Tooling Output', body: 'Optimized local dev tooling and cross-platform layouts shipped to open source.', active: ['output'], path: ['opt', 'output'] },
    ],
  },
}

const NODE_R = 26

export default function ArchitectureWalkthrough({ project, onClose }) {
  const data = WALKTHROUGH_DATA[project.id]
  if (!data) return null

  const svgRef = useRef(null)
  const [step, setStep] = useState(0)
  const [playing, setPlaying] = useState(false)
  const tlRef = useRef(null)
  const intervalRef = useRef(null)

  const goTo = useCallback((index) => {
    setStep(index)
  }, [])

  const next = () => goTo((s) => (s + 1) % data.steps.length)
  const prev = () => goTo((s) => (s - 1 + data.steps.length) % data.steps.length)

  const togglePlay = () => {
    setPlaying((p) => {
      if (!p) {
        intervalRef.current = setInterval(next, 3200)
      } else {
        clearInterval(intervalRef.current)
      }
      return !p
    })
  }

  useEffect(() => {
    return () => clearInterval(intervalRef.current)
  }, [])

  // Per-step GSAP animation: highlight nodes, draw edges, move packet
  useEffect(() => {
    const svg = svgRef.current
    if (!svg) return

    const tl = gsap.timeline()
    tlRef.current = tl

    const current = data.steps[step]
    const activeNodes = new Set(current.active)
    const pathEdges = new Set(current.path)

    const edges = Array.from(svg.querySelectorAll('.walk-edge'))
    const nodes = Array.from(svg.querySelectorAll('.walk-node'))
    const packet = svg.querySelector('.walk-packet')

    tl.set(nodes, { attr: { r: NODE_R }, fill: 'none', stroke: '#111111', strokeWidth: 1.5, opacity: 0.45 })
    tl.set(edges, {
      strokeDasharray: (el) => (el.getTotalLength ? el.getTotalLength() : 0),
      strokeDashoffset: (el) => (el.getTotalLength ? el.getTotalLength() : 0),
      opacity: 0.25,
    })
    tl.set(packet, { attr: { cx: 0, cy: 0 }, opacity: 0, scale: 0 }, 0)

    nodes.forEach((node) => {
      if (activeNodes.has(node.dataset.id)) {
        tl.to(
          node,
          {
            attr: { r: NODE_R + 6 },
            fill: '#111111',
            stroke: '#111111',
            strokeWidth: 2.5,
            opacity: 1,
            duration: 0.4,
            ease: 'power2.out',
          },
          0
        )
      }
    })

    edges.forEach((edge, i) => {
      if (pathEdges.has(edge.dataset.id)) {
        tl.to(
          edge,
          { strokeDashoffset: 0, stroke: '#111111', opacity: 1, duration: 0.5, ease: 'power2.out' },
          i * 0.18
        )
      }
    })

    if (current.path.length > 0 && packet) {
      const pts = []
      current.path.forEach((eid) => {
        const edge = data.edges.find((e) => `${e.from}-${e.to}` === eid)
        if (edge) pts.push(...edge.pts)
      })
      const clean = pts.filter((p, i) => i === 0 || p[0] !== pts[i - 1][0] || p[1] !== pts[i - 1][1])

      tl.to(packet, { attr: { cx: clean[0][0], cy: clean[0][1] }, opacity: 1, scale: 1, duration: 0.3 }, 0.6)
      clean.slice(1).forEach((p, i) => {
        tl.to(packet, { attr: { cx: p[0], cy: p[1] }, duration: 0.55, ease: 'power2.inOut' }, 0.9 + i * 0.6)
      })
    }

    return () => tl.kill()
  }, [step, data])

  return (
    <div className="relative flex flex-col h-full">
      <div className="flex items-center justify-between gap-4 pb-6 border-b border-[#111111]/10">
        <div>
          <div className="font-mono text-[10px] tracking-widest uppercase text-[#555555] mb-1">
            ANIMATED WALKTHROUGH
          </div>
          <div className="font-display text-xl md:text-2xl font-bold tracking-tight">{data.title}</div>
          <div className="font-mono text-xs text-[#555555] tracking-tight mt-1">{data.subtitle}</div>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs text-[#555555]">{step + 1}</span>
          <span className="font-mono text-xs text-[#111111]/30">/</span>
          <span className="font-mono text-xs text-[#111111]">{data.steps.length}</span>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center min-h-[360px]">
        <svg
          ref={svgRef}
          className="w-full max-w-[560px] h-[360px] overflow-visible drop-shadow-[0_20px_40px_rgba(17,17,17,0.06)]"
          viewBox="0 0 560 360"
          xmlns="http://www.w3.org/2000/svg"
        >
          {data.edges.map((edge, i) => (
            <path
              key={i}
              className="walk-edge"
              dataset-id={`${edge.from}-${edge.to}`}
              d={edge.d}
              fill="none"
              stroke="#111111"
              strokeWidth="1.6"
              opacity="0.25"
              strokeLinecap="round"
              style={{ vectorEffect: 'non-scaling-stroke' }}
            />
          ))}

          {data.nodes.map((node) => {
            const isSource = node.type === 'source'
            const isSink = node.type === 'sink'
            return (
              <g key={node.id} className="walk-node" dataset-id={node.id} style={{ cursor: 'default' }}>
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={NODE_R}
                  fill="none"
                  stroke="#111111"
                  strokeWidth={1.5}
                  opacity={0.45}
                  style={{ vectorEffect: 'non-scaling-stroke' }}
                />
                {isSource && (
                  <circle cx={node.x} cy={node.y} r={8} fill="#111111" opacity={0.5} style={{ vectorEffect: 'non-scaling-stroke' }} />
                )}
                {isSink && (
                  <rect x={node.x - 10} y={node.y - 10} width={20} height={20} fill="#111111" opacity={0.5} style={{ vectorEffect: 'non-scaling-stroke' }} />
                )}
                <text
                  x={node.x}
                  y={node.y - 10}
                  textAnchor="middle"
                  fontFamily="'JetBrains Mono', monospace"
                  fontSize="9"
                  fontWeight="700"
                  fill="#111111"
                  opacity={0.7}
                  style={{ vectorEffect: 'non-scaling-stroke' }}
                >
                  {node.label}
                </text>
                <text
                  x={node.x}
                  y={node.y + 7}
                  textAnchor="middle"
                  fontFamily="'JetBrains Mono', monospace"
                  fontSize="7.5"
                  fill="#555555"
                  style={{ vectorEffect: 'non-scaling-stroke' }}
                >
                  {node.sub}
                </text>
              </g>
            )
          })}

          <circle className="walk-packet" r={7} fill="#111111" style={{ vectorEffect: 'non-scaling-stroke' }} />
        </svg>
      </div>

      <div className="p-4 border-t border-[#111111]/10 bg-[#f9f9f8]/60 backdrop-blur">
        <div className="font-display text-lg font-bold tracking-tight mb-1">
          {data.steps[step].title}
        </div>
        <div className="font-mono text-sm text-[#555555] leading-relaxed">
          {data.steps[step].body}
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 p-4 border-t border-[#111111]/10">
        <button onClick={onClose} className="font-mono text-xs tracking-widest uppercase text-[#555555] hover:text-[#111111] transition-colors flex items-center gap-2">
          <ChevronLeft className="w-3 h-3" /> Back to Architecture
        </button>
        <div className="flex items-center gap-2">
          <button onClick={prev} className="w-8 h-8 hairline rounded-sm flex items-center justify-center text-[10px] hover:bg-[#111111] hover:text-[#f9f9f8] transition-colors">
            <ChevronLeft className="w-3 h-3" />
          </button>
          <button onClick={togglePlay} className="w-8 h-8 hairline rounded-sm flex items-center justify-center text-[10px] hover:bg-[#111111] hover:text-[#f9f9f8] transition-colors">
            {playing ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
          </button>
          <button onClick={next} className="w-8 h-8 hairline rounded-sm flex items-center justify-center text-[10px] hover:bg-[#111111] hover:text-[#f9f9f8] transition-colors">
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>
        <Activity className="w-3 h-3 text-[#111111]/20" />
      </div>
    </div>
  )
}

