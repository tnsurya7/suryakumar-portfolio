# 📝 How to Edit Your Portfolio (No Database Required!)

Your portfolio now runs **without a database**! All data is stored in a simple JSON file that you can edit directly.

---

## 📁 Where to Edit

**File**: `src/data/portfolio.json`

This single file contains ALL your portfolio data:
- Profile information
- Social links
- Skills
- Education
- Internships
- Certificates
- Projects

---

## ✏️ How to Edit

### 1. Open the File

Open `src/data/portfolio.json` in your code editor.

### 2. Edit Your Information

The file is organized into sections. Simply update the values:

#### Profile Information
```json
"profile": {
  "name": "Your Name Here",
  "title": "Your Title",
  "bio": "Your bio...",
  "email": "your@email.com",
  "phone": "+91 12345 67890",
  "whatsapp": "https://wa.me/1234567890"
}
```

#### Social Links
```json
"socialLinks": [
  {
    "id": "1",
    "platform": "GitHub",
    "url": "https://github.com/yourusername",
    "icon": "github",
    "order": 1
  }
]
```

#### Skills
```json
"skills": [
  {
    "id": "1",
    "name": "React",
    "category": "Frontend",
    "level": 90
  }
]
```

#### Projects
```json
"projects": [
  {
    "id": "1",
    "title": "Your Project",
    "description": "Short description",
    "longDescription": "Detailed description...",
    "technologies": ["React", "Node.js"],
    "features": ["Feature 1", "Feature 2"],
    "githubUrl": "https://github.com/...",
    "liveUrl": "https://...",
    "featured": true
  }
]
```

### 3. Save the File

After editing, save the file. The changes will appear immediately (hot reload).

---

## 🎯 Quick Edits

### Add a New Skill

Copy an existing skill object and modify:

```json
{
  "id": "11",
  "name": "Python",
  "category": "Backend",
  "level": 75
}
```

Add it to the `skills` array.

### Add a New Project

Copy an existing project and modify all fields:

```json
{
  "id": "4",
  "title": "My New Project",
  "description": "What it does",
  "longDescription": "Detailed explanation...",
  "technologies": ["Tech1", "Tech2"],
  "features": ["Feature 1", "Feature 2"],
  "challenges": "What was difficult",
  "image": "/projects/myproject.jpg",
  "images": [],
  "githubUrl": "https://github.com/...",
  "liveUrl": "https://...",
  "featured": true
}
```

### Update Social Links

Change the URLs to your actual profiles:

```json
{
  "id": "1",
  "platform": "GitHub",
  "url": "https://github.com/YOUR_ACTUAL_USERNAME",
  "icon": "github",
  "order": 1
}
```

### Add Education

```json
{
  "id": "2",
  "institution": "Another University",
  "degree": "Master's Degree",
  "field": "Computer Science",
  "startDate": "2024-08-01",
  "endDate": "2026-05-01",
  "current": true,
  "grade": "In Progress",
  "description": "Specializing in AI and ML"
}
```

---

## 🎨 Customization Tips

### Skill Levels
- Beginner: 30-50
- Intermediate: 50-70
- Advanced: 70-85
- Expert: 85-100

### Project Featured
- Set `"featured": true` for your best projects
- They'll appear first in the list

### Categories
Common skill categories:
- Frontend
- Backend
- Database
- Tools
- DevOps
- Mobile
- Design

---

## 🖼️ Adding Images

### Project Images

1. Add your image to `public/projects/`
2. Reference it in the JSON:
```json
"image": "/projects/myproject.jpg"
```

### Profile Image

1. Add your photo to `public/`
2. Update in JSON:
```json
"image": "/profile.jpg"
```

---

## ⚠️ Important Notes

### JSON Syntax Rules

1. **Commas**: Every item except the last needs a comma
   ```json
   "item1": "value",
   "item2": "value",
   "item3": "value"  ← No comma on last item
   ```

2. **Quotes**: Always use double quotes `"` not single `'`

3. **IDs**: Make sure each ID is unique within its section

4. **Dates**: Use format: `"YYYY-MM-DD"` (e.g., `"2024-01-15"`)

### Validation

If you make a syntax error, the server will show an error. Common issues:
- Missing comma
- Extra comma after last item
- Missing quote
- Wrong quote type

---

## 🔄 See Your Changes

1. Edit `src/data/portfolio.json`
2. Save the file
3. Refresh your browser (or it auto-refreshes)
4. See your changes instantly!

---

## 📋 Checklist

After editing, update:
- [ ] Profile name and title
- [ ] Email and phone
- [ ] Social media URLs
- [ ] Skills (add your actual skills)
- [ ] Education (your degree)
- [ ] Internships (your experience)
- [ ] Certificates (your certifications)
- [ ] Projects (your actual projects)
- [ ] Project images
- [ ] GitHub and live URLs

---

## 🎉 No Database, No Problem!

Benefits of this approach:
- ✅ No database setup needed
- ✅ Easy to edit (just a JSON file)
- ✅ Fast and simple
- ✅ Version control friendly
- ✅ Easy to backup
- ✅ Works offline
- ✅ Deploy anywhere

---

## 🚀 Deploy Your Portfolio

Since there's no database, deployment is super easy:

### Vercel (Recommended)
1. Push to GitHub
2. Import to Vercel
3. Deploy (no environment variables needed!)

### Netlify
1. Push to GitHub
2. Connect to Netlify
3. Deploy

### GitHub Pages
1. Build: `npm run build`
2. Export: `npm run export`
3. Deploy to GitHub Pages

---

## 💡 Pro Tips

1. **Backup**: Keep a copy of your `portfolio.json` file
2. **Validate**: Use a JSON validator if unsure about syntax
3. **Test**: Always check your changes in the browser
4. **Images**: Optimize images before adding (use tools like TinyPNG)
5. **Links**: Test all your URLs to make sure they work

---

## 🆘 Troubleshooting

### Page shows empty data
→ Check JSON syntax (missing comma, quote, etc.)

### Server error after editing
→ Validate your JSON at jsonlint.com

### Changes not showing
→ Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)

---

**That's it! Edit `src/data/portfolio.json` and you're done!** 🎉

No database, no admin panel, just simple file editing!
