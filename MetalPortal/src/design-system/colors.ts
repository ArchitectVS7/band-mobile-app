/**
 * METAL PORTAL - COLOR SYSTEM
 * 
 * Death metal inspired color palette with semantic mappings
 * Designed for dark underground aesthetic with high contrast accessibility
 * 
 * DESIGN PHILOSOPHY:
 * - Deep blacks evoke underground metal scene
 * - Blood reds for passion and intensity
 * - Bone whites for contrast and readability
 * - Metallic accents for sophistication
 * - Semantic mappings for consistent UI state representation
 */

// ========================
// PRIMITIVE COLORS
// ========================

/**
 * Core color primitives - the raw colors of the metal aesthetic
 */
export const primitiveColors = {
  // The Abyss - Deep blacks
  black: {
    '100': '#0A0A0A', // Darkest void
    '200': '#1A1A1A', // Shadow depth
    '300': '#2A2A2A', // Charcoal foundation
    '400': '#3A3A3A', // Smoke
    '500': '#4A4A4A', // Ash
  },

  // Blood Moon - Crimson reds
  red: {
    '100': '#660000', // Dark blood
    '200': '#8B0000', // Deep crimson
    '300': '#DC143C', // Blood red (primary)
    '400': '#FF4757', // Bright blood
    '500': '#FF6B6B', // Light crimson
  },

  // Bone - Pure whites and off-whites
  bone: {
    '100': '#F5F5DC', // Bone white (primary)
    '200': '#FFFFFF', // Pure white
    '300': '#FAFAFA', // Near white
    '400': '#F0F0F0', // Light gray
    '500': '#E0E0E0', // Lighter gray
  },

  // Steel - Metallic grays
  steel: {
    '100': '#333333', // Dark steel
    '200': '#555555', // Medium steel
    '300': '#777777', // Light steel
    '400': '#999999', // Bright steel
    '500': '#BBBBBB', // Silver
  },

  // Metal - Accent metallics
  metal: {
    copper: '#B87333',
    silver: '#C0C0C0',
    gold: '#FFD700',
    platinum: '#E5E4E2',
  },

  // Status colors with metal twist
  status: {
    success: '#4CAF50',    // Forest green
    warning: '#FF9800',    // Amber
    error: '#F44336',      // Blood red
    info: '#2196F3',       // Steel blue
  }
} as const;

// ========================
// SEMANTIC COLOR SYSTEM
// ========================

/**
 * Semantic color mappings for consistent UI representation
 * Maps primitive colors to UI concepts and component states
 */
export const semanticColors = {
  // Background colors
  background: {
    primary: primitiveColors.black['100'],      // Main app background
    secondary: primitiveColors.black['200'],    // Card backgrounds
    tertiary: primitiveColors.black['300'],     // Elevated surfaces
    overlay: 'rgba(10, 10, 10, 0.8)',         // Modal overlays
    backdrop: 'rgba(0, 0, 0, 0.6)',           // Image overlays
  },

  // Text colors
  text: {
    primary: primitiveColors.bone['100'],       // Main text
    secondary: primitiveColors.steel['400'],    // Subdued text
    muted: primitiveColors.steel['300'],        // Disabled text
    inverse: primitiveColors.black['100'],      // Text on light backgrounds
    accent: primitiveColors.red['300'],         // Accent text
  },

  // Border colors
  border: {
    default: primitiveColors.steel['100'],      // Default borders
    light: primitiveColors.steel['200'],        // Light borders
    heavy: primitiveColors.steel['500'],        // Emphasized borders
    accent: primitiveColors.red['300'],         // Accent borders
    focus: primitiveColors.red['400'],          // Focus indicators
  },

  // Interactive colors
  interactive: {
    primary: primitiveColors.red['300'],        // Primary buttons/links
    primaryHover: primitiveColors.red['400'],   // Primary hover state
    primaryPressed: primitiveColors.red['200'], // Primary pressed state
    secondary: primitiveColors.steel['300'],    // Secondary interactive
    secondaryHover: primitiveColors.steel['400'], // Secondary hover
    disabled: primitiveColors.steel['200'],     // Disabled elements
  },

  // Component states
  state: {
    success: primitiveColors.status.success,
    successBg: 'rgba(76, 175, 80, 0.1)',
    warning: primitiveColors.status.warning,
    warningBg: 'rgba(255, 152, 0, 0.1)',
    error: primitiveColors.status.error,
    errorBg: 'rgba(244, 67, 54, 0.1)',
    info: primitiveColors.status.info,
    infoBg: 'rgba(33, 150, 243, 0.1)',
  },

  // Surface colors for cards, modals, etc.
  surface: {
    default: primitiveColors.black['200'],
    elevated: primitiveColors.black['300'],
    sunken: primitiveColors.black['100'],
    accent: `linear-gradient(135deg, ${primitiveColors.red['200']}, ${primitiveColors.red['300']})`,
  },
} as const;

// ========================
// COMPONENT COLOR TOKENS
// ========================

/**
 * Component-specific color tokens
 * Pre-defined color combinations for common UI patterns
 */
