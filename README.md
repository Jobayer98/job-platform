# QuickHire - Job Platform

A modern, full-stack job platform that connects job seekers with opportunities. Built with Next.js, Node.js, TypeScript, and PostgreSQL.

## 🎯 Overview

QuickHire is a comprehensive job listing and application management platform featuring:

- **Public Job Portal**: Browse, search, and apply for jobs
- **Admin Dashboard**: Manage job postings and view analytics
- **Real-time Search**: Advanced filtering by category, location, and company
- **Responsive Design**: Seamless experience across all devices
- **Secure Authentication**: JWT-based admin authentication

## 🏗️ Architecture

### Monorepo Structure

```
job-platform/
├── client/                 # Next.js 16 Frontend
│   ├── app/               # App Router pages
│   ├── components/        # React components
│   ├── lib/              # Utilities and types
│   └── public/           # Static assets
│
├── server/                # Node.js Backend API
│   ├── src/
│   │   ├── config/       # Configuration files
│   │   ├── controllers/  # Request handlers
│   │   ├── middlewares/  # Express middlewares
│   │   ├── routes/       # API routes
│   │   ├── schemas/      # Validation schemas
│   │   └── services/     # Business logic
│   └── prisma/           # Database schema & migrations
│
```

### Technology Stack

#### Frontend (Client)

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **State Management**: React Hooks
- **HTTP Client**: Fetch API
- **Notifications**: Sonner (Toast)

#### Backend (Server)

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: Prisma 7
- **Authentication**: JWT (jsonwebtoken)
- **Validation**: Zod
- **Security**: Helmet, CORS, Rate Limiting

#### Database

- **Type**: PostgreSQL
- **ORM**: Prisma
- **Features**:
  - Full-text search
  - Cascading deletes
  - Indexed queries
  - Connection pooling

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- PostgreSQL 14+
- npm or yarn

### Installation

1. **Clone the repository**

```bash
git clone <repository-url>
cd job-platform
```

2. **Setup Backend**

```bash
cd server
npm install
cp .env.example .env
# Edit .env with your database credentials
npm run db:generate
npm run db:migrate
npm run seed  # Optional: Add sample data
npm run dev
```

3. **Setup Frontend**

```bash
cd ../client
npm install
cp .env.example .env.local
# Edit .env.local with API URL
npm run dev
```

4. **Access the application**

- Frontend: http://localhost:3000
- Backend API: http://localhost:3001/api/v1
- API Docs: http://localhost:3001/api-docs

## 📊 System Architecture

### Data Flow

```
┌─────────────┐         ┌─────────────┐         ┌──────────────┐
│   Browser   │ ◄─────► │  Next.js    │ ◄─────► │  Express API │
│  (Client)   │  HTTP   │  Frontend   │  REST   │   (Server)   │
└─────────────┘         └─────────────┘         └──────┬───────┘
                                                        │
                                                        ▼
                                                 ┌──────────────┐
                                                 │  PostgreSQL  │
                                                 │   Database   │
                                                 └──────────────┘
```

### API Architecture

```
Request → Middleware Chain → Controller → Service → Database
   │
   ├─ Rate Limiter
   ├─ CORS
   ├─ Helmet (Security)
   ├─ Authentication (JWT)
   ├─ Validation (Zod)
   └─ Error Handler
```

### Database Schema

```
┌─────────────┐       ┌─────────────┐       ┌──────────────┐
│    User     │       │     Job     │       │ Application  │
├─────────────┤       ├─────────────┤       ├──────────────┤
│ id (PK)     │───┐   │ id (PK)     │───┐   │ id (PK)      │
│ name        │   └──►│ userId (FK) │   └──►│ jobId (FK)   │
│ email       │       │ title       │       │ name         │
│ password    │       │ company     │       │ email        │
│ role        │       │ location    │       │ resume_link  │
│ created_at  │       │ category    │       │ cover_note   │
└─────────────┘       │ description │       │ created_at   │
                      │ created_at  │       └──────────────┘
                      └─────────────┘
```

## 🔐 Authentication Flow

```
1. User Login → POST /api/v1/auth/login
2. Server validates credentials
3. Server generates JWT token
4. Client stores token in localStorage
5. Client includes token in Authorization header
6. Server validates token on protected routes
7. Server returns user data or error
```

