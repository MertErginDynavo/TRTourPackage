'use client'

import Link from 'next/link'
import { Plane } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import LanguageSelector from '@/components/LanguageSelector'
import Footer from '@/components/Footer'

export default function PrivacyPage() {
  const { t } = useLanguage()

  return (
    <div style={{ minHeight: '100vh', background: '#f8f9fa' }}>
      {/* Navbar */}
      <nav className="navbar">
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Plane size={48} color="#e53e3e" strokeWidth={2} />
            <span style={{ 
              fontSize: '24px', 
              fontWeight: '600', 
              color: '#1a202c',
              letterSpacing: '-0.02em',
              fontFamily: 'Manrope, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
            }}>TRTourPackage</span>
          </Link>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <LanguageSelector />
          </div>
        </div>
      </nav>

      <div className="container" style={{ padding: '60px 20px', maxWidth: '800px' }}>
        <h1 style={{ fontSize: '36px', marginBottom: '30px', fontFamily: 'Manrope, sans-serif' }}>
          Privacy Policy
        </h1>
        
        <p style={{ fontSize: '14px', color: '#a0aec0', marginBottom: '30px', fontFamily: 'Inter, sans-serif' }}>
          Last Updated: February 13, 2026
        </p>

        <div style={{ lineHeight: '1.8', color: '#718096', fontFamily: 'Inter, sans-serif' }}>
          <div style={{ padding: '16px', background: '#f0fdf4', borderRadius: '8px', marginBottom: '30px', border: '1px solid #48bb78' }}>
            <p style={{ fontSize: '16px', color: '#22543d', margin: 0, fontWeight: '500' }}>
              TRTourPackage respects your privacy and is committed to protecting your personal data. This privacy policy complies with GDPR (EU 2016/679) and CCPA regulations.
            </p>
          </div>

          <h2 style={{ fontSize: '24px', color: '#2d3748', marginTop: '30px', marginBottom: '16px', fontFamily: 'Manrope, sans-serif' }}>
            1. Data Controller
          </h2>
          <p style={{ marginBottom: '20px' }}>
            TRTourPackage acts as the data controller for the personal information collected through our platform.
          </p>
          <p style={{ marginBottom: '20px' }}>
            <strong>Contact:</strong> privacy@trtourpackage.com
          </p>

          <h2 style={{ fontSize: '24px', color: '#2d3748', marginTop: '30px', marginBottom: '16px', fontFamily: 'Manrope, sans-serif' }}>
            2. Information We Collect
          </h2>
          <p style={{ marginBottom: '12px', fontWeight: '600', color: '#2d3748' }}>
            For Travelers:
          </p>
          <ul style={{ marginBottom: '20px', paddingLeft: '20px' }}>
            <li>Name and email address</li>
            <li>Contact information (email or WhatsApp)</li>
            <li>Travel preferences (destination, dates, budget, interests)</li>
            <li>Country of residence</li>
            <li>Communication with agencies</li>
          </ul>

          <p style={{ marginBottom: '12px', fontWeight: '600', color: '#2d3748' }}>
            For Agencies:
          </p>
          <ul style={{ marginBottom: '20px', paddingLeft: '20px' }}>
            <li>Company name and authorized person details</li>
            <li>TÜRSAB license number</li>
            <li>Business address and contact information</li>
            <li>Email and WhatsApp</li>
            <li>Website (optional)</li>
            <li>Communication with travelers</li>
          </ul>

          <p style={{ marginBottom: '12px', fontWeight: '600', color: '#2d3748' }}>
            Technical Data:
          </p>
          <ul style={{ marginBottom: '20px', paddingLeft: '20px' }}>
            <li>IP address</li>
            <li>Browser type and version</li>
            <li>Essential cookies for platform functionality</li>
          </ul>

          <div style={{ padding: '12px', background: '#fef2f2', borderRadius: '6px', marginBottom: '20px', border: '1px solid #fca5a5' }}>
            <p style={{ fontSize: '14px', color: '#991b1b', margin: 0, fontWeight: '600' }}>
              ⚠️ We DO NOT collect or process payment information. All payments are handled directly between travelers and agencies.
            </p>
          </div>

          <h2 style={{ fontSize: '24px', color: '#2d3748', marginTop: '30px', marginBottom: '16px', fontFamily: 'Manrope, sans-serif' }}>
            3. How We Use Your Information
          </h2>
          <p style={{ marginBottom: '12px' }}>
            We process your personal data for the following purposes:
          </p>
          <ul style={{ marginBottom: '20px', paddingLeft: '20px' }}>
            <li><strong>Service Provision:</strong> To facilitate connections between travelers and verified Turkish travel agencies</li>
            <li><strong>Communication:</strong> To enable direct communication between travelers and agencies</li>
            <li><strong>Verification:</strong> To verify TÜRSAB licenses and maintain platform quality</li>
            <li><strong>Platform Improvement:</strong> To improve user experience and platform functionality</li>
            <li><strong>Legal Compliance:</strong> To comply with legal obligations</li>
            <li><strong>Security:</strong> To protect against fraud and ensure platform security</li>
          </ul>

          <h2 style={{ fontSize: '24px', color: '#2d3748', marginTop: '30px', marginBottom: '16px', fontFamily: 'Manrope, sans-serif' }}>
            4. Legal Basis for Processing (GDPR)
          </h2>
          <p style={{ marginBottom: '12px' }}>
            We process your personal data based on:
          </p>
          <ul style={{ marginBottom: '20px', paddingLeft: '20px' }}>
            <li><strong>Contract Performance:</strong> Processing necessary to provide our services</li>
            <li><strong>Legitimate Interests:</strong> Platform security, fraud prevention, and service improvement</li>
            <li><strong>Legal Obligation:</strong> Compliance with applicable laws</li>
            <li><strong>Consent:</strong> Where explicitly provided for specific purposes</li>
          </ul>

          <h2 style={{ fontSize: '24px', color: '#2d3748', marginTop: '30px', marginBottom: '16px', fontFamily: 'Manrope, sans-serif' }}>
            5. Data Sharing and Disclosure
          </h2>
          <p style={{ marginBottom: '12px' }}>
            We share your personal data only in the following circumstances:
          </p>
          <ul style={{ marginBottom: '20px', paddingLeft: '20px' }}>
            <li><strong>With Agencies:</strong> Traveler contact information is shared with agencies only when the traveler chooses to contact them</li>
            <li><strong>Service Providers:</strong> Hosting, infrastructure, and technical service providers (under strict data processing agreements)</li>
            <li><strong>Legal Requirements:</strong> When required by law or to protect our legal rights</li>
          </ul>

          <div style={{ padding: '12px', background: '#fef2f2', borderRadius: '6px', marginBottom: '20px', border: '1px solid #fca5a5' }}>
            <p style={{ fontSize: '14px', color: '#991b1b', margin: 0, fontWeight: '600' }}>
              ❌ We NEVER sell, rent, or trade your personal data for marketing purposes.
            </p>
          </div>

          <h2 style={{ fontSize: '24px', color: '#2d3748', marginTop: '30px', marginBottom: '16px', fontFamily: 'Manrope, sans-serif' }}>
            6. Data Retention
          </h2>
          <p style={{ marginBottom: '20px' }}>
            We retain your personal data only for as long as necessary to fulfill the purposes outlined in this policy or as required by law. Typically:
          </p>
          <ul style={{ marginBottom: '20px', paddingLeft: '20px' }}>
            <li>Active accounts: Data retained while account is active</li>
            <li>Inactive accounts: Data may be deleted after 2 years of inactivity</li>
            <li>Legal requirements: Some data may be retained longer for legal compliance</li>
          </ul>

          <h2 style={{ fontSize: '24px', color: '#2d3748', marginTop: '30px', marginBottom: '16px', fontFamily: 'Manrope, sans-serif' }}>
            7. Your Rights (GDPR & CCPA)
          </h2>
          <p style={{ marginBottom: '12px' }}>
            You have the following rights regarding your personal data:
          </p>
          <ul style={{ marginBottom: '20px', paddingLeft: '20px' }}>
            <li><strong>Right to Access:</strong> Request a copy of your personal data</li>
            <li><strong>Right to Rectification:</strong> Correct inaccurate or incomplete data</li>
            <li><strong>Right to Erasure:</strong> Request deletion of your personal data ("right to be forgotten")</li>
            <li><strong>Right to Restriction:</strong> Limit how we use your data</li>
            <li><strong>Right to Data Portability:</strong> Receive your data in a structured, machine-readable format</li>
            <li><strong>Right to Object:</strong> Object to processing based on legitimate interests</li>
            <li><strong>Right to Withdraw Consent:</strong> Withdraw consent at any time (where processing is based on consent)</li>
            <li><strong>Right to Lodge a Complaint:</strong> File a complaint with your local data protection authority</li>
          </ul>
          <p style={{ marginBottom: '20px' }}>
            To exercise these rights, contact us at: <strong>privacy@trtourpackage.com</strong>
          </p>

          <h2 style={{ fontSize: '24px', color: '#2d3748', marginTop: '30px', marginBottom: '16px', fontFamily: 'Manrope, sans-serif' }}>
            8. Cookies and Tracking
          </h2>
          <p style={{ marginBottom: '20px' }}>
            We use only <strong>essential cookies</strong> required for the platform to function properly. We do not use:
          </p>
          <ul style={{ marginBottom: '20px', paddingLeft: '20px' }}>
            <li>❌ Advertising cookies</li>
            <li>❌ Marketing cookies</li>
            <li>❌ Behavioral tracking cookies</li>
            <li>❌ Third-party analytics or advertising cookies</li>
          </ul>
          <p style={{ marginBottom: '20px' }}>
            For more information, see our Cookie Policy.
          </p>

          <h2 style={{ fontSize: '24px', color: '#2d3748', marginTop: '30px', marginBottom: '16px', fontFamily: 'Manrope, sans-serif' }}>
            9. Data Security
          </h2>
          <p style={{ marginBottom: '20px' }}>
            We implement appropriate technical and organizational measures to protect your personal data, including:
          </p>
          <ul style={{ marginBottom: '20px', paddingLeft: '20px' }}>
            <li>Encryption of data in transit (HTTPS/TLS)</li>
            <li>Secure password hashing (bcrypt)</li>
            <li>Regular security assessments</li>
            <li>Access controls and authentication</li>
            <li>Secure hosting infrastructure</li>
          </ul>

          <h2 style={{ fontSize: '24px', color: '#2d3748', marginTop: '30px', marginBottom: '16px', fontFamily: 'Manrope, sans-serif' }}>
            10. International Data Transfers
          </h2>
          <p style={{ marginBottom: '20px' }}>
            Your data may be transferred to and processed in countries outside your country of residence. We ensure appropriate safeguards are in place, including:
          </p>
          <ul style={{ marginBottom: '20px', paddingLeft: '20px' }}>
            <li>Standard Contractual Clauses (SCCs) approved by the European Commission</li>
            <li>Adequacy decisions by relevant authorities</li>
            <li>Other legally approved transfer mechanisms</li>
          </ul>

          <h2 style={{ fontSize: '24px', color: '#2d3748', marginTop: '30px', marginBottom: '16px', fontFamily: 'Manrope, sans-serif' }}>
            11. Children's Privacy
          </h2>
          <p style={{ marginBottom: '20px' }}>
            Our platform is not intended for children under 16 years of age. We do not knowingly collect personal data from children. If you believe we have collected data from a child, please contact us immediately.
          </p>

          <h2 style={{ fontSize: '24px', color: '#2d3748', marginTop: '30px', marginBottom: '16px', fontFamily: 'Manrope, sans-serif' }}>
            12. Changes to This Policy
          </h2>
          <p style={{ marginBottom: '20px' }}>
            We may update this privacy policy from time to time. We will notify you of any material changes by posting the new policy on this page and updating the "Last Updated" date.
          </p>

          <h2 style={{ fontSize: '24px', color: '#2d3748', marginTop: '30px', marginBottom: '16px', fontFamily: 'Manrope, sans-serif' }}>
            13. Contact Us
          </h2>
          <p style={{ marginBottom: '20px' }}>
            If you have any questions about this privacy policy or our data practices, please contact us:
          </p>
          <p style={{ marginBottom: '20px' }}>
            <strong>Email:</strong> privacy@trtourpackage.com<br />
            <strong>Data Protection Officer:</strong> dpo@trtourpackage.com
          </p>

          <div style={{ padding: '16px', background: '#f7fafc', borderRadius: '8px', marginTop: '40px', border: '1px solid #e2e8f0' }}>
            <p style={{ fontSize: '14px', color: '#2d3748', margin: 0, fontWeight: '600', marginBottom: '8px' }}>
              For Turkish Users:
            </p>
            <p style={{ fontSize: '14px', color: '#718096', margin: 0 }}>
              Türk kullanıcılar için KVKK Aydınlatma Metni'ni <Link href="/kvkk" style={{ color: '#4299e1', textDecoration: 'underline' }}>buradan</Link> inceleyebilirsiniz.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
