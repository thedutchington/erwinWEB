# Content Guide

---

## ✍️ Writing a Blog Post

Posts are plain Markdown files. Just create a new file in **`src/posts/`** and it appears on the site automatically — no code changes required.

### Step 1: Create a file in `src/posts/`

Name the file using hyphens, all lowercase. The filename becomes the URL slug.

```
src/posts/my-new-post.md   →   /blog/my-new-post
```

### Step 2: Add the frontmatter header

Every post must start with this block (between the `---` lines):

```markdown
---
title: Your Post Title Here
date: 2026-03-01
author: Caden Erwin
tags: [Academic, Leadership]
excerpt: One sentence that appears on the blog listing page as a teaser.
---
```

| Field | Required | Notes |
|---|---|---|
| `title` | ✅ Yes | Displayed as the post heading |
| `date` | ✅ Yes | Format: `YYYY-MM-DD` — controls sort order |
| `author` | Optional | Defaults to Caden Erwin if omitted |
| `tags` | Optional | Available: `Academic`, `Leadership`, `ASB`, `Math`, `Tutoring`, `General` |
| `excerpt` | Optional | Summary shown on the blog feed; omit to show no excerpt |

### Step 3: Write your post

After the closing `---`, write your content in plain text. Separate paragraphs with a blank line.

```markdown
---
title: On Leading From the Middle
date: 2026-02-17
author: Caden Erwin
tags: [Leadership, ASB]
excerpt: Most leadership advice assumes you are at the top.
---

Your first paragraph goes here.

This is the second paragraph. Each blank line creates a new paragraph.
```

**That's it.** Save the file and the post is live. No code touching needed.

---

## Adding a New Custom Tag

Tags are inferred automatically from your posts. To create a new tag, just use it in a post's `tags:` field and it will appear in the filter bar on the blog page.

```
tags: [General, Personal]
```

---

## 📁 File Reference

| What to change | Where |
|---|---|
| Blog posts | `src/posts/*.md` |
| Contact email | `src/data.js` → `PROFILE.contact.email` |
| Booking link | `src/data.js` → `BOOKING_URL` |
| Nav links | `src/components/NavBar.jsx` → `NAV_LINKS` |
| Academic records | `src/data.js` → `ACADEMIC_RECORDS` |

---

## 📄 Adding a New Custom Page

If you need a full new page beyond the blog:

**1. Create the file** in `src/pages/MyPage.jsx` using this template:

```jsx
import React from 'react'
import { motion } from 'framer-motion'

export default function MyPage() {
  return (
    <div className="min-h-screen pt-32 pb-24 px-6">
      <div className="max-w-3xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-5xl text-white mb-6"
        >
          Page Title
        </motion.h1>
        <p className="text-white/60 leading-relaxed text-lg">
          Your content here.
        </p>
      </div>
    </div>
  )
}
```

**2. Register the route** in `src/App.jsx`:

```jsx
import MyPage from './pages/MyPage'
// ...
<Route path="my-page" element={<MyPage />} />
```

**3. (Optional) Add to NavBar** in `src/components/NavBar.jsx`:

```js
{ to: '/my-page', label: 'My Page' },
```
