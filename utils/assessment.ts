import { PersonAnswers, MatchResult, AnalysisReport } from '../types/assessment';
import { questions } from '../data/questions';

// 计算两个人的匹配度
export function calculateCompatibility(person1: PersonAnswers, person2: PersonAnswers): MatchResult {
  const categoryScores = calculateCategoryScores(person1, person2);
  const overallScore = calculateOverallScore(categoryScores);
  const stabilityIndex = calculateStabilityIndex(categoryScores);
  const growthPotential = calculateGrowthPotential(person1, person2);
  
  return {
    overallScore,
    stabilityIndex,
    growthPotential,
    riskFactors: identifyRiskFactors(categoryScores),
    strengthAreas: identifyStrengths(categoryScores),
    recommendations: generateRecommendations(categoryScores)
  };
}

// 计算每个类别的得分
function calculateCategoryScores(person1: PersonAnswers, person2: PersonAnswers) {
  const categories = ['attachment', 'conflict', 'values', 'financial', 'growth'];
  const scores: Record<string, number> = {};

  categories.forEach(category => {
    const categoryQuestions = questions.filter(q => q.category === category);
    let categoryScore = 0;
    let maxPossibleScore = 0;

    categoryQuestions.forEach(question => {
      const p1Answer = person1.answers.find(a => a.questionId === question.id);
      const p2Answer = person2.answers.find(a => a.questionId === question.id);

      if (p1Answer && p2Answer) {
        const p1Option = question.options.find(o => o.text === p1Answer.selectedOption);
        const p2Option = question.options.find(o => o.text === p2Answer.selectedOption);

        if (p1Option && p2Option) {
          // 计算答案的兼容性得分
          categoryScore += calculateAnswerCompatibility(p1Option, p2Option);
          maxPossibleScore += 1;
        }
      }
    });

    scores[category] = categoryScore / maxPossibleScore * 100;
  });

  return scores;
}

// 计算总体得分
function calculateOverallScore(categoryScores: Record<string, number>): number {
  const weights = {
    attachment: 0.25,
    conflict: 0.25,
    values: 0.2,
    financial: 0.15,
    growth: 0.15
  };

  return Object.entries(categoryScores).reduce((total, [category, score]) => {
    return total + score * weights[category as keyof typeof weights];
  }, 0);
}

// 计算稳定性指数
function calculateStabilityIndex(categoryScores: Record<string, number>): number {
  const stabilityFactors = ['values', 'conflict', 'financial'];
  return stabilityFactors.reduce((total, factor) => 
    total + categoryScores[factor], 0) / stabilityFactors.length;
}

// 计算成长潜力
function calculateGrowthPotential(person1: PersonAnswers, person2: PersonAnswers): number {
  const growthAnswers = [
    person1.answers.find(a => a.category === 'growth'),
    person2.answers.find(a => a.category === 'growth')
  ];

  // 基于成长意愿相关答案计算潜力分数
  return growthAnswers.filter(a => a?.selectedOption.includes('成长')).length * 50;
}

// 识别风险因素
function identifyRiskFactors(categoryScores: Record<string, number>): string[] {
  const riskFactors: string[] = [];
  
  if (categoryScores.attachment < 60) {
    riskFactors.push('依恋方式差异较大，需要更多理解和包容');
  }
  if (categoryScores.conflict < 60) {
    riskFactors.push('冲突处理方式存在分歧，建议加强沟通技巧');
  }
  if (categoryScores.values < 60) {
    riskFactors.push('核心价值观有待调和，需要更多交流和理解');
  }

  return riskFactors;
}

// 识别优势领域
function identifyStrengths(categoryScores: Record<string, number>): string[] {
  const strengths: string[] = [];

  if (categoryScores.attachment >= 80) {
    strengths.push('情感连接稳固，互相信任度高');
  }
  if (categoryScores.conflict >= 80) {
    strengths.push('善于处理分歧，沟通方式健康');
  }
  if (categoryScores.values >= 80) {
    strengths.push('价值观高度一致，有共同的人生目标');
  }

  return strengths;
}

