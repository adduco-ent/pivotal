import { useEffect, useRef } from 'react'

interface CrossfadeLoopVideoProps {
  src: string
  className?: string
  fadeSeconds?: number
  playbackRate?: number
}

// Seamless-loop player: two stacked copies of the same clip. As the active
// copy approaches its end, the standby copy starts from 0 and fades in over
// the top, dissolving the loop seam entirely — no restart is ever visible,
// even if the clip's first and last frames don't match perfectly.
export default function CrossfadeLoopVideo({
  src,
  className,
  fadeSeconds = 1.5,
  playbackRate = 1,
}: CrossfadeLoopVideoProps) {
  const wrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const wrap = wrapRef.current
    if (!wrap) return
    const videos = wrap.querySelectorAll('video')
    if (videos.length < 2) return
    const a = videos[0]
    const b = videos[1]
    for (const v of [a, b]) {
      v.muted = true
      v.defaultMuted = true
      v.playbackRate = playbackRate
    }

    let active = a
    let standby = b
    let visible = false
    let fading = false

    const tryPlay = (v: HTMLVideoElement) => {
      if (!visible) return
      v.muted = true
      v.defaultMuted = true
      const p = v.play()
      if (p !== undefined) {
        p.catch(() => {
          const unlock = () => {
            if (visible) v.play().catch(() => {})
          }
          window.addEventListener('touchstart', unlock, { once: true })
          window.addEventListener('scroll', unlock, { once: true })
          window.addEventListener('pointerdown', unlock, { once: true })
        })
      }
    }

    const tick = () => {
      if (!visible || fading) return
      const duration = active.duration
      if (!duration) return
      if (active.currentTime >= duration - fadeSeconds) {
        fading = true
        const outgoing = active
        const incoming = standby
        incoming.currentTime = 0
        incoming.playbackRate = playbackRate
        tryPlay(incoming)
        incoming.style.opacity = '1'
        outgoing.style.opacity = '0'
        active = incoming
        standby = outgoing
        setTimeout(() => {
          outgoing.pause()
          fading = false
        }, fadeSeconds * 1000)
      }
    }

    const interval = setInterval(tick, 80)

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting
        if (visible) tryPlay(active)
        else {
          a.pause()
          b.pause()
        }
      },
      { rootMargin: '200px' },
    )
    observer.observe(wrap)

    return () => {
      clearInterval(interval)
      observer.disconnect()
    }
  }, [src, fadeSeconds, playbackRate])

  const videoStyle = (initialOpacity: number): React.CSSProperties => ({
    transform: 'translateZ(0)',
    transition: `opacity ${fadeSeconds}s linear`,
    opacity: initialOpacity,
  })

  return (
    <div ref={wrapRef} className={className}>
      <video
        src={src}
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
        style={videoStyle(1)}
      />
      <video
        src={src}
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
        style={videoStyle(0)}
      />
    </div>
  )
}
