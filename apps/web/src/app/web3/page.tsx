'use client'

import { useEffect, useState } from 'react'
import { bootnodeUrl, listChains, type BootnodeChain } from '@/lib/bootnode'

export default function Web3Page() {
  const [chains, setChains] = useState<BootnodeChain[]>([])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    listChains()
      .then((list) => {
        if (!cancelled) setChains(list)
      })
      .catch((e) => {
        if (!cancelled) setError(e instanceof Error ? e.message : String(e))
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <main style={{ padding: 48 }}>
      <h1>Web3 Infrastructure</h1>
      <p>
        Powered by <a href={bootnodeUrl}>Bootnode</a> — provision validator and
        RPC nodes for Zoo research chains, manage endpoints, and view sync state.
      </p>

      <section style={{ marginTop: 32 }}>
        <h2>Chains</h2>
        {loading ? (
          <p>Loading…</p>
        ) : error ? (
          <p style={{ color: 'crimson' }}>
            Could not reach bootnode at <code>{bootnodeUrl}</code>: {error}
          </p>
        ) : chains.length === 0 ? (
          <p>No chains registered yet. Connect bootnode to begin.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Chain</th>
                <th>Network</th>
                <th>Status</th>
                <th>RPC</th>
              </tr>
            </thead>
            <tbody>
              {chains.map((c) => (
                <tr key={c.id}>
                  <td>{c.name}</td>
                  <td>{c.network}</td>
                  <td>{c.status}</td>
                  <td>
                    <code>{c.rpcUrl}</code>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      <section style={{ marginTop: 32 }}>
        <h2>Manage</h2>
        <p>
          Full node-management UI is hosted by Bootnode at{' '}
          <a href={bootnodeUrl}>{bootnodeUrl}</a>. Single sign-on via Zoo IAM
          (zoo.id).
        </p>
      </section>
    </main>
  )
}
