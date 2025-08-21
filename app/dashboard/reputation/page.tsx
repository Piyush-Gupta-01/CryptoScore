'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Coins, 
  TrendingUp, 
  Gift, 
  Zap, 
  Award, 
  Target,
  Calendar,
  Users,
  Star,
  Trophy,
  Medal,
  Crown,
  Flame,
  CheckCircle
} from 'lucide-react'
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from 'recharts'
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { useAnalytics } from '@/hooks/useAnalytics'
import { useAuth } from '@/hooks/useAuth'

// Mock data for reputation system
const tokenHistory = [
  { month: 'Jul', earned: 120, spent: 20, balance: 100 },
  { month: 'Aug', earned: 180, spent: 30, balance: 250 },
  { month: 'Sep', earned: 220, spent: 50, balance: 420 },
  { month: 'Oct', earned: 280, spent: 40, balance: 660 },
  { month: 'Nov', earned: 320, spent: 60, balance: 920 },
  { month: 'Dec', earned: 350, spent: 80, balance: 1190 },
  { month: 'Jan', earned: 400, spent: 100, balance: 1490 },
]

const recentActivities = [
  {
    id: 1,
    type: 'loan_repayment',
    description: 'Loan repayment completed on time',
    tokens: '+50 RST',
    time: '2 hours ago',
    icon: CheckCircle,
    color: 'text-green-600',
    multiplier: '1.2x'
  },
  {
    id: 2,
    type: 'defi_interaction',
    description: 'Provided liquidity to Uniswap V3 pool',
    tokens: '+25 RST',
    time: '1 day ago',
    icon: Zap,
    color: 'text-blue-600',
    multiplier: '1.0x'
  },
  {
    id: 3,
    type: 'referral_bonus',
    description: 'Friend completed first loan',
    tokens: '+100 RST',
    time: '3 days ago',
    icon: Gift,
    color: 'text-purple-600',
    multiplier: '2.0x'
  },
  {
    id: 4,
    type: 'streak_bonus',
    description: '30-day payment streak achieved',
    tokens: '+75 RST',
    time: '1 week ago',
    icon: Flame,
    color: 'text-orange-600',
    multiplier: '1.5x'
  },
  {
    id: 5,
    type: 'milestone_reward',
    description: 'Reached 1000 RST milestone',
    tokens: '+200 RST',
    time: '2 weeks ago',
    icon: Trophy,
    color: 'text-yellow-600',
    multiplier: '3.0x'
  }
]

const achievements = [
  {
    id: 1,
    title: 'Early Adopter',
    description: 'One of the first 1000 users',
    icon: Crown,
    earned: true,
    rarity: 'legendary',
    reward: '500 RST',
    date: '2023-07-15'
  },
  {
    id: 2,
    title: 'Perfect Payer',
    description: 'Never missed a payment',
    icon: CheckCircle,
    earned: true,
    rarity: 'epic',
    reward: '300 RST',
    date: '2023-12-01'
  },
  {
    id: 3,
    title: 'DeFi Explorer',
    description: 'Used 10+ DeFi protocols',
    icon: Zap,
    earned: true,
    rarity: 'rare',
    reward: '150 RST',
    date: '2023-11-20'
  },
  {
    id: 4,
    title: 'Community Builder',
    description: 'Referred 5+ friends',
    icon: Users,
    earned: false,
    rarity: 'epic',
    reward: '400 RST',
    progress: 60
  },
  {
    id: 5,
    title: 'Whale Borrower',
    description: 'Borrowed over $100K',
    icon: Trophy,
    earned: false,
    rarity: 'legendary',
    reward: '1000 RST',
    progress: 25
  },
  {
    id: 6,
    title: 'Streak Master',
    description: '100-day payment streak',
    icon: Flame,
    earned: false,
    rarity: 'rare',
    reward: '250 RST',
    progress: 30
  }
]

