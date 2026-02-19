import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial, Sphere, PerspectiveCamera, Environment, ContactShadows } from '@react-three/drei'
import * as THREE from 'three'

function LiquidSphere() {
    const meshRef = useRef()
    const mouse = useRef({ x: 0, y: 0 })

    // Track mouse for subtle reactivity
    React.useEffect(() => {
        const handleMouseMove = (e) => {
            mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1
            mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1
        }
        window.addEventListener('mousemove', handleMouseMove)
        return () => window.removeEventListener('mousemove', handleMouseMove)
    }, [])

    useFrame((state) => {
        const time = state.clock.getElapsedTime()

        // Organic floating movement
        meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, Math.sin(time) * 0.2 + (mouse.current.y * 0.3), 0.1)
        meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, mouse.current.x * 0.5, 0.1)

        // Rotation based on time and mouse
        meshRef.current.rotation.x = Math.cos(time * 0.5) * 0.2
        meshRef.current.rotation.y = Math.sin(time * 0.3) * 0.2
    })

    return (
        <Float speed={1.5} rotationIntensity={1} floatIntensity={1}>
            <Sphere ref={meshRef} args={[1.2, 100, 100]}>
                <MeshDistortMaterial
                    color="#ffffff" // Clean white/glass base
                    speed={4}
                    distort={0.5}
                    radius={1}
                    metalness={0.9}
                    roughness={0}
                    transparent
                    opacity={0.15} // Much more subtle
                    envMapIntensity={2}
                    clearcoat={1}
                    clearcoatRoughness={0}
                />
            </Sphere>
        </Float>
    )
}

export function Scene3D() {
    return (
        <div className="absolute inset-0 z-[-1] pointer-events-none overflow-hidden">
            <Canvas dpr={[1, 2]}>
                <PerspectiveCamera makeDefault position={[0, 0, 4]} />

                {/* Environment adds the "Liquid Glass" reflections */}
                <Environment preset="city" />

                <ambientLight intensity={0.2} />
                <spotLight position={[10, 10, 10]} angle={0.2} penumbra={1} intensity={1} />

                <LiquidSphere />

                {/* Subtle shadow to ground it in the virtual space */}
                <ContactShadows
                    rotation={[Math.PI / 2, 0, 0]}
                    position={[0, -2, 0]}
                    opacity={0.3}
                    width={10}
                    height={10}
                    blur={2.5}
                    far={2}
                />
            </Canvas>
        </div>
    )
}
