import { useRef } from 'react'
import { useInView } from 'framer-motion'
import ScrambleIn from './ScrambleIn'

interface ScrambleLabelProps {
  text: string
  className?: string
}

// Section eyebrow: scrambles in when scrolled into view (the site's signature
// text gesture) and ends with the single magenta accent for the section.
export default function ScrambleLabel({ text, className }: ScrambleLabelProps) {
  const ref = useRef<HTMLParagraphElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.8 })

  return (
    <p ref={ref} className={className}>
      <ScrambleIn text={text} delay={150} triggered={inView} />
      <span style={{ color: '#d96aa8' }}>.</span>
    </p>
  )
}
