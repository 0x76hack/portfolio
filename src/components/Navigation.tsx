'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Projects', path: '/#projects' },
  { label: 'About', path: '/#about' },
  { label: 'Contact', path: '/contact' },
]

export default function Navigation() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b ${
        scrolled
          ? 'bg-[#090a0c]/90 backdrop-blur-md border-white/5 py-4'
          : 'bg-transparent border-transparent py-6 lg:py-8'
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-3 group focus-visible:outline-none"
          aria-label="Vaishak S Home"
        >
          <span className="font-sans text-white text-base lg:text-lg font-semibold tracking-[0.2em] uppercase transition-colors group-hover:text-brand-accent">
            VAISHAK S
          </span>
        </Link>

        {/* Center: Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-10" aria-label="Main navigation">
          {navLinks.map((link) => {
            const isActive = pathname === link.path || (link.path.startsWith('/#') && pathname === '/')
            return (
              <Link
                key={link.label}
                href={link.path}
                className={`font-sans text-[11px] lg:text-xs uppercase tracking-[0.15em] transition-all duration-200 py-1 border-b ${
                  isActive 
                    ? 'text-brand-accent border-brand-accent' 
                    : 'text-fg-secondary border-transparent hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>

        {/* Right: Clean Muted Accent */}
        <div className="hidden md:block">
          <Link
            href="/contact"
            className="font-sans text-[10px] lg:text-[11px] uppercase tracking-[0.2em] border border-white/10 px-5 py-2 hover:border-brand-accent hover:text-brand-accent transition-all duration-300 rounded-full"
          >
            Get In Touch
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden flex items-center justify-center w-8 h-8 border border-white/10 hover:border-white text-white rounded bg-[#111317]/80 backdrop-blur-md transition-colors"
          aria-expanded={isOpen}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </button>
      </div>

      {/* Mobile navigation overlay */}
      <div
        className={`fixed inset-0 top-[65px] bg-[#090a0c]/98 backdrop-blur-xl border-t border-white/5 z-40 transition-transform duration-300 md:hidden flex flex-col justify-center p-8 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <nav className="flex flex-col gap-6 items-start">
          {navLinks.map((link) => {
            const isActive = pathname === link.path || (link.path.startsWith('/#') && pathname === '/')
            return (
              <Link
                key={link.label}
                href={link.path}
                onClick={() => setIsOpen(false)}
                className={`w-full text-left py-3 text-lg font-sans uppercase tracking-[0.15em] border-b border-white/5 flex items-center justify-between ${
                  isActive ? 'text-brand-accent' : 'text-fg-secondary'
                }`}
              >
                <span>{link.label}</span>
                {isActive && <span className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-pulse" />}
              </Link>
            )
          })}
        </nav>
        
        <div className="mt-16 font-sans text-[9px] text-fg-muted flex flex-col gap-1 border-t border-white/5 pt-6 w-full tracking-[0.1em]">
          <div>VAISHAK S. — BACKEND & SYSTEMS ARCHITECT</div>
        </div>
      </div>
    </header>
  )
}
