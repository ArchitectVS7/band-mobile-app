/**
 * METAL PORTAL - USER PROFILE SCREEN
 * 
 * User profile display screen with Metal Portal branding and comprehensive profile information
 * Integrates with user store and design system
 * 
 * FEATURES:
 * - Complete profile information display
 * - Avatar display with fallback
 * - Subscription tier display
 * - User statistics and achievements
 * - Profile action buttons
 * - Role-based UI elements
 * - Navigation to edit profile
 * - Settings and management access
 * - Metal Portal branding
 * - Accessibility support
 * - Type-safe navigation
 */

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Image,
  RefreshControl,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// Design System Imports
import { 
  Button, 
  Card, 
  metalPortalColors, 
  metalPortalSpacing, 
  metalPortalTypography,
} from '../../design-system';

// Store and Types
import { useUserStore } from '../../store/userStore';
import { useAuthStore } from '../../store/authStore';
import { ProfileStackParamList } from '../../navigation/types';
import { formatNumber } from '../../utils/format';
import { hasRole } from '../../utils/auth';
import { UserRole, SubscriptionTier } from '../../types/auth';

// ========================
// TYPES & INTERFACES
// ========================

type ProfileScreenNavigationProp = NativeStackNavigationProp<ProfileStackParamList, 'Profile'>;

interface ProfileStatItem {
  label: string;
  value: string | number;
  color?: string;
}

interface ProfileAction {
  title: string;
  icon: string;
  onPress: () => void;
  color?: string;
  disabled?: boolean;
}

// ========================
// PROFILE SCREEN COMPONENT
// ========================

