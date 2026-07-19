import { useEffect } from 'react'
import StarField from '../StarField'
import PivotalXLogo from '../PivotalXLogo'
import { navigate } from '../../lib/router'

interface LegalLayoutProps {
  title: string
  updated: string
  children: React.ReactNode
}

// Shared shell for the legal pages: fixed starfield + aura background with the
// document scrolling over it, a minimal header that returns home, and a
// readable prose column (styled via .legal-prose in index.css).
export default function LegalLayout({ title, updated, children }: LegalLayoutProps) {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const goHome = (e: React.MouseEvent) => {
    e.preventDefault()
    navigate('/')
  }

  return (
    <main className="relative min-h-screen bg-black">
      {/* Fixed aura background — stays put while the document scrolls */}
      <div className="fixed inset-0 pointer-events-none">
        <StarField seed={101} density={110} />
      </div>

      <div className="relative z-10">
        <header className="max-w-3xl mx-auto px-6 pt-10 sm:pt-12 flex items-center justify-between">
          <a
            href="/"
            onClick={goHome}
            className="flex items-center gap-2.5 group"
            aria-label="PivotalX home"
          >
            <PivotalXLogo size={18} className="text-white" />
            <span className="text-[16px] font-medium tracking-tight text-white">PivotalX</span>
          </a>
          <a
            href="/"
            onClick={goHome}
            className="text-white/50 hover:text-white text-[13px] tracking-wide transition-colors"
          >
            ← Back to site
          </a>
        </header>

        <article className="max-w-3xl mx-auto px-6 pt-16 sm:pt-20 pb-32">
          <p className="text-white/40 text-[12px] sm:text-[13px] tracking-[0.25em] uppercase mb-5">
            Legal
          </p>
          <h1 className="text-white font-normal text-[clamp(32px,6vw,52px)] leading-[1.05] tracking-[-0.02em]">
            {title}
          </h1>
          <p className="text-white/40 text-[13px] mt-5 tracking-wide">Last updated {updated}</p>

          <div className="legal-prose mt-14">{children}</div>
        </article>
      </div>
    </main>
  )
}
