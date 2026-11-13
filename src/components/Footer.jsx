import { useState } from 'react'
import { ExternalLink } from 'lucide-react'
import { MagneticPill } from './MotionPrimitives'

export default function Footer() {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText('akhilbadireddi@gmail.com')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <footer id="contact" className="relative z-10 pt-32 pb-24 px-6 md:pt-40 md:pb-32 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="font-display text-5xl md:text-6xl font-bold tracking-tight mb-6">
            Let's architect scalable enterprise software.
          </div>
          <div className="font-mono text-xs tracking-widest uppercase text-[#555555]">
            Power Apps Developer · Enterprise Low-Code & PCF Architecture
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-2 items-start">
          <div>
            <div className="font-mono text-xs tracking-widest uppercase text-[#555555] mb-4">Location</div>
            <div className="text-sm font-medium mb-6">Hyderabad, Telangana, India</div>

            <div className="font-mono text-xs tracking-widest uppercase text-[#555555] mb-4">Email</div>
            <button onClick={handleCopy} className="flex items-center gap-2 font-mono text-xs tracking-widest uppercase text-[#111111] hover:text-[#555555] transition-colors">
              {copied ? 'Copied' : 'akhilbadireddi@gmail.com'}
              <span className="w-3 h-3 border border-current rounded-full"></span>
            </button>

            <div className="mt-8 font-mono text-xs tracking-widest uppercase text-[#555555] mb-4">Social</div>
            <div className="flex gap-4">
              <a href="https://www.linkedin.com/in/akhil-badireddi-a9a756269" target="_blank" rel="noopener noreferrer" className="text-[#555555] hover:text-[#111111] transition-colors flex items-center gap-1">
                LinkedIn <ExternalLink className="w-3 h-3" />
              </a>
              <a href="https://github.com/AkhilHari1" target="_blank" rel="noopener noreferrer" className="text-[#555555] hover:text-[#111111] transition-colors flex items-center gap-1">
                GitHub <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          <div className="text-right">
            <MagneticPill href="mailto:akhilbadireddi@gmail.com" className="bg-[#111111] text-[#f9f9f8] font-mono text-xs tracking-widest uppercase py-4 px-10 rounded-sm">
              Contact Direct
            </MagneticPill>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-[#111111]/20 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="font-mono text-[10px] tracking-widest uppercase text-[#555555]">
            Akhil Dev Badireddi · 2026
          </div>
          <div className="font-mono text-[10px] tracking-widest uppercase text-[#555555]">
            Built with React · Vite · GSAP · Lenis · Vanta · Tailwind CSS
          </div>
        </div>
      </div>
    </footer>
  )
}