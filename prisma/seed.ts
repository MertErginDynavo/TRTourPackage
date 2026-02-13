import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Demo traveler oluştur
  const demoTraveler = await prisma.traveler.upsert({
    where: { email: 'traveler@example.com' },
    update: {},
    create: {
      name: 'John Doe',
      email: 'traveler@example.com',
      password: 'demo123',
      country: 'United States',
    },
  })

  console.log('✅ Demo traveler oluşturuldu:', demoTraveler.email)

  // Demo acenta oluştur
  const demoAgency = await prisma.agency.upsert({
    where: { email: 'demo@trtourpackage.com' },
    update: {},
    create: {
      companyName: 'Demo Seyahat Acentesi',
      tursabLicense: 'A-9999',
      address: 'Taksim Meydanı, Beyoğlu, İstanbul, Türkiye',
      email: 'demo@trtourpackage.com',
      password: 'demo123',
      whatsapp: '+90 555 123 4567',
      website: 'https://demo-agency.com',
      verified: true,
    },
  })

  console.log('✅ Demo acenta oluşturuldu:', demoAgency.email)

  // Demo talep oluştur
  const demoRequest = await prisma.request.create({
    data: {
      travelerId: demoTraveler.id,
      country: 'United States',
      travelDates: 'June 15-25, 2026',
      numTravelers: 2,
      budgetRange: '$3000-4000 per person',
      interests: 'Hot air balloon in Cappadocia, Blue Mosque tours, Turkish cuisine experiences, Pamukkale thermal pools',
      contactMethod: 'email',
      contactValue: 'traveler@example.com',
      status: 'pending',
    },
  })

  console.log('✅ Demo talep oluşturuldu:', demoRequest.id)

  // İkinci demo talep
  const demoRequest2 = await prisma.request.create({
    data: {
      travelerId: demoTraveler.id,
      country: 'United States',
      travelDates: 'July 10-20, 2026',
      numTravelers: 4,
      budgetRange: '$2500-3500 per person',
      interests: 'Ephesus ancient city, Mediterranean beaches, traditional hammam spa, local bazaar shopping',
      contactMethod: 'whatsapp',
      contactValue: '+1 234 567 8900',
      status: 'pending',
    },
  })

  console.log('✅ İkinci demo talep oluşturuldu:', demoRequest2.id)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
