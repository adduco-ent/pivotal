import Lenis from 'lenis'

let lenis: Lenis | null = null
let rafId = 0

export function initSmoothScroll() {
  if (lenis) return lenis
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return null
  lenis = new Lenis({
    lerp: 0.1,
    smoothWheel: true,
  })

  const raf = (time: number) => {
    lenis?.raf(time)
    rafId = requestAnimationFrame(raf)
  }
  rafId = requestAnimationFrame(raf)
  return lenis
}

export function destroySmoothScroll() {
  cancelAnimationFrame(rafId)
  lenis?.destroy()
  lenis = null
}

export function setScrollPaused(paused: boolean) {
  if (!lenis) return
  if (paused) lenis.stop()
  else lenis.start()
}

export function scrollToY(top: number) {
  if (lenis) {
    lenis.scrollTo(top, { duration: 1.2 })
  } else {
    window.scrollTo({ top, behavior: 'smooth' })
  }
}
