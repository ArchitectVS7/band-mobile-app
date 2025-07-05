/**
 * METAL PORTAL - INPUT COMPONENT
 * 
 * Comprehensive input component using Metal Portal design system
 * Supports validation, icons, and multiple states
 * 
 * FEATURES:
 * - Multiple input types (text, password, email, etc.)
 * - Built-in validation with error states
 * - Icon support (left and right icons)
 * - Label and helper text
 * - Focus states with Metal Portal styling
 * - Disabled states
 * - Multiline support (textarea)
 * - Character counter
 * - Accessibility features
 * - Type-safe props with TypeScript
 */

import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  TextInputProps,
  ViewStyle,
  TextStyle,
  KeyboardType,
  ReturnKeyType,
  Animated,
} from 'react-native';
import { metalPortalColors } from '../../design-system/colors';
import { metalPortalTypography } from '../../design-system/typography';
import { metalPortalSpacing } from '../../design-system/spacing';

// ========================
// TYPES & INTERFACES
// ========================

/**
 * Input variant types
 */
type InputVariant = 'default' | 'filled' | 'outlined';

/**
 * Input size types
 */
type InputSize = 'sm' | 'md' | 'lg';

/**
 * Input component props
 */
interface InputProps extends Omit<TextInputProps, 'style'> {
  /**
   * Input variant - determines styling approach
   * @default 'default'
   */
  variant?: InputVariant;

  /**
   * Input size - determines padding and font size
   * @default 'md'
   */
  size?: InputSize;

  /**
   * Label text displayed above input
   */
  label?: string;

  /**
   * Helper text displayed below input
   */
  helperText?: string;

  /**
   * Error message - when provided, input shows error state
   */
  error?: string;

  /**
   * Whether the input is required
   * @default false
   */
  required?: boolean;

  /**
   * Whether the input is disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * Icon component to display on the left
   */
  leftIcon?: React.ReactNode;

  /**
   * Icon component to display on the right
   */
  rightIcon?: React.ReactNode;

  /**
   * Whether to show character counter
   * @default false
   */
  showCharacterCount?: boolean;

  /**
   * Maximum character count
   */
  maxLength?: number;

  /**
   * Custom style overrides for container
   */
  containerStyle?: ViewStyle;

  /**
   * Custom style overrides for input
   */
  inputStyle?: TextStyle;

  /**
   * Custom style overrides for label
   */
  labelStyle?: TextStyle;

  /**
   * Test ID for testing
   */
  testID?: string;

  /**
   * Callback when right icon is pressed
   */
  onRightIconPress?: () => void;

  /**
   * Callback when left icon is pressed
   */
  onLeftIconPress?: () => void;
}

// ========================
// INPUT COMPONENT
// ========================

/**
 * Metal Portal Input Component
 * 
 * USAGE EXAMPLES:
 * ```tsx
 * // Basic input
 * <Input 
 *   label="Email"
 *   value={email}
 *   onChangeText={setEmail}
 *   keyboardType="email-address"
 * />
 * 
 * // Input with validation
 * <Input 
 *   label="Password"
 *   value={password}
 *   onChangeText={setPassword}
 *   secureTextEntry
 *   error={passwordError}
 *   required
 * />
 * 
 * // Input with icons
 * <Input 
 *   label="Search"
 *   leftIcon={<SearchIcon />}
 *   rightIcon={<ClearIcon />}
 *   onRightIconPress={() => setValue('')}
 * />
 * ```
 */
