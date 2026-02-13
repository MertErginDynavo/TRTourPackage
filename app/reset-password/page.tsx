'use client'

import React from 'react'
import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Navbar from '@/components/Navbar'

export default function ResetPasswordPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [verifying, setVerifying] = useState(true)
  const [tokenValid, setTokenValid] = useState(false)
  const [userType, setUserType] = useState<'traveler' | 'agency'>('traveler')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    if (!token) {
      setError('Invalid reset link')
      setVerifying(false)
      return
    }

    // Verify token
    fetch(`/api/auth/reset-password?token=${token}`)
      .then(res => res.json())
      .then(data => {
        if (data.valid) {
          setTokenValid(true)
          setUserType(data.userType)
        } else {
          setError(data.error || 'Invalid or expired reset link')
        }
      })
      .catch(() => {
        setError('Failed to verify reset link')
      })
      .finally(() => {
        setVerifying(false)
      })
  }, [token])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    setLoading(true)

    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, newPassword })
      })

      const data = await response.json()

      if (response.ok) {
        setSuccess(true)
        setTimeout(() => {
          router.push(data.userType === 'traveler' ? '/traveler/login' : '/agency/login')
        }, 2000)
      } else {
        setError(data.error || 'Failed to reset password')
      }
    } catch (error) {
      console.error('Reset password error:', error)
      setError('Failed to reset password')
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
            Reset Password
          </h1>
          <p style={{ color: '#718096', marginBottom: '40px', fontFamily: 'Inter, sans-serif', textAlign: 'center' }}>
            Enter your new password below.
          </p>

          <div className="card">
            {verifying ? (
              <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                <p style={{ color: '#718096', fontFamily: 'Inter, sans-serif' }}>Verifying reset link...</p>
              </div>
            ) : !tokenValid ? (
              <div>
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
                <div style={{ textAlign: 'center' }}>
                  <Link href="/forgot-password" className="btn btn-primary">
                    Request New Reset Link
                  </Link>
                </div>
              </div>
            ) : success ? (
              <div>
                <div style={{ 
                  padding: '12px', 
                  background: '#d4edda', 
                  color: '#155724', 
                  borderRadius: '6px', 
                  marginBottom: '20px',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '14px'
                }}>
                  Password reset successful! Redirecting to login...
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
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
                    New Password
                  </label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password"
                    required
                    minLength={6}
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '1px solid #e2e8f0',
                      borderRadius: '6px',
                      fontSize: '14px',
                      fontFamily: 'Inter, sans-serif'
                    }}
                  />
                  <p style={{ fontSize: '12px', color: '#718096', marginTop: '4px', fontFamily: 'Inter, sans-serif' }}>
                    Minimum 6 characters
                  </p>
                </div>

                <div style={{ marginBottom: '24px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontFamily: 'Manrope, sans-serif' }}>
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm new password"
                    required
                    minLength={6}
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
                  {loading ? 'Resetting...' : 'Reset Password'}
                </button>

                <div style={{ textAlign: 'center', fontSize: '14px', fontFamily: 'Inter, sans-serif' }}>
                  <Link 
                    href={userType === 'traveler' ? '/traveler/login' : '/agency/login'} 
                    style={{ color: '#4299e1', textDecoration: 'none' }}
                  >
                    Back to Login
                  </Link>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
