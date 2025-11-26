# ⚡ Quick Start Guide

Get your portfolio running in 5 minutes!

## 1️⃣ Install Dependencies (1 min)

```bash
npm install
```

## 2️⃣ Setup MongoDB (2 min)

### Option A: MongoDB Atlas (Recommended - Free)
1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up for free
3. Create a cluster (free tier)
4. Click "Connect" → "Connect your application"
5. Copy the connection string

### Option B: Local MongoDB
```bash
# Install MongoDB locally
# macOS
brew install mongodb-community

# Start MongoDB
brew services start mongodb-community
```

## 3️⃣ Configure Environment (30 sec)

Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

Edit `.env.local` and add your MongoDB URI:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio
JWT_SECRET=my_super_secret_key_12345
```

## 4️⃣ Start Development Server (30 sec)

```bash
npm run dev
```

Open http://localhost:3000

## 5️⃣ Initialize Admin User (30 sec)

Visit: http://localhost:3000/api/init

Or run:
```bash
curl -X POST http://localhost:3000/api/init
```

## 6️⃣ Login to Admin Panel (30 sec)

1. Go to: http://localhost:3000/admin/login
2. Login with:
   - **Email**: surya@admin.com
   - **Password**: admin123

## 🎉 Done! Now Add Your Content

From the admin dashboard:
1. Add your projects
2. Add your skills
3. Add your education
4. Add your internships
5. Add your certificates
6. Add your social media links

## 📱 View Your Portfolio

- **Home**: http://localhost:3000
- **About**: http://localhost:3000/about
- **Skills**: http://localhost:3000/skills
- **Projects**: http://localhost:3000/projects
- **Contact**: http://localhost:3000/contact

## 🚀 Deploy to Production

### Vercel (Recommended - Free)

1. Push to GitHub:
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

2. Go to https://vercel.com
3. Click "Import Project"
4. Select your repository
5. Add environment variables:
   - `MONGODB_URI`
   - `JWT_SECRET`
6. Click "Deploy"

### After Deployment
1. Visit your deployed URL
2. Go to `/api/init` to create admin user
3. Login at `/admin/login`
4. Add your content

## 🎨 Customize

### Update Personal Info
Edit `src/app/page.tsx` - Change name, title, description

### Update Contact Details
Edit `src/app/contact/page.tsx` - Change email, phone, WhatsApp

### Change Colors
Edit `tailwind.config.ts` - Modify the primary color scheme

### Add Your Photo
Replace the gradient placeholder in `src/app/page.tsx` with:
```tsx
<Image
  src="/your-photo.jpg"
  alt="Surya Kumar M"
  fill
  className="object-cover"
/>
```

## 🆘 Common Issues

### MongoDB Connection Error
- Check your connection string format
- Whitelist your IP in MongoDB Atlas (or use 0.0.0.0/0)
- Verify username and password

### Admin Login Not Working
- Make sure you ran `/api/init` first
- Check browser console for errors
- Verify JWT_SECRET is set in .env.local

### Port Already in Use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use different port
npm run dev -- -p 3001
```

## 📚 Next Steps

- Read [README.md](README.md) for detailed documentation
- Check [SETUP.md](SETUP.md) for advanced setup
- Review [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md) for code organization

## 💡 Tips

1. **Test locally first** before deploying
2. **Change default admin password** after first login
3. **Add real content** to showcase your work
4. **Customize colors** to match your brand
5. **Add your social links** for better networking

## 🎯 What's Included

✅ Modern animated UI with Framer Motion
✅ Dark/Light mode toggle
✅ Fully responsive design
✅ Custom animated cursor
✅ Admin panel with CRUD operations
✅ JWT authentication
✅ Image upload support
✅ Contact form with database storage
✅ SEO-friendly structure
✅ TypeScript for type safety
✅ Tailwind CSS for styling

---

**Need help?** Check the documentation or create an issue on GitHub.

**Ready to showcase your work?** Start adding your projects and skills! 🚀
