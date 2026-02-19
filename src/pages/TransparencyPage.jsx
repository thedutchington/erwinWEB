import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ShieldCheck, ChevronRight, FileText, Search, Award } from 'lucide-react'
import { ACADEMIC_RECORDS } from '../data'

export default function TransparencyPage() {
    const [selectedGradeId, setSelectedGradeId] = useState(ACADEMIC_RECORDS[0].id)
    const [selectedTermId, setSelectedTermId] = useState(ACADEMIC_RECORDS[0].terms[0].id)

    const selectedGrade = ACADEMIC_RECORDS.find(g => g.id === selectedGradeId)
    const selectedTerm = selectedGrade.terms.find(t => t.id === selectedTermId)

    return (
        <div className="min-h-screen pt-32 pb-20 px-6">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12">

                {/* Sidebar */}
                <aside className="lg:w-80 flex-shrink-0">
                    <div className="sticky top-32 space-y-8">
                        <div>
                            <h1 className="font-display text-4xl text-white mb-4">Transparency</h1>
                            <p className="font-body text-ink/50 text-sm"> Verifiable academic records and official performance metrics. Establishing ultimate trust.</p>
                        </div>

                        <nav className="space-y-6">
                            {ACADEMIC_RECORDS.map((grade) => (
                                <div key={grade.id} className="space-y-2">
                                    <div
                                        className={`text-[10px] font-mono uppercase tracking-[0.2em] mb-3 ${selectedGradeId === grade.id ? 'text-gold' : 'text-white/20'}`}
                                    >
                                        {grade.grade}
                                    </div>
                                    <div className="space-y-1">
                                        {grade.terms.map((t) => (
                                            <button
                                                key={t.id}
                                                onClick={() => {
                                                    setSelectedGradeId(grade.id)
                                                    setSelectedTermId(t.id)
                                                }}
                                                className={`w-full flex items-center justify-between p-3 rounded-xl transition-all group ${selectedTermId === t.id
                                                    ? 'bg-white/10 text-white border-l-2 border-gold pl-4'
                                                    : 'text-white/40 hover:bg-white/5 hover:text-white/60'
                                                    }`}
                                            >
                                                <span className="font-body text-sm">{t.label}</span>
                                                <ChevronRight className={`w-4 h-4 transition-transform ${selectedTermId === t.id ? 'rotate-90 text-gold' : 'group-hover:translate-x-1'}`} />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </nav>
                    </div>
                </aside>

                {/* Content Area */}
                <main className="flex-grow">
                    <div className="space-y-8">

                        {/* Header Info */}
                        <div className="p-8 rounded-3xl bg-white/[0.02] bg-black/10 border border-white/5 backdrop-blur-3xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                            <div>
                                <div className="text-[10px] font-mono text-gold uppercase tracking-[0.3em] mb-2">Record Dossier // {selectedGrade.grade}</div>
                                <h2 className="font-display text-3xl text-white">{selectedTerm.label} Academic Standing</h2>
                            </div>
                            <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/10">
                                <div className="text-right">
                                    <div className="text-[10px] font-mono text-white/30 uppercase">Semester GPA</div>
                                    <div className="text-2xl font-display text-white">{selectedTerm.gpa}</div>
                                </div>
                                <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center border border-gold/40">
                                    <ShieldCheck className="w-6 h-6 text-gold" />
                                </div>
                            </div>
                        </div>

                        {/* Records List */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {selectedTerm.courses.map((course, idx) => (
                                <div
                                    key={idx}
                                    className="p-6 rounded-2xl bg-white/[0.01] bg-black/10 border border-white/5 hover:border-white/10 transition-all flex justify-between items-center group"
                                >
                                    <div>
                                        <h4 className="font-display text-lg text-white mb-1">{course.name}</h4>
                                        <div className="flex items-center gap-2">
                                            <span className="text-[10px] font-mono text-white/30 uppercase">Status:</span>
                                            <span className={`text-[10px] font-mono uppercase tracking-wider ${course.status === 'Verified' ? 'text-emerald-400' : 'text-amber-400'}`}>
                                                {course.status}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="text-3xl font-display text-white/50 group-hover:text-gold transition-colors">
                                        {course.grade}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Verified Note */}
                        <div className="p-6 rounded-2xl border border-dashed border-white/10 bg-black/10 flex items-start gap-4 text-ink/40 hover:bg-white/[0.02] transition-colors">
                            <Search className="w-5 h-5 flex-shrink-0 mt-1" />
                            <p className="text-xs font-body leading-relaxed">
                                Semesters listed are retrieved from official Beaumont High School transcripts. Verification status indicates the record matches the final semester audit. For full details on our data integrity, view the <Link to="/verification-process" className="text-gold hover:underline font-medium">Verification Protocol</Link>.
                            </p>
                        </div>

                    </div>
                </main>

            </div>
        </div>
    )
}
