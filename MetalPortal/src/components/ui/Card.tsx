/**
 * METAL PORTAL - CARD COMPONENT
 * 
 * Comprehensive card component using Metal Portal design system
 * Supports multiple variants, shadows, and interactive states
 * 
 * FEATURES:
 * - Multiple variants (default, elevated, featured, outline)
 * - Interactive states (pressable, hover)
 * - Shadow elevations optimized for metal aesthetic
 * - Header and footer sections
 * - Image support with overlay
 * - Loading states
 * - Accessibility features
 * - Type-safe props with TypeScript
 */

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ImageSourcePropType,
  Image,
  ActivityIndicator,
  Pressable,
  PressableProps,
} from 'react-native';
import { metalPortalColors } from '../../design-system/colors';
import { metalPortalTypography } from '../../design-system/typography';
import { metalPortalSpacing } from '../../design-system/spacing';

// ========================
// TYPES & INTERFACES
// ========================

/**
 * Card variant types
 */
type CardVariant = 'default' | 'elevated' | 'featured' | 'outline';

/**
 * Card size types
 */
type CardSize = 'sm' | 'md' | 'lg';

/**
 * Card component props
 */
interface CardProps extends Omit<PressableProps, 'style'> {
  /**
   * Card variant - determines styling and elevation
   * @default 'default'
   */
  variant?: CardVariant;

  /**
   * Card size - determines padding and spacing
   * @default 'md'
   */
  size?: CardSize;

  /**
   * Card content
   */
  children: React.ReactNode;

  /**
   * Card title
   */
  title?: string;

  /**
   * Card subtitle
   */
  subtitle?: string;

  /**
   * Card header content (custom component)
   */
  header?: React.ReactNode;

  /**
   * Card footer content (custom component)
   */
  footer?: React.ReactNode;

  /**
   * Image source for card image
   */
  image?: ImageSourcePropType;

  /**
   * Image overlay text
   */
  imageOverlay?: string;

  /**
   * Whether the card is loading
   * @default false
   */
  loading?: boolean;

  /**
   * Whether the card is disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * Whether the card is pressable
   * @default false
   */
  pressable?: boolean;

  /**
   * Custom style overrides for card container
   */
  style?: ViewStyle;

  /**
   * Custom style overrides for card content
   */
  contentStyle?: ViewStyle;

  /**
   * Custom style overrides for title
   */
  titleStyle?: TextStyle;

  /**
   * Custom style overrides for subtitle
   */
  subtitleStyle?: TextStyle;

  /**
   * Test ID for testing
   */
  testID?: string;
}

// ========================
// CARD COMPONENT
// ========================

/**
 * Metal Portal Card Component
 * 
 * USAGE EXAMPLES:
 * ```tsx
 * // Basic card
 * <Card title="Basic Card">
 *   <Text>Card content goes here</Text>
 * </Card>
 * 
 * // Elevated card with image
 * <Card 
 *   variant="elevated"
 *   title="Album Release"
 *   subtitle="New single available now"
 *   image={albumCover}
 *   pressable
 *   onPress={() => navigate('Album')}
 * >
 *   <Text>Album description...</Text>
 * </Card>
 * 
 * // Featured card
 * <Card 
 *   variant="featured"
 *   title="VIP Access"
 *   footer={<Button>Join VIP</Button>}
 * >
 *   <Text>Get exclusive content and early access</Text>
 * </Card>
 * ```
 */
