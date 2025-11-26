# Surya Kumar M - Portfolio Website

A modern, animated full-stack portfolio application built with Next.js 14, TypeScript, MongoDB, and Tailwind CSS.

## 🚀 Features

- **Modern UI/UX**: Animated components with Framer Motion
- **Dark/Light Mode**: Theme switching with next-themes
- **Responsive Design**: Mobile-first approach
- **Custom Animated Cursor**: Unique cursor effects
- **Admin Panel**: Full CRUD operations for portfolio management
- **JWT Authentication**: Secure admin access
- **Image Upload**: Support for project and certificate images
- **Contact Form**: Store messages in MongoDB
- **Social Links**: Customizable social media links

## 📦 Tech Stack

### Frontend
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide React Icons
- Zustand (State Management)
- React Hot Toast

### Backend
- Next.js API Routes
- MongoDB Atlas
- Mongoose ODM
- JWT Authentication
- bcryptjs

## 🛠️ Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd surya-portfolio
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**

Create a `.env.local` file in the root directory:

```env
# MongoDB
MONGODB_URI=your_mongodb_atlas_connection_string

# JWT Secret
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production

# Cloudinary (optional)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Admin Credentials
ADMIN_EMAIL=surya@admin.com
ADMIN_PASSWORD=admin123
```

4. **Initialize the database**

Run this once to create the admin user:
```bash
curl -X POST http://localhost:3000/api/init
```

5. **Run the development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📱 Pages

- **Home** (`/`) - Hero section with animated introduction
- **About** (`/about`) - Education, internships, and certificates
- **Skills** (`/skills`) - Technical skills with progress bars
- **Projects** (`/projects`) - Project showcase with modal details
- **Contact** (`/contact`) - Contact form and information
- **Admin Login** (`/admin/login`) - Secure admin authentication
- **Admin Dashboard** (`/admin/dashboard`) - Portfolio management

## 🔐 Admin Panel

### Default Credentials
- Email: `surya@admin.com`
- Password: `admin123`

### Admin Features
- Manage Projects (Add, Edit, Delete)
- Manage Skills
- Manage Education
- Manage Internships
- Manage Certificates
- Manage Social Links
- View Contact Messages

## 📊 Database Collections

- `users` - Admin authentication
- `projects` - Portfolio projects
- `skills` - Technical skills
- `education` - Educational background
- `internships` - Work experience
- `certificates` - Certifications
- `socialLinks` - Social media links
- `contactMessages` - Contact form submissions

## 🎨 Customization

### Update Personal Information

1. Login to admin panel at `/admin/login`
2. Navigate to different sections
3. Add/Edit/Delete items as needed

### Change Theme Colors

Edit `tailwind.config.ts` to customize the color scheme:

```typescript
colors: {
  primary: {
    // Your custom colors
  },
}
```

## 🚀 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### MongoDB Atlas Setup

1. Create a free cluster at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Get your connection string
3. Add it to `.env.local` as `MONGODB_URI`

## 📝 API Endpoints

### Public Endpoints
- `GET /api/projects` - Get all projects
- `GET /api/skills` - Get all skills
- `GET /api/education` - Get education
- `GET /api/internships` - Get internships
- `GET /api/certificates` - Get certificates
- `GET /api/social-links` - Get social links
- `POST /api/contact` - Submit contact form

### Protected Endpoints (Require JWT)
- `POST /api/projects` - Create project
- `PUT /api/projects/[id]` - Update project
- `DELETE /api/projects/[id]` - Delete project
- Similar CRUD operations for other resources

### Authentication
- `POST /api/auth/login` - Admin login
- `GET /api/auth/verify` - Verify JWT token
- `POST /api/init` - Initialize admin user

## 🤝 Contributing

Feel free to fork this project and customize it for your own portfolio!

## 📄 License

MIT License - feel free to use this project for your portfolio.

## 👨‍💻 Author

**Surya Kumar M**
- Full Stack Developer
- [GitHub](https://github.com/suryakumar)
- [LinkedIn](https://linkedin.com/in/suryakumar)

---

Made with ❤️ by Surya Kumar M
