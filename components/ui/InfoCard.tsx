'use client';

import { motion } from 'framer-motion';

/**
 * InfoCard — Data metric card with animated gradient border.
 *
 * CHANGES:
 * - Added animated-border class for subtle gradient border effect
 * - Better metric typography (larger, gradient color)
 * - Improved spacing rhythm with 8px grid
 * - Hover lift effect via glass-card CSS
 * - Better text hierarchy with muted description
 */

type InfoCardProps = {
  title: string;
  description: string;
  metric: string;
};

export function InfoCard({ title, description, metric }: InfoCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      className="glass-card animated-border h-full rounded-2xl p-6 sm:p-7"
    >
      {/* Metric — large, gradient text */}
      <p className="text-gradient mb-1 font-display text-fluid-2xl font-bold">
        {metric}
      </p>

      {/* Title */}
      <h3 className="mb-3 text-fluid-base font-semibold text-white">
        {title}
      </h3>

      {/* Description */}
      <p className="text-fluid-xs leading-relaxed text-zinc-400">
        {description}
      </p>
    </motion.article>
  );
}
