import type { Metadata } from 'next'
import { Cormorant_Garamond, Geist, Geist_Mono } from 'next/font/google'
import Navigation from '@/components/Navigation'
import ClientBackground from '@/components/ClientBackground'
import SmoothScroll from '@/components/SmoothScroll'
import './globals.css'

// Load Google Fonts (Section 5.2 - next/font for every font)
const cormorantGaramond = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-cormorant-garamond',
  display: 'swap',
})

const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
})

// Metadata API configuration (Section 7)
export const metadata: Metadata = {
  title: {
    default: 'Vaishak S — Backend Developer & Systems Architect',
    template: '%s | Vaishak S',
  },
  description:
    'Backend Engineer specializing in high-concurrency Spring Boot, PostgreSQL, Redis, and secure systems architecture. M.Tech Cyber Security student.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://vaishaks.dev',
    siteName: 'Vaishak S',
    title: 'Vaishak S — Backend Developer & Systems Architect',
    description:
      'Backend Engineer specializing in high-concurrency Spring Boot, PostgreSQL, Redis, and secure systems architecture.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vaishak S — Backend Developer',
    description:
      'Backend Engineer specializing in high-concurrency Spring Boot, PostgreSQL, Redis, and secure systems architecture.',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${cormorantGaramond.variable} ${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col selection:bg-brand-accent selection:text-fg-primary">
        {/* Client-side dynamic background wrapper (UnicornStudio) */}
        <ClientBackground />
        
        {/* Shared sticky navigation */}
        <Navigation />
        
        {/* Friction-based inertia scroll (Lenis) wrapper */}
        <SmoothScroll>
          {/* Main page layout */}
          <main className="flex-grow flex flex-col pt-[80px]" id="main-content">
            {children}
          </main>
        </SmoothScroll>
      </body>
    </html>
  )
}
