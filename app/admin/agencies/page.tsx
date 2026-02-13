'use client'

import { useState, useEffect } from 'react'
import Navbar from '@/components/Navbar'
import { CheckCircle, XCircle, Clock, Building2 } from 'lucide-react'

interface Agency {
  id: string
  companyName: string
  tursabLicense: string
  email: string
  verified: boolean
  createdAt: string
}

export default function AdminAgencies() {
  const [showForm, setShowForm] = useState(false)
  const [success, setSuccess] = useState('')
  const [agencies, setAgencies] = useState<Agency[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAgencies()
  }, [])

  const fetchAgencies = async () => {
    try {
      const res = await fetch('/api/admin/agencies')
      if (res.ok) {
        const data = await res.json()
        setAgencies(data)
      }
    } catch (error) {
      console.error('Failed to fetch agencies:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleApprove = async (agencyId: string) => {
    try {
      const res = await fetch('/api/admin/agencies', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ agencyId, action: 'approve' })
      })

      if (res.ok) {
        setSuccess('Acenta onaylandı!')
        fetchAgencies()
        setTimeout(() => setSuccess(''), 3000)
      }
    } catch (error) {
      console.error('Failed to approve agency:', error)
    }
  }

  const handleReject = async (agencyId: string) => {
    if (!confirm('Bu acentayı reddetmek istediğinizden emin misiniz?')) return

    try {
      const res = await fetch('/api/admin/agencies', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ agencyId, action: 'reject' })
      })

      if (res.ok) {
        setSuccess('Acenta reddedildi ve silindi.')
        fetchAgencies()
        setTimeout(() => setSuccess(''), 3000)
      }
    } catch (error) {
      console.error('Failed to reject agency:', error)
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    
    const data = {
      companyName: formData.get('companyName'),
      tursabLicense: formData.get('tursabLicense'),
      address: formData.get('address'),
      email: formData.get('email'),
      password: formData.get('password'),
      whatsapp: formData.get('whatsapp'),
      website: formData.get('website') || null,
    }

    const res = await fetch('/api/admin/agencies', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })

    if (res.ok) {
      setSuccess('Acenta başarıyla oluşturuldu!')
      setShowForm(false)
      setTimeout(() => setSuccess(''), 3000)
      e.currentTarget.reset()
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f8f9fa' }}>
      <Navbar showLanguageSelector={false} />
      
      <div style={{ padding: '60px 20px' }}>
        <div className="container" style={{ maxWidth: '900px' }}>
          <h1 style={{ fontSize: '32px', marginBottom: '10px', fontFamily: 'Manrope, sans-serif' }}>Admin - Acenta Yönetimi</h1>
          <p style={{ color: '#718096', marginBottom: '30px', fontFamily: 'Inter, sans-serif' }}>
            Yeni acenta hesabı oluşturun ve mevcut acenteleri yönetin.
          </p>

          {success && (
          <div style={{ padding: '16px', background: '#d4edda', color: '#155724', borderRadius: '6px', marginBottom: '20px' }}>
            {success}
          </div>
        )}

        <button 
          onClick={() => setShowForm(!showForm)}
          className="btn btn-primary"
          style={{ marginBottom: '30px' }}
        >
          {showForm ? 'İptal' : '+ Yeni Acenta Ekle'}
        </button>

        {showForm && (
          <div className="card" style={{ marginBottom: '30px' }}>
            <h2 style={{ fontSize: '24px', marginBottom: '20px', fontFamily: 'Manrope, sans-serif' }}>Yeni Acenta Oluştur</h2>
            
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                  Şirket Adı *
                </label>
                <input 
                  type="text" 
                  name="companyName" 
                  required 
                  style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '6px', fontSize: '16px' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                  TURSAB Belge Numarası *
                </label>
                <input 
                  type="text" 
                  name="tursabLicense" 
                  required 
                  style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '6px', fontSize: '16px' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                  Adres *
                </label>
                <textarea 
                  name="address" 
                  rows={2}
                  required 
                  style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '6px', fontSize: '16px', fontFamily: 'inherit' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                    E-posta *
                  </label>
                  <input 
                    type="email" 
                    name="email" 
                    required 
                    style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '6px', fontSize: '16px' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                    Şifre *
                  </label>
                  <input 
                    type="text" 
                    name="password" 
                    required 
                    style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '6px', fontSize: '16px' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                    WhatsApp *
                  </label>
                  <input 
                    type="tel" 
                    name="whatsapp" 
                    placeholder="+90 5XX XXX XX XX"
                    required 
                    style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '6px', fontSize: '16px' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                    Web Sitesi
                  </label>
                  <input 
                    type="url" 
                    name="website" 
                    style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '6px', fontSize: '16px' }}
                  />
                </div>
              </div>

              <button type="submit" className="btn btn-primary" style={{ marginTop: '10px' }}>
                Acenta Oluştur
              </button>
            </form>
          </div>
        )}

        <div className="card">
          <h2 style={{ fontSize: '20px', marginBottom: '16px', fontFamily: 'Manrope, sans-serif' }}>
            Onay Bekleyen Acenteler
          </h2>
          
          {loading ? (
            <p style={{ color: '#718096' }}>Yükleniyor...</p>
          ) : (
            <>
              {agencies.filter(a => !a.verified).length === 0 ? (
                <p style={{ color: '#718096', fontFamily: 'Inter, sans-serif' }}>
                  Onay bekleyen acenta yok.
                </p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {agencies.filter(a => !a.verified).map(agency => (
                    <div 
                      key={agency.id}
                      style={{ 
                        padding: '20px', 
                        border: '1px solid #e2e8f0', 
                        borderRadius: '8px',
                        background: '#fffbeb'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                        <div style={{ flex: 1 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                            <Building2 className="w-5 h-5 text-[#e53e3e]" />
                            <h3 style={{ fontSize: '18px', fontWeight: '600' }}>
                              {agency.companyName}
                            </h3>
                            <span style={{ 
                              padding: '4px 12px', 
                              background: '#fef3c7', 
                              color: '#92400e',
                              borderRadius: '12px',
                              fontSize: '12px',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '4px'
                            }}>
                              <Clock className="w-3 h-3" />
                              Onay Bekliyor
                            </span>
                          </div>
                          <p style={{ color: '#718096', fontSize: '14px', marginBottom: '4px' }}>
                            TÜRSAB: {agency.tursabLicense}
                          </p>
                          <p style={{ color: '#718096', fontSize: '14px' }}>
                            Email: {agency.email}
                          </p>
                          <p style={{ color: '#718096', fontSize: '12px', marginTop: '8px' }}>
                            Kayıt: {new Date(agency.createdAt).toLocaleDateString('tr-TR')}
                          </p>
                        </div>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button
                            onClick={() => handleApprove(agency.id)}
                            style={{
                              padding: '8px 16px',
                              background: '#10b981',
                              color: 'white',
                              border: 'none',
                              borderRadius: '6px',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '4px',
                              fontSize: '14px'
                            }}
                          >
                            <CheckCircle className="w-4 h-4" />
                            Onayla
                          </button>
                          <button
                            onClick={() => handleReject(agency.id)}
                            style={{
                              padding: '8px 16px',
                              background: '#ef4444',
                              color: 'white',
                              border: 'none',
                              borderRadius: '6px',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '4px',
                              fontSize: '14px'
                            }}
                          >
                            <XCircle className="w-4 h-4" />
                            Reddet
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>

        <div className="card" style={{ marginTop: '30px' }}>
          <h2 style={{ fontSize: '20px', marginBottom: '16px', fontFamily: 'Manrope, sans-serif' }}>
            Onaylı Acenteler
          </h2>
          
          {agencies.filter(a => a.verified).length === 0 ? (
            <p style={{ color: '#718096', fontFamily: 'Inter, sans-serif' }}>
              Henüz onaylı acenta yok.
            </p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {agencies.filter(a => a.verified).map(agency => (
                <div 
                  key={agency.id}
                  style={{ 
                    padding: '16px', 
                    border: '1px solid #e2e8f0', 
                    borderRadius: '8px',
                    background: '#f0fdf4'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <Building2 className="w-4 h-4 text-[#10b981]" />
                    <h3 style={{ fontSize: '16px', fontWeight: '600' }}>
                      {agency.companyName}
                    </h3>
                    <span style={{ 
                      padding: '2px 8px', 
                      background: '#d1fae5', 
                      color: '#065f46',
                      borderRadius: '12px',
                      fontSize: '11px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}>
                      <CheckCircle className="w-3 h-3" />
                      Onaylı
                    </span>
                  </div>
                  <p style={{ color: '#718096', fontSize: '13px' }}>
                    TÜRSAB: {agency.tursabLicense} • {agency.email}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
        </div>
      </div>
    </div>
  )
}
