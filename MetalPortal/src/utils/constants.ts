// Application constants and configuration

// API Configuration
export const API_CONFIG = {
  BASE_URL: process.env.EXPO_PUBLIC_API_BASE_URL || 'http://localhost:3000/api',
  TIMEOUT: 30000,
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000,
} as const;

// Authentication
export const AUTH_CONFIG = {
  TOKEN_STORAGE_KEY: 'auth_tokens',
  USER_STORAGE_KEY: 'auth_user',
  BIOMETRIC_STORAGE_KEY: 'biometric_enabled',
  ACCESS_TOKEN_EXPIRY: 15 * 60 * 1000, // 15 minutes
  REFRESH_TOKEN_EXPIRY: 7 * 24 * 60 * 60 * 1000, // 7 days
  TOKEN_REFRESH_THRESHOLD: 5 * 60 * 1000, // 5 minutes before expiry
} as const;

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 20,
  MAX_PAGE_SIZE: 100,
  MIN_PAGE_SIZE: 5,
} as const;

// File Upload
export const FILE_UPLOAD = {
  MAX_IMAGE_SIZE: 10 * 1024 * 1024, // 10MB
  MAX_VIDEO_SIZE: 100 * 1024 * 1024, // 100MB
  MAX_AUDIO_SIZE: 50 * 1024 * 1024, // 50MB
  MAX_FILE_SIZE: 25 * 1024 * 1024, // 25MB
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  ALLOWED_VIDEO_TYPES: ['video/mp4', 'video/webm', 'video/mov'],
  ALLOWED_AUDIO_TYPES: ['audio/mp3', 'audio/wav', 'audio/m4a', 'audio/ogg'],
  ALLOWED_FILE_TYPES: ['application/pdf', 'text/plain', 'application/zip'],
} as const;

// Chat Configuration
export const CHAT_CONFIG = {
  MESSAGE_PAGE_SIZE: 50,
  TYPING_INDICATOR_TIMEOUT: 3000, // 3 seconds
  RECONNECT_INTERVAL: 5000, // 5 seconds
  MAX_MESSAGE_LENGTH: 2000,
  MAX_ROOM_NAME_LENGTH: 50,
} as const;

// Forum Configuration
export const FORUM_CONFIG = {
  POST_PAGE_SIZE: 25,
  COMMENT_PAGE_SIZE: 50,
  MAX_POST_TITLE_LENGTH: 200,
  MAX_POST_CONTENT_LENGTH: 10000,
  MAX_COMMENT_LENGTH: 2000,
} as const;

// Event Configuration
export const EVENT_CONFIG = {
  EVENT_PAGE_SIZE: 20,
  MAX_EVENT_TITLE_LENGTH: 100,
  MAX_EVENT_DESCRIPTION_LENGTH: 2000,
  REMINDER_OPTIONS: [
    { label: '15 minutes before', value: 15 * 60 * 1000 },
    { label: '1 hour before', value: 60 * 60 * 1000 },
    { label: '1 day before', value: 24 * 60 * 60 * 1000 },
    { label: '1 week before', value: 7 * 24 * 60 * 60 * 1000 },
  ],
} as const;

// Subscription Tiers
export const SUBSCRIPTION_TIERS = {
  FREE: {
    name: 'Free',
    price: 0,
    features: [
      'Access to public content',
      'Basic forum participation',
      'Standard chat rooms',
      'Event announcements',
    ],
  },
  PREMIUM: {
    name: 'Premium',
    price: 9.99,
    features: [
      'All free features',
      'Early access to releases',
      'Exclusive behind-the-scenes content',
      'Priority event tickets',
      'Enhanced chat features',
    ],
  },
  VIP: {
    name: 'VIP',
    price: 19.99,
    features: [
      'All premium features',
      'Direct messaging with band members',
      'Exclusive meetup invitations',
      'Limited edition merchandise access',
      'VIP-only events',
      'Custom avatar and badges',
    ],
  },
} as const;

