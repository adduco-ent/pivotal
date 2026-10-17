import { useEffect, useRef } from 'react'

interface VisitorFieldProps {
  /** How many of the 100 are still in the funnel (white). */
  alive: number
  /** How many leaked visitors are recovered (pink), drawn from the leaked set. */
  recovered: number
}

const COUNT = 100
const COLS = 10
const PINK = [217, 106, 168]

// Deterministic PRNG so the field lays out identically on every visit.
function mulberry32(seed: number) {
  let a = seed
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

interface Dot {
  gx: number // normalized grid position 0..1
  gy: number
  rank: number // exit order: lower rank stays longer
  phase: number // breathing offset
  o: number // current opacity
  dy: number // current vertical drift
  p: number // current pink mix 0..1
  to: number // targets
  tdy: number
  tp: number
  startAt: number // stagger start timestamp
}

function buildDots(): Dot[] {
  const rand = mulberry32(7)
  const ranks = Array.from({ length: COUNT }, (_, i) => i)
  for (let i = ranks.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1))
    ;[ranks[i], ranks[j]] = [ranks[j], ranks[i]]
  }
  return Array.from({ length: COUNT }, (_, i) => {
    const col = i % COLS
    const row = Math.floor(i / COLS)
    return {
      gx: (col + 0.5 + (rand() - 0.5) * 0.35) / COLS,
      gy: (row + 0.5 + (rand() - 0.5) * 0.35) / COLS,
      rank: ranks[i],
      phase: rand() * Math.PI * 2,
      o: 1,
      dy: 0,
      p: 0,
      to: 1,
      tdy: 0,
      tp: 0,
      startAt: 0,
    }
  })
}

// 100 people, one dot each. Leavers fade to empty "seats" rather than
// vanishing, so the visitor keeps seeing what they paid for and lost.
export default function VisitorField({ alive, recovered }: VisitorFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const dotsRef = useRef<Dot[]>(buildDots())

  // Retarget dots whenever the funnel state changes, staggering the changes
  // so people leave one after another instead of all at once.
  useEffect(() => {
    const now = performance.now()
    const changed: Dot[] = []
    for (const d of dotsRef.current) {
      let to = 0.1
      let tdy = 10
      let tp = 0
      if (d.rank < alive) {
        to = 1
        tdy = 0
      } else if (d.rank < alive + recovered) {
        to = 1
        tdy = 0
        tp = 1
      }
      if (to !== d.to || tp !== d.tp) changed.push(d)
      d.to = to
      d.tdy = tdy
      d.tp = tp
    }
    changed.sort((a, b) => b.rank - a.rank)
    const spread = Math.min(900, changed.length * 14)
    changed.forEach((d, i) => {
      d.startAt = now + (changed.length > 1 ? (i / (changed.length - 1)) * spread : 0)
    })
  }, [alive, recovered])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = 0
    let height = 0
    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = rect.width
      height = rect.height
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    let visible = true
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
    })
    io.observe(canvas)

    let raf = 0
    const draw = (t: number) => {
      raf = requestAnimationFrame(draw)
      if (!visible) return
      ctx.clearRect(0, 0, width, height)

      const size = Math.min(width, height)
      const offX = (width - size) / 2
      const offY = (height - size) / 2
      const baseR = (size / COLS) * 0.17

      for (const d of dotsRef.current) {
        if (t >= d.startAt) {
          d.o += (d.to - d.o) * 0.08
          d.dy += (d.tdy - d.dy) * 0.08
          d.p += (d.tp - d.p) * 0.08
        }
        const x = offX + d.gx * size
        const y = offY + d.gy * size + d.dy
        const lit = d.o > 0.5
        const r = baseR * (lit ? 1 + 0.06 * Math.sin(t / 900 + d.phase) : 1)
        const cr = Math.round(255 + (PINK[0] - 255) * d.p)
        const cg = Math.round(255 + (PINK[1] - 255) * d.p)
        const cb = Math.round(255 + (PINK[2] - 255) * d.p)

        ctx.beginPath()
        ctx.arc(x, y, r, 0, Math.PI * 2)
        ctx.shadowColor = `rgba(${cr},${cg},${cb},${0.9 * d.o})`
        ctx.shadowBlur = lit ? (d.p > 0.5 ? 22 : 12) : 0
        ctx.fillStyle = `rgba(${cr},${cg},${cb},${d.o})`
        ctx.fill()

        // Empty seat outline for visitors who left.
        if (d.o < 0.6) {
          ctx.shadowBlur = 0
          ctx.strokeStyle = `rgba(255,255,255,${0.22 * (1 - d.o)})`
          ctx.lineWidth = 1
          ctx.stroke()
        }
      }
      ctx.shadowBlur = 0
    }
    raf = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-label={`${alive + recovered} of 100 visitors remaining`}
      role="img"
      className="w-full h-full block"
    />
  )
}
