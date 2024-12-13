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
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
          <div className="max-w-screen-xl mx-auto">
            <div className="flex justify-between items-center h-16 px-4 sm:px-6 lg:px-8">
              <div className="flex items-center">
                <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 text-transparent bg-clip-text">
                  Soul Matrix
                </span>
              </div>
              <div className="hidden md:flex items-center space-x-12">
                <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium">特色</a>
                <a href="#cases" className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium">案例</a>
                <a href="#roadmap" className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium">路线</a>
                <a href="assess" className="px-4 py-2 rounded-full bg-black text-white text-sm font-medium hover:bg-gray-800 transition-colors">
                  开始测试
                </a>
              </div>
            </div>
          </div>
        </nav>
        
        <div className="pt-16">
          <main>{children}</main>
          
          <footer className="bg-white border-t border-gray-100">
            <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="space-y-4">
                  <span className="text-xl font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 text-transparent bg-clip-text">
                    Soul Matrix
                  </span>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    用科技连接灵魂，让爱更有方向。
                  </p>
                </div>
                <div className="space-y-4">
                  <h3 className="text-sm font-medium text-gray-900">探索</h3>
                  <ul className="space-y-3">
                    <li><a href="#features" className="text-gray-500 hover:text-gray-900 text-sm">特色功能</a></li>
                    <li><a href="#cases" className="text-gray-500 hover:text-gray-900 text-sm">用户案例</a></li>
                    <li><a href="#roadmap" className="text-gray-500 hover:text-gray-900 text-sm">恋爱路线</a></li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h3 className="text-sm font-medium text-gray-900">联系我们</h3>
                  <ul className="space-y-3">
                    <li className="text-gray-500 text-sm">Github：<a href='https://github.com/taielab'>https://github.com/taielab</a></li>
                  </ul>
                </div>

              </div>
              <div className="mt-8 pt-8 border-t border-gray-100">
                <p className="text-center text-gray-400 text-sm">
                  2024 Soul Matrix AI. @Taielab All rights reserved.
                </p>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}
