import { NextRequest, NextResponse } from 'next/server';
import { sendContactEmail } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // Validate data
    if (!data.name || !data.email || !data.message) {
      return NextResponse.json({ 
        error: 'All fields are required' 
      }, { status: 400 });
    }

    // Send email notification
    await sendContactEmail({
      name: data.name,
      email: data.email,
      message: data.message,
    });

    return NextResponse.json({ 
      message: 'Message sent successfully! Check your email for confirmation.',
      success: true 
    }, { status: 201 });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json({ 
      error: 'Failed to send message. Please try again or email directly.' 
    }, { status: 500 });
  }
}
