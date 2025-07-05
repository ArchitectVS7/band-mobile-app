/**
 * METAL PORTAL - REGISTER SCREEN
 * 
 * Registration screen with Metal Portal branding and comprehensive form validation
 * Integrates with authentication store and design system
 * 
 * FEATURES:
 * - Email, username, and password validation
 * - Password strength checking
 * - Terms of service acceptance
 * - Loading states with disabled form
 * - Error handling and display
 * - Login screen navigation
 * - Metal Portal branding
 * - Accessibility support
 * - Type-safe navigation
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';

// Design System Imports
import { 
  Button, 
  Input, 
  Card, 
  metalPortalColors, 
  metalPortalSpacing, 
  metalPortalTypography 
} from '../../design-system';

// Store and Types
import { useAuthStore } from '../../store/authStore';
import { AuthStackParamList } from '../../navigation/types';
import { isValidEmail, isValidPassword, isValidUsername, getPasswordStrength } from '../../utils/validation';

// ========================
// TYPES & INTERFACES
// ========================

type RegisterScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'Register'>;
type RegisterScreenProps = NativeStackScreenProps<AuthStackParamList, 'Register'>;

interface RegisterFormData {
  email: string;
  username: string;
  displayName: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
}

interface RegisterFormErrors {
  email?: string;
  username?: string;
  displayName?: string;
  password?: string;
  confirmPassword?: string;
  acceptTerms?: string;
  general?: string;
}

interface PasswordStrengthIndicator {
  score: number;
  feedback: string[];
  color: string;
  label: string;
}

// ========================
// REGISTER SCREEN COMPONENT
// ========================

export const RegisterScreen: React.FC = () => {
  const navigation = useNavigation<RegisterScreenNavigationProp>();
  const route = useRoute<RegisterScreenProps['route']>();
  
  // Auth store
  const { 
    register, 
    isLoading, 
    error: authError,
    clearError
  } = useAuthStore();

  // Form state
  const [formData, setFormData] = useState<RegisterFormData>({
    email: route.params?.email || '',
    username: '',
    displayName: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
  });
  
  const [errors, setErrors] = useState<RegisterFormErrors>({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState<PasswordStrengthIndicator>({
    score: 0,
    feedback: [],
    color: metalPortalColors.semantic.text.muted,
    label: 'Enter a password',
  });

  // ========================
  // EFFECTS
  // ========================

  useEffect(() => {
    // Clear auth store errors when component unmounts
    return () => {
      clearError();
    };
  }, [clearError]);

  useEffect(() => {
    // Validate form whenever data changes
    validateForm();
  }, [formData]);

  useEffect(() => {
    // Update password strength whenever password changes
    updatePasswordStrength();
  }, [formData.password]);

  useEffect(() => {
    // Set general error from auth store
    if (authError) {
      setErrors(prev => ({ ...prev, general: authError }));
    } else {
      setErrors(prev => ({ ...prev, general: undefined }));
    }
  }, [authError]);

  // ========================
  // FORM VALIDATION
  // ========================

  const validateForm = () => {
    const newErrors: RegisterFormErrors = {};
    
    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    // Username validation
    if (!formData.username) {
      newErrors.username = 'Username is required';
    } else if (!isValidUsername(formData.username)) {
      newErrors.username = 'Username must be 3-20 characters with letters, numbers, and underscores only';
    }
    
    // Display name validation
    if (!formData.displayName) {
      newErrors.displayName = 'Display name is required';
    } else if (formData.displayName.length < 2) {
      newErrors.displayName = 'Display name must be at least 2 characters';
    } else if (formData.displayName.length > 50) {
      newErrors.displayName = 'Display name must be no more than 50 characters';
    }
    
    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (!isValidPassword(formData.password)) {
      newErrors.password = 'Password must be at least 8 characters with uppercase, lowercase, number, and special character';
    }
    
    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    // Terms acceptance validation
    if (!formData.acceptTerms) {
      newErrors.acceptTerms = 'You must accept the Terms of Service and Privacy Policy';
    }
    
    setErrors(prev => ({ ...prev, ...newErrors, general: prev.general }));
    setIsFormValid(Object.keys(newErrors).length === 0);
  };

  const updatePasswordStrength = () => {
    if (!formData.password) {
      setPasswordStrength({
        score: 0,
        feedback: [],
        color: metalPortalColors.semantic.text.muted,
        label: 'Enter a password',
      });
      return;
    }

    const strength = getPasswordStrength(formData.password);
    let color: string;
    let label: string;

    if (strength.score === 0) {
      color = metalPortalColors.semantic.state.error;
      label = 'Very Weak';
    } else if (strength.score === 1) {
      color = metalPortalColors.semantic.state.error;
      label = 'Weak';
    } else if (strength.score === 2) {
      color = metalPortalColors.semantic.state.warning;
      label = 'Fair';
    } else if (strength.score === 3) {
      color = metalPortalColors.semantic.state.warning;
      label = 'Good';
    } else if (strength.score === 4) {
      color = metalPortalColors.semantic.state.success;
      label = 'Strong';
    } else {
      color = metalPortalColors.semantic.state.success;
      label = 'Very Strong';
    }

    setPasswordStrength({
      score: strength.score,
      feedback: strength.feedback,
      color,
      label,
    });
  };

  // ========================
  // EVENT HANDLERS
  // ========================

  const handleInputChange = (field: keyof RegisterFormData) => (value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear field-specific error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleRegister = async () => {
    if (!isFormValid || isLoading) return;

    try {
      clearError();
      await register({
        email: formData.email,
        username: formData.username,
        password: formData.password,
        displayName: formData.displayName,
      });
      // Navigation is handled by the auth store/navigation listener
      console.log('Registration successful');
    } catch (error) {
      console.error('Registration error:', error);
      setErrors(prev => ({ 
        ...prev, 
        general: 'An unexpected error occurred. Please try again.' 
      }));
    }
  };

  const handleLogin = () => {
    navigation.navigate('Login');
  };

  const handleTermsPress = () => {
    Alert.alert(
      'Terms of Service',
      'By creating an account, you agree to our Terms of Service and Privacy Policy. These documents outline your rights and responsibilities as a Metal Portal community member.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Accept', 
          onPress: () => handleInputChange('acceptTerms')(true)
        }
      ]
    );
  };

  // ========================
  // RENDER HELPERS
  // ========================

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.brandTitle}>METAL PORTAL</Text>
      <Text style={styles.brandSubtitle}>Join the Underground</Text>
      <Text style={styles.welcomeText}>Become part of the metal community</Text>
    </View>
  );

  const renderPasswordStrength = () => {
    if (!formData.password) return null;

    return (
      <View style={styles.passwordStrengthContainer}>
        <View style={styles.passwordStrengthHeader}>
          <Text style={styles.passwordStrengthLabel}>Password Strength:</Text>
          <Text style={[styles.passwordStrengthScore, { color: passwordStrength.color }]}>
            {passwordStrength.label}
          </Text>
        </View>
        
        <View style={styles.passwordStrengthBar}>
          {[1, 2, 3, 4, 5].map((index) => (
            <View
              key={index}
              style={[
                styles.passwordStrengthSegment,
                {
                  backgroundColor: index <= passwordStrength.score 
                    ? passwordStrength.color 
                    : metalPortalColors.semantic.border.light,
                },
              ]}
            />
          ))}
        </View>
        
        {passwordStrength.feedback.length > 0 && (
          <View style={styles.passwordFeedback}>
            {passwordStrength.feedback.map((feedback, index) => (
              <Text key={index} style={styles.passwordFeedbackText}>
                • {feedback}
              </Text>
            ))}
          </View>
        )}
      </View>
    );
  };

  const renderForm = () => (
    <Card variant="elevated" style={styles.formCard}>
      <View style={styles.formContainer}>
        <Text style={styles.formTitle}>Create Account</Text>
        
        {errors.general && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{errors.general}</Text>
          </View>
        )}

        <View style={styles.inputContainer}>
          <Input
            label="Email"
            value={formData.email}
            onChangeText={handleInputChange('email')}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            error={errors.email}
            disabled={isLoading}
            placeholder="Enter your email"
            testID="register-email-input"
          />
          
          <Input
            label="Username"
            value={formData.username}
            onChangeText={handleInputChange('username')}
            autoCapitalize="none"
            autoCorrect={false}
            error={errors.username}
            disabled={isLoading}
            placeholder="Choose a username"
            testID="register-username-input"
          />
          
          <Input
            label="Display Name"
            value={formData.displayName}
            onChangeText={handleInputChange('displayName')}
            autoCorrect={false}
            error={errors.displayName}
            disabled={isLoading}
            placeholder="How others will see you"
            testID="register-display-name-input"
          />
          
          <Input
            label="Password"
            value={formData.password}
            onChangeText={handleInputChange('password')}
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
            error={errors.password}
            disabled={isLoading}
            placeholder="Create a strong password"
            testID="register-password-input"
          />
          
          {renderPasswordStrength()}
          
          <Input
            label="Confirm Password"
            value={formData.confirmPassword}
            onChangeText={handleInputChange('confirmPassword')}
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
            error={errors.confirmPassword}
            disabled={isLoading}
            placeholder="Confirm your password"
            testID="register-confirm-password-input"
          />
        </View>

        <View style={styles.termsContainer}>
          <TouchableOpacity
            style={styles.termsCheckbox}
            onPress={() => handleInputChange('acceptTerms')(!formData.acceptTerms)}
            disabled={isLoading}
            testID="terms-checkbox"
          >
            <View style={[
              styles.checkbox,
              formData.acceptTerms && styles.checkboxChecked
            ]}>
              {formData.acceptTerms && <Text style={styles.checkmark}>✓</Text>}
            </View>
            <Text style={styles.termsText}>
              I accept the{' '}
              <Text style={styles.termsLink} onPress={handleTermsPress}>
                Terms of Service and Privacy Policy
              </Text>
            </Text>
          </TouchableOpacity>
          {errors.acceptTerms && (
            <Text style={styles.termsError}>{errors.acceptTerms}</Text>
          )}
        </View>

        <Button
          variant="primary"
          size="lg"
          fullWidth
          loading={isLoading}
          disabled={!isFormValid || isLoading}
          onPress={handleRegister}
          testID="register-submit-button"
        >
          Create Account
        </Button>
      </View>
    </Card>
  );

  const renderFooter = () => (
    <View style={styles.footer}>
      <View style={styles.loginContainer}>
        <Text style={styles.loginPrompt}>Already have an account?</Text>
        <TouchableOpacity 
          onPress={handleLogin}
          disabled={isLoading}
          testID="login-navigation-button"
        >
          <Text style={styles.loginLink}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  // ========================
  // MAIN RENDER
  // ========================

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <ScrollView
          style={styles.scrollContainer}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {renderHeader()}
          {renderForm()}
          {renderFooter()}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

// ========================
// STYLES
// ========================

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: metalPortalColors.semantic.background.primary,
  },
  
  keyboardContainer: {
    flex: 1,
  },
  
  scrollContainer: {
    flex: 1,
  },
  
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: metalPortalSpacing.base['4'],
    paddingVertical: metalPortalSpacing.base['6'],
  },
  
  header: {
    alignItems: 'center',
    marginBottom: metalPortalSpacing.base['8'],
  },
  
  brandTitle: {
    ...metalPortalTypography.styles.metal.bandName,
    fontFamily: Array.isArray(metalPortalTypography.styles.metal.bandName.fontFamily) 
      ? metalPortalTypography.styles.metal.bandName.fontFamily[0] 
      : metalPortalTypography.styles.metal.bandName.fontFamily,
    color: metalPortalColors.semantic.interactive.primary,
    marginBottom: metalPortalSpacing.base['2'],
    textAlign: 'center',
  },
  
  brandSubtitle: {
    ...metalPortalTypography.styles.heading.h3,
    fontFamily: Array.isArray(metalPortalTypography.styles.heading.h3.fontFamily) 
      ? metalPortalTypography.styles.heading.h3.fontFamily[0] 
      : metalPortalTypography.styles.heading.h3.fontFamily,
    color: metalPortalColors.semantic.text.secondary,
    marginBottom: metalPortalSpacing.base['4'],
    textAlign: 'center',
  },
  
  welcomeText: {
    ...metalPortalTypography.styles.body.default,
    fontFamily: Array.isArray(metalPortalTypography.styles.body.default.fontFamily) 
      ? metalPortalTypography.styles.body.default.fontFamily[0] 
      : metalPortalTypography.styles.body.default.fontFamily,
    color: metalPortalColors.semantic.text.muted,
    textAlign: 'center',
  },
  
  formCard: {
    marginBottom: metalPortalSpacing.base['6'],
  },
  
  formContainer: {
    padding: metalPortalSpacing.base['6'],
  },
  
  formTitle: {
    ...metalPortalTypography.styles.heading.h2,
    fontFamily: Array.isArray(metalPortalTypography.styles.heading.h2.fontFamily) 
      ? metalPortalTypography.styles.heading.h2.fontFamily[0] 
      : metalPortalTypography.styles.heading.h2.fontFamily,
    color: metalPortalColors.semantic.text.primary,
    textAlign: 'center',
    marginBottom: metalPortalSpacing.base['6'],
  },
  
  errorContainer: {
    backgroundColor: metalPortalColors.semantic.state.errorBg,
    borderColor: metalPortalColors.semantic.state.error,
    borderWidth: 1,
    borderRadius: metalPortalSpacing.semantic.radius.md,
    padding: metalPortalSpacing.base['3'],
    marginBottom: metalPortalSpacing.base['4'],
  },
  
  errorText: {
    ...metalPortalTypography.styles.body.small,
    fontFamily: Array.isArray(metalPortalTypography.styles.body.small.fontFamily) 
      ? metalPortalTypography.styles.body.small.fontFamily[0] 
      : metalPortalTypography.styles.body.small.fontFamily,
    color: metalPortalColors.semantic.state.error,
    textAlign: 'center',
  },
  
  inputContainer: {
    marginBottom: metalPortalSpacing.base['6'],
  },
  
  passwordStrengthContainer: {
    marginTop: metalPortalSpacing.base['2'],
    marginBottom: metalPortalSpacing.base['4'],
  },
  
  passwordStrengthHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: metalPortalSpacing.base['2'],
  },
  
  passwordStrengthLabel: {
    ...metalPortalTypography.styles.body.small,
    fontFamily: Array.isArray(metalPortalTypography.styles.body.small.fontFamily) 
      ? metalPortalTypography.styles.body.small.fontFamily[0] 
      : metalPortalTypography.styles.body.small.fontFamily,
    color: metalPortalColors.semantic.text.secondary,
  },
  
  passwordStrengthScore: {
    ...metalPortalTypography.styles.body.small,
    fontFamily: Array.isArray(metalPortalTypography.styles.body.small.fontFamily) 
      ? metalPortalTypography.styles.body.small.fontFamily[0] 
      : metalPortalTypography.styles.body.small.fontFamily,
    fontWeight: metalPortalTypography.weights.semibold,
  },
  
  passwordStrengthBar: {
    flexDirection: 'row',
    gap: metalPortalSpacing.base['1'],
    marginBottom: metalPortalSpacing.base['2'],
  },
  
  passwordStrengthSegment: {
    flex: 1,
    height: 4,
    borderRadius: 2,
  },
  
  passwordFeedback: {
    gap: metalPortalSpacing.base['1'],
  },
  
  passwordFeedbackText: {
    ...metalPortalTypography.styles.body.caption,
    fontFamily: Array.isArray(metalPortalTypography.styles.body.caption.fontFamily) 
      ? metalPortalTypography.styles.body.caption.fontFamily[0] 
      : metalPortalTypography.styles.body.caption.fontFamily,
    color: metalPortalColors.semantic.text.muted,
  },
  
  termsContainer: {
    marginBottom: metalPortalSpacing.base['6'],
  },
  
  termsCheckbox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: metalPortalSpacing.base['3'],
  },
  
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: metalPortalColors.semantic.border.default,
    borderRadius: metalPortalSpacing.semantic.radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  
  checkboxChecked: {
    backgroundColor: metalPortalColors.semantic.interactive.primary,
    borderColor: metalPortalColors.semantic.interactive.primary,
  },
  
  checkmark: {
    color: metalPortalColors.primitive.bone['100'],
    fontSize: 14,
    fontWeight: metalPortalTypography.weights.bold,
  },
  
  termsText: {
    ...metalPortalTypography.styles.body.small,
    fontFamily: Array.isArray(metalPortalTypography.styles.body.small.fontFamily) 
      ? metalPortalTypography.styles.body.small.fontFamily[0] 
      : metalPortalTypography.styles.body.small.fontFamily,
    color: metalPortalColors.semantic.text.secondary,
    flex: 1,
    lineHeight: 20,
  },
  
  termsLink: {
    color: metalPortalColors.semantic.interactive.primary,
    textDecorationLine: 'underline',
  },
  
  termsError: {
    ...metalPortalTypography.styles.body.caption,
    fontFamily: Array.isArray(metalPortalTypography.styles.body.caption.fontFamily) 
      ? metalPortalTypography.styles.body.caption.fontFamily[0] 
      : metalPortalTypography.styles.body.caption.fontFamily,
    color: metalPortalColors.semantic.state.error,
    marginTop: metalPortalSpacing.base['2'],
    marginLeft: metalPortalSpacing.base['8'],
  },
  
  footer: {
    alignItems: 'center',
  },
  
  loginContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: metalPortalSpacing.base['2'],
  },
  
  loginPrompt: {
    ...metalPortalTypography.styles.body.default,
    fontFamily: Array.isArray(metalPortalTypography.styles.body.default.fontFamily) 
      ? metalPortalTypography.styles.body.default.fontFamily[0] 
      : metalPortalTypography.styles.body.default.fontFamily,
    color: metalPortalColors.semantic.text.secondary,
  },
  
  loginLink: {
    ...metalPortalTypography.styles.interactive.link,
    fontFamily: Array.isArray(metalPortalTypography.styles.interactive.link.fontFamily) 
      ? metalPortalTypography.styles.interactive.link.fontFamily[0] 
      : metalPortalTypography.styles.interactive.link.fontFamily,
    color: metalPortalColors.semantic.interactive.primary,
    fontWeight: metalPortalTypography.weights.semibold,
  },
});

export default RegisterScreen;