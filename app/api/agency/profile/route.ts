import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function PATCH(request: Request) {
  try {
    const body = await request.json()
    const { agencyId, logo } = body

    if (!agencyId) {
      return NextResponse.json({ error: 'Agency ID required' }, { status: 400 })
    }

    const agency = await prisma.agency.update({
      where: { id: agencyId },
      data: { logo: logo || null }
    })

    return NextResponse.json({ success: true, agency })
  } catch (error) {
    console.error('Profile update error:', error)
    return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 })
  }
}
