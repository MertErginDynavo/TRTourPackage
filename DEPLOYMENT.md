# Deployment Guide

## Prerequisites

- Node.js 18+ installed
- PostgreSQL database (for production)
- Git repository

## Environment Setup

1. Create `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

2. Update environment variables:
```env
# Production PostgreSQL
DATABASE_URL="postgresql://user:password@host:5432/database?schema=public"

# Application
NODE_ENV="production"
NEXT_PUBLIC_APP_URL="https://yourdomain.com"
```

## Database Setup

1. Run migrations:
```bash
npx prisma migrate deploy
```

2. Generate Prisma Client:
```bash
npx prisma generate
```

3. (Optional) Seed demo data:
```bash
npx tsx prisma/seed.ts
```

## Build

```bash
npm install
npm run build
```

## Deployment Options

### Option 1: Vercel (Recommended)

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

3. Set environment variables in Vercel dashboard:
   - `DATABASE_URL`
   - `NODE_ENV=production`
   - `NEXT_PUBLIC_APP_URL`

4. Run database migrations:
```bash
vercel env pull .env.production.local
npx prisma migrate deploy
```

### Option 2: Docker

1. Create `Dockerfile`:
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npx prisma generate
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

2. Build and run:
```bash
docker build -t trtourpackage .
docker run -p 3000:3000 -e DATABASE_URL="..." trtourpackage
```

### Option 3: VPS (Ubuntu)

1. Install Node.js:
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

2. Install PM2:
```bash
sudo npm install -g pm2
```

3. Clone and setup:
```bash
git clone <your-repo>
cd trtourpackage
npm install
npx prisma generate
npx prisma migrate deploy
npm run build
```

4. Start with PM2:
```bash
pm2 start npm --name "trtourpackage" -- start
pm2 save
pm2 startup
```

5. Setup Nginx reverse proxy:
```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## Post-Deployment

1. Test all pages and functionality
2. Verify language switching works
3. Test traveler registration and login
4. Test agency login and dashboard
5. Test tour request submission
6. Test offer creation
7. Verify database connections
8. Check error logging

## Monitoring

- Set up error tracking (e.g., Sentry)
- Monitor database performance
- Set up uptime monitoring
- Configure backup strategy for database

## Maintenance

- Regular database backups
- Monitor disk space
- Update dependencies regularly
- Review and rotate logs
- Monitor API response times

## Troubleshooting

### Database Connection Issues
```bash
# Test connection
npx prisma db pull

# Reset database (development only!)
npx prisma migrate reset
```

### Build Errors
```bash
# Clear cache
rm -rf .next
npm run build
```

### Missing Translations
- Check `lib/translations.ts` for all 12 languages
- Verify all keys exist in all language objects

## Security Checklist

- [ ] Environment variables are not committed
- [ ] Database credentials are secure
- [ ] HTTPS is enabled
- [ ] CORS is properly configured
- [ ] Rate limiting is implemented (if needed)
- [ ] Input validation is in place
- [ ] SQL injection protection (Prisma handles this)
- [ ] XSS protection (React handles this)

## Support

For issues or questions, refer to:
- README.md for setup instructions
- SYSTEM_FLOW.md for architecture details
- DEMO_CREDENTIALS.md for test accounts
