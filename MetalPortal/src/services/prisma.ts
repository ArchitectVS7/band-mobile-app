import { PrismaClient } from '../../generated/prisma';

/**
 * PRISMA CLIENT SERVICE
 * 
 * This creates a singleton instance of the Prisma client for database operations.
 * 
 * ADVANCED CONCEPTS EXPLAINED:
 * 
 * 1. Singleton Pattern:
 *    - Only one instance of PrismaClient is created
 *    - Prevents multiple database connections
 *    - Improves performance and resource management
 * 
 * 2. Environment-based Configuration:
 *    - Development: Logs all queries for debugging
 *    - Production: Minimal logging for performance
 *    - Graceful connection handling
 * 
 * 3. Connection Pooling:
 *    - Prisma automatically manages database connections
 *    - Reuses connections for better performance
 *    - Handles connection timeouts and retries
 */

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
});

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

export default prisma;