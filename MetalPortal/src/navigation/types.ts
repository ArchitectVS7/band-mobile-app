/**
 * METAL PORTAL - NAVIGATION TYPES
 * 
 * Type-safe navigation definitions for React Navigation
 * Defines all routes, parameters, and navigation structures
 * 
 * FEATURES:
 * - Type-safe route parameters
 * - Stack and Tab navigation types
 * - Deep linking support
 * - Nested navigation structures
 * - Authentication flow routing
 */

import { NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
// TODO: Install @react-navigation/drawer when needed
// import { DrawerNavigationProp } from '@react-navigation/drawer';

// ========================
// MAIN NAVIGATION TYPES
// ========================

/**
 * Root Stack Navigator - Main app navigation structure
 */
export type RootStackParamList = {
  // Authentication flow
  AuthStack: NavigatorScreenParams<AuthStackParamList>;
  
  // Main app flow
  MainTabs: NavigatorScreenParams<MainTabParamList>;
  
  // Modal screens
  Modal: {
    screen: string;
    params?: any;
  };
  
  // Onboarding flow
  OnboardingStack: NavigatorScreenParams<OnboardingStackParamList>;
  
  // Deep linking routes
  DeepLink: {
    url: string;
    params?: Record<string, any>;
  };
};

/**
 * Authentication Stack Navigator
 */
export type AuthStackParamList = {
  Welcome: undefined;
  Login: undefined;
  Register: {
    email?: string;
  };
  ForgotPassword: undefined;
  ResetPassword: {
    token: string;
  };
  VerifyEmail: {
    email: string;
  };
};

/**
 * Onboarding Stack Navigator
 */
export type OnboardingStackParamList = {
  Welcome: undefined;
  Features: undefined;
  Permissions: undefined;
  ProfileSetup: undefined;
  Preferences: undefined;
  Complete: undefined;
};

/**
 * Main Tab Navigator
 */
export type MainTabParamList = {
  HomeStack: NavigatorScreenParams<HomeStackParamList>;
  ForumStack: NavigatorScreenParams<ForumStackParamList>;
  EventsStack: NavigatorScreenParams<EventsStackParamList>;
  ChatStack: NavigatorScreenParams<ChatStackParamList>;
  ProfileStack: NavigatorScreenParams<ProfileStackParamList>;
};

// ========================
// STACK NAVIGATION TYPES
// ========================

/**
 * Home Stack Navigator
 */
export type HomeStackParamList = {
  Home: undefined;
  PostDetail: {
    postId: string;
  };
  UserProfile: {
    userId: string;
  };
  BandProfile: {
    bandId: string;
  };
  AlbumDetail: {
    albumId: string;
  };
  SongDetail: {
    songId: string;
  };
  NewsDetail: {
    newsId: string;
  };
  Search: {
    query?: string;
    category?: 'all' | 'posts' | 'users' | 'bands' | 'albums';
  };
  Notifications: undefined;
  Settings: undefined;
};

/**
 * Forum Stack Navigator
 */
export type ForumStackParamList = {
  ForumHome: undefined;
  ForumCategory: {
    categoryId: string;
    categoryName: string;
  };
  ForumPost: {
    postId: string;
  };
  CreatePost: {
    categoryId?: string;
  };
  EditPost: {
    postId: string;
  };
  UserPosts: {
    userId: string;
  };
  SearchForum: {
    query?: string;
  };
};

/**
 * Events Stack Navigator
 */
export type EventsStackParamList = {
  EventsHome: undefined;
  EventDetail: {
    eventId: string;
  };
  EventTickets: {
    eventId: string;
  };
  MyEvents: undefined;
  CreateEvent: undefined;
  EditEvent: {
    eventId: string;
  };
  EventMap: {
    eventId: string;
    venue: {
      name: string;
      address: string;
      latitude: number;
      longitude: number;
    };
  };
  EventCalendar: {
    selectedDate?: string;
  };
};

/**
 * Chat Stack Navigator
 */
export type ChatStackParamList = {
  ChatHome: undefined;
  ChatRoom: {
    roomId: string;
    roomName: string;
    roomType: 'public' | 'private' | 'band' | 'vip';
  };
  DirectMessage: {
    userId: string;
    userName: string;
  };
  CreateChat: undefined;
  ChatSettings: {
    roomId: string;
  };
  ChatMembers: {
    roomId: string;
  };
};

/**
 * Profile Stack Navigator
 */
export type ProfileStackParamList = {
  Profile: undefined;
  EditProfile: undefined;
  MyPosts: undefined;
  MyEvents: undefined;
  MyChats: undefined;
  Subscription: undefined;
  Settings: undefined;
  Privacy: undefined;
  Notifications: undefined;
  Support: undefined;
  About: undefined;
  BandManagement: undefined;
  ModeratorPanel: undefined;
  AdminPanel: undefined;
  VIPAccess: undefined;
  Achievements: undefined;
  Statistics: undefined;
};

// ========================
// MODAL NAVIGATION TYPES
// ========================

/**
 * Modal screens that can be presented from anywhere
 */
export type ModalParamList = {
  ImageViewer: {
    images: Array<{
      uri: string;
      alt?: string;
    }>;
    initialIndex?: number;
  };
  VideoPlayer: {
    videoUri: string;
    title?: string;
  };
  AudioPlayer: {
    audioUri: string;
    title?: string;
    artist?: string;
    albumArt?: string;
  };
  ShareSheet: {
    content: {
      title: string;
      text?: string;
      url?: string;
    };
  };
  ReportContent: {
    contentId: string;
    contentType: 'post' | 'comment' | 'user' | 'event';
  };
  CreatePost: {
    categoryId?: string;
    initialContent?: string;
  };
  QRCodeScanner: {
    onScan: (data: string) => void;
  };
  LocationPicker: {
    onLocationSelect: (location: {
      latitude: number;
      longitude: number;
      address?: string;
    }) => void;
  };
};

// ========================
// DRAWER NAVIGATION TYPES
// ========================

/**
 * Drawer Navigator (side menu)
 */
export type DrawerParamList = {
  MainTabs: NavigatorScreenParams<MainTabParamList>;
  VIPZone: undefined;
  BandZone: undefined;
  ModeratorZone: undefined;
  AdminZone: undefined;
  Settings: undefined;
  Support: undefined;
  About: undefined;
  Logout: undefined;
};

// ========================
// NAVIGATION PROP TYPES
// ========================

/**
 * Navigation prop types for type-safe navigation
 */
export type RootStackNavigationProp = NativeStackNavigationProp<RootStackParamList>;
export type AuthStackNavigationProp = NativeStackNavigationProp<AuthStackParamList>;
export type OnboardingStackNavigationProp = NativeStackNavigationProp<OnboardingStackParamList>;
export type MainTabNavigationProp = BottomTabNavigationProp<MainTabParamList>;
export type HomeStackNavigationProp = NativeStackNavigationProp<HomeStackParamList>;
export type ForumStackNavigationProp = NativeStackNavigationProp<ForumStackParamList>;
export type EventsStackNavigationProp = NativeStackNavigationProp<EventsStackParamList>;
export type ChatStackNavigationProp = NativeStackNavigationProp<ChatStackParamList>;
export type ProfileStackNavigationProp = NativeStackNavigationProp<ProfileStackParamList>;
// TODO: Uncomment when drawer navigation is implemented
// export type MetalPortalDrawerNavigationProp = DrawerNavigationProp<DrawerParamList>;

// ========================
// ROUTE PROP TYPES
// ========================

/**
 * Route prop types for accessing route parameters
 */
export type RootStackRouteProp<T extends keyof RootStackParamList> = {
  key: string;
  name: T;
  params: RootStackParamList[T];
};

export type AuthStackRouteProp<T extends keyof AuthStackParamList> = {
  key: string;
  name: T;
  params: AuthStackParamList[T];
};

export type HomeStackRouteProp<T extends keyof HomeStackParamList> = {
  key: string;
  name: T;
  params: HomeStackParamList[T];
};

export type ForumStackRouteProp<T extends keyof ForumStackParamList> = {
  key: string;
  name: T;
  params: ForumStackParamList[T];
};

export type EventsStackRouteProp<T extends keyof EventsStackParamList> = {
  key: string;
  name: T;
  params: EventsStackParamList[T];
};

export type ChatStackRouteProp<T extends keyof ChatStackParamList> = {
  key: string;
  name: T;
  params: ChatStackParamList[T];
};

export type ProfileStackRouteProp<T extends keyof ProfileStackParamList> = {
  key: string;
  name: T;
  params: ProfileStackParamList[T];
};

// ========================
// SCREEN PROPS TYPES
// ========================

/**
 * Combined screen props for convenience
 */
export type ScreenProps<
  ParamList extends Record<string, any>,
  RouteName extends keyof ParamList,
> = {
  route: {
    key: string;
    name: RouteName;
    params: ParamList[RouteName];
  };
  navigation: any; // Will be properly typed by the navigator
};

// ========================
// NAVIGATION CONSTANTS
// ========================

/**
 * Navigation route names as constants
 */
export const ROUTES = {
  // Auth routes
  AUTH_STACK: 'AuthStack',
  WELCOME: 'Welcome',
  LOGIN: 'Login',
  REGISTER: 'Register',
  FORGOT_PASSWORD: 'ForgotPassword',
  RESET_PASSWORD: 'ResetPassword',
  VERIFY_EMAIL: 'VerifyEmail',

  // Main routes
  MAIN_TABS: 'MainTabs',
  HOME_STACK: 'HomeStack',
  FORUM_STACK: 'ForumStack',
  EVENTS_STACK: 'EventsStack',
  CHAT_STACK: 'ChatStack',
  PROFILE_STACK: 'ProfileStack',

  // Home routes
  HOME: 'Home',
  POST_DETAIL: 'PostDetail',
  USER_PROFILE: 'UserProfile',
  BAND_PROFILE: 'BandProfile',
  ALBUM_DETAIL: 'AlbumDetail',
  SONG_DETAIL: 'SongDetail',
  NEWS_DETAIL: 'NewsDetail',
  SEARCH: 'Search',
  NOTIFICATIONS: 'Notifications',
  SETTINGS: 'Settings',

  // Forum routes
  FORUM_HOME: 'ForumHome',
  FORUM_CATEGORY: 'ForumCategory',
  FORUM_POST: 'ForumPost',
  CREATE_POST: 'CreatePost',
  EDIT_POST: 'EditPost',
  USER_POSTS: 'UserPosts',
  SEARCH_FORUM: 'SearchForum',

  // Events routes
  EVENTS_HOME: 'EventsHome',
  EVENT_DETAIL: 'EventDetail',
  EVENT_TICKETS: 'EventTickets',
  MY_EVENTS: 'MyEvents',
  CREATE_EVENT: 'CreateEvent',
  EDIT_EVENT: 'EditEvent',
  EVENT_MAP: 'EventMap',
  EVENT_CALENDAR: 'EventCalendar',

  // Chat routes
  CHAT_HOME: 'ChatHome',
  CHAT_ROOM: 'ChatRoom',
  DIRECT_MESSAGE: 'DirectMessage',
  CREATE_CHAT: 'CreateChat',
  CHAT_SETTINGS: 'ChatSettings',
  CHAT_MEMBERS: 'ChatMembers',

  // Profile routes
  PROFILE: 'Profile',
  EDIT_PROFILE: 'EditProfile',
  MY_POSTS: 'MyPosts',
  MY_CHATS: 'MyChats',
  SUBSCRIPTION: 'Subscription',
  PRIVACY: 'Privacy',
  SUPPORT: 'Support',
  ABOUT: 'About',
  BAND_MANAGEMENT: 'BandManagement',
  MODERATOR_PANEL: 'ModeratorPanel',
  ADMIN_PANEL: 'AdminPanel',
  VIP_ACCESS: 'VIPAccess',
  ACHIEVEMENTS: 'Achievements',
  STATISTICS: 'Statistics',

  // Modal routes
  IMAGE_VIEWER: 'ImageViewer',
  VIDEO_PLAYER: 'VideoPlayer',
  AUDIO_PLAYER: 'AudioPlayer',
  SHARE_SHEET: 'ShareSheet',
  REPORT_CONTENT: 'ReportContent',
  QR_CODE_SCANNER: 'QRCodeScanner',
  LOCATION_PICKER: 'LocationPicker',

  // Drawer routes
  VIP_ZONE: 'VIPZone',
  BAND_ZONE: 'BandZone',
  MODERATOR_ZONE: 'ModeratorZone',
  ADMIN_ZONE: 'AdminZone',
  LOGOUT: 'Logout',
} as const;

// ========================
// NAVIGATION UTILITIES
// ========================

/**
 * Navigation utility types
 */
export type NavigationRoute = keyof typeof ROUTES;
export type NavigationRouteValue = typeof ROUTES[NavigationRoute];

/**
 * Deep linking configuration
 */
export type DeepLinkConfig = {
  screens: Record<string, string | DeepLinkConfig>;
};

/**
 * Navigation state type
 */
export type NavigationState = {
  key: string;
  index: number;
  routeNames: string[];
  routes: Array<{
    key: string;
    name: string;
    params?: any;
  }>;
  stale?: boolean;
  type: string;
};

// ========================
// NAVIGATION CONTEXT
// ========================

/**
 * Navigation context type for global navigation state
 */
export type NavigationContextType = {
  currentRoute: string;
  previousRoute: string | null;
  isAuthenticated: boolean;
  userRole: 'guest' | 'fan' | 'premium' | 'vip' | 'moderator' | 'band' | 'admin';
  navigationHistory: string[];
  canGoBack: boolean;
  deepLinkData: any;
};

// ========================
// SCREEN OPTIONS
// ========================

/**
 * Common screen options for different navigator types
 */
export type StackScreenOptions = {
  title?: string;
  headerShown?: boolean;
  headerStyle?: object;
  headerTintColor?: string;
  headerTitleStyle?: object;
  headerBackTitleVisible?: boolean;
  gestureEnabled?: boolean;
  animation?: 'slide_from_right' | 'slide_from_left' | 'slide_from_bottom' | 'fade' | 'none';
};

export type TabScreenOptions = {
  title?: string;
  tabBarIcon?: ({ focused, color, size }: { focused: boolean; color: string; size: number }) => React.ReactNode;
  tabBarBadge?: string | number;
  tabBarBadgeStyle?: object;
  tabBarActiveTintColor?: string;
  tabBarInactiveTintColor?: string;
  tabBarStyle?: object;
  tabBarLabelStyle?: object;
  tabBarButton?: (props: any) => React.ReactNode;
  href?: string;
};

export type DrawerScreenOptions = {
  title?: string;
  drawerIcon?: ({ focused, color, size }: { focused: boolean; color: string; size: number }) => React.ReactNode;
  drawerLabel?: string;
  drawerActiveTintColor?: string;
  drawerInactiveTintColor?: string;
  drawerActiveBackgroundColor?: string;
  drawerInactiveBackgroundColor?: string;
  drawerStyle?: object;
  drawerLabelStyle?: object;
  drawerItemStyle?: object;
  swipeEnabled?: boolean;
};