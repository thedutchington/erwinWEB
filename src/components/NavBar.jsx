import React, { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { BOOKING_URL } from '../data'
import { Magnetic } from './ui/Magnetic'

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/blog', label: 'Blog' },
  { to: '/transparency', label: 'Transparency' },
  { to: '/contact', label: 'Contact' },
]

export const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setIsOpen(false)
  }, [location])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 pt-4">
      {/*
        TRUE LIQUID GLASS NAV
        - Removed all sharp gradient "lines" and "beams"
        - Relies on deep backdrop-blur-2xl for organic refraction
        - Ultra-thin, consistent border that feels like a glass edge
        - Subtle inner shadow for depth
      */}
      <nav
        className={`
          relative w-full max-w-4xl mx-auto px-6 h-14 flex items-center justify-between
          rounded-2xl
          backdrop-blur-2xl backdrop-saturate-150
          border border-white/[0.1]
          transition-all duration-500 ease-out
          ${scrolled
            ? 'bg-white/[0.08] shadow-[0_12px_40px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.05)]'
            : 'bg-white/[0.04] shadow-[0_4px_20px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.03)]'
          }
        `}
      >
        {/* Soft Ambient Light (Organic, no sharp lines) */}
        <div
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            background: 'radial-gradient(circle at 50% 0%, rgba(255,255,255,0.1), transparent 70%)'
          }}
        />

        <Link to="/" className="flex items-center gap-2 group focus:outline-none relative z-10">
          <img
            src="/logo.png"
            alt="Caden Erwin Logo"
            className="h-7 w-auto object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-300 invert"
          />
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-1 relative z-10">
          {NAV_LINKS.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `px-3.5 py-1.5 rounded-xl text-sm font-body tracking-wide transition-all duration-300 ${isActive
                    ? 'text-gold bg-white/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]'
                    : 'text-white/50 hover:text-white/90 hover:bg-white/[0.05]'
                  }`
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center relative z-10">
          <Magnetic strength={0.25}>
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2 rounded-xl bg-gold/90 backdrop-blur-sm text-[#0A0A0A] text-sm font-bold hover:bg-gold transition-all duration-300 inline-block shadow-[0_4px_12px_rgba(245,158,11,0.3)] hover:shadow-[0_6px_20px_rgba(245,158,11,0.4)]"
            >
              Book Now
            </a>
          </Magnetic>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 text-white/60 hover:text-white transition-colors focus:outline-none relative z-10"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="mt-3 mx-auto max-w-4xl rounded-2xl backdrop-blur-2xl backdrop-saturate-150 bg-white/[0.06] border border-white/[0.1] shadow-[0_12px_40px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.08)] p-5 md:hidden flex flex-col gap-1.5"
          >
            {NAV_LINKS.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `text-base font-body p-3.5 rounded-xl transition-all duration-200 ${isActive
                    ? 'text-gold bg-white/[0.08]'
                    : 'text-white/50 hover:text-white hover:bg-white/[0.05]'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 w-full flex items-center justify-center px-5 py-3.5 rounded-xl bg-gold/90 backdrop-blur-sm text-[#0A0A0A] font-bold shadow-[0_4px_12px_rgba(245,158,11,0.3)]"
            >
              Book a Session
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
