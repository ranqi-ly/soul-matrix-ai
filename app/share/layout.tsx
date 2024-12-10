import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '分享 - Soul Matrix AI',
  description: '查看 AI 生成的关系分析报告',
}

export default function ShareLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
