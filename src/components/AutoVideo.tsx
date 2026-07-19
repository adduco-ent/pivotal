import { useEffect, useRef } from 'react'

interface AutoVideoProps {
  src: string
  className?: string
  playbackRate?: number
  /**
   * Optional custom loop window (seconds). When both are set, playback wraps
   * from loopEnd back to loopStart instead of the clip's true ends — used to
   * cut the loop on a measured pair of near-identical frames so the restart
   * is invisible. Checked per displayed frame via requestVideoFrameCallback.
   */
  loopStart?: number
  loopEnd?: number
}

// React doesn't reliably render the `muted` attribute into the DOM, which
// makes browsers block autoplay — set it imperatively. Playback is gated by
// an IntersectionObserver so off-screen videos don't burn decode time. A
// single native-loop <video> means zero double-decode overhead.
export default function AutoVideo({
  src,
  className,
  playbackRate = 1,
  loopStart,
  loopEnd,
}: AutoVideoProps) {
  const ref = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = ref.current
    if (!video) return
    video.muted = true
    video.defaultMuted = true
    video.playbackRate = playbackRate

    let visible = false
    const play = () => {
      if (visible) video.play().catch(() => {})
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting
        if (visible) play()
        else video.pause()
      },
      { rootMargin: '200px' },
    )
    observer.observe(video)
    video.addEventListener('canplay', play)

    // Custom loop window: wrap on the measured best-matching frame pair.
    let rvfcId: number | undefined
    let onTime: (() => void) | undefined
    type RVFCVideo = HTMLVideoElement & {
      requestVideoFrameCallback?: (cb: () => void) => number
      cancelVideoFrameCallback?: (id: number) => void
    }
    const rvfcVideo = video as RVFCVideo
    if (loopStart !== undefined && loopEnd !== undefined) {
      const wrap = () => {
        if (video.currentTime >= loopEnd) video.currentTime = loopStart
      }
      if (typeof rvfcVideo.requestVideoFrameCallback === 'function') {
        const check = () => {
          wrap()
          rvfcId = rvfcVideo.requestVideoFrameCallback!(check)
        }
        rvfcId = rvfcVideo.requestVideoFrameCallback(check)
      } else {
        onTime = wrap
        video.addEventListener('timeupdate', onTime)
      }
    }

    return () => {
      observer.disconnect()
      video.removeEventListener('canplay', play)
      if (onTime) video.removeEventListener('timeupdate', onTime)
      if (rvfcId !== undefined && rvfcVideo.cancelVideoFrameCallback) {
        rvfcVideo.cancelVideoFrameCallback(rvfcId)
      }
    }
  }, [playbackRate, loopStart, loopEnd])

  return (
    <video
      ref={ref}
      src={src}
      muted
      loop
      playsInline
      preload="auto"
      className={className}
      style={{ transform: 'translateZ(0)' }}
    />
  )
}
