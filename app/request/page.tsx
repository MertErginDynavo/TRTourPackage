'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Plane } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import LanguageSelector from '@/components/LanguageSelector'

export default function RequestPage() {
  const router = useRouter()
  const { t } = useLanguage()
  const [contactMethod, setContactMethod] = useState('email')
  const [submitted, setSubmitted] = useState(false)
  const [offerLink, setOfferLink] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    
    const travelerId = localStorage.getItem('travelerId') || 'anonymous'
    
    const data = {
      travelerId,
      country: formData.get('country'),
      travelDates: formData.get('travelDates'),
      numTravelers: parseInt(formData.get('numTravelers') as string),
      budgetRange: formData.get('budgetRange'),
      interests: formData.get('interests'),
      contactMethod,
      contactValue: contactMethod === 'email' 
        ? formData.get('email')
        : `${formData.get('countryCode')}${formData.get('whatsapp')}`
    }

    const res = await fetch('/api/requests', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })

    if (res.ok) {
      const result = await res.json()
      
      // If logged in, redirect to dashboard
      if (travelerId !== 'anonymous') {
        router.push('/traveler/dashboard')
      } else {
        setOfferLink(result.offerLink)
        setSubmitted(true)
      }
    }
  }

  if (submitted) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', background: '#f8f9fa' }}>
        <div className="card" style={{ maxWidth: '600px', textAlign: 'center' }}>
          <div style={{ fontSize: '64px', marginBottom: '20px' }}>✓</div>
          <h1 style={{ fontSize: '32px', marginBottom: '20px', color: '#48bb78', fontFamily: 'Manrope, sans-serif' }}>{t.requestSubmitted}</h1>
          <p style={{ fontSize: '18px', marginBottom: '30px', color: '#718096', lineHeight: '1.8', fontFamily: 'Inter, sans-serif' }}>
            {t.requestSubmittedMessage}
          </p>
          
          <div className="alert alert-warning" style={{ textAlign: 'left', marginBottom: '30px' }}>
            <p style={{ fontWeight: '600', marginBottom: '12px', color: '#744210' }}>
              📌 Save this link to view your offers:
            </p>
            <div style={{ background: 'white', padding: '16px', borderRadius: '8px', marginBottom: '12px', wordBreak: 'break-all', border: '2px dashed #ed8936' }}>
              <code style={{ fontSize: '14px', color: '#e53e3e', fontWeight: '600' }}>{offerLink}</code>
            </div>
            <p style={{ fontSize: '14px', color: '#744210', lineHeight: '1.6' }}>
              You will receive a notification when agencies submit their offers. You can also check this link anytime to view all offers.
            </p>
          </div>

          <Link href="/" className="btn btn-primary" style={{ textDecoration: 'none' }}>
            ← Back to Home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f8f9fa' }}>
      {/* Navbar */}
      <nav className="navbar">
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Plane size={48} color="#e53e3e" strokeWidth={2} />
            <span style={{ 
              fontSize: '24px', 
              fontWeight: '600', 
              color: '#1a202c',
              letterSpacing: '-0.02em',
              fontFamily: 'Manrope, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
            }}>TRTourPackage</span>
          </Link>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <LanguageSelector />
            <Link href="/" className="btn-secondary" style={{ textDecoration: 'none' }}>← Back to Home</Link>
          </div>
        </div>
      </nav>

      <div style={{ padding: '60px 20px' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div className="card">
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
              <h1 style={{ fontSize: '36px', marginBottom: '12px', color: '#2d3748', fontFamily: 'Manrope, sans-serif' }}>{t.requestFormTitle}</h1>
              <p style={{ color: '#718096', fontSize: '16px', lineHeight: '1.7', fontFamily: 'Inter, sans-serif' }}>
                {t.requestFormSubtitle}
              </p>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
              <div>
                <label>{t.country} *</label>
                <input 
                  type="text" 
                  name="country" 
                  placeholder="e.g., United States"
                  required 
                />
              </div>

              <div>
                <label>{t.travelDates} *</label>
                <input 
                  type="text" 
                  name="travelDates" 
                  placeholder={t.travelDatesPlaceholder}
                  required 
                />
              </div>

              <div>
                <label>{t.numberOfTravelers} *</label>
                <input 
                  type="number" 
                  name="numTravelers" 
                  min="1"
                  placeholder="How many people?"
                  required 
                />
              </div>

              <div>
                <label>{t.budgetRange}</label>
                <input 
                  type="text" 
                  name="budgetRange" 
                  placeholder={t.budgetPlaceholder}
                />
              </div>

              <div>
                <label>{t.interests}</label>
                <textarea 
                  name="interests" 
                  rows={5}
                  placeholder={t.interestsPlaceholder}
                />
              </div>

              <div>
                <label style={{ marginBottom: '16px' }}>Preferred Contact Method *</label>
                <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', padding: '12px 24px', border: `2px solid ${contactMethod === 'email' ? '#e53e3e' : '#e2e8f0'}`, borderRadius: '8px', background: contactMethod === 'email' ? 'rgba(229, 62, 62, 0.05)' : 'white', transition: 'all 0.3s' }}>
                    <input 
                      type="radio" 
                      value="email" 
                      checked={contactMethod === 'email'}
                      onChange={(e) => setContactMethod(e.target.value)}
                    />
                    📧 Email (recommended)
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', padding: '12px 24px', border: `2px solid ${contactMethod === 'whatsapp' ? '#e53e3e' : '#e2e8f0'}`, borderRadius: '8px', background: contactMethod === 'whatsapp' ? 'rgba(229, 62, 62, 0.05)' : 'white', transition: 'all 0.3s' }}>
                    <input 
                      type="radio" 
                      value="whatsapp" 
                      checked={contactMethod === 'whatsapp'}
                      onChange={(e) => setContactMethod(e.target.value)}
                    />
                    📱 WhatsApp
                  </label>
                </div>

                {contactMethod === 'email' ? (
                  <input 
                    type="email" 
                    name="email" 
                    placeholder="your@email.com"
                    required 
                  />
                ) : (
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <input 
                      type="text" 
                      name="countryCode" 
                      placeholder="+1"
                      required 
                      style={{ width: '100px' }}
                    />
                    <input 
                      type="tel" 
                      name="whatsapp" 
                      placeholder="WhatsApp number"
                      required 
                      style={{ flex: 1 }}
                    />
                  </div>
                )}
                
                <p style={{ fontSize: '14px', color: '#718096', marginTop: '12px', lineHeight: '1.6' }}>
                  🔒 Your contact details will only be shared with the agency you choose to contact.
                </p>
              </div>

              <button type="submit" className="btn btn-primary" style={{ marginTop: '20px', width: '100%', fontSize: '18px' }}>
                {t.submitRequest} →
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
