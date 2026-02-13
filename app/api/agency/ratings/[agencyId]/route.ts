import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(
  request: Request,
  { params }: { params: { agencyId: string } }
) {
  try {
    const ratings = await prisma.rating.findMany({
      where: { agencyId: params.agencyId },
      include: {
        traveler: {
          select: {
            name: true,
            country: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    })

    // Calculate average rating
    const avgRating = ratings.length > 0
      ? ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length
      : 0

    return NextResponse.json({
      ratings,
      averageRating: avgRating.toFixed(1),
      totalRatings: ratings.length
    })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch ratings' }, { status: 500 })
  }
}
