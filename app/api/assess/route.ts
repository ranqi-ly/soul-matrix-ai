import { NextResponse } from 'next/server';
import { questions } from '@/data/questions';
import cache from 'memory-cache';
import axios from 'axios';

const CACHE_DURATION = parseInt(process.env.CACHE_DURATION || '3600000'); // 1小时缓存

// 计算特征得分
function calculateTraitScores(answers: Record<string, string>) {
  const traitScores: Record<string, { count: number; score: number }> = {};

  // 遍历所有答案
  Object.entries(answers).forEach(([questionId, answer]) => {
    const question = questions.find(q => q.id === questionId);
    if (!question) return;

    const option = question.options.find(opt => opt.text === answer);
    if (!option) return;

    // 累加每个特征的得分和计数
    if (!traitScores[option.trait]) {
      traitScores[option.trait] = { count: 0, score: 0 };
    }
    traitScores[option.trait].count += 1;
    traitScores[option.trait].score += option.weight;
  });

  // 计算每个特征的平均得分
  return Object.entries(traitScores).reduce((acc, [trait, { count, score }]) => {
    acc[trait] = (score / count) * 100;
    return acc;
  }, {} as Record<string, number>);
}

// 生成维度评分
function generateDimensionScores(traitScores: Record<string, number>) {
  const dimensionMapping = {
    性格匹配度: ['安全型依恋', '健康界限', '成长型思维'],
    沟通方式: ['建设性处理', '包容性', '肯定语言'],
    价值观: ['成长型婚姻', '健康边界', '平衡发展'],
    生活方式: ['共同经济', '开放教育', '服务行动'],
    成长潜力: ['成长型思维', '求助型思维', '包容性']
  };

  return Object.entries(dimensionMapping).reduce((acc, [dimension, traits]) => {
    const validTraits = traits.filter(trait => traitScores[trait]);
    if (validTraits.length === 0) return { ...acc, [dimension]: 75 }; // 默认值

    const dimensionScore = validTraits.reduce((sum, trait) => sum + (traitScores[trait] || 0), 0) / validTraits.length;
    return { ...acc, [dimension]: Math.round(dimensionScore) };
  }, {} as Record<string, number>);
}

// 验证维度分析数据
function validateDimensionAnalysis(data: any) {
  if (!data || typeof data !== 'object') {
    console.warn('Invalid dimension analysis data:', data);
    return {
      分数: 0,
      优势: [],
      挑战: []
    };
  }

  return {
    分数: Number(data.分数) || 0,
    优势: Array.isArray(data.优势) ? data.优势 : [],
    挑战: Array.isArray(data.挑战) ? data.挑战 : []
  };
}

// 验证年龄段分析数据
function validateAgeAnalysis(data: any) {
  if (!data || typeof data !== 'object') {
    console.warn('Invalid age analysis data:', data);
    return {
      特征: '',
      优势: [],
      挑战: [],
      参考案例: '',
      统计数据: {
        同龄群体婚恋特点: '',
        成功率数据: '',
        关键影响因素: []
      }
    };
  }

  return {
    特征: data.特征 || '',
    优势: Array.isArray(data.优势) ? data.优势 : [],
    挑战: Array.isArray(data.挑战) ? data.挑战 : [],
    参考案例: data.参考案例 || '',
    统计数据: {
      同龄群体婚恋特点: data.统计数据?.同龄群体婚恋特点 || '',
      成功率数据: data.统计数据?.成功率数据 || '',
      关键影响因素: Array.isArray(data.统计数据?.关键影响因素) ? data.统计数据.关键影响因素 : []
    }
  };
}

