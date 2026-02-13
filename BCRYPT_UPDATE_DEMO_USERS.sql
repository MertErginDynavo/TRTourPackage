-- Update demo users with bcrypt-hashed passwords
-- Password: demo123
-- Hash generated with bcrypt (salt rounds: 10)

-- Update traveler demo user
UPDATE "Traveler" 
SET password = '$2b$10$4M4cPiRL17YMdDQ2jE0XsOTXzQAj3jWVs9Gwp1odVOqX/3OBwAQxS' 
WHERE email = 'traveler@example.com';

-- Update agency demo user
UPDATE "Agency" 
SET password = '$2b$10$4M4cPiRL17YMdDQ2jE0XsOTXzQAj3jWVs9Gwp1odVOqX/3OBwAQxS' 
WHERE email = 'demo@trtourpackage.com';

-- Verify updates
SELECT email, 'Updated' as status FROM "Traveler" WHERE email = 'traveler@example.com'
UNION ALL
SELECT email, 'Updated' as status FROM "Agency" WHERE email = 'demo@trtourpackage.com';
