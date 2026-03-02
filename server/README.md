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

### Interactive API Documentation

Access the interactive Swagger UI documentation at:

- **Swagger UI**: `http://localhost:3000/api-docs`
- **OpenAPI JSON**: `http://localhost:3000/api-docs.json`

The Swagger UI provides:

- Interactive API testing
- Request/response examples
- Schema definitions
- Authentication testing

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

## Deploying to Render

### Prerequisites

1. A Render account (https://render.com)
2. Your code pushed to GitHub/GitLab
3. PostgreSQL database on Render

### Step-by-Step Deployment

#### 1. Create PostgreSQL Database

1. Go to Render Dashboard
2. Click "New +" → "PostgreSQL"
3. Configure:
   - **Name**: `quickhire-db`
   - **Database**: `jobdb`
   - **User**: `jobdb_user`
   - **Region**: Choose closest to your users
   - **Plan**: Free (or paid for production)
4. Click "Create Database"
5. Copy the **External Database URL** (you'll need this)

#### 2. Deploy Backend API

**Option A: Using Render Dashboard**

1. Go to Render Dashboard
2. Click "New +" → "Web Service"
3. Connect your repository
4. Configure:
   - **Name**: `quickhire-api`
   - **Region**: Same as database
   - **Branch**: `main` or `master`
   - **Root Directory**: `server` ⚠️ **IMPORTANT for monorepo**
   - **Runtime**: Node
   - **Build Command**:
     ```bash
     npm install && npm run db:generate && npm run build
     ```
   - **Start Command**:
     ```bash
     npm start
     ```
   - **Plan**: Free (or paid for production)

5. Add Environment Variables:
   - `NODE_ENV` = `production`
   - `PORT` = `3001`
   - `DATABASE_URL` = (Paste your External Database URL with `?sslmode=require` at the end)
   - `JWT_SECRET` = (Generate a secure random string)
   - `JWT_EXPIRE` = `7d`
   - `API_VERSION` = `v1`
   - `CORS_ORIGIN` = `https://your-frontend-url.onrender.com` (update after deploying frontend)
   - `RATE_LIMIT_WINDOW` = `15`
   - `RATE_LIMIT_MAX` = `100`

6. Click "Create Web Service"

**Option B: Using render.yaml (Infrastructure as Code)**

1. The `render.yaml` file is already in your project root
2. Update the `CORS_ORIGIN` in render.yaml with your frontend URL
3. Push to GitHub
4. In Render Dashboard:
   - Click "New +" → "Blueprint"
   - Connect your repository
   - Render will automatically detect and deploy based on render.yaml

#### 3. Run Database Migrations

After deployment, you need to run migrations:

1. Go to your Web Service in Render Dashboard
2. Click "Shell" tab
3. Run:
   ```bash
   npm run db:migrate
   ```

Or use Render's one-time job:

```bash
npm run db:push
```

#### 4. Seed Database (Optional)

To add sample data:

1. In the Shell tab, run:
   ```bash
   npm run seed
   ```

#### 5. Test Your API

Your API will be available at:

```
https://quickhire-api.onrender.com/api/v1
```

Test the health endpoint:

```
https://quickhire-api.onrender.com/api/v1/health
```

### Important Notes for Render Deployment

1. **Monorepo Structure**: Always set `Root Directory` to `server` in Render settings

2. **Database URL Format**: Ensure your DATABASE_URL includes SSL:

   ```
   postgresql://user:password@host/database?sslmode=require
   ```

3. **Free Tier Limitations**:
   - Service spins down after 15 minutes of inactivity
   - First request after spin-down takes ~30 seconds
   - Database has 90-day expiration on free tier

4. **Connection Pooling**: The database configuration in `src/config/database.ts` already handles:
   - SSL connections
   - Connection pooling
   - Automatic reconnection
   - Graceful shutdown

5. **Environment Variables**: Never commit `.env` files. Always use Render's environment variable settings.

6. **Build Failures**: If build fails, check:
   - Root Directory is set to `server`
   - All dependencies are in `package.json`
   - Build command includes `npm run db:generate`

### Monitoring and Logs

1. **View Logs**: Go to your service → "Logs" tab
2. **Metrics**: Go to your service → "Metrics" tab
3. **Health Checks**: Render automatically monitors `/api/v1/health`

### Updating Your Deployment

1. Push changes to your GitHub repository
2. Render automatically detects and redeploys
3. Or manually trigger deploy from Render Dashboard

### Troubleshooting

**Problem**: "Server has closed the connection" error

**Solution**:

- Ensure DATABASE_URL includes `?sslmode=require`
- Check database connection pooling settings in `src/config/database.ts`
- Verify database is running in Render Dashboard

**Problem**: Build fails with "Cannot find module"

**Solution**:

- Ensure Root Directory is set to `server`
- Run `npm install` locally to verify dependencies
- Check that all imports use correct paths

**Problem**: 502 Bad Gateway

**Solution**:

- Check if PORT environment variable is set to `3001`
- Verify the start command is `npm start`
- Check logs for startup errors

### Production Checklist

- [ ] Database created and running
- [ ] Environment variables configured
- [ ] Root Directory set to `server`
- [ ] Build and start commands correct
- [ ] Migrations run successfully
- [ ] Health check endpoint responding
- [ ] CORS_ORIGIN updated with frontend URL
- [ ] JWT_SECRET is secure and random
- [ ] Database backups enabled (paid plans)

### Cost Optimization

**Free Tier**:

- 1 PostgreSQL database (90 days)
- 750 hours/month web service
- Automatic spin-down after inactivity

**Paid Plans** (Recommended for Production):

- Persistent database
- No spin-down
- More resources
- Automatic backups
- Custom domains

### Support

For Render-specific issues:

- Documentation: https://render.com/docs
- Community: https://community.render.com
- Support: support@render.com
