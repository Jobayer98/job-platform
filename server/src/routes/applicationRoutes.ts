import { Router } from 'express';
import { applicationController } from '../controllers/applicationController';
import { validate } from '../middlewares/validation';
import { authenticateAdmin } from '../middlewares/auth';
import { createApplicationSchema } from '../schemas/Application';

const router = Router();

/**
 * @swagger
 * /applications:
 *   post:
 *     summary: Submit a job application
 *     description: Submit an application for a specific job. Prevents duplicate applications from the same email.
 *     tags: [Applications]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateApplicationInput'
 *     responses:
 *       201:
 *         description: Application submitted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Application'
 *                 message:
 *                   type: string
 *                   example: "Application submitted successfully"
 *       400:
 *         description: Validation error or duplicate application
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 *       404:
 *         description: Job not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NotFoundError'
 */
router.post('/', validate(createApplicationSchema), applicationController.createApplication.bind(applicationController));

/**
 * @swagger
 * /applications/jobs/{id}/applications:
 *   get:
 *     summary: Get all applications for a job (Admin only)
 *     description: Retrieve all applications submitted for a specific job. Requires admin authentication.
 *     tags: [Applications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Job ID
 *     responses:
 *       200:
 *         description: Applications retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApplicationsResponse'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UnauthorizedError'
 *       404:
 *         description: Job not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NotFoundError'
 */
router.get('/jobs/:id/applications', authenticateAdmin, applicationController.getApplicationsByJobId.bind(applicationController));

export default router;
