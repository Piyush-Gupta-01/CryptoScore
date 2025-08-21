'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Activity,
  DollarSign,
  Percent,
  Calendar,
  Download,
  Filter,
  RefreshCw,
  Eye,
  Target,
  Zap,
  Shield
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
  PieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ComposedChart
} from 'recharts'
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { useAnalytics } from '@/hooks/useAnalytics'
import { useAuth } from '@/hooks/useAuth'

// Mock analytics data
const creditScoreAnalytics = [
  { month: 'Jul', score: 650, transactions: 45, defiActivity: 12, paymentHistory: 95 },
  { month: 'Aug', score: 675, transactions: 52, defiActivity: 18, paymentHistory: 97 },
  { month: 'Sep', score: 690, transactions: 48, defiActivity: 22, paymentHistory: 98 },
  { month: 'Oct', score: 720, transactions: 61, defiActivity: 28, paymentHistory: 99 },
  { month: 'Nov', score: 745, transactions: 58, defiActivity: 35, paymentHistory: 100 },
  { month: 'Dec', score: 780, transactions: 67, defiActivity: 42, paymentHistory: 100 },
]

const loanPerformance = [
  { month: 'Jul', borrowed: 2000, repaid: 1800, interest: 120, defaultRate: 0 },
  { month: 'Aug', borrowed: 3500, repaid: 3200, interest: 210, defaultRate: 0 },
  { month: 'Sep', borrowed: 2800, repaid: 2600, interest: 168, defaultRate: 0 },
  { month: 'Oct', borrowed: 4200, repaid: 3900, interest: 252, defaultRate: 0 },
  { month: 'Nov', borrowed: 3800, repaid: 3500, interest: 228, defaultRate: 0 },
  { month: 'Dec', borrowed: 5000, repaid: 4600, interest: 300, defaultRate: 0 },
]

const portfolioBreakdown = [
  { name: 'Bitcoin', value: 45, amount: '$12,500', color: '#f7931a' },
  { name: 'Ethereum', value: 30, amount: '$8,300', color: '#627eea' },
  { name: 'DeFi Tokens', value: 15, amount: '$4,150', color: '#10b981' },
  { name: 'Stablecoins', value: 10, amount: '$2,770', color: '#6b7280' },
]

const riskMetrics = [
  { subject: 'Payment History', A: 95, fullMark: 100 },
  { subject: 'Credit Utilization', A: 72, fullMark: 100 },
  { subject: 'Portfolio Diversity', A: 85, fullMark: 100 },
  { subject: 'DeFi Experience', A: 90, fullMark: 100 },
  { subject: 'Transaction Volume', A: 78, fullMark: 100 },
  { subject: 'Wallet Age', A: 82, fullMark: 100 },
]

const transactionAnalytics = [
  { type: 'DeFi Swaps', count: 145, volume: '$45,200', avgSize: '$312' },
  { type: 'Loan Payments', count: 24, volume: '$18,500', avgSize: '$771' },
  { type: 'Liquidity Provision', count: 18, volume: '$32,100', avgSize: '$1,783' },
  { type: 'Yield Farming', count: 32, volume: '$28,900', avgSize: '$903' },
  { type: 'NFT Trading', count: 8, volume: '$5,400', avgSize: '$675' },
]

