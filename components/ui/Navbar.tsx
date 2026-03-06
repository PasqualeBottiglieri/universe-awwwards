'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Telescope, Orbit } from 'lucide-react';

/* ── Links map to actual section IDs ── */
const links = [
  { label: 'Missione', href: '#top' },
  { label: 'Pianeti', href: '#pianeti' },
  { label: 'Misteri', href: '#misteri' },
  { label: 'Contatti', href: '#contatti' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  /* ── Scroll awareness: darken nav after 80px ── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ── Lock body scroll when mobile menu open ── */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.9, ease: [0.16, 1, 0.3, 1] }}
        className="fixed left-0 top-0 z-50 w-full"
        role="banner"
      >
        <nav
          className={`mx-auto mt-3 flex w-[94%] max-w-7xl items-center justify-between rounded-full px-5 py-2.5 transition-all duration-600 ease-out-expo sm:mt-4 sm:px-6 sm:py-3 ${
            scrolled
              ? 'border border-white/10 bg-space-50/80 shadow-glass backdrop-blur-2xl'
              : 'border border-transparent bg-transparent'
          }`}
          aria-label="Navigazione principale"
        >
          {/* ── Logo ── */}
          <a
            href="#top"
            className="flex items-center gap-2 text-fluid-xs font-semibold tracking-[0.22em] text-cyan-soft transition-colors duration-300 hover:text-white"
            data-cursor="link"
          >
            <Orbit className="h-4 w-4" aria-hidden="true" />
            COSMOS LAB
          </a>

          {/* ── Desktop links ── */}
          <ul className="hidden items-center gap-7 text-[0.7rem] uppercase tracking-[0.2em] text-zinc-400 md:flex">
            {links.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="relative py-1 transition-colors duration-300 hover:text-white"
                  data-cursor="link"
                >
                  {item.label}
                  {/* Underline hover effect */}
                  <span className="absolute bottom-0 left-0 h-px w-0 bg-gradient-to-r from-cyan-glow to-nebula transition-all duration-400 ease-out-expo group-hover:w-full" />
                </a>
              </li>
            ))}
          </ul>

          {/* ── Desktop CTA ── */}
          <a
            href="#misteri"
            className="hidden items-center gap-2 rounded-full border border-cyan-glow/20 bg-cyan-glow/8 px-4 py-2 text-[0.7rem] uppercase tracking-[0.14em] text-cyan-soft transition-all duration-400 ease-out-expo hover:border-cyan-glow/40 hover:bg-cyan-glow/15 hover:shadow-neon md:flex"
            data-cursor="link"
          >
            <Telescope className="h-3.5 w-3.5" aria-hidden="true" />
            Esplora
          </a>

          {/* ── Mobile hamburger ── */}
          <button
            className="relative z-50 flex h-10 w-10 items-center justify-center md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Chiudi menu' : 'Apri menu'}
            aria-expanded={mobileOpen}
            data-cursor="link"
          >
            <div className="flex w-5 flex-col gap-1.5">
              <span
                className={`h-px w-full bg-white transition-all duration-400 ease-out-expo ${
                  mobileOpen ? 'translate-y-[3.5px] rotate-45' : ''
                }`}
              />
              <span
                className={`h-px w-full bg-white transition-all duration-400 ease-out-expo ${
                  mobileOpen ? '-translate-y-[3.5px] -rotate-45' : ''
                }`}
              />
            </div>
          </button>
        </nav>
      </motion.header>

      {/* ── Mobile fullscreen menu ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-space/95 backdrop-blur-2xl md:hidden"
          >
            <nav className="flex flex-col items-center gap-8" aria-label="Menu mobile">
              {links.map((item, i) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className="font-display text-fluid-3xl tracking-wide text-white transition-colors hover:text-cyan-glow"
                  onClick={() => setMobileOpen(false)}
                  data-cursor="link"
                >
                  {item.label}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
