'use client';

import { useEffect } from 'react';
import { initLenis } from '@/lib/lenis';

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    initLenis();
  }, []);

  return <>{children}</>;
}
