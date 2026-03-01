import { Router } from 'express';
import authRoutes from './authRoutes';
import jobRoutes from './jobRoutes';
import applicationRoutes from './applicationRoutes';
import dashboardRoutes from './dashboardRoutes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/jobs', jobRoutes);
router.use('/applications', applicationRoutes);
router.use('/dashboard', dashboardRoutes);

export default router;