// 验证发展阶段建议数据
function validateDevelopmentAdvice(data: any) {
  if (!data || typeof data !== 'object') {
    console.warn('Invalid development advice data:', data);
    return {
      当前阶段: '',
      短期: {
        时间范围: '1-3个月',
        重点任务: [],
        潜在风险: [],
        参考案例: [],
        成功概率: ''
      },
      中期: {
        时间范围: '3-6个月',
        重点任务: [],
        潜在风险: [],
        参考案例: [],
        成功概率: ''
      },
      长期: {
        时间范围: '6个月以上',
        重点任务: [],
        潜在风险: [],
        参考案例: [],
        成功概率: ''
      }
    };
  }

  const validateTimePeriod = (period: any) => {
    if (!period || typeof period !== 'object') {
      return {
        时间范围: '',
        重点任务: [],
        潜在风险: [],
        参考案例: [],
        成功概率: ''
      };
    }

    return {
      时间范围: period.时间范围 || '',
      重点任务: Array.isArray(period.重点任务) ? period.重点任务.map((task: any) => ({
        任务: task?.任务 || '',
        具体目标: task?.具体目标 || '',
        衡量标准: task?.衡量标准 || '',
        可行性: task?.可行性 || '',
        相关性: task?.相关性 || '',
        时间节点: task?.时间节点 || ''
      })) : [],
      潜在风险: Array.isArray(period.潜在风险) ? period.潜在风险.map((risk: any) => ({
        风险: risk?.风险 || '',
        预防措施: risk?.预防措施 || '',
        应对方案: risk?.应对方案 || ''
      })) : [],
      参考案例: Array.isArray(period.参考案例) ? period.参考案例.map((ref: any) => ({
        title: ref?.title || '',
        url: ref?.url || '',
        description: ref?.description || ''
      })) : [],
      成功概率: period.成功概率 || ''
    };
  };

  return {
    当前阶段: data.当前阶段 || '',
    短期: validateTimePeriod(data.短期),
    中期: validateTimePeriod(data.中期),
    长期: validateTimePeriod(data.长期)
  };
}

// 验证具体建议数据
function validateSuggestion(data: any) {
  if (!data || typeof data !== 'object') {
    console.warn('Invalid suggestion data:', data);
    return null;
  }

  return {
    阶段: data.阶段 || '短期',
    content: data.content || '',
    priority: data.priority || '中',
    difficulty: data.difficulty || '中等',
    timeline: data.timeline || '',
    category: data.category || '',
    impact: data.impact || '',
    prerequisites: Array.isArray(data.prerequisites) ? data.prerequisites : [],
    actionSteps: Array.isArray(data.actionSteps) ? data.actionSteps.map((step: any) => ({
      content: step?.content || '',
      expectedOutcome: step?.expectedOutcome || '',
      metrics: step?.metrics || '',
      timeline: step?.timeline || '',
      checkpoints: Array.isArray(step?.checkpoints) ? step.checkpoints : [],
      resources: Array.isArray(step?.resources) ? step.resources : []
    })) : [],
    risks: Array.isArray(data.risks) ? data.risks : [],
    successCriteria: Array.isArray(data.successCriteria) ? data.successCriteria : [],
    caseReference: {
      案例描述: data.caseReference?.案例描述 || '',
      成功经验: Array.isArray(data.caseReference?.成功经验) ? data.caseReference.成功经验 : [],
      注意事项: Array.isArray(data.caseReference?.注意事项) ? data.caseReference.注意事项 : []
    },
    dataSupport: {
      研究来源: data.dataSupport?.研究来源 || '',
      成功率: data.dataSupport?.成功率 || '',
      关键因素: Array.isArray(data.dataSupport?.关键因素) ? data.dataSupport.关键因素 : [],
      本土数据: data.dataSupport?.本土数据 || ''
    }
  };
}

