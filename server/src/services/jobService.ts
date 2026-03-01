import { prisma } from '../config/database';
import { CreateJobInput, GetJobsQuery } from '../schemas/Job';
import { AppError } from '../middlewares/errorHandler';
import { generateUniqueJobSlug } from '../utils/slugGenerator';

export class JobService {
    async createJob(data: CreateJobInput, userId: string) {
        const slug = await generateUniqueJobSlug(data.title);

        const job = await prisma.job.create({
            data: {
                title: data.title,
                slug: slug,
                company: data.company,
                location: data.location,
                category: data.category,
                description: data.description,
                userId: userId,
            },
        });
        return job;
    }

    async getJobs(query: GetJobsQuery) {
        const page = parseInt(query.page);
        const limit = parseInt(query.limit);
        const skip = (page - 1) * limit;

        const where: any = {};

        if (query.category) {
            where.category = { contains: query.category, mode: 'insensitive' };
        }
        if (query.location) {
            where.location = { contains: query.location, mode: 'insensitive' };
        }
        if (query.company) {
            where.company = { contains: query.company, mode: 'insensitive' };
        }
        if (query.search) {
            where.OR = [
                { title: { contains: query.search, mode: 'insensitive' } },
                { description: { contains: query.search, mode: 'insensitive' } },
            ];
        }

        const [sortField, sortOrder] = query.sort.split(':');
        const orderBy: any = {};
        orderBy[sortField === 'created_at' ? 'createdAt' : sortField] = sortOrder || 'desc';

        const [jobs, total] = await Promise.all([
            prisma.job.findMany({
                where,
                skip,
                take: limit,
                orderBy,
                include: {
                    _count: {
                        select: { applications: true },
                    },
                },
            }),
            prisma.job.count({ where }),
        ]);

        const jobsWithCount = jobs.map((job: any) => ({
            id: job.id,
            title: job.title,
            company: job.company,
            location: job.location,
            category: job.category,
            description: job.description,
            created_at: job.createdAt,
            applications_count: job._count.applications,
        }));

        return {
            jobs: jobsWithCount,
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit),
            },
        };
    }

    async getJobById(id: string) {
        const job = await prisma.job.findUnique({
            where: { id },
            include: {
                _count: {
                    select: { applications: true },
                },
            },
        });

        if (!job) {
            throw new AppError('Job not found', 404, 'NOT_FOUND');
        }

        return {
            id: job.id,
            title: job.title,
            company: job.company,
            location: job.location,
            category: job.category,
            description: job.description,
            created_at: job.createdAt,
            applications_count: job._count.applications,
        };
    }

    async deleteJob(id: string) {
        const job = await prisma.job.findUnique({ where: { id } });

        if (!job) {
            throw new AppError('Job not found', 404, 'NOT_FOUND');
        }

        await prisma.job.delete({ where: { id } });
    }
}

export const jobService = new JobService();
