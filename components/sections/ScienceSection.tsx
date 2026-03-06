'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { InfoCard } from '@/components/ui/InfoCard';

/**
 * Science Section — Bento grid layout with staggered reveals.
 *
 * CHANGES:
 * - Redesigned as asymmetric bento grid for visual variety
 * - Added GSAP-driven staggered reveal on scroll
 * - Split title with gradient accent word
 * - Added more data cards for richer content
 * - Better image treatment with hover parallax hint
 * - Properly lazy-loaded image with aspect-ratio
 */

const BLACK_HOLE = 'https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?q=80&w=1400';

export function ScienceSection() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>('.bento-item');
      items.forEach((item, i) => {
        gsap.fromTo(
          item,
          { opacity: 0, y: 40, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: item,
              start: 'top bottom-=80',
              toggleActions: 'play none none reverse',
            },
            delay: i * 0.1,
          }
        );
      });
    }, gridRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="misteri"
      className="relative z-20 py-24 sm:py-32"
      aria-label="Misteri cosmici e scienza"
    >
      {/* ── Ambient glow behind section ── */}
      <div
        className="pointer-events-none absolute inset-0 bg-section-glow"
        aria-hidden="true"
      />

      <div className="section-width section-padding relative">
        {/* ── Section header ── */}
        <div className="mb-16 max-w-3xl sm:mb-20">
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-4 text-[0.65rem] uppercase tracking-[0.3em] text-cyan-glow/70"
          >
            Scienza &amp; Dati
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-fluid-4xl leading-[0.92]"
          >
            Misteri Cosmici,{' '}
            <span className="text-gradient">evidenze reali</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-5 max-w-2xl text-fluid-sm leading-relaxed text-zinc-400"
          >
            La cosmologia moderna combina osservazione multi-spettrale, simulazioni
            numeriche e modelli relativistici per descrivere ciò che ancora non
            vediamo direttamente.
          </motion.p>
        </div>

        {/* ── Bento Grid ── */}
        <div ref={gridRef} className="grid gap-4 sm:gap-5 md:grid-cols-3 md:grid-rows-2">
          {/* Large featured image card (2 cols, 2 rows) */}
          <div className="bento-item glass-card group relative overflow-hidden rounded-2xl md:col-span-2 md:row-span-2">
            <div className="aspect-[4/3] md:aspect-auto md:h-full">
              <Image
                src={BLACK_HOLE}
                alt="Rappresentazione artistica di un buco nero supermassiccio"
                width={1400}
                height={900}
                className="h-full w-full object-cover opacity-55 transition-transform duration-800 ease-out-expo group-hover:scale-[1.03]"
                loading="lazy"
                sizes="(max-width: 768px) 92vw, 60vw"
              />
            </div>
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-space via-space/40 to-transparent" />
            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 md:p-10">
              <span className="mb-3 inline-block text-[0.6rem] uppercase tracking-[0.3em] text-cyan-glow/60">
                Fenomeno
              </span>
              <h3 className="font-display text-fluid-3xl leading-tight">
                Buchi Neri Supermassicci
              </h3>
              <p className="mt-3 max-w-xl text-fluid-sm leading-relaxed text-zinc-300">
                Oggetti da milioni a miliardi di masse solari. La loro crescita
                regola la formazione galattica e genera getti relativistici
                osservabili a distanze cosmologiche.
              </p>
            </div>
          </div>

          {/* Data cards (right column) */}
          <div className="bento-item">
            <InfoCard
              metric="~27%"
              title="Materia Oscura"
              description="La sua presenza è inferita dalla dinamica delle galassie e dal lensing gravitazionale: agisce gravitazionalmente ma non emette radiazione."
            />
          </div>
          <div className="bento-item">
            <InfoCard
              metric="~68%"
              title="Energia Oscura"
              description="Componente responsabile dell'espansione accelerata dell'universo. Una delle questioni aperte più profonde della fisica contemporanea."
            />
          </div>
        </div>

        {/* ── Bottom row: additional data points ── */}
        <div ref={gridRef} className="mt-4 grid gap-4 sm:mt-5 sm:gap-5 md:grid-cols-3">
          <div className="bento-item">
            <InfoCard
              metric="13.8 Mld"
              title="Età dell'Universo"
              description="Determinata dalla radiazione cosmica di fondo e dai modelli di espansione. Ogni fotone racconta la storia dell'inizio."
            />
          </div>
          <div className="bento-item">
            <InfoCard
              metric="~2T"
              title="Galassie Osservabili"
              description="Il telescopio spaziale ha rivelato un universo molto più denso e strutturato di quanto previsto dai modelli precedenti."
            />
          </div>
          <div className="bento-item">
            <InfoCard
              metric="~5%"
              title="Materia Ordinaria"
              description="Tutto ciò che vediamo — stelle, pianeti, esseri viventi — rappresenta solo una piccola frazione della composizione totale dell'universo."
            />
          </div>
        </div>
      </div>
    </section>
  );
}
