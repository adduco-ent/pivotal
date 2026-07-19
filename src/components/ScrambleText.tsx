import { useEffect, useRef, useState } from 'react'

const CHARS =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~|}{[]:;?><'

const randomChar = () => CHARS[Math.floor(Math.random() * CHARS.length)]

interface ScrambleTextProps {
  text: string
  isHovered: boolean
  className?: string
}

export default function ScrambleText({ text, isHovered, className }: ScrambleTextProps) {
  const [display, setDisplay] = useState(text)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }

    if (!isHovered) {
      setDisplay(text)
      return
    }

    let frame = 0
    intervalRef.current = setInterval(() => {
      frame++
      const revealed = Math.floor(frame / 4)
      let out = ''
      for (let i = 0; i < text.length; i++) {
        if (text[i] === ' ') {
          out += ' '
        } else if (i < revealed) {
          out += text[i]
        } else {
          out += randomChar()
        }
      }
      setDisplay(out)
      if (revealed >= text.length) {
        setDisplay(text)
        if (intervalRef.current) clearInterval(intervalRef.current)
      }
    }, 25)

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [isHovered, text])

  return <span className={className}>{display}</span>
}