// 生成建议
function generateRecommendations(categoryScores: Record<string, number>): {
  immediate: string[];
  longTerm: string[];
} {
  const recommendations = {
    immediate: [] as string[],
    longTerm: [] as string[]
  };

  // 根据不同维度的得分生成具体建议
  Object.entries(categoryScores).forEach(([category, score]) => {
    if (score < 60) {
      switch (category) {
        case 'attachment':
          recommendations.immediate.push('建议进行更多的情感交流活动');
          recommendations.longTerm.push('可以考虑参加情侣心理工作坊');
          break;
        case 'conflict':
          recommendations.immediate.push('学习"我感受"沟通法则');
          recommendations.longTerm.push('制定健康的冲突处理机制');
          break;
        case 'values':
          recommendations.immediate.push('深入交流彼此的人生规划');
          recommendations.longTerm.push('定期回顾和调整共同目标');
          break;
      }
    }
  });

  return recommendations;
}

// 计算两个答案之间的兼容性得分
function calculateAnswerCompatibility(option1: any, option2: any): number {
  // 基础分值
  let baseScore = 0;

  // 完全相同的答案
  if (option1.trait === option2.trait) {
    baseScore = 1;
  }
  // 互补性答案
  else if (isComplementary(option1.trait, option2.trait)) {
    baseScore = 0.8;
  }
  // 冲突性答案
  else if (isConflicting(option1.trait, option2.trait)) {
    baseScore = 0.4;
  }
  // 其他情况
  else {
    baseScore = 0.6;
  }

  // 考虑权重
  return baseScore * ((option1.weight + option2.weight) / 2);
}

// 判断两个特质是否互补
function isComplementary(trait1: string, trait2: string): boolean {
  const complementaryPairs = [
    ['理性思维', '感性思维'],
    ['主动型', '适应型'],
    ['领导型', '支持型']
  ];

  return complementaryPairs.some(pair => 
    (pair[0] === trait1 && pair[1] === trait2) ||
    (pair[1] === trait1 && pair[0] === trait2)
  );
}

// 判断两个特质是否冲突
function isConflicting(trait1: string, trait2: string): boolean {
  const conflictingPairs = [
    ['固定型思维', '成长型思维'],
    ['极度独立', '极度依赖'],
    ['完全保守', '完全开放']
  ];

  return conflictingPairs.some(pair => 
    (pair[0] === trait1 && pair[1] === trait2) ||
    (pair[1] === trait1 && pair[0] === trait2)
  );
}

// 生成分析报告
export function generateAnalysisReport(matchResult: MatchResult): AnalysisReport {
  return {
    matchScore: matchResult.overallScore,
    stabilityPrediction: {
      shortTerm: getStabilityPrediction(matchResult.stabilityIndex, 'short'),
      longTerm: getStabilityPrediction(matchResult.stabilityIndex, 'long')
    },
    keyStrengths: matchResult.strengthAreas,
    growthAreas: matchResult.riskFactors,
    practicalAdvice: [
      ...matchResult.recommendations.immediate,
      ...matchResult.recommendations.longTerm
    ]
  };
}

// 获取稳定性预测
function getStabilityPrediction(stabilityIndex: number, term: 'short' | 'long'): string {
  if (term === 'short') {
    if (stabilityIndex >= 80) {
      return '短期关系稳定性很高，建立了良好的沟通基础';
    } else if (stabilityIndex >= 60) {
      return '短期关系稳定性良好，需要继续培养默契';
    } else {
      return '短期需要更多努力来建立稳定关系';
    }
  } else {
    if (stabilityIndex >= 80) {
      return '长期发展潜力很大，具备持久关系的基础';
    } else if (stabilityIndex >= 60) {
      return '长期发展需要双方持续投入和调适';
    } else {
      return '长期发展需要克服一些重要挑战';
    }
  }
}
