# Job Platform API

RESTful API for job listings and applications management built with Node.js, Express, TypeScript, and Prisma.

## Features

- Job listing management (CRUD operations)
- Application submission and tracking
- Advanced filtering, sorting, and search
- Pagination support
- Admin authentication for protected routes
- Input validation and sanitization
- Rate limiting and security headers
- Comprehensive error handling
- Request logging

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Validation**: Zod
- **Authentication**: JWT
- **Security**: Helmet, CORS, Rate Limiting

## Prerequisites

- Node.js (v18 or higher)
- PostgreSQL (v14 or higher)
- npm or yarn

## Installation

1. Clone the repository and navigate to the server directory:

```bash
cd server
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

```bash
cp .env.example .env
```

Edit `.env` and configure your database connection:

```env
DATABASE_URL=postgresql://username:password@localhost:5432/job_platform?schema=public
PORT=3000
NODE_ENV=development
JWT_SECRET=your-secret-key-here
```

4. Generate Prisma client:

```bash
npm run db:generate
```

5. Run database migrations:

```bash
npm run db:migrate
```

6. (Optional) Seed the database with sample data:

```bash
npm run seed
```

## Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors
- `npm run format` - Format code with Prettier
- `npm run db:generate` - Generate Prisma client
- `npm run db:migrate` - Run database migrations
- `npm run db:push` - Push schema changes to database
- `npm run db:studio` - Open Prisma Studio
- `npm run seed` - Seed database with sample data

## API Documentation

Base URL: `http://localhost:3000/api/v1`

### Health Check

#### GET /health

Check server health status.

**Response:**

```json
{
  "success": true,
  "message": "Server is healthy",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### Jobs Endpoints

#### GET /api/v1/jobs

List all jobs with pagination, filtering, and search.

**Query Parameters:**

- `page` (optional, default: 1) - Page number
- `limit` (optional, default: 10) - Items per page
- `category` (optional) - Filter by category
- `location` (optional) - Filter by location
- `company` (optional) - Filter by company
- `search` (optional) - Search in title and description
- `sort` (optional, default: created_at:desc) - Sort field and order

**Example:**

```
GET /api/v1/jobs?page=1&limit=10&category=Engineering&location=Remote&sort=created_at:desc
```

**Response:**

```json
{
  "success": true,
  "data": {
    "jobs": [
      {
        "id": "uuid",
        "title": "Senior Developer",
        "company": "Tech Corp",
        "location": "Remote",
        "category": "Engineering",
        "description": "Job description",
        "created_at": "2024-01-01T00:00:00.000Z",
        "applications_count": 5
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 50,
      "pages": 5
    }
  },
  "message": "Jobs retrieved successfully"
}
```

#### GET /api/v1/jobs/:id

Get single job details.

**Response:**

```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "title": "Senior Developer",
    "company": "Tech Corp",
    "location": "Remote",
    "category": "Engineering",
    "description": "Full job description",
    "created_at": "2024-01-01T00:00:00.000Z",
    "applications_count": 5
  },
  "message": "Job retrieved successfully"
}
```

#### POST /api/v1/jobs (Admin Only)

Create a new job listing.

**Headers:**

```
Authorization: Bearer <admin_token>
```

**Request Body:**

```json
{
  "title": "Senior Developer",
  "company": "Tech Corp",
  "location": "Remote",
  "category": "Engineering",
  "description": "We are looking for a senior developer..."
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "title": "Senior Developer",
    "company": "Tech Corp",
    "location": "Remote",
    "category": "Engineering",
    "description": "We are looking for a senior developer...",
    "createdAt": "2024-01-01T00:00:00.000Z"
  },
  "message": "Job created successfully"
}
```

#### DELETE /api/v1/jobs/:id (Admin Only)

Delete a job listing.

**Headers:**

```
Authorization: Bearer <admin_token>
```

**Response:**

```json
{
  "success": true,
  "data": null,
  "message": "Job deleted successfully"
}
```

### Applications Endpoints

#### POST /api/v1/applications

Submit a job application.

**Request Body:**

```json
{
  "job_id": "uuid",
  "name": "John Doe",
  "email": "john@example.com",
  "resume_link": "https://example.com/resume.pdf",
  "cover_note": "I am interested in this position..."
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "job_id": "uuid",
    "name": "John Doe",
    "email": "john@example.com",
    "resume_link": "https://example.com/resume.pdf",
    "cover_note": "I am interested in this position...",
    "created_at": "2024-01-01T00:00:00.000Z"
  },
  "message": "Application submitted successfully"
}
```

#### GET /api/v1/applications/jobs/:id/applications (Admin Only)

Get all applications for a specific job.

**Headers:**

```
Authorization: Bearer <admin_token>
```

**Response:**

```json
{
  "success": true,
  "data": {
    "job_id": "uuid",
    "job_title": "Senior Developer",
    "applications": [
      {
        "id": "uuid",
        "name": "John Doe",
        "email": "john@example.com",
        "resume_link": "https://example.com/resume.pdf",
        "cover_note": "Application note...",
        "created_at": "2024-01-01T00:00:00.000Z"
      }
    ]
  },
  "message": "Applications retrieved successfully"
}
```

## Error Responses

All errors follow this format:

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Error message",
    "details": []
  }
}
```

