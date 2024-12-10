'use client'

import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { Loader2, Share2 } from 'lucide-react'
import { AnalysisReport } from '@/components/AnalysisReport'
import { ShareResultPanel } from '@/components/ShareResultPanel'

export default function SharePage({ params }: { params: { id: string } }) {
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const router = useRouter()

  useEffect(() => {
    const fetchSharedResult = async () => {
      try {
        const response = await fetch(`/api/share?id=${params.id}`)
        if (!response.ok) {
          throw new Error('分享内容不存在或已过期')
        }
        const data = await response.json()
        setResult(data.result)
      } catch (error) {
        setError(error instanceof Error ? error.message : '加载失败')
      } finally {
        setLoading(false)
      }
    }

    fetchSharedResult()
  }, [params.id])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <Card className="max-w-md w-full p-6 text-center">
          <h2 className="text-xl font-bold mb-4">😢 {error}</h2>
          <p className="text-gray-600 mb-6">
            该分享可能已过期或不存在，建议重新生成分享链接
          </p>
          <Button onClick={() => router.push('/')}>
            返回首页
          </Button>
        </Card>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-gray-50/50">
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-4xl mx-auto">
          {/* 页面标题 */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 text-transparent bg-clip-text">
              AI 关系评估报告
            </h1>
            <p className="text-gray-600">
              这份报告由 AI 深度分析生成，为您提供全面的关系洞察
            </p>
          </div>

          {/* 分析报告 */}
          <AnalysisReport result={result} className="mb-8" />

          {/* 底部操作 */}
          <div className="flex justify-center gap-4">
            <Button
              onClick={() => router.push('/')}
              variant="outline"
              className="gap-2"
            >
              开始你的评估
            </Button>
            <ShareResultPanel result={result} shareId={params.id} />
          </div>
        </div>
      </div>
    </main>
  )
}
