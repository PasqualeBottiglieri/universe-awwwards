'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Creative preloader — shows while 3D assets and fonts load.
 * Fades out with a cinematic wipe once the page is ready.
 */
export function Preloader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    /* Wait for fonts + a minimum display time for branding feel */
    const minDelay = new Promise((r) => setTimeout(r, 1800));
    const fontsReady = document.fonts?.ready ?? Promise.resolve();

    Promise.all([minDelay, fontsReady]).then(() => setIsLoading(false));
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="preloader"
          className="preloader"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex flex-col items-center gap-8">
            {/* Animated orbit ring */}
            <div className="relative h-16 w-16">
              <div className="absolute inset-0 rounded-full border border-white/5" />
              <div className="absolute inset-0 animate-[spin-slow_1.5s_linear_infinite] rounded-full border-t-2 border-cyan-glow" />
              <div className="absolute inset-2 animate-[spin-slow_2.5s_linear_infinite_reverse] rounded-full border-t border-nebula-light/60" />
              {/* Center dot */}
              <div className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-glow shadow-neon" />
            </div>

            <p className="font-display text-fluid-sm tracking-[0.3em] text-white/50">
              THE COSMOS
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