// 验证整体分析结果
function validateAnalysisResult(data: any) {
  if (!data || typeof data !== 'object') {
    console.error('Invalid analysis result data structure:', data);
    throw new Error('Invalid analysis result data');
  }

  // 记录原始数据结构以便调试
  console.log('Validating analysis result with structure:', JSON.stringify({
    hasMatchScore: '匹配度' in data,
    hasDimensionAnalysis: '维度分析' in data,
    hasAgeAnalysis: '年龄段分析' in data,
    hasDevelopmentAdvice: '发展阶段建议' in data,
    dimensionAnalysisKeys: data.维度分析 ? Object.keys(data.维度分析) : []
  }, null, 2));

  try {
    // 验证并提供默认值
    const result = {
      匹配度: Number(data.匹配度) || 0,
      维度分析: {
        性格匹配度: validateDimensionAnalysis(data.维度分析?.性格匹配度),
        沟通方式: validateDimensionAnalysis(data.维度分析?.沟通方式),
        价值观: validateDimensionAnalysis(data.维度分析?.价值观),
        生活方式: validateDimensionAnalysis(data.维度分析?.生活方式),
        成长潜力: validateDimensionAnalysis(data.维度分析?.成长潜力)
      },
      年龄段分析: validateAgeAnalysis(data.年龄段分析 || {}),
      发展阶段建议: validateDevelopmentAdvice(data.发展阶段建议 || {}),
    };

    return result;
  } catch (error) {
    console.error('Error during analysis result validation:', error);
    console.error('Problematic data:', JSON.stringify(data, null, 2));
    if (error instanceof Error) {
      throw new Error(`Invalid analysis result structure: ${error.message}`);
    } else {
      throw new Error('Invalid analysis result structure: Unknown error');
    }
  }
}

// 添加重试工具函数
async function retryOperation<T>(
  operation: () => Promise<T>,
  maxAttempts: number = 3,
  delayMs: number = 1000
): Promise<T> {
  let lastError;
  
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error;
      console.log(`Attempt ${attempt} failed:`, error);
      
      if (attempt < maxAttempts) {
        await new Promise(resolve => setTimeout(resolve, delayMs * attempt));
      }
    }
  }
  
  throw lastError;
}

// 添加数据修复函数
function repairJsonContent(content: string): string {
  // 移除可能导致解析错误的字符
  content = content.replace(/[\u0000-\u0019]+/g, " ");
  
  try {
    // 尝试解析，如果成功直接返回
    JSON.parse(content);
    return content;
  } catch (error) {
    // 1. 修复未闭合的数组
    content = content.replace(/\[\s*"[^"\]]*$/, '"]');
    
    // 2. 修复未闭合的对象
    const leftBraces = (content.match(/{/g) || []).length;
    const rightBraces = (content.match(/}/g) || []).length;
    if (leftBraces > rightBraces) {
      content = content.trim();
      for (let i = 0; i < leftBraces - rightBraces; i++) {
        content += '}';
      }
    }
    
    // 3. 修复未闭合的字符串
    content = content.replace(/"([^"]*?)(?:\s*[\}\]\,]|$)/g, '"$1"$2');
    
    // 4. 修复常见的URL截断
    content = content.replace(
      /"url":\s*"https?:\/\/[^"]*?(?:\s|$)/g,
      (match) => {
        if (match.includes('zhihu.com')) {
          return '"url": "https://www.zhihu.com/people/zhang-de-fen"';
        } else if (match.includes('xinli001')) {
          return '"url": "https://www.xinli001.com"';
        } else if (match.includes('jiandanxinli')) {
          return '"url": "https://space.jiandanxinli.com"';
        } else {
          return '"url": "https://www.douban.com/channel/30166503/"';
        }
      }
    );
    
    return content;
  }
}

// 添加验证函数
function validateJsonStructure(data: any): boolean {
  const requiredFields = ['匹配度', '维度分析', '年龄段分析', '发展阶段建议'];
  return requiredFields.every(field => {
    const hasField = field in data;
    if (!hasField) {
      console.error(`Missing required field: ${field}`);
    }
    return hasField;
  });
}

