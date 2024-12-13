import { useState, useCallback } from 'react'

interface ErrorState {
  message: string | null
  code?: string
  details?: any
}

export function useError() {
  const [error, setError] = useState<ErrorState | null>(null)

  const handleError = useCallback((error: any) => {
    if (typeof error === 'string') {
      setError({ message: error })
    } else if (error instanceof Error) {
      setError({
        message: error.message,
        details: error.stack
      })
    } else if (error && typeof error === 'object') {
      setError({
        message: error.message || '未知错误',
        code: error.code,
        details: error.details || error
      })
    } else {
      setError({ message: '发生未知错误' })
    }
  }, [])

  const clearError = useCallback(() => {
    setError(null)
  }, [])

  return {
    error,
    setError: handleError,
    clearError
  }
}
