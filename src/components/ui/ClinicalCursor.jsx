import React, { useEffect, useState } from 'react'
import { motion, useSpring, useMotionValue } from 'framer-motion'

export const ClinicalCursor = () => {
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    const springConfig = { damping: 20, stiffness: 200 }
    const springX = useSpring(mouseX, springConfig)
    const springY = useSpring(mouseY, springConfig)

    const [isHovering, setIsHovering] = useState(false)

    useEffect(() => {
        const moveMouse = (e) => {
            mouseX.set(e.clientX)
            mouseY.set(e.clientY)
        }

        const handleMouseOver = (e) => {
            if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON' || e.target.closest('.cursor-pointer')) {
                setIsHovering(true)
            } else {
                setIsHovering(false)
            }
        }

        window.addEventListener('mousemove', moveMouse)
        window.addEventListener('mouseover', handleMouseOver)

        return () => {
            window.removeEventListener('mousemove', moveMouse)
            window.removeEventListener('mouseover', handleMouseOver)
        }
    }, [mouseX, mouseY])

    return (
        <div className="fixed inset-0 pointer-events-none z-[9999] hidden md:block">
            {/* Inner Dot */}
            <motion.div
                className="absolute w-1 h-1 bg-white rounded-full flex items-center justify-center"
                style={{
                    x: mouseX,
                    y: mouseY,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
            />
            {/* Outer Ring */}
            <motion.div
                className="absolute rounded-full border border-white/20"
                style={{
                    x: springX,
                    y: springY,
                    translateX: '-50%',
                    translateY: '-50%',
                    width: isHovering ? 40 : 20,
                    height: isHovering ? 40 : 20,
                }}
                transition={{ type: 'spring', damping: 25, stiffness: 150 }}
            >
                {/* Crosshairs */}
                <div className="absolute top-1/2 left-0 w-1 h-[1px] bg-white/10 -translate-y-1/2" />
                <div className="absolute top-1/2 right-0 w-1 h-[1px] bg-white/10 -translate-y-1/2" />
                <div className="absolute top-0 left-1/2 w-[1px] h-1 bg-white/10 -translate-x-1/2" />
                <div className="absolute bottom-0 left-1/2 w-[1px] h-1 bg-white/10 -translate-x-1/2" />
            </motion.div>
        </div>
    )
}
