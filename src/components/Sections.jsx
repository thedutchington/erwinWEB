import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import {
  GraduationCap,
  Award,
  BookOpen,
  Users,
  ChevronDown,
  Mail,
  Instagram,
  Calendar,
  School,
  Lightbulb,
  Rocket,
} from 'lucide-react'
import { ErrorBoundary } from 'react-error-boundary'
import { SuccessFramework } from './SuccessFramework'
import { Magnetic } from './ui/Magnetic'
import { Scene3D } from './ui/Scene3D'

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

// Deprecated internal animations - transition handled by global PageTransition
const fadeInUp = {}

// ─────────────────────────────────────
// HERO — stripped of gradient text, glow halos, CAD-ERN.EXE overlay
// ─────────────────────────────────────
export function Hero() {
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 500], [0, 100])
  const y2 = useTransform(scrollY, [0, 500], [0, -50])

  return (
    <section
      className="relative min-h-screen flex flex-col justify-center px-6 py-24 overflow-hidden"
    >
      <Scene3D />
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-12 items-center">
        <div>
          <p className="font-mono text-xs text-white/30 uppercase tracking-[0.3em] mb-6">Beaumont, CA</p>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-white tracking-tight mb-6 leading-[0.95]">
            Caden<br />Erwin
          </h1>
          <p className="font-body text-lg md:text-xl text-white/50 max-w-lg mb-10 leading-relaxed">
            I tutor math and chemistry for high schoolers in Beaumont. I also do ASB, and I write about what I learn along the way.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <Magnetic strength={0.25}>
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-gold text-[#0A0A0A] font-bold text-sm rounded-md hover:bg-amber-400 transition-colors duration-200 text-center inline-block"
              >
                Book a session
              </a>
            </Magnetic>
            <Magnetic strength={0.2}>
              <Link
                to="/about"
                className="px-6 py-3 border border-white/10 text-white/60 hover:text-white hover:border-white/25 transition-colors duration-200 text-sm text-center rounded-md inline-block"
              >
                About me
              </Link>
            </Magnetic>
          </div>
        </div>

        <motion.div
          className="flex justify-center lg:justify-end"
          style={{ y: y2 }}
        >
          <div className="w-56 h-56 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-lg overflow-hidden border border-white/10 grayscale-[15%] contrast-[1.05]">
            <img
              src="/caden-headshot.png"
              alt="Caden Erwin"
              className="w-full h-full object-cover object-top"
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────
// BENTO GRID — stripped of glassmorphism, glow shadows, gradient overlays
// ─────────────────────────────────────
function Fallback({ error }) {
  return (
    <div role="alert" className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-200">
      <p>Something went wrong:</p>
      <pre className="text-sm mt-2">{error.message}</pre>
    </div>
  )
}

const ComputeReveal = ({ value, duration = 2 }) => {
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
    <span ref={ref} className="text-white">
      {displayValue}{value.toString().includes('+') && !displayValue.toString().includes('+') ? '+' : ''}
    </span>
  )
}

const BentoGridInner = React.memo(function BentoGrid() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} id="about" className="px-6 py-24 max-w-5xl mx-auto">
      <SuccessFramework />

      <div
        className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[minmax(240px,auto)] mt-16"
      >
        {/* Intro card */}
        <div
          className="md:col-span-2 border border-white/[0.06] rounded-lg p-8 flex flex-col justify-end bg-black/10"
        >
          <Lightbulb className="w-8 h-8 text-white/40 mb-5" />
          <h3 className="font-display text-2xl text-white mb-3">What I actually do</h3>
          <p className="text-white/45 leading-relaxed max-w-lg">
            I help students who are stuck in math or chemistry. Not with motivational speeches — with the specific concepts they're missing. I've been where they are, and I remember what was confusing.
          </p>
        </div>

        {/* Stats card */}
        <div
          className="md:row-span-2 border border-white/[0.06] rounded-lg p-8 flex flex-col justify-between bg-black/10"
        >
          <div>
            <Award className="w-8 h-8 text-white/40 mb-5" />
            <h3 className="font-display text-2xl text-white mb-2">By the numbers</h3>
          </div>
          <ul className="space-y-8">
            <li className="flex flex-col">
              <div className="text-4xl font-display text-white mb-1 tracking-tight">
                <ComputeReveal value="4.0" />
              </div>
              <div className="text-white/30 text-xs uppercase tracking-[0.2em] font-mono">GPA</div>
            </li>
            <li className="flex flex-col">
              <div className="text-4xl font-display text-white mb-1 tracking-tight">
                <ComputeReveal value="3+" />
              </div>
              <div className="text-white/30 text-xs uppercase tracking-[0.2em] font-mono">Years tutoring</div>
            </li>
          </ul>
        </div>

        {/* Community card */}
        <div className="border border-white/[0.06] rounded-lg p-8 flex flex-col justify-end bg-black/10">
          <Users className="w-8 h-8 text-white/40 mb-5" />
          <h3 className="font-display text-xl text-white mb-2">People, not metrics</h3>
          <p className="text-white/40 leading-relaxed text-sm">
            The students I work with become peers I learn from too.
          </p>
        </div>

        {/* Skills card */}
        <div className="border border-white/[0.06] rounded-lg p-8 flex flex-col justify-end bg-black/10">
          <Rocket className="w-8 h-8 text-white/40 mb-5" />
          <h3 className="font-display text-xl text-white mb-2">Ahead of schedule</h3>
          <p className="text-white/40 leading-relaxed text-sm">
            Finished Math 3 as a sophomore. Now I help others do the same.
          </p>
        </div>

      </div>
    </section>
  )
})

