import { useState, useEffect, useRef } from 'react'
import { Layout, ExternalLink } from 'lucide-react'
import { MagneticPill, ArchitecturalCursor } from './MotionPrimitives'

export default function Nav() {
  const [time, setTime] = useState('')

  useEffect(() => {
    const update = () => {
      const now = new Date()
      const hydTime = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }))
      setTime(hydTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }))
    }
    update()
    const interval = setInterval(update, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <ArchitecturalCursor />
      <nav className="fixed top-0 left-0 w-full z-40 px-6 py-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-default select-none" data-cursor="VIEW CASE">
            <div className="w-8 h-8 hairline rounded-sm flex items-center justify-center text-xs font-mono font-bold tracking-tighter bg-[#111111] text-[#f9f9f8]">
              ADB
            </div>
            <div className="text-left">
              <div className="font-display text-xl font-bold tracking-tight">AKHIL DEV BADIREDDI</div>
              <div className="font-mono text-xs text-[#555555] tracking-widest uppercase">ADB // 2026</div>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8 text-xs font-mono tracking-widest uppercase text-[#555555]">
            <a href="#index" className="hover:text-[#111111] transition-colors">INDEX</a>
            <a href="#works" className="hover:text-[#111111] transition-colors">WORK (05)</a>
            <a href="#capabilities" className="hover:text-[#111111] transition-colors">CAPABILITIES</a>
            <a href="#contact" className="hover:text-[#111111] transition-colors">CONTACT</a>
          </div>

          <div className="flex items-center gap-3 text-xs font-mono tracking-widest text-[#555555]">
            <div className="flex items-center gap-1">
              <span className="w-1 h-1 rounded-full bg-[#111111] animate-pulse"></span>
              HYD, IN
            </div>
            <div className="hairline px-3 py-1 rounded-sm bg-[#111111] text-[#f9f9f8] hover:bg-[#f9f9f8] hover:text-[#111111] transition-all group cursor-pointer" data-cursor="COPY TIME">
              {time}
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}