'use client'

import { useState } from 'react'
import AssessmentForm from '@/components/assessment/AssessmentForm'
import { Card } from '@/components/ui/card'
import { AnalysisReport } from '@/components/analysis'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function AssessPage() {
  const [result, setResult] = useState<any>(null)

  const renderResult = () => {
    if (!result) return null
    return (
      <div className="space-y-6">
        <AnalysisReport result={result} />
        <div className="text-center">
          <Link href="/" className="inline-block">
            <Button variant="outline" size="lg" className="mt-8">
              返回首页
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600/90 via-pink-500/90 to-red-500/90 py-32">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="p-8 border-0 bg-white/95 backdrop-blur-sm">
          <div className="text-center mb-12">
            <Link href="/" className="inline-block mb-8">
              <Button variant="ghost" size="sm" className="text-gray-500">
                ← 返回首页
              </Button>
            </Link>
            <h1 className="text-4xl font-bold text-gray-900 mb-3">灵魂契合度测试</h1>
            <p className="text-gray-500">填写以下信息，获取你们的匹配分析</p>
          </div>
          <AssessmentForm onComplete={setResult} />
        </Card>
        {renderResult()}
      </div>
    </div>
  )
}
