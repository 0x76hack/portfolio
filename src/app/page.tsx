'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, Variants } from 'framer-motion'
import { ArrowUpRight, Award, Download } from 'lucide-react'
import BentoCard from '@/components/BentoCard'

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

const stagger: Variants = {
  visible: { transition: { staggerChildren: 0.05 } },
}

export default function Home() {
  const [greeting, setGreeting] = useState('Welcome')

  useEffect(() => {
    const hours = new Date().getHours()
    let activeGreeting = 'Welcome'
    if (hours < 12) activeGreeting = 'Good Morning'
    else if (hours < 18) activeGreeting = 'Good Afternoon'
    else activeGreeting = 'Good Evening'

    const timer = setTimeout(() => {
      setGreeting(activeGreeting)
    }, 0)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="w-full min-h-screen bg-transparent relative font-sans">
      <div className="w-full flex flex-col lg:flex-row min-h-[calc(100vh-80px-6vh)]">
        
        {/* Left Pane: Fixed showcase profile card on desktop */}
        <div className="w-full lg:w-[40%] lg:fixed lg:left-0 lg:top-[80px] lg:h-[calc(100vh-80px-6vh)] flex flex-col items-center justify-center p-6 lg:p-12 z-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-sm bg-[#111317]/60 border border-white/5 backdrop-blur-xl rounded-2xl p-6 lg:p-8 flex flex-col items-center text-center gap-6 shadow-2xl relative"
          >
            {/* Subtle brand glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-brand-accent/5 to-transparent rounded-2xl pointer-events-none" />

            {/* Profile Image container */}
            <div className="relative w-40 h-40 lg:w-44 lg:h-44 rounded-full overflow-hidden border border-white/10 group shadow-lg">
              <Image
                src="/profile_pic.jpeg"
                alt="Vaishak S"
                fill
                sizes="(max-width: 1024px) 160px, 176px"
                priority
                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-105 group-hover:scale-100"
              />
            </div>

            {/* Profile Meta info */}
            <div className="space-y-2">
              <h2 className="text-xl lg:text-2xl font-bold tracking-wider text-white uppercase font-sans">
                Vaishak S
              </h2>
              <p className="text-xs text-brand-accent uppercase tracking-widest font-mono font-medium">
                Systems & Backend Architect
              </p>
              <p className="text-xs text-fg-secondary leading-relaxed px-2 mt-2 font-sans">
                Specializing in high-concurrency Java systems, secure transactional API design, and web app hardening.
              </p>
            </div>

            {/* Resume Working PDF Download Button */}
            <a
              href="/Vaishak_S_Backend_Developer.pdf"
              download="Vaishak_S_Backend_Developer.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 bg-brand-accent text-[#090a0c] font-sans font-semibold text-xs rounded-xl hover:bg-white hover:text-black transition-all duration-300 flex items-center justify-center gap-2 group shadow-lg cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
              <span>Download Resume</span>
            </a>
          </motion.div>
        </div>

        {/* Right Pane: Scrollable Content */}
        <div className="w-full lg:w-[60%] lg:ml-[40%] px-6 md:px-12 lg:px-20 py-12 lg:py-16 flex flex-col gap-24 z-10 pb-[10vh]">
          
          {/* HERO SECTION */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="flex flex-col gap-6"
          >
            <motion.span variants={fadeUp} className="text-xs font-mono tracking-widest text-brand-accent uppercase">
              {greeting}
            </motion.span>
            
            <motion.h1 
              variants={fadeUp} 
              className="font-display text-4xl sm:text-5xl lg:text-6xl text-white font-medium leading-[1.1] tracking-wide"
            >
              Designing resilient architectures for high-concurrency services.
            </motion.h1>

            <motion.p 
              variants={fadeUp} 
              className="text-sm lg:text-base text-fg-secondary leading-relaxed max-w-xl font-sans"
            >
              I build reliable backends utilizing Spring Boot, Redis, and PostgreSQL. Currently pursuing an M.Tech in Cyber Security at IIIT Sri City to combine core software design with threat modeling and cryptographic defenses.
            </motion.p>

            {/* Action buttons */}
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 mt-2 font-sans">
              <Link
                href="#projects"
                className="px-6 py-3 border border-brand-accent text-brand-accent hover:bg-brand-accent/10 rounded-xl font-medium text-xs tracking-wider uppercase transition-all duration-300 text-center"
              >
                View Projects
              </Link>
              
              <Link
                href="/contact"
                className="px-6 py-3 bg-[#111317]/80 hover:bg-[#1a1c22]/80 text-white rounded-xl font-medium text-xs tracking-wider uppercase border border-white/5 transition-all duration-300 text-center"
              >
                Contact Me
              </Link>
            </motion.div>
          </motion.div>

          {/* PROJECTS SECTION */}
          <section id="projects" className="flex flex-col gap-8 scroll-mt-28 font-sans">
            <div className="border-b border-white/5 pb-4">
              <span className="text-[10px] font-mono text-brand-accent block tracking-widest uppercase">Systems Archive</span>
              <h2 className="text-2xl font-display font-medium text-white tracking-wide mt-1">
                Featured Work
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {/* Project 1: Flash Sale Engine */}
              <BentoCard className="flex flex-col justify-between group" noPadding>
                <div className="p-6 md:p-8 space-y-4">
                  <div className="flex items-center justify-between border-b border-white/5 pb-3 text-[10px] text-fg-secondary font-mono">
                    <span>JAVA · SPRING BOOT · REDIS</span>
                    <span>01 / ARCHIVE</span>
                  </div>
                  
                  <h3 className="text-lg font-bold text-white uppercase group-hover:text-brand-accent transition-colors font-sans">
                    Flash Sale Concurrency Engine
                  </h3>
                  
                  <p className="text-xs lg:text-sm text-fg-secondary leading-relaxed font-sans">
                    A high-concurrency backend built to process 5,000+ purchases/sec without database overselling. Resolves race conditions via Redis token-bucket inventory pre-decrements and transactional rollback buffers.
                  </p>

                  <div className="grid grid-cols-2 gap-4 text-[10px] text-fg-secondary pt-2">
                    <div>
                      <span className="text-fg-muted uppercase block font-mono">Lock Method</span>
                      <span className="text-white font-medium font-sans">Redis Cache Tokens</span>
                    </div>
                    <div>
                      <span className="text-fg-muted uppercase block font-mono">Persistence</span>
                      <span className="text-white font-medium font-sans">PostgreSQL ACID Ledgers</span>
                    </div>
                  </div>
                </div>

                <Link
                  href="/work/flash-sale-engine"
                  className="border-t border-white/5 px-6 py-4 flex items-center justify-between text-[11px] font-mono tracking-wider hover:bg-white/[0.02] text-white transition-all cursor-pointer"
                >
                  <span className="group-hover:text-brand-accent transition-colors uppercase">Read Case Study</span>
                  <ArrowUpRight className="w-4 h-4 text-fg-secondary group-hover:text-brand-accent transition-colors" />
                </Link>
              </BentoCard>

              {/* Project 2: PayFlow fintech */}
              <BentoCard className="flex flex-col justify-between group" noPadding>
                <div className="p-6 md:p-8 space-y-4">
                  <div className="flex items-center justify-between border-b border-white/5 pb-3 text-[10px] text-fg-secondary font-mono">
                    <span>SPRING SECURITY · JWT · POSTGRESQL</span>
                    <span>02 / ARCHIVE</span>
                  </div>
                  
                  <h3 className="text-lg font-bold text-white uppercase group-hover:text-brand-accent transition-colors font-sans">
                    PayFlow Secure Fintech API
                  </h3>
                  
                  <p className="text-xs lg:text-sm text-fg-secondary leading-relaxed font-sans">
                    A banking API broker designed with transaction-safe wallet ledgers and stateless signature security. Mitigates state conflicts using isolating database locks and parses request structures strictly with validation DTO layers.
                  </p>

                  <div className="grid grid-cols-2 gap-4 text-[10px] text-fg-secondary pt-2">
                    <div>
                      <span className="text-fg-muted uppercase block font-mono">Auth Model</span>
                      <span className="text-white font-medium font-sans">Stateless RS-256 JWT</span>
                    </div>
                    <div>
                      <span className="text-fg-muted uppercase block font-mono">Transaction Wrap</span>
                      <span className="text-white font-medium font-sans">Spring @Transactional</span>
                    </div>
                  </div>
                </div>

                <Link
                  href="/work/payflow"
                  className="border-t border-white/5 px-6 py-4 flex items-center justify-between text-[11px] font-mono tracking-wider hover:bg-white/[0.02] text-white transition-all cursor-pointer"
                >
                  <span className="group-hover:text-brand-accent transition-colors uppercase">Read Case Study</span>
                  <ArrowUpRight className="w-4 h-4 text-fg-secondary group-hover:text-brand-accent transition-colors" />
                </Link>
              </BentoCard>
            </div>
          </section>

          {/* ABOUT NARRATIVE SECTION */}
          <section id="about" className="flex flex-col gap-8 scroll-mt-28 font-sans">
            <div className="border-b border-white/5 pb-4">
              <span className="text-[10px] font-mono text-brand-accent block tracking-widest uppercase">Engineer Profile</span>
              <h2 className="text-2xl font-display font-medium text-white tracking-wide mt-1">
                Background & Process
              </h2>
            </div>

            <BentoCard className="space-y-6" noPadding>
              <div className="p-6 md:p-8 space-y-6">
                <div className="text-xs sm:text-sm text-fg-secondary leading-relaxed space-y-4 font-sans">
                  <p>
                    I approach systems development with a strong focus on database integrity, query optimization, and validation bounds. I analyze transaction sequences to eliminate race conditions and security leaks before they reach the production layer.
                  </p>
                  <p>
                    My online Master of Technology in Cyber Security at IIIT Sri City expands this focus. It provides rigorous academic foundations in threat modeling, cryptography, and access control policies that guide my architectural choices in microservices and web application design.
                  </p>
                  <p>
                    In my previous role as a Web Security Analyst II at Sitelock, I analyzed server compromises and hardened web configurations. This practical exposure to exploits shapes my current backend development practices, reinforcing a zero-trust model at the API gateway and database transaction boundaries.
                  </p>
                </div>

                {/* Timeline */}
                <div className="border-t border-white/5 pt-6 space-y-4 text-xs font-sans">
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-1 border-b border-white/5 pb-3">
                    <div>
                      <span className="text-white font-bold block">M.Tech Cyber Security</span>
                      <span className="text-fg-secondary text-[11px]">IIIT Sri City</span>
                    </div>
                    <span className="text-brand-accent font-mono text-[10px]">2025 — 2027</span>
                  </div>
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-1 border-b border-white/5 pb-3">
                    <div>
                      <span className="text-white font-bold block">Web Security Analyst II</span>
                      <span className="text-fg-secondary text-[11px]">Sitelock</span>
                    </div>
                    <span className="text-brand-accent font-mono text-[10px]">2024 — 2025</span>
                  </div>
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-1">
                    <div>
                      <span className="text-white font-bold block">B.Tech Electronics & Communication</span>
                      <span className="text-fg-secondary text-[11px]">Amrita School of Engineering</span>
                    </div>
                    <span className="text-brand-accent font-mono text-[10px]">2019 — 2023</span>
                  </div>
                </div>

                <div className="border-t border-white/5 pt-4 flex items-center justify-between text-[11px] text-fg-secondary font-sans">
                  <span className="font-mono text-[10px] text-fg-muted uppercase">Certification:</span>
                  <span className="text-brand-accent font-semibold flex items-center gap-1.5">
                    <Award className="w-4 h-4" /> CompTIA Security+ (Active)
                  </span>
                </div>
              </div>
            </BentoCard>
          </section>

          {/* FOOTER */}
          <footer className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-fg-muted font-sans">
            <div>
              <span>© {new Date().getFullYear()} Vaishak S. All rights reserved.</span>
            </div>
            <div className="flex gap-6 uppercase tracking-wider text-[11px] font-mono">
              <a href="https://github.com/0x76hack" target="_blank" rel="noopener noreferrer" className="hover:text-brand-accent transition-colors">Github</a>
              <a href="https://linkedin.com/in/vaishak-s" target="_blank" rel="noopener noreferrer" className="hover:text-brand-accent transition-colors">Linkedin</a>
              <Link href="/contact" className="hover:text-brand-accent transition-colors">Contact</Link>
            </div>
          </footer>

        </div>
      </div>

      {/* Elegant Bottom Footer Bar - Minimalist Editorial styling */}
      <div className="fixed left-0 right-0 z-30 border-t border-white/5 bg-[#090a0c]/85 backdrop-blur-md bottom-0 h-[6vh] flex items-center">
        <div className="container mx-auto px-6 md:px-12 flex items-center justify-between text-[10px] text-fg-secondary font-mono">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-pulse" />
            <span className="tracking-wider">PORTFOLIO.V2</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline">VAISHAK S · ARCHITECTURE & SECURITY</span>
            <span className="text-brand-accent font-medium">IIIT SRI CITY</span>
          </div>
        </div>
      </div>
    </div>
  )
}
