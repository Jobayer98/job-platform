import { Request, Response, NextFunction } from 'express';
import { jobService } from '../services/jobService';
import { CreateJobInput, GetJobsQuery } from '../schemas/Job';

export class JobController {
    async createJob(req: Request, res: Response, next: NextFunction) {
        try {
            const data: CreateJobInput = req.body;
            const job = await jobService.createJob(data);

            res.status(201).json({
                success: true,
                message: 'Job created successfully',
                data: job,
            });
        } catch (error) {
            next(error);
        }
    }

    async getJobs(req: Request, res: Response, next: NextFunction) {
        try {
            const query: GetJobsQuery = (req.validatedQuery || req.query) as any;
            const result = await jobService.getJobs(query);

            res.status(200).json({
                success: true,
                message: 'Jobs retrieved successfully',
                data: result,
            });
        } catch (error) {
            next(error);
        }
    }

    async getJobById(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const job = await jobService.getJobById(String(id));

            res.status(200).json({
                success: true,
                message: 'Job retrieved successfully',
                data: job,
            });
        } catch (error) {
            next(error);
        }
    }

    async deleteJob(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            await jobService.deleteJob(String(id));

            res.status(200).json({
                success: true,
                message: 'Job deleted successfully',
                data: null,
            });
        } catch (error) {
            next(error);
        }
    }
}

export const jobController = new JobController();
