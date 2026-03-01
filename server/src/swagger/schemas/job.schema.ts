/**
 * @swagger
 * components:
 *   schemas:
 *     Job:
 *       type: object
 *       required:
 *         - id
 *         - title
 *         - company
 *         - location
 *         - category
 *         - description
 *         - created_at
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: Unique identifier for the job
 *           example: "550e8400-e29b-41d4-a716-446655440000"
 *         title:
 *           type: string
 *           description: Job title
 *           example: "Senior Full Stack Developer"
 *         company:
 *           type: string
 *           description: Company name
 *           example: "Tech Corp"
 *         location:
 *           type: string
 *           description: Job location
 *           example: "Remote"
 *         category:
 *           type: string
 *           description: Job category
 *           example: "Engineering"
 *         description:
 *           type: string
 *           description: Detailed job description
 *           example: "We are looking for an experienced full stack developer..."
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: Job creation timestamp
 *           example: "2024-01-01T00:00:00.000Z"
 *         applications_count:
 *           type: integer
 *           description: Number of applications for this job
 *           example: 5
 *
 *     CreateJobInput:
 *       type: object
 *       required:
 *         - title
 *         - company
 *         - location
 *         - category
 *         - description
 *       properties:
 *         title:
 *           type: string
 *           description: Job title
 *           example: "Senior Full Stack Developer"
 *         company:
 *           type: string
 *           description: Company name
 *           example: "Tech Corp"
 *         location:
 *           type: string
 *           description: Job location
 *           example: "Remote"
 *         category:
 *           type: string
 *           description: Job category
 *           example: "Engineering"
 *         description:
 *           type: string
 *           description: Detailed job description
 *           example: "We are looking for an experienced full stack developer..."
 *
 *     JobsResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         data:
 *           type: object
 *           properties:
 *             jobs:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Job'
 *             pagination:
 *               type: object
 *               properties:
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 limit:
 *                   type: integer
 *                   example: 10
 *                 total:
 *                   type: integer
 *                   example: 50
 *                 pages:
 *                   type: integer
 *                   example: 5
 *         message:
 *           type: string
 *           example: "Jobs retrieved successfully"
 */
