import nodemailer from 'nodemailer';

export interface EmailData {
  name: string;
  email: string;
  message: string;
}

export async function sendContactEmail(data: EmailData) {
  // Create transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  // Email to you (notification)
  const mailOptionsToYou = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER, // Your Gmail
    subject: `New Contact Form Submission from ${data.name}`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #1e293b 0%, #2563eb 50%, #3b82f6 100%); color: white; padding: 20px; border-radius: 10px 10px 0 0; }
            .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
            .field { margin-bottom: 20px; }
            .label { font-weight: bold; color: #2563eb; margin-bottom: 5px; }
            .value { background: white; padding: 15px; border-radius: 5px; border-left: 4px solid #3b82f6; }
            .footer { text-align: center; margin-top: 20px; color: #6b7280; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>🚀 New Contact Form Submission</h2>
              <p>You have received a new message from your portfolio!</p>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">👤 Name:</div>
                <div class="value">${data.name}</div>
              </div>
              <div class="field">
                <div class="label">📧 Email:</div>
                <div class="value"><a href="mailto:${data.email}">${data.email}</a></div>
              </div>
              <div class="field">
                <div class="label">💬 Message:</div>
                <div class="value">${data.message}</div>
              </div>
              <div class="footer">
                <p>Sent from your portfolio website - ${new Date().toLocaleString()}</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `,
  };

  // Auto-reply to sender
  const mailOptionsToSender = {
    from: process.env.EMAIL_USER,
    to: data.email,
    subject: 'Thank you for contacting me!',
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #1e293b 0%, #2563eb 50%, #3b82f6 100%); color: white; padding: 20px; border-radius: 10px 10px 0 0; text-align: center; }
            .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
            .footer { text-align: center; margin-top: 20px; color: #6b7280; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>✅ Message Received!</h2>
            </div>
            <div class="content">
              <p>Hi ${data.name},</p>
              <p>Thank you for reaching out! I have received your message and will get back to you as soon as possible.</p>
              <p><strong>Your message:</strong></p>
              <p style="background: white; padding: 15px; border-radius: 5px; border-left: 4px solid #3b82f6;">${data.message}</p>
              <p>Best regards,<br><strong>Surya Kumar M</strong><br>Full Stack Developer</p>
              <div class="footer">
                <p>📧 suryakumar56394@gmail.com | 📱 +91 9360004968</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `,
  };

  try {
    // Send both emails
    await transporter.sendMail(mailOptionsToYou);
    await transporter.sendMail(mailOptionsToSender);
    return { success: true };
  } catch (error) {
    console.error('Email sending failed:', error);
    throw error;
  }
}
