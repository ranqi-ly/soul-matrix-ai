'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { questions } from '@/data/questions'
import { toast } from '@/components/ui/use-toast'
import { Share2 } from 'lucide-react'
import { motion } from 'framer-motion'
import { InvitePanel } from '@/components/assessment'

interface PersonInfo {
  name: string
  age: number
  gender: 'male' | 'female'
}

interface AssessmentFormProps {
  inviteId?: string
  person1Answers?: Record<string, string>
  mode?: 'normal' | 'invited'
  onComplete?: (result: any) => void
}

export default function AssessmentForm({ 
  inviteId, 
  person1Answers, 
  mode = 'normal',
  onComplete 
}: AssessmentFormProps) {
  const router = useRouter()
  const [person1, setPerson1] = useState<{
    info?: PersonInfo
    answers: Record<string, string>
    currentQuestionIndex: number
  }>({
    answers: person1Answers || {},
    currentQuestionIndex: 0
  })
  const [person2, setPerson2] = useState<{
    info?: PersonInfo
    answers: Record<string, string>
    currentQuestionIndex: number
  }>({
    answers: {},
    currentQuestionIndex: 0
  })
  const [loading, setLoading] = useState(false)
  const [showInvite, setShowInvite] = useState(false)
  const [currentInviteId, setCurrentInviteId] = useState<string | null>(null)

  const handlePersonInfoSubmit = (personNumber: 1 | 2, info: PersonInfo) => {
    if (personNumber === 1) {
      setPerson1(prev => ({ ...prev, info }))
    } else {
      setPerson2(prev => ({ ...prev, info }))
    }
  }

  const handleAnswer = (personNumber: 1 | 2, answer: string) => {
    if (personNumber === 1) {
      setPerson1(prev => {
        const questionId = questions[prev.currentQuestionIndex].id
        return {
          ...prev,
          answers: { ...prev.answers, [questionId]: answer },
          currentQuestionIndex: prev.currentQuestionIndex + 1
        }
      })
    } else {
      setPerson2(prev => {
        const questionId = questions[prev.currentQuestionIndex].id
        return {
          ...prev,
          answers: { ...prev.answers, [questionId]: answer },
          currentQuestionIndex: prev.currentQuestionIndex + 1
        }
      })
    }
  }

  const handleSubmit = async () => {
    if (loading) return
    setLoading(true)

    try {
      const formData = {
        person1: {
          info: person1.info,
          answers: mode === 'invited' ? person1Answers : person1.answers
        },
        person2: {
          info: person2.info,
          answers: person2.answers
        }
      };

      const response = await fetch('/api/assess', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.error?.message || '分析失败');
      }

      // 跳转到结果页面
      router.push(`/result?id=${result.data.resultId}`);
    } catch (error) {
      toast({
        title: '评估失败',
        description: '提交评估时出现错误，请稍后重试',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  const handleInvite = async () => {
    if (loading) return
    setLoading(true)

    try {
      const response = await fetch('/api/invite', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          person1Info: person1.info,
          person1Answers: person1.answers
        }),
      })

      if (!response.ok) {
        throw new Error('创建邀请失败')
      }

      const { inviteId } = await response.json()
      setCurrentInviteId(inviteId)
      setShowInvite(true)
    } catch (error) {
      toast({
        title: '创建邀请失败',
        description: '生成邀请链接时出现错误，请稍后重试',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  const renderPersonInfoForm = (personNumber: 1 | 2) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <Card className="p-6">
        <form onSubmit={(e) => {
          e.preventDefault()
          const formData = new FormData(e.currentTarget)
          handlePersonInfoSubmit(personNumber, {
            name: formData.get('name') as string,
            age: parseInt(formData.get('age') as string),
            gender: formData.get('gender') as 'male' | 'female',
          })
        }}>
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div>
                <label htmlFor={`name-${personNumber}`} className="block text-sm font-medium mb-1">
                  姓名
                </label>
                <input
                  type="text"
                  id={`name-${personNumber}`}
                  name="name"
                  className="w-full p-2 border rounded hover:border-pink-300 focus:border-pink-500 transition-colors"
                  required
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div>
                <label htmlFor={`age-${personNumber}`} className="block text-sm font-medium mb-1">
                  年龄
                </label>
                <input
                  type="number"
                  id={`age-${personNumber}`}
                  name="age"
                  min="18"
                  max="100"
                  className="w-full p-2 border rounded hover:border-pink-300 focus:border-pink-500 transition-colors"
                  required
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div>
                <span className="block text-sm font-medium mb-1">性别</span>
                <div className="flex space-x-4">
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="gender"
                      value="male"
                      className="text-pink-500 focus:ring-pink-500"
                      defaultChecked
                    />
                    <span>男</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="gender"
                      value="female"
                      className="text-pink-500 focus:ring-pink-500"
                    />
                    <span>女</span>
                  </label>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex justify-between mt-8"
            >
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white"
              >
                开始测评
              </Button>
            </motion.div>
          </div>
        </form>
      </Card>
    </motion.div>
  )

  const renderQuestion = (personNumber: 1 | 2) => {
    const person = personNumber === 1 ? person1 : person2
    if (!person.info || person.currentQuestionIndex >= questions.length) return null

    const question = questions[person.currentQuestionIndex]
    const progress = ((person.currentQuestionIndex + 1) / questions.length) * 100

    return (
      <Card className="p-6">
        <div className="mb-4">
          <div className="flex justify-between text-sm text-gray-500 mb-2">
            <span>问题 {person.currentQuestionIndex + 1}/{questions.length}</span>
            <span>{person.info.name}</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
        
        <h3 className="text-xl font-semibold mb-4">{question.text}</h3>
        
        <div className="space-y-3">
          {question.options.map((option) => (
            <Button
              key={option.text}
              onClick={() => handleAnswer(personNumber, option.text)}
              variant="outline"
              className="w-full text-left justify-start h-auto p-4 hover:bg-pink-50 hover:text-pink-600 transition-colors"
            >
              {option.text}
            </Button>
          ))}
        </div>
      </Card>
    )
  }

  const renderPersonColumn = (personNumber: 1 | 2) => {
    const person = personNumber === 1 ? person1 : person2
    
    if (!person.info) {
      return renderPersonInfoForm(personNumber)
    }

    if (person.currentQuestionIndex < questions.length) {
      return renderQuestion(personNumber)
    }

    return (
      <Card className="p-6">
        <div className="text-center">
          <h3 className="text-xl font-bold mb-2">{person.info.name}</h3>
          <p className="text-green-600">✓ 已完成测评</p>
        </div>
      </Card>
    )
  }

  const canSubmit = () => {
    if (mode === 'invited') {
      return person2.info && person2.currentQuestionIndex >= questions.length
    }
    return (
      person1.info && 
      person2.info && 
      person1.currentQuestionIndex >= questions.length && 
      person2.currentQuestionIndex >= questions.length
    )
  }

  const canInvite = () => {
    return (
      mode === 'normal' && 
      person1.info && 
      person1.currentQuestionIndex >= questions.length && 
      (!person2.info || person2.currentQuestionIndex < questions.length)
    )
  }

  return (
    <div className="space-y-8">
      <div className="grid md:grid-cols-2 gap-8">
        {mode === 'normal' && (
          <div>
            <h2 className="text-xl font-semibold mb-4">第一位参与者</h2>
            {renderPersonColumn(1)}
          </div>
        )}
        
        <div>
          <h2 className="text-xl font-semibold mb-4">
            {mode === 'invited' ? '您的答案' : '第二位参与者'}
          </h2>
          {renderPersonColumn(2)}
        </div>
      </div>

      <div className="flex justify-center gap-4">
        {canInvite() && (
          <Button
            onClick={handleInvite}
            variant="outline"
            disabled={loading}
            className="gap-2 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white"
          >
            <Share2 className="w-4 h-4" />
            邀请填写
          </Button>
        )}
        
        {canSubmit() && (
          <Button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white"
          >
            {loading ? '处理中...' : '提交评估'}
          </Button>
        )}
      </div>

      {showInvite && currentInviteId && (
        <InvitePanel 
          inviteId={currentInviteId} 
          onClose={() => {
            setShowInvite(false)
            setCurrentInviteId(null)
          }} 
        />
      )}
    </div>
  )
}