export const Card: React.FC<CardProps> = ({
  variant = 'default',
  size = 'md',
  children,
  title,
  subtitle,
  header,
  footer,
  image,
  imageOverlay,
  loading = false,
  disabled = false,
  pressable = false,
  style,
  contentStyle,
  titleStyle,
  subtitleStyle,
  testID,
  onPress,
  ...props
}) => {
  // ========================
  // STYLE CALCULATIONS
  // ========================

  // Get card colors based on variant
  const getCardColors = (variant: CardVariant) => {
    const colors = metalPortalColors.component.card;
    
    switch (variant) {
      case 'default':
        return colors.default;
      case 'elevated':
        return colors.elevated;
      case 'featured':
        return colors.featured;
      case 'outline':
        return {
          ...colors.default,
          border: metalPortalColors.semantic.border.accent,
        };
      default:
        return colors.default;
    }
  };

  // Get card spacing based on size
  const getCardSpacing = (size: CardSize) => {
    const spacing = metalPortalSpacing.component.card.padding;
    
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

  // Get text styles
  const getTitleStyle = () => {
    const baseStyle = metalPortalTypography.styles.heading.h4;
    return {
      ...baseStyle,
      fontFamily: Array.isArray(baseStyle.fontFamily) 
        ? baseStyle.fontFamily[0] 
        : baseStyle.fontFamily,
      color: metalPortalColors.semantic.text.primary,
    };
  };

  const getSubtitleStyle = () => {
    const baseStyle = metalPortalTypography.styles.body.small;
    return {
      ...baseStyle,
      fontFamily: Array.isArray(baseStyle.fontFamily) 
        ? baseStyle.fontFamily[0] 
        : baseStyle.fontFamily,
      color: metalPortalColors.semantic.text.secondary,
    };
  };

  const cardColors = getCardColors(variant);
  const cardSpacing = getCardSpacing(size);
  const titleTextStyle = getTitleStyle();
  const subtitleTextStyle = getSubtitleStyle();

  // ========================
  // RENDER HELPERS
  // ========================

  const renderImage = () => {
    if (!image) return null;

    return (
      <View style={styles.imageContainer}>
        <Image 
          source={image} 
          style={styles.image}
          resizeMode="cover"
        />
        {imageOverlay && (
          <View style={styles.imageOverlay}>
            <Text style={styles.imageOverlayText}>
              {imageOverlay}
            </Text>
          </View>
        )}
      </View>
    );
  };

  const renderHeader = () => {
    if (header) {
      return (
        <View style={styles.header}>
          {header}
        </View>
      );
    }

    if (title || subtitle) {
      return (
        <View style={styles.header}>
          {title && (
            <Text style={[titleTextStyle, titleStyle]}>
              {title}
            </Text>
          )}
          {subtitle && (
            <Text style={[subtitleTextStyle, subtitleStyle]}>
              {subtitle}
            </Text>
          )}
        </View>
      );
    }

    return null;
  };

  const renderContent = () => {
    if (loading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator 
            size="large" 
            color={metalPortalColors.semantic.interactive.primary}
          />
        </View>
      );
    }

    return (
      <View style={[styles.content, contentStyle]}>
        {children}
      </View>
    );
  };

  const renderFooter = () => {
    if (!footer) return null;

    return (
      <View style={styles.footer}>
        {footer}
      </View>
    );
  };

  // ========================
  // DYNAMIC STYLES
  // ========================

  const dynamicStyles = StyleSheet.create({
    card: {
      backgroundColor: cardColors.background,
      borderColor: cardColors.border,
      borderWidth: cardColors.border.includes('transparent') ? 0 : 1,
      borderRadius: metalPortalSpacing.semantic.radius.lg,
      padding: cardSpacing,
      opacity: disabled ? 0.6 : 1,
      shadowColor: '#000000',
      shadowOffset: {
        width: 0,
        height: variant === 'elevated' ? 8 : variant === 'featured' ? 12 : 4,
      },
      shadowOpacity: variant === 'elevated' ? 0.3 : variant === 'featured' ? 0.4 : 0.2,
      shadowRadius: variant === 'elevated' ? 12 : variant === 'featured' ? 16 : 8,
      elevation: variant === 'elevated' ? 8 : variant === 'featured' ? 12 : 4,
    },
  });

  // Add featured card glow effect
  const cardStyle = [
    styles.card,
    dynamicStyles.card,
    variant === 'featured' && styles.featuredCard,
    style,
  ];

  // ========================
  // RENDER COMPONENT
  // ========================

  // If pressable, wrap in Pressable
  if (pressable && onPress) {
    return (
      <Pressable
        style={({ pressed }) => [
          cardStyle,
          pressed && styles.pressed,
        ]}
        onPress={onPress}
        disabled={disabled || loading}
        testID={testID}
        {...props}
      >
        {renderImage()}
        {renderHeader()}
        {renderContent()}
        {renderFooter()}
      </Pressable>
    );
  }

  // Otherwise, render as regular View
  return (
    <View 
      style={cardStyle}
      testID={testID}
    >
      {renderImage()}
      {renderHeader()}
      {renderContent()}
      {renderFooter()}
    </View>
  );
};

// ========================
// STYLES
// ========================

