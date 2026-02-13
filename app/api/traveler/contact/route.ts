import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // Create contact record
    const contact = await prisma.contact.create({
      data: {
        requestId: body.requestId,
        agencyId: body.agencyId,
        status: 'contacted',
      }
    })

    // Get request and agency details
    const requestData = await prisma.request.findUnique({
      where: { id: body.requestId },
      include: {
        traveler: true
      }
    })

    const agency = await prisma.agency.findUnique({
      where: { id: body.agencyId }
    })

    if (requestData && agency) {
      // Send notification to agency
      console.log('📧 Notification to Agency:')
      console.log(`To: ${agency.email}`)
      console.log(`Subject: A traveler is interested in your tour offer!`)
      console.log(`Traveler: ${requestData.traveler.name}`)
      console.log(`Contact: ${requestData.contactValue} (${requestData.contactMethod})`)
      console.log(`Travel Dates: ${requestData.travelDates}`)
      
      // TODO: Send actual email/WhatsApp to agency
    }

    return NextResponse.json(contact, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create contact' }, { status: 500 })
  }
}
