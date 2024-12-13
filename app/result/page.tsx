'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

interface AnalysisResult {
  匹配度: number;
  维度分析: {
    [key: string]: {
      分数: number;
      优势: string[];
      挑战: string[];
    };
  };
  年龄段分析: {
    特征: string;
    优势: string[];
    挑战: string[];
    参考案例: string;
    统计数据: {
      同龄群体婚恋特点: string;
      成功率数据: string;
      关键影响因素: string[];
    };
  };
  发展阶段建议: {
    当前阶段: string;
    短期: {
      时间范围: string;
      重点任务: Array<{
        任务: string;
        具体目标: string;
        衡量标准: string;
        可行性: string;
        相关性: string;
        时间节点: string;
      }>;
      潜在风险: Array<{
        风险: string;
        预防措施: string;
        应对方案: string;
      }>;
      参考案例: Array<{
        title: string;
        description: string;
      }>;
      成功概率: string;
    };
    中期: {
      时间范围: string;
      重点任务: Array<{
        任务: string;
        具体目标: string;
        衡量标准: string;
        可行性: string;
        相关性: string;
        时间节点: string;
      }>;
      潜在风险: Array<{
        风险: string;
        预防措施: string;
        应对方案: string;
      }>;
      参考案例: Array<{
        title: string;
        description: string;
      }>;
      成功概率: string;
    };
    长期: {
      时间范围: string;
      重点任务: Array<{
        任务: string;
        具体目标: string;
        衡量标准: string;
        可行性: string;
        相关性: string;
        时间节点: string;
      }>;
      潜在风险: Array<{
        风险: string;
        预防措施: string;
        应对方案: string;
      }>;
      参考案例: Array<{
        title: string;
        description: string;
      }>;
      成功概率: string;
    };
  };
}

