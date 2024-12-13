import { useState } from 'react'
import { Question } from '@/types/assessment'
import { useError } from './useError'
import { useApi } from './useApi'
import { useLoading } from './useLoading'

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

interface UseAssessmentProps {
  questions: Question[]
  onComplete?: (result: any) => void
}

export function useAssessment({ questions, onComplete }: UseAssessmentProps) {
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
  const [result, setResult] = useState<any>(null)
  
  const { error, setError, clearError } = useError()
  const { loadingState, withLoading } = useLoading({ submit: false })
  const assessApi = useApi({
    url: '/api/assess',
    method: 'POST'
  })

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

    try {
      const result = await withLoading('submit', async () => {
        return await assessApi.execute({
          person1: {
            info: person1.info,
            answers: person1.answers,
          },
          person2: {
            info: person2.info,
            answers: person2.answers,
          },
        })
      })

      setResult(result)
      if (onComplete) {
        onComplete(result)
      }
    } catch (error) {
      // 错误已经被 useApi 处理
      console.error('评估失败:', error)
      setError(error)
    }
  }

  return {
    person1,
    person2,
    loading: loadingState.submit,
    error,
    result,
    handlePersonInfoSubmit,
    handleAnswer,
    handleSubmit,
    canSubmit,
    clearError
  }
}
