import winston from 'winston';
import { config } from '../config/environment';

// Define log levels
const levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4,
};

// Define colors for each level
const colors = {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'magenta',
    debug: 'blue',
};

winston.addColors(colors);

// Define log format
const format = winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    winston.format.json()
);

// Console format with colors
const consoleFormat = winston.format.combine(
    winston.format.colorize({ all: true }),
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.printf((info) => {
        const { timestamp, level, message, ...meta } = info;
        const metaStr = Object.keys(meta).length ? JSON.stringify(meta, null, 2) : '';
        return `${timestamp} [${level}]: ${message} ${metaStr}`;
    })
);

// Define transports
const transports: winston.transport[] = [
    // Console transport
    new winston.transports.Console({
        format: consoleFormat,
    }),
];


// Create logger instance
const logger = winston.createLogger({
    level: config.nodeEnv === 'development' ? 'debug' : 'info',
    levels,
    format,
    transports,
    exitOnError: false,
});

// Create a stream object for Morgan HTTP logger
export const stream = {
    write: (message: string) => {
        logger.http(message.trim());
    },
};

export { logger };
