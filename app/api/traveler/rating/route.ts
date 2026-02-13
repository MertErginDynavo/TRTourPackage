import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

// POST - Submit a rating
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { travelerId, agencyId, rating, comment } = body

    // Validate rating (1-5)
    if (rating < 1 || rating > 5) {
      return NextResponse.json({ error: 'Rating must be between 1 and 5' }, { status: 400 })
    }

    // Check if rating already exists
    const existingRating = await prisma.rating.findUnique({
      where: {
        travelerId_agencyId: {
          travelerId,
          agencyId
        }
      }
    })

    if (existingRating) {
      // Update existing rating
      const updatedRating = await prisma.rating.update({
        where: {
          travelerId_agencyId: {
            travelerId,
            agencyId
          }
        },
        data: {
          rating,
          comment: comment || null
        }
      })
      return NextResponse.json(updatedRating)
    } else {
      // Create new rating
      const newRating = await prisma.rating.create({
        data: {
          travelerId,
          agencyId,
          rating,
          comment: comment || null
        }
      })
      return NextResponse.json(newRating, { status: 201 })
    }
  } catch (error) {
    console.error('Rating error:', error)
    return NextResponse.json({ error: 'Failed to submit rating' }, { status: 500 })
  }
}

// GET - Get traveler's rating for an agency
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const travelerId = searchParams.get('travelerId')
    const agencyId = searchParams.get('agencyId')

    if (!travelerId || !agencyId) {
      return NextResponse.json({ error: 'Missing parameters' }, { status: 400 })
    }

    const rating = await prisma.rating.findUnique({
      where: {
        travelerId_agencyId: {
          travelerId,
          agencyId
        }
      }
    })

    return NextResponse.json(rating || null)
  } catch (error) {
    console.error('Get rating error:', error)
    return NextResponse.json({ error: 'Failed to get rating' }, { status: 500 })
  }
}
