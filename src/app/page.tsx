'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'

const QuizCard = dynamic(() => import('@/components/quiz/QuizCard'), {
  ssr: false,
})

export default function Home() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
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

  return <QuizCard />
}
