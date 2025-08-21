'use client'

import { motion } from 'framer-motion'
import { Shield, TrendingUp, TrendingDown, Info } from 'lucide-react'
// import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
// import 'react-circular-progressbar/dist/styles.css'

interface CreditScoreCardProps {
  score: number
  grade: string
  change: number
  maxScore?: number
}

export function CreditScoreCard({ 
  score, 
  grade, 
  change, 
  maxScore = 850 
}: CreditScoreCardProps) {
  const percentage = (score / maxScore) * 100
  const isPositiveChange = change >= 0

  const getScoreColor = (score: number) => {
    if (score >= 750) return '#10b981' // green
    if (score >= 650) return '#f59e0b' // yellow
    return '#ef4444' // red
  }

  const getGradeDescription = (grade: string) => {
    switch (grade) {
      case 'A+':
      case 'A':
        return 'Excellent - Access to best rates'
      case 'B+':
      case 'B':
        return 'Good - Competitive rates available'
      case 'C+':
      case 'C':
        return 'Fair - Limited options available'
      default:
        return 'Poor - Focus on improvement'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="card"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Shield className="w-6 h-6 text-primary-600" />
          <h3 className="text-lg font-semibold text-gray-900">Credit Score</h3>
        </div>
        <button className="p-1 text-gray-400 hover:text-gray-600">
          <Info className="w-4 h-4" />
        </button>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-baseline space-x-2 mb-2">
            <span className="text-4xl font-bold text-gray-900">{score}</span>
            <span className="text-lg text-gray-500">/ {maxScore}</span>
          </div>
          
          <div className="flex items-center space-x-2 mb-4">
            <span className={`text-2xl font-bold ${
              grade.startsWith('A') ? 'text-green-600' :
              grade.startsWith('B') ? 'text-yellow-600' :
              'text-red-600'
            }`}>
              {grade}
            </span>
            <div className="flex items-center space-x-1">
              {isPositiveChange ? (
                <TrendingUp className="w-4 h-4 text-green-500" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-500" />
              )}
              <span className={`text-sm font-medium ${
                isPositiveChange ? 'text-green-600' : 'text-red-600'
              }`}>
                {isPositiveChange ? '+' : ''}{change} this month
              </span>
            </div>
          </div>

          <p className="text-sm text-gray-600">
            {getGradeDescription(grade)}
          </p>
        </div>

        <div className="w-24 h-24 relative">
          <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="#f3f4f6"
              strokeWidth="8"
              fill="none"
            />
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke={getScoreColor(score)}
              strokeWidth="8"
              fill="none"
              strokeDasharray={`${percentage * 2.51} 251`}
              strokeLinecap="round"
              className="transition-all duration-500"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-sm font-bold" style={{ color: getScoreColor(score) }}>
              {Math.round(percentage)}%
            </span>
          </div>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Last updated</span>
          <span className="text-gray-900 font-medium">2 hours ago</span>
        </div>
      </div>
    </motion.div>
  )
}