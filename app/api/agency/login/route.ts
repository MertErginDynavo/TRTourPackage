import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    const agency = await prisma.agency.findUnique({
      where: { email: body.email }
    })

    if (!agency) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    // Check password (plain text for demo - use bcrypt in production)
    if (agency.password !== body.password) {
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
