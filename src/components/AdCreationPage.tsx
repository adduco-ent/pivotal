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
        bgText="CREATIVE"
      />

      {/* Services Grid */}
      <div className="relative bg-black z-10 py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24">
            
            {/* Video Ads */}
            <div>
              <div className="text-[10px] tracking-[0.2em] uppercase text-white/40 mb-4 font-mono">01 / Video Production</div>
              <h2 className="text-3xl sm:text-4xl font-normal tracking-tight mb-6">Cinematic & Native Video Ads</h2>
              <p className="text-white/60 text-sm sm:text-base leading-relaxed mb-8">
                Most video ads look like ads, so they get skipped. We produce visually stunning brand films and platform-native cuts (TikTok, Reels, Shorts) that feel organic, capture attention in the first 3 seconds, and drive aggressive click-through rates.
              </p>
              <ul className="space-y-3 text-sm text-white/70 font-mono">
                <li className="flex items-center gap-3"><span className="text-[#d96aa8]">×</span> Short-Form Native Cuts</li>
                <li className="flex items-center gap-3"><span className="text-[#d96aa8]">×</span> Cinematic Brand Anthems</li>
                <li className="flex items-center gap-3"><span className="text-[#d96aa8]">×</span> UGC & Founder Stories</li>
                <li className="flex items-center gap-3"><span className="text-[#d96aa8]">×</span> Direct Response VSLs</li>
              </ul>
            </div>

            {/* Static Image Ads */}
            <div>
              <div className="text-[10px] tracking-[0.2em] uppercase text-white/40 mb-4 font-mono">02 / Graphic Design</div>
              <h2 className="text-3xl sm:text-4xl font-normal tracking-tight mb-6">High-Converting Static Images</h2>
              <p className="text-white/60 text-sm sm:text-base leading-relaxed mb-8">
                Static isn't dead—it's highly profitable if done right. We design scroll-stopping statics, educational carousels, and meme-style ads that cut through the noise. Rapid iteration allows us to find winning angles faster and scale your ad spend profitably.
              </p>
              <ul className="space-y-3 text-sm text-white/70 font-mono">
                <li className="flex items-center gap-3"><span className="text-[#d96aa8]">×</span> E-commerce Product Statics</li>
                <li className="flex items-center gap-3"><span className="text-[#d96aa8]">×</span> Educational Carousels</li>
                <li className="flex items-center gap-3"><span className="text-[#d96aa8]">×</span> Native Meme Advertising</li>
                <li className="flex items-center gap-3"><span className="text-[#d96aa8]">×</span> High-CTR Thumbnail Design</li>
              </ul>
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
