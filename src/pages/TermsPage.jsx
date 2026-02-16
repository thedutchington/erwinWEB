import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import termsContent from '../assets/terms.md?raw'

const CustomMarkdown = ({ content }) => {
    // Simple custom parser for basic markdown
    const lines = content.split('\n')

    const parseInline = (text) => {
        // Handle bolding
        let parts = text.split(/(\*\*.*?\*\*)/g)
        let nodes = parts.map((part, i) => {
            if (part && part.startsWith('**') && part.endsWith('**')) {
                return (
                    <strong key={`bold-${i}`} className="font-bold text-white">
                        {part.replace(/\*\*/g, '')}
                    </strong>
                )
            }
            return part
        })

        // Handle links [text](url) - simple approach
        const linkNodes = []
        nodes.forEach(node => {
            if (typeof node === 'string') {
                const linkParts = node.split(/(\[.*?\]\(.*?\))/g)
                linkParts.forEach((part, j) => {
                    const match = part.match(/\[(.*?)\]\((.*?)\)/)
                    if (match) {
                        linkNodes.push(
                            <a key={`link-${j}`} href={match[2]} className="text-accent hover:underline" target="_blank" rel="noopener noreferrer">
                                {match[1]}
                            </a>
                        )
                    } else {
                        linkNodes.push(part)
                    }
                })
            } else {
                linkNodes.push(node)
            }
        })

        return linkNodes
    }

    return (
        <div className="space-y-6">
            {lines.map((line, i) => {
                const trimmedLine = line.trim()

                if (trimmedLine === '---') {
                    return <hr key={i} className="border-white/10 my-12" />
                }
                if (line.startsWith('# ')) {
                    return (
                        <h1 key={i} className="font-display text-4xl text-white mb-8 border-b border-white/10 pb-4">
                            {parseInline(line.replace('# ', ''))}
                        </h1>
                    )
                }
                if (line.startsWith('## ')) {
                    return (
                        <h2 key={i} className="font-display text-2xl text-accent mt-12 mb-4">
                            {parseInline(line.replace('## ', ''))}
                        </h2>
                    )
                }
                if (line.startsWith('- ') || line.startsWith('* ')) {
                    return (
                        <li key={i} className="text-white/60 ml-6 list-disc">
                            {parseInline(line.substring(2))}
                        </li>
                    )
                }
                if (trimmedLine === '') {
                    return <div key={i} className="h-4" />
                }
                return (
                    <p key={i} className="text-white/70 leading-relaxed">
                        {parseInline(line)}
                    </p>
                )
            })}
        </div>
    )
}

export default function TermsPage() {
    return (
        <div className="relative pt-32 pb-20 px-6 min-h-screen">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-3xl mx-auto bg-white/[0.02] border border-white/5 p-12 rounded-3xl backdrop-blur-sm"
            >
                <CustomMarkdown content={termsContent} />

                <div className="mt-20 pt-8 border-t border-white/5 flex justify-between items-center text-[10px] text-white/20 uppercase tracking-[0.2em] font-mono">
                    <span>Official Document</span>
                    <span>© 2026 Caden Erwin</span>
                </div>
            </motion.div>
        </div>
    )
}
