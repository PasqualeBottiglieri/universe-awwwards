'use client';

import { useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Planet — Textured sphere with mouse-reactive position.
 *
 * CHANGES:
 * - Added subtle Fresnel-like rim using emissive for atmosphere feel
 * - Reduced pointer influence for less jarring movement
 * - Higher roughness for more realistic matte planet surface
 */

type PlanetProps = {
  textureUrl: string;
  radius?: number;
  speed?: number;
  position?: [number, number, number];
};

export function Planet({
  textureUrl,
  radius = 1.3,
  speed = 0.12,
  position = [0, 0, 0],
}: PlanetProps) {
  const mesh = useRef<THREE.Mesh>(null);
  const texture = useLoader(THREE.TextureLoader, textureUrl);

  useFrame((state) => {
    if (!mesh.current) return;
    mesh.current.rotation.y += 0.002 * speed;

    /* Subtle mouse parallax (reduced intensity) */
    const px = state.pointer.x * 0.15;
    const py = state.pointer.y * 0.1;
    mesh.current.position.x = position[0] + px;
    mesh.current.position.y = position[1] + py;
  });

  return (
    <mesh ref={mesh} position={position}>
      <sphereGeometry args={[radius, 64, 64]} />
      <meshStandardMaterial
        map={texture}
        metalness={0.05}
        roughness={0.85}
        emissive="#0d1a2f"
        emissiveIntensity={0.15}
      />
    </mesh>
  );
}
