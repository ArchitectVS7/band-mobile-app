// Main types export file
// This file exports all application types for easy import

// Auth types
export type {
  LoginCredentials,
  RegisterCredentials,
  RegisterData,
  AuthUser,
  AuthTokens,
  AuthResponse,
  RefreshTokenResponse,
  ResetPasswordRequest,
  ResetPasswordConfirm,
  ChangePasswordRequest,
  BiometricAuthConfig,
  UserRole,
  SubscriptionTier,
  SubscriptionStatus,
  AuthState,
  AuthActions,
  User as AuthUserType
} from './auth';

// User types
export type {
  User,
  UserProfile,
  UpdateUserProfile,
  UserSession,
  UserStatistics,
  UserPreferences,
  UserSearchResult,
  UserActivity
} from './user';

// Post types
export * from './post';

// Forum types
export * from './forum';

// Chat types
export * from './chat';

// Event types
export * from './event';

// TODO: Fix type exports after Phase 3 completion
// API types (excluding conflicting ones)
// export type {
//   ApiError,
//   ApiClient,
//   ApiEndpoints,
//   ApiResponse,
//   PaginationParams,
//   SearchParams
// } from './api';

// Common types (excluding conflicting ones)
// export type {
//   BaseEntity,
//   Timestamps,
//   PaginationParams,
//   SearchParams,
//   FileUpload,
//   ImageUpload,
//   VideoUpload,
//   AudioUpload,
//   ErrorResponse,
//   SuccessResponse,
//   ValidationError,
//   Permission,
//   RolePermission
// } from './common';