import { questions } from '@/data/questions'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'

interface QuestionListProps {
  answers: Record<string, string>
  onChange: (answers: Record<string, string>) => void
  disabled?: boolean
}

export default function QuestionList({ answers, onChange, disabled = false }: QuestionListProps) {
  const handleAnswer = (questionId: string, answer: string) => {
    onChange({
      ...answers,
      [questionId]: answer
    })
  }

  return (
    <div className="space-y-8">
      {questions.map((question) => (
        <div key={question.id} className="space-y-4">
          <h4 className="font-medium text-gray-900">
            {question.text}
          </h4>
          <RadioGroup
            value={answers[question.id] || ''}
            onValueChange={(value) => handleAnswer(question.id, value)}
            disabled={disabled}
          >
            <div className="space-y-2">
              {question.options.map((option) => (
                <div
                  key={option.text}
                  className="flex items-center space-x-2"
                >
                  <RadioGroupItem
                    value={option.text}
                    id={`${question.id}-${option.text}`}
                  />
                  <Label
                    htmlFor={`${question.id}-${option.text}`}
                    className="text-sm text-gray-600"
                  >
                    {option.text}
                  </Label>
                </div>
              ))}
            </div>
          </RadioGroup>
        </div>
      ))}
    </div>
  )
}
