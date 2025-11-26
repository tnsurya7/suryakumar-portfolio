# Email Notification Setup Guide

## 📧 Gmail Configuration

### Step 1: Enable 2-Factor Authentication
1. Go to https://myaccount.google.com/security
2. Enable **2-Step Verification** if not already enabled

### Step 2: Generate App Password
1. Go to https://myaccount.google.com/apppasswords
2. Select **Mail** as the app
3. Select **Other (Custom name)** as the device
4. Enter "Portfolio Contact Form"
5. Click **Generate**
6. Copy the 16-character password (remove spaces)

### Step 3: Add to Environment Variables
Create a `.env.local` file in your project root:

```env
EMAIL_USER=suryakumar56394@gmail.com
EMAIL_PASSWORD=your_16_character_app_password
```

**Important:** 
- Use the App Password, NOT your regular Gmail password
- Never commit `.env.local` to Git (it's in .gitignore)

## 🚀 Install Dependencies

Run this command to install nodemailer:

```bash
npm install
```

## ✅ Features

### Email to You (Notification)
When someone submits the contact form, you'll receive:
- ✉️ Email notification to your Gmail
- 👤 Sender's name
- 📧 Sender's email (clickable)
- 💬 Their message
- 🕐 Timestamp
- 🎨 Beautiful HTML template with your brand colors

### Auto-Reply to Sender
The person who contacts you will receive:
- ✅ Confirmation that message was received
- 📝 Copy of their message
- 👋 Professional thank you message
- 📞 Your contact information
- 🎨 Branded email template

## 🧪 Testing

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Go to the contact section
3. Fill out the form with your email
4. Click "Send Message"
5. Check both:
   - Your Gmail inbox (notification)
   - The test email inbox (auto-reply)

## 🔒 Security

- ✅ App Password is more secure than regular password
- ✅ Environment variables keep credentials safe
- ✅ Never exposed to client-side code
- ✅ Works only on server-side API routes

## 🐛 Troubleshooting

### "Invalid login" error
- Make sure you're using App Password, not regular password
- Check that 2FA is enabled on your Google account
- Verify EMAIL_USER and EMAIL_PASSWORD are correct

### Emails not sending
- Check your internet connection
- Verify Gmail credentials in .env.local
- Check spam folder
- Look at server console for error messages

### "Less secure app access" error
- This is outdated - use App Password instead
- Don't enable "Less secure app access"

## 📱 Production Deployment

### Vercel
1. Go to your project settings
2. Navigate to Environment Variables
3. Add:
   - `EMAIL_USER` = suryakumar56394@gmail.com
   - `EMAIL_PASSWORD` = your_app_password

### Other Platforms
Add the same environment variables in your hosting platform's settings.

## 🎨 Customization

Edit `src/lib/email.ts` to customize:
- Email templates
- Subject lines
- Colors and styling
- Auto-reply message
- Footer information

## 📊 Email Template Features

- 🎨 Gradient header with your brand colors
- 📱 Mobile-responsive design
- 🔗 Clickable email links
- ⏰ Automatic timestamps
- 💼 Professional formatting
- 🌈 Beautiful HTML styling

## 🔄 Alternative Email Services

If you prefer not to use Gmail, you can modify `src/lib/email.ts` to use:
- SendGrid
- Mailgun
- AWS SES
- Postmark
- Resend

## ✨ What Happens When Form is Submitted

1. User fills out contact form
2. Form data sent to `/api/contact`
3. Server validates the data
4. Two emails are sent:
   - **To you**: Notification with contact details
   - **To sender**: Thank you confirmation
5. Success message shown to user
6. Form is cleared

## 📝 Notes

- Emails are sent asynchronously
- Both emails must succeed for success response
- Failed emails are logged to console
- User sees error message if email fails
- Auto-reply helps build trust with visitors

## 🎯 Next Steps

1. Generate Gmail App Password
2. Add to `.env.local`
3. Run `npm install`
4. Test the contact form
5. Deploy with environment variables
6. Monitor your Gmail for submissions!

---

**Need Help?** Check the console logs for detailed error messages.