## 📡 API Endpoints

### Public Endpoints

- `GET /api/v1/jobs` - List all jobs (with filters)
- `GET /api/v1/jobs/:id` - Get job details
- `POST /api/v1/applications` - Submit application

### Admin Endpoints (Protected)

- `POST /api/v1/auth/register` - Register admin
- `POST /api/v1/auth/login` - Admin login
- `GET /api/v1/auth/profile` - Get admin profile
- `POST /api/v1/jobs` - Create job
- `DELETE /api/v1/jobs/:id` - Delete job
- `GET /api/v1/dashboard/stats` - Get dashboard statistics

## 🎨 Frontend Architecture

### Component Structure

```
app/
├── (public)
│   ├── page.tsx              # Homepage
│   ├── jobs/
│   │   ├── page.tsx          # Jobs listing
│   │   └── [id]/page.tsx     # Job details
│   └── layout.tsx            # Public layout
│
└── admin/
    ├── page.tsx              # Dashboard
    ├── auth/page.tsx         # Login/Register
    ├── jobs/
    │   ├── page.tsx          # Manage jobs
    │   └── new/page.tsx      # Create job
    └── profile/page.tsx      # Admin profile
```

### State Management

- **Local State**: React useState for component state
- **Server State**: Fetch API with loading/error states
- **Auth State**: localStorage for JWT token
- **Form State**: Controlled components

## 🔒 Security Features

- **JWT Authentication**: Secure token-based auth
- **Password Hashing**: bcrypt for password security
- **Rate Limiting**: 100 requests per 15 minutes
- **CORS**: Configured for specific origins
- **Helmet**: Security headers
- **Input Validation**: Zod schemas
- **SQL Injection Prevention**: Prisma ORM
- **XSS Protection**: React's built-in escaping

## 📦 Deployment

### Render (Recommended)

See [RENDER_DEPLOYMENT.md](./RENDER_DEPLOYMENT.md) for detailed instructions.

**Quick Deploy:**

1. Create PostgreSQL database on Render
2. Create Web Service with Root Directory: `server`
3. Set environment variables
4. Deploy automatically from GitHub

### Environment Variables

**Backend (.env)**

```env
DATABASE_URL=postgresql://...
JWT_SECRET=your-secret-key
PORT=3001
NODE_ENV=production
CORS_ORIGIN=https://your-frontend.com
```

**Frontend (.env.local)**

```env
NEXT_PUBLIC_API_URL=https://your-api.com/api/v1
```

## 🧪 Testing

```bash
# Backend
cd server
npm run lint
npm run build

# Frontend
cd client
npm run lint
npm run build
```

## 📈 Performance Optimizations

- **Database**: Indexed queries, connection pooling
- **Frontend**: Next.js automatic code splitting
- **API**: Response compression with gzip
- **Caching**: Static asset caching
- **Images**: Next.js Image optimization

## 🛠️ Development Workflow

1. **Feature Branch**: Create from `main`
2. **Development**: Make changes and test locally
3. **Commit**: Use conventional commits
4. **Push**: Push to GitHub
5. **Deploy**: Automatic deployment on Render

## 📚 Documentation

- [Backend API Documentation](./server/README.md)
- [Frontend Documentation](./client/README.md)
- [Deployment Guide](./RENDER_DEPLOYMENT.md)
- [API Docs (Swagger)](http://localhost:3001/api-docs)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 👥 Team

- **Backend**: Node.js + Express + Prisma
- **Frontend**: Next.js + React + TypeScript
- **Database**: PostgreSQL
- **Deployment**: Render

## 🔮 Future Enhancements

- [ ] Email notifications for applications
- [ ] Advanced analytics dashboard
- [ ] Job recommendations based on user profile
- [ ] Company profiles and pages
- [ ] Saved jobs functionality
- [ ] Application tracking for job seekers
- [ ] Resume builder
- [ ] Interview scheduling
- [ ] Real-time chat between recruiters and candidates
- [ ] Mobile app (React Native)

## 📞 Support

For issues and questions:

- Create an issue on GitHub
- Check existing documentation
- Review API documentation at `/api-docs`

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Prisma for the excellent ORM
- shadcn for beautiful UI components
- Render for easy deployment

---

**Built with ❤️ using modern web technologies**
