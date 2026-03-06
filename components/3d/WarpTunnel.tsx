'use client';

import { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function TunnelLines() {
  const group = useRef<THREE.Group>(null);
  const rings = useMemo(() => new Array(40).fill(0).map((_, i) => i), []);

  useFrame(({ clock }) => {
    if (!group.current) return;
    group.current.rotation.z = clock.getElapsedTime() * 0.06;
  });

  return (
    <group ref={group} position={[0, -0.6, -2]}>
      {rings.map((idx) => (
        <mesh key={idx} position={[0, 0, -idx * 0.35]}>
          <torusGeometry args={[1.2 + idx * 0.02, 0.01, 8, 80]} />
          <meshBasicMaterial color={idx % 2 === 0 ? '#22d3ee' : '#7c3aed'} transparent opacity={0.35} />
        </mesh>
      ))}
    </group>
  );
}

export function WarpTunnel() {
  return (
    <div className="pointer-events-none absolute inset-0 z-10">
      <Canvas camera={{ position: [0, 0, 3], fov: 55 }}>
        <fog attach="fog" args={['#03040a', 2, 16]} />
        <TunnelLines />
      </Canvas>
    </div>
  );
}
