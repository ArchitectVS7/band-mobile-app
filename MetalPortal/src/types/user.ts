// User types

import { UserRole, SubscriptionTier, SubscriptionStatus } from './auth';

export interface User {
  id: string;
  email: string;
  username: string;
  displayName?: string;
  bio?: string;
  location?: string;
  favoriteGenres: string[];
  avatar?: string;
  role: UserRole;
  subscriptionTier: SubscriptionTier;
  subscriptionStatus: SubscriptionStatus;
  isVerified: boolean;
  profileVisibility: 'public' | 'fans_only' | 'private';
  allowDirectMessages: boolean;
  allowMentions: boolean;
  createdAt: Date;
  updatedAt: Date;
  lastActiveAt: Date;
}

export interface UserProfile {
  id: string;
  username: string;
  displayName?: string;
  bio?: string;
  location?: string;
  favoriteGenres: string[];
  avatar?: string;
  role: UserRole;
  subscriptionTier: SubscriptionTier;
  isVerified: boolean;
  createdAt: Date;
  // Statistics
  postCount?: number;
  followerCount?: number;
  followingCount?: number;
}

export interface UpdateUserProfile {
  displayName?: string;
  bio?: string;
  location?: string;
  favoriteGenres?: string[];
  avatar?: string;
  profileVisibility?: 'public' | 'fans_only' | 'private';
  allowDirectMessages?: boolean;
  allowMentions?: boolean;
}

export interface UserSession {
  id: string;
  userId: string;
  token: string;
  ipAddress?: string;
  userAgent?: string;
  createdAt: Date;
  expiresAt: Date;
}

export interface UserStatistics {
  totalPosts: number;
  totalComments: number;
  totalLikes: number;
  totalShares: number;
  forumPosts: number;
  forumComments: number;
  joinedAt: Date;
  lastActiveAt: Date;
  subscriptionStart?: Date;
  subscriptionEnd?: Date;
}

export interface UserPreferences {
  theme: 'dark' | 'light';
  notifications: {
    newPosts: boolean;
    newComments: boolean;
    directMessages: boolean;
    mentions: boolean;
    events: boolean;
    subscriptionUpdates: boolean;
  };
  privacy: {
    profileVisibility: 'public' | 'fans_only' | 'private';
    allowDirectMessages: boolean;
    allowMentions: boolean;
    showOnlineStatus: boolean;
  };
  content: {
    autoplayVideos: boolean;
    showExplicitContent: boolean;
    defaultSort: 'newest' | 'oldest' | 'popular';
  };
}

export interface UserSearchResult {
  id: string;
  username: string;
  displayName?: string;
  avatar?: string;
  role: UserRole;
  subscriptionTier: SubscriptionTier;
  isVerified: boolean;
  isOnline?: boolean;
}

export interface UserActivity {
  id: string;
  type: 'post' | 'comment' | 'like' | 'share' | 'forum_post' | 'forum_comment';
  description: string;
  timestamp: Date;
  relatedId?: string;
  relatedType?: string;
}