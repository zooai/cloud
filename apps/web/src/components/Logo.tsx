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
      <img src="/logo.svg" alt="" className="logo-mark" width="20" height="20" />
      <span className="logo-word">Zoo Cloud</span>
    </Link>
  )
}
