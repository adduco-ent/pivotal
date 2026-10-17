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

const PILLARS = [
  {
    tag: '01 / Offer Engineering',
    title: 'New Products & Service Bundles',
    desc: 'The fastest path to higher conversion isn’t changing button colors—it’s restructuring what you sell. We engineer high-converting product tiers, high-margin service bundles, and one-click AOV expansion mechanics.',
    bullets: 'High-AOV Bundles · Value Stacking · Continuity Offers',
  },
  {
    tag: '02 / Brand Lift & Sales Pages',
    title: 'Flagship Sites & Cinematic CRO',
    desc: 'Premium pricing demands premium perception. We redesign web experiences and high-impact sales pages with cinematic visual authority, turning cold paid clicks into loyal, high-margin buyers.',
    bullets: 'Cinematic Web Design · Sales Page CRO · Instant Authority',
  },
  {
    tag: '03 / Advanced Systems',
    title: 'Custom Dashboards & Bespoke CRMs',
    desc: 'You can’t scale what you can’t see. We build custom executive business intelligence dashboards and tailored CRM pipelines that track real net margins, cohort LTV, and customer drop-offs in real time.',
    bullets: 'Real-Time Margins · Cohort LTV Tracking · Custom Pipelines',
  },
  {
    tag: '04 / Elite Paid Media Network',
    title: '$100M+ ARR Ad Partner Synergy',
    desc: 'Backed by elite media buying partners who have scaled brands to over $100M in ARR. We engineer the conversion architecture and post-click backend so aggressive ad spend scales profitably.',
    bullets: 'Media Buyer Alignment · High-ROAS Backend · Scale-Ready',
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

  const pillVisible = reachedPeak && !heroInView && !closeInView

  return (
    <>
      <Navbar entranceComplete={entranceComplete} />

      {/* 1 · Hero */}
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
            PivotalX Growth Architecture<span style={{ color: '#d96aa8' }}>.</span>
          </p>
          <h1 className="text-white font-normal leading-[0.98] tracking-[-0.03em] text-[clamp(40px,8.5vw,108px)]">
            <ScrambleIn text="You paid for" delay={200} triggered={entranceComplete} />
            <br />
            <ScrambleIn text="every one of them" delay={550} triggered={entranceComplete} />
            <span style={{ color: '#d96aa8' }}>.</span>
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={entranceComplete ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.5 }}
            className="mt-7 max-w-md text-white/75 text-[16px] sm:text-[18px] leading-relaxed"
          >
            Follow 100 paid visitors through your site, and see where revenue quietly leaks out.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={entranceComplete ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 1.4 }}
            className="mt-12 flex items-center gap-3 text-white/60 text-[12px] tracking-[0.2em] uppercase"
          >
            <span className="relative block w-px h-10 bg-white/20 overflow-hidden">
              <motion.span
                className="absolute inset-x-0 top-0 h-4 bg-white"
                animate={{ y: [-16, 40] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
              />
            </span>
            Scroll to follow them
          </motion.div>
        </motion.div>
      </section>

      {/* Shared Night Sky Wrapper for all sections below the fold */}
      <div className="relative bg-black">
        <SharedNightSky />

        {/* 2 · The 100-Visitor Journey */}
        <div className="relative z-10">
          <LeakJourney onPhaseChange={(p) => p >= 4 && setReachedPeak(true)} />
        </div>

        {/* 3 · Full Enterprise Capability Matrix */}
        <section className="relative z-10 py-28 sm:py-36 px-6 max-w-6xl mx-auto border-t border-white/10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.0 }}
            className="text-center max-w-3xl mx-auto mb-16 sm:mb-20"
          >
            <ScrambleLabel
              text="Full-Stack Growth Engineering"
              className="text-white/55 text-[12px] sm:text-[13px] tracking-[0.25em] uppercase mb-6"
            />
            <h2 className="text-white font-normal text-[clamp(28px,5vw,52px)] leading-[1.12] tracking-[-0.02em]">
              Beyond Funnels. We Engineer the Entire Revenue Engine.
            </h2>
            <p className="mt-6 text-white/60 text-[15px] sm:text-[17px] leading-relaxed max-w-xl mx-auto">
              We build the offers, digital flagships, and custom business intelligence systems that turn traffic into compounding enterprise value.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {PILLARS.map((p, i) => (
              <motion.div
                key={p.tag}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, delay: i * 0.12 }}
                className="p-8 sm:p-10 rounded-3xl bg-white/[0.02] border border-white/10 hover:border-white/20 transition-all backdrop-blur-sm group"
              >
                <span className="text-[11px] font-mono tracking-widest uppercase text-[#d96aa8]">
                  {p.tag}
                </span>
                <h3 className="text-2xl font-normal text-white mt-3 mb-4 group-hover:text-white transition-colors">
                  {p.title}
                </h3>
                <p className="text-white/60 text-sm leading-relaxed mb-6 font-sans">
                  {p.desc}
                </p>
                <div className="text-[12px] font-mono text-white/40 flex items-center gap-2 pt-4 border-t border-white/5">
                  <span className="text-[#d96aa8]">×</span> {p.bullets}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 4 · Personal Estimate */}
        <div className="relative z-10 border-t border-white/10">
          <YourNumber />
        </div>

        {/* 5 · The Founder Close */}
        <section ref={closeRef} className="relative z-10 pt-36 pb-28 sm:py-40 px-6 border-t border-white/10">
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
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border border-white/15 mx-auto mb-10"
              />
            ) : (
              <div
                aria-hidden="true"
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border border-white/15 mx-auto mb-10 flex items-center justify-center text-white/60 text-[24px]"
              >
                JL
              </div>
            )}

            <ScrambleLabel
              text="Direct Engagement"
              className="text-white/55 text-[12px] sm:text-[13px] tracking-[0.25em] uppercase mb-8"
            />
            <h2 className="text-white font-normal text-[clamp(30px,6vw,56px)] leading-[1.12] tracking-[-0.02em]">
              Where does your revenue leak?
            </h2>
            <p className="mt-8 text-white/75 text-[16px] sm:text-[19px] leading-relaxed">
              “I engineer every system myself—no junior team, no account managers. Backed by ad partners who have scaled brands to over $100M in ARR, we look at your offers, brand, and data the way an investor would: where the money leaks, and how to scale it.”
            </p>
            <p className="mt-6 text-[14px] tracking-wide">
              <span className="text-white/90">Jarred Letofsky</span>
              <span className="text-white/55"> · Founder, PivotalX</span>
            </p>

            <div className="mt-12">
              <motion.button
                onClick={openBooking}
                whileHover={{ scale: 1.03, backgroundColor: '#e2e2e6' }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2.5 h-14 px-9 bg-white rounded-full text-black text-[16px] font-medium"
              >
                Book a Strategy Call
                <span aria-hidden="true">→</span>
              </motion.button>
              <p className="text-white/55 text-[13px] mt-4 tracking-wide">
                Direct founder review. No pitch, just the leaks we find.
              </p>
            </div>
          </motion.div>
        </section>
      </div>

      <Footer />

      {/* Floating CTA pill after the peak tension moment */}
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
              Book a Strategy Call
              <span aria-hidden="true">→</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