export const ProfileScreen: React.FC = () => {
  const navigation = useNavigation<ProfileScreenNavigationProp>();
  
  // Store access
  const { 
    currentUser,
    userStatistics,
    isLoading,
    error,
    getUserStatistics,
    setError 
  } = useUserStore();
  
  const { 
    user: authUser,
    logout 
  } = useAuthStore();

  // Component state
  const [refreshing, setRefreshing] = useState(false);
  const [avatarError, setAvatarError] = useState(false);

  // ========================
  // EFFECTS
  // ========================

  useEffect(() => {
    loadUserStatistics();
  }, []);

  useEffect(() => {
    if (error) {
      Alert.alert('Error', error, [
        { text: 'OK', onPress: () => setError(null) }
      ]);
    }
  }, [error]);

  // ========================
  // DATA LOADING
  // ========================

  const loadUserStatistics = async () => {
    try {
      await getUserStatistics();
    } catch (err) {
      console.error('Failed to load user statistics:', err);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await loadUserStatistics();
    } catch (err) {
      console.error('Failed to refresh profile:', err);
    } finally {
      setRefreshing(false);
    }
  };

  // ========================
  // EVENT HANDLERS
  // ========================

  const handleEditProfile = () => {
    navigation.navigate('EditProfile');
  };

  const handleSettings = () => {
    navigation.navigate('Settings');
  };

  const handleMyPosts = () => {
    navigation.navigate('MyPosts');
  };

  const handleMyEvents = () => {
    navigation.navigate('MyEvents');
  };

  const handleSubscription = () => {
    navigation.navigate('Subscription');
  };

  const handleAchievements = () => {
    navigation.navigate('Achievements');
  };

  const handleStatistics = () => {
    navigation.navigate('Statistics');
  };

  const handleVIPAccess = () => {
    navigation.navigate('VIPAccess');
  };

  const handleBandManagement = () => {
    navigation.navigate('BandManagement');
  };

  const handleModeratorPanel = () => {
    navigation.navigate('ModeratorPanel');
  };

  const handleAdminPanel = () => {
    navigation.navigate('AdminPanel');
  };

  const handleLogout = async () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Logout', 
          style: 'destructive',
          onPress: async () => {
            try {
              await logout();
            } catch (err) {
              console.error('Logout error:', err);
            }
          }
        }
      ]
    );
  };

  // ========================
  // COMPUTED VALUES
  // ========================

  const user = currentUser || authUser;
  const userRole = user?.role || UserRole.GUEST;
  const subscriptionTier = user?.subscriptionTier || SubscriptionTier.FREE;
  
  // Simple date formatter
  const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(new Date(date));
  };
  
  const profileStats: ProfileStatItem[] = [
    {
      label: 'Posts',
      value: formatNumber(userStatistics?.totalPosts || 0),
      color: metalPortalColors.semantic.interactive.primary,
    },
    {
      label: 'Comments',
      value: formatNumber(userStatistics?.totalComments || 0),
      color: metalPortalColors.semantic.state.success,
    },
    {
      label: 'Likes',
      value: formatNumber(userStatistics?.totalLikes || 0),
      color: metalPortalColors.semantic.interactive.primary,
    },
    {
      label: 'Forum Posts',
      value: formatNumber(userStatistics?.forumPosts || 0),
      color: metalPortalColors.semantic.interactive.secondary,
    },
  ];

  const primaryActions: ProfileAction[] = [
    {
      title: 'Edit Profile',
      icon: 'edit',
      onPress: handleEditProfile,
    },
    {
      title: 'My Posts',
      icon: 'file-text',
      onPress: handleMyPosts,
    },
    {
      title: 'My Events',
      icon: 'calendar',
      onPress: handleMyEvents,
    },
    {
      title: 'Settings',
      icon: 'settings',
      onPress: handleSettings,
    },
  ];

  const subscriptionActions: ProfileAction[] = [
    {
      title: 'Subscription',
      icon: 'star',
      onPress: handleSubscription,
      color: metalPortalColors.semantic.interactive.primary,
    },
    ...(subscriptionTier === SubscriptionTier.VIP ? [{
      title: 'VIP Access',
      icon: 'crown',
      onPress: handleVIPAccess,
      color: metalPortalColors.semantic.interactive.primary,
    }] : []),
  ];

  const managementActions: ProfileAction[] = [
    ...(hasRole(userRole, UserRole.BAND_MEMBER) ? [{
      title: 'Band Management',
      icon: 'music',
      onPress: handleBandManagement,
      color: metalPortalColors.semantic.interactive.primary,
    }] : []),
    ...(hasRole(userRole, UserRole.MODERATOR) ? [{
      title: 'Moderator Panel',
      icon: 'shield',
      onPress: handleModeratorPanel,
      color: metalPortalColors.semantic.state.warning,
    }] : []),
    ...(hasRole(userRole, UserRole.ADMIN) ? [{
      title: 'Admin Panel',
      icon: 'settings',
      onPress: handleAdminPanel,
      color: metalPortalColors.semantic.state.error,
    }] : []),
  ];

  const secondaryActions: ProfileAction[] = [
    {
      title: 'Achievements',
      icon: 'award',
      onPress: handleAchievements,
    },
    {
      title: 'Statistics',
      icon: 'bar-chart',
      onPress: handleStatistics,
    },
  ];

  // ========================
  // RENDER HELPERS
  // ========================

  const renderAvatar = () => {
    const avatarSize = 120;
    const avatarUri = user?.avatar;
    const initials = user?.displayName 
      ? user.displayName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
      : user?.username?.substring(0, 2).toUpperCase() || 'MP';

    return (
      <View style={styles.avatarContainer}>
        {avatarUri && !avatarError ? (
          <Image
            source={{ uri: avatarUri }}
            style={[styles.avatar, { width: avatarSize, height: avatarSize }]}
            onError={() => setAvatarError(true)}
            testID="profile-avatar"
          />
        ) : (
          <View style={[styles.avatarFallback, { width: avatarSize, height: avatarSize }]}>
            <Text style={styles.avatarInitials}>{initials}</Text>
          </View>
        )}
        
        {/* Role badge */}
        {userRole !== UserRole.GUEST && (
          <View style={styles.roleBadge}>
            <Text style={styles.roleBadgeText}>
              {userRole.replace('_', ' ')}
            </Text>
          </View>
        )}
      </View>
    );
  };

  const renderUserInfo = () => (
    <View style={styles.userInfoContainer}>
      <Text style={styles.displayName}>
        {user?.displayName || user?.username || 'Metal Portal User'}
      </Text>
      
      {user?.username && user?.displayName && (
        <Text style={styles.username}>@{user.username}</Text>
      )}
      
      {(user as any)?.bio && (
        <Text style={styles.bio}>{(user as any).bio}</Text>
      )}
      
      <View style={styles.metaInfo}>
        <Text style={styles.metaText}>
          Joined {formatDate(user?.createdAt || new Date())}
        </Text>
        
        {subscriptionTier !== SubscriptionTier.FREE && (
          <View style={styles.subscriptionBadge}>
            <Text style={styles.subscriptionText}>
              {subscriptionTier} MEMBER
            </Text>
          </View>
        )}
      </View>
    </View>
  );

  const renderStats = () => (
    <Card variant="elevated" style={styles.statsCard}>
      <View style={styles.statsContainer}>
        <Text style={styles.sectionTitle}>Activity</Text>
        <View style={styles.statsGrid}>
          {profileStats.map((stat, index) => (
            <View key={index} style={styles.statItem}>
              <Text style={[styles.statValue, { color: stat.color }]}>
                {stat.value}
              </Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>
      </View>
    </Card>
  );

  const renderActions = (actions: ProfileAction[], title: string) => (
    <Card variant="elevated" style={styles.actionsCard}>
      <View style={styles.actionsContainer}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <View style={styles.actionsGrid}>
          {actions.map((action, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.actionButton,
                action.disabled && styles.actionButtonDisabled
              ]}
              onPress={action.onPress}
              disabled={action.disabled}
              testID={`profile-action-${action.title.toLowerCase().replace(/\s+/g, '-')}`}
            >
              <Text style={[styles.actionIcon, { color: action.color || metalPortalColors.semantic.text.primary }]}>
                {action.icon === 'edit' ? '✏️' : 
                 action.icon === 'file-text' ? '📄' : 
                 action.icon === 'calendar' ? '📅' : 
                 action.icon === 'settings' ? '⚙️' : 
                 action.icon === 'star' ? '⭐' : 
                 action.icon === 'crown' ? '👑' : 
                 action.icon === 'music' ? '🎵' : 
                 action.icon === 'shield' ? '🛡️' : 
                 action.icon === 'award' ? '🏆' : 
                 action.icon === 'bar-chart' ? '📊' : '●'}
              </Text>
              <Text style={[
                styles.actionText,
                action.color && { color: action.color }
              ]}>
                {action.title}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </Card>
  );

  const renderLogoutButton = () => (
    <Card variant="elevated" style={styles.logoutCard}>
      <Button
        variant="ghost"
        size="lg"
        fullWidth
        onPress={handleLogout}
        style={styles.logoutButton}
        testID="profile-logout-button"
      >
        <Text style={styles.logoutText}>Logout</Text>
      </Button>
    </Card>
  );

  // ========================
  // MAIN RENDER
  // ========================

  if (!user) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading profile...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor={metalPortalColors.semantic.interactive.primary}
          />
        }
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          {renderAvatar()}
          {renderUserInfo()}
        </View>

        {/* Statistics */}
        {renderStats()}

        {/* Primary Actions */}
        {renderActions(primaryActions, 'Profile')}

        {/* Subscription Actions */}
        {subscriptionActions.length > 0 && renderActions(subscriptionActions, 'Subscription')}

        {/* Management Actions */}
        {managementActions.length > 0 && renderActions(managementActions, 'Management')}

        {/* Secondary Actions */}
        {renderActions(secondaryActions, 'More')}

        {/* Logout */}
        {renderLogoutButton()}
      </ScrollView>
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
  
  scrollContainer: {
    flex: 1,
  },
  
  scrollContent: {
    padding: metalPortalSpacing.base['4'],
    paddingBottom: metalPortalSpacing.base['8'],
  },
  
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  loadingText: {
    ...metalPortalTypography.styles.body.default,
    color: metalPortalColors.semantic.text.muted,
  },
  
  header: {
    alignItems: 'center',
    marginBottom: metalPortalSpacing.base['6'],
  },
  
  avatarContainer: {
    position: 'relative',
    marginBottom: metalPortalSpacing.base['4'],
  },
  
  avatar: {
    borderRadius: 60,
    borderWidth: 3,
    borderColor: metalPortalColors.semantic.interactive.primary,
  },
  
  avatarFallback: {
    borderRadius: 60,
    backgroundColor: metalPortalColors.semantic.background.secondary,
    borderWidth: 3,
    borderColor: metalPortalColors.semantic.interactive.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  avatarInitials: {
    ...metalPortalTypography.styles.heading.h1,
    color: metalPortalColors.semantic.text.primary,
    fontWeight: metalPortalTypography.weights.bold,
  },
  
  roleBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: metalPortalColors.semantic.interactive.primary,
    borderRadius: metalPortalSpacing.semantic.radius.full,
    paddingHorizontal: metalPortalSpacing.base['2'],
    paddingVertical: metalPortalSpacing.base['1'],
    borderWidth: 2,
    borderColor: metalPortalColors.semantic.background.primary,
  },
  
  roleBadgeText: {
    ...metalPortalTypography.styles.body.small,
    color: metalPortalColors.semantic.text.inverse,
    fontWeight: metalPortalTypography.weights.semibold,
    textTransform: 'uppercase',
  },
  
  userInfoContainer: {
    alignItems: 'center',
    gap: metalPortalSpacing.base['2'],
  },
  
  displayName: {
    ...metalPortalTypography.styles.heading.h2,
    color: metalPortalColors.semantic.text.primary,
    textAlign: 'center',
  },
  
  username: {
    ...metalPortalTypography.styles.body.default,
    color: metalPortalColors.semantic.text.secondary,
  },
  
  bio: {
    ...metalPortalTypography.styles.body.default,
    color: metalPortalColors.semantic.text.muted,
    textAlign: 'center',
    marginTop: metalPortalSpacing.base['2'],
  },
  
  metaInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: metalPortalSpacing.base['3'],
    marginTop: metalPortalSpacing.base['2'],
  },
  
  metaText: {
    ...metalPortalTypography.styles.body.small,
    color: metalPortalColors.semantic.text.muted,
  },
  
  subscriptionBadge: {
    backgroundColor: metalPortalColors.semantic.interactive.primary,
    borderRadius: metalPortalSpacing.semantic.radius.md,
    paddingHorizontal: metalPortalSpacing.base['2'],
    paddingVertical: metalPortalSpacing.base['1'],
  },
  
  subscriptionText: {
    ...metalPortalTypography.styles.body.small,
    color: metalPortalColors.semantic.text.inverse,
    fontWeight: metalPortalTypography.weights.semibold,
    fontFamily: Array.isArray(metalPortalTypography.styles.body.small.fontFamily) 
      ? metalPortalTypography.styles.body.small.fontFamily[0] 
      : metalPortalTypography.styles.body.small.fontFamily,
  },
  
  statsCard: {
    marginBottom: metalPortalSpacing.base['4'],
  },
  
  statsContainer: {
    padding: metalPortalSpacing.base['4'],
  },
  
  sectionTitle: {
    ...metalPortalTypography.styles.heading.h3,
    color: metalPortalColors.semantic.text.primary,
    marginBottom: metalPortalSpacing.base['4'],
  },
  
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  
  statValue: {
    ...metalPortalTypography.styles.heading.h2,
    fontWeight: metalPortalTypography.weights.bold,
  },
  
  statLabel: {
    ...metalPortalTypography.styles.body.small,
    color: metalPortalColors.semantic.text.muted,
    marginTop: metalPortalSpacing.base['1'],
  },
  
  actionsCard: {
    marginBottom: metalPortalSpacing.base['4'],
  },
  
  actionsContainer: {
    padding: metalPortalSpacing.base['4'],
  },
  
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: metalPortalSpacing.base['3'],
  },
  
  actionButton: {
    flex: 1,
    minWidth: '45%',
    alignItems: 'center',
    padding: metalPortalSpacing.base['3'],
    borderRadius: metalPortalSpacing.semantic.radius.md,
    backgroundColor: metalPortalColors.semantic.background.secondary,
    borderWidth: 1,
    borderColor: metalPortalColors.semantic.border.default,
  },
  
  actionButtonDisabled: {
    opacity: 0.5,
  },
  
  actionIcon: {
    fontSize: 24,
    marginBottom: metalPortalSpacing.base['1'],
  },
  
  actionText: {
    ...metalPortalTypography.styles.body.small,
    color: metalPortalColors.semantic.text.primary,
    marginTop: metalPortalSpacing.base['1'],
    textAlign: 'center',
    fontFamily: Array.isArray(metalPortalTypography.styles.body.small.fontFamily) 
      ? metalPortalTypography.styles.body.small.fontFamily[0] 
      : metalPortalTypography.styles.body.small.fontFamily,
  },
  
  logoutCard: {
    marginTop: metalPortalSpacing.base['4'],
  },
  
  logoutButton: {
    borderColor: metalPortalColors.semantic.state.error,
  },
  
  logoutText: {
    color: metalPortalColors.semantic.state.error,
    fontWeight: metalPortalTypography.weights.semibold,
  },
});

export default ProfileScreen;