export const componentColors = {
  // Button variants
  button: {
    primary: {
      background: semanticColors.interactive.primary,
      backgroundHover: semanticColors.interactive.primaryHover,
      backgroundPressed: semanticColors.interactive.primaryPressed,
      text: primitiveColors.bone['100'],
      border: 'transparent',
    },
    secondary: {
      background: 'transparent',
      backgroundHover: primitiveColors.steel['100'],
      backgroundPressed: primitiveColors.steel['200'],
      text: primitiveColors.bone['100'],
      border: semanticColors.border.default,
    },
    ghost: {
      background: 'transparent',
      backgroundHover: 'rgba(220, 20, 60, 0.1)',
      backgroundPressed: 'rgba(220, 20, 60, 0.2)',
      text: semanticColors.interactive.primary,
      border: 'transparent',
    },
    danger: {
      background: semanticColors.state.error,
      backgroundHover: '#E53E3E',
      backgroundPressed: '#C53030',
      text: primitiveColors.bone['100'],
      border: 'transparent',
    },
  },

  // Input variants
  input: {
    default: {
      background: primitiveColors.black['300'],
      backgroundFocus: primitiveColors.black['400'],
      text: primitiveColors.bone['100'],
      placeholder: primitiveColors.steel['300'],
      border: semanticColors.border.default,
      borderFocus: semanticColors.border.focus,
      borderError: semanticColors.state.error,
    },
  },

  // Card variants
  card: {
    default: {
      background: semanticColors.surface.default,
      border: semanticColors.border.light,
      shadow: 'rgba(0, 0, 0, 0.8)',
    },
    elevated: {
      background: semanticColors.surface.elevated,
      border: semanticColors.border.default,
      shadow: 'rgba(0, 0, 0, 0.9)',
    },
    featured: {
      background: `linear-gradient(135deg, ${primitiveColors.black['200']}, ${primitiveColors.black['300']})`,
      border: semanticColors.interactive.primary,
      shadow: `0 0 20px rgba(220, 20, 60, 0.3)`,
    },
  },

  // Navigation variants
  navigation: {
    background: primitiveColors.black['100'],
    border: semanticColors.border.default,
    activeTab: semanticColors.interactive.primary,
    inactiveTab: primitiveColors.steel['300'],
    activeBackground: 'rgba(220, 20, 60, 0.1)',
  },

  // Status badge variants
  badge: {
    default: {
      background: primitiveColors.steel['300'],
      text: primitiveColors.black['100'],
    },
    primary: {
      background: semanticColors.interactive.primary,
      text: primitiveColors.bone['100'],
    },
    success: {
      background: semanticColors.state.success,
      text: primitiveColors.bone['100'],
    },
    warning: {
      background: semanticColors.state.warning,
      text: primitiveColors.black['100'],
    },
    error: {
      background: semanticColors.state.error,
      text: primitiveColors.bone['100'],
    },
  },
} as const;

// ========================
// ACCESSIBILITY HELPERS
// ========================

/**
 * Color utility functions for accessibility and consistency
 */
export const colorUtils = {
  /**
   * Get color with opacity
   */
  withOpacity: (color: string, opacity: number): string => {
    // Handle hex colors
    if (color.startsWith('#')) {
      const hex = color.slice(1);
      const num = parseInt(hex, 16);
      const r = (num >> 16) & 255;
      const g = (num >> 8) & 255;
      const b = num & 255;
      return `rgba(${r}, ${g}, ${b}, ${opacity})`;
    }
    
    // Handle rgba colors
    if (color.startsWith('rgba')) {
      return color.replace(/,\s*[\d.]+\)/, `, ${opacity})`);
    }
    
    // Handle rgb colors
    if (color.startsWith('rgb')) {
      return color.replace('rgb', 'rgba').replace(')', `, ${opacity})`);
    }
    
    return color;
  },

  /**
   * Get contrast color (for text on backgrounds)
   */
  getContrastColor: (backgroundColor: string): string => {
    // Simplified contrast calculation
    const isDark = backgroundColor.includes('0A0A0A') || 
                   backgroundColor.includes('1A1A1A') || 
                   backgroundColor.includes('2A2A2A');
    
    return isDark ? primitiveColors.bone['100'] : primitiveColors.black['100'];
  },

  /**
   * Get focus ring color
   */
  getFocusRing: (baseColor: string = semanticColors.interactive.primary): string => {
    return `0 0 0 3px ${colorUtils.withOpacity(baseColor, 0.4)}`;
  },
} as const;

// ========================
// THEME VARIATIONS
// ========================

/**
 * Theme variations for different contexts
 */
export const themeVariations = {
  // Concert mode - higher contrast for outdoor/bright environments
  concert: {
    background: {
      primary: '#000000',
      secondary: '#111111',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#CCCCCC',
    },
    accent: primitiveColors.red['400'],
  },

  // VIP mode - more luxurious feel with gold accents
  vip: {
    accent: primitiveColors.metal.gold,
    surface: {
      elevated: `linear-gradient(135deg, #1A1A1A, #2A2A2A)`,
    },
    interactive: {
      primary: primitiveColors.metal.gold,
    },
  },

  // Band member mode - professional feel
  band: {
    accent: primitiveColors.metal.silver,
    surface: {
      elevated: primitiveColors.black['400'],
    },
  },
} as const;

// ========================
// EXPORTS
// ========================

/**
 * Main color system export
 */
export const metalPortalColors = {
  primitive: primitiveColors,
  semantic: semanticColors,
  component: componentColors,
  utils: colorUtils,
  themes: themeVariations,
} as const;

export default metalPortalColors;

// Type exports for TypeScript usage
export type PrimitiveColors = typeof primitiveColors;
export type SemanticColors = typeof semanticColors;
export type ComponentColors = typeof componentColors;
export type MetalPortalColors = typeof metalPortalColors;