import { useMemo } from 'react'

// Deterministic PRNG so the sky doesn't reshuffle on every render
function mulberry32(seed: number) {
  return () => {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

interface StarFieldProps {
  seed?: number
  density?: number
  /** Set false for stars only — no nebula haze layer. */
  haze?: boolean
}

// Matches the purple-tinted starfield in the video sections so the black
// bridge bands read as part of the same sky. The sky is painted on a
// fixed-height layer (taller than any section) rather than stretched to the
// section box — so if the section's height animates (e.g. hover-expanding
// cards), the stars stay put instead of zooming.
const SKY_H = 1200

export default function StarField({ seed = 1, density = 140, haze = true }: StarFieldProps) {
  const stars = useMemo(() => {
    const rand = mulberry32(seed)
    // 1.5x compensates for stars living on the taller fixed layer, of which
    // a typical section only reveals the upper portion.
    return Array.from({ length: Math.round(density * 1.5) }, (_, i) => ({
      id: i,
      x: rand() * 1200,
      y: rand() * SKY_H,
      r: 0.3 + rand() * 1.1,
      opacity: 0.15 + rand() * 0.65,
      twinkle: rand() > 0.7,
      duration: 3 + rand() * 5,
      delay: rand() * 6,
    }))
  }, [seed, density])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Nebula haze — sits on a SECTION-sized layer (not the fixed sky) and is
          masked to fade on all four edges, so it can never reach a border and
          clip, no matter how tall or short the section is. Blurred into soft
          atmosphere rather than defined clouds. */}
      {haze && (
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 60% 55% at 74% 22%, rgba(217,106,168,0.17) 0%, transparent 62%), radial-gradient(ellipse 55% 55% at 18% 74%, rgba(148,102,212,0.11) 0%, transparent 62%)',
            filter: 'blur(40px)',
            maskImage:
              'radial-gradient(ellipse 92% 88% at 50% 46%, #000 42%, transparent 100%)',
            WebkitMaskImage:
              'radial-gradient(ellipse 92% 88% at 50% 46%, #000 42%, transparent 100%)',
          }}
        />
      )}

      <div className="absolute top-0 left-0 w-full" style={{ height: SKY_H }}>
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox={`0 0 1200 ${SKY_H}`}
          preserveAspectRatio="xMidYMid slice"
        >
          {stars.map((star) => (
            <circle
              key={star.id}
              cx={star.x}
              cy={star.y}
              r={star.r}
              fill="#fff"
              opacity={star.opacity}
              style={
                star.twinkle
                  ? {
                      animation: `star-twinkle ${star.duration}s ease-in-out ${star.delay}s infinite`,
                    }
                  : undefined
              }
            />
          ))}
        </svg>
      </div>
    </div>
  )
}
