import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { hashPassword } from '@/lib/auth'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // Check if email already exists
    const existingEmail = await prisma.agency.findUnique({
      where: { email: body.email }
    })

    if (existingEmail) {
      return NextResponse.json({ error: 'Email already registered' }, { status: 400 })
    }

    // Check if TÜRSAB license already exists
    const existingLicense = await prisma.agency.findUnique({
      where: { tursabLicense: body.tursabLicense }
    })

    if (existingLicense) {
      return NextResponse.json({ error: 'TÜRSAB license already registered' }, { status: 400 })
    }

    // Validate TÜRSAB license format (A-1234 or B-12345)
    if (!body.tursabLicense.match(/^[A-Z]-\d{4,5}$/)) {
      return NextResponse.json({ error: 'Invalid TÜRSAB license format' }, { status: 400 })
    }

    // Hash password before storing
    const hashedPassword = await hashPassword(body.password)

    // Create agency with verified=false (pending admin approval)
    const agency = await prisma.agency.create({
      data: {
        companyName: body.companyName,
        tursabLicense: body.tursabLicense,
        address: body.address,
        email: body.email,
        password: hashedPassword,
        whatsapp: body.whatsapp,
        website: body.website || null,
        verified: false, // Requires admin approval
      }
    })

    // TODO: Send notification to admin
    console.log('📧 New agency registration pending approval:')
    console.log(`Company: ${agency.companyName}`)
    console.log(`TÜRSAB: ${agency.tursabLicense}`)
    console.log(`Email: ${agency.email}`)

    // TODO: Send confirmation email to agency
    console.log('📧 Confirmation email to agency:')
    console.log(`To: ${agency.email}`)
    console.log('Subject: Registration Received - Pending Approval')

    return NextResponse.json({ 
      success: true,
      message: 'Registration submitted successfully. Awaiting admin approval.',
      agencyId: agency.id
    }, { status: 201 })
  } catch (error) {
    console.error('Agency registration error:', error)
    return NextResponse.json({ error: 'Registration failed' }, { status: 500 })
  }
}
