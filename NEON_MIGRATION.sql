-- TRTourPackage Database Migration for PostgreSQL (Neon)
-- Run this in Neon SQL Editor

-- Create Traveler table
CREATE TABLE IF NOT EXISTS "Traveler" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL UNIQUE,
    "password" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create Agency table
CREATE TABLE IF NOT EXISTS "Agency" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "companyName" TEXT NOT NULL,
    "tursabLicense" TEXT NOT NULL UNIQUE,
    "address" TEXT NOT NULL,
    "email" TEXT NOT NULL UNIQUE,
    "password" TEXT NOT NULL,
    "whatsapp" TEXT NOT NULL,
    "website" TEXT,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create Request table
CREATE TABLE IF NOT EXISTS "Request" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "travelerId" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "travelDates" TEXT NOT NULL,
    "numTravelers" INTEGER NOT NULL,
    "budgetRange" TEXT,
    "interests" TEXT,
    "contactMethod" TEXT NOT NULL,
    "contactValue" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "requestSubmittedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Request_travelerId_fkey" FOREIGN KEY ("travelerId") REFERENCES "Traveler"("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- Create Offer table
CREATE TABLE IF NOT EXISTS "Offer" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "requestId" TEXT NOT NULL,
    "agencyId" TEXT NOT NULL,
    "packageTitle" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "includedServices" TEXT NOT NULL,
    "excludedServices" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "notes" TEXT,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Offer_requestId_fkey" FOREIGN KEY ("requestId") REFERENCES "Request"("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Offer_agencyId_fkey" FOREIGN KEY ("agencyId") REFERENCES "Agency"("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- Create Contact table
CREATE TABLE IF NOT EXISTS "Contact" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "requestId" TEXT NOT NULL,
    "agencyId" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Contact_requestId_fkey" FOREIGN KEY ("requestId") REFERENCES "Request"("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Contact_agencyId_fkey" FOREIGN KEY ("agencyId") REFERENCES "Agency"("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- Create Rating table
CREATE TABLE IF NOT EXISTS "Rating" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "travelerId" TEXT NOT NULL,
    "agencyId" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "comment" TEXT,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Rating_travelerId_fkey" FOREIGN KEY ("travelerId") REFERENCES "Traveler"("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Rating_agencyId_fkey" FOREIGN KEY ("agencyId") REFERENCES "Agency"("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Rating_travelerId_agencyId_key" UNIQUE ("travelerId", "agencyId")
);

-- Insert demo data
INSERT INTO "Traveler" ("id", "name", "email", "password", "country", "createdAt")
VALUES ('demo-traveler-1', 'John Doe', 'traveler@example.com', 'demo123', 'United States', CURRENT_TIMESTAMP)
ON CONFLICT ("email") DO NOTHING;

INSERT INTO "Agency" ("id", "companyName", "tursabLicense", "address", "email", "password", "whatsapp", "website", "verified", "createdAt")
VALUES ('demo-agency-1', 'Demo Seyahat Acentesi', 'A-9999', 'Taksim Meydanı, Beyoğlu, İstanbul, Türkiye', 'demo@trtourpackage.com', 'demo123', '+90 555 123 4567', 'https://demo-agency.com', true, CURRENT_TIMESTAMP)
ON CONFLICT ("email") DO NOTHING;

-- Success message
SELECT 'Migration completed successfully!' as message;
