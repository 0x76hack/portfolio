'use client'

import React, { useEffect, useRef } from 'react'

interface NeuralBackgroundProps {
  className?: string
  color?: string
  trailOpacity?: number
  particleCount?: number
  speed?: number
}

export default function NeuralBackground({
  className,
  color = '#c9a96e', // Champagne Gold from design tokens
  trailOpacity = 0.08, // Low opacity for beautiful long fluid trails
  particleCount = 700, // Balanced density for aesthetics & performance
  speed = 0.4, // Soft luxury drift speed
}: NeuralBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = container.clientWidth
    let height = container.clientHeight
    let particles: Particle[] = []
    let animationFrameId: number
    let mouse = { x: -1000, y: -1000 }

    class Particle {
      x: number
      y: number
      vx: number
      vy: number
      age: number
      life: number
      size: number
      speedFactor: number

      constructor() {
        this.x = Math.random() * width
        this.y = Math.random() * height
        this.vx = 0
        this.vy = 0
        this.age = 0
        this.life = Math.random() * 200 + 100
        this.size = Math.random() * 1.2 + 0.8 // Fine details between 0.8px and 2.0px
        this.speedFactor = Math.random() * 0.6 + 0.4 // Parallax velocity variance
      }

      update() {
        // Flow Field Math (Simplex/Perlin-noise simulation)
        // Uses position-based angle calculation to generate waves
        const angle = (Math.cos(this.x * 0.005) + Math.sin(this.y * 0.005)) * Math.PI

        this.vx += Math.cos(angle) * 0.15 * speed * this.speedFactor
        this.vy += Math.sin(angle) * 0.15 * speed * this.speedFactor

        // Mouse Repulsion Field
        const dx = mouse.x - this.x
        const dy = mouse.y - this.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        const interactionRadius = 160

        if (distance < interactionRadius) {
          const force = (interactionRadius - distance) / interactionRadius
          // Gently push particles away from the cursor
          this.vx -= dx * force * 0.03
          this.vy -= dy * force * 0.03
        }

        // Apply forces, friction, and drift
        this.x += this.vx
        this.y += this.vy
        this.vx *= 0.94 // High friction for a smooth fluid drift feel
        this.vy *= 0.94

        this.age++
        if (this.age > this.life) {
          this.reset()
        }

        // Wrap particles around borders
        if (this.x < 0) this.x = width
        if (this.x > width) this.x = 0
        if (this.y < 0) this.y = height
        if (this.y > height) this.y = 0
      }

      reset() {
        this.x = Math.random() * width
        this.y = Math.random() * height
        this.vx = 0
        this.vy = 0
        this.age = 0
        this.life = Math.random() * 200 + 100
      }

      draw(context: CanvasRenderingContext2D) {
        context.fillStyle = color
        // Smooth fade-in and fade-out based on age
        const alpha = 1 - Math.abs((this.age / this.life) - 0.5) * 2
        context.globalAlpha = alpha * 0.65 // Slightly transparent for a delicate feel
        context.fillRect(this.x, this.y, this.size, this.size)
      }
    }

    const init = () => {
      const dpr = window.devicePixelRatio || 1
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.scale(dpr, dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`

      particles = []
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle())
      }
    }

    const animate = () => {
      // Clear with --bg-base color `#090a0c` (rgba(9, 10, 12, trailOpacity)) for design consistency
      ctx.fillStyle = `rgba(9, 10, 12, ${trailOpacity})`
      ctx.fillRect(0, 0, width, height)

      particles.forEach((p) => {
        p.update()
        p.draw(ctx)
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    const handleResize = () => {
      width = container.clientWidth
      height = container.clientHeight
      init()
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
    }

    const handleMouseLeave = () => {
      mouse.x = -1000
      mouse.y = -1000
    }

    init()
    animate()

    window.addEventListener('resize', handleResize)
    container.addEventListener('mousemove', handleMouseMove)
    container.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      window.removeEventListener('resize', handleResize)
      container.removeEventListener('mousemove', handleMouseMove)
      container.removeEventListener('mouseleave', handleMouseLeave)
      cancelAnimationFrame(animationFrameId)
    }
  }, [color, trailOpacity, particleCount, speed])

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 -z-20 pointer-events-none bg-bg-base overflow-hidden w-screen h-screen ${
        className || ''
      }`}
    >
      <canvas ref={canvasRef} className="block w-full h-full" />
      
      {/* Warm radial vignette overlay — blends trails naturally into the edges */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_90%_90%_at_50%_50%,transparent_15%,var(--bg-base)_95%)]" />

      {/* Bottom fade for content legibility */}
      <div className="absolute left-0 right-0 bottom-0 h-40 pointer-events-none bg-gradient-to-t from-bg-base to-transparent" />
    </div>
  )
}
