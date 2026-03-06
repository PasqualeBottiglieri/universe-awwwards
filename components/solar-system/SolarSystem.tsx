'use client';

import { useEffect, useRef, useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown } from 'lucide-react';
import { PLANETS, getCameraPosition } from '@/lib/solar-system-data';
import { SolarSystemScene } from './Scene';

/* ═══════════════════════════════════════════════════════
   SolarSystem — Full scroll-driven 3D solar system experience.
   Integrates into the Next.js site as a pinned section.
   ═══════════════════════════════════════════════════════ */

type CameraTarget = {
  px: number; py: number; pz: number;
  lx: number; ly: number; lz: number;
};

export function SolarSystem() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cameraTarget = useRef<CameraTarget>({ px: 0, py: 0, pz: 8, lx: 0, ly: 0, lz: -30 });
  const [activePanel, setActivePanel] = useState(-1);
  const [showTitle, setShowTitle] = useState(true);
  const [showOutro, setShowOutro] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    /* ── Build camera timeline ── */
    const tl = gsap.timeline();
    const ct = cameraTarget.current!;

    /* Intro dwell */
    tl.to(ct, { px: 0, py: 0, pz: 8, duration: 0.5 });

    /* Fly to each planet */
    PLANETS.forEach((p) => {
      const [cx, cy, cz] = getCameraPosition(p);
      tl.to(ct, { px: cx, py: cy, pz: cz, duration: 1.5, ease: 'power1.inOut' });
      tl.to(ct, { lx: p.pos[0], ly: p.pos[1], lz: p.pos[2], duration: 1.5, ease: 'power1.inOut' }, '<');
      tl.to({}, { duration: 0.8 }); /* dwell */
    });

    /* Outro drift */
    tl.to(ct, { pz: -360, duration: 1.5, ease: 'power1.in' });
    tl.to(ct, { lz: -380, duration: 1.5, ease: 'power1.in' }, '<');

    const totalDur = tl.totalDuration();
    const introFrac = 0.5 / totalDur;
    const outroFrac = 1.5 / totalDur;
    const planetZone = (1 - introFrac - outroFrac) / PLANETS.length;

    /* ── ScrollTrigger: pin canvas + scrub timeline ── */
    const st = ScrollTrigger.create({
      animation: tl,
      trigger: sectionRef.current,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1.5,
      pin: '.solar-canvas-wrap',
      pinSpacing: false,
      onUpdate: (self) => {
        const progress = self.progress;
        setScrollProgress(progress);

        /* Title / Outro */
        setShowTitle(progress < 0.04);
        setShowOutro(progress > 0.95);

        /* Active planet panel */
        let newActive = -1;
        for (let i = 0; i < PLANETS.length; i++) {
          const start = introFrac + i * planetZone + planetZone * 0.25;
          const end = introFrac + (i + 1) * planetZone - planetZone * 0.1;
          if (progress >= start && progress <= end) { newActive = i; break; }
        }
        setActivePanel(newActive);
      },
    });

    return () => {
      st.kill();
      tl.kill();
    };
  }, []);

  return (
    <section
      id="pianeti"
      ref={sectionRef}
      className="relative"
      style={{ minHeight: `${(PLANETS.length + 2) * 110}vh` }}
      aria-label="Viaggio nel Sistema Solare"
    >
      {/* ── Pinned Canvas + UI ── */}
      <div className="solar-canvas-wrap relative h-screen w-full">
        {/* R3F Canvas */}
        <div className="absolute inset-0 z-0">
          <Suspense fallback={null}>
            <Canvas
              camera={{ position: [0, 0, 8], fov: 50, near: 0.1, far: 1000 }}
              dpr={[1, 1.5]}
              gl={{ antialias: true }}
            >
              <SolarSystemScene cameraTarget={cameraTarget} />
            </Canvas>
          </Suspense>
        </div>

        {/* ── Title Screen ── */}
        <AnimatePresence>
          {showTitle && (
            <motion.div
              key="solar-title"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none"
            >
              <h1 className="font-display text-fluid-hero leading-[0.88] text-center text-white"
                  style={{ textShadow: '0 0 60px rgba(34,211,238,.2)' }}>
                THE <span className="neon-text text-cyan-glow">COSMOS</span>
              </h1>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute bottom-[8%] flex flex-col items-center gap-2"
              >
                <span className="text-[0.6rem] uppercase tracking-[0.35em] text-zinc-600 font-mono">
                  Scroll per iniziare
                </span>
                <ChevronDown className="h-4 w-4 text-zinc-600" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Outro Screen ── */}
        <AnimatePresence>
          {showOutro && (
            <motion.div
              key="solar-outro"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none"
            >
              <h2 className="font-display text-fluid-4xl text-center leading-tight">
                E oltre&hellip;<br />l&rsquo;infinito
              </h2>
              <p className="mt-4 text-fluid-sm text-zinc-500 italic">Il viaggio non finisce mai</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Planet Info Panels ── */}
        {PLANETS.map((planet, i) => (
          <div
            key={planet.name}
            className={`absolute bottom-[8%] left-[5%] z-20 max-w-[520px] transition-all duration-700 ease-out-expo sm:left-[6%] ${
              activePanel === i
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-10 pointer-events-none'
            }`}
          >
            {/* Eyebrow */}
            <p className="mb-3 font-mono text-[0.65rem] tracking-[0.3em] uppercase text-cyan-glow/70">
              {String(i + 1).padStart(2, '0')} / {String(PLANETS.length).padStart(2, '0')}
            </p>

            {/* Planet name */}
            <h2 className="font-display text-fluid-4xl leading-[0.92] text-gradient mb-2">
              {planet.name}
            </h2>

            {/* Description */}
            <p className="text-fluid-sm text-zinc-500 italic mb-5">{planet.desc}</p>

            {/* Data grid */}
            <div className="grid grid-cols-2 gap-x-6 gap-y-3">
              <DataItem label="Diametro (km)" value={planet.data.diameter} />
              <DataItem label="Distanza dal Sole" value={`${planet.data.distance} km`} />
              <DataItem label="Temperatura" value={planet.data.temp} />
              <DataItem label="Lune" value={planet.data.moons} />
            </div>
          </div>
        ))}

        {/* ── Progress Bar (right side) ── */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 z-20 flex flex-col items-center sm:right-8">
          {/* Track */}
          <div className="relative h-[25vh] w-[2px] overflow-hidden rounded-full bg-white/[0.06] sm:h-[40vh]">
            <div
              className="absolute left-0 top-0 w-full rounded-full bg-gradient-to-b from-cyan-glow to-nebula"
              style={{ height: `${scrollProgress * 100}%`, transition: 'height 0.3s' }}
            />
          </div>
          {/* Planet dots */}
          <div className="mt-2 flex flex-col items-center gap-[3px]">
            {PLANETS.map((p, i) => {
              const isActive = activePanel === i;
              return (
                <div
                  key={p.name}
                  className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ${
                    isActive
                      ? 'bg-cyan-glow scale-[2] shadow-[0_0_8px_var(--color-cyan)]'
                      : 'bg-white/15'
                  }`}
                  title={p.name}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Reusable data item for planet panels ── */
function DataItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="font-mono text-[0.6rem] tracking-[0.2em] uppercase text-white/30 mb-0.5">
        {label}
      </p>
      <p className="font-mono text-fluid-base font-bold text-cyan-glow">
        {value}
      </p>
    </div>
  );
}
