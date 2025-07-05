// React Query client configuration

import { QueryClient } from '@tanstack/react-query';
import { useAuthStore } from '../store/authStore';

// Query client configuration
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Stale time - how long until data is considered stale
      staleTime: 1000 * 60 * 5, // 5 minutes
      
      // Cache time - how long unused data stays in cache
      gcTime: 1000 * 60 * 30, // 30 minutes (was cacheTime)
      
      // Retry configuration
      retry: (failureCount, error: any) => {
        // Don't retry on 401 (unauthorized) or 403 (forbidden)
        if (error?.status === 401 || error?.status === 403) {
          return false;
        }
        // Retry up to 3 times for other errors
        return failureCount < 3;
      },
      
      // Retry delay with exponential backoff
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      
      // Refetch configuration
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      refetchOnMount: true,
    },
    mutations: {
      // Retry failed mutations once
      retry: 1,
      
      // Global error handler for mutations
      onError: (error: any) => {
        console.error('Mutation error:', error);
        
        // Handle authentication errors
        if (error?.status === 401) {
          // Token might be expired, try to refresh
          const authStore = useAuthStore.getState();
          authStore.refreshToken().catch(() => {
            // If refresh fails, logout the user
            authStore.logout();
          });
        }
      },
    },
  },
});

// Query keys factory for consistent key management
export const queryKeys = {
  // Authentication
  auth: {
    user: ['auth', 'user'] as const,
    session: ['auth', 'session'] as const,
  },
  
  // Users
  users: {
    all: ['users'] as const,
    lists: () => [['users'], 'list'] as const,
    list: (filters: Record<string, any>) => [['users'], 'list', filters] as const,
    details: () => [['users'], 'detail'] as const,
    detail: (id: string) => [['users'], 'detail', id] as const,
    profile: (id: string) => [['users'], 'detail', id, 'profile'] as const,
    statistics: (id: string) => [['users'], 'detail', id, 'statistics'] as const,
    preferences: (id: string) => [['users'], 'detail', id, 'preferences'] as const,
    activity: (id: string) => [['users'], 'detail', id, 'activity'] as const,
  },
  
  // Posts
  posts: {
    all: ['posts'] as const,
    lists: () => [['posts'], 'list'] as const,
    list: (filters: Record<string, any>) => [['posts'], 'list', filters] as const,
    details: () => [['posts'], 'detail'] as const,
    detail: (id: string) => [['posts'], 'detail', id] as const,
    comments: (postId: string) => [['posts'], 'detail', postId, 'comments'] as const,
    reactions: (postId: string) => [['posts'], 'detail', postId, 'reactions'] as const,
    stats: () => [['posts'], 'stats'] as const,
  },
  
  // Forum
  forum: {
    all: ['forum'] as const,
    categories: {
      all: [['forum'], 'categories'] as const,
      list: (filters: Record<string, any>) => [['forum'], 'categories', 'list', filters] as const,
      detail: (id: string) => [['forum'], 'categories', 'detail', id] as const,
    },
    posts: {
      all: [['forum'], 'posts'] as const,
      list: (filters: Record<string, any>) => [['forum'], 'posts', 'list', filters] as const,
      detail: (id: string) => [['forum'], 'posts', 'detail', id] as const,
      comments: (postId: string) => [['forum'], 'posts', 'detail', postId, 'comments'] as const,
    },
    stats: () => [['forum'], 'stats'] as const,
  },
  
  // Chat
  chat: {
    all: ['chat'] as const,
    rooms: {
      all: [['chat'], 'rooms'] as const,
      list: (filters: Record<string, any>) => [['chat'], 'rooms', 'list', filters] as const,
      detail: (id: string) => [['chat'], 'rooms', 'detail', id] as const,
      messages: (roomId: string) => [['chat'], 'rooms', 'detail', roomId, 'messages'] as const,
    },
    conversations: {
      all: [['chat'], 'conversations'] as const,
      list: () => [['chat'], 'conversations', 'list'] as const,
      detail: (userId: string) => [['chat'], 'conversations', 'detail', userId] as const,
      messages: (userId: string) => [['chat'], 'conversations', 'detail', userId, 'messages'] as const,
    },
    stats: () => [['chat'], 'stats'] as const,
  },
  
  // Events
  events: {
    all: ['events'] as const,
    lists: () => [['events'], 'list'] as const,
    list: (filters: Record<string, any>) => [['events'], 'list', filters] as const,
    details: () => [['events'], 'detail'] as const,
    detail: (id: string) => [['events'], 'detail', id] as const,
    rsvps: (eventId: string) => [['events'], 'detail', eventId, 'rsvps'] as const,
    calendar: (date: string) => [['events'], 'calendar', date] as const,
    stats: () => [['events'], 'stats'] as const,
  },
  
  // Notifications
  notifications: {
    all: ['notifications'] as const,
    list: (filters: Record<string, any>) => [['notifications'], 'list', filters] as const,
    stats: () => [['notifications'], 'stats'] as const,
  },
  
  // Subscriptions
  subscriptions: {
    all: ['subscriptions'] as const,
    current: () => [['subscriptions'], 'current'] as const,
    plans: () => [['subscriptions'], 'plans'] as const,
    history: () => [['subscriptions'], 'history'] as const,
  },
} as const;

// Utility functions for cache management
export const cacheUtils = {
  // Invalidate all queries for a specific key
  invalidateQueries: (queryKey: readonly unknown[]) => {
    return queryClient.invalidateQueries({ queryKey });
  },
  
  // Remove queries from cache
  removeQueries: (queryKey: readonly unknown[]) => {
    return queryClient.removeQueries({ queryKey });
  },
  
  // Set query data in cache
  setQueryData: <T>(queryKey: readonly unknown[], data: T) => {
    return queryClient.setQueryData(queryKey, data);
  },
  
  // Get query data from cache
  getQueryData: <T>(queryKey: readonly unknown[]) => {
    return queryClient.getQueryData<T>(queryKey);
  },
  
  // Prefetch a query
  prefetchQuery: (queryKey: readonly unknown[], queryFn: () => Promise<any>) => {
    return queryClient.prefetchQuery({
      queryKey,
      queryFn,
    });
  },
  
  // Optimistic updates helper
  optimisticUpdate: <T>(
    queryKey: readonly unknown[],
    updater: (oldData: T | undefined) => T
  ) => {
    const previousData = queryClient.getQueryData<T>(queryKey);
    queryClient.setQueryData(queryKey, updater);
    return () => queryClient.setQueryData(queryKey, previousData);
  },
};

// Query error handler
export const handleQueryError = (error: any) => {
  console.error('Query error:', error);
  
  // Handle different types of errors
  if (error?.status === 401) {
    // Unauthorized - redirect to login or refresh token
    const authStore = useAuthStore.getState();
    authStore.refreshToken().catch(() => {
      authStore.logout();
    });
  } else if (error?.status === 403) {
    // Forbidden - user doesn't have permission
    console.warn('Access forbidden:', error);
  } else if (error?.status >= 500) {
    // Server error - show generic error message
    console.error('Server error:', error);
  }
  
  return error;
};