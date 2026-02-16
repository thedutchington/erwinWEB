import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Calendar, Send, ChevronRight, ArrowLeft, MessageSquare, BookOpen, Users } from 'lucide-react'
import { PROFILE, BOOKING_URL } from '../data'

export default function ContactPage() {
  const [step, setStep] = useState(1)
  const [type, setType] = useState(null)

  const steps = {
    1: {
      title: "What are you looking for?",
      options: [
        { id: 'tutoring', label: 'Academic Tutoring', icon: BookOpen, sub: 'Math 1-3, Chemistry, Biology' },
        { id: 'mentorship', label: 'Peer Mentorship', icon: Users, sub: 'Study Habits & Leadership' },
        { id: 'other', label: 'Other Inquiry', icon: MessageSquare, sub: 'Questions or Collaborations' }
      ]
    },
    2: {
      title: "How would you like to connect?",
      options: [
        { id: 'booking', label: 'Book a Session', icon: Calendar, sub: 'Pick a time on my calendar', link: BOOKING_URL },
        { id: 'email', label: 'Send an Email', icon: Mail, sub: PROFILE.contact.email, link: `mailto:${PROFILE.contact.email}` }
      ]
    }
  }

  const handleOptionClick = (option) => {
    if (step === 1) {
      setType(option.id)
      setStep(2)
    } else {
      window.open(option.link, option.id === 'booking' ? '_blank' : '_self')
    }
  }

  return (
    <div className="relative pt-32 pb-20 min-h-screen flex items-center justify-center">
      <div className="max-w-4xl w-full px-6 relative z-10">

        <header className="mb-12 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-5xl md:text-6xl text-white mb-4"
          >
            The Portal
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-white/50 text-lg"
          >
            Select an option below to get started.
          </motion.p>
        </header>

        <div className="relative min-h-[450px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, scale: 0.98, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: -10 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="space-y-8"
            >
              <div className="text-center mb-8">
                {step > 1 && (
                  <button
                    onClick={() => setStep(1)}
                    className="mb-4 inline-flex items-center gap-2 text-accent hover:text-white transition-colors text-sm font-medium"
                  >
                    <ArrowLeft size={16} />
                    Back
                  </button>
                )}
                <h2 className="font-display text-2xl md:text-3xl text-white/90">{steps[step].title}</h2>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {steps[step].options.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => handleOptionClick(option)}
                    className="group flex items-center gap-6 p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-accent/30 hover:bg-white/10 transition-all text-left relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-accent/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                    <div className="p-4 rounded-xl bg-white/5 text-white/40 group-hover:bg-accent group-hover:text-white transition-all">
                      <option.icon size={28} />
                    </div>

                    <div className="flex-1">
                      <h3 className="font-display text-xl text-white group-hover:text-accent transition-colors">{option.label}</h3>
                      <p className="text-white/40 text-sm group-hover:text-white/60 transition-colors">{option.sub}</p>
                    </div>

                    <ChevronRight size={20} className="text-white/20 group-hover:text-white transition-all transform group-hover:translate-x-1" />
                  </button>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <footer className="mt-20 flex justify-center gap-8 border-t border-white/5 pt-12">
          <div className="text-center">
            <div className="text-xs font-display text-white/20 uppercase tracking-[0.2em] mb-2">Social</div>
            <a href="https://instagram.com/thedutcher_bhs" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors text-sm underline decoration-white/10 underline-offset-4">
              Instagram
            </a>
          </div>
          <div className="text-center">
            <div className="text-xs font-display text-white/20 uppercase tracking-[0.2em] mb-2">Response Time</div>
            <div className="text-white/60 text-sm italic">Usually within 24h</div>
          </div>
        </footer>

      </div>
    </div>
  )
}
