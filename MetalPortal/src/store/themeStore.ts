import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface ThemeColors {
  // Primary colors
  primary: string;
  primaryDark: string;
  primaryLight: string;
  
  // Accent colors
  accent: string;
  accentDark: string;
  accentLight: string;
  
  // Background colors
  background: string;
  backgroundSecondary: string;
  backgroundTertiary: string;
  
  // Text colors
  text: string;
  textSecondary: string;
  textMuted: string;
  
  // Border colors
  border: string;
  borderLight: string;
  
  // Status colors
  success: string;
  warning: string;
  error: string;
  info: string;
}

export interface ThemeStore {
  isDarkMode: boolean;
  colors: ThemeColors;
  
  toggleTheme: () => void;
  setDarkMode: (isDark: boolean) => void;
}

const darkTheme: ThemeColors = {
  primary: '#0A0A0A',
  primaryDark: '#000000',
  primaryLight: '#1A1A1A',
  
  accent: '#DC143C',
  accentDark: '#8B0000',
  accentLight: '#FF6B6B',
  
  background: '#0A0A0A',
  backgroundSecondary: '#1A1A1A',
  backgroundTertiary: '#2A2A2A',
  
  text: '#F5F5DC',
  textSecondary: '#C0C0C0',
  textMuted: '#808080',
  
  border: '#333333',
  borderLight: '#555555',
  
  success: '#4CAF50',
  warning: '#FF9800',
  error: '#F44336',
  info: '#2196F3',
};

const lightTheme: ThemeColors = {
  primary: '#F5F5DC',
  primaryDark: '#E0E0E0',
  primaryLight: '#FFFFFF',
  
  accent: '#DC143C',
  accentDark: '#8B0000',
  accentLight: '#FF6B6B',
  
  background: '#FFFFFF',
  backgroundSecondary: '#F5F5F5',
  backgroundTertiary: '#E0E0E0',
  
  text: '#0A0A0A',
  textSecondary: '#333333',
  textMuted: '#666666',
  
  border: '#CCCCCC',
  borderLight: '#E0E0E0',
  
  success: '#4CAF50',
  warning: '#FF9800',
  error: '#F44336',
  info: '#2196F3',
};

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set, get) => ({
      isDarkMode: true, // Default to dark mode for metal aesthetic
      colors: darkTheme,

      toggleTheme: () => {
        const newIsDarkMode = !get().isDarkMode;
        set({
          isDarkMode: newIsDarkMode,
          colors: newIsDarkMode ? darkTheme : lightTheme,
        });
      },

      setDarkMode: (isDark: boolean) => {
        set({
          isDarkMode: isDark,
          colors: isDark ? darkTheme : lightTheme,
        });
      },
    }),
    {
      name: 'theme-store',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);