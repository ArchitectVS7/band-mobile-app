// Post types

import { User } from './user';

export enum PostType {
  ANNOUNCEMENT = 'ANNOUNCEMENT',
  MEDIA_RELEASE = 'MEDIA_RELEASE',
  EVENT = 'EVENT',
  MERCHANDISE = 'MERCHANDISE',
  GENERAL = 'GENERAL',
}

export enum PostStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
  ARCHIVED = 'ARCHIVED',
  DELETED = 'DELETED',
}

export enum ContentAccessLevel {
  PUBLIC = 'PUBLIC',
  FAN_ONLY = 'FAN_ONLY',
  PREMIUM_ONLY = 'PREMIUM_ONLY',
  VIP_ONLY = 'VIP_ONLY',
  BAND_ONLY = 'BAND_ONLY',
}

export enum ReactionType {
  LIKE = 'LIKE',
  LOVE = 'LOVE',
  ROCK_ON = 'ROCK_ON',
  HEADBANG = 'HEADBANG',
  FIRE = 'FIRE',
  SKULL = 'SKULL',
}

export interface Post {
  id: string;
  title: string;
  content?: string;
  excerpt?: string;
  type: PostType;
  status: PostStatus;
  accessLevel: ContentAccessLevel;
  featuredImage?: string;
  mediaUrls: string[];
  slug: string;
  tags: string[];
  category?: string;
  viewCount: number;
  likeCount: number;
  shareCount: number;
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  authorId: string;
  author: User;
  comments: Comment[];
  reactions: Reaction[];
  // Computed properties
  isLiked?: boolean;
  userReaction?: ReactionType;
  commentCount?: number;
}

export interface CreatePostInput {
  title: string;
  content?: string;
  excerpt?: string;
  type: PostType;
  accessLevel: ContentAccessLevel;
  featuredImage?: string;
  mediaUrls?: string[];
  tags?: string[];
  category?: string;
  status?: PostStatus;
}

export interface UpdatePostInput {
  title?: string;
  content?: string;
  excerpt?: string;
  type?: PostType;
  accessLevel?: ContentAccessLevel;
  featuredImage?: string;
  mediaUrls?: string[];
  tags?: string[];
  category?: string;
  status?: PostStatus;
}

export interface Comment {
  id: string;
  content: string;
  postId: string;
  authorId: string;
  author: User;
  parentId?: string;
  parent?: Comment;
  replies: Comment[];
  reactions: Reaction[];
  likeCount: number;
  createdAt: Date;
  updatedAt: Date;
  // Computed properties
  isLiked?: boolean;
  userReaction?: ReactionType;
  replyCount?: number;
}

export interface CreateCommentInput {
  content: string;
  postId: string;
  parentId?: string;
}

export interface UpdateCommentInput {
  content: string;
}

export interface Reaction {
  id: string;
  type: ReactionType;
  userId: string;
  user: User;
  postId?: string;
  commentId?: string;
  createdAt: Date;
}

export interface CreateReactionInput {
  type: ReactionType;
  postId?: string;
  commentId?: string;
}

export interface PostFilter {
  type?: PostType;
  accessLevel?: ContentAccessLevel;
  category?: string;
  tags?: string[];
  authorId?: string;
  dateFrom?: Date;
  dateTo?: Date;
  status?: PostStatus;
}

export interface PostSort {
  field: 'createdAt' | 'updatedAt' | 'publishedAt' | 'viewCount' | 'likeCount';
  order: 'asc' | 'desc';
}

export interface PostSearchResult {
  id: string;
  title: string;
  excerpt?: string;
  type: PostType;
  accessLevel: ContentAccessLevel;
  featuredImage?: string;
  author: {
    id: string;
    username: string;
    displayName?: string;
    avatar?: string;
  };
  publishedAt?: Date;
  viewCount: number;
  likeCount: number;
  commentCount: number;
}

export interface PostStats {
  totalPosts: number;
  totalViews: number;
  totalLikes: number;
  totalComments: number;
  totalShares: number;
  byType: Record<PostType, number>;
  byAccessLevel: Record<ContentAccessLevel, number>;
  topPosts: PostSearchResult[];
  recentPosts: PostSearchResult[];
}