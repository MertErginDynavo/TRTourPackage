'use client'

import React from 'react'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Plane } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import LanguageSelector from '@/components/LanguageSelector'

interface Request {
  id: string
  country: string
  travelDates: string
  numTravelers: number
  status: string
  createdAt: string
  _count: {
    offers: number
  }
}

export default function TravelerDashboard() {
  const { t } = useLanguage()
  const [requests, setRequests] = useState<Request[]>([])
  const [travelerName, setTravelerName] = useState('')

  useEffect(() => {
    const travelerId = localStorage.getItem('travelerId')
    
    fetch(`/api/traveler/info/${travelerId}`)
      .then(res => res.json())
      .then(data => setTravelerName(data.name))
    
    fetch(`/api/traveler/requests/${travelerId}`)
      .then(res => res.json())
      .then(data => setRequests(data))
  }, [])

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
            <button 
              onClick={() => {
                localStorage.removeItem('travelerId')
                window.location.href = '/'
              }}
              className="btn-secondary"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div style={{ padding: '60px 20px' }}>
        <div className="container">
          <div style={{ marginBottom: '40px' }}>
            <h1 style={{ fontSize: '32px', marginBottom: '8px', color: '#2d3748', fontFamily: 'Manrope, sans-serif' }}>
              {t.welcomeBack}, {travelerName}
            </h1>
            <p style={{ color: '#718096', fontFamily: 'Inter, sans-serif' }}>
              {t.compareOffers}
            </p>
          </div>

          <div style={{ marginBottom: '30px' }}>
            <Link href="/request" className="btn btn-primary" style={{ textDecoration: 'none' }}>
              + {t.requestNewTour}
            </Link>
          </div>

          <h2 style={{ fontSize: '24px', marginBottom: '20px', color: '#2d3748', fontFamily: 'Manrope, sans-serif' }}>
            {t.myRequests}
          </h2>

          {requests.length === 0 ? (
            <div className="card" style={{ textAlign: 'center', padding: '60px 20px' }}>
              <p style={{ fontSize: '18px', color: '#718096', marginBottom: '20px', fontFamily: 'Inter, sans-serif' }}>
                {t.noRequests}
              </p>
              <p style={{ fontSize: '14px', color: '#a0aec0', marginBottom: '30px', fontFamily: 'Inter, sans-serif' }}>
                {t.createFirstRequest}
              </p>
              <Link href="/request" className="btn btn-primary" style={{ textDecoration: 'none' }}>
                {t.requestNewTour}
              </Link>
            </div>
          ) : (
            <div style={{ display: 'grid', gap: '20px' }}>
              {requests.map(req => (
                <div key={req.id} className="card">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '16px' }}>
                    <div>
                      <h3 style={{ fontSize: '20px', marginBottom: '8px', color: '#2d3748', fontFamily: 'Manrope, sans-serif' }}>
                        {req.numTravelers} {t.numberOfTravelers}
                      </h3>
                      <p style={{ color: '#718096', fontFamily: 'Inter, sans-serif' }}>
                        {t.travelDates}: {req.travelDates}
                      </p>
                      <p style={{ color: '#a0aec0', fontSize: '14px', marginTop: '4px', fontFamily: 'Inter, sans-serif' }}>
                        {t.submitted}: {new Date(req.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      {req._count.offers > 0 ? (
                        <div>
                          <span className="badge" style={{ background: '#48bb78', fontSize: '16px', padding: '8px 16px' }}>
                            {req._count.offers} {t.offersReceived}
                          </span>
                          <Link 
                            href={`/traveler/offers/${req.id}`}
                            className="btn btn-primary"
                            style={{ textDecoration: 'none', marginTop: '12px', display: 'inline-block' }}
                          >
                            {t.viewDetails}
                          </Link>
                        </div>
                      ) : (
                        <div>
                          <span className="badge" style={{ background: '#ed8936' }}>
                            {t.noOffersYet}
                          </span>
                          <p style={{ fontSize: '13px', color: '#718096', marginTop: '8px', fontFamily: 'Inter, sans-serif' }}>
                            {t.agenciesReviewing}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
