import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { verifyPassword } from '@/lib/auth'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    const agency = await prisma.agency.findUnique({
      where: { email: body.email }
    })

    if (!agency) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    // Verify password using bcrypt
    const isValidPassword = await verifyPassword(body.password, agency.password)
    
    if (!isValidPassword) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    if (!agency.verified) {
      return NextResponse.json({ error: 'Your account is pending verification' }, { status: 403 })
    }

    return NextResponse.json({ success: true, agencyId: agency.id })
  } catch (error) {
    return NextResponse.json({ error: 'Login failed' }, { status: 500 })
  }
}
