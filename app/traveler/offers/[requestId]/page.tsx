'use client'

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
  agencyId: string
  agency: {
    companyName: string
    tursabLicense: string
    email: string
    whatsapp: string
    website: string | null
  }
}

export default function TravelerOffersPage({ params }: { params: { requestId: string } }) {
  const [offers, setOffers] = useState<Offer[]>([])
  const [contactingAgency, setContactingAgency] = useState<string | null>(null)
  const [showRating, setShowRating] = useState<string | null>(null)
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState('')

  useEffect(() => {
    fetch(`/api/offers/${params.requestId}`)
      .then(res => res.json())
      .then(data => setOffers(data))
  }, [params.requestId])

  const handleContact = async (agencyId: string, agencyName: string) => {
    const travelerId = localStorage.getItem('travelerId')
    
    const res = await fetch('/api/traveler/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        requestId: params.requestId,
        agencyId,
        travelerId
      })
    })

    if (res.ok) {
      setContactingAgency(agencyId)
      alert(`Contact request sent to ${agencyName}! They will reach out to you shortly.`)
    }
  }

  const handleRating = async (agencyId: string) => {
    const travelerId = localStorage.getItem('travelerId')
    
    const res = await fetch('/api/traveler/rating', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        travelerId,
        agencyId,
        rating,
        comment
      })
    })

    if (res.ok) {
      alert('Thank you for your rating!')
      setShowRating(null)
      setComment('')
      setRating(5)
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f8f9fa' }}>
      <Navbar rightContent={
        <Link href="/traveler/dashboard" className="btn-secondary" style={{ textDecoration: 'none' }}>
          ← Back to Dashboard
        </Link>
      } />

      <div style={{ padding: '60px 20px' }}>
        <div className="container">
          <h1 style={{ fontSize: '36px', marginBottom: '10px', color: '#2d3748', fontFamily: 'Manrope, sans-serif' }}>Your Tour Offers</h1>
          <p style={{ color: '#718096', marginBottom: '40px', fontFamily: 'Inter, sans-serif' }}>
            Compare offers from verified Turkish travel agencies.
          </p>

        <div style={{ display: 'grid', gap: '24px' }}>
          {offers.map(offer => (
            <div key={offer.id} className="card">
              <div style={{ marginBottom: '24px' }}>
                <h2 style={{ fontSize: '24px', marginBottom: '12px', color: '#2d3748', fontFamily: 'Manrope, sans-serif' }}>{offer.packageTitle}</h2>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '8px' }}>
                  <span className="badge">Verified Agency</span>
                  <span className="badge" style={{ background: '#48bb78', color: 'white' }}>Featured Verified Agency</span>
                  <span style={{ color: '#718096', fontFamily: 'Inter, sans-serif' }}>{offer.agency.companyName}</span>
                </div>
                <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', fontSize: '14px', color: '#718096', fontFamily: 'Inter, sans-serif' }}>
                  <span>📋 TURSAB: {offer.agency.tursabLicense}</span>
                  <span>⏱️ Avg Response: 4.5 hours</span>
                  <span>⭐ 4.8 (127 ratings)</span>
                </div>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <h3 style={{ fontSize: '18px', marginBottom: '8px', color: '#2d3748', fontFamily: 'Manrope, sans-serif' }}>Description</h3>
                <p style={{ color: '#718096', whiteSpace: 'pre-line', fontFamily: 'Inter, sans-serif' }}>{offer.description}</p>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <h3 style={{ fontSize: '18px', marginBottom: '8px', color: '#2d3748', fontFamily: 'Manrope, sans-serif' }}>Included Services</h3>
                <p style={{ color: '#718096', whiteSpace: 'pre-line', fontFamily: 'Inter, sans-serif' }}>{offer.includedServices}</p>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <h3 style={{ fontSize: '18px', marginBottom: '8px', color: '#2d3748', fontFamily: 'Manrope, sans-serif' }}>Excluded Services</h3>
                <p style={{ color: '#718096', whiteSpace: 'pre-line', fontFamily: 'Inter, sans-serif' }}>{offer.excludedServices}</p>
              </div>

              {offer.notes && (
                <div style={{ marginBottom: '20px', padding: '16px', background: '#f7fafc', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
                  <h3 style={{ fontSize: '18px', marginBottom: '8px', color: '#2d3748', fontFamily: 'Manrope, sans-serif' }}>Additional Notes</h3>
                  <p style={{ color: '#718096', whiteSpace: 'pre-line', fontFamily: 'Inter, sans-serif' }}>{offer.notes}</p>
                </div>
              )}

              <div style={{ marginBottom: '24px', padding: '20px', background: '#c6f6d5', borderRadius: '6px' }}>
                <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#22543d' }}>{offer.price}</p>
              </div>

              <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '20px' }}>
                <h3 style={{ fontSize: '18px', marginBottom: '12px', color: '#48bb78' }}>✓ Interested in this offer?</h3>
                
                {contactingAgency === offer.agencyId ? (
                  <div>
                    <div style={{ padding: '16px', background: '#c6f6d5', color: '#22543d', borderRadius: '6px', marginBottom: '16px' }}>
                      ✓ Contact request sent! The agency will reach out to you via your preferred contact method.
                    </div>
                    
                    {showRating === offer.agencyId ? (
                      <div style={{ padding: '20px', background: '#f7fafc', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
                        <h4 style={{ marginBottom: '16px', color: '#2d3748' }}>Rate Your Experience</h4>
                        <div style={{ marginBottom: '16px' }}>
                          <label style={{ display: 'block', marginBottom: '8px' }}>Rating</label>
                          <div style={{ display: 'flex', gap: '8px' }}>
                            {[1, 2, 3, 4, 5].map(star => (
                              <button
                                key={star}
                                onClick={() => setRating(star)}
                                style={{
                                  fontSize: '32px',
                                  background: 'none',
                                  border: 'none',
                                  cursor: 'pointer',
                                  color: star <= rating ? '#ffc107' : '#e2e8f0'
                                }}
                              >
                                ★
                              </button>
                            ))}
                          </div>
                        </div>
                        <div style={{ marginBottom: '16px' }}>
                          <label style={{ display: 'block', marginBottom: '8px' }}>Comment (optional)</label>
                          <textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            rows={3}
                          />
                        </div>
                        <button
                          onClick={() => handleRating(offer.agencyId)}
                          className="btn btn-primary"
                        >
                          Submit Rating
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setShowRating(offer.agencyId)}
                        className="btn"
                        style={{ background: '#f7fafc', color: '#2d3748', border: '1px solid #e2e8f0' }}
                      >
                        Rate This Agency
                      </button>
                    )}
                  </div>
                ) : (
                  <button
                    onClick={() => handleContact(offer.agencyId, offer.agency.companyName)}
                    className="btn btn-primary"
                  >
                    Contact This Agency
                  </button>
                )}

                <div style={{ marginTop: '16px', padding: '12px', background: '#feebc8', borderRadius: '6px', border: '1px solid #ed8936' }}>
                  <p style={{ fontSize: '13px', color: '#744210', margin: 0 }}>
                    <strong>Important:</strong> TRTourPackage does not handle payments. All bookings and payments are made directly with the agency.
                  </p>
                </div>
              </div>
            </div>
          ))}

          {offers.length === 0 && (
            <div className="card" style={{ textAlign: 'center' }}>
              <p style={{ color: '#718096' }}>No offers available yet. Agencies have up to 24 hours to submit their offers.</p>
            </div>
          )}
        </div>
        </div>
      </div>
    </div>
  )
}
