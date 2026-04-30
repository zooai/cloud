export function Footer() {
  return (
    <footer className="site">
      <div className="inner">
        <div>© {new Date().getFullYear()} Zoo Industries</div>
        <nav>
          <a href="https://zoo.network">Zoo Network</a>
          <a href="https://zoo.ngo/docs/">Docs</a>
          <a href="https://github.com/zooai">GitHub</a>
          <a href="https://zoo.ngo">Foundation</a>
        </nav>
      </div>
    </footer>
  )
}
