import { useEffect, useState } from 'react'
import { Link } from 'wouter'

export function Logo() {
  const [collapsed, setCollapsed] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setCollapsed(true), 2500)
    return () => clearTimeout(t)
  }, [])

  return (
    <Link href="/" className={collapsed ? 'logo collapsed' : 'logo'}>
      <span className="logo-mark" aria-hidden="true" />
      <span className="logo-word">Zoo Cloud</span>
    </Link>
  )
}
