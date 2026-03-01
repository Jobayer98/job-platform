import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import { config } from './config/environment';
import { swaggerSpec } from './config/swagger';
import { errorHandler, notFoundHandler } from './middlewares/errorHandler';
import { stream } from './utils/logger';
import routes from './routes';
import { limiter } from './middlewares/rateLimiter';

const app: Application = express();

// Security middleware
app.use(helmet());
app.use(cors({
    origin: config.api.corsOrigin,
    credentials: true,
}));

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Compression middleware
app.use(compression());

// HTTP request logging with Morgan and Winston
app.use(morgan('combined', { stream }));

// Health check endpoint (before rate limiting)
app.get('/health', (_req, res) => {
    res.status(200).json({
        success: true,
        message: 'Server is healthy',
        timestamp: new Date().toISOString(),
    });
});

// Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'Job Platform API Documentation',
}));

// Swagger JSON endpoint
app.get('/api-docs.json', (_req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
});

// Rate limiting (only for API routes)
app.use('/api', limiter);

// API routes
app.use(`/api/${config.api.version}`, routes);

// 404 handler
app.use(notFoundHandler);

// Error handler
app.use(errorHandler);

export default app;
