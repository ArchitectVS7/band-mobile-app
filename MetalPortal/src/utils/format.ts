// Formatting utility functions

// Format numbers with commas
export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('en-US').format(num);
};

// Format currency
export const formatCurrency = (amount: number, currency = 'USD'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
};

// Format percentage
export const formatPercentage = (value: number, decimals = 1): string => {
  return `${(value * 100).toFixed(decimals)}%`;
};

// Truncate text with ellipsis
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - 3) + '...';
};

// Capitalize first letter
export const capitalize = (text: string): string => {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

// Convert to title case
export const toTitleCase = (text: string): string => {
  return text
    .toLowerCase()
    .split(' ')
    .map(word => capitalize(word))
    .join(' ');
};

// Convert to slug (URL-friendly string)
export const toSlug = (text: string): string => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, ''); // Remove leading and trailing hyphens
};

// Format phone number
export const formatPhoneNumber = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, '');
  
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  }
  
  if (cleaned.length === 11 && cleaned[0] === '1') {
    return `+1 (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7)}`;
  }
  
  return phone; // Return original if not standard format
};

// Format file size
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 B';
  
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
};

// Format duration (seconds to human readable)
export const formatDuration = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  
  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  
  return `${minutes}:${secs.toString().padStart(2, '0')}`;
};

// Format view count (1.2K, 1.5M, etc.)
export const formatViewCount = (count: number): string => {
  if (count < 1000) return count.toString();
  
  if (count < 1000000) {
    return `${(count / 1000).toFixed(1)}K`;
  }
  
  if (count < 1000000000) {
    return `${(count / 1000000).toFixed(1)}M`;
  }
  
  return `${(count / 1000000000).toFixed(1)}B`;
};

// Format initials from name
export const formatInitials = (name: string): string => {
  return name
    .split(' ')
    .map(part => part.charAt(0).toUpperCase())
    .slice(0, 2) // Take only first 2 initials
    .join('');
};

// Format username with @ prefix
export const formatUsername = (username: string): string => {
  return username.startsWith('@') ? username : `@${username}`;
};

// Remove formatting from phone number
export const cleanPhoneNumber = (phone: string): string => {
  return phone.replace(/\D/g, '');
};

// Format URL to display format
export const formatDisplayUrl = (url: string): string => {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname + urlObj.pathname;
  } catch {
    return url;
  }
};

// Format hashtags
export const formatHashtags = (text: string): string => {
  return text.replace(/#(\w+)/g, '<span class="hashtag">#$1</span>');
};

// Format mentions
export const formatMentions = (text: string): string => {
  return text.replace(/@(\w+)/g, '<span class="mention">@$1</span>');
};

// Strip HTML tags
export const stripHtml = (html: string): string => {
  return html.replace(/<[^>]*>/g, '');
};

// Escape HTML
export const escapeHtml = (text: string): string => {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
};

// Format JSON for display
export const formatJson = (obj: any, indent = 2): string => {
  try {
    return JSON.stringify(obj, null, indent);
  } catch {
    return String(obj);
  }
};

// Format error message
export const formatErrorMessage = (error: any): string => {
  if (typeof error === 'string') return error;
  if (error?.message) return error.message;
  if (error?.error) return error.error;
  return 'An unexpected error occurred';
};

// Format array to comma-separated string
export const formatArrayToString = (arr: string[], separator = ', '): string => {
  return arr.join(separator);
};

// Format boolean to Yes/No
export const formatBoolean = (value: boolean): string => {
  return value ? 'Yes' : 'No';
};

// Format camelCase to Title Case
export const camelCaseToTitleCase = (camelCase: string): string => {
  return camelCase
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, str => str.toUpperCase())
    .trim();
};

// Format snake_case to Title Case
export const snakeCaseToTitleCase = (snakeCase: string): string => {
  return snakeCase
    .split('_')
    .map(word => capitalize(word))
    .join(' ');
};

// Pluralize word based on count
export const pluralize = (word: string, count: number, plural?: string): string => {
  if (count === 1) return word;
  return plural || word + 's';
};

// Format list with "and" conjunction
export const formatList = (items: string[]): string => {
  if (items.length === 0) return '';
  if (items.length === 1) return items[0];
  if (items.length === 2) return `${items[0]} and ${items[1]}`;
  
  const allButLast = items.slice(0, -1).join(', ');
  const last = items[items.length - 1];
  return `${allButLast}, and ${last}`;
};