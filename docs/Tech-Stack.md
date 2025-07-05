# Tech Stack - Heavy Metal Band Community Portal

## 🎯 Technology Standards

This document defines the mandatory technology choices and architectural patterns for the MetalPortal project. All implementation decisions must align with these standards.

## 📱 Frontend Technology Stack

### Core Framework
- **React Native**: 0.79.5 (New Architecture enabled)
- **Expo SDK**: 53.0.17+ (managed workflow)
- **TypeScript**: 5.8.3+ (strict mode enabled)
- **Expo Router**: 5.1.3+ (file-based routing)

### State Management
- **Client State**: Zustand 4.5.0+ (preferred for simplicity)
- **Server State**: TanStack Query 5.0.0+ (React Query)
- **Form State**: React Hook Form 7.48.0+ with Zod validation
- **Async Storage**: Expo SecureStore for sensitive data

### UI/UX Libraries
- **Component Library**: Custom components with React Native built-ins
- **Icons**: Expo Vector Icons + React Native Vector Icons
- **Animations**: React Native Reanimated 3.6.0+
- **Gestures**: React Native Gesture Handler 2.14.0+
- **Navigation**: Expo Router (file-based) + React Navigation 6.x

### Styling
- **Styling System**: StyleSheet API with custom theme provider
- **Theme Management**: Custom theme context with TypeScript support
- **Responsive Design**: Custom hooks for screen dimensions
- **Safe Area**: React Native Safe Area Context 5.5.1+

## 🚀 Backend Technology Stack

### Runtime & Framework
- **Node.js**: 20.x LTS (latest stable)
- **Framework**: Express.js 4.18.0+
- **Language**: TypeScript 5.8.3+ (strict mode)
- **Process Manager**: PM2 for production

### Database & ORM
- **Database**: PostgreSQL 15.x+ (primary database)
- **ORM**: Prisma 5.7.0+ (type-safe database access)
- **Migrations**: Prisma migrate (version controlled)
- **Seeding**: Prisma seed scripts for test data

### Authentication & Security
- **JWT**: jsonwebtoken 9.0.0+ (access + refresh tokens)
- **Password Hashing**: bcrypt 5.1.0+
- **Rate Limiting**: express-rate-limit 7.1.0+
- **CORS**: cors 2.8.5+
- **Security Headers**: helmet 7.1.0+

### Real-time Communication
- **WebSockets**: Socket.io 4.7.0+ (server + client)
- **Event System**: Custom event emitter for internal communication
- **Push Notifications**: Expo Push Notifications API

### File Storage & Media
- **Cloud Storage**: Cloudinary (images, videos, audio)
- **File Upload**: multer 1.4.5+ with size/type validation
- **Image Processing**: sharp 0.32.0+ for optimization

### Payment Processing
- **Payment Gateway**: Stripe 14.0.0+ (subscriptions + one-time)
- **Webhook Handling**: Stripe webhook validation
- **Subscription Management**: Custom subscription logic with Stripe

## 🔧 Development Tools

### Code Quality
- **Linting**: ESLint 9.30.1+ with TypeScript support
- **Formatting**: Prettier 3.6.2+ (consistent code style)
- **Type Checking**: TypeScript compiler (tsc --noEmit)
- **Pre-commit**: Husky 9.1.7+ with lint-staged 16.1.2+

### Testing Framework
- **Unit Testing**: Jest 29.7.0+ with React Native Testing Library
- **E2E Testing**: Detox 20.0.0+ (native app testing)
- **API Testing**: Supertest 6.3.0+ for endpoint testing
- **Mock Data**: MSW 2.0.0+ for API mocking

### Build & Deployment
- **Build System**: Expo Application Services (EAS Build)
- **CI/CD**: GitHub Actions or similar
- **Environment**: Expo env variables + .env files
- **Code Signing**: EAS Submit for app stores

## 🌐 Infrastructure & Services

### Cloud Services
- **Backend Hosting**: Railway, Render, or similar Node.js hosting
- **Database Hosting**: Railway PostgreSQL or AWS RDS
- **CDN**: Cloudinary CDN for media assets
- **Monitoring**: Sentry for error tracking

### External APIs
- **Payment**: Stripe API (test/live modes)
- **Push Notifications**: Expo Push Notifications
- **Analytics**: Expo Analytics (privacy-compliant)
- **Maps**: React Native Maps (optional for events)

### Development Services
- **Version Control**: Git with GitHub/GitLab
- **Package Manager**: npm (lock file committed)
- **Documentation**: Markdown files in docs/ folder

## 📋 Architectural Patterns

### Frontend Architecture
```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Basic UI primitives
│   ├── forms/          # Form-specific components
│   └── layout/         # Layout components
├── screens/            # Screen components
├── hooks/              # Custom React hooks
├── services/           # API services and utilities
├── store/              # State management
├── utils/              # Utility functions
├── types/              # TypeScript type definitions
└── constants/          # App constants and config
```

