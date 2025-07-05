import { UserRole, SubscriptionTier } from '../types/auth';

/**
 * PERMISSIONS UTILITIES
 * 
 * Helper functions for permission management:
 * - Role-based access control
 * - Feature permissions
 * - Content access control
 * - Administrative permissions
 */

/**
 * Permission types
 */
export enum Permission {
  // Content permissions
  READ_POSTS = 'READ_POSTS',
  CREATE_POSTS = 'CREATE_POSTS',
  EDIT_POSTS = 'EDIT_POSTS',
  DELETE_POSTS = 'DELETE_POSTS',
  
  // Comment permissions
  READ_COMMENTS = 'READ_COMMENTS',
  CREATE_COMMENTS = 'CREATE_COMMENTS',
  EDIT_COMMENTS = 'EDIT_COMMENTS',
  DELETE_COMMENTS = 'DELETE_COMMENTS',
  
  // Forum permissions
  READ_FORUM = 'READ_FORUM',
  CREATE_FORUM_POSTS = 'CREATE_FORUM_POSTS',
  MODERATE_FORUM = 'MODERATE_FORUM',
  
  // Chat permissions
  READ_CHAT = 'READ_CHAT',
  SEND_MESSAGES = 'SEND_MESSAGES',
  CREATE_CHAT_ROOMS = 'CREATE_CHAT_ROOMS',
  MODERATE_CHAT = 'MODERATE_CHAT',
  
  // Premium content
  ACCESS_PREMIUM_CONTENT = 'ACCESS_PREMIUM_CONTENT',
  ACCESS_VIP_CONTENT = 'ACCESS_VIP_CONTENT',
  
  // Administrative
  MANAGE_USERS = 'MANAGE_USERS',
  MANAGE_CONTENT = 'MANAGE_CONTENT',
  VIEW_ANALYTICS = 'VIEW_ANALYTICS',
  SYSTEM_ADMIN = 'SYSTEM_ADMIN',
}

/**
 * Role-based permissions mapping
 */
const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  [UserRole.GUEST]: [
    Permission.READ_POSTS,
    Permission.READ_COMMENTS,
    Permission.READ_FORUM,
  ],
  
  [UserRole.FAN]: [
    Permission.READ_POSTS,
    Permission.CREATE_COMMENTS,
    Permission.READ_COMMENTS,
    Permission.EDIT_COMMENTS,
    Permission.READ_FORUM,
    Permission.CREATE_FORUM_POSTS,
    Permission.READ_CHAT,
    Permission.SEND_MESSAGES,
  ],
  
  [UserRole.PREMIUM_FAN]: [
    Permission.READ_POSTS,
    Permission.CREATE_COMMENTS,
    Permission.READ_COMMENTS,
    Permission.EDIT_COMMENTS,
    Permission.READ_FORUM,
    Permission.CREATE_FORUM_POSTS,
    Permission.READ_CHAT,
    Permission.SEND_MESSAGES,
    Permission.ACCESS_PREMIUM_CONTENT,
  ],
  
  [UserRole.VIP_FAN]: [
    Permission.READ_POSTS,
    Permission.CREATE_COMMENTS,
    Permission.READ_COMMENTS,
    Permission.EDIT_COMMENTS,
    Permission.READ_FORUM,
    Permission.CREATE_FORUM_POSTS,
    Permission.READ_CHAT,
    Permission.SEND_MESSAGES,
    Permission.CREATE_CHAT_ROOMS,
    Permission.ACCESS_PREMIUM_CONTENT,
    Permission.ACCESS_VIP_CONTENT,
  ],
  
  [UserRole.MODERATOR]: [
    Permission.READ_POSTS,
    Permission.CREATE_COMMENTS,
    Permission.READ_COMMENTS,
    Permission.EDIT_COMMENTS,
    Permission.DELETE_COMMENTS,
    Permission.READ_FORUM,
    Permission.CREATE_FORUM_POSTS,
    Permission.MODERATE_FORUM,
    Permission.READ_CHAT,
    Permission.SEND_MESSAGES,
    Permission.CREATE_CHAT_ROOMS,
    Permission.MODERATE_CHAT,
    Permission.ACCESS_PREMIUM_CONTENT,
    Permission.ACCESS_VIP_CONTENT,
    Permission.MANAGE_CONTENT,
  ],
  
  [UserRole.BAND_MEMBER]: [
    Permission.READ_POSTS,
    Permission.CREATE_POSTS,
    Permission.EDIT_POSTS,
    Permission.CREATE_COMMENTS,
    Permission.READ_COMMENTS,
    Permission.EDIT_COMMENTS,
    Permission.DELETE_COMMENTS,
    Permission.READ_FORUM,
    Permission.CREATE_FORUM_POSTS,
    Permission.MODERATE_FORUM,
    Permission.READ_CHAT,
    Permission.SEND_MESSAGES,
    Permission.CREATE_CHAT_ROOMS,
    Permission.MODERATE_CHAT,
    Permission.ACCESS_PREMIUM_CONTENT,
    Permission.ACCESS_VIP_CONTENT,
    Permission.VIEW_ANALYTICS,
  ],
  
  [UserRole.ADMIN]: [
    Permission.READ_POSTS,
    Permission.CREATE_POSTS,
    Permission.EDIT_POSTS,
    Permission.DELETE_POSTS,
    Permission.CREATE_COMMENTS,
    Permission.READ_COMMENTS,
    Permission.EDIT_COMMENTS,
    Permission.DELETE_COMMENTS,
    Permission.READ_FORUM,
    Permission.CREATE_FORUM_POSTS,
    Permission.MODERATE_FORUM,
    Permission.READ_CHAT,
    Permission.SEND_MESSAGES,
    Permission.CREATE_CHAT_ROOMS,
    Permission.MODERATE_CHAT,
    Permission.ACCESS_PREMIUM_CONTENT,
    Permission.ACCESS_VIP_CONTENT,
    Permission.MANAGE_USERS,
    Permission.MANAGE_CONTENT,
    Permission.VIEW_ANALYTICS,
    Permission.SYSTEM_ADMIN,
  ],
};

