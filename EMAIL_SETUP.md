# Email Notification Setup

## Resend Setup (Recommended - Free tier: 3,000 emails/month)

### 1. Create Resend Account
1. Go to https://resend.com
2. Sign up for free account
3. Verify your email

### 2. Get API Key
1. Go to https://resend.com/api-keys
2. Click "Create API Key"
3. Copy the API key (starts with `re_`)

### 3. Add to Environment Variables

**Local Development (.env.local):**
```bash
RESEND_API_KEY="re_your_api_key_here"
EMAIL_FROM="TRTourPackage <noreply@yourdomain.com>"
```

**Vercel Production:**
1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add:
   - `RESEND_API_KEY` = your API key
   - `EMAIL_FROM` = TRTourPackage <noreply@yourdomain.com>

### 4. Verify Domain (Optional but Recommended)

For production, verify your domain:
1. Go to https://resend.com/domains
2. Click "Add Domain"
3. Add your domain (e.g., trtourpackage.com)
4. Add DNS records as instructed
5. Wait for verification

**Without domain verification:** Emails can only be sent to your verified email address (testing only)

**With domain verification:** Emails can be sent to anyone

### 5. Test Email

Run this in your API route or test file:
```typescript
import { sendEmail, emailTemplates } from '@/lib/notifications'

const template = emailTemplates.agencyApproved('Test Agency')
await sendEmail({
  to: 'your-email@example.com',
  ...template
})
```

## Email Templates Available

1. **agencyApproved** - When admin approves an agency
2. **agencyRejected** - When admin rejects an agency
3. **newOfferToTraveler** - When agency submits an offer
4. **newRequestToAgency** - When traveler creates a request

## Development Mode

Without `RESEND_API_KEY`, emails will be logged to console only:
```
📧 Email (dev mode): { to: 'user@example.com', subject: '...' }
```

## Production Checklist

- [ ] Resend account created
- [ ] API key added to Vercel
- [ ] Domain verified (optional)
- [ ] Test email sent successfully
- [ ] Email templates reviewed
- [ ] Unsubscribe link added (if needed)

## Pricing

**Resend Free Tier:**
- 3,000 emails/month
- 100 emails/day
- Perfect for MVP

**Paid Plans:**
- $20/month for 50,000 emails
- $80/month for 100,000 emails

## Alternative: SendGrid

If you prefer SendGrid:
1. Install: `npm install @sendgrid/mail`
2. Get API key from https://sendgrid.com
3. Update `lib/notifications.ts` to use SendGrid instead

## Support

- Resend Docs: https://resend.com/docs
- Resend Support: support@resend.com
