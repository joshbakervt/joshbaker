import { NavLink } from 'react-router-dom'
import './Header.css'

export default function Header() {
  return (
    <header className="header">
      <div className="header-inner">
        <NavLink to="/" className="header-logo">
          Josh Baker
        </NavLink>
        <nav className="header-nav">
          <NavLink to="/#about" className="header-nav-link">About</NavLink>
          <NavLink to="/blog" className={({ isActive }) => `header-nav-link${isActive ? ' active' : ''}`}>
            Writing
          </NavLink>
          <a href="mailto:hello@joshbaker.dev" className="header-nav-link">Contact</a>
        </nav>
      </div>
    </header>
  )
}
