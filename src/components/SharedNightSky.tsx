import { useMemo } from 'react'

// Deterministic PRNG so the sky is stable across renders
function mulberry32(seed: number) {
  return () => {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

// One continuous night sky shared by the dark sections from Our Method down to
// the closing CTA. Because it spans all of them as a single layer, there are no
// per-section backgrounds — and therefore no seam lines between them. Stars are
// positioned by percentage so they distribute evenly across the full height,
// and the nebula is just three intentionally-placed clouds for the whole run.
export default function SharedNightSky() {
  const stars = useMemo(() => {
    const rand = mulberry32(2027)
    return Array.from({ length: 230 }, (_, i) => ({
      id: i,
      x: +(rand() * 100).toFixed(3),
      y: +(rand() * 100).toFixed(3),
      size: +(0.5 + rand() * 1.6).toFixed(2),
      opacity: +(0.12 + rand() * 0.6).toFixed(2),
      twinkle: rand() > 0.72,
      duration: +(3 + rand() * 5).toFixed(2),
      delay: +(rand() * 6).toFixed(2),
    }))
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Three deliberate clouds across the whole expanse: magenta behind Our
          Method (upper-left), violet through The Engagement (mid-right), magenta
          behind the closing CTA (lower-center). The vertical mask fades the haze
          into the video sections above and below with no seam. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 32% 12% at 28% 13%, rgba(217,106,168,0.20) 0%, transparent 62%), radial-gradient(ellipse 30% 11% at 76% 43%, rgba(150,104,214,0.14) 0%, transparent 62%), radial-gradient(ellipse 40% 13% at 48% 87%, rgba(217,106,168,0.18) 0%, transparent 64%)',
          filter: 'blur(55px)',
          maskImage:
            'linear-gradient(to bottom, transparent 0%, #000 5%, #000 95%, transparent 100%)',
          WebkitMaskImage:
            'linear-gradient(to bottom, transparent 0%, #000 5%, #000 95%, transparent 100%)',
        }}
      />

      {stars.map((s) => (
        <span
          key={s.id}
          style={{
            position: 'absolute',
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            borderRadius: '50%',
            background: '#fff',
            opacity: s.opacity,
            ...(s.twinkle
              ? { animation: `star-twinkle ${s.duration}s ease-in-out ${s.delay}s infinite` }
              : {}),
          }}
        />
      ))}
    </div>
  )
}
