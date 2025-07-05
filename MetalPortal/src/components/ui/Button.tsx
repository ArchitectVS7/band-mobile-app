/**
 * METAL PORTAL - BUTTON COMPONENT
 * 
 * Comprehensive button component using Metal Portal design system
 * Supports multiple variants, sizes, and states
 * 
 * FEATURES:
 * - Multiple variants (primary, secondary, ghost, danger)
 * - Multiple sizes (sm, md, lg)
 * - Icon support with proper spacing
 * - Loading states with spinner
 * - Disabled states with proper styling
 * - Press feedback with scale animation
 * - Accessibility features (screen reader support)
 * - Type-safe props with TypeScript
 */

import React from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacityProps,
  ViewStyle,
  TextStyle,
  Animated,
} from 'react-native';
import { metalPortalColors } from '../../design-system/colors';
import { metalPortalTypography } from '../../design-system/typography';
import { metalPortalSpacing } from '../../design-system/spacing';

// ========================
// TYPES & INTERFACES
// ========================

/**
 * Button variant types
 */
type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';

/**
 * Button size types
 */
type ButtonSize = 'sm' | 'md' | 'lg';

/**
 * Icon position types
 */
type IconPosition = 'left' | 'right';

/**
 * Button component props
 */
interface ButtonProps extends Omit<TouchableOpacityProps, 'style'> {
  /**
   * Button text content
   */
  children: React.ReactNode;

  /**
   * Button variant - determines color scheme
   * @default 'primary'
   */
  variant?: ButtonVariant;

  /**
   * Button size - determines padding and font size
   * @default 'md'
   */
  size?: ButtonSize;

  /**
   * Whether button is in loading state
   * @default false
   */
  loading?: boolean;

  /**
   * Whether button is disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * Icon component to display
   */
  icon?: React.ReactNode;

  /**
   * Position of icon relative to text
   * @default 'left'
   */
  iconPosition?: IconPosition;

  /**
   * Whether button should take full width
   * @default false
   */
  fullWidth?: boolean;

  /**
   * Custom style overrides for button container
   */
  style?: ViewStyle;

  /**
   * Custom style overrides for button text
   */
  textStyle?: TextStyle;

  /**
   * Accessibility label for screen readers
   */
  accessibilityLabel?: string;

  /**
   * Test ID for testing
   */
  testID?: string;
}

// ========================
// BUTTON COMPONENT
// ========================

/**
 * Metal Portal Button Component
 * 
 * USAGE EXAMPLES:
 * ```tsx
 * // Basic primary button
 * <Button onPress={handlePress}>Click Me</Button>
 * 
 * // Secondary button with icon
 * <Button variant="secondary" icon={<Icon name="star" />}>
 *   Favorite
 * </Button>
 * 
 * // Loading button
 * <Button loading disabled>
 *   Processing...
 * </Button>
 * 
 * // Full width danger button
 * <Button variant="danger" fullWidth>
 *   Delete Account
 * </Button>
 * ```
 */
