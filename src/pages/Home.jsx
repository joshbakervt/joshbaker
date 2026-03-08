import { Link } from 'react-router-dom'
import { getPublishedPosts } from '../utils/blogStore'
import './Home.css'

export default function Home() {
  const latestPosts = getPublishedPosts().slice(0, 3)

  return (
    <div className="home">

      {/* ── Hero ── */}
      <section className="hero">
        <h1 className="hero-name">Josh Baker.</h1>
        <p className="hero-role">Software engineer. Music producer. Builder.</p>
        <p className="hero-bio">
          I write backend systems at Cox Automotive and build things on the side
          that I can't stop thinking about.
        </p>
        <div className="hero-links">
          <a href="https://github.com/joshbakervt" target="_blank" rel="noreferrer">GitHub ↗</a>
          <a href="https://soundcloud.com/iseverybodyhere" target="_blank" rel="noreferrer">SoundCloud ↗</a>
          <a href="mailto:hello@joshbaker.dev">Email ↗</a>
        </div>
      </section>

      {/* ── About ── */}
      <section className="section" id="about">
        <div className="section-label-row">
          <div className="section-rule" />
          <span className="section-label">About</span>
        </div>
        <div className="prose">
          <p>
            I've been at Cox Automotive since September 2023, working on the systems
            that handle user management and session logic — the infrastructure that
            decides who you are and what you're allowed to do. A lot of it lives
            beneath the surface. I built our user permissions manager end to end:
            the REST APIs, the Terraform, and the React interface on top of it.
            Work that rewards getting the details right, on a team with a lot of
            ownership over what it ships.
          </p>
          <p>
            Earlier this year I spent a few months embedded in a company initiative
            exploring how AI agents could change how product management works. More
            thinking than coding — understanding where these tools actually help,
            where they fall short, and what that implies about where software is going.
            Good questions came out of it.
          </p>
          <p>
            Outside of that: I make music. Mostly house and disco, with plenty of
            side trips. I post things to{' '}
            <a href="https://soundcloud.com/iseverybodyhere" target="_blank" rel="noreferrer">
              SoundCloud
            </a>{' '}
            when they're ready. I'm also pulled toward the seam where music and
            software overlap — tools, generative experiments, things that don't fit
            neatly into either world. Some of them ship.
          </p>
          <p>
            I run. Finished my first marathon last October. I read a lot — philosophy
            mostly, fiction when I need a break from it. I'm in Burlington, Vermont,
            which isn't where most engineers end up, and I think that's the point.
          </p>
        </div>
      </section>

      {/* ── Photos ── */}
      <section className="section" id="photos">
        <div className="section-label-row">
          <div className="section-rule" />
          <span className="section-label">Photos</span>
        </div>
        <div className="photos-grid">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="photo-slot" />
          ))}
        </div>
        <p className="photos-note">Coming soon.</p>
      </section>

      {/* ── Writing ── */}
      <section className="section" id="writing">
        <div className="section-label-row">
          <div className="section-rule" />
          <span className="section-label">Writing</span>
        </div>
        {latestPosts.length === 0 ? (
          <p className="writing-empty">Posts coming soon.</p>
        ) : (
          <ul className="writing-list">
            {latestPosts.map(post => (
              <li key={post.id}>
                <Link to={`/blog/${post.slug}`} className="writing-item">
                  <span className="writing-title">{post.title}</span>
                  <span className="writing-date">
                    {new Date(post.createdAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
        <div className="writing-footer">
          <Link to="/blog" className="writing-all">All posts →</Link>
        </div>
      </section>

    </div>
  )
}
