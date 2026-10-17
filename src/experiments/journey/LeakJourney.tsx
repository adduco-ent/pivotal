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
    eyebrow: 'The Ad Spend · $350 Paid',
    headline: '100 Buyers Inbound.',
    body: 'You just wired Meta $350. 100 warm visitors land on your site.',
    counterLabel: 'visitors on site',
  },
  {
    alive: 45,
    recovered: 0,
    eyebrow: '0–3 Seconds · -$192 Burned',
    headline: '“Not what the ad promised.”',
    body: 'Message mismatch. 55 bounce before reading your offer. $192 vaporized in seconds.',
    counterLabel: 'still with you',
    quote: true,
  },
  {
    alive: 9,
    recovered: 0,
    eyebrow: 'The Cart Chasm · -$126 Lost',
    headline: '“Shipping is how much?”',
    body: 'Hidden fees and zero urgency. 36 high-intent shoppers abandon ship. Another $126 burned.',
    counterLabel: 'still with you',
    quote: true,
  },
  {
    alive: 2,
    recovered: 0,
    eyebrow: 'Checkout Fatigue · -$24 Bleed',
    headline: '“I’ll do this on laptop later.”',
    body: '7 quit at the 1-yard line. You paid for their click; Meta keeps the cash.',
    counterLabel: 'bought',
    quote: true,
  },
  {
    alive: 2,
    recovered: 0,
    eyebrow: 'The Brutal Reality',
    headline: 'You spent $350.\nTwo bought.',
    body: 'Traffic was never your bottleneck. Pouring more ad spend into this is commercial suicide.',
    counterLabel: 'buyers',
  },
  {
    alive: 2,
    recovered: 1,
    eyebrow: 'The Breakthrough',
    headline: 'Plug one leak.\n+50% Revenue.',
    body: 'Same ads. Same traffic. 3 buyers instead of 2. Pure profit margin straight to the bottom line.',
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
        <div className="w-full max-w-6xl mx-auto px-6 sm:px-8 grid md:grid-cols-2 gap-8 md:gap-16 items-center">
          {/* The 100 with centered count & label inside the matrix */}
          <div className="relative w-full aspect-square max-w-[280px] sm:max-w-[380px] md:max-w-[480px] mx-auto flex items-center justify-center">
            <VisitorField alive={current.alive} recovered={current.recovered} />

            {/* Large number and small text centered over the dots */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none">
              <div className="flex flex-col items-center justify-center text-center p-6 sm:p-8 rounded-full bg-black/55 backdrop-blur-[2px]">
                <AnimatedNumber
                  value={total}
                  className="font-normal leading-none tracking-[-0.04em] text-[clamp(64px,11vw,140px)] transition-colors duration-700 font-mono drop-shadow-[0_4px_30px_rgba(0,0,0,0.95)]"
                  style={{ color: isRecovered ? '#d96aa8' : '#fff' }}
                />
                <span className="text-white/70 text-[12px] sm:text-[14px] uppercase tracking-[0.2em] font-mono mt-2 drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
                  {current.counterLabel}
                </span>
              </div>
            </div>
          </div>

          {/* Right column: Story Narrative with ample breathing room */}
          <div className="text-center md:text-left">
            <div className="min-h-[160px] sm:min-h-[190px] flex flex-col justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={phase}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.45, ease: [0.215, 0.61, 0.355, 1] }}
                  className="max-w-lg mx-auto md:mx-0"
                >
                  <p className="text-white/40 text-[12px] sm:text-[13px] tracking-[0.25em] uppercase mb-4">
                    {current.eyebrow}
                    <span style={{ color: '#d96aa8' }}>.</span>
                  </p>
                  <h2
                    className={`text-white font-normal whitespace-pre-line leading-[1.12] tracking-[-0.02em] ${
                      current.quote
                        ? 'text-[clamp(26px,3.8vw,44px)] italic'
                        : 'text-[clamp(30px,4.5vw,52px)]'
                    }`}
                  >
                    {current.headline}
                  </h2>
                  <p className="mt-5 text-white/65 text-[15px] sm:text-[17px] leading-relaxed">
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
          <p className="text-white/40 text-[11px] sm:text-[12px] tracking-wide text-center">
            Based on e-commerce benchmarks (Baymard Institute).
          </p>
        </div>
      </div>
    </section>
  )
}
