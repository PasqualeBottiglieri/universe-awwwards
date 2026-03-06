import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      /* ── Expanded Color System ── */
      colors: {
        space: {
          DEFAULT: '#050710',
          50: '#0a0e1a',
          100: '#0d1224',
          200: '#111830',
          300: '#1a2242',
        },
        nebula: {
          DEFAULT: '#7c3aed',
          light: '#a78bfa',
          dark: '#5b21b6',
          glow: 'rgba(124, 58, 237, 0.35)',
        },
        cyan: {
          glow: '#22d3ee',
          soft: '#67e8f9',
          muted: '#155e75',
        },
        solar: {
          DEFAULT: '#facc15',
          warm: '#fbbf24',
          dim: '#a16207',
        },
      },

      /* ── Shadow System ── */
      boxShadow: {
        glass: '0 8px 32px 0 rgba(31, 38, 135, 0.25)',
        neon: '0 0 15px rgba(34, 211, 238, 0.4), 0 0 30px rgba(124, 58, 237, 0.25)',
        'neon-strong': '0 0 20px rgba(34, 211, 238, 0.6), 0 0 50px rgba(124, 58, 237, 0.4)',
        'card-hover': '0 16px 48px rgba(31, 38, 135, 0.35), 0 0 24px rgba(34, 211, 238, 0.12)',
      },

      /* ── Background Gradients ── */
      backgroundImage: {
        'radial-stars':
          'radial-gradient(ellipse at 20% 0%, rgba(124,58,237,0.18), transparent 50%), radial-gradient(ellipse at 80% 10%, rgba(34,211,238,0.1), transparent 45%), linear-gradient(180deg, #030408 0%, #050710 50%, #080a16 100%)',
        'section-glow':
          'radial-gradient(ellipse at center, rgba(124,58,237,0.08) 0%, transparent 70%)',
      },

      /* ── Typography ── */
      fontFamily: {
        sans: ['var(--font-space-grotesk)', 'system-ui', 'sans-serif'],
        display: ['var(--font-cinzel)', 'Georgia', 'serif'],
      },
      fontSize: {
        /* Fluid type scale using clamp() */
        'fluid-xs': 'clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem)',
        'fluid-sm': 'clamp(0.875rem, 0.8rem + 0.35vw, 1rem)',
        'fluid-base': 'clamp(1rem, 0.9rem + 0.5vw, 1.125rem)',
        'fluid-lg': 'clamp(1.125rem, 1rem + 0.6vw, 1.375rem)',
        'fluid-xl': 'clamp(1.25rem, 1rem + 1.2vw, 1.75rem)',
        'fluid-2xl': 'clamp(1.5rem, 1rem + 2vw, 2.5rem)',
        'fluid-3xl': 'clamp(2rem, 1.2rem + 3.5vw, 3.5rem)',
        'fluid-4xl': 'clamp(2.5rem, 1rem + 5vw, 5rem)',
        'fluid-hero': 'clamp(3rem, 1rem + 10vw, 12rem)',
      },

      /* ── Spacing (8px grid) ── */
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
        '34': '8.5rem',
      },

      /* ── Animation Timing ── */
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'out-quint': 'cubic-bezier(0.22, 1, 0.36, 1)',
      },

      /* ── Keyframe Animations ── */
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '1' },
        },
        'spin-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in': 'fade-in 0.6s ease forwards',
        'scale-in': 'scale-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        shimmer: 'shimmer 3s linear infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        'spin-slow': 'spin-slow 20s linear infinite',
      },

      /* ── Border Radius ── */
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
    },
  },
  plugins: [],
};

export default config;
