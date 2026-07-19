import { useState } from 'react'
import { motion } from 'framer-motion'
import ScrambleLabel from './ScrambleLabel'

// Photo lives at public/founder.jpg — until it exists, a monogram placeholder
// renders so the section never shows a broken image.
export default function FounderNote() {
  const [photoOk, setPhotoOk] = useState(true)

  return (
    <section className="relative py-24 sm:py-32 px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 1.0 }}
        className="relative max-w-3xl mx-auto flex flex-col md:flex-row items-center md:items-start gap-10 md:gap-14"
      >
        <div className="shrink-0">
          {photoOk ? (
            <img
              src="/founder.jpg"
              alt="Jarred Letofsky, founder of PivotalX"
              width={224}
              height={224}
              loading="lazy"
              onError={() => setPhotoOk(false)}
              className="w-48 h-48 md:w-56 md:h-56 rounded-2xl object-cover border border-white/15"
            />
          ) : (
            <div
              aria-hidden="true"
              className="w-48 h-48 md:w-56 md:h-56 rounded-2xl border border-white/15 flex items-center justify-center text-white/50 text-[32px] tracking-tight"
            >
              JL
            </div>
          )}
        </div>

        <div className="text-center md:text-left">
          <ScrambleLabel
            text="From the founder"
            className="text-white/40 text-[12px] sm:text-[13px] tracking-[0.25em] uppercase mb-7"
          />

          <p className="text-white/80 text-[16px] sm:text-[18px] leading-relaxed">
            I run every audit myself — no junior team, no hand-offs. I look at your funnel
            the way an investor would: where the money leaks, and what it costs to fix. And
            if I can&apos;t find leaks worth the engagement, I&apos;ll tell you that on the
            call.
          </p>

          <p className="mt-7 text-[13px] sm:text-[14px] tracking-wide">
            <span className="text-white/90">Jarred Letofsky</span>
            <span className="text-white/40"> · Founder, PivotalX</span>
          </p>
        </div>
      </motion.div>
    </section>
  )
}
