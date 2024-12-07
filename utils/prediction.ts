interface PredictionData {
  name: string;
  gender: string;
  age: number;
  interests: string;
  values: string;
  lifestyle: string;
}

export function processPrompt(data: PredictionData): string {
  return `作为一个专业的恋爱和婚姻分析顾问，请分析以下用户的个人特征，并给出恋爱和婚姻方面的建议：

个人信息：
- 姓名：${data.name}
- 性别：${data.gender === 'male' ? '男' : data.gender === 'female' ? '女' : '其他'}
- 年龄：${data.age}岁
- 兴趣爱好：${data.interests}
- 价值观：${data.values}
- 生活方式：${data.lifestyle}

请提供以下分析：
1. 总体契合度评分（0-100分）
2. 详细的性格特征和恋爱倾向分析
3. 3-5条具体的恋爱和婚姻建议

请确保回答包含以上三个部分，并使用清晰的标题分隔。评分应该考虑年龄、价值观和生活方式的匹配度。建议应该具体且可行。`;
}

export function processResponse(content: string) {
  // 提取评分（查找0-100的数字）
  const scoreMatch = content.match(/(\d{1,3})(?=\s*[分点]|\s*\/\s*100|%)/);
  const score = scoreMatch ? Math.min(100, Math.max(0, parseInt(scoreMatch[1]))) : 75;

  // 提取分析部分（在"分析"和"建议"之间的内容）
  const analysisMatch = content.match(/(?:分析|详细分析)[：:]([\s\S]*?)(?=\d+\.|建议|推荐|$)/i);
  const analysis = analysisMatch 
    ? analysisMatch[1].trim()
    : '基于您的个人特征，我们进行了全面的分析...';

  // 提取建议（匹配数字编号开头的行）
  const recommendationsMatches = content.match(/(?:建议|推荐)[：:]([\s\S]*?)(?=$)/i);
  let recommendations: string[] = [];
  
  if (recommendationsMatches) {
    const recommendationText = recommendationsMatches[1];
    const recommendationItems = recommendationText.match(/\d+[\.)、]\s*([^\d\n]+)/g);
    if (recommendationItems) {
      recommendations = recommendationItems
        .map(item => item.replace(/^\d+[\.)、]\s*/, '').trim())
        .filter(item => item.length > 0);
    }
  }

  if (recommendations.length === 0) {
    recommendations = ['保持开放和真诚的态度', '关注个人成长和发展', '建立健康的社交圈'];
  }

  return {
    score,
    analysis,
    recommendations
  };
}
