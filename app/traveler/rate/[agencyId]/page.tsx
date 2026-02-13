'use client'

import React from 'react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/Navbar'
import { Star } from 'lucide-react'

export default function RateAgencyPage({ params }: { params: { agencyId: string } }) {
  const router = useRouter()
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [comment, setComment] = useState('')
  const [loading, setLoading] = useState(false)
  const [agencyInfo, setAgencyInfo] = useState<any>(null)
  const [existingRating, setExistingRating] = useState<any>(null)

  useEffect(() => {
    // Get agency info
    fetch(`/api/agency/info/${params.agencyId}`)
      .then(res => res.json())
      .then(data => setAgencyInfo(data))

    // Check if user already rated this agency
    const travelerId = localStorage.getItem('travelerId')
    if (travelerId) {
      fetch(`/api/traveler/rating?travelerId=${travelerId}&agencyId=${params.agencyId}`)
        .then(res => res.json())
        .then(data => {
          if (data) {
            setExistingRating(data)
            setRating(data.rating)
            setComment(data.comment || '')
          }
        })
    }
  }, [params.agencyId])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const travelerId = localStorage.getItem('travelerId')
    if (!travelerId) {
      alert('Please login to rate agencies')
      router.push('/traveler/login')
      return
    }

    if (rating === 0) {
      alert('Please select a rating')
      setLoading(false)
      return
    }

    try {
      const response = await fetch('/api/traveler/rating', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          travelerId,
          agencyId: params.agencyId,
          rating,
          comment
        })
      })

      if (response.ok) {
        alert(existingRating ? 'Rating updated successfully!' : 'Rating submitted successfully!')
        router.push('/traveler/dashboard')
      } else {
        alert('Failed to submit rating')
      }
    } catch (error) {
      console.error('Rating error:', error)
      alert('Failed to submit rating')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f8f9fa' }}>
      <Navbar />
      
      <div style={{ padding: '60px 20px' }}>
        <div className="container" style={{ maxWidth: '600px' }}>
          <h1 style={{ fontSize: '36px', marginBottom: '10px', fontFamily: 'Manrope, sans-serif' }}>
            {existingRating ? 'Update Your Rating' : 'Rate Your Experience'}
          </h1>
          <p style={{ color: '#718096', marginBottom: '40px', fontFamily: 'Inter, sans-serif' }}>
            Share your experience with {agencyInfo?.companyName || 'this agency'}
          </p>

          <form onSubmit={handleSubmit}>
            <div className="card">
              {agencyInfo && (
                <div style={{ marginBottom: '30px', padding: '20px', background: '#f8f9fa', borderRadius: '8px' }}>
                  <h3 style={{ fontSize: '20px', marginBottom: '8px', fontFamily: 'Manrope, sans-serif' }}>
                    {agencyInfo.companyName}
                  </h3>
                  <p style={{ fontSize: '14px', color: '#718096', fontFamily: 'Inter, sans-serif' }}>
                    TURSAB License: {agencyInfo.tursabLicense}
                  </p>
                </div>
              )}

              <div style={{ marginBottom: '30px' }}>
                <label style={{ display: 'block', marginBottom: '12px', fontWeight: '600', fontFamily: 'Manrope, sans-serif' }}>
                  Your Rating
                </label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        padding: '4px',
                        transition: 'transform 0.2s'
                      }}
                    >
                      <Star
                        size={40}
                        fill={(hoverRating || rating) >= star ? '#fbbf24' : 'none'}
                        color={(hoverRating || rating) >= star ? '#fbbf24' : '#cbd5e0'}
                        style={{ transition: 'all 0.2s' }}
                      />
                    </button>
                  ))}
                </div>
                <p style={{ fontSize: '14px', color: '#718096', marginTop: '8px', fontFamily: 'Inter, sans-serif' }}>
                  {rating === 0 && 'Click to rate'}
                  {rating === 1 && '⭐ Poor'}
                  {rating === 2 && '⭐⭐ Fair'}
                  {rating === 3 && '⭐⭐⭐ Good'}
                  {rating === 4 && '⭐⭐⭐⭐ Very Good'}
                  {rating === 5 && '⭐⭐⭐⭐⭐ Excellent'}
                </p>
              </div>

              <div style={{ marginBottom: '30px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontFamily: 'Manrope, sans-serif' }}>
                  Your Review (Optional)
                </label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Share your experience with this agency..."
                  rows={6}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #e2e8f0',
                    borderRadius: '6px',
                    fontSize: '14px',
                    fontFamily: 'Inter, sans-serif',
                    resize: 'vertical'
                  }}
                />
              </div>

              <button
                type="submit"
                disabled={loading || rating === 0}
                className="btn btn-primary"
                style={{ width: '100%' }}
              >
                {loading ? 'Submitting...' : existingRating ? 'Update Rating' : 'Submit Rating'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
