import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BookOpen, Users, GraduationCap, ChevronRight, CheckCircle2, HelpCircle } from 'lucide-react'
import { SERVICES_DATA, FAQ_DATA, BOOKING_URL } from '../data'

const ICON_MAP = { BookOpen, Users, GraduationCap }

export default function ServicesPage() {
  const [activeId, setActiveId] = useState(SERVICES_DATA[0].id)

  const activeService = SERVICES_DATA.find(s => s.id === activeId)

  // Filter FAQs relevant to the active service
  const relevantFaqs = FAQ_DATA.filter(f => {
    if (activeId === 'math') return f.id === 'subjects' || f.id === 'remote'
    return f.id === 'rates' || f.id === 'schedule'
  })

  return (
    <div className="relative pt-32 pb-20 min-h-screen">
      <div className="max-w-6xl mx-auto px-6">

        <header className="mb-20 text-center lg:text-left">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-5xl md:text-7xl text-white mb-6"
          >
            Capabilities
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white/60 text-xl max-w-2xl"
          >
            A high-performance approach to academic growth and student leadership.
          </motion.p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-[350px_1fr] gap-12 items-start">

          {/* Service Navigation */}
          <nav className="flex flex-col gap-4">
            {SERVICES_DATA.map((service) => {
              const Icon = ICON_MAP[service.iconKey] || BookOpen
              const isActive = activeId === service.id

              return (
                <button
                  key={service.id}
                  onClick={() => setActiveId(service.id)}
                  className={`group relative text-left p-6 rounded-2xl border transition-all duration-300 ${isActive
                    ? 'bg-white/10 border-white/20 shadow-glass'
                    : 'bg-transparent border-white/5 hover:border-white/10'
                    }`}
                >
                  <div className="flex items-center gap-4 relative z-10">
                    <div className={`p-3 rounded-xl transition-colors ${isActive ? 'bg-accent text-white' : 'bg-white/5 text-white/40'}`}>
                      <Icon size={24} />
                    </div>
                    <div>
                      <h3 className={`font-display text-lg ${isActive ? 'text-white' : 'text-white/40 group-hover:text-white/60'}`}>
                        {service.title}
                      </h3>
                    </div>
                    {isActive && (
                      <motion.div
                        layoutId="arrow"
                        className="ml-auto text-accent"
                      >
                        <ChevronRight size={20} />
                      </motion.div>
                    )}
                  </div>
                </button>
              )
            })}
          </nav>

          {/* Service Detail Display */}
          <main className="relative min-h-[500px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeId}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="rounded-3xl bg-white/5 border border-white/10 p-8 md:p-12 backdrop-blur-xl relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-12 opacity-[0.02] pointer-events-none">
                  {React.createElement(ICON_MAP[activeService.iconKey] || BookOpen, {
                    className: "w-64 h-64"
                  })}
                </div>

                <div className="relative z-10">
                  <h2 className="font-display text-4xl text-white mb-6 uppercase tracking-tight">{activeService.title}</h2>
                  <p className="text-white/70 text-xl leading-relaxed mb-12 max-w-2xl">
                    {activeService.description}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                    <div className="space-y-6">
                      <h4 className="font-display text-accent text-sm uppercase tracking-widest flex items-center gap-2">
                        <CheckCircle2 size={16} />
                        What to Expect
                      </h4>
                      <ul className="space-y-4 text-white/60">
                        <li className="flex items-start gap-3">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                          Personalized learning pathways
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                          Peer-to-peer accountability
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                          Focus on long-term retention
                        </li>
                      </ul>
                    </div>

                    <div className="space-y-6">
                      <h4 className="font-display text-accent text-sm uppercase tracking-widest flex items-center gap-2">
                        <HelpCircle size={16} />
                        Logistics
                      </h4>
                      <div className="space-y-4">
                        {relevantFaqs.map(faq => (
                          <div key={faq.id}>
                            <p className="text-white text-sm font-medium mb-1">{faq.question}</p>
                            <p className="text-white/40 text-sm italic">
                              {faq.answer === 'schedule_link' ? 'Book via the link below' : faq.answer}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-8 border-t border-white/10">
                    <a
                      href={BOOKING_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-accent text-white font-semibold hover:bg-accent/80 transition-all shadow-[0_0_20px_rgba(99,102,241,0.3)] hover:scale-105"
                    >
                      Initialize Session
                      <ChevronRight size={18} />
                    </a>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </main>

        </div>
      </div>
    </div>
  )
}
