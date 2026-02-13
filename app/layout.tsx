import './globals.css'
import type { Metadata } from 'next'
import CookieBanner from '@/components/CookieBanner'
import { LanguageProvider } from '@/contexts/LanguageContext'

export const metadata: Metadata = {
  title: {
    default: 'TRTourPackage - Custom Turkey Tour Packages from Verified Travel Agencies',
    template: '%s | TRTourPackage'
  },
  description: 'Request custom Turkey tour packages and receive offers from verified Turkish travel agencies. Compare prices, no middlemen, no hidden fees. TURSAB licensed agencies only.',
  keywords: ['Turkey tour packages', 'Custom Turkey tours', 'Verified Turkey travel agencies', 'Turkish travel agencies', 'Turkey vacation packages', 'Istanbul tours', 'Cappadocia tours', 'TURSAB licensed agencies', 'Turkey travel marketplace', 'Turkey holiday packages', 'Ephesus tours', 'Pamukkale tours', 'Antalya tours', 'GoTürkiye', 'Go Türkiye', 'Visit Turkey', 'Turkey tourism', 'Turkey travel guide'],
  authors: [{ name: 'TRTourPackage' }],
  creator: 'TRTourPackage',
  publisher: 'TRTourPackage',
  metadataBase: new URL('https://trtourpackage.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://trtourpackage.com',
    siteName: 'TRTourPackage',
    title: 'TRTourPackage - Custom Turkey Tour Packages',
    description: 'Connect directly with verified Turkish travel agencies. Compare custom tour packages with no platform fees.',
    images: [
      {
        url: '/yeni.png',
        width: 1200,
        height: 630,
        alt: 'TRTourPackage - Turkey Tour Packages',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TRTourPackage - Custom Turkey Tour Packages',
    description: 'Request custom Turkey tours from verified TURSAB licensed agencies.',
    images: ['/yeni.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#e53e3e" />
      </head>
      <body>
        <LanguageProvider>
          {children}
          <CookieBanner />
        </LanguageProvider>
      </body>
    </html>
  )
}
