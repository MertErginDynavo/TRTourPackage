'use client'

import React from 'react'
import { useState } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [userType, setUserType] = useState<'traveler' | 'agency'>('traveler')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')
    setError('')

    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, userType })
      })

      const data = await response.json()

      if (response.ok) {
        setMessage(data.message)
        setEmail('')
      } else {
        setError(data.error || 'Failed to send reset email')
      }
    } catch (error) {
      console.error('Forgot password error:', error)
      setError('Failed to send reset email')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f8f9fa' }}>
      <Navbar />
      
      <div style={{ padding: '60px 20px' }}>
        <div className="container" style={{ maxWidth: '500px' }}>
          <h1 style={{ fontSize: '36px', marginBottom: '10px', fontFamily: 'Manrope, sans-serif', textAlign: 'center' }}>
            Forgot Password
          </h1>
          <p style={{ color: '#718096', marginBottom: '40px', fontFamily: 'Inter, sans-serif', textAlign: 'center' }}>
            Enter your email address and we'll send you a link to reset your password.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="card">
              {message && (
                <div style={{ 
                  padding: '12px', 
                  background: '#d4edda', 
                  color: '#155724', 
                  borderRadius: '6px', 
                  marginBottom: '20px',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '14px'
                }}>
                  {message}
                </div>
              )}

              {error && (
                <div style={{ 
                  padding: '12px', 
                  background: '#f8d7da', 
                  color: '#721c24', 
                  borderRadius: '6px', 
                  marginBottom: '20px',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '14px'
                }}>
                  {error}
                </div>
              )}

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontFamily: 'Manrope, sans-serif' }}>
                  Account Type
                </label>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button
                    type="button"
                    onClick={() => setUserType('traveler')}
                    style={{
                      flex: 1,
                      padding: '12px',
                      border: userType === 'traveler' ? '2px solid #e53e3e' : '1px solid #e2e8f0',
                      background: userType === 'traveler' ? '#fff5f5' : 'white',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: userType === 'traveler' ? '600' : '400'
                    }}
                  >
                    Traveler
                  </button>
                  <button
                    type="button"
                    onClick={() => setUserType('agency')}
                    style={{
                      flex: 1,
                      padding: '12px',
                      border: userType === 'agency' ? '2px solid #e53e3e' : '1px solid #e2e8f0',
                      background: userType === 'agency' ? '#fff5f5' : 'white',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: userType === 'agency' ? '600' : '400'
                    }}
                  >
                    Agency
                  </button>
                </div>
              </div>

              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontFamily: 'Manrope, sans-serif' }}>
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #e2e8f0',
                    borderRadius: '6px',
                    fontSize: '14px',
                    fontFamily: 'Inter, sans-serif'
                  }}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary"
                style={{ width: '100%', marginBottom: '16px' }}
              >
                {loading ? 'Sending...' : 'Send Reset Link'}
              </button>

              <div style={{ textAlign: 'center', fontSize: '14px', fontFamily: 'Inter, sans-serif' }}>
                <Link href="/traveler/login" style={{ color: '#4299e1', textDecoration: 'none' }}>
                  Back to Login
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
