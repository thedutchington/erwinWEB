import React, { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { BOOKING_URL } from '../data'

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/transparency', label: 'Transparency' },
  { to: '/contact', label: 'Contact' },
]

export const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false)
  }, [location])

  return (
    <header className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
      <nav className="w-full max-w-4xl bg-[#0F172A]/60 backdrop-blur-xl border border-gold/20 rounded-full shadow-[0_8px_32px_rgba(245,158,11,0.1)] px-6 h-16 flex items-center justify-between relative z-50 transition-all duration-300 hover:border-gold/30 hover:shadow-[0_8px_32px_rgba(245,158,11,0.2)]">
        <Link to="/" className="flex items-center gap-2 group focus:outline-none">
          <img
            src="/logo.png"
            alt="Caden Erwin Logo"
            className="h-8 w-auto object-contain opacity-90 group-hover:opacity-100 transition-opacity invert"
          />
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-full text-sm font-display tracking-wide transition-all duration-300 relative ${isActive
                    ? 'text-gold bg-gold/10 font-medium shadow-[0_0_10px_rgba(245,158,11,0.2)]'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-4">
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-5 py-2 rounded-full bg-gold text-[#0F172A] text-sm font-bold tracking-wide hover:bg-amber-400 hover:shadow-[0_0_20px_rgba(245,158,11,0.4)] transition-all duration-300 transform hover:scale-105"
          >
            Book Now
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 text-white/80 hover:text-gold transition-colors focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-24 left-4 right-4 bg-[#0F172A]/90 backdrop-blur-2xl border border-gold/20 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.5)] p-6 md:hidden flex flex-col gap-4 z-40"
          >
            {NAV_LINKS.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `text-lg font-display p-3 rounded-xl transition-colors ${isActive ? 'text-gold bg-gold/10' : 'text-white/60 hover:text-white hover:bg-white/5'
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
              className="mt-2 w-full flex items-center justify-center px-5 py-3 rounded-xl bg-gold text-[#0F172A] font-bold tracking-wide"
            >
              Book a Session
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
