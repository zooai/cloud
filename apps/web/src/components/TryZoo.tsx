import { useEffect, useRef, useState } from 'react'

type App = { name: string; href: string; desc: string }

const APPS: App[] = [
  { name: 'Node', href: '/dashboard/nodes', desc: 'Launch multi-chain RPC' },
  { name: 'Validator', href: 'https://stake.zoo.network', desc: 'Run a Zoo validator' },
  { name: 'Bridge', href: 'https://bridge.zoo.network', desc: 'Cross-chain assets' },
  { name: 'DEX', href: 'https://exchange.zoo.network', desc: 'Swap + add liquidity' },
  { name: 'Explorer', href: 'https://explore.zoo.network', desc: 'Chain data + tokens' },
  { name: 'Wallet', href: 'https://wallet.zoo.network', desc: 'Multi-chain MPC wallet' },
  { name: 'Chain', href: '/dashboard/rollups', desc: 'Deploy L1/L2 rollup' },
  { name: 'Status', href: 'https://status.zoo.network', desc: 'Uptime + incidents' },
]

export function TryZoo() {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const handle = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('click', handle)
    return () => document.removeEventListener('click', handle)
  }, [open])

  return (
    <div className="try-zoo" ref={ref}>
      <button
        className="btn"
        onClick={(e) => {
          e.stopPropagation()
          setOpen(!open)
        }}
      >
        Try Zoo <span style={{ opacity: 0.6 }}>↓</span>
      </button>
      {open && (
        <div className="try-zoo-panel">
          <h4>Launch on Zoo</h4>
          {APPS.map((a) => (
            <a key={a.name} href={a.href} className="app">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <div style={{ flex: 1 }}>
                <div className="app-name">{a.name}</div>
                <div className="app-desc">{a.desc}</div>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  )
}
