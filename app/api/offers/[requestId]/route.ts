import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(
  request: Request,
  { params }: { params: { requestId: string } }
) {
  try {
    const offers = await prisma.offer.findMany({
      where: { requestId: params.requestId },
      include: {
        agency: {
          select: {
            companyName: true,
            tursabLicense: true,
            email: true,
            whatsapp: true,
            website: true,
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json(offers)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch offers' }, { status: 500 })
  }
}