const leaderboard = [
  { rank: 1, name: 'CryptoKing', tokens: 15420, change: '+2.5%' },
  { rank: 2, name: 'DeFiMaster', tokens: 12890, change: '+1.8%' },
  { rank: 3, name: 'BlockchainPro', tokens: 11250, change: '+3.2%' },
  { rank: 4, name: 'You', tokens: 2847, change: '+4.7%' },
  { rank: 5, name: 'CryptoNinja', tokens: 2650, change: '+2.1%' },
]

const tierBenefits = [
  {
    tier: 'Bronze',
    minTokens: 0,
    maxTokens: 999,
    benefits: ['Basic loan access', '1.0x multiplier', 'Standard support'],
    color: 'text-amber-600',
    bgColor: 'bg-amber-50'
  },
  {
    tier: 'Silver',
    minTokens: 1000,
    maxTokens: 2999,
    benefits: ['Priority loan processing', '1.2x multiplier', 'Email support'],
    color: 'text-gray-600',
    bgColor: 'bg-gray-50'
  },
  {
    tier: 'Gold',
    minTokens: 3000,
    maxTokens: 9999,
    benefits: ['Premium loan rates', '1.5x multiplier', 'Priority support', 'Exclusive offers'],
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-50'
  },
  {
    tier: 'Platinum',
    minTokens: 10000,
    maxTokens: Infinity,
    benefits: ['VIP loan terms', '2.0x multiplier', 'Dedicated support', 'Beta features', 'Governance voting'],
    color: 'text-purple-600',
    bgColor: 'bg-purple-50'
  }
]

