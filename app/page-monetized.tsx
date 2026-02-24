'use client'

import { useState, useEffect } from 'react'
import { AdSenseDisplay } from 'monetization-components'
import { EmailCapturePopup, EmailCaptureInline } from 'monetization-components'
import { PremiumUpgradeBanner, FeatureLimitWarning } from 'monetization-components'
import { useUsageTracking } from 'monetization-components'
import PasswordGenerator from './page'

export default function MonetizedPasswordGenerator() {
  const { trackEvent, checkLimit, getUsageCount } = useUsageTracking('password-generator', 20)
  const [showEmailCapture, setShowEmailCapture] = useState(false)
  const [limitReached, setLimitReached] = useState(false)
  
  useEffect(() => {
    // Show email capture after 45 seconds
    const timer = setTimeout(() => setShowEmailCapture(true), 45000)
    return () => clearTimeout(timer)
  }, [])
  
  // Track page view
  useEffect(() => {
    trackEvent('page_view')
  }, [])
  
  // Check usage limit
  useEffect(() => {
    const count = getUsageCount()
    if (count >= 20) {
      setLimitReached(true)
    }
  }, [getUsageCount])
  
  return (
    <div className="min-h-screen">
      {/* Top Ad - High-value placement */}
      <div className="max-w-4xl mx-auto px-4 py-2">
        <AdSenseDisplay 
          client="ca-pub-XXXXXXXXXX"
          slot="1234567890"
          format="horizontal"
          style={{ minHeight: '90px' }}
        />
      </div>
      
      {/* Premium Banner for Password Manager Affiliate */}
      <div className="max-w-4xl mx-auto px-4">
        <PremiumUpgradeBanner
          title="Tired of Managing Passwords?"
          features={[
            'Store unlimited passwords securely',
            'Auto-generate strong passwords',
            'Sync across all devices',
            'Two-factor authentication'
          ]}
          ctaText="Try 1Password Free"
          ctaLink="https://1password.com/affiliate-link"
          affiliate={true}
        />
      </div>
      
      {/* Usage Limit Warning */}
      {limitReached && (
        <div className="max-w-4xl mx-auto px-4 py-4">
          <FeatureLimitWarning
            message="You've reached the free usage limit (20 passwords)"
            upgradeText="Get unlimited access"
            upgradeLink="/premium"
          />
        </div>
      )}
      
      {/* Original Password Generator */}
      <PasswordGenerator />
      
      {/* Inline Email Capture */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <EmailCaptureInline
          title="Get Weekly Security Tips"
          description="Learn how to protect your accounts and stay safe online"
          buttonText="Subscribe Free"
          onSubmit={(email) => {
            console.log('Email captured:', email)
            trackEvent('email_captured')
          }}
        />
      </div>
      
      {/* Bottom Ad */}
      <div className="max-w-4xl mx-auto px-4 py-4">
        <AdSenseDisplay 
          client="ca-pub-XXXXXXXXXX"
          slot="0987654321"
          format="rectangle"
          style={{ minHeight: '250px' }}
        />
      </div>
      
      {/* Popup Email Capture */}
      {showEmailCapture && (
        <EmailCapturePopup
          title="Never Forget a Password Again"
          description="Get our free guide: '10 Password Security Tips Everyone Should Know'"
          incentive="Free Security Guide"
          onSubmit={(email) => {
            console.log('Email captured:', email)
            trackEvent('email_captured_popup')
            setShowEmailCapture(false)
          }}
          onClose={() => setShowEmailCapture(false)}
        />
      )}
    </div>
  )
}