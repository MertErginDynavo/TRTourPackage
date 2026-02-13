'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import { TrendingUp, Eye, FileText, MessageSquare, Clock, Award } from 'lucide-react'

export default function AgencyAnalytics() {
  const [analytics, setAnalytics] = useState({
    requestsViewed: 45,
    offersSubmitted: 38,
    offersCompared: 156,
    messagesReceived: 23,
    avgResponseTime: '4.5 hours',
    conversionRate: '84%',
    topDestinations: [
      { name: 'İstanbul & Kapadokya', count: 15 },
      { name: 'Antalya & Pamukkale', count: 12 },
      { name: 'Ege Turu', count: 11 }
    ],
    monthlyTrend: [
      { month: 'Ocak', requests: 12, offers: 10 },
      { month: 'Şubat', requests: 18, offers: 15 },
      { month: 'Mart', requests: 15, offers: 13 }
    ]
  })

  return (
    <div style={{ minHeight: '100vh', background: '#f8f9fa' }}>
      <Navbar showLanguageSelector={false} />
      
      <div style={{ padding: '60px 20px' }}>
        <div className="container">
          <Link href="/agency/dashboard" style={{ color: '#e53e3e', textDecoration: 'none', marginBottom: '20px', display: 'inline-block', fontFamily: 'Inter, sans-serif' }}>
            ← Panele Dön
          </Link>

          <div style={{ marginBottom: '40px' }}>
            <h1 style={{ fontSize: '36px', marginBottom: '8px', fontFamily: 'Manrope, sans-serif' }}>
              Analytics Dashboard
            </h1>
            <p style={{ color: '#718096', fontFamily: 'Inter, sans-serif' }}>
              Performansınızı takip edin ve optimize edin
            </p>
            <div style={{ display: 'inline-block', marginTop: '12px', padding: '6px 12px', background: '#f3e8ff', color: '#9f7aea', borderRadius: '6px', fontSize: '13px', fontWeight: '600' }}>
              Premium Özellik
            </div>
          </div>

          {/* Key Metrics */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginBottom: '40px' }}>
            <div className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '12px' }}>
                <div>
                  <div style={{ fontSize: '32px', fontWeight: '700', color: '#2d3748', fontFamily: 'Manrope, sans-serif' }}>
                    {analytics.requestsViewed}
                  </div>
                  <div style={{ fontSize: '14px', color: '#718096', fontFamily: 'Inter, sans-serif' }}>
                    Görüntülenen Talep
                  </div>
                </div>
                <Eye size={32} color="#4299e1" />
              </div>
              <div style={{ fontSize: '12px', color: '#48bb78', fontFamily: 'Inter, sans-serif' }}>
                ↑ 12% bu ay
              </div>
            </div>

            <div className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '12px' }}>
                <div>
                  <div style={{ fontSize: '32px', fontWeight: '700', color: '#2d3748', fontFamily: 'Manrope, sans-serif' }}>
                    {analytics.offersSubmitted}
                  </div>
                  <div style={{ fontSize: '14px', color: '#718096', fontFamily: 'Inter, sans-serif' }}>
                    Gönderilen Teklif
                  </div>
                </div>
                <FileText size={32} color="#48bb78" />
              </div>
              <div style={{ fontSize: '12px', color: '#48bb78', fontFamily: 'Inter, sans-serif' }}>
                ↑ 8% bu ay
              </div>
            </div>

            <div className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '12px' }}>
                <div>
                  <div style={{ fontSize: '32px', fontWeight: '700', color: '#2d3748', fontFamily: 'Manrope, sans-serif' }}>
                    {analytics.conversionRate}
                  </div>
                  <div style={{ fontSize: '14px', color: '#718096', fontFamily: 'Inter, sans-serif' }}>
                    Dönüşüm Oranı
                  </div>
                </div>
                <TrendingUp size={32} color="#9f7aea" />
              </div>
              <div style={{ fontSize: '12px', color: '#48bb78', fontFamily: 'Inter, sans-serif' }}>
                ↑ 5% bu ay
              </div>
            </div>
          </div>

          {/* Secondary Metrics */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginBottom: '40px' }}>
            <div className="card">
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                <Clock size={24} color="#e53e3e" />
                <div style={{ fontSize: '14px', color: '#718096', fontFamily: 'Inter, sans-serif' }}>
                  Ortalama Yanıt Süresi
                </div>
              </div>
              <div style={{ fontSize: '24px', fontWeight: '600', color: '#2d3748', fontFamily: 'Manrope, sans-serif' }}>
                {analytics.avgResponseTime}
              </div>
            </div>

            <div className="card">
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                <MessageSquare size={24} color="#e53e3e" />
                <div style={{ fontSize: '14px', color: '#718096', fontFamily: 'Inter, sans-serif' }}>
                  Alınan Mesaj
                </div>
              </div>
              <div style={{ fontSize: '24px', fontWeight: '600', color: '#2d3748', fontFamily: 'Manrope, sans-serif' }}>
                {analytics.messagesReceived}
              </div>
            </div>

            <div className="card">
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                <Award size={24} color="#e53e3e" />
                <div style={{ fontSize: '14px', color: '#718096', fontFamily: 'Inter, sans-serif' }}>
                  Karşılaştırma
                </div>
              </div>
              <div style={{ fontSize: '24px', fontWeight: '600', color: '#2d3748', fontFamily: 'Manrope, sans-serif' }}>
                {analytics.offersCompared}
              </div>
            </div>
          </div>

          {/* Top Destinations */}
          <div className="card" style={{ marginBottom: '40px' }}>
            <h2 style={{ fontSize: '20px', marginBottom: '20px', fontFamily: 'Manrope, sans-serif' }}>
              En Popüler Destinasyonlar
            </h2>
            <div style={{ display: 'grid', gap: '12px' }}>
              {analytics.topDestinations.map((dest, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: '#f8f9fa', borderRadius: '6px' }}>
                  <span style={{ fontFamily: 'Inter, sans-serif', color: '#2d3748' }}>{dest.name}</span>
                  <span style={{ fontWeight: '600', color: '#4299e1', fontFamily: 'Manrope, sans-serif' }}>{dest.count} teklif</span>
                </div>
              ))}
            </div>
          </div>

          {/* Monthly Trend */}
          <div className="card">
            <h2 style={{ fontSize: '20px', marginBottom: '20px', fontFamily: 'Manrope, sans-serif' }}>
              Aylık Trend
            </h2>
            <div style={{ display: 'grid', gap: '16px' }}>
              {analytics.monthlyTrend.map((month, i) => (
                <div key={i} style={{ padding: '16px', background: '#f8f9fa', borderRadius: '6px' }}>
                  <div style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px', fontFamily: 'Manrope, sans-serif' }}>
                    {month.month}
                  </div>
                  <div style={{ display: 'flex', gap: '24px', fontSize: '14px', color: '#718096', fontFamily: 'Inter, sans-serif' }}>
                    <span>Talep: {month.requests}</span>
                    <span>Teklif: {month.offers}</span>
                    <span>Oran: {Math.round((month.offers / month.requests) * 100)}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
