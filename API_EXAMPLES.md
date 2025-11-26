# 🔌 API Examples & Testing

Complete guide to test all API endpoints.

## 🔐 Authentication

### 1. Initialize Admin User (Run Once)

```bash
curl -X POST http://localhost:3000/api/init
```

Response:
```json
{
  "message": "Admin user created successfully"
}
```

### 2. Login

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "surya@admin.com",
    "password": "admin123"
  }'
```

Response:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "...",
    "email": "surya@admin.com",
    "name": "Surya Kumar M",
    "role": "admin"
  }
}
```

**Save the token for protected endpoints!**

### 3. Verify Token

```bash
curl -X GET http://localhost:3000/api/auth/verify \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## 📂 Projects API

### Get All Projects (Public)

```bash
curl http://localhost:3000/api/projects
```

### Create Project (Protected)

```bash
curl -X POST http://localhost:3000/api/projects \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "title": "E-Commerce Platform",
    "description": "A full-stack e-commerce platform",
    "longDescription": "Built with Next.js, Node.js, and MongoDB...",
    "technologies": ["Next.js", "Node.js", "MongoDB", "Stripe"],
    "features": [
      "User authentication",
      "Product catalog",
      "Shopping cart",
      "Payment integration"
    ],
    "challenges": "Implementing secure payment processing",
    "image": "/uploads/project1.jpg",
    "images": ["/uploads/project1-1.jpg", "/uploads/project1-2.jpg"],
    "githubUrl": "https://github.com/username/project",
    "liveUrl": "https://project.vercel.app",
    "featured": true
  }'
```

### Update Project (Protected)

```bash
curl -X PUT http://localhost:3000/api/projects/PROJECT_ID \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "title": "Updated Project Title",
    "description": "Updated description"
  }'
```

### Delete Project (Protected)

```bash
curl -X DELETE http://localhost:3000/api/projects/PROJECT_ID \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## 💻 Skills API

### Get All Skills (Public)

```bash
curl http://localhost:3000/api/skills
```

### Create Skill (Protected)

```bash
curl -X POST http://localhost:3000/api/skills \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "name": "React",
    "category": "Frontend",
    "level": 90,
    "icon": "react"
  }'
```

### Update Skill (Protected)

```bash
curl -X PUT http://localhost:3000/api/skills/SKILL_ID \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "level": 95
  }'
```

### Delete Skill (Protected)

```bash
curl -X DELETE http://localhost:3000/api/skills/SKILL_ID \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## 🎓 Education API

### Get All Education (Public)

```bash
curl http://localhost:3000/api/education
```

### Create Education (Protected)

```bash
curl -X POST http://localhost:3000/api/education \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "institution": "University Name",
    "degree": "Bachelor of Technology",
    "field": "Computer Science",
    "startDate": "2020-08-01",
    "endDate": "2024-05-01",
    "current": false,
    "grade": "8.5 CGPA",
    "description": "Focused on software engineering and web development"
  }'
```

---

## 💼 Internships API

### Get All Internships (Public)

```bash
curl http://localhost:3000/api/internships
```

### Create Internship (Protected)

```bash
curl -X POST http://localhost:3000/api/internships \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "company": "Tech Company Inc",
    "position": "Full Stack Developer Intern",
    "startDate": "2023-06-01",
    "endDate": "2023-12-01",
    "current": false,
    "description": "Worked on building web applications using React and Node.js",
    "technologies": ["React", "Node.js", "MongoDB", "AWS"]
  }'
```

---

## 🏆 Certificates API

### Get All Certificates (Public)

```bash
curl http://localhost:3000/api/certificates
```

### Create Certificate (Protected)

```bash
curl -X POST http://localhost:3000/api/certificates \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "title": "AWS Certified Developer",
    "issuer": "Amazon Web Services",
    "issueDate": "2024-01-15",
    "credentialId": "ABC123XYZ",
    "credentialUrl": "https://aws.amazon.com/verify/ABC123XYZ",
    "image": "/uploads/cert1.jpg",
    "description": "Associate level certification for AWS development"
  }'
```

---

## 🔗 Social Links API

### Get All Social Links (Public)

```bash
curl http://localhost:3000/api/social-links
```

### Create Social Link (Protected)

```bash
curl -X POST http://localhost:3000/api/social-links \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "platform": "GitHub",
    "url": "https://github.com/suryakumar",
    "icon": "github",
    "order": 1
  }'
```

### Bulk Create Social Links

```bash
# GitHub
curl -X POST http://localhost:3000/api/social-links \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{"platform":"GitHub","url":"https://github.com/suryakumar","icon":"github","order":1}'

