import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { prisma } from './prisma';
import { apiClient } from './api';
import { useAuthStore } from '../store/authStore';
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
   */
  async register(data: RegisterData): Promise<AuthResponse> {
    try {
      if (!data.email || !data.password || !data.username) {
        throw new Error('Email, username, and password are required');
      }

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

      const passwordHash = await bcrypt.hash(data.password, this.SALT_ROUNDS);

      const user = await prisma.user.create({
        data: {
          email: data.email,
          username: data.username,
          passwordHash,
          displayName: data.displayName || data.username,
        },
        select: {
          id: true,
          email: true,
          username: true,
          displayName: true,
          role: true,
          subscriptionTier: true,
          subscriptionStatus: true,
          avatar: true,
          isVerified: true,
          createdAt: true,
          updatedAt: true,
        }
      });

      const { accessToken, refreshToken } = this.generateTokens(user);
      await this.storeRefreshToken(user.id, refreshToken);
      await prisma.user.update({
        where: { id: user.id },
        data: { lastActiveAt: new Date() }
      });

      // Convert null to undefined for TypeScript compatibility
      const formattedUser = this.formatUserForResponse(user);

      return {
        user: formattedUser,
        accessToken,
        refreshToken,
        expiresIn: this.parseExpiryToSeconds(this.ACCESS_TOKEN_EXPIRY),
      };
    } catch (error) {
      throw new Error(`Registration failed: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  /**
   * LOGIN USER
   */
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
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

      const isValidPassword = await bcrypt.compare(credentials.password, user.passwordHash);
      
      if (!isValidPassword) {
        throw new Error('Invalid credentials');
      }

      const { accessToken, refreshToken } = this.generateTokens(user);
      await this.storeRefreshToken(user.id, refreshToken);
      await prisma.user.update({
        where: { id: user.id },
        data: { lastActiveAt: new Date() }
      });

      const { passwordHash, ...userWithoutPassword } = user;
      const formattedUser = this.formatUserForResponse(userWithoutPassword);

      return {
        user: formattedUser,
        accessToken,
        refreshToken,
        expiresIn: this.parseExpiryToSeconds(this.ACCESS_TOKEN_EXPIRY),
      };
    } catch (error) {
      throw new Error(`Login failed: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  /**
   * REFRESH ACCESS TOKEN
   */
  async refreshToken(refreshToken: string): Promise<RefreshTokenResponse> {
    try {
      const decoded = jwt.verify(refreshToken, this.REFRESH_SECRET) as any;
      
      const user = await prisma.user.findFirst({
        where: {
          id: decoded.sub,
          refreshToken: refreshToken
        }
      });

      if (!user) {
        throw new Error('Invalid refresh token');
      }

      const newAccessToken = this.generateAccessToken(user);

      await prisma.user.update({
        where: { id: user.id },
        data: { lastActiveAt: new Date() }
      });

      return {
        accessToken: newAccessToken,
        expiresIn: this.parseExpiryToSeconds(this.ACCESS_TOKEN_EXPIRY),
      };
    } catch (error) {
      throw new Error(`Token refresh failed: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  /**
   * LOGOUT USER
   */
  async logout(userId: string): Promise<void> {
    try {
      await prisma.user.update({
        where: { id: userId },
        data: { refreshToken: null }
      });

      useAuthStore.getState().logout();
    } catch (error) {
      throw new Error(`Logout failed: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  /**
   * VERIFY ACCESS TOKEN
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
          subscriptionStatus: true,
          avatar: true,
          bio: true,
          location: true,
          isVerified: true,
          createdAt: true,
          updatedAt: true,
          lastActiveAt: true,
        }
      });

      if (!user) {
        throw new Error('User not found');
      }

      return this.formatUserForResponse(user);
    } catch (error) {
      throw new Error(`Failed to get user: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  /**
   * PRIVATE HELPER METHODS
   */

  /**
   * Format user data for response (convert null to undefined)
   */
  private formatUserForResponse(user: any): any {
    return {
      ...user,
      displayName: user.displayName || undefined,
      avatar: user.avatar || undefined,
      bio: user.bio || undefined,
      location: user.location || undefined,
    };
  }

  /**
   * Generate JWT Tokens
   */
  private generateTokens(user: any): { accessToken: string; refreshToken: string } {
    const accessToken = this.generateAccessToken(user);
    const refreshToken = this.generateRefreshToken(user);
    return { accessToken, refreshToken };
  }

  /**
   * Generate Access Token
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
   */
  private async storeRefreshToken(userId: string, refreshToken: string): Promise<void> {
    await prisma.user.update({
      where: { id: userId },
      data: { refreshToken }
    });
  }

  /**
   * Parse Expiry to Seconds
   */
  private parseExpiryToSeconds(expiry: string): number {
    const match = expiry.match(/(\d+)([smhd])/);
    if (!match) return 900;

    const [, value, unit] = match;
    const multipliers: { [key: string]: number } = { s: 1, m: 60, h: 3600, d: 86400 };
    return parseInt(value) * multipliers[unit];
  }
}

export const authService = new AuthService();
export default authService;