### Backend Architecture
```
src/
├── controllers/        # Route handlers
├── middleware/         # Express middleware
├── models/            # Database models (Prisma)
├── services/          # Business logic
├── routes/            # API routes
├── utils/             # Utility functions
├── types/             # TypeScript types
└── config/            # Configuration files
```

### File Naming Conventions
- **Components**: PascalCase (e.g., `UserProfile.tsx`)
- **Hooks**: camelCase with "use" prefix (e.g., `useAuth.ts`)
- **Services**: camelCase (e.g., `authService.ts`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `API_ENDPOINTS.ts`)
- **Types**: PascalCase (e.g., `UserTypes.ts`)

## 🔐 Security Standards

### Authentication Flow
1. User registration/login with email + password
2. JWT access token (15 minutes expiry)
3. JWT refresh token (7 days expiry)
4. Token refresh on expiry
5. Secure token storage (Expo SecureStore)

### API Security
- **Input Validation**: Zod schemas for all endpoints
- **Rate Limiting**: 100 requests per minute per IP
- **CORS**: Restricted to allowed origins
- **Headers**: Security headers with helmet
- **SQL Injection**: Protected by Prisma ORM

### Data Protection
- **Encryption**: AES-256 for sensitive data
- **Passwords**: bcrypt with salt rounds 12
- **PII**: Minimal collection, secure storage
- **GDPR**: Data export/deletion endpoints

## 📊 Performance Standards

### Frontend Performance
- **Bundle Size**: < 50MB for production build
- **Cold Start**: < 3 seconds on mid-range devices
- **Navigation**: < 200ms screen transitions
- **Memory Usage**: < 100MB during normal usage
- **Battery**: Optimized for battery life

### Backend Performance
- **Response Time**: < 200ms for API endpoints
- **Database Queries**: Indexed, optimized queries
- **Concurrent Users**: Support 1000+ concurrent users
- **Memory**: < 512MB per process
- **CPU**: < 70% utilization under load

## 🧪 Testing Standards

### Test Coverage Requirements
- **Unit Tests**: 90%+ code coverage
- **Integration Tests**: All API endpoints
- **E2E Tests**: Critical user flows
- **Performance Tests**: Load testing for backend
- **Security Tests**: Vulnerability scanning

### Test Data Management
- **Test Database**: Separate from development
- **Fixtures**: Consistent test data sets
- **Cleanup**: Automated test data cleanup
- **Isolation**: Tests must be independent

## 🚀 Version Requirements

### Minimum Versions
```json
{
  "node": ">=20.0.0",
  "npm": ">=10.0.0",
  "typescript": ">=5.8.0",
  "expo": ">=53.0.0",
  "react": ">=19.0.0",
  "react-native": ">=0.79.0"
}
```

### Version Pinning Strategy
- **Major Dependencies**: Pin exact versions
- **Dev Dependencies**: Allow patch updates (^)
- **Security Updates**: Apply immediately
- **Breaking Changes**: Careful review and testing

## 🔄 Dependency Management

### Update Strategy
1. **Weekly**: Check for security updates
2. **Monthly**: Update patch versions
3. **Quarterly**: Review major updates
4. **Document**: All changes in DEPENDENCIES.md

### Allowed Packages
- **State Management**: Zustand, TanStack Query only
- **UI Components**: Custom components preferred
- **Navigation**: Expo Router only
- **Database**: Prisma only
- **Authentication**: JWT only
- **Payment**: Stripe only

### Forbidden Packages
- **State Management**: Redux, MobX, Valtio
- **UI Libraries**: NativeBase, Shoutem UI
- **Navigation**: React Navigation (use Expo Router)
- **Database**: TypeORM, Sequelize
- **CSS-in-JS**: styled-components, emotion

## 🎨 Design System Integration

### Color System
- **Primary**: Deep blacks and dark grays
- **Accent**: Blood red variations
- **Neutral**: Bone white and silver
- **Semantic**: Success, warning, error colors

### Typography Scale
- **Headers**: 32px, 24px, 20px, 18px
- **Body**: 16px, 14px, 12px
- **Code**: 14px monospace
- **Line Height**: 1.5x for body text

### Spacing System
- **Base Unit**: 8px
- **Scale**: 4px, 8px, 16px, 24px, 32px, 48px, 64px
- **Margins**: Use scale units only
- **Padding**: Use scale units only

## 🔧 Development Workflow

### Branch Strategy
- **main**: Production-ready code
- **develop**: Integration branch
- **feature/***: Feature development
- **hotfix/***: Emergency fixes

### Commit Standards
- **Format**: Conventional commits
- **Types**: feat, fix, docs, style, refactor, test
- **Scope**: Optional component/feature scope
- **Breaking**: Use ! for breaking changes

### Code Review
- **Required**: All PRs must be reviewed
- **Checklist**: Use PR template
- **Tests**: Must pass all tests
- **Documentation**: Update relevant docs

---

**Document Version**: 1.0  
**Last Updated**: January 2025  
**Next Review**: February 2025

## 📝 Conflicts & Overrides

*Note: If implementation conflicts arise with these standards, document them in this section with rationale and approval.*

### Current Conflicts
- None identified

### Pending Decisions
- None pending