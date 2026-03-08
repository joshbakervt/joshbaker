import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <span className="footer-name">Josh Baker</span>
        <div className="footer-links">
          <a href="https://github.com/joshbakervt" target="_blank" rel="noreferrer">GitHub</a>
          <a href="https://soundcloud.com/iseverybodyhere" target="_blank" rel="noreferrer">SoundCloud</a>
        </div>
        <span className="footer-copy">© {new Date().getFullYear()}</span>
      </div>
    </footer>
  )
}
