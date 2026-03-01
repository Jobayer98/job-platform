import { Request, Response, NextFunction } from 'express';
import { applicationService } from '../services/applicationService';
import { CreateApplicationInput } from '../schemas/Application';

export class ApplicationController {
    async createApplication(req: Request, res: Response, next: NextFunction) {
        try {
            const data: CreateApplicationInput = req.body;
            const application = await applicationService.createApplication(data);

            res.status(201).json({
                success: true,
                data: application,
                message: 'Application submitted successfully',
            });
        } catch (error) {
            next(error);
        }
    }

    async getApplicationsByJobId(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const jobId = Array.isArray(id) ? id[0] : id;
            const result = await applicationService.getApplicationsByJobId(jobId);

            res.status(200).json({
                success: true,
                data: result,
                message: 'Applications retrieved successfully',
            });
        } catch (error) {
            next(error);
        }
    }

}

export const applicationController = new ApplicationController();
