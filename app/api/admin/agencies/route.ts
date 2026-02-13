import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // Check if email already exists
    const existing = await prisma.agency.findUnique({
      where: { email: body.email }
    })

    if (existing) {
      return NextResponse.json({ error: 'Email already exists' }, { status: 400 })
    }

    // Create agency with verified status
    const agency = await prisma.agency.create({
      data: {
        companyName: body.companyName,
        tursabLicense: body.tursabLicense,
        address: body.address,
        email: body.email,
        password: body.password, // In production, hash with bcrypt
        whatsapp: body.whatsapp,
        website: body.website || null,
        verified: true, // Auto-verified by admin
      }
    })

    return NextResponse.json({ success: true, agencyId: agency.id }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create agency' }, { status: 500 })
  }
}

export async function GET() {
  try {
    const agencies = await prisma.agency.findMany({
      select: {
        id: true,
        companyName: true,
        tursabLicense: true,
        email: true,
        verified: true,
        createdAt: true,
      },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json(agencies)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch agencies' }, { status: 500 })
  }
}
