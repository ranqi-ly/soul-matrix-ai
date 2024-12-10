import { NextResponse } from 'next/server';
import { PersonInfo, APIResponse, PredictionResponse } from '@/types/api';
import cache from 'memory-cache';
import { apiQueue } from '@/utils/apiQueue';

// 定义重试配置
const MAX_RETRIES = parseInt(process.env.API_MAX_RETRIES || '3');
const INITIAL_RETRY_DELAY = parseInt(process.env.API_INITIAL_RETRY_DELAY || '1000');
const MAX_RETRY_DELAY = parseInt(process.env.API_MAX_RETRY_DELAY || '8000');
const REQUEST_TIMEOUT = parseInt(process.env.API_REQUEST_TIMEOUT || '30000');
const CACHE_DURATION = parseInt(process.env.CACHE_DURATION || '3600000'); // 1小时缓存

// 生成缓存键
function generateCacheKey(person1: PersonInfo, person2: PersonInfo): string {
  return `${JSON.stringify(person1)}_${JSON.stringify(person2)}`;
}

// 指数退避重试
async function exponentialBackoff(fn: () => Promise<any>, retries: number): Promise<any> {
  try {
    return await fn();
  } catch (error: any) {
    if (retries === 0 || !error.message.includes('rate limit')) {
      throw error;
    }
    const delay = Math.min(INITIAL_RETRY_DELAY * Math.pow(2, MAX_RETRIES - retries), MAX_RETRY_DELAY);
    await new Promise(resolve => setTimeout(resolve, delay));
    return exponentialBackoff(fn, retries - 1);
  }
}

export async function POST(request: Request) {
  try {
    const { person1, person2 } = await request.json();
    
    // 检查缓存
    const cacheKey = generateCacheKey(person1, person2);
    const cachedResult = cache.get(cacheKey);
    if (cachedResult) {
      return NextResponse.json({
        成功: true,
        数据: cachedResult,
        缓存: true
      });
    }

    // 将请求添加到队列中
    const result = await apiQueue.add(async () => {
      return await exponentialBackoff(async () => {
        const baseUrl = process.env.OPENAI_API_BASE_URL || 'https://yunwu.ai/v1';
        const response = await fetch(`${baseUrl}/chat/completions`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          },
          body: JSON.stringify({
            model: process.env.OPENAI_API_MODEL || 'gpt-3.5-turbo',
            messages: [
              {
                role: 'system',
                content: `你是一位专业的关系咨询师和心理分析专家，擅长运用心理学理论和实践经验分析两个人的匹配程度。
                
                分析框架：
                1. 使用多维度评估方法，包括：
                   - 性格匹配度：基于大五人格特质理论（开放性、尽责性、外向性、宜人性、情绪稳定性）
                   - 沟通方式：基于依恋理论和沟通模式研究
                   - 价值观：核心信念和生活目标的一致性
                   - 生活方式：日常习惯和偏好的兼容性
                   - 成长潜力：共同发展和适应能力
                
                2. 时间维度分析：
                   - 短期（0-1年）：初始适应和磨合期
                   - 中期（1-3年）：关系稳定和发展期
                   - 长期（3年以上）：共同成长和深化期
                
                3. 建议提供：
                   - 优先级：高/中/低
                   - 难易程度：容易/适中/具有挑战
                   - 时间线：即时/短期/长期
                   - 具体可执行的行动步骤
                
                请提供结构化的JSON格式响应，包含以下字段：
                {
                  "匹配度": number, // 总体匹配度(0-100)
                  "维度": {
                    "性格匹配度": number,
                    "沟通方式": number,
                    "价值观": number,
                    "生活方式": number,
                    "成长潜力": number
                  },
                  "分析": {
                    "短期": {"优势": [], "挑战": [], "预测": []},
                    "中期": {"优势": [], "挑战": [], "预测": []},
                    "长期": {"优势": [], "挑战": [], "预测": []}
                  },
                  "兼容性": string,
                  "建议": [{
                    "内容": string,
                    "优先级": "高"|"中"|"低",
                    "难易程度": "容易"|"适中"|"具有挑战",
                    "时间线": "即时"|"短期"|"长期",
                    "行动步骤": []
                  }]
                }`
              },
              {
                role: 'user',
                content: `请分析以下两个人的匹配程度：
                第一个人：
                姓名：${person1.姓名}
                性别：${person1.性别}
                年龄：${person1.年龄}
                兴趣：${person1.兴趣}
                价值观：${person1.价值观}
                生活方式：${person1.生活方式}

                第二个人：
                姓名：${person2.姓名}
                性别：${person2.性别}
                年龄：${person2.年龄}
                兴趣：${person2.兴趣}
                价值观：${person2.价值观}
                生活方式：${person2.生活方式}

                请按照系统提示的格式提供JSON响应。`
              }
            ],
            temperature: 0.7,
            max_tokens: 2000,
            response_format: { type: "json_object" }
          })
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.error?.消息 || '请求失败');
        }

        const data = await response.json();
        const result = JSON.parse(data.choices[0].message.content);
        
        // 验证响应格式
        if (!result.匹配度 || !result.维度 || !result.分析 || !result.建议) {
          throw new Error('AI响应格式不正确');
        }

        // 规范化分数确保在0-100范围内
        result.匹配度 = Math.max(0, Math.min(100, result.匹配度));
        Object.keys(result.维度).forEach(key => {
          result.维度[key] = Math.max(0, Math.min(100, result.维度[key]));
        });

        // 缓存结果
        cache.put(cacheKey, result, CACHE_DURATION);

        return NextResponse.json({
          成功: true,
          数据: result
        });
      }, MAX_RETRIES);
    });

    return NextResponse.json({
      成功: true,
      数据: result,
      缓存: false
    });
  } catch (error: any) {
    console.error('Prediction error:', error);
    return NextResponse.json({
      成功: false,
      错误: {
        消息: error.message || '预测失败，请稍后重试'
      }
    }, { status: 500 });
  }
}
