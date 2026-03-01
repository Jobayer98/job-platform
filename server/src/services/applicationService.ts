import { prisma } from '../config/database';
import { CreateApplicationInput } from '../schemas/Application';
import { AppError } from '../middlewares/errorHandler';

export class ApplicationService {
    async createApplication(data: CreateApplicationInput) {
        const job = await prisma.job.findUnique({
            where: { id: data.job_id },
        });

        if (!job) {
            throw new AppError('Job not found', 404, 'NOT_FOUND');
        }

        const existingApplication = await prisma.application.findFirst({
            where: {
                jobId: data.job_id,
                email: data.email,
            },
        });

        if (existingApplication) {
            throw new AppError(
                'You have already applied for this job',
                400,
                'DUPLICATE_APPLICATION'
            );
        }

        const application = await prisma.application.create({
            data: {
                jobId: data.job_id,
                name: data.name,
                email: data.email,
                resumeLink: data.resume_link,
                coverNote: data.cover_note,
            },
        });

        return {
            id: application.id,
            job_id: application.jobId,
            name: application.name,
            email: application.email,
            resume_link: application.resumeLink,
            cover_note: application.coverNote,
            created_at: application.createdAt,
        };
    }

    async getApplicationsByJobId(jobId: string) {
        const job = await prisma.job.findUnique({
            where: { id: jobId },
        });

        if (!job) {
            throw new AppError('Job not found', 404, 'NOT_FOUND');
        }

        const applications = await prisma.application.findMany({
            where: { jobId },
            orderBy: { createdAt: 'desc' },
        });

        return {
            job_id: jobId,
            job_title: job.title,
            applications: applications.map((app: any) => ({
                id: app.id,
                name: app.name,
                email: app.email,
                resume_link: app.resumeLink,
                cover_note: app.coverNote,
                created_at: app.createdAt,
            })),
        };
    }
}

export const applicationService = new ApplicationService();
