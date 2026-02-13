'use client'

import Link from 'next/link'
import { Plane } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import LanguageSelector from '@/components/LanguageSelector'
import Footer from '@/components/Footer'

export default function AboutPage() {
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

      <div className="container" style={{ padding: '60px 20px', maxWidth: '800px' }}>
        <h1 style={{ fontSize: '36px', marginBottom: '30px', fontFamily: 'Manrope, sans-serif' }}>About TRTourPackage</h1>
        
        <div style={{ lineHeight: '1.8', color: '#718096', fontFamily: 'Inter, sans-serif' }}>
          <p style={{ marginBottom: '20px' }}>
            TRTourPackage is a marketplace connecting international travelers with verified Turkish travel agencies.
          </p>

          <p style={{ marginBottom: '20px' }}>
            We are not a travel agency. We do not sell tours or process payments. We simply provide a platform where travelers can request custom tour packages and receive offers directly from licensed Turkish agencies.
          </p>

          <h2 style={{ fontSize: '24px', color: '#2d3748', marginTop: '40px', marginBottom: '16px', fontFamily: 'Manrope, sans-serif' }}>Our Mission</h2>
          <p style={{ marginBottom: '20px' }}>
            To eliminate middlemen and inflated prices by connecting travelers directly with verified Turkish travel agencies.
          </p>

          <h2 style={{ fontSize: '24px', color: '#2d3748', marginTop: '40px', marginBottom: '16px', fontFamily: 'Manrope, sans-serif' }}>How We Verify Agencies</h2>
          <p style={{ marginBottom: '20px' }}>
            All agencies on our platform are verified through their TURSAB (Association of Turkish Travel Agencies) license number. Only licensed agencies with a physical address in Turkey can join our platform.
          </p>

          <h2 style={{ fontSize: '24px', color: '#2d3748', marginTop: '40px', marginBottom: '16px', fontFamily: 'Manrope, sans-serif' }}>No Hidden Fees</h2>
          <p style={{ marginBottom: '20px' }}>
            We do not charge travelers any fees. We do not process payments. All bookings and payments are handled directly between you and the agency you choose.
          </p>
        </div>

        <Link href="/" className="btn btn-primary" style={{ marginTop: '40px', textDecoration: 'none', display: 'inline-block' }}>
          {t.requestTour}
        </Link>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  )
}
