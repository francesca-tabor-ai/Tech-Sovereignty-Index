import { ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Globe, Zap, ShoppingCart, BookOpen, BarChart3, MessageCircle } from 'lucide-react'

interface LayoutProps {
  children: ReactNode
}

const navItems = [
  { path: '/', label: 'Dashboard', icon: Globe },
  { path: '/simulator', label: 'Decoupling Simulator', icon: Zap },
  { path: '/procurement', label: 'EuroStack Filter', icon: ShoppingCart },
  { path: '/methodology', label: 'Methodology', icon: BookOpen },
]

export default function Layout({ children }: LayoutProps) {
  const location = useLocation()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b" style={{ borderColor: 'var(--color-gray-200)' }}>
        <div className="container">
          <div className="flex items-center justify-between" style={{ height: '64px' }}>
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3" style={{ textDecoration: 'none' }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: 'var(--radius-lg)',
                background: 'linear-gradient(135deg, var(--color-purple-600), var(--color-blue-600))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <BarChart3 size={20} color="white" />
              </div>
              <div>
                <div style={{
                  fontSize: '1.125rem',
                  fontWeight: 600,
                  color: 'var(--color-black)',
                  lineHeight: 1.2
                }}>
                  Tech Sovereignty Index
                </div>
                <div style={{
                  fontSize: '0.6875rem',
                  color: 'var(--color-gray-500)',
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase'
                }}>
                  Full-Stack Control Assessment
                </div>
              </div>
            </Link>

            {/* Navigation */}
            <nav className="flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path
                const Icon = item.icon
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg transition"
                    style={{
                      fontSize: '0.875rem',
                      fontWeight: 500,
                      color: isActive ? 'var(--color-gray-900)' : 'var(--color-gray-600)',
                      background: isActive ? 'var(--color-gray-100)' : 'transparent',
                      textDecoration: 'none'
                    }}
                  >
                    <Icon size={16} />
                    <span>{item.label}</span>
                  </Link>
                )
              })}
            </nav>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main style={{ paddingTop: 'var(--space-8)', paddingBottom: 'var(--space-16)' }}>
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t bg-white" style={{ borderColor: 'var(--color-gray-200)' }}>
        <div className="container">
          <div className="flex items-center justify-between py-6">
            <div className="text-sm text-muted">
              Open-source scoring algorithm. Data updated quarterly.
            </div>
            <div className="flex items-center gap-6">
              <a
                href={`mailto:francesca.tabor.politics@gmail.com?subject=${encodeURIComponent('Sharing a thought about the platform')}&body=${encodeURIComponent(`Hi Francesca,

I wanted to share a thought about the platform.

I was trying to...

Something felt confusing when...

I really liked...

I wish I could...

(Optional)
What I was doing when this came up:


Thanks!`)}`}
                className="flex items-center gap-2 text-sm"
                style={{
                  textDecoration: 'none',
                  color: 'var(--color-purple-600)',
                  fontWeight: 500
                }}
                title="This opens your email app so you can send us a note directly"
              >
                <MessageCircle size={14} />
                Share your thoughts
              </a>
              <a href="#" className="text-sm text-muted" style={{ textDecoration: 'none' }}>
                API Access
              </a>
              <a href="#" className="text-sm text-muted" style={{ textDecoration: 'none' }}>
                GitHub
              </a>
              <a href="#" className="text-sm text-muted" style={{ textDecoration: 'none' }}>
                Data Sources
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
