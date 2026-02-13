'use client'

import Link from 'next/link'
import { Plane } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import LanguageSelector from '@/components/LanguageSelector'
import Footer from '@/components/Footer'

export default function PrivacyPage() {
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

      <div className="container" style={{ padding: '60px 20px', maxWidth: '800px' }}>
        <h1 style={{ fontSize: '36px', marginBottom: '30px', fontFamily: 'Manrope, sans-serif' }}>
          {t.privacyPolicyTitle}
        </h1>
        
        <div style={{ lineHeight: '1.8', color: '#718096', fontFamily: 'Inter, sans-serif' }}>
          <h2 style={{ fontSize: '24px', color: '#2d3748', marginTop: '30px', marginBottom: '16px', fontFamily: 'Manrope, sans-serif' }}>
            {t.informationWeCollect}
          </h2>
          <p style={{ marginBottom: '20px' }}>
            {t.informationWeCollectText}
          </p>

          <h2 style={{ fontSize: '24px', color: '#2d3748', marginTop: '30px', marginBottom: '16px', fontFamily: 'Manrope, sans-serif' }}>
            {t.howWeUseInfo}
          </h2>
          <p style={{ marginBottom: '20px' }}>
            {t.howWeUseInfoText}
          </p>

          <h2 style={{ fontSize: '24px', color: '#2d3748', marginTop: '30px', marginBottom: '16px', fontFamily: 'Manrope, sans-serif' }}>
            {t.dataSecurity}
          </h2>
          <p style={{ marginBottom: '20px' }}>
            {t.dataSecurityText}
          </p>

          <h2 style={{ fontSize: '24px', color: '#2d3748', marginTop: '30px', marginBottom: '16px', fontFamily: 'Manrope, sans-serif' }}>
            {t.thirdPartySharing}
          </h2>
          <p style={{ marginBottom: '20px' }}>
            {t.thirdPartySharingText}
          </p>

          <h2 style={{ fontSize: '24px', color: '#2d3748', marginTop: '30px', marginBottom: '16px', fontFamily: 'Manrope, sans-serif' }}>
            {t.contact}
          </h2>
          <p style={{ marginBottom: '20px' }}>
            {t.contactText}
          </p>
        </div>
      </div>

      <Footer />
    </div>
  )
}
