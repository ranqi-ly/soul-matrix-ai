import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Clock, CheckCircle2, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { AgeAnalysisData } from '@/types/analysis'

interface AgeAnalysisProps {
  data: AgeAnalysisData
  className?: string
}

export function AgeAnalysis({ data, className }: AgeAnalysisProps) {
  return (
    <Card className={cn("p-6 border-pink-200 shadow-lg bg-white/80 backdrop-blur", className)}>
      <h2 className="text-2xl font-bold text-pink-700 mb-6 flex items-center gap-2">
        <Clock className="w-7 h-7 text-pink-500" />
        年龄阶段分析
      </h2>

      <div className="space-y-6">
        <div className="prose prose-pink max-w-none">
          <p className="text-gray-700">{data.特征}</p>
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-pink-600 mb-2 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5" />
              优势
            </h3>
            <div className="flex flex-wrap gap-2">
              {data.优势.map((item, index) => (
                <Badge key={index} variant="outline" className="bg-pink-50">
                  {item}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-pink-600 mb-2 flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              挑战
            </h3>
            <div className="flex flex-wrap gap-2">
              {data.挑战.map((item, index) => (
                <Badge key={index} variant="outline" className="bg-pink-50">
                  {item}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-pink-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-pink-600 mb-2">统计数据</h3>
          <div className="space-y-2 text-sm text-gray-700">
            <p>· 同龄群体特点：{data.统计数据.同龄群体婚恋特点}</p>
            <p>· 成功率：{data.统计数据.成功率数据}</p>
            <div>
              <p className="mb-1">· 关键影响因素：</p>
              <div className="flex flex-wrap gap-2">
                {data.统计数据.关键影响因素.map((factor, index) => (
                  <Badge key={index} variant="outline" className="bg-white">
                    {factor}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}
