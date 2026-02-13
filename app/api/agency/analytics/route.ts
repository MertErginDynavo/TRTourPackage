import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const agencyId = searchParams.get('agencyId')

    if (!agencyId) {
      return NextResponse.json({ error: 'Agency ID required' }, { status: 400 })
    }

    // Get all offers by this agency
    const offers = await prisma.offer.findMany({
      where: { agencyId },
      include: {
        request: true
      }
    })

    // Get all requests viewed (all requests in system for now)
    const allRequests = await prisma.request.findMany({
      where: { status: { in: ['pending', 'offers_ready'] } }
    })

    // Calculate metrics
    const offersSubmitted = offers.length
    const requestsViewed = allRequests.length
    const conversionRate = requestsViewed > 0 
      ? Math.round((offersSubmitted / requestsViewed) * 100) 
      : 0

    // Top destinations from offers
    const destinationCounts: Record<string, number> = {}
    offers.forEach(offer => {
      const dest = offer.request.country
      destinationCounts[dest] = (destinationCounts[dest] || 0) + 1
    })

    const topDestinations = Object.entries(destinationCounts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5)

    // Monthly trend (last 3 months)
    const now = new Date()
    const monthlyData = []
    
    for (let i = 2; i >= 0; i--) {
      const monthDate = new Date(now.getFullYear(), now.getMonth() - i, 1)
      const nextMonth = new Date(now.getFullYear(), now.getMonth() - i + 1, 1)
      
      const monthRequests = await prisma.request.count({
        where: {
          createdAt: {
            gte: monthDate,
            lt: nextMonth
          }
        }
      })

      const monthOffers = await prisma.offer.count({
        where: {
          agencyId,
          createdAt: {
            gte: monthDate,
            lt: nextMonth
          }
        }
      })

      const monthNames = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 
                          'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık']
      
      monthlyData.push({
        month: monthNames[monthDate.getMonth()],
        requests: monthRequests,
        offers: monthOffers
      })
    }

    // Calculate average response time (mock for now - would need timestamps)
    const avgResponseTime = '4.5 hours'

    return NextResponse.json({
      requestsViewed,
      offersSubmitted,
      conversionRate: `${conversionRate}%`,
      avgResponseTime,
      messagesReceived: 0, // Future feature
      offersCompared: offersSubmitted * 3, // Estimated
      topDestinations,
      monthlyTrend: monthlyData
    })
  } catch (error) {
    console.error('Analytics error:', error)
    return NextResponse.json({ error: 'Failed to fetch analytics' }, { status: 500 })
  }
}
