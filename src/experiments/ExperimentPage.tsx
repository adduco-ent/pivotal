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
          className="relative z-20 h-full w-full max-w-6xl mx-auto px-6 sm:px-8 flex flex-col justify-end pb-20 sm:pb-24"
        >
          <p className="text-white/60 text-[12px] sm:text-[13px] tracking-[0.25em] uppercase mb-6">
            The Dirty Secret of Paid Traffic<span style={{ color: '#d96aa8' }}>.</span>
          </p>
          <h1 className="text-white font-normal leading-[0.98] tracking-[-0.03em] text-[clamp(40px,8vw,104px)]">
            <ScrambleIn text="Why 98% of your ad spend" delay={200} triggered={entranceComplete} />
            <br />
            <ScrambleIn text="walks out the back door" delay={550} triggered={entranceComplete} />
            <span style={{ color: '#d96aa8' }}>.</span>
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={entranceComplete ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.5 }}
            className="mt-7 max-w-xl text-white/75 text-[16px] sm:text-[18px] leading-relaxed"
          >
            Meta and Google want you to believe you have a traffic problem. The truth? Pouring more ad spend into a leaking funnel is commercial suicide. Follow 100 paid buyers below.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={entranceComplete ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 1.4 }}
            className="mt-12 flex items-center gap-3 text-white/55 text-[12px] tracking-[0.2em] uppercase"
          >
            <span className="relative block w-px h-10 bg-white/20 overflow-hidden">
              <motion.span
                className="absolute inset-x-0 top-0 h-4 bg-white"
                animate={{ y: [-16, 40] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
              />
            </span>
            Scroll for the financial autopsy
          </motion.div>
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

        {/* 4 · The One Proprietary Weapon (Not a Service Menu) */}
        <section className="relative z-10 py-24 sm:py-32 px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.0 }}
            className="max-w-4xl mx-auto"
          >
            <div className="text-center mb-16 sm:mb-20">
              <ScrambleLabel
                text="The Proprietary System"
                className="text-white/55 text-[12px] sm:text-[13px] tracking-[0.25em] uppercase mb-6"
              />
              <h2 className="text-white font-normal text-[clamp(28px,5vw,52px)] leading-[1.12] tracking-[-0.02em]">
                The 3-Point Profit Multiplier.
              </h2>
              <p className="mt-5 text-white/60 text-[15px] sm:text-[17px] leading-relaxed max-w-xl mx-auto">
                We don’t tweak button colors or sell commoditized checklists. We engineer the complete backend architecture so every dollar spent on ads yields maximum profit.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10">
              {MECHANISMS.map((m, i) => (
                <motion.div
                  key={m.n}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.8, delay: i * 0.12 }}
                  className="p-8 rounded-3xl bg-white/[0.02] border border-white/10 hover:border-white/20 transition-all backdrop-blur-sm"
                >
                  <div className="text-[13px] font-mono tracking-[0.2em]" style={{ color: '#d96aa8' }}>
                    {m.n}
                  </div>
                  <h3 className="mt-4 text-white font-normal text-[20px] sm:text-[22px] tracking-[-0.01em]">
                    {m.title}
                  </h3>
                  <p className="mt-3 text-white/60 text-[14px] leading-relaxed">
                    {m.desc}
                  </p>
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
            className="max-w-2xl mx-auto text-center"
          >
            {photoOk ? (
              <img
                src="/founder.jpg"
                alt="Jarred Letofsky, founder of PivotalX"
                width={112}
                height={112}
                loading="lazy"
                onError={() => setPhotoOk(false)}
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border border-white/15 mx-auto mb-8"
              />
            ) : (
              <div
                aria-hidden="true"
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border border-white/15 mx-auto mb-8 flex items-center justify-center text-white/60 text-[24px]"
              >
                JL
              </div>
            )}

            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/10 text-xs font-mono text-white/80 mb-6">
              <span className="w-2 h-2 rounded-full bg-[#d96aa8] animate-pulse" />
              STRICTLY LIMITED · 4 AUDITS PER WEEK
            </div>

            <h2 className="text-white font-normal text-[clamp(30px,6vw,56px)] leading-[1.12] tracking-[-0.02em]">
              Claim Your 30-Minute Forensic Funnel Tear-Down.
            </h2>

            <div className="mt-8 text-left max-w-lg mx-auto space-y-4 text-[14px] sm:text-[15px] text-white/75 bg-white/[0.02] border border-white/10 p-6 rounded-2xl backdrop-blur-sm">
              <div className="flex items-start gap-3">
                <span className="text-[#d96aa8] font-bold text-base">✓</span>
                <span><strong>Live Screen-Share Audit:</strong> We inspect your exact post-click drop-offs and checkout bottlenecks in real time.</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[#d96aa8] font-bold text-base">✓</span>
                <span><strong>The 3 Cash Bleed Points:</strong> Uncover the specific friction points where 98% of your paid traffic abandons ship.</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[#d96aa8] font-bold text-base">✓</span>
                <span><strong>Custom 14-Day Recovery Plan:</strong> The exact offer and layout fixes to lift conversion by 25–50% on current ad spend.</span>
              </div>
            </div>

            <p className="mt-8 text-white/70 text-[15px] sm:text-[16px] leading-relaxed max-w-lg mx-auto italic">
              “I run every single teardown personally. No junior account reps. If I look under your hood and don’t see at least $50,000 in immediate recoverable revenue, I’ll tell you in the first 5 minutes.”
            </p>

            <p className="mt-4 text-[14px] tracking-wide">
              <span className="text-white/90">Jarred Letofsky</span>
              <span className="text-white/55"> · Founder, PivotalX</span>
            </p>

            <div className="mt-10">
              <motion.button
                onClick={openBooking}
                whileHover={{ scale: 1.03, backgroundColor: '#e2e2e6' }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2.5 h-14 px-9 bg-white rounded-full text-black text-[16px] font-medium shadow-2xl"
              >
                Claim Your Forensic Audit
                <span aria-hidden="true">→</span>
              </motion.button>
              <p className="text-white/45 text-[12px] sm:text-[13px] mt-4 tracking-wide">
                Complimentary for brands doing $25k+/month. Zero sales pitch.
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
