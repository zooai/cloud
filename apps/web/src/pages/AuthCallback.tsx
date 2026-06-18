import { useEffect, useState } from 'react'
import { useLocation } from 'wouter'
import { useIam } from '@hanzo/iam/react'

// OAuth2 PKCE callback (HIP-0111). The IAM SDK validates state, exchanges
// the code at the token endpoint, and stores tokens; then we return to the
// dashboard.
export function AuthCallback() {
  const { handleCallback } = useIam()
  const [, navigate] = useLocation()
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    handleCallback()
      .then(() => navigate('/dashboard', { replace: true }))
      .catch((e: unknown) => setError(e instanceof Error ? e.message : String(e)))
  }, [handleCallback, navigate])

  return (
    <main className="page">
      <section className="hero">
        {error ? (
          <>
            <h1>Sign-in failed</h1>
            <p className="sub">{error}</p>
            <div className="actions">
              <a href="/dashboard" className="btn primary">Try again</a>
            </div>
          </>
        ) : (
          <p className="sub">Signing you in…</p>
        )}
      </section>
    </main>
  )
}
