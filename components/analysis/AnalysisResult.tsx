import { Card } from '@/components/ui/card'
import { RadarChart } from '@/components/charts/RadarChart'
import { MatchScore } from './MatchScore'
import { DimensionDetails } from './DimensionDetails'
import { ShareResultPanel } from '@/components/shared/ShareResultPanel'
import { AnalysisResult as AnalysisResultType } from '@/types/analysis'
import { analyzeResult } from '@/utils/analysis'

interface AnalysisResultProps {
  result: AnalysisResultType
}

export function AnalysisResult({ result }: AnalysisResultProps) {
  const analysis = analyzeResult(result)

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-4">分析结果</h2>
        <div className="space-y-6">
          <MatchScore score={result.matchScore} />
          <p className="text-gray-700">{analysis}</p>
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="text-xl font-bold mb-4">维度分析</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <RadarChart data={result.dimensions} />
          <DimensionDetails dimensions={result.dimensions} />
        </div>
      </Card>

      <ShareResultPanel result={result} />
    </div>
  )
}
