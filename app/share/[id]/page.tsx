import { Metadata } from 'next'
import AnalysisReport from '@/components/analysis/AnalysisReport'

export const metadata: Metadata = {
  title: '测评结果分享 | Soul Matrix AI',
  description: '查看您的测评结果分享',
}

async function getSharedResult(id: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/share?id=${id}`, {
    cache: 'no-store',
  })
  
  if (!response.ok) {
    throw new Error('Failed to fetch shared result')
  }
  
  return response.json()
}

export default async function SharePage({ params }: { params: { id: string } }) {
  try {
    const { result } = await getSharedResult(params.id)
    
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-center mb-8">测评结果分享</h1>
        <AnalysisReport result={result} isSharedView />
      </div>
    )
  } catch (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">分享内容不存在或已过期</h1>
        <p className="text-gray-600">
          该分享链接可能已经失效，或者内容已被删除。
        </p>
      </div>
    )
  }
}