export const Input: React.FC<InputProps> = ({
  variant = 'default',
  size = 'md',
  label,
  helperText,
  error,
  required = false,
  disabled = false,
  leftIcon,
  rightIcon,
  showCharacterCount = false,
  maxLength,
  containerStyle,
  inputStyle,
  labelStyle,
  testID,
  onRightIconPress,
  onLeftIconPress,
  value,
  onChangeText,
  onFocus,
  onBlur,
  ...props
}) => {
  // Animation values for focus state
  const borderColorValue = React.useRef(new Animated.Value(0)).current;
  const labelPositionValue = React.useRef(new Animated.Value(value ? 1 : 0)).current;

  // Focus state
  const [isFocused, setIsFocused] = React.useState(false);

  // ========================
  // STYLE CALCULATIONS
  // ========================

  // Get input colors based on state
  const getInputColors = () => {
    const colors = metalPortalColors.component.input.default;
    
    if (error) {
      return {
        ...colors,
        border: colors.borderError,
        borderFocus: colors.borderError,
      };
    }

    if (disabled) {
      return {
        ...colors,
        background: metalPortalColors.semantic.interactive.disabled,
        text: metalPortalColors.semantic.text.muted,
      };
    }

    return colors;
  };

  // Get input spacing based on size
  const getInputSpacing = (size: InputSize) => {
    const spacing = metalPortalSpacing.component.input.padding;
    
    switch (size) {
      case 'sm':
        return { horizontal: spacing.horizontal * 0.75, vertical: spacing.vertical * 0.75 };
      case 'md':
        return { horizontal: spacing.horizontal, vertical: spacing.vertical };
      case 'lg':
        return { horizontal: spacing.horizontal * 1.25, vertical: spacing.vertical * 1.25 };
      default:
        return { horizontal: spacing.horizontal, vertical: spacing.vertical };
    }
  };

  // Get text style based on size
  const getTextStyle = (size: InputSize) => {
    const baseStyle = metalPortalTypography.styles.body.default;
    
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

  const inputColors = getInputColors();
  const inputSpacing = getInputSpacing(size);
  const inputTextStyle = getTextStyle(size);

  // ========================
  // EVENT HANDLERS
  // ========================

  const handleFocus = (event: any) => {
    setIsFocused(true);
    
    // Animate border color
    Animated.timing(borderColorValue, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }).start();

    // Animate label position if floating
    if (variant === 'outlined' && label) {
      Animated.timing(labelPositionValue, {
        toValue: 1,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }
    
    onFocus?.(event);
  };

  const handleBlur = (event: any) => {
    setIsFocused(false);
    
    // Animate border color back
    Animated.timing(borderColorValue, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false,
    }).start();

    // Animate label position if no value
    if (variant === 'outlined' && label && !value) {
      Animated.timing(labelPositionValue, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }
    
    onBlur?.(event);
  };

  const handleChangeText = (text: string) => {
    // Handle max length if specified
    if (maxLength && text.length > maxLength) {
      return;
    }
    
    onChangeText?.(text);
  };

  // ========================
  // RENDER HELPERS
  // ========================

  const renderLabel = () => {
    if (!label) return null;

    const labelTextStyle = {
      ...metalPortalTypography.styles.interactive.label,
      fontFamily: Array.isArray(metalPortalTypography.styles.interactive.label.fontFamily) 
        ? metalPortalTypography.styles.interactive.label.fontFamily[0] 
        : metalPortalTypography.styles.interactive.label.fontFamily,
      color: error 
        ? inputColors.borderError 
        : metalPortalColors.semantic.text.secondary,
    };

    return (
      <Text style={[labelTextStyle, labelStyle]}>
        {label}
        {required && <Text style={styles.required}> *</Text>}
      </Text>
    );
  };

  const renderHelperText = () => {
    const text = error || helperText;
    if (!text) return null;

    const helperTextStyle = {
      ...metalPortalTypography.styles.body.small,
      fontFamily: Array.isArray(metalPortalTypography.styles.body.small.fontFamily) 
        ? metalPortalTypography.styles.body.small.fontFamily[0] 
        : metalPortalTypography.styles.body.small.fontFamily,
      color: error 
        ? inputColors.borderError 
        : metalPortalColors.semantic.text.muted,
    };

    return (
      <Text style={helperTextStyle}>
        {text}
      </Text>
    );
  };

  const renderCharacterCount = () => {
    if (!showCharacterCount || !maxLength) return null;

    const count = value?.length || 0;
    const isNearLimit = count / maxLength > 0.8;
    const isOverLimit = count > maxLength;

    const countStyle = {
      ...metalPortalTypography.styles.body.caption,
      fontFamily: Array.isArray(metalPortalTypography.styles.body.caption.fontFamily) 
        ? metalPortalTypography.styles.body.caption.fontFamily[0] 
        : metalPortalTypography.styles.body.caption.fontFamily,
      color: isOverLimit 
        ? inputColors.borderError 
        : isNearLimit 
          ? metalPortalColors.semantic.state.warning
          : metalPortalColors.semantic.text.muted,
    };

    return (
      <Text style={countStyle}>
        {count}/{maxLength}
      </Text>
    );
  };

  // ========================
  // DYNAMIC STYLES
  // ========================

  const animatedBorderColor = borderColorValue.interpolate({
    inputRange: [0, 1],
    outputRange: [inputColors.border, inputColors.borderFocus],
  });

  const dynamicStyles = StyleSheet.create({
    container: {
      opacity: disabled ? 0.6 : 1,
    },
    inputContainer: {
      backgroundColor: inputColors.background,
      borderWidth: 1,
      borderRadius: metalPortalSpacing.semantic.radius.md,
      paddingHorizontal: inputSpacing.horizontal,
      paddingVertical: inputSpacing.vertical,
    },
    input: {
      ...inputTextStyle,
      color: inputColors.text,
      flex: 1,
      minHeight: size === 'lg' ? 24 : size === 'md' ? 20 : 16,
    },
  });

  const animatedInputContainerStyle = {
    ...dynamicStyles.inputContainer,
    borderColor: animatedBorderColor,
  };

  // ========================
  // RENDER COMPONENT
  // ========================

  return (
    <View style={[styles.container, dynamicStyles.container, containerStyle]} testID={testID}>
      {renderLabel()}
      
      <Animated.View style={[styles.inputContainer, animatedInputContainerStyle]}>
        {leftIcon && (
          <TouchableOpacity 
            style={styles.leftIcon}
            onPress={onLeftIconPress}
            disabled={!onLeftIconPress}
          >
            {leftIcon}
          </TouchableOpacity>
        )}
        
        <TextInput
          style={[dynamicStyles.input, inputStyle]}
          value={value}
          onChangeText={handleChangeText}
          onFocus={handleFocus}
          onBlur={handleBlur}
          editable={!disabled}
          placeholderTextColor={inputColors.placeholder}
          selectionColor={inputColors.borderFocus}
          {...props}
        />
        
        {rightIcon && (
          <TouchableOpacity 
            style={styles.rightIcon}
            onPress={onRightIconPress}
            disabled={!onRightIconPress}
          >
            {rightIcon}
          </TouchableOpacity>
        )}
      </Animated.View>

      <View style={styles.footer}>
        {renderHelperText()}
        {renderCharacterCount()}
      </View>
    </View>
  );
};

// ========================
// STYLES
// ========================

const styles = StyleSheet.create({
  container: {
    marginBottom: metalPortalSpacing.component.input.margin.bottom,
  },
  
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: metalPortalSpacing.component.input.margin.label,
  },
  
  leftIcon: {
    marginRight: metalPortalSpacing.base['2'],
  },
  
  rightIcon: {
    marginLeft: metalPortalSpacing.base['2'],
  },
  
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: metalPortalSpacing.base['1'],
    minHeight: 16,
  },
  
  required: {
    color: metalPortalColors.semantic.state.error,
  },
});

