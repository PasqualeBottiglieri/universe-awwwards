'use client';

import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * Lenis smooth scroll — integrated with GSAP ScrollTrigger.
 *
 * CHANGES:
 * - Connected Lenis to GSAP ticker for synchronized scroll
 * - Prevents double-init with singleton pattern
 * - Added ScrollTrigger.update() on Lenis scroll for perfect sync
 */

let lenis: Lenis | null = null;

export function initLenis() {
  if (typeof window === 'undefined' || lenis) return lenis;

  gsap.registerPlugin(ScrollTrigger);

  lenis = new Lenis({
    duration: 1.2,
    smoothWheel: true,
  });

  /* Sync Lenis scroll position with GSAP ScrollTrigger */
  lenis.on('scroll', ScrollTrigger.update);

  /* Drive Lenis from GSAP ticker for frame-perfect sync */
  gsap.ticker.add((time) => {
    lenis?.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  return lenis;
}

export function getLenis() {
  return lenis;
}
