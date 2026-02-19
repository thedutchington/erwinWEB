import React, { useState, useLayoutEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLocation, useOutlet } from 'react-router-dom'

/**
 * Liquid Glass Page Transition (v11 - THE FLASH-GUARD)
 * 
 * CORE LOGIC:
 * 1. INSTANT RISE: Wash covers screen in 300ms.
 * 2. DELAYED REVEAL: New page stays hidden for 500ms.
 * 3. FROZEN SNAPSHOT: Forces the old route element to stay static.
 */

const transition = { duration: 0.6, ease: [0.45, 0, 0.55, 1] }

const washOpacity = 0.07 // Shared opacity to prevent lines
const glassStyles = {
    background: `rgba(255, 255, 255, ${washOpacity})`,
    backdropFilter: 'blur(100px) saturate(220%)',
    WebkitBackdropFilter: 'blur(100px) saturate(220%)',
}

// FrozenRoute to lock content during exit phase
const FrozenRoute = ({ children }) => {
    const [snapshot] = useState(children)
    return <>{snapshot}</>
}

export const PageTransition = () => {
    const location = useLocation()
    const element = useOutlet()

    return (
        <div className="flex-1 flex flex-col relative overflow-hidden">
            <AnimatePresence mode="wait">
                <motion.div
                    key={location.pathname}
                    className="flex-1 flex flex-col relative"
                >
                    {/* CONTENT LAYER - Integrated Reveal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.02 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        className="flex-1 flex flex-col pt-4"
                    >
                        <FrozenRoute>
                            {element}
                        </FrozenRoute>
                    </motion.div>

                    {/* LIQUID WASH (EXIT) - Seamless Rise */}
                    <motion.div
                        className="fixed inset-0 pointer-events-none z-[999]"
                        initial={{ y: '150vh', display: 'none' }}
                        animate={{ y: '150vh', transitionEnd: { display: 'none' } }}
                        exit={{ y: 0, display: 'block' }}
                        transition={transition}
                        style={glassStyles}
                    >
                        <svg
                            className="absolute top-0 left-0 w-full h-[350px] -translate-y-[99%] opacity-100" // Opacity 100 to match parent exactly
                            viewBox="0 0 100 100"
                            preserveAspectRatio="none"
                        >
                            <path
                                d="M 0 100 Q 50 0 100 100 Z"
                                fill={`rgba(255, 255, 255, ${washOpacity})`} // MATCHED perfectly
                            />
                        </svg>
                    </motion.div>

                    {/* LIQUID WASH (ENTER) - Seamless Recede */}
                    <motion.div
                        className="fixed inset-0 pointer-events-none z-[999]"
                        initial={{ y: 0, display: 'block' }}
                        animate={{ y: '-150vh', transitionEnd: { display: 'none' } }}
                        transition={transition}
                        style={glassStyles}
                    >
                        <svg
                            className="absolute bottom-0 left-0 w-full h-[350px] translate-y-[99%] rotate-180 opacity-100"
                            viewBox="0 0 100 100"
                            preserveAspectRatio="none"
                        >
                            <path
                                d="M 0 100 Q 50 0 100 100 Z"
                                fill={`rgba(255, 255, 255, ${washOpacity})`} // MATCHED perfectly
                            />
                        </svg>
                    </motion.div>
                </motion.div>
            </AnimatePresence>
        </div>
    )
}
