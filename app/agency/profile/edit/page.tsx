'use client'

import React from 'react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import ImageUpload from '@/components/ImageUpload'

export default function EditAgencyProfile() {
  const router = useRouter()
  const [agency, setAgency] = useState<any>(null)
  const [logo, setLogo] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    const agencyId = localStorage.getItem('agencyId')
    
    fetch(`/api/agency/info/${agencyId}`)
      .then(res => res.json())
      .then(data => {
        setAgency(data)
        setLogo(data.logo || '')
      })
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const agencyId = localStorage.getItem('agencyId')

    try {
      const response = await fetch(`/api/agency/profile`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          agencyId,
          logo
        })
      })

      if (response.ok) {
        setSuccess(true)
        setTimeout(() => {
          router.push('/agency/profile')
        }, 1500)
      } else {
        alert('Failed to update profile')
      }
    } catch (error) {
      console.error('Update error:', error)
      alert('Failed to update profile')
    } finally {
      setLoading(false)
    }
  }

  if (!agency) {
    return (
      <div style={{ minHeight: '100vh', background: '#f8f9fa' }}>
        <Navbar showLanguageSelector={false} />
        <div style={{ padding: '60px 20px', textAlign: 'center' }}>
          Yükleniyor...
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f8f9fa' }}>
      <Navbar showLanguageSelector={false} />
      
      <div style={{ padding: '60px 20px' }}>
        <div className="container" style={{ maxWidth: '700px' }}>
          <Link href="/agency/profile" style={{ color: '#e53e3e', textDecoration: 'none', marginBottom: '20px', display: 'inline-block', fontFamily: 'Inter, sans-serif' }}>
            ← Profil Sayfasına Dön
          </Link>

          <h1 style={{ fontSize: '32px', marginBottom: '8px', fontFamily: 'Manrope, sans-serif' }}>
            Profili Düzenle
          </h1>
          <p style={{ color: '#718096', marginBottom: '40px', fontFamily: 'Inter, sans-serif' }}>
            Acente logonuzu güncelleyin
          </p>

          {success && (
            <div style={{ 
              padding: '12px', 
              background: '#d4edda', 
              color: '#155724', 
              borderRadius: '6px', 
              marginBottom: '20px',
              fontFamily: 'Inter, sans-serif'
            }}>
              Profil başarıyla güncellendi! Yönlendiriliyor...
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="card">
              <div style={{ marginBottom: '24px' }}>
                <h3 style={{ fontSize: '18px', marginBottom: '16px', fontFamily: 'Manrope, sans-serif' }}>
                  Acente Bilgileri
                </h3>
                <div style={{ padding: '16px', background: '#f8f9fa', borderRadius: '8px', marginBottom: '20px' }}>
                  <p style={{ marginBottom: '8px', fontFamily: 'Inter, sans-serif' }}>
                    <strong>Şirket Adı:</strong> {agency.companyName}
                  </p>
                  <p style={{ marginBottom: '8px', fontFamily: 'Inter, sans-serif' }}>
                    <strong>TURSAB No:</strong> {agency.tursabLicense}
                  </p>
                  <p style={{ marginBottom: '0', fontFamily: 'Inter, sans-serif' }}>
                    <strong>Email:</strong> {agency.email}
                  </p>
                </div>
              </div>

              <div style={{ marginBottom: '24px' }}>
                <ImageUpload
                  onUpload={setLogo}
                  currentImage={logo}
                  folder="trtourpackage/logos"
                  label="Acente Logosu"
                />
                <p style={{ fontSize: '12px', color: '#718096', marginTop: '8px', fontFamily: 'Inter, sans-serif' }}>
                  Logo, profil sayfanızda ve tekliflerinizde görünecektir.
                </p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary"
                style={{ width: '100%' }}
              >
                {loading ? 'Kaydediliyor...' : 'Değişiklikleri Kaydet'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
