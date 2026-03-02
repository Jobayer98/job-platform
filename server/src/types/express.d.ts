// Type declarations for Express
import 'express';

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        role: string;
      };
      validatedQuery?: any;
    }
  }
}
