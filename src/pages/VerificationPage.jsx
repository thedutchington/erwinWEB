import React from 'react'
import { Link } from 'react-router-dom'
import { ShieldCheck, Mail, FileText, Lock } from 'lucide-react'
import { motion } from 'framer-motion'
import { PROFILE } from '../data'

export default function VerificationPage() {
    return (
        <div className="min-h-screen pt-32 pb-20 px-6">
            <div className="max-w-3xl mx-auto">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center justify-center p-3 rounded-full bg-gold/10 text-gold mb-6 border border-gold/20">
                        <ShieldCheck className="w-8 h-8" />
                    </div>
                    <h1 className="font-display text-4xl md:text-5xl text-white mb-6">Verification Protocol</h1>
                    <p className="font-body text-ink/60 text-lg max-w-xl mx-auto leading-relaxed">
                        Our commitment to absolute transparency and data integrity.
                    </p>
                </motion.div>

                {/* Content Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="rounded-3xl bg-white/5 backdrop-blur-xl border border-gold/10 overflow-hidden"
                >
                    <div className="p-8 md:p-12 space-y-8">

                        {/* Process Step */}
                        <div className="flex gap-6">
                            <div className="flex-shrink-0 mt-1">
                                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 text-white/50 font-mono">01</div>
                            </div>
                            <div>
                                <h3 className="font-display text-xl text-white mb-2">Transcript Sourcing</h3>
                                <p className="text-ink/60 leading-relaxed">
                                    All academic records of Caden Erwin displayed on the Transparency Hub are manually transcribed directly from official <strong>Beaumont High School</strong> and <strong>San Gorgonio Middle School</strong> transcripts. We do not alter, round up, or estimate grades.
                                </p>
                            </div>
                        </div>

                        {/* Process Step */}
                        <div className="flex gap-6">
                            <div className="flex-shrink-0 mt-1">
                                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 text-white/50 font-mono">02</div>
                            </div>
                            <div>
                                <h3 className="font-display text-xl text-white mb-2">Data Integrity</h3>
                                <p className="text-ink/60 leading-relaxed">
                                    "Verified" status badges indicate that a specific grade has been cross-referenced with a final semester report card. GPA calculations are derived strictly from these verified points.
                                </p>
                            </div>
                        </div>

                        {/* Process Step - Request */}
                        <div className="flex gap-6">
                            <div className="flex-shrink-0 mt-1">
                                <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center border border-gold/20 text-gold font-mono">03</div>
                            </div>
                            <div>
                                <h3 className="font-display text-xl text-gold mb-2">Requesting Official Documents</h3>
                                <p className="text-ink/60 leading-relaxed mb-6">
                                    To protect student privacy while maintaining proof of excellence of Caden Erwin, we do not host full PDF transcripts publicly. Parents and prospective clients may request the full, redacted official transcript documents via email, with redactions being personal information, counselor information, etc.
                                </p>

                                <Link
                                    to="/contact"
                                    className="inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-gold text-[#0F172A] font-bold tracking-wide hover:bg-amber-400 transition-all hover:scale-105"
                                >
                                    <Lock className="w-4 h-4" />
                                    <span>Request Official PDF</span>
                                </Link>
                            </div>
                        </div>

                    </div>

                    {/* Footer of Card */}
                    <div className="bg-white/5 p-6 border-t border-white/5 flex justify-between items-center">
                        <span className="text-xs font-mono text-white/30 uppercase tracking-widest">Protocol v1.0</span>
                        <Link to="/transparency" className="text-xs font-display text-white/50 hover:text-gold transition-colors">
                            Return to Records →
                        </Link>
                    </div>
                </motion.div>

            </div>
        </div>
    )
}
