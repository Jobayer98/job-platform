import dotenv from 'dotenv';

dotenv.config();

export const config = {
    nodeEnv: process.env.NODE_ENV || 'development',
    port: parseInt(process.env.PORT || '3000', 10),

    database: {
        url: process.env.DATABASE_URL || '',
    },

    jwt: {
        secret: process.env.JWT_SECRET || 'your-secret-key',
        expiresIn: process.env.JWT_EXPIRE || '7d',
    },

    api: {
        version: process.env.API_VERSION || 'v1',
        corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    },

    rateLimit: {
        windowMs: parseInt(process.env.RATE_LIMIT_WINDOW || '15', 10) * 60 * 1000,
        max: parseInt(process.env.RATE_LIMIT_MAX || '100', 10),
    },
};
