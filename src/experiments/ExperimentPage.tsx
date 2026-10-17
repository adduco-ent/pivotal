import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView } from 'framer-motion'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import SharedNightSky from '../components/SharedNightSky'
import AutoVideo from '../components/AutoVideo'
import SectionFade from '../components/SectionFade'
import ScrambleIn from '../components/ScrambleIn'
import ScrambleLabel from '../components/ScrambleLabel'
import { useBooking } from '../lib/booking'
import LeakJourney from './journey/LeakJourney'
import YourNumber from './journey/YourNumber'

const HERO_VIDEO =
  'https://d8j0ntlcm91z4.cloudfront.net/user_3GBQGaD12kz0IEgO44KqK8F5cRh/hf_20260713_223732_a5b780e0-0e35-4cc4-916b-f06d32b2644e.mp4'

const MECHANISMS = [
  {
    n: '01',
    title: 'Offer & Bundle Architecture',
    desc: 'We re-architect what you sell. High-margin service bundles, new product tiers, and value-stacked continuity that explode Average Order Value and make cold traffic say yes.',
  },
  {
    n: '02',
    title: 'The Cinematic Conversion Shield',
    desc: 'Flagship brand lifts and sales pages engineered with high-ticket visual authority. Eliminates buyer skepticism before they ever reach the checkout.',
  },
  {
    n: '03',
    title: '$100M+ ARR Intelligence Engine',
    desc: 'Custom BI dashboards and bespoke CRM pipelines built to track true net margin. Backed by media buying partners who have scaled brands to nine figures in ARR.',
  },
]