const styles = StyleSheet.create({
  card: {
    marginBottom: metalPortalSpacing.component.card.margin.between,
  },
  
  featuredCard: {
    borderColor: metalPortalColors.semantic.interactive.primary,
    borderWidth: 2,
    shadowColor: metalPortalColors.semantic.interactive.primary,
  },
  
  pressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  
  imageContainer: {
    marginBottom: metalPortalSpacing.base['4'],
    borderRadius: metalPortalSpacing.semantic.radius.md,
    overflow: 'hidden',
  },
  
  image: {
    width: '100%',
    height: 200,
  },
  
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  imageOverlayText: {
    ...metalPortalTypography.styles.heading.h3,
    fontFamily: Array.isArray(metalPortalTypography.styles.heading.h3.fontFamily) 
      ? metalPortalTypography.styles.heading.h3.fontFamily[0] 
      : metalPortalTypography.styles.heading.h3.fontFamily,
    color: metalPortalColors.primitive.bone['100'],
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  
  header: {
    marginBottom: metalPortalSpacing.base['3'],
  },
  
  content: {
    flex: 1,
  },
  
  footer: {
    marginTop: metalPortalSpacing.base['4'],
    paddingTop: metalPortalSpacing.base['4'],
    borderTopWidth: 1,
    borderTopColor: metalPortalColors.semantic.border.light,
  },
  
  loadingContainer: {
    padding: metalPortalSpacing.base['8'],
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  // VIP specific styles
  vipButton: {
    backgroundColor: metalPortalColors.semantic.interactive.primary,
    padding: metalPortalSpacing.base['3'],
    borderRadius: metalPortalSpacing.semantic.radius.md,
    alignItems: 'center',
  },
  
  vipButtonText: {
    ...metalPortalTypography.styles.interactive.button,
    fontFamily: Array.isArray(metalPortalTypography.styles.interactive.button.fontFamily) 
      ? metalPortalTypography.styles.interactive.button.fontFamily[0] 
      : metalPortalTypography.styles.interactive.button.fontFamily,
    color: metalPortalColors.primitive.bone['100'],
  },
  
  vipBenefit: {
    ...metalPortalTypography.styles.body.default,
    fontFamily: Array.isArray(metalPortalTypography.styles.body.default.fontFamily) 
      ? metalPortalTypography.styles.body.default.fontFamily[0] 
      : metalPortalTypography.styles.body.default.fontFamily,
    color: metalPortalColors.semantic.text.primary,
    marginBottom: metalPortalSpacing.base['2'],
  },
});

// ========================
// COMPONENT VARIATIONS
// ========================

/**
 * Pre-configured card variations for common use cases
 */
export const CardVariations = {
  /**
   * Default card
   */
  Default: (props: Omit<CardProps, 'variant'>) => (
    <Card variant="default" {...props} />
  ),

  /**
   * Elevated card with shadow
   */
  Elevated: (props: Omit<CardProps, 'variant'>) => (
    <Card variant="elevated" {...props} />
  ),

  /**
   * Featured card with accent border
   */
  Featured: (props: Omit<CardProps, 'variant'>) => (
    <Card variant="featured" {...props} />
  ),

  /**
   * Outline card
   */
  Outline: (props: Omit<CardProps, 'variant'>) => (
    <Card variant="outline" {...props} />
  ),

  /**
   * Pressable card
   */
  Pressable: (props: Omit<CardProps, 'pressable'>) => (
    <Card pressable {...props} />
  ),

  /**
   * Small card
   */
  Small: (props: Omit<CardProps, 'size'>) => (
    <Card size="sm" {...props} />
  ),

  /**
   * Large card
   */
  Large: (props: Omit<CardProps, 'size'>) => (
    <Card size="lg" {...props} />
  ),
};

// ========================
// SPECIALIZED CARDS
// ========================

/**
 * Specialized card components for Metal Portal specific use cases
 */
export const MetalCards = {
  /**
   * Album card for music content
   */
  Album: ({ albumTitle, artistName, coverImage, onPress, ...props }: {
    albumTitle: string;
    artistName: string;
    coverImage: ImageSourcePropType;
    onPress?: () => void;
  } & Omit<CardProps, 'title' | 'subtitle' | 'image' | 'pressable'>) => (
    <Card
      variant="elevated"
      title={albumTitle}
      subtitle={artistName}
      image={coverImage}
      pressable={!!onPress}
      onPress={onPress}
      {...props}
    />
  ),

  /**
   * Event card for concerts and shows
   */
  Event: ({ eventTitle, date, venue, posterImage, onPress, ...props }: {
    eventTitle: string;
    date: string;
    venue: string;
    posterImage?: ImageSourcePropType;
    onPress?: () => void;
  } & Omit<CardProps, 'title' | 'subtitle' | 'image' | 'pressable'>) => (
    <Card
      variant="featured"
      title={eventTitle}
      subtitle={`${date} • ${venue}`}
      image={posterImage}
      pressable={!!onPress}
      onPress={onPress}
      {...props}
    />
  ),

  /**
   * VIP card for premium content
   */
  VIP: ({ title, benefits, onJoin, ...props }: {
    title: string;
    benefits: string[];
    onJoin?: () => void;
  } & Omit<CardProps, 'title' | 'variant' | 'footer'>) => (
    <Card
      variant="featured"
      title={title}
      footer={
        onJoin && (
          <TouchableOpacity 
            style={styles.vipButton}
            onPress={onJoin}
          >
            <Text style={styles.vipButtonText}>
              Join VIP
            </Text>
          </TouchableOpacity>
        )
      }
      {...props}
    >
      <View>
        {benefits.map((benefit, index) => (
          <Text key={index} style={styles.vipBenefit}>
            • {benefit}
          </Text>
        ))}
      </View>
    </Card>
  ),
};



// ========================
// EXPORTS
// ========================

export default Card;

// Type exports
export type { CardProps, CardVariant, CardSize };