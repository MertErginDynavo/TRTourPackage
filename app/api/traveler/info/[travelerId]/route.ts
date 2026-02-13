import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(
  request: Request,
  { params }: { params: { travelerId: string } }
) {
  try {
    const traveler = await prisma.traveler.findUnique({
      where: { id: params.travelerId },
      select: {
        name: true,
        email: true,
        country: true,
      }
    })

    if (!traveler) {
      return NextResponse.json({ error: 'Traveler not found' }, { status: 404 })
    }

    return NextResponse.json(traveler)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch traveler info' }, { status: 500 })
  }
}
