# Soul Matrix AI 💕

[![Next.js](https://img.shields.io/badge/Next.js-13.4.7-blueviolet.svg)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.1.3-blue.svg)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.3.2-38B2AC.svg)](https://tailwindcss.com/)
[![OpenAI](https://img.shields.io/badge/OpenAI-GPT--4-green.svg)](https://openai.com/)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](https://opensource.org/licenses/MIT)

<div align="center">
  <h3>🌟 AI-Powered Relationship Analysis System</h3>
  <p>Deep Personality Analysis • Intelligent Matching • Professional Relationship Advice</p>
</div>

## 📖 Introduction

Soul Matrix AI is an innovative AI-driven relationship analysis system. Leveraging advanced OpenAI GPT-4/3.5 models, it provides professional compatibility assessments and personalized relationship advice by analyzing personality traits, interests, values, and lifestyles of two individuals. The system not only calculates compatibility scores but also generates detailed analysis reports and constructive relationship guidance.

## 🌈 Interface Preview

### 💫 Main Interface
![Main Interface](/public/screenshots/main.png)
> Clean, modern user interface with dark mode support

### 📝 Assessment Form
![Assessment Form](/public/screenshots/form.png)
> Intelligent form design for effortless information input

### 📊 Analysis Report
![Analysis Report](/public/screenshots/report.png)
> Professional compatibility analysis with data visualization

### 🔄 Share Feature
![Share Feature](/public/screenshots/share.png)
> Convenient social media sharing functionality

## 🎯 Core Features

### 🤖 AI Analysis System
- GPT-4/3.5 powered deep analysis engine
- Smart request queue and auto-retry mechanism
- Multi-layer caching system
- Robust error handling and recovery
- Multi-dimensional personality trait analysis

### 💑 User Experience
- Intuitive questionnaire interface
- Real-time compatibility calculation
- Beautiful data visualization
- Responsive design support
- Social media sharing integration
- Smooth loading states and transitions

### 📊 Analysis Report
- Comprehensive Dimensional Analysis
  - Personality compatibility assessment
  - Communication style analysis
  - Value system alignment
  - Lifestyle compatibility
  - Growth potential evaluation
  - MBTI personality type analysis
  - Zodiac compatibility analysis
  - Common interests exploration
- Professional Development Advice
  - Personalized interaction strategies
  - Potential risk warnings
  - Relationship enhancement plans
  - Mutual growth suggestions
- Visual Chart Display
  - Radar charts for compatibility
  - Bar charts for compatibility metrics
  - Pie charts for dimension weights

## 🛠️ Tech Stack

### Frontend
- ⚡️ Next.js 13+ (App Router)
- 🔷 TypeScript
- 🎨 Tailwind CSS
- 🎯 React Query
- 📊 Recharts
- 🎭 Framer Motion
- 🎪 shadcn/ui

### Backend
- 🚀 Next.js API Routes
- 🤖 OpenAI GPT-4/3.5
- 💾 Edge Runtime
- 🔄 Vercel KV Storage

### Development Tools
- 📦 pnpm
- 🔍 ESLint
- 💅 Prettier
- 🐶 Husky
- 📋 Commitlint

## 🚀 Quick Start

### Prerequisites
- Node.js 16.8+
- pnpm 8.0+
- OpenAI API Key

### Installation Steps

1. Clone the repository
```bash
git clone https://github.com/taielab/soul-matrix-ai.git
cd soul-matrix-ai
```

2. Install dependencies
```bash
pnpm install
```

3. Environment setup
```bash
cp .env.example .env
```

4. Configure environment variables
```env
# OpenAI API Configuration (Using YunWu Proxy)
YUNWU_API_KEY=
YUNWU_API_URL=https://yunwu.ai/v1/chat/completions
YUNWU_MODEL=gpt-3.5-turbo
OPENAI_MAX_TOKENS=2000
OPENAI_TEMPERATURE=0.7

# Proxy Retry Configuration
API_MAX_RETRIES=3
API_INITIAL_RETRY_DELAY=3000
API_MAX_RETRY_DELAY=15000

# Proxy Timeout Configuration
API_REQUEST_TIMEOUT=30000

# Other Configuration
NODE_ENV=development
```

5. Start development server
```bash
pnpm dev
```

## 🚀 Deployment Guide

### Deploy to Vercel

1. **Fork and Import**
   - Fork this repository
   - Go to [Vercel](https://vercel.com)
   - Click "New Project"
   - Import your forked repository
   - Choose "Next.js" as framework

2. **Environment Variables**
   - Add the following environment variables in Vercel project settings:
   ```env
   # YUNWU API Configuration (Using YunWu Proxy)
   YUNWU_API_KEY=your_yunwu_api_key
   YUNWU_API_URL=https://yunwu.ai/v1/chat/completions
   YUNWU_MODEL=gpt-3.5-turbo
   OPENAI_MAX_TOKENS=2000
   OPENAI_TEMPERATURE=0.7

   # Proxy Configuration
   API_MAX_RETRIES=3
   API_INITIAL_RETRY_DELAY=3000
   API_MAX_RETRY_DELAY=15000
   API_REQUEST_TIMEOUT=30000

   # Environment
   NODE_ENV=production
   ```

3. **Deploy**
   - Click "Deploy"
   - Wait for the build process
   - Your site will be live at `https://your-project.vercel.app`

4. **Custom Domain (Optional)**
   - Go to Project Settings > Domains
   - Add your custom domain
   - Follow DNS configuration instructions

### Deploy to Other Platforms

#### Railway
1. Create new project from GitHub
2. Configure environment variables
3. Deploy with "Start Command": `pnpm start`

#### Netlify
1. Connect your GitHub repository
2. Configure build settings:
   - Build command: `pnpm build`
   - Publish directory: `.next`
3. Add environment variables
4. Deploy

```

## 📱 Usage Guide

1. Personal Information
   - Enter basic information
   - Select personality traits
   - Describe interests

2. Partner Information
   - Input partner details
   - Describe personality traits
   - Add interests and hobbies

3. Get Analysis Report
   - View compatibility score
   - Read detailed analysis
   - Review suggestions

4. Share Results
   - Save analysis report
   - Share on social media
   - Export detailed report

## 🤝 Contributing

We welcome all forms of contributions, whether it's new features, documentation improvements, or bug reports. Please check our contribution guidelines for more information.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- OpenAI team for powerful API support
- Next.js team for excellent framework
- shadcn/ui for beautiful components
- All contributors for valuable input

## 📞 Contact

- Project Lead: [Taielab](https://github.com/taielab)
- Website: [https://github.com/taielab](https://github.com/taielab)

---

<div align="center">
  <p>Connecting Souls with Technology • Guiding Love with Intelligence</p>
</div>
