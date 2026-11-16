import { useState } from 'react'
import { ExternalLink, Copy, Check, ArrowUpRight } from 'lucide-react'
import { MagneticPill } from './MotionPrimitives'

export default function Footer() {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText('akhilbadireddi@gmail.com')
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  return (
    <footer
      id="contact"
      aria-label="Contact and Technical Colophon"
      className="relative z-10 pt-28 pb-20 px-4 sm:px-6 md:pt-40 md:pb-28 border-t border-[#111111]/15 bg-[#f9f9f8]/95 backdrop-blur-sm"
    >
      <div className="max-w-7xl mx-auto">
        {/* Call to action headline */}
        <div className="mb-16 sm:mb-24">
          <div className="font-mono text-xs tracking-widest uppercase text-[#555555] mb-4">
            INITIATE COLLABORATION
          </div>
          <h2 className="font-display text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight text-[#111111] mb-6 max-w-4xl">
            Let's architect resilient enterprise systems.
          </h2>
          <p className="font-mono text-xs sm:text-sm tracking-wider uppercase text-[#555555]">
            Power Apps Developer · Enterprise Low-Code &amp; PCF Component Architecture
          </p>
        </div>

        {/* Action Grid */}
        <div className="grid gap-12 lg:grid-cols-2 items-start pt-10 border-t border-[#111111]/10">
          {/* Direct channels */}
          <div className="space-y-8">
            <div>
              <div className="font-mono text-xs tracking-widest uppercase text-[#666666] mb-2">
                LOCATION / TIMEZONE
              </div>
              <div className="text-base sm:text-lg font-medium text-[#111111]">
                Hyderabad, Telangana, India (UTC +05:30)
              </div>
            </div>

            <div>
              <div className="font-mono text-xs tracking-widest uppercase text-[#666666] mb-2">
                DIRECT INBOX
              </div>
              <div className="flex items-center gap-3">
                <a
                  href="mailto:akhilbadireddi@gmail.com"
                  data-cursor="MAIL"
                  className="text-base sm:text-xl font-medium text-[#111111] hover:underline"
                >
                  akhilbadireddi@gmail.com
                </a>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="hairline p-2 rounded-sm text-[#111111] hover:bg-[#111111] hover:text-[#f9f9f8] transition-colors focus-visible:outline-none"
                  aria-label="Copy email address to clipboard"
                  title="Copy email address"
                  data-cursor="COPY"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                </button>
                {copied && (
                  <span className="font-mono text-xs text-emerald-600 animate-fadeIn" role="status">
                    Copied to clipboard
                  </span>
                )}
              </div>
            </div>

            <div>
              <div className="font-mono text-xs tracking-widest uppercase text-[#666666] mb-3">
                PROFESSIONAL PROFILES
              </div>
              <div className="flex flex-wrap gap-4">
                <a
                  href="https://www.linkedin.com/in/akhil-badireddi-a9a756269"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="LINKEDIN"
                  className="hairline px-4 py-2 rounded-sm text-xs font-mono tracking-wider uppercase text-[#111111] hover:bg-[#111111] hover:text-[#f9f9f8] transition-colors inline-flex items-center gap-1.5"
                >
                  <span>LinkedIn</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <a
                  href="https://github.com/AkhilHari1"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="GITHUB"
                  className="hairline px-4 py-2 rounded-sm text-xs font-mono tracking-wider uppercase text-[#111111] hover:bg-[#111111] hover:text-[#f9f9f8] transition-colors inline-flex items-center gap-1.5"
                >
                  <span>GitHub</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Interactive CTA Card */}
          <div className="hairline p-8 sm:p-10 rounded-sm bg-[#ffffff] shadow-sm flex flex-col justify-between">
            <div className="mb-8">
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#555555] bg-[#111111]/5 px-2.5 py-1 rounded-sm">
                AVAILABILITY // OPEN TO ROLES
              </span>
              <h3 className="font-display text-2xl font-bold tracking-tight text-[#111111] mt-4 mb-2">
                Enterprise Low-Code Engineering
              </h3>
              <p className="text-[#555555] text-sm leading-relaxed">
                Available for high-impact Power Apps architecture, PCF custom control development, and enterprise process automation initiatives.
              </p>
            </div>

            <div>
              <MagneticPill
                href="mailto:akhilbadireddi@gmail.com"
                data-cursor="CONNECT"
                className="w-full text-center bg-[#111111] text-[#f9f9f8] font-mono text-xs sm:text-sm tracking-widest uppercase py-4 px-8 rounded-sm hover:bg-[#333333] transition-colors flex items-center justify-center gap-2"
              >
                <span>Initiate Contact</span>
                <ArrowUpRight className="w-4 h-4" />
              </MagneticPill>
            </div>
          </div>
        </div>

        {/* Technical Colophon & Attribution */}
        <div className="mt-20 pt-8 border-t border-[#111111]/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-[#666666] font-mono text-[11px] tracking-wider uppercase">
          <div>
            © 2026 AKHIL DEV BADIREDDI · ALL RIGHTS RESERVED
          </div>
          <div>
            BUILT WITH REACT · THREE.JS · GSAP · LENIS · TAILWIND CSS
          </div>
        </div>
      </div>
    </footer>
  )
}
