import { Router } from 'express';
import { applicationController } from '../controllers/applicationController';
import { validate } from '../middlewares/validation';
import { authenticateAdmin } from '../middlewares/auth';
import { createApplicationSchema } from '../schemas/Application';

const router = Router();

router.post('/', validate(createApplicationSchema), applicationController.createApplication.bind(applicationController));
router.get('/jobs/:id/applications', authenticateAdmin, applicationController.getApplicationsByJobId.bind(applicationController));

export default router;
