import { useState } from 'react'
import { motion } from 'framer-motion'
import ScrambleLabel from '../../components/ScrambleLabel'
import AnimatedNumber from './AnimatedNumber'

const REVENUE_STEPS = [25_000, 50_000, 100_000, 250_000, 500_000, 1_000_000, 2_000_000]

// A half-point conversion lift (e.g. 2.0% → 2.5%) at the same traffic is +25%
// revenue. Deliberately conservative and stated on-page.
const LIFT = 0.25

const shortMoney = (n: number) =>
  n >= 1_000_000 ? `$${(n / 1_000_000).toFixed(n % 1_000_000 ? 1 : 0)}M` : `$${Math.round(n / 1000)}K`

const fullMoney = (n: number) => `$${Math.round(n).toLocaleString('en-US')}`

export default function YourNumber() {
  const [revenue, setRevenue] = useState(250_000)
  const monthly = revenue * LIFT

  return (
    <section className="relative pt-36 pb-28 sm:py-40 px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1.0 }}
        className="max-w-3xl mx-auto text-center"
      >
        <ScrambleLabel
          text="Now make it yours"
          className="text-white/55 text-[12px] sm:text-[13px] tracking-[0.25em] uppercase mb-8"
        />
        <h2 className="text-white font-normal text-[clamp(28px,5.5vw,52px)] leading-[1.15] tracking-[-0.02em]">
          What does your store make a month?
        </h2>

        <div className="mt-10 flex flex-wrap justify-center gap-2.5" role="radiogroup" aria-label="Monthly revenue">
          {REVENUE_STEPS.map((step) => {
            const active = step === revenue
            return (
              <button
                key={step}
                role="radio"
                aria-checked={active}
                onClick={() => setRevenue(step)}
                className={`h-11 px-5 rounded-full text-[15px] border transition-colors ${
                  active
                    ? 'bg-white text-black border-white'
                    : 'bg-transparent text-white/75 border-white/20 hover:border-white/50 hover:text-white'
                }`}
              >
                {shortMoney(step)}
              </button>
            )
          })}
        </div>

        <div className="mt-16">
          <p className="text-white/65 text-[15px] sm:text-[17px]">Plugging one leak could be worth about</p>
          <div className="mt-4 text-white font-normal leading-none tracking-[-0.04em] text-[clamp(52px,11vw,128px)]">
            <span style={{ color: '#d96aa8' }}>+</span>
            <AnimatedNumber value={monthly} format={fullMoney} />
          </div>
          <p className="mt-4 text-white/65 text-[15px] sm:text-[17px]">
            every month. That’s <AnimatedNumber value={monthly * 12} format={fullMoney} className="text-white" /> a year.
          </p>
          <p className="mt-10 text-white/45 text-[12px] sm:text-[13px] leading-relaxed max-w-lg mx-auto">
            Assumes a half-point conversion lift (for example 2.0% → 2.5%), which is +25% revenue at the
            same traffic. Your real number depends on where your funnel leaks, and finding that is what
            the review is for.
          </p>
        </div>
      </motion.div>
    </section>
  )
}
