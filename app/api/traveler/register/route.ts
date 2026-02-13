import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    const existing = await prisma.traveler.findUnique({
      where: { email: body.email }
    })

    if (existing) {
      return NextResponse.json({ error: 'Email already registered' }, { status: 400 })
    }

    const traveler = await prisma.traveler.create({
      data: {
        name: body.name,
        email: body.email,
        password: body.password, // In production, hash with bcrypt
        country: body.country,
      }
    })

    return NextResponse.json({ success: true, travelerId: traveler.id }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Registration failed' }, { status: 500 })
  }
}
