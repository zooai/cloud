import { Link } from 'wouter'
import { useIam } from '@hanzo/iam/react'
import { Logo } from './Logo'
import { TryZoo } from './TryZoo'

export function Header() {
  const { isAuthenticated, isLoading, login, logout, user } = useIam()

  return (
    <header className="site">
      <div className="inner">
        <Logo />
        <nav className="primary">
          <Link href="/services">Products</Link>
          <a href="https://zoo.ngo/docs/">Docs</a>
          <a href="https://zoo.network">Network</a>
        </nav>
        <div className="right-side">
          <TryZoo />
          {isLoading ? null : isAuthenticated ? (
            <button type="button" className="btn" onClick={() => logout()}>
              {user?.email ? `Sign out (${user.email})` : 'Sign out'}
            </button>
          ) : (
            <button type="button" className="btn" onClick={() => login()}>
              Sign In
            </button>
          )}
          <Link href="/dashboard" className="btn primary">Dashboard</Link>
        </div>
      </div>
    </header>
  )
}
