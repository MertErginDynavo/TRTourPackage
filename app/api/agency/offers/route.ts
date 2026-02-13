import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    const offer = await prisma.offer.create({
      data: {
        requestId: body.requestId,
        agencyId: body.agencyId,
        packageTitle: body.packageTitle,
        description: body.description,
        includedServices: body.includedServices,
        excludedServices: body.excludedServices,
        price: body.price,
        notes: body.notes || null,
      }
    })

    // Get request details to send notification
    const requestData = await prisma.request.findUnique({
      where: { id: body.requestId }
    })

    if (requestData) {
      // Update request status to offers_ready
      await prisma.request.update({
        where: { id: body.requestId },
        data: { status: 'offers_ready' }
      })

      // Send notification to traveler
      const offerLink = `${process.env.NEXT_PUBLIC_SITE_URL}/offers/${body.requestId}`
      
      if (requestData.contactMethod === 'email') {
        // TODO: Send email notification
        console.log(`📧 Email notification to: ${requestData.contactValue}`)
        console.log(`Subject: New Tour Offer Available`)
        console.log(`Link: ${offerLink}`)
      } else if (requestData.contactMethod === 'whatsapp') {
        // TODO: Send WhatsApp notification
        console.log(`📱 WhatsApp notification to: ${requestData.contactValue}`)
        console.log(`Message: You have received a new tour offer!`)
        console.log(`Link: ${offerLink}`)
      }
    }

    return NextResponse.json(offer, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create offer' }, { status: 500 })
  }
}
