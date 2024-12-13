import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Target } from 'lucide-react'
import { DimensionChart } from '@/components/charts/DimensionChart'
import { cn } from '@/lib/utils'
import { DimensionAnalysisData } from '@/types/analysis'

interface DimensionAnalysisProps {
  dimensions: Record<string, DimensionAnalysisData>
  className?: string
}

export function DimensionAnalysis({ dimensions, className }: DimensionAnalysisProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-pink-500'
    if (score >= 60) return 'text-rose-400'
    return 'text-red-400'
  }

  return (
    <Card className={cn("p-6 border-pink-200 shadow-lg bg-white/80 backdrop-blur", className)}>
      <h2 className="text-2xl font-bold text-pink-700 mb-6 flex items-center gap-2">
        <Target className="w-7 h-7 text-pink-500" />
        维度分析
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          {Object.entries(dimensions).map(([name, data]) => (
            <div key={name} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium">{name}</span>
                <span className={cn("font-bold", getScoreColor(data.分数))}>
                  {data.分数}%
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {data.优势.map((advantage, index) => (
                  <Badge key={index} variant="outline" className="bg-pink-50">
                    {advantage}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <div className="h-[300px] md:h-[400px]">
          <DimensionChart 
            dimensions={Object.entries(dimensions).reduce((acc, [name, data]) => ({
              ...acc,
              [name]: data.分数
            }), {})}
          />
        </div>
      </div>
    </Card>
  )
}