export default function ResultPage() {
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = searchParams.get('id');

  useEffect(() => {
    if (!id) {
      setError('缺少结果ID，请重新开始分析');
      setLoading(false);
      return;
    }

    const fetchResult = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(`/api/result/${id}`);
        const data = await response.json();
        
        if (!response.ok || !data.success) {
          throw new Error(data.error?.message || '获取结果失败');
        }
        
        setResult(data.data);
      } catch (err: any) {
        console.error('获取结果失败:', err);
        setError(err.message || '获取结果失败，请稍后重试');
      } finally {
        setLoading(false);
      }
    };

    fetchResult();
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto p-4">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto"></div>
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-600">{error}</p>
          <Button
            className="mt-4"
            onClick={() => router.push('/assess')}
          >
            重新开始分析
          </Button>
        </div>
      </div>
    );
  }

  if (!result) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white">
      <div className="container mx-auto p-8 space-y-8 max-w-4xl">
        <Card className="backdrop-blur-sm bg-white/90 border-none shadow-lg">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-3xl font-light tracking-tight text-gray-900">缘分指数</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col items-center justify-center">
              <div className="relative w-40 h-40 flex items-center justify-center">
                <svg className="w-full h-full absolute transform -rotate-90">
                  <circle
                    className="text-pink-100"
                    strokeWidth="8"
                    stroke="currentColor"
                    fill="transparent"
                    r="70"
                    cx="80"
                    cy="80"
                  />
                  <circle
                    className="text-pink-500"
                    strokeWidth="8"
                    stroke="currentColor"
                    fill="transparent"
                    r="70"
                    cx="80"
                    cy="80"
                    strokeDasharray={`${2 * Math.PI * 70}`}
                    strokeDashoffset={`${2 * Math.PI * 70 * (1 - result.匹配度 / 100)}`}
                    strokeLinecap="round"
                  />
                </svg>
                <span className="text-5xl font-light text-gray-900">{result.匹配度}%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="backdrop-blur-sm bg-white/90 border-none shadow-lg overflow-hidden">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-3xl font-light tracking-tight text-gray-900">维度分析</CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="w-full h-[400px] -mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={Object.entries(result.维度分析).map(([name, data]) => ({
                  name,
                  value: data.分数
                }))}>
                  <PolarGrid stroke="#f9a8d4" />
                  <PolarAngleAxis dataKey="name" tick={{ fill: '#4b5563', fontSize: 14 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#4b5563' }} />
                  <Radar name="维度分析" dataKey="value" stroke="#ec4899" fill="#ec4899" fillOpacity={0.3} />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            <div className="grid gap-6">
              {Object.entries(result.维度分析).map(([dimension, analysis]) => (
                <div key={dimension} className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-light text-gray-900">{dimension}</h3>
                    <span className="text-lg font-light text-pink-500">{analysis.分数}分</span>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-green-50/50 p-4 rounded-xl">
                      <h4 className="font-medium text-green-700 mb-3">优势特质</h4>
                      <ul className="space-y-2">
                        {analysis.优势.map((item, index) => (
                          <li key={index} className="text-sm text-gray-600 flex items-start">
                            <span className="text-green-500 mr-2">✦</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-amber-50/50 p-4 rounded-xl">
                      <h4 className="font-medium text-amber-700 mb-3">成长空间</h4>
                      <ul className="space-y-2">
                        {analysis.挑战.map((item, index) => (
                          <li key={index} className="text-sm text-gray-600 flex items-start">
                            <span className="text-amber-500 mr-2">✦</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {result.年龄段分析 && (
          <Card className="backdrop-blur-sm bg-white/90 border-none shadow-lg">
            <CardHeader className="text-center pb-2">
              <CardTitle className="text-3xl font-light tracking-tight text-gray-900">年龄阶段洞察</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-pink-50/50 p-6 rounded-xl">
                <h3 className="text-xl font-light text-gray-900 mb-4">特征描述</h3>
                <p className="text-gray-600 leading-relaxed">{result.年龄段分析.特征}</p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-green-50/50 p-4 rounded-xl">
                  <h3 className="font-medium text-green-700 mb-3">优势特质</h3>
                  <ul className="space-y-2">
                    {result.年龄段分析.优势.map((item, index) => (
                      <li key={index} className="text-sm text-gray-600 flex items-start">
                        <span className="text-green-500 mr-2">✦</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-amber-50/50 p-4 rounded-xl">
                  <h3 className="font-medium text-amber-700 mb-3">成长空间</h3>
                  <ul className="space-y-2">
                    {result.年龄段分析.挑战.map((item, index) => (
                      <li key={index} className="text-sm text-gray-600 flex items-start">
                        <span className="text-amber-500 mr-2">✦</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {result.年龄段分析.参考案例 && (
                <div className="bg-blue-50/50 p-6 rounded-xl">
                  <h3 className="text-xl font-light text-gray-900 mb-4">参考案例</h3>
                  <p className="text-gray-600 leading-relaxed">{result.年龄段分析.参考案例}</p>
                </div>
              )}

              <div className="bg-purple-50/50 p-6 rounded-xl space-y-4">
                <h3 className="text-xl font-light text-gray-900 mb-4">群体洞察</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-purple-700 mb-2">同龄群体特点</h4>
                    <p className="text-gray-600">{result.年龄段分析.统计数据.同龄群体婚恋特点}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-purple-700 mb-2">成功率数据</h4>
                    <p className="text-gray-600">{result.年龄段分析.统计数据.成功率数据}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-purple-700 mb-2">关键影响因素</h4>
                    <ul className="grid grid-cols-2 gap-2">
                      {result.年龄段分析.统计数据.关键影响因素.map((factor, index) => (
                        <li key={index} className="text-sm text-gray-600 flex items-center">
                          <span className="text-purple-500 mr-2">✦</span>
                          {factor}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {result.发展阶段建议 && (
          <Card className="backdrop-blur-sm bg-white/90 border-none shadow-lg">
            <CardHeader className="text-center pb-2">
              <CardTitle className="text-3xl font-light tracking-tight text-gray-900">发展规划</CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="bg-pink-50/50 p-6 rounded-xl">
                <h3 className="text-xl font-light text-gray-900 mb-4">当前阶段</h3>
                <p className="text-gray-600 leading-relaxed">{result.发展阶段建议.当前阶段}</p>
              </div>

              {['短期', '中期', '长期'].map((period) => {
                const periodData = result.发展阶段建议[period as keyof typeof result.发展阶段建议];
                return (
                  <div key={period} className="space-y-6">
                    <h3 className="text-2xl font-light text-gray-900 text-center">{period}规划 
                      <span className="text-sm text-gray-500 ml-2">({periodData.时间范围})</span>
                    </h3>
                    
                    <div className="space-y-6">
                      <div className="bg-blue-50/50 p-6 rounded-xl">
                        <h4 className="text-xl font-light text-gray-900 mb-4">重点任务</h4>
                        <div className="grid gap-4">
                          {periodData.重点任务.map((task, index) => (
                            <div key={index} className="bg-white/50 p-4 rounded-lg space-y-3">
                              <h5 className="font-medium text-blue-700">{task.任务}</h5>
                              <div className="grid md:grid-cols-2 gap-4 text-sm">
                                <div>
                                  <p><span className="text-gray-500">具体目标：</span>{task.具体目标}</p>
                                  <p><span className="text-gray-500">衡量标准：</span>{task.衡量标准}</p>
                                  <p><span className="text-gray-500">时间节点：</span>{task.时间节点}</p>
                                </div>
                                <div>
                                  <p><span className="text-gray-500">可行性：</span>{task.可行性}</p>
                                  <p><span className="text-gray-500">相关性：</span>{task.相关性}</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="bg-red-50/50 p-6 rounded-xl">
                        <h4 className="text-xl font-light text-gray-900 mb-4">风险防范</h4>
                        <div className="grid gap-4">
                          {periodData.潜在风险.map((risk, index) => (
                            <div key={index} className="bg-white/50 p-4 rounded-lg space-y-3">
                              <h5 className="font-medium text-red-700">{risk.风险}</h5>
                              <div className="space-y-2 text-sm">
                                <p><span className="text-gray-500">预防措施：</span>{risk.预防措施}</p>
                                <p><span className="text-gray-500">应对方案：</span>{risk.应对方案}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {periodData.参考案例.length > 0 && (
                        <div className="bg-green-50/50 p-6 rounded-xl">
                          <h4 className="text-xl font-light text-gray-900 mb-4">成功案例</h4>
                          <div className="grid gap-4">
                            {periodData.参考案例.map((ref, index) => (
                              <div key={index} className="bg-white/50 p-4 rounded-lg">
                                <h5 className="font-medium text-green-700 mb-2">{ref.title}</h5>
                                <p className="text-sm text-gray-600">{ref.description}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="text-center">
                        <p className="inline-block bg-pink-50/50 px-4 py-2 rounded-full">
                          <span className="text-gray-500">预期成功率：</span>
                          <span className="text-pink-500 font-medium ml-1">{periodData.成功概率}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
