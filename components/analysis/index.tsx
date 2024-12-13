import { cn } from '@/lib/utils'
import { AnalysisResult } from '@/types/analysis'
import { MatchScore } from './MatchScore'
import { DimensionAnalysis } from './DimensionAnalysis'
import { AgeAnalysis } from './AgeAnalysis'
import { DevelopmentAdvice } from './DevelopmentAdvice'

interface AnalysisReportProps {
  result: AnalysisResult
  className?: string
}

export function AnalysisReport({ result, className }: AnalysisReportProps) {
  return (
    <div className={cn('space-y-8 p-6 bg-gradient-to-br from-pink-50 to-white', className)}>
      <MatchScore result={result} />
      <DimensionAnalysis dimensions={result.维度分析} />
      <AgeAnalysis data={result.年龄段分析} />
      <DevelopmentAdvice data={result.发展阶段建议} />
    </div>
  )
}
