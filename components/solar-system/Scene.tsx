'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import {
  type PlanetData,
  PLANETS,
  PLANET_VERT,
  ATMO_VERT,
  ATMO_FRAG,
  RING_VERT,
  RING_FRAG,
  planetFrag,
} from '@/lib/solar-system-data';

/* ═══════════════════════════════════════════════════════
   Camera Controller — reads position from external ref
   ═══════════════════════════════════════════════════════ */
type CameraTarget = {
  px: number; py: number; pz: number;
  lx: number; ly: number; lz: number;
};

export function CameraController({ target }: { target: React.RefObject<CameraTarget> }) {
  useFrame(({ camera }) => {
    if (!target.current) return;
    const t = target.current;
    camera.position.set(t.px, t.py, t.pz);
    camera.lookAt(t.lx, t.ly, t.lz);
  });
  return null;
}

/* ═══════════════════════════════════════════════════════
   Procedural Planet — ShaderMaterial with per-planet GLSL
   ═══════════════════════════════════════════════════════ */
function parseColor(s: string): THREE.Color {
  const v = s.split(',').map(Number);
  return new THREE.Color(v[0], v[1], v[2]);
}

function ProceduralPlanet({ data }: { data: PlanetData }) {
  const meshRef = useRef<THREE.Mesh>(null);

  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uColor1: { value: parseColor(data.colors[0]) },
        uColor2: { value: parseColor(data.colors[1]) },
      },
      vertexShader: PLANET_VERT,
      fragmentShader: planetFrag(data),
    });
  }, [data]);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y += data.rotSpeed;
    material.uniforms.uTime.value = clock.getElapsedTime();
  });

  return (
    <mesh
      ref={meshRef}
      position={data.pos}
      rotation={[0, 0, data.axialTilt]}
      material={material}
    >
      <sphereGeometry args={[data.radius, 64, 64]} />
    </mesh>
  );
}

/* ═══════════════════════════════════════════════════════
   Atmosphere Glow — Fresnel additive backside sphere
   ═══════════════════════════════════════════════════════ */
function AtmosphereGlow({ data }: { data: PlanetData }) {
  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uColor: { value: new THREE.Color(...data.atmoColor) },
        uIntensity: { value: data.atmoIntensity },
      },
      vertexShader: ATMO_VERT,
      fragmentShader: ATMO_FRAG,
      transparent: true,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
  }, [data]);

  return (
    <mesh position={data.pos} material={material}>
      <sphereGeometry args={[data.radius * 1.15, 32, 32]} />
    </mesh>
  );
}

/* ═══════════════════════════════════════════════════════
   Saturn Rings
   ═══════════════════════════════════════════════════════ */
function SaturnRings({ data }: { data: PlanetData }) {
  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      vertexShader: RING_VERT,
      fragmentShader: RING_FRAG,
      transparent: true,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
  }, []);

  return (
    <mesh
      position={data.pos}
      rotation={[-Math.PI * 0.42, 0, data.axialTilt]}
      material={material}
    >
      <ringGeometry args={[data.radius * 1.4, data.radius * 2.3, 128]} />
    </mesh>
  );
}

/* ═══════════════════════════════════════════════════════
   Starfield — spread across the entire camera path
   ═══════════════════════════════════════════════════════ */
function Starfield() {
  const ref = useRef<THREE.Points>(null);
  const isMobile = typeof navigator !== 'undefined' && /Mobi|Android/i.test(navigator.userAgent);
  const count = isMobile ? 3000 : 8000;

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 200;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 200;
      arr[i * 3 + 2] = 30 + Math.random() * -400;
    }
    return arr;
  }, [count]);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.y = clock.getElapsedTime() * 0.002;
    ref.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.003) * 0.01;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#c8d8f8"
        size={0.12}
        sizeAttenuation
        transparent
        opacity={0.85}
        depthWrite={false}
      />
    </points>
  );
}

/* ═══════════════════════════════════════════════════════
   Main Scene — composes all 3D elements
   ═══════════════════════════════════════════════════════ */
export function SolarSystemScene({
  cameraTarget,
}: {
  cameraTarget: React.RefObject<CameraTarget>;
}) {
  return (
    <>
      {/* Lighting — sun as warm point light */}
      <pointLight position={[20, 10, 20]} intensity={2.0} color="#fff0dd" distance={500} />
      <ambientLight intensity={0.6} color="#141428" />
      <fog attach="fog" args={[0x07080f, 1, 350]} />

      <CameraController target={cameraTarget} />
      <Starfield />

      {PLANETS.map((p) => (
        <group key={p.name}>
          <ProceduralPlanet data={p} />
          <AtmosphereGlow data={p} />
          {p.hasRings && <SaturnRings data={p} />}
        </group>
      ))}
    </>
  );
}
