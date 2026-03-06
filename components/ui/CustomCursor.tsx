'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

/**
 * Custom Cursor — Smooth lerp-based cursor with hover states.
 *
 * CHANGES:
 * - Smooth movement via requestAnimationFrame + lerp (not raw event)
 * - Hidden on touch devices via matchMedia check
 * - Magnetic effect: cursor grows & shifts color on interactive elements
 * - Proper cleanup of all event listeners
 * - Reduced from direct transform to lerp for buttery movement
 */

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export function CustomCursor() {
  const outerRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  const handleMove = useCallback((e: MouseEvent) => {
    mouse.current = { x: e.clientX, y: e.clientY };
  }, []);

  const handleOver = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement;
    setIsPointer(!!target.closest('a, button, [data-cursor="link"]'));
  }, []);

  useEffect(() => {
    /* Hide on touch devices */
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    if (isTouchDevice) {
      setIsTouch(true);
      return;
    }

    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseover', handleOver);

    let raf: number;
    const animate = () => {
      pos.current.x = lerp(pos.current.x, mouse.current.x, 0.15);
      pos.current.y = lerp(pos.current.y, mouse.current.y, 0.15);

      if (outerRef.current) {
        outerRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`;
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouse.current.x}px, ${mouse.current.y}px, 0)`;
      }

      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseover', handleOver);
    };
  }, [handleMove, handleOver]);

  if (isTouch) return null;

  return (
    <>
      {/* Outer ring (lerped, trails the mouse) */}
      <div
        ref={outerRef}
        className={`pointer-events-none fixed left-0 top-0 z-[70] -translate-x-1/2 -translate-y-1/2 rounded-full border transition-all duration-300 ease-out ${
          isPointer
            ? 'h-12 w-12 border-nebula/60 bg-nebula/10 shadow-neon'
            : 'h-6 w-6 border-cyan-glow/40 bg-transparent'
        }`}
        aria-hidden="true"
      />
      {/* Inner dot (instant, follows mouse exactly) */}
      <div
        ref={dotRef}
        className={`pointer-events-none fixed left-0 top-0 z-[71] -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-200 ${
          isPointer
            ? 'h-1 w-1 bg-nebula-light'
            : 'h-1.5 w-1.5 bg-cyan-glow/80'
        }`}
        aria-hidden="true"
      />
    </>
  );
}
