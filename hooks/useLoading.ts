import { useState, useCallback } from 'react'

interface LoadingState {
  [key: string]: boolean
}

export function useLoading(initialState: LoadingState = {}) {
  const [loadingState, setLoadingState] = useState<LoadingState>(initialState)

  const setLoading = useCallback((key: string, isLoading: boolean) => {
    setLoadingState(prev => ({
      ...prev,
      [key]: isLoading
    }))
  }, [])

  const withLoading = useCallback(async <T>(key: string, fn: () => Promise<T>): Promise<T> => {
    setLoading(key, true)
    try {
      return await fn()
    } finally {
      setLoading(key, false)
    }
  }, [setLoading])

  return {
    loadingState,
    setLoading,
    withLoading,
    isLoading: useCallback((key: string) => loadingState[key] || false, [loadingState])
  }
}
