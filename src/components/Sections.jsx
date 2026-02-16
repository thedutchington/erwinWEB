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
import { SuccessFramework } from './SuccessFramework'

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
        className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center text-left"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        <div>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-semibold tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-white/90 to-white/50 animate-aurora-text mb-6">
            Architect of<br />the Future
          </h1>
          <p className="font-body text-xl md:text-2xl text-ink/60 max-w-xl mb-10 leading-relaxed italic border-l-2 border-gold/40 pl-6">
            Expert Peer Tutoring for High School Success. Empowering scholars through leadership, mentorship, and academic excellence.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-full bg-white text-black font-semibold hover:bg-white/90 transition-all hover:scale-105 active:scale-95 shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] text-center"
            >
              Start Your Journey
            </a>
            <a
              href="#about"
              className="px-8 py-4 rounded-full border border-white/10 text-white/70 hover:text-white hover:bg-white/5 transition-all text-center"
            >
              Learn More
            </a>
          </div>
        </div>

        <div className="relative group flex justify-center lg:justify-end">
          <div className="absolute -inset-4 bg-gold/20 blur-[100px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
          <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-2xl overflow-hidden border border-white/10 shadow-2xl transition-all duration-700 hover:border-gold/40 hover:shadow-[0_0_40px_rgba(245,158,11,0.3)] lg:rotate-2 hover:rotate-0">
            <img
              src="/caden-headshot.png"
              alt="Caden Erwin"
              className="w-full h-full object-cover object-top grayscale-[20%] sepia-[10%] contrast-[1.1] hover:grayscale-0 transition-all duration-700 ease-out"
            />
            {/* Swiss/Clinical coordinate overlay on image */}
            <div className="absolute top-4 left-4 text-[10px] font-mono text-white/20 tracking-widest">CAD-ERN.EXE</div>
          </div>
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

const ComputeReveal = ({ value, duration = 2.5 }) => {
  const [displayValue, setDisplayValue] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })

  useEffect(() => {
    if (inView) {
      let startTimestamp = null
      const endValue = parseFloat(value)
      if (isNaN(endValue)) return

      const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp
        const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1)
        const current = progress * endValue

        if (progress < 1) {
          setDisplayValue(current.toFixed(1))
          window.requestAnimationFrame(step)
        } else {
          setDisplayValue(value)
        }
      }
      window.requestAnimationFrame(step)
    }
  }, [inView, value, duration])

  return (
    <span ref={ref} className="text-transparent bg-clip-text bg-gradient-to-t from-orange-400 via-white to-white">
      {displayValue}{value.toString().includes('+') && !displayValue.toString().includes('+') ? '+' : ''}
    </span>
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
      <SuccessFramework />

      {/* Re-focusing Bento as 'The Impact' or supplemental proof */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(280px,auto)]"
        variants={container}
        initial="hidden"
        animate={inView ? "show" : "hidden"}
      >
        {/* Large Card - Introduction */}
        <motion.div
          variants={item}
          className="md:col-span-2 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-10 flex flex-col justify-end group hover:border-accent/40 hover:shadow-[0_0_30px_rgba(99,102,241,0.15)] transition-all duration-500 relative overflow-hidden cursor-pointer"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
          <Lightbulb className="w-10 h-10 text-white/80 mb-6" />
          <h3 className="font-display text-3xl text-white mb-4 tracking-tight">Innovation in Education</h3>
          <p className="text-white/60 text-lg leading-relaxed max-w-xl">
            A methodology built on academic precision and peer-led leadership. I bridge the gap between classroom theory and real-world mastery, providing students with the strategic framework and confidence needed to excel.
          </p>
        </motion.div>

        {/* Tall Card - Stats */}
        <motion.div
          variants={item}
          className="md:row-span-2 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-10 flex flex-col justify-between group hover:border-accent/40 hover:shadow-[0_0_30px_rgba(99,102,241,0.15)] transition-all duration-500 relative overflow-hidden cursor-pointer"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-purple-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
          <div>
            <Award className="w-10 h-10 text-white/80 mb-6" />
            <h3 className="font-display text-3xl text-white mb-2 tracking-tight">Impact</h3>
          </div>
          <ul className="space-y-10">
            <li className="flex flex-col">
              <div className="text-5xl font-display text-white mb-1 shadow-[0_0_20px_rgba(255,255,255,0.1)] tracking-tighter w-fit">
                <ComputeReveal value="4.0" />
              </div>
              <div className="text-white/50 text-[10px] uppercase tracking-[0.3em] font-mono">GPA Maintained</div>
            </li>
            <li className="flex flex-col">
              <div className="text-5xl font-display text-white mb-1 shadow-[0_0_20px_rgba(255,255,255,0.1)] tracking-tighter w-fit">
                <ComputeReveal value="3+" />
              </div>
              <div className="text-white/50 text-[10px] uppercase tracking-[0.3em] font-mono">Years Experience</div>
            </li>
          </ul>
        </motion.div>

        {/* Medium Card - Philosophy */}
        <motion.div
          variants={item}
          className="rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-10 flex flex-col justify-end group hover:border-accent/40 hover:shadow-[0_0_30px_rgba(99,102,241,0.15)] transition-all duration-500 relative overflow-hidden cursor-pointer"
        >
          <Users className="w-10 h-10 text-white/80 mb-6" />
          <h3 className="font-display text-2xl text-white mb-3 tracking-tight">Community First</h3>
          <p className="text-white/60 leading-relaxed">
            Building a network of peers who support and challenge each other.
          </p>
        </motion.div>

        {/* Medium Card - Skills */}
        <motion.div
          variants={item}
          className="rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-10 flex flex-col justify-end group hover:border-accent/40 hover:shadow-[0_0_30px_rgba(99,102,241,0.15)] transition-all duration-500 relative overflow-hidden cursor-pointer"
        >
          <Rocket className="w-10 h-10 text-white/80 mb-6" />
          <h3 className="font-display text-2xl text-white mb-3 tracking-tight">Future Ready</h3>
          <p className="text-white/60 leading-relaxed">
            Preparing for the challenges of tomorrow with adaptive learning.
          </p>
        </motion.div>

      </motion.div>
    </section >
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
  return null;
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
      email: PROFILE.contact.email,
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
              <li><a href={`mailto:${PROFILE.contact.email}`} className="hover:text-white transition-colors">Email Me</a></li>
              <li><a href="https://instagram.com/thedutcher_bhs" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Instagram</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-white text-sm uppercase tracking-widest mb-6">Transparency</h4>
            <ul className="space-y-4 text-sm">
              <li><Link to="/transparency" className="text-white/30 hover:text-white transition-colors">Academic Records</Link></li>
              <li><Link to="/verification-process" className="text-white/30 hover:text-white transition-colors">Verification Process</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-display text-white text-sm uppercase tracking-widest mb-6">Legal</h4>
            <ul className="space-y-4 text-sm">
              <li><Link to="/terms" className="text-white/30 hover:text-white transition-colors">TOS + Privacy Policy</Link></li>
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
