"use client"

import { useRef, useEffect, useState } from 'react'
import { useInView } from 'framer-motion'
import { useReducedMotion } from './use-reduced-motion'

interface CounterProps {
  target: number
  duration?: number
  suffix?: string
  prefix?: string
  className?: string
}

export function Counter({
  target,
  duration = 2000,
  suffix = '',
  prefix = '',
  className
}: CounterProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const reducedMotion = useReducedMotion()
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isInView) return

    if (reducedMotion) {
      setCount(target)
      return
    }

    const increment = target / (duration / 16)
    let current = 0

    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, 16)

    return () => clearInterval(timer)
  }, [isInView, target, duration, reducedMotion])

  return (
    <span ref={ref} className={className}>
      {prefix}{count}{suffix}
    </span>
  )
}
