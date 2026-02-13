'use client'

import React from 'react'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'

interface Offer {
  id: string
  packageTitle: string
  description: string
  includedServices: string
  excludedServices: string
  price: string
  notes: string | null
  agency: {
    companyName: string
    tursabLicense: string
    email: string
    whatsapp: string
    website: string | null
  }
}

export default function OffersPage({ params }: { params: { requestId: string } }) {
  const [offers, setOffers] = useState<Offer[]>([])

  useEffect(() => {
    fetch(`/api/offers/${params.requestId}`)
      .then(res => res.json())
      .then(data => setOffers(data))
  }, [params.requestId])

  return (
    <div style={{ minHeight: '100vh', background: '#f8f9fa' }}>
      <Navbar />
      
      <div style={{ padding: '60px 20px' }}>
        <div className="container">
          <h1 style={{ fontSize: '36px', marginBottom: '10px', fontFamily: 'Manrope, sans-serif' }}>Your Tour Offers</h1>
          <p style={{ color: '#718096', marginBottom: '40px', fontFamily: 'Inter, sans-serif' }}>
            Compare offers from verified Turkish travel agencies and contact your preferred agency directly.
          </p>

        <div style={{ display: 'grid', gap: '24px' }}>
          {offers.map(offer => (
            <div key={offer.id} className="card">
              <div style={{ marginBottom: '24px' }}>
                <h2 style={{ fontSize: '24px', marginBottom: '12px', fontFamily: 'Manrope, sans-serif' }}>{offer.packageTitle}</h2>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '8px', flexWrap: 'wrap' }}>
                  <span className="badge">Verified Agency</span>
                  <span style={{ color: '#718096', fontFamily: 'Inter, sans-serif' }}>{offer.agency.companyName}</span>
                </div>
                <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', fontSize: '14px', color: '#718096', fontFamily: 'Inter, sans-serif' }}>
                  <span>📋 TURSAB: {offer.agency.tursabLicense}</span>
                  <span>⏱️ Avg Response: 4.5 hours</span>
                  <span>⭐ 4.8 (127 ratings)</span>
                </div>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <h3 style={{ fontSize: '18px', marginBottom: '8px', fontFamily: 'Manrope, sans-serif' }}>Description</h3>
                <p style={{ color: '#718096', whiteSpace: 'pre-line', fontFamily: 'Inter, sans-serif' }}>{offer.description}</p>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <h3 style={{ fontSize: '18px', marginBottom: '8px', fontFamily: 'Manrope, sans-serif' }}>Included Services</h3>
                <p style={{ color: '#718096', whiteSpace: 'pre-line', fontFamily: 'Inter, sans-serif' }}>{offer.includedServices}</p>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <h3 style={{ fontSize: '18px', marginBottom: '8px', fontFamily: 'Manrope, sans-serif' }}>Excluded Services</h3>
                <p style={{ color: '#718096', whiteSpace: 'pre-line', fontFamily: 'Inter, sans-serif' }}>{offer.excludedServices}</p>
              </div>

              {offer.notes && (
                <div style={{ marginBottom: '20px', padding: '16px', background: '#f7fafc', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
                  <h3 style={{ fontSize: '18px', marginBottom: '8px', fontFamily: 'Manrope, sans-serif' }}>Additional Notes</h3>
                  <p style={{ color: '#718096', whiteSpace: 'pre-line', fontFamily: 'Inter, sans-serif' }}>{offer.notes}</p>
                </div>
              )}

              <div style={{ marginBottom: '24px', padding: '20px', background: '#e8f5e9', borderRadius: '6px' }}>
                <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#27ae60' }}>{offer.price}</p>
              </div>

              <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '20px' }}>
                <h3 style={{ fontSize: '18px', marginBottom: '12px', color: '#48bb78', fontFamily: 'Manrope, sans-serif' }}>✓ Interested in this offer?</h3>
                <p style={{ fontSize: '14px', color: '#718096', marginBottom: '16px', fontFamily: 'Inter, sans-serif' }}>
                  Contact the agency directly via WhatsApp or Email to proceed with your booking.
                </p>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  <a 
                    href={`https://wa.me/${offer.agency.whatsapp.replace(/[^0-9]/g, '')}?text=Hello, I'm interested in your tour package: ${encodeURIComponent(offer.packageTitle)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                    style={{ textDecoration: 'none' }}
                  >
                    📱 Contact via WhatsApp
                  </a>
                  <a 
                    href={`mailto:${offer.agency.email}?subject=Tour Inquiry: ${encodeURIComponent(offer.packageTitle)}`}
                    className="btn"
                    style={{ textDecoration: 'none', background: '#f8f9fa', color: '#333', border: '1px solid #ddd' }}
                  >
                    📧 Contact via Email
                  </a>
                  {offer.agency.website && (
                    <a 
                      href={offer.agency.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn"
                      style={{ textDecoration: 'none', background: '#f8f9fa', color: '#333', border: '1px solid #ddd' }}
                    >
                      🌐 Visit Website
                    </a>
                  )}
                </div>
                <div style={{ marginTop: '16px', padding: '12px', background: '#fff3cd', borderRadius: '6px', border: '1px solid #ffc107' }}>
                  <p style={{ fontSize: '13px', color: '#856404', margin: 0 }}>
                    <strong>Important:</strong> TRTourPackage does not handle payments. All bookings and payments are made directly with the agency.
                  </p>
                </div>
              </div>
            </div>
          ))}

          {offers.length === 0 && (
            <div className="card" style={{ textAlign: 'center' }}>
              <p style={{ color: '#718096', fontFamily: 'Inter, sans-serif' }}>No offers available yet. Agencies have up to 24 hours to submit their offers.</p>
            </div>
          )}
        </div>
        </div>
      </div>
    </div>
  )
}
