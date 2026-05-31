# Jobzz — Tech Job Portal

A modern job portal built with **Next.js 15**, **Prisma**, **MongoDB**, and **Tailwind CSS**. Candidates can search jobs, build resume profiles, apply with AI cover letters, and track applications. Employers can register companies, post jobs, and review applicants.

## Features

- Job search with filters (remote, hybrid, on-site, employment type)
- User authentication with secure httpOnly JWT cookies
- Resume profiles stored in the database
- AI cover letter generation (Google Gemini)
- AI job match scoring for candidates
- AI resume coaching on profile page
- AI job description writer for employers
- AI candidate screening for employers
- Application status tracking (pending → hired/rejected)
- Employer dashboard for job and applicant management
- Company reviews and public company pages
- Dark mode, responsive UI, SEO-friendly pages

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment

Copy `.env.example` to `.env` and set:

- `DATABASE_URL` — MongoDB connection string
- `SECRET` — JWT signing secret
- `GEMINI_API_KEY` — (optional) for AI cover letters
- `NEXT_PUBLIC_SITE_URL` — e.g. `http://localhost:3001`

### 3. Generate Prisma client

```bash
npx prisma generate
```

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3001](http://localhost:3001).

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server on port 3001 |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run Next.js lint |

## Project Structure

```
src/
├── app/              # Next.js App Router pages & API routes
├── components/     # React components
├── context/        # React context providers
├── lib/            # Shared utilities (auth, roles, API helpers)
├── services/       # Prisma client
└── HelperFun/      # Server helpers (auth check, logout)
prisma/
└── schema.prisma   # Database schema
```

## Security Notes

- Auth cookies are `httpOnly` and `secure` in production
- Protected routes use middleware + API-level authorization
- Seeding is disabled in production
- Signup roles are validated server-side

## License

Private project.
