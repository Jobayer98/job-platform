import { prisma } from '../config/database';

export class DashboardService {
    async getStats(userId: string) {
        // Get total jobs count
        const totalJobs = await prisma.job.count({
            where: { userId: userId },
        });

        // Get total applications count
        const totalApplications = await prisma.application.count({
            where: {
                job: {
                    userId: userId,
                },
            },
        });

        // Get active jobs (jobs created in last 30 days)
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        const activeJobs = await prisma.job.count({
            where: {
                userId: userId,
                createdAt: {
                    gte: thirtyDaysAgo,
                },
            },
        });

        // Get recent applications (last 7 days)
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        const recentApplications = await prisma.application.count({
            where: {
                job: {
                    userId: userId,
                },
                createdAt: {
                    gte: sevenDaysAgo,
                },
            },
        });

        // Get recent jobs with application counts
        const recentJobs = await prisma.job.findMany({
            where: { userId: userId },
            take: 5,
            orderBy: { createdAt: 'desc' },
            include: {
                _count: {
                    select: { applications: true },
                },
            },
        });

        // Format recent jobs
        const formattedRecentJobs = recentJobs.map((job) => ({
            id: job.id,
            title: job.title,
            company: job.company,
            location: job.location,
            category: job.category,
            applications_count: job._count.applications,
            created_at: job.createdAt,
        }));

        return {
            totalJobs,
            totalApplications,
            activeJobs,
            recentApplications,
            recentJobs: formattedRecentJobs,
        };
    }
}

export const dashboardService = new DashboardService();
