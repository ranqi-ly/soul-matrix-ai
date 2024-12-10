import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Soul Matrix AI - 探索你们的灵魂契合度',
  description: '利用先进的 AI 技术，深入分析你们的关系潜力，获取专业的关系洞察和建议',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body className={inter.className}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <header className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">AI 恋爱预测</h1>
            <p className="text-lg text-gray-600">用 AI 智能分析，找到你的真爱</p>
          </header>
          <main>{children}</main>
          <footer className="mt-16 text-center text-sm text-gray-500">
            <p> 2024 AI . All rights reserved.</p>
          </footer>
        </div>
      </body>
    </html>
  )
}
