'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Plane } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import LanguageSelector from '@/components/LanguageSelector'

export default function TravelerRegister() {
  const router = useRouter()
  const { t } = useLanguage()
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      password: formData.get('password'),
      country: formData.get('country'),
    }

    const res = await fetch('/api/traveler/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })

    if (res.ok) {
      router.push('/traveler/login')
    } else {
      const result = await res.json()
      setError(result.error || 'Registration failed')
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
          <h1 style={{ fontSize: '28px', marginTop: '20px', marginBottom: '8px', color: '#2d3748', fontFamily: 'Manrope, sans-serif' }}>{t.createAccount}</h1>
          <p style={{ color: '#718096', fontFamily: 'Inter, sans-serif', marginBottom: '16px' }}>{t.registerSubtitle}</p>
          
          {/* Trust Badges */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap', marginTop: '16px' }}>
            <span style={{ fontSize: '13px', color: '#48bb78', fontFamily: 'Inter, sans-serif' }}>
              {t.freeRegistration}
            </span>
            <span style={{ fontSize: '13px', color: '#48bb78', fontFamily: 'Inter, sans-serif' }}>
              {t.noHiddenFees}
            </span>
            <span style={{ fontSize: '13px', color: '#48bb78', fontFamily: 'Inter, sans-serif' }}>
              {t.directContactAgencies}
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit} style={{ background: 'white', padding: '32px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
          {error && (
            <div style={{ padding: '12px', background: '#f8d7da', color: '#721c24', borderRadius: '6px', marginBottom: '20px' }}>
              {error}
            </div>
          )}

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
              {t.fullName}
            </label>
            <input 
              type="text" 
              name="name" 
              required 
              style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '6px', fontSize: '16px' }}
            />
          </div>

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

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
              {t.password}
            </label>
            <input 
              type="password" 
              name="password" 
              minLength={6}
              required 
              style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '6px', fontSize: '16px' }}
            />
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
              {t.country}
            </label>
            <input 
              type="text" 
              name="country" 
              required 
              style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '6px', fontSize: '16px' }}
            />
          </div>

          {/* KVKK & Privacy Consent */}
          <div style={{ marginBottom: '20px', padding: '16px', background: '#f7fafc', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
            <div style={{ marginBottom: '12px' }}>
              <label style={{ display: 'flex', alignItems: 'start', gap: '8px', cursor: 'pointer', fontSize: '14px', fontFamily: 'Inter, sans-serif' }}>
                <input 
                  type="checkbox" 
                  name="kvkkConsent" 
                  required 
                  style={{ marginTop: '3px', width: '16px', height: '16px', flexShrink: 0 }}
                />
                <span style={{ color: '#2d3748', lineHeight: '1.5' }}>
                  {t.kvkkConsent} <Link href="/agency/dashboard" style={{ color: '#4299e1', textDecoration: 'underline' }}>{t.kvkkPrivacyNotice}</Link> {t.and} <Link href="/agency/dashboard" style={{ color: '#4299e1', textDecoration: 'underline' }}>{t.privacyPolicyLink}</Link>. <span style={{ color: '#e53e3e' }}>*</span>
                </span>
              </label>
            </div>

            <div style={{ marginBottom: '12px' }}>
              <label style={{ display: 'flex', alignItems: 'start', gap: '8px', cursor: 'pointer', fontSize: '14px', fontFamily: 'Inter, sans-serif' }}>
                <input 
                  type="checkbox" 
                  name="termsConsent" 
                  required 
                  style={{ marginTop: '3px', width: '16px', height: '16px', flexShrink: 0 }}
                />
                <span style={{ color: '#2d3748', lineHeight: '1.5' }}>
                  {t.termsConsent} <Link href="/terms" style={{ color: '#4299e1', textDecoration: 'underline' }}>{t.termsOfServiceLink}</Link>. <span style={{ color: '#e53e3e' }}>*</span>
                </span>
              </label>
            </div>

            <div style={{ marginBottom: '12px' }}>
              <label style={{ display: 'flex', alignItems: 'start', gap: '8px', cursor: 'pointer', fontSize: '14px', fontFamily: 'Inter, sans-serif' }}>
                <input 
                  type="checkbox" 
                  name="cookieConsent" 
                  style={{ marginTop: '3px', width: '16px', height: '16px', flexShrink: 0 }}
                />
                <span style={{ color: '#718096', lineHeight: '1.5' }}>
                  {t.cookieConsent} <Link href="/agency/dashboard" style={{ color: '#4299e1', textDecoration: 'underline' }}>{t.cookiePolicyLink}</Link>.
                </span>
              </label>
            </div>

            <div>
              <label style={{ display: 'flex', alignItems: 'start', gap: '8px', cursor: 'pointer', fontSize: '14px', fontFamily: 'Inter, sans-serif' }}>
                <input 
                  type="checkbox" 
                  name="marketingConsent" 
                  style={{ marginTop: '3px', width: '16px', height: '16px', flexShrink: 0 }}
                />
                <span style={{ color: '#718096', lineHeight: '1.5' }}>
                  {t.marketingConsent}
                </span>
              </label>
            </div>
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
            {t.signUpButton}
          </button>

          <p style={{ textAlign: 'center', color: '#718096', fontSize: '14px', marginTop: '20px' }}>
            {t.alreadyHaveAccount} <Link href="/traveler/login" style={{ color: '#e53e3e', textDecoration: 'none' }}>{t.login}</Link>
          </p>
        </form>
      </div>
    </div>
  )
}
