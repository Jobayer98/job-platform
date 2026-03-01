import { Router } from 'express';
import { dashboardController } from '../controllers/dashboardController';
import { authenticate } from '../middlewares/auth';

const router = Router();

/**
 * @swagger
 * /dashboard/stats:
 *   get:
 *     summary: Get dashboard statistics
 *     description: Get overview statistics for admin dashboard
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard stats retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     totalJobs:
 *                       type: integer
 *                       example: 25
 *                     totalApplications:
 *                       type: integer
 *                       example: 150
 *                     activeJobs:
 *                       type: integer
 *                       example: 10
 *                     recentApplications:
 *                       type: integer
 *                       example: 45
 *                     recentJobs:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                           title:
 *                             type: string
 *                           company:
 *                             type: string
 *                           location:
 *                             type: string
 *                           category:
 *                             type: string
 *                           applications_count:
 *                             type: integer
 *                           created_at:
 *                             type: string
 *                             format: date-time
 *                 message:
 *                   type: string
 *                   example: "Dashboard stats retrieved successfully"
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UnauthorizedError'
 */
router.get('/stats', authenticate, dashboardController.getStats);

export default router;
