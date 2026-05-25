'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Respect user accessibility: disable scroll physics if reduced motion is requested (Section 3.5 & 3.7)
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    // Initialize Lenis smooth scroll engine
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // smooth exponential deceleration
      smoothWheel: true,
      wheelMultiplier: 0.95,
    })

    let animationFrameId: number

    // Frame update loop
    const update = (time: number) => {
      lenis.raf(time)
      animationFrameId = requestAnimationFrame(update)
    }

    animationFrameId = requestAnimationFrame(update)

    // Cleanup resources
    return () => {
      lenis.destroy()
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return <>{children}</>
}
