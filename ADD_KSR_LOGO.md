# 🎓 Add KSR College Logo

## 📝 Quick Steps

### Step 1: Save the Logo Image
1. Right-click on the KSR logo image you shared in the chat
2. Save it as: **`ksr-logo.png`**
3. Save location: `/Users/suryakumar/Desktop/portfolio/public/ksr-logo.png`

### Step 2: Verify the File
Run this command to check if the logo is saved:
```bash
ls -la public/ksr-logo.png
```

You should see the file listed.

### Step 3: Refresh Your Portfolio
1. The code is already updated to use the logo
2. Just refresh your browser: http://localhost:3000
3. Scroll to the Education section
4. You'll see the KSR logo!

---

## 🎨 What the Logo Will Look Like

### Main Logo (Left Side)
- **Size**: 80x80px
- **Position**: Left side of education card
- **Style**: White background with blue border
- **Effect**: Scales and rotates on hover
- **Background**: Transparent, adapts to light/dark mode

### Watermark Logo (Top Right)
- **Size**: 96x96px
- **Position**: Top right corner
- **Style**: Semi-transparent watermark
- **Effect**: Becomes more visible on hover
- **Purpose**: Subtle branding

---

## 🖼️ Logo Features

### Transparent Background
- ✅ Works in light mode
- ✅ Works in dark mode
- ✅ No white box around logo
- ✅ Clean integration

### Responsive
- ✅ Looks good on mobile
- ✅ Looks good on tablet
- ✅ Looks good on desktop
- ✅ Maintains aspect ratio

### Interactive
- ✅ Hover to scale up
- ✅ Hover to rotate
- ✅ Smooth animations
- ✅ Professional appearance

---

## 📂 File Structure

```
portfolio/
├── public/
│   └── ksr-logo.png  ← Save the logo here
├── src/
│   └── app/
│       └── page.tsx  ← Already updated to use logo
```

---

## 🔍 Troubleshooting

### Logo Not Showing?
1. **Check file name**: Must be exactly `ksr-logo.png` (lowercase)
2. **Check location**: Must be in `public` folder
3. **Refresh browser**: Hard refresh with Cmd+Shift+R
4. **Check console**: Open browser console for errors

### Logo Has White Background?
- Make sure you saved the PNG with transparency
- The logo should have a transparent background
- If it has a black background, you may need to remove it

### Logo Too Big/Small?
The code is set to:
- Main logo: 80x80px
- Watermark: 96x96px
- These sizes work well with the design

---

## 🎯 Expected Result

After adding the logo, your education section will show:

1. **KSR College Logo** on the left
   - Clear and visible
   - Professional appearance
   - Matches portfolio colors

2. **Watermark** on top right
   - Subtle branding
   - Doesn't distract
   - Adds professionalism

3. **Color Scheme**
   - Blue/Indigo/Purple gradients
   - Matches KSR branding
   - Consistent with portfolio

---

## 💡 Alternative: If You Can't Save the Image

If you're having trouble saving the image, you can:

1. **Take a screenshot** of the KSR logo
2. **Crop** it to just the logo
3. **Remove background** using:
   - https://remove.bg (free)
   - Photoshop
   - Preview (Mac)
4. **Save as PNG** with transparency
5. **Name it** `ksr-logo.png`
6. **Move to** `public` folder

---

## ✅ Verification

After adding the logo, check:
- [ ] Logo file is in `public/ksr-logo.png`
- [ ] File name is exactly `ksr-logo.png`
- [ ] Logo has transparent background
- [ ] Browser is refreshed
- [ ] Logo appears in education section
- [ ] Logo looks good in light mode
- [ ] Logo looks good in dark mode
- [ ] Hover effects work

---

## 🚀 Quick Command

To verify the logo is in the right place:
```bash
cd /Users/suryakumar/Desktop/portfolio
ls -la public/ksr-logo.png
```

If you see the file, you're good to go!

---

**Once you save the logo as `public/ksr-logo.png`, it will automatically appear in your education section!** 🎓✨
