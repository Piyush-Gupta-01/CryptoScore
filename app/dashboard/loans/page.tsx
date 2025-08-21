'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  CreditCard, 
  Plus, 
  Filter, 
  Search,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  TrendingUp,
  DollarSign,
  Calendar,
  Shield,
  Zap,
  ExternalLink
} from 'lucide-react'
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { useAnalytics } from '@/hooks/useAnalytics'
import { useAuth } from '@/hooks/useAuth'

interface LoanOffer {
  id: string
  lender: string
  logo?: string
  amount: string
  apr: string
  term: string
  collateral: string
  status: 'available' | 'pending' | 'approved' | 'rejected'
  features: string[]
  riskLevel: 'low' | 'medium' | 'high'
  description: string
  maxAmount: string
  minCreditScore: number
  processingTime: string
}

interface ActiveLoan {
  id: string
  lender: string
  amount: string
  borrowed: string
  remaining: string
  apr: string
  nextPayment: string
  paymentAmount: string
  status: 'active' | 'overdue' | 'completed'
  startDate: string
  endDate: string
  progress: number
}

const loanOffers: LoanOffer[] = [
  {
    id: '1',
    lender: 'Aave Protocol',
    amount: '10,000 USDC',
    maxAmount: '50,000 USDC',
    apr: '8.5%',
    term: '12 months',
    collateral: '120%',
    status: 'available',
    features: ['Instant approval', 'Flexible repayment', 'No prepayment penalty'],
    riskLevel: 'low',
    description: 'Leading DeFi lending protocol with competitive rates',
    minCreditScore: 700,
    processingTime: 'Instant'
  },
  {
    id: '2',
    lender: 'Compound Finance',
    amount: '5,000 DAI',
    maxAmount: '25,000 DAI',
    apr: '7.2%',
    term: '6 months',
    collateral: '110%',
    status: 'available',
    features: ['Variable rate', 'Early repayment', 'Governance tokens'],
    riskLevel: 'low',
    description: 'Algorithmic money market protocol',
    minCreditScore: 650,
    processingTime: '< 1 hour'
  },
  {
    id: '3',
    lender: 'MakerDAO',
    amount: '15,000 USDC',
    maxAmount: '100,000 USDC',
    apr: '9.1%',
    term: '18 months',
    collateral: '130%',
    status: 'pending',
    features: ['Fixed rate', 'Governance tokens', 'Stability fee'],
    riskLevel: 'medium',
    description: 'Decentralized credit platform',
    minCreditScore: 720,
    processingTime: '2-4 hours'
  },
  {
    id: '4',
    lender: 'Cream Finance',
    amount: '8,000 USDT',
    maxAmount: '40,000 USDT',
    apr: '10.5%',
    term: '9 months',
    collateral: '140%',
    status: 'available',
    features: ['High yield', 'Multi-collateral', 'Flash loans'],
    riskLevel: 'high',
    description: 'Decentralized lending protocol',
    minCreditScore: 600,
    processingTime: '1-2 hours'
  },
  {
    id: '5',
    lender: 'Venus Protocol',
    amount: '12,000 BUSD',
    maxAmount: '60,000 BUSD',
    apr: '8.8%',
    term: '15 months',
    collateral: '125%',
    status: 'available',
    features: ['BSC network', 'Low fees', 'XVS rewards'],
    riskLevel: 'medium',
    description: 'Money market protocol on Binance Smart Chain',
    minCreditScore: 680,
    processingTime: '30 minutes'
  }
]

const activeLoans: ActiveLoan[] = [
  {
    id: '1',
    lender: 'Aave Protocol',
    amount: '5,000 USDC',
    borrowed: '5,000 USDC',
    remaining: '3,200 USDC',
    apr: '8.5%',
    nextPayment: '2024-01-15',
    paymentAmount: '445.50 USDC',
    status: 'active',
    startDate: '2023-07-15',
    endDate: '2024-07-15',
    progress: 36
  },
  {
    id: '2',
    lender: 'Compound Finance',
    amount: '2,500 DAI',
    borrowed: '2,500 DAI',
    remaining: '890 DAI',
    apr: '7.2%',
    nextPayment: '2024-01-20',
    paymentAmount: '298.75 DAI',
    status: 'active',
    startDate: '2023-08-20',
    endDate: '2024-02-20',
    progress: 78
  }
]

