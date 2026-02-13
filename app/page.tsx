'use client'

import Link from 'next/link'
import { Plane, Handshake, BadgeDollarSign, CreditCard, BadgeCheck, ClipboardList, FileText, Search, Phone, ShieldCheck, Globe } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import LanguageSelector from '@/components/LanguageSelector'
import Footer from '@/components/Footer'

export default function Home() {
  const { t } = useLanguage()
  return (
    <main style={{ background: '#f8f9fa' }}>
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'TravelAgency',
            name: 'TRTourPackage',
            description: 'Marketplace connecting travelers with verified Turkish travel agencies',
            url: 'https://trtourpackage.com',
            logo: 'https://trtourpackage.com/yeni.png',
            sameAs: [],
            address: {
              '@type': 'PostalAddress',
              addressCountry: 'TR',
            },
            areaServed: {
              '@type': 'Country',
              name: 'Turkey',
            },
            priceRange: '$$',
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '4.8',
              reviewCount: '127',
            },
          }),
        }}
      />
      
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

      {/* Hero Section */}
      <section style={{ padding: '80px 0', background: '#f8f9fa' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
            {/* Left: Text */}
            <div>
              <h1 style={{ fontSize: '48px', fontWeight: '700', lineHeight: '1.2', marginBottom: '20px', color: '#2d3748', fontFamily: 'Manrope, sans-serif' }}>
                {t.heroTitle}
              </h1>
              <p style={{ fontSize: '18px', lineHeight: '1.7', color: '#718096', marginBottom: '32px', fontFamily: 'Inter, sans-serif' }}>
                {t.heroSubtitle}
              </p>
              <Link href="/traveler/register" className="btn btn-primary" style={{ textDecoration: 'none' }}>
                {t.requestTour}
              </Link>
              <p style={{ fontSize: '13px', color: '#a0aec0', marginTop: '12px', fontFamily: 'Inter, sans-serif' }}>
                {t.registrationRequired}
              </p>
            </div>

            {/* Right: Illustration */}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <img 
                src="/yeni.png" 
                alt="Turkey Tour Illustration" 
                style={{ 
                  maxWidth: '100%', 
                  height: 'auto',
                  width: '650px'
                }} 
              />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section style={{ padding: '60px 0', background: 'white' }}>
        <div className="container">
          <h2 style={{ textAlign: 'center', fontSize: '32px', fontWeight: '600', marginBottom: '48px', color: '#2d3748', fontFamily: 'Manrope, sans-serif' }}>
            {t.whyChooseUs}
          </h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
            {[
              { icon: 'verified', title: t.verifiedAgencies, color: '#4299e1', link: '/verification' },
              { icon: 'handshake', title: t.directContact, color: '#48bb78' },
              { icon: 'nofee', title: t.noPlatformFees, color: '#ed8936' },
              { icon: 'nopayment', title: t.noPaymentProcessing, color: '#9f7aea' }
            ].map((item, i) => {
              const CardContent = (
                <div className="card" style={{ height: '100%', transition: 'transform 0.2s, box-shadow 0.2s', cursor: item.link ? 'pointer' : 'default' }}>
                  {item.icon === 'verified' ? (
                    <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'center' }}>
                      <BadgeCheck size={48} color={item.color} strokeWidth={2} />
                    </div>
                  ) : item.icon === 'handshake' ? (
                    <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'center' }}>
                      <Handshake size={48} color={item.color} strokeWidth={2} />
                    </div>
                  ) : item.icon === 'nofee' ? (
                    <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'center', position: 'relative' }}>
                      <BadgeDollarSign size={48} color={item.color} strokeWidth={2} />
                      <div style={{ 
                        position: 'absolute', 
                        top: '50%', 
                        left: '50%', 
                        transform: 'translate(-50%, -50%) rotate(45deg)',
                        width: '60px',
                        height: '3px',
                        background: item.color,
                        borderRadius: '2px'
                      }} />
                    </div>
                  ) : item.icon === 'nopayment' ? (
                    <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'center', position: 'relative' }}>
                      <CreditCard size={48} color={item.color} strokeWidth={2} />
                      <div style={{ 
                        position: 'absolute', 
                        top: '50%', 
                        left: '50%', 
                        transform: 'translate(-50%, -50%) rotate(45deg)',
                        width: '60px',
                        height: '3px',
                        background: item.color,
                        borderRadius: '2px'
                      }} />
                    </div>
                  ) : (
                    <div style={{ fontSize: '48px', marginBottom: '16px' }}>{item.icon}</div>
                  )}
                  <h3 style={{ fontSize: '15px', fontWeight: '600', color: '#2d3748', fontFamily: 'Manrope, sans-serif' }}>{item.title}</h3>
                  {item.link && (
                    <p style={{ fontSize: '12px', color: '#4299e1', marginTop: '8px', fontFamily: 'Inter, sans-serif' }}>
                      {t.learnVerification}
                    </p>
                  )}
                </div>
              )
              
              return item.link ? (
                <Link key={i} href={item.link} style={{ textDecoration: 'none' }}>
                  {CardContent}
                </Link>
              ) : (
                <div key={i}>
                  {CardContent}
                </div>
              )
            })}
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '48px' }}>
            <p style={{ fontSize: '15px', color: '#4a5568', fontWeight: '500', background: '#fff5f5', padding: '12px 24px', borderRadius: '8px', fontFamily: 'Inter, sans-serif' }}>
              ⏱️ {t.responseTime}
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section style={{ padding: '80px 0', background: '#f8f9fa' }}>
        <div className="container">
          <h2 style={{ textAlign: 'center', fontSize: '32px', fontWeight: '600', marginBottom: '60px', color: '#2d3748', fontFamily: 'Manrope, sans-serif' }}>
            {t.howItWorks}
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '32px', position: 'relative' }}>
            {/* Arrows between steps */}
            <div style={{ position: 'absolute', top: '60px', left: '23%', right: '77%', height: '2px', background: '#e2e8f0', zIndex: 0 }}></div>
            <div style={{ position: 'absolute', top: '60px', left: '48%', right: '52%', height: '2px', background: '#e2e8f0', zIndex: 0 }}></div>
            <div style={{ position: 'absolute', top: '60px', left: '73%', right: '27%', height: '2px', background: '#e2e8f0', zIndex: 0 }}></div>

            {[
              { num: '1', icon: 'form', title: t.step1, desc: '', color: '#e53e3e' },
              { num: '2', icon: 'offer', title: t.step2, desc: '', color: '#48bb78' },
              { num: '3', icon: 'compare', title: t.step3, desc: '', color: '#4299e1' },
              { num: '4', icon: 'contact', title: t.step4, desc: '', color: '#9f7aea' }
            ].map((step) => (
              <div key={step.num} style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
                <div style={{ 
                  width: '100px', 
                  height: '100px', 
                  borderRadius: '50%', 
                  background: 'white', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  margin: '0 auto 20px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                  border: '3px solid #f8f9fa'
                }}>
                  {step.icon === 'form' ? (
                    <ClipboardList size={48} color={step.color} strokeWidth={2} />
                  ) : step.icon === 'offer' ? (
                    <FileText size={48} color={step.color} strokeWidth={2} />
                  ) : step.icon === 'compare' ? (
                    <Search size={48} color={step.color} strokeWidth={2} />
                  ) : step.icon === 'contact' ? (
                    <Phone size={48} color={step.color} strokeWidth={2} />
                  ) : (
                    <span style={{ fontSize: '48px' }}>{step.icon}</span>
                  )}
                </div>
                <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px', color: '#2d3748', fontFamily: 'Manrope, sans-serif' }}>
                  {step.num}. {step.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Stats Bar */}
      <section style={{ padding: '40px 0', background: '#f8f9fa' }}>
        <div className="container">
          <div style={{ 
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: '16px',
            padding: '32px 40px',
            boxShadow: '0 20px 40px rgba(102, 126, 234, 0.3)',
            maxWidth: '700px',
            margin: '0 auto'
          }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '40px' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ marginBottom: '8px', display: 'flex', justifyContent: 'center' }}>
                  <Globe size={40} color="white" strokeWidth={2.5} />
                </div>
                <div style={{ fontSize: '32px', fontWeight: '700', color: 'white', marginBottom: '4px', fontFamily: 'Manrope, sans-serif' }}>
                  20+
                </div>
                <div style={{ fontSize: '15px', color: 'rgba(255, 255, 255, 0.9)', fontFamily: 'Inter, sans-serif' }}>
                  {t.countriesServed}
                </div>
                <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.7)', marginTop: '2px', fontFamily: 'Inter, sans-serif' }}>
                  {t.travelersWorldwide}
                </div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ marginBottom: '8px', display: 'flex', justifyContent: 'center' }}>
                  <ShieldCheck size={40} color="white" strokeWidth={2.5} />
                </div>
                <div style={{ fontSize: '32px', fontWeight: '700', color: 'white', marginBottom: '4px', fontFamily: 'Manrope, sans-serif' }}>
                  50+
                </div>
                <div style={{ fontSize: '15px', color: 'rgba(255, 255, 255, 0.9)', fontFamily: 'Inter, sans-serif' }}>
                  {t.verifiedAgenciesCount}
                </div>
                <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.7)', marginTop: '2px', fontFamily: 'Inter, sans-serif' }}>
                  {t.tursabLicensed}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Confidence Section */}
      <section style={{ padding: '60px 0', background: 'white' }}>
        <div className="container">
          <div style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center' }}>
            <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '16px', color: '#2d3748', fontFamily: 'Manrope, sans-serif' }}>
              {t.marketplaceNotAgency}
            </h3>
            <p style={{ fontSize: '16px', color: '#718096', lineHeight: '1.7', marginBottom: '8px', fontFamily: 'Inter, sans-serif' }}>
              {t.noSellTours}
            </p>
            <p style={{ fontSize: '16px', color: '#718096', lineHeight: '1.7', marginBottom: '24px', fontFamily: 'Inter, sans-serif' }}>
              {t.directWithAgencies}
            </p>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <img 
                src="/türsab.jfif" 
                alt="TÜRSAB - Association of Turkish Travel Agencies" 
                style={{ height: '60px', width: 'auto' }}
              />
            </div>
          </div>
        </div>
      </section>



      {/* Footer */}
      <Footer />
    </main>
  )
}
