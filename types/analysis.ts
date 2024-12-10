export interface ActionStep {
  content: string;               // 步骤内容
  expectedOutcome: string;       // 预期结果
  metrics: string;              // 完成指标
  timeline: string;             // 具体时间线
  checkpoints: string[];        // 检查点
  resources: string[];          // 所需资源
}

export interface CaseReference {
  案例描述: string;
  成功经验: string[];
  注意事项: string[];
}

export interface DataSupport {
  研究来源: string;
  成功率: string;
  关键因素: string[];
  本土数据: string;
}

export interface Suggestion {
  content: string;              // 建议内容
  priority: '高' | '中' | '低';   // 优先级
  difficulty: '简单' | '中等' | '困难'; // 难易程度
  timeline: string;             // 整体时间线
  category: string;             // 建议类别
  impact: string;              // 预期影响
  actionSteps: ActionStep[];    // 详细行动步骤
  prerequisites: string[];      // 前置条件
  risks: string[];             // 潜在风险
  successCriteria: string[];   // 成功标准
  caseReference: CaseReference; // 案例参考
  dataSupport: DataSupport;    // 数据支持
}

export interface DimensionAnalysis {
  分数: number;
  优势?: string[];
  特点?: string[];
  共同点?: string[];
  兼容性?: string[];
  发展空间?: string[];
  潜在问题?: string[];
  建议?: string[];
  差异点?: string[];
  待改善?: string[];
  机遇?: string[];
  相关案例: string;
}

export interface StatisticalData {
  同龄群体婚恋特点: string;
  成功率数据: string;
  关键影响因素: string[];
}

export interface AgeGroupAnalysis {
  特征: string;
  优势: string[];
  挑战: string[];
  参考案例: string;
  统计数据: StatisticalData;
}

export interface DevelopmentStageAdvice {
  当前阶段: string;
  短期: {
    重点任务: string[];
    潜在风险: string[];
    参考案例: string;
    成功概率: string;
  };
  中期: {
    关键目标: string[];
    需要准备: string[];
    参考案例: string;
    发展预测: string;
  };
  长期: {
    规划建议: string[];
    关注重点: string[];
    参考案例: string;
    预期结果: string;
  };
}

export interface AnalysisResult {
  匹配度: number;
  维度分析: {
    性格匹配度: DimensionAnalysis;
    沟通方式: DimensionAnalysis;
    价值观: DimensionAnalysis;
    生活方式: DimensionAnalysis;
    成长潜力: DimensionAnalysis;
  };
  年龄段分析: AgeGroupAnalysis;
  发展阶段建议: DevelopmentStageAdvice;
  具体建议: Suggestion[];
}
