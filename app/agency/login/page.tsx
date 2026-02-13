'use client'

import React from 'react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Plane } from 'lucide-react'

export default function AgencyLogin() {
  const router = useRouter()
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    
    const data = {
      email: formData.get('email'),
      password: formData.get('password'),
    }

    const res = await fetch('/api/agency/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })

    if (res.ok) {
      const result = await res.json()
      localStorage.setItem('agencyId', result.agencyId)
      router.push('/agency/dashboard')
    } else {
      setError('Giriş bilgileri hatalı. Lütfen TRTourPackage yetkilisi ile iletişime geçiniz.')
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f8f9fa' }}>
      {/* Login Section */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '60px 20px' }}>
        <div style={{ maxWidth: '450px', width: '100%' }}>
          <div style={{ textAlign: 'center', marginBottom: '30px' }}>
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
            <h1 style={{ fontSize: '28px', marginTop: '20px', marginBottom: '8px', fontFamily: 'Manrope, sans-serif' }}>Acenta Girişi</h1>
            <p style={{ color: '#666', fontFamily: 'Inter, sans-serif' }}>Tur taleplerini görüntülemek için giriş yapın</p>
          </div>

          <form onSubmit={handleSubmit} style={{ background: 'white', padding: '32px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
            {error && (
              <div style={{ padding: '12px', background: '#f8d7da', color: '#721c24', borderRadius: '6px', marginBottom: '20px' }}>
                {error}
              </div>
            )}

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                E-posta
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
                Şifre
              </label>
              <input 
                type="password" 
                name="password" 
                required 
                style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '6px', fontSize: '16px' }}
              />
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
              Giriş Yap
            </button>

            <div style={{ marginTop: '16px', padding: '12px', background: '#f7fafc', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
              <p style={{ fontSize: '13px', color: '#718096', margin: 0, lineHeight: '1.6', fontFamily: 'Inter, sans-serif' }}>
                Giriş yaparak <Link href="/kvkk" style={{ color: '#4299e1', textDecoration: 'underline' }}>KVKK Aydınlatma Metni</Link>, <Link href="/privacy" style={{ color: '#4299e1', textDecoration: 'underline' }}>Gizlilik Politikası</Link> ve <Link href="/terms" style={{ color: '#4299e1', textDecoration: 'underline' }}>Kullanım Koşulları</Link>'nı kabul etmiş olursunuz.
              </p>
            </div>

            <div style={{ textAlign: 'center', marginTop: '20px', padding: '16px', background: '#f0fdf4', borderRadius: '8px', border: '1px solid #10b981' }}>
              <p style={{ fontSize: '14px', color: '#065f46', marginBottom: '8px', fontWeight: '500' }}>
                Henüz üye değil misiniz?
              </p>
              <Link 
                href="/agency/register" 
                style={{ 
                  display: 'inline-block',
                  padding: '10px 24px',
                  background: '#10b981',
                  color: 'white',
                  borderRadius: '6px',
                  textDecoration: 'none',
                  fontSize: '14px',
                  fontWeight: '600',
                  transition: 'background 0.2s'
                }}
              >
                Acente Olarak Kayıt Ol
              </Link>
            </div>

            <p style={{ textAlign: 'center', color: '#666', fontSize: '13px', marginTop: '20px', lineHeight: '1.6' }}>
              Kayıt sonrası başvurunuz 24-48 saat içinde değerlendirilecektir.
            </p>
          </form>
        </div>
      </div>

      {/* Pricing Section */}
      <section style={{ padding: '80px 20px', background: 'white' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{ fontSize: '32px', fontWeight: '600', marginBottom: '16px', color: '#2d3748', fontFamily: 'Manrope, sans-serif' }}>
              Abonelik Paketleri
            </h2>
            <p style={{ fontSize: '18px', color: '#718096', fontFamily: 'Inter, sans-serif' }}>
              Komisyon yok. Tek bir basit abonelik.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', maxWidth: '1200px', margin: '0 auto' }}>
            {[
              { 
                name: 'Starter', 
                price: '€49', 
                period: '/ay',
                subtitle: 'Küçük & yeni acentalar için',
                features: [
                  'Ayda 10 talebe teklif verme',
                  'TÜRSAB doğrulaması',
                  'Acenta profil sayfası',
                  'Traveler ile direkt mesajlaşma',
                  'Teklif oluşturma (standart)',
                  'Rating & yorum alma'
                ],
                notIncluded: [
                  'Analytics yok',
                  'Öncelikli görünüm yok'
                ],
                color: '#4299e1',
                note: 'Platformu deneyin, kaliteli lead alın'
              },
              { 
                name: 'Pro', 
                price: '€99', 
                period: '/ay',
                subtitle: 'Düzenli iş almak isteyenler için',
                features: [
                  'Sınırsız talebe teklif',
                  'TÜRSAB doğrulaması + yearly badge',
                  'Gelişmiş teklif oluşturma',
                  'Çok dilli teklif (TR → EN otomatik)',
                  'Response time görünürlüğü',
                  'Rating & yorum önceliği',
                  '"Featured Verified Agency" rozeti'
                ],
                notIncluded: [
                  'Detaylı analytics yok'
                ],
                color: '#48bb78',
                popular: true,
                note: 'En iyi fiyat/performans dengesi'
              },
              { 
                name: 'Premium', 
                price: '€149', 
                period: '/ay',
                subtitle: 'Büyük & agresif acentalar için',
                features: [
                  'Pro paketin tüm özellikleri',
                  'Arama sonuçlarında üst sıralar',
                  'Analytics Dashboard (detaylı)',
                  'Ortalama yanıt süresi rozeti',
                  'Branded teklif PDF\'leri',
                  'VIP taleplere öncelik',
                  'Yeni taleplerde öncelikli bildirim'
                ],
                notIncluded: [],
                color: '#9f7aea',
                note: 'Maksimum görünürlük + veri'
              }
            ].map((plan, i) => (
              <div key={i} className="card" style={{ position: 'relative', border: plan.popular ? '2px solid #48bb78' : '1px solid #e2e8f0' }}>
                {plan.popular && (
                  <div style={{ 
                    position: 'absolute', 
                    top: '-12px', 
                    left: '50%', 
                    transform: 'translateX(-50%)',
                    background: '#48bb78',
                    color: 'white',
                    padding: '4px 16px',
                    borderRadius: '12px',
                    fontSize: '12px',
                    fontWeight: '600',
                    fontFamily: 'Inter, sans-serif'
                  }}>
                    EN POPÜLER ⭐
                  </div>
                )}
                <h3 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '4px', color: '#2d3748', fontFamily: 'Manrope, sans-serif' }}>
                  {plan.name}
                </h3>
                <p style={{ fontSize: '13px', color: '#718096', marginBottom: '16px', fontFamily: 'Inter, sans-serif' }}>
                  {plan.subtitle}
                </p>
                <div style={{ marginBottom: '20px' }}>
                  <span style={{ fontSize: '48px', fontWeight: '700', color: plan.color, fontFamily: 'Manrope, sans-serif' }}>{plan.price}</span>
                  <span style={{ fontSize: '16px', color: '#718096', fontFamily: 'Inter, sans-serif' }}>{plan.period}</span>
                </div>
                <p style={{ fontSize: '12px', color: '#718096', marginBottom: '20px', fontStyle: 'italic', fontFamily: 'Inter, sans-serif', minHeight: '32px' }}>
                  {plan.note}
                </p>
                <ul style={{ listStyle: 'none', padding: 0, marginBottom: '16px', textAlign: 'left' }}>
                  {plan.features.map((feature, j) => (
                    <li key={j} style={{ padding: '6px 0', color: '#2d3748', fontSize: '13px', fontFamily: 'Inter, sans-serif', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                      <span style={{ color: plan.color, fontSize: '16px', flexShrink: 0 }}>✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                  {plan.notIncluded.map((feature, j) => (
                    <li key={`not-${j}`} style={{ padding: '6px 0', color: '#a0aec0', fontSize: '13px', fontFamily: 'Inter, sans-serif', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                      <span style={{ color: '#e53e3e', fontSize: '16px', flexShrink: 0 }}>✗</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button 
                  className="btn btn-primary"
                  style={{ 
                    width: '100%', 
                    textAlign: 'center',
                    background: plan.popular ? plan.color : '#e53e3e'
                  }}
                >
                  Başla
                </button>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '48px' }}>
            <p style={{ fontSize: '16px', fontWeight: '600', color: '#2d3748', marginBottom: '8px', fontFamily: 'Manrope, sans-serif' }}>
              Tüm paketlerde:
            </p>
            <p style={{ fontSize: '14px', color: '#718096', fontFamily: 'Inter, sans-serif' }}>
              ✓ Komisyon yok • ✓ Booking yok • ✓ Ödeme işleme yok • ✓ Lead başına ücret yok
            </p>
            <p style={{ fontSize: '13px', color: '#a0aec0', marginTop: '8px', fontFamily: 'Inter, sans-serif', fontStyle: 'italic' }}>
              No commission. No booking. No payment handling.
            </p>
          </div>

          {/* Featured Agency Info */}
          <div style={{ maxWidth: '800px', margin: '60px auto 0', padding: '24px', background: '#f7fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
            <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '16px', color: '#2d3748', fontFamily: 'Manrope, sans-serif', textAlign: 'center' }}>
              "Featured Verified Agency" Nedir?
            </h3>
            <div style={{ display: 'grid', gap: '12px', fontSize: '14px', color: '#718096', fontFamily: 'Inter, sans-serif' }}>
              <p style={{ margin: 0 }}>
                ✓ Reklam değil, vitrin özelliği - Acenteniz öne çıkar
              </p>
              <p style={{ margin: 0 }}>
                ✓ Arama sonuçlarında üst sıralarda görünüm
              </p>
              <p style={{ margin: 0 }}>
                ✓ "Featured Verified Agency" rozeti ile güvenilirlik
              </p>
              <p style={{ margin: 0 }}>
                ✓ Organik görünüm - Paid ads gibi değil
              </p>
              <p style={{ margin: 0, paddingTop: '8px', borderTop: '1px solid #e2e8f0', marginTop: '8px', fontWeight: '500', color: '#2d3748' }}>
                Pro ve Premium paketlerde dahil
              </p>
            </div>
          </div>

          {/* Annual Verification Fee */}
          <div style={{ maxWidth: '800px', margin: '40px auto 0', padding: '24px', background: '#fffbeb', borderRadius: '8px', border: '1px solid #fbbf24' }}>
            <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '16px', color: '#2d3748', fontFamily: 'Manrope, sans-serif', textAlign: 'center' }}>
              Yıllık Doğrulama Ücreti
            </h3>
            <div style={{ display: 'grid', gap: '12px', fontSize: '14px', color: '#78716c', fontFamily: 'Inter, sans-serif' }}>
              <p style={{ margin: 0 }}>
                ✓ TÜRSAB lisans doğrulaması + manuel kontrol
              </p>
              <p style={{ margin: 0 }}>
                ✓ Platform kalitesini korumak için yılda 1 kez yenilenir
              </p>
              <p style={{ margin: 0 }}>
                ✓ Güvenilir acenta ağını sürdürme hizmeti
              </p>
              <p style={{ margin: 0, paddingTop: '12px', borderTop: '1px solid #fbbf24', marginTop: '12px', fontWeight: '600', color: '#2d3748', fontSize: '16px', textAlign: 'center' }}>
                €49–€99 / yıl
              </p>
              <p style={{ margin: 0, fontSize: '13px', textAlign: 'center', fontStyle: 'italic', color: '#78716c', marginBottom: '16px' }}>
                "Verification is renewed annually to maintain platform quality."
              </p>
              <button 
                className="btn btn-primary"
                style={{ 
                  width: '100%', 
                  maxWidth: '300px',
                  margin: '0 auto',
                  display: 'block',
                  background: '#f59e0b'
                }}
              >
                Satın Al
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
