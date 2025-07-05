import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import * as SecureStore from 'expo-secure-store';
import type { User, UserProfile, UpdateUserProfile, UserPreferences, UserStatistics } from '../types/user';

/**
 * USER STORE - User Profile and Management
 * 
 * This store handles all user-related operations including:
 * - Profile management
 * - User preferences
 * - User statistics
 * - Profile visibility settings
 * 
 * DESIGN PATTERNS:
 * - Zustand for state management
 * - Secure storage for sensitive data
 * - Optimistic updates for better UX
 * - Type-safe operations
 */

export interface UserStore {
  // State
  currentUser: User | null;
  userProfile: UserProfile | null;
  userPreferences: UserPreferences | null;
  userStatistics: UserStatistics | null;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  setCurrentUser: (user: User | null) => void;
  updateProfile: (updates: UpdateUserProfile) => Promise<void>;
  updatePreferences: (preferences: Partial<UserPreferences>) => Promise<void>;
  getUserStatistics: () => Promise<void>;
  clearUserData: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

// Secure storage for user data
const userStorage = {
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

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      // Initial state
      currentUser: null,
      userProfile: null,
      userPreferences: null,
      userStatistics: null,
      isLoading: false,
      error: null,

      // Actions
      setCurrentUser: (user: User | null) => {
        set({ currentUser: user });
      },

      updateProfile: async (updates: UpdateUserProfile) => {
        set({ isLoading: true, error: null });
        try {
          // TODO: Replace with actual API call
          // const response = await userAPI.updateProfile(updates);
          
          // Mock implementation for now
          const currentUser = get().currentUser;
          if (currentUser) {
            const updatedUser = {
              ...currentUser,
              ...updates,
              updatedAt: new Date(),
            };
            set({ 
              currentUser: updatedUser,
              isLoading: false 
            });
          }
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Profile update failed',
            isLoading: false,
          });
        }
      },

      updatePreferences: async (preferences: Partial<UserPreferences>) => {
        set({ isLoading: true, error: null });
        try {
          // TODO: Replace with actual API call
          // const response = await userAPI.updatePreferences(preferences);
          
          // Mock implementation for now
          const currentPreferences = get().userPreferences;
          const updatedPreferences = {
            ...currentPreferences,
            ...preferences,
          } as UserPreferences;
          
          set({ 
            userPreferences: updatedPreferences,
            isLoading: false 
          });
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Preferences update failed',
            isLoading: false,
          });
        }
      },

      getUserStatistics: async () => {
        set({ isLoading: true, error: null });
        try {
          // TODO: Replace with actual API call
          // const response = await userAPI.getStatistics();
          
          // Mock implementation for now
          const mockStatistics: UserStatistics = {
            totalPosts: 0,
            totalComments: 0,
            totalLikes: 0,
            totalShares: 0,
            forumPosts: 0,
            forumComments: 0,
            joinedAt: new Date(),
            lastActiveAt: new Date(),
          };
          
          set({ 
            userStatistics: mockStatistics,
            isLoading: false 
          });
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Statistics fetch failed',
            isLoading: false,
          });
        }
      },

      clearUserData: () => {
        set({
          currentUser: null,
          userProfile: null,
          userPreferences: null,
          userStatistics: null,
          error: null,
        });
      },

      setLoading: (loading: boolean) => set({ isLoading: loading }),

      setError: (error: string | null) => set({ error }),
    }),
    {
      name: 'user-store',
      storage: createJSONStorage(() => userStorage),
      partialize: (state) => ({
        currentUser: state.currentUser,
        userPreferences: state.userPreferences,
      }),
    }
  )
);

// UserStore type is already exported above