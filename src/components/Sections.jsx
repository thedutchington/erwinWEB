import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import {
  GraduationCap,
  Award,
  BookOpen,
  Users,
  MessageCircle,
  ChevronDown,
  Mail,
  Instagram,
  Calendar,
  Sparkles,
  School,
  Lightbulb, // Added
  Rocket,    // Added
} from 'lucide-react'
import { ErrorBoundary } from 'react-error-boundary'

import {
  BOOKING_URL,
  PROFILE,
  TIMELINE_DATA,
  AWARDS,
  BENTO_ITEMS,
  SERVICES_DATA,
  ACADEMIC_NETWORK,
  FAQ_DATA,
} from '../data'

const ICON_MAP = { Users, GraduationCap, Award, BookOpen, School, Lightbulb, Rocket }

const fadeInUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-48px' },
  transition: { duration: 0.5 },
}

export function Hero() {
  return (
    <motion.section
      className="relative min-h-screen flex flex-col justify-center items-center text-center px-4 py-20 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        className="relative z-10 max-w-5xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        <h1 className="font-display text-6xl md:text-8xl lg:text-9xl font-semibold tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-white/90 to-white/50 animate-aurora-text mb-6">
          Architect of<br />the Future
        </h1>
        <p className="font-body text-xl md:text-2xl text-ink/60 max-w-2xl mx-auto mb-10 leading-relaxed">
          Empowering the next generation of scholars through leadership, mentorship, and academic excellence.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 rounded-full bg-white text-black font-semibold hover:bg-white/90 transition-all hover:scale-105 active:scale-95 shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)]"
          >
            Start Your Journey
          </a>
          <a
            href="#about"
            className="px-8 py-4 rounded-full border border-white/10 text-white/70 hover:text-white hover:bg-white/5 transition-all"
          >
            Learn More
          </a>
        </div>
      </motion.div>
    </motion.section>
  )
}

function Fallback({ error }) {
  return (
    <div role="alert" className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-200">
      <p>Something went wrong:</p>
      <pre className="text-sm mt-2">{error.message}</pre>
    </div>
  )
}

const BentoGridInner = React.memo(function BentoGrid() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  }

  return (
    <section ref={ref} id="about" className="px-6 py-32 max-w-7xl mx-auto">
      <motion.div
        className="mb-16 md:flex justify-between items-end border-b border-white/10 pb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
      >
        <div>
          <h2 className="font-display text-4xl md:text-5xl text-ink mb-2">Leadership Moat</h2>
          <p className="text-ink/50 text-lg">The pillars of my academic philosophy.</p>
        </div>
        <div className="hidden md:block text-right">
          <div className="text-sm font-mono text-ink/40">EST. 2026</div>
        </div>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(280px,auto)]"
        variants={container}
        initial="hidden"
        animate={inView ? "show" : "hidden"}
      >
        {/* Large Card - Introduction */}
        <motion.div
          variants={item}
          className="md:col-span-2 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-10 flex flex-col justify-end group hover:border-white/20 transition-colors relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
          <Lightbulb className="w-10 h-10 text-white/80 mb-6" />
          <h3 className="font-display text-3xl text-white mb-4">Innovation in Education</h3>
          <p className="text-white/60 text-lg leading-relaxed max-w-xl">
            Reimagining how students learn by combining traditional academic rigor with modern mentorship strategies. We don't just teach subjects; we build confidence.
          </p>
        </motion.div>

        {/* Tall Card - Stats */}
        <motion.div
          variants={item}
          className="md:row-span-2 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-10 flex flex-col justify-between group hover:border-white/20 transition-colors relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-purple-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
          <div>
            <Award className="w-10 h-10 text-white/80 mb-6" />
            <h3 className="font-display text-3xl text-white mb-2">Impact</h3>
          </div>
          <ul className="space-y-6">
            <li className="block">
              <div className="text-4xl font-display text-white mb-1">500+</div>
              <div className="text-white/50 text-sm uppercase tracking-wider">Hours Tutored</div>
            </li>
            <li className="block">
              <div className="text-4xl font-display text-white mb-1">4.0</div>
              <div className="text-white/50 text-sm uppercase tracking-wider">GPA Maintained</div>
            </li>
            <li className="block">
              <div className="text-4xl font-display text-white mb-1">3+</div>
              <div className="text-white/50 text-sm uppercase tracking-wider">Years Experience</div>
            </li>
          </ul>
        </motion.div>

        {/* Medium Card - Philosophy */}
        <motion.div
          variants={item}
          className="rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-10 flex flex-col justify-end group hover:border-white/20 transition-colors"
        >
          <Users className="w-10 h-10 text-white/80 mb-6" />
          <h3 className="font-display text-2xl text-white mb-3">Community First</h3>
          <p className="text-white/60 leading-relaxed">
            Building a network of peers who support and challenge each other.
          </p>
        </motion.div>

        {/* Medium Card - Skills */}
        <motion.div
          variants={item}
          className="rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-10 flex flex-col justify-end group hover:border-white/20 transition-colors"
        >
          <Rocket className="w-10 h-10 text-white/80 mb-6" />
          <h3 className="font-display text-2xl text-white mb-3">Future Ready</h3>
          <p className="text-white/60 leading-relaxed">
            Preparing for the challenges of tomorrow with adaptive learning.
          </p>
        </motion.div>

      </motion.div>
    </section>
  )
})

