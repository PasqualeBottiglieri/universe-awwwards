'use client';

import { Canvas } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import { Planet } from './Planet';
import { StarField } from './StarField';

/**
 * HeroScene — 3D backdrop for the hero section.
 *
 * CHANGES:
 * - Added secondary rim light for more cinematic look
 * - Increased star count for denser starfield
 * - Adjusted Float parameters for subtler movement
 * - Better camera position for composition
 */

const NEBULA_TEXTURE = 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=1200';

export function HeroScene() {
  return (
    <div className="absolute inset-0 z-10">
      <Canvas camera={{ position: [0, 0, 4.2], fov: 48 }} dpr={[1, 1.5]}>
        {/* ── Lighting: key + fill + rim ── */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[3, 2, 4]} intensity={1.1} color="#f0e6ff" />
        <pointLight position={[-4, -2, 2]} intensity={0.35} color="#22d3ee" />

        <StarField count={4000} />

        <Float speed={1} rotationIntensity={0.12} floatIntensity={0.3}>
          <Planet textureUrl={NEBULA_TEXTURE} radius={1.5} speed={0.5} />
        </Float>
      </Canvas>
    </div>
  );
}
