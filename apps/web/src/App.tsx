import { useEffect, useState, useRef } from 'react'
import { Route, Switch, Link } from 'wouter'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { HomePage } from './pages/HomePage'
import { DashboardPage } from './pages/DashboardPage'
import { ServicesPage } from './pages/ServicesPage'

export function App() {
  return (
    <>
      <Header />
      <Switch>
        <Route path="/" component={HomePage} />
        <Route path="/services" component={ServicesPage} />
        <Route path="/dashboard" component={DashboardPage} />
        <Route>
          <main className="page">
            <h1 style={{ fontSize: 48 }}>404</h1>
            <p style={{ marginTop: 16, color: 'var(--muted)' }}>
              Page not found. <Link href="/">Return home</Link>.
            </p>
          </main>
        </Route>
      </Switch>
      <Footer />
    </>
  )
}
