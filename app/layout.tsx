import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'
import { Web3Provider } from '@/components/providers/Web3Provider'
import { AnalyticsProvider } from '@/components/providers/AnalyticsProvider'
import { AuthProvider } from '@/hooks/useAuth'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'CryptoScore - Blockchain Credit Scoring',
  description: 'Revolutionary blockchain-based credit scoring system for crypto lending with AI-powered risk assessment',
  keywords: 'crypto, blockchain, credit scoring, DeFi, lending, AI, Web3',
  authors: [{ name: 'CryptoScore Team' }],
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#0ea5e9',
  openGraph: {
    title: 'CryptoScore - Blockchain Credit Scoring',
    description: 'Revolutionary blockchain-based credit scoring system for crypto lending',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CryptoScore - Blockchain Credit Scoring',
    description: 'Revolutionary blockchain-based credit scoring system for crypto lending',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AnalyticsProvider>
          <Web3Provider>
            <AuthProvider>
              {children}
              <Toaster 
                position="top-right"
                toastOptions={{
                  duration: 4000,
                  style: {
                    background: '#363636',
                    color: '#fff',
                  },
                  success: {
                    duration: 3000,
                    iconTheme: {
                      primary: '#10b981',
                      secondary: '#fff',
                    },
                  },
                  error: {
                    duration: 5000,
                    iconTheme: {
                      primary: '#ef4444',
                      secondary: '#fff',
                    },
                  },
                }}
              />
            </AuthProvider>
          </Web3Provider>
        </AnalyticsProvider>
      </body>
    </html>
  )
}