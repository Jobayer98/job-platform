import { prisma } from '../config/database';

/**
 * Generate a URL-friendly slug from a string
 */
export function generateSlug(text: string): string {
    return text
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

/**
 * Generate a unique slug for a job
 * If slug exists, append a number (e.g., job-title-2, job-title-3)
 */
export async function generateUniqueJobSlug(title: string): Promise<string> {
    const baseSlug = generateSlug(title);

    const existingJob = await prisma.job.findUnique({
        where: { slug: baseSlug },
    });

    if (!existingJob) {
        return baseSlug;
    }

    let counter = 2;
    let uniqueSlug = `${baseSlug}-${counter}`;

    while (await prisma.job.findUnique({ where: { slug: uniqueSlug } })) {
        counter++;
        uniqueSlug = `${baseSlug}-${counter}`;
    }

    return uniqueSlug;
}