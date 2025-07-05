// Authentication types

export interface LoginCredentials {
  identifier: string; // email or username
  password: string;
  rememberMe?: boolean;
}

export interface RegisterCredentials {
  email: string;
  username: string;
  password: string;
  displayName?: string;
}

// Alias for backward compatibility
export type RegisterData = RegisterCredentials;

export interface AuthUser {
  id: string;
  email: string;
  username: string;
  displayName?: string;
  role: UserRole;
  subscriptionTier: SubscriptionTier;
  subscriptionStatus: SubscriptionStatus;
  avatar?: string;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface AuthResponse {
  user: AuthUser;
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface RefreshTokenResponse {
  accessToken: string;
  expiresIn: number;
}

// Alias for backward compatibility
export type User = AuthUser;

export interface ResetPasswordRequest {
  email: string;
}

export interface ResetPasswordConfirm {
  token: string;
  newPassword: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

export interface BiometricAuthConfig {
  enabled: boolean;
  type: 'fingerprint' | 'face' | 'both';
}

// Enums matching Prisma schema
export enum UserRole {
  GUEST = 'GUEST',
  FAN = 'FAN',
  PREMIUM_FAN = 'PREMIUM_FAN',
  VIP_FAN = 'VIP_FAN',
  MODERATOR = 'MODERATOR',
  BAND_MEMBER = 'BAND_MEMBER',
  ADMIN = 'ADMIN',
}

export enum SubscriptionTier {
  FREE = 'FREE',
  PREMIUM = 'PREMIUM',
  VIP = 'VIP',
}

export enum SubscriptionStatus {
  ACTIVE = 'ACTIVE',
  CANCELLED = 'CANCELLED',
  EXPIRED = 'EXPIRED',
  PAUSED = 'PAUSED',
}

// Auth state types
export interface AuthState {
  user: AuthUser | null;
  tokens: AuthTokens | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  biometricEnabled: boolean;
}

export interface AuthActions {
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
  logout: () => Promise<void>;
  refreshToken: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  confirmResetPassword: (token: string, newPassword: string) => Promise<void>;
  changePassword: (currentPassword: string, newPassword: string) => Promise<void>;
  enableBiometric: () => Promise<void>;
  disableBiometric: () => Promise<void>;
  biometricLogin: () => Promise<void>;
  clearError: () => void;
}