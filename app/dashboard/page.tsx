'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  TrendingUp, 
  TrendingDown, 
  Shield, 
  Coins, 
  Activity,
  CreditCard,
  DollarSign,
  Users,
  AlertCircle,
  CheckCircle,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  Zap
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
  Cell
} from 'recharts'
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { CreditScoreCard } from '@/components/dashboard/CreditScoreCard'
import { ReputationTokens } from '@/components/dashboard/ReputationTokens'
import { LoanOpportunities } from '@/components/dashboard/LoanOpportunities'
import { TransactionHistory } from '@/components/dashboard/TransactionHistory'
import { useAnalytics } from '@/hooks/useAnalytics'
import { useCreditScore } from '@/hooks/useCreditScore'
import { useAuth } from '@/hooks/useAuth'

// Mock data for demo
const creditScoreHistory = [
  { month: 'Jan', score: 650 },
  { month: 'Feb', score: 675 },
  { month: 'Mar', score: 690 },
  { month: 'Apr', score: 720 },
  { month: 'May', score: 745 },
  { month: 'Jun', score: 780 },
]

const portfolioData = [
  { name: 'Bitcoin', value: 45, color: '#f7931a' },
  { name: 'Ethereum', value: 30, color: '#627eea' },
  { name: 'DeFi Tokens', value: 15, color: '#10b981' },
  { name: 'Stablecoins', value: 10, color: '#6b7280' },
]

const recentActivity = [
  {
    id: 1,
    type: 'loan_repayment',
    description: 'Loan repayment completed',
    amount: '+50 RST',
    timestamp: '2 hours ago',
    status: 'completed'
  },
  {
    id: 2,
    type: 'defi_interaction',
    description: 'Uniswap liquidity provision',
    amount: '+25 RST',
    timestamp: '1 day ago',
    status: 'completed'
  },
  {
    id: 3,
    type: 'score_update',
    description: 'Credit score updated',
    amount: '+15 points',
    timestamp: '2 days ago',
    status: 'completed'
  },
]

const loanOffers = [
  {
    id: 1,
    lender: 'Aave Protocol',
    amount: '10,000 USDC',
    apr: '8.5%',
    term: '12 months',
    collateral: '120%',
    status: 'available'
  },
  {
    id: 2,
    lender: 'Compound Finance',
    amount: '5,000 DAI',
    apr: '7.2%',
    term: '6 months',
    collateral: '110%',
    status: 'available'
  },
  {
    id: 3,
    lender: 'MakerDAO',
    amount: '15,000 USDC',
    apr: '9.1%',
    term: '18 months',
    collateral: '130%',
    status: 'pending'
  },
]

export default function DashboardPage() {
  const [timeRange, setTimeRange] = useState('6M')
  const { trackEvent } = useAnalytics()
  const { creditScore, isLoading } = useCreditScore()
  const { user } = useAuth()

  useEffect(() => {
    trackEvent('dashboard_view', { user_id: user?.id })
  }, [trackEvent, user])

  const stats = [
    {
      title: 'Credit Score',
      value: creditScore?.score || 780,
      change: '+25',
      changeType: 'increase' as const,
      icon: Shield,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Reputation Tokens',
      value: '2,847',
      change: '+127',
      changeType: 'increase' as const,
      icon: Coins,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Available Credit',
      value: '$45,000',
      change: '+$5,000',
      changeType: 'increase' as const,
      icon: CreditCard,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Active Loans',
      value: '3',
      change: '+1',
      changeType: 'increase' as const,
      icon: DollarSign,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    },
  ]

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Welcome back, {user?.firstName || 'User'}! 👋
              </h1>
              <p className="text-gray-600 mt-1">
                Here's your crypto credit overview for today
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>Live Data</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 + index * 0.05 }}
              className="card hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  <div className="flex items-center mt-2">
                    {stat.changeType === 'increase' ? (
                      <ArrowUpRight className="w-4 h-4 text-green-500" />
                    ) : (
                      <ArrowDownRight className="w-4 h-4 text-red-500" />
                    )}
                    <span className={`text-sm ml-1 ${
                      stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {stat.change}
                    </span>
                    <span className="text-sm text-gray-500 ml-1">this month</span>
                  </div>
                </div>
                <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Credit Score Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-2 card"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Credit Score Trend</h2>
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
                <AreaChart data={creditScoreHistory}>
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

          {/* Portfolio Breakdown */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="card"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Portfolio Breakdown</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={portfolioData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {portfolioData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-3 mt-4">
              {portfolioData.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <span className="text-sm text-gray-600">{item.name}</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900">{item.value}%</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Recent Activity & Loan Offers */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="card"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Recent Activity</h2>
              <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                View All
              </button>
            </div>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                      {activity.type === 'loan_repayment' && <CreditCard className="w-5 h-5 text-primary-600" />}
                      {activity.type === 'defi_interaction' && <Zap className="w-5 h-5 text-primary-600" />}
                      {activity.type === 'score_update' && <TrendingUp className="w-5 h-5 text-primary-600" />}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{activity.description}</p>
                      <p className="text-xs text-gray-500">{activity.timestamp}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-green-600">{activity.amount}</p>
                    <CheckCircle className="w-4 h-4 text-green-500 ml-auto mt-1" />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Loan Opportunities */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="card"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Loan Opportunities</h2>
              <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                View All
              </button>
            </div>
            <div className="space-y-4">
              {loanOffers.slice(0, 3).map((offer) => (
                <div key={offer.id} className="border border-gray-200 rounded-lg p-4 hover:border-primary-300 transition-colors">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium text-gray-900">{offer.lender}</h3>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      offer.status === 'available' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {offer.status}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">Amount</p>
                      <p className="font-medium text-gray-900">{offer.amount}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">APR</p>
                      <p className="font-medium text-gray-900">{offer.apr}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Term</p>
                      <p className="font-medium text-gray-900">{offer.term}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Collateral</p>
                      <p className="font-medium text-gray-900">{offer.collateral}</p>
                    </div>
                  </div>
                  <button className="w-full mt-3 btn-primary py-2 text-sm">
                    Apply Now
                  </button>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="card"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { title: 'Request Loan', icon: CreditCard, color: 'bg-blue-500' },
              { title: 'Update Profile', icon: Users, color: 'bg-green-500' },
              { title: 'View Analytics', icon: Activity, color: 'bg-purple-500' },
              { title: 'Earn Tokens', icon: Coins, color: 'bg-orange-500' },
            ].map((action, index) => (
              <motion.button
                key={action.title}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex flex-col items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center mb-3`}>
                  <action.icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-sm font-medium text-gray-900">{action.title}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  )
}