export default function LoansPage() {
  const [activeTab, setActiveTab] = useState<'available' | 'active' | 'history'>('available')
  const [searchTerm, setSearchTerm] = useState('')
  const [filterRisk, setFilterRisk] = useState<'all' | 'low' | 'medium' | 'high'>('all')
  const [sortBy, setSortBy] = useState<'apr' | 'amount' | 'term'>('apr')
  const { trackEvent } = useAnalytics()
  const { user } = useAuth()

  useEffect(() => {
    trackEvent('loans_page_view', { user_id: user?.id, tab: activeTab })
  }, [trackEvent, user, activeTab])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'approved':
        return 'bg-blue-100 text-blue-800'
      case 'rejected':
        return 'bg-red-100 text-red-800'
      case 'active':
        return 'bg-blue-100 text-blue-800'
      case 'overdue':
        return 'bg-red-100 text-red-800'
      case 'completed':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low':
        return 'text-green-600'
      case 'medium':
        return 'text-yellow-600'
      case 'high':
        return 'text-red-600'
      default:
        return 'text-gray-600'
    }
  }

  const getRiskIcon = (risk: string) => {
    switch (risk) {
      case 'low':
        return Shield
      case 'medium':
        return Clock
      case 'high':
        return Zap
      default:
        return Shield
    }
  }

  const filteredOffers = loanOffers.filter(offer => {
    const matchesSearch = offer.lender.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRisk = filterRisk === 'all' || offer.riskLevel === filterRisk
    return matchesSearch && matchesRisk
  })

  const handleApplyLoan = (offerId: string) => {
    trackEvent('loan_application_started', { offer_id: offerId })
    // In a real app, this would open a loan application modal or navigate to application page
    alert('Loan application feature would be implemented here')
  }

  const handleMakePayment = (loanId: string) => {
    trackEvent('loan_payment_initiated', { loan_id: loanId })
    // In a real app, this would open payment modal
    alert('Payment feature would be implemented here')
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
              <h1 className="text-3xl font-bold text-gray-900">Loans</h1>
              <p className="text-gray-600 mt-1">
                Manage your loans and explore new opportunities
              </p>
            </div>
            <button className="btn-primary flex items-center space-x-2">
              <Plus className="w-4 h-4" />
              <span>Request New Loan</span>
            </button>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6"
        >
          {[
            { title: 'Active Loans', value: '2', icon: CreditCard, color: 'text-blue-600' },
            { title: 'Total Borrowed', value: '$7,500', icon: DollarSign, color: 'text-green-600' },
            { title: 'Available Credit', value: '$45,000', icon: TrendingUp, color: 'text-purple-600' },
            { title: 'Next Payment', value: 'Jan 15', icon: Calendar, color: 'text-orange-600' },
          ].map((stat, index) => (
            <div key={index} className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </div>
          ))}
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
              { key: 'available', label: 'Available Loans', count: filteredOffers.length },
              { key: 'active', label: 'Active Loans', count: activeLoans.length },
              { key: 'history', label: 'Loan History', count: 5 },
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
                {tab.label} ({tab.count})
              </button>
            ))}
          </nav>
        </motion.div>

        {/* Available Loans Tab */}
        {activeTab === 'available' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="space-y-6"
          >
            {/* Filters */}
            <div className="card">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search lenders..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 input-field"
                    />
                  </div>
                </div>
                <select
                  value={filterRisk}
                  onChange={(e) => setFilterRisk(e.target.value as any)}
                  className="input-field"
                >
                  <option value="all">All Risk Levels</option>
                  <option value="low">Low Risk</option>
                  <option value="medium">Medium Risk</option>
                  <option value="high">High Risk</option>
                </select>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="input-field"
                >
                  <option value="apr">Sort by APR</option>
                  <option value="amount">Sort by Amount</option>
                  <option value="term">Sort by Term</option>
                </select>
              </div>
            </div>

            {/* Loan Offers */}
            <div className="grid gap-6">
              {filteredOffers.map((offer, index) => {
                const RiskIcon = getRiskIcon(offer.riskLevel)
                
                return (
                  <motion.div
                    key={offer.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="card hover:shadow-lg transition-shadow duration-300"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                          <span className="text-white font-bold text-lg">
                            {offer.lender.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{offer.lender}</h3>
                          <p className="text-sm text-gray-600">{offer.description}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <RiskIcon className={`w-3 h-3 ${getRiskColor(offer.riskLevel)}`} />
                            <span className={`text-xs ${getRiskColor(offer.riskLevel)}`}>
                              {offer.riskLevel.toUpperCase()} RISK
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-3 py-1 text-sm rounded-full font-medium ${getStatusColor(offer.status)}`}>
                          {offer.status.toUpperCase()}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-500">Amount</p>
                        <p className="font-semibold text-gray-900">{offer.amount}</p>
                        <p className="text-xs text-gray-500">Max: {offer.maxAmount}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">APR</p>
                        <p className="font-semibold text-gray-900">{offer.apr}</p>
                        <p className="text-xs text-gray-500">Fixed rate</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Term</p>
                        <p className="font-semibold text-gray-900">{offer.term}</p>
                        <p className="text-xs text-gray-500">Processing: {offer.processingTime}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Collateral</p>
                        <p className="font-semibold text-gray-900">{offer.collateral}</p>
                        <p className="text-xs text-gray-500">Min score: {offer.minCreditScore}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {offer.features.map((feature, featureIndex) => (
                        <span
                          key={featureIndex}
                          className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-600">
                        Your credit score qualifies for this loan
                      </div>
                      <button
                        onClick={() => handleApplyLoan(offer.id)}
                        disabled={offer.status === 'pending'}
                        className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                          offer.status === 'pending'
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'btn-primary'
                        }`}
                      >
                        {offer.status === 'pending' ? 'Application Pending' : 'Apply Now'}
                      </button>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        )}

        {/* Active Loans Tab */}
        {activeTab === 'active' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="space-y-6"
          >
            {activeLoans.map((loan, index) => (
              <motion.div
                key={loan.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-600 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-lg">
                        {loan.lender.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{loan.lender}</h3>
                      <p className="text-sm text-gray-600">
                        Started: {new Date(loan.startDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 text-sm rounded-full font-medium ${getStatusColor(loan.status)}`}>
                    {loan.status.toUpperCase()}
                  </span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div>
                    <p className="text-sm text-gray-500">Total Amount</p>
                    <p className="font-semibold text-gray-900">{loan.amount}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Remaining</p>
                    <p className="font-semibold text-gray-900">{loan.remaining}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">APR</p>
                    <p className="font-semibold text-gray-900">{loan.apr}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Next Payment</p>
                    <p className="font-semibold text-gray-900">{loan.paymentAmount}</p>
                    <p className="text-xs text-gray-500">Due: {new Date(loan.nextPayment).toLocaleDateString()}</p>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Repayment Progress</span>
                    <span className="text-sm font-medium text-gray-900">{loan.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${loan.progress}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600">
                    End Date: {new Date(loan.endDate).toLocaleDateString()}
                  </div>
                  <div className="flex space-x-3">
                    <button className="btn-secondary text-sm">
                      View Details
                    </button>
                    <button
                      onClick={() => handleMakePayment(loan.id)}
                      className="btn-primary text-sm"
                    >
                      Make Payment
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Loan History Tab */}
        {activeTab === 'history' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="card"
          >
            <div className="text-center py-12">
              <CreditCard className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Loan History</h3>
              <p className="text-gray-600 mb-6">
                Your completed loans will appear here once you finish repaying them.
              </p>
              <button
                onClick={() => setActiveTab('available')}
                className="btn-primary"
              >
                Explore Available Loans
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </DashboardLayout>
  )
}