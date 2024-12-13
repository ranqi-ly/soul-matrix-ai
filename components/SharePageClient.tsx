'use client'

import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { FaHeart } from 'react-icons/fa'

interface SharePageClientProps {
  id: string
}

interface ResultData {
  person1: {
    name: string
    age: number
    gender: string
  }
  person2: {
    name: string
    age: number
    gender: string
  }
  matchScore: number
  analysis: string
  suggestions: string[]
}

export function SharePageClient({ id }: SharePageClientProps) {
  const [loading, setLoading] = useState(true)
  const [result, setResult] = useState<ResultData | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchResult()
  }, [id])

  const fetchResult = async () => {
    try {
      const response = await fetch(`/api/result?id=${id}`)
      if (!response.ok) {
        throw new Error('Failed to fetch result')
      }
      const data = await response.json()
      setResult(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <Card className="w-full max-w-2xl p-6">
          <div className="space-y-4">
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
            </div>
            <p className="text-center text-gray-500">加载中...</p>
          </div>
        </Card>
      </div>
    )
  }

  if (error || !result) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <Card className="w-full max-w-2xl p-6">
          <div className="space-y-4">
            <p className="text-center text-red-500">
              {error || '无法加载结果'}
            </p>
            <div className="flex justify-center">
              <Button onClick={fetchResult}>重试</Button>
            </div>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-b from-pink-50 to-purple-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl"
      >
        <Card className="p-6 shadow-lg">
          <div className="space-y-6">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                匹配度分析报告
              </h1>
              <div className="flex justify-center items-center space-x-2 text-pink-500">
                <span>{result.person1.name}</span>
                <FaHeart className="animate-pulse" />
                <span>{result.person2.name}</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="text-center">
                <div className="text-4xl font-bold text-pink-500 mb-2">
                  {result.matchScore}%
                </div>
                <Progress value={result.matchScore} className="h-2" />
              </div>

              <div className="space-y-4 mt-6">
                <h2 className="text-xl font-semibold text-gray-800">详细分析</h2>
                <p className="text-gray-600 whitespace-pre-line">
                  {result.analysis}
                </p>
              </div>

              <div className="space-y-4 mt-6">
                <h2 className="text-xl font-semibold text-gray-800">建议</h2>
                <ul className="space-y-2">
                  {result.suggestions.map((suggestion, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start space-x-2"
                    >
                      <FaHeart className="text-pink-500 mt-1 flex-shrink-0" />
                      <span className="text-gray-600">{suggestion}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  )
}
