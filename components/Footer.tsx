'use client'

import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'

export default function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="footer">
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', marginBottom: '32px', flexWrap: 'wrap' }}>
          <Link href="/about">{t.aboutUs}</Link>
          <Link href="/faq">{t.faqTitle}</Link>
          <Link href="/verification">{t.verificationTitle}</Link>
          <Link href="/agency/register" style={{ color: '#e53e3e', fontWeight: '600' }}>Join as Agency</Link>
          <Link href="/privacy">{t.privacyPolicy}</Link>
          <Link href="/terms">{t.termsOfService}</Link>
          <Link href="/contact">{t.contactUs}</Link>
        </div>
        
        <div style={{ textAlign: 'center', paddingTop: '24px', borderTop: '1px solid #e2e8f0' }}>
          <p style={{ fontSize: '13px', color: '#a0aec0', fontFamily: 'Inter, sans-serif' }}>
            {t.footerTagline}
          </p>
        </div>
      </div>
    </footer>
  )
}
