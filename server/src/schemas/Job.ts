import { z } from 'zod';

export const createJobSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    company: z.string().min(1, 'Company is required'),
    location: z.string().min(1, 'Location is required'),
    category: z.string().min(1, 'Category is required'),
    description: z.string().min(1, 'Description is required'),
});

export const getJobsQuerySchema = z.object({
    page: z.string().optional().default('1'),
    limit: z.string().optional().default('10'),
    category: z.string().optional(),
    location: z.string().optional(),
    company: z.string().optional(),
    sort: z.string().optional().default('created_at:desc'),
    search: z.string().optional(),
});

export type CreateJobInput = z.infer<typeof createJobSchema>;
export type GetJobsQuery = z.infer<typeof getJobsQuerySchema>;
