'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'

// 使用 dynamic import 并禁用 SSR
const PredictionForm = dynamic(() => import('./PredictionForm'), {
  ssr: false,
  loading: () => (
    <div className="animate-pulse space-y-4">
      <div className="h-12 bg-gray-200 rounded"></div>
      <div className="h-32 bg-gray-200 rounded"></div>
      <div className="h-32 bg-gray-200 rounded"></div>
      <div className="h-12 bg-gray-200 rounded"></div>
    </div>
  ),
})

export default function ClientContainer() {
  // 使用 state 来控制组件的挂载
  const [isMounted, setIsMounted] = useState(false)

  // 在客户端挂载后再显示组件
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // 在服务端或未挂载时显示加载状态
  if (!isMounted) {
    return (
      <div className="w-full max-w-2xl mx-auto">
        <div className="animate-pulse space-y-4">
          <div className="h-12 bg-gray-200 rounded"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
          <div className="h-12 bg-gray-200 rounded"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <PredictionForm />
    </div>
  )
}
