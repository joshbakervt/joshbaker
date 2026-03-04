import './Header.css'

export default function Header() {
  return (
    <header className="header">
      <div className="header-inner">
        <a href="/" className="header-logo">Josh Baker</a>
        <nav className="header-nav">
          <a href="#about">About</a>
          <a href="#projects">Projects</a>
        </nav>
      </div>
    </header>
  )
}
