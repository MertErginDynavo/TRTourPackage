# Bcrypt Password Migration

## Important Note

We've updated the authentication system to use bcrypt for password hashing. This is a critical security improvement.

## Impact on Existing Users

**All existing users in the database will need to reset their passwords** because:
- Old passwords were stored in plain text (or SHA-256)
- New passwords are hashed with bcrypt
- The two formats are incompatible

## Options

### Option 1: Reset All Passwords (Recommended for Production)
Run this SQL to clear all passwords and force users to reset:

```sql
-- Clear all traveler passwords
UPDATE "Traveler" SET password = '';

-- Clear all agency passwords  
UPDATE "Agency" SET password = '';
```

Then implement a "Forgot Password" feature.

### Option 2: Recreate Demo Users (For Development)
Delete and recreate demo users with bcrypt-hashed passwords:

```sql
-- Delete existing demo users
DELETE FROM "Traveler" WHERE email = 'traveler@example.com';
DELETE FROM "Agency" WHERE email = 'demo@trtourpackage.com';
```

Then register them again through the UI (passwords will be hashed automatically).

### Option 3: Manual Hash Update (For Specific Users)
If you want to keep specific users, you can:
1. Generate bcrypt hash for their password using Node.js:
   ```javascript
   const bcrypt = require('bcrypt');
   const hash = await bcrypt.hash('demo123', 10);
   console.log(hash);
   ```
2. Update the database with the hash:
   ```sql
   UPDATE "Traveler" 
   SET password = '$2b$10$...' 
   WHERE email = 'traveler@example.com';
   ```

## Current Demo Credentials

After migration, you'll need to:
1. Register new demo users through the UI, OR
2. Use the bcrypt hash method above to update existing users

## Security Benefits

✅ Passwords are now properly hashed with bcrypt (industry standard)
✅ Salt rounds: 10 (good balance of security and performance)
✅ Passwords cannot be reversed or read from database
✅ Protection against rainbow table attacks
