/**
 * blogStore.js
 *
 * localStorage-backed post store for the admin dashboard.
 * The public blog (/blog, /blog/:slug) reads from this same store.
 *
 * Publishing workflow:
 *   1. Write and publish posts in /admin
 *   2. Click "Export" → downloads posts.json
 *   3. Replace src/data/posts.json with the downloaded file
 *   4. Commit and push → site redeploys with your posts visible to everyone
 *
 * The store auto-seeds from src/data/posts.json on first load so any
 * committed posts are visible in the admin immediately.
 */

import seedPosts from '../data/posts.json'

const POSTS_KEY = 'jb_posts'
const INIT_KEY  = 'jb_initialized'

function initialize() {
  if (localStorage.getItem(INIT_KEY)) return
  localStorage.setItem(POSTS_KEY, JSON.stringify(seedPosts))
  localStorage.setItem(INIT_KEY, '1')
}

function load() {
  initialize()
  try {
    return JSON.parse(localStorage.getItem(POSTS_KEY)) || []
  } catch {
    return []
  }
}

function save(posts) {
  localStorage.setItem(POSTS_KEY, JSON.stringify(posts))
}

function makeSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

function autoExcerpt(content) {
  // Strip markdown syntax for a plain-text excerpt
  return content
    .replace(/#+\s/g, '')
    .replace(/\*\*(.+?)\*\*/g, '$1')
    .replace(/\*(.+?)\*/g, '$1')
    .replace(/\[(.+?)\]\(.+?\)/g, '$1')
    .replace(/`(.+?)`/g, '$1')
    .replace(/\n+/g, ' ')
    .trim()
    .slice(0, 220)
}

// ── Read ────────────────────────────────────────────────────────────────────

export function getAllPosts() {
  return load().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
}

export function getPublishedPosts() {
  return getAllPosts().filter(p => p.published)
}

export function getPostBySlug(slug) {
  return load().find(p => p.slug === slug) || null
}

// ── Write ────────────────────────────────────────────────────────────────────

export function createPost({ title, content, excerpt }) {
  const posts = load()
  const post = {
    id: crypto.randomUUID(),
    slug: makeSlug(title),
    title,
    content,
    excerpt: excerpt?.trim() || autoExcerpt(content),
    published: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
  save([...posts, post])
  return post
}

export function updatePost(id, changes) {
  const posts = load()
  const i = posts.findIndex(p => p.id === id)
  if (i === -1) return null
  // Auto-regenerate slug if title changes
  if (changes.title && changes.title !== posts[i].title) {
    changes.slug = makeSlug(changes.title)
  }
  posts[i] = { ...posts[i], ...changes, updatedAt: new Date().toISOString() }
  save(posts)
  return posts[i]
}

export function deletePost(id) {
  save(load().filter(p => p.id !== id))
}

export function publishPost(id) {
  return updatePost(id, { published: true })
}

export function unpublishPost(id) {
  return updatePost(id, { published: false })
}

// ── Import / Export ──────────────────────────────────────────────────────────

/**
 * Returns the current posts as a formatted JSON string.
 * Download this and commit as src/data/posts.json to publish to the live site.
 */
export function exportPostsJSON() {
  return JSON.stringify(load(), null, 2)
}

/**
 * Replaces the store with posts from an imported JSON file.
 * Use this to restore posts on a new device or browser.
 */
export function importPostsJSON(jsonString) {
  try {
    const posts = JSON.parse(jsonString)
    if (!Array.isArray(posts)) throw new Error('Expected an array of posts.')
    save(posts)
    return { ok: true }
  } catch (err) {
    return { ok: false, error: err.message }
  }
}
