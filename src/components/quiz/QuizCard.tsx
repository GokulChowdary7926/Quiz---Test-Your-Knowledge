'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { getRandomQuestions, type Question } from '@/data/quizData'
import QuizResults from './QuizResults'

export default function QuizCard() {
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>(
    new Array(10).fill(-1)
  )
  const [showResults, setShowResults] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    setQuestions(getRandomQuestions(10))
  }, [])

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' && currentQuestion > 0) {
        setCurrentQuestion(currentQuestion - 1)
      } else if (e.key === 'ArrowRight') {
        if (currentQuestion < questions.length - 1) {
          setCurrentQuestion(currentQuestion + 1)
        } else {
          setShowResults(true)
        }
      } else if (e.key >= '1' && e.key <= '4' && questions.length > 0) {
        const optionIndex = parseInt(e.key) - 1
        if (optionIndex < questions[currentQuestion].options.length) {
          const newAnswers = [...selectedAnswers]
          newAnswers[currentQuestion] = optionIndex
          setSelectedAnswers(newAnswers)
        }
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [currentQuestion, selectedAnswers, questions])

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers]
    newAnswers[currentQuestion] = answerIndex
    setSelectedAnswers(newAnswers)
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const handleSubmit = () => {
    setShowResults(true)
  }

  const handleRetry = () => {
    setCurrentQuestion(0)
    setSelectedAnswers(new Array(10).fill(-1))
    setShowResults(false)
  }

  const handleStartNewTest = () => {
    const newQuestions = getRandomQuestions(10)
    setQuestions(newQuestions)
    setCurrentQuestion(0)
    setSelectedAnswers(new Array(10).fill(-1))
    setShowResults(false)
  }

  if (showResults) {
    const correctAnswers = selectedAnswers.reduce((count, answer, index) => {
      return count + (answer === questions[index].correctAnswer ? 1 : 0)
    }, 0)
    const score = Math.round((correctAnswers / questions.length) * 100)

    return <QuizResults score={score} onRetry={handleRetry} onStartNewTest={handleStartNewTest} />
  }

  if (!isMounted || questions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl w-full max-w-3xl p-8 md:p-12 text-center">
          <div className="animate-pulse space-y-4">
            <div className="h-12 bg-gray-200 rounded w-3/4 mx-auto"></div>
            <div className="h-6 bg-gray-200 rounded w-1/2 mx-auto"></div>
            <div className="h-32 bg-gray-200 rounded w-full mt-8"></div>
          </div>
        </div>
      </div>
    )
  }

  const question = questions[currentQuestion]
  const isLastQuestion = currentQuestion === questions.length - 1

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-3xl shadow-2xl w-full max-w-3xl p-8 md:p-12 relative overflow-hidden border border-gray-100"
      >
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
        <div className="relative z-10">
          <div className="text-center mb-6">
            <h1 className="text-5xl md:text-6xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 mb-3 font-bold">
              Test Your Knowledge
            </h1>
            <p className="text-center text-gray-600 mb-2 text-sm md:text-base font-medium">
              Answer all questions to see your results
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 rounded-full">
              <span className="text-xs font-semibold text-blue-700">
                Question {currentQuestion + 1} of {questions.length}
              </span>
            </div>
          </div>

          <div
            className="flex justify-center gap-2 mb-10"
            role="progressbar"
            aria-valuenow={currentQuestion + 1}
            aria-valuemin={1}
            aria-valuemax={questions.length}
            aria-label={`Question ${currentQuestion + 1} of ${questions.length}`}
          >
            {questions.map((_, index) => (
              <motion.div
                key={index}
                initial={{ width: 0, opacity: 0 }}
                animate={{
                  width: index < currentQuestion ? 40 : index === currentQuestion ? 40 : 32,
                  opacity: 1,
                }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index < currentQuestion
                    ? 'bg-gradient-to-r from-green-500 to-emerald-500'
                    : index === currentQuestion
                    ? 'bg-gradient-to-r from-yellow-400 to-yellow-500'
                    : 'bg-gray-300'
                }`}
                aria-hidden="true"
              />
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="mb-8"
            >
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 mb-6 border-l-4 border-blue-500 shadow-sm"
              >
                <p id="question-text" className="text-lg md:text-xl font-semibold text-gray-800 leading-relaxed">
                  {currentQuestion + 1}. {question.question}
                </p>
              </motion.div>

              <div className="space-y-3" role="radiogroup" aria-labelledby="question-text">
                {question.options.map((option, index) => {
                  const isSelected = selectedAnswers[currentQuestion] === index
                  return (
                    <motion.button
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15 + index * 0.05 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleAnswerSelect(index)}
                      role="radio"
                      aria-checked={isSelected}
                      aria-label={`Option ${index + 1}: ${option}`}
                      className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                        isSelected
                          ? 'bg-gradient-to-r from-blue-100 to-purple-100 border-blue-400 shadow-lg focus:ring-blue-400 scale-[1.02]'
                          : 'bg-white border-gray-200 hover:border-blue-300 hover:bg-blue-50 focus:ring-blue-300'
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <span className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold ${
                          isSelected
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-100 text-gray-600'
                        }`}>
                          {String.fromCharCode(65 + index)}
                        </span>
                        <span className="text-gray-800 font-medium flex-1">{option}</span>
                        {isSelected && (
                          <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="text-blue-600"
                          >
                            ✓
                          </motion.span>
                        )}
                      </span>
                    </motion.button>
                  )
                })}
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-between items-center">
            <motion.button
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              whileHover={currentQuestion > 0 ? { scale: 1.05 } : {}}
              whileTap={currentQuestion > 0 ? { scale: 0.95 } : {}}
              className={`p-3 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                currentQuestion === 0
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 hover:from-blue-100 hover:to-purple-100 focus:ring-blue-300 shadow-sm hover:shadow-md'
              }`}
              aria-label="Previous question"
            >
              <ChevronLeft className="w-6 h-6" />
            </motion.button>

            {isLastQuestion ? (
              <motion.button
                onClick={handleSubmit}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Submit quiz and view results"
                className="px-8 py-3 rounded-xl font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-xl focus:ring-blue-400 hover:scale-105"
              >
                Submit
              </motion.button>
            ) : (
              <motion.button
                onClick={handleNext}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 hover:from-blue-100 hover:to-purple-100 focus:ring-blue-300 shadow-sm hover:shadow-md"
                aria-label="Next question"
              >
                <ChevronRight className="w-6 h-6" />
              </motion.button>
            )}
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex justify-center"
          >
            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
              className="bg-gradient-to-r from-pink-100 via-purple-100 to-blue-100 rounded-2xl px-8 py-4 shadow-xl border-2 border-pink-200/50"
            >
              <p className="text-base font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600">
                ✨ Best of Luck! ✨
              </p>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}
