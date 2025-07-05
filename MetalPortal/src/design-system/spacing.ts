/**
 * METAL PORTAL - SPACING SYSTEM
 * 
 * Consistent spacing scale for layout, padding, and margins
 * Based on 8px base unit for pixel-perfect alignment
 * 
 * DESIGN PHILOSOPHY:
 * - 8px base unit for consistent rhythm
 * - Exponential scale for hierarchical spacing
 * - Semantic naming for common use cases
 * - Optimized for mobile touch targets
 */

// ========================
// BASE SPACING SCALE
// ========================

/**
 * Base spacing scale using 8px unit
 * Creates consistent rhythm throughout the application
 */
export const spacing = {
  '0': 0,
  '1': 4,    // 0.25rem
  '2': 8,    // 0.5rem - Base unit
  '3': 12,   // 0.75rem
  '4': 16,   // 1rem
  '5': 20,   // 1.25rem
  '6': 24,   // 1.5rem
  '8': 32,   // 2rem
  '10': 40,  // 2.5rem
  '12': 48,  // 3rem
  '16': 64,  // 4rem
  '20': 80,  // 5rem
  '24': 96,  // 6rem
  '32': 128, // 8rem
  '40': 160, // 10rem
  '48': 192, // 12rem
  '56': 224, // 14rem
  '64': 256, // 16rem
} as const;

// ========================
// SEMANTIC SPACING
// ========================

/**
 * Semantic spacing values for common use cases
 * Maps base spacing to meaningful contexts
 */
export const semanticSpacing = {
  // Component internal spacing
  component: {
    xs: spacing['1'],   // 4px - Minimal internal spacing
    sm: spacing['2'],   // 8px - Small internal spacing
    md: spacing['4'],   // 16px - Default internal spacing
    lg: spacing['6'],   // 24px - Large internal spacing
    xl: spacing['8'],   // 32px - Extra large internal spacing
  },

  // Layout spacing
  layout: {
    xs: spacing['4'],   // 16px - Minimal layout spacing
    sm: spacing['6'],   // 24px - Small layout spacing
    md: spacing['8'],   // 32px - Default layout spacing
    lg: spacing['12'],  // 48px - Large layout spacing
    xl: spacing['16'],  // 64px - Extra large layout spacing
    xxl: spacing['24'], // 96px - Section spacing
  },

  // Touch target spacing
  touch: {
    min: 44,           // Minimum touch target size
    comfortable: 48,   // Comfortable touch target
    spacious: 56,      // Spacious touch target
  },

  // Content spacing
  content: {
    line: spacing['1'],   // 4px - Line spacing
    paragraph: spacing['4'], // 16px - Paragraph spacing
    section: spacing['8'],   // 32px - Section spacing
    page: spacing['12'],     // 48px - Page section spacing
  },

  // Border radius for different components
  radius: {
    none: 0,
    sm: 4,    // Small radius
    md: 8,    // Default radius
    lg: 12,   // Large radius
    xl: 16,   // Extra large radius
    full: 9999, // Fully rounded
  },
} as const;

// ========================
// COMPONENT SPACING
// ========================

/**
 * Component-specific spacing configurations
 * Pre-defined spacing for consistent component implementation
 */
export const componentSpacing = {
  // Button spacing
  button: {
    padding: {
      sm: { horizontal: spacing['3'], vertical: spacing['2'] },
      md: { horizontal: spacing['4'], vertical: spacing['3'] },
      lg: { horizontal: spacing['6'], vertical: spacing['4'] },
    },
    margin: {
      between: spacing['2'], // Space between buttons
      group: spacing['4'],   // Space between button groups
    },
  },

  // Input spacing
  input: {
    padding: {
      horizontal: spacing['4'], // 16px
      vertical: spacing['3'],   // 12px
    },
    margin: {
      bottom: spacing['4'], // 16px between inputs
      label: spacing['2'],  // 8px between label and input
    },
  },

  // Card spacing
  card: {
    padding: {
      sm: spacing['4'],  // 16px
      md: spacing['6'],  // 24px
      lg: spacing['8'],  // 32px
    },
    margin: {
      between: spacing['4'], // 16px between cards
      group: spacing['6'],   // 24px between card groups
    },
  },

  // Navigation spacing
  navigation: {
    tabBar: {
      height: 64,
      padding: spacing['2'],
      iconSize: 24,
    },
    drawer: {
      width: 280,
      padding: spacing['4'],
      itemHeight: 48,
    },
  },

  // List spacing
  list: {
    item: {
      padding: spacing['4'],     // 16px
      minHeight: 44,             // Minimum touch target
    },
    separator: spacing['1'],     // 4px separator
    section: spacing['8'],       // 32px between sections
  },

  // Modal spacing
  modal: {
    padding: spacing['6'],       // 24px
    margin: spacing['4'],        // 16px from edges
    borderRadius: semanticSpacing.radius.lg,
  },

  // Header spacing
  header: {
    height: 56,
    padding: spacing['4'],
    titleMargin: spacing['2'],
  },
} as const;

