import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { hashPassword } from '@/lib/auth'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { token, newPassword } = body

    if (!token || !newPassword) {
      return NextResponse.json({ error: 'Token and new password required' }, { status: 400 })
    }

    // Validate password length
    if (newPassword.length < 6) {
      return NextResponse.json({ error: 'Password must be at least 6 characters' }, { status: 400 })
    }

    // Find reset token
    const resetToken = await prisma.passwordReset.findUnique({
      where: { token }
    })

    if (!resetToken) {
      return NextResponse.json({ error: 'Invalid or expired reset token' }, { status: 400 })
    }

    // Check if token is expired
    if (new Date() > resetToken.expiresAt) {
      return NextResponse.json({ error: 'Reset token has expired' }, { status: 400 })
    }

    // Check if token was already used
    if (resetToken.used) {
      return NextResponse.json({ error: 'Reset token has already been used' }, { status: 400 })
    }

    // Hash new password
    const hashedPassword = await hashPassword(newPassword)

    // Update password based on user type
    if (resetToken.userType === 'traveler') {
      await prisma.traveler.update({
        where: { email: resetToken.email },
        data: { password: hashedPassword }
      })
    } else if (resetToken.userType === 'agency') {
      await prisma.agency.update({
        where: { email: resetToken.email },
        data: { password: hashedPassword }
      })
    }

    // Mark token as used
    await prisma.passwordReset.update({
      where: { token },
      data: { used: true }
    })

    return NextResponse.json({ 
      message: 'Password reset successful',
      userType: resetToken.userType 
    })
  } catch (error) {
    console.error('Reset password error:', error)
    return NextResponse.json({ error: 'Failed to reset password' }, { status: 500 })
  }
}

// GET - Verify token validity
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const token = searchParams.get('token')

    if (!token) {
      return NextResponse.json({ valid: false, error: 'Token required' }, { status: 400 })
    }

    const resetToken = await prisma.passwordReset.findUnique({
      where: { token }
    })

    if (!resetToken) {
      return NextResponse.json({ valid: false, error: 'Invalid token' })
    }

    if (new Date() > resetToken.expiresAt) {
      return NextResponse.json({ valid: false, error: 'Token expired' })
    }

    if (resetToken.used) {
      return NextResponse.json({ valid: false, error: 'Token already used' })
    }

    return NextResponse.json({ 
      valid: true, 
      email: resetToken.email,
      userType: resetToken.userType 
    })
  } catch (error) {
    console.error('Verify token error:', error)
    return NextResponse.json({ valid: false, error: 'Failed to verify token' }, { status: 500 })
  }
}
