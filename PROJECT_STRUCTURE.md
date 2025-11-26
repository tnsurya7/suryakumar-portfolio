# 📁 Project Structure

```
surya-portfolio/
├── 📂 public/
│   └── uploads/              # Uploaded images (certificates, projects)
│
├── 📂 src/
│   ├── 📂 app/
│   │   ├── 📂 admin/
│   │   │   ├── 📂 dashboard/
│   │   │   │   └── page.tsx       # Admin dashboard (protected)
│   │   │   └── 📂 login/
│   │   │       └── page.tsx       # Admin login page
│   │   │
│   │   ├── 📂 api/               # Next.js API Routes
│   │   │   ├── 📂 auth/
│   │   │   │   ├── 📂 login/
│   │   │   │   │   └── route.ts  # POST /api/auth/login
│   │   │   │   └── 📂 verify/
│   │   │   │       └── route.ts  # GET /api/auth/verify
│   │   │   │
│   │   │   ├── 📂 projects/
│   │   │   │   ├── route.ts      # GET, POST /api/projects
│   │   │   │   └── 📂 [id]/
│   │   │   │       └── route.ts  # GET, PUT, DELETE /api/projects/:id
│   │   │   │
│   │   │   ├── 📂 skills/
│   │   │   │   ├── route.ts      # GET, POST /api/skills
│   │   │   │   └── 📂 [id]/
│   │   │   │       └── route.ts  # PUT, DELETE /api/skills/:id
│   │   │   │
│   │   │   ├── 📂 education/
│   │   │   │   ├── route.ts      # GET, POST /api/education
│   │   │   │   └── 📂 [id]/
│   │   │   │       └── route.ts  # PUT, DELETE /api/education/:id
│   │   │   │
│   │   │   ├── 📂 internships/
│   │   │   │   ├── route.ts      # GET, POST /api/internships
│   │   │   │   └── 📂 [id]/
│   │   │   │       └── route.ts  # PUT, DELETE /api/internships/:id
│   │   │   │
│   │   │   ├── 📂 certificates/
│   │   │   │   ├── route.ts      # GET, POST /api/certificates
│   │   │   │   └── 📂 [id]/
│   │   │   │       └── route.ts  # PUT, DELETE /api/certificates/:id
│   │   │   │
│   │   │   ├── 📂 social-links/
│   │   │   │   ├── route.ts      # GET, POST /api/social-links
│   │   │   │   └── 📂 [id]/
│   │   │   │       └── route.ts  # PUT, DELETE /api/social-links/:id
│   │   │   │
│   │   │   ├── 📂 contact/
│   │   │   │   ├── route.ts      # GET, POST /api/contact
│   │   │   │   └── 📂 [id]/
│   │   │   │       └── route.ts  # PATCH, DELETE /api/contact/:id
│   │   │   │
│   │   │   ├── 📂 upload/
│   │   │   │   └── route.ts      # POST /api/upload (file upload)
│   │   │   │
│   │   │   └── 📂 init/
│   │   │       └── route.ts      # POST /api/init (create admin user)
│   │   │
│   │   ├── 📂 about/
│   │   │   └── page.tsx          # About page
│   │   ├── 📂 skills/
│   │   │   └── page.tsx          # Skills page
│   │   ├── 📂 projects/
│   │   │   └── page.tsx          # Projects page
│   │   ├── 📂 contact/
│   │   │   └── page.tsx          # Contact page
│   │   │
│   │   ├── layout.tsx            # Root layout
│   │   ├── page.tsx              # Home page
│   │   └── globals.css           # Global styles
│   │
│   ├── 📂 components/
│   │   ├── AnimatedCursor.tsx    # Custom animated cursor
│   │   ├── Navbar.tsx            # Navigation bar
│   │   └── Footer.tsx            # Footer component
│   │
│   ├── 📂 lib/
│   │   ├── mongodb.ts            # MongoDB connection
│   │   └── auth.ts               # JWT utilities
│   │
│   ├── 📂 middleware/
│   │   └── auth.ts               # Auth middleware
│   │
│   ├── 📂 models/
│   │   ├── User.ts               # User model (admin)
│   │   ├── Project.ts            # Project model
│   │   ├── Skill.ts              # Skill model
│   │   ├── Education.ts          # Education model
│   │   ├── Internship.ts         # Internship model
│   │   ├── Certificate.ts        # Certificate model
│   │   ├── SocialLink.ts         # Social link model
│   │   └── ContactMessage.ts     # Contact message model
│   │
│   ├── 📂 store/
│   │   └── authStore.ts          # Zustand auth store
│   │
│   └── 📂 types/
│       └── global.d.ts           # TypeScript global types
│
├── 📂 scripts/
│   └── seed.js                   # Sample data structure
│
├── .env.local                    # Environment variables (not in git)
├── .env.example                  # Example env file
├── .gitignore                    # Git ignore rules
├── next.config.mjs               # Next.js configuration
├── tailwind.config.ts            # Tailwind CSS configuration
├── tsconfig.json                 # TypeScript configuration
├── postcss.config.mjs            # PostCSS configuration
├── package.json                  # Dependencies
├── README.md                     # Main documentation
├── SETUP.md                      # Setup instructions
└── PROJECT_STRUCTURE.md          # This file
```

## 🗂️ Key Directories

### `/src/app`
Next.js 14 App Router pages and API routes. Each folder represents a route.

### `/src/components`
Reusable React components used across the application.

### `/src/models`
Mongoose schemas for MongoDB collections.

### `/src/lib`
Utility functions and configurations (database, auth).

### `/src/middleware`
Custom middleware for API routes (authentication).

### `/src/store`
Zustand state management stores.

### `/public`
Static assets and uploaded files.

## 🔑 Key Files

- **`src/app/layout.tsx`** - Root layout with theme provider, navbar, footer
- **`src/app/page.tsx`** - Home page with hero section
- **`src/lib/mongodb.ts`** - MongoDB connection with caching
- **`src/lib/auth.ts`** - JWT token generation and verification
- **`src/middleware/auth.ts`** - Protected route middleware
- **`tailwind.config.ts`** - Custom theme colors and animations

## 🎨 Styling

- **Tailwind CSS** for utility-first styling
- **Custom animations** defined in tailwind.config.ts
- **Dark mode** support with next-themes
- **Framer Motion** for advanced animations

## 🔐 Authentication Flow

1. User visits `/admin/login`
2. Submits credentials to `POST /api/auth/login`
3. Server validates and returns JWT token
4. Token stored in localStorage via Zustand
5. Protected routes check token via middleware
6. Token sent in Authorization header for API calls

## 📊 Database Schema

### Collections:
- **users** - Admin accounts
- **projects** - Portfolio projects
- **skills** - Technical skills
- **education** - Educational background
- **internships** - Work experience
- **certificates** - Certifications
- **socialLinks** - Social media links
- **contactMessages** - Contact form submissions

## 🚀 API Endpoints

All endpoints follow RESTful conventions:
- `GET` - Retrieve data
- `POST` - Create new data
- `PUT` - Update existing data
- `DELETE` - Remove data
- `PATCH` - Partial update

Protected endpoints require JWT token in Authorization header.
