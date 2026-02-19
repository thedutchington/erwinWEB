import React, { useRef, useCallback } from 'react'

/**
 * Wraps any element with a "magnetic" pull effect.
 * On hover, the element gently drifts toward the cursor.
 * On click, applies a brief "jiggle" with physics-based spring.
 */
export function Magnetic({ children, strength = 0.3, className = '' }) {
    const ref = useRef(null)

    const handleMouseMove = useCallback((e) => {
        const el = ref.current
        if (!el) return

        const rect = el.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2

        const deltaX = (e.clientX - centerX) * strength
        const deltaY = (e.clientY - centerY) * strength

        el.style.transition = 'transform 0.25s cubic-bezier(0.23, 1, 0.32, 1)'
        el.style.transform = `translate(${deltaX}px, ${deltaY}px)`
    }, [strength])

    const handleMouseLeave = useCallback(() => {
        const el = ref.current
        if (!el) return
        el.style.transition = 'transform 0.4s cubic-bezier(0.23, 1, 0.32, 1)'
        el.style.transform = 'translate(0, 0)'
    }, [])

    const handleClick = useCallback(() => {
        const el = ref.current
        if (!el) return

        // Force a reflow to restart animation if already playing
        el.style.animation = 'none'
        el.offsetHeight // trigger reflow
        el.style.animation = 'jiggle 0.35s cubic-bezier(0.36, 0.07, 0.19, 0.97) both'

        const onEnd = () => {
            el.style.animation = ''
            el.removeEventListener('animationend', onEnd)
        }
        el.addEventListener('animationend', onEnd)
    }, [])

    return (
        <div
            ref={ref}
            className={`inline-block ${className}`}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
        >
            {children}
        </div>
    )
}
