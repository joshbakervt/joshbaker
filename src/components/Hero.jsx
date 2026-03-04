import './Hero.css'

export default function Hero() {
  return (
    <section className="hero">
      <h1>Hi, I'm Josh.</h1>
      <p className="hero-tagline">
        I build things for the web.
      </p>
      <div className="hero-links">
        <a href="https://github.com" target="_blank" rel="noreferrer">GitHub</a>
        <a href="mailto:hello@example.com">Email</a>
      </div>
    </section>
  )
}
