import { motion } from 'framer-motion'

const FEATURES = [
  {
    title: 'Full-Funnel Audit',
    desc: 'We map every step from first click to closed sale.',
  },
  {
    title: 'Leak Detection',
    desc: 'We pinpoint exactly where visitors and revenue drop off.',
  },
  {
    title: 'The Fix Plan',
    desc: 'A prioritized playbook to seal each leak fast.',
  },
  {
    title: 'Margin Boost',
    desc: 'More profit per customer, with zero added ad spend.',
  },
]

export default function TechnologySection() {
  return (
    <section className="relative min-h-screen [min-height:100dvh] flex items-center py-24 px-6">
      <div className="relative max-w-6xl mx-auto w-full">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-8">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 1.0 }}
            className="text-white font-normal text-[clamp(36px,8vw,72px)] leading-[0.95] tracking-[-0.03em]"
          >
            Our
            <br />
            Method<span style={{ color: '#d96aa8' }}>.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 1.0, delay: 0.2 }}
            className="text-white/55 text-[14px] sm:text-[16px] leading-relaxed max-w-sm md:text-right md:pt-3"
          >
            We don&apos;t guess. We study your funnel and your real numbers, isolate every
            leak, then hand you a plan that lifts conversions and margins — no extra ad budget
            required.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.0, delay: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10 mt-20 sm:mt-24"
        >
          {FEATURES.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className="group border-t border-white/10 hover:border-white/25 transition-colors duration-300 pt-5"
            >
              <p className="text-white/30 text-[12px] tracking-[0.15em] mb-3">
                {String(i + 1).padStart(2, '0')}
              </p>
              <h3 className="text-white text-[15px] sm:text-[17px] font-normal mb-2.5">
                {feature.title}
              </h3>
              <p className="text-white/40 text-[13px] sm:text-[14px] leading-relaxed">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
