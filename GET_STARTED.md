# 🎯 GET STARTED - Your Portfolio in 3 Steps

Welcome! This is your complete portfolio application. Follow these 3 simple steps to get started.

---

## ⚡ STEP 1: Install & Setup (2 minutes)

### Install Dependencies
```bash
npm install
```

### Setup MongoDB Atlas (Free)
1. Visit: https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create a cluster (free tier - M0)
4. Click "Connect" → "Connect your application"
5. Copy the connection string

### Configure Environment
```bash
# Copy example file
cp .env.example .env.local

# Edit .env.local and add your MongoDB URI
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio
JWT_SECRET=change_this_to_random_string
```

---

## 🚀 STEP 2: Run & Initialize (1 minute)

### Start Development Server
```bash
npm run dev
```

### Initialize Admin User
Open browser and visit: **http://localhost:3000/api/init**

You should see: `{"message":"Admin user created successfully"}`

---

## 🎨 STEP 3: Login & Add Content (5 minutes)

### Login to Admin Panel
1. Go to: **http://localhost:3000/admin/login**
2. Login with:
   - Email: `surya@admin.com`
   - Password: `admin123`

### Add Your Content
From the dashboard, add:
- ✅ **Projects** - Your portfolio projects
- ✅ **Skills** - Your technical skills
- ✅ **Education** - Your degrees
- ✅ **Internships** - Your work experience
- ✅ **Certificates** - Your certifications
- ✅ **Social Links** - Your social media profiles

---

## 🎉 DONE! View Your Portfolio

Visit these pages:
- **Home**: http://localhost:3000
- **About**: http://localhost:3000/about
- **Skills**: http://localhost:3000/skills
- **Projects**: http://localhost:3000/projects
- **Contact**: http://localhost:3000/contact

---

## 📚 What's Next?

### Customize Your Portfolio
1. **Update Personal Info**
   - Edit `src/app/page.tsx` - Change name, title, bio
   - Edit `src/app/contact/page.tsx` - Update contact details

2. **Change Colors**
   - Edit `tailwind.config.ts` - Modify primary colors

3. **Add Your Photo**
   - Replace placeholder in home page with your image

### Deploy to Production
Read [DEPLOYMENT.md](DEPLOYMENT.md) for step-by-step deployment guide.

**Quick Deploy to Vercel:**
1. Push code to GitHub
2. Connect to Vercel
3. Add environment variables
4. Deploy!

---

## 📖 Documentation

- **[README.md](README.md)** - Complete documentation
- **[QUICKSTART.md](QUICKSTART.md)** - Quick start guide
- **[SETUP.md](SETUP.md)** - Detailed setup instructions
- **[FEATURES.md](FEATURES.md)** - All features (150+)
- **[PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md)** - Code organization
- **[DEPLOYMENT.md](DEPLOYMENT.md)** - Deployment guide

---

## 🆘 Need Help?

### Common Issues

**MongoDB Connection Error?**
- Check your connection string format
- Whitelist your IP in MongoDB Atlas (Settings → Network Access)
- Or use `0.0.0.0/0` to allow all IPs

**Admin Login Not Working?**
- Make sure you visited `/api/init` first
- Check browser console for errors
- Verify `.env.local` has JWT_SECRET

**Port 3000 Already in Use?**
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use different port
npm run dev -- -p 3001
```

---

## ✨ Features Included

✅ Modern animated UI with Framer Motion
✅ Dark/Light mode toggle
✅ Fully responsive design
✅ Custom animated cursor
✅ Admin panel with full CRUD
✅ JWT authentication
✅ Image upload support
✅ Contact form with database
✅ SEO-friendly structure
✅ TypeScript + Tailwind CSS

---

## 🎯 Quick Tips

1. **Test locally** before deploying
2. **Change default password** after first login
3. **Add real content** to showcase your work
4. **Customize colors** to match your brand
5. **Deploy to Vercel** for free hosting

---

## 📞 Support

Check the documentation files for detailed information on:
- Setup and configuration
- Features and customization
- Deployment and production
- Troubleshooting

---

**Ready to showcase your work? Let's go! 🚀**

Start by running `npm install` and follow Step 1 above.
