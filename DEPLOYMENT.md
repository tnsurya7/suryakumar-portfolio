# 🚀 Deployment Guide

Complete guide to deploy your portfolio to production.

## 📋 Pre-Deployment Checklist

- [ ] MongoDB Atlas cluster created
- [ ] Environment variables configured
- [ ] Admin user initialized
- [ ] Content added (projects, skills, etc.)
- [ ] Tested locally
- [ ] Code pushed to GitHub
- [ ] Custom domain ready (optional)

## 🌐 Deploy to Vercel (Recommended)

### Why Vercel?
- ✅ Free tier available
- ✅ Automatic deployments
- ✅ Built for Next.js
- ✅ Global CDN
- ✅ Zero configuration
- ✅ Custom domains

### Step-by-Step Deployment

#### 1. Push to GitHub

```bash
# Initialize git (if not already)
git init

# Add all files
git add .

# Commit
git commit -m "Initial portfolio commit"

# Add remote repository
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git

# Push to GitHub
git push -u origin main
```

#### 2. Deploy to Vercel

1. Go to https://vercel.com
2. Sign up with GitHub
3. Click "Add New Project"
4. Import your repository
5. Configure project:
   - **Framework Preset**: Next.js
   - **Root Directory**: ./
   - **Build Command**: `npm run build`
   - **Output Directory**: .next

#### 3. Add Environment Variables

In Vercel dashboard, add these variables:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio
JWT_SECRET=your_production_secret_key_here
CLOUDINARY_CLOUD_NAME=your_cloud_name (optional)
CLOUDINARY_API_KEY=your_api_key (optional)
CLOUDINARY_API_SECRET=your_api_secret (optional)
```

#### 4. Deploy

Click "Deploy" and wait for build to complete.

#### 5. Initialize Production Database

After deployment:
1. Visit: `https://your-domain.vercel.app/api/init`
2. This creates the admin user in production

#### 6. Login and Add Content

1. Go to: `https://your-domain.vercel.app/admin/login`
2. Login with default credentials
3. Add your content

### Custom Domain

1. In Vercel dashboard, go to "Settings" → "Domains"
2. Add your custom domain
3. Update DNS records as instructed
4. Wait for DNS propagation (up to 48 hours)

## 🐳 Deploy with Docker (Alternative)

### Create Dockerfile

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

### Create docker-compose.yml

```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - MONGODB_URI=${MONGODB_URI}
      - JWT_SECRET=${JWT_SECRET}
    restart: unless-stopped
```

### Deploy

```bash
# Build image
docker-compose build

# Start container
docker-compose up -d
```

## ☁️ Deploy to Other Platforms

### Netlify

1. Connect GitHub repository
2. Build command: `npm run build`
3. Publish directory: `.next`
4. Add environment variables
5. Deploy

### Railway

1. Connect GitHub repository
2. Add environment variables
3. Railway auto-detects Next.js
4. Deploy

### AWS Amplify

1. Connect GitHub repository
2. Configure build settings
3. Add environment variables
4. Deploy

### DigitalOcean App Platform

1. Create new app
2. Connect GitHub repository
3. Configure environment variables
4. Deploy

## 🔒 Security Best Practices

### 1. Change Default Credentials

After first login, update admin password:
- Use strong password (12+ characters)
- Include uppercase, lowercase, numbers, symbols
- Don't reuse passwords

### 2. Secure Environment Variables

- Never commit `.env.local` to git
- Use different secrets for production
- Rotate JWT secret periodically
- Use strong, random JWT secret

Generate secure JWT secret:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 3. MongoDB Security

- Use strong database password
- Enable IP whitelist (or use 0.0.0.0/0 for Vercel)
- Enable MongoDB authentication
- Regular backups
- Monitor access logs

### 4. API Security

- Rate limiting (add if needed)
- Input validation
- CORS configuration
- HTTPS only in production

## 📊 Post-Deployment

### 1. Test Everything

- [ ] Home page loads
- [ ] All pages accessible
- [ ] Admin login works
- [ ] CRUD operations work
- [ ] Images upload correctly
- [ ] Contact form works
- [ ] Dark/light mode works
- [ ] Mobile responsive

### 2. SEO Setup

Add to `src/app/layout.tsx`:

```tsx
export const metadata: Metadata = {
  title: "Surya Kumar M - Full Stack Developer",
  description: "Portfolio of Surya Kumar M, Full Stack Developer specializing in React, Next.js, Node.js, and MongoDB",
  keywords: ["Full Stack Developer", "React", "Next.js", "Portfolio"],
  authors: [{ name: "Surya Kumar M" }],
  openGraph: {
    title: "Surya Kumar M - Full Stack Developer",
    description: "Portfolio showcasing my projects and skills",
    url: "https://your-domain.com",
    siteName: "Surya Kumar M Portfolio",
    images: [
      {
        url: "https://your-domain.com/og-image.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Surya Kumar M - Full Stack Developer",
    description: "Portfolio showcasing my projects and skills",
    images: ["https://your-domain.com/og-image.jpg"],
  },
};
```

### 3. Analytics (Optional)

Add Google Analytics or Vercel Analytics:

```bash
npm install @vercel/analytics
```

In `src/app/layout.tsx`:
```tsx
import { Analytics } from '@vercel/analytics/react';

// Add in body
<Analytics />
```

### 4. Performance Monitoring

- Use Vercel Analytics
- Monitor Core Web Vitals
- Check Lighthouse scores
- Optimize images

### 5. Backup Strategy

- Regular MongoDB backups
- Export data periodically
- Version control for code
- Document recovery process

## 🔄 Continuous Deployment

### Automatic Deployments

Vercel automatically deploys when you push to GitHub:

```bash
# Make changes
git add .
git commit -m "Update project"
git push

# Vercel automatically deploys
```

### Preview Deployments

- Every pull request gets a preview URL
- Test changes before merging
- Share with others for feedback

### Rollback

If something breaks:
1. Go to Vercel dashboard
2. Find previous deployment
3. Click "Promote to Production"

## 📈 Monitoring

### Check Application Health

- Monitor response times
- Check error rates
- Review logs in Vercel dashboard
- Set up alerts for downtime

### Database Monitoring

- Monitor MongoDB Atlas metrics
- Check connection pool usage
- Review slow queries
- Set up alerts

## 🆘 Troubleshooting

### Build Fails

```bash
# Test build locally
npm run build

# Check for TypeScript errors
npm run lint
```

### Environment Variables Not Working

- Verify variable names match exactly
- Redeploy after adding variables
- Check for typos
- Ensure no trailing spaces

### Database Connection Issues

- Verify MongoDB URI format
- Check IP whitelist
- Verify credentials
- Test connection locally

### Images Not Loading

- Check `/public/uploads` directory
- Verify file permissions
- Consider using Cloudinary
- Check Next.js image domains config

## 🎯 Production Checklist

- [ ] Application deployed successfully
- [ ] Custom domain configured (if applicable)
- [ ] SSL certificate active (HTTPS)
- [ ] Environment variables set
- [ ] Admin user created
- [ ] Default password changed
- [ ] Content added
- [ ] All pages tested
- [ ] Mobile responsive verified
- [ ] SEO metadata added
- [ ] Analytics configured
- [ ] Backup strategy in place
- [ ] Monitoring set up

## 📞 Support

If you encounter issues:
1. Check Vercel deployment logs
2. Review MongoDB Atlas logs
3. Check browser console for errors
4. Verify environment variables
5. Test locally first

---

**Congratulations! Your portfolio is now live! 🎉**

Share your portfolio URL and start showcasing your work to the world!
