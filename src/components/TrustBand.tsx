import { motion } from 'framer-motion'
import StarField from './StarField'
import ScrambleLabel from './ScrambleLabel'
import { useBooking } from '../lib/booking'

const STATS = [
  { value: '60+', label: 'Brands moved' },
  { value: '9', label: 'Industries' },
  { value: '4.9/5', label: 'Avg. client rating' },
]

export default function TrustBand() {
  const { open: openBooking } = useBooking()
  return (
    <section className="relative bg-black py-24 sm:py-32 px-4 sm:px-6 overflow-hidden">
      <StarField seed={23} density={130} haze={false} />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1.0 }}
        className="relative max-w-6xl mx-auto rounded-[28px] border border-white/10 overflow-hidden"
        style={{
          background:
            'linear-gradient(135deg, rgba(255,255,255,0.055), rgba(255,255,255,0.015))',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          boxShadow: '0 40px 120px -40px rgba(217,106,168,0.25)',
        }}
      >
        {/* Large editorial quote glyph */}
        <span
          aria-hidden="true"
          className="pointer-events-none select-none absolute -top-10 right-6 sm:right-12 leading-none"
          style={{
            fontFamily: '"Anton SC", sans-serif',
            fontSize: 'clamp(180px, 22vw, 340px)',
            color: '#d96aa8',
            opacity: 0.12,
          }}
        >
          &rdquo;
        </span>

        <div className="relative grid md:grid-cols-5 gap-12 md:gap-14 items-start p-8 sm:p-12 md:p-16">
          {/* Left rail — the credentials */}
          <div className="md:col-span-2">
            <ScrambleLabel
              text="Client results"
              className="text-white/45 text-[12px] sm:text-[13px] tracking-[0.25em] uppercase"
            />

            <div
              className="text-[15px] tracking-[0.35em] mt-6"
              style={{ color: '#d96aa8', textShadow: '0 0 24px rgba(255, 94, 196, 0.5)' }}
              aria-label="5 out of 5 stars"
            >
              ★★★★★
            </div>

            <div className="mt-12 flex flex-col divide-y divide-white/10">
              {STATS.map((stat, i) => (
                <div key={stat.label} className={i === 0 ? 'pb-6' : 'py-6 last:pb-0'}>
                  <div className="text-white text-[clamp(30px,3.6vw,40px)] font-normal tracking-tight leading-none">
                    {stat.value}
                  </div>
                  <div className="text-white/40 text-[11px] sm:text-[12px] tracking-[0.15em] uppercase mt-2.5">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right column — the testimonial + ask */}
          <div className="md:col-span-3 md:border-l md:border-white/10 md:pl-14">
            <blockquote className="text-white font-normal text-[clamp(23px,2.9vw,36px)] leading-[1.45] tracking-[-0.015em]">
              PivotalX rebuilt our funnel into an experience. Conversions doubled inside the
              first quarter — and for the first time, the data tells us exactly why.
            </blockquote>

            <div className="mt-9 flex items-center gap-4">
              <div
                className="shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-white/80 text-[15px] tracking-tight"
                style={{
                  background: 'linear-gradient(135deg, rgba(217,106,168,0.35), rgba(255,255,255,0.06))',
                  border: '1px solid rgba(255,255,255,0.15)',
                }}
                aria-hidden="true"
              >
                MC
              </div>
              <div className="text-[14px] leading-tight">
                <div className="text-white/90">Maya Chen</div>
                <div className="text-white/40 mt-0.5">VP Growth, NovaReach</div>
              </div>
            </div>

            <div className="mt-11">
              <motion.button
                onClick={openBooking}
                whileHover={{ scale: 1.03, backgroundColor: '#e2e2e6' }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2.5 h-12 px-7 bg-white rounded-full text-black text-[14px] font-medium"
              >
                Book a strategy call
                <span aria-hidden="true">→</span>
              </motion.button>
              <p className="text-white/45 text-[12px] mt-4 tracking-wide">
                Free 30-minute funnel review. No pitch, just the leaks we find.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
