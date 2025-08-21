'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Shield, 
  Wallet, 
  BarChart3, 
  CheckCircle, 
  ArrowRight, 
  ArrowLeft,
  User,
  CreditCard,
  Zap
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { useWeb3 } from '@/components/providers/Web3Provider'
import { useAnalytics } from '@/hooks/useAnalytics'
import toast from 'react-hot-toast'

const steps = [
  {
    id: 1,
    title: 'Welcome to CryptoScore',
    description: 'Let\'s set up your blockchain credit profile',
    icon: Shield,
    color: 'text-blue-600'
  },
  {
    id: 2,
    title: 'Connect Your Wallet',
    description: 'Link your crypto wallet to start building your credit history',
    icon: Wallet,
    color: 'text-purple-600'
  },
  {
    id: 3,
    title: 'Verify Your Identity',
    description: 'Complete KYC verification for enhanced features',
    icon: User,
    color: 'text-green-600'
  },
  {
    id: 4,
    title: 'Set Your Preferences',
    description: 'Customize your lending and borrowing preferences',
    icon: CreditCard,
    color: 'text-orange-600'
  },
  {
    id: 5,
    title: 'You\'re All Set!',
    description: 'Your CryptoScore profile is ready',
    icon: CheckCircle,
    color: 'text-green-600'
  }
]

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [walletConnected, setWalletConnected] = useState(false)
  const [kycCompleted, setKycCompleted] = useState(false)
  const [preferences, setPreferences] = useState({
    riskTolerance: 'medium',
    preferredTokens: ['USDC', 'DAI'],
    notifications: true
  })

  const router = useRouter()
  const { user, updateProfile } = useAuth()
  const { connectWallet, account, isConnected } = useWeb3()
  const { trackEvent } = useAnalytics()

  const handleNext = async () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
      trackEvent('onboarding_step_completed', { step: currentStep })
    } else {
      // Complete onboarding
      await completeOnboarding()
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleWalletConnect = async () => {
    setIsLoading(true)
    try {
      await connectWallet()
      setWalletConnected(true)
      toast.success('Wallet connected successfully!')
      trackEvent('onboarding_wallet_connected')
    } catch (error) {
      toast.error('Failed to connect wallet')
    } finally {
      setIsLoading(false)
    }
  }

  const handleKYCVerification = async () => {
    setIsLoading(true)
    // Simulate KYC process
    await new Promise(resolve => setTimeout(resolve, 2000))
    setKycCompleted(true)
    toast.success('Identity verification completed!')
    trackEvent('onboarding_kyc_completed')
    setIsLoading(false)
  }

  const completeOnboarding = async () => {
    setIsLoading(true)
    try {
      await updateProfile({
        onboardingCompleted: true,
        preferences,
        walletAddress: account || undefined
      })
      
      toast.success('Welcome to CryptoScore! 🎉')
      trackEvent('onboarding_completed')
      router.push('/dashboard')
    } catch (error) {
      toast.error('Failed to complete onboarding')
    } finally {
      setIsLoading(false)
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Welcome to the Future of Credit Scoring
            </h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              CryptoScore uses AI and blockchain technology to create a transparent, 
              verifiable credit profile based on your on-chain activity.
            </p>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <BarChart3 className="w-6 h-6 text-blue-600" />
                </div>
                <p className="font-medium">AI-Powered</p>
                <p className="text-gray-500">Smart analysis</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <Shield className="w-6 h-6 text-purple-600" />
                </div>
                <p className="font-medium">Secure</p>
                <p className="text-gray-500">Blockchain verified</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <Zap className="w-6 h-6 text-green-600" />
                </div>
                <p className="font-medium">Fast</p>
                <p className="text-gray-500">Instant scoring</p>
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Wallet className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Connect Your Crypto Wallet
            </h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Connect your wallet to analyze your transaction history and DeFi activity. 
              Your data is processed securely and privately.
            </p>
            
            {isConnected || walletConnected ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <div className="flex items-center justify-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-green-800 font-medium">Wallet Connected</span>
                </div>
                <p className="text-green-600 text-sm mt-1">
                  {account?.slice(0, 6)}...{account?.slice(-4)}
                </p>
              </div>
            ) : (
              <button
                onClick={handleWalletConnect}
                disabled={isLoading}
                className="btn-primary py-3 px-6 text-lg mb-6 disabled:opacity-50"
              >
                {isLoading ? 'Connecting...' : 'Connect Wallet'}
              </button>
            )}

            <div className="text-sm text-gray-500">
              <p>✓ Your private keys remain secure</p>
              <p>✓ We only read public transaction data</p>
              <p>✓ No access to your funds</p>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-green-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <User className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Verify Your Identity
            </h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Complete identity verification to unlock premium features and 
              access to institutional lending partners.
            </p>
            
            {kycCompleted ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <div className="flex items-center justify-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-green-800 font-medium">Identity Verified</span>
                </div>
              </div>
            ) : (
              <button
                onClick={handleKYCVerification}
                disabled={isLoading}
                className="btn-primary py-3 px-6 text-lg mb-6 disabled:opacity-50"
              >
                {isLoading ? 'Verifying...' : 'Start Verification'}
              </button>
            )}

            <div className="text-sm text-gray-500">
              <p>✓ Bank-grade security</p>
              <p>✓ GDPR compliant</p>
              <p>✓ Optional but recommended</p>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-orange-600 to-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <CreditCard className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Set Your Preferences
            </h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Customize your lending preferences to get personalized loan offers 
              that match your risk tolerance.
            </p>
            
            <div className="space-y-6 max-w-md mx-auto">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Risk Tolerance
                </label>
                <select
                  value={preferences.riskTolerance}
                  onChange={(e) => setPreferences({...preferences, riskTolerance: e.target.value})}
                  className="input-field"
                >
                  <option value="low">Conservative</option>
                  <option value="medium">Moderate</option>
                  <option value="high">Aggressive</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Tokens
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {['USDC', 'DAI', 'USDT', 'ETH'].map(token => (
                    <label key={token} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={preferences.preferredTokens.includes(token)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setPreferences({
                              ...preferences,
                              preferredTokens: [...preferences.preferredTokens, token]
                            })
                          } else {
                            setPreferences({
                              ...preferences,
                              preferredTokens: preferences.preferredTokens.filter(t => t !== token)
                            })
                          }
                        }}
                        className="rounded"
                      />
                      <span className="text-sm">{token}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={preferences.notifications}
                    onChange={(e) => setPreferences({...preferences, notifications: e.target.checked})}
                    className="rounded"
                  />
                  <span className="text-sm">Enable notifications for new loan offers</span>
                </label>
              </div>
            </div>
          </div>
        )

      case 5:
        return (
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-green-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              You're All Set! 🎉
            </h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Your CryptoScore profile is ready. Start exploring loan opportunities 
              and building your blockchain credit history.
            </p>
            
            <div className="grid grid-cols-2 gap-4 max-w-md mx-auto mb-8">
              <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-2xl font-bold text-blue-600">650</p>
                <p className="text-sm text-gray-600">Starting Credit Score</p>
              </div>
              <div className="bg-green-50 rounded-lg p-4">
                <p className="text-2xl font-bold text-green-600">100</p>
                <p className="text-sm text-gray-600">Welcome Bonus RST</p>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  const canProceed = () => {
    switch (currentStep) {
      case 2:
        return isConnected || walletConnected
      case 3:
        return true // KYC is optional
      case 4:
        return preferences.preferredTokens.length > 0
      default:
        return true
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Step {currentStep} of {steps.length}</span>
            <span className="text-sm text-gray-600">{Math.round((currentStep / steps.length) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div
              className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${(currentStep / steps.length) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Step Content */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.5 }}
          className="card min-h-[500px] flex flex-col justify-center"
        >
          {renderStepContent()}
        </motion.div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          <button
            onClick={handleNext}
            disabled={!canProceed() || isLoading}
            className="btn-primary flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span>
              {currentStep === steps.length ? 'Get Started' : 'Next'}
            </span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}