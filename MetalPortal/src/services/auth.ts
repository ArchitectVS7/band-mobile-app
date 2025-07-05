import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { prisma } from './prisma';
import { apiClient } from './api';
import { authStore } from '../store/authStore';
import type { LoginCredentials, RegisterData, AuthResponse, User, RefreshTokenResponse } from '../types/auth';

/**
 * AUTHENTICATION SERVICE - Complete JWT Implementation
 * 
 * This service handles all authentication operations including:
 * - JWT token generation and validation
 * - Password hashing with bcrypt
 * - User registration and login
 * - Token refresh mechanism
 * - Session management
 * 
 * ADVANCED CONCEPTS EXPLAINED:
 * 
 * 1. JWT (JSON Web Tokens):
 *    - Stateless authentication tokens containing user claims
 *    - Signed with secret key to prevent tampering
 *    - Contains expiration time for security
 *    - No server-side session storage needed
 * 
 * 2. Refresh Token Pattern:
 *    - Access tokens expire quickly (15 minutes)
 *    - Refresh tokens last longer (7 days)
 *    - Reduces impact of compromised access tokens
 *    - Allows seamless token renewal
 * 
 * 3. Password Hashing (bcrypt):
 *    - Uses adaptive hashing with salt
 *    - Computationally expensive to prevent brute force
 *    - Salt rounds = 12 (industry standard)
 *    - Never store plain text passwords
 * 
 * 4. Token Claims Structure:
 *    - sub: subject (user ID)
 *    - iat: issued at timestamp
 *    - exp: expiration timestamp
 *    - role: user role for authorization
 *    - tier: subscription tier
 */

class AuthService {
  private readonly JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
  private readonly REFRESH_SECRET = process.env.REFRESH_SECRET || 'your-refresh-secret';
  private readonly ACCESS_TOKEN_EXPIRY = '15m';
  private readonly REFRESH_TOKEN_EXPIRY = '7d';
  private readonly SALT_ROUNDS = 12;

  /**
   * REGISTER NEW USER
   * 
   * Process:
   * 1. Validate input data
   * 2. Check if user already exists
   * 3. Hash password with bcrypt
   * 4. Create user in database
   * 5. Generate JWT tokens
   * 6. Return authentication response
   */
  async register(data: RegisterData): Promise<AuthResponse> {
    try {
      // Input validation
      if (!data.email || !data.password || !data.username) {
        throw new Error('Email, username, and password are required');
      }

      // Check if user already exists
      const existingUser = await prisma.user.findFirst({
        where: {
          OR: [
            { email: data.email },
            { username: data.username }
          ]
        }
      });

      if (existingUser) {
        throw new Error('User with this email or username already exists');
      }

      // Hash password using bcrypt
      // Salt rounds = 12 provides good security/performance balance
      const passwordHash = await bcrypt.hash(data.password, this.SALT_ROUNDS);

      // Create user in database
      const user = await prisma.user.create({
        data: {
          email: data.email,
          username: data.username,
          passwordHash,
          displayName: data.displayName || data.username,
          // Default values set by Prisma schema
        },
        select: {
          id: true,
          email: true,
          username: true,
          displayName: true,
          role: true,
          subscriptionTier: true,
          avatar: true,
          createdAt: true,
        }
      });

      // Generate JWT tokens
      const { accessToken, refreshToken } = this.generateTokens(user);

      // Store refresh token in database
      await this.storeRefreshToken(user.id, refreshToken);

      // Update last active timestamp
      await prisma.user.update({
        where: { id: user.id },
        data: { lastActiveAt: new Date() }
      });

      return {
        user,
        accessToken,
        refreshToken,
        expiresIn: this.parseExpiryToSeconds(this.ACCESS_TOKEN_EXPIRY),
      };
    } catch (error) {
      throw new Error(`Registration failed: ${error.message}`);
    }
  }

  /**
   * LOGIN USER
   * 
   * Process:
   * 1. Find user by email/username
   * 2. Verify password with bcrypt
   * 3. Generate new JWT tokens
   * 4. Update user activity
   * 5. Return authentication response
   */
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      // Find user by email or username
      const user = await prisma.user.findFirst({
        where: {
          OR: [
            { email: credentials.identifier },
            { username: credentials.identifier }
          ]
        }
      });

      if (!user) {
        throw new Error('Invalid credentials');
      }

      // Verify password using bcrypt
      const isValidPassword = await bcrypt.compare(credentials.password, user.passwordHash);
      
      if (!isValidPassword) {
        throw new Error('Invalid credentials');
      }

      // Generate new JWT tokens
      const { accessToken, refreshToken } = this.generateTokens(user);

      // Store refresh token in database
      await this.storeRefreshToken(user.id, refreshToken);

      // Update last active timestamp
      await prisma.user.update({
        where: { id: user.id },
        data: { lastActiveAt: new Date() }
      });

      // Return user data without password hash
      const { passwordHash, ...userWithoutPassword } = user;

