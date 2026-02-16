import React from 'react'
import { motion } from 'framer-motion'
import { Target, ShieldCheck, RefreshCw } from 'lucide-react'
import { SUCCESS_FRAMEWORK } from '../data'

const ICON_MAP = { Target, ShieldCheck, RefreshCw }

export const SuccessFramework = () => {
    return (
        <section className="py-32 px-6 max-w-7xl mx-auto overflow-hidden">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-20 text-center"
            >
                <h2 className="font-display text-5xl md:text-7xl text-white mb-6">The Success Framework</h2>
                <p className="font-body text-xl text-ink/60 max-w-2xl mx-auto">
                    A blueprint for academic and leadership dominance, engineered for the next generation of scholars.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                {/* Connection Lines (Visual only) */}
                <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent hidden md:block" />

                {SUCCESS_FRAMEWORK.map((pillar, idx) => {
                    const Icon = ICON_MAP[pillar.iconKey]
                    return (
                        <motion.div
                            key={pillar.id}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.2, duration: 0.8 }}
                            className="relative group p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-gold/40 hover:bg-white/[0.04] transition-all duration-700"
                        >
                            <div className="absolute -inset-1 bg-gradient-to-br from-gold/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 blur-2xl rounded-3xl" />

                            <div className="relative z-10">
                                <div
                                    className="w-16 h-16 rounded-2xl flex items-center justify-center mb-8 transition-transform duration-700 group-hover:scale-110 group-hover:rotate-3"
                                    style={{ backgroundColor: `${pillar.color}20`, border: `1px solid ${pillar.color}40` }}
                                >
                                    <Icon className="w-8 h-8" style={{ color: pillar.color }} />
                                </div>

                                <h3 className="font-display text-3xl text-white mb-4 tracking-tight">{pillar.title}</h3>
                                <p className="font-body text-ink/50 leading-relaxed mb-6">
                                    {pillar.description}
                                </p>

                                <div className="flex items-center gap-2 group/btn cursor-pointer">
                                    <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-white/30 group-hover/btn:text-gold transition-colors">Phase_0{idx + 1} // Initialized</span>
                                    <div className="h-[1px] w-0 group-hover/btn:w-12 bg-gold/40 transition-all duration-700" />
                                </div>
                            </div>
                        </motion.div>
                    )
                })}
            </div>
        </section>
    )
}
