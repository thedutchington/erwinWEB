import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLocation } from 'react-router-dom'

/**
 * Liquid Glass Page Transition (v6 - Visual Completion)
 * 
 * CORE LOGIC:
 * A single continuous liquid wash that:
 * 1. Rises from bottom (Exit) to cover screen.
 * 2. Recedes to top (Enter) to reveal screen.
 * 
 * FIXES:
 * - OFF-SCREEN OVERFLOW: Increased distances to 150vh and used hidden overflow.
 * - VISIBILITY: Explicitly hidden unless animating to prevent "ghost" lines.
 */

const transition = { duration: 0.9, ease: [0.76, 0, 0.24, 1] }

const glassStyles = {
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(40px) saturate(150%)',
    WebkitBackdropFilter: 'blur(40px) saturate(150%)',
}

export const PageTransition = ({ children }) => {
    const location = useLocation()

    return (
        <AnimatePresence mode="wait" initial={false}>
            <motion.div
                key={location.pathname}
                className="flex-1 flex flex-col relative"
            >
                {/* Content Animation */}
                <motion.div
                    initial={{ opacity: 0, filter: 'blur(10px)' }}
                    animate={{ opacity: 1, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, filter: 'blur(10px)' }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="flex-1 flex flex-col"
                >
                    {children}
                </motion.div>

                {/* 
            THE LIQUID WASH (EXIT PHASE)
            Rises from the abyss to swallow the page.
        */}
                <motion.div
                    className="fixed inset-0 pointer-events-none z-[120]"
                    initial={{ y: '150vh', display: 'none' }}
                    animate={{ y: '150vh', transitionEnd: { display: 'none' } }}
                    exit={{ y: 0, display: 'block' }}
                    transition={transition}
                    style={glassStyles}
                >
                    <svg
                        className="absolute top-0 left-0 w-full h-[300px] -translate-y-full opacity-60"
                        viewBox="0 0 100 100"
                        preserveAspectRatio="none"
                    >
                        <path d="M 0 100 Q 50 0 100 100 Z" fill="rgba(255, 255, 255, 0.1)" />
                    </svg>
                </motion.div>

                {/* 
            THE LIQUID WASH (ENTER PHASE)
            Recedes into the sky to reveal the new page.
        */}
                <motion.div
                    className="fixed inset-0 pointer-events-none z-[120]"
                    initial={{ y: 0, display: 'block' }}
                    animate={{ y: '-150vh', transitionEnd: { display: 'none' } }}
                    transition={transition}
                    style={glassStyles}
                >
                    <svg
                        className="absolute bottom-0 left-0 w-full h-[300px] translate-y-full rotate-180 opacity-60"
                        viewBox="0 0 100 100"
                        preserveAspectRatio="none"
                    >
                        <path d="M 0 100 Q 50 0 100 100 Z" fill="rgba(255, 255, 255, 0.1)" />
                    </svg>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    )
}
