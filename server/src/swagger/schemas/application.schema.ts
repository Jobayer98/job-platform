/**
 * @swagger
 * components:
 *   schemas:
 *     Application:
 *       type: object
 *       required:
 *         - id
 *         - job_id
 *         - name
 *         - email
 *         - resume_link
 *         - created_at
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: Unique identifier for the application
 *           example: "550e8400-e29b-41d4-a716-446655440001"
 *         job_id:
 *           type: string
 *           format: uuid
 *           description: ID of the job being applied to
 *           example: "550e8400-e29b-41d4-a716-446655440000"
 *         name:
 *           type: string
 *           minLength: 2
 *           description: Applicant's full name
 *           example: "John Doe"
 *         email:
 *           type: string
 *           format: email
 *           description: Applicant's email address
 *           example: "john.doe@example.com"
 *         resume_link:
 *           type: string
 *           format: uri
 *           description: URL to applicant's resume
 *           example: "https://example.com/resumes/john-doe.pdf"
 *         cover_note:
 *           type: string
 *           maxLength: 1000
 *           description: Optional cover note
 *           example: "I am very interested in this position..."
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: Application submission timestamp
 *           example: "2024-01-01T00:00:00.000Z"
 *
 *     CreateApplicationInput:
 *       type: object
 *       required:
 *         - job_id
 *         - name
 *         - email
 *         - resume_link
 *       properties:
 *         job_id:
 *           type: string
 *           format: uuid
 *           description: ID of the job being applied to
 *           example: "550e8400-e29b-41d4-a716-446655440000"
 *         name:
 *           type: string
 *           minLength: 2
 *           description: Applicant's full name
 *           example: "John Doe"
 *         email:
 *           type: string
 *           format: email
 *           description: Applicant's email address
 *           example: "john.doe@example.com"
 *         resume_link:
 *           type: string
 *           format: uri
 *           description: URL to applicant's resume
 *           example: "https://example.com/resumes/john-doe.pdf"
 *         cover_note:
 *           type: string
 *           maxLength: 1000
 *           description: Optional cover note
 *           example: "I am very interested in this position..."
 *
 *     ApplicationsResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         data:
 *           type: object
 *           properties:
 *             job_id:
 *               type: string
 *               format: uuid
 *               example: "550e8400-e29b-41d4-a716-446655440000"
 *             job_title:
 *               type: string
 *               example: "Senior Full Stack Developer"
 *             applications:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Application'
 *         message:
 *           type: string
 *           example: "Applications retrieved successfully"
 */
