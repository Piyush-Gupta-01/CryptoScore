'use client'

import { motion } from 'framer-motion'
import { Activity, ArrowUpRight, ArrowDownLeft, ExternalLink, Filter } from 'lucide-react'
import { useState } from 'react'

interface Transaction {
  id: string
  type: 'loan_repayment' | 'defi_interaction' | 'token_transfer' | 'collateral_deposit'
  description: string
  amount: string
  token: string
  timestamp: string
  status: 'completed' | 'pending' | 'failed'
  hash?: string
  impact: 'positive' | 'negative' | 'neutral'
}

interface TransactionHistoryProps {
  transactions?: Transaction[]
}

const defaultTransactions: Transaction[] = [
  {
    id: '1',
    type: 'loan_repayment',
    description: 'Loan repayment to Aave Protocol',
    amount: '1,000',
    token: 'USDC',
    timestamp: '2 hours ago',
    status: 'completed',
    hash: '0x1234...5678',
    impact: 'positive'
  },
  {
    id: '2',
    type: 'defi_interaction',
    description: 'Liquidity provision to Uniswap V3',
    amount: '2,500',
    token: 'ETH',
    timestamp: '1 day ago',
    status: 'completed',
    hash: '0x2345...6789',
    impact: 'positive'
  },
  {
    id: '3',
    type: 'collateral_deposit',
    description: 'Collateral deposit for loan',
    amount: '5,000',
    token: 'USDT',
    timestamp: '2 days ago',
    status: 'completed',
    hash: '0x3456...7890',
    impact: 'neutral'
  },
  {
    id: '4',
    type: 'token_transfer',
    description: 'Token transfer to external wallet',
    amount: '500',
    token: 'DAI',
    timestamp: '3 days ago',
    status: 'completed',
    hash: '0x4567...8901',
    impact: 'neutral'
  },
  {
    id: '5',
    type: 'defi_interaction',
    description: 'Yield farming on Compound',
    amount: '1,200',
    token: 'COMP',
    timestamp: '5 days ago',
    status: 'completed',
    hash: '0x5678...9012',
    impact: 'positive'
  }
]

export function TransactionHistory({ transactions = defaultTransactions }: TransactionHistoryProps) {
  const [filter, setFilter] = useState<'all' | 'positive' | 'neutral'>('all')
  const [showAll, setShowAll] = useState(false)

  const getTransactionIcon = (type: string, impact: string) => {
    if (impact === 'positive') {
      return <ArrowUpRight className="w-4 h-4 text-green-600" />
    } else if (impact === 'negative') {
      return <ArrowDownLeft className="w-4 h-4 text-red-600" />
    }
    return <Activity className="w-4 h-4 text-gray-600" />
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'failed':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'positive':
        return 'text-green-600'
      case 'negative':
        return 'text-red-600'
      default:
        return 'text-gray-600'
    }
  }

  const filteredTransactions = transactions.filter(tx => {
    if (filter === 'all') return true
    return tx.impact === filter
  })

  const displayedTransactions = showAll ? filteredTransactions : filteredTransactions.slice(0, 5)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="card"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Activity className="w-6 h-6 text-primary-600" />
          <h3 className="text-lg font-semibold text-gray-900">Transaction History</h3>
        </div>
        <div className="flex items-center space-x-2">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as any)}
            className="text-sm border border-gray-300 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="all">All Transactions</option>
            <option value="positive">Credit Positive</option>
            <option value="neutral">Neutral</option>
          </select>
          <Filter className="w-4 h-4 text-gray-400" />
        </div>
      </div>

      <div className="space-y-3">
        {displayedTransactions.map((transaction, index) => (
          <motion.div
            key={transaction.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                {getTransactionIcon(transaction.type, transaction.impact)}
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <p className="text-sm font-medium text-gray-900">
                    {transaction.description}
                  </p>
                  <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(transaction.status)}`}>
                    {transaction.status}
                  </span>
                </div>
                <div className="flex items-center space-x-2 mt-1">
                  <p className="text-xs text-gray-500">{transaction.timestamp}</p>
                  {transaction.hash && (
                    <>
                      <span className="text-xs text-gray-300">•</span>
                      <button className="text-xs text-primary-600 hover:text-primary-700 flex items-center space-x-1">
                        <span>{transaction.hash}</span>
                        <ExternalLink className="w-3 h-3" />
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className={`text-sm font-semibold ${getImpactColor(transaction.impact)}`}>
                {transaction.impact === 'positive' ? '+' : transaction.impact === 'negative' ? '-' : ''}
                {transaction.amount} {transaction.token}
              </p>
              <div className="flex items-center justify-end mt-1">
                <span className={`text-xs ${getImpactColor(transaction.impact)}`}>
                  {transaction.impact === 'positive' ? 'Credit +' : 
                   transaction.impact === 'negative' ? 'Credit -' : 'Neutral'}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredTransactions.length > 5 && (
        <div className="mt-4 text-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="text-primary-600 hover:text-primary-700 text-sm font-medium"
          >
            {showAll ? 'Show Less' : `Show All ${filteredTransactions.length} Transactions`}
          </button>
        </div>
      )}

      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="grid grid-cols-3 gap-4 text-center text-sm">
          <div>
            <p className="text-2xl font-bold text-green-600">
              {transactions.filter(t => t.impact === 'positive').length}
            </p>
            <p className="text-gray-600">Credit Positive</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-600">
              {transactions.filter(t => t.impact === 'neutral').length}
            </p>
            <p className="text-gray-600">Neutral</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-red-600">
              {transactions.filter(t => t.impact === 'negative').length}
            </p>
            <p className="text-gray-600">Credit Negative</p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}