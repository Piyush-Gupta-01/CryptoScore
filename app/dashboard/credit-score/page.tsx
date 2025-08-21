'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Shield, 
  TrendingUp, 
  TrendingDown, 
  Info, 
  RefreshCw,
  AlertCircle,
  CheckCircle,
  Target,
  BarChart3,
  Calendar
} from 'lucide-react'
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts'
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { useAnalytics } from '@/hooks/useAnalytics'
import { useCreditScore } from '@/hooks/useCreditScore'
import { useAuth } from '@/hooks/useAuth'

// Mock data for detailed credit score analysis
const scoreHistory = [
  { month: 'Jan', score: 650, change: 0 },
  { month: 'Feb', score: 675, change: 25 },
  { month: 'Mar', score: 690, change: 15 },
  { month: 'Apr', score: 720, change: 30 },
  { month: 'May', score: 745, change: 25 },
  { month: 'Jun', score: 780, change: 35 },
]

const factorBreakdown = [
  { factor: 'Payment History', score: 85, weight: 35, description: 'Your track record of on-time payments' },
  { factor: 'Credit Utilization', score: 72, weight: 30, description: 'How much of your available credit you use' },
  { factor: 'DeFi Activity', score: 90, weight: 20, description: 'Your participation in DeFi protocols' },
  { factor: 'Wallet Age', score: 78, weight: 10, description: 'How long your wallet has been active' },
  { factor: 'Transaction Volume', score: 82, weight: 5, description: 'Your overall transaction activity' },
]

const radarData = [
  { subject: 'Payment History', A: 85, fullMark: 100 },
  { subject: 'Credit Utilization', A: 72, fullMark: 100 },
  { subject: 'DeFi Activity', A: 90, fullMark: 100 },
  { subject: 'Wallet Age', A: 78, fullMark: 100 },
  { subject: 'Transaction Volume', A: 82, fullMark: 100 },
]

const recommendations = [
  {
    id: 1,
    title: 'Increase DeFi Activity',
    description: 'Participate in more DeFi protocols to demonstrate financial sophistication',
    impact: 'high' as const,
    category: 'defi',
    potentialIncrease: '+15-25 points',
    timeframe: '2-3 months',
    actions: [
      'Provide liquidity to major DEX pools',
      'Participate in yield farming',
      'Use lending protocols like Aave or Compound'
    ]
  },
  {
    id: 2,
    title: 'Maintain Payment History',
    description: 'Continue making timely loan repayments to maintain excellent payment history',
    impact: 'high' as const,
    category: 'payments',
    potentialIncrease: 'Maintain current score',
    timeframe: 'Ongoing',
    actions: [
      'Set up automatic payments',
      'Pay before due dates',
      'Never miss a payment'
    ]
  },
  {
    id: 3,
    title: 'Diversify Portfolio',
    description: 'Hold a more diverse range of crypto assets to reduce risk profile',
    impact: 'medium' as const,
    category: 'portfolio',
    potentialIncrease: '+5-10 points',
    timeframe: '1-2 months',
    actions: [
      'Hold stablecoins for stability',
      'Diversify across different crypto sectors',
      'Maintain balanced portfolio allocation'
    ]
  },
  {
    id: 4,
    title: 'Increase Transaction Volume',
    description: 'Higher transaction volumes demonstrate active financial engagement',
    impact: 'low' as const,
    category: 'activity',
    potentialIncrease: '+3-7 points',
    timeframe: '3-6 months',
    actions: [
      'Make regular transactions',
      'Use multiple DeFi protocols',
      'Engage in cross-chain activities'
    ]
  }
]

