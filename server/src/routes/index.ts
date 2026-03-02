import { Router } from 'express';
import authRoutes from './authRoutes';
import jobRoutes from './jobRoutes';
import applicationRoutes from './applicationRoutes';
import dashboardRoutes from './dashboardRoutes';

const router = Router();

// Health check endpoint for Render
router.get('/health', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Server is healthy',
        timestamp: new Date().toISOString(),
    });
});

router.use('/auth', authRoutes);
router.use('/jobs', jobRoutes);
router.use('/applications', applicationRoutes);
router.use('/dashboard', dashboardRoutes);

export default router;
