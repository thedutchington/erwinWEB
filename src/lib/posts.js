/**
 * Parses a YAML frontmatter block from a raw markdown string.
 * Supports: string values, date values (YYYY-MM-DD), array values ([a, b, c]).
 */
function parseFrontmatter(raw) {
    const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/)
    if (!match) return { data: {}, content: raw }

    const yamlBlock = match[1]
    const content = match[2].trim()
    const data = {}

    for (const line of yamlBlock.split('\n')) {
        const colonIdx = line.indexOf(':')
        if (colonIdx === -1) continue

        const key = line.slice(0, colonIdx).trim().toLowerCase()
        const rawVal = line.slice(colonIdx + 1).trim()

        if (!key || !rawVal) continue

        // Array: [a, b, c]
        if (rawVal.startsWith('[') && rawVal.endsWith(']')) {
            data[key] = rawVal
                .slice(1, -1)
                .split(',')
                .map((v) => v.trim())
            continue
        }

        // Date: YYYY-MM-DD (bare, no quotes)
        if (/^\d{4}-\d{2}-\d{2}$/.test(rawVal)) {
            data[key] = rawVal
            continue
        }

        // Plain string (strip optional quotes)
        data[key] = rawVal.replace(/^['"]|['"]$/g, '')
    }

    return { data, content }
}

/**
 * Converts raw markdown content body into an array of paragraph strings.
 * Splits on double newlines. Does not render HTML.
 */
export function parseMarkdownParagraphs(content) {
    return content.split(/\n\n+/).filter(Boolean).map((p) => p.replace(/\n/g, ' ').trim())
}

/**
 * Loads all posts from src/posts/*.md using Vite's import.meta.glob.
 * Returns a sorted (newest first) array of post objects.
 */
export function loadPosts() {
    // Import all .md files as raw strings
    const modules = import.meta.glob('../posts/*.md', { query: '?raw', import: 'default', eager: true })

    const posts = Object.entries(modules).map(([filePath, raw]) => {
        // Derive slug from filename: ../posts/my-post.md → 'my-post'
        const slug = filePath.replace(/^.*\//, '').replace(/\.md$/, '')
        const { data, content } = parseFrontmatter(raw)

        return {
            slug,
            title: data.title || slug,
            date: data.date || '1970-01-01',
            author: data.author || 'Caden Erwin',
            tags: Array.isArray(data.tags) ? data.tags : data.tags ? [data.tags] : [],
            excerpt: data.excerpt || '',
            content,
        }
    })

    // Sort newest first
    return posts.sort((a, b) => (a.date > b.date ? -1 : 1))
}
