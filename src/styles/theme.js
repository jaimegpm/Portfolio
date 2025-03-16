/**
 * Theme and color configuration for the portfolio
 * Following BEM methodology and using Tailwind
 */

export const COLORS = {
  primary: {
    light: '#3B82F6', // blue-500
    DEFAULT: '#2563EB', // blue-600
    dark: '#1D4ED8', // blue-700
  },
  secondary: {
    light: '#8B5CF6', // violet-500
    DEFAULT: '#7C3AED', // violet-600
    dark: '#6D28D9', // violet-700
  },
  accent: {
    light: '#F59E0B', // amber-500
    DEFAULT: '#D97706', // amber-600
    dark: '#B45309', // amber-700
  },
  background: {
    light: '#FFFFFF', // white
    DEFAULT: '#F9FAFB', // gray-50
    dark: '#111827', // gray-900
  },
  text: {
    light: '#1F2937', // gray-800
    DEFAULT: '#111827', // gray-900
    dark: '#F9FAFB', // gray-50
  },
  cursor: {
    light: {
      primary: 'rgba(59, 130, 246, 0.5)', // blue-500 with opacity
      secondary: 'rgba(37, 99, 235, 0.3)', // blue-600 with opacity
    },
    dark: {
      primary: 'rgba(219, 39, 119, 0.5)', // pink-600 with opacity
      secondary: 'rgba(124, 58, 237, 0.3)', // violet-600 with opacity
    }
  }
};

export const BREAKPOINTS = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};

export const FONT_SIZES = {
  xs: '0.75rem',
  sm: '0.875rem',
  base: '1rem',
  lg: '1.125rem',
  xl: '1.25rem',
  '2xl': '1.5rem',
  '3xl': '1.875rem',
  '4xl': '2.25rem',
  '5xl': '3rem',
  '6xl': '3.75rem',
};

export const SPACING = {
  0: '0',
  1: '0.25rem',
  2: '0.5rem',
  3: '0.75rem',
  4: '1rem',
  5: '1.25rem',
  6: '1.5rem',
  8: '2rem',
  10: '2.5rem',
  12: '3rem',
  16: '4rem',
  20: '5rem',
  24: '6rem',
  32: '8rem',
  40: '10rem',
  48: '12rem',
  56: '14rem',
  64: '16rem',
};

export default {
  COLORS,
  BREAKPOINTS,
  FONT_SIZES,
  SPACING,
}; 