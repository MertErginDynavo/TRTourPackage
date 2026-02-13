'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

export default function FAQ() {
  const { t } = useLanguage()
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs = [
    { q: t.faq1Q || 'Is TRTourPackage free to use?', a: t.faq1A || 'Yes, completely free. We never charge travelers.' },
    { q: t.faq2Q || 'How many offers will I receive?', a: t.faq2A || 'Typically 3-5 offers within 24 hours.' },
    { q: t.faq3Q || 'Are all agencies verified?', a: t.faq3A || 'Yes. Every agency is TÜRSAB licensed.' },
    { q: t.faq4Q || 'What if I don\'t like any offers?', a: t.faq4A || 'No obligation. You can decline all offers.' },
    { q: t.faq5Q || 'How do I pay for my tour?', a: t.faq5A || 'You pay directly to the agency you choose.' },
    { q: t.faq6Q || 'Can I customize my tour?', a: t.faq6A || 'Absolutely! Agencies create custom itineraries.' },
    { q: t.faq7Q || 'What happens after I submit a request?', a: t.faq7A || 'Agencies review and send offers within 24 hours.' },
    { q: t.faq8Q || 'Is my personal information safe?', a: t.faq8A || 'Yes. We comply with KVKK and GDPR.' },
  ]

  return (
    <section style={{ padding: '80px 0', background: 'white' }}>
      <div className="container">
        <h2 style={{ textAlign: 'center', fontSize: '32px', fontWeight: '600', marginBottom: '48px', color: '#2d3748', fontFamily: 'Manrope, sans-serif' }}>
          {t.faqTitle || 'Frequently Asked Questions'}
        </h2>

        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          {faqs.map((faq, index) => (
            <div 
              key={index}
              style={{ 
                marginBottom: '16px',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                overflow: 'hidden',
                background: 'white'
              }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                style={{
                  width: '100%',
                  padding: '20px 24px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  background: openIndex === index ? '#f7fafc' : 'white',
                  border: 'none',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'background 0.2s'
                }}
              >
                <span style={{ 
                  fontSize: '16px', 
                  fontWeight: '600', 
                  color: '#2d3748',
                  fontFamily: 'Manrope, sans-serif',
                  paddingRight: '16px'
                }}>
                  {faq.q}
                </span>
                <ChevronDown 
                  size={20} 
                  color="#718096"
                  style={{
                    transform: openIndex === index ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.2s',
                    flexShrink: 0
                  }}
                />
              </button>
              
              {openIndex === index && (
                <div style={{ 
                  padding: '0 24px 20px 24px',
                  fontSize: '15px',
                  lineHeight: '1.7',
                  color: '#718096',
                  fontFamily: 'Inter, sans-serif'
                }}>
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Still have questions CTA */}
        <div style={{ 
          marginTop: '48px', 
          textAlign: 'center',
          padding: '32px',
          background: '#f7fafc',
          borderRadius: '12px',
          border: '1px solid #e2e8f0'
        }}>
          <h3 style={{ 
            fontSize: '20px', 
            fontWeight: '600', 
            marginBottom: '12px', 
            color: '#2d3748',
            fontFamily: 'Manrope, sans-serif'
          }}>
            Still have questions?
          </h3>
          <p style={{ 
            fontSize: '15px', 
            color: '#718096', 
            marginBottom: '20px',
            fontFamily: 'Inter, sans-serif'
          }}>
            Our team is here to help you plan your perfect Turkey tour.
          </p>
          <a 
            href="/contact" 
            className="btn"
            style={{ 
              textDecoration: 'none',
              background: '#e53e3e',
              color: 'white',
              display: 'inline-block'
            }}
          >
            Contact Us
          </a>
        </div>
      </div>
    </section>
  )
}
