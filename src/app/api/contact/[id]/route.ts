import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import ContactMessage from '@/models/ContactMessage';
import { authMiddleware } from '@/middleware/auth';

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const auth = await authMiddleware(request);
    if (auth instanceof NextResponse) return auth;

    await dbConnect();
    const message = await ContactMessage.findByIdAndUpdate(
      params.id,
      { read: true },
      { new: true }
    );
    if (!message) {
      return NextResponse.json({ error: 'Message not found' }, { status: 404 });
    }
    return NextResponse.json(message);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update message' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const auth = await authMiddleware(request);
    if (auth instanceof NextResponse) return auth;

    await dbConnect();
    const message = await ContactMessage.findByIdAndDelete(params.id);
    if (!message) {
      return NextResponse.json({ error: 'Message not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Message deleted' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete message' }, { status: 500 });
  }
}
