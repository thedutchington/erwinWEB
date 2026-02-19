import React from 'react'
import { motion } from 'framer-motion'
import { Target, ShieldCheck, RefreshCw } from 'lucide-react'
import { SUCCESS_FRAMEWORK } from '../data'

const ICON_MAP = { Target, ShieldCheck, RefreshCw }

export const SuccessFramework = () => {
    return (
        <section className="py-24 px-6 max-w-5xl mx-auto">
            <div
                className="mb-16"
            >
                <h2 className="font-display text-4xl md:text-6xl text-white mb-4">How I tutor.</h2>
                <p className="font-body text-lg text-white/50 max-w-xl">
                    Not a sales pitch. Just the three steps I actually follow with every student.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {SUCCESS_FRAMEWORK.map((pillar, idx) => {
                    const Icon = ICON_MAP[pillar.iconKey]
                    return (
                        <div
                            key={pillar.id}
                            className="p-6 border border-white/10 rounded-lg bg-black/10 hover:border-gold/30 transition-colors duration-300"
                        >
                            <div
                                className="w-10 h-10 rounded-md flex items-center justify-center mb-5"
                                style={{ backgroundColor: `${pillar.color}15`, border: `1px solid ${pillar.color}30` }}
                            >
                                <Icon className="w-5 h-5" style={{ color: pillar.color }} />
                            </div>

                            <span className="text-xs font-mono text-white/20 mb-2 block">{idx + 1}.</span>
                            <h3 className="font-display text-2xl text-white mb-3">{pillar.title}</h3>
                            <p className="font-body text-white/45 leading-relaxed text-sm">
                                {pillar.description}
                            </p>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}