**Common Error Codes:**

- `VALIDATION_ERROR` - Input validation failed
- `NOT_FOUND` - Resource not found
- `UNAUTHORIZED` - Authentication required
- `FORBIDDEN` - Insufficient permissions
- `DUPLICATE_APPLICATION` - Already applied for this job
- `RATE_LIMIT_EXCEEDED` - Too many requests
- `INTERNAL_ERROR` - Server error

## Database Schema

### Job Model

- `id` - UUID (Primary Key)
- `title` - String (Required)
- `company` - String (Required)
- `location` - String (Required)
- `category` - String (Required)
- `description` - Text (Required)
- `created_at` - Timestamp (Auto-generated)

### Application Model

- `id` - UUID (Primary Key)
- `job_id` - UUID (Foreign Key to Job)
- `name` - String (Required, min 2 chars)
- `email` - String (Required, valid email)
- `resume_link` - String (Required, valid URL)
- `cover_note` - Text (Optional, max 1000 chars)
- `created_at` - Timestamp (Auto-generated)

## Project Structure

```
server/
├── prisma/
│   ├── schema.prisma       # Database schema
│   └── seed.ts            # Seed data
├── src/
│   ├── config/
│   │   ├── database.ts    # Database connection
│   │   └── environment.ts # Environment config
│   ├── controllers/       # Request handlers
│   ├── middlewares/       # Express middlewares
│   ├── routes/           # API routes
│   ├── schemas/          # Validation schemas
│   ├── services/         # Business logic
│   ├── utils/            # Utility functions
│   ├── app.ts            # Express app setup
│   └── server.ts         # Server entry point
├── .env                  # Environment variables
├── .eslintrc.json       # ESLint config
├── .prettierrc          # Prettier config
├── package.json
└── tsconfig.json        # TypeScript config
```

## Security Features

- Helmet for security headers
- CORS configuration
- Rate limiting (100 requests per 15 minutes)
- JWT authentication for admin routes
- Input validation and sanitization
- SQL injection prevention (Prisma ORM)
- XSS protection

## Development

1. Start the development server:

```bash
npm run dev
```

2. The API will be available at `http://localhost:3000/api/v1`

3. Use Prisma Studio to view/edit database:

```bash
npm run db:studio
```

## Production Deployment

1. Build the project:

```bash
npm run build
```

2. Set environment variables:

```bash
NODE_ENV=production
DATABASE_URL=your_production_database_url
JWT_SECRET=your_secure_secret
```

3. Run migrations:

```bash
npm run db:migrate
```

4. Start the server:

```bash
npm start
```

## License

ISC
