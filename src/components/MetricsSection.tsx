import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import AutoVideo from './AutoVideo'
import SectionFade from './SectionFade'
import ScrambleIn from './ScrambleIn'
import ScrambleLabel from './ScrambleLabel'

// Cinemagraph: alpaca and mountains frozen, only the starfield sky drifts
// left-to-right. Instead of looping the clip's raw ends (frame diff ~111),
// playback wraps between a scanned pair of near-identical frames —
// 0.093s ↔ 9.598s, measured diff 9 — so the restart lands on what is
// effectively the same image and no jump is visible.
const VIDEO =
  'https://d8j0ntlcm91z4.cloudfront.net/user_3GBQGaD12kz0IEgO44KqK8F5cRh/hf_20260715_165456_f1272dc0-9451-4455-9797-36bd2c7dcaac.mp4'
const LOOP_START = 0.093
const LOOP_END = 9.598

const METRICS = [
  { value: '4.2x', label: 'Average Conversion Lift' },
  { value: '$0', label: 'Added Ad Spend' },
  { value: '38%', label: 'Margin Recovered' },
]

export default function MetricsSection() {
  const gridRef = useRef<HTMLDivElement>(null)
  const gridInView = useInView(gridRef, { once: true, amount: 0.3 })

  return (
    <section id="metrics" className="relative min-h-screen overflow-hidden">
      <AutoVideo
        src={VIDEO}
        loopStart={LOOP_START}
        loopEnd={LOOP_END}
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* Mobile scrim — the portrait crop puts the numbers directly over the
          bright llama head, so soften the video for label contrast */}
      <div className="absolute inset-0 bg-black/40 sm:hidden pointer-events-none" />
      <SectionFade position="top" height={320} />
      <SectionFade position="bottom" height={320} />

      <div className="relative z-20 flex flex-col items-center justify-center min-h-screen pt-32 pb-32 px-6">
        <div className="w-full max-w-6xl">
          <ScrambleLabel
            text="Performance Metrics"
            className="text-white/50 text-[13px] sm:text-[14px] tracking-[0.2em] uppercase mb-16 text-center [text-shadow:0_2px_24px_rgba(0,0,0,0.9)]"
          />

          <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8">
            {METRICS.map((metric, i) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, delay: i * 0.15 }}
                className="text-center"
                style={{ textShadow: '0 2px 32px rgba(0, 0, 0, 0.7)' }}
              >
                <div className="text-white text-[clamp(48px,10vw,96px)] font-normal tracking-[-0.04em] leading-none">
                  <ScrambleIn text={metric.value} delay={300 + i * 150} triggered={gridInView} />
                </div>
                <div className="text-white/50 text-[13px] sm:text-[15px] mt-4 tracking-wide">
                  {metric.label}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.2, delay: 0.4 }}
            className="text-white/35 text-[12px] sm:text-[13px] tracking-[0.15em] uppercase text-center mt-16"
            style={{ textShadow: '0 2px 24px rgba(0, 0, 0, 0.9)' }}
          >
            Median results across 60+ funnel engagements
          </motion.p>
        </div>
      </div>
    </section>
  )
}
