'use client'

import { useState, useRef, useEffect } from 'react'
import { Globe } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import { languages } from '@/lib/translations'

export default function LanguageSelector() {
  const { language, setLanguage } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div ref={dropdownRef} style={{ position: 'relative' }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          padding: '8px 12px',
          background: 'white',
          border: '1px solid #e2e8f0',
          borderRadius: '8px',
          cursor: 'pointer',
          fontSize: '14px',
          fontFamily: 'Inter, sans-serif',
          color: '#2d3748',
          transition: 'all 0.2s'
        }}
      >
        <Globe size={18} color="#718096" />
        <span>{languages[language]}</span>
      </button>

      {isOpen && (
        <div style={{
          position: 'absolute',
          top: '100%',
          right: 0,
          marginTop: '8px',
          background: 'white',
          border: '1px solid #e2e8f0',
          borderRadius: '8px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
          minWidth: '180px',
          maxHeight: '400px',
          overflowY: 'auto',
          zIndex: 1000
        }}>
          {Object.entries(languages).map(([code, name]) => (
            <button
              key={code}
              onClick={() => {
                setLanguage(code as any)
                setIsOpen(false)
              }}
              style={{
                width: '100%',
                padding: '10px 16px',
                textAlign: 'left',
                background: language === code ? '#f7fafc' : 'white',
                border: 'none',
                cursor: 'pointer',
                fontSize: '14px',
                fontFamily: 'Inter, sans-serif',
                color: language === code ? '#e53e3e' : '#2d3748',
                fontWeight: language === code ? '600' : '400',
                transition: 'background 0.2s'
              }}
              onMouseEnter={(e) => {
                if (language !== code) {
                  e.currentTarget.style.background = '#f7fafc'
                }
              }}
              onMouseLeave={(e) => {
                if (language !== code) {
                  e.currentTarget.style.background = 'white'
                }
              }}
            >
              {name}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
