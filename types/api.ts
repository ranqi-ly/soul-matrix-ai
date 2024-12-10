export interface PersonInfo {
  name: string;
  gender: string;
  age: number;
  interests: string;
  values: string;
  lifestyle: string;
}

export interface DetailedAnalysis {
  shortTerm: {
    strengths: string[];
    challenges: string[];
    predictions: string[];
  };
  midTerm: {
    strengths: string[];
    challenges: string[];
    predictions: string[];
  };
  longTerm: {
    strengths: string[];
    challenges: string[];
    predictions: string[];
  };
}

export interface Suggestion {
  content: string;
  priority: 'high' | 'medium' | 'low';
  difficulty: 'easy' | 'medium' | 'challenging';
  timeline: 'immediate' | 'short-term' | 'long-term';
  actionSteps: string[];
}

export interface CompatibilityDimensions {
  personalityMatch: number;
  communicationStyle: number;
  values: number;
  lifestyle: number;
  growthPotential: number;
}

export interface PredictionResponse {
  matchScore: number;
  dimensions: CompatibilityDimensions;
  analysis: DetailedAnalysis;
  compatibility: string;
  suggestions: Suggestion[];
}

export interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// 为了保持向后兼容，保留中文接口
export interface 人物信息 {
  姓名: string;
  性别: string;
  年龄: number;
  兴趣: string;
  价值观: string;
  生活方式: string;
}

export interface 详细分析 {
  短期: {
    优势: string[];
    挑战: string[];
    预测: string[];
  };
  中期: {
    优势: string[];
    挑战: string[];
    预测: string[];
  };
  长期: {
    优势: string[];
    挑战: string[];
    预测: string[];
  };
}

export interface 建议 {
  内容: string;
  优先级: '高' | '中' | '低';
  难易程度: '容易' | '适中' | '具有挑战';
  时间线: '即时' | '短期' | '长期';
  行动步骤: string[];
}

export interface 兼容性维度 {
  性格匹配度: number;
  沟通方式: number;
  价值观: number;
  生活方式: number;
  成长潜力: number;
}

export interface 预测响应 {
  匹配度: number;
  维度: 兼容性维度;
  分析: 详细分析;
  兼容性: string;
  建议: 建议[];
}

export interface API响应<T> {
  成功: boolean;
  数据?: T;
  缓存?: boolean;
  错误?: {
    消息: string;
  };
}
