import { useParams, Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { getPostBySlug } from '../utils/blogStore'
import './BlogPost.css'

export default function BlogPost() {
  const { slug } = useParams()
  const post = getPostBySlug(slug)

  if (!post) {
    return (
      <div className="post-page">
        <div className="post-not-found">
          <span className="section-label">404</span>
          <h1>Post not found.</h1>
          <Link to="/blog">← Back to writing</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="post-page">
      <Link to="/blog" className="post-back">← Writing</Link>

      <header className="post-header">
        <div className="section-label-row">
          <div className="section-rule" />
          <span className="section-label">
            {new Date(post.createdAt).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })}
          </span>
        </div>
        <h1 className="post-title">{post.title}</h1>
        {post.excerpt && <p className="post-excerpt">{post.excerpt}</p>}
      </header>

      <article className="prose post-body">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {post.content}
        </ReactMarkdown>
      </article>

      <div className="post-footer">
        <Link to="/blog" className="post-back-bottom">← All posts</Link>
      </div>
    </div>
  )
}
