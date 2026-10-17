import { useRef, useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import VisitorField from './VisitorField'
import AnimatedNumber from './AnimatedNumber'

interface Phase {
  alive: number
  recovered: number
  eyebrow: string
  headline: string
  body: string
  counterLabel: string
  quote?: boolean
}

// Funnel numbers follow widely published e-commerce benchmarks (~2–3% average
// conversion, ~70% cart abandonment per Baymard Institute). Disclosed on-page.
const PHASES: Phase[] = [
  {
    alive: 100,
    recovered: 0,
    eyebrow: 'Inbound Traffic',
    headline: '100 Paid Clicks.',
    body: 'You paid for every visitor. Watch where your money goes.',
    counterLabel: 'inbound visitors',
  },
  {
    alive: 45,
    recovered: 0,
    eyebrow: 'Stage 01 · First 3 Seconds',
    headline: '“Not what the ad promised.”',
    body: 'Offer mismatch. 55 bounce instantly.',
    counterLabel: 'still with you',
    quote: true,
  },
  {
    alive: 9,
    recovered: 0,
    eyebrow: 'Stage 02 · Cart Drawer',
    headline: '“Shipping is how much?”',
    body: 'Hidden fees and friction. 36 drop off.',
    counterLabel: 'still with you',
    quote: true,
  },
  {
    alive: 2,
    recovered: 0,
    eyebrow: 'Stage 03 · Mobile Checkout',
    headline: '“Too much to type on phone.”',
    body: 'Form fatigue. 7 quit at the finish line.',
    counterLabel: 'bought',
    quote: true,
  },
  {
    alive: 2,
    recovered: 0,
    eyebrow: 'The Baseline Reality',
    headline: 'You paid for 100.\nTwo bought.',
    body: 'Traffic was never the problem. The leaks were.',
    counterLabel: 'buyers',
  },
  {
    alive: 2,
    recovered: 1,
    eyebrow: 'The Architecture Fix',
    headline: 'Plug one leak.\n50% more revenue.',
    body: 'Same ads. Same traffic. 3 buyers instead of 2. Pure profit margin.',
    counterLabel: 'buyers',
  },
]

interface LeakJourneyProps {
  onPhaseChange?: (phase: number, total: number) => void
}

// One tall section with a sticky viewport. Scroll position picks the phase;
// the dots, counter, and copy all animate between phases.
export default function LeakJourney({ onPhaseChange }: LeakJourneyProps) {
  const ref = useRef<HTMLElement>(null)
  const [phase, setPhase] = useState(0)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const next = Math.min(PHASES.length - 1, Math.max(0, Math.floor(v * PHASES.length)))
    if (next !== phase) {
      setPhase(next)
      onPhaseChange?.(next, PHASES.length)
    }
  })

  const current = PHASES[phase]
  const total = current.alive + current.recovered
  const isRecovered = current.recovered > 0

  return (
    <section ref={ref} className="relative" style={{ height: `${PHASES.length * 100}vh` }}>
      <div className="sticky top-0 h-screen h-[100dvh] overflow-hidden flex flex-col justify-center pt-20 pb-16">
        <div className="w-full max-w-6xl mx-auto px-6 sm:px-8 grid md:grid-cols-2 gap-6 md:gap-16 items-center">
          {/* The 100 */}
          <div className="relative w-full aspect-square max-w-[230px] sm:max-w-[360px] md:max-w-[500px] mx-auto">
            <VisitorField alive={current.alive} recovered={current.recovered} />
          </div>

          {/* Counter + story */}
          <div className="text-center md:text-left">
            <div className="flex items-baseline justify-center md:justify-start gap-4">
              <AnimatedNumber
                value={total}
                className="font-normal leading-none tracking-[-0.04em] text-[clamp(64px,13vw,168px)] transition-colors duration-700"
                style={{ color: isRecovered ? '#d96aa8' : '#fff' }}
              />
              <span className="text-white/60 text-[14px] sm:text-[16px] tracking-wide">
                {current.counterLabel}
              </span>
            </div>

            <div className="mt-6 sm:mt-10 min-h-[190px] sm:min-h-[220px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={phase}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.45, ease: [0.215, 0.61, 0.355, 1] }}
                >
                  <p className="text-white/55 text-[12px] sm:text-[13px] tracking-[0.2em] uppercase mb-4">
                    {current.eyebrow}
                    <span style={{ color: '#d96aa8' }}>.</span>
                  </p>
                  <h2
                    className={`text-white font-normal whitespace-pre-line leading-[1.12] tracking-[-0.02em] ${
                      current.quote
                        ? 'text-[clamp(24px,3.6vw,40px)] italic'
                        : 'text-[clamp(28px,4.2vw,48px)]'
                    }`}
                  >
                    {current.headline}
                  </h2>
                  <p className="mt-5 text-white/70 text-[15px] sm:text-[17px] leading-relaxed max-w-md mx-auto md:mx-0">
                    {current.body}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Progress + source */}
        <div className="absolute bottom-5 inset-x-0 px-6 flex flex-col items-center gap-3">
          <div className="flex gap-1.5" aria-hidden="true">
            {PHASES.map((_, i) => (
              <span
                key={i}
                className={`h-[3px] rounded-full transition-all duration-500 ${
                  i === phase ? 'w-8 bg-white' : i < phase ? 'w-3 bg-white/50' : 'w-3 bg-white/15'
                }`}
              />
            ))}
          </div>
          <p className="text-white/45 text-[11px] sm:text-[12px] tracking-wide text-center max-w-xl">
            Illustration based on published e-commerce benchmarks: ~2–3% average conversion,
            ~70% cart abandonment (Baymard Institute).
          </p>
        </div>
      </div>
    </section>
  )
}
