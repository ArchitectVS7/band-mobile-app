# 🔥 MetalPortal - Heavy Metal Band Community App

A React Native mobile application built with Expo for heavy metal band community engagement, featuring exclusive content, real-time chat, forums, and subscription tiers.

## 🎯 Project Overview

MetalPortal is a mobile-first community platform designed to connect heavy metal bands with their fanbase through:
- **Exclusive Content**: Early releases, B-sides, and behind-the-scenes videos
- **Community Forums**: Q&A with band members and fan discussions
- **Real-time Chat**: Live interaction during events and releases
- **Subscription Tiers**: FREE, PREMIUM, and VIP access levels
- **Event Integration**: Concert announcements and meet & greet booking

## 🚀 Current Status

### ✅ Phase 1: Project Setup & Infrastructure (Complete)
- [✅] **1.1** Initialize React Native Expo project with TypeScript
- [✅] **1.2** Set up project structure and folder organization
- [✅] **1.3** Configure development environment and dependencies
- [🟡] **1.4** Set up Git workflows and pre-commit hooks
- [✅] **1.5** Create environment variables structure and .gitignore
- [✅] **1.6** Run npm audit and update dependencies
- [✅] **1.7** Set up linting and type checking workflows

### 🔄 Phase 2: Core Architecture & Database (COMPLETE) ✅
- [✅] **2.1** Design and implement Prisma database schema
- [✅] **2.2** Set up authentication system with JWT tokens
- [✅] **2.3** Create API routes for user management
- [✅] **2.4** Implement state management with Zustand
- [✅] **2.5** Set up React Query for server state management
- [✅] **2.6** Create utility functions and helpers

**🎯 PHASE 2 COMPLETE - 100% (6/6 tasks)**

## 🏗️ Tech Stack

### Frontend
- **Framework**: React Native with Expo SDK 53+
- **Language**: TypeScript
- **Navigation**: Expo Router v5
- **State Management**: Zustand + TanStack Query
- **UI Components**: Custom styled components with NativeBase
- **Real-time**: Socket.io client

### Backend (Planned)
- **Runtime**: Node.js 20+ with TypeScript
- **Framework**: Express.js
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT with refresh tokens
- **Real-time**: Socket.io server
- **Payment**: Stripe integration

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Expo CLI (`npm install -g @expo/cli`)
- iOS Simulator (macOS) or Android Emulator

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd MetalPortal

# Install dependencies
npm install

# Start the development server
npm start

# Run on specific platform
npm run ios    # iOS Simulator
npm run android # Android Emulator
npm run web    # Web browser
```

### Development Scripts
```bash
npm start          # Start Expo development server
npm run lint       # Run ESLint
npm run type-check # TypeScript type checking
npm test           # Run Jest tests (when configured)
```

## 📁 Project Structure

```
MetalPortal/
├── app/                    # Expo Router pages
│   ├── _layout.tsx        # Root layout component
│   └── index.tsx          # Home screen
├── src/                   # Source code (planned)
│   ├── components/        # Reusable UI components
│   ├── screens/          # Screen components
│   ├── hooks/            # Custom React hooks
│   ├── utils/            # Utility functions
│   ├── types/            # TypeScript type definitions
│   ├── services/         # API services
│   └── store/            # State management
├── assets/               # Images, fonts, icons
├── .env.example         # Environment variables template
└── docs/                # Additional documentation
```

## 🎨 Design System

### Color Palette
- **Primary**: Deep blacks (#0A0A0A, #1A1A1A, #2A2A2A)
- **Accent**: Blood red (#8B0000, #DC143C, #660000)
- **Neutral**: Bone white (#F5F5DC), Silver (#C0C0C0)

### Typography
- **Headers**: Gothic serif fonts for impact
- **Body**: Inter sans-serif for readability
- **Code**: JetBrains Mono for technical content

## 🔧 Development Workflow

### Code Quality
- **ESLint**: Code linting with TypeScript support
- **Prettier**: Code formatting
- **TypeScript**: Strict type checking
- **Husky**: Pre-commit hooks (planned)

### Testing Strategy
- **Unit Tests**: Jest + React Native Testing Library
- **E2E Tests**: Planned for critical user flows
- **Type Coverage**: 100% TypeScript coverage goal

## 🌟 Features Roadmap

### Phase 1: Core Setup ✅
- [x] Project initialization with Expo + TypeScript
- [x] Basic navigation and routing
- [x] Development environment setup
- [x] Linting and type checking

### Phase 2: Authentication & Profiles 🔄
- [ ] User registration and login
- [ ] Profile management
- [ ] Role-based access control

### Phase 3: Content Management
- [ ] News feed implementation
- [ ] Media upload system
- [ ] Premium content gating

### Phase 4: Community Features
- [ ] Forum system
- [ ] Real-time chat
- [ ] User messaging

### Phase 5: Payment Integration
- [ ] Stripe subscription management
- [ ] Tier-based content access
- [ ] Payment flows

## 🔐 Environment Configuration

Copy `.env.example` to `.env` and configure:
```bash
# Database
DATABASE_URL=postgresql://...

