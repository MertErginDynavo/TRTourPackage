// Simple password hashing utility
// For production, consider using bcrypt or argon2

export async function hashPassword(password: string): Promise<string> {
  // For demo purposes, we're using a simple hash
  // In production, use bcrypt: npm install bcrypt
  // import bcrypt from 'bcrypt'
  // return await bcrypt.hash(password, 10)
  
  // Simple hash for demo (NOT SECURE for production)
  const encoder = new TextEncoder()
  const data = encoder.encode(password)
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  // For production with bcrypt:
  // return await bcrypt.compare(password, hashedPassword)
  
  const hash = await hashPassword(password)
  return hash === hashedPassword
}

// Note: This is a basic implementation for demo purposes
// For production, install and use bcrypt:
// npm install bcrypt @types/bcrypt
