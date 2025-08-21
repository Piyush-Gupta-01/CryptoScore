'use client'

import { motion } from 'framer-motion'
import { Coins, TrendingUp, Gift, Zap } from 'lucide-react'

interface ReputationTokensProps {
  tokens: number
  earned: number
  multiplier: number
}

export function ReputationTokens({ 
  tokens = 2847, 
  earned = 127, 
  multiplier = 1.2 
}: ReputationTokensProps) {
  const activities = [
    {
      action: 'Loan Repayment',
      tokens: '+50 RST',
      time: '2 hours ago',
      icon: Coins,
      color: 'text-green-600'
    },
    {
      action: 'DeFi Interaction',
      tokens: '+25 RST',
      time: '1 day ago',
      icon: Zap,
      color: 'text-blue-600'
    },
    {
      action: 'Referral Bonus',
      tokens: '+100 RST',
      time: '3 days ago',
      icon: Gift,
      color: 'text-purple-600'
    }
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="card"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Coins className="w-6 h-6 text-yellow-600" />
          <h3 className="text-lg font-semibold text-gray-900">Reputation Tokens</h3>
        </div>
        <div className="flex items-center space-x-1 text-sm text-green-600">
          <TrendingUp className="w-4 h-4" />
          <span>+{earned} this month</span>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex items-baseline space-x-2 mb-2">
          <span className="text-3xl font-bold text-gray-900">{tokens.toLocaleString()}</span>
          <span className="text-sm text-gray-500">RST</span>
        </div>
        
        <div className="flex items-center space-x-2 mb-4">
          <div className="flex items-center space-x-1 text-sm">
            <span className="text-gray-600">Multiplier:</span>
            <span className="font-semibold text-primary-600">{multiplier}x</span>
          </div>
          <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
          <div className="text-sm text-gray-600">
            Next tier at 3,000 RST
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
          <div 
            className="bg-gradient-to-r from-yellow-400 to-yellow-600 h-2 rounded-full transition-all duration-500"
            style={{ width: `${(tokens / 3000) * 100}%` }}
          ></div>
        </div>
        <div className="flex justify-between text-xs text-gray-500">
          <span>Current: {tokens}</span>
          <span>Next: 3,000</span>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium text-gray-900 mb-3">Recent Activity</h4>
        <div className="space-y-3">
          {activities.map((activity, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex items-center justify-between"
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                  <activity.icon className={`w-4 h-4 ${activity.color}`} />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
              <span className="text-sm font-semibold text-green-600">
                {activity.tokens}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-gray-900">94.7%</p>
            <p className="text-xs text-gray-600">Reliability Score</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">12</p>
            <p className="text-xs text-gray-600">Months Active</p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}