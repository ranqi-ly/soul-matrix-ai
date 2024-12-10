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
    优势: string[];    // 优势
    挑战: string[];   // 挑战
    预测: string[];  // 预测
  };
  中期: {
    优势: string[];    // 优势
    挑战: string[];   // 挑战
    预测: string[];  // 预测
  };
  长期: {
    优势: string[];    // 优势
    挑战: string[];   // 挑战
    预测: string[];  // 预测
  };
}

export interface 建议 {
  内容: string;          // 建议内容
  优先级: '高' | '中' | '低';
  难易程度: '容易' | '适中' | '具有挑战';
  时间线: '即时' | '短期' | '长期';
  行动步骤: string[];    // 具体行动步骤
}

export interface 兼容性维度 {
  性格匹配度: number;      // 性格匹配度
  沟通方式: number;    // 沟通方式
  价值观: number;          // 价值观
  生活方式: number;       // 生活方式
  成长潜力: number; // 成长潜力
}

export interface 预测响应 {
  匹配度: number;           // 总体匹配度
  维度: 兼容性维度;
  分析: 详细分析;
  兼容性: string;   // 整体兼容性描述
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
