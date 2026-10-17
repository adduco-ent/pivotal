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

// One line each. The page sells the call, not the service menu.
const LEVERS = [
  { n: '01', title: 'Offers that sell', line: 'New products and bundles that lift conversion and order value.' },
  { n: '02', title: 'Brand & sales pages', line: 'Cinematic sites that earn premium prices.' },
  { n: '03', title: 'Dashboards & CRM', line: 'Custom BI that shows where margin is made and lost.' },
  { n: '04', title: '$100M+ ad partners', line: 'Media buyers who’ve scaled brands past $100M ARR.' },
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

  // Floating CTA appears after the peak ("Two bought") and yields to the close.
  const pillVisible = reachedPeak && !heroInView && !closeInView

  return (
    <>
      <Navbar entranceComplete={entranceComplete} />

      {/* Hero */}
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
            Follow 100 paid visitors. See where your revenue walks out.
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
            Scroll
          </motion.div>
        </motion.div>
      </section>

      {/* Leak breakdown: pure black, nothing moving behind it, so the dots own attention */}
      <div className="relative bg-black">
        <LeakJourney onPhaseChange={(p) => p >= 4 && setReachedPeak(true)} />
      </div>

      {/* Atmosphere returns only after the breakdown. The sky's own top mask fades it in. */}
      <div className="relative bg-black">
        <SharedNightSky />

        <div className="relative z-10">
          <YourNumber />
        </div>

        {/* Four levers */}
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
                text="Beyond the funnel"
                className="text-white/55 text-[12px] sm:text-[13px] tracking-[0.25em] uppercase mb-6"
              />
              <h2 className="text-white font-normal text-[clamp(28px,5vw,52px)] leading-[1.12] tracking-[-0.02em]">
                Four levers. One growth engine.
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-16 gap-y-12 sm:gap-y-14">
              {LEVERS.map((l, i) => (
                <motion.div
                  key={l.n}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.8, delay: i * 0.1 }}
                  className="text-center sm:text-left"
                >
                  <div className="text-[13px] tracking-[0.2em]" style={{ color: '#d96aa8' }}>
                    {l.n}
                  </div>
                  <h3 className="mt-3 text-white font-normal text-[22px] sm:text-[26px] tracking-[-0.01em]">
                    {l.title}
                  </h3>
                  <p className="mt-3 text-white/60 text-[15px] sm:text-[16px] leading-relaxed max-w-sm mx-auto sm:mx-0">
                    {l.line}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Close */}
        <section ref={closeRef} className="relative z-10 pt-28 pb-32 sm:pt-32 sm:pb-40 px-6">
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

            <h2 className="text-white font-normal text-[clamp(30px,6vw,56px)] leading-[1.12] tracking-[-0.02em]">
              Where do your other 98 go?
            </h2>
            <p className="mt-8 text-white/75 text-[16px] sm:text-[19px] leading-relaxed">
              “I build every system myself. No juniors, no hand-offs. I’ll show you where your revenue
              leaks, and how to scale it.”
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
                Find my leaks
                <span aria-hidden="true">→</span>
              </motion.button>
              <p className="text-white/50 text-[13px] mt-4 tracking-wide">Free 30-minute review.</p>
            </div>
          </motion.div>
        </section>
      </div>

      <Footer />

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
              Find my leaks
              <span aria-hidden="true">→</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
