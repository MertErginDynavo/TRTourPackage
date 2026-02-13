# TRTourPackage

A marketplace platform connecting international travelers with verified Turkish travel agencies.

## Features

- **Multi-Language Support**: 12 languages (English, Türkçe, العربية, Deutsch, Italiano, Français, 中文, 한국어, 日本語, Русский, Azərbaycan, Español)
- Public landing page with tour request form
- 24-hour offer submission system
- Agency dashboard for viewing requests
- Offer creation and management
- Direct contact between travelers and agencies
- No payment processing (marketplace only)
- TÜRSAB verification system for agencies
- Responsive design with clean, professional UI

## Setup

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env
```
Edit `.env` and add your database URL.

3. Initialize database:
```bash
npx prisma migrate dev
npx prisma generate
```

4. Seed demo data (optional):
```bash
npx tsx prisma/seed.ts
```

5. Run development server:
```bash
npm run dev
```

Visit http://localhost:3000

## Demo Credentials

**Traveler Account:**
- Email: `traveler@example.com`
- Password: `demo123`

**Agency Account:**
- Email: `demo@trtourpackage.com`
- Password: `demo123`

See `DEMO_CREDENTIALS.md` for more details.

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Prisma ORM
- SQLite (development) / PostgreSQL (production)
- React
- Lucide React Icons

## Project Structure

- `/app` - Next.js pages and API routes
  - `/api` - API endpoints
  - `/request` - Public tour request form
  - `/agency` - Agency dashboard and offer creation
  - `/traveler` - Traveler dashboard and authentication
  - `/admin` - Admin panel for agency management
  - `/offers` - Offer viewing pages
- `/components` - Reusable React components
- `/contexts` - React context providers (Language)
- `/lib` - Utility functions and translations
- `/prisma` - Database schema and migrations
- `/public` - Static assets

## Multi-Language System

The platform supports 12 languages with complete translations for all user-facing pages:
- English (en)
- Türkçe (tr)
- العربية (ar)
- Deutsch (de)
- Italiano (it)
- Français (fr)
- 中文 (zh)
- 한국어 (ko)
- 日本語 (ja)
- Русский (ru)
- Azərbaycan (az)
- Español (es)

Language preference is stored in localStorage and persists across sessions.

## Design System

- **Typography**: Manrope (headings, 600 weight), Inter (body, 400 weight)
- **Colors**: 
  - Primary: #e53e3e (red)
  - Text Dark: #2d3748
  - Text Gray: #718096
  - Background: #f8f9fa
- **Container Width**: 1400px
- **Icons**: Lucide React

## License

Private project - All rights reserved
