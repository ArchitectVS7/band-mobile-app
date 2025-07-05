/**
 * METAL PORTAL - TYPOGRAPHY SYSTEM
 * 
 * Gothic-inspired typography with modern readability
 * Balances metal aesthetic with mobile accessibility
 * 
 * DESIGN PHILOSOPHY:
 * - Gothic fonts for impact and brand identity
 * - High readability sans-serif for content
 * - Optimized for mobile devices
 * - Accessible font sizes and contrast
 * - Semantic hierarchy for consistent information architecture
 */

import { Platform } from 'react-native';

// ========================
// FONT FAMILIES
// ========================

/**
 * Font family definitions with fallbacks
 * Prioritizes system fonts for performance while maintaining aesthetic
 */
export const fontFamilies = {
  // Gothic/Display fonts for headers and emphasis
  gothic: Platform.select({
    ios: ['Chalkduster', 'Georgia', 'serif'],
    android: ['serif', 'Georgia'],
    web: ['Cinzel', 'Georgia', 'Times New Roman', 'serif'],
    default: ['Georgia', 'serif'],
  }),

  // Primary text font - clean and readable
  primary: Platform.select({
    ios: ['Inter', '-apple-system', 'San Francisco', 'Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
    android: ['Inter', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
    web: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
    default: ['Inter', 'Helvetica Neue', 'Arial', 'sans-serif'],
  }),

  // Monospace for code/technical content
  mono: Platform.select({
    ios: ['JetBrains Mono', 'SF Mono', 'Monaco', 'Consolas', 'monospace'],
    android: ['JetBrains Mono', 'Roboto Mono', 'Consolas', 'monospace'],
    web: ['JetBrains Mono', 'Fira Code', 'Monaco', 'Consolas', 'Courier New', 'monospace'],
    default: ['JetBrains Mono', 'Consolas', 'monospace'],
  }),

  // Alternative gothic for special occasions
  accent: Platform.select({
    ios: ['Papyrus', 'Georgia', 'serif'],
    android: ['serif'],
    web: ['Uncial Antiqua', 'Papyrus', 'Georgia', 'serif'],
    default: ['Georgia', 'serif'],
  }),
} as const;

// ========================
// FONT WEIGHTS
// ========================

/**
 * Font weight scale for hierarchy and emphasis
 */
export const fontWeights = {
  light: '300',
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
  extrabold: '800',
  black: '900',
} as const;

// ========================
// FONT SIZES
// ========================

/**
 * Font size scale optimized for mobile readability
 * Uses modular scale for harmonious proportions
 */
export const fontSizes = {
  // Micro text
  xs: 11,   // Captions, legal text
  sm: 13,   // Labels, metadata
  
  // Body text
  base: 16, // Default body text
  lg: 18,   // Large body text
  
  // Headings
  xl: 20,   // H4
  '2xl': 24, // H3
  '3xl': 30, // H2
  '4xl': 36, // H1
  '5xl': 48, // Page title
  '6xl': 60, // Hero title
  '7xl': 72, // Display title
} as const;

// ========================
// LINE HEIGHTS
// ========================

/**
 * Line height scale for optimal readability
 * Tighter line heights for headings, looser for body text
 */
export const lineHeights = {
  none: 1,
  tight: 1.1,
  snug: 1.2,
  normal: 1.4,
  relaxed: 1.5,
  loose: 1.6,
  spacious: 1.8,
} as const;

// ========================
// LETTER SPACING
// ========================

/**
 * Letter spacing for different contexts
 * Subtle adjustments for better readability and style
 */
export const letterSpacing = {
  tighter: -0.02,
  tight: -0.01,
  normal: 0,
  wide: 0.01,
  wider: 0.02,
  widest: 0.1,
} as const;

// ========================
// TEXT STYLES
// ========================

/**
 * Pre-defined text styles for consistent usage
 * Combines font, size, weight, and spacing for semantic hierarchy
 */
export const textStyles = {
  // Display styles - for hero sections and major headings
  display: {
    hero: {
      fontFamily: fontFamilies.gothic,
      fontSize: fontSizes['7xl'],
      fontWeight: fontWeights.black,
      lineHeight: lineHeights.tight,
      letterSpacing: letterSpacing.tight,
    },
    title: {
      fontFamily: fontFamilies.gothic,
      fontSize: fontSizes['6xl'],
      fontWeight: fontWeights.bold,
      lineHeight: lineHeights.tight,
      letterSpacing: letterSpacing.tight,
    },
    subtitle: {
      fontFamily: fontFamilies.gothic,
      fontSize: fontSizes['5xl'],
      fontWeight: fontWeights.semibold,
      lineHeight: lineHeights.snug,
      letterSpacing: letterSpacing.normal,
    },
  },

  // Heading styles - for section headers
  heading: {
    h1: {
      fontFamily: fontFamilies.gothic,
      fontSize: fontSizes['4xl'],
      fontWeight: fontWeights.bold,
      lineHeight: lineHeights.snug,
      letterSpacing: letterSpacing.tight,
    },
    h2: {
      fontFamily: fontFamilies.gothic,
      fontSize: fontSizes['3xl'],
      fontWeight: fontWeights.bold,
      lineHeight: lineHeights.snug,
      letterSpacing: letterSpacing.normal,
    },
    h3: {
      fontFamily: fontFamilies.primary,
      fontSize: fontSizes['2xl'],
      fontWeight: fontWeights.semibold,
      lineHeight: lineHeights.snug,
      letterSpacing: letterSpacing.normal,
    },
    h4: {
      fontFamily: fontFamilies.primary,
      fontSize: fontSizes.xl,
      fontWeight: fontWeights.semibold,
      lineHeight: lineHeights.normal,
      letterSpacing: letterSpacing.normal,
    },
    h5: {
      fontFamily: fontFamilies.primary,
      fontSize: fontSizes.lg,
      fontWeight: fontWeights.medium,
      lineHeight: lineHeights.normal,
      letterSpacing: letterSpacing.normal,
    },
    h6: {
      fontFamily: fontFamilies.primary,
      fontSize: fontSizes.base,
      fontWeight: fontWeights.medium,
      lineHeight: lineHeights.normal,
      letterSpacing: letterSpacing.wide,
      textTransform: 'uppercase' as const,
    },
  },

  // Body text styles
  body: {
    large: {
      fontFamily: fontFamilies.primary,
      fontSize: fontSizes.lg,
      fontWeight: fontWeights.regular,
      lineHeight: lineHeights.relaxed,
      letterSpacing: letterSpacing.normal,
    },
    default: {
      fontFamily: fontFamilies.primary,
      fontSize: fontSizes.base,
      fontWeight: fontWeights.regular,
      lineHeight: lineHeights.normal,
      letterSpacing: letterSpacing.normal,
    },
    small: {
      fontFamily: fontFamilies.primary,
      fontSize: fontSizes.sm,
      fontWeight: fontWeights.regular,
      lineHeight: lineHeights.normal,
      letterSpacing: letterSpacing.normal,
    },
    caption: {
      fontFamily: fontFamilies.primary,
      fontSize: fontSizes.xs,
      fontWeight: fontWeights.regular,
      lineHeight: lineHeights.normal,
      letterSpacing: letterSpacing.wide,
    },
  },

  // Interactive text styles
  interactive: {
    button: {
      fontFamily: fontFamilies.primary,
      fontSize: fontSizes.base,
      fontWeight: fontWeights.semibold,
      lineHeight: lineHeights.none,
      letterSpacing: letterSpacing.wide,
      textTransform: 'uppercase' as const,
    },
    link: {
      fontFamily: fontFamilies.primary,
      fontSize: fontSizes.base,
      fontWeight: fontWeights.medium,
      lineHeight: lineHeights.normal,
      letterSpacing: letterSpacing.normal,
      textDecorationLine: 'underline' as const,
    },
    label: {
      fontFamily: fontFamilies.primary,
      fontSize: fontSizes.sm,
      fontWeight: fontWeights.medium,
      lineHeight: lineHeights.normal,
      letterSpacing: letterSpacing.wide,
      textTransform: 'uppercase' as const,
    },
    placeholder: {
      fontFamily: fontFamilies.primary,
      fontSize: fontSizes.base,
      fontWeight: fontWeights.regular,
      lineHeight: lineHeights.normal,
      letterSpacing: letterSpacing.normal,
      fontStyle: 'italic' as const,
    },
  },

  // Special styles for Metal Portal
  metal: {
    // Band name styling
    bandName: {
      fontFamily: fontFamilies.gothic,
      fontSize: fontSizes['5xl'],
      fontWeight: fontWeights.black,
      lineHeight: lineHeights.tight,
      letterSpacing: letterSpacing.widest,
      textTransform: 'uppercase' as const,
      textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)',
    },
    
    // Song title styling
    songTitle: {
      fontFamily: fontFamilies.accent,
      fontSize: fontSizes['2xl'],
      fontWeight: fontWeights.bold,
      lineHeight: lineHeights.snug,
      letterSpacing: letterSpacing.wide,
      fontStyle: 'italic' as const,
    },
    
    // Album title styling
    albumTitle: {
      fontFamily: fontFamilies.gothic,
      fontSize: fontSizes.xl,
      fontWeight: fontWeights.bold,
      lineHeight: lineHeights.snug,
      letterSpacing: letterSpacing.wider,
      textTransform: 'capitalize' as const,
    },
    
    // Quote/lyric styling
    quote: {
      fontFamily: fontFamilies.accent,
      fontSize: fontSizes.lg,
      fontWeight: fontWeights.medium,
      lineHeight: lineHeights.relaxed,
      letterSpacing: letterSpacing.normal,
      fontStyle: 'italic' as const,
      textAlign: 'center' as const,
    },
  },

  // Code and technical text
  code: {
    inline: {
      fontFamily: fontFamilies.mono,
      fontSize: fontSizes.sm,
      fontWeight: fontWeights.regular,
      lineHeight: lineHeights.normal,
      letterSpacing: letterSpacing.normal,
    },
    block: {
      fontFamily: fontFamilies.mono,
      fontSize: fontSizes.sm,
      fontWeight: fontWeights.regular,
      lineHeight: lineHeights.relaxed,
      letterSpacing: letterSpacing.normal,
    },
  },
} as const;

// ========================
// RESPONSIVE TYPOGRAPHY
// ========================

/**
 * Responsive typography scale for different screen sizes
 * Adjusts font sizes based on screen dimensions
 */
export const responsiveTextStyles = {
  // Mobile-first approach
  mobile: {
    hero: {
      ...textStyles.display.hero,
      fontSize: fontSizes['5xl'],
    },
    title: {
      ...textStyles.display.title,
      fontSize: fontSizes['4xl'],
    },
    h1: {
      ...textStyles.heading.h1,
      fontSize: fontSizes['3xl'],
    },
    h2: {
      ...textStyles.heading.h2,
      fontSize: fontSizes['2xl'],
    },
  },

  // Tablet adjustments
  tablet: {
    hero: {
      ...textStyles.display.hero,
      fontSize: fontSizes['6xl'],
    },
    title: {
      ...textStyles.display.title,
      fontSize: fontSizes['5xl'],
    },
  },

  // Desktop adjustments (web)
  desktop: {
    hero: textStyles.display.hero,
    title: textStyles.display.title,
  },
} as const;

// ========================
// UTILITY FUNCTIONS
// ========================

/**
 * Typography utility functions for dynamic text styling
 */
export const typographyUtils = {
  /**
   * Get responsive font size based on screen width
   */
  getResponsiveFontSize: (baseSize: number, screenWidth: number): number => {
    if (screenWidth < 600) {
      return baseSize * 0.9; // Mobile - slightly smaller
    } else if (screenWidth < 900) {
      return baseSize; // Tablet - base size
    } else {
      return baseSize * 1.1; // Desktop - slightly larger
    }
  },

  /**
   * Calculate optimal line height for given font size
   */
  getOptimalLineHeight: (fontSize: number): number => {
    // Larger fonts need tighter line heights
    if (fontSize >= 48) return 1.1;
    if (fontSize >= 24) return 1.2;
    if (fontSize >= 16) return 1.4;
    return 1.5;
  },

  /**
   * Get text style with custom overrides
   */
  getTextStyle: (baseStyle: keyof typeof textStyles.body, overrides: Partial<typeof textStyles.body.default> = {}) => {
    return {
      ...textStyles.body[baseStyle],
      ...overrides,
    };
  },

  /**
   * Create text shadow for dramatic effect
   */
  createTextShadow: (color: string = 'rgba(0, 0, 0, 0.8)', blur: number = 4): string => {
    return `2px 2px ${blur}px ${color}`;
  },
} as const;

// ========================
// EXPORTS
// ========================

/**
 * Main typography system export
 */
export const metalPortalTypography = {
  fonts: fontFamilies,
  weights: fontWeights,
  sizes: fontSizes,
  lineHeights,
  letterSpacing,
  styles: textStyles,
  responsive: responsiveTextStyles,
  utils: typographyUtils,
} as const;

export default metalPortalTypography;

// Type exports for TypeScript usage
export type FontFamilies = typeof fontFamilies;
export type FontWeights = typeof fontWeights;
export type FontSizes = typeof fontSizes;
export type TextStyles = typeof textStyles;
export type MetalPortalTypography = typeof metalPortalTypography;