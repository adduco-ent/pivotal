import { motion } from 'framer-motion'
import ScrambleLabel from './ScrambleLabel'

const PHASES = [
  {
    number: '01',
    name: 'Audit',
    desc: 'Two weeks inside your funnel, analytics, and checkout — mapping every step a customer takes.',
  },
  {
    number: '02',
    name: 'Diagnose',
    desc: 'Every leak ranked by revenue impact and effort to fix. You see exactly what each one costs you.',
  },
  {
    number: '03',
    name: 'Optimize',
    desc: 'A prioritized fix plan, implemented with your team or ours — measured against baseline.',
  },
]

export default function ArchitectureSection() {
  return (
    <section className="relative flex items-center justify-center">
      <div className="relative max-w-3xl w-full px-6 py-20 sm:py-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1.0 }}
        >
          <ScrambleLabel
            text="The Engagement"
            className="text-white/40 text-[13px] sm:text-[14px] tracking-[0.2em] uppercase mb-8"
          />
          <h2 className="text-white font-normal text-[clamp(28px,6vw,56px)] leading-[1.15] tracking-[-0.02em] mb-10">
            Three phases. Zero guesswork.
          </h2>
          <p className="text-white/45 text-[15px] sm:text-[17px] leading-relaxed max-w-xl mx-auto">
            First we audit your full funnel and metrics. Then we diagnose every leak draining
            conversions and margin. Finally we hand you a clear plan to seal them — without new
            ad spend.
          </p>
        </motion.div>

        <div className="mt-14 flex flex-col items-center">
          {PHASES.map((phase, i) => (
            <motion.div
              key={phase.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8, delay: i * 0.12 }}
              className="w-full max-w-md flex flex-col items-center"
            >
              {i > 0 && (
                <motion.div
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true, amount: 1 }}
                  transition={{ duration: 0.5, delay: i * 0.12 }}
                  className="w-px h-6 bg-white/15 origin-top"
                />
              )}
              <div className="group w-full border border-white/10 hover:border-white/25 rounded-lg px-6 py-5 text-left transition-colors duration-300 cursor-default">
                <div className="flex items-center justify-between">
                  <span className="text-[12px] tracking-[0.15em] uppercase">
                    <span style={{ color: '#d96aa8' }}>{phase.number}</span>
                    <span className="text-white/30"> / Phase</span>
                  </span>
                  <span className="text-white text-[16px] sm:text-[18px] font-normal">
                    {phase.name}
                  </span>
                </div>
                <div className="max-h-0 opacity-0 group-hover:max-h-24 group-hover:opacity-100 overflow-hidden transition-all duration-500 ease-out">
                  <p className="text-white/45 text-[13px] sm:text-[14px] leading-relaxed pt-3">
                    {phase.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
