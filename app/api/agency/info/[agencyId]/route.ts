import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(
  request: Request,
  { params }: { params: { agencyId: string } }
) {
  try {
    const agency = await prisma.agency.findUnique({
      where: { id: params.agencyId },
      select: {
        companyName: true,
        tursabLicense: true,
        address: true,
        email: true,
        whatsapp: true,
        website: true,
      }
    })

    if (!agency) {
      return NextResponse.json({ error: 'Agency not found' }, { status: 404 })
    }

    return NextResponse.json(agency)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch agency info' }, { status: 500 })
  }
}
