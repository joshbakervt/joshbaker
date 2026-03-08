import { Link } from 'react-router-dom'
import { getPublishedPosts } from '../utils/blogStore'
import './Blog.css'

export default function Blog() {
  const posts = getPublishedPosts()

  return (
    <div className="blog-page">
      <div className="section-label-row">
        <div className="section-rule" />
        <span className="section-label">Writing</span>
      </div>

      {posts.length === 0 ? (
        <div className="blog-empty">
          <p>Nothing here yet.</p>
        </div>
      ) : (
        <ul className="blog-list">
          {posts.map(post => (
            <li key={post.id} className="blog-list-item">
              <Link to={`/blog/${post.slug}`} className="blog-card">
                <div className="blog-card-meta">
                  <span className="blog-card-date">
                    {new Date(post.createdAt).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </span>
                </div>
                <h2 className="blog-card-title">{post.title}</h2>
                {post.excerpt && (
                  <p className="blog-card-excerpt">{post.excerpt}</p>
                )}
                <span className="blog-card-read">Read →</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
