import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(
  request: Request,
  { params }: { params: { travelerId: string } }
) {
  try {
    const requests = await prisma.request.findMany({
      where: { travelerId: params.travelerId },
      include: {
        _count: {
          select: { offers: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json(requests)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch requests' }, { status: 500 })
  }
}
