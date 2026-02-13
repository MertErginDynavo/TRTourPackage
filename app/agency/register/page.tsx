'use client'

import React from 'react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Plane, Building2, FileCheck, Mail, Lock, Phone, Globe, MapPin } from 'lucide-react'

export default function AgencyRegister() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    companyName: '',
    tursabLicense: '',
    address: '',
    email: '',
    password: '',
    confirmPassword: '',
    whatsapp: '',
    website: '',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Şifreler eşleşmiyor')
      return
    }

    if (formData.password.length < 6) {
      setError('Şifre en az 6 karakter olmalıdır')
      return
    }

    if (!formData.tursabLicense.match(/^[A-Z]-\d{4,5}$/)) {
      setError('Geçersiz TÜRSAB lisans formatı (örn: A-1234)')
      return
    }

    setLoading(true)

    try {
      const response = await fetch('/api/agency/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          companyName: formData.companyName,
          tursabLicense: formData.tursabLicense,
          address: formData.address,
          email: formData.email,
          password: formData.password,
          whatsapp: formData.whatsapp,
          website: formData.website || null,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        router.push('/verification?type=agency')
      } else {
        setError(data.error || 'Kayıt başarısız')
      }
    } catch (err) {
      setError('Kayıt başarısız')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', background: '#f8f9fa' }}>
      <div style={{ maxWidth: '600px', width: '100%' }}>
        {/* Header */}
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
          <h1 style={{ fontSize: '28px', marginTop: '20px', marginBottom: '8px', color: '#2d3748', fontFamily: 'Manrope, sans-serif' }}>
            Acente Kaydı
          </h1>
          <p style={{ color: '#718096', fontFamily: 'Inter, sans-serif' }}>
            Platformumuza katılın ve dünya çapında gezginlerle bağlantı kurun
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ background: 'white', padding: '32px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
          {error && (
            <div style={{ padding: '12px', background: '#f8d7da', color: '#721c24', borderRadius: '6px', marginBottom: '20px', fontSize: '14px' }}>
              {error}
            </div>
          )}

          {/* Company Name */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', fontFamily: 'Manrope, sans-serif' }}>
              Şirket Adı *
            </label>
            <input
              type="text"
              required
              value={formData.companyName}
              onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
              placeholder="Acente Adınız"
              style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '6px', fontSize: '16px', fontFamily: 'Inter, sans-serif' }}
            />
          </div>

          {/* TÜRSAB License */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', fontFamily: 'Manrope, sans-serif' }}>
              TÜRSAB Lisans No *
            </label>
            <input
              type="text"
              required
              value={formData.tursabLicense}
              onChange={(e) => setFormData({ ...formData, tursabLicense: e.target.value.toUpperCase() })}
              placeholder="A-1234"
              style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '6px', fontSize: '16px', fontFamily: 'Inter, sans-serif' }}
            />
            <p style={{ marginTop: '4px', fontSize: '12px', color: '#718096', fontFamily: 'Inter, sans-serif' }}>
              Format: A-1234 veya B-12345
            </p>
          </div>

          {/* Address */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', fontFamily: 'Manrope, sans-serif' }}>
              Adres *
            </label>
            <textarea
              required
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              rows={3}
              placeholder="Türkiye'deki tam iş adresi"
              style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '6px', fontSize: '16px', fontFamily: 'Inter, sans-serif', resize: 'vertical' }}
            />
          </div>

          {/* Email */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', fontFamily: 'Manrope, sans-serif' }}>
              E-posta *
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="acente@example.com"
              style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '6px', fontSize: '16px', fontFamily: 'Inter, sans-serif' }}
            />
          </div>

          {/* WhatsApp */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', fontFamily: 'Manrope, sans-serif' }}>
              WhatsApp *
            </label>
            <input
              type="tel"
              required
              value={formData.whatsapp}
              onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
              placeholder="+90 555 123 4567"
              style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '6px', fontSize: '16px', fontFamily: 'Inter, sans-serif' }}
            />
          </div>

          {/* Website */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', fontFamily: 'Manrope, sans-serif' }}>
              Website (Opsiyonel)
            </label>
            <input
              type="url"
              value={formData.website}
              onChange={(e) => setFormData({ ...formData, website: e.target.value })}
              placeholder="https://example.com"
              style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '6px', fontSize: '16px', fontFamily: 'Inter, sans-serif' }}
            />
          </div>

          {/* Password */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', fontFamily: 'Manrope, sans-serif' }}>
              Şifre *
            </label>
            <input
              type="password"
              required
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="••••••••"
              style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '6px', fontSize: '16px', fontFamily: 'Inter, sans-serif' }}
            />
          </div>

          {/* Confirm Password */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', fontFamily: 'Manrope, sans-serif' }}>
              Şifre Tekrar *
            </label>
            <input
              type="password"
              required
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              placeholder="••••••••"
              style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '6px', fontSize: '16px', fontFamily: 'Inter, sans-serif' }}
            />
          </div>

          {/* Info Box */}
          <div style={{ marginBottom: '20px', padding: '12px', background: '#e6f7ff', borderRadius: '6px', border: '1px solid #91d5ff' }}>
            <p style={{ fontSize: '13px', color: '#0050b3', margin: 0, lineHeight: '1.6', fontFamily: 'Inter, sans-serif' }}>
              Kaydınız ekibimiz tarafından incelenecektir. Onaylandığında e-posta alacaksınız (genellikle 24-48 saat içinde).
            </p>
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            disabled={loading}
            className="btn btn-primary" 
            style={{ width: '100%' }}
          >
            {loading ? 'Gönderiliyor...' : 'Kayıt Ol'}
          </button>

          {/* KVKK & Privacy */}
          <div style={{ marginTop: '16px', padding: '12px', background: '#f7fafc', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
            <p style={{ fontSize: '13px', color: '#718096', margin: 0, lineHeight: '1.6', fontFamily: 'Inter, sans-serif' }}>
              Kayıt olarak <Link href="/kvkk" style={{ color: '#4299e1', textDecoration: 'underline' }}>KVKK Aydınlatma Metni</Link>, <Link href="/privacy" style={{ color: '#4299e1', textDecoration: 'underline' }}>Gizlilik Politikası</Link> ve <Link href="/terms" style={{ color: '#4299e1', textDecoration: 'underline' }}>Kullanım Koşulları</Link>'nı kabul etmiş olursunuz.
            </p>
          </div>

          {/* Login Link */}
          <p style={{ textAlign: 'center', color: '#718096', fontSize: '14px', marginTop: '20px', fontFamily: 'Inter, sans-serif' }}>
            Zaten hesabınız var mı? <Link href="/agency/login" style={{ color: '#e53e3e', textDecoration: 'none' }}>Giriş Yapın</Link>
          </p>
        </form>
      </div>
    </div>
  )
}
