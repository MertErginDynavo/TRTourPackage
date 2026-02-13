-- Image Upload Migration for Neon PostgreSQL
-- Run this in Neon SQL Editor: https://console.neon.tech

-- Add logo column to Agency table
ALTER TABLE "Agency" 
ADD COLUMN IF NOT EXISTS "logo" TEXT;

-- Add images column to Offer table (stores JSON array of URLs)
ALTER TABLE "Offer" 
ADD COLUMN IF NOT EXISTS "images" TEXT;

-- Verify columns added
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'Agency' AND column_name = 'logo';

SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'Offer' AND column_name = 'images';

-- Check sample data
SELECT id, "companyName", logo FROM "Agency" LIMIT 5;
SELECT id, "packageTitle", images FROM "Offer" LIMIT 5;
