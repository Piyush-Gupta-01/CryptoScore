'use client'

import { motion } from 'framer-motion'
import { CreditCard, ExternalLink, Clock, Shield, Zap } from 'lucide-react'

interface LoanOffer {
  id: string
  lender: string
  logo?: string
  amount: string
  apr: string
  term: string
  collateral: string
  status: 'available' | 'pending' | 'approved'
  features: string[]
  riskLevel: 'low' | 'medium' | 'high'
}

interface LoanOpportunitiesProps {
  offers?: LoanOffer[]
}

const defaultOffers: LoanOffer[] = [
  {
    id: '1',
    lender: 'Aave Protocol',
    amount: '10,000 USDC',
    apr: '8.5%',
    term: '12 months',
    collateral: '120%',
    status: 'available',
    features: ['Instant approval', 'Flexible repayment'],
    riskLevel: 'low'
  },
  {
    id: '2',
    lender: 'Compound Finance',
    amount: '5,000 DAI',
    apr: '7.2%',
    term: '6 months',
    collateral: '110%',
    status: 'available',
    features: ['Variable rate', 'Early repayment'],
    riskLevel: 'low'
  },
  {
    id: '3',
    lender: 'MakerDAO',
    amount: '15,000 USDC',
    apr: '9.1%',
    term: '18 months',
    collateral: '130%',
    status: 'pending',
    features: ['Fixed rate', 'Governance tokens'],
    riskLevel: 'medium'
  },
  {
    id: '4',
    lender: 'Cream Finance',
    amount: '8,000 USDT',
    apr: '10.5%',
    term: '9 months',
    collateral: '140%',
    status: 'available',
    features: ['High yield', 'Multi-collateral'],
    riskLevel: 'high'
  }
]

export function LoanOpportunities({ offers = defaultOffers }: LoanOpportunitiesProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'approved':
        return 'bg-blue-100 text-blue-800'
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="card"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <CreditCard className="w-6 h-6 text-primary-600" />
          <h3 className="text-lg font-semibold text-gray-900">Loan Opportunities</h3>
        </div>
        <button className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center space-x-1">
          <span>View All</span>
          <ExternalLink className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-4">
        {offers.slice(0, 3).map((offer, index) => {
          const RiskIcon = getRiskIcon(offer.riskLevel)
          
          return (
            <motion.div
              key={offer.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="border border-gray-200 rounded-lg p-4 hover:border-primary-300 hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">
                      {offer.lender.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{offer.lender}</h4>
                    <div className="flex items-center space-x-2">
                      <RiskIcon className={`w-3 h-3 ${getRiskColor(offer.riskLevel)}`} />
                      <span className={`text-xs ${getRiskColor(offer.riskLevel)}`}>
                        {offer.riskLevel.toUpperCase()} RISK
                      </span>
                    </div>
                  </div>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full font-medium ${getStatusColor(offer.status)}`}>
                  {offer.status.toUpperCase()}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-3 text-sm">
                <div>
                  <p className="text-gray-500">Amount</p>
                  <p className="font-semibold text-gray-900">{offer.amount}</p>
                </div>
                <div>
                  <p className="text-gray-500">APR</p>
                  <p className="font-semibold text-gray-900">{offer.apr}</p>
                </div>
                <div>
                  <p className="text-gray-500">Term</p>
                  <p className="font-semibold text-gray-900">{offer.term}</p>
                </div>
                <div>
                  <p className="text-gray-500">Collateral</p>
                  <p className="font-semibold text-gray-900">{offer.collateral}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-1 mb-3">
                {offer.features.map((feature, featureIndex) => (
                  <span
                    key={featureIndex}
                    className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full"
                  >
                    {feature}
                  </span>
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={offer.status === 'pending'}
                className={`w-full py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                  offer.status === 'pending'
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'btn-primary'
                }`}
              >
                {offer.status === 'pending' ? 'Application Pending' : 'Apply Now'}
              </motion.button>
            </motion.div>
          )
        })}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">
            Based on your credit score of 780
          </span>
          <span className="text-primary-600 font-medium">
            {offers.filter(o => o.status === 'available').length} available
          </span>
        </div>
      </div>
    </motion.div>
  )
}