import { z } from 'zod';

export const createApplicationSchema = z.object({
    job_id: z.uuid('Invalid job ID'),
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.email('Invalid email format'),
    resume_link: z.url('Invalid resume link URL'),
    cover_note: z.string().max(1000, 'Cover note must not exceed 1000 characters').optional(),
});

export type CreateApplicationInput = z.infer<typeof createApplicationSchema>;
