# 🗄️ MongoDB Atlas Setup (5 minutes)

Your portfolio is running at **http://localhost:3000** but needs MongoDB to work!

## Quick MongoDB Atlas Setup

### Step 1: Create Free Account (2 min)
1. Go to: **https://www.mongodb.com/cloud/atlas**
2. Click "Try Free"
3. Sign up with Google/GitHub or email

### Step 2: Create Cluster (1 min)
1. Choose **FREE** tier (M0)
2. Select a cloud provider (AWS recommended)
3. Choose a region close to you
4. Click "Create Cluster"
5. Wait 1-3 minutes for cluster creation

### Step 3: Create Database User (1 min)
1. Click "Database Access" in left sidebar
2. Click "Add New Database User"
3. Choose "Password" authentication
4. Username: `surya` (or your choice)
5. Password: Click "Autogenerate Secure Password" (SAVE THIS!)
6. User Privileges: "Read and write to any database"
7. Click "Add User"

### Step 4: Allow Network Access (30 sec)
1. Click "Network Access" in left sidebar
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (0.0.0.0/0)
4. Click "Confirm"

### Step 5: Get Connection String (30 sec)
1. Click "Database" in left sidebar
2. Click "Connect" button on your cluster
3. Choose "Connect your application"
4. Copy the connection string
5. It looks like: `mongodb+srv://surya:<password>@cluster0.xxxxx.mongodb.net/`

### Step 6: Update .env.local (30 sec)
1. Open `.env.local` file
2. Replace the MONGODB_URI line with your connection string
3. Replace `<password>` with your actual password
4. Add database name at the end: `/portfolio`

Example:
```env
MONGODB_URI=mongodb+srv://surya:YourPassword123@cluster0.xxxxx.mongodb.net/portfolio?retryWrites=true&w=majority
```

### Step 7: Restart Server
```bash
# The server will auto-reload, or restart it manually
# Press Ctrl+C to stop, then run:
npm run dev
```

### Step 8: Initialize Admin User
Visit: **http://localhost:3000/api/init**

You should see: `{"message":"Admin user created successfully"}`

### Step 9: Login to Admin Panel
1. Go to: **http://localhost:3000/admin/login**
2. Email: `surya@admin.com`
3. Password: `admin123`

## ✅ You're Done!

Now you can:
- Add your projects
- Add your skills
- Add your education
- Customize your portfolio

## 🆘 Troubleshooting

### "MongooseError: The `uri` parameter to `openUri()` must be a string"
→ You haven't updated MONGODB_URI in .env.local

### "MongoServerError: bad auth"
→ Wrong password in connection string

### "Could not connect to any servers"
→ Check Network Access settings (allow 0.0.0.0/0)

### Still having issues?
→ Make sure you:
1. Replaced `<password>` with actual password
2. Added `/portfolio` at the end
3. Saved the .env.local file
4. Restarted the server

## 🎉 Alternative: Use Local MongoDB

If you prefer local development:

```bash
# Install MongoDB locally
brew install mongodb-community  # macOS
# or download from: https://www.mongodb.com/try/download/community

# Start MongoDB
brew services start mongodb-community

# Update .env.local
MONGODB_URI=mongodb://localhost:27017/portfolio
```

---

**Need help?** Check the main documentation or create an issue!
