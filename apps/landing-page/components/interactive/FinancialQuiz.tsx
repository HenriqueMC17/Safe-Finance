"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, XCircle, Trophy, RotateCcw } from "lucide-react"

interface Question {
  id: number
  question: string
  options: string[]
  correct: number
  explanation: string
}

const questions: Question[] = [
  {
    id: 1,
    question: "Qual porcentagem da renda deve ser destinada à reserva de emergência?",
    options: ["5-10%", "10-20%", "20-30%", "30-40%"],
    correct: 1,
    explanation:
      "O ideal é destinar 10-20% da renda para formar uma reserva de emergência que cubra 3-6 meses de gastos.",
  },
  {
    id: 2,
    question: "O que é a regra 50-30-20?",
    options: [
      "50% gastos essenciais, 30% desejos, 20% poupança",
      "50% poupança, 30% gastos, 20% investimentos",
      "50% investimentos, 30% gastos, 20% reserva",
      "50% lazer, 30% contas, 20% comida",
    ],
    correct: 0,
    explanation:
      "A regra 50-30-20 sugere: 50% para necessidades, 30% para desejos e 20% para poupança e investimentos.",
  },
  {
    id: 3,
    question: "Quando começar a investir?",
    options: [
      "Apenas quando tiver muito dinheiro",
      "Depois dos 40 anos",
      "Assim que possível, mesmo com pouco",
      "Só depois de quitar todas as dívidas",
    ],
    correct: 2,
    explanation:
      "O ideal é começar a investir o quanto antes, mesmo com pequenos valores, para aproveitar os juros compostos.",
  },
  {
    id: 4,
    question: "O que fazer primeiro: quitar dívidas ou investir?",
    options: [
      "Sempre investir primeiro",
      "Sempre quitar dívidas primeiro",
      "Depende da taxa de juros da dívida",
      "Fazer os dois ao mesmo tempo sempre",
    ],
    correct: 2,
    explanation:
      "Se a taxa de juros da dívida for maior que o retorno esperado dos investimentos, priorize quitar a dívida.",
  },
  {
    id: 5,
    question: "Qual a importância de ter objetivos financeiros claros?",
    options: [
      "Não é importante, o dinheiro vem naturalmente",
      "Ajuda a manter foco e disciplina",
      "Só serve para pessoas ricas",
      "É apenas uma perda de tempo",
    ],
    correct: 1,
    explanation:
      "Objetivos claros ajudam a manter foco, disciplina e motivação para tomar decisões financeiras conscientes.",
  },
]

export default function FinancialQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [quizCompleted, setQuizCompleted] = useState(false)

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex)
  }

  const handleNextQuestion = () => {
    if (selectedAnswer === null) return

    const newAnswers = [...answers, selectedAnswer]
    setAnswers(newAnswers)

    if (selectedAnswer === questions[currentQuestion].correct) {
      setScore(score + 1)
    }

    setShowResult(true)

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
        setSelectedAnswer(null)
        setShowResult(false)
      } else {
        setQuizCompleted(true)
      }
    }, 2000)
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setScore(0)
    setAnswers([])
    setQuizCompleted(false)
  }

  const getScoreMessage = () => {
    const percentage = (score / questions.length) * 100
    if (percentage >= 80) return "Excelente! Você tem um ótimo conhecimento financeiro!"
    if (percentage >= 60) return "Muito bom! Continue aprendendo sobre finanças."
    if (percentage >= 40) return "Bom começo! Há espaço para melhorar seus conhecimentos."
    return "Que tal estudar mais sobre educação financeira?"
  }

  if (quizCompleted) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Trophy className="size-16 text-yellow-500" />
          </div>
          <CardTitle>Quiz Concluído!</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          <div>
            <div className="text-4xl font-bold text-primary mb-2">
              {score}/{questions.length}
            </div>
            <p className="text-muted-foreground">{getScoreMessage()}</p>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Quer aprender mais?</h3>
            <div className="grid gap-3">
              <Button asChild variant="outline" className="rounded-full bg-transparent">
                <a href="/recursos/blog">Leia nossos artigos</a>
              </Button>
              <Button asChild variant="outline" className="rounded-full bg-transparent">
                <a href="/recursos/guias">Veja nossos guias</a>
              </Button>
              <Button asChild className="rounded-full">
                <a href="/cliente">Experimente a Safe Finance</a>
              </Button>
            </div>
          </div>

          <Button onClick={resetQuiz} variant="ghost" className="rounded-full">
            <RotateCcw className="mr-2 size-4" />
            Refazer Quiz
          </Button>
        </CardContent>
      </Card>
    )
  }

  const question = questions[currentQuestion]
  const progress = ((currentQuestion + 1) / questions.length) * 100

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex justify-between items-center mb-4">
          <CardTitle>Quiz de Educação Financeira</CardTitle>
          <span className="text-sm text-muted-foreground">
            {currentQuestion + 1}/{questions.length}
          </span>
        </div>
        <Progress value={progress} className="h-2" />
      </CardHeader>

      <CardContent className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-4">{question.question}</h3>

          <div className="space-y-3">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                disabled={showResult}
                className={`w-full p-4 text-left rounded-lg border transition-all ${
                  selectedAnswer === index
                    ? showResult
                      ? index === question.correct
                        ? "border-green-500 bg-green-50 text-green-700"
                        : "border-red-500 bg-red-50 text-red-700"
                      : "border-primary bg-primary/5"
                    : showResult && index === question.correct
                      ? "border-green-500 bg-green-50 text-green-700"
                      : "border-border hover:border-primary/50"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>{option}</span>
                  {showResult && (
                    <div>
                      {index === question.correct ? (
                        <CheckCircle className="size-5 text-green-600" />
                      ) : selectedAnswer === index ? (
                        <XCircle className="size-5 text-red-600" />
                      ) : null}
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {showResult && (
          <div className="p-4 bg-muted/30 rounded-lg">
            <p className="text-sm">{question.explanation}</p>
          </div>
        )}

        <div className="flex justify-between items-center">
          <div className="text-sm text-muted-foreground">
            Pontuação: {score}/{currentQuestion + (showResult ? 1 : 0)}
          </div>

          <Button
            onClick={handleNextQuestion}
            disabled={selectedAnswer === null || showResult}
            className="rounded-full"
          >
            {currentQuestion === questions.length - 1 ? "Finalizar" : "Próxima"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