export const BentoGrid = (props) => (
  <ErrorBoundary FallbackComponent={Fallback}>
    <BentoGridInner {...props} />
  </ErrorBoundary>
)

export const Timeline = React.memo(function Timeline() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const flattened = useMemo(() => {
    const out = []
    TIMELINE_DATA.forEach(({ institution, roles }) => {
      roles.forEach((r) => out.push({ ...r, institution }))
    })
    return out.reverse()
  }, [])

  return (
    <motion.section
      ref={ref}
      id="journey"
      className="px-6 py-32 max-w-5xl mx-auto"
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center mb-20">
        <motion.h2 className="font-display text-4xl text-white mb-4">The Journey</motion.h2>
        <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full" />
      </div>

      <div className="relative border-l border-white/10 ml-4 md:ml-0 space-y-16">
        {flattened.map((node, i) => (
          <motion.div
            key={`${node.institution}-${node.grade}`}
            className="relative pl-12 md:pl-16 group"
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.1 * i, duration: 0.5 }}
          >
            {/* Timeline Dot with Glow */}
            <span className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-white group-hover:bg-accent transition-colors duration-500 shadow-[0_0_10px_2px_rgba(255,255,255,0.3)] group-hover:shadow-[0_0_15px_4px_rgba(99,102,241,0.5)]" />

            <div className="md:grid md:grid-cols-[120px_1fr] gap-8 items-start">
              <span className="font-mono text-sm text-white/40 pt-1 block mb-2 md:mb-0">{node.grade}</span>
              <div className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors">
                <h3 className="font-display text-xl text-white mb-1 group-hover:text-accent transition-colors">{node.title}</h3>
                <div className="text-xs font-medium text-white/50 mb-3 uppercase tracking-widest">{node.institution}</div>
                <p className="text-white/70 leading-relaxed text-sm">{node.details}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
})

export const Services = React.memo(function Services() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const navigate = useNavigate()

  return (
    <motion.section
      ref={ref}
      id="services"
      className="px-6 py-32 relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.5 }}
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-500/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div className="text-center mb-20" {...fadeInUp}>
          <h2 className="font-display text-4xl text-white mb-4">Services</h2>
          <p className="text-white/60 font-body text-lg max-w-2xl mx-auto">Tutoring and mentorship built around how you learn.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SERVICES_DATA.map((svc, i) => {
            const Icon = ICON_MAP[svc.iconKey] || BookOpen
            return (
              <motion.div
                key={svc.id}
                className="group p-8 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all cursor-pointer relative overflow-hidden"
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 * i, duration: 0.45 }}
                onClick={() => navigate('/contact')}
              >
                <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:scale-110 duration-500">
                  <Icon className="w-32 h-32" />
                </div>

                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-xl bg-white/10 text-white group-hover:bg-accent group-hover:text-white transition-colors duration-300">
                    <Icon className="w-6 h-6 stroke-[1.5]" />
                  </div>
                  <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-accent font-medium text-sm">Book This Service →</span>
                </div>

                <h3 className="font-display text-2xl text-white mb-3 relative z-10">{svc.title}</h3>
                <p className="text-white/60 leading-relaxed mb-6 relative z-10 max-w-md">{svc.description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </motion.section>
  )
})

export const Testimonials = React.memo(function Testimonials() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.section
      ref={ref}
      id="network"
      className="px-6 py-24 max-w-6xl mx-auto border-t border-white/5"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
    >
      <div className="mb-16">
        <h2 className="font-display text-xs uppercase tracking-[0.3em] text-accent mb-4">
          Academic & Leadership Endorsements
        </h2>
        <p className="text-white/40 text-sm max-w-xl font-body">
          Faculty and administration members who have mentored my leadership journey across SGMS and BHS.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
        {/* Principals */}
        <div className="space-y-6">
          <h3 className="font-display text-[10px] uppercase tracking-widest text-white/30 border-b border-white/5 pb-2">Administration</h3>
          <div className="space-y-4">
            {ACADEMIC_NETWORK.principals.map((p, i) => (
              <div key={i}>
                <div className="text-white/90 font-medium text-sm">{p.name}</div>
                <div className="text-[10px] text-white/30 font-mono uppercase mt-0.5">{p.school}</div>
              </div>
            ))}
          </div>
        </div>

        {/* SGMS Teachers */}
        <div className="space-y-6">
          <h3 className="font-display text-[10px] uppercase tracking-widest text-white/30 border-b border-white/5 pb-2">SGMS Faculty</h3>
          <div className="space-y-4">
            {ACADEMIC_NETWORK.teachers.sgms.map((t, i) => (
              <div key={i}>
                <div className="text-white/90 font-medium text-sm">{t.name}</div>
                <div className="text-[10px] text-white/30 font-mono uppercase mt-0.5">{t.role}</div>
              </div>
            ))}
          </div>
        </div>

        {/* BHS Teachers */}
        <div className="space-y-6">
          <h3 className="font-display text-[10px] uppercase tracking-widest text-white/30 border-b border-white/5 pb-2">BHS Faculty</h3>
          <div className="space-y-4">
            {ACADEMIC_NETWORK.teachers.bhs.map((t, i) => (
              <div key={i}>
                <div className="text-white/90 font-medium text-sm">{t.name}</div>
                <div className="text-[10px] text-white/30 font-mono uppercase mt-0.5">{t.role}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  )
})

export const FAQ = React.memo(function FAQ() {
  const [openId, setOpenId] = useState(FAQ_DATA[0]?.id ?? null)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.section
      ref={ref}
      id="faq"
      className="px-6 py-32 max-w-3xl mx-auto"
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.5 }}
    >
      <motion.h2
        className="font-display text-4xl text-white text-center mb-16"
        {...fadeInUp}
      >
        Common Questions
      </motion.h2>
      <ul className="space-y-4">
        {FAQ_DATA.map((faq, i) => (
          <motion.li
            key={faq.id}
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.05 * i, duration: 0.4 }}
            className="rounded-2xl border border-white/5 bg-white/[0.02] overflow-hidden"
          >
            <button
              type="button"
              onClick={() => setOpenId((prev) => (prev === faq.id ? null : faq.id))}
              className={`w-full text-left flex items-center justify-between gap-6 px-6 py-5 transition-colors ${openId === faq.id ? 'bg-white/5' : 'hover:bg-white/5'}`}
            >
              <span className="font-display text-lg text-white/90">{faq.question}</span>
              <ChevronDown className={`w-5 h-5 text-white/40 shrink-0 transition-transform duration-300 ${openId === faq.id ? 'rotate-180 text-white' : ''}`} />
            </button>
            <motion.div
              initial={false}
              animate={{ height: openId === faq.id ? 'auto' : 0, opacity: openId === faq.id ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="px-6 pb-6 pt-2 text-white/60 leading-relaxed">
                {faq.answer === 'schedule_link' ? (
                  <>
                    Use the{' '}
                    <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="font-medium text-accent underline hover:no-underline">
                      booking link
                    </a>
                    {' '}to pick a time.
                  </>
                ) : (
                  faq.answer
                )}
              </div>
            </motion.div>
          </motion.li>
        ))}
      </ul>
    </motion.section>
  )
})

