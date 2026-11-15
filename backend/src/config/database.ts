import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

export const prisma = new PrismaClient();

export let isDatabaseConnected = false;

// Verify Database Connection
export async function connectDatabase() {
  try {
    await prisma.$connect();
    isDatabaseConnected = true;
    console.log('✅ Connected successfully to MySQL Database via Prisma');
  } catch (error: any) {
    isDatabaseConnected = false;
    console.warn('⚠️  Could not connect to live MySQL server:', error.message);
    console.info('ℹ️  Running with in-memory resilient state store. To connect live MySQL, ensure MySQL server is running and check DATABASE_URL.');
  }
}
