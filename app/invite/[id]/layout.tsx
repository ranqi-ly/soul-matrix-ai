import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '接受邀请 | Soul Matrix AI',
  description: '填写您的测评问题并查看匹配结果',
}

export default function InviteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
