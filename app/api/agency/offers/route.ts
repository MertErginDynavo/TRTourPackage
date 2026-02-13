import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { sendEmail, sendWhatsApp, emailTemplates } from '@/lib/notifications'

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

    // Get request details and agency info to send notification
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
      // Update request status to offers_ready
      await prisma.request.update({
        where: { id: body.requestId },
        data: { status: 'offers_ready' }
      })

      // Send notification to traveler
      const offerLink = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/offers/${body.requestId}`
      const travelerName = requestData.traveler?.name || 'Traveler'
      
      if (requestData.contactMethod === 'email') {
        // Send email notification
        const template = emailTemplates.newOfferToTraveler(
          travelerName,
          agency.companyName,
          offerLink
        )
        await sendEmail({
          to: requestData.contactValue,
          ...template
        })
      } else if (requestData.contactMethod === 'whatsapp') {
        // Send WhatsApp notification
        await sendWhatsApp({
          to: requestData.contactValue,
          message: `🎁 New Tour Offer!\n\n${agency.companyName} has submitted a tour offer for your request.\n\nView offer: ${offerLink}`
        })
      }
    }

    return NextResponse.json(offer, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create offer' }, { status: 500 })
  }
}
