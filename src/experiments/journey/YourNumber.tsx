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
    <section className="relative pt-32 pb-24 sm:py-36 px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1.0 }}
        className="max-w-4xl mx-auto text-center"
      >
        <ScrambleLabel
          text="The Profit Recovery Model"
          className="text-white/40 text-[11px] sm:text-[12px] tracking-[0.25em] uppercase font-mono mb-6"
        />
        <h2 className="text-white font-normal text-[clamp(28px,5vw,52px)] leading-[1.12] tracking-[-0.02em]">
          Calculate your quiet cash bleed.
        </h2>
        <p className="mt-4 text-white/55 text-[14px] sm:text-[16px] max-w-lg mx-auto">
          Select your current monthly revenue to see what plugging one single funnel leak recovers:
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-2 sm:gap-2.5" role="radiogroup" aria-label="Monthly revenue">
          {REVENUE_STEPS.map((step) => {
            const active = step === revenue
            return (
              <button
                key={step}
                role="radio"
                aria-checked={active}
                onClick={() => setRevenue(step)}
                className={`h-10 sm:h-11 px-4 sm:px-5 rounded-full text-[14px] sm:text-[15px] font-mono border transition-all duration-200 ${
                  active
                    ? 'bg-white text-black border-white shadow-[0_0_25px_rgba(255,255,255,0.25)]'
                    : 'bg-white/[0.03] text-white/70 border-white/15 hover:border-white/40 hover:text-white'
                }`}
              >
                {shortMoney(step)}
              </button>
            )
          })}
        </div>

        <div className="mt-12 sm:mt-16">
          <p className="text-white/50 text-[12px] sm:text-[13px] uppercase tracking-[0.2em] font-mono">
            Recoverable Monthly Cash Flow
          </p>
          <div className="mt-3 text-white font-normal leading-none tracking-[-0.04em] text-[clamp(54px,10vw,120px)]">
            <span style={{ color: '#d96aa8' }}>+</span>
            <AnimatedNumber value={monthly} format={fullMoney} />
          </div>
          <p className="mt-4 text-white/70 text-[15px] sm:text-[17px]">
            every month. That’s <AnimatedNumber value={monthly * 12} format={fullMoney} className="text-white font-medium" /> / year straight to your bottom line.
          </p>
          <p className="mt-6 text-white/35 text-[11px] sm:text-[12px] leading-relaxed max-w-md mx-auto font-mono">
            *Assumes a conservative 0.5% conversion rate recovery on your current ad spend.
          </p>
        </div>
      </motion.div>
    </section>
  )
}
