import { AnalysisResult, Dimension } from '@/types/analysis'

export function calculateMatchScore(dimensions: Record<string, number>): number {
  const values = Object.values(dimensions)
  if (values.length === 0) return 0
  
  const sum = values.reduce((acc, val) => acc + val, 0)
  return Math.round((sum / values.length) * 100)
}

export function formatDimensionData(dimensions: Record<string, number>): Array<{
  dimension: string
  value: number
}> {
  return Object.entries(dimensions).map(([dimension, value]) => ({
    dimension,
    value: Math.round(value * 100)
  }))
}

export function getDimensionDescription(dimension: Dimension): string {
  const descriptions: Record<Dimension, string> = {
    compatibility: '你们在性格、兴趣和生活方式上的契合程度',
    communication: '你们之间的沟通效果和理解程度',
    trust: '你们之间的信任基础和安全感',
    growth: '你们共同成长和支持彼此发展的潜力',
    intimacy: '你们之间的情感联系和亲密度',
  }
  return descriptions[dimension] || '未知维度'
}

export function analyzeResult(result: AnalysisResult): string {
  const score = calculateMatchScore(result.dimensions)
  let analysis = ''

  if (score >= 80) {
    analysis = '你们非常般配！在多个维度上都展现出极高的契合度。继续保持这种良好的互动和理解，你们的关系会更加稳固。'
  } else if (score >= 60) {
    analysis = '你们的关系基础不错，但仍有提升空间。建议关注评分较低的维度，共同努力改善。'
  } else {
    analysis = '你们可能需要更多的相互了解和沟通。建议从基础开始，逐步建立信任和理解。'
  }

  return analysis
}
