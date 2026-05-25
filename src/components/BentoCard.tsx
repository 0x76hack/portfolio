'use client'

import { useRef, useState } from 'react'

interface BentoCardProps {
  children: React.ReactNode
  className?: string
  glowColor?: string
  noPadding?: boolean
}

export default function BentoCard({
  children,
  className = '',
  glowColor = 'rgba(209, 178, 128, 0.04)', // Luxury champagne gold glow
  noPadding = false,
}: BentoCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [coords, setCoords] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    setCoords({ x, y })
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative overflow-hidden rounded-xl border border-white/5 bg-[#111317]/60 backdrop-blur-xl transition-all duration-300 hover:border-brand-accent/20 ${
        noPadding ? '' : 'p-6 md:p-8'
      } ${className}`}
    >
      {/* 21st.dev dot pattern overlay (kokonutd/bento-grid style) */}
      <div 
        className="pointer-events-none absolute inset-0 bento-dot-pattern opacity-40 group-hover:opacity-100 transition-opacity duration-300" 
      />

      {/* Dynamic Cursor Glow Layer */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(300px circle at ${coords.x}px ${coords.y}px, ${glowColor}, transparent 80%)`,
        }}
      />

      {/* Content wrapper */}
      <div className="relative z-10 h-full w-full flex flex-col justify-between">
        {children}
      </div>
    </div>
  )
}
