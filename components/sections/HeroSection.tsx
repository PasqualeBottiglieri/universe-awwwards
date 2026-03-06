'use client';

import { useRef, Suspense } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { HeroScene } from '@/components/3d/HeroScene';

/**
 * Hero Section — Cinematic entrance with staggered text reveal,
 * 3D planet backdrop, and animated scroll indicator.
 *
 * CHANGES:
 * - Added Suspense boundary for 3D scene (prevents blank flash)
 * - Staggered entrance animation with delay cascade
 * - Added top label for context before the big title
 * - Scroll CTA with pulsing chevron
 * - Better responsive typography with clamp()
 * - Gradient overlay refined for depth
 */

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 2.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 50, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1] },
  },
};

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      {/* ── 3D Background with Suspense fallback ── */}
      <Suspense fallback={null}>
        <HeroScene />
      </Suspense>

      {/* ── Gradient overlays for depth and readability ── */}
      <div
        className="pointer-events-none absolute inset-0 z-20"
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-space/40 via-transparent to-space" />
        <div className="absolute inset-0 bg-gradient-to-r from-space/30 via-transparent to-space/30" />
        {/* Radial vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(5,7,16,0.7)_100%)]" />
      </div>

      {/* ── Content ── */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-30 mx-auto w-[92%] max-w-6xl text-center"
      >
        {/* Eyebrow label */}
        <motion.p
          variants={itemVariants}
          className="mb-6 text-[0.65rem] uppercase tracking-[0.35em] text-cyan-glow/70 sm:text-fluid-xs"
        >
          Un viaggio oltre i confini del visibile
        </motion.p>

        {/* Main title */}
        <motion.h1
          variants={itemVariants}
          className="font-display text-fluid-hero leading-[0.88] tracking-tight text-white"
        >
          THE{' '}
          <span className="neon-text text-cyan-glow">COSMOS</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          className="mx-auto mt-6 max-w-xl text-fluid-sm leading-relaxed text-zinc-400 sm:mt-8 sm:max-w-2xl sm:text-fluid-base"
        >
          Dove gravità, luce e materia riscrivono la nostra idea di infinito.
          <br className="hidden sm:block" />
          Esplora pianeti, buchi neri e i misteri della cosmologia moderna.
        </motion.p>

        {/* CTA button */}
        <motion.div variants={itemVariants} className="mt-10 sm:mt-14">
          <a
            href="#pianeti"
            className="group inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-7 py-3 text-fluid-xs font-medium uppercase tracking-[0.18em] text-white/80 backdrop-blur-sm transition-all duration-400 ease-out-expo hover:border-cyan-glow/30 hover:bg-cyan-glow/10 hover:text-white hover:shadow-neon"
            data-cursor="link"
          >
            Inizia il Viaggio
            <ChevronDown className="h-4 w-4 transition-transform duration-400 group-hover:translate-y-0.5" aria-hidden="true" />
          </a>
        </motion.div>
      </motion.div>

      {/* ── Scroll indicator at bottom ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 z-30 -translate-x-1/2"
        aria-hidden="true"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-[0.6rem] uppercase tracking-[0.3em] text-zinc-600">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown className="h-4 w-4 text-zinc-600" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
