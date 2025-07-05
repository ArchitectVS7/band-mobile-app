// Forum types

import { User } from './user';
import { ContentAccessLevel } from './post';

export interface ForumCategory {
  id: string;
  name: string;
  description?: string;
  slug: string;
  icon?: string;
  color?: string;
  accessLevel: ContentAccessLevel;
  sortOrder: number;
  isVisible: boolean;
  postCount: number;
  createdAt: Date;
  updatedAt: Date;
  posts: ForumPost[];
  // Computed properties
  latestPost?: ForumPost;
  canAccess?: boolean;
}

export interface CreateForumCategoryInput {
  name: string;
  description?: string;
  slug: string;
  icon?: string;
  color?: string;
  accessLevel: ContentAccessLevel;
  sortOrder?: number;
  isVisible?: boolean;
}

export interface UpdateForumCategoryInput {
  name?: string;
  description?: string;
  slug?: string;
  icon?: string;
  color?: string;
  accessLevel?: ContentAccessLevel;
  sortOrder?: number;
  isVisible?: boolean;
}

export interface ForumPost {
  id: string;
  title: string;
  content: string;
  categoryId: string;
  category: ForumCategory;
  authorId: string;
  author: User;
  viewCount: number;
  likeCount: number;
  replyCount: number;
  isPinned: boolean;
  isLocked: boolean;
  createdAt: Date;
  updatedAt: Date;
  comments: ForumComment[];
  // Computed properties
  isLiked?: boolean;
  lastActivity?: Date;
  lastCommentBy?: User;
  canReply?: boolean;
  canEdit?: boolean;
  canDelete?: boolean;
}

export interface CreateForumPostInput {
  title: string;
  content: string;
  categoryId: string;
}

export interface UpdateForumPostInput {
  title?: string;
  content?: string;
  categoryId?: string;
  isPinned?: boolean;
  isLocked?: boolean;
}

export interface ForumComment {
  id: string;
  content: string;
  postId: string;
  post: ForumPost;
  authorId: string;
  author: User;
  parentId?: string;
  parent?: ForumComment;
  replies: ForumComment[];
  likeCount: number;
  createdAt: Date;
  updatedAt: Date;
  // Computed properties
  isLiked?: boolean;
  replyCount?: number;
  canReply?: boolean;
  canEdit?: boolean;
  canDelete?: boolean;
}

export interface CreateForumCommentInput {
  content: string;
  postId: string;
  parentId?: string;
}

export interface UpdateForumCommentInput {
  content: string;
}

export interface ForumFilter {
  categoryId?: string;
  authorId?: string;
  isPinned?: boolean;
  isLocked?: boolean;
  dateFrom?: Date;
  dateTo?: Date;
  hasReplies?: boolean;
}

export interface ForumSort {
  field: 'createdAt' | 'updatedAt' | 'viewCount' | 'likeCount' | 'replyCount';
  order: 'asc' | 'desc';
}

export interface ForumSearchResult {
  id: string;
  title: string;
  content: string;
  categoryId: string;
  categoryName: string;
  author: {
    id: string;
    username: string;
    displayName?: string;
    avatar?: string;
  };
  viewCount: number;
  replyCount: number;
  isPinned: boolean;
  isLocked: boolean;
  createdAt: Date;
  lastActivity?: Date;
}

export interface ForumStats {
  totalCategories: number;
  totalPosts: number;
  totalComments: number;
  totalViews: number;
  activeUsers: number;
  topCategories: ForumCategory[];
  topPosts: ForumSearchResult[];
  recentActivity: ForumSearchResult[];
}

export interface ForumBreadcrumb {
  id: string;
  name: string;
  slug: string;
  type: 'category' | 'post';
}