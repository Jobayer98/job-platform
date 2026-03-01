import { Request, Response, NextFunction } from 'express';
import { dashboardService } from '../services/dashboardService';

export class DashboardController {
    async getStats(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.user?.id;

            if (!userId) {
                return res.status(401).json({
                    success: false,
                    error: {
                        code: 'UNAUTHORIZED',
                        message: 'User not authenticated',
                    },
                });
            }

            const stats = await dashboardService.getStats(userId);

            res.status(200).json({
                success: true,
                data: stats,
                message: 'Dashboard stats retrieved successfully',
            });
        } catch (error) {
            next(error);
        }
    }
}

export const dashboardController = new DashboardController();
