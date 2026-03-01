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

        // Build WHERE conditions
        const conditions: string[] = [];
        const params: any[] = [];
        let paramIndex = 1;

        // Category filter
        if (query.category) {
            conditions.push(`category ILIKE $${paramIndex}`);
            params.push(`%${query.category}%`);
            paramIndex++;
        }

        // Location filter
        if (query.location) {
            conditions.push(`location ILIKE $${paramIndex}`);
            params.push(`%${query.location}%`);
            paramIndex++;
        }

        // Company filter
        if (query.company) {
            conditions.push(`company ILIKE $${paramIndex}`);
            params.push(`%${query.company}%`);
            paramIndex++;
        }

        // Full-text search with PostgreSQL
        if (query.search) {
            const searchTerm = query.search.trim();

            // Create tsquery - handle short words and phrases
            const searchWords = searchTerm.split(/\s+/).filter(w => w.length > 0);
            const tsquery = searchWords.map(word => {
                // For short words (1-3 chars), use exact match
                // For longer words, use prefix match
                return word.length <= 3 ? word : `${word}:*`;
            }).join(' & ');

            conditions.push(`(
                to_tsvector('english', 
                    COALESCE(title, '') || ' ' || 
                    COALESCE(company, '') || ' ' || 
                    COALESCE(location, '') || ' ' || 
                    COALESCE(category, '') || ' ' || 
                    COALESCE(description, '')
                ) @@ to_tsquery('english', $${paramIndex})
                OR title ILIKE $${paramIndex + 1}
                OR company ILIKE $${paramIndex + 1}
                OR description ILIKE $${paramIndex + 1}
            )`);
            params.push(tsquery);
            params.push(`%${searchTerm}%`);
            paramIndex += 2;
        }

        const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

        // Sorting
        const [sortField, sortOrder] = query.sort.split(':');
        const orderByField = sortField === 'created_at' ? 'created_at' : sortField;
        const orderByDirection = sortOrder === 'asc' ? 'ASC' : 'DESC';

        // Get total count
        const countQuery = `
            SELECT COUNT(*) as total
            FROM jobs
            ${whereClause}
        `;
        const countResult: any = await prisma.$queryRawUnsafe(countQuery, ...params);
        const total = parseInt(countResult[0]?.total || '0');

        // Get jobs with pagination
        const jobsQuery = `
            SELECT 
                j.id,
                j.title,
                j.slug,
                j.company,
                j.location,
                j.category,
                j.description,
                j.created_at,
                COUNT(a.id) as applications_count
            FROM jobs j
            LEFT JOIN applications a ON j.id = a.job_id
            ${whereClause}
            GROUP BY j.id, j.title, j.slug, j.company, j.location, j.category, j.description, j.created_at
            ORDER BY j.${orderByField} ${orderByDirection}
            LIMIT $${paramIndex} OFFSET $${paramIndex + 1}
        `;

        const jobs: any = await prisma.$queryRawUnsafe(
            jobsQuery,
            ...params,
            limit,
            skip
        );

        const jobsWithCount = jobs.map((job: any) => ({
            id: job.id,
            title: job.title,
            slug: job.slug,
            company: job.company,
            location: job.location,
            category: job.category,
            description: job.description,
            created_at: job.created_at,
            applications_count: parseInt(job.applications_count || '0'),
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
            slug: job.slug,
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