export default function ExperimentPage() {
  const { open: openBooking } = useBooking()
  const [entranceComplete, setEntranceComplete] = useState(false)
  const [reachedPeak, setReachedPeak] = useState(false)
  const [photoOk, setPhotoOk] = useState(true)

  const heroRef = useRef<HTMLElement>(null)
  const closeRef = useRef<HTMLElement>(null)
  const heroInView = useInView(heroRef, { amount: 0.2 })
  const closeInView = useInView(closeRef, { amount: 0.25 })

  useEffect(() => {
    const t = setTimeout(() => setEntranceComplete(true), 600)
    return () => clearTimeout(t)
  }, [])

  // Floating CTA appears after peak tension ("Two bought")
  const pillVisible = reachedPeak && !heroInView && !closeInView

  return (
    <>
      <Navbar entranceComplete={entranceComplete} />

      {/* 1 · Hero: The Big Polarizing Idea */}
      <section ref={heroRef} className="relative h-screen h-[100dvh] overflow-hidden">
        <AutoVideo src={HERO_VIDEO} playbackRate={0.8} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/45 pointer-events-none" />
        <SectionFade position="top" height={220} />
        <SectionFade position="bottom" height={360} />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: entranceComplete ? 1 : 0 }}
          transition={{ duration: 1 }}
          className="relative z-20 flex flex-col h-full w-full max-w-[1440px] mx-auto px-6 sm:px-8 md:px-12 lg:px-16 pt-24 sm:pt-28 pb-12 sm:pb-16"
        >
          {/* Subtle Anton SC Watermark */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
            <span
              className="whitespace-nowrap text-[120px] sm:text-[clamp(140px,22vw,360px)]"
              style={{
                fontFamily: '"Anton SC", sans-serif',
                letterSpacing: '-0.02em',
                opacity: 0.04,
                background: 'radial-gradient(circle, rgba(217,106,168,0.5) 0%, rgba(255,255,255,0.05) 70%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
              }}
            >
              LEAK ×
            </span>
          </div>

          {/* Spacer anchors content to lower half of screen with generous navbar clearance */}
          <div className="flex-1" />

          {/* PivotalX Signature Dual-Column Call-and-Response Grid */}
          <div className="relative z-10 grid gap-0 sm:gap-6 md:grid-cols-[1fr_auto] md:items-end md:gap-10 lg:gap-16">
            {/* Left Headline */}
            <div className="order-1 md:col-start-1 md:row-start-1">
              <ScrambleLabel
                text="The Dirty Secret of Paid Traffic"
                className="text-white/40 text-[12px] sm:text-[13px] tracking-[0.25em] uppercase mb-4 sm:mb-6"
              />
              <h1 className="text-white font-normal leading-[0.95] tracking-[-0.03em] text-[clamp(32px,5.2vw,72px)]">
                <ScrambleIn text="98% of your" delay={200} triggered={entranceComplete} />
                <br />
                <ScrambleIn text="ad spend" delay={500} triggered={entranceComplete} />
              </h1>
            </div>

            {/* Right Headline (Right-aligned, bottom-aligned with left headline) */}
            <h1 className="order-2 md:col-start-2 md:row-start-1 md:row-span-2 md:self-end text-left md:text-right text-white font-normal leading-[0.95] tracking-[-0.03em] text-[clamp(32px,5.2vw,72px)]">
              <ScrambleIn text="walks out" delay={700} triggered={entranceComplete} />{' '}
              <br className="hidden md:block" />
              <ScrambleIn text="the back door" delay={1000} triggered={entranceComplete} />
              <span style={{ color: '#d96aa8' }}>.</span>
            </h1>

            {/* Left Hook Copy + Scroll cue */}
            <div className="order-3 md:col-start-1 md:row-start-2 mt-6 md:mt-4 max-w-lg">
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={entranceComplete ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.9, delay: 0.3 }}
                className="text-white/70 text-[14px] sm:text-[16px] leading-relaxed mb-6"
              >
                Meta and Google want you to believe you have a traffic problem. The truth? Pouring more ad spend into a leaking funnel is commercial suicide. Follow 100 paid buyers below.
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={entranceComplete ? { opacity: 1 } : {}}
                transition={{ duration: 1, delay: 1.2 }}
                className="inline-flex items-center gap-3 text-white/50 text-[11px] sm:text-[12px] tracking-[0.2em] uppercase font-mono"
              >
                <span className="relative block w-px h-7 bg-white/20 overflow-hidden">
                  <motion.span
                    className="absolute inset-x-0 top-0 h-2.5 bg-[#d96aa8]"
                    animate={{ y: [-10, 28] }}
                    transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                  />
                </span>
                <span>Scroll for the financial autopsy ↓</span>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* 2 · The 100-Visitor Cash Autopsy (Pure Black ground - zero distraction) */}
      <div className="relative bg-black">
        <LeakJourney onPhaseChange={(p) => p >= 4 && setReachedPeak(true)} />
      </div>

      {/* 3 · Cosmic Atmosphere fades in for Solution & Offer */}
      <div className="relative bg-black">
        <SharedNightSky />

        <div className="relative z-10">
          <YourNumber />
        </div>

        {/* 4 · The One Proprietary Weapon */}
        <section className="relative z-10 py-24 sm:py-32 px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.0 }}
            className="max-w-5xl mx-auto"
          >
            <div className="text-center mb-16 sm:mb-20">
              <ScrambleLabel
                text="The Proprietary System"
                className="text-white/40 text-[12px] sm:text-[13px] tracking-[0.25em] uppercase mb-6 sm:mb-8"
              />
              <h2 className="text-white font-normal text-[clamp(28px,5vw,52px)] leading-[1.12] tracking-[-0.02em]">
                The 3-Point Profit Multiplier.
              </h2>
              <p className="mt-4 text-white/55 text-[14px] sm:text-[16px] leading-relaxed max-w-xl mx-auto">
                We don’t tweak button colors or sell commoditized checklists. We engineer the complete backend architecture so every ad dollar yields maximum margin.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {MECHANISMS.map((m, i) => (
                <motion.div
                  key={m.n}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.7, delay: i * 0.1 }}
                  className="group relative p-7 sm:p-8 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between pb-4 border-b border-white/10 text-[11px] font-mono tracking-[0.2em] text-white/40 group-hover:text-white/60 transition-colors">
                      <span style={{ color: '#d96aa8' }}>{m.n}</span>
                      <span>LEVER</span>
                    </div>
                    <h3 className="mt-5 text-white font-normal text-[19px] sm:text-[21px] leading-snug tracking-[-0.01em]">
                      {m.title}
                    </h3>
                    <p className="mt-3 text-white/60 text-[13px] sm:text-[14px] leading-relaxed">
                      {m.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* 5 · The Godfather Offer: The 30-Minute Forensic Funnel Tear-Down */}
        <section ref={closeRef} className="relative z-10 pt-24 pb-32 sm:pt-32 sm:pb-40 px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.0 }}
            className="max-w-3xl mx-auto text-center"
          >
            <ScrambleLabel
              text="Strictly Limited · 4 Audits Per Week"
              className="text-white/40 text-[12px] sm:text-[13px] tracking-[0.25em] uppercase mb-6 sm:mb-8"
            />

            <h2 className="text-white font-normal text-[clamp(30px,5.5vw,54px)] leading-[1.12] tracking-[-0.02em]">
              Claim Your 30-Minute Forensic Funnel Tear-Down.
            </h2>

            <p className="mt-4 text-white/60 text-[15px] sm:text-[16px] leading-relaxed max-w-xl mx-auto">
              A 1-on-1 live screen-share audit inspecting your post-click drop-offs, checkout friction, and immediate profit levers.
            </p>

            {/* 3 Deliverables */}
            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
              <div className="p-5 rounded-xl bg-white/[0.02] border border-white/10">
                <span className="text-[#d96aa8] font-mono text-[11px] tracking-[0.2em] uppercase block mb-2">01 / AUDIT</span>
                <p className="text-white font-normal text-[15px] mb-1">Live Screen-Share</p>
                <p className="text-white/50 text-[12px] leading-relaxed">We inspect your exact drop-offs and bottlenecks in real time.</p>
              </div>
              <div className="p-5 rounded-xl bg-white/[0.02] border border-white/10">
                <span className="text-[#d96aa8] font-mono text-[11px] tracking-[0.2em] uppercase block mb-2">02 / DIAGNOSIS</span>
                <p className="text-white font-normal text-[15px] mb-1">3 Cash Bleed Points</p>
                <p className="text-white/50 text-[12px] leading-relaxed">Identify the exact friction points where 98% of traffic abandons.</p>
              </div>
              <div className="p-5 rounded-xl bg-white/[0.02] border border-white/10">
                <span className="text-[#d96aa8] font-mono text-[11px] tracking-[0.2em] uppercase block mb-2">03 / BLUEPRINT</span>
                <p className="text-white font-normal text-[15px] mb-1">14-Day Recovery Plan</p>
                <p className="text-white/50 text-[12px] leading-relaxed">Actionable offer & page fixes to lift conversions 25–50%.</p>
              </div>
            </div>

            {/* Founder Personal Guarantee Block */}
            <div className="mt-10 flex flex-col sm:flex-row items-center sm:items-start gap-6 p-6 sm:p-7 rounded-2xl bg-white/[0.02] border border-white/10 text-left">
              {photoOk ? (
                <img
                  src="/founder.jpg"
                  alt="Jarred Letofsky, founder of PivotalX"
                  width={80}
                  height={80}
                  loading="lazy"
                  onError={() => setPhotoOk(false)}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border border-white/15 shrink-0"
                />
              ) : (
                <div
                  aria-hidden="true"
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl border border-white/15 shrink-0 flex items-center justify-center text-white/60 text-[20px]"
                >
                  JL
                </div>
              )}
              <div className="flex-1 text-center sm:text-left">
                <p className="text-white/80 text-[14px] sm:text-[15px] leading-relaxed italic">
                  “I run every single teardown personally — no junior account reps. If I look under your hood and don’t find at least $50,000 in immediate recoverable revenue, I’ll tell you in the first 5 minutes.”
                </p>
                <div className="mt-3 flex items-center justify-center sm:justify-start gap-2 text-[13px]">
                  <span className="text-white font-medium">Jarred Letofsky</span>
                  <span className="text-white/40">· Founder, PivotalX</span>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="mt-10">
              <motion.button
                onClick={openBooking}
                whileHover={{ scale: 1.03, backgroundColor: '#e2e2e6' }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2.5 h-14 px-9 bg-white rounded-full text-black text-[16px] font-medium shadow-[0_10px_40px_rgba(255,255,255,0.15)]"
              >
                Claim Your Forensic Audit
                <span aria-hidden="true">→</span>
              </motion.button>
              <p className="text-white/40 text-[12px] sm:text-[13px] mt-4 tracking-wide font-mono">
                Complimentary for brands spending $10k+/mo on paid traffic. Zero sales pitch.
              </p>
            </div>
          </motion.div>
        </section>
      </div>

      <Footer />

      {/* Floating CTA Pill */}
      <AnimatePresence>
        {pillVisible && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.4, ease: [0.215, 0.61, 0.355, 1] }}
            className="fixed inset-x-0 bottom-5 z-50 flex justify-center pointer-events-none"
          >
            <button
              onClick={openBooking}
              className="pointer-events-auto inline-flex items-center gap-2.5 h-12 pl-5 pr-6 rounded-full bg-white text-black text-[15px] font-medium shadow-[0_10px_40px_rgba(0,0,0,0.6)]"
            >
              <span className="w-2 h-2 rounded-full" style={{ background: '#d96aa8' }} />
              Claim Your Audit
              <span aria-hidden="true">→</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
