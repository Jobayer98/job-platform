import app from './app';
import { config } from './config/environment';
import { prisma } from './config/database';
import { logger } from './utils/logger';

const startServer = async () => {
    try {
        // Test database connection
        await prisma.$connect();
        logger.info('Database connected successfully');

        // Start server
        app.listen(config.port, () => {
            logger.info(`Server running on port ${config.port} in ${config.nodeEnv} mode`);
            logger.info(`API available at http://localhost:${config.port}/api/${config.api.version}`);
        });
    } catch (error) {
        logger.error('Failed to start server:', error);
        process.exit(1);
    }
};

// Handle graceful shutdown
process.on('SIGTERM', async () => {
    logger.info('SIGTERM received, shutting down gracefully');
    await prisma.$disconnect();
    process.exit(0);
});

process.on('SIGINT', async () => {
    logger.info('SIGINT received, shutting down gracefully');
    await prisma.$disconnect();
    process.exit(0);
});

startServer();
