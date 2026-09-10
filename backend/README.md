# SkillBridge Intelligence — Backend API & Database Engine

A modular, production-ready REST API and persistence engine for the **SkillBridge Career Intelligence System**, built with Node.js, Express, PostgreSQL, and Prisma ORM.

---

## 1. Tech Stack & Architecture

- **Runtime**: Node.js (v18+)
- **Web Framework**: Express.js
- **Database**: PostgreSQL (v14+)
- **ORM**: Prisma ORM (v5.x)
- **Security & Auth**: JWT (JSON Web Tokens), bcryptjs password hashing, Helmet, CORS
- **Logging**: Morgan HTTP logger

```
backend/
├── prisma/
│   ├── schema.prisma              # 20 relational database models & enums
│   └── seed.js                    # Comprehensive seed data script
├── src/
│   ├── config/
│   │   ├── db.js                  # Prisma client instance
│   │   └── env.js                 # Environment variable validation
│   ├── controllers/               # Express request/response controllers
│   │   ├── adminController.js
│   │   ├── applicationController.js
│   │   ├── assessmentController.js
│   │   ├── authController.js
│   │   ├── careerController.js
│   │   ├── institutionController.js
│   │   ├── jobController.js
│   │   ├── learningController.js
│   │   ├── notificationController.js
│   │   ├── passportController.js
│   │   ├── recruiterController.js
│   │   ├── roadmapController.js
│   │   ├── skillController.js
│   │   └── studentController.js
│   ├── middleware/
│   │   ├── authMiddleware.js      # JWT extraction and validation
│   │   ├── errorMiddleware.js     # 404 and 500 error handlers
│   │   └── roleMiddleware.js      # RBAC role guards
│   ├── routes/                    # 15 modular REST route definitions
│   │   ├── adminRoutes.js
│   │   ├── applicationRoutes.js
│   │   ├── assessmentRoutes.js
│   │   ├── authRoutes.js
│   │   ├── careerRoutes.js
│   │   ├── healthRoutes.js
│   │   ├── institutionRoutes.js
│   │   ├── jobRoutes.js
│   │   ├── learningRoutes.js
│   │   ├── notificationRoutes.js
│   │   ├── passportRoutes.js
│   │   ├── recruiterRoutes.js
│   │   ├── roadmapRoutes.js
│   │   ├── skillRoutes.js
│   │   └── studentRoutes.js
│   ├── services/                  # Deterministic, explainable algorithmic engines
│   │   ├── careerRecommendationService.js
│   │   ├── jobMatchingService.js
│   │   ├── readinessService.js
│   │   ├── roadmapService.js
│   │   └── skillGapService.js
│   ├── utils/
│   │   ├── responseHelper.js      # Uniform { success, data/message } responses
│   │   └── tokenHelper.js         # JWT signing & verification utilities
│   ├── app.js                     # Express application configuration
│   └── server.js                  # Server entry point & graceful shutdown
├── .env.example
├── package.json
└── README.md
```

---

## 2. Quickstart & Setup

### Prerequisites
- Node.js (v18 or higher)
- PostgreSQL (running locally, via cloud like Supabase/Neon/Railway, or via Docker)

### Step 1: Install Dependencies
```bash
cd backend
npm install
```

### Step 2: Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Ensure your `DATABASE_URL` matches your PostgreSQL connection:
```env
PORT=5000
NODE_ENV=development
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/skillbridge?schema=public"
JWT_SECRET="skillbridge-super-secret-jwt-key-change-in-production-2026"
CLIENT_URL="http://localhost:5173"
```

> **Tip (Using Docker for PostgreSQL):**
> If you don't have PostgreSQL installed locally, you can start one in 5 seconds with Docker:
> ```bash
> docker run --name skillbridge-postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=skillbridge -p 5432:5432 -d postgres:15
> ```

### Step 3: Run Database Migrations / Push Schema
Synchronize the Prisma schema with your PostgreSQL database:
```bash
npx prisma db push
```

### Step 4: Seed Initial Data
Seed demo student, recruiter, institution, skills catalog, careers, job listings, assessments, and learning resources:
```bash
npm run seed
# or
node prisma/seed.js
```

### Demo Accounts Seeded:
| Role | Email | Password |
|---|---|---|
| **Student** | `alex.chen@skillbridge.edu` | `Password123!` |
| **Recruiter** | `recruiter@techcorp.com` | `Password123!` |
| **Institution** | `dean@university.edu` | `Password123!` |
| **Admin** | `admin@skillbridge.edu` | `Password123!` |

### Step 5: Start the API Server
```bash
# Development (auto-reload with nodemon)
npm run dev

# Production
npm start
```

Server runs on: `http://localhost:5000`  
Health check endpoint: `http://localhost:5000/api/health`

---

## 3. Algorithmic Intelligence Engines

All algorithmic logic is decoupled into dedicated, transparent service modules:

### 1. Multi-Pillar Student Readiness Scoring (`services/readinessService.js`)
Calculates an aggregate 0–100 readiness score across 5 weighted pillars:
$$\text{Readiness} = (0.30 \times \text{Assessments}) + (0.25 \times \text{Verified Skills}) + (0.20 \times \text{Course Completion}) + (0.15 \times \text{Projects}) + (0.10 \times \text{Career Alignment})$$
Classifies students into **Work Ready** ($\ge 80$), **Approaching Ready** ($60-79$), or **Developing** ($< 60$).

