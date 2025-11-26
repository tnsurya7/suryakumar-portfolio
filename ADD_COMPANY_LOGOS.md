# 🏢 Add Company Logos to Internships

## 📝 Quick Steps

### Logos to Add

You need to add **2 company logos** to the `public` folder:

1. **RV Solutions Logo**
   - File name: `rv-solutions-logo.png`
   - Location: `/Users/suryakumar/Desktop/portfolio/public/rv-solutions-logo.png`
   - For: RV Solutions, Chennai internship

2. **Nurture Infotech Logo** (Optional)
   - File name: `nurture-logo.png`
   - Location: `/Users/suryakumar/Desktop/portfolio/public/nurture-logo.png`
   - For: Nurture Infotech, Erode internship

---

## 🎨 How It Will Look

### RV Solutions Card (First Internship)
- **Logo Position**: Left side (64x64px)
- **Watermark**: Top right corner (80x80px, semi-transparent)
- **Colors**: Purple → Pink gradient
- **Border**: Purple border around logo
- **Effect**: Scales and rotates on hover

### Nurture Infotech Card (Second Internship)
- **Logo Position**: Left side (64x64px)
- **Watermark**: Top right corner (80x80px, semi-transparent)
- **Colors**: Blue → Cyan gradient
- **Border**: Blue border around logo
- **Effect**: Scales and rotates on hover

---

## 📂 File Structure

```
portfolio/
├── public/
│   ├── ksr-logo.png              ← Already added
│   ├── rv-solutions-logo.png     ← Add this (RV Solutions)
│   └── nurture-logo.png          ← Add this (Nurture Infotech)
```

---

## 🔍 Logo Requirements

### Format
- ✅ PNG format with transparent background
- ✅ Square or near-square aspect ratio
- ✅ Minimum size: 200x200px
- ✅ Maximum size: 1000x1000px

### Background
- ✅ Transparent background (no white box)
- ✅ Works in light mode
- ✅ Works in dark mode

### Quality
- ✅ Clear and sharp
- ✅ Professional appearance
- ✅ Company branding colors

---

## 💡 Where to Get Company Logos

### Option 1: Company Website
1. Visit company website
2. Look for "About Us" or "Press Kit"
3. Download official logo
4. Save as PNG with transparency

### Option 2: Google Images
1. Search: "RV Solutions Chennai logo"
2. Filter by: Transparent background
3. Download high-resolution version
4. Save as PNG

### Option 3: Create Simple Logo
If you can't find the logo:
1. Use company initials (e.g., "RV" for RV Solutions)
2. Create simple text logo
3. Use company colors
4. Save as PNG

---

## 🚀 Quick Commands

### Check if logos are added:
```bash
cd /Users/suryakumar/Desktop/portfolio/public
ls -la *.png
```

You should see:
- ksr-logo.png
- rv-solutions-logo.png
- nurture-logo.png

---

## 🎯 After Adding Logos

1. Save both logo files in `public` folder
2. Refresh browser: http://localhost:3000
3. Scroll to Internships section
4. You'll see:
   - ✅ RV Solutions logo on first internship card
   - ✅ Nurture Infotech logo on second internship card
   - ✅ Logos on left side
   - ✅ Watermarks on top right
   - ✅ Hover effects working

---

## 🎨 Logo Features

### Main Logo (Left Side)
- **Size**: 64x64px
- **Position**: Left of company name
- **Background**: White with colored border
- **Animation**: Scale + rotate on hover
- **Border**: Matches internship color scheme

### Watermark (Top Right)
- **Size**: 80x80px
- **Position**: Top right corner
- **Opacity**: 10% (20% on hover)
- **Purpose**: Subtle branding
- **Effect**: Fades in on card hover

---

## ✅ Verification Checklist

After adding logos:
- [ ] `rv-solutions-logo.png` is in `public` folder
- [ ] `nurture-logo.png` is in `public` folder
- [ ] File names are exactly correct (lowercase, with hyphens)
- [ ] Logos have transparent backgrounds
- [ ] Browser is refreshed
- [ ] Logos appear in internships section
- [ ] Logos look good in light mode
- [ ] Logos look good in dark mode
- [ ] Hover effects work

---

## 🔧 Troubleshooting

### Logo Not Showing?
1. **Check file name**: Must match exactly
   - `rv-solutions-logo.png` (not `RV-Solutions-Logo.png`)
   - `nurture-logo.png` (not `Nurture-Logo.png`)
2. **Check location**: Must be in `public` folder
3. **Refresh browser**: Hard refresh with Cmd+Shift+R
4. **Check console**: Open browser console for errors

### Logo Has White Background?
- Save as PNG with transparency
- Use online tool: https://remove.bg
- Or use image editor to remove background

### Logo Too Big/Small?
The code automatically scales logos to:
- Main logo: 64x64px
- Watermark: 80x80px
- These sizes work well with the design

---

## 💡 Alternative: Use Placeholder

If you can't find the logos right now, you can use text placeholders:

The code will still work, just without the actual logo images. You can add them later!

---

## 🎨 Color Schemes

### RV Solutions (First Internship)
- **Primary**: Purple (#a855f7)
- **Secondary**: Pink (#ec4899)
- **Border**: Purple
- **Badge**: Purple background

### Nurture Infotech (Second Internship)
- **Primary**: Blue (#3b82f6)
- **Secondary**: Cyan (#06b6d4)
- **Border**: Blue
- **Badge**: Blue background

---

## 📸 Example Logo Sources

### RV Solutions
- Search: "RV Solutions Chennai logo"
- Website: Check their official website
- LinkedIn: Company LinkedIn page

### Nurture Infotech
- Search: "Nurture Infotech Erode logo"
- Website: Check their official website
- LinkedIn: Company LinkedIn page

---

**The code is ready! Just add the company logos as PNG files in the `public` folder and they'll appear automatically!** 🏢✨

**File names:**
- `public/rv-solutions-logo.png`
- `public/nurture-logo.png`
