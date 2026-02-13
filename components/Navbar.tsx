import Link from 'next/link'
import { Plane } from 'lucide-react'

interface NavbarProps {
  rightContent?: React.ReactNode
}

export default function Navbar({ rightContent }: NavbarProps) {
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
        {rightContent && <div>{rightContent}</div>}
      </div>
    </nav>
  )
}
