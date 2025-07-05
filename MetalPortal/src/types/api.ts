// API types

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  errors?: Record<string, string[]>;
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
    pages?: number;
    hasNext?: boolean;
    hasPrev?: boolean;
  };
}

export interface ApiError {
  message: string;
  statusCode: number;
  error?: string;
  details?: Record<string, any>;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  sort?: string;
  order?: 'asc' | 'desc';
}

export interface SearchParams extends PaginationParams {
  query?: string;
  filters?: Record<string, any>;
}

export interface ApiEndpoints {
  // Authentication
  auth: {
    login: string;
    register: string;
    logout: string;
    refresh: string;
    resetPassword: string;
    confirmReset: string;
    changePassword: string;
    biometric: string;
  };
  
  // User
  users: {
    profile: string;
    updateProfile: string;
    preferences: string;
    updatePreferences: string;
    statistics: string;
    search: string;
    activity: string;
  };
  
  // Posts
  posts: {
    list: string;
    create: string;
    get: string;
    update: string;
    delete: string;
    search: string;
    stats: string;
    comments: string;
    reactions: string;
  };
  
  // Forum
  forum: {
    categories: string;
    posts: string;
    comments: string;
    search: string;
    stats: string;
  };
  
  // Chat
  chat: {
    rooms: string;
    messages: string;
    conversations: string;
    search: string;
    stats: string;
  };
  
  // Events
  events: {
    list: string;
    create: string;
    get: string;
    update: string;
    delete: string;
    rsvp: string;
    calendar: string;
    reminders: string;
    search: string;
    stats: string;
  };
  
  // Notifications
  notifications: {
    list: string;
    markRead: string;
    markAllRead: string;
    preferences: string;
    stats: string;
  };
  
  // File Upload
  upload: {
    image: string;
    video: string;
    audio: string;
    file: string;
  };
  
  // Subscription
  subscription: {
    plans: string;
    current: string;
    subscribe: string;
    update: string;
    cancel: string;
    history: string;
  };
}

export interface HttpMethods {
  GET: 'GET';
  POST: 'POST';
  PUT: 'PUT';
  PATCH: 'PATCH';
  DELETE: 'DELETE';
}

export interface RequestConfig {
  method: keyof HttpMethods;
  url: string;
  data?: any;
  params?: Record<string, any>;
  headers?: Record<string, string>;
  timeout?: number;
  withCredentials?: boolean;
}

export interface RequestOptions {
  skipAuth?: boolean;
  contentType?: string;
  responseType?: 'json' | 'blob' | 'text';
  timeout?: number;
  retries?: number;
  retryDelay?: number;
}

export interface ApiClient {
  get<T = any>(url: string, params?: any, options?: RequestOptions): Promise<ApiResponse<T>>;
  post<T = any>(url: string, data?: any, options?: RequestOptions): Promise<ApiResponse<T>>;
  put<T = any>(url: string, data?: any, options?: RequestOptions): Promise<ApiResponse<T>>;
  patch<T = any>(url: string, data?: any, options?: RequestOptions): Promise<ApiResponse<T>>;
  delete<T = any>(url: string, options?: RequestOptions): Promise<ApiResponse<T>>;
  upload<T = any>(url: string, file: File | FormData, options?: RequestOptions): Promise<ApiResponse<T>>;
}

export interface ApiHooks {
  onRequest?: (config: RequestConfig) => RequestConfig;
  onResponse?: <T>(response: ApiResponse<T>) => ApiResponse<T>;
  onError?: (error: ApiError) => ApiError;
  onRetry?: (error: ApiError, attempt: number) => boolean;
}