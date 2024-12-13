import { useState, useCallback } from 'react'
import { useError } from './useError'

interface ApiConfig<T> {
  url: string
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  headers?: Record<string, string>
  transformResponse?: (data: any) => T
}

interface ApiState<T> {
  data: T | null
  loading: boolean
}

export function useApi<T = any>({
  url,
  method = 'GET',
  headers: defaultHeaders = {},
  transformResponse = (data: any) => data as T
}: ApiConfig<T>) {
  const [state, setState] = useState<ApiState<T>>({
    data: null,
    loading: false
  })
  const { error, setError, clearError } = useError()

  const execute = useCallback(async (body?: any, headers: Record<string, string> = {}) => {
    setState(prev => ({ ...prev, loading: true }))
    clearError()

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...defaultHeaders,
          ...headers
        },
        ...(body ? { body: JSON.stringify(body) } : {})
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error?.message || `HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      if (!data.success) {
        throw new Error(data.error?.message || '请求失败')
      }

      const transformedData = transformResponse(data.data)
      setState({
        data: transformedData,
        loading: false
      })

      return transformedData
    } catch (err) {
      setError(err)
      setState(prev => ({ ...prev, loading: false }))
      throw err
    }
  }, [url, method, defaultHeaders, transformResponse, setError, clearError])

  return {
    ...state,
    error,
    execute,
    clearError
  }
}
