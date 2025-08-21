'use client'

import { useState, useEffect, createContext, useContext, ReactNode } from 'react'
import { useWeb3 } from '@/components/providers/Web3Provider'
import { useAnalytics } from './useAnalytics'

interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  walletAddress?: string
  creditScore?: number
  reputationTokens?: number
  createdAt: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  register: (userData: RegisterData) => Promise<void>
  logout: () => Promise<void>
  connectWallet: () => Promise<void>
  updateProfile: (data: Partial<User>) => Promise<void>
}

interface RegisterData {
  firstName: string
  lastName: string
  email: string
  password: string
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { connectWallet: connectWeb3Wallet, account, isConnected } = useWeb3()
  const { identifyUser, trackEvent } = useAnalytics()

  useEffect(() => {
    checkAuthStatus()
  }, [])

  useEffect(() => {
    if (user && account && !user.walletAddress) {
      // Update user with wallet address
      updateProfile({ walletAddress: account })
    }
  }, [account, user])

  const checkAuthStatus = async () => {
    try {
      // Check if user is stored in localStorage (for demo purposes)
      const storedUser = localStorage.getItem('cryptoscore_user')
      if (storedUser) {
        const userData = JSON.parse(storedUser)
        setUser(userData)
        identifyUser(userData.id, {
          email: userData.email,
          firstName: userData.firstName,
          lastName: userData.lastName,
        })
      }
    } catch (error) {
      console.error('Error checking auth status:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    
    try {
      // Simulate API call - in real app, this would be an actual API request
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Mock user data - in real app, this would come from your backend
      const userData: User = {
        id: 'user_' + Date.now(),
        firstName: 'John',
        lastName: 'Doe',
        email: email,
        creditScore: 780,
        reputationTokens: 2847,
        createdAt: new Date().toISOString(),
      }

      setUser(userData)
      localStorage.setItem('cryptoscore_user', JSON.stringify(userData))
      
      identifyUser(userData.id, {
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
      })

      trackEvent('user_login', { method: 'email' })
    } catch (error) {
      throw new Error('Invalid credentials')
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (userData: RegisterData) => {
    setIsLoading(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      const newUser: User = {
        id: 'user_' + Date.now(),
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        creditScore: 650, // Starting score
        reputationTokens: 100, // Welcome bonus
        createdAt: new Date().toISOString(),
      }

      setUser(newUser)
      localStorage.setItem('cryptoscore_user', JSON.stringify(newUser))
      
      identifyUser(newUser.id, {
        email: newUser.email,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
      })

      trackEvent('user_register', { method: 'email' })
    } catch (error) {
      throw new Error('Registration failed')
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    setUser(null)
    localStorage.removeItem('cryptoscore_user')
    trackEvent('user_logout')
  }

  const connectWallet = async () => {
    try {
      await connectWeb3Wallet()
      
      if (!user && account) {
        // Create user from wallet connection
        const walletUser: User = {
          id: 'wallet_' + account.slice(-8),
          firstName: 'Wallet',
          lastName: 'User',
          email: '',
          walletAddress: account,
          creditScore: 650,
          reputationTokens: 100,
          createdAt: new Date().toISOString(),
        }
        
        setUser(walletUser)
        localStorage.setItem('cryptoscore_user', JSON.stringify(walletUser))
        
        identifyUser(walletUser.id, {
          walletAddress: account,
        })
      }
      
      trackEvent('wallet_connected', { address: account })
    } catch (error) {
      throw new Error('Failed to connect wallet')
    }
  }

  const updateProfile = async (data: Partial<User>) => {
    if (!user) return

    const updatedUser = { ...user, ...data }
    setUser(updatedUser)
    localStorage.setItem('cryptoscore_user', JSON.stringify(updatedUser))
    
    trackEvent('profile_updated', { fields: Object.keys(data) })
  }

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    connectWallet,
    updateProfile,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}