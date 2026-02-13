'use client'

import React from 'react'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import { Star, MapPin, Phone, Mail, Globe, Award } from 'lucide-react'

export default function AgencyProfile() {
  const [agency, setAgency] = useState<any>(null)
  const [stats, setStats] = useState({
    totalOffers: 0,
    avgResponseTime: '4.5 hours',
    rating: 4.8,
    totalReviews: 127
  })

  useEffect(() => {
    const agencyId = localStorage.getItem('agencyId')
    
    fetch(`/api/agency/info/${agencyId}`)
      .then(res => res.json())
      .then(data => setAgency(data))
  }, [])

  if (!agency) {
    return <div style={{ minHeight: '100vh', background: '#f8f9fa' }}>Yükleniyor...</div>
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f8f9fa' }}>
      <Navbar showLanguageSelector={false} />
      
      <div style={{ padding: '60px 20px' }}>
        <div className="container" style={{ maxWidth: '900px' }}>
          <Link href="/agency/dashboard" style={{ color: '#e53e3e', textDecoration: 'none', marginBottom: '20px', display: 'inline-block', fontFamily: 'Inter, sans-serif' }}>
            ← Panele Dön
          </Link>

          {/* Profile Header */}
          <div className="card" style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '24px' }}>
              <div>
                <h1 style={{ fontSize: '32px', marginBottom: '8px', fontFamily: 'Manrope, sans-serif' }}>
                  {agency.companyName}
                </h1>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
                  <span className="badge" style={{ background: '#27ae60' }}>Doğrulanmış Acente</span>
                  <span className="badge" style={{ background: '#4299e1' }}>Featured Agency</span>
                </div>
              </div>
              <button className="btn" style={{ background: '#f8f9fa', color: '#333', border: '1px solid #ddd' }}>
                Profili Düzenle
              </button>
            </div>

            {/* Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', padding: '20px', background: '#f8f9fa', borderRadius: '8px' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '24px', fontWeight: '600', color: '#2d3748', fontFamily: 'Manrope, sans-serif' }}>
                  {stats.rating}
                </div>
                <div style={{ fontSize: '13px', color: '#718096', fontFamily: 'Inter, sans-serif' }}>
                  <Star size={14} style={{ display: 'inline', marginRight: '4px' }} />
                  Rating
                </div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '24px', fontWeight: '600', color: '#2d3748', fontFamily: 'Manrope, sans-serif' }}>
                  {stats.totalReviews}
                </div>
                <div style={{ fontSize: '13px', color: '#718096', fontFamily: 'Inter, sans-serif' }}>
                  Yorumlar
                </div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '24px', fontWeight: '600', color: '#2d3748', fontFamily: 'Manrope, sans-serif' }}>
                  {stats.avgResponseTime}
                </div>
                <div style={{ fontSize: '13px', color: '#718096', fontFamily: 'Inter, sans-serif' }}>
                  Ort. Yanıt
                </div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '24px', fontWeight: '600', color: '#2d3748', fontFamily: 'Manrope, sans-serif' }}>
                  {stats.totalOffers}
                </div>
                <div style={{ fontSize: '13px', color: '#718096', fontFamily: 'Inter, sans-serif' }}>
                  Teklif
                </div>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="card" style={{ marginBottom: '24px' }}>
            <h2 style={{ fontSize: '20px', marginBottom: '16px', fontFamily: 'Manrope, sans-serif' }}>
              İletişim Bilgileri
            </h2>
            <div style={{ display: 'grid', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#718096', fontFamily: 'Inter, sans-serif' }}>
                <Award size={20} color="#e53e3e" />
                <span><strong>TURSAB No:</strong> {agency.tursabLicense}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#718096', fontFamily: 'Inter, sans-serif' }}>
                <Mail size={20} color="#e53e3e" />
                <span>{agency.email}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#718096', fontFamily: 'Inter, sans-serif' }}>
                <Phone size={20} color="#e53e3e" />
                <span>{agency.whatsapp}</span>
              </div>
              {agency.website && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#718096', fontFamily: 'Inter, sans-serif' }}>
                  <Globe size={20} color="#e53e3e" />
                  <a href={agency.website} target="_blank" rel="noopener noreferrer" style={{ color: '#4299e1' }}>
                    {agency.website}
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Package Info */}
          <div className="card">
            <h2 style={{ fontSize: '20px', marginBottom: '16px', fontFamily: 'Manrope, sans-serif' }}>
              Mevcut Paket
            </h2>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', background: '#f0fdf4', borderRadius: '8px', border: '1px solid #48bb78' }}>
              <div>
                <div style={{ fontSize: '24px', fontWeight: '600', color: '#2d3748', fontFamily: 'Manrope, sans-serif' }}>
                  Pro Plan
                </div>
                <div style={{ fontSize: '14px', color: '#718096', fontFamily: 'Inter, sans-serif' }}>
                  Sınırsız talep • Featured rozeti • Gelişmiş özellikler
                </div>
              </div>
              <Link href="/agency/login" className="btn btn-primary" style={{ textDecoration: 'none' }}>
                Paketi Yükselt
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
