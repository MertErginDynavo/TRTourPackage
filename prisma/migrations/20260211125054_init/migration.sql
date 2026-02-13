-- CreateTable
CREATE TABLE "Request" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "country" TEXT NOT NULL,
    "travelDates" TEXT NOT NULL,
    "numTravelers" INTEGER NOT NULL,
    "budgetRange" TEXT,
    "interests" TEXT,
    "contactMethod" TEXT NOT NULL,
    "contactValue" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "requestSubmittedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Agency" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "companyName" TEXT NOT NULL,
    "tursabLicense" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "whatsapp" TEXT NOT NULL,
    "website" TEXT,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Offer" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "requestId" TEXT NOT NULL,
    "agencyId" TEXT NOT NULL,
    "packageTitle" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "includedServices" TEXT NOT NULL,
    "excludedServices" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "notes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Offer_requestId_fkey" FOREIGN KEY ("requestId") REFERENCES "Request" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Offer_agencyId_fkey" FOREIGN KEY ("agencyId") REFERENCES "Agency" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Agency_tursabLicense_key" ON "Agency"("tursabLicense");

-- CreateIndex
CREATE UNIQUE INDEX "Agency_email_key" ON "Agency"("email");