export default function CreditScorePage() {
  const [timeRange, setTimeRange] = useState('6M')
  const [isRefreshing, setIsRefreshing] = useState(false)
  const { trackEvent } = useAnalytics()
  const { creditScore, isLoading, refreshScore } = useCreditScore()
  const { user } = useAuth()

  useEffect(() => {
    trackEvent('credit_score_page_view', { user_id: user?.id })
  }, [trackEvent, user])

  const handleRefreshScore = async () => {
    setIsRefreshing(true)
    try {
      await refreshScore()
      trackEvent('credit_score_refreshed')
    } catch (error) {
      console.error('Failed to refresh score:', error)
    } finally {
      setIsRefreshing(false)
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 750) return '#10b981' // green
    if (score >= 650) return '#f59e0b' // yellow
    return '#ef4444' // red
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

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'text-red-600 bg-red-50'
      case 'medium': return 'text-yellow-600 bg-yellow-50'
      case 'low': return 'text-green-600 bg-green-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  const currentScore = creditScore?.score || 780
  const currentGrade = getGradeFromScore(currentScore)

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Credit Score Analysis</h1>
              <p className="text-gray-600 mt-1">
                Detailed breakdown of your blockchain credit profile
              </p>
            </div>
            <button
              onClick={handleRefreshScore}
              disabled={isRefreshing}
              className="btn-primary flex items-center space-x-2"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>{isRefreshing ? 'Refreshing...' : 'Refresh Score'}</span>
            </button>
          </div>
        </motion.div>

        {/* Current Score Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="card"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <Shield className="w-6 h-6 text-primary-600" />
              <h2 className="text-xl font-semibold text-gray-900">Current Credit Score</h2>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <Calendar className="w-4 h-4" />
              <span>Last updated: 2 hours ago</span>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="flex items-center justify-center">
              <div className="relative">
                <svg className="w-48 h-48 transform -rotate-90" viewBox="0 0 100 100">
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
                    stroke={getScoreColor(currentScore)}
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={`${(currentScore / 850) * 251} 251`}
                    strokeLinecap="round"
                    className="transition-all duration-1000"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-4xl font-bold text-gray-900">{currentScore}</span>
                  <span className="text-lg text-gray-500">/ 850</span>
                  <span 
                    className="text-2xl font-bold mt-2"
                    style={{ color: getScoreColor(currentScore) }}
                  >
                    {currentGrade}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Score Breakdown</h3>
                <div className="space-y-3">
                  {factorBreakdown.map((factor, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium text-gray-900">{factor.factor}</span>
                          <span className="text-sm text-gray-600">{factor.score}/100</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="h-2 rounded-full transition-all duration-500"
                            style={{ 
                              width: `${factor.score}%`,
                              backgroundColor: getScoreColor(factor.score)
                            }}
                          />
                        </div>
                        <p className="text-xs text-gray-500 mt-1">{factor.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-green-600">+35</p>
                    <p className="text-sm text-gray-600">Points this month</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-blue-600">92%</p>
                    <p className="text-sm text-gray-600">Better than peers</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Score History Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="card"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Score History</h2>
            <div className="flex space-x-2">
              {['1M', '3M', '6M', '1Y'].map((range) => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                    timeRange === range
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={scoreHistory}>
                <defs>
                  <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="month" stroke="#64748b" />
                <YAxis stroke="#64748b" domain={[600, 800]} />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="score"
                  stroke="#0ea5e9"
                  strokeWidth={3}
                  fill="url(#scoreGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Factor Analysis */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Radar Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="card"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Factor Analysis</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} />
                  <Radar
                    name="Score"
                    dataKey="A"
                    stroke="#0ea5e9"
                    fill="#0ea5e9"
                    fillOpacity={0.3}
                    strokeWidth={2}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Factor Weights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="card"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Factor Weights</h2>
            <div className="space-y-4">
              {factorBreakdown.map((factor, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{factor.factor}</p>
                    <p className="text-sm text-gray-600">Score: {factor.score}/100</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-primary-600">{factor.weight}%</p>
                    <p className="text-xs text-gray-500">Weight</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Recommendations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="card"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <Target className="w-6 h-6 text-primary-600" />
              <h2 className="text-xl font-semibold text-gray-900">Improvement Recommendations</h2>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {recommendations.map((rec, index) => (
              <motion.div
                key={rec.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                className="border border-gray-200 rounded-lg p-6 hover:border-primary-300 transition-colors"
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="font-semibold text-gray-900">{rec.title}</h3>
                  <span className={`px-2 py-1 text-xs rounded-full font-medium ${getImpactColor(rec.impact)}`}>
                    {rec.impact.toUpperCase()} IMPACT
                  </span>
                </div>
                
                <p className="text-gray-600 mb-4">{rec.description}</p>
                
                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                  <div>
                    <p className="text-gray-500">Potential Increase</p>
                    <p className="font-medium text-green-600">{rec.potentialIncrease}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Timeframe</p>
                    <p className="font-medium text-gray-900">{rec.timeframe}</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-900 mb-2">Action Items:</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {rec.actions.map((action, actionIndex) => (
                      <li key={actionIndex} className="flex items-start space-x-2">
                        <CheckCircle className="w-3 h-3 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>{action}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  )
}