      return {
        user: userWithoutPassword,
        accessToken,
        refreshToken,
        expiresIn: this.parseExpiryToSeconds(this.ACCESS_TOKEN_EXPIRY),
      };
    } catch (error) {
      throw new Error(`Login failed: ${error.message}`);
    }
  }

  /**
   * REFRESH ACCESS TOKEN
   * 
   * JWT Refresh Pattern Explained:
   * - Access tokens expire quickly for security
   * - Refresh tokens last longer but are stored server-side
   * - When access token expires, use refresh token to get new access token
   * - If refresh token is invalid/expired, user must login again
   * 
   * Security Benefits:
   * - Limits exposure window of compromised access tokens
   * - Allows server-side revocation of refresh tokens
   * - Maintains user session without frequent logins
   */
  async refreshToken(refreshToken: string): Promise<RefreshTokenResponse> {
    try {
      // Verify refresh token signature
      const decoded = jwt.verify(refreshToken, this.REFRESH_SECRET) as any;
      
      // Find user and verify refresh token is stored
      const user = await prisma.user.findFirst({
        where: {
          id: decoded.sub,
          refreshToken: refreshToken
        }
      });

      if (!user) {
        throw new Error('Invalid refresh token');
      }

      // Generate new access token
      const newAccessToken = this.generateAccessToken(user);

      // Update last active timestamp
      await prisma.user.update({
        where: { id: user.id },
        data: { lastActiveAt: new Date() }
      });

      return {
        accessToken: newAccessToken,
        expiresIn: this.parseExpiryToSeconds(this.ACCESS_TOKEN_EXPIRY),
      };
    } catch (error) {
      throw new Error(`Token refresh failed: ${error.message}`);
    }
  }

  /**
   * LOGOUT USER
   * 
   * Process:
   * 1. Invalidate refresh token in database
   * 2. Clear tokens from client storage
   * 3. Update user session status
   */
  async logout(userId: string): Promise<void> {
    try {
      // Remove refresh token from database
      await prisma.user.update({
        where: { id: userId },
        data: { refreshToken: null }
      });

      // Clear tokens from auth store
      authStore.getState().logout();
    } catch (error) {
      throw new Error(`Logout failed: ${error.message}`);
    }
  }

  /**
   * VERIFY ACCESS TOKEN
   * 
   * Used by API middleware to validate requests
   * Returns decoded user claims if valid
   */
  async verifyAccessToken(token: string): Promise<any> {
    try {
      const decoded = jwt.verify(token, this.JWT_SECRET);
      return decoded;
    } catch (error) {
      throw new Error('Invalid or expired token');
    }
  }

  /**
   * GET CURRENT USER
   * 
   * Fetch fresh user data from database
   * Used after token refresh or profile updates
   */
  async getCurrentUser(userId: string): Promise<User> {
    try {
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          email: true,
          username: true,
          displayName: true,
          role: true,
          subscriptionTier: true,
          avatar: true,
          bio: true,
          location: true,
          isVerified: true,
          createdAt: true,
          lastActiveAt: true,
        }
      });

      if (!user) {
        throw new Error('User not found');
      }

      return user;
    } catch (error) {
      throw new Error(`Failed to get user: ${error.message}`);
    }
  }

  /**
   * PRIVATE HELPER METHODS
   */

  /**
   * Generate JWT Tokens
   * 
   * Creates both access and refresh tokens with appropriate claims
   */
  private generateTokens(user: any): { accessToken: string; refreshToken: string } {
    const accessToken = this.generateAccessToken(user);
    const refreshToken = this.generateRefreshToken(user);

    return { accessToken, refreshToken };
  }

  /**
   * Generate Access Token
   * 
   * Short-lived token with user claims for API authorization
   */
  private generateAccessToken(user: any): string {
    return jwt.sign(
      {
        sub: user.id,
        email: user.email,
        username: user.username,
        role: user.role,
        tier: user.subscriptionTier,
      },
      this.JWT_SECRET,
      { expiresIn: this.ACCESS_TOKEN_EXPIRY }
    );
  }

  /**
   * Generate Refresh Token
   * 
   * Long-lived token for obtaining new access tokens
   */
  private generateRefreshToken(user: any): string {
    return jwt.sign(
      {
        sub: user.id,
        type: 'refresh',
      },
      this.REFRESH_SECRET,
      { expiresIn: this.REFRESH_TOKEN_EXPIRY }
    );
  }

  /**
   * Store Refresh Token
   * 
   * Save refresh token to database for validation
   */
  private async storeRefreshToken(userId: string, refreshToken: string): Promise<void> {
    await prisma.user.update({
      where: { id: userId },
      data: { refreshToken }
    });
  }

  /**
   * Parse Expiry to Seconds
   * 
   * Convert JWT expiry format to seconds for client use
   */
  private parseExpiryToSeconds(expiry: string): number {
    const match = expiry.match(/(\d+)([smhd])/);
    if (!match) return 900; // Default 15 minutes

    const [, value, unit] = match;
    const multipliers = { s: 1, m: 60, h: 3600, d: 86400 };
    return parseInt(value) * multipliers[unit];
  }
}

// Export singleton instance
export const authService = new AuthService();
export default authService;