import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // In production, compare hashed password with bcrypt
    const agency = await prisma.agency.findUnique({
      where: { email: body.email }
    })

    if (!agency) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    if (!agency.verified) {
      return NextResponse.json({ error: 'Your account is pending verification' }, { status: 403 })
    }

    // In production, verify password hash here
    // For now, we'll just return success
    return NextResponse.json({ success: true, agencyId: agency.id })
  } catch (error) {
    return NextResponse.json({ error: 'Login failed' }, { status: 500 })
  }
}