export async function POST(request: Request) {
  try {
    // 检查环境变量
    const apiKey = process.env.YUNWU_API_KEY;
    const apiUrl = process.env.YUNWU_API_URL;
    const model = process.env.YUNWU_MODEL || 'gpt-3.5-turbo';

    console.log('API Configuration:', {
      apiUrl,
      model,
      hasApiKey: !!apiKey
    });

    if (!apiKey || !apiUrl) {
      console.error('Missing API configuration:', { hasApiKey: !!apiKey, hasApiUrl: !!apiUrl });
      return NextResponse.json({
        success: false,
        error: {
          message: 'API配置错误，请联系管理员'
        }
      }, { status: 500 });
    }

    // 解析请求体
    const body = await request.json();
    const { person1, person2 } = body;

    if (!person1?.answers || !person2?.answers || 
        Object.keys(person1.answers).length === 0 || 
        Object.keys(person2.answers).length === 0) {
      return NextResponse.json({
        success: false,
        error: {
          message: '请两位参与者都完成所有问题'
        }
      }, { status: 400 });
    }

    // 计算两个人的特征得分
    const traitScores1 = calculateTraitScores(person1.answers);
    const traitScores2 = calculateTraitScores(person2.answers);
    console.log('Trait scores:', { person1: traitScores1, person2: traitScores2 });
    
    // 生成两个人的维度评分
    const dimensionScores1 = generateDimensionScores(traitScores1);
    const dimensionScores2 = generateDimensionScores(traitScores2);
    console.log('Dimension scores:', { person1: dimensionScores1, person2: dimensionScores2 });

    // 准备系统提示
    const systemPrompt = `你是一位专业的婚恋顾问AI助手。请根据提供的信息进行分析并给出建议。

重要提示：
1. 必须返回有效的JSON格式数据
2. 所有键名必须使用双引号
3. 不要在JSON中包含任何注释或额外文本
4. 确保所有字符串值使用双引号而不是单引号
5. 数值类型不需要引号
6. 参考案例只需提供文章标题，不需要提供链接。标题应该：
   - 简明扼要，突出主题
   - 与建议内容高度相关
   - 具有实用性和指导意义
   - 标题长度保持在10-30个字之间
7. 发展阶段建议必须包含具体、可操作的内容，避免空泛的表述
8. 发展阶段建议必须根据两人的具体情况来制定，包括：
   - 当前阶段：基于两人的回答判断当前关系所处的阶段
   - 短期建议（1-3个月）：针对当前最急需改善的方面
   - 中期建议（3-6个月）：关注关系的稳定发展
   - 长期建议（6个月以上）：规划长远发展方向
9. 每个阶段的建议都必须包含：
   - 具体的时间范围
   - 可执行的重点任务（包含任务描述、具体目标、衡量标准、可行性分析、相关性说明和时间节点）
   - 可能遇到的风险和应对方案
   - 相关的参考文章标题
   - 基于当前情况的成功概率评估

分析对象信息：
人物1: ${JSON.stringify(person1)}
人物2: ${JSON.stringify(person2)}

请根据两人的具体情况，分析他们的匹配程度，并给出个性化的发展建议。特别注意：
1. 建议要具体且可执行，避免泛泛而谈
2. 时间节点要明确，便于执行和检查
3. 风险预警要有针对性，基于两人的特点
4. 参考案例要实用且具有指导意义
5. 成功概率要基于实际情况评估，给出具体理由

请按照以下格式返回分析结果：

{
  "匹配度": <根据实际情况评估的分数>,
  "维度分析": {
    "性格匹配度": { "分数": <分数>, "优势": [<具体优势>], "挑战": [<具体挑战>] },
    "沟通方式": { "分数": <分数>, "优势": [<具体优势>], "挑战": [<具体挑战>] },
    "价值观": { "分数": <分数>, "优势": [<具体优势>], "挑战": [<具体挑战>] },
    "生活方式": { "分数": <分数>, "优势": [<具体优势>], "挑战": [<具体挑战>] },
    "成长潜力": { "分数": <分数>, "优势": [<具体优势>], "挑战": [<具体挑战>] }
  },
  "年龄段分析": {
    "特征": "<基于实际年龄的分析>",
    "优势": ["<年龄相关优势>"],
    "挑战": ["<年龄相关挑战>"],
    "参考案例": "<相关真实案例>",
    "统计数据": {
      "同龄群体婚恋特点": "<真实统计数据>",
      "成功率数据": "<可靠的统计数据>",
      "关键影响因素": ["<实际影响因素>"]
    }
  },
  "发展阶段建议": {
    "当前阶段": "<基于实际情况的判断>",
    "短期": {
      "时间范围": "<具体时间范围>",
      "重点任务": [
        {
          "任务": "<具体任务>",
          "具体目标": "<可衡量的目标>",
          "衡量标准": "<明确的标准>",
          "可行性": "<实施方法>",
          "相关性": "<与关系发展的关联>",
          "时间节点": "<明确的时间点>"
        }
      ],
      "潜在风险": [
        {
          "风险": "<具体风险>",
          "预防措施": "<预防方法>",
          "应对方案": "<应对策略>"
        }
      ],
      "参考案例": [
        {
          "title": "<文章标题>",
          "description": "<文章描述>"
        }
      ],
      "成功概率": "<基于实际情况的评估>"
    },
    "中期": {
      <类似短期的结构，但关注3-6个月的发展>
    },
    "长期": {
      <类似短期的结构，但关注6个月以上的发展>
    }
  }
}`;

    try {
      console.log('Sending request to API:', apiUrl);
      
      // 使用 axios 调用 API
      const apiResponse = await retryOperation(async () => {
        const response = await axios.post(apiUrl, {
          model,
          messages: [
            { 
              role: 'system', 
              content: `${systemPrompt}\n注意：请确保响应简洁，每个描述控制在100字以内。参考案例标题应简明扼要，突出主题。` 
            },
            { 
              role: 'user', 
              content: '请基于以上测评结果提供分析和建议。保持简洁和可操作性。' 
            }
          ],
          temperature: 0.5, // 降低随机性
          max_tokens: 1500, // 限制输出长度
          response_format: { type: "json_object" }
        }, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
          },
          timeout: 30000,
          validateStatus: null
        });

        if (response.status !== 200) {
          throw new Error('API请求失败');
        }

        return response;
      }, 3, 2000);

      if (!apiResponse.data?.choices?.[0]?.message?.content) {
        throw new Error('API响应格式错误');
      }

      // 修复和解析JSON
      const content = apiResponse.data.choices[0].message.content;
      console.log('Raw API response content:', content.substring(0, 200));
      
      const repairedContent = repairJsonContent(content);
      let parsedResult = JSON.parse(repairedContent);

      // 验证数据结构
      if (!validateJsonStructure(parsedResult)) {
        throw new Error('数据结构验证失败');
      }

      // 验证和转换数据结构
      const analysisResult = validateAnalysisResult(parsedResult);
      
      // 缓存结果
      const cacheKey = JSON.stringify({ person1: person1.answers, person2: person2.answers });
      cache.put(cacheKey, analysisResult, CACHE_DURATION);

      return NextResponse.json({
        success: true,
        data: analysisResult
      });

    } catch (error: any) {
      console.error('API call failed:', error);
      return NextResponse.json({
        success: false,
        error: {
          message: error.message || '评估失败，请稍后重试'
        }
      }, { status: 500 });
    }
  } catch (error: any) {
    console.error('Request processing failed:', error);
    return NextResponse.json({
      success: false,
      error: {
        message: error.message || '请求处理失败'
      }
    }, { status: 500 });
  }
}

// 验证URL是否可访问
async function validateUrl(url: string): Promise<boolean> {
  try {
    const response = await axios.get(url, {
      timeout: 5000,
      maxRedirects: 5,
      validateStatus: function (status) {
        return status === 200; // 只接受200状态码
      }
    });
    return true;
  } catch (error) {
    console.error(`URL validation failed for ${url}:`, error instanceof Error ? error.message : 'Unknown error');
    return false;
  }
}
