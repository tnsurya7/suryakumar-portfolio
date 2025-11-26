# 🚀 Quick Setup Guide

Follow these steps to get your portfolio up and running:

## Step 1: Install Dependencies

```bash
npm install
```

## Step 2: MongoDB Atlas Setup

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a new cluster (free tier)
4. Click "Connect" → "Connect your application"
5. Copy the connection string
6. Replace `<password>` with your database password

## Step 3: Configure Environment Variables

Update `.env.local` with your MongoDB connection string:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio?retryWrites=true&w=majority
JWT_SECRET=change_this_to_a_random_secure_string
```

## Step 4: Initialize Admin User

Start the development server:
```bash
npm run dev
```

Then initialize the admin user (run once):
```bash
curl -X POST http://localhost:3000/api/init
```

Or visit: `http://localhost:3000/api/init` in your browser

## Step 5: Login to Admin Panel

1. Go to `http://localhost:3000/admin/login`
2. Login with:
   - Email: `surya@admin.com`
   - Password: `admin123`

## Step 6: Add Your Content

From the admin dashboard, add:
- ✅ Your projects
- ✅ Your skills
- ✅ Your education
- ✅ Your internships
- ✅ Your certificates
- ✅ Your social media links

## Step 7: Customize

1. Update personal info in the home page (`src/app/page.tsx`)
2. Update contact details in contact page (`src/app/contact/page.tsx`)
3. Add your profile image or keep the gradient placeholder

## 🎨 Optional: Cloudinary Setup (for image uploads)

1. Create account at [Cloudinary](https://cloudinary.com)
2. Get your credentials from dashboard
3. Add to `.env.local`:

```env
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

## 🚀 Deploy to Vercel

1. Push code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Import your repository
4. Add environment variables
5. Deploy!

## 📱 Test Your Portfolio

- Home: `http://localhost:3000`
- About: `http://localhost:3000/about`
- Skills: `http://localhost:3000/skills`
- Projects: `http://localhost:3000/projects`
- Contact: `http://localhost:3000/contact`
- Admin: `http://localhost:3000/admin/login`

## 🆘 Troubleshooting

### MongoDB Connection Error
- Check your connection string
- Ensure IP whitelist includes your IP (or use 0.0.0.0/0 for all)
- Verify database user credentials

### Admin Login Not Working
- Run the init endpoint first: `POST /api/init`
- Check console for errors
- Verify JWT_SECRET is set

### Images Not Uploading
- Check `/public/uploads` directory exists
- Verify file permissions
- Or set up Cloudinary for cloud storage

## 🎉 You're All Set!

Your portfolio is ready. Start adding your content and customize it to make it yours!
