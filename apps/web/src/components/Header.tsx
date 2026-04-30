import { Link } from 'wouter'
import { Logo } from './Logo'
import { TryZoo } from './TryZoo'

export function Header() {
  return (
    <header className="site">
      <div className="inner">
        <Logo />
        <nav className="primary">
          <Link href="/services">Products</Link>
          <a href="https://docs.zoo.network">Docs</a>
          <a href="https://zoo.network">Network</a>
        </nav>
        <div className="right-side">
          <TryZoo />
          <a href="https://zoo.id" className="btn">Sign In</a>
          <Link href="/dashboard" className="btn primary">Dashboard</Link>
        </div>
      </div>
    </header>
  )
}
