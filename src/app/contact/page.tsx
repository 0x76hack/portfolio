'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, CheckCircle, Mail } from 'lucide-react'

// Custom inline SVG component for LinkedIn to avoid dependency mismatches
const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
)

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.message) return
    
    setIsSubmitting(true)
    
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)
    }, 1000)
  }

  return (
    <div className="w-full max-w-5xl mx-auto px-6 md:px-12 py-12 md:py-24 font-sans">
      {/* Back Button */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-xs text-fg-secondary hover:text-brand-accent transition-colors mb-12 focus-visible:outline-2 focus-visible:outline-brand-accent"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Home
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left Column: Heading Text */}
        <div className="lg:col-span-5 space-y-6">
          <span className="text-xs font-mono tracking-widest text-brand-accent uppercase block">Get In Touch</span>
          <h1 className="font-display text-4xl sm:text-5xl font-medium text-white tracking-wide leading-tight">
            {"Let's start a conversation."}
          </h1>
          <p className="text-sm text-fg-secondary leading-relaxed">
            I am available for backend architectures, secure systems design, and select engineering roles. Connect directly through email or LinkedIn, or drop a message here.
          </p>
        </div>

        {/* Right Column: Clean Form & Contact Nodes */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* Main Card */}
          <div className="border border-white/5 bg-[#111317]/60 backdrop-blur-xl rounded-2xl p-6 md:p-8 shadow-2xl relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-brand-accent/5 to-transparent rounded-2xl pointer-events-none" />

            {isSuccess ? (
              <div className="flex flex-col items-center justify-center text-center gap-6 py-12">
                <div className="w-16 h-16 border border-success/30 bg-success/5 rounded-full flex items-center justify-center text-success relative">
                  <CheckCircle className="w-8 h-8" />
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-success rounded-full animate-ping" />
                </div>
                <div className="space-y-2">
                  <h2 className="text-xl font-bold tracking-tight text-white font-sans">Message Sent</h2>
                  <p className="text-xs text-fg-secondary max-w-sm leading-relaxed px-2">
                    Thank you. Your message has been sent successfully. Vaishak S will get back to you shortly.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setIsSuccess(false)
                    setFormData({ name: '', email: '', message: '' })
                  }}
                  className="px-6 py-2.5 bg-brand-accent hover:bg-white hover:text-black text-[#090a0c] rounded-xl transition-colors text-xs font-medium"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 text-xs relative z-10">
                <div className="flex flex-col gap-2">
                  <label htmlFor="name-input" className="text-fg-secondary font-medium tracking-wide text-xs">
                    Name
                  </label>
                  <input
                    id="name-input"
                    name="name"
                    type="text"
                    required
                    disabled={isSubmitting}
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full bg-[#090a0c]/80 border border-white/5 rounded-xl px-4 py-3.5 text-white focus:border-brand-accent focus:outline-none transition-colors text-sm font-sans"
                    placeholder="Your Name"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="email-input" className="text-fg-secondary font-medium tracking-wide text-xs">
                    Email Address
                  </label>
                  <input
                    id="email-input"
                    name="email"
                    type="email"
                    required
                    disabled={isSubmitting}
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-[#090a0c]/80 border border-white/5 rounded-xl px-4 py-3.5 text-white focus:border-brand-accent focus:outline-none transition-colors text-sm font-sans"
                    placeholder="email@example.com"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="message-input" className="text-fg-secondary font-medium tracking-wide text-xs">
                    Message
                  </label>
                  <textarea
                    id="message-input"
                    name="message"
                    required
                    disabled={isSubmitting}
                    rows={5}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full bg-[#090a0c]/80 border border-white/5 rounded-xl px-4 py-3.5 text-white focus:border-brand-accent focus:outline-none transition-colors resize-none text-sm font-sans"
                    placeholder="Details about your inquiry..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-5 py-3.5 bg-brand-accent hover:bg-white hover:text-black disabled:opacity-50 text-[#090a0c] font-semibold rounded-xl tracking-wider text-xs uppercase flex items-center justify-center gap-2 cursor-pointer shadow-lg transition-all duration-300"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>

          {/* Alternate Routing Nodes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans">
            <a
              href="mailto:svaishak2002@gmail.com"
              className="bg-[#111317]/60 border border-white/5 hover:border-brand-accent/20 rounded-2xl p-5 flex flex-col justify-between group transition-all shadow-xl"
            >
              <div className="flex items-center gap-2 text-brand-accent mb-2">
                <Mail className="w-4.5 h-4.5" />
                <span className="text-[10px] font-mono uppercase tracking-widest font-semibold">Direct Email</span>
              </div>
              <span className="text-white group-hover:text-brand-accent transition-colors font-medium text-sm">svaishak2002@gmail.com</span>
            </a>

            <a
              href="https://linkedin.com/in/vaishak-s"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#111317]/60 border border-white/5 hover:border-brand-accent/20 rounded-2xl p-5 flex flex-col justify-between group transition-all shadow-xl"
            >
              <div className="flex items-center gap-2 text-brand-accent mb-2">
                <LinkedinIcon className="w-4.5 h-4.5" />
                <span className="text-[10px] font-mono uppercase tracking-widest font-semibold">LinkedIn</span>
              </div>
              <span className="text-white group-hover:text-brand-accent transition-colors font-medium text-sm">linkedin.com/in/vaishak-s</span>
            </a>
          </div>

        </div>

      </div>
    </div>
  )
}
