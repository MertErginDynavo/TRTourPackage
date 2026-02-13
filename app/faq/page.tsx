'use client'

import Link from 'next/link'
import { Plane } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import LanguageSelector from '@/components/LanguageSelector'
import FAQ from '@/components/FAQ'
import Footer from '@/components/Footer'

export default function FAQPage() {
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
            <Link href="/traveler/login" style={{ 
              textDecoration: 'none', 
              color: '#718096', 
              fontSize: '15px',
              fontFamily: 'Inter, sans-serif',
              fontWeight: '500',
              transition: 'color 0.2s'
            }}>
              {t.travelerLogin}
            </Link>
            <Link href="/agency/login" style={{ 
              textDecoration: 'none', 
              color: '#718096', 
              fontSize: '15px',
              fontFamily: 'Inter, sans-serif',
              fontWeight: '500',
              transition: 'color 0.2s'
            }}>
              {t.agencyLogin}
            </Link>
          </div>
        </div>
      </nav>

      {/* FAQ Content */}
      <FAQ />

      {/* Footer */}
      <Footer />
    </div>
  )
}
