'use client'

import { useState } from 'react'
import { DualAssessmentForm } from '@/components/DualAssessmentForm'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { AnalysisReport } from '@/components/AnalysisReport'

export default function Home() {
  const [result, setResult] = useState<any>(null)

  const renderResult = () => {
    if (!result) return null

    return (
      <div className="space-y-6">
        <AnalysisReport result={result} />
      </div>
    )
  }

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="container mx-auto py-16 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">
              探索你们的灵魂契合度
            </h1>
            <p className="text-xl mb-8">
              利用先进的 AI 技术，深入分析你们的关系潜力，获取专业的关系洞察和建议
            </p>
            <div className="flex gap-4 justify-center">
              <Badge variant="secondary" className="text-lg px-4 py-2">
                AI 驱动分析
              </Badge>
              <Badge variant="secondary" className="text-lg px-4 py-2">
                科学评估方法
              </Badge>
              <Badge variant="secondary" className="text-lg px-4 py-2">
                个性化建议
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="p-6 text-center">
              <div className="text-3xl mb-4">🎯</div>
              <h3 className="text-xl font-semibold mb-2">精准匹配分析</h3>
              <p className="text-gray-600">
                基于多维度数据分析，准确评估你们的匹配程度
              </p>
            </Card>
            <Card className="p-6 text-center">
              <div className="text-3xl mb-4">🔮</div>
              <h3 className="text-xl font-semibold mb-2">关系发展预测</h3>
              <p className="text-gray-600">
                预见潜在的机遇与挑战，助你们更好地规划未来
              </p>
            </Card>
            <Card className="p-6 text-center">
              <div className="text-3xl mb-4">💡</div>
              <h3 className="text-xl font-semibold mb-2">专业改进建议</h3>
              <p className="text-gray-600">
                获取个性化的关系建议，促进感情健康发展
              </p>
            </Card>
          </div>
        </div>
      </div>

      {/* Assessment Section */}
      <div className="container mx-auto py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              开始你们的关系评估
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              通过回答一系列精心设计的问题，让 AI 深入分析你们的关系特点，
              为你们提供专业的关系洞察和建议。
            </p>
          </div>

          {result ? renderResult() : (
            <DualAssessmentForm onComplete={setResult} />
          )}
        </div>
      </div>

      {/* Trust Indicators */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-8">值得信赖的关系评估工具</h2>
            <div className="grid md:grid-cols-4 gap-6">
              <div>
                <div className="text-3xl font-bold text-primary mb-2">99%</div>
                <div className="text-gray-600">用户满意度</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">10K+</div>
                <div className="text-gray-600">成功评估</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">95%</div>
                <div className="text-gray-600">准确率</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">24/7</div>
                <div className="text-gray-600">全天候服务</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
