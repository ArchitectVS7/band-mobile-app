/**
 * DATE UTILITIES
 * 
 * Helper functions for date operations:
 * - Date formatting
 * - Relative time display
 * - Date calculations
 * - Timezone handling
 */

/**
 * Format date for display
 */
export const formatDate = (date: Date | string, format: 'short' | 'medium' | 'long' = 'medium'): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  const formatOptions: Record<string, Intl.DateTimeFormatOptions> = {
    short: { month: 'short', day: 'numeric', year: 'numeric' },
    medium: { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' },
    long: { month: 'long', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' },
  };

  return dateObj.toLocaleDateString('en-US', formatOptions[format]);
};

/**
 * Get relative time (e.g., "2 hours ago", "in 3 days")
 */
export const getRelativeTime = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffMs = now.getTime() - dateObj.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);
  const diffWeek = Math.floor(diffDay / 7);
  const diffMonth = Math.floor(diffDay / 30);
  const diffYear = Math.floor(diffDay / 365);

  if (diffYear > 0) {
    return `${diffYear} year${diffYear > 1 ? 's' : ''} ago`;
  } else if (diffMonth > 0) {
    return `${diffMonth} month${diffMonth > 1 ? 's' : ''} ago`;
  } else if (diffWeek > 0) {
    return `${diffWeek} week${diffWeek > 1 ? 's' : ''} ago`;
  } else if (diffDay > 0) {
    return `${diffDay} day${diffDay > 1 ? 's' : ''} ago`;
  } else if (diffHour > 0) {
    return `${diffHour} hour${diffHour > 1 ? 's' : ''} ago`;
  } else if (diffMin > 0) {
    return `${diffMin} minute${diffMin > 1 ? 's' : ''} ago`;
  } else {
    return 'just now';
  }
};

/**
 * Check if date is today
 */
export const isToday = (date: Date | string): boolean => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const today = new Date();
  
  return dateObj.toDateString() === today.toDateString();
};

/**
 * Check if date is this week
 */
export const isThisWeek = (date: Date | string): boolean => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const today = new Date();
  const weekStart = new Date(today.setDate(today.getDate() - today.getDay()));
  const weekEnd = new Date(today.setDate(today.getDate() - today.getDay() + 6));
  
  return dateObj >= weekStart && dateObj <= weekEnd;
};

/**
 * Add days to date
 */
export const addDays = (date: Date | string, days: number): Date => {
  const dateObj = typeof date === 'string' ? new Date(date) : new Date(date);
  dateObj.setDate(dateObj.getDate() + days);
  return dateObj;
};

/**
 * Get days until/since date
 */
export const getDaysUntil = (date: Date | string): number => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const today = new Date();
  const diffMs = dateObj.getTime() - today.getTime();
  return Math.ceil(diffMs / (1000 * 60 * 60 * 24));
};

/**
 * Format duration in seconds to readable format
 */
export const formatDuration = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  } else {
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }
};