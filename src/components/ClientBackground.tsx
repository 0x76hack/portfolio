'use client'

import dynamic from 'next/dynamic'

// Dynamically load the ThreeBackground canvas with ssr: false inside a Client Component wrapper (Next.js 15/16 requirement)
const DynamicBackground = dynamic(() => import('@/components/ThreeBackground'), {
  ssr: false,
})

export default function ClientBackground() {
  return <DynamicBackground />
}
