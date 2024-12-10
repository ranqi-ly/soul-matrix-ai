// 问题选项类型
export interface Option {
  text: string;
  trait: string;
  weight: number;
}

// 问题类型
export interface Question {
  id: string;
  text: string;
  category: 'attachment' | 'conflict' | 'values' | 'financial' | 'growth' | 'expression' | 'parenting' | 'goals';
  options: Option[];
}

// 答案类型
export interface Answer {
  questionId: string;
  selectedOption: string;
  category: string;
}

// 个人答案集合
export interface PersonAnswers {
  id: string;
  name: string;
  answers: Answer[];
}

// 匹配结果类型
export interface MatchResult {
  overallScore: number;
  stabilityIndex: number;
  growthPotential: number;
  riskFactors: string[];
  strengthAreas: string[];
  recommendations: {
    immediate: string[];
    longTerm: string[];
  };
}

// 分析报告类型
export interface AnalysisReport {
  matchScore: number;
  stabilityPrediction: {
    shortTerm: string;
    longTerm: string;
  };
  keyStrengths: string[];
  growthAreas: string[];
  practicalAdvice: string[];
}
