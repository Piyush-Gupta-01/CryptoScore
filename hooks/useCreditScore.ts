'use client'

import { useState, useEffect } from 'react'
import { useAuth } from './useAuth'
import { useWeb3 } from '@/components/providers/Web3Provider'

interface CreditScoreData {
  score: number
  grade: string
  factors: {
    paymentHistory: number
    creditUtilization: number
    defiActivity: number
    walletAge: number
    transactionVolume: number
  }
  history: Array<{
    date: string
    score: number
    change: number
  }>
  recommendations: Array<{
    title: string
    description: string
    impact: 'high' | 'medium' | 'low'
    category: string
  }>
}

export function useCreditScore() {
  const [creditScore, setCreditScore] = useState<CreditScoreData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { user } = useAuth()
  const { account, provider } = useWeb3()

  useEffect(() => {
    if (user || account) {
      fetchCreditScore()
    }
  }, [user, account])

  const fetchCreditScore = async () => {
    setIsLoading(true)
    setError(null)

    try {
      // Simulate API call to fetch credit score
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Mock credit score data with realistic values
      const mockData: CreditScoreData = {
        score: user?.creditScore || 780,
        grade: getGradeFromScore(user?.creditScore || 780),
        factors: {
          paymentHistory: 85,
          creditUtilization: 72,
          defiActivity: 90,
          walletAge: 78,
          transactionVolume: 82,
        },
        history: generateScoreHistory(),
        recommendations: [
          {
            title: 'Increase DeFi Activity',
            description: 'Participate in more DeFi protocols to demonstrate financial sophistication',
            impact: 'high',
            category: 'defi'
          },
          {
            title: 'Maintain Payment History',
            description: 'Continue making timely loan repayments to maintain excellent payment history',
            impact: 'high',
            category: 'payments'
          },
          {
            title: 'Diversify Portfolio',
            description: 'Hold a more diverse range of crypto assets to reduce risk profile',
            impact: 'medium',
            category: 'portfolio'
          },
          {
            title: 'Increase Transaction Volume',
            description: 'Higher transaction volumes demonstrate active financial engagement',
            impact: 'low',
            category: 'activity'
          }
        ]
      }

      setCreditScore(mockData)
    } catch (err) {
      setError('Failed to fetch credit score')
      console.error('Error fetching credit score:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const refreshScore = async () => {
    await fetchCreditScore()
  }

  const getGradeFromScore = (score: number): string => {
    if (score >= 800) return 'A+'
    if (score >= 750) return 'A'
    if (score >= 700) return 'B+'
    if (score >= 650) return 'B'
    if (score >= 600) return 'C+'
    if (score >= 550) return 'C'
    return 'D'
  }

  const generateScoreHistory = () => {
    const history = []
    const baseScore = 650
    let currentScore = baseScore

    for (let i = 11; i >= 0; i--) {
      const date = new Date()
      date.setMonth(date.getMonth() - i)
      
      // Simulate gradual score improvement with some volatility
      const change = Math.random() * 20 - 5 // -5 to +15 range, biased positive
      currentScore = Math.max(300, Math.min(850, currentScore + change))
      
      history.push({
        date: date.toISOString().split('T')[0],
        score: Math.round(currentScore),
        change: Math.round(change)
      })
    }

    return history
  }

  return {
    creditScore,
    isLoading,
    error,
    refreshScore,
  }
}