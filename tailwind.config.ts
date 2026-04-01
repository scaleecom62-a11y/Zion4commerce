import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      sm:   '640px',
      md:   '768px',
      lg:   '1024px',
      xl:   '1280px',
      '2xl': '1536px',
      '3xl': '1920px',
    },
    extend: {
      colors: {
        // Zion4Commerce Brand Palette
        zion: {
          navy:    '#0D1B2A',   // Deep ink – primary text, hero bg
          blue:    '#003E78',   // Deep blue – headings, buttons
          aqua:    '#2BA6DA',   // Aqua – accents, links
          green:   '#1EC28B',   // Green – CTAs, success
          teal:    '#0F7B6C',   // Teal – secondary accent
          cream:   '#F7F4EF',   // Warm off-white – section bg
          slate:   '#1A1A2E',   // Slate – footer
          muted:   '#8C9BAB',   // Muted – body text
          border:  '#E4EBF0',   // Border
          light:   '#F0F5F9',   // Light bg
        },
      },
      fontFamily: {
        // Trirong for display / headings
        trirong: ['var(--font-trirong)', 'Georgia', 'serif'],
        // DM Sans for UI labels / nav
        dm:      ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
        // Sora for body copy
        sora:    ['var(--font-sora)', 'system-ui', 'sans-serif'],
        // Mono
        mono:    ['var(--font-jetbrains-mono)', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '1rem' }],
        display: ['clamp(3.5rem, 6vw, 5.5rem)', { lineHeight: '1.05', letterSpacing: '-0.04em' }],
        hero:    ['clamp(2.75rem, 5vw, 4.5rem)',  { lineHeight: '1.08', letterSpacing: '-0.03em' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
        '34': '8.5rem',
      },
      maxWidth: {
        '8xl': '90rem',
        '9xl': '100rem',
      },
      animation: {
        'fade-up':       'fadeUp 0.7s ease forwards',
        'fade-in':       'fadeIn 0.5s ease forwards',
        'float':         'float 6s ease-in-out infinite',
        'pulse-slow':    'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'marquee':       'marquee 30s linear infinite',
        'marquee-rev':   'marqueeReverse 30s linear infinite',
        'draw-line':     'drawLine 1s ease forwards',
        'count-up':      'fadeUp 0.5s ease forwards',
      },
      keyframes: {
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-12px)' },
        },
        marquee: {
          '0%':   { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        marqueeReverse: {
          '0%':   { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        drawLine: {
          '0%':   { strokeDashoffset: '1000' },
          '100%': { strokeDashoffset: '0' },
        },
      },
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
      },
      transitionTimingFunction: {
        'expo': 'cubic-bezier(0.19, 1, 0.22, 1)',
      },
      backgroundImage: {
        'noise': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E\")",
        'grid-dark': "url(\"data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M 60 0 L 0 0 0 60' fill='none' stroke='%23ffffff08' stroke-width='1'/%3E%3C/svg%3E\")",
        'grid-light': "url(\"data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M 60 0 L 0 0 0 60' fill='none' stroke='%2300000008' stroke-width='1'/%3E%3C/svg%3E\")",
      },
      boxShadow: {
        'glow':        '0 0 40px rgba(43, 166, 218, 0.2)',
        'glow-green':  '0 0 40px rgba(30, 194, 139, 0.2)',
        'card':        '0 2px 12px rgba(13, 27, 42, 0.08), 0 1px 3px rgba(13, 27, 42, 0.06)',
        'card-hover':  '0 12px 40px rgba(13, 27, 42, 0.14), 0 4px 12px rgba(13, 27, 42, 0.08)',
        'section':     '0 40px 80px rgba(13, 27, 42, 0.08)',
      },
    },
  },
  plugins: [],
};

export default config;
