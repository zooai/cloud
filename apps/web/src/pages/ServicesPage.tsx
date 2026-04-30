const SERVICES = [
  { name: 'Multi-chain RPC', desc: 'Dedicated endpoints across Ethereum, Solana, Bitcoin, Zoo, and 100+ networks.' },
  { name: 'MPC Wallets',     desc: 'Threshold-signed custody (CGGMP21 ECDSA + FROST EdDSA). No seed phrases, no single points.' },
  { name: 'Node Hosting',    desc: 'Validators, archive nodes, RPC, bootnodes. Managed or self-hosted on Zoo K8s.' },
  { name: 'Bridges',         desc: 'Native and wrapped cross-chain transfers via Zoo Bridge.' },
  { name: 'DEX + AMM',       desc: 'Spot, orderbook, and automated market making on Zoo Exchange.' },
  { name: 'Chain Launch',    desc: 'One-click L1/L2 rollup deployment with Zoo consensus + post-quantum security.' },
  { name: 'Explorer + Data', desc: 'Multi-chain explorer, token APIs, NFT APIs, event streaming, analytics.' },
  { name: 'KMS',             desc: 'Secrets, keys, encryption-as-a-service. HSM-backed, per-org isolation.' },
]

export function ServicesPage() {
  return (
    <main className="page">
      <section className="hero">
        <h1>Services</h1>
        <p className="sub">Composable infrastructure for blockchain builders — pick what you need.</p>
      </section>

      <section className="grid" style={{ marginTop: 64, paddingTop: 0, borderTop: 'none' }}>
        <div className="cards">
          {SERVICES.map((s) => (
            <div className="card" key={s.name}>
              <h3>{s.name}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
