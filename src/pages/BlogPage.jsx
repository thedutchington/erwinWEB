import React, { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Tag } from 'lucide-react'
import { loadPosts } from '../lib/posts'

const ALL_POSTS = loadPosts()
const ALL_TAGS = ['All', ...Array.from(new Set(ALL_POSTS.flatMap((p) => p.tags)))]

function formatDate(iso) {
    return new Date(iso).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    })
}

export default function BlogPage() {
    const [activeTag, setActiveTag] = useState('All')

    const filtered = useMemo(
        () => (activeTag === 'All' ? ALL_POSTS : ALL_POSTS.filter((p) => p.tags.includes(activeTag))),
        [activeTag]
    )

    return (
        <div className="min-h-screen pt-32 pb-24 px-6">
            <div className="max-w-3xl mx-auto">

                {/* Header */}
                <div className="mb-16">
                    <p className="font-mono text-xs uppercase tracking-[0.3em] text-gold/60 mb-4">The Feed</p>
                    <h1 className="font-display text-5xl md:text-6xl text-white tracking-tight mb-6">Blog</h1>
                    <div className="h-px w-full bg-gradient-to-r from-gold/30 via-white/5 to-transparent" />
                </div>

                {/* Tag Filter */}
                <div className="flex flex-wrap gap-2 mb-16">
                    {ALL_TAGS.map((tag) => (
                        <button
                            key={tag}
                            onClick={() => setActiveTag(tag)}
                            className={`px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-widest transition-all duration-200 border ${activeTag === tag
                                ? 'bg-gold/20 text-gold border-gold/40 shadow-[0_0_12px_rgba(245,158,11,0.15)]'
                                : 'bg-white/[0.03] text-white/40 border-white/10 hover:text-white/70 hover:border-white/20'
                                }`}
                        >
                            {tag}
                        </button>
                    ))}
                </div>

                {/* Post Feed */}
                <div className="space-y-0 divide-y divide-white/[0.06]">
                    {filtered.map((post, i) => (
                        <article
                            key={post.slug}
                            className="group py-12 first:pt-0"
                        >
                            <Link to={`/blog/${post.slug}`} className="block">
                                <div className="flex flex-wrap items-center gap-3 mb-4">
                                    <time className="text-xs font-mono text-white/30 tracking-widest">
                                        {formatDate(post.date)}
                                    </time>
                                    {post.author && (
                                        <>
                                            <span className="text-white/10">·</span>
                                            <span className="text-xs font-mono text-white/25">{post.author}</span>
                                        </>
                                    )}
                                    {post.tags.length > 0 && (
                                        <>
                                            <span className="text-white/10">·</span>
                                            <div className="flex gap-2">
                                                {post.tags.map((tag) => (
                                                    <span
                                                        key={tag}
                                                        className="text-[10px] font-mono uppercase tracking-[0.2em] text-gold/50 flex items-center gap-1"
                                                    >
                                                        <Tag size={9} />
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </>
                                    )}
                                </div>

                                <h2 className="font-display text-2xl md:text-3xl text-white/90 group-hover:text-white tracking-tight mb-4 transition-colors duration-300 leading-snug">
                                    {post.title}
                                </h2>

                                {post.excerpt && (
                                    <p className="text-white/50 leading-relaxed text-base mb-6 max-w-2xl">
                                        {post.excerpt}
                                    </p>
                                )}

                                <span className="inline-flex items-center gap-2 text-sm font-display text-gold/60 group-hover:text-gold transition-colors duration-300">
                                    Read
                                    <ArrowRight
                                        size={14}
                                        className="transform group-hover:translate-x-1 transition-transform duration-300"
                                    />
                                </span>
                            </Link>
                        </article>
                    ))}
                </div>

                {filtered.length === 0 && (
                    <p className="text-white/30 text-center py-20 font-body italic">
                        No posts in this category yet.
                    </p>
                )}
            </div>
        </div>
    )
}
