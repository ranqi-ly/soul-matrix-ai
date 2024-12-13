import { useState, useCallback } from 'react'
import { useError } from './useError'

interface FormState<T> {
  values: T
  errors: Partial<Record<keyof T, string>>
  touched: Partial<Record<keyof T, boolean>>
  isSubmitting: boolean
}

interface FormConfig<T> {
  initialValues: T
  validate?: (values: T) => Partial<Record<keyof T, string>>
  onSubmit: (values: T) => Promise<void> | void
}

export function useForm<T extends Record<string, any>>({
  initialValues,
  validate,
  onSubmit
}: FormConfig<T>) {
  const [state, setState] = useState<FormState<T>>({
    values: initialValues,
    errors: {},
    touched: {},
    isSubmitting: false
  })

  const { error, setError, clearError } = useError()

  const setFieldValue = useCallback((field: keyof T, value: any) => {
    setState(prev => ({
      ...prev,
      values: {
        ...prev.values,
        [field]: value
      },
      touched: {
        ...prev.touched,
        [field]: true
      }
    }))
  }, [])

  const setFieldTouched = useCallback((field: keyof T, isTouched = true) => {
    setState(prev => ({
      ...prev,
      touched: {
        ...prev.touched,
        [field]: isTouched
      }
    }))
  }, [])

  const validateForm = useCallback(() => {
    if (!validate) return {}
    const errors = validate(state.values)
    setState(prev => ({
      ...prev,
      errors
    }))
    return errors
  }, [state.values, validate])

  const handleSubmit = useCallback(async (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault()
    }

    const errors = validateForm()
    if (Object.keys(errors).length > 0) {
      return
    }

    setState(prev => ({
      ...prev,
      isSubmitting: true
    }))
    clearError()

    try {
      await onSubmit(state.values)
    } catch (err) {
      setError(err)
    } finally {
      setState(prev => ({
        ...prev,
        isSubmitting: false
      }))
    }
  }, [state.values, validateForm, onSubmit, setError, clearError])

  const resetForm = useCallback(() => {
    setState({
      values: initialValues,
      errors: {},
      touched: {},
      isSubmitting: false
    })
    clearError()
  }, [initialValues, clearError])

  return {
    values: state.values,
    errors: state.errors,
    touched: state.touched,
    isSubmitting: state.isSubmitting,
    error,
    setFieldValue,
    setFieldTouched,
    handleSubmit,
    resetForm,
    validateForm
  }
}
