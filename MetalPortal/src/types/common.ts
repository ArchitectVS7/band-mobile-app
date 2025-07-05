// Common types used throughout the application

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export interface QueryParams {
  page?: number;
  limit?: number;
  sort?: string;
  order?: 'asc' | 'desc';
  search?: string;
  filter?: Record<string, any>;
}

export interface LoadingState {
  isLoading: boolean;
  error: string | null;
}

export interface AsyncState<T> extends LoadingState {
  data: T | null;
}

// Theme types
export interface Theme {
  colors: {
    primary: string;
    secondary: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    border: string;
    error: string;
    warning: string;
    success: string;
    accent: string;
  };
  typography: {
    h1: number;
    h2: number;
    h3: number;
    h4: number;
    body: number;
    small: number;
    caption: number;
  };
  spacing: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    xxl: number;
  };
  borderRadius: {
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
}

// Navigation types
export interface StackNavigationProps {
  navigation: any;
  route: any;
}

export interface TabNavigationProps {
  navigation: any;
  route: any;
}

// Form types
export interface FormError {
  field: string;
  message: string;
}

export interface FormState {
  isSubmitting: boolean;
  errors: FormError[];
  isDirty: boolean;
  isValid: boolean;
}

// File upload types
export interface FileUpload {
  uri: string;
  name: string;
  type: string;
  size: number;
}

export interface MediaFile {
  id: string;
  url: string;
  type: 'image' | 'video' | 'audio';
  name: string;
  size: number;
  createdAt: Date;
}

// Notification types
export interface PushNotification {
  id: string;
  title: string;
  body: string;
  data?: Record<string, any>;
  sound?: string;
  badge?: number;
}