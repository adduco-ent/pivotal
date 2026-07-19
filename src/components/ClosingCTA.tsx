import { motion } from 'framer-motion'
import ScrambleLabel from './ScrambleLabel'
import { useBooking } from '../lib/booking'

export default function ClosingCTA() {
  const { open: openBooking } = useBooking()
  return (
    <section className="relative py-24 sm:py-36 px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 1.0 }}
        className="relative max-w-2xl mx-auto text-center"
      >
        <ScrambleLabel
          text="Ready when you are"
          className="text-white/40 text-[12px] sm:text-[13px] tracking-[0.25em] uppercase mb-8"
        />

        <h2 className="text-white font-normal text-[clamp(28px,6vw,52px)] leading-[1.15] tracking-[-0.02em]">
          Stop paying for traffic you don&apos;t convert.
        </h2>

        <p className="text-white/45 text-[14px] sm:text-[16px] leading-relaxed max-w-md mx-auto mt-8">
          One call. We&apos;ll walk your funnel together and show you where the revenue is
          leaking — whether you hire us or not.
        </p>

        <div className="mt-12">
          <motion.button
            onClick={openBooking}
            whileHover={{ scale: 1.03, backgroundColor: '#e2e2e6' }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2.5 h-12 px-8 bg-white rounded-full text-black text-[15px] font-medium"
          >
            Book a strategy call
            <span aria-hidden="true">→</span>
          </motion.button>
          <p className="text-white/40 text-[12px] mt-4 tracking-wide">
            Free 30-minute funnel review. No pitch, just the leaks we find.
          </p>
        </div>
      </motion.div>
    </section>
  )
}
