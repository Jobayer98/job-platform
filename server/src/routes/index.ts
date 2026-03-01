import { Router } from 'express';
import jobRoutes from './jobRoutes';
import applicationRoutes from './applicationRoutes';

const router = Router();

router.use('/jobs', jobRoutes);
router.use('/applications', applicationRoutes);

export default router;
