import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // Create or update rating
    const rating = await prisma.rating.upsert({
      where: {
        travelerId_agencyId: {
          travelerId: body.travelerId,
          agencyId: body.agencyId
        }
      },
      update: {
        rating: body.rating,
        comment: body.comment || null,
      },
      create: {
        travelerId: body.travelerId,
        agencyId: body.agencyId,
        rating: body.rating,
        comment: body.comment || null,
      }
    })

    return NextResponse.json(rating, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to submit rating' }, { status: 500 })
  }
}
