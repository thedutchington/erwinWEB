import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { Float, MeshDistortMaterial, Sphere, PerspectiveCamera, Environment, ContactShadows } from '@react-three/drei'
import * as THREE from 'three'

export function Scene3D() {
    return (
        <div className="absolute inset-0 z-[-1] pointer-events-none overflow-hidden">
            <Canvas dpr={[1, 2]}>
                <PerspectiveCamera makeDefault position={[0, 0, 4]} />

                {/* Environment adds the "Liquid Glass" reflections */}
                <Environment preset="city" />

                <ambientLight intensity={0.2} />
                <spotLight position={[10, 10, 10]} angle={0.2} penumbra={1} intensity={1} />

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
