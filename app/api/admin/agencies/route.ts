import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

// GET - List all agencies
export async function GET() {
  try {
    const agencies = await prisma.agency.findMany({
      orderBy: [
        { verified: 'asc' }, // Unverified first
        { createdAt: 'desc' }
      ],
      select: {
        id: true,
        companyName: true,
        tursabLicense: true,
        email: true,
        verified: true,
        createdAt: true,
      }
    })

    return NextResponse.json(agencies)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch agencies' }, { status: 500 })
  }
}

// POST - Create new agency (admin only)
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

// PATCH - Approve or reject agency
export async function PATCH(request: Request) {
  try {
    const body = await request.json()
    const { agencyId, action } = body

    if (action === 'approve') {
      // Approve agency
      const agency = await prisma.agency.update({
        where: { id: agencyId },
        data: { verified: true }
      })

      // TODO: Send approval email to agency
      console.log('📧 Agency approved email:')
      console.log(`To: ${agency.email}`)
      console.log('Subject: Your Agency Has Been Approved!')

      return NextResponse.json({ success: true, agency })
    } else if (action === 'reject') {
      // Get agency email before deletion
      const agency = await prisma.agency.findUnique({
        where: { id: agencyId }
      })

      // Delete rejected agency
      await prisma.agency.delete({
        where: { id: agencyId }
      })

      // TODO: Send rejection email
      console.log('📧 Agency rejected email:')
      console.log(`To: ${agency?.email}`)
      console.log('Subject: Agency Registration Rejected')

      return NextResponse.json({ success: true })
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update agency' }, { status: 500 })
  }
}
