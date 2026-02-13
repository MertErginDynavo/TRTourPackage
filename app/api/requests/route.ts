import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

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

    return NextResponse.json({ 
      ...newRequest, 
      offerLink 
    }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create request' }, { status: 500 })
  }
}
