import { Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { ShareResultPanel } from '@/components/shared'
import { cn } from '@/lib/utils'
import { AnalysisResult } from '@/types/analysis'

interface MatchScoreProps {
  result: AnalysisResult
  className?: string
}

export function MatchScore({ result, className }: MatchScoreProps) {
  const getProgressColor = (score: number) => {
    if (score >= 80) return 'bg-pink-500'
    if (score >= 60) return 'bg-rose-400'
    return 'bg-red-400'
  }

  return (
    <Card className={cn("p-6 border-pink-200 shadow-lg bg-white/80 backdrop-blur", className)}>
      <div className="flex flex-col items-center space-y-4">
        <div className="text-4xl font-bold text-pink-700">
          缘分指数: {result.匹配度}%
        </div>
        <Progress 
          value={result.匹配度} 
          className="w-full max-w-md" 
          indicatorClassName={getProgressColor(result.匹配度)} 
        />
        <ShareResultPanel result={result} />
      </div>
    </Card>
  )
}
