// API client service

import { useAuthStore } from '../store/authStore';
import { ApiResponse, ApiError, RequestOptions } from '../types/api';

// API configuration
const API_CONFIG = {
  baseURL: process.env.EXPO_PUBLIC_API_BASE_URL || 'http://localhost:3000/api',
  timeout: 30000, // 30 seconds
  retries: 3,
  retryDelay: 1000,
};

// Request interceptor to add authentication headers
const addAuthHeaders = (headers: Record<string, string> = {}): Record<string, string> => {
  const authStore = useAuthStore.getState();
  const token = authStore.tokens?.accessToken;
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  return headers;
};

// Response interceptor to handle authentication errors
const handleAuthErrors = async (response: Response): Promise<Response> => {
  if (response.status === 401) {
    const authStore = useAuthStore.getState();
    
    // Try to refresh the token
    try {
      await authStore.refreshToken();
      // Return original response for retry logic to handle
      return response;
    } catch (error) {
      // If refresh fails, logout user
      authStore.logout();
      throw new Error('Authentication failed');
    }
  }
  
  return response;
};

// Utility function to build URL with query parameters
const buildURL = (url: string, params?: Record<string, any>): string => {
  const fullURL = url.startsWith('http') ? url : `${API_CONFIG.baseURL}${url}`;
  
  if (!params) return fullURL;
  
  const urlObj = new URL(fullURL);
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      urlObj.searchParams.append(key, String(value));
    }
  });
  
  return urlObj.toString();
};

// Main API client class
class ApiClient {
  private async request<T>(
    method: string,
    url: string,
    data?: any,
    options: RequestOptions = {}
  ): Promise<ApiResponse<T>> {
    const {
      skipAuth = false,
      contentType = 'application/json',
      responseType = 'json',
      timeout = API_CONFIG.timeout,
      retries = API_CONFIG.retries,
      retryDelay = API_CONFIG.retryDelay,
    } = options;

    // Build headers
    let headers: Record<string, string> = {
      'Content-Type': contentType,
    };

    // Add authentication headers if not skipped
    if (!skipAuth) {
      headers = addAuthHeaders(headers);
    }

    // Build request configuration
    const requestConfig: RequestInit = {
      method,
      headers,
      signal: AbortSignal.timeout(timeout),
    };

    // Add body for POST, PUT, PATCH requests
    if (data && ['POST', 'PUT', 'PATCH'].includes(method)) {
      requestConfig.body = contentType === 'application/json' 
        ? JSON.stringify(data) 
        : data;
    }

    // Retry logic
    let lastError: any;
    
    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        const response = await fetch(url, requestConfig);
        
        // Handle authentication errors
        await handleAuthErrors(response);
        
        // Parse response based on type
        let responseData: any;
        
        if (responseType === 'json') {
          responseData = await response.json();
        } else if (responseType === 'text') {
          responseData = await response.text();
        } else if (responseType === 'blob') {
          responseData = await response.blob();
        }

        // Check if response is successful
        if (!response.ok) {
          const error: ApiError = {
            message: responseData?.message || `HTTP ${response.status}`,
            statusCode: response.status,
            error: responseData?.error,
            details: responseData,
          };
          throw error;
        }

        // Return successful response
        return {
          success: true,
          data: responseData?.data || responseData,
          message: responseData?.message,
          meta: responseData?.meta,
        };

      } catch (error) {
        lastError = error;
        
        // Don't retry on authentication errors or client errors (4xx)
        if (error instanceof Error && error.message === 'Authentication failed') {
          throw error;
        }
        
        if (lastError?.statusCode && lastError.statusCode >= 400 && lastError.statusCode < 500) {
          break;
        }

        // Wait before retrying (except on last attempt)
        if (attempt < retries) {
          await new Promise(resolve => setTimeout(resolve, retryDelay * (attempt + 1)));
        }
      }
    }

    // If all retries failed, throw the last error
    throw lastError;
  }

  // GET request
  async get<T = any>(
    url: string, 
    params?: Record<string, any>, 
    options?: RequestOptions
  ): Promise<ApiResponse<T>> {
    const fullURL = buildURL(url, params);
    return this.request<T>('GET', fullURL, undefined, options);
  }

  // POST request
  async post<T = any>(
    url: string, 
    data?: any, 
    options?: RequestOptions
  ): Promise<ApiResponse<T>> {
    const fullURL = buildURL(url);
    return this.request<T>('POST', fullURL, data, options);
  }

  // PUT request
  async put<T = any>(
    url: string, 
    data?: any, 
    options?: RequestOptions
  ): Promise<ApiResponse<T>> {
    const fullURL = buildURL(url);
    return this.request<T>('PUT', fullURL, data, options);
  }

  // PATCH request
  async patch<T = any>(
    url: string, 
    data?: any, 
    options?: RequestOptions
  ): Promise<ApiResponse<T>> {
    const fullURL = buildURL(url);
    return this.request<T>('PATCH', fullURL, data, options);
  }

  // DELETE request
  async delete<T = any>(
    url: string, 
    options?: RequestOptions
  ): Promise<ApiResponse<T>> {
    const fullURL = buildURL(url);
    return this.request<T>('DELETE', fullURL, undefined, options);
  }

  // File upload
  async upload<T = any>(
    url: string, 
    file: File | FormData, 
    options: RequestOptions = {}
  ): Promise<ApiResponse<T>> {
    const uploadOptions = {
      ...options,
      contentType: 'multipart/form-data',
    };
    
    const formData = file instanceof FormData ? file : new FormData();
    if (!(file instanceof FormData)) {
      formData.append('file', file);
    }
    
    const fullURL = buildURL(url);
    return this.request<T>('POST', fullURL, formData, uploadOptions);
  }
}

