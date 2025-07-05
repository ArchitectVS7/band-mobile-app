/**
 * THEME UTILITIES
 * 
 * Helper functions for theme operations:
 * - Color manipulation
 * - Style helpers
 * - Theme detection
 * - Dark/light mode utilities
 */

/**
 * Convert hex color to RGB
 */
export const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
};

/**
 * Convert RGB to hex
 */
export const rgbToHex = (r: number, g: number, b: number): string => {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
};

/**
 * Add opacity to hex color
 */
export const addOpacity = (hex: string, opacity: number): string => {
  const opacityHex = Math.round(opacity * 255).toString(16).padStart(2, '0');
  return hex + opacityHex;
};

/**
 * Lighten color by percentage
 */
export const lightenColor = (hex: string, percent: number): string => {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;
  
  const { r, g, b } = rgb;
  const amount = Math.round(2.55 * percent);
  
  return rgbToHex(
    Math.min(255, r + amount),
    Math.min(255, g + amount),
    Math.min(255, b + amount)
  );
};

/**
 * Darken color by percentage
 */
export const darkenColor = (hex: string, percent: number): string => {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;
  
  const { r, g, b } = rgb;
  const amount = Math.round(2.55 * percent);
  
  return rgbToHex(
    Math.max(0, r - amount),
    Math.max(0, g - amount),
    Math.max(0, b - amount)
  );
};

/**
 * Get contrast color (black or white) for given background
 */
export const getContrastColor = (hex: string): string => {
  const rgb = hexToRgb(hex);
  if (!rgb) return '#000000';
  
  const { r, g, b } = rgb;
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  
  return brightness > 128 ? '#000000' : '#FFFFFF';
};

/**
 * Metal Portal theme constants
 */
export const METAL_COLORS = {
  // Primary blacks
  BLACK: '#0A0A0A',
  BLACK_LIGHT: '#1A1A1A',
  BLACK_LIGHTER: '#2A2A2A',
  
  // Blood reds
  RED: '#DC143C',
  RED_DARK: '#8B0000',
  RED_LIGHT: '#FF6B6B',
  
  // Bone whites
  WHITE: '#F5F5DC',
  WHITE_PURE: '#FFFFFF',
  
  // Metals
  SILVER: '#C0C0C0',
  GOLD: '#FFD700',
  COPPER: '#B87333',
  
  // Grays
  GRAY: '#808080',
  GRAY_DARK: '#333333',
  GRAY_LIGHT: '#CCCCCC',
} as const;

/**
 * Get themed shadow style
 */
export const getThemedShadow = (isDarkMode: boolean) => ({
  shadowColor: isDarkMode ? '#000000' : '#000000',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: isDarkMode ? 0.8 : 0.25,
  shadowRadius: 3.84,
  elevation: 5,
});

/**
 * Get themed border style
 */
export const getThemedBorder = (isDarkMode: boolean) => ({
  borderColor: isDarkMode ? METAL_COLORS.GRAY_DARK : METAL_COLORS.GRAY_LIGHT,
  borderWidth: 1,
});

/**
 * Generate gradient colors
 */
export const generateGradient = (baseColor: string, steps: number = 5): string[] => {
  const colors: string[] = [];
  
  for (let i = 0; i < steps; i++) {
    const percent = (i / (steps - 1)) * 50; // 0 to 50% variation
    if (i < steps / 2) {
      colors.push(darkenColor(baseColor, percent));
    } else {
      colors.push(lightenColor(baseColor, percent));
    }
  }
  
  return colors;
};