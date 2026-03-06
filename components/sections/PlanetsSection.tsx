'use client';

import { useEffect, useRef, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Planet } from '@/components/3d/Planet';

/**
 * Planets Section — Scroll-driven 3D showcase with pinned canvas.
 *
 * CHANGES:
 * - FIXED: Removed className on R3F <group> (was causing build error).
 *   R3F elements are NOT DOM nodes — you can't target them with CSS selectors.
 * - Simplified to one visible planet that rotates, with text cards scrolling over.
 * - GSAP ScrollTrigger only animates DOM elements (the cards), not R3F groups.
 * - Added numbered labels and better card design with animated borders.
 * - Better responsive layout with alternating card positions.
 * - Used distinct texture images to differentiate planets visually.
 */

const MARS_TEXTURE = 'https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?q=80&w=1200';
const JUPITER_TEXTURE = 'https://images.unsplash.com/photo-1545156521-77bd85671d30?q=80&w=1200';
const SATURN_TEXTURE = 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=1200';

const planets = [
  {
    name: 'Mars',
    num: '01',
    title: 'Marte',
    subtitle: 'Il laboratorio geologico del Sistema Solare',
    text: 'Valli immense, tempeste di polvere globali e tracce minerali indicano che Marte ha ospitato acqua liquida. Oggi è la frontiera per la ricerca di biosignature e habitat umani.',
    texture: MARS_TEXTURE,
    radius: 1.2,
    position: [-1.2, 0.2, 0] as [number, number, number],
  },
  {
    name: 'Jupiter',
    num: '02',
    title: 'Giove',
    subtitle: 'Il gigante che protegge e plasma orbite',
    text: 'Con la sua massa dominante, Giove devia asteroidi e influenza la dinamica dei pianeti interni. Le sue bande atmosferiche sono un atlante vivente di fluidodinamica estrema.',
    texture: JUPITER_TEXTURE,
    radius: 1.6,
    position: [1.0, -0.1, -0.8] as [number, number, number],
  },
  {
    name: 'Saturn',
    num: '03',
    title: 'Saturno',
    subtitle: 'Eleganza gravitazionale in anelli di ghiaccio',
    text: "Gli anelli di Saturno, composti da miliardi di frammenti, mostrano fenomeni di risonanza e auto-organizzazione che aiutano a comprendere l'origine dei dischi planetari.",
    texture: SATURN_TEXTURE,
    radius: 1.35,
    position: [-0.6, 0.0, 0.3] as [number, number, number],
  },
];

export function PlanetsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      /* Animate only DOM cards (not R3F groups) */
      const cards = gsap.utils.toArray<HTMLElement>('.planet-step');

      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 60, scale: 0.97 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top center+=100',
              end: 'center center',
              scrub: 1,
            },
          }
        );
      });

      /* Pin the canvas while scrolling through cards */
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom bottom',
        pin: '.planet-canvas-wrap',
        pinSpacing: false,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="pianeti"
      ref={sectionRef}
      className="relative min-h-[300vh]"
      aria-label="Esplorazione planetaria"
    >
      {/* ── Pinned 3D Canvas ── */}
      <div className="planet-canvas-wrap sticky top-0 h-screen w-full">
        {/* Dark overlay for text readability */}
        <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-b from-space via-space/50 to-space" />

        <Suspense fallback={null}>
          <Canvas camera={{ position: [0, 0, 5], fov: 50 }} className="!absolute inset-0 z-10">
            <ambientLight intensity={0.6} />
            <pointLight position={[4, 3, 4]} intensity={1.2} color="#e8e0ff" />
            <pointLight position={[-3, -1, 2]} intensity={0.4} color="#22d3ee" />

            {planets.map((p) => (
              <Planet
                key={p.name}
                textureUrl={p.texture}
                radius={p.radius}
                position={p.position}
                speed={0.5}
              />
            ))}
          </Canvas>
        </Suspense>
      </div>

      {/* ── Scrolling Text Cards (DOM elements — safe for GSAP) ── */}
      <div className="relative z-30 mx-auto flex w-[92%] max-w-5xl flex-col gap-[35vh] py-24 sm:gap-[40vh]">
        {planets.map((planet, idx) => (
          <motion.article
            key={planet.name}
            className={`planet-step glass-card animated-border max-w-lg rounded-3xl p-7 sm:p-9 ${
              idx % 2 !== 0 ? 'ml-auto' : ''
            }`}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false, amount: 0.3 }}
          >
            {/* Number badge */}
            <div className="mb-5 flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-cyan-glow/20 bg-cyan-glow/8 text-[0.65rem] font-semibold text-cyan-glow">
                {planet.num}
              </span>
              <span className="text-[0.65rem] uppercase tracking-[0.25em] text-zinc-500">
                Orbital Chronicle
              </span>
            </div>

            <h3 className="font-display text-fluid-3xl leading-tight text-white">
              {planet.title}
            </h3>
            <p className="mt-1 text-fluid-xs font-medium text-cyan-glow/60">
              {planet.subtitle}
            </p>
            <p className="mt-4 text-fluid-sm leading-relaxed text-zinc-300">
              {planet.text}
            </p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
