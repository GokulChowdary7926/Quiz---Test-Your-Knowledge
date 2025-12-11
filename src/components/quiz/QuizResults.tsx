'use client'

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useEffect } from 'react'

interface QuizResultsProps {
  score: number
  onRetry: () => void
  onStartNewTest: () => void
}

function AnimatedCounter({ value }: { value: number }) {
  const count = useMotionValue(1)
  const rounded = useSpring(count, {
    damping: 30,
    stiffness: 100,
  })
  const display = useTransform(rounded, (latest) => Math.floor(latest))

  useEffect(() => {
    count.set(1)
    const timer = setTimeout(() => {
      count.set(value)
    }, 200)
    return () => clearTimeout(timer)
  }, [value, count])

  return <motion.span>{display}</motion.span>
}

export default function QuizResults({ score, onRetry, onStartNewTest }: QuizResultsProps) {
  const getScoreColor = () => {
    if (score >= 80) return 'from-green-500 to-emerald-600'
    if (score >= 60) return 'from-blue-500 to-indigo-600'
    if (score >= 40) return 'from-yellow-500 to-orange-600'
    return 'from-red-500 to-pink-600'
  }

  const getScoreMessage = () => {
    if (score >= 80) return 'Excellent!'
    if (score >= 60) return 'Good Job!'
    if (score >= 40) return 'Keep Practicing!'
    return 'Try Again!'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl p-8 md:p-12 text-center relative overflow-hidden border border-gray-100"
      >
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onRetry}
            className="inline-block bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 rounded-full px-6 py-2 text-sm font-semibold text-blue-700 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer"
          >
            {getScoreMessage()}
          </motion.button>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-3xl md:text-4xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 mb-4 font-bold"
        >
          Your Final Score is
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, type: 'spring', stiffness: 150, damping: 15 }}
          className="mb-8"
        >
          <div className="flex items-baseline justify-center gap-2">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.6, type: 'spring', stiffness: 200 }}
              className={`text-7xl md:text-8xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r ${getScoreColor()}`}
            >
              <AnimatedCounter value={score} />
            </motion.div>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className={`text-4xl md:text-5xl font-serif text-transparent bg-clip-text bg-gradient-to-r ${getScoreColor()}`}
            >
              %
            </motion.span>
          </div>
        </motion.div>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onStartNewTest}
          aria-label="Start new test"
          className="bg-gradient-to-r from-gray-400 to-gray-500 hover:from-gray-500 hover:to-gray-600 text-white font-semibold px-8 py-3 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 hover:scale-105"
        >
          Start New Test
        </motion.button>
      </motion.div>
    </div>
  )
}
