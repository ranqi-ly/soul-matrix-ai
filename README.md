# Soul Matrix AI 💕

[![Next.js](https://img.shields.io/badge/Next.js-13.4.7-blueviolet.svg)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.1.3-blue.svg)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.3.2-38B2AC.svg)](https://tailwindcss.com/)
[![OpenAI](https://img.shields.io/badge/OpenAI-GPT--4-green.svg)](https://openai.com/)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](https://opensource.org/licenses/MIT)

<div align="center">
  <h3>🌟 AI驱动的智能情感匹配系统 | AI-Powered Relationship Analysis System</h3>
  <p>深度分析性格特征 • 智能匹配评估 • 专业情感建议</p>
  <p>Deep Personality Analysis • Intelligent Matching • Professional Relationship Advice</p>
</div>

## 📖 项目介绍 | Introduction

Soul Matrix AI 是一个创新的 AI 驱动的情感匹配分析系统。它利用先进的 OpenAI GPT-4/3.5 模型，通过深入分析两个人的个性特征、兴趣爱好、价值观和生活方式，提供专业的匹配度评估和个性化的关系建议。系统不仅能准确计算匹配度，还能提供详细的分析报告和建设性的交往建议。

## 🎯 核心功能 | Core Features

### 🤖 智能分析系统 | AI Analysis
- 基于 OpenAI GPT-4/3.5 的深度分析引擎
- 智能请求队列和自动重试机制
- 高效的多层缓存系统
- 稳定的错误处理和恢复机制
- 支持多维度人格特征分析

### 💑 用户体验 | User Experience
- 直观的问卷调查界面
- 实时的匹配度计算和反馈
- 美观的数据可视化展示
- 完整的响应式设计支持
- 便捷的社交媒体分享功能
- 细致的加载状态和过渡动画

### 📊 分析报告 | Analysis Report
- 全面的维度分析
  - 性格匹配度评估
  - 沟通方式分析
  - 价值观契合度
  - 生活方式兼容性
  - 成长潜力评估
  - MBTI 性格类型分析
  - 星座匹配分析
  - 共同兴趣探索
- 专业的发展建议
  - 个性化相处策略
  - 潜在问题预警
  - 关系提升方案
  - 共同成长建议
- 可视化图表展示
  - 雷达图展示匹配度
  - 条形图显示兼容性
  - 饼图展示各维度权重

## 🌈 界面预览 | Interface Preview

### 💫 主界面 | Main Interface
![主界面](/public/screenshots/main.png)
> 简洁现代的用户界面，支持深色模式

### 📝 评估表单 | Assessment Form
![评估表单](/public/screenshots/form.png)
> 智能表单设计，轻松填写个人信息

### 📊 分析报告 | Analysis Report
![分析报告](/public/screenshots/report.png)
> 专业的匹配度分析和可视化展示

### 🔄 分享功能 | Share Feature
![分享功能](/public/screenshots/share.png)
> 便捷的社交媒体分享功能

## 🛠️ 技术栈 | Tech Stack

### 前端技术 | Frontend
- ⚡️ Next.js 13+ (App Router)
- 🔷 TypeScript
- 🎨 Tailwind CSS
- 🎯 React Query
- 📊 Recharts
- 🎭 Framer Motion
- 🎪 shadcn/ui

### 后端技术 | Backend
- 🚀 Next.js API Routes
- 🤖 OpenAI GPT-4/3.5
- 💾 Edge Runtime
- 🔄 Vercel KV Storage

### 开发工具 | Development Tools
- 📦 pnpm
- 🔍 ESLint
- 💅 Prettier
- 🐶 Husky
- 📋 Commitlint

## 🚀 快速开始 | Quick Start

### 环境要求 | Prerequisites
- Node.js 16.8+
- pnpm 8.0+
- OpenAI API Key

### 安装步骤 | Installation

1. 克隆项目 | Clone the repository
```bash
git clone https://github.com/taielab/soul-matrix-ai.git
cd soul-matrix-ai
```

2. 安装依赖 | Install dependencies
```bash
pnpm install
```

3. 环境配置 | Environment setup
```bash
cp .env.example .env
```

4. 配置环境变量 | Configure environment variables
```env
# OpenAI API 配置（使用国内中转）
YUNWU_API_KEY=
YUNWU_API_URL=https://yunwu.ai/v1/chat/completions
YUNWU_MODEL=gpt-3.5-turbo
OPENAI_MAX_TOKENS=2000
OPENAI_TEMPERATURE=0.7

# 代理重试配置
API_MAX_RETRIES=3
API_INITIAL_RETRY_DELAY=3000
API_MAX_RETRY_DELAY=15000

# 代理超时配置
API_REQUEST_TIMEOUT=30000

# 其他配置
NODE_ENV=development
```

5. 启动开发服务器 | Start development server
```bash
pnpm dev
```

## 🚀 部署指南 | Deployment Guide

### Vercel 部署

1. **Fork 并导入**
   - Fork 本仓库
   - 访问 [Vercel](https://vercel.com)
   - 点击 "New Project"
   - 导入你的 Fork 仓库
   - 选择 "Next.js" 框架

2. **环境变量配置**
   - 在 Vercel 项目设置中添加以下环境变量：
   ```env
   # YUNWU API 配置（使用云雾代理）
   YUNWU_API_KEY=your_yunwu_api_key
   YUNWU_API_URL=https://yunwu.ai/v1/chat/completions
   YUNWU_MODEL=gpt-3.5-turbo
   OPENAI_MAX_TOKENS=2000
   OPENAI_TEMPERATURE=0.7

   # 代理配置
   API_MAX_RETRIES=3
   API_INITIAL_RETRY_DELAY=3000
   API_MAX_RETRY_DELAY=15000
   API_REQUEST_TIMEOUT=30000

   # 环境配置
   NODE_ENV=production
   ```

3. **部署**
   - 点击 "Deploy"
   - 等待构建过程完成
   - 你的网站将在 `https://your-project.vercel.app` 上线

4. **自定义域名（可选）**
   - 进入 Project Settings > Domains
   - 添加你的自定义域名
   - 按照 DNS 配置说明操作

### 其他平台部署

#### Railway 部署
1. 从 GitHub 创建新项目
2. 配置环境变量
3. 使用 "Start Command": `pnpm start` 部署

#### Netlify 部署
1. 连接你的 GitHub 仓库
2. 配置构建设置：
   - 构建命令：`pnpm build`
   - 发布目录：`.next`
3. 添加环境变量
4. 部署

```

## 📱 使用指南 | Usage Guide

1. 填写个人信息
   - 输入基本信息
   - 选择性格特征
   - 描述兴趣爱好

2. 填写伴侣信息
   - 输入对方信息
   - 描述性格特点
   - 添加兴趣爱好

3. 获取分析报告
   - 查看匹配度评分
   - 阅读详细分析
   - 参考建议方案

4. 分享结果
   - 保存分析报告
   - 分享到社交媒体
   - 导出详细报告

## 🤝 贡献指南 | Contributing

我们欢迎所有形式的贡献，无论是新功能、文档改进还是错误报告。请查看我们的贡献指南了解更多信息。

## 📄 开源协议 | License

本项目采用 MIT 协议开源，查看 [LICENSE](LICENSE) 了解更多信息。

## 🙏 致谢 | Acknowledgments

- OpenAI 团队提供的强大 API 支持
- Next.js 团队的出色框架
- shadcn/ui 提供的精美组件
- 所有贡献者的宝贵意见

## 📞 联系我们 | Contact

- 项目负责人：[Taielab](https://github.com/taielab)
- 项目主页：[https://github.com/taielab](https://github.com/taielab)

---

<div align="center">
  <p>用科技连接灵魂 • 让爱更有方向</p>
  <p>Connecting Souls with Technology • Guiding Love with Intelligence</p>
</div>
