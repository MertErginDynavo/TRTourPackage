// Cloudinary upload utility
// Uses Cloudinary Upload API with unsigned uploads

export interface CloudinaryUploadResult {
  secure_url: string
  public_id: string
  width: number
  height: number
  format: string
}

export async function uploadToCloudinary(
  file: File,
  folder: string = 'trtourpackage'
): Promise<CloudinaryUploadResult> {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET

  if (!cloudName || !uploadPreset) {
    throw new Error('Cloudinary configuration missing')
  }

  const formData = new FormData()
  formData.append('file', file)
  formData.append('upload_preset', uploadPreset)
  formData.append('folder', folder)

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    {
      method: 'POST',
      body: formData,
    }
  )

  if (!response.ok) {
    throw new Error('Failed to upload image')
  }

  return response.json()
}

export async function deleteFromCloudinary(publicId: string): Promise<void> {
  // Note: Deletion requires signed requests (backend only)
  // For now, we'll keep images in Cloudinary
  // In production, implement backend deletion endpoint
  console.log('Delete image:', publicId)
}

// Image validation
export function validateImage(file: File): { valid: boolean; error?: string } {
  const maxSize = 5 * 1024 * 1024 // 5MB
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg']

  if (!allowedTypes.includes(file.type)) {
    return { valid: false, error: 'Only JPEG, PNG, and WebP images are allowed' }
  }

  if (file.size > maxSize) {
    return { valid: false, error: 'Image size must be less than 5MB' }
  }

  return { valid: true }
}

// Generate optimized image URL
export function getOptimizedImageUrl(
  url: string,
  options: {
    width?: number
    height?: number
    quality?: number
    format?: 'auto' | 'jpg' | 'png' | 'webp'
  } = {}
): string {
  if (!url || !url.includes('cloudinary.com')) {
    return url
  }

  const { width, height, quality = 80, format = 'auto' } = options

  // Insert transformations into Cloudinary URL
  const transformations = []
  if (width) transformations.push(`w_${width}`)
  if (height) transformations.push(`h_${height}`)
  transformations.push(`q_${quality}`)
  transformations.push(`f_${format}`)

  const transformation = transformations.join(',')
  return url.replace('/upload/', `/upload/${transformation}/`)
}
