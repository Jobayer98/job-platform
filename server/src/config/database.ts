import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";
import { Pool } from "pg";

const connectionString = `${process.env.DATABASE_URL}`;

// Create a connection pool with proper configuration for Render
const pool = new Pool({
    connectionString,
    ssl: {
        rejectUnauthorized: false, // Required for Render PostgreSQL
    },
    max: 10, // Maximum number of clients in the pool
    idleTimeoutMillis: 30000, // Close idle clients after 30 seconds
    connectionTimeoutMillis: 10000, // Return an error after 10 seconds if connection could not be established
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
});

// Handle connection errors
pool.on('error', (err) => {
    console.error('Unexpected error on idle client', err);
    process.exit(-1);
});

// Graceful shutdown
process.on('SIGINT', async () => {
    await prisma.$disconnect();
    await pool.end();
    process.exit(0);
});

process.on('SIGTERM', async () => {
    await prisma.$disconnect();
    await pool.end();
    process.exit(0);
});

export { prisma };