### 2. Rule-Based Skill Gap Engine (`services/skillGapService.js`)
Compares target career requirements against current student proficiency:
$$\text{Gap Percentage} = \max\left(0, \frac{\text{Required Level} - \text{Current Level}}{\text{Required Level}}\right) \times 100$$
Categorizes gaps into:
- **CRITICAL** ($\ge 30\%$ deficiency)
- **MODERATE** ($15\% - 29\%$ deficiency)
- **LOW** ($< 15\%$ deficiency)

### 3. Five-Factor Opportunity Matching (`services/jobMatchingService.js`)
Computes job compatibility for students:
1. **Skill Overlap (40%)**: Ratio of required skills matched.
2. **Education Level (20%)**: Degree level compatibility.
3. **Experience Level (20%)**: Internship and graduation alignment.
4. **Career Interest (15%)**: Match between job domain and target career path.
5. **Work Mode (5%)**: Remote / hybrid / on-site match.

### 4. Dynamic Curriculum Roadmap Generation (`services/roadmapService.js`)
Generates personalized, milestone-driven learning paths targeting identified skill gaps, complete with linked courses and estimated durations.

---

## 4. API Endpoints Reference

### Health
- `GET /api/health` - Server and database connection status

### Authentication (`/api/auth`)
- `POST /api/auth/register` - Register a new user (`name`, `email`, `password`, `role`)
- `POST /api/auth/login` - Login with credentials, returns JWT token + user profile
- `GET /api/auth/me` - Get current authenticated user profile (`Bearer <token>`)

### Student Intelligence (`/api/students`)
- `GET /api/students/profile` - Get current student's complete profile
- `PUT /api/students/profile` - Update student profile (bio, headline, target career, etc.)
- `GET /api/students/readiness` - Get multi-pillar readiness score breakdown
- `GET /api/students/gap-analysis` - Get explainable skill gaps for target career

### Skills Catalogue (`/api/skills`)
- `GET /api/skills` - List all skills in catalog (filterable by category)
- `GET /api/skills/my` - Get current student's skills with verification status
- `POST /api/skills/my` - Add a skill to student profile
- `PUT /api/skills/my/:id` - Update skill level or project count
- `DELETE /api/skills/my/:id` - Remove skill from profile

### Assessments (`/api/assessments`)
- `GET /api/assessments` - List available skill assessments
- `GET /api/assessments/:id` - Get assessment questions (hides correct answers)
- `POST /api/assessments/:id/submit` - Submit answers; grades instantly and updates verified skill score
- `GET /api/assessments/history` - View past assessment results and history

### Career Intelligence (`/api/careers`)
- `GET /api/careers` - List all careers with industry growth metrics
- `GET /api/careers/recommendations` - Get ranked career paths matched to student skills
- `GET /api/careers/:id/gap` - Detailed gap analysis against a specific career

### Dynamic Roadmap (`/api/roadmap`)
- `GET /api/roadmap` - Get current student learning roadmap
- `POST /api/roadmap/generate` - Generate roadmap dynamically based on target career & skill gaps
- `PATCH /api/roadmap/items/:id/status` - Mark roadmap step as IN_PROGRESS or COMPLETED

### Learning Resources (`/api/learning`)
- `GET /api/learning/resources` - Browse curated courses and tutorials
- `GET /api/learning/progress` - Student enrolled courses and completion %
- `POST /api/learning/update-progress` - Update course progress or mark completed

### Opportunities & Matching (`/api/jobs`)
- `GET /api/jobs` - Browse job and internship listings
- `GET /api/jobs/recommendations` - Get jobs ranked by algorithmic match score
- `GET /api/jobs/:id` - View full job description and requirements
- `POST /api/jobs` - Post a new job (Recruiter/Admin)
- `PUT /api/jobs/:id` - Update job (Recruiter/Admin)
- `DELETE /api/jobs/:id` - Delete job (Recruiter/Admin)

### Applications Pipeline (`/api/applications`)
- `GET /api/applications/my` - View student applications and status
- `POST /api/applications/apply` - Apply to an opportunity
- `POST /api/applications/:id/withdraw` - Withdraw application
- `PATCH /api/applications/:id/status` - Recruiter updates status (SHORTLISTED, INTERVIEW, OFFERED)

### Digital Skill Passport (`/api/passport`)
- `GET /api/passport` - Get current student's verified digital passport
- `POST /api/passport/generate` - Mint or update cryptographic credential snapshot
- `GET /api/passport/verify/:credentialId` - **Public endpoint** to verify credential authenticity without authentication

### Recruiter Hub (`/api/recruiter`)
- `GET /api/recruiter/overview` - Recruiter dashboard statistics
- `GET /api/recruiter/candidates` - Search student talent by skills and readiness score
- `GET /api/recruiter/candidates/:id` - View verified candidate portfolio

### Institution Analytics (`/api/institution`)
- `GET /api/institution/analytics` - Institutional readiness metrics, top skills, and curriculum gap areas

### Admin (`/api/admin`)
- `GET /api/admin/stats` - Platform-wide aggregates and analytics
- `GET /api/admin/users` - View and manage platform users

### Notifications (`/api/notifications`)
- `GET /api/notifications` - Get student notifications
- `PATCH /api/notifications/read-all` - Mark all notifications read
- `PATCH /api/notifications/:id/read` - Mark specific notification read