// Theme Colors (Metal theme)
export const THEME_COLORS = {
  // Primary Colors
  DEEP_BLACK: '#0A0A0A',
  CHARCOAL: '#1A1A1A',
  DARK_GRAY: '#2A2A2A',
  
  // Accent Colors
  BLOOD_RED: '#8B0000',
  CRIMSON: '#DC143C',
  DARK_RED: '#660000',
  
  // Neutral Colors
  BONE_WHITE: '#F5F5DC',
  SILVER: '#C0C0C0',
  LIGHT_GRAY: '#CCCCCC',
  
  // Semantic Colors
  SUCCESS: '#28A745',
  WARNING: '#FFC107',
  ERROR: '#DC3545',
  INFO: '#17A2B8',
} as const;

// Typography
export const TYPOGRAPHY = {
  FONT_SIZES: {
    H1: 32,
    H2: 24,
    H3: 20,
    H4: 18,
    BODY: 16,
    SMALL: 14,
    CAPTION: 12,
  },
  LINE_HEIGHTS: {
    TIGHT: 1.2,
    NORMAL: 1.5,
    RELAXED: 1.8,
  },
  FONT_WEIGHTS: {
    LIGHT: '300',
    NORMAL: '400',
    MEDIUM: '500',
    BOLD: '700',
    BLACK: '900',
  },
} as const;

// Spacing
export const SPACING = {
  XS: 4,
  SM: 8,
  MD: 16,
  LG: 24,
  XL: 32,
  XXL: 48,
} as const;

// Border Radius
export const BORDER_RADIUS = {
  SM: 4,
  MD: 8,
  LG: 12,
  XL: 16,
  ROUND: 9999,
} as const;

// Animation Durations
export const ANIMATION = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500,
  EXTRA_SLOW: 1000,
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
  FORBIDDEN: 'Access denied.',
  NOT_FOUND: 'The requested resource was not found.',
  SERVER_ERROR: 'Something went wrong on our end. Please try again later.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  FILE_TOO_LARGE: 'File size exceeds the maximum allowed limit.',
  INVALID_FILE_TYPE: 'Invalid file type. Please select a supported file.',
  FORM_VALIDATION_ERROR: 'Please fix the errors below and try again.',
} as const;

// Success Messages
export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'Welcome back!',
  REGISTER_SUCCESS: 'Account created successfully!',
  LOGOUT_SUCCESS: 'Logged out successfully.',
  PROFILE_UPDATED: 'Profile updated successfully.',
  PASSWORD_CHANGED: 'Password changed successfully.',
  POST_CREATED: 'Post created successfully.',
  POST_UPDATED: 'Post updated successfully.',
  POST_DELETED: 'Post deleted successfully.',
  COMMENT_ADDED: 'Comment added successfully.',
  RSVP_UPDATED: 'RSVP updated successfully.',
} as const;

// Regular Expressions
export const REGEX = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  USERNAME: /^[a-zA-Z0-9_]{3,20}$/,
  PHONE: /^\+?[\d\s-()]+$/,
  URL: /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/,
  HEX_COLOR: /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,
} as const;

// Feature Flags
export const FEATURE_FLAGS = {
  BIOMETRIC_AUTH: true,
  PUSH_NOTIFICATIONS: true,
  DARK_MODE: true,
  OFFLINE_MODE: false,
  CHAT_FEATURE: true,
  FORUM_FEATURE: true,
  EVENTS_FEATURE: true,
  PAYMENTS_FEATURE: true,
  ANALYTICS: false,
} as const;

// Debug Configuration
export const DEBUG = {
  ENABLED: __DEV__,
  LOG_API_REQUESTS: __DEV__,
  LOG_NAVIGATION: __DEV__,
  LOG_STATE_CHANGES: __DEV__,
  MOCK_API: __DEV__,
} as const;