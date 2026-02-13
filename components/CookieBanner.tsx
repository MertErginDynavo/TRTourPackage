'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent')
    if (!consent) {
      // Small delay to ensure DOM is ready
      setTimeout(() => setVisible(true), 100)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'true')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      left: '50%',
      transform: 'translateX(-50%)',
      maxWidth: '520px',
      width: '90%',
      background: '#ffffff',
      border: '1px solid #e2e8f0',
      borderRadius: '12px',
      padding: '16px 20px',
      boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
      zIndex: 1000
    }}>
      <p style={{
        fontSize: '14px',
        color: '#2d3748',
        marginBottom: '12px',
        lineHeight: '1.5',
        fontFamily: 'Inter, sans-serif',
        margin: '0 0 12px 0'
      }}>
        TRTourPackage uses only <strong>essential cookies</strong> required for the platform to function properly. No advertising or tracking cookies are used.
      </p>

      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Link 
          href="/agency/dashboard" 
          style={{
            fontSize: '13px',
            color: '#4299e1',
            textDecoration: 'none',
            fontFamily: 'Inter, sans-serif'
          }}
        >
          Learn more
        </Link>
        <button 
          onClick={handleAccept}
          style={{
            background: '#e53e3e',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            padding: '8px 16px',
            fontSize: '13px',
            cursor: 'pointer',
            fontWeight: '500',
            fontFamily: 'Inter, sans-serif'
          }}
        >
          Got it
        </button>
      </div>
    </div>
  )
}
