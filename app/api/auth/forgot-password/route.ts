import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { sendEmail } from '@/lib/notifications'
import crypto from 'crypto'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, userType } = body // userType: 'traveler' or 'agency'

    if (!email || !userType) {
      return NextResponse.json({ error: 'Email and user type required' }, { status: 400 })
    }

    // Check if user exists
    let userExists = false
    if (userType === 'traveler') {
      const traveler = await prisma.traveler.findUnique({ where: { email } })
      userExists = !!traveler
    } else if (userType === 'agency') {
      const agency = await prisma.agency.findUnique({ where: { email } })
      userExists = !!agency
    }

    if (!userExists) {
      // Don't reveal if email exists or not (security)
      return NextResponse.json({ 
        message: 'If an account exists with this email, you will receive a password reset link.' 
      })
    }

    // Generate reset token
    const token = crypto.randomBytes(32).toString('hex')
    const expiresAt = new Date(Date.now() + 3600000) // 1 hour from now

    // Save reset token
    await prisma.passwordReset.create({
      data: {
        email,
        token,
        userType,
        expiresAt,
        used: false
      }
    })

    // Send reset email
    const resetLink = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/reset-password?token=${token}`
    
    await sendEmail({
      to: email,
      subject: '🔐 Password Reset Request - TRTourPackage',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #e53e3e;">Password Reset Request</h1>
          <p>You requested to reset your password for your TRTourPackage account.</p>
          <p>Click the button below to reset your password:</p>
          <p>
            <a href="${resetLink}" 
               style="background: #e53e3e; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
              Reset Password
            </a>
          </p>
          <p style="color: #718096; font-size: 14px;">
            This link will expire in 1 hour.
          </p>
          <p style="color: #718096; font-size: 14px;">
            If you didn't request this, please ignore this email.
          </p>
          <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0;">
          <p style="color: #a0aec0; font-size: 12px;">
            Or copy and paste this link: ${resetLink}
          </p>
        </div>
      `
    })

    return NextResponse.json({ 
      message: 'If an account exists with this email, you will receive a password reset link.' 
    })
  } catch (error) {
    console.error('Forgot password error:', error)
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 })
  }
}