# Authentication
JWT_SECRET=your-secret-key

# External Services
STRIPE_PUBLISHABLE_KEY=pk_test_...
CLOUDINARY_CLOUD_NAME=your-cloud

# API Configuration
API_BASE_URL=http://localhost:3000/api
```

## 📱 Platform Support

- **iOS**: iPhone and iPad
- **Android**: Android 6.0+ (API level 23+)
- **Web**: Modern browsers (development/testing)

## 🚀 Deployment

### Development
```bash
npm start
```

### Production Builds
```bash
# iOS App Store
eas build --platform ios --profile production

# Google Play Store
eas build --platform android --profile production

# Web deployment
npm run build:web
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Standards
- Follow TypeScript strict mode
- Maintain 80+ character line length
- Use conventional commit messages
- Add tests for new features

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🎸 Band Theme

The app is designed around the fictional death metal band **"Crimson Void"** for development and testing purposes, featuring:
- Dark, underground aesthetic
- Gothic typography and metal-inspired design
- High contrast accessibility
- Industrial UI elements

## 🤖 AI Decision Log

### January 2025

#### Architecture Decisions
- **State Management**: Selected Zustand over Redux for simplicity and bundle size (Complexity: 8/10, Standardization: 9/10, Integration: 9/10, Cost: 9/10, Future-proofing: 8/10) - **Weighted Score: 8.6/10**
- **Database ORM**: Chose Prisma over TypeORM for type safety and modern API (Complexity: 7/10, Standardization: 9/10, Integration: 9/10, Cost: 8/10, Future-proofing: 9/10) - **Weighted Score: 8.2/10**
- **Navigation**: Expo Router over React Navigation for file-based routing consistency (Complexity: 7/10, Standardization: 8/10, Integration: 9/10, Cost: 8/10, Future-proofing: 8/10) - **Weighted Score: 7.8/10**

#### Technical Decisions
- **Theme Implementation**: Custom theme provider over UI libraries to maintain metal aesthetic control
- **File Structure**: Expo Router app/ directory with comprehensive src/ directory for business logic
- **Color Palette**: Implemented official metal color scheme from design system
- **Database Schema**: Comprehensive Prisma schema with 15+ models covering all core entities
- **API Architecture**: Custom fetch-based client with authentication and retry logic
- **Type Safety**: 100% TypeScript coverage with comprehensive type definitions

#### Phase 2 Architecture Implementation
- **Database**: Prisma ORM with PostgreSQL, comprehensive schema design
- **State Management**: Zustand for client state, React Query for server state
- **Authentication**: JWT tokens with secure storage and refresh logic
- **API Client**: Custom implementation with error handling and retry logic
- **Utilities**: Comprehensive validation, formatting, and helper functions
- **Type System**: Complete TypeScript type definitions for all entities

## 🟡 Pending Human Actions

### Git Workflow Setup
- Configure pre-commit hooks with Husky
- Set up branch protection rules
- Configure GitHub Actions or similar CI/CD

### External Service Setup
- Create Stripe test/live accounts
- Set up Cloudinary account for media storage
- Configure database hosting (Railway/Render)

### Production Deployment
- Set up EAS Build and Submit
- Configure app store developer accounts
- Set up production environment variables

## 🔗 Links

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/)

---

**Built with 🔥 for the metal community**

### 🎨 Phase 3: UI/UX Design System (Ready to Start)
- [ ] **3.1** Create design system with Metal Portal branding
- [ ] **3.2** Implement reusable UI components
- [ ] **3.3** Build screen layouts and navigation
- [ ] **3.4** Add animations and transitions
- [ ] **3.5** Implement responsive design patterns
- [ ] **3.6** Create component library documentation