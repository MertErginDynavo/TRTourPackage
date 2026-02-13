import Link from 'next/link'
import { Plane } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import LanguageSelector from './LanguageSelector'

interface NavbarProps {
  rightContent?: React.ReactNode
  showLinks?: boolean
}

export default function Navbar({ rightContent, showLinks = false }: NavbarProps) {
  const { t } = useLanguage()
  
  return (
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
        
        <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
          {showLinks && (
            <>
              <Link 
                href="/traveler/login" 
                style={{ 
                  textDecoration: 'none', 
                  color: '#2d3748',
                  fontSize: '15px',
                  fontWeight: '500',
                  transition: 'color 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#e53e3e'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#2d3748'}
              >
                {t.travelerLogin}
              </Link>
              <Link 
                href="/agency/login" 
                style={{ 
                  textDecoration: 'none', 
                  color: '#2d3748',
                  fontSize: '15px',
                  fontWeight: '500',
                  transition: 'color 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#e53e3e'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#2d3748'}
              >
                {t.agencyLogin}
              </Link>
              <Link 
                href="/agency/register" 
                style={{ 
                  textDecoration: 'none', 
                  padding: '8px 16px',
                  background: '#e53e3e',
                  color: 'white',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontWeight: '500',
                  transition: 'background 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = '#c53030'}
                onMouseLeave={(e) => e.currentTarget.style.background = '#e53e3e'}
              >
                Join as Agency
              </Link>
              <LanguageSelector />
            </>
          )}
          {rightContent && <div>{rightContent}</div>}
        </div>
      </div>
    </nav>
  )
}
