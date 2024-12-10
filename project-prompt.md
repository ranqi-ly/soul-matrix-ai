# Soul Matrix AI - Project Creation Prompt

使用 Next.js 13+ 和 TypeScript 创建一个 AI 驱动的情感匹配分析系统。该系统应具有以下特点：

## 1. 技术栈要求

```text
- Next.js 13+ (使用 App Router)
- TypeScript
- TailwindCSS
- OpenAI API (通过云雾 AI 代理)
```

## 2. 项目结构

```
soul-matrix-ai/
├── app/                    # Next.js 13 应用目录
│   ├── api/               # API 路由
│   │   └── predict/      # 预测 API
│   ├── layout.tsx        # 应用布局
│   └── page.tsx          # 主页面
├── components/           # React 组件
│   ├── ClientContainer.tsx  # 客户端容器
│   └── common/           # 通用组件
├── types/               # TypeScript 类型定义
│   └── api.ts          # API 相关类型
├── utils/              # 工具函数
│   └── apiQueue.ts    # API 请求队列
├── config/            # 配置文件
│   └── api.ts        # API 配置
└── public/           # 静态资源
```

## 3. 核心功能实现

### 3.1 API 类型定义 (types/api.ts)
```typescript
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
```

### 3.2 API 实现要点

1. 请求优化：
   - 实现请求队列管理
   - 使用内存缓存
   - 指数退避重试机制

2. 错误处理：
   - 请求超时处理
   - 速率限制处理
   - 错误重试逻辑

3. 环境变量配置：
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

### 3.3 前端实现要点

1. 页面布局：
   - 响应式设计
   - 渐变背景
   - 卡片式布局

2. UI 组件：
   - 表单输入组件
   - 结果展示卡片
   - 加载状态指示器

3. 样式指南：
```css
/* 配色方案 */
--primary: #FF69B4;
--secondary: #F8F9FA;
--text-primary: #1A1A1A;
--text-secondary: #666666;
--background: linear-gradient(to bottom, #FFF5F7, #FFFFFF);
```

## 4. 性能优化

1. 缓存策略：
   - API 响应缓存
   - 静态资源缓存
   - 组件级缓存

2. 加载优化：
   - 组件懒加载
   - 图片优化
   - 代码分割

3. API 优化：
   - 请求去重
   - 请求队列
   - 错误重试

## 5. 安全考虑

1. API 保护：
   - 环境变量管理
   - 请求验证
   - 错误处理

2. 数据处理：
   - 输入验证
   - XSS 防护
   - CORS 配置

## 6. 部署配置

1. Vercel 部署：
   - 环境变量配置
   - 构建设置
   - 域名设置

2. 性能监控：
   - 错误跟踪
   - 性能指标
   - 用户分析

## 7. 开发规范

1. 代码风格：
   - ESLint 配置
   - Prettier 配置
   - TypeScript 严格模式

2. 提交规范：
   - 语义化提交信息
   - 分支管理策略
   - 代码审查流程

## 8. 测试策略

1. 单元测试：
   - API 处理函数
   - 工具函数
   - 组件渲染

2. 集成测试：
   - API 集成
   - 页面交互
   - 错误处理

## 9. 文档要求

1. 代码文档：
   - 类型注释
   - 函数文档
   - 组件说明

2. API 文档：
   - 接口说明
   - 参数说明
   - 响应格式

3. 部署文档：
   - 环境配置
   - 部署步骤
   - 故障排除
