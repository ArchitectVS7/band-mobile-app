/**
 * METAL PORTAL - DESIGN SYSTEM INDEX
 * 
 * Central export hub for all design system tokens and components
 * Provides organized access to colors, typography, spacing, and UI components
 * 
 * USAGE:
 * ```tsx
 * import { metalPortalColors, Button, Input } from '@/design-system';
 * import { MetalPortalTheme } from '@/design-system';
 * ```
 */

// ========================
// DESIGN TOKENS
// ========================

// Import design tokens for internal use
import { metalPortalColors } from './colors';
import { metalPortalTypography } from './typography';
import { metalPortalSpacing, spacing } from './spacing';

export { 
  metalPortalColors, 
  primitiveColors, 
  semanticColors, 
  componentColors,
  colorUtils,
  themeVariations,
  type PrimitiveColors,
  type SemanticColors,
  type ComponentColors,
  type MetalPortalColors,
} from './colors';

export { 
  metalPortalTypography, 
  fontFamilies, 
  fontWeights, 
  fontSizes, 
  lineHeights, 
  letterSpacing, 
  textStyles, 
  responsiveTextStyles,
  typographyUtils,
  type FontFamilies,
  type FontWeights,
  type FontSizes,
  type TextStyles,
  type MetalPortalTypography,
} from './typography';

export { 
  metalPortalSpacing, 
  spacing, 
  semanticSpacing, 
  componentSpacing, 
  gridSystem, 
  responsiveSpacing,
  metalSpacing,
  spacingUtils,
  type Spacing,
  type SemanticSpacing,
  type ComponentSpacing,
  type MetalPortalSpacing,
} from './spacing';

// ========================
// UI COMPONENTS
// ========================

export { 
  Button, 
  ButtonVariations,
  type ButtonProps,
  type ButtonVariant,
  type ButtonSize,
  type IconPosition,
} from '../components/ui/Button';

export { 
  Input, 
  InputVariations,
  type InputProps,
  type InputVariant,
  type InputSize,
} from '../components/ui/Input';

export { 
  Card, 
  CardVariations,
  MetalCards,
  type CardProps,
  type CardVariant,
  type CardSize,
} from '../components/ui/Card';

// ========================
// THEME PROVIDER
// ========================

/**
 * Complete Metal Portal theme object
 * Combines all design tokens for easy theme provider usage
 */
export const MetalPortalTheme = {
  colors: metalPortalColors,
  typography: metalPortalTypography,
  spacing: metalPortalSpacing,
  name: 'MetalPortal',
  version: '1.0.0',
} as const;

// ========================
// THEME UTILITIES
// ========================

/**
 * Theme utility functions for dynamic theming
 */
export const themeUtils = {
  /**
   * Get color value by path
   */
  getColor: (path: string): string => {
    const keys = path.split('.');
    let current: any = metalPortalColors;
    
    for (const key of keys) {
      current = current[key];
      if (!current) break;
    }
    
    return current || metalPortalColors.semantic.text.primary;
  },

  /**
   * Get spacing value by key
   */
  getSpacing: (key: keyof typeof spacing): number => {
    return metalPortalSpacing.base[key];
  },

  /**
   * Get typography style by path
   */
  getTypographyStyle: (path: string) => {
    const keys = path.split('.');
    let current: any = metalPortalTypography.styles;
    
    for (const key of keys) {
      current = current[key];
      if (!current) break;
    }
    
    return current || metalPortalTypography.styles.body.default;
  },

  /**
   * Get responsive value based on screen width
   */
  getResponsiveValue: (
    values: { mobile: any; tablet?: any; desktop?: any }, 
    screenWidth: number
  ) => {
    if (screenWidth < 600) {
      return values.mobile;
    } else if (screenWidth < 900) {
      return values.tablet || values.mobile;
    } else {
      return values.desktop || values.tablet || values.mobile;
    }
  },

  /**
   * Create component style with theme values
   */
  createComponentStyle: (styles: any) => {
    return styles;
  },
} as const;

