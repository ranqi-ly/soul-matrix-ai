'use client'

import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { AssessmentForm } from '@/components/assessment'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { toast } from '@/components/ui/use-toast'

export default function InvitePage() {
  const params = useParams()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [inviteData, setInviteData] = useState<any>(null)

  useEffect(() => {
    const fetchInviteData = async () => {
      try {
        const response = await fetch(`/api/invite?id=${params.id}`)
        if (!response.ok) {
          throw new Error('邀请不存在或已过期')
        }
        const data = await response.json()
        setInviteData(data)
      } catch (error) {
        setError(error instanceof Error ? error.message : '加载邀请数据失败')
        toast({
          title: '加载失败',
          description: '无法加载邀请数据，请稍后重试',
          variant: 'destructive',
        })
      } finally {
        setLoading(false)
      }
    }

    fetchInviteData()
  }, [params.id])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>加载中...</CardTitle>
            <CardDescription>
              正在加载邀请数据，请稍候...
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    )
  }

  if (error || !inviteData) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl font-bold mb-4">邀请已失效</CardTitle>
            <CardDescription>
              {error || '该邀请链接可能已经过期，或者已经被使用。'}
              <br />
              请联系您的伴侣重新发起邀请。
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>完成测评问卷</CardTitle>
          <CardDescription>
            您的伴侣已经完成了他/她的部分。现在请填写您的答案，完成后我们将为您生成匹配分析报告。
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AssessmentForm 
            inviteId={params.id}
            person1Answers={inviteData.person1Answers}
            mode="invited"
          />
        </CardContent>
      </Card>
    </div>
  )
}
