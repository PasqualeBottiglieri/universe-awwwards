import type { Metadata } from 'next';
import { Cinzel, Space_Grotesk } from 'next/font/google';
import './globals.css';
import { SmoothScrollProvider } from '@/components/ui/SmoothScrollProvider';
import { CustomCursor } from '@/components/ui/CustomCursor';
import { Preloader } from '@/components/ui/Preloader';
import { ScrollProgress } from '@/components/ui/ScrollProgress';

/* ── Font Loading: Space Grotesk (body) + Cinzel (display headings) ── */
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});
const cinzel = Cinzel({
  subsets: ['latin'],
  variable: '--font-cinzel',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'The Cosmos — Esperienza Interattiva sull\'Universo',
  description:
    'Un viaggio immersivo tra pianeti, misteri cosmici e scienza avanzata con WebGL, GSAP e motion design.',
  metadataBase: new URL('https://thecosmos.space'),
  icons: {
    icon: '/favicon.ico',
    apple: '/brand-logo.png',
  },
  openGraph: {
    title: 'The Cosmos — Esperienza Interattiva sull\'Universo',
    description: 'Esplora l\'universo con un\'esperienza WebGL immersiva.',
    type: 'website',
    images: ['/brand-logo.png'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it" className={`${spaceGrotesk.variable} ${cinzel.variable}`}>
      <body className="font-sans">
        <SmoothScrollProvider>
          {/* Accessibility: skip-to-content */}
          <a href="#contenuto-principale" className="skip-link">
            Vai al contenuto principale
          </a>

          <Preloader />
          <ScrollProgress />
          <CustomCursor />
          <div className="grain-overlay" aria-hidden="true" />
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
