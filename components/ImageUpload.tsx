'use client'

import React from 'react'
import { useState } from 'react'
import { Upload, X, Image as ImageIcon } from 'lucide-react'
import { uploadToCloudinary, validateImage } from '@/lib/cloudinary'

interface ImageUploadProps {
  onUpload: (url: string) => void
  currentImage?: string
  folder?: string
  label?: string
  maxSize?: number
}

export default function ImageUpload({
  onUpload,
  currentImage,
  folder = 'trtourpackage',
  label = 'Upload Image',
  maxSize = 5
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState<string | null>(currentImage || null)
  const [error, setError] = useState<string | null>(null)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setError(null)

    // Validate image
    const validation = validateImage(file)
    if (!validation.valid) {
      setError(validation.error || 'Invalid image')
      return
    }

    // Show preview
    const reader = new FileReader()
    reader.onloadend = () => {
      setPreview(reader.result as string)
    }
    reader.readAsDataURL(file)

    // Upload to Cloudinary
    setUploading(true)
    try {
      const result = await uploadToCloudinary(file, folder)
      onUpload(result.secure_url)
    } catch (error) {
      console.error('Upload error:', error)
      setError('Failed to upload image. Please try again.')
      setPreview(currentImage || null)
    } finally {
      setUploading(false)
    }
  }

  const handleRemove = () => {
    setPreview(null)
    onUpload('')
  }

  return (
    <div>
      <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontFamily: 'Manrope, sans-serif' }}>
        {label}
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

      {preview ? (
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <img
            src={preview}
            alt="Preview"
            style={{
              width: '200px',
              height: '200px',
              objectFit: 'cover',
              borderRadius: '8px',
              border: '2px solid #e2e8f0'
            }}
          />
          <button
            type="button"
            onClick={handleRemove}
            style={{
              position: 'absolute',
              top: '8px',
              right: '8px',
              background: '#e53e3e',
              color: 'white',
              border: 'none',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
            }}
          >
            <X size={18} />
          </button>
        </div>
      ) : (
        <label
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '200px',
            height: '200px',
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
            onChange={handleFileChange}
            disabled={uploading}
            style={{ display: 'none' }}
          />
          {uploading ? (
            <>
              <div style={{ 
                width: '40px', 
                height: '40px', 
                border: '3px solid #e2e8f0',
                borderTop: '3px solid #e53e3e',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite'
              }} />
              <p style={{ marginTop: '12px', color: '#718096', fontSize: '14px', fontFamily: 'Inter, sans-serif' }}>
                Uploading...
              </p>
            </>
          ) : (
            <>
              <Upload size={40} color="#cbd5e0" />
              <p style={{ marginTop: '12px', color: '#718096', fontSize: '14px', fontFamily: 'Inter, sans-serif' }}>
                Click to upload
              </p>
              <p style={{ marginTop: '4px', color: '#a0aec0', fontSize: '12px', fontFamily: 'Inter, sans-serif' }}>
                Max {maxSize}MB
              </p>
            </>
          )}
        </label>
      )}

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}
