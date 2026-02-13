'use client'

import React from 'react'
import { useState } from 'react'
import { Upload, X } from 'lucide-react'
import { uploadToCloudinary, validateImage } from '@/lib/cloudinary'

interface MultiImageUploadProps {
  onUpload: (urls: string[]) => void
  currentImages?: string[]
  folder?: string
  label?: string
  maxImages?: number
}

export default function MultiImageUpload({
  onUpload,
  currentImages = [],
  folder = 'trtourpackage/offers',
  label = 'Upload Images',
  maxImages = 5
}: MultiImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [images, setImages] = useState<string[]>(currentImages)
  const [error, setError] = useState<string | null>(null)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length === 0) return

    if (images.length + files.length > maxImages) {
      setError(`Maximum ${maxImages} images allowed`)
      return
    }

    setError(null)
    setUploading(true)

    try {
      const uploadPromises = files.map(async (file) => {
        const validation = validateImage(file)
        if (!validation.valid) {
          throw new Error(validation.error)
        }
        const result = await uploadToCloudinary(file, folder)
        return result.secure_url
      })

      const urls = await Promise.all(uploadPromises)
      const newImages = [...images, ...urls]
      setImages(newImages)
      onUpload(newImages)
    } catch (error: any) {
      console.error('Upload error:', error)
      setError(error.message || 'Failed to upload images')
    } finally {
      setUploading(false)
    }
  }

  const handleRemove = (index: number) => {
    const newImages = images.filter((_, i) => i !== index)
    setImages(newImages)
    onUpload(newImages)
  }

  return (
    <div>
      <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontFamily: 'Manrope, sans-serif' }}>
        {label} ({images.length}/{maxImages})
      </label>

      {error && (
        <div style={{ 
          padding: '12px', 
          background: '#fee', 
          color: '#c00', 
          borderRadius: '6px', 
          marginBottom: '12px',
          fontSize: '14px',
          fontFamily: 'Inter, sans-serif'
        }}>
          {error}
        </div>
      )}

      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        {images.map((url, index) => (
          <div key={index} style={{ position: 'relative' }}>
            <img
              src={url}
              alt={`Image ${index + 1}`}
              style={{
                width: '120px',
                height: '120px',
                objectFit: 'cover',
                borderRadius: '8px',
                border: '2px solid #e2e8f0'
              }}
            />
            <button
              type="button"
              onClick={() => handleRemove(index)}
              style={{
                position: 'absolute',
                top: '4px',
                right: '4px',
                background: '#e53e3e',
                color: 'white',
                border: 'none',
                borderRadius: '50%',
                width: '24px',
                height: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
              }}
            >
              <X size={14} />
            </button>
          </div>
        ))}

        {images.length < maxImages && (
          <label
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              width: '120px',
              height: '120px',
              border: '2px dashed #cbd5e0',
              borderRadius: '8px',
              cursor: uploading ? 'not-allowed' : 'pointer',
              background: '#f8f9fa',
              transition: 'all 0.2s'
            }}
          >
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp,image/jpg"
              multiple
              onChange={handleFileChange}
              disabled={uploading}
              style={{ display: 'none' }}
            />
            {uploading ? (
              <div style={{ 
                width: '30px', 
                height: '30px', 
                border: '3px solid #e2e8f0',
                borderTop: '3px solid #e53e3e',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite'
              }} />
            ) : (
              <>
                <Upload size={30} color="#cbd5e0" />
                <p style={{ marginTop: '8px', color: '#a0aec0', fontSize: '11px', fontFamily: 'Inter, sans-serif', textAlign: 'center' }}>
                  Add
                </p>
              </>
            )}
          </label>
        )}
      </div>

      <p style={{ fontSize: '12px', color: '#718096', marginTop: '8px', fontFamily: 'Inter, sans-serif' }}>
        Upload up to {maxImages} images (max 5MB each)
      </p>

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}