// ========================
// PRESET COMBINATIONS
// ========================

/**
 * Common preset combinations for quick styling
 */
export const presets = {
  // Text presets
  text: {
    heroTitle: {
      ...metalPortalTypography.styles.display.hero,
      color: metalPortalColors.semantic.text.primary,
    },
    cardTitle: {
      ...metalPortalTypography.styles.heading.h4,
      color: metalPortalColors.semantic.text.primary,
    },
    body: {
      ...metalPortalTypography.styles.body.default,
      color: metalPortalColors.semantic.text.primary,
    },
    caption: {
      ...metalPortalTypography.styles.body.caption,
      color: metalPortalColors.semantic.text.secondary,
    },
    metalBrand: {
      ...metalPortalTypography.styles.metal.bandName,
      color: metalPortalColors.semantic.interactive.primary,
    },
  },

  // Layout presets
  layout: {
    screenPadding: {
      paddingHorizontal: metalPortalSpacing.base['4'],
      paddingVertical: metalPortalSpacing.base['6'],
    },
    cardSpacing: {
      marginBottom: metalPortalSpacing.component.card.margin.between,
    },
    sectionSpacing: {
      marginBottom: metalPortalSpacing.semantic.layout.lg,
    },
  },

  // Shadow presets
  shadows: {
    card: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 8,
      elevation: 4,
    },
    elevated: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.3,
      shadowRadius: 12,
      elevation: 8,
    },
    featured: {
      shadowColor: metalPortalColors.semantic.interactive.primary,
      shadowOffset: { width: 0, height: 12 },
      shadowOpacity: 0.4,
      shadowRadius: 16,
      elevation: 12,
    },
  },
} as const;

// ========================
// ACCESSIBILITY HELPERS
// ========================

/**
 * Accessibility utilities for better app inclusivity
 */
export const a11yUtils = {
  /**
   * Get minimum touch target size
   */
  minTouchTarget: metalPortalSpacing.semantic.touch.min,

  /**
   * Get high contrast color pair
   */
  getHighContrastPair: (isDark: boolean = true) => ({
    background: isDark 
      ? metalPortalColors.primitive.black['100'] 
      : metalPortalColors.primitive.bone['100'],
    text: isDark 
      ? metalPortalColors.primitive.bone['100'] 
      : metalPortalColors.primitive.black['100'],
  }),

  /**
   * Get focus indicator style
   */
  getFocusStyle: (color: string = metalPortalColors.semantic.interactive.primary) => ({
    shadowColor: color,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 2,
  }),
} as const;

// ========================
// CONSTANTS
// ========================

/**
 * Design system constants
 */
export const DESIGN_SYSTEM_VERSION = '1.0.0';
export const METAL_PORTAL_THEME_NAME = 'MetalPortal';

/**
 * Breakpoints for responsive design
 */
export const breakpoints = {
  mobile: 0,
  tablet: 600,
  desktop: 900,
  large: 1200,
} as const;

/**
 * Animation constants
 */
export const animations = {
  durations: {
    fast: 150,
    normal: 200,
    slow: 300,
  },
  easings: {
    easeIn: 'ease-in',
    easeOut: 'ease-out',
    easeInOut: 'ease-in-out',
  },
} as const;

// ========================
// TYPE EXPORTS
// ========================

export type MetalPortalThemeType = typeof MetalPortalTheme;
export type ThemeUtils = typeof themeUtils;
export type Presets = typeof presets;
export type A11yUtils = typeof a11yUtils;
export type Breakpoints = typeof breakpoints;
export type Animations = typeof animations;

// ========================
// DEFAULT EXPORT
// ========================

/**
 * Default export - complete design system
 */
export default {
  theme: MetalPortalTheme,
  utils: themeUtils,
  presets,
  a11y: a11yUtils,
  breakpoints,
  animations,
  version: DESIGN_SYSTEM_VERSION,
} as const;