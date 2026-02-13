'use client'

import { useState } from 'react'
import Navbar from '@/components/Navbar'

export default function AdminAgencies() {
  const [showForm, setShowForm] = useState(false)
  const [success, setSuccess] = useState('')

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
      <Navbar />
      
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
          <h2 style={{ fontSize: '20px', marginBottom: '16px', fontFamily: 'Manrope, sans-serif' }}>Mevcut Acenteler</h2>
          <p style={{ color: '#718096', fontFamily: 'Inter, sans-serif' }}>Acenta listesi burada görüntülenecek...</p>
        </div>
        </div>
      </div>
    </div>
  )
}
