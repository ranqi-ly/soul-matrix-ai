# Soul Matrix AI 💕

[![Next.js](https://img.shields.io/badge/Next.js-14.0.0-blueviolet.svg)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.2.0-blue.svg)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.3.5-38B2AC.svg)](https://tailwindcss.com/)
[![OpenAI](https://img.shields.io/badge/OpenAI-GPT--4-green.svg)](https://openai.com/)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](https://opensource.org/licenses/MIT)

<div align="center">
  <h3>🌟 AI驱动的智能情感匹配系统 | AI-Powered Relationship Analysis System</h3>
  <p>深度分析性格特征 • 智能匹配评估 • 专业情感建议</p>
  <p>Deep Personality Analysis • Intelligent Matching • Professional Relationship Advice</p>
</div>

## 📖 项目介绍 | Introduction

Soul Matrix AI 是一个创新的 AI 驱动的情感匹配分析系统。它利用先进的 OpenAI GPT-4/3.5 模型，通过深入分析两个人的个性特征、兴趣爱好、价值观和生活方式，提供专业的匹配度评估和个性化的关系建议。系统不仅能准确计算匹配度，还能提供详细的分析报告和建设性的交往建议。

Soul Matrix AI is an innovative AI-driven relationship analysis system. Utilizing advanced OpenAI GPT-4/3.5 models, it provides professional compatibility assessments and personalized relationship advice by analyzing personality traits, interests, values, and lifestyles of two individuals.

## 🌈 界面预览 | Interface Preview

### 💫 主界面 | Main Interface
![主界面](/public/screenshots/main.png)
> 简洁现代的用户界面，支持深色模式，动画过渡效果

### 📝 评估表单 | Assessment Form
![评估表单](/public/screenshots/form.png)
> 优雅的表单设计，流畅的动画过渡，直观的进度展示

### 📊 分析报告 | Analysis Report
![分析报告](/public/screenshots/report.png)
> 专业的匹配度分析和数据可视化展示

### 🔄 分享功能 | Share Feature
![分享功能](/public/screenshots/share.png)
> 便捷的社交媒体分享功能，支持多平台分享

## 🎯 核心功能 | Core Features

### 🤖 智能分析系统 | AI Analysis
- 基于 OpenAI GPT-4/3.5 的深度分析引擎
- 智能请求队列和自动重试机制
- 高效的多层缓存系统
- 稳定的错误处理和恢复机制
- 支持多维度人格特征分析

### 💑 用户体验 | User Experience
- 现代化的动画效果和过渡
- 响应式设计和移动端优化
- 优雅的表单交互体验
- 实时的匹配度计算和反馈
- 精美的数据可视化展示
- 直观的进度指示器
- 便捷的社交媒体分享功能

### 📊 全面的分析报告 | Comprehensive Analysis Report
- 多维度匹配分析
  - 性格兼容性评估
  - 沟通模式分析
  - 价值观契合度
  - 生活方式匹配度
  - 情感智商评估
  - 成长潜力分析
- 专业的关系建议
  - 个性化相处策略
  - 潜在问题预警
  - 关系提升方案
  - 共同成长建议
- 数据可视化
  - 雷达图展示匹配度
  - 条形图显示兼容性
  - 饼图展示各维度权重

## 🚀 部署指南 | Deployment Guide

### Vercel 部署

1. **Fork 并导入**
   - Fork 本仓库
   - 访问 [Vercel](https://vercel.com)
   - 点击 "New Project"
   - 导入你的 Fork 仓库

2. **环境变量配置**
   ```env
   # OpenAI API Configuration
   OPENAI_API_KEY=your_api_key
   OPENAI_MODEL=gpt-4
   OPENAI_MAX_TOKENS=2000
   OPENAI_TEMPERATURE=0.7
   
   # API Configuration
   API_MAX_RETRIES=3
   API_INITIAL_RETRY_DELAY=3000
   API_MAX_RETRY_DELAY=15000
   API_REQUEST_TIMEOUT=30000
   
   # Environment
   NODE_ENV=production
   ```

3. **部署**
   - 点击 "Deploy"
   - 等待构建完成
   - 访问生成的域名

## 🛠️ 技术栈 | Tech Stack

### 前端技术 | Frontend
- ⚡️ Next.js 14 (App Router)
- 🔷 TypeScript 5.2
- 🎨 Tailwind CSS
- 🎭 Framer Motion
- 🎪 Radix UI
- 📊 Nivo Charts
- 📝 React Hook Form
- ✨ Zod

### 💻 技术栈规范

#### 前端技术
- 框架：Next.js 14 + React 18
- UI框架：
  - Tailwind CSS（样式）
  - Radix UI（基础组件）
  - Framer Motion（动画效果）
  - shadcn/ui（高级组件）
- 状态管理：
  - React Hook Form（表单）
  - Zod（数据验证）
- 数据可视化：
  - Nivo Charts（图表）
- 工具库：
  - axios（HTTP请求）
  - date-fns（日期处理）
  - clsx（类名处理）

#### 后端技术
- 框架：Next.js API Routes
- AI集成：OpenAI API
- 性能优化：
  - 智能缓存系统
  - 请求队列
  - 自动重试机制

#### 开发工具
- 包管理：pnpm
- 代码质量：
  - ESLint
  - Prettier
  - TypeScript
- 工作流：
  - Husky
  - Commitlint

### 📝 开发规范

#### 代码管理
- 分支管理：
  - main（主分支）
  - develop（开发分支）
  - feature/*（功能分支）
  - hotfix/*（修复分支）
- 代码审查：
  - PR模板
  - 代码审查清单
  - CI检查必须通过

#### 组件开发
- 设计原则：
  - 单一职责
  - 可复用性
  - 可测试性
- 组件分层：
  - UI组件（展示）
  - 容器组件（逻辑）
  - 页面组件（路由）
- 状态管理：
  - React Hooks优先
  - 合理使用Context
  - 避免prop drilling

## 📊 监控指标

#### 前端指标
- 首屏加载：<1s
- 页面切换：<0.3s
- JS错误率：<0.01%
- 资源加载：<300ms
- 动画帧率：>60fps

## 🚀 快速开始 | Quick Start

### 环境要求 | Prerequisites
- Node.js 18+
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
4. 点击[注册云雾中转API](https://yunwu.ai/register?aff=PBpy)跑通项目
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

## 📝 开发规范 | Development Guidelines

### 代码规范 | Code Standards
- 遵循 TypeScript 严格模式
- 使用 ESLint + Prettier 进行代码格式化
- 组件采用函数式编程
- 状态管理使用 React Hooks

### 提交规范 | Commit Standards
- feat: 新功能
- fix: 修复问题
- docs: 文档修改
- style: 代码格式修改
- refactor: 代码重构
- test: 测试用例修改
- chore: 其他修改

## 📄 许可证 | License

本项目采用 MIT 许可证 - 详见 [LICENSE](LICENSE) 文件

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

## 🤝 贡献 | Contributing

欢迎提交问题和功能请求。如果您想贡献代码，请提交 pull request。

Feel free to submit issues and feature requests. If you want to contribute code, please submit a pull request.

## 📧 联系我们 | Contact Us

- Email: taielab@gmail.com
- GitHub: [@taielab](https://github.com/taielab)