// CTA removed because it's now handled by the Contact Page as per design
export function CTA() {
  return null;
}

export const Footer = React.memo(function Footer() {
  const schema = useMemo(
    () => ({
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: PROFILE.name,
      description: PROFILE.tagline,
      email: PROFILE.contact.email.split(' ')[0].trim(),
      jobTitle: 'Peer Tutor & Student Leader',
      alumniOf: [
        { '@type': 'School', name: 'Beaumont Senior High School' },
        { '@type': 'School', name: 'San Gorgonio Middle School' },
      ],
      knowsAbout: ['Mathematics', 'Peer Tutoring', 'Study Skills', 'ASB Leadership'],
      award: AWARDS,
    }),
    []
  )

  return (
    <footer className="px-6 pt-24 pb-12 bg-transparent text-ink/40 border-t border-white/5 mt-auto">
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-12 mb-20">
          {/* Logo Column */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block mb-8">
              <img src="/logo.png" alt="Caden Erwin" className="h-24 w-auto invert opacity-100 transition-all" />
            </Link>
          </div>

          {/* Links Columns */}
          <div>
            <h4 className="font-display text-white text-sm uppercase tracking-widest mb-6">Navigation</h4>
            <ul className="space-y-4 text-sm">
              <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">About</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors">Services</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-white text-sm uppercase tracking-widest mb-6">Connect</h4>
            <ul className="space-y-4 text-sm">
              <li><a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Schedule Session</a></li>
              <li><a href={`mailto:${PROFILE.contact.email.split('/')[0].trim()}`} className="hover:text-white transition-colors">Email Me</a></li>
              <li><a href="https://instagram.com/thedutcher_bhs" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Instagram</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-white text-sm uppercase tracking-widest mb-6">Legal</h4>
            <ul className="space-y-4 text-sm">
              <li><Link to="/terms" className="text-white/30 hover:text-white transition-colors">Terms of Service</Link></li>
              <li><a href="#" className="text-white/30 hover:text-white transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <span className="text-xs tracking-wider">© {new Date().getFullYear()} Caden Erwin</span>
            <div className="flex items-center gap-4">
              <a href="https://instagram.com/thedutcher_bhs" target="_blank" rel="noopener noreferrer">
                <Instagram size={18} className="hover:text-white transition-colors" />
              </a>
            </div>
          </div>
          <div className="text-[10px] uppercase tracking-[0.2em] opacity-30">
            Building the future of scholarship and leadership.
          </div>
        </div>
      </div>
    </footer>
  )
})
