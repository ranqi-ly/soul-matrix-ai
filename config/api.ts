// API 配置
export const API_CONFIG = {
  // OpenAI API 配置
  openai: {
    baseUrl: process.env.OPENAI_API_BASE_URL || 'https://yunwu.ai/v1',
    model: process.env.OPENAI_API_MODEL || 'gpt-3.5-turbo',
    maxTokens: parseInt(process.env.OPENAI_MAX_TOKENS || '1000'),
    temperature: parseFloat(process.env.OPENAI_TEMPERATURE || '0.7'),
  },
  
  // 重试配置
  retry: {
    maxRetries: parseInt(process.env.API_MAX_RETRIES || '3'),
    initialDelay: parseInt(process.env.API_INITIAL_RETRY_DELAY || '2000'),
    maxDelay: parseInt(process.env.API_MAX_RETRY_DELAY || '10000'),
  },
  
  // 超时配置
  timeout: {
    request: parseInt(process.env.API_REQUEST_TIMEOUT || '30000'),
  },
}

// API 响应类型
export interface APIResponse<T> {
  success: boolean
  data?: T
  error?: {
    code: string
    message: string
  }
}

// API 错误代码
export const API_ERROR_CODES = {
  RATE_LIMIT: 'rate_limit_exceeded',
  INVALID_API_KEY: 'invalid_api_key',
  INSUFFICIENT_QUOTA: 'insufficient_quota',
  NETWORK_ERROR: 'network_error',
  TIMEOUT: 'request_timeout',
  UNKNOWN: 'unknown_error',
}
