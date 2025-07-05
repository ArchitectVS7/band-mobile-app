// Validation utility functions

import { REGEX, FILE_UPLOAD } from './constants';

// Email validation
export const isValidEmail = (email: string): boolean => {
  return REGEX.EMAIL.test(email.trim());
};

// Password validation
export const isValidPassword = (password: string): boolean => {
  return REGEX.PASSWORD.test(password);
};

// Username validation
export const isValidUsername = (username: string): boolean => {
  return REGEX.USERNAME.test(username);
};

// Phone validation
export const isValidPhone = (phone: string): boolean => {
  return REGEX.PHONE.test(phone);
};

// URL validation
export const isValidUrl = (url: string): boolean => {
  return REGEX.URL.test(url);
};

// Hex color validation
export const isValidHexColor = (color: string): boolean => {
  return REGEX.HEX_COLOR.test(color);
};

// File validation
export const validateFile = (file: { size: number; type: string }, fileType: 'image' | 'video' | 'audio' | 'file'): { isValid: boolean; error?: string } => {
  const { size, type } = file;
  
  // Check file size
  let maxSize: number;
  let allowedTypes: readonly string[];
  
  switch (fileType) {
    case 'image':
      maxSize = FILE_UPLOAD.MAX_IMAGE_SIZE;
      allowedTypes = FILE_UPLOAD.ALLOWED_IMAGE_TYPES;
      break;
    case 'video':
      maxSize = FILE_UPLOAD.MAX_VIDEO_SIZE;
      allowedTypes = FILE_UPLOAD.ALLOWED_VIDEO_TYPES;
      break;
    case 'audio':
      maxSize = FILE_UPLOAD.MAX_AUDIO_SIZE;
      allowedTypes = FILE_UPLOAD.ALLOWED_AUDIO_TYPES;
      break;
    case 'file':
      maxSize = FILE_UPLOAD.MAX_FILE_SIZE;
      allowedTypes = FILE_UPLOAD.ALLOWED_FILE_TYPES;
      break;
    default:
      return { isValid: false, error: 'Invalid file type specified' };
  }
  
  if (size > maxSize) {
    return { isValid: false, error: `File size exceeds ${formatFileSize(maxSize)} limit` };
  }
  
  if (!allowedTypes.includes(type)) {
    return { isValid: false, error: `File type ${type} is not allowed` };
  }
  
  return { isValid: true };
};

// Format file size
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 B';
  
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
};

// Password strength checker
export const getPasswordStrength = (password: string): { score: number; feedback: string[] } => {
  const feedback: string[] = [];
  let score = 0;
  
  // Length check
  if (password.length >= 8) {
    score += 1;
  } else {
    feedback.push('Password should be at least 8 characters long');
  }
  
  // Lowercase check
  if (/[a-z]/.test(password)) {
    score += 1;
  } else {
    feedback.push('Add lowercase letters');
  }
  
  // Uppercase check
  if (/[A-Z]/.test(password)) {
    score += 1;
  } else {
    feedback.push('Add uppercase letters');
  }
  
  // Number check
  if (/\d/.test(password)) {
    score += 1;
  } else {
    feedback.push('Add numbers');
  }
  
  // Special character check
  if (/[@$!%*?&]/.test(password)) {
    score += 1;
  } else {
    feedback.push('Add special characters (@$!%*?&)');
  }
  
  return { score, feedback };
};

// Form validation helper
export const validateForm = (data: Record<string, any>, rules: Record<string, ValidationRule[]>): { isValid: boolean; errors: Record<string, string> } => {
  const errors: Record<string, string> = {};
  
  for (const [field, fieldRules] of Object.entries(rules)) {
    const value = data[field];
    
    for (const rule of fieldRules) {
      const result = rule.validator(value);
      if (!result) {
        errors[field] = rule.message;
        break; // Stop at first error for this field
      }
    }
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

// Validation rule interface
export interface ValidationRule {
  validator: (value: any) => boolean;
  message: string;
}

// Common validation rules
export const ValidationRules = {
  required: (message = 'This field is required'): ValidationRule => ({
    validator: (value) => value !== undefined && value !== null && value !== '',
    message,
  }),
  
  email: (message = 'Please enter a valid email address'): ValidationRule => ({
    validator: (value) => !value || isValidEmail(value),
    message,
  }),
  
  password: (message = 'Password must be at least 8 characters with uppercase, lowercase, number, and special character'): ValidationRule => ({
    validator: (value) => !value || isValidPassword(value),
    message,
  }),
  
  username: (message = 'Username must be 3-20 characters with letters, numbers, and underscores only'): ValidationRule => ({
    validator: (value) => !value || isValidUsername(value),
    message,
  }),
  
  minLength: (min: number, message?: string): ValidationRule => ({
    validator: (value) => !value || value.length >= min,
    message: message || `Must be at least ${min} characters`,
  }),
  
  maxLength: (max: number, message?: string): ValidationRule => ({
    validator: (value) => !value || value.length <= max,
    message: message || `Must be no more than ${max} characters`,
  }),
  
  pattern: (regex: RegExp, message: string): ValidationRule => ({
    validator: (value) => !value || regex.test(value),
    message,
  }),
  
  custom: (validator: (value: any) => boolean, message: string): ValidationRule => ({
    validator,
    message,
  }),
};

// Sanitize input
export const sanitizeInput = (input: string): string => {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, ''); // Remove event handlers
};

// Check if string contains profanity (basic implementation)
export const containsProfanity = (text: string): boolean => {
  const profanityWords = ['spam', 'scam']; // Add more words as needed
  const lowercaseText = text.toLowerCase();
  return profanityWords.some(word => lowercaseText.includes(word));
};

// Validate age (18+)
export const isValidAge = (birthDate: Date): boolean => {
  const today = new Date();
  const age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    return age - 1 >= 18;
  }
  
  return age >= 18;
};

// Validate credit card number (Luhn algorithm)
export const isValidCreditCard = (cardNumber: string): boolean => {
  const cleanNumber = cardNumber.replace(/\s/g, '');
  
  if (!/^\d+$/.test(cleanNumber)) {
    return false;
  }
  
  let sum = 0;
  let shouldDouble = false;
  
  for (let i = cleanNumber.length - 1; i >= 0; i--) {
    let digit = parseInt(cleanNumber[i]);
    
    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }
    
    sum += digit;
    shouldDouble = !shouldDouble;
  }
  
  return sum % 10 === 0;
};