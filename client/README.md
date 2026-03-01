# QuickHire - Frontend

A modern job platform frontend built with Next.js 16, TypeScript, and Tailwind CSS. This application provides a seamless user experience for job seekers and administrators to manage job listings.

## 🚀 Features

### Public Features

- **Homepage**: Hero section with search, featured jobs, latest jobs, and company showcase
- **Job Search**: Advanced search with filters (category, location, company)
- **Job Listings**: Paginated job listings with sorting and filtering
- **Job Details**: Detailed job information with application form
- **Responsive Design**: Mobile-first design that works on all devices

### Admin Features

- **Authentication**: Secure login and registration system
- **Dashboard**: Overview with statistics (total jobs, applications, active jobs)
- **Job Management**: Create, view, and delete job listings
- **Profile Management**: View admin profile and account information
- **Protected Routes**: Secure admin-only pages with JWT authentication

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Notifications**: [Sonner](https://sonner.emilkowal.ski/)
- **HTTP Client**: Native Fetch API

## 📋 Prerequisites

- Node.js 18.x or higher
- npm, yarn, pnpm, or bun
- Backend API running on `http://localhost:3001` (or configure `NEXT_PUBLIC_API_URL`)

## 🔧 Installation

1. **Clone the repository** (if not already done):

```bash
git clone <repository-url>
cd job-platform/client
```

2. **Install dependencies**:

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Configure environment variables**:
   Create a `.env.local` file in the client directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api/v1
```

## 🚀 Getting Started

### Development Mode

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

### Production Build

Build the application for production:

```bash
npm run build
npm start
```

### Linting

Run ESLint to check code quality:

```bash
npm run lint
```

## 📁 Project Structure

```
client/
├── app/                          # Next.js App Router pages
│   ├── admin/                    # Admin pages
│   │   ├── auth/                 # Admin authentication
│   │   ├── jobs/                 # Admin job management
│   │   │   └── new/              # Create new job
│   │   ├── profile/              # Admin profile
│   │   └── page.tsx              # Admin dashboard
│   ├── jobs/                     # Public job pages
│   │   ├── [id]/                 # Job detail page
│   │   └── page.tsx              # Jobs listing
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Homepage
│   └── globals.css               # Global styles
├── components/                   # React components
│   ├── admin/                    # Admin-specific components
│   │   └── AdminLayout.tsx       # Admin layout with sidebar
│   ├── shared/                   # Shared components
│   │   ├── CategoryCard.tsx
│   │   ├── CategorySection.tsx
│   │   ├── CompaniesSection.tsx
│   │   ├── ConditionalLayout.tsx
│   │   ├── FeaturedJobCard.tsx
│   │   ├── FeaturedJobsSection.tsx
│   │   ├── Footer.tsx
│   │   ├── HeroSection.tsx
│   │   ├── JobCard.tsx
│   │   ├── LatestJobs.tsx
│   │   ├── Navbar.tsx
│   │   └── PostingSection.tsx
│   └── ui/                       # shadcn/ui components
│       ├── button.tsx
│       ├── input.tsx
│       ├── label.tsx
│       ├── select.tsx
│       ├── sonner.tsx
│       └── textarea.tsx
├── lib/                          # Utility functions and configs
│   ├── auth.ts                   # Authentication utilities
│   ├── constants.ts              # App constants (API_URL)
│   ├── types.ts                  # TypeScript type definitions
│   └── utils.ts                  # Utility functions
├── public/                       # Static assets
│   └── images/                   # Image files
├── .env.local                    # Environment variables (create this)
├── next.config.ts                # Next.js configuration
├── tailwind.config.ts            # Tailwind CSS configuration
├── tsconfig.json                 # TypeScript configuration
└── package.json                  # Dependencies and scripts
```

## 🔑 Key Features Explained

### Authentication System

- JWT-based authentication
- Token stored in localStorage
- Protected admin routes with automatic redirect
- Logout functionality with toast notifications

### Search & Filters

- Hero section search (job title + location)
- Advanced filters (category, location, company)
- URL parameter-based filtering
- Real-time search results

### Admin Dashboard

- Statistics overview (total jobs, applications, active jobs)
- Recent jobs list with quick actions
- Delete jobs with toast confirmation
- Responsive sidebar navigation

### Job Management

- Create new job listings with form validation
- View all jobs with search functionality
- Delete jobs with loading states
- Real-time updates after operations

## 🎨 UI Components

This project uses [shadcn/ui](https://ui.shadcn.com/) components. To add new components:

```bash
npx shadcn@latest add [component-name]
```

Available components:

- `button` - Button component with variants
- `input` - Input field component
- `label` - Form label component
- `select` - Select dropdown component
- `textarea` - Textarea component
- `sonner` - Toast notification component

## 🔐 Environment Variables

| Variable              | Description          | Default                        |
| --------------------- | -------------------- | ------------------------------ |
| `NEXT_PUBLIC_API_URL` | Backend API base URL | `http://localhost:3001/api/v1` |

## 📱 Pages Overview

### Public Pages

- `/` - Homepage with hero, jobs, and categories
- `/jobs` - Job listings with search and filters
- `/jobs/[id]` - Job detail page with application form

### Admin Pages

- `/admin/auth` - Admin login and registration
- `/admin` - Dashboard with statistics
- `/admin/jobs` - Job management
- `/admin/jobs/new` - Create new job
- `/admin/profile` - Admin profile

## 🎯 API Integration

The frontend communicates with the backend API using the Fetch API. All API calls are centralized using:

- **Constants**: `lib/constants.ts` - API_URL configuration
- **Types**: `lib/types.ts` - TypeScript interfaces
- **Auth**: `lib/auth.ts` - Authentication utilities

Example API call:

```typescript
import { API_URL } from "@/lib/constants";
import { getAuthHeaders } from "@/lib/auth";

const response = await fetch(`${API_URL}/jobs`, {
  headers: getAuthHeaders(),
});
```

## 🚨 Error Handling

- Toast notifications for user feedback
- Loading states for async operations
- Error boundaries for component errors
- Null checks and type safety

## 🎨 Styling

- **Tailwind CSS**: Utility-first CSS framework
- **Custom Colors**: Indigo-600 as primary color
- **Responsive Design**: Mobile-first approach
- **Dark Mode**: Not implemented (future enhancement)

## 📦 Build & Deployment

### Build for Production

```bash
npm run build
```

### Start Production Server

```bash
npm start
```

### Deploy to Vercel

The easiest way to deploy is using [Vercel](https://vercel.com):

1. Push your code to GitHub
2. Import project in Vercel
3. Configure environment variables
4. Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-repo/job-platform)

## 🧪 Testing

Currently, no tests are implemented. Future enhancements:

- Unit tests with Jest
- Integration tests with React Testing Library
- E2E tests with Playwright

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 Code Style

- Use TypeScript for type safety
- Follow ESLint rules
- Use functional components with hooks
- Keep components small and focused
- Use meaningful variable names

## 🐛 Known Issues

- None currently reported

## 🔮 Future Enhancements

- [ ] Dark mode support
- [ ] Advanced job filters (salary range, experience level)
- [ ] Saved jobs functionality
- [ ] Application tracking for job seekers
- [ ] Email notifications
- [ ] Social media integration
- [ ] Company profiles
- [ ] Job recommendations

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com/)

## 📄 License

This project is part of the QuickHire job platform.

## 👥 Authors

- Your Name - Initial work

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- shadcn for the beautiful UI components
- Tailwind CSS for the utility-first CSS framework
