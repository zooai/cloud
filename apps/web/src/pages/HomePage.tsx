import { Link } from 'wouter'

const FEATURES = [
  { icon: '◉', title: 'Node', desc: 'Multi-chain RPC with 99.999% uptime across 100+ networks.', href: '/services#node' },
  { icon: '▤', title: 'Data', desc: 'Token, NFT, transfer, and on-chain event APIs.', href: '/services#data' },
  { icon: '◈', title: 'Wallets', desc: 'MPC wallets with account abstraction. No seed phrases.', href: '/services#wallets' },
  { icon: '▦', title: 'Rollups', desc: 'Launch L1/L2 rollups on Zoo with native tooling.', href: '/services#rollups' },
]

export function HomePage() {
  return (
    <main className="page">
      <section className="hero">
        <h1>
          Build anything <span className="prismatic">onchain</span>
        </h1>
        <p className="sub">
          Enterprise blockchain infrastructure for the Zoo Network ecosystem.
          Multi-chain RPC, MPC wallets, bridges, DEX, and white-label chain deployment.
        </p>
        <div className="actions">
          <Link href="/dashboard" className="btn primary">Start Building →</Link>
          <a href="https://docs.zoo.network" className="btn">View Documentation</a>
        </div>
      </section>

      <section className="grid">
        <h2>Everything you need to build Web3</h2>
        <p>From RPC endpoints to account abstraction, Zoo Cloud provides the complete infrastructure stack for blockchain developers.</p>
        <div className="cards">
          {FEATURES.map((f) => (
            <div className="card" key={f.title}>
              <div className="icon" style={{ fontSize: 24 }}>{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
              <Link href={f.href} className="more">Learn more</Link>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
