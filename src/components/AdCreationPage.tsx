import { useEffect, useState } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import SharedNightSky from './SharedNightSky'
import ClosingCTA from './ClosingCTA'
import Hero from './Hero'

export default function AdCreationPage() {
  const [entranceComplete, setEntranceComplete] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => setEntranceComplete(true), 800)
    return () => clearTimeout(timeout)
  }, [])

  return (
    <>
      <Navbar entranceComplete={entranceComplete} />
      <Hero
        entranceComplete={entranceComplete}
        headlinePart1="Ads That"
        headlinePart2="Stop The Scroll"
        sublinePart1=""
        sublinePart2=""
        description="Cinematic brand films, native UGC cuts, and high-converting static image ads designed to scale your ROAS. We build creative that converts."
        bgText="PIVOTAL"
      />

      {/* Services Grid */}
      <div className="relative bg-black z-10 py-24 sm:py-32">
        {/* Subtle background glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(217,106,168,0.03),transparent_50%)] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            
            {/* Video Ads Card */}
            <div className="group relative p-8 sm:p-12 bg-white/[0.02] border border-white/10 rounded-[32px] hover:bg-white/[0.04] transition-all duration-500 overflow-hidden">
              {/* Hover glow */}
              <div className="absolute -inset-px bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[32px] pointer-events-none" />
              
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                    <i className="bi bi-camera-video text-white/80 text-xl" />
                  </div>
                  <div className="text-[11px] tracking-[0.2em] uppercase text-[#d96aa8] font-mono">01 / Video Production</div>
                </div>
                
                <h2 className="text-3xl sm:text-4xl font-normal tracking-tight mb-6 text-white group-hover:text-white/90 transition-colors">Cinematic & Native Video Ads</h2>
                <p className="text-white/50 text-sm sm:text-[15px] leading-relaxed mb-10 max-w-lg">
                  Most video ads look like ads, so they get skipped. We produce visually stunning brand films and platform-native cuts (TikTok, Reels, Shorts) that feel organic, capture attention in the first 3 seconds, and drive aggressive click-through rates.
                </p>
                
                <ul className="space-y-4 text-[13px] sm:text-sm text-white/70 font-mono">
                  <li className="flex items-center gap-4 p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.06] hover:border-white/10 transition-colors">
                    <span className="text-[#d96aa8] shrink-0">×</span> Short-Form Native Cuts
                  </li>
                  <li className="flex items-center gap-4 p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.06] hover:border-white/10 transition-colors">
                    <span className="text-[#d96aa8] shrink-0">×</span> Cinematic Brand Anthems
                  </li>
                  <li className="flex items-center gap-4 p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.06] hover:border-white/10 transition-colors">
                    <span className="text-[#d96aa8] shrink-0">×</span> UGC & Founder Stories
                  </li>
                  <li className="flex items-center gap-4 p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.06] hover:border-white/10 transition-colors">
                    <span className="text-[#d96aa8] shrink-0">×</span> Direct Response VSLs
                  </li>
                </ul>
              </div>
            </div>

            {/* Static Image Ads Card */}
            <div className="group relative p-8 sm:p-12 bg-white/[0.02] border border-white/10 rounded-[32px] hover:bg-white/[0.04] transition-all duration-500 overflow-hidden">
              {/* Hover glow */}
              <div className="absolute -inset-px bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[32px] pointer-events-none" />
              
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                    <i className="bi bi-image text-white/80 text-xl" />
                  </div>
                  <div className="text-[11px] tracking-[0.2em] uppercase text-[#d96aa8] font-mono">02 / Graphic Design</div>
                </div>
                
                <h2 className="text-3xl sm:text-4xl font-normal tracking-tight mb-6 text-white group-hover:text-white/90 transition-colors">High-Converting Static Images</h2>
                <p className="text-white/50 text-sm sm:text-[15px] leading-relaxed mb-10 max-w-lg">
                  Static isn't dead—it's highly profitable if done right. We design scroll-stopping statics, educational carousels, and meme-style ads that cut through the noise. Rapid iteration allows us to find winning angles faster and scale your ad spend profitably.
                </p>
                
                <ul className="space-y-4 text-[13px] sm:text-sm text-white/70 font-mono">
                  <li className="flex items-center gap-4 p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.06] hover:border-white/10 transition-colors">
                    <span className="text-[#d96aa8] shrink-0">×</span> E-commerce Product Statics
                  </li>
                  <li className="flex items-center gap-4 p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.06] hover:border-white/10 transition-colors">
                    <span className="text-[#d96aa8] shrink-0">×</span> Educational Carousels
                  </li>
                  <li className="flex items-center gap-4 p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.06] hover:border-white/10 transition-colors">
                    <span className="text-[#d96aa8] shrink-0">×</span> Native Meme Advertising
                  </li>
                  <li className="flex items-center gap-4 p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.06] hover:border-white/10 transition-colors">
                    <span className="text-[#d96aa8] shrink-0">×</span> High-CTR Thumbnail Design
                  </li>
                </ul>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Examples Gallery */}
      <div className="relative bg-black z-10 pb-24 sm:pb-32 border-t border-white/10 pt-24 sm:pt-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center mb-16 text-center">
            <h2 className="text-3xl sm:text-4xl font-normal tracking-tight mb-4">Recent Work</h2>
            <p className="text-white/60 text-sm sm:text-base max-w-2xl">
              A curated selection of cinematic brand films, high-converting UGC cuts, and premium static assets that we've produced for top brands.
            </p>
          </div>

          {/* Masonry Placeholder Grid */}
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            <div className="w-full bg-white/5 rounded-2xl aspect-[9/16] overflow-hidden relative group">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
                <span className="text-white/80 font-mono text-xs tracking-wider">01 / BRAND ANTHEM</span>
              </div>
            </div>
            <div className="w-full bg-white/5 rounded-2xl aspect-square overflow-hidden relative group">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
                <span className="text-white/80 font-mono text-xs tracking-wider">02 / STATIC ASSET</span>
              </div>
            </div>
            <div className="w-full bg-white/5 rounded-2xl aspect-[4/5] overflow-hidden relative group">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
                <span className="text-white/80 font-mono text-xs tracking-wider">03 / UGC CUT</span>
              </div>
            </div>
            <div className="w-full bg-white/5 rounded-2xl aspect-square overflow-hidden relative group">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
                <span className="text-white/80 font-mono text-xs tracking-wider">04 / PRODUCT SHOWCASE</span>
              </div>
            </div>
            <div className="w-full bg-white/5 rounded-2xl aspect-[9/16] overflow-hidden relative group">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
                <span className="text-white/80 font-mono text-xs tracking-wider">05 / TIKTOK NATIVE</span>
              </div>
            </div>
            <div className="w-full bg-white/5 rounded-2xl aspect-[4/5] overflow-hidden relative group">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
                <span className="text-white/80 font-mono text-xs tracking-wider">06 / LIFESTYLE</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative bg-black">
        <SharedNightSky />
        <ClosingCTA />
      </div>
      <Footer />
    </>
  )
}
