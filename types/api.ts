export interface PersonInfo {
  name: string;
  gender: string;
  age: number;
  interests: string;
  values: string;
  lifestyle: string;
}

export interface PredictionResponse {
  score: number;
  analysis: string;
  compatibility: string;
  recommendations: string[];
}

export interface APIResponse<T> {
  success: boolean;
  data?: T;
  cached?: boolean;
  error?: {
    message: string;
  };
}
