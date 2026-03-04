"use client"

import { useRef, type ReactNode, type ElementType } from 'react'
import { useInView } from 'framer-motion'
import { useReducedMotion } from './use-reduced-motion'

interface AnimatedElementProps {
  children: ReactNode
  as?: ElementType
  className?: string
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right'
}

export function AnimatedElement({
  children,
  as: Component = 'div',
  className,
  delay = 0,
  direction = 'up'
}: AnimatedElementProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const reducedMotion = useReducedMotion()

  const transforms = {
    up: "translateY(30px)",
    down: "translateY(-30px)",
    left: "translateX(30px)",
    right: "translateX(-30px)"
  }

  return (
    <Component
      ref={ref}
      className={className}
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? "translate(0)" : transforms[direction],
        transition: reducedMotion
          ? "none"
          : `opacity 0.5s ease-out ${delay}s, transform 0.5s ease-out ${delay}s`
      }}
    >
      {children}
    </Component>
  )
}
