import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { questions } from '@/data/questions'
import { useAssessment } from '@/hooks/useAssessment'
import { motion, AnimatePresence } from 'framer-motion'
import { FaHeart, FaUser, FaComments } from 'react-icons/fa'

interface DualAssessmentFormProps {
  onComplete?: (result: any) => void
}

export function DualAssessmentForm({ onComplete }: DualAssessmentFormProps) {
  const {
    person1,
    person2,
    loading,
    error,
    result,
    handlePersonInfoSubmit,
    handleAnswer,
    handleSubmit,
    canSubmit,
    setError,
    clearError
  } = useAssessment({ questions, onComplete })

  const renderPersonInfoForm = (personNumber: 1 | 2) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <Card className="p-6">
        <form onSubmit={(e) => {
          e.preventDefault()
          const formData = new FormData(e.currentTarget)
          handlePersonInfoSubmit(personNumber, {
            name: formData.get('name') as string,
            age: parseInt(formData.get('age') as string),
            gender: formData.get('gender') as 'male' | 'female',
          })
        }}>
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div>
                <Label htmlFor={`name-${personNumber}`}>姓名</Label>
                <input
                  type="text"
                  id={`name-${personNumber}`}
                  name="name"
                  className="w-full p-2 border rounded hover:border-pink-300 focus:border-pink-500 transition-colors"
                  required
                />
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div>
                <Label htmlFor={`age-${personNumber}`}>年龄</Label>
                <input
                  type="number"
                  id={`age-${personNumber}`}
                  name="age"
                  min="18"
                  max="100"
                  className="w-full p-2 border rounded hover:border-pink-300 focus:border-pink-500 transition-colors"
                  required
                />
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div>
                <Label>性别</Label>
                <RadioGroup name="gender" className="flex space-x-4" defaultValue="male">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="male" id={`male-${personNumber}`} />
                    <Label htmlFor={`male-${personNumber}`}>男</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="female" id={`female-${personNumber}`} />
                    <Label htmlFor={`female-${personNumber}`}>女</Label>
                  </div>
                </RadioGroup>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex justify-between mt-8"
            >
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white"
              >
                开始测评
              </Button>
            </motion.div>
          </div>
        </form>
      </Card>
    </motion.div>
  )

  const renderQuestion = (personNumber: 1 | 2) => {
    const person = personNumber === 1 ? person1 : person2
    if (!person.info || person.currentQuestionIndex >= questions.length) return null

    const question = questions[person.currentQuestionIndex]
    const progress = ((person.currentQuestionIndex + 1) / questions.length) * 100

    return (
      <Card className="p-6">
        <div className="mb-4">
          <div className="flex justify-between text-sm text-gray-500 mb-2">
            <span>问题 {person.currentQuestionIndex + 1}/{questions.length}</span>
            <span>{person.info.name}</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
        
        <h3 className="text-xl font-semibold mb-4">{question.text}</h3>
        
        <div className="space-y-3">
          {question.options.map((option) => (
            <Button
              key={option.text}
              onClick={() => handleAnswer(personNumber, option.text)}
              variant="outline"
              className="w-full text-left justify-start h-auto p-4 hover:bg-pink-50 hover:text-pink-600 transition-colors"
            >
              {option.text}
            </Button>
          ))}
        </div>
      </Card>
    )
  }

  const renderPersonColumn = (personNumber: 1 | 2) => {
    const person = personNumber === 1 ? person1 : person2
    
    if (!person.info) {
      return renderPersonInfoForm(personNumber)
    }

    if (person.currentQuestionIndex < questions.length) {
      return renderQuestion(personNumber)
    }

    return (
      <Card className="p-6">
        <div className="text-center">
          <h3 className="text-xl font-bold mb-2">{person.info.name}</h3>
          <p className="text-green-600">✓ 已完成测评</p>
        </div>
      </Card>
    )
  }

  if (result) {
    return null // 结果展示由父组件处理
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-xl font-semibold mb-4">第一位参与者</h2>
          {renderPersonColumn(1)}
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4">第二位参与者</h2>
          {renderPersonColumn(2)}
        </div>
      </div>

      {canSubmit() && !loading && !error && (
        <div className="text-center">
          <Button
            onClick={handleSubmit}
            size="lg"
            className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white"
          >
            提交评估
          </Button>
        </div>
      )}

      {loading && (
        <Card className="p-6">
          <div className="text-center">
            <div className="mb-4">正在分析...</div>
            <Progress value={undefined} className="h-2" />
          </div>
        </Card>
      )}

      {error && (
        <Card className="p-6">
          <div className="text-center text-red-500">
            {error.message}
            <Button
              onClick={clearError}
              className="mt-4"
            >
              重试
            </Button>
          </div>
        </Card>
      )}
    </div>
  )
}
