import { Link } from 'wouter'
import { useIam } from '@hanzo/iam/react'

export function DashboardPage() {
  const { isAuthenticated, isLoading, login, user } = useIam()

  if (isLoading) {
    return (
      <main className="page">
        <section className="hero">
          <p className="sub">Loading…</p>
        </section>
      </main>
    )
  }

  if (!isAuthenticated) {
    return (
      <main className="page">
        <section className="hero">
          <h1>Dashboard</h1>
          <p className="sub">Sign in with Zoo ID to launch nodes, wallets, bridges, and chains.</p>
          <div className="actions">
            <button type="button" className="btn primary" onClick={() => login()}>
              Sign in with Zoo ID →
            </button>
            <Link href="/services" className="btn">Browse services</Link>
          </div>
        </section>
      </main>
    )
  }

  return (
    <main className="page">
      <section className="hero">
        <h1>Welcome{user?.name ? `, ${user.name}` : ''}</h1>
        <p className="sub">Launch nodes, wallets, bridges, and chains.</p>
        <div className="actions">
          <Link href="/services" className="btn primary">Browse services</Link>
        </div>
      </section>
    </main>
  )
}
