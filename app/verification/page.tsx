'use client'

import Link from 'next/link'
import { Plane, Shield, BadgeCheck, Award } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import LanguageSelector from '@/components/LanguageSelector'
import Footer from '@/components/Footer'

export default function VerificationPage() {
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
      
      <div style={{ padding: '60px 20px' }}>
        <div className="container" style={{ maxWidth: '900px' }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <Shield size={48} color="#48bb78" strokeWidth={2} />
            </div>
            <h1 style={{ fontSize: '42px', marginBottom: '16px', color: '#2d3748', fontFamily: 'Manrope, sans-serif' }}>
              {t.verificationTitle}
            </h1>
            <p style={{ fontSize: '18px', color: '#718096', lineHeight: '1.7', fontFamily: 'Inter, sans-serif' }}>
              {t.verificationSubtitle}
            </p>
          </div>

          {/* Trust Badges */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px', marginBottom: '60px' }}>
            <div className="card" style={{ textAlign: 'center', padding: '24px', background: '#f0fdf4', border: '1px solid #48bb78' }}>
              <BadgeCheck size={40} color="#48bb78" style={{ margin: '0 auto 12px' }} />
              <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#2d3748', marginBottom: '8px', fontFamily: 'Manrope, sans-serif' }}>
                {t.verifiedAgencies}
              </h3>
            </div>
            <div className="card" style={{ textAlign: 'center', padding: '24px', background: '#f0fdf4', border: '1px solid #48bb78' }}>
              <Award size={40} color="#48bb78" style={{ margin: '0 auto 12px' }} />
              <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#2d3748', marginBottom: '8px', fontFamily: 'Manrope, sans-serif' }}>
                {t.tursabLicensed}
              </h3>
            </div>
          </div>

          {/* Verification Steps */}
          <div className="card" style={{ marginBottom: '40px' }}>
            <div style={{ display: 'grid', gap: '24px' }}>
              {[
                { num: '1', title: t.step1Title, text: t.step1Text },
                { num: '2', title: t.step2Title, text: t.step2Text },
                { num: '3', title: t.step3Title, text: t.step3Text },
                { num: '4', title: t.step4Title, text: t.step4Text },
              ].map((step) => (
                <div key={step.num} style={{ display: 'flex', gap: '20px', padding: '20px', background: '#f8f9fa', borderRadius: '8px' }}>
                  <div style={{ flexShrink: 0 }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#e53e3e', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', fontWeight: '600', fontFamily: 'Manrope, sans-serif' }}>
                      {step.num}
                    </div>
                  </div>
                  <div>
                    <h3 style={{ fontSize: '20px', marginBottom: '8px', color: '#2d3748', fontFamily: 'Manrope, sans-serif' }}>
                      {step.title}
                    </h3>
                    <p style={{ color: '#718096', margin: 0, lineHeight: '1.6', fontFamily: 'Inter, sans-serif' }}>
                      {step.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* What This Means */}
          <div className="card" style={{ marginBottom: '40px', background: '#fffbeb', border: '1px solid #fbbf24' }}>
            <h2 style={{ fontSize: '24px', marginBottom: '20px', color: '#2d3748', fontFamily: 'Manrope, sans-serif' }}>
              {t.whatThisMeans}
            </h2>
            <p style={{ color: '#2d3748', margin: 0, lineHeight: '1.7', fontFamily: 'Inter, sans-serif' }}>
              {t.whatThisMeansText}
            </p>
          </div>

          {/* TÜRSAB Info */}
          <div className="card">
            <div style={{ display: 'flex', gap: '20px', alignItems: 'start' }}>
              <img 
                src="/türsab.jfif" 
                alt="TÜRSAB Logo" 
                style={{ width: '80px', height: 'auto', flexShrink: 0 }}
              />
              <div>
                <h2 style={{ fontSize: '24px', marginBottom: '12px', color: '#2d3748', fontFamily: 'Manrope, sans-serif' }}>
                  {t.aboutTursab}
                </h2>
                <p style={{ color: '#718096', margin: 0, lineHeight: '1.7', fontFamily: 'Inter, sans-serif' }}>
                  {t.aboutTursabText}
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div style={{ textAlign: 'center', marginTop: '60px' }}>
            <Link href="/traveler/register" className="btn btn-primary" style={{ textDecoration: 'none', fontSize: '18px', padding: '16px 32px' }}>
              {t.requestTour}
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
