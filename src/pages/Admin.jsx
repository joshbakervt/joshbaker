import { useState, useEffect, useRef } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import * as store from '../utils/blogStore'
import './Admin.css'

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'joshbaker'

// ── Sub-views ────────────────────────────────────────────────────────────────

function LoginScreen({ onSuccess }) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  function submit() {
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem('admin_auth', '1')
      onSuccess()
    } else {
      setError('Incorrect password.')
      setPassword('')
    }
  }

  return (
    <div className="adm-login">
      <div className="adm-login-card">
        <div className="adm-mono-label">Admin</div>
        <h1 className="adm-login-title">joshbaker.dev</h1>
        <input
          type="password"
          className="adm-input"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && submit()}
          autoFocus
        />
        {error && <p className="adm-error">{error}</p>}
        <button className="adm-btn-primary" onClick={submit}>Enter</button>
      </div>
    </div>
  )
}

function PostList({ posts, onNew, onEdit, onTogglePublish, onDelete, onExport, onImport, onLogout }) {
  const fileRef = useRef()

  function handleImportFile(e) {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = ev => onImport(ev.target.result)
    reader.readAsText(file)
    // Reset so the same file can be re-imported
    e.target.value = ''
  }

  return (
    <div className="adm-wrap">
      <div className="adm-header">
        <div>
          <div className="adm-mono-label">Management</div>
          <h1 className="adm-page-title">Writing</h1>
        </div>
        <div className="adm-header-actions">
          <input
            ref={fileRef}
            type="file"
            accept=".json"
            style={{ display: 'none' }}
            onChange={handleImportFile}
          />
          <button className="adm-btn-ghost" onClick={() => fileRef.current.click()}>Import</button>
          <button className="adm-btn-ghost" onClick={onExport}>Export</button>
          <button className="adm-btn-primary" onClick={onNew}>New post</button>
          <button className="adm-btn-ghost adm-logout" onClick={onLogout}>Log out</button>
        </div>
      </div>

      <div className="adm-notice">
        Posts live in this browser's storage. To make them visible on the live site:
        <strong> Export → replace src/data/posts.json → commit → push.</strong>
      </div>

      {posts.length === 0 ? (
        <div className="adm-empty">
          <p>No posts yet.</p>
          <button className="adm-btn-primary" onClick={onNew}>Write your first post</button>
        </div>
      ) : (
        <ul className="adm-post-list">
          {posts.map(post => (
            <li key={post.id} className="adm-post-row">
              <div className="adm-post-info">
                <span className={`adm-status ${post.published ? 'published' : 'draft'}`}>
                  {post.published ? 'Published' : 'Draft'}
                </span>
                <span className="adm-post-title">{post.title}</span>
                <span className="adm-post-date">
                  {new Date(post.updatedAt).toLocaleDateString('en-US', {
                    month: 'short', day: 'numeric', year: 'numeric',
                  })}
                </span>
              </div>
              <div className="adm-post-actions">
                <button className="adm-btn-ghost" onClick={() => onEdit(post)}>Edit</button>
                <button className="adm-btn-ghost" onClick={() => onTogglePublish(post)}>
                  {post.published ? 'Unpublish' : 'Publish'}
                </button>
                <button
                  className="adm-btn-ghost adm-btn-danger"
                  onClick={() => onDelete(post.id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

function Editor({ post, onBack, onSaved }) {
  const [title, setTitle]     = useState(post?.title   || '')
  const [content, setContent] = useState(post?.content || '')
  const [excerpt, setExcerpt] = useState(post?.excerpt || '')
  const [preview, setPreview] = useState(false)
  const [dirty, setDirty]     = useState(false)

  function markDirty() { setDirty(true) }

  function save(publish) {
    if (!title.trim()) { alert('Please add a title.'); return }
    if (post) {
      store.updatePost(post.id, {
        title, content, excerpt,
        ...(publish ? { published: true } : {}),
      })
    } else {
      const p = store.createPost({ title, content, excerpt })
      if (publish) store.publishPost(p.id)
    }
    setDirty(false)
    onSaved()
  }

  function handleBack() {
    if (dirty && !window.confirm('You have unsaved changes. Leave anyway?')) return
    onBack()
  }

  return (
    <div className="adm-editor">
      <div className="adm-editor-bar">
        <button className="adm-back-btn" onClick={handleBack}>← Posts</button>
        <div className="adm-editor-actions">
          <button
            className="adm-btn-ghost"
            onClick={() => setPreview(p => !p)}
          >
            {preview ? 'Edit' : 'Preview'}
          </button>
          <button className="adm-btn-secondary" onClick={() => save(false)}>
            Save draft
          </button>
          <button className="adm-btn-primary" onClick={() => save(true)}>
            {post?.published ? 'Update' : 'Publish'}
          </button>
        </div>
      </div>

      <div className="adm-editor-fields">
        <input
          className="adm-title-input"
          placeholder="Post title"
          value={title}
          onChange={e => { setTitle(e.target.value); markDirty() }}
        />
        <input
          className="adm-excerpt-input"
          placeholder="Excerpt (optional — auto-generated from content if blank)"
          value={excerpt}
          onChange={e => { setExcerpt(e.target.value); markDirty() }}
        />
      </div>

      {preview ? (
        <div className="adm-preview prose">
          {content ? (
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
          ) : (
            <p className="adm-preview-empty">Nothing to preview yet.</p>
          )}
        </div>
      ) : (
        <textarea
          className="adm-content-input"
          placeholder="Write in Markdown…"
          value={content}
          onChange={e => { setContent(e.target.value); markDirty() }}
          spellCheck
        />
      )}
    </div>
  )
}

// ── Main component ───────────────────────────────────────────────────────────

export default function Admin() {
  const [authed, setAuthed] = useState(
    () => sessionStorage.getItem('admin_auth') === '1'
  )
  const [view, setView]       = useState('list') // 'list' | 'edit'
  const [editPost, setEditPost] = useState(null)
  const [posts, setPosts]     = useState([])

  function refresh() { setPosts(store.getAllPosts()) }

  useEffect(() => { if (authed) refresh() }, [authed])

  function openNew()      { setEditPost(null); setView('edit') }
  function openEdit(post) { setEditPost(post); setView('edit') }
  function backToList()   { setView('list'); setEditPost(null); refresh() }

  function handleTogglePublish(post) {
    if (post.published) store.unpublishPost(post.id)
    else store.publishPost(post.id)
    refresh()
  }

  function handleDelete(id) {
    if (!window.confirm('Delete this post permanently?')) return
    store.deletePost(id)
    refresh()
  }

  function handleExport() {
    const json = store.exportPostsJSON()
    const blob = new Blob([json], { type: 'application/json' })
    const url  = URL.createObjectURL(blob)
    const a    = document.createElement('a')
    a.href     = url
    a.download = 'posts.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  function handleImport(jsonString) {
    const result = store.importPostsJSON(jsonString)
    if (result.ok) { refresh(); alert('Posts imported successfully.') }
    else alert(`Import failed: ${result.error}`)
  }

  function logout() {
    sessionStorage.removeItem('admin_auth')
    setAuthed(false)
  }

  if (!authed) {
    return <LoginScreen onSuccess={() => setAuthed(true)} />
  }

  if (view === 'edit') {
    return <Editor post={editPost} onBack={backToList} onSaved={backToList} />
  }

  return (
    <PostList
      posts={posts}
      onNew={openNew}
      onEdit={openEdit}
      onTogglePublish={handleTogglePublish}
      onDelete={handleDelete}
      onExport={handleExport}
      onImport={handleImport}
      onLogout={logout}
    />
  )
}
