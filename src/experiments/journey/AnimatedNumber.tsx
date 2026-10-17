import { useEffect } from 'react'
import { motion, useSpring, useTransform } from 'framer-motion'

interface AnimatedNumberProps {
  value: number
  format?: (n: number) => string
  className?: string
  style?: React.CSSProperties
}

// Springs between values so counters roll instead of snapping — the drop from
// 100 to 2 should feel like people leaving, not a number changing.
export default function AnimatedNumber({
  value,
  format = (n) => Math.round(n).toString(),
  className,
  style,
}: AnimatedNumberProps) {
  const spring = useSpring(value, { stiffness: 55, damping: 18 })
  const display = useTransform(spring, (v) => format(v))

  useEffect(() => {
    spring.set(value)
  }, [value, spring])

  return (
    <motion.span className={className} style={style}>
      {display}
    </motion.span>
  )
}
