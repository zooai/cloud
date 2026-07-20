import { useState } from 'react'
import { Link } from 'wouter'
import { useIam } from '@hanzo/iam/react'
import { Logo } from './Logo'
import { TryZoo } from './TryZoo'

export function Header() {
  const { isAuthenticated, isLoading, login, logout, user } = useIam()
  // Below the mobile breakpoint the nav + actions collapse into a dropdown
  // toggled by the hamburger; keeps the row within 390px and Sign In reachable.
  const [menuOpen, setMenuOpen] = useState(false)
  const closeMenu = () => setMenuOpen(false)

  return (
    <header className="site">
      <div className="inner">
        <Logo />
        <button
          type="button"
          className="nav-toggle"
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span aria-hidden="true">{menuOpen ? '✕' : '☰'}</span>
        </button>
        <div className={menuOpen ? 'nav-collapse open' : 'nav-collapse'}>
          <nav className="primary">
            <Link href="/services" onClick={closeMenu}>Products</Link>
            <a href="https://zoo.ngo/docs/">Docs</a>
            <a href="https://zoo.network">Network</a>
          </nav>
          <div className="right-side">
            <TryZoo />
            {isLoading ? null : isAuthenticated ? (
              <button type="button" className="btn" onClick={() => { closeMenu(); logout() }}>
                {user?.email ? `Sign out (${user.email})` : 'Sign out'}
              </button>
            ) : (
              <button type="button" className="btn" onClick={() => { closeMenu(); login() }}>
                Sign In
              </button>
            )}
            <Link href="/dashboard" className="btn primary" onClick={closeMenu}>Dashboard</Link>
          </div>
        </div>
      </div>
    </header>
  )
}
