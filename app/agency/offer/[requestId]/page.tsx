'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Navbar from '@/components/Navbar'

export default function CreateOffer({ params }: { params: { requestId: string } }) {
  const router = useRouter()
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    
    const data = {
      requestId: params.requestId,
      agencyId: 'temp-agency-id',
      packageTitle: formData.get('packageTitle'),
      description: formData.get('description'),
      includedServices: formData.get('includedServices'),
      excludedServices: formData.get('excludedServices'),
      price: formData.get('price'),
      notes: formData.get('notes'),
    }

    const res = await fetch('/api/agency/offers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })

    if (res.ok) {
      setSubmitted(true)
      setTimeout(() => router.push('/agency/dashboard'), 2000)
    }
  }

  if (submitted) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8f9fa' }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '32px', color: '#48bb78', marginBottom: '20px', fontFamily: 'Manrope, sans-serif' }}>✓ Teklif Gönderildi</h1>
          <p style={{ color: '#718096', fontFamily: 'Inter, sans-serif' }}>Panele yönlendiriliyorsunuz...</p>
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f8f9fa' }}>
      <Navbar showLanguageSelector={false} />
      
      <div style={{ padding: '60px 20px' }}>
        <div className="container" style={{ maxWidth: '700px' }}>
          <Link href="/agency/dashboard" style={{ color: '#e53e3e', textDecoration: 'none', marginBottom: '20px', display: 'inline-block', fontFamily: 'Inter, sans-serif' }}>
            ← Panele Dön
          </Link>
          
          <h1 style={{ fontSize: '36px', marginBottom: '40px', fontFamily: 'Manrope, sans-serif' }}>Teklif Oluştur</h1>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                Paket Başlığı *
              </label>
              <input 
                type="text" 
                name="packageTitle" 
                placeholder="Örn: 7 Günlük İstanbul & Kapadokya Turu"
                required 
                style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '6px', fontSize: '16px' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                Tur Detayları *
              </label>
              <textarea 
                name="description" 
                rows={6}
                placeholder="Tur programını, öne çıkan noktaları ve deneyimleri açıklayın"
                required 
                style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '6px', fontSize: '16px', fontFamily: 'inherit' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                Dahil Olan Hizmetler *
              </label>
              <textarea 
                name="includedServices" 
                rows={4}
                placeholder="Konaklama, yemekler, ulaşım, rehberlik vb. dahil olan hizmetleri listeleyin"
                required 
                style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '6px', fontSize: '16px', fontFamily: 'inherit' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                Hariç Olan Hizmetler *
              </label>
              <textarea 
                name="excludedServices" 
                rows={4}
                placeholder="Uçak bileti, kişisel harcamalar, ekstra aktiviteler vb. dahil olmayan hizmetleri listeleyin"
                required 
                style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '6px', fontSize: '16px', fontFamily: 'inherit' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                Toplam Fiyat *
              </label>
              <input 
                type="text" 
                name="price" 
                placeholder="Örn: Kişi başı $2,500"
                required 
                style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '6px', fontSize: '16px' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                Misafir İçin Notlar (opsiyonel)
              </label>
              <textarea 
                name="notes" 
                rows={3}
                placeholder="Ek bilgiler veya özel notlar"
                style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '6px', fontSize: '16px', fontFamily: 'inherit' }}
              />
            </div>

            {/* Multi-language Option */}
            <div style={{ padding: '16px', background: '#f0fdf4', borderRadius: '8px', border: '1px solid #48bb78' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                <input 
                  type="checkbox" 
                  id="autoTranslate" 
                  name="autoTranslate"
                  defaultChecked
                  style={{ width: '18px', height: '18px' }}
                />
                <label htmlFor="autoTranslate" style={{ fontWeight: '500', color: '#2d3748', fontFamily: 'Inter, sans-serif', cursor: 'pointer' }}>
                  Otomatik İngilizce Çeviri (Pro özelliği)
                </label>
              </div>
              <p style={{ fontSize: '13px', color: '#718096', margin: 0, fontFamily: 'Inter, sans-serif' }}>
                Teklifiniz otomatik olarak İngilizce'ye çevrilecek ve uluslararası misafirlere gösterilecek.
              </p>
            </div>

            {/* Branded PDF Option */}
            <div style={{ padding: '16px', background: '#fef3f2', borderRadius: '8px', border: '1px solid #9f7aea' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                <input 
                  type="checkbox" 
                  id="brandedPdf" 
                  name="brandedPdf"
                  style={{ width: '18px', height: '18px' }}
                />
                <label htmlFor="brandedPdf" style={{ fontWeight: '500', color: '#2d3748', fontFamily: 'Inter, sans-serif', cursor: 'pointer' }}>
                  Markalı PDF Teklif (Premium özelliği)
                </label>
              </div>
              <p style={{ fontSize: '13px', color: '#718096', margin: 0, fontFamily: 'Inter, sans-serif' }}>
                Teklifiniz logonuz ve kurumsal kimliğinizle PDF formatında oluşturulacak.
              </p>
            </div>

            <button type="submit" className="btn btn-primary" style={{ marginTop: '20px' }}>
              Teklifi Gönder
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
