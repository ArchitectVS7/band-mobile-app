import { UserRole, SubscriptionTier } from '../types/auth';

/**
 * AUTHENTICATION UTILITIES
 * 
 * Helper functions for authentication operations:
 * - Token validation
 * - Role-based access control
 * - Permission checking
 * - Auth status helpers
 */

/**
 * Check if user has required role
 * Role hierarchy: ADMIN > BAND_MEMBER > MODERATOR > VIP_FAN > PREMIUM_FAN > FAN > GUEST
 */
export const hasRole = (userRole: UserRole, requiredRole: UserRole): boolean => {
  const roleHierarchy = {
    [UserRole.GUEST]: 0,
    [UserRole.FAN]: 1,
    [UserRole.PREMIUM_FAN]: 2,
    [UserRole.VIP_FAN]: 3,
    [UserRole.MODERATOR]: 4,
    [UserRole.BAND_MEMBER]: 5,
    [UserRole.ADMIN]: 6,
  };

  return roleHierarchy[userRole] >= roleHierarchy[requiredRole];
};

/**
 * Check if user has subscription tier or higher
 */
export const hasSubscriptionTier = (userTier: SubscriptionTier, requiredTier: SubscriptionTier): boolean => {
  const tierHierarchy = {
    [SubscriptionTier.FREE]: 0,
    [SubscriptionTier.PREMIUM]: 1,
    [SubscriptionTier.VIP]: 2,
  };

  return tierHierarchy[userTier] >= tierHierarchy[requiredTier];
};

/**
 * Check if JWT token is expired
 */
export const isTokenExpired = (token: string): boolean => {
  if (!token) return true;
  
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const currentTime = Date.now() / 1000;
    
    return payload.exp < currentTime;
  } catch {
    return true;
  }
};

/**
 * Extract user ID from JWT token
 */
export const getUserIdFromToken = (token: string): string | null => {
  if (!token) return null;
  
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.sub || null;
  } catch {
    return null;
  }
};

/**
 * Check if user can access premium content
 */
export const canAccessPremiumContent = (userRole: UserRole, userTier: SubscriptionTier): boolean => {
  return hasRole(userRole, UserRole.PREMIUM_FAN) || hasSubscriptionTier(userTier, SubscriptionTier.PREMIUM);
};

/**
 * Check if user can access VIP content
 */
export const canAccessVIPContent = (userRole: UserRole, userTier: SubscriptionTier): boolean => {
  return hasRole(userRole, UserRole.VIP_FAN) || hasSubscriptionTier(userTier, SubscriptionTier.VIP);
};

/**
 * Check if user can moderate content
 */
export const canModerateContent = (userRole: UserRole): boolean => {
  return hasRole(userRole, UserRole.MODERATOR);
};

/**
 * Check if user can manage users
 */
export const canManageUsers = (userRole: UserRole): boolean => {
  return hasRole(userRole, UserRole.ADMIN);
};

/**
 * Get user display name based on role
 */
export const getUserRoleDisplayName = (role: UserRole): string => {
  const roleNames = {
    [UserRole.GUEST]: 'Guest',
    [UserRole.FAN]: 'Fan',
    [UserRole.PREMIUM_FAN]: 'Premium Fan',
    [UserRole.VIP_FAN]: 'VIP Fan',
    [UserRole.MODERATOR]: 'Moderator',
    [UserRole.BAND_MEMBER]: 'Band Member',
    [UserRole.ADMIN]: 'Admin',
  };

  return roleNames[role] || 'Unknown';
};

/**
 * Get subscription tier display name
 */
export const getSubscriptionTierDisplayName = (tier: SubscriptionTier): string => {
  const tierNames = {
    [SubscriptionTier.FREE]: 'Free',
    [SubscriptionTier.PREMIUM]: 'Premium',
    [SubscriptionTier.VIP]: 'VIP',
  };

  return tierNames[tier] || 'Unknown';
};

/**
 * Check if user session is still valid
 */
export const isValidSession = (token: string | null, refreshToken: string | null): boolean => {
  if (!token || !refreshToken) return false;
  
  // If access token is expired, check if refresh token is still valid
  if (isTokenExpired(token)) {
    return !isTokenExpired(refreshToken);
  }
  
  return true;
};