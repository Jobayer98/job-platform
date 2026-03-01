import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError } from 'zod';

// Extend Express Request type to include validated data
declare global {
    namespace Express {
        interface Request {
            validatedQuery?: any;
        }
    }
}

export const validate = (schema: ZodSchema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            schema.parse(req.body);
            next();
        } catch (error) {
            if (error instanceof ZodError) {
                const details = error.issues.map((err) => ({
                    field: err.path.join('.'),
                    message: err.message,
                }));

                return res.status(400).json({
                    success: false,
                    error: {
                        code: 'VALIDATION_ERROR',
                        message: 'Validation failed',
                        details,
                    },
                });
            }
            next(error);
        }
    };
};

export const validateQuery = (schema: ZodSchema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            const parsed = schema.parse(req.query);
            req.validatedQuery = parsed;
            next();
        } catch (error) {
            if (error instanceof ZodError) {
                const details = error.issues.map((err) => ({
                    field: err.path.join('.'),
                    message: err.message,
                }));

                return res.status(400).json({
                    success: false,
                    error: {
                        code: 'VALIDATION_ERROR',
                        message: 'Query validation failed',
                        details,
                    },
                });
            }
            next(error);
        }
    };
};
