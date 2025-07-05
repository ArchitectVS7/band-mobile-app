/**
 * METAL PORTAL - EDIT PROFILE SCREEN
 * 
 * Profile editing screen with comprehensive form validation and Metal Portal branding
 * Integrates with user store and design system
 * 
 * FEATURES:
 * - Complete profile editing form
 * - Avatar upload functionality
 * - Form validation with real-time feedback
 * - Genre selection with multi-select
 * - Privacy settings integration
 * - Bio editing with character counter
 * - Save/cancel functionality
 * - Loading states and error handling
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
  SafeAreaView,
  TouchableOpacity,
  Image,
  Alert,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// Design System Imports
import { 
  Button, 
  Input, 
  Card, 
  metalPortalColors, 
  metalPortalSpacing, 
  metalPortalTypography,
} from '../../design-system';

// Store and Types
import { useUserStore } from '../../store/userStore';
import { useAuthStore } from '../../store/authStore';
import { ProfileStackParamList } from '../../navigation/types';
import { UpdateUserProfile } from '../../types/user';
import { isValidEmail } from '../../utils/validation';

// ========================
// TYPES & INTERFACES
// ========================

type EditProfileScreenNavigationProp = NativeStackNavigationProp<ProfileStackParamList, 'EditProfile'>;

interface EditProfileFormData {
  displayName: string;
  bio: string;
  location: string;
  favoriteGenres: string[];
  profileVisibility: 'public' | 'fans_only' | 'private';
  allowDirectMessages: boolean;
  allowMentions: boolean;
}

interface EditProfileFormErrors {
  displayName?: string;
  bio?: string;
  location?: string;
  favoriteGenres?: string;
  general?: string;
}

// ========================
// CONSTANTS
// ========================

const METAL_GENRES = [
  'Heavy Metal',
  'Death Metal', 
  'Black Metal',
  'Thrash Metal',
  'Power Metal',
  'Progressive Metal',
  'Doom Metal',
  'Folk Metal',
  'Symphonic Metal',
  'Metalcore',
  'Deathcore',
  'Nu Metal',
  'Industrial Metal',
  'Gothic Metal',
  'Sludge Metal',
];

const MAX_BIO_LENGTH = 500;

// ========================
// EDIT PROFILE SCREEN COMPONENT
// ========================

export const EditProfileScreen: React.FC = () => {
  const navigation = useNavigation<EditProfileScreenNavigationProp>();
  
  // Store access
  const { 
    currentUser,
    isLoading,
    error,
    updateProfile,
    setError 
  } = useUserStore();
  
  const { user: authUser } = useAuthStore();

  // Component state
  const [formData, setFormData] = useState<EditProfileFormData>({
    displayName: '',
    bio: '',
    location: '',
    favoriteGenres: [],
    profileVisibility: 'public',
    allowDirectMessages: true,
    allowMentions: true,
  });
  
  const [errors, setErrors] = useState<EditProfileFormErrors>({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [avatarError, setAvatarError] = useState(false);

  // ========================
  // EFFECTS
  // ========================

  useEffect(() => {
    initializeForm();
  }, [currentUser, authUser]);

  useEffect(() => {
    validateForm();
  }, [formData]);

  useEffect(() => {
    if (error) {
      Alert.alert('Error', error, [
        { text: 'OK', onPress: () => setError(null) }
      ]);
    }
  }, [error]);

  // ========================
  // FORM INITIALIZATION
  // ========================

  const initializeForm = () => {
    const user = currentUser || authUser;
    if (user) {
      setFormData({
        displayName: user.displayName || '',
        bio: (user as any).bio || '',
        location: (user as any).location || '',
        favoriteGenres: (user as any).favoriteGenres || [],
        profileVisibility: (user as any).profileVisibility || 'public',
        allowDirectMessages: (user as any).allowDirectMessages ?? true,
        allowMentions: (user as any).allowMentions ?? true,
      });
    }
  };

  // ========================
  // FORM VALIDATION
  // ========================

  const validateForm = () => {
    const newErrors: EditProfileFormErrors = {};
    
    // Display name validation
    if (!formData.displayName.trim()) {
      newErrors.displayName = 'Display name is required';
    } else if (formData.displayName.length < 2) {
      newErrors.displayName = 'Display name must be at least 2 characters';
    } else if (formData.displayName.length > 50) {
      newErrors.displayName = 'Display name must be less than 50 characters';
    }
    
    // Bio validation
    if (formData.bio.length > MAX_BIO_LENGTH) {
      newErrors.bio = `Bio must be less than ${MAX_BIO_LENGTH} characters`;
    }
    
    // Location validation
    if (formData.location.length > 100) {
      newErrors.location = 'Location must be less than 100 characters';
    }
    
    // Genres validation
    if (formData.favoriteGenres.length > 5) {
      newErrors.favoriteGenres = 'Please select no more than 5 genres';
    }
    
    setErrors(prev => ({ ...prev, ...newErrors, general: prev.general }));
    setIsFormValid(Object.keys(newErrors).length === 0);
    
    // Check if form has changes
    const user = currentUser || authUser;
    const hasFormChanges = user && (
      formData.displayName !== (user.displayName || '') ||
      formData.bio !== ((user as any).bio || '') ||
      formData.location !== ((user as any).location || '') ||
      JSON.stringify(formData.favoriteGenres) !== JSON.stringify((user as any).favoriteGenres || []) ||
      formData.profileVisibility !== ((user as any).profileVisibility || 'public') ||
      formData.allowDirectMessages !== ((user as any).allowDirectMessages ?? true) ||
      formData.allowMentions !== ((user as any).allowMentions ?? true)
    );
    
    setHasChanges(!!hasFormChanges);
  };

  // ========================
  // EVENT HANDLERS
  // ========================

  const handleInputChange = (field: keyof EditProfileFormData) => (value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear field-specific error when user starts typing
    if (field in errors && errors[field as keyof EditProfileFormErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleGenreToggle = (genre: string) => {
    setFormData(prev => ({
      ...prev,
      favoriteGenres: prev.favoriteGenres.includes(genre)
        ? prev.favoriteGenres.filter(g => g !== genre)
        : [...prev.favoriteGenres, genre]
    }));
  };

  const handleAvatarUpload = () => {
    // TODO: Implement avatar upload (Task 4.3)
    Alert.alert('Coming Soon', 'Avatar upload will be available in the next update');
  };

  const handleSave = async () => {
    if (!isFormValid || !hasChanges || isLoading) return;

    try {
      const updates: UpdateUserProfile = {
        displayName: formData.displayName,
        bio: formData.bio,
        location: formData.location,
        favoriteGenres: formData.favoriteGenres,
        profileVisibility: formData.profileVisibility,
        allowDirectMessages: formData.allowDirectMessages,
        allowMentions: formData.allowMentions,
      };

      await updateProfile(updates);
      Alert.alert('Success', 'Profile updated successfully', [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]);
    } catch (error) {
      console.error('Profile update error:', error);
      setErrors(prev => ({ 
        ...prev, 
        general: 'Failed to update profile. Please try again.' 
      }));
    }
  };

  const handleCancel = () => {
    if (hasChanges) {
      Alert.alert(
        'Discard Changes',
        'Are you sure you want to discard your changes?',
        [
          { text: 'Keep Editing', style: 'cancel' },
          { text: 'Discard', style: 'destructive', onPress: () => navigation.goBack() }
        ]
      );
    } else {
      navigation.goBack();
    }
  };

  // ========================
  // COMPUTED VALUES
  // ========================

  const user = currentUser || authUser;
  const avatarUri = user?.avatar;
  const initials = formData.displayName 
    ? formData.displayName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
    : user?.username?.substring(0, 2).toUpperCase() || 'MP';

  const bioCharacterCount = formData.bio.length;
  const bioCharacterColor = bioCharacterCount > MAX_BIO_LENGTH * 0.9 
    ? metalPortalColors.semantic.state.error
    : bioCharacterCount > MAX_BIO_LENGTH * 0.7
    ? metalPortalColors.semantic.state.warning
    : metalPortalColors.semantic.text.muted;

  // ========================
  // RENDER HELPERS
  // ========================

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.title}>Edit Profile</Text>
      <Text style={styles.subtitle}>Update your Metal Portal profile</Text>
    </View>
  );

  const renderAvatar = () => (
    <Card variant="elevated" style={styles.avatarCard}>
      <View style={styles.avatarContainer}>
        <Text style={styles.sectionTitle}>Profile Picture</Text>
        
        <TouchableOpacity
          style={styles.avatarTouchable}
          onPress={handleAvatarUpload}
          testID="avatar-upload-button"
        >
          {avatarUri && !avatarError ? (
            <Image
              source={{ uri: avatarUri }}
              style={styles.avatar}
              onError={() => setAvatarError(true)}
            />
          ) : (
            <View style={styles.avatarFallback}>
              <Text style={styles.avatarInitials}>{initials}</Text>
            </View>
          )}
          
          <View style={styles.avatarOverlay}>
            <Text style={styles.avatarOverlayText}>Change</Text>
          </View>
        </TouchableOpacity>
      </View>
    </Card>
  );

  const renderBasicInfo = () => (
    <Card variant="elevated" style={styles.formCard}>
      <View style={styles.formContainer}>
        <Text style={styles.sectionTitle}>Basic Information</Text>
        
        {errors.general && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{errors.general}</Text>
          </View>
        )}

        <View style={styles.inputContainer}>
          <Input
            label="Display Name"
            value={formData.displayName}
            onChangeText={handleInputChange('displayName')}
            error={errors.displayName}
            disabled={isLoading}
            placeholder="Enter your display name"
            testID="edit-display-name-input"
          />
          
          <Input
            label="Location"
            value={formData.location}
            onChangeText={handleInputChange('location')}
            error={errors.location}
            disabled={isLoading}
            placeholder="Enter your location (optional)"
            testID="edit-location-input"
          />
        </View>
      </View>
    </Card>
  );

  const renderBio = () => (
    <Card variant="elevated" style={styles.formCard}>
      <View style={styles.formContainer}>
        <Text style={styles.sectionTitle}>About You</Text>
        
        <View style={styles.bioContainer}>
          <Input
            label="Bio"
            value={formData.bio}
            onChangeText={handleInputChange('bio')}
            error={errors.bio}
            disabled={isLoading}
            placeholder="Tell us about yourself..."
            multiline
            numberOfLines={4}
            maxLength={MAX_BIO_LENGTH}
            testID="edit-bio-input"
          />
          
          <View style={styles.bioCounter}>
            <Text style={[styles.bioCounterText, { color: bioCharacterColor }]}>
              {bioCharacterCount}/{MAX_BIO_LENGTH}
            </Text>
          </View>
        </View>
      </View>
    </Card>
  );

  const renderGenres = () => (
    <Card variant="elevated" style={styles.formCard}>
      <View style={styles.formContainer}>
        <Text style={styles.sectionTitle}>Favorite Genres</Text>
        <Text style={styles.sectionSubtitle}>Select up to 5 genres you love</Text>
        
        {errors.favoriteGenres && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{errors.favoriteGenres}</Text>
          </View>
        )}
        
        <View style={styles.genreGrid}>
          {METAL_GENRES.map((genre) => (
            <TouchableOpacity
              key={genre}
              style={[
                styles.genreChip,
                formData.favoriteGenres.includes(genre) && styles.genreChipSelected
              ]}
              onPress={() => handleGenreToggle(genre)}
              disabled={isLoading}
              testID={`genre-${genre.toLowerCase().replace(/\s+/g, '-')}`}
            >
              <Text style={[
                styles.genreChipText,
                formData.favoriteGenres.includes(genre) && styles.genreChipTextSelected
              ]}>
                {genre}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </Card>
  );

  const renderPrivacySettings = () => (
    <Card variant="elevated" style={styles.formCard}>
      <View style={styles.formContainer}>
        <Text style={styles.sectionTitle}>Privacy Settings</Text>
        
        <View style={styles.privacyContainer}>
          <View style={styles.privacyOption}>
            <Text style={styles.privacyLabel}>Profile Visibility</Text>
            <View style={styles.privacyButtons}>
              {(['public', 'fans_only', 'private'] as const).map((visibility) => (
                <TouchableOpacity
                  key={visibility}
                  style={[
                    styles.privacyButton,
                    formData.profileVisibility === visibility && styles.privacyButtonSelected
                  ]}
                  onPress={() => handleInputChange('profileVisibility')(visibility)}
                  disabled={isLoading}
                  testID={`privacy-${visibility}`}
                >
                  <Text style={[
                    styles.privacyButtonText,
                    formData.profileVisibility === visibility && styles.privacyButtonTextSelected
                  ]}>
                    {visibility === 'fans_only' ? 'Fans Only' : 
                     visibility === 'private' ? 'Private' : 'Public'}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          
          <View style={styles.privacyOption}>
            <TouchableOpacity
              style={styles.privacyToggle}
              onPress={() => handleInputChange('allowDirectMessages')(!formData.allowDirectMessages)}
              disabled={isLoading}
              testID="privacy-direct-messages"
            >
              <Text style={styles.privacyToggleLabel}>Allow Direct Messages</Text>
              <View style={[
                styles.privacyToggleSwitch,
                formData.allowDirectMessages && styles.privacyToggleSwitchOn
              ]}>
                <View style={[
                  styles.privacyToggleThumb,
                  formData.allowDirectMessages && styles.privacyToggleThumbOn
                ]} />
              </View>
            </TouchableOpacity>
          </View>
          
          <View style={styles.privacyOption}>
            <TouchableOpacity
              style={styles.privacyToggle}
              onPress={() => handleInputChange('allowMentions')(!formData.allowMentions)}
              disabled={isLoading}
              testID="privacy-mentions"
            >
              <Text style={styles.privacyToggleLabel}>Allow Mentions</Text>
              <View style={[
                styles.privacyToggleSwitch,
                formData.allowMentions && styles.privacyToggleSwitchOn
              ]}>
                <View style={[
                  styles.privacyToggleThumb,
                  formData.allowMentions && styles.privacyToggleThumbOn
                ]} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Card>
  );

  const renderActions = () => (
    <View style={styles.actionContainer}>
      <Button
        variant="ghost"
        size="lg"
        onPress={handleCancel}
        disabled={isLoading}
        style={styles.cancelButton}
        testID="edit-profile-cancel-button"
      >
        Cancel
      </Button>
      
      <Button
        variant="primary"
        size="lg"
        onPress={handleSave}
        loading={isLoading}
        disabled={!isFormValid || !hasChanges || isLoading}
        style={styles.saveButton}
        testID="edit-profile-save-button"
      >
        Save Changes
      </Button>
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
          {renderAvatar()}
          {renderBasicInfo()}
          {renderBio()}
          {renderGenres()}
          {renderPrivacySettings()}
          {renderActions()}
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
    padding: metalPortalSpacing.base['4'],
    paddingBottom: metalPortalSpacing.base['8'],
  },
  
  header: {
    alignItems: 'center',
    marginBottom: metalPortalSpacing.base['6'],
  },
  
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: metalPortalColors.semantic.text.primary,
    textAlign: 'center',
  },
  
  subtitle: {
    fontSize: 16,
    color: metalPortalColors.semantic.text.muted,
    textAlign: 'center',
    marginTop: metalPortalSpacing.base['2'],
  },
  
  avatarCard: {
    marginBottom: metalPortalSpacing.base['4'],
  },
  
  avatarContainer: {
    padding: metalPortalSpacing.base['4'],
    alignItems: 'center',
  },
  
  avatarTouchable: {
    position: 'relative',
    marginTop: metalPortalSpacing.base['3'],
  },
  
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: metalPortalColors.semantic.interactive.primary,
  },
  
  avatarFallback: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: metalPortalColors.semantic.background.secondary,
    borderWidth: 3,
    borderColor: metalPortalColors.semantic.interactive.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  avatarInitials: {
    fontSize: 36,
    fontWeight: 'bold',
    color: metalPortalColors.semantic.text.primary,
  },
  
  avatarOverlay: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: metalPortalColors.semantic.interactive.primary,
    borderRadius: 15,
    paddingHorizontal: metalPortalSpacing.base['2'],
    paddingVertical: metalPortalSpacing.base['1'],
    borderWidth: 2,
    borderColor: metalPortalColors.semantic.background.primary,
  },
  
  avatarOverlayText: {
    fontSize: 12,
    fontWeight: 'semibold',
    color: metalPortalColors.semantic.text.inverse,
  },
  
  formCard: {
    marginBottom: metalPortalSpacing.base['4'],
  },
  
  formContainer: {
    padding: metalPortalSpacing.base['4'],
  },
  
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: metalPortalColors.semantic.text.primary,
    marginBottom: metalPortalSpacing.base['3'],
  },
  
  sectionSubtitle: {
    fontSize: 14,
    color: metalPortalColors.semantic.text.muted,
    marginBottom: metalPortalSpacing.base['4'],
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
    fontSize: 14,
    color: metalPortalColors.semantic.state.error,
    textAlign: 'center',
  },
  
  inputContainer: {
    gap: metalPortalSpacing.base['4'],
  },
  
  bioContainer: {
    position: 'relative',
  },
  
  bioCounter: {
    alignItems: 'flex-end',
    marginTop: metalPortalSpacing.base['2'],
  },
  
  bioCounterText: {
    fontSize: 12,
  },
  
  genreGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: metalPortalSpacing.base['2'],
  },
  
  genreChip: {
    backgroundColor: metalPortalColors.semantic.background.secondary,
    borderColor: metalPortalColors.semantic.border.default,
    borderWidth: 1,
    borderRadius: metalPortalSpacing.semantic.radius.full,
    paddingHorizontal: metalPortalSpacing.base['3'],
    paddingVertical: metalPortalSpacing.base['2'],
  },
  
  genreChipSelected: {
    backgroundColor: metalPortalColors.semantic.interactive.primary,
    borderColor: metalPortalColors.semantic.interactive.primary,
  },
  
  genreChipText: {
    fontSize: 14,
    color: metalPortalColors.semantic.text.primary,
  },
  
  genreChipTextSelected: {
    color: metalPortalColors.semantic.text.inverse,
    fontWeight: 'semibold',
  },
  
  privacyContainer: {
    gap: metalPortalSpacing.base['4'],
  },
  
  privacyOption: {
    gap: metalPortalSpacing.base['2'],
  },
  
  privacyLabel: {
    fontSize: 16,
    fontWeight: 'semibold',
    color: metalPortalColors.semantic.text.primary,
  },
  
  privacyButtons: {
    flexDirection: 'row',
    gap: metalPortalSpacing.base['2'],
  },
  
  privacyButton: {
    flex: 1,
    backgroundColor: metalPortalColors.semantic.background.secondary,
    borderColor: metalPortalColors.semantic.border.default,
    borderWidth: 1,
    borderRadius: metalPortalSpacing.semantic.radius.md,
    paddingVertical: metalPortalSpacing.base['2'],
    paddingHorizontal: metalPortalSpacing.base['3'],
    alignItems: 'center',
  },
  
  privacyButtonSelected: {
    backgroundColor: metalPortalColors.semantic.interactive.primary,
    borderColor: metalPortalColors.semantic.interactive.primary,
  },
  
  privacyButtonText: {
    fontSize: 14,
    color: metalPortalColors.semantic.text.primary,
  },
  
  privacyButtonTextSelected: {
    color: metalPortalColors.semantic.text.inverse,
    fontWeight: 'semibold',
  },
  
  privacyToggle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: metalPortalSpacing.base['2'],
  },
  
  privacyToggleLabel: {
    fontSize: 16,
    color: metalPortalColors.semantic.text.primary,
  },
  
  privacyToggleSwitch: {
    width: 50,
    height: 26,
    borderRadius: 13,
    backgroundColor: metalPortalColors.semantic.background.secondary,
    borderWidth: 2,
    borderColor: metalPortalColors.semantic.border.default,
    justifyContent: 'center',
    paddingHorizontal: 2,
  },
  
  privacyToggleSwitchOn: {
    backgroundColor: metalPortalColors.semantic.interactive.primary,
    borderColor: metalPortalColors.semantic.interactive.primary,
  },
  
  privacyToggleThumb: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: metalPortalColors.semantic.text.primary,
    alignSelf: 'flex-start',
  },
  
  privacyToggleThumbOn: {
    alignSelf: 'flex-end',
    backgroundColor: metalPortalColors.semantic.text.inverse,
  },
  
  actionContainer: {
    flexDirection: 'row',
    gap: metalPortalSpacing.base['3'],
    marginTop: metalPortalSpacing.base['4'],
  },
  
  cancelButton: {
    flex: 1,
    borderColor: metalPortalColors.semantic.border.default,
  },
  
  saveButton: {
    flex: 1,
  },
});

export default EditProfileScreen;