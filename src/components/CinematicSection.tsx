import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import AutoVideo from './AutoVideo'
import SectionFade from './SectionFade'
import ScrambleLabel from './ScrambleLabel'

// High-altitude aerial pass-through generated with Seedance 2.0 over uniform,
// self-similar peaks (original frame pinned as start + end). The first and last
// frames are near-identical (endpoint diff ~11), so a single native-loop video
// repeats the same flight forever with no visible restart — and one <video>
// means no double-decode lag. Cruised at reduced speed so it drifts rather
// than races past the text.
const VIDEO =
  'https://d8j0ntlcm91z4.cloudfront.net/user_3GBQGaD12kz0IEgO44KqK8F5cRh/hf_20260713_223732_a5b780e0-0e35-4cc4-916b-f06d32b2644e.mp4'

const MAX_TILT = 8

export default function CinematicSection() {
  const sectionRef = useRef<HTMLElement>(null)

  // Cursor position within the section, normalized to -0.5..0.5 around center.
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-MAX_TILT, MAX_TILT]), {
    stiffness: 120,
    damping: 18,
  })
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [MAX_TILT, -MAX_TILT]), {
    stiffness: 120,
    damping: 18,
  })

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = sectionRef.current?.getBoundingClientRect()
    if (!rect) return
    mx.set((e.clientX - rect.left) / rect.width - 0.5)
    my.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  const handleMouseLeave = () => {
    mx.set(0)
    my.set(0)
  }

  return (
    <section
      id="about"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative h-screen h-[100dvh] overflow-hidden -mt-24 sm:-mt-32"
    >
      <AutoVideo
        src={VIDEO}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Top gradient overlay */}
      <div
        className="absolute top-0 left-0 right-0 z-10 pointer-events-none"
        style={{
          height: 480,
          background:
            'linear-gradient(to bottom, #010103 0%, #010103 32%, transparent 100%)',
        }}
      />
      <SectionFade position="bottom" height={320} />

      {/* pt offsets the section's negative top margin so the statement centers
          within the visible frame, not the full (overlapped) section box */}
      <div className="relative z-20 flex items-center justify-center h-full pt-24 sm:pt-32">
        <div className="max-w-3xl" style={{ perspective: 900 }}>
          <ScrambleLabel
            text="What we do"
            className="text-center text-white/40 text-[12px] sm:text-[13px] tracking-[0.25em] uppercase mb-8 sm:mb-10"
          />
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 1.2 }}
            style={{ rotateX, rotateY, willChange: 'transform' }}
            className="font-sans font-normal text-[24px] sm:text-[32px] md:text-[38px] lg:text-[42px] text-white leading-[1.3] tracking-[-0.02em] select-none px-6 sm:px-12 text-center"
          >
            Your funnel is leaking revenue. We find the holes, seal them, and turn the
            traffic you already pay for into profit — no extra ad spend.
          </motion.p>
        </div>
      </div>
    </section>
  )
}
