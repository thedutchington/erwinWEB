import React from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Tag } from 'lucide-react'
import { loadPosts, parseMarkdownParagraphs } from '../lib/posts'

const ALL_POSTS = loadPosts()

function formatDate(iso) {
    return new Date(iso).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    })
}

export default function BlogPostPage() {
    const { slug } = useParams()
    const navigate = useNavigate()
    const post = ALL_POSTS.find((p) => p.slug === slug)

    if (!post) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <p className="font-mono text-gold/40 text-xs uppercase tracking-widest mb-4">404</p>
                    <h1 className="font-display text-4xl text-white mb-6">Post not found.</h1>
                    <Link
                        to="/blog"
                        className="text-white/50 hover:text-white transition-colors text-sm underline underline-offset-4"
                    >
                        Back to Blog
                    </Link>
                </div>
            </div>
        )
    }

    const paragraphs = parseMarkdownParagraphs(post.content)

    return (
        <div className="min-h-screen pt-32 pb-24 px-6">
            <div className="max-w-2xl mx-auto">

                {/* Back */}
                <div className="mb-12">
                    <button
                        onClick={() => navigate(-1)}
                        className="inline-flex items-center gap-2 text-sm text-white/30 hover:text-gold transition-colors duration-200 font-mono uppercase tracking-widest"
                    >
                        <ArrowLeft size={14} />
                        Back
                    </button>
                </div>

                {/* Header */}
                <header className="mb-12">
                    <div className="flex flex-wrap items-center gap-3 mb-6">
                        <time className="font-mono text-xs text-white/30 tracking-widest">
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
                                {post.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="text-[10px] font-mono uppercase tracking-[0.2em] text-gold/50 flex items-center gap-1"
                                    >
                                        <Tag size={9} />
                                        {tag}
                                    </span>
                                ))}
                            </>
                        )}
                    </div>

                    <h1 className="font-display text-4xl md:text-5xl text-white tracking-tight leading-[1.08] mb-8">
                        {post.title}
                    </h1>

                    <div className="h-px w-full bg-gradient-to-r from-gold/40 via-gold/10 to-transparent" />
                </header>

                {/* Body */}
                <div className="space-y-6">
                    {paragraphs.map((para, i) => (
                        <p
                            key={i}
                            className="font-body text-white/70 text-lg leading-[1.75] tracking-[0.01em]"
                        >
                            {para}
                        </p>
                    ))}
                </div>

                {/* Footer nav */}
                <div className="mt-20 pt-12 border-t border-white/[0.06]">
                    <Link
                        to="/blog"
                        className="inline-flex items-center gap-2 text-sm font-mono uppercase tracking-widest text-white/30 hover:text-gold transition-colors duration-200"
                    >
                        <ArrowLeft size={14} />
                        All Posts
                    </Link>
                </div>

            </div>
        </div>
    )
}
