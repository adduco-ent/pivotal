import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import ScrambleIn from './ScrambleIn'
import SectionFade from './SectionFade'

const HERO_VIDEO =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_083515_290e5a10-0b95-41af-a5e2-32b6389baa4d.mp4'

const SCRUB_SENSITIVITY = 0.8

interface HeroProps {
  entranceComplete: boolean
}

export default function Hero({ entranceComplete }: HeroProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const targetTimeRef = useRef(0)
  const seekingRef = useRef(false)
  const lastXRef = useRef<number | null>(null)
  const visibleRef = useRef(true)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    // Skip scrub work entirely while the hero is scrolled out of view —
    // seeking a full-HD video during scroll causes jank further down the page.
    const observer = new IntersectionObserver(([entry]) => {
      visibleRef.current = entry.isIntersecting
    })
    observer.observe(video)

    const requestSeek = () => {
      if (seekingRef.current || !video.duration) return
      if (Math.abs(video.currentTime - targetTimeRef.current) < 0.01) return
      seekingRef.current = true
      video.currentTime = targetTimeRef.current
    }

    const onSeeked = () => {
      seekingRef.current = false
      // Chain to the latest target if the mouse kept moving during the seek
      if (Math.abs(video.currentTime - targetTimeRef.current) >= 0.01) {
        requestSeek()
      }
    }

    const onMouseMove = (e: MouseEvent) => {
      if (!visibleRef.current) {
        lastXRef.current = e.clientX
        return
      }
      if (lastXRef.current === null) {
        lastXRef.current = e.clientX
        return
      }
      const dx = e.clientX - lastXRef.current
      lastXRef.current = e.clientX
      if (!video.duration) return
      const next =
        targetTimeRef.current + (dx / window.innerWidth) * video.duration * SCRUB_SENSITIVITY
      targetTimeRef.current = Math.min(Math.max(next, 0), video.duration - 0.05)
      requestSeek()
    }

    const onLoadedMetadata = () => {
      if (!window.matchMedia('(pointer: coarse)').matches) {
        video.pause()
        video.currentTime = 0
      }
    }

    video.addEventListener('loadedmetadata', onLoadedMetadata)
    video.addEventListener('seeked', onSeeked)
    window.addEventListener('mousemove', onMouseMove)

    return () => {
      observer.disconnect()
      video.removeEventListener('loadedmetadata', onLoadedMetadata)
      video.removeEventListener('seeked', onSeeked)
      window.removeEventListener('mousemove', onMouseMove)
    }
  }, [])

  return (
    <section className="relative h-screen h-[100dvh] overflow-hidden">
      <video
        ref={videoRef}
        src={HERO_VIDEO}
        muted
        playsInline
        autoPlay
        loop
        preload="auto"
        className="absolute inset-x-0 top-0 h-[56%] w-full object-cover object-[50%_25%] sm:inset-0 sm:h-full sm:object-center"
        style={{ transform: 'translateZ(0)' }}
      />

      {/* Mobile composition: the 16:9 clip becomes a framed portrait in the
          top half, dissolving to black so the type owns the lower half on a
          clean ground — instead of full-bleed fur behind everything. */}
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
        {/* Background watermark — centered behind the llama on desktop; on
            mobile it sits in the lower black zone behind the headlines so it
            reads as a deliberate layer instead of fragments behind fur. */}
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
            PIVOTAL
            <span
              style={{
                fontSize: '0.55em',
                lineHeight: 1,
                marginLeft: '0.12em',
                WebkitTextFillColor: '#d96aa8',
                textShadow: '0 0 60px rgba(255, 94, 196, 0.6)',
              }}
            >
              ×
            </span>
          </span>
        </div>

        <div className="flex-1" />

        {/* Grid + order keeps the desktop call-and-response (Brand left / Zero
            right, both bottom-aligned) while on mobile the two headlines stay
            adjacent — Brand left, Zero right — with the paragraph after them,
            instead of Zero being orphaned below the copy. */}
        {/* gap-0 on mobile so the three headline lines share one uniform
            rhythm — any gap between the two h1 blocks reads as inconsistent
            line spacing. */}
        <div className="grid gap-0 sm:gap-6 md:grid-cols-[1fr_auto] md:items-end md:gap-8">
          <h1 className="order-1 md:col-start-1 md:row-start-1 text-white font-normal leading-[0.95] tracking-[-0.03em] text-[clamp(34px,11.5vw,100px)]">
            <ScrambleIn text="Brand" delay={200} triggered={entranceComplete} />
            <br />
            <ScrambleIn text="And Audience" delay={500} triggered={entranceComplete} />
          </h1>

          {/* Mobile: one left-aligned line continuing the headline stack.
              Desktop: two-line right-aligned response in its own column. */}
          <h1 className="order-2 md:col-start-2 md:row-start-1 md:row-span-2 md:self-end text-left md:text-right text-white font-normal leading-[0.95] tracking-[-0.03em] text-[clamp(34px,11.5vw,100px)]">
            <ScrambleIn text="Zero" delay={700} triggered={entranceComplete} />{' '}
            <br className="hidden md:block" />
            <ScrambleIn text="Leaks" delay={1000} triggered={entranceComplete} />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={entranceComplete ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.215, 0.61, 0.355, 1.0], delay: 0.2 }}
            className="order-3 md:col-start-1 md:row-start-2 mt-6 md:mt-0 max-w-sm text-[13px] sm:text-[15px] text-white/60 leading-relaxed"
          >
            We map your entire funnel, find where revenue leaks out, and build the plan to plug
            it — more conversions and higher margins, without spending another dollar on ads.
          </motion.p>
        </div>
      </motion.div>
    </section>
  )
}