// ========================
// LAYOUT GRIDS
// ========================

/**
 * Grid system for consistent layout structure
 */
export const gridSystem = {
  // Column system
  columns: {
    mobile: 4,
    tablet: 8,
    desktop: 12,
  },

  // Gutter spacing
  gutter: {
    mobile: spacing['4'],  // 16px
    tablet: spacing['6'],  // 24px
    desktop: spacing['8'], // 32px
  },

  // Container spacing
  container: {
    padding: {
      mobile: spacing['4'],  // 16px
      tablet: spacing['6'],  // 24px
      desktop: spacing['8'], // 32px
    },
    maxWidth: {
      mobile: '100%',
      tablet: 768,
      desktop: 1200,
    },
  },
} as const;

// ========================
// RESPONSIVE SPACING
// ========================

/**
 * Responsive spacing adjustments for different screen sizes
 */
export const responsiveSpacing = {
  // Mobile spacing (default)
  mobile: {
    section: spacing['6'],   // 24px
    component: spacing['4'], // 16px
    content: spacing['3'],   // 12px
  },

  // Tablet spacing
  tablet: {
    section: spacing['8'],   // 32px
    component: spacing['6'], // 24px
    content: spacing['4'],   // 16px
  },

  // Desktop spacing
  desktop: {
    section: spacing['12'],  // 48px
    component: spacing['8'], // 32px
    content: spacing['6'],   // 24px
  },
} as const;

// ========================
// UTILITY FUNCTIONS
// ========================

/**
 * Spacing utility functions for dynamic spacing calculations
 */
export const spacingUtils = {
  /**
   * Get responsive spacing based on screen width
   */
  getResponsiveSpacing: (baseSpacing: number, screenWidth: number): number => {
    if (screenWidth < 600) {
      return baseSpacing; // Mobile - base spacing
    } else if (screenWidth < 900) {
      return baseSpacing * 1.25; // Tablet - 25% more
    } else {
      return baseSpacing * 1.5; // Desktop - 50% more
    }
  },

  /**
   * Calculate component spacing based on size variant
   */
  getComponentSpacing: (size: 'sm' | 'md' | 'lg', component: keyof typeof componentSpacing): number => {
    const spacingMap = {
      sm: spacing['2'],
      md: spacing['4'],
      lg: spacing['6'],
    };
    return spacingMap[size];
  },

  /**
   * Create consistent shadow with spacing
   */
  createShadow: (elevation: number): string => {
    const shadowOffset = elevation * 2;
    const shadowRadius = elevation * 4;
    const shadowOpacity = Math.min(0.15 + (elevation * 0.05), 0.3);
    
    return `0 ${shadowOffset}px ${shadowRadius}px rgba(0, 0, 0, ${shadowOpacity})`;
  },

  /**
   * Get safe area spacing for different screen areas
   */
  getSafeAreaSpacing: (area: 'top' | 'bottom' | 'left' | 'right'): number => {
    const safeAreaMap = {
      top: 44,    // Status bar height
      bottom: 34, // Home indicator height
      left: 0,    // Safe area left
      right: 0,   // Safe area right
    };
    return safeAreaMap[area];
  },
} as const;

// ========================
// METAL PORTAL SPECIFIC
// ========================

/**
 * Metal Portal specific spacing for themed components
 */
export const metalSpacing = {
  // Band-specific spacing
  band: {
    logo: {
      size: spacing['24'],     // 96px - Band logo size
      margin: spacing['8'],    // 32px - Logo margin
    },
    albumArt: {
      small: spacing['16'],    // 64px - Small album art
      medium: spacing['24'],   // 96px - Medium album art
      large: spacing['32'],    // 128px - Large album art
    },
  },

  // VIP section spacing
  vip: {
    border: 2,                 // 2px VIP border
    glow: spacing['1'],        // 4px glow effect
    padding: spacing['6'],     // 24px VIP content padding
  },

  // Concert/event spacing
  event: {
    poster: {
      width: spacing['40'],    // 160px - Event poster width
      height: spacing['48'],   // 192px - Event poster height
    },
    ticketHeight: spacing['20'], // 80px - Ticket component height
  },

  // Forum/chat spacing
  forum: {
    avatar: {
      small: spacing['8'],     // 32px - Small avatar
      medium: spacing['12'],   // 48px - Medium avatar
      large: spacing['16'],    // 64px - Large avatar
    },
    messageIndent: spacing['10'], // 40px - Reply indentation
  },
} as const;

// ========================
// EXPORTS
// ========================

/**
 * Main spacing system export
 */
export const metalPortalSpacing = {
  base: spacing,
  semantic: semanticSpacing,
  component: componentSpacing,
  grid: gridSystem,
  responsive: responsiveSpacing,
  metal: metalSpacing,
  utils: spacingUtils,
} as const;

export default metalPortalSpacing;

// Type exports for TypeScript usage
export type Spacing = typeof spacing;
export type SemanticSpacing = typeof semanticSpacing;
export type ComponentSpacing = typeof componentSpacing;
export type MetalPortalSpacing = typeof metalPortalSpacing;