const predictiveInsights = [
  {
    title: 'Credit Score Projection',
    current: 780,
    projected: 820,
    timeframe: '3 months',
    confidence: 87,
    factors: ['Consistent payments', 'Increased DeFi activity']
  },
  {
    title: 'Loan Approval Rate',
    current: 92,
    projected: 96,
    timeframe: '2 months',
    confidence: 94,
    factors: ['Improved credit utilization', 'Portfolio diversification']
  },
  {
    title: 'Interest Rate Reduction',
    current: 8.5,
    projected: 7.2,
    timeframe: '4 months',
    confidence: 78,
    factors: ['Higher credit score', 'Reputation tokens']
  }
]

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState('6M')
  const [selectedMetric, setSelectedMetric] = useState('creditScore')
  const [isRefreshing, setIsRefreshing] = useState(false)
  const { trackEvent } = useAnalytics()
  const { user } = useAuth()

  useEffect(() => {
    trackEvent('analytics_page_view', { user_id: user?.id })
  }, [trackEvent, user])

  const handleRefresh = async () => {
    setIsRefreshing(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsRefreshing(false)
    trackEvent('analytics_refreshed')
  }

  const handleExport = () => {
    trackEvent('analytics_exported', { format: 'csv' })
    // In a real app, this would trigger a download
    alert('Analytics export feature would be implemented here')
  }

  const kpiCards = [
    {
      title: 'Credit Score',
      value: '780',
      change: '+35',
      changeType: 'increase' as const,
      icon: Shield,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Total Borrowed',
      value: '$21,300',
      change: '+$5,000',
      changeType: 'increase' as const,
      icon: DollarSign,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Avg Interest Rate',
      value: '8.2%',
      change: '-0.8%',
      changeType: 'decrease' as const,
      icon: Percent,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Payment Success Rate',
      value: '100%',
      change: '0%',
      changeType: 'neutral' as const,
      icon: Target,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    },
  ]

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
              <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
              <p className="text-gray-600 mt-1">
                Comprehensive insights into your crypto credit profile
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="btn-secondary flex items-center space-x-2"
              >
                <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                <span>Refresh</span>
              </button>
              <button
                onClick={handleExport}
                className="btn-primary flex items-center space-x-2"
              >
                <Download className="w-4 h-4" />
                <span>Export</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* KPI Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {kpiCards.map((kpi, index) => (
            <motion.div
              key={kpi.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 + index * 0.05 }}
              className="card hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{kpi.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{kpi.value}</p>
                  <div className="flex items-center mt-2">
                    {kpi.changeType === 'increase' ? (
                      <TrendingUp className="w-4 h-4 text-green-500" />
                    ) : kpi.changeType === 'decrease' ? (
                      <TrendingDown className="w-4 h-4 text-red-500" />
                    ) : (
                      <Activity className="w-4 h-4 text-gray-500" />
                    )}
                    <span className={`text-sm ml-1 ${
                      kpi.changeType === 'increase' ? 'text-green-600' : 
                      kpi.changeType === 'decrease' ? 'text-red-600' : 'text-gray-600'
                    }`}>
                      {kpi.change}
                    </span>
                    <span className="text-sm text-gray-500 ml-1">this month</span>
                  </div>
                </div>
                <div className={`w-12 h-12 ${kpi.bgColor} rounded-lg flex items-center justify-center`}>
                  <kpi.icon className={`w-6 h-6 ${kpi.color}`} />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Time Range Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center justify-between"
        >
          <div className="flex space-x-2">
            {['1M', '3M', '6M', '1Y', 'ALL'].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-4 py-2 text-sm rounded-lg transition-colors ${
                  timeRange === range
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {range}
              </button>
            ))}
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Eye className="w-4 h-4" />
            <span>Real-time data</span>
          </div>
        </motion.div>

        {/* Main Charts Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Credit Score Trend */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="card"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Credit Score Analytics</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={creditScoreAnalytics}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="month" stroke="#64748b" />
                  <YAxis yAxisId="left" stroke="#64748b" />
                  <YAxis yAxisId="right" orientation="right" stroke="#64748b" />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: '#fff',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Area
                    yAxisId="left"
                    type="monotone"
                    dataKey="score"
                    fill="#0ea5e9"
                    fillOpacity={0.3}
                    stroke="#0ea5e9"
                    strokeWidth={3}
                  />
                  <Bar yAxisId="right" dataKey="transactions" fill="#10b981" opacity={0.7} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Loan Performance */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="card"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Loan Performance</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={loanPerformance}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="month" stroke="#64748b" />
                  <YAxis stroke="#64748b" />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: '#fff',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Bar dataKey="borrowed" fill="#3b82f6" name="Borrowed" />
                  <Bar dataKey="repaid" fill="#10b981" name="Repaid" />
                  <Bar dataKey="interest" fill="#f59e0b" name="Interest" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        {/* Secondary Charts Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Portfolio Breakdown */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="card"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Portfolio Breakdown</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={portfolioBreakdown}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {portfolioBreakdown.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2 mt-4">
              {portfolioBreakdown.map((item, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <span className="text-gray-600">{item.name}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-medium text-gray-900">{item.value}%</span>
                    <span className="text-gray-500 ml-2">{item.amount}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Risk Assessment */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="card"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Risk Assessment</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={riskMetrics}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" tick={{ fontSize: 12 }} />
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

          {/* Transaction Analytics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="card"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Transaction Analytics</h2>
            <div className="space-y-4">
              {transactionAnalytics.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{item.type}</p>
                    <p className="text-sm text-gray-600">{item.count} transactions</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">{item.volume}</p>
                    <p className="text-sm text-gray-600">Avg: {item.avgSize}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Predictive Insights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="card"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <Zap className="w-6 h-6 text-primary-600" />
              <h2 className="text-xl font-semibold text-gray-900">Predictive Insights</h2>
            </div>
            <span className="text-sm text-gray-500">AI-powered predictions</span>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {predictiveInsights.map((insight, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}
                className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200"
              >
                <h3 className="font-semibold text-gray-900 mb-2">{insight.title}</h3>
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="text-sm text-gray-600">Current</p>
                    <p className="text-lg font-bold text-gray-900">
                      {insight.title.includes('Rate') ? `${insight.current}%` : insight.current}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Projected</p>
                    <p className="text-lg font-bold text-green-600">
                      {insight.title.includes('Rate') ? `${insight.projected}%` : insight.projected}
                    </p>
                  </div>
                </div>
                <div className="mb-3">
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-gray-600">Confidence</span>
                    <span className="font-medium">{insight.confidence}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${insight.confidence}%` }}
                    />
                  </div>
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-1">Key factors:</p>
                  <div className="flex flex-wrap gap-1">
                    {insight.factors.map((factor, factorIndex) => (
                      <span
                        key={factorIndex}
                        className="px-2 py-1 text-xs bg-white text-gray-600 rounded-full"
                      >
                        {factor}
                      </span>
                    ))}
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Timeframe: {insight.timeframe}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  )
}