export default function ReputationPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'achievements' | 'leaderboard'>('overview')
  const { trackEvent } = useAnalytics()
  const { user } = useAuth()

  const currentTokens = 2847
  const currentTier = tierBenefits.find(tier => 
    currentTokens >= tier.minTokens && currentTokens <= tier.maxTokens
  ) || tierBenefits[0]
  const nextTier = tierBenefits.find(tier => tier.minTokens > currentTokens)

  useEffect(() => {
    trackEvent('reputation_page_view', { user_id: user?.id, tab: activeTab })
  }, [trackEvent, user, activeTab])

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return 'text-purple-600 bg-purple-100'
      case 'epic': return 'text-blue-600 bg-blue-100'
      case 'rare': return 'text-green-600 bg-green-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

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
              <h1 className="text-3xl font-bold text-gray-900">Reputation System</h1>
              <p className="text-gray-600 mt-1">
                Build your reputation and earn rewards for responsible borrowing
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-600">Current Tier</p>
                <p className={`text-lg font-bold ${currentTier.color}`}>{currentTier.tier}</p>
              </div>
              <div className={`w-12 h-12 ${currentTier.bgColor} rounded-lg flex items-center justify-center`}>
                <Medal className={`w-6 h-6 ${currentTier.color}`} />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Token Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Coins className="w-6 h-6 text-yellow-600" />
                <h3 className="text-lg font-semibold text-gray-900">Total Tokens</h3>
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">{currentTokens.toLocaleString()}</div>
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4 text-green-500" />
              <span className="text-sm text-green-600">+127 this month</span>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Target className="w-6 h-6 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-900">Next Tier</h3>
              </div>
            </div>
            <div className="text-lg font-bold text-gray-900 mb-2">
              {nextTier ? nextTier.tier : 'Max Tier Reached'}
            </div>
            {nextTier && (
              <>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${(currentTokens / nextTier.minTokens) * 100}%` }}
                  />
                </div>
                <div className="text-sm text-gray-600">
                  {(nextTier.minTokens - currentTokens).toLocaleString()} RST to go
                </div>
              </>
            )}
          </div>

          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Award className="w-6 h-6 text-purple-600" />
                <h3 className="text-lg font-semibold text-gray-900">Multiplier</h3>
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">1.2x</div>
            <div className="text-sm text-gray-600">Current earning rate</div>
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="border-b border-gray-200"
        >
          <nav className="-mb-px flex space-x-8">
            {[
              { key: 'overview', label: 'Overview' },
              { key: 'achievements', label: 'Achievements' },
              { key: 'leaderboard', label: 'Leaderboard' },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.key
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </motion.div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Token History Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="card"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Token History</h2>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={tokenHistory}>
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
                    <Line
                      type="monotone"
                      dataKey="earned"
                      stroke="#10b981"
                      strokeWidth={3}
                      name="Earned"
                    />
                    <Line
                      type="monotone"
                      dataKey="balance"
                      stroke="#0ea5e9"
                      strokeWidth={3}
                      name="Balance"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Recent Activities */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="card"
              >
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Activities</h2>
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <motion.div
                      key={activity.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                          <activity.icon className={`w-5 h-5 ${activity.color}`} />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{activity.description}</p>
                          <p className="text-xs text-gray-500">{activity.time}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-green-600">{activity.tokens}</p>
                        <p className="text-xs text-gray-500">{activity.multiplier}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Tier Benefits */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="card"
              >
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Tier Benefits</h2>
                <div className="space-y-4">
                  {tierBenefits.map((tier, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg border-2 ${
                        tier.tier === currentTier.tier
                          ? 'border-primary-300 bg-primary-50'
                          : 'border-gray-200 bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h3 className={`font-semibold ${tier.color}`}>{tier.tier}</h3>
                        <span className="text-sm text-gray-600">
                          {tier.minTokens.toLocaleString()}
                          {tier.maxTokens !== Infinity ? `- ${tier.maxTokens.toLocaleString()}` : '+'} RST
                        </span>
                      </div>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {tier.benefits.map((benefit, benefitIndex) => (
                          <li key={benefitIndex} className="flex items-center space-x-2">
                            <CheckCircle className="w-3 h-3 text-green-500" />
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        )}

        {/* Achievements Tab */}
        {activeTab === 'achievements' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="space-y-6"
          >
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`card ${achievement.earned ? 'border-green-200 bg-green-50' : 'border-gray-200'}`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                        achievement.earned ? 'bg-green-100' : 'bg-gray-100'
                      }`}>
                        <achievement.icon className={`w-6 h-6 ${
                          achievement.earned ? 'text-green-600' : 'text-gray-400'
                        }`} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{achievement.title}</h3>
                        <p className="text-sm text-gray-600">{achievement.description}</p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full font-medium ${getRarityColor(achievement.rarity)}`}>
                      {achievement.rarity}
                    </span>
                  </div>

                  {achievement.earned ? (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-green-600 font-medium">
                        Earned {achievement.date}
                      </span>
                      <span className="text-sm font-semibold text-green-600">
                        +{achievement.reward}
                      </span>
                    </div>
                  ) : (
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600">Progress</span>
                        <span className="text-sm font-medium text-gray-900">{achievement.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${achievement.progress}%` }}
                        />
                      </div>
                      <div className="text-right">
                        <span className="text-sm text-gray-600">Reward: {achievement.reward}</span>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Leaderboard Tab */}
        {activeTab === 'leaderboard' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="card"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Global Leaderboard</h2>
            <div className="space-y-4">
              {leaderboard.map((user, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className={`flex items-center justify-between p-4 rounded-lg ${
                    user.name === 'You' ? 'bg-primary-50 border border-primary-200' : 'bg-gray-50'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                      user.rank === 1 ? 'bg-yellow-100 text-yellow-800' :
                      user.rank === 2 ? 'bg-gray-100 text-gray-800' :
                      user.rank === 3 ? 'bg-amber-100 text-amber-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {user.rank}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{user.name}</p>
                      <p className="text-sm text-gray-600">{user.tokens.toLocaleString()} RST</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`text-sm font-medium ${
                      user.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {user.change}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </DashboardLayout>
  )
}