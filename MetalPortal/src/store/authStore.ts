// Authentication Zustand store

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import * as SecureStore from 'expo-secure-store';
import {
  AuthUser,
  AuthTokens,
  LoginCredentials,
  RegisterCredentials,
  UserRole,
  SubscriptionTier,
  SubscriptionStatus,
} from '../types/auth';

export interface AuthStore {
  // State
  user: AuthUser | null;
  tokens: AuthTokens | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  biometricEnabled: boolean;
  
  // Actions
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
  logout: () => Promise<void>;
  refreshToken: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  confirmResetPassword: (token: string, newPassword: string) => Promise<void>;
  changePassword: (currentPassword: string, newPassword: string) => Promise<void>;
  enableBiometric: () => Promise<void>;
  disableBiometric: () => Promise<void>;
  biometricLogin: () => Promise<void>;
  clearError: () => void;
  setUser: (user: AuthUser | null) => void;
  setTokens: (tokens: AuthTokens | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  updateUserRole: (role: UserRole) => void;
  updateSubscription: (tier: SubscriptionTier, status: SubscriptionStatus) => void;
}

// Secure storage for tokens
const secureStorage = {
  getItem: async (name: string): Promise<string | null> => {
    try {
      return await SecureStore.getItemAsync(name);
    } catch {
      return null;
    }
  },
  setItem: async (name: string, value: string): Promise<void> => {
    try {
      await SecureStore.setItemAsync(name, value);
    } catch {
      // Handle error silently
    }
  },
  removeItem: async (name: string): Promise<void> => {
    try {
      await SecureStore.deleteItemAsync(name);
    } catch {
      // Handle error silently
    }
  },
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      // Initial state
      user: null,
      tokens: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      biometricEnabled: false,

      // Actions
      login: async (credentials: LoginCredentials) => {
        set({ isLoading: true, error: null });
        try {
          // TODO: Replace with actual API call
          // const response = await authAPI.login(credentials);
          
          // Mock implementation for now
          const mockUser: AuthUser = {
            id: '1',
            email: credentials.email,
            username: credentials.email.split('@')[0],
            displayName: 'Test User',
            role: UserRole.FAN,
            subscriptionTier: SubscriptionTier.FREE,
            subscriptionStatus: SubscriptionStatus.ACTIVE,
            isVerified: false,
            createdAt: new Date(),
            updatedAt: new Date(),
          };

          const mockTokens: AuthTokens = {
            accessToken: 'mock-access-token',
            refreshToken: 'mock-refresh-token',
            expiresIn: 900, // 15 minutes
          };

          set({
            user: mockUser,
            tokens: mockTokens,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Login failed',
            isLoading: false,
          });
        }
      },

      register: async (credentials: RegisterCredentials) => {
        set({ isLoading: true, error: null });
        try {
          // TODO: Replace with actual API call
          // const response = await authAPI.register(credentials);
          
          // Mock implementation for now
          const mockUser: AuthUser = {
            id: '1',
            email: credentials.email,
            username: credentials.username,
            displayName: credentials.displayName || credentials.username,
            role: UserRole.FAN,
            subscriptionTier: SubscriptionTier.FREE,
            subscriptionStatus: SubscriptionStatus.ACTIVE,
            isVerified: false,
            createdAt: new Date(),
            updatedAt: new Date(),
          };

          const mockTokens: AuthTokens = {
            accessToken: 'mock-access-token',
            refreshToken: 'mock-refresh-token',
            expiresIn: 900,
          };

          set({
            user: mockUser,
            tokens: mockTokens,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Registration failed',
            isLoading: false,
          });
        }
      },

      logout: async () => {
        set({ isLoading: true });
        try {
          // TODO: Replace with actual API call
          // await authAPI.logout();
          
          set({
            user: null,
            tokens: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,
          });
        } catch (error) {
          // Even if logout fails, clear local state
          set({
            user: null,
            tokens: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,
          });
        }
      },

      refreshToken: async () => {
        const { tokens } = get();
        if (!tokens?.refreshToken) return;

        try {
          // TODO: Replace with actual API call
          // const response = await authAPI.refreshToken(tokens.refreshToken);
          
          // Mock implementation
          const mockTokens: AuthTokens = {
            accessToken: 'new-mock-access-token',
            refreshToken: tokens.refreshToken,
            expiresIn: 900,
          };

          set({ tokens: mockTokens });
        } catch (error) {
          // If refresh fails, logout user
          get().logout();
        }
      },

      resetPassword: async (email: string) => {
        set({ isLoading: true, error: null });
        try {
          // TODO: Replace with actual API call
          // await authAPI.resetPassword(email);
          set({ isLoading: false });
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Reset password failed',
            isLoading: false,
          });
        }
      },

      confirmResetPassword: async (token: string, newPassword: string) => {
        set({ isLoading: true, error: null });
        try {
          // TODO: Replace with actual API call
          // await authAPI.confirmResetPassword(token, newPassword);
          set({ isLoading: false });
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Password reset confirmation failed',
            isLoading: false,
          });
        }
      },

      changePassword: async (currentPassword: string, newPassword: string) => {
        set({ isLoading: true, error: null });
        try {
          // TODO: Replace with actual API call
          // await authAPI.changePassword(currentPassword, newPassword);
          set({ isLoading: false });
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Password change failed',
            isLoading: false,
          });
        }
      },

      enableBiometric: async () => {
        try {
          // TODO: Implement biometric authentication
          set({ biometricEnabled: true });
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Biometric setup failed',
          });
        }
      },

      disableBiometric: async () => {
        try {
          set({ biometricEnabled: false });
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Biometric disable failed',
          });
        }
      },

      biometricLogin: async () => {
        set({ isLoading: true, error: null });
        try {
          // TODO: Implement biometric login
          set({ isLoading: false });
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Biometric login failed',
            isLoading: false,
          });
        }
      },

      clearError: () => set({ error: null }),

      setUser: (user: AuthUser | null) => set({ user }),

      setTokens: (tokens: AuthTokens | null) => set({ tokens }),

      setLoading: (loading: boolean) => set({ isLoading: loading }),

      setError: (error: string | null) => set({ error }),

      updateUserRole: (role: UserRole) => {
        const { user } = get();
        if (user) {
          set({ user: { ...user, role } });
        }
      },

      updateSubscription: (tier: SubscriptionTier, status: SubscriptionStatus) => {
        const { user } = get();
        if (user) {
          set({ 
            user: { 
              ...user, 
              subscriptionTier: tier, 
              subscriptionStatus: status 
            } 
          });
        }
      },
    }),
    {
      name: 'auth-store',
      storage: createJSONStorage(() => secureStorage),
      partialize: (state) => ({
        user: state.user,
        tokens: state.tokens,
        isAuthenticated: state.isAuthenticated,
        biometricEnabled: state.biometricEnabled,
      }),
    }
  )
);