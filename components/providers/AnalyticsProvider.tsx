'use client'

import { createContext, useContext, ReactNode } from 'react'

interface AnalyticsContextType {
  trackEvent: (eventName: string, properties?: Record<string, any>) => void
  trackPageView: (pageName: string, properties?: Record<string, any>) => void
  identifyUser: (userId: string, traits?: Record<string, any>) => void
}

const AnalyticsContext = createContext<AnalyticsContextType | undefined>(undefined)

interface AnalyticsProviderProps {
  children: ReactNode
}

export function AnalyticsProvider({ children }: AnalyticsProviderProps) {
  const trackEvent = (eventName: string, properties?: Record<string, any>) => {
    // In a real app, this would integrate with analytics services like:
    // - Google Analytics
    // - Mixpanel
    // - Amplitude
    // - PostHog
    
    if (typeof window !== 'undefined') {
      console.log('Analytics Event:', eventName, properties)
      
      // Example Google Analytics 4 integration:
      // if (window.gtag) {
      //   window.gtag('event', eventName, properties)
      // }
      
      // Example Mixpanel integration:
      // if (window.mixpanel) {
      //   window.mixpanel.track(eventName, properties)
      // }
      
      // Store events in localStorage for demo purposes
      const events = JSON.parse(localStorage.getItem('cryptoscore_events') || '[]')
      events.push({
        event: eventName,
        properties,
        timestamp: new Date().toISOString(),
      })
      localStorage.setItem('cryptoscore_events', JSON.stringify(events.slice(-100))) // Keep last 100 events
    }
  }

  const trackPageView = (pageName: string, properties?: Record<string, any>) => {
    trackEvent('page_view', {
      page_name: pageName,
      ...properties,
    })
  }

  const identifyUser = (userId: string, traits?: Record<string, any>) => {
    if (typeof window !== 'undefined') {
      console.log('Analytics Identify:', userId, traits)
      
      // Example integrations:
      // if (window.gtag) {
      //   window.gtag('config', 'GA_MEASUREMENT_ID', {
      //     user_id: userId
      //   })
      // }
      
      // if (window.mixpanel) {
      //   window.mixpanel.identify(userId)
      //   if (traits) {
      //     window.mixpanel.people.set(traits)
      //   }
      // }
      
      // Store user info for demo
      localStorage.setItem('cryptoscore_user_id', userId)
      if (traits) {
        localStorage.setItem('cryptoscore_user_traits', JSON.stringify(traits))
      }
    }
  }

  const value: AnalyticsContextType = {
    trackEvent,
    trackPageView,
    identifyUser,
  }

  return (
    <AnalyticsContext.Provider value={value}>
      {children}
    </AnalyticsContext.Provider>
  )
}

export function useAnalytics() {
  const context = useContext(AnalyticsContext)
  if (context === undefined) {
    throw new Error('useAnalytics must be used within an AnalyticsProvider')
  }
  return context
}