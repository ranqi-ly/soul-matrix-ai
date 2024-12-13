import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Rocket, Target as TargetIcon, AlertTriangle, ExternalLink } from 'lucide-react'
import { cn } from '@/lib/utils'
import { DevelopmentAdviceData } from '@/types/analysis'

interface DevelopmentAdviceProps {
  data: DevelopmentAdviceData
  className?: string
}

export function DevelopmentAdvice({ data, className }: DevelopmentAdviceProps) {
  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case '高':
        return 'bg-pink-500 text-white'
      case '中':
        return 'bg-rose-400 text-white'
      case '低':
        return 'bg-red-400 text-white'
      default:
        return 'bg-gray-500 text-white'
    }
  }

  const renderTimePeriod = (title: string, plan: typeof data.短期) => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-pink-600">{title}</h3>
      
      <div className="space-y-6">
        {plan.重点任务.map((task, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center gap-2">
              <TargetIcon className="w-5 h-5 text-pink-500" />
              <span className="font-medium">{task.任务}</span>
            </div>
            <div className="ml-7 space-y-1 text-sm text-gray-600">
              <p>· 目标：{task.具体目标}</p>
              <p>· 标准：{task.衡量标准}</p>
              <p>· 时间：{task.时间节点}</p>
            </div>
          </div>
        ))}

        {plan.潜在风险.length > 0 && (
          <div className="bg-pink-50 p-4 rounded-lg space-y-3">
            <div className="flex items-center gap-2 text-pink-600 font-medium">
              <AlertTriangle className="w-5 h-5" />
              潜在风险
            </div>
            {plan.潜在风险.map((risk, index) => (
              <div key={index} className="space-y-1 text-sm">
                <p className="font-medium text-gray-700">{risk.风险}</p>
                <p className="text-gray-600">· 预防：{risk.预防措施}</p>
                <p className="text-gray-600">· 应对：{risk.应对方案}</p>
              </div>
            ))}
          </div>
        )}

        {plan.参考案例.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-pink-600 font-medium">
              <ExternalLink className="w-5 h-5" />
              参考案例
            </div>
            {plan.参考案例.map((case_, index) => (
              <a
                key={index}
                href={case_.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-3 bg-white rounded-lg hover:bg-pink-50 transition-colors"
              >
                <p className="font-medium text-pink-600">{case_.title}</p>
                <p className="text-sm text-gray-600 mt-1">{case_.description}</p>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  )

  return (
    <Card className={cn("p-6 border-pink-200 shadow-lg bg-white/80 backdrop-blur", className)}>
      <h2 className="text-2xl font-bold text-pink-700 mb-6 flex items-center gap-2">
        <Rocket className="w-7 h-7 text-pink-500" />
        发展阶段建议
      </h2>

      <div className="space-y-8">
        <div className="prose prose-pink max-w-none">
          <p className="text-gray-700">当前阶段：{data.当前阶段}</p>
        </div>

        {renderTimePeriod("短期规划", data.短期)}
        {renderTimePeriod("中期规划", data.中期)}
        {renderTimePeriod("长期规划", data.长期)}
      </div>
    </Card>
  )
}
