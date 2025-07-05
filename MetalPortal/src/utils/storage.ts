import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * STORAGE UTILITIES
 * 
 * Helper functions for data storage:
 * - Secure storage for sensitive data
 * - Regular storage for non-sensitive data
 * - Cache management
 * - Data serialization
 */

/**
 * Secure Storage Operations
 */
export const secureStorage = {
  /**
   * Store sensitive data securely
   */
  async setItem(key: string, value: string): Promise<void> {
    try {
      await SecureStore.setItemAsync(key, value);
    } catch (error) {
      console.error('Secure storage set error:', error);
      throw error;
    }
  },

  /**
   * Retrieve sensitive data securely
   */
  async getItem(key: string): Promise<string | null> {
    try {
      return await SecureStore.getItemAsync(key);
    } catch (error) {
      console.error('Secure storage get error:', error);
      return null;
    }
  },

  /**
   * Remove sensitive data securely
   */
  async removeItem(key: string): Promise<void> {
    try {
      await SecureStore.deleteItemAsync(key);
    } catch (error) {
      console.error('Secure storage remove error:', error);
      throw error;
    }
  },

  /**
   * Check if secure item exists
   */
  async hasItem(key: string): Promise<boolean> {
    try {
      const value = await SecureStore.getItemAsync(key);
      return value !== null;
    } catch {
      return false;
    }
  },
};

/**
 * Regular Storage Operations
 */
export const storage = {
  /**
   * Store regular data
   */
  async setItem(key: string, value: any): Promise<void> {
    try {
      const serializedValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, serializedValue);
    } catch (error) {
      console.error('Storage set error:', error);
      throw error;
    }
  },

  /**
   * Retrieve regular data
   */
  async getItem<T>(key: string): Promise<T | null> {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value === null) return null;
      
      return JSON.parse(value) as T;
    } catch (error) {
      console.error('Storage get error:', error);
      return null;
    }
  },

  /**
   * Remove regular data
   */
  async removeItem(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error('Storage remove error:', error);
      throw error;
    }
  },

  /**
   * Check if item exists
   */
  async hasItem(key: string): Promise<boolean> {
    try {
      const value = await AsyncStorage.getItem(key);
      return value !== null;
    } catch {
      return false;
    }
  },

  /**
   * Clear all storage
   */
  async clear(): Promise<void> {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error('Storage clear error:', error);
      throw error;
    }
  },

  /**
   * Get all keys
   */
  async getAllKeys(): Promise<string[]> {
    try {
      return await AsyncStorage.getAllKeys();
    } catch (error) {
      console.error('Storage getAllKeys error:', error);
      return [];
    }
  },
};

/**
 * Cache with TTL (Time To Live)
 */
export const cache = {
  /**
   * Set cache item with TTL
   */
  async setItem(key: string, value: any, ttlMinutes: number = 60): Promise<void> {
    const cacheItem = {
      value,
      timestamp: Date.now(),
      ttl: ttlMinutes * 60 * 1000, // Convert to milliseconds
    };
    
    await storage.setItem(`cache:${key}`, cacheItem);
  },

  /**
   * Get cache item if not expired
   */
  async getItem<T>(key: string): Promise<T | null> {
    try {
      const cacheItem = await storage.getItem<{
        value: T;
        timestamp: number;
        ttl: number;
      }>(`cache:${key}`);
      
      if (!cacheItem) return null;
      
      const now = Date.now();
      const age = now - cacheItem.timestamp;
      
      if (age > cacheItem.ttl) {
        // Cache expired, remove it
        await storage.removeItem(`cache:${key}`);
        return null;
      }
      
      return cacheItem.value;
    } catch {
      return null;
    }
  },

  /**
   * Remove cache item
   */
  async removeItem(key: string): Promise<void> {
    await storage.removeItem(`cache:${key}`);
  },

  /**
   * Clear all cache
   */
  async clear(): Promise<void> {
    try {
      const keys = await storage.getAllKeys();
      const cacheKeys = keys.filter(key => key.startsWith('cache:'));
      
      await Promise.all(cacheKeys.map(key => storage.removeItem(key)));
    } catch (error) {
      console.error('Cache clear error:', error);
    }
  },

  /**
   * Check if cache item exists and is valid
   */
  async hasValidItem(key: string): Promise<boolean> {
    const item = await this.getItem(key);
    return item !== null;
  },
};

/**
 * Storage keys constants
 */
export const STORAGE_KEYS = {
  // Auth
  AUTH_TOKEN: 'auth_token',
  REFRESH_TOKEN: 'refresh_token',
  USER_DATA: 'user_data',
  
  // User preferences
  THEME: 'theme',
  LANGUAGE: 'language',
  NOTIFICATIONS: 'notifications',
  
  // App data
  ONBOARDING_COMPLETED: 'onboarding_completed',
  LAST_SYNC: 'last_sync',
  
  // Cache prefixes
  CACHE_POSTS: 'posts',
  CACHE_USERS: 'users',
  CACHE_EVENTS: 'events',
} as const;