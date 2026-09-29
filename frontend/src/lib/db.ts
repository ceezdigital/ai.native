import { PrismaClient } from "@prisma/client";

// Next.js reloads modules on every request in dev, which would otherwise
// spawn a fresh Prisma connection pool per request. Caching the client on
// `globalThis` survives those reloads; production gets a single instance
// per serverless function naturally.
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const db = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = db;
}
