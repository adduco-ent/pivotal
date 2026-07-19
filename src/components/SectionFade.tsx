interface SectionFadeProps {
  position: 'top' | 'bottom'
  height?: number
}

// Blends a video section into the black page background so adjacent
// sections flow into each other without a hard edge.
export default function SectionFade({ position, height = 180 }: SectionFadeProps) {
  return (
    <div
      className={`absolute left-0 right-0 z-10 pointer-events-none ${
        position === 'top' ? 'top-0' : 'bottom-0'
      }`}
      style={{
        height,
        background:
          position === 'top'
            ? 'linear-gradient(to bottom, #000, transparent)'
            : 'linear-gradient(to bottom, transparent, #000)',
      }}
    />
  )
}
