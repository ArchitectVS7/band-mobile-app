/**
 * NAVIGATION UTILITIES
 * 
 * Helper functions for navigation operations:
 * - Screen navigation
 * - Deep linking
 * - Route management
 * - Navigation guards
 */

/**
 * App route names
 */
export const ROUTES = {
  // Auth
  LOGIN: 'Login',
  REGISTER: 'Register',
  FORGOT_PASSWORD: 'ForgotPassword',
  
  // Main
  HOME: 'Home',
  PROFILE: 'Profile',
  SETTINGS: 'Settings',
  
  // Content
  POSTS: 'Posts',
  POST_DETAIL: 'PostDetail',
  CREATE_POST: 'CreatePost',
  
  // Forum
  FORUM: 'Forum',
  FORUM_CATEGORY: 'ForumCategory',
  FORUM_POST: 'ForumPost',
  
  // Chat
  CHAT: 'Chat',
  CHAT_ROOM: 'ChatRoom',
  DIRECT_MESSAGES: 'DirectMessages',
  
  // Events
  EVENTS: 'Events',
  EVENT_DETAIL: 'EventDetail',
  
  // Band
  BAND_PROFILE: 'BandProfile',
  BAND_MEDIA: 'BandMedia',
  
  // Admin
  ADMIN: 'Admin',
  USER_MANAGEMENT: 'UserManagement',
} as const;

export type RouteNames = typeof ROUTES[keyof typeof ROUTES];

/**
 * Navigation parameters for each route
 */
export interface NavigationParams {
  [ROUTES.LOGIN]: undefined;
  [ROUTES.REGISTER]: undefined;
  [ROUTES.FORGOT_PASSWORD]: undefined;
  [ROUTES.HOME]: undefined;
  [ROUTES.PROFILE]: { userId?: string };
  [ROUTES.SETTINGS]: undefined;
  [ROUTES.POSTS]: { category?: string };
  [ROUTES.POST_DETAIL]: { postId: string };
  [ROUTES.CREATE_POST]: { type?: string };
  [ROUTES.FORUM]: undefined;
  [ROUTES.FORUM_CATEGORY]: { categoryId: string };
  [ROUTES.FORUM_POST]: { postId: string };
  [ROUTES.CHAT]: undefined;
  [ROUTES.CHAT_ROOM]: { roomId: string };
  [ROUTES.DIRECT_MESSAGES]: { userId: string };
  [ROUTES.EVENTS]: undefined;
  [ROUTES.EVENT_DETAIL]: { eventId: string };
  [ROUTES.BAND_PROFILE]: { bandId?: string };
  [ROUTES.BAND_MEDIA]: { bandId?: string };
  [ROUTES.ADMIN]: undefined;
  [ROUTES.USER_MANAGEMENT]: undefined;
}

/**
 * Build navigation URL for deep linking
 */
export const buildDeepLink = (route: RouteNames, params?: any): string => {
  const baseUrl = 'metalportal://';
  
  if (!params) {
    return `${baseUrl}${route.toLowerCase()}`;
  }
  
  const queryString = Object.entries(params)
    .map(([key, value]) => `${key}=${encodeURIComponent(String(value))}`)
    .join('&');
    
  return `${baseUrl}${route.toLowerCase()}?${queryString}`;
};

/**
 * Parse deep link URL
 */
export const parseDeepLink = (url: string): { route: string; params: Record<string, string> } | null => {
  try {
    const urlObj = new URL(url);
    const route = urlObj.pathname.replace('/', '');
    const params: Record<string, string> = {};
    
    urlObj.searchParams.forEach((value, key) => {
      params[key] = decodeURIComponent(value);
    });
    
    return { route, params };
  } catch {
    return null;
  }
};

/**
 * Check if route requires authentication
 */
export const requiresAuth = (route: RouteNames): boolean => {
  const publicRoutes: RouteNames[] = [ROUTES.LOGIN, ROUTES.REGISTER, ROUTES.FORGOT_PASSWORD];
  return !publicRoutes.includes(route);
};

/**
 * Check if route requires premium subscription
 */
export const requiresPremium = (route: RouteNames): boolean => {
  const premiumRoutes: RouteNames[] = [ROUTES.BAND_MEDIA];
  return premiumRoutes.includes(route);
};

/**
 * Check if route requires VIP subscription
 */
export const requiresVIP = (route: RouteNames): boolean => {
  const vipRoutes: RouteNames[] = [ROUTES.DIRECT_MESSAGES];
  return vipRoutes.includes(route);
};

/**
 * Check if route requires admin access
 */
export const requiresAdmin = (route: RouteNames): boolean => {
  const adminRoutes: RouteNames[] = [ROUTES.ADMIN, ROUTES.USER_MANAGEMENT];
  return adminRoutes.includes(route);
};

/**
 * Get route title for header
 */
export const getRouteTitle = (route: RouteNames): string => {
  const titles: Record<RouteNames, string> = {
    [ROUTES.LOGIN]: 'Login',
    [ROUTES.REGISTER]: 'Sign Up',
    [ROUTES.FORGOT_PASSWORD]: 'Reset Password',
    [ROUTES.HOME]: 'Metal Portal',
    [ROUTES.PROFILE]: 'Profile',
    [ROUTES.SETTINGS]: 'Settings',
    [ROUTES.POSTS]: 'Posts',
    [ROUTES.POST_DETAIL]: 'Post',
    [ROUTES.CREATE_POST]: 'Create Post',
    [ROUTES.FORUM]: 'Forum',
    [ROUTES.FORUM_CATEGORY]: 'Category',
    [ROUTES.FORUM_POST]: 'Discussion',
    [ROUTES.CHAT]: 'Chat',
    [ROUTES.CHAT_ROOM]: 'Chat Room',
    [ROUTES.DIRECT_MESSAGES]: 'Messages',
    [ROUTES.EVENTS]: 'Events',
    [ROUTES.EVENT_DETAIL]: 'Event',
    [ROUTES.BAND_PROFILE]: 'Band',
    [ROUTES.BAND_MEDIA]: 'Media',
    [ROUTES.ADMIN]: 'Admin',
    [ROUTES.USER_MANAGEMENT]: 'Users',
  };
  
  return titles[route] || 'Metal Portal';
};

/**
 * Get default route for user role
 */
export const getDefaultRoute = (userRole: string): RouteNames => {
  switch (userRole) {
    case 'ADMIN':
      return ROUTES.ADMIN;
    case 'BAND_MEMBER':
      return ROUTES.BAND_PROFILE;
    default:
      return ROUTES.HOME;
  }
};