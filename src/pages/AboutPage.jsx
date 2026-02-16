import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Award, GraduationCap, MapPin, Calendar, Mail, BookOpen, Users, Lightbulb, Rocket } from 'lucide-react'
import { PROFILE, TIMELINE_DATA, BENTO_ITEMS } from '../data'

export default function AboutPage() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const opacity = useTransform(scrollYProgress, [0, 0.1], [1, 0.8])

  return (
    <div className="relative pt-24 pb-20" ref={containerRef}>
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-12 lg:gap-20">

        {/* Left Side: Sticky Profile Card */}
        <aside className="lg:sticky lg:top-32 h-fit">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 shadow-glass overflow-hidden relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-transparent opacity-50 pointer-events-none" />

            <div className="relative z-10">
              <div className="w-24 h-24 rounded-2xl overflow-hidden mb-6 border border-white/10 group-hover:scale-105 transition-transform duration-500 shadow-2xl">
                <img
                  src="/caden-headshot.jpg"
                  alt="Caden Erwin"
                  className="w-full h-full object-cover object-top grayscale-[20%] hover:grayscale-0 transition-all duration-500"
                />
              </div>

              <h1 className="font-display text-4xl text-white mb-2">{PROFILE.name}</h1>
              <p className="text-white/60 font-body mb-8 leading-relaxed">
                {PROFILE.tagline}
              </p>

              <div className="space-y-4 pt-6 border-t border-white/10">
                <div className="flex items-center gap-3 text-white/70">
                  <MapPin size={18} className="text-accent" />
                  <span className="text-sm">Beaumont, CA</span>
                </div>
                <div className="flex items-center gap-3 text-white/70">
                  <GraduationCap size={18} className="text-accent" />
                  <span className="text-sm">Beaumont Senior High School</span>
                </div>
                <div className="flex items-center gap-3 text-white/70">
                  <Calendar size={18} className="text-accent" />
                  <span className="text-sm">Class of 2028</span>
                </div>
              </div>

              <div className="mt-8">
                <a
                  href={`mailto:${PROFILE.contact.email.split(' ')[0]}`}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white text-black font-semibold hover:bg-white/90 transition-all active:scale-95"
                >
                  <Mail size={18} />
                  Get in Touch
                </a>
              </div>
            </div>
          </motion.div>
        </aside>

        {/* Right Side: Scrolling Dossier */}
        <main className="space-y-32">

          {/* Biography Section */}
          <section>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display text-sm uppercase tracking-[0.2em] text-accent mb-6">Brief</h2>
              <div className="space-y-6 text-xl md:text-2xl text-white/80 font-body leading-relaxed">
                <p>
                  I'm a student leader and academic mentor dedicated to bridging the gap between potential and performance.
                  My journey is defined by a commitment to ASB leadership and a passion for mathematics.
                </p>
                <p>
                  By accelerating through Math 3 by my sophomore year and maintaining a 4.0 GPA,
                  I aim to lead by example, showing that academic rigor and campus involvement go hand-in-hand.
                </p>
              </div>
            </motion.div>
          </section>

          {/* Experience/Timeline Section */}
          <section>
            <h2 className="font-display text-sm uppercase tracking-[0.2em] text-accent mb-12">The Journey</h2>
            <div className="space-y-16 border-l border-white/5 ml-2">
              {TIMELINE_DATA.map((institution, idx) => (
                <div key={idx} className="relative pl-10 space-y-8">
                  <div className="absolute left-[-5px] top-1 w-2.5 h-2.5 rounded-full bg-accent ring-4 ring-paper" />
                  <h3 className="font-display text-2xl text-white opacity-40">{institution.institution}</h3>

                  <div className="grid grid-cols-1 gap-8">
                    {institution.roles.map((role, rIdx) => (
                      <motion.div
                        key={rIdx}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: rIdx * 0.1 }}
                        className="p-8 rounded-3xl bg-white/[0.03] border border-white/5 relative group hover:border-white/10 transition-colors"
                      >
                        <span className="font-mono text-xs text-accent mb-2 block">{role.grade}</span>
                        <h4 className="font-display text-2xl text-white mb-2">{role.title}</h4>
                        <p className="text-white/50">{role.details}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Leadership Pillars */}
          <section>
            <h2 className="font-display text-sm uppercase tracking-[0.2em] text-accent mb-12">Pillars</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {BENTO_ITEMS.map((item, idx) => {
                const Icon = item.iconKey === 'Users' ? Users : item.iconKey === 'GraduationCap' ? GraduationCap : Award;
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/[0.08] transition-all group"
                  >
                    <Icon className="w-10 h-10 text-white/40 mb-6 group-hover:text-accent transition-colors" />
                    <h3 className="font-display text-2xl text-white mb-3">{item.title}</h3>
                    <p className="text-white/50 leading-relaxed">{item.summary}</p>
                  </motion.div>
                )
              })}
            </div>
          </section>

        </main>
      </div>
    </div>
  )
}