# LinkedIn
curl -X POST http://localhost:3000/api/social-links \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{"platform":"LinkedIn","url":"https://linkedin.com/in/suryakumar","icon":"linkedin","order":2}'

# Instagram
curl -X POST http://localhost:3000/api/social-links \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{"platform":"Instagram","url":"https://instagram.com/suryakumar","icon":"instagram","order":3}'

# Facebook
curl -X POST http://localhost:3000/api/social-links \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{"platform":"Facebook","url":"https://facebook.com/suryakumar","icon":"facebook","order":4}'

# WhatsApp
curl -X POST http://localhost:3000/api/social-links \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{"platform":"WhatsApp","url":"https://wa.me/1234567890","icon":"whatsapp","order":5}'
```

---

## 📧 Contact API

### Submit Contact Form (Public)

```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "message": "Hi, I would like to discuss a project with you."
  }'
```

### Get All Messages (Protected)

```bash
curl http://localhost:3000/api/contact \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Mark Message as Read (Protected)

```bash
curl -X PATCH http://localhost:3000/api/contact/MESSAGE_ID \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Delete Message (Protected)

```bash
curl -X DELETE http://localhost:3000/api/contact/MESSAGE_ID \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## 📤 File Upload API

### Upload Image (Protected)

```bash
curl -X POST http://localhost:3000/api/upload \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -F "file=@/path/to/your/image.jpg"
```

Response:
```json
{
  "url": "/uploads/1234567890-image.jpg"
}
```

---

## 🧪 Testing with Postman

### Import Collection

Create a Postman collection with these requests:

1. **Environment Variables**
   - `baseUrl`: `http://localhost:3000`
   - `token`: (set after login)

2. **Pre-request Script for Protected Routes**
```javascript
pm.request.headers.add({
  key: 'Authorization',
  value: 'Bearer ' + pm.environment.get('token')
});
```

3. **Test Script for Login**
```javascript
if (pm.response.code === 200) {
  const response = pm.response.json();
  pm.environment.set('token', response.token);
}
```

---

## 🔍 Testing Workflow

### 1. Initial Setup
```bash
# 1. Initialize admin
curl -X POST http://localhost:3000/api/init

# 2. Login and save token
TOKEN=$(curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"surya@admin.com","password":"admin123"}' \
  | jq -r '.token')

echo $TOKEN
```

### 2. Add Sample Data
```bash
# Add a skill
curl -X POST http://localhost:3000/api/skills \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"name":"React","category":"Frontend","level":90}'

# Add a project
curl -X POST http://localhost:3000/api/projects \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "title":"Portfolio Website",
    "description":"My personal portfolio",
    "longDescription":"Built with Next.js and TypeScript",
    "technologies":["Next.js","TypeScript","Tailwind"],
    "features":["Responsive","Dark mode","Animations"],
    "image":"/uploads/portfolio.jpg",
    "images":[],
    "featured":true
  }'

# Add education
curl -X POST http://localhost:3000/api/education \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "institution":"University Name",
    "degree":"B.Tech",
    "field":"Computer Science",
    "startDate":"2020-08-01",
    "endDate":"2024-05-01",
    "current":false,
    "grade":"8.5 CGPA"
  }'
```

### 3. Verify Data
```bash
# Check all data
curl http://localhost:3000/api/skills
curl http://localhost:3000/api/projects
curl http://localhost:3000/api/education
```

---

## 📊 Response Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `404` - Not Found
- `500` - Server Error

---

## 🐛 Debugging

### Check Server Logs
```bash
# Terminal running npm run dev will show logs
```

### Common Errors

**401 Unauthorized**
- Token expired or invalid
- Login again to get new token

**404 Not Found**
- Check endpoint URL
- Verify resource ID exists

**500 Server Error**
- Check MongoDB connection
- Verify environment variables
- Check server logs

---

## 🎯 Quick Test Script

Save as `test-api.sh`:

```bash
#!/bin/bash

BASE_URL="http://localhost:3000"

echo "1. Initializing admin..."
curl -X POST $BASE_URL/api/init

echo "\n\n2. Logging in..."
TOKEN=$(curl -s -X POST $BASE_URL/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"surya@admin.com","password":"admin123"}' \
  | jq -r '.token')

echo "Token: $TOKEN"

echo "\n\n3. Adding sample skill..."
curl -X POST $BASE_URL/api/skills \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"name":"React","category":"Frontend","level":90}'

echo "\n\n4. Getting all skills..."
curl $BASE_URL/api/skills

echo "\n\nDone!"
```

Run with:
```bash
chmod +x test-api.sh
./test-api.sh
```

---

**Happy Testing! 🚀**
