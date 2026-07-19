import PivotalXLogo from './PivotalXLogo'
import AutoVideo from './AutoVideo'
import SectionFade from './SectionFade'
import { navigate } from '../lib/router'
import { useBooking } from '../lib/booking'

const VIDEO =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_080203_fd7f4f85-3a86-4837-8192-85e7bfe68e75.mp4'

export default function Footer() {
  const { open: openBooking } = useBooking()
  return (
    <footer className="bg-black overflow-hidden">
      <div className="flex flex-col md:flex-row min-h-[400px]">
        <div className="relative w-full md:w-1/2 h-[300px] md:h-auto">
          <AutoVideo src={VIDEO} className="w-full h-full object-cover" />
          <SectionFade position="top" height={120} />
        </div>

        <div className="w-full md:w-1/2 flex flex-col justify-between p-10 sm:p-16">
          <div>
            <div className="flex items-center gap-2.5 mb-8">
              <PivotalXLogo size={18} className="text-white/70" />
              <span className="text-[15px] font-medium text-white/70 tracking-tight">
                PivotalX
              </span>
            </div>
            <p className="text-white/40 text-[14px] sm:text-[15px] leading-relaxed max-w-sm">
              We find the leaks in your funnel and seal them — more conversions, higher
              margins, without spending more on ads.
            </p>
            <button
              onClick={openBooking}
              className="inline-flex items-center gap-2 mt-8 text-white/70 hover:text-white text-[14px] tracking-wide transition-colors"
            >
              Book a strategy call <span aria-hidden="true">→</span>
            </button>
          </div>

          <div className="mt-12 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
            <p className="text-white/25 text-[12px]">
              © 2026 Pivotal Times LLC. All rights reserved.
            </p>
            <nav className="flex items-center gap-5 text-[12px]">
              <a
                href="/terms"
                onClick={(e) => {
                  e.preventDefault()
                  navigate('/terms')
                }}
                className="text-white/40 hover:text-white/80 transition-colors"
              >
                Terms
              </a>
              <a
                href="/privacy"
                onClick={(e) => {
                  e.preventDefault()
                  navigate('/privacy')
                }}
                className="text-white/40 hover:text-white/80 transition-colors"
              >
                Privacy
              </a>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  )
}
