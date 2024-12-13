'use client'

import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'
import { AnalysisReport } from '@/components/analysis'
import { ShareResultPanel } from '@/components/shared'
import Head from 'next/head'

interface SharePageClientProps {
  id: string
}

export function SharePageClient({ id }: SharePageClientProps) {
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const router = useRouter()

  useEffect(() => {
    if (!id) {
      setError('无效的分享链接')
      setLoading(false)
      return
    }

    const fetchSharedResult = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/share?id=${id}`)
        if (!response.ok) {
          throw new Error('获取数据失败')
        }
        const data = await response.json()
        setResult(data.result)
        setError('')
      } catch (err) {
        setError(err instanceof Error ? err.message : '获取数据失败')
      } finally {
        setLoading(false)
      }
    }

    fetchSharedResult()
  }, [id])

  if (!id) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold mb-4">无效的分享链接</h1>
        <p>请检查链接是否正确</p>
      </div>
    )
  }

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
          <Button onClick={() => router.push('/')}>返回首页</Button>
        </Card>
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>分享 - Soul Matrix AI</title>
        <meta name="description" content="查看 AI 生成的关系分析报告" />
      </Head>
      <div className="min-h-screen">
        <div className="container mx-auto py-8 px-4">
          <Card className="max-w-4xl mx-auto p-6">
            <div className="space-y-6">
              <AnalysisReport result={result} />
              <ShareResultPanel result={result} />
            </div>
          </Card>
        </div>
      </div>
    </>
  )
}
