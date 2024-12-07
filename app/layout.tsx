import './globals.css'
import { Inter } from 'next/font/google'
import type { Metadata } from 'next'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'AI 恋爱预测 | 找到你的真爱',
  description: '使用先进的 AI 技术，预测你的恋爱和婚姻契合度，帮助你找到真爱。',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh" className={inter.variable}>
      <body className="min-h-screen bg-gradient-to-b from-pink-50 to-white">
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