// Create and export API client instance
export const apiClient = new ApiClient();

// Export API endpoints configuration
export const API_ENDPOINTS = {
  // Authentication
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    logout: '/auth/logout',
    refresh: '/auth/refresh',
    resetPassword: '/auth/reset-password',
    confirmReset: '/auth/confirm-reset',
    changePassword: '/auth/change-password',
    biometric: '/auth/biometric',
  },
  
  // Users
  users: {
    profile: '/users/profile',
    updateProfile: '/users/profile',
    preferences: '/users/preferences',
    updatePreferences: '/users/preferences',
    statistics: '/users/statistics',
    search: '/users/search',
    activity: '/users/activity',
  },
  
  // Posts
  posts: {
    list: '/posts',
    create: '/posts',
    get: (id: string) => `/posts/${id}`,
    update: (id: string) => `/posts/${id}`,
    delete: (id: string) => `/posts/${id}`,
    search: '/posts/search',
    stats: '/posts/stats',
    comments: (id: string) => `/posts/${id}/comments`,
    reactions: (id: string) => `/posts/${id}/reactions`,
  },
  
  // Forum
  forum: {
    categories: '/forum/categories',
    posts: '/forum/posts',
    comments: '/forum/comments',
    search: '/forum/search',
    stats: '/forum/stats',
  },
  
  // Chat
  chat: {
    rooms: '/chat/rooms',
    messages: '/chat/messages',
    conversations: '/chat/conversations',
    search: '/chat/search',
    stats: '/chat/stats',
  },
  
  // Events
  events: {
    list: '/events',
    create: '/events',
    get: (id: string) => `/events/${id}`,
    update: (id: string) => `/events/${id}`,
    delete: (id: string) => `/events/${id}`,
    rsvp: (id: string) => `/events/${id}/rsvp`,
    calendar: '/events/calendar',
    reminders: '/events/reminders',
    search: '/events/search',
    stats: '/events/stats',
  },
  
  // Notifications
  notifications: {
    list: '/notifications',
    markRead: (id: string) => `/notifications/${id}/read`,
    markAllRead: '/notifications/read-all',
    preferences: '/notifications/preferences',
    stats: '/notifications/stats',
  },
  
  // File Upload
  upload: {
    image: '/upload/image',
    video: '/upload/video',
    audio: '/upload/audio',
    file: '/upload/file',
  },
  
  // Subscription
  subscription: {
    plans: '/subscription/plans',
    current: '/subscription/current',
    subscribe: '/subscription/subscribe',
    update: '/subscription/update',
    cancel: '/subscription/cancel',
    history: '/subscription/history',
  },
} as const;