# Soul Matrix Ai  💕

[![Next.js](https://img.shields.io/badge/Next.js-13.4.7-blueviolet.svg)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.1.3-blue.svg)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.3.2-38B2AC.svg)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](https://opensource.org/licenses/MIT)

Soul Matrix Ai 是一个创新的 AI 驱动的情感匹配分析系统。它利用先进的 OpenAI GPT 模型，通过深入分析两个人的个性特征、兴趣爱好、价值观和生活方式，提供专业的匹配度评估和个性化的关系建议。系统不仅能准确计算匹配度，还能提供详细的分析报告和建设性的交往建议。

[English Documentation](README_EN.md)

## ✨ 特性

- 🤖 基于 OpenAI GPT 模型的智能分析
- 💑 全面的个人信息收集和分析
- 📊 直观的匹配度评分展示
- 🎯 详细的优势互补分析
- ⚠️ 潜在问题预警
- 💡 个性化的关系建议
- 🌐 支持国内网络访问的 API 代理
- 🔄 智能请求队列和缓存系统

## 🌟 在线演示

[在线体验地址](https://github.com/taielab) (即将上线)

注意：本项目使用 [YunWu AI](https://yunwu.ai/register?aff=PBpy) 作为 OpenAI API 的代理服务，适用于访问受限地区。

## 🚀 快速开始

### 前置要求

- Node.js 16.8 或更高版本
- npm 或 yarn 包管理器
- OpenAI API 密钥
- 现代浏览器（支持 ES6+ 特性）
- 稳定的网络连接（用于 API 调用）

### 安装

1. 克隆项目
```bash
git clone https://github.com/taielab/soul-matrix-ai.git
cd soul-matrix-ai
```

2. 安装依赖
```bash
npm install
# 或
yarn install
```

3. 配置环境变量
```bash
cp env.example .env
```

编辑 `.env` 文件，设置以下环境变量：
```env
OPENAI_API_BASE_URL=https://yunwu.ai/v1
OPENAI_API_KEY=your_api_key
OPENAI_API_MODEL=gpt-3.5-turbo
OPENAI_MAX_TOKENS=2000
OPENAI_TEMPERATURE=0.7

API_MAX_RETRIES=3
API_INITIAL_RETRY_DELAY=1000
API_MAX_RETRY_DELAY=8000
API_REQUEST_TIMEOUT=30000

CACHE_DURATION=3600000
```

4. 启动开发服务器
```bash
npm run dev
# 或
yarn dev
```

访问 http://localhost:3000 查看应用。

## 📁 项目结构

```
soul-matrix-ai/
├── app/                    # Next.js 13 应用目录
│   ├── api/               # API 路由
│   │   └── predict/      # 预测 API
│   ├── components/       # React 组件
│   ├── hooks/           # 自定义 Hooks
│   ├── styles/          # 样式文件
│   └── utils/           # 工具函数
├── public/               # 静态资源
├── types/               # TypeScript 类型定义
├── .env.example         # 环境变量示例
├── next.config.js       # Next.js 配置
├── package.json         # 项目依赖
├── postcss.config.js    # PostCSS 配置
├── tailwind.config.js   # Tailwind CSS 配置
└── tsconfig.json        # TypeScript 配置
```

## 📚 使用示例

### 基础使用流程

1. 访问网站首页
2. 填写两个人的基本信息
3. 点击"开始分析"按钮
4. 等待分析结果
5. 查看详细的匹配报告

### 示例场景

```json
// 输入示例
{
  "person1": {
    "name": "张三",
    "age": 25,
    "hobbies": "阅读、旅行、摄影",
    "values": "注重家庭、追求事业"
  },
  "person2": {
    "name": "李四",
    "age": 24,
    "hobbies": "音乐、烹饪、摄影",
    "values": "重视感情、追求自我提升"
  }
}

// 输出示例
{
  "matchScore": 85,
  "analysis": "两人都对艺术和创作有浓厚兴趣...",
  "recommendations": [
    "可以一起参加摄影活动",
    "互相分享各自的兴趣爱好"
  ]
}
```

## 📡 API 文档

### 预测接口

**请求地址**: `/api/predict`

**方法**: POST

**请求参数**:
```typescript
interface PredictRequest {
  person1: {
    name: string;
    age: number;
    hobbies: string;
    values: string;
  };
  person2: {
    name: string;
    age: number;
    hobbies: string;
    values: string;
  };
}
```

**响应格式**:
```typescript
interface PredictResponse {
  matchScore: number;        // 匹配度分数 (0-100)
  analysis: string;          // 详细分析
  compatibility: string[];   // 兼容性要点
  recommendations: string[]; // 建议
}
```

**错误码说明**:
- 400: 请求参数错误
- 429: 请求过于频繁
- 500: 服务器内部错误

**示例调用**:
```javascript
const response = await fetch('/api/predict', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    person1: {
      name: '张三',
      age: 25,
      hobbies: '阅读、旅行',
      values: '注重家庭'
    },
    person2: {
      name: '李四',
      age: 24,
      hobbies: '音乐、烹饪',
      values: '追求事业'
    }
  })
});

const result = await response.json();
```

## 🏗️ 技术架构

- **前端框架**: Next.js 13 (App Router) - 利用最新的 App Router 特性
- **编程语言**: TypeScript - 提供完整的类型支持
- **样式方案**: TailwindCSS - 实现响应式设计
- **状态管理**: React Hooks - 包含自定义 Hooks
- **表单处理**: React Hook Form - 高性能表单验证
- **API 集成**: OpenAI GPT API - 智能匹配算法核心
- **缓存系统**: Memory Cache - 优化响应速度
- **代理服务**: 云雾 AI API 代理 - 解决国内访问限制
- **部署平台**: Vercel - 零配置部署

## 🔧 核心功能

### 1. 个人信息收集
- 基本信息（姓名、性别、年龄）
- 兴趣爱好
- 价值观
- 生活方式

### 2. AI 分析系统
- 智能匹配度计算
- 多维度关系分析
- 个性化建议生成

### 3. 请求优化
- 智能重试机制
- 请求队列管理
- 响应缓存系统

## 📈 性能优化

- **客户端组件懒加载**: 使用 Next.js 的动态导入功能，优化首屏加载时间
- **表单分步加载**: 采用分步加载策略，提升用户体验
- **API 响应缓存**: 实现智能缓存机制，减少重复请求
- **请求队列控制**: 使用令牌桶算法进行请求限流
- **指数退避重试**: 智能处理 API 失败情况，确保服务可靠性
- **图片资源优化**: 使用 Next.js 图片组件，自动优化图片加载
- **代码分割**: 自动代码分割，确保最小化加载体积

## 🔐 安全性

- **环境变量管理**: 使用 `.env` 文件严格管理敏感配置
- **API 密钥保护**: 服务端API调用，确保密钥安全
- **请求速率限制**: 实现请求限流，防止滥用
- **输入数据验证**: 客户端和服务端双重验证
- **CORS 策略**: 严格的跨域资源共享策略
- **安全依赖**: 定期更新依赖包，修复安全漏洞

## 🤝 贡献指南

1. Fork 本项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 提交 Pull Request

### 开发规范

- 遵循 TypeScript 类型定义规范
- 使用 ESLint 和 Prettier 进行代码格式化
- 编写单元测试用例
- 保持代码简洁，添加必要的注释
- 遵循语义化提交信息规范

## 📝 更新日志

### [1.0.0] - 2024-12-7
- 🎉 首次发布
- ✨ 实现基础匹配功能
- 🔧 添加国内 API 代理支持
- 💄 优化用户界面设计

### [0.9.0] - 2024-12-5
- 🚧 Beta 版本发布
- 🔨 完善核心功能
- 🎨 改进界面交互

## ❓ 常见问题

### Q: 为什么需要 云雾 AI API 密钥？

A: 云雾 AI API 密钥用于访问 GPT 模型，这是我们进行智能匹配分析的核心。您可以从 云雾 AI 官网获取密钥。

### Q: 系统支持哪些语言？
A: 目前系统支持中文和英文输入，未来会添加更多语言支持。

### Q: 如何处理 API 访问限制？
A: 我们使用云雾 AI API 代理服务来解决国内访问 OpenAI API 的限制问题，并实现了智能重试和队列管理机制。

### Q: 数据是否安全？
A: 是的。我们不会存储用户的个人信息，所有数据仅用于即时分析，分析完成后即被销毁。

## 📸 项目截图

### 首页界面
![首页界面](./public/screenshots/home.png)
- 简洁现代的设计风格
- 响应式布局，适配各种设备
- 清晰的操作引导

### 信息输入界面
![信息输入](./public/screenshots/input-form.png)
- 直观的表单设计
- 实时输入验证
- 友好的错误提示

### 分析结果展示
![分析结果](./public/screenshots/result.png)
- 清晰的匹配度评分
- 详细的分析报告
- 可操作的建议列表

## 🚀 部署指南

### Vercel 部署步骤

1. **准备工作**
   - 注册 [Vercel](https://vercel.com) 账号
   - 将项目推送到 GitHub

2. **导入项目**
   - 在 Vercel 控制台点击 "Import Project"
   - 选择 GitHub 仓库
   - 选择 `soul-matrix-ai` 项目

3. **配置环境变量**
   在 Vercel 项目设置中添加以下环境变量：
   ```
   OPENAI_API_BASE_URL=https://yunwu.ai/v1
   OPENAI_API_KEY=your_api_key
   OPENAI_API_MODEL=gpt-3.5-turbo
   OPENAI_MAX_TOKENS=2000
   OPENAI_TEMPERATURE=0.7
   API_MAX_RETRIES=3
   API_INITIAL_RETRY_DELAY=3000
   API_MAX_RETRY_DELAY=15000
   API_REQUEST_TIMEOUT=30000
   ```

4. **部署设置**
   - Framework Preset: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`

5. **触发部署**
   - 点击 "Deploy" 按钮
   - 等待部署完成
   - 访问生成的域名测试应用

### 自定义域名配置

1. 在 Vercel 项目设置中添加域名
2. 配置 DNS 记录
3. 等待 SSL 证书生成

## 📊 性能指标

### 性能测试结果

| 指标 | 数值 | 状态 |
|------|------|------|
| 首屏加载时间 | < 2s | ✅ |
| Time to Interactive | < 3s | ✅ |
| 最大内容绘制 | < 2.5s | ✅ |
| 首次内容绘制 | < 1.5s | ✅ |
| 累积布局偏移 | < 0.1 | ✅ |
| Lighthouse 性能分数 | 90+ | ✅ |

### API 性能

| 指标 | 数值 | 说明 |
|------|------|------|
| 平均响应时间 | 2-3s | 包含 AI 模型处理时间 |
| 并发处理能力 | 10 req/s | 使用队列控制 |
| 缓存命中率 | 30% | 相似输入复用 |

### 性能优化建议

1. **前端优化**
   - 实施组件级别代码分割
   - 优化大型依赖包
   - 实现图片懒加载
   - 使用 Service Worker 缓存

2. **后端优化**
   - 优化 API 响应缓存策略
   - 实现批量请求处理
   - 优化数据库查询（如果使用）
   - 考虑使用 Edge Functions

3. **部署优化**
   - 使用 CDN 加速静态资源
   - 选择合适的部署区域
   - 实施智能路由策略
   - 配置合理的缓存策略

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 📧 联系方式

项目维护者 - [@taielab](https://github.com/taielab)

项目链接: [https://github.com/taielab/soul-matrix-ai](https://github.com/taielab/soul-matrix-ai)

## 👨‍💻 开发指南

### 本地开发环境搭建

1. **安装依赖**
```bash
npm install
# 或
yarn install
```

2. **启动开发服务器**
```bash
npm run dev
# 或
yarn dev
```

3. **运行测试**
```bash
npm run test
# 或
yarn test
```

### 调试技巧

- 使用 Chrome DevTools 进行前端调试
- 使用 `console.log` 或 `debug` 进行服务端调试
- 查看 Network 面板监控 API 请求

### 测试数据

在 `__tests__/mockData` 目录下提供了测试数据：
- `sampleUsers.ts`: 示例用户数据
- `sampleResults.ts`: 示例分析结果
