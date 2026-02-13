import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { sendEmail, emailTemplates } from '@/lib/notifications'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // Get travelerId from body or create anonymous request
    const newRequest = await prisma.request.create({
      data: {
        travelerId: body.travelerId || 'anonymous',
        country: body.country,
        travelDates: body.travelDates,
        numTravelers: body.numTravelers,
        budgetRange: body.budgetRange || null,
        interests: body.interests || null,
        contactMethod: body.contactMethod,
        contactValue: body.contactValue,
        status: 'pending',
      }
    })

    // Generate unique link for viewing offers
    const offerLink = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/offers/${newRequest.id}`

    // Notify all verified agencies about new request
    const verifiedAgencies = await prisma.agency.findMany({
      where: { verified: true },
      select: { email: true, companyName: true }
    })

    // Send email to all verified agencies
    for (const agency of verifiedAgencies) {
      const template = emailTemplates.newRequestToAgency(
        agency.companyName,
        newRequest.country,
        newRequest.travelDates
      )
      await sendEmail({
        to: agency.email,
        ...template
      })
    }

    return NextResponse.json({ 
      ...newRequest, 
      offerLink 
    }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create request' }, { status: 500 })
  }
}