/**
 * Check if user has specific permission
 */
export const hasPermission = (userRole: UserRole, permission: Permission): boolean => {
  const rolePermissions = ROLE_PERMISSIONS[userRole] || [];
  return rolePermissions.includes(permission);
};

/**
 * Check if user has any of the specified permissions
 */
export const hasAnyPermission = (userRole: UserRole, permissions: Permission[]): boolean => {
  return permissions.some(permission => hasPermission(userRole, permission));
};

/**
 * Check if user has all of the specified permissions
 */
export const hasAllPermissions = (userRole: UserRole, permissions: Permission[]): boolean => {
  return permissions.every(permission => hasPermission(userRole, permission));
};

/**
 * Get all permissions for a user role
 */
export const getUserPermissions = (userRole: UserRole): Permission[] => {
  return ROLE_PERMISSIONS[userRole] || [];
};

/**
 * Check if user can access premium features
 */
export const canAccessPremium = (userRole: UserRole, subscriptionTier: SubscriptionTier): boolean => {
  return hasPermission(userRole, Permission.ACCESS_PREMIUM_CONTENT) || 
         subscriptionTier === SubscriptionTier.PREMIUM || 
         subscriptionTier === SubscriptionTier.VIP;
};

/**
 * Check if user can access VIP features
 */
export const canAccessVIP = (userRole: UserRole, subscriptionTier: SubscriptionTier): boolean => {
  return hasPermission(userRole, Permission.ACCESS_VIP_CONTENT) || 
         subscriptionTier === SubscriptionTier.VIP;
};

/**
 * Check if user can moderate content
 */
export const canModerate = (userRole: UserRole): boolean => {
  return hasPermission(userRole, Permission.MODERATE_FORUM) || 
         hasPermission(userRole, Permission.MODERATE_CHAT);
};

/**
 * Check if user is admin
 */
export const isAdmin = (userRole: UserRole): boolean => {
  return hasPermission(userRole, Permission.SYSTEM_ADMIN);
};

/**
 * Check if user can manage other users
 */
export const canManageUsers = (userRole: UserRole): boolean => {
  return hasPermission(userRole, Permission.MANAGE_USERS);
};

/**
 * Check if user can view analytics
 */
export const canViewAnalytics = (userRole: UserRole): boolean => {
  return hasPermission(userRole, Permission.VIEW_ANALYTICS);
};

/**
 * Permission display names
 */
export const getPermissionDisplayName = (permission: Permission): string => {
  const displayNames: Record<Permission, string> = {
    [Permission.READ_POSTS]: 'Read Posts',
    [Permission.CREATE_POSTS]: 'Create Posts',
    [Permission.EDIT_POSTS]: 'Edit Posts',
    [Permission.DELETE_POSTS]: 'Delete Posts',
    [Permission.READ_COMMENTS]: 'Read Comments',
    [Permission.CREATE_COMMENTS]: 'Create Comments',
    [Permission.EDIT_COMMENTS]: 'Edit Comments',
    [Permission.DELETE_COMMENTS]: 'Delete Comments',
    [Permission.READ_FORUM]: 'Read Forum',
    [Permission.CREATE_FORUM_POSTS]: 'Create Forum Posts',
    [Permission.MODERATE_FORUM]: 'Moderate Forum',
    [Permission.READ_CHAT]: 'Read Chat',
    [Permission.SEND_MESSAGES]: 'Send Messages',
    [Permission.CREATE_CHAT_ROOMS]: 'Create Chat Rooms',
    [Permission.MODERATE_CHAT]: 'Moderate Chat',
    [Permission.ACCESS_PREMIUM_CONTENT]: 'Access Premium Content',
    [Permission.ACCESS_VIP_CONTENT]: 'Access VIP Content',
    [Permission.MANAGE_USERS]: 'Manage Users',
    [Permission.MANAGE_CONTENT]: 'Manage Content',
    [Permission.VIEW_ANALYTICS]: 'View Analytics',
    [Permission.SYSTEM_ADMIN]: 'System Admin',
  };
  
  return displayNames[permission] || 'Unknown Permission';
};