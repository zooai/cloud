import { Link } from 'wouter'

export function DashboardPage() {
  return (
    <main className="page">
      <section className="hero">
        <h1>Dashboard</h1>
        <p className="sub">Sign in with Zoo ID to launch nodes, wallets, bridges, and chains.</p>
        <div className="actions">
          <a href="https://zoolabs.id" className="btn primary">Sign in with Zoo ID →</a>
          <Link href="/services" className="btn">Browse services</Link>
        </div>
      </section>
    </main>
  )
}
