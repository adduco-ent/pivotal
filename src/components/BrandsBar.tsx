import { motion } from 'framer-motion'
import StarField from './StarField'
import ScrambleLabel from './ScrambleLabel'

const BRANDS = [
  'NOVAREACH',
  'Helix & Co',
  'ORBITAL',
  'kairos',
  'LUMEN LABS',
  'Vanta Point',
  'AETHER',
  'pulsewave',
]

function BrandRow() {
  return (
    <div className="flex items-center gap-16 sm:gap-24 pr-16 sm:pr-24 shrink-0">
      {BRANDS.map((brand, i) => (
        <span
          key={brand}
          className={`whitespace-nowrap text-white/30 hover:text-white/80 transition-colors duration-300 text-[16px] sm:text-[20px] tracking-tight ${
            i % 3 === 1 ? 'italic font-normal' : i % 3 === 2 ? 'font-bold' : 'font-normal'
          }`}
        >
          {brand}
        </span>
      ))}
    </div>
  )
}

export default function BrandsBar() {
  return (
    <section className="relative z-30 bg-black pt-12 pb-10 sm:pt-14 sm:pb-12 overflow-hidden">
      <StarField seed={7} density={110} haze={false} />
      <ScrambleLabel
        text="Brands we've moved recently"
        className="relative text-white/40 text-[13px] sm:text-[14px] tracking-[0.2em] uppercase mb-10 text-center px-6"
      />

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 1.2, delay: 0.2 }}
        className="relative"
        style={{
          // Fade the wordmarks themselves out at the edges (instead of painting
          // black overlays on top, which blotted out the starfield and still
          // let names clip at the viewport edge). The sky stays intact and the
          // text dissolves long before it reaches the frame.
          maskImage:
            'linear-gradient(to right, transparent 0%, #000 18%, #000 82%, transparent 100%)',
          WebkitMaskImage:
            'linear-gradient(to right, transparent 0%, #000 18%, #000 82%, transparent 100%)',
        }}
      >
        <div className="flex w-max marquee-track">
          <BrandRow />
          <BrandRow />
        </div>
      </motion.div>
    </section>
  )
}
