'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { SharePageClient } from '@/components/SharePageClient'

function SharePageContent() {
  const searchParams = useSearchParams()
  const id = searchParams.get('id') || ''
  
  return <SharePageClient id={id} />
}

export default function SharePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SharePageContent />
    </Suspense>
  )
}
