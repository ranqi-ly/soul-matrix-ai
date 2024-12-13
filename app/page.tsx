'use client'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { FaHeart, FaUserFriends, FaComments, FaRing } from 'react-icons/fa'
import { useState, useEffect } from 'react'

export default function Home() {
  // 使用固定的网格布局作为初始位置
  const initialPositions = Array(20).fill(0).map((_, i) => ({
    x: (i * 100) % 1000,  // 使用固定值代替window.innerWidth
    y: Math.floor(i / 5) * 100
  }));

  const [positions, setPositions] = useState(initialPositions);
  
  // 图标尺寸配置
  const iconProps = {
    size: 24,
    className: "text-white/80"
  };

  useEffect(() => {
    // 客户端加载后更新为随机位置
    if (typeof window !== 'undefined') {
      const newPositions = Array(20).fill(0).map(() => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight
      }));
      setPositions(newPositions);
    }
  }, []);

  return (
    <div className="space-y-32">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600/90 via-pink-500/90 to-red-500/90" />
          {/* Animated Hearts Background */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-white/20"
                initial={{ 
                  scale: 0.5,
                  x: 0,  // 从固定位置开始
                  y: 0
                }}
                animate={{
                  x: positions[i]?.x || 0,  // 动画到随机位置
                  y: positions[i]?.y || 0,
                  scale: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              >
                <FaHeart {...iconProps} />
              </motion.div>
            ))}
          </div>
        </div>
        <motion.div 
          className="relative max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1 
            className="text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-8 tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            探索
            <motion.span 
              className="block mt-2 text-yellow-300"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              灵魂的共鸣
            </motion.span>
          </motion.h1>
          <motion.p 
            className="max-w-2xl mx-auto text-xl text-white/90 mb-12 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            利用先进的 AI 技术，深入分析你们的关系潜力
            <br />
            获取专业的关系洞察和建议
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Badge variant="secondary" className="text-lg px-6 py-2.5 bg-white/20 text-white border-0">
              AI 驱动分析
            </Badge>
            <Badge variant="secondary" className="text-lg px-6 py-2.5 bg-white/20 text-white border-0">
              科学评估方法
            </Badge>
            <Badge variant="secondary" className="text-lg px-6 py-2.5 bg-white/20 text-white border-0">
              个性化建议
            </Badge>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            whileHover={{ scale: 1.05 }}
          >
            <Link href="/assess" className="inline-block">
              <Button
                size="lg"
                className="bg-white text-gray-900 hover:bg-white/90 text-lg px-8 py-6 h-auto rounded-full group"
              >
                <span className="mr-2 group-hover:scale-125 transition-transform">❤️</span>
                开始测试
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">特色功能</h2>
          <p className="text-xl text-gray-500">科学的方法，专业的分析，让爱更有方向</p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card className="p-8 hover:shadow-lg transition-all hover:-translate-y-1 border-0 bg-gradient-to-br from-purple-50 to-white">
              <div className="h-14 w-14 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center mb-6">
                <FaUserFriends {...iconProps} />
              </div>
              <h3 className="text-xl font-semibold mb-3">AI 智能分析</h3>
              <p className="text-gray-500 leading-relaxed">采用先进的人工智能算法，全方位分析你们的关系契合度</p>
            </Card>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Card className="p-8 hover:shadow-lg transition-all hover:-translate-y-1 border-0 bg-gradient-to-br from-pink-50 to-white">
              <div className="h-14 w-14 rounded-2xl bg-pink-100 text-pink-600 flex items-center justify-center mb-6">
                <FaHeart {...iconProps} />
              </div>
              <h3 className="text-xl font-semibold mb-3">科学评估</h3>
              <p className="text-gray-500 leading-relaxed">基于心理学和数据科学的评估体系，确保分析结果的准确性</p>
            </Card>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <Card className="p-8 hover:shadow-lg transition-all hover:-translate-y-1 border-0 bg-gradient-to-br from-yellow-50 to-white">
              <div className="h-14 w-14 rounded-2xl bg-yellow-100 text-yellow-600 flex items-center justify-center mb-6">
                <FaComments {...iconProps} />
              </div>
              <h3 className="text-xl font-semibold mb-3">即时结果</h3>
              <p className="text-gray-500 leading-relaxed">快速获取分析报告，及时了解你们的关系状况</p>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* User Cases Section */}
      <section id="cases" className="bg-gray-50/50">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">用户案例</h2>
            <p className="text-xl text-gray-500">看看其他用户是如何找到真爱的</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                names: "小王 & 小李",
                match: "95%",
                content: "通过 Soul Matrix 的分析，我们发现彼此在很多方面都很契合。现在我们已经在一起一年了，感情越来越好。",
                gradient: "from-purple-600 to-pink-500"
              },
              {
                names: "小张 & 小陈",
                match: "92%",
                content: "AI 的分析帮助我们更好地理解了彼此的性格特点和需求，让我们的感情更加稳固。",
                gradient: "from-pink-500 to-red-500"
              },
              {
                names: "小周 & 小吴",
                match: "88%",
                content: "感谢 Soul Matrix 的建议，让我们能够更好地处理感情中的问题，现在我们的关系更加和谐。",
                gradient: "from-red-500 to-yellow-500"
              }
            ].map((case_, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="p-8 border-0 bg-white hover:shadow-lg transition-all hover:-translate-y-1">
                  <div className="flex items-center mb-6">
                    <div className={`h-14 w-14 rounded-full bg-gradient-to-br ${case_.gradient}`} />
                    <div className="ml-4">
                      <h4 className="font-semibold">{case_.names}</h4>
                      <p className="text-sm text-gray-500">匹配度 {case_.match}</p>
                    </div>
                  </div>
                  <p className="text-gray-500 leading-relaxed">{case_.content}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Love Roadmap Section */}
      <section id="roadmap" className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">恋爱路线图</h2>
          <p className="text-xl text-gray-500">科学的恋爱进程指导</p>
        </motion.div>
        <div className="relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-gradient-to-b from-purple-600 via-pink-500 to-red-500" />
          <div className="space-y-20">
            {[
              {
                title: "初识阶段",
                content: "了解彼此的基本情况，建立初步印象",
                icon: <FaUserFriends {...iconProps} />,
                color: "bg-purple-600"
              },
              {
                title: "了解阶段",
                content: "深入了解对方的性格、爱好、价值观等",
                icon: <FaComments {...iconProps} />,
                color: "bg-pink-500"
              },
              {
                title: "确认关系",
                content: "双方确认感情，建立恋爱关系",
                icon: <FaHeart {...iconProps} />,
                color: "bg-red-500"
              },
              {
                title: "稳定发展",
                content: "共同成长，建立长期稳定的关系",
                icon: <FaRing {...iconProps} />,
                color: "bg-yellow-500"
              }
            ].map((stage, index) => (
              <motion.div
                key={index}
                className="relative"
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <div className="relative pl-16 md:pl-0 md:grid md:grid-cols-2 md:gap-16 md:items-center">
                  <div className={index % 2 === 0 ? "md:text-right" : "md:col-start-2"}>
                    <div className="bg-gray-50 p-8 rounded-2xl hover:shadow-lg transition-all hover:-translate-y-1">
                      <h3 className="text-xl font-semibold mb-3">{stage.title}</h3>
                      <p className="text-gray-500 leading-relaxed">{stage.content}</p>
                    </div>
                  </div>
                  <div className="absolute left-0 md:left-1/2 transform -translate-x-1/2 -translate-y-4">
                    <div className={`h-10 w-10 rounded-full ${stage.color} border-4 border-white shadow-lg flex items-center justify-center text-white`}>
                      {stage.icon}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
