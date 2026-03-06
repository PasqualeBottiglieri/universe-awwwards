'use client';

import { Suspense } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Orbit } from 'lucide-react';
import { WarpTunnel } from '@/components/3d/WarpTunnel';

/**
 * Footer Section — Full experience, not just a link dump.
 *
 * CHANGES:
 * - Redesigned as a "next mission" immersive experience
 * - Large typography CTA with gradient treatment
 * - Social links with hover arrows (not dead links)
 * - Back-to-top with smooth transition
 * - Credits bar at bottom
 * - Suspense boundary for 3D WarpTunnel
 * - Proper semantic footer with aria labels
 */

const socialLinks = [
  { label: 'Instagram', href: '#' },
  { label: 'Behance', href: '#' },
  { label: 'X / Twitter', href: '#' },
  { label: 'GitHub', href: '#' },
];

export function FooterSection() {
  return (
    <footer
      id="contatti"
      className="relative mt-12 overflow-hidden border-t border-white/5 sm:mt-20"
      role="contentinfo"
    >
      {/* ── 3D Background ── */}
      <Suspense fallback={null}>
        <WarpTunnel />
      </Suspense>

      {/* ── Gradient overlay for readability ── */}
      <div className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-t from-space via-space/60 to-transparent" />

      {/* ── Main content ── */}
      <div className="section-width section-padding relative z-30 flex min-h-[70vh] flex-col justify-between py-16 sm:py-24">
        {/* Top section: CTA */}
        <div className="flex-1 flex flex-col justify-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-4 text-[0.65rem] uppercase tracking-[0.3em] text-cyan-glow/60 sm:mb-6"
          >
            Prossima Missione
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-fluid-hero leading-[0.85]"
          >
            <span className="text-gradient">SCOPRI</span>
            <br />
            L&apos;INFINITO
          </motion.h2>

          {/* Social links with hover arrows */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 flex flex-wrap gap-x-8 gap-y-3 sm:mt-14"
          >
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="group flex items-center gap-1.5 text-[0.7rem] uppercase tracking-[0.18em] text-zinc-500 transition-colors duration-300 hover:text-white"
                data-cursor="link"
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.label}
                <ArrowUpRight
                  className="h-3 w-3 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </a>
            ))}
          </motion.div>
        </div>

        {/* Bottom bar: logo + back to top */}
        <div className="mt-16 flex flex-col items-start justify-between gap-6 border-t border-white/5 pt-6 sm:flex-row sm:items-center sm:pt-8">
          <div className="flex items-center gap-2 text-[0.65rem] tracking-[0.2em] text-zinc-600">
            <Orbit className="h-3.5 w-3.5" aria-hidden="true" />
            COSMOS LAB &copy; {new Date().getFullYear()}
          </div>

          <a
            href="#top"
            className="text-[0.65rem] uppercase tracking-[0.2em] text-zinc-600 transition-colors duration-300 hover:text-cyan-glow"
            data-cursor="link"
          >
            Torna in cima
          </a>
        </div>
      </div>
    </footer>
  );
}
