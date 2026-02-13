'use client'

import Link from 'next/link'
import { Plane } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import LanguageSelector from '@/components/LanguageSelector'
import Footer from '@/components/Footer'

export default function ContactPage() {
  const { t } = useLanguage()

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
          </div>
        </div>
      </nav>

      <div className="container" style={{ padding: '60px 20px', maxWidth: '600px' }}>
        <h1 style={{ fontSize: '36px', marginBottom: '12px', fontFamily: 'Manrope, sans-serif' }}>{t.contactTitle}</h1>
        <p style={{ fontSize: '16px', color: '#718096', marginBottom: '40px', fontFamily: 'Inter, sans-serif' }}>
          {t.contactSubtitle}
        </p>
        
        <div style={{ lineHeight: '1.8', color: '#718096', fontFamily: 'Inter, sans-serif' }}>
          <div style={{ marginTop: '40px' }}>
            <h3 style={{ fontSize: '20px', color: '#2d3748', marginBottom: '12px', fontFamily: 'Manrope, sans-serif' }}>{t.email}</h3>
            <p>support@trtourpackage.com</p>
          </div>

          <div style={{ marginTop: '30px' }}>
            <h3 style={{ fontSize: '20px', color: '#2d3748', marginBottom: '12px', fontFamily: 'Manrope, sans-serif' }}>{t.forTravelers}</h3>
            <p>{t.forTravelersText}</p>
          </div>

          <div style={{ marginTop: '30px' }}>
            <h3 style={{ fontSize: '20px', color: '#2d3748', marginBottom: '12px', fontFamily: 'Manrope, sans-serif' }}>{t.forAgencies}</h3>
            <p>{t.forAgenciesText}</p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