// ========================
// COMPONENT VARIATIONS
// ========================

/**
 * Pre-configured input variations for common use cases
 */
export const InputVariations = {
  /**
   * Email input
   */
  Email: (props: Omit<InputProps, 'keyboardType'>) => (
    <Input 
      keyboardType="email-address" 
      autoCapitalize="none"
      autoCorrect={false}
      {...props} 
    />
  ),

  /**
   * Password input
   */
  Password: (props: Omit<InputProps, 'secureTextEntry'>) => (
    <Input 
      secureTextEntry
      autoCapitalize="none"
      autoCorrect={false}
      {...props} 
    />
  ),

  /**
   * Phone number input
   */
  Phone: (props: Omit<InputProps, 'keyboardType'>) => (
    <Input 
      keyboardType="phone-pad"
      {...props} 
    />
  ),

  /**
   * Numeric input
   */
  Numeric: (props: Omit<InputProps, 'keyboardType'>) => (
    <Input 
      keyboardType="numeric"
      {...props} 
    />
  ),

  /**
   * Search input
   */
  Search: (props: Omit<InputProps, 'returnKeyType'>) => (
    <Input 
      returnKeyType="search"
      autoCorrect={false}
      {...props} 
    />
  ),

  /**
   * Multiline textarea
   */
  Textarea: (props: Omit<InputProps, 'multiline' | 'numberOfLines'>) => (
    <Input 
      multiline
      numberOfLines={4}
      textAlignVertical="top"
      {...props} 
    />
  ),
};

// ========================
// EXPORTS
// ========================

export default Input;

// Type exports
export type { InputProps, InputVariant, InputSize };