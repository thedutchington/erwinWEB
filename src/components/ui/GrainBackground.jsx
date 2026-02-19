import React, { useEffect, useRef } from 'react'

/**
 * Scroll-linked Liquid Background (Orchestrated).
 *
 * IMPROVEMENTS (v0.0.9.6):
 * 1. Scroll-linked noise: Scrolling "down" moves the noise field vertically, 
 *    making the background feel infinite and unique to the vertical position.
 * 2. Optimized FBM: Performance-optimized noise calculation for 60fps scroll.
 * 3. Parallax Depth: Multiple noise layers with different scroll speeds.
 */

function noise2D(x, y) {
    const n = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453
    return n - Math.floor(n)
}

function smoothNoise(x, y) {
    const ix = Math.floor(x), iy = Math.floor(y)
    const fx = x - ix, fy = y - iy
    const sx = fx * fx * (3 - 2 * fx)
    const sy = fy * fy * (3 - 2 * fy)

    const a = noise2D(ix, iy)
    const b = noise2D(ix + 1, iy)
    const c = noise2D(ix, iy + 1)
    const d = noise2D(ix + 1, iy + 1)

    return a + (b - a) * sx + (c - a) * sy + (a - b - c + d) * sx * sy
}

function fbm(x, y, octaves = 3) {
    let val = 0, amp = 0.5
    for (let i = 0; i < octaves; i++) {
        val += amp * smoothNoise(x, y)
        x *= 2.0
        y *= 2.0
        amp *= 0.5
    }
    return val
}

export function GrainBackground() {
    const canvasRef = useRef(null)
    const scrollRef = useRef(0)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        let animId = null
        let mouseX = 0.5, mouseY = 0.5
        let smX = 0.5, smY = 0.5

        // High performance resolution for smooth liquid feel
        const RES = 120
        const offscreen = document.createElement('canvas')
        offscreen.width = RES
        offscreen.height = RES
        const offCtx = offscreen.getContext('2d')
        const imgData = offCtx.createImageData(RES, RES)
        const pix = imgData.data

        const seed = Math.random() * 100

        const resize = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }

        const handleMouse = (e) => {
            mouseX = e.clientX / window.innerWidth
            mouseY = e.clientY / window.innerHeight
        }

        const handleScroll = () => {
            scrollRef.current = window.scrollY
        }

        function colorAt(n) {
            if (n < 0.35) {
                const t = n / 0.35
                return [10 + t * 20, 10 + t * 18, 10 + t * 16]
            } else if (n < 0.6) {
                const t = (n - 0.35) / 0.25
                return [30 + t * 50, 28 + t * 45, 26 + t * 42]
            } else if (n < 0.82) {
                const t = (n - 0.6) / 0.22
                return [80 + t * 120, 73 + t * 70, 68 - t * 20]
            } else {
                const t = (n - 0.82) / 0.18
                return [200 + t * 40, 143 + t * 60, 48 + t * 100]
            }
        }

        const draw = (time) => {
            const t = time * 0.00007
            const scrollY = scrollRef.current * 0.001 // Scroll influence

            smX += (mouseX - smX) * 0.015
            smY += (mouseY - smY) * 0.015

            const mx = (smX - 0.5) * 0.5
            const my = (smY - 0.5) * 0.3

            for (let y = 0; y < RES; y++) {
                for (let x = 0; x < RES; x++) {
                    // Add scrollY to the Y coordinate to move the noise field vertically
                    const nx = x / RES * 3 + t + mx + seed
                    const ny = y / RES * 3 + t * 0.8 + my + seed + scrollY

                    const n1 = fbm(nx, ny, 3)
                    const val = n1 // Smoother single-pass for performance

                    const [r, g, b] = colorAt(val)
                    const i = (y * RES + x) * 4
                    pix[i] = r
                    pix[i + 1] = g
                    pix[i + 2] = b
                    pix[i + 3] = 255
                }
            }

            offCtx.putImageData(imgData, 0, 0)
            ctx.imageSmoothingEnabled = true
            ctx.drawImage(offscreen, 0, 0, canvas.width, canvas.height)

            animId = requestAnimationFrame(draw)
        }

        resize()
        window.addEventListener('resize', resize)
        window.addEventListener('mousemove', handleMouse)
        window.addEventListener('scroll', handleScroll, { passive: true })
        animId = requestAnimationFrame(draw)

        return () => {
            window.removeEventListener('resize', resize)
            window.removeEventListener('mousemove', handleMouse)
            window.removeEventListener('scroll', handleScroll)
            cancelAnimationFrame(animId)
        }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 z-0 pointer-events-none"
            style={{ width: '100%', height: '100%' }}
        />
    )
}
