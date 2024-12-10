import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'
import { 
  Heart, 
  ArrowUp, 
  ArrowDown, 
  Target, 
  Clock, 
  Award, 
  AlertTriangle, 
  Lightbulb,
  CheckCircle2,
  AlertCircle,
  Bookmark,
  Calendar,
  ListChecks,
  Rocket,
  Target as TargetIcon,
  Users,
  ArrowUpRight,
  ExternalLink
} from 'lucide-react'
import { DimensionChart } from '@/components/charts/DimensionChart'
import { ShareResultPanel } from '@/components/ShareResultPanel'

// 分析结果类型定义
type DimensionAnalysis = {
  分数: number
  优势: string[]
  挑战: string[]
}

type StatisticsData = {
  同龄群体婚恋特点: string
  成功率数据: string
  关键影响因素: string[]
}

type AgeAnalysis = {
  特征: string
  优势: string[]
  挑战: string[]
  参考案例: string
  统计数据: StatisticsData
}

interface ReferenceCase {
  title: string;
  url: string;
  description: string;
}

interface Task {
  任务: string;
  具体目标: string;
  衡量标准: string;
  可行性: string;
  相关性: string;
  时间节点: string;
}

interface Risk {
  风险: string;
  预防措施: string;
  应对方案: string;
}

interface TimePeriodPlan {
  时间范围: string;
  重点任务: Task[];
  潜在风险: Risk[];
  参考案例: ReferenceCase[];
  成功概率: string;
}

interface DevelopmentAdvice {
  当前阶段: string;
  短期: TimePeriodPlan;
  中期: TimePeriodPlan;
  长期: TimePeriodPlan;
}

type AnalysisResult = {
  匹配度: number
  维度分析: {
    性格匹配度: DimensionAnalysis
    沟通方式: DimensionAnalysis
    价值观: DimensionAnalysis
    生活方式: DimensionAnalysis
    成长潜力: DimensionAnalysis
  }
  年龄段分析: AgeAnalysis
  发展阶段建议: DevelopmentAdvice
}

interface AnalysisReportProps {
  result: AnalysisResult
  className?: string
}

