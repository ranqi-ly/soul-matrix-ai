import { Question } from '../types/assessment';

export const questions: Question[] = [
  // 情感依恋模式问题（基于依恋理论）
  {
    id: 'attachment_1',
    category: 'attachment',
    text: '当感情受挫时，你通常会：',
    options: [
      {
        text: '主动寻求沟通和靠近',
        trait: '安全型依恋',
        weight: 1.2
      },
      {
        text: '需要时间独处和思考',
        trait: '回避型依恋',
        weight: 1.0
      },
      {
        text: '感到焦虑，需要立即确认关系',
        trait: '焦虑型依恋',
        weight: 0.8
      }
    ]
  },
  {
    id: 'attachment_2',
    category: 'attachment',
    text: '在亲密关系中，你最看重：',
    options: [
      {
        text: '情感安全感和稳定性',
        trait: '安全需求',
        weight: 1.2
      },
      {
        text: '个人空间和自主权',
        trait: '独立需求',
        weight: 1.0
      },
      {
        text: '亲密度和陪伴时间',
        trait: '依赖需求',
        weight: 0.9
      }
    ]
  },

  // 冲突处理方式（基于Gottman理论）
  {
    id: 'conflict_1',
    category: 'conflict',
    text: '发生争执时，你最容易：',
    options: [
      {
        text: '保持冷静，寻求解决方案',
        trait: '建设性处理',
        weight: 1.2
      },
      {
        text: '批评对方的性格或行为',
        trait: '批评倾向',
        weight: 0.7
      },
      {
        text: '采取防御或反击态度',
        trait: '防御反击',
        weight: 0.6
      }
    ]
  },
  {
    id: 'conflict_2',
    category: 'conflict',
    text: '面对持续的分歧，你会：',
    options: [
      {
        text: '愿意妥协，寻找平衡点',
        trait: '包容性',
        weight: 1.2
      },
      {
        text: '坚持原则，寻求认同',
        trait: '原则性',
        weight: 0.9
      },
      {
        text: '选择退让或沉默',
        trait: '退避性',
        weight: 0.7
      }
    ]
  },

  // 情感表达（基于五种爱之语）
  {
    id: 'expression_1',
    category: 'expression',
    text: '你最希望伴侣如何表达爱：',
    options: [
      {
        text: '用语言表达关心和肯定',
        trait: '肯定语言',
        weight: 1.0
      },
      {
        text: '通过行动展示关心',
        trait: '服务行动',
        weight: 1.0
      },
      {
        text: '给予身体接触和亲密',
        trait: '身体接触',
        weight: 1.0
      }
    ]
  },

  // 家庭价值观（基于文化价值观研究）
  {
    id: 'values_1',
    category: 'values',
    text: '对于婚姻的核心期待是：',
    options: [
      {
        text: '互相理解，共同成长',
        trait: '成长型婚姻',
        weight: 1.2
      },
      {
        text: '履行责任，相互扶持',
        trait: '责任型婚姻',
        weight: 1.0
      },
      {
        text: '保持激情，追求浪漫',
        trait: '浪漫型婚姻',
        weight: 0.9
      }
    ]
  },
  {
    id: 'values_2',
    category: 'values',
    text: '对于与原生家庭的关系：',
    options: [
      {
        text: '保持适度距离和边界',
        trait: '健康边界',
        weight: 1.2
      },
      {
        text: '密切联系，深度融入',
        trait: '传统家庭',
        weight: 0.9
      },
      {
        text: '各自处理，互不干涉',
        trait: '独立家庭',
        weight: 0.8
      }
    ]
  },

  // 生活目标
  {
    id: 'goals_1',
    category: 'goals',
    text: '对未来5-10年的规划：',
    options: [
      {
        text: '事业发展与家庭平衡',
        trait: '平衡发展',
        weight: 1.1
      },
      {
        text: '以家庭为重心发展',
        trait: '家庭优先',
        weight: 1.0
      },
      {
        text: '追求个人理想实现',
        trait: '个人发展',
        weight: 0.9
      }
    ]
  },

  // 经济观念
  {
    id: 'financial_1',
    category: 'financial',
    text: '对于家庭财务管理：',
    options: [
      {
        text: '共同规划，透明管理',
        trait: '共同经济',
        weight: 1.1
      },
      {
        text: '分工明确，责任到人',
        trait: '分工经济',
        weight: 1.0
      },
      {
        text: '各自管理，保持独立',
        trait: '独立经济',
        weight: 0.9
      }
    ]
  },

  // 亲子教育观
  {
    id: 'parenting_1',
    category: 'parenting',
    text: '对于孩子教育的看法：',
    options: [
      {
        text: '民主开放，因材施教',
        trait: '开放教育',
        weight: 1.1
      },
      {
        text: '严格要求，注重成绩',
        trait: '严格教育',
        weight: 0.9
      },
      {
        text: '自然发展，快乐至上',
        trait: '自然教育',
        weight: 1.0
      }
    ]
  },

  // 成长意愿
  {
    id: 'growth_1',
    category: 'growth',
    text: '面对关系中的困难：',
    options: [
      {
        text: '主动学习，寻求改变',
        trait: '成长型思维',
        weight: 1.2
      },
      {
        text: '寻求专业咨询帮助',
        trait: '求助型思维',
        weight: 1.1
      },
      {
        text: '相信时间会解决问题',
        trait: '随缘思维',
        weight: 0.8
      }
    ]
  }
];
