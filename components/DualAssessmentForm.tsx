'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { questions } from '@/data/questions'

interface PersonInfo {
  name: string
  age: number
  gender: 'male' | 'female'
}

interface PersonState {
  info: PersonInfo | null
  currentQuestionIndex: number
  answers: Record<string, string>
}

interface DualAssessmentFormProps {
  onComplete?: (result: any) => void
}

export function DualAssessmentForm({ onComplete }: DualAssessmentFormProps) {
  const [person1, setPerson1] = useState<PersonState>({
    info: null,
    currentQuestionIndex: 0,
    answers: {}
  })
  const [person2, setPerson2] = useState<PersonState>({
    info: null,
    currentQuestionIndex: 0,
    answers: {}
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<any>(null)

  const handlePersonInfoSubmit = (personNumber: 1 | 2, info: PersonInfo) => {
    if (personNumber === 1) {
      setPerson1(prev => ({ ...prev, info }))
    } else {
      setPerson2(prev => ({ ...prev, info }))
    }
  }

  const handleAnswer = (personNumber: 1 | 2, answer: string) => {
    const person = personNumber === 1 ? person1 : person2
    const setPerson = personNumber === 1 ? setPerson1 : setPerson2
    
    setPerson(prev => ({
      ...prev,
      answers: {
        ...prev.answers,
        [questions[prev.currentQuestionIndex].id]: answer,
      },
      currentQuestionIndex: prev.currentQuestionIndex + 1,
    }))
  }

  const canSubmit = () => {
    return person1.info && person2.info && 
           person1.currentQuestionIndex === questions.length &&
           person2.currentQuestionIndex === questions.length
  }

  const handleSubmit = async () => {
    if (!canSubmit()) return
    
    setLoading(true)
    setError(null)
    
    try {
      const response = await fetch('/api/assess', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          person1: {
            info: person1.info,
            answers: person1.answers,
          },
          person2: {
            info: person2.info,
            answers: person2.answers,
          },
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error?.message || `HTTP error! status: ${response.status}`)
      }

      const resultData = await response.json()
      
      if (!resultData.success) {
        throw new Error(resultData.error?.message || '评估失败')
      }

      setResult(resultData.data)
      if (onComplete) {
        onComplete(resultData.data)
      }
    } catch (error: any) {
      console.error('评估失败:', error)
      setError(error.message || '评估失败，请稍后重试')
    } finally {
      setLoading(false)
    }
  }

  const renderPersonInfoForm = (personNumber: 1 | 2) => (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-4">
        {personNumber === 1 ? '第一位' : '第二位'}参与者信息
      </h2>
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
          <div>
            <Label htmlFor={`name-${personNumber}`}>姓名</Label>
            <input
              type="text"
              id={`name-${personNumber}`}
              name="name"
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <Label htmlFor={`age-${personNumber}`}>年龄</Label>
            <input
              type="number"
              id={`age-${personNumber}`}
              name="age"
              min="18"
              max="100"
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <Label>性别</Label>
            <RadioGroup name="gender" className="flex space-x-4" defaultValue="male">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="male" id={`male-${personNumber}`} />
                <Label htmlFor={`male-${personNumber}`}>男</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="female" id={`female-${personNumber}`} />
                <Label htmlFor={`female-${personNumber}`}>女</Label>
              </div>
            </RadioGroup>
          </div>
          <Button type="submit" className="w-full">
            开始测评
          </Button>
        </div>
      </form>
    </Card>
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
              className="w-full text-left justify-start h-auto p-4"
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

  if (result) {
    return null // 结果展示由父组件处理
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-xl font-semibold mb-4">第一位参与者</h2>
          {renderPersonColumn(1)}
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4">第二位参与者</h2>
          {renderPersonColumn(2)}
        </div>
      </div>

      {canSubmit() && !loading && !error && (
        <div className="text-center">
          <Button onClick={handleSubmit} size="lg">
            提交评估
          </Button>
        </div>
      )}

      {loading && (
        <Card className="p-6">
          <div className="text-center">
            <div className="mb-4">正在分析...</div>
            <Progress value={undefined} className="h-2" />
          </div>
        </Card>
      )}

      {error && (
        <Card className="p-6">
          <div className="text-center text-red-500">
            {error}
            <Button
              onClick={() => setError(null)}
              className="mt-4"
            >
              重试
            </Button>
          </div>
        </Card>
      )}
    </div>
  )
}
