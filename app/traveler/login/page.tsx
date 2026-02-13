'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Plane } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import LanguageSelector from '@/components/LanguageSelector'

export default function TravelerLogin() {
  const router = useRouter()
  const { t } = useLanguage()
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    
    const data = {
      email: formData.get('email'),
      password: formData.get('password'),
    }

    const res = await fetch('/api/traveler/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })

    if (res.ok) {
      const result = await res.json()
      localStorage.setItem('travelerId', result.travelerId)
      router.push('/traveler/dashboard')
    } else {
      setError('Invalid email or password')
    }
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', background: '#f8f9fa' }}>
      <div style={{ maxWidth: '450px', width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
            <LanguageSelector />
          </div>
          <Link href="/" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '12px' }}>
            <Plane size={48} color="#e53e3e" strokeWidth={2} />
            <span style={{ 
              fontSize: '24px', 
              fontWeight: '600', 
              color: '#1a202c',
              letterSpacing: '-0.02em',
              fontFamily: 'Manrope, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
            }}>TRTourPackage</span>
          </Link>
          <h1 style={{ fontSize: '28px', marginTop: '20px', marginBottom: '8px', color: '#2d3748', fontFamily: 'Manrope, sans-serif' }}>{t.loginTitle}</h1>
          <p style={{ color: '#718096', fontFamily: 'Inter, sans-serif' }}>{t.loginSubtitle}</p>
        </div>

        <form onSubmit={handleSubmit} style={{ background: 'white', padding: '32px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
          {error && (
            <div style={{ padding: '12px', background: '#f8d7da', color: '#721c24', borderRadius: '6px', marginBottom: '20px' }}>
              {error}
            </div>
          )}

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
              {t.email}
            </label>
            <input 
              type="email" 
              name="email" 
              required 
              style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '6px', fontSize: '16px' }}
            />
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
              {t.password}
            </label>
            <input 
              type="password" 
              name="password" 
              required 
              style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '6px', fontSize: '16px' }}
            />
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
            {t.loginButton}
          </button>

          <div style={{ marginTop: '16px', padding: '12px', background: '#f7fafc', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
            <p style={{ fontSize: '13px', color: '#718096', margin: 0, lineHeight: '1.6', fontFamily: 'Inter, sans-serif' }}>
              By logging in, you accept our <Link href="/privacy" style={{ color: '#4299e1', textDecoration: 'underline' }}>{t.kvkkPrivacyNotice}</Link>, <Link href="/privacy" style={{ color: '#4299e1', textDecoration: 'underline' }}>{t.privacyPolicyLink}</Link> {t.and} <Link href="/terms" style={{ color: '#4299e1', textDecoration: 'underline' }}>{t.termsOfServiceLink}</Link>.
            </p>
          </div>

          <p style={{ textAlign: 'center', color: '#718096', fontSize: '14px', marginTop: '20px' }}>
            {t.noAccount} <Link href="/traveler/register" style={{ color: '#e53e3e', textDecoration: 'none' }}>{t.signUp}</Link>
          </p>
        </form>
      </div>
    </div>
  )
}
