import ClientContainer from '@/components/ClientContainer'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-50 to-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">AI 恋爱匹配分析</h1>
          <p className="text-lg text-gray-600">
            使用先进的 AI 技术，分析两个人的性格特征和生活方式，帮助你了解彼此的契合度
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white rounded-xl shadow-sm p-6 text-center hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl" role="img" aria-label="智能分析">💝</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">智能匹配分析</h3>
            <p className="text-gray-600">基于双方的个性特征，使用先进的 AI 模型进行全面分析</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 text-center hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl" role="img" aria-label="专业建议">🎯</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">专业情感建议</h3>
            <p className="text-gray-600">获取个性化的恋爱和婚姻建议，帮助你找到真爱</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 text-center hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl" role="img" aria-label="持续成长">📈</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">关系成长指导</h3>
            <p className="text-gray-600">了解双方的优势和不足，在恋爱中不断进步</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 md:p-8">
            <ClientContainer />
          </div>
        </div>

        <div className="mt-12 text-center text-sm text-gray-500">
          <p>注意：本服务仅供参考，真实的感情需要双方用心经营</p>
        </div>
      </div>
    </main>
  )
}