export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  icon,
  iconPosition = 'left',
  fullWidth = false,
  style,
  textStyle,
  accessibilityLabel,
  testID,
  onPress,
  onPressIn,
  onPressOut,
  ...props
}) => {
  // Animation value for press feedback
  const scaleValue = React.useRef(new Animated.Value(1)).current;

  // ========================
  // STYLE CALCULATIONS
  // ========================

  // Get button colors based on variant
  const getButtonColors = (variant: ButtonVariant) => {
    const colors = metalPortalColors.component.button;
    
    switch (variant) {
      case 'primary':
        return colors.primary;
      case 'secondary':
        return colors.secondary;
      case 'ghost':
        return colors.ghost;
      case 'danger':
        return colors.danger;
      default:
        return colors.primary;
    }
  };

  // Get button spacing based on size
  const getButtonSpacing = (size: ButtonSize) => {
    const spacing = metalPortalSpacing.component.button.padding;
    
    switch (size) {
      case 'sm':
        return spacing.sm;
      case 'md':
        return spacing.md;
      case 'lg':
        return spacing.lg;
      default:
        return spacing.md;
    }
  };

  // Get text style based on size
  const getTextStyle = (size: ButtonSize) => {
    const baseStyle = metalPortalTypography.styles.interactive.button;
    
    // Fix fontFamily to be a string instead of array
    const fontFamily = Array.isArray(baseStyle.fontFamily) 
      ? baseStyle.fontFamily[0] 
      : baseStyle.fontFamily;
    
    switch (size) {
      case 'sm':
        return { ...baseStyle, fontFamily, fontSize: metalPortalTypography.sizes.sm };
      case 'md':
        return { ...baseStyle, fontFamily };
      case 'lg':
        return { ...baseStyle, fontFamily, fontSize: metalPortalTypography.sizes.lg };
      default:
        return { ...baseStyle, fontFamily };
    }
  };

  const buttonColors = getButtonColors(variant);
  const buttonSpacing = getButtonSpacing(size);
  const buttonTextStyle = getTextStyle(size);

  // ========================
  // EVENT HANDLERS
  // ========================

  const handlePressIn = (event: any) => {
    // Scale down animation for press feedback
    Animated.spring(scaleValue, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
    
    onPressIn?.(event);
  };

  const handlePressOut = (event: any) => {
    // Scale back to normal
    Animated.spring(scaleValue, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
    
    onPressOut?.(event);
  };

  const handlePress = (event: any) => {
    if (loading || disabled) {
      return;
    }
    
    onPress?.(event);
  };

  // ========================
  // RENDER CONTENT
  // ========================

  const renderContent = () => {
    // If loading, show spinner
    if (loading) {
      return (
        <View style={styles.contentContainer}>
          <ActivityIndicator
            size="small"
            color={buttonColors.text}
            style={styles.spinner}
          />
          <Text style={[buttonTextStyle, { color: buttonColors.text }, textStyle]}>
            {children}
          </Text>
        </View>
      );
    }

    // If no icon, show text only
    if (!icon) {
      return (
        <Text style={[buttonTextStyle, { color: buttonColors.text }, textStyle]}>
          {children}
        </Text>
      );
    }

    // Show icon with text
    return (
      <View style={styles.contentContainer}>
        {iconPosition === 'left' && (
          <View style={styles.iconLeft}>
            {icon}
          </View>
        )}
        <Text style={[buttonTextStyle, { color: buttonColors.text }, textStyle]}>
          {children}
        </Text>
        {iconPosition === 'right' && (
          <View style={styles.iconRight}>
            {icon}
          </View>
        )}
      </View>
    );
  };

  // ========================
  // DYNAMIC STYLES
  // ========================

  const dynamicStyles = StyleSheet.create({
    button: {
      backgroundColor: disabled 
        ? metalPortalColors.semantic.interactive.disabled
        : buttonColors.background,
      borderColor: buttonColors.border,
      borderWidth: buttonColors.border === 'transparent' ? 0 : 1,
      paddingHorizontal: buttonSpacing.horizontal,
      paddingVertical: buttonSpacing.vertical,
      width: fullWidth ? '100%' : 'auto',
      opacity: disabled ? 0.6 : 1,
    },
  });

  // ========================
  // RENDER COMPONENT
  // ========================

  return (
    <Animated.View
      style={[
        { transform: [{ scale: scaleValue }] },
        style,
      ]}
    >
      <TouchableOpacity
        style={[
          styles.button,
          dynamicStyles.button,
        ]}
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled || loading}
        accessibilityLabel={accessibilityLabel || (typeof children === 'string' ? children : 'Button')}
        accessibilityRole="button"
        accessibilityState={{
          disabled: disabled || loading,
          busy: loading,
        }}
        testID={testID}
        {...props}
      >
        {renderContent()}
      </TouchableOpacity>
    </Animated.View>
  );
};

// ========================
// STYLES
// ========================

const styles = StyleSheet.create({
  button: {
    borderRadius: metalPortalSpacing.semantic.radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    minHeight: metalPortalSpacing.semantic.touch.min,
    shadowColor: metalPortalColors.semantic.background.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  spinner: {
    marginRight: metalPortalSpacing.base['2'],
  },
  
  iconLeft: {
    marginRight: metalPortalSpacing.base['2'],
  },
  
  iconRight: {
    marginLeft: metalPortalSpacing.base['2'],
  },
});

// ========================
// COMPONENT VARIATIONS
// ========================

/**
 * Pre-configured button variations for common use cases
 */
export const ButtonVariations = {
  /**
   * Primary CTA button
   */
  Primary: (props: Omit<ButtonProps, 'variant'>) => (
    <Button variant="primary" {...props} />
  ),

  /**
   * Secondary action button
   */
  Secondary: (props: Omit<ButtonProps, 'variant'>) => (
    <Button variant="secondary" {...props} />
  ),

  /**
   * Ghost/subtle button
   */
  Ghost: (props: Omit<ButtonProps, 'variant'>) => (
    <Button variant="ghost" {...props} />
  ),

  /**
   * Danger/destructive button
   */
  Danger: (props: Omit<ButtonProps, 'variant'>) => (
    <Button variant="danger" {...props} />
  ),

  /**
   * Small button
   */
  Small: (props: Omit<ButtonProps, 'size'>) => (
    <Button size="sm" {...props} />
  ),

  /**
   * Large button
   */
  Large: (props: Omit<ButtonProps, 'size'>) => (
    <Button size="lg" {...props} />
  ),

  /**
   * Full width button
   */
  FullWidth: (props: Omit<ButtonProps, 'fullWidth'>) => (
    <Button fullWidth {...props} />
  ),
};

// ========================
// EXPORTS
// ========================

export default Button;

// Type exports
export type { ButtonProps, ButtonVariant, ButtonSize, IconPosition };