import { useEffect, useState } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import SharedNightSky from './SharedNightSky'
import ClosingCTA from './ClosingCTA'
import SectionFade from './SectionFade'
import ScrambleIn from './ScrambleIn'
import { motion } from 'framer-motion'

const AD_VIDEO =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_083515_290e5a10-0b95-41af-a5e2-32b6389baa4d.mp4'

export default function AdCreationPage() {
  const [entranceComplete, setEntranceComplete] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => setEntranceComplete(true), 800)
    return () => clearTimeout(timeout)
  }, [])

  return (
    <>
      <Navbar entranceComplete={entranceComplete} />
      
      {/* Ad Creation Hero */}
      <section className="relative h-screen h-[100dvh] overflow-hidden">
        {/* Mobile static image */}
        <img
          src="/hero-llama.jpg"
          alt="PivotalX Ads"
          className="absolute inset-x-0 top-0 h-[56%] w-full object-cover object-[50%_25%] sm:hidden pointer-events-none"
        />

        {/* Desktop looping video */}
        <video
          src={AD_VIDEO}
          muted
          playsInline
          autoPlay
          loop
          preload="auto"
          className="hidden sm:block absolute inset-0 h-full w-full object-cover object-center pointer-events-none"
          style={{ transform: 'translateZ(0)' }}
        />

        <div
          className="absolute inset-x-0 sm:hidden pointer-events-none"
          style={{
            top: 'calc(56% - 150px)',
            height: 150,
            background: 'linear-gradient(to bottom, transparent, #000)',
          }}
        />

        <SectionFade position="bottom" height={320} />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: entranceComplete ? 1 : 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 flex flex-col h-full px-4 sm:px-6 md:px-8 pt-20 sm:pt-24 pb-10 sm:pb-16"
        >
          <div className="absolute inset-0 flex items-end pb-40 sm:pb-0 sm:items-center justify-center pointer-events-none select-none translate-y-0 sm:translate-y-[50px]">
            <span
              className="whitespace-nowrap flex items-center text-[86px] sm:text-[clamp(124px,24vw,460px)]"
              style={{
                fontFamily: '"Anton SC", sans-serif',
                letterSpacing: '-0.015em',
                opacity: 0.12,
                background: 'radial-gradient(circle, rgba(142,127,148,0) 0%, #8E7F94 70%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
              }}
            >
              CREATIVE
            </span>
          </div>

          <div className="flex-1" />

          <div className="grid gap-0 sm:gap-6 md:grid-cols-[1fr_auto] md:items-end md:gap-8">
            <h1 className="order-1 md:col-start-1 md:row-start-1 text-white font-normal leading-[0.95] tracking-[-0.03em] text-[clamp(34px,11.5vw,100px)]">
              <ScrambleIn text="Ads That" delay={200} triggered={entranceComplete} />
              <br />
              <ScrambleIn text="Stop The Scroll" delay={500} triggered={entranceComplete} />
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 25 }}
              animate={entranceComplete ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, ease: [0.215, 0.61, 0.355, 1.0], delay: 0.2 }}
              className="order-3 md:col-start-1 md:row-start-2 mt-6 md:mt-0 max-w-sm text-[13px] sm:text-[15px] text-white/60 leading-relaxed"
            >
              Cinematic brand films, native UGC cuts, and high-converting static image ads designed to scale your ROAS. We build creative that converts.
            </motion.p>
          </div>
        </motion.div>
      </section>

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

      <div className="relative bg-black">
        <SharedNightSky />
        <ClosingCTA />
      </div>
      <Footer />
    </>
  )
}