export const BentoGrid = (props) => (
  <ErrorBoundary FallbackComponent={Fallback}>
    <BentoGridInner {...props} />
  </ErrorBoundary>
)

// ─────────────────────────────────────
// TIMELINE — stripped of glow dots, gradient divider
// ─────────────────────────────────────
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
    <section
      ref={ref}
      id="journey"
      className="px-6 py-24 max-w-4xl mx-auto"
    >
      <div className="mb-16">
        <h2 className="font-display text-4xl text-white mb-2">Where I've been</h2>
        <p className="text-white/30 text-sm">The short version.</p>
      </div>

      <div className="relative border-l border-white/[0.08] ml-4 md:ml-0 space-y-12">
        {flattened.map((node, i) => (
          <div
            key={`${node.institution}-${node.grade}`}
            className="relative pl-10 md:pl-14"
          >
            <span className="absolute -left-[4px] top-2.5 w-2 h-2 rounded-full bg-white/20" />

            <div className="md:grid md:grid-cols-[100px_1fr] gap-6 items-start">
              <span className="font-mono text-xs text-white/30 pt-1 block mb-1 md:mb-0">{node.grade}</span>
              <div className="p-5 border border-white/[0.06] rounded-lg bg-black/10">
                <h3 className="font-display text-lg text-white mb-1">{node.title}</h3>
                <div className="text-[11px] text-white/30 mb-3 uppercase tracking-widest">{node.institution}</div>
                <p className="text-white/50 leading-relaxed text-sm">{node.details}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
})

// ─────────────────────────────────────
// SERVICES — stripped of purple blur blob, background icon ghosts, sliding CTA
// ─────────────────────────────────────
export const Services = React.memo(function Services() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const navigate = useNavigate()

  return (
    <section
      ref={ref}
      id="services"
      className="px-6 py-24"
    >
      <div className="max-w-5xl mx-auto">
        <div className="mb-16">
          <h2 className="font-display text-4xl text-white mb-2">What I offer</h2>
          <p className="text-white/40 text-sm">Click any to get started.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {SERVICES_DATA.map((svc, i) => {
            const Icon = ICON_MAP[svc.iconKey] || BookOpen
            return (
              <div
                key={svc.id}
                className="group p-6 border border-white/[0.06] rounded-lg bg-black/10 hover:border-white/15 transition-colors duration-200 cursor-pointer"
                onClick={() => navigate('/contact')}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-md bg-white/[0.04] text-white/50">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                <h3 className="font-display text-xl text-white mb-2">{svc.title}</h3>
                <p className="text-white/40 leading-relaxed text-sm max-w-md">{svc.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
})

export const Testimonials = React.memo(function Testimonials() {
  return null;
})

// ─────────────────────────────────────
// FAQ — mostly clean, minor de-AI tweaks
// ─────────────────────────────────────
export const FAQ = React.memo(function FAQ() {
  const [openId, setOpenId] = useState(FAQ_DATA[0]?.id ?? null)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section
      ref={ref}
      id="faq"
      className="px-6 py-24 max-w-2xl mx-auto"
    >
      <h2 className="font-display text-3xl text-white mb-12">Questions people actually ask</h2>
      <ul className="space-y-3">
        {FAQ_DATA.map((faq, i) => (
          <li
            key={faq.id}
            className="border border-white/[0.06] rounded-lg overflow-hidden bg-black/10"
          >
            <button
              type="button"
              onClick={() => setOpenId((prev) => (prev === faq.id ? null : faq.id))}
              className={`w-full text-left flex items-center justify-between gap-4 px-5 py-4 transition-colors ${openId === faq.id ? 'bg-white/[0.03]' : 'hover:bg-white/[0.02]'}`}
            >
              <span className="font-display text-base text-white/80">{faq.question}</span>
              <ChevronDown className={`w-4 h-4 text-white/30 shrink-0 transition-transform duration-200 ${openId === faq.id ? 'rotate-180' : ''}`} />
            </button>
            <motion.div
              initial={false}
              animate={{ height: openId === faq.id ? 'auto' : 0, opacity: openId === faq.id ? 1 : 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="px-5 pb-5 pt-1 text-white/45 leading-relaxed text-sm">
                {faq.answer === 'schedule_link' ? (
                  <>
                    Use the{' '}
                    <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="text-gold underline hover:no-underline">
                      booking link
                    </a>
                    {' '}to pick a time.
                  </>
                ) : (
                  faq.answer
                )}
              </div>
            </motion.div>
          </li>
        ))}
      </ul>
    </section>
  )
})

export function CTA() {
  return null;
}

// ─────────────────────────────────────
// FOOTER — honest, no tagline
// ─────────────────────────────────────
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
    <footer className="px-6 pt-20 pb-10 text-white/30 border-t border-white/[0.06] mt-auto bg-black/10">
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-10 mb-16">
          {/* Logo */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block mb-6">
              <img src="/logo.png" alt="Caden Erwin" className="h-16 w-auto invert opacity-80" />
            </Link>
          </div>

          {/* Nav */}
          <div>
            <h4 className="font-display text-white/60 text-xs uppercase tracking-widest mb-5">Pages</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">About</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors">Services</Link></li>
              <li><Link to="/blog" className="hover:text-white transition-colors">Blog</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-display text-white/60 text-xs uppercase tracking-widest mb-5">Connect</h4>
            <ul className="space-y-3 text-sm">
              <li><a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Book a session</a></li>
              <li><a href={`mailto:${PROFILE.contact.email}`} className="hover:text-white transition-colors">Email me</a></li>
              <li><a href="https://instagram.com/thedutcher_bhs" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Instagram</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-display text-white/60 text-xs uppercase tracking-widest mb-5">More</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/transparency" className="hover:text-white transition-colors">Transparency</Link></li>
              <li><Link to="/verification-process" className="hover:text-white transition-colors">Verification</Link></li>
              <li><Link to="/terms" className="hover:text-white transition-colors">Terms & Privacy</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-white/[0.04] flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-xs text-white/20">© {new Date().getFullYear()} Caden Erwin</span>
          <a href="https://instagram.com/thedutcher_bhs" target="_blank" rel="noopener noreferrer" className="text-white/20 hover:text-white/40 transition-colors">
            <Instagram size={16} />
          </a>
        </div>
      </div>
    </footer>
  )
})
