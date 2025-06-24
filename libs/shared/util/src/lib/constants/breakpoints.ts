/**
 * Tailwind CSS breakpoint values in pixels
 * These should match the values in your tailwind.config.js
 */
export const TAILWIND_BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

export type TailwindBreakpoint = keyof typeof TAILWIND_BREAKPOINTS;