export function AnalysisReport({ result, className }: AnalysisReportProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-pink-500'
    if (score >= 60) return 'text-rose-400'
    return 'text-red-400'
  }

  const getProgressColor = (score: number) => {
    if (score >= 80) return 'bg-pink-500'
    if (score >= 60) return 'bg-rose-400'
    return 'bg-red-400'
  }

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

  return (
    <div className={cn('space-y-8 p-6 bg-gradient-to-br from-pink-50 to-white', className)}>
      {/* 总体匹配度 */}
      <Card className="p-6 border-pink-200 shadow-lg bg-white/80 backdrop-blur">
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

      {/* 维度分析与雷达图 */}
      <Card className="p-6 border-pink-200 shadow-lg bg-white/80 backdrop-blur">
        <h2 className="text-2xl font-bold text-pink-700 mb-6 flex items-center gap-2">
          <Target className="w-7 h-7 text-pink-500" />
          维度分析
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="relative aspect-square">
            <DimensionChart
              dimensions={{
                '性格匹配度': result.维度分析.性格匹配度.分数,
                '沟通方式': result.维度分析.沟通方式.分数,
                '价值观': result.维度分析.价值观.分数,
                '生活方式': result.维度分析.生活方式.分数,
                '成长潜力': result.维度分析.成长潜力.分数
              }}
              className="w-full h-full"
            />
          </div>
          <div className="space-y-6">
            {Object.entries(result.维度分析).map(([dimension, analysis]) => (
              <div key={dimension} className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-700">{dimension}</h3>
                  <span className={cn('font-bold', getScoreColor(analysis.分数))}>
                    {analysis.分数}分
                  </span>
                </div>
                <Progress 
                  value={analysis.分数} 
                  className="h-2 bg-pink-100" 
                  indicatorClassName={getProgressColor(analysis.分数)} 
                />
                <div className="flex flex-wrap gap-2 mt-2">
                  {analysis.优势?.map((item, index) => (
                    <Badge key={index} className="bg-pink-100 text-pink-700 hover:bg-pink-200">
                      {item}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* 年龄段分析 */}
      <Card className="p-6 border-pink-200 shadow-lg bg-white/80 backdrop-blur">
        <h2 className="text-2xl font-bold text-pink-700 mb-6 flex items-center gap-2">
          <Users className="w-7 h-7 text-pink-500" />
          年龄段分析
        </h2>
        <div className="space-y-6">
          <div className="bg-pink-50/50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-pink-700 mb-2">特征分析</h3>
            <p className="text-gray-700">{result.年龄段分析.特征}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-pink-700">优势</h3>
              <ul className="list-disc list-inside space-y-2">
                {result.年龄段分析.优势.map((item, index) => (
                  <li key={index} className="text-gray-600">{item}</li>
                ))}
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-pink-700">挑战</h3>
              <ul className="list-disc list-inside space-y-2">
                {result.年龄段分析.挑战.map((item, index) => (
                  <li key={index} className="text-gray-600">{item}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-pink-700">统计数据</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-pink-50/50 p-4 rounded-lg">
                <h4 className="font-medium text-pink-700 mb-2">同龄群体特点</h4>
                <p className="text-gray-600">{result.年龄段分析.统计数据.同龄群体婚恋特点}</p>
              </div>
              <div className="bg-pink-50/50 p-4 rounded-lg">
                <h4 className="font-medium text-pink-700 mb-2">成功率数据</h4>
                <p className="text-gray-600">{result.年龄段分析.统计数据.成功率数据}</p>
              </div>
              <div className="bg-pink-50/50 p-4 rounded-lg">
                <h4 className="font-medium text-pink-700 mb-2">关键影响因素</h4>
                <ul className="list-disc list-inside space-y-1">
                  {result.年龄段分析.统计数据.关键影响因素.map((factor, index) => (
                    <li key={index} className="text-gray-600">{factor}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {result.年龄段分析.参考案例 && (
            <div className="bg-pink-50/50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-pink-700 mb-2">参考案例</h3>
              <p className="text-gray-600">{result.年龄段分析.参考案例}</p>
            </div>
          )}
        </div>
      </Card>

      {/* 发展阶段建议 */}
      <Card className="p-6 border-pink-200 shadow-lg bg-white/80 backdrop-blur">
        <h2 className="text-2xl font-bold text-pink-700 mb-6 flex items-center gap-2">
          <Lightbulb className="w-7 h-7 text-pink-500" />
          发展阶段建议
        </h2>
        <div className="space-y-8">
          {/* 当前阶段 */}
          <div className="bg-pink-50/50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-pink-700 mb-2">当前阶段</h3>
            <p className="text-gray-700">{result.发展阶段建议.当前阶段}</p>
          </div>

          {/* 短期建议 */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-pink-700 flex items-center gap-2">
              <Clock className="w-5 h-5" />
              短期建议
              <span className="text-sm font-normal text-gray-500">
                ({result.发展阶段建议.短期.时间范围})
              </span>
            </h3>

            {/* 重点任务 */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-700">重点任务</h4>
              {result.发展阶段建议?.短期?.重点任务?.map((task, index) => (
                <Card key={index} className="p-4 border-pink-100">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h5 className="text-lg font-semibold text-gray-700">{task?.任务}</h5>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Badge variant="outline" className="mb-2">具体目标</Badge>
                        <p className="text-sm text-gray-600">{task?.具体目标}</p>
                      </div>
                      <div>
                        <Badge variant="outline" className="mb-2">衡量标准</Badge>
                        <p className="text-sm text-gray-600">{task?.衡量标准}</p>
                      </div>
                      <div>
                        <Badge variant="outline" className="mb-2">实现方式</Badge>
                        <p className="text-sm text-gray-600">{task?.可行性}</p>
                      </div>
                      <div>
                        <Badge variant="outline" className="mb-2">预期价值</Badge>
                        <p className="text-sm text-gray-600">{task?.相关性}</p>
                      </div>
                      <div>
                        <Badge variant="outline" className="mb-2">时间规划</Badge>
                        <p className="text-sm text-gray-600">{task?.时间节点}</p>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* 潜在风险 */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-700">潜在风险</h4>
              {result.发展阶段建议?.短期?.潜在风险?.map((risk, index) => (
                <Card key={index} className="p-4 border-pink-100">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5 text-yellow-500" />
                      <h5 className="font-medium text-gray-700">{risk?.风险}</h5>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Badge variant="outline" className="mb-2">预防措施</Badge>
                        <p className="text-sm text-gray-600">{risk?.预防措施}</p>
                      </div>
                      <div>
                        <Badge variant="outline" className="mb-2">应对方案</Badge>
                        <p className="text-sm text-gray-600">{risk?.应对方案}</p>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* 参考案例 */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-700">参考案例</h4>
              {result.发展阶段建议?.短期?.参考案例?.map((referenceCase, index) => (
                <Card key={index} className="p-4 border-pink-100">
                  <div className="space-y-2">
                    <h5 className="font-medium text-gray-700">{referenceCase?.title}</h5>
                    <p className="text-sm text-gray-600 mb-2">{referenceCase?.description}</p>
                    {referenceCase?.url && (
                      referenceCase.url.startsWith('https://') && (
                        referenceCase.url.includes('zhihu.com') ||
                        referenceCase.url.includes('douban.com') ||
                        referenceCase.url.includes('mp.weixin.qq.com') ||
                        referenceCase.url.includes('xinli001.com') ||
                        referenceCase.url.includes('jiandanxinli.com')
                      ) && (
                        <a 
                          href={referenceCase.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-pink-600 hover:text-pink-700 text-sm flex items-center gap-1"
                        >
                          阅读全文 <ArrowUpRight className="w-4 h-4" />
                        </a>
                      )
                    )}
                  </div>
                </Card>
              ))}
            </div>

            {/* 成功概率 */}
            <div className="bg-pink-50/50 p-4 rounded-lg">
              <h4 className="font-medium text-pink-700 mb-2">成功概率</h4>
              <p className="text-gray-600">{result.发展阶段建议?.短期?.成功概率}</p>
            </div>
          </div>

          {/* 中期建议 */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-pink-700 flex items-center gap-2">
              <Clock className="w-5 h-5" />
              中期建议
              <span className="text-sm font-normal text-gray-500">
                ({result.发展阶段建议?.中期?.时间范围})
              </span>
            </h3>

            {/* 重点任务 */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-700">重点任务</h4>
              {result.发展阶段建议?.中期?.重点任务?.map((task, index) => (
                <Card key={index} className="p-4 border-pink-100">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h5 className="text-lg font-semibold text-gray-700">{task?.任务}</h5>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Badge variant="outline" className="mb-2">具体目标</Badge>
                        <p className="text-sm text-gray-600">{task?.具体目标}</p>
                      </div>
                      <div>
                        <Badge variant="outline" className="mb-2">衡量标准</Badge>
                        <p className="text-sm text-gray-600">{task?.衡量标准}</p>
                      </div>
                      <div>
                        <Badge variant="outline" className="mb-2">实现方式</Badge>
                        <p className="text-sm text-gray-600">{task?.可行性}</p>
                      </div>
                      <div>
                        <Badge variant="outline" className="mb-2">预期价值</Badge>
                        <p className="text-sm text-gray-600">{task?.相关性}</p>
                      </div>
                      <div>
                        <Badge variant="outline" className="mb-2">时间规划</Badge>
                        <p className="text-sm text-gray-600">{task?.时间节点}</p>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* 潜在风险 */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-700">潜在风险</h4>
              {result.发展阶段建议?.中期?.潜在风险?.map((risk, index) => (
                <Card key={index} className="p-4 border-pink-100">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5 text-yellow-500" />
                      <h5 className="font-medium text-gray-700">{risk?.风险}</h5>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Badge variant="outline" className="mb-2">预防措施</Badge>
                        <p className="text-sm text-gray-600">{risk?.预防措施}</p>
                      </div>
                      <div>
                        <Badge variant="outline" className="mb-2">应对方案</Badge>
                        <p className="text-sm text-gray-600">{risk?.应对方案}</p>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* 参考案例 */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-700">参考案例</h4>
              {result.发展阶段建议?.中期?.参考案例?.map((referenceCase, index) => (
                <Card key={index} className="p-4 border-pink-100">
                  <div className="space-y-2">
                    <h5 className="font-medium text-gray-700">{referenceCase?.title}</h5>
                    <p className="text-sm text-gray-600 mb-2">{referenceCase?.description}</p>
                    {referenceCase?.url && (
                      referenceCase.url.startsWith('https://') && (
                        referenceCase.url.includes('zhihu.com') ||
                        referenceCase.url.includes('douban.com') ||
                        referenceCase.url.includes('mp.weixin.qq.com') ||
                        referenceCase.url.includes('xinli001.com') ||
                        referenceCase.url.includes('jiandanxinli.com')
                      ) && (
                        <a 
                          href={referenceCase.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-pink-600 hover:text-pink-700 text-sm flex items-center gap-1"
                        >
                          阅读全文 <ArrowUpRight className="w-4 h-4" />
                        </a>
                      )
                    )}
                  </div>
                </Card>
              ))}
            </div>

            {/* 成功概率 */}
            <div className="bg-pink-50/50 p-4 rounded-lg">
              <h4 className="font-medium text-pink-700 mb-2">成功概率</h4>
              <p className="text-gray-600">{result.发展阶段建议?.中期?.成功概率}</p>
            </div>
          </div>

          {/* 长期建议 */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-pink-700 flex items-center gap-2">
              <Clock className="w-5 h-5" />
              长期建议
              <span className="text-sm font-normal text-gray-500">
                ({result.发展阶段建议?.长期?.时间范围})
              </span>
            </h3>

            {/* 重点任务 */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-700">重点任务</h4>
              {result.发展阶段建议?.长期?.重点任务?.map((task, index) => (
                <Card key={index} className="p-4 border-pink-100">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h5 className="text-lg font-semibold text-gray-700">{task?.任务}</h5>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Badge variant="outline" className="mb-2">具体目标</Badge>
                        <p className="text-sm text-gray-600">{task?.具体目标}</p>
                      </div>
                      <div>
                        <Badge variant="outline" className="mb-2">衡量标准</Badge>
                        <p className="text-sm text-gray-600">{task?.衡量标准}</p>
                      </div>
                      <div>
                        <Badge variant="outline" className="mb-2">实现方式</Badge>
                        <p className="text-sm text-gray-600">{task?.可行性}</p>
                      </div>
                      <div>
                        <Badge variant="outline" className="mb-2">预期价值</Badge>
                        <p className="text-sm text-gray-600">{task?.相关性}</p>
                      </div>
                      <div>
                        <Badge variant="outline" className="mb-2">时间规划</Badge>
                        <p className="text-sm text-gray-600">{task?.时间节点}</p>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* 潜在风险 */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-700">潜在风险</h4>
              {result.发展阶段建议?.长期?.潜在风险?.map((risk, index) => (
                <Card key={index} className="p-4 border-pink-100">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5 text-yellow-500" />
                      <h5 className="font-medium text-gray-700">{risk?.风险}</h5>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Badge variant="outline" className="mb-2">预防措施</Badge>
                        <p className="text-sm text-gray-600">{risk?.预防措施}</p>
                      </div>
                      <div>
                        <Badge variant="outline" className="mb-2">应对方案</Badge>
                        <p className="text-sm text-gray-600">{risk?.应对方案}</p>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* 参考案例 */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-700">参考案例</h4>
              {result.发展阶段建议?.长期?.参考案例?.map((referenceCase, index) => (
                <Card key={index} className="p-4 border-pink-100">
                  <div className="space-y-2">
                    <h5 className="font-medium text-gray-700">{referenceCase?.title}</h5>
                    <p className="text-sm text-gray-600 mb-2">{referenceCase?.description}</p>
                    {referenceCase?.url && (
                      referenceCase.url.startsWith('https://') && (
                        referenceCase.url.includes('zhihu.com') ||
                        referenceCase.url.includes('douban.com') ||
                        referenceCase.url.includes('mp.weixin.qq.com') ||
                        referenceCase.url.includes('xinli001.com') ||
                        referenceCase.url.includes('jiandanxinli.com')
                      ) && (
                        <a 
                          href={referenceCase.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-pink-600 hover:text-pink-700 text-sm flex items-center gap-1"
                        >
                          阅读全文 <ArrowUpRight className="w-4 h-4" />
                        </a>
                      )
                    )}
                  </div>
                </Card>
              ))}
            </div>

            {/* 成功概率 */}
            <div className="bg-pink-50/50 p-4 rounded-lg">
              <h4 className="font-medium text-pink-700 mb-2">成功概率</h4>
              <p className="text-gray-600">{result.发展阶段建议?.长期?.成功概率}</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
