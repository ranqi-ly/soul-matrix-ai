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
        success: true,
        data: cachedResult,
        cached: true
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
                content: '你是一个专业的情感分析师，擅长分析两个人的匹配程度。请根据提供的信息进行分析并给出详细的建议。'
              },
              {
                role: 'user',
                content: `请分析以下两个人的匹配程度：
                第一个人：
                姓名：${person1.name}
                性别：${person1.gender}
                年龄：${person1.age}
                兴趣爱好：${person1.interests}
                价值观：${person1.values}
                生活方式：${person1.lifestyle}

                第二个人：
                姓名：${person2.name}
                性别：${person2.gender}
                年龄：${person2.age}
                兴趣爱好：${person2.interests}
                价值观：${person2.values}
                生活方式：${person2.lifestyle}

                请提供：
                1. 总体匹配度评分（0-100分）
                2. 优势互补点分析
                3. 潜在问题点分析
                4. 具体建议和改进方向`
              }
            ],
            temperature: parseFloat(process.env.OPENAI_TEMPERATURE || '0.7'),
            max_tokens: parseInt(process.env.OPENAI_MAX_TOKENS || '2000'),
          })
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.error?.message || '请求失败');
        }

        const data = await response.json();
        const content = data.choices[0].message.content;
        console.log('AI Response:', content);

        // 解析 AI 响应内容
        const lines = content.split('\n');
        let result = {
          score: 0,
          analysis: '',
          compatibility: '',
          recommendations: []
        };

        let currentSection = '';
        let sectionContent = '';

        for (const line of lines) {
          const trimmedLine = line.trim();
          if (!trimmedLine) continue;

          // 匹配分数（支持多种格式）
          const scorePatterns = [
            /匹配[度率分数][:：]?\s*(\d+)/,
            /匹配[度率分数][为是]\s*(\d+)/,
            /[总整]体匹配[度率分数][:：]?\s*(\d+)/,
            /(\d+)\s*[分点]/
          ];

          for (const pattern of scorePatterns) {
            const match = trimmedLine.match(pattern);
            if (match) {
              const score = parseInt(match[1]);
              if (score >= 0 && score <= 100) {
                result.score = score;
              }
              break;
            }
          }

          // 识别段落标题
          if (trimmedLine.includes('分析：') || trimmedLine.includes('分析:') || 
              trimmedLine.includes('优势') || trimmedLine.includes('共同点')) {
            currentSection = 'analysis';
            sectionContent = trimmedLine.split(/[：:]/)[1]?.trim() || '';
            continue;
          }
          
          if (trimmedLine.includes('问题') || trimmedLine.includes('挑战') || 
              trimmedLine.includes('不足') || trimmedLine.includes('差异')) {
            currentSection = 'compatibility';
            sectionContent = trimmedLine.split(/[：:]/)[1]?.trim() || '';
            continue;
          }
          
          if (trimmedLine.includes('建议') || trimmedLine.includes('改进') || 
              trimmedLine.includes('提议') || trimmedLine.includes('改善')) {
            currentSection = 'recommendations';
            continue;
          }

          // 处理列表项
          if (trimmedLine.match(/^[1-9一二三四五六七八九十]\.|^[1-9一二三四五六七八九十]、|^[-•*]|^\d+\)/) ||
              trimmedLine.startsWith('- ') || trimmedLine.startsWith('• ')) {
            const cleanedLine = trimmedLine.replace(/^[1-9一二三四五六七八九十]\.|^[1-9一二三四五六七八九十]、|^[-•*]|\d+\)/, '').trim();
            
            if (currentSection === 'recommendations' && cleanedLine) {
              if (!result.recommendations.includes(cleanedLine)) {
                result.recommendations.push(cleanedLine);
              }
            } else if (currentSection === 'analysis' && cleanedLine) {
              result.analysis = result.analysis ? `${result.analysis}\n${cleanedLine}` : cleanedLine;
            } else if (currentSection === 'compatibility' && cleanedLine) {
              result.compatibility = result.compatibility ? `${result.compatibility}\n${cleanedLine}` : cleanedLine;
            }
            continue;
          }

          // 累积段落内容
          if (currentSection && trimmedLine) {
            switch (currentSection) {
              case 'analysis':
                if (!trimmedLine.includes('建议') && !trimmedLine.includes('问题')) {
                  result.analysis = result.analysis ? `${result.analysis} ${trimmedLine}` : trimmedLine;
                }
                break;
              case 'compatibility':
                if (!trimmedLine.includes('建议')) {
                  result.compatibility = result.compatibility ? `${result.compatibility} ${trimmedLine}` : trimmedLine;
                }
                break;
              case 'recommendations':
                if (!trimmedLine.match(/^[1-9一二三四五六七八九十]\.|^[1-9一二三四五六七八九十]、|^[-•*]|\d+\)/)) {
                  const lastIndex = result.recommendations.length - 1;
                  if (lastIndex >= 0) {
                    result.recommendations[lastIndex] += ` ${trimmedLine}`;
                  }
                }
                break;
            }
          }
        }

        // 设置默认值和验证
        if (!result.score || result.score < 0 || result.score > 100) {
          result.score = 75; // 设置一个默认的匹配度
        }

        if (!result.analysis) {
          result.analysis = '根据双方的个人信息分析，两人在某些方面存在共同点和互补性。双方的性格特征和生活态度有一定的契合度，这为建立良好的关系奠定了基础。';
        }

        if (!result.compatibility) {
          result.compatibility = '可能存在的挑战包括生活习惯的差异和沟通方式的不同。这些差异需要双方共同努力，相互理解和适应，才能建立更稳固的关系。';
        }

        if (result.recommendations.length === 0) {
          result.recommendations = [
            '建议双方多进行开放和诚实的沟通，表达各自的想法和感受',
            '相互尊重对方的个人空间和生活习惯，在差异中寻找平衡',
            '共同参与有趣的活动，增进彼此了解和感情',
            '保持积极的心态，用包容和理解的态度面对分歧'
          ];
        }

        console.log('Parsed Result:', result);
        return result;
      }, MAX_RETRIES);
    });

    // 缓存结果
    cache.put(cacheKey, result, CACHE_DURATION);

    return NextResponse.json({
      success: true,
      data: result,
      cached: false
    });
  } catch (error: any) {
    console.error('Prediction error:', error);
    return NextResponse.json({
      success: false,
      error: {
        message: error.message || '预测失败，请稍后重试'
      }
    }, { status: 500 });
  }
}
