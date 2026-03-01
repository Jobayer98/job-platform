import swaggerJsdoc from 'swagger-jsdoc';
import { config } from './environment';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Job Platform API',
    version: '1.0.0',
    description: 'RESTful API for job listings and applications management',
    contact: {
      name: 'API Support',
      email: 'support@jobplatform.com',
    },
    license: {
      name: 'ISC',
      url: 'https://opensource.org/licenses/ISC',
    },
  },
  servers: [
    {
      url: `http://localhost:${config.port}/api/${config.api.version}`,
      description: 'Development server',
    },
    {
      url: `https://api.jobplatform.com/api/${config.api.version}`,
      description: 'Production server',
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Enter your JWT token',
      },
    },
  },
  tags: [
    {
      name: 'Health',
      description: 'Health check endpoints',
    },
    {
      name: 'Jobs',
      description: 'Job listing management',
    },
    {
      name: 'Applications',
      description: 'Job application management',
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['./src/routes/*.ts', './src/swagger/schemas/*.ts'],
};

export const swaggerSpec = swaggerJsdoc(options);
