import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <span className="footer-name">Josh Baker</span>
        <span className="footer-copy">© {new Date().getFullYear()}</span>
      </div>
    </footer>
  )
}
