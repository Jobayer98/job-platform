import { Router } from 'express';
import { jobController } from '../controllers/jobController';
import { validate, validateQuery } from '../middlewares/validation';
import { authenticateAdmin } from '../middlewares/auth';
import { createJobSchema, getJobsQuerySchema } from '../schemas/Job';

const router = Router();

router.get('/', validateQuery(getJobsQuerySchema), jobController.getJobs.bind(jobController));
router.get('/:id', jobController.getJobById.bind(jobController));
router.post('/', authenticateAdmin, validate(createJobSchema), jobController.createJob.bind(jobController));
router.delete('/:id', authenticateAdmin, jobController.deleteJob.bind(jobController));

export default router;
