/**
 * METAL PORTAL - LOGIN SCREEN
 * 
 * Login screen with Metal Portal branding and comprehensive form validation
 * Integrates with authentication store and design system
 * 
 * FEATURES:
 * - Email and password validation
 * - Loading states with disabled form
 * - Error handling and display
 * - Biometric authentication option
 * - Forgot password navigation
 * - Register screen navigation
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
  Alert,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// Design System Imports
import { 
  Button, 
  Input, 
  Card, 
  metalPortalColors, 
  metalPortalSpacing, 
  metalPortalTypography,
  presets 
} from '../../design-system';

// Store and Types
import { useAuthStore } from '../../store/authStore';
import { AuthStackParamList } from '../../navigation/types';
import { isValidEmail, isValidPassword } from '../../utils/validation';

// ========================
// TYPES & INTERFACES
// ========================

type LoginScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'Login'>;

interface LoginFormData {
  email: string;
  password: string;
}

interface LoginFormErrors {
  email?: string;
  password?: string;
  general?: string;
}

// ========================
// LOGIN SCREEN COMPONENT
// ========================

export const LoginScreen: React.FC = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  
  // Auth store
  const { 
    login, 
    isLoading, 
    error: authError,
    clearError
  } = useAuthStore();

  // Form state
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
  });
  
  const [errors, setErrors] = useState<LoginFormErrors>({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [showBiometric, setShowBiometric] = useState(false);

  // ========================
  // EFFECTS
  // ========================

  useEffect(() => {
    // Check if biometric credentials are available
    checkBiometricAvailability();
  }, []);

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
    const newErrors: LoginFormErrors = {};
    
    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    // Password validation (less strict for login)
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 3) {
      newErrors.password = 'Password must be at least 3 characters';
    }
    
    setErrors(prev => ({ ...prev, ...newErrors, general: prev.general }));
    setIsFormValid(Object.keys(newErrors).length === 0 && !!formData.email && !!formData.password);
  };

  // ========================
  // EVENT HANDLERS
  // ========================

  const checkBiometricAvailability = async () => {
    // TODO: Implement biometric check when auth store supports it
    setShowBiometric(false);
  };

  const handleInputChange = (field: keyof LoginFormData) => (value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear field-specific error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleLogin = async () => {
    if (!isFormValid || isLoading) return;

    try {
      clearError();
      await login({
        identifier: formData.email,
        password: formData.password,
      });
      // Navigation is handled by the auth store/navigation listener
      console.log('Login successful');
    } catch (error) {
      console.error('Login error:', error);
      setErrors(prev => ({ 
        ...prev, 
        general: 'An unexpected error occurred. Please try again.' 
      }));
    }
  };

  const handleBiometricLogin = async () => {
    // TODO: Implement when biometric login is available
    Alert.alert('Coming Soon', 'Biometric login will be available in a future update');
  };

  const handleForgotPassword = () => {
    navigation.navigate('ForgotPassword');
  };

  const handleRegister = () => {
    navigation.navigate('Register', { email: formData.email });
  };

  // ========================
  // RENDER HELPERS
  // ========================

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.brandTitle}>METAL PORTAL</Text>
      <Text style={styles.brandSubtitle}>Enter the Void</Text>
      <Text style={styles.welcomeText}>Welcome back to the underground</Text>
    </View>
  );

  const renderForm = () => (
    <Card variant="elevated" style={styles.formCard}>
      <View style={styles.formContainer}>
        <Text style={styles.formTitle}>Sign In</Text>
        
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
            testID="login-email-input"
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
            placeholder="Enter your password"
            testID="login-password-input"
          />
        </View>

        <View style={styles.actionContainer}>
          <Button
            variant="primary"
            size="lg"
            fullWidth
            loading={isLoading}
            disabled={!isFormValid || isLoading}
            onPress={handleLogin}
            testID="login-submit-button"
          >
            Sign In
          </Button>

          {showBiometric && (
            <Button
              variant="secondary"
              size="md"
              fullWidth
              disabled={isLoading}
              onPress={handleBiometricLogin}
              style={styles.biometricButton}
              testID="login-biometric-button"
            >
              Use Biometric Login
            </Button>
          )}
        </View>
      </View>
    </Card>
  );

  const renderFooter = () => (
    <View style={styles.footer}>
      <TouchableOpacity 
        onPress={handleForgotPassword}
        style={styles.forgotPasswordButton}
        disabled={isLoading}
        testID="forgot-password-button"
      >
        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
      </TouchableOpacity>

      <View style={styles.registerContainer}>
        <Text style={styles.registerPrompt}>New to Metal Portal?</Text>
        <TouchableOpacity 
          onPress={handleRegister}
          disabled={isLoading}
          testID="register-navigation-button"
        >
          <Text style={styles.registerLink}>Create Account</Text>
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
  
  actionContainer: {
    gap: metalPortalSpacing.base['3'],
  },
  
  biometricButton: {
    marginTop: metalPortalSpacing.base['2'],
  },
  
  footer: {
    alignItems: 'center',
    gap: metalPortalSpacing.base['6'],
  },
  
  forgotPasswordButton: {
    padding: metalPortalSpacing.base['3'],
  },
  
  forgotPasswordText: {
    ...metalPortalTypography.styles.interactive.link,
    fontFamily: Array.isArray(metalPortalTypography.styles.interactive.link.fontFamily) 
      ? metalPortalTypography.styles.interactive.link.fontFamily[0] 
      : metalPortalTypography.styles.interactive.link.fontFamily,
    color: metalPortalColors.semantic.interactive.primary,
    textAlign: 'center',
  },
  
  registerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: metalPortalSpacing.base['2'],
  },
  
  registerPrompt: {
    ...metalPortalTypography.styles.body.default,
    fontFamily: Array.isArray(metalPortalTypography.styles.body.default.fontFamily) 
      ? metalPortalTypography.styles.body.default.fontFamily[0] 
      : metalPortalTypography.styles.body.default.fontFamily,
    color: metalPortalColors.semantic.text.secondary,
  },
  
  registerLink: {
    ...metalPortalTypography.styles.interactive.link,
    fontFamily: Array.isArray(metalPortalTypography.styles.interactive.link.fontFamily) 
      ? metalPortalTypography.styles.interactive.link.fontFamily[0] 
      : metalPortalTypography.styles.interactive.link.fontFamily,
    color: metalPortalColors.semantic.interactive.primary,
    fontWeight: metalPortalTypography.weights.semibold,
  },
});

export default LoginScreen;