'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { FaHeart, FaUser, FaUsers, FaCalendar, FaHourglass } from 'react-icons/fa'
import { PersonInfo } from '@/types/api'

interface FormData {
  person1: PersonInfo;
  person2: PersonInfo;
}

export default function PredictionForm() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const [step, setStep] = useState(1)
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormData>()

  const watchedFields = watch()

  const isStepComplete = (stepNumber: number) => {
    switch (stepNumber) {
      case 1:
        return !!watchedFields.person1?.name && 
               !!watchedFields.person1?.gender && 
               !!watchedFields.person1?.age
      case 2:
        return !!watchedFields.person1?.interests
      case 3:
        return !!watchedFields.person1?.values
      case 4:
        return !!watchedFields.person1?.lifestyle
      case 5:
        return !!watchedFields.person2?.name && 
               !!watchedFields.person2?.gender && 
               !!watchedFields.person2?.age
      case 6:
        return !!watchedFields.person2?.interests
      case 7:
        return !!watchedFields.person2?.values
      case 8:
        return !!watchedFields.person2?.lifestyle
      default:
        return false
    }
  }

  const onSubmit = async (data: FormData) => {
    setLoading(true)
    setError(null)
    try {
      // 确保年龄是数字类型
      const formData = {
        person1: {
          ...data.person1,
          age: parseInt(data.person1.age.toString())
        },
        person2: {
          ...data.person2,
          age: parseInt(data.person2.age.toString())
        }
      };

      const response = await fetch('/api/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error?.message || '预测请求失败')
      }

      if (!result.success) {
        throw new Error(result.error?.message || '预测失败')
      }

      setResult(result.data)
      // 使用 requestIdleCallback 来处理滚动
      if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
        requestIdleCallback(() => {
          window.scrollTo({ top: 0, behavior: 'smooth' })
        })
      }
    } catch (err) {
      console.error('预测请求错误:', err)
      setError(err instanceof Error ? err.message : '发生未知错误')
    } finally {
      setLoading(false)
    }
  }

  const renderStepIndicator = () => (
    <div className="flex justify-between mb-8">
      {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
        <div
          key={s}
          className={`flex flex-col items-center ${
            s === step ? 'text-pink-600' : s < step ? 'text-green-500' : 'text-gray-300'
          }`}
        >
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
              s === step
                ? 'bg-pink-100 text-pink-600 border-2 border-pink-600'
                : s < step
                ? 'bg-green-100 text-green-500'
                : 'bg-gray-100'
            }`}
          >
            {(s === 1 || s === 5) && <FaUsers />}
            {(s === 2 || s === 6) && <FaHeart />}
            {(s === 3 || s === 7) && <FaCalendar />}
            {(s === 4 || s === 8) && <FaHourglass />}
          </div>
          <span className="text-sm font-medium">
            {s <= 4 ? '第一位' : '第二位'}
            {s === 1 || s === 5 ? ' - 基本信息' : ''}
            {s === 2 || s === 6 ? ' - 兴趣爱好' : ''}
            {s === 3 || s === 7 ? ' - 价值观' : ''}
            {s === 4 || s === 8 ? ' - 生活方式' : ''}
          </span>
        </div>
      ))}
    </div>
  )

  const renderPersonForm = (person: 'person1' | 'person2', title: string) => {
    const currentStep = person === 'person1' ? step : step - 4;
    
    return (
      <div className={`bg-white rounded-lg shadow-sm p-6 ${person === 'person1' ? 'border-r border-gray-200' : ''}`}>
        <div className="flex items-center mb-6">
          <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center mr-3">
            <span className="text-xl" role="img" aria-label={title}>
              {person === 'person1' ? '👨' : '👩'}
            </span>
          </div>
          <h3 className="text-lg font-medium text-gray-900">{title}</h3>
        </div>
        
        {currentStep === 1 && (
          <div className="space-y-4">
            <div>
              <label htmlFor={`${person}.name`} className="block text-sm font-medium text-gray-700">
                姓名
              </label>
              <input
                type="text"
                id={`${person}.name`}
                {...register(`${person}.name` as const, { required: '请输入姓名' })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                placeholder="请输入姓名"
              />
              {errors[person]?.name && (
                <p className="mt-1 text-sm text-red-600">{errors[person]?.name?.message}</p>
              )}
            </div>

            <div>
              <label htmlFor={`${person}.gender`} className="block text-sm font-medium text-gray-700">
                性别
              </label>
              <select
                id={`${person}.gender`}
                {...register(`${person}.gender` as const, { required: '请选择性别' })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
              >
                <option value="">请选择</option>
                <option value="male">男</option>
                <option value="female">女</option>
              </select>
              {errors[person]?.gender && (
                <p className="mt-1 text-sm text-red-600">{errors[person]?.gender?.message}</p>
              )}
            </div>

            <div>
              <label htmlFor={`${person}.age`} className="block text-sm font-medium text-gray-700">
                年龄
              </label>
              <input
                type="number"
                id={`${person}.age`}
                {...register(`${person}.age` as const, {
                  required: '请输入年龄',
                  min: { value: 18, message: '年龄必须大于18岁' },
                  max: { value: 100, message: '年龄必须小于100岁' },
                })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                placeholder="18-100岁"
              />
              {errors[person]?.age && (
                <p className="mt-1 text-sm text-red-600">{errors[person]?.age?.message}</p>
              )}
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div>
            <label htmlFor={`${person}.interests`} className="block text-sm font-medium text-gray-700">
              兴趣爱好
            </label>
            <p className="mt-1 text-sm text-gray-500">
              请描述您的兴趣爱好，例如：阅读、旅行、运动、音乐、电影等
            </p>
            <textarea
              id={`${person}.interests`}
              {...register(`${person}.interests` as const, { required: '请输入兴趣爱好' })}
              className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
              rows={4}
              placeholder="我喜欢..."
            />
            {errors[person]?.interests && (
              <p className="mt-1 text-sm text-red-600">{errors[person]?.interests?.message}</p>
            )}
          </div>
        )}

        {currentStep === 3 && (
          <div>
            <label htmlFor={`${person}.values`} className="block text-sm font-medium text-gray-700">
              价值观
            </label>
            <p className="mt-1 text-sm text-gray-500">
              请描述您的人生价值观，例如：对事业、家庭、金钱的看法等
            </p>
            <textarea
              id={`${person}.values`}
              {...register(`${person}.values` as const, { required: '请输入价值观' })}
              className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
              rows={4}
              placeholder="我认为..."
            />
            {errors[person]?.values && (
              <p className="mt-1 text-sm text-red-600">{errors[person]?.values?.message}</p>
            )}
          </div>
        )}

        {currentStep === 4 && (
          <div>
            <label htmlFor={`${person}.lifestyle`} className="block text-sm font-medium text-gray-700">
              生活方式
            </label>
            <p className="mt-1 text-sm text-gray-500">
              请描述您的日常生活方式，例如：作息时间、饮食习惯、社交方式等
            </p>
            <textarea
              id={`${person}.lifestyle`}
              {...register(`${person}.lifestyle` as const, { required: '请输入生活方式' })}
              className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
              rows={4}
              placeholder="我的生活..."
            />
            {errors[person]?.lifestyle && (
              <p className="mt-1 text-sm text-red-600">{errors[person]?.lifestyle?.message}</p>
            )}
          </div>
        )}
      </div>
    );
  };

  const renderResult = () => {
    if (!result) return null;

    return (
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">匹配分析结果</h3>
          
          {/* 匹配度评分 */}
          <div className="mb-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-2">总体契合度</h4>
            <div className="relative pt-1">
              <div className="flex mb-2 items-center justify-between">
                <div>
                  <span className="text-2xl font-bold text-pink-600">
                    {result.score || 0}
                    <span className="text-base font-normal text-gray-600 ml-1">分</span>
                  </span>
                </div>
              </div>
              <div className="overflow-hidden h-3 mb-4 text-xs flex rounded-full bg-pink-100">
                <div
                  style={{ width: `${result.score || 0}%` }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-pink-400 to-pink-600 transition-all duration-500 ease-in-out"
                />
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                <span>0</span>
                <span>25</span>
                <span>50</span>
                <span>75</span>
                <span>100</span>
              </div>
            </div>
          </div>

          {/* 分析结果 */}
          {result.analysis && (
            <div className="mb-6 bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                <span className="text-pink-600 mr-2">❤</span>
                优势互补分析
              </h4>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">{result.analysis}</p>
            </div>
          )}

          {/* 兼容性分析 */}
          {result.compatibility && (
            <div className="mb-6 bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                <span className="text-yellow-500 mr-2">⚠</span>
                潜在挑战
              </h4>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">{result.compatibility}</p>
            </div>
          )}

          {/* 建议列表 */}
          {result.recommendations && result.recommendations.length > 0 && (
            <div className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">
                <span className="text-blue-500 mr-2">💡</span>
                关系建议
              </h4>
              <div className="space-y-4">
                {result.recommendations.map((rec: string, index: number) => (
                  <div
                    key={index}
                    className="flex items-start bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex-shrink-0 w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-pink-500 font-semibold">{index + 1}</span>
                    </div>
                    <p className="text-gray-700 flex-1">{rec}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
            <span className="ml-3 text-gray-600">正在分析中...</span>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="text-center">
            <div className="mb-4 text-red-500">
              <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">预测失败</h3>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              onClick={() => {
                setError(null)
                setStep(1)
              }}
              className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
            >
              重新尝试
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (result && !error) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8 space-y-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">匹配分析结果</h3>
            <p className="text-gray-600">基于双方的个人特征分析</p>
          </div>

          <div className="space-y-8">
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-4">匹配度评分</h4>
              <div className="relative pt-1">
                <div className="flex mb-2 items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-pink-600 bg-pink-200">
                      契合度
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-semibold inline-block text-pink-600">
                      {result.score}%
                    </span>
                  </div>
                </div>
                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-pink-200">
                  <div
                    style={{ width: `${result.score}%` }}
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-pink-500 transition-all duration-1000 ease-out"
                  ></div>
                </div>
              </div>
            </div>

            <div className="bg-pink-50 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">匹配分析</h4>
              <p className="text-gray-700 leading-relaxed">{result.analysis}</p>
            </div>

            <div className="bg-pink-50 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">相性分析</h4>
              <p className="text-gray-700 leading-relaxed">{result.compatibility}</p>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-4">恋爱建议</h4>
              <div className="space-y-4">
                {result.recommendations.map((rec: string, index: number) => (
                  <div
                    key={index}
                    className="flex items-start bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                  >
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center mr-3 font-semibold">
                      {index + 1}
                    </span>
                    <p className="text-gray-700">{rec}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <button
              onClick={() => {
                setResult(null)
                setStep(1)
              }}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
            >
              重新预测
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <div className="relative">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="bg-white px-3 text-lg font-medium text-gray-900">
              {step <= 4 ? '第一位信息' : '第二位信息'}
            </span>
          </div>
        </div>
      </div>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {step <= 4 ? (
            renderPersonForm('person1', '第一位')
          ) : (
            renderPersonForm('person2', '第二位')
          )}
        </div>

        <div className="flex justify-between pt-6">
          <button
            type="button"
            onClick={() => setStep(step > 1 ? step - 1 : 1)}
            className={`inline-flex items-center px-4 py-2 border border-gray-300 text-base font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 ${
              step === 1 ? 'invisible' : ''
            }`}
          >
            上一步
          </button>

          {step < 8 ? (
            <button
              type="button"
              onClick={() => {
                if (isStepComplete(step)) {
                  setStep(step + 1);
                }
              }}
              className={`inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white ${
                isStepComplete(step)
                  ? 'bg-pink-600 hover:bg-pink-700'
                  : 'bg-gray-300 cursor-not-allowed'
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500`}
              disabled={!isStepComplete(step)}
            >
              下一步
            </button>
          ) : (
            <button
              type="submit"
              className={`inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white ${
                isStepComplete(step)
                  ? 'bg-pink-600 hover:bg-pink-700'
                  : 'bg-gray-300 cursor-not-allowed'
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500`}
              disabled={!isStepComplete(step)}
            >
              开始分析
            </button>
          )}
        </div>
      </form>

      {loading && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white rounded-lg p-8">
            <div className="flex items-center space-x-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-500"></div>
              <span className="text-gray-700">正在分析中...</span>
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="mt-6 bg-red-50 border border-red-200 rounded-md p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">分析失败</h3>
              <p className="mt-2 text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}

      {result && (
        <div className="mt-8 bg-white rounded-xl shadow-lg p-8 space-y-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">匹配分析结果</h3>
            <p className="text-gray-600">基于双方的个人特征分析</p>
          </div>

          <div className="space-y-8">
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-4">匹配度评分</h4>
              <div className="relative pt-1">
                <div className="flex mb-2 items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-pink-600 bg-pink-200">
                      契合度
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-semibold inline-block text-pink-600">
                      {result.score}%
                    </span>
                  </div>
                </div>
                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-pink-200">
                  <div
                    style={{ width: `${result.score}%` }}
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-pink-500 transition-all duration-1000 ease-out"
                  ></div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-pink-50 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">性格特点分析</h4>
                <p className="text-gray-700 leading-relaxed">{result.analysis}</p>
              </div>

              <div className="bg-pink-50 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">优势和挑战</h4>
                <p className="text-gray-700 leading-relaxed">{result.compatibility}</p>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-4">关系建议</h4>
              <div className="space-y-4">
                {result.recommendations.map((rec: string, index: number) => (
                  <div
                    key={index}
                    className="flex items-start bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                  >
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center mr-3">
                      {index + 1}
                    </span>
                    <p className="text-gray-700">{rec}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <button
              onClick={() => {
                setResult(null);
                setStep(1);
              }}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
            >
              